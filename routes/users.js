const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/Users");

router.post(
  "/",
  [
    check("name", "Name is Required")
      .not()
      .isEmpty(),
    check("email", "Email is Required").isEmail(),
    check("password", "Password must be 6 characters or longer").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // finding by email
      let user = await User.findOne({ email });

      // checking to see if user with that email exists
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // using user model to create new user
      user = new User({
        name,
        email,
        password
      });

      // number inside genSalf tells us how secure password is
      // salt is needed for hashing
      const salt = await bcrypt.genSalt(10);

      // hashing password
      user.password = await bcrypt.hash(password, salt);

      // save user to db
      await user.save();

      // sending user id in jwt
      const payload = {
        user: {
          id: user.id
        }
      };

      // must include user id in token
      // thats what payload is for
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) {
            throw err;
          }

          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
