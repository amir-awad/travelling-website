const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const url = require("url");
const User = require("../database/userModel");

async function register(username, password) {
  const user = new User({ userName: username, password: password,wantToGoList:[]});
  let verify = "yes";
  await user.save().catch((err) => {
    if (err) {
      console.log("error", err);
      verify = "no";
    }
  });
  return verify;
}

let success_msg = "";
// Post registration into db
router.post("/", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let err_msg = "";

  register(username, password).then((check) => {
    console.log("check", check);
    if (check == "yes") {
      success_msg = "Registration successful, please login.";
      res.redirect(
        url.format({
          pathname: "/login",
          query: {
            success_msg: success_msg,
          },
        }),
      );
      req.session.userName = username;
    } else {
      res.render("registration", { err_msg: "Username already exists" });
    }
  });
});

router.get("/", (req, res, next) => {
  res.render("registration");
});

module.exports = router;
