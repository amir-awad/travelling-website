const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (typeof req.session.userName === "undefined") 
    res.redirect("/login");
  else
  res.render("santorini",{message:" "});
});
router.post("/", (req, res) => {
  const username = req.session.userName;
  const { MongoClient } = require("mongodb");
  // Connection URL
  const uri = "mongodb://0.0.0.0:27017";
  // Create a new MongoClient
  const client = new MongoClient(uri);
  var exist = 0;
  async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Establish and verify connection
      await client.db("myDB").command({ ping: 1 });
      const coll = await client.db('myDB').collection('myCollection');

      const user =  await coll.findOne({name: username});
      const wanttogolist = [];
      wanttogolist.forEach(element => {
        if(element=="santorini"){
          exist=1;
        }
      });

      await coll.updateOne({name: username},{ 
        $addToSet: { 
          wantToGoList: {
              $each: ["santorini"],    
           }
         } 
       });
  } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
      if(exist==1)
      res.render("santorini",{message:"You have already this distenation"});
    else
      res.render("santorini",{message:"Added successfully"});
    }
  }
  run().catch(console.dir);
  
});

module.exports = router;