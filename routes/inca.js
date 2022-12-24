const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (typeof req.session.userName === "undefined") 
    res.redirect("/login");
  else
  res.render("inca",{message:" "});
});

router.post("/", (req, res) => {
  var exist = 0;
  const username = req.session.userName;
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
      const user =  await coll.findOne({name: username});
      const wanttogolist = user.wantToGoList;
      wanttogolist.forEach(element => {
        if(element=="inca"){
          exist=1;
        }
      });
      await coll.updateOne({name: username},{ 
        $addToSet: { 
          wantToGoList: {
              $each: ["inca"],    
           }
         } 
       });
  } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
  if(exist==1)
    res.render("inca",{message:"you already have this distenation"});
  else
    res.render("inca",{message:"added succeffully"});
    }
  }
  run().catch(console.dir);
});


module.exports = router;
