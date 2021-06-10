const express = require("express");
const router = express.Router();
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load User model
const User = require("../models/User");

router.get("/user/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(200)
        .json({ unauthorisedUser: "User is not authorised" });
    } else {
      res.status(200).json({ user: user });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signup", async (req, res) => {
  const { phoneNumber, password, fullName } = req.body;

  try {
    let user = await User.findOne({ phoneNumber });
    if (user) {
      return res
        .status(200)
        .json({ userExists: "Phone Number already exists" });
    } else {
      const newUser = new User({
        fullName,
        phoneNumber,
        password,
      });

      // Hash password
      const hashedPassword = passwordHash.generate(password);
      newUser.password = hashedPassword;

      // Save User
      const save = await newUser.save();
      res.status(200).json({ success: "User Registered", user: save });
    }
  } catch (err) {
    console.log("Error in registering user ", err);
  }
});

router.post("/signin", async (req, res) => {
  const { phoneNumber, password } = req.body;

  // Find User by Phone Number
  const user = await User.findOne({ phoneNumber });

  if (!user) {
    return res
      .status(200)
      .json({ incorrectPhoneNumber: "Phone Number is not registered" });
  }

  // Check Password
  const passwordMatch = passwordHash.verify(password, user.password);
  if (!passwordMatch) {
    return res.status(200).json({ incorrectPassword: "Incorrect Password" });
  }

  // Create Payload
  const payload = {
    id: user.id,
    fullName: user.fullName,
  };

  // Sign Token
  jwt.sign(
    payload,
    keys.secretOrKey,
    {
      expiresIn: 31556926,
    },
    (err, token) => {
      res.status(200).json({
        success: true,
        token: token,
      });
    }
  );
});

module.exports = router;
