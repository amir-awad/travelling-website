const express = require("express");
const router = express.Router();
const User = require("../database/userModel");

// POST to login page and handling the current session
router.post("/", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let err_msg = "";

  User.findOne({ username, password }, (err, user) => {
    if (err) {
      err_msg = "Some error occured, please try again.";
      return res.render("login", { err_msg });
    }
    if (!user) {
      err_msg = "Username or password is incorrect.";
      return res.render("login", { err_msg });
    }
    req.session.userName = username;
    res.redirect("/");
  });
});

router.get("/", (req, res, next) => {
  if (req.session.userName && !req.query.success_msg) {
    return res.redirect("/");
  }

  if (req.query.success_msg) {
    return res.render("login", { success_msg: req.query.success_msg });
  }

  res.render("login");
});

module.exports = router;
