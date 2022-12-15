const express = require("express");
const router = express.Router();

const destinations = require("../destinations.json");

router.post("/", (req, res, next) => {
  const searchBody = req.body.Search;

  let searchResult = [];

  for (let i = 0; i < destinations.destinations.length; i++) {
    if (destinations.destinations[i].includes(searchBody.toLowerCase())) {
      searchResult.push(destinations.destinations[i]);
    }
  }

  if (searchResult.length > 0) {
    res.render("searchresults", { searchResult });
  } else {
    res.render("searchresults", { no_result: "Destination not Found" });
  }
});

router.get("/", (req, res) => {
  res.render("searchresults");
});

module.exports = router;
