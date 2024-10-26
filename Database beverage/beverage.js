const dbName = "BashCoffeeDB";
const collectionName = "beverage";

// Function to create the Beverage collection if it doesn't exist
async function initializeBeverageCollectionIfNotExist(client) {
  const db = client.db(dbName);
  const collections = await db.listCollections({ name: collectionName }).toArray();

  if (collections.length === 0) {
    await db.createCollection(collectionName);

    await db.collection(collectionName).insertMany([
      {
        Drink_Name: "Clear Matcha",
        Price: 60,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Matcha (Ceremonial Grade)", "Milk"]
      },
      {
        Drink_Name: "Clear Matcha",
        Price: 65,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Matcha (Ceremonial Grade)", "Milk"]
      },
      {
        Drink_Name: "Matcha Latte",
        Price: 65,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Matcha (Ceremonial Grade)", "Milk"]
      },
      {
        Drink_Name: "Orange Matcha",
        Price: 70,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Matcha (Ceremonial Grade)", "Milk", "Recommend Menu"]
      },
      {
        Drink_Name: "Coconut Flower Matcha",
        Price: 90,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Matcha (Ceremonial Grade)", "Milk", "Recommend Menu"]
      },
      {
        Drink_Name: "Premium Matcha Latte",
        Price: 85,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Matcha (Ceremonial Grade)", "Milk", "Recommend Menu", "Nutty", "Umami"]
      },
      {
        Drink_Name: "Premium Matcha Latte",
        Price: 90,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Matcha (Ceremonial Grade)", "Milk", "Recommend Menu", "Nutty", "Umami"]
      },
    ]);

    console.log(`Collection '${collectionName}' created.`);
  } else {
    console.log(`Collection '${collectionName}' already exists.`);
  }
}

module.exports = initializeBeverageCollectionIfNotExist;
