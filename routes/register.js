const express = require("express");
const router = express.Router();
const url = require("url");


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

  success_msg = "Registration successful, please login.";
  res.redirect(
    url.format({
      pathname: "/login",
      query: {
        success_msg: success_msg,
      },
    }),
  );
});

router.get("/", (req, res, next) => {
  if (req.session.userName) {
    return res.redirect("/");
  }

  res.render("registration");
});

module.exports = router;

