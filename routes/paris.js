const { json } = require("body-parser");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("paris");
});

router.post("/", (req, res) => {
  // res.render("paris");
  console.log('here');
  // req.session.wantToGoList.insertone('paris');
  
});

module.exports = router;
