const { MongoClient } = require("mongodb");

const userSchema = {
  userName: { type: String, unique: true },
  password: String,
  wantToGoList: [{ type: String, unique: true }],
};

const uri = "mongodb://0.0.0.0:27017/";
createCollection(getClient(uri), "myDB", "myCollection");

function getClient(uri) {
  return new MongoClient(uri);
}

function createCollection(client, dbName, collectionName) {
  client.connect(function (err, db) {
    if (err) throw err;
    let currentDB = db.db(dbName);
    //*Check if collection already exists
    currentDB
      .listCollections({ name: collectionName })
      .next(function (err, collectionInfo) {
        if (collectionInfo) {
          console.log(
            `Collection with the name ${collectionName} already exists`,
          );
          db.close();
        } else {
          currentDB.createCollection(
            collectionName,
            userSchema,
            function (err, res) {
              if (err) throw err;
              console.log(`Collection created with the name ${collectionName}`);
              db.close();
            },
          );
        }
      });
  });
}
