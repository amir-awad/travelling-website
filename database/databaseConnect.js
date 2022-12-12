const { MongoClient } = require("mongodb");

function mongoConnect() {
  const uri = "mongodb://0.0.0.0:27017/";
  createDB(uri, "myDB");
}

function createDB(uri, dbName) {
  const dbUri = `${uri}${dbName}`;
  MongoClient.connect(dbUri, (err, db) => {
    console.log("Connected to database");
    db.close();
  });
}

module.exports = mongoConnect;
