const express = require("express");
const router = express.Router();

// GET the cities page
router.get("/", (req, res) => {
  if (typeof req.session.userName === "undefined") 
    res.redirect("/login");
  else
    return res.render("cities");
});

module.exports = router;