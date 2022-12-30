const express = require("express");
const router = express.Router();
const url = require("url");
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://0.0.0.0:27017/");



let success_msg = false;
// Post registration into db
router.post("/", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if(!username){
    return res.render("registration", { err_msg: "Please Enter Username" });
  }

  if(!password){
    return res.render("registration", { err_msg: "Please Enter Password" });
  }

  client.connect(function (err, db) {
    if (err) throw err;
    let currentDB = db.db("myDB");
    currentDB
    .collection("myCollection")
    .findOne({ name: username }, function (err, result) {
      if (err) throw err;
      if (result) {
        res.render("registration", { err_msg: "Username already exists" });
      }
      else{
          currentDB.collection("myCollection").insertOne(
            {
              name: username,
              password: password,
              wantToGoList: [],
            },
            function (err, res) {
              if (err) {
                console.log("error", err);
                verify = "no";
              }
              db.close();
            },
          );
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
      }
    });
  });

});

router.get("/", (req, res, next) => {
  if (req.session.userName) {
    return res.redirect("/");
  }

  res.render("registration");
});

module.exports = router;

