const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "This field is required"],
    },
    email: {
      type: String,
      required: [true, "This field is required"],
      unique: [true, "This email address is already taken"], // no duplicates allowed
    },
    password: {
      type: String,
      required: [true, "This field is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
