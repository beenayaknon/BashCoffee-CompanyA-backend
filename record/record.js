const { Timestamp } = require("mongodb");

const dbName = "BashCoffeeDB";
const collectionName = "record";

// Function to create the Beverage collection if it doesn't exist
async function initializeRecordCollectionIfNotExist(client) {
  const db = client.db(dbName);
  const collections = await db.listCollections({ name: collectionName }).toArray();

  if (collections.length === 0) {
    await db.createCollection(collectionName);

    await db.collection(collectionName).insertMany([
      {
        date: new Timestamp(),
        Customer: "MaMa Mia",
        Tel:"0991564848",
        Menu: [["Dirty","HOT",90,"Add On: None"],["Espresso","HOT",50,"Add On: None"]],
        promotion: "None",
        totalPrice: 99
      },
    ]);

    console.log(`Collection '${collectionName}' created and initialized with sample data.`);
  } else {
    console.log(`Collection '${collectionName}' already exists.`);
  }
}

module.exports = initializeRecordCollectionIfNotExist;
