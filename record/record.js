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
        Menu: [
        ["Dirty","HOT",90,"Add On: None"],
        ["Espresso","HOT",50,"Add On: None"]],
        promotion: "None",
        totalPrice: 140
      },
      {
              date: new Date(), // Current date
              Customer: "Thanat Phi",
              Tel: "0625916127",
              Menu: [
                  ["Latte", "COLD", 60, "Add On: None"],  // Only beverages
              ],
              promotion: "สะสมแต้มผ่าน LINE OA 10 แก้ว ฟรี 1 แก้ว",
              totalPrice: 60
          },
          {
              date: new Date(), // Current date
              Customer: "PhiPhi nat",
              Tel: "0123456789",
              Menu: [
                  ["Cappuccino", "HOT", 60, "Add On: Oat Milk"], // First beverage
                  ["Mocha", "HOT", 65, "Add On: None"],          // Second beverage
                  ["Chocolate Croissant", 50] // One pastry
              ],
              promotion: "None", // No promotion used
              totalPrice: 175 // Total price without any discounts
          },
          {
              date: new Date(), // Current date
              Customer: "Thanatos Thanat",
              Tel: "1234567890",
              Menu: [
                  ["Mocha", "HOT", 65, "Add On: None"], // Two coffees
                  ["Cappuccino", "HOT", 60, "Add On: None"]
              ],
              promotion: "ส่วนลด 5 บาทสำหรับนักศึกษาเก่ามหิดล",
              totalPrice: 125 // Adjust for any discounts as needed
          }

    ]);

    console.log(`Collection '${collectionName}' created and initialized with sample data.`);
  } else {
    console.log(`Collection '${collectionName}' already exists.`);
  }
}

module.exports = initializeRecordCollectionIfNotExist;
