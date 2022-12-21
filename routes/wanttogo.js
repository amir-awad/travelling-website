const { Template } = require("ejs");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  
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
      await client.db("myDB").command({ ping: 1 });
      console.log("Connected successfully to server");
      const coll = await client.db('myDB').collection('myCollection');
      
      const user =  await coll.findOne({name: username});
      const wanttogolist = user.wantToGoList;
      res.render("wanttogo",{wanttogolist})
      
  } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  run().catch(console.dir);
});

router.get("/remove/:id", (req, res) => {
  console.log(req.params.id);
  const username = req.session.userName;
  console.log(req.session.userName)
  // res.render("paris");
  console.log('here');
  const { MongoClient } = require("mongodb");
  // Connection URL
  const uri = "mongodb://0.0.0.0:27017";
  // Create a new MongoClient
  const client = new MongoClient(uri);
  async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Establish and verify connection
      await client.db("myDB").command({ ping: 1 });
      console.log("Connected successfully to server");
      const coll = await client.db('myDB').collection('myCollection');
      await  coll.updateOne({name: username},{
          $pull: { 
           wantToGoList:req.params.id   
      }});
  } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  res.redirect("/wanttogo");

});


/**
 * 
 * 
 *   
 */

module.exports = router;
