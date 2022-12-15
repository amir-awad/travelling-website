const { MongoClient } = require("mongodb");

const userSchema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "password", "wantToGoList"],
      properties: {
        // unique username
        userName: {
          bsonType: "string",
          description: "must be a string and is required",
        },

        password: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        wantToGoList: {
          // Array of unique strings
          bsonType: "array",
          uniqueItems: true,

          items: {
            bsonType: "string",
            description: "must be a string and is required",
          },
        },
      },
    },
  },
};

function mongoConnect() {
  const uri = "mongodb://0.0.0.0:27017/";
  createDB(uri, "myDB");
  createCollection(getClient(uri), "myDB", "myCollection");
}

function createDB(uri, dbName) {
  const dbUri = `${uri}${dbName}`;
  MongoClient.connect(dbUri, (err, db) => {
    console.log("Connected to database");
    db.close();
  });
}

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

module.exports = { mongoConnect };
