const express = require("express");
const router = express.Router();
const url = require("url");
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://0.0.0.0:27017/");

async function register(username, password) {
  // register the new user in myCollection
  let verify = "yes";

  client.connect(function (err, db) {
    if (err) throw err;
    let currentDB = db.db("myDB");
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
  });

  return verify;
}

let success_msg = false;
// Post registration into db
router.post("/", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

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
  if (req.session.userName) {
    return res.redirect("/");
  }

  res.render("registration");
});

module.exports = router;
