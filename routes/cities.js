const express = require("express");
const router = express.Router();

// GET the cities page
router.get("/", (req, res) => {
  return res.render("cities");
});

module.exports = router;