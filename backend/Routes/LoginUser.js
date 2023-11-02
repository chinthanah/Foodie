const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "Thisisafullstack";

router.post(
  "/loginuser",
  [
    body("email", "incorrect email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }

      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userdata.password
      );
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }

      const data = {
        user: {
          id: userdata.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken });
    } catch (error) {
      console.error(error);
    }
  }
);

module.exports = router;
