const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  constants: { OK, CREATED, BAD_REQUEST, UNAUTHORIZED },
} = require("../constants");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(BAD_REQUEST);
    throw new Error("All fields are mandatory");
  }

  const isEmailTaken = await User.findOne({ email });
  if (isEmailTaken) {
    res.status(BAD_REQUEST);
    throw new Error("The user with such email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(CREATED).json({ _id: user.id, email: user.email });
  } else {
    res.status(BAD_REQUEST);
    throw new Error("User data is not valid. Registration failed");
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(BAD_REQUEST);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });
  // salt comparison for existing user
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(OK).json({ accessToken });
  } else {
    res.status(UNAUTHORIZED);
    throw new Error("Email or password is not valid");
  }
});

//@desc Display current user info
//@route POST /api/users/current
//@access private
const getCurrentUserInfo = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUserInfo,
};
