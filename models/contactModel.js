const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please, add the email information"],
    },
    phone: {
      type: String,
      required: [true, "Please, add the contact phone number"],
    },
  },
  {
    timestamps: true, // adds two additional Date properties to schema: createdAt and updatedAt
  }
);

module.exports = mongoose.model("Contact", contactSchema);
