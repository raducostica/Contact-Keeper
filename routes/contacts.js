const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");

const User = require("../models/Users");
const Contact = require("../models/Contacts");

// Pass in auth to all private routes
// contacts are private to each user
// GET CONTACTS
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });

    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    re.status(500).send("server error");
  }
});

// ADD CONTACTS
router.post(
  "/",
  [
    auth,
    [
      check("name", "Please enter a name")
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

    // because we have auth middleware, we have access to req.user.id
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
      res.status(500).send("Server error");
    }
  }
);

router.put("/:id", auth, async (req, res) => {
  try {
    const { name, email, phone, type } = req.body;

    // build contact object
    const contactFields = {};

    if (name) {
      contactFields.name = name;
    }
    if (email) {
      contactFields.email = email;
    }
    if (phone) {
      contactFields.phone = phone;
    }
    if (type) {
      contactFields.type = type;
    }

    try {
      let contact = await Contact.findById(req.params.id);

      if (!contact) {
        return res.status(404).json({ msg: "Contact not found" });
      }

      // make sure user owns contact
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      contact = await Contact.findByIdAndUpdate(
        req.params.id,
        {
          $set: contactFields
        },
        {
          new: true
        }
      );

      res.json(contact);
    } catch (error) {}
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    // make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "contact removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
