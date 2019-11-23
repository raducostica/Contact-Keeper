const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Contact = require("../models/Contacts");
const auth = require("../middleware/auth");
const router = express.Router();

// @ route  GET api/contacts
// @ desc   get all users contacts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // sort -1 means the sorts with the latest first
    // we have req.user because in auth.js we make the decoded user = re.user
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @ route  post api/contacts
// @ desc   add new contact
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

// @ route  put api/contacts/:id
// @ desc   update contact
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // build contact body
  const contactField = {};
  if (name) {
    contactField.name = name;
  }
  if (email) {
    contactField.email = email;
  }
  if (phone) {
    contactField.phone = phone;
  }
  if (type) {
    contactField.type = type;
  }

  try {
    let contact = await Contact.findById(req.params.id);
    console.log(req.params);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    // make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactField },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// @ route  delete api/contacts/:id
// @ desc   delete contact
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    console.log(req.params);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    // make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
