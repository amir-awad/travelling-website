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
  update(req.session.name);
  res.render("paris");
});

const { MongoClient } = require("mongodb");
// Connection URI
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
    var coll = await client.db('travellingDB').collection('users');
    await coll.updateOne({userName:'12'},{ 
      $push: { 
        wantToGoList: {
            $each: ["MAlek"],
            $position: 0
         }
       } 
     });
} finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


module.exports = router;
