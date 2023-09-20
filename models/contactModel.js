const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
     // only authorized user can create contacts
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
