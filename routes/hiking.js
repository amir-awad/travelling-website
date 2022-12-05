const express = require("express");
const router = express.Router();

// GET the cities page
router.get("/", (req, res) => {
  return res.render("hiking");
});

module.exports = router;