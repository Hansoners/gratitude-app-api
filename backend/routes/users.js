const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const router = express.Router();

router.post("/register", (req, res, next) => {
    bcrypt.hash(req.body.password, 11).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save().then(result => {
            res.status(201).json({
                message: "User created!",
                result: result
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });
});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: "Authentication failed: User not found."
          });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: "Authentication failed."
          });
        }
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id },
          "secret_string_for_development",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetchedUser._id
        });
      })
      .catch(err => {
        return res.status(401).json({
          message: "Authentication failed."
        });
      });
  });
  
  

module.exports = router;