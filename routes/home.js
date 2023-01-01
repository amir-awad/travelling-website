const express = require("express");
const session = require("express-session");
const router = express.Router();

router.get("/", (req, res) => {
  if (typeof req.session.userName === "undefined") res.redirect("/login");
  else res.render("home", { name: req.session.userName });
});

module.exports = router;
