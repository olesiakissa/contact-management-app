const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {
  constants: { UNAUTHORIZED },
} = require("../constants");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(UNAUTHORIZED);
        throw new Error("User is not authorized to the service");
      }

      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(UNAUTHORIZED);
      throw new Error("Token is not valid or expired");
    }
  }
});

module.exports = validateToken;
