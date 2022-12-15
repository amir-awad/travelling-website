const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.userName) {
    return res.render("home", { name: req.session.userName });
  }
  res.redirect("/login");
});

module.exports = router;
