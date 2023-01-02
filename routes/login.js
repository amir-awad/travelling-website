const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://0.0.0.0:27017/");

// POST to login page and handling the current session
router.post("/", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if(!username){
    return res.render("login", { error_msg: "Please Enter Username" });
  }

  if(!password){
    return res.render("login", { error_msg: "Please Enter Password" });
  }

  if(username == "admin" && password == "admin"){
    req.session.userName = "admin";
    return res.redirect("/");
  }

  // Check if the user is already logged in
  if (req.session.userName) {
    return res.redirect("/");
  }
  // Check if the user is in the database
  client.connect(function (err, db) {
    if (err) throw err;
    let currentDB = db.db("myDB");
    currentDB
      .collection("myCollection")
      .findOne({ name: username }, function (err, result) {
        if (err) throw err;
        if (result) {
          if (result.password === password) {
            req.session.userName = username;
            return res.redirect("/");
          } else {
            return res.render("login", { error_msg: "Wrong password" });
          }
        } else {
          return res.render("login", { error_msg: "User not found" });
        }
      });
  });
});

router.get("/", (req, res, next) => {
  console.log(req.query.success_msg);
  console.log(req.session.userName);

  if (req.session.userName && !req.query.success_msg) {
    return res.redirect("/");
  }

  if (req.query.success_msg) {
    return res.render("login", { success_msg: req.query.success_msg });
  }

  res.render("login");
});

module.exports = router;
