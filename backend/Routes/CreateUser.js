const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

router.post(
  "/createuser",
  [
    body("email", "incorrect email").isEmail(),
    body("name", "incorrect name").isLength({ min: 5 }),
    body("password", "Incorrect password").isLength({ min: 5 }),
    body("location", "Incorrect location").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: secPassword,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
