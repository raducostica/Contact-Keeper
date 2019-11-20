const express = require("express");

const router = express.Router();

// @ route  GET api/contacts
// @ desc   get all users contacts
// @access  Private
router.post("/", (req, res) => {
  res.send("Get all contatcs");
});

// @ route  post api/contacts
// @ desc   add new contact
// @access  Private
router.post("/", (req, res) => {
  res.send("add new contact");
});

// @ route  put api/contacts/:id
// @ desc   update contact
// @access  Private
router.put("/:id", (req, res) => {
  res.send("update contact");
});

// @ route  delete api/contacts/:id
// @ desc   delete contact
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("delete contact");
});

module.exports = router;
