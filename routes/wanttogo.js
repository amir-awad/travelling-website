const { Template } = require("ejs");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("wanttogo");
  const { MongoClient } = require("mongodb");
  const username = req.session.userName;
  // Connection URL
  const uri = "mongodb://0.0.0.0:27017";
  // Create a new MongoClient
  const client = new MongoClient(uri);
  async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Establish and verify connection
      await client.db("travellingDB").command({ ping: 1 });
      console.log("Connected successfully to server");
      const coll = await client.db('travellingDB').collection('users');
      const user =  await coll.findOne({userName: username});
      const wantToGoList = user.wantToGoList;
      console.log(wantToGoList);
      
  } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
});

module.exports = router;
