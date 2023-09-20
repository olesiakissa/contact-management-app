const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const {
  constants: { OK, CREATED, BAD_REQUEST, FORBIDDEN, NOT_FOUND },
} = require("../constants");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(OK).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(BAD_REQUEST);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    user_id: req.user.id,
    name,
    email,
    phone,
  });
  res.status(CREATED).json(contact);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(NOT_FOUND);
    throw new Error(`Contact with id of ${req.params.id} not found`);
  }

  res.status(OK).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(NOT_FOUND);
    throw new Error(`Contact with id of ${req.params.id} not found`);
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(FORBIDDEN);
    throw new Error("User does not have permissions to perform this operation");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(OK).json({
    message: `Updated contact: ${JSON.stringify(updatedContact, 0, 2)}`,
  });
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(NOT_FOUND);
    throw new Error(`Contact with id of ${req.params.id} not found`);
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(FORBIDDEN);
    throw new Error("User does not have permissions to perform this operation");
  }

  await Contact.deleteOne({ _id: req.params.id });
  res.status(OK).json("Contact deleted");
});

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
