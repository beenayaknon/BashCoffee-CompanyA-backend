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
        Drink_Name: "Dirty",
        Price: 85,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Coffee", "Recommend"]
      },
      {
        Drink_Name: "Dirty",
        Price: 85,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Coffee", "Recommend"]
      },
      {
        Drink_Name: "Espresso",
        Price: 50,
        DrinkType: "HOT",
        img_src: "/image/espresso.png",
        Tag: ["Coffee"]
      },
      {
        Drink_Name: "Americano",
        Price: 55,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Coffee"]
      },
      {
        Drink_Name: "Americano",
        Price: 60,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Coffee"]
      },
      {
        Drink_Name: "Latte",
        Price: 60,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Coffee", "Milk"]
      },
      {
        Drink_Name: "Latte",
        Price: 65,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Coffee", "Milk"]
      },
      {
        Drink_Name: "Cappuccino",
        Price: 60,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Coffee", "Milk"]
      },
      {
        Drink_Name: "Cappuccino",
        Price: 65,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Coffee", "Milk"]
      },
      {
        Drink_Name: "Es-Yen (Thai Style)",
        Price: 65,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Coffee", "Milk"]
      },
      {
        Drink_Name: "Es-Yen (Thai Style)",
        Price: 70,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Coffee", "Milk"]
      },
      {
        Drink_Name: "Mocha",
        Price: 65,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Coffee", "Milk"]
      },
      {
        Drink_Name: "Mocha",
        Price: 70,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Coffee", "Milk"]
      },
      {
        Drink_Name: "Honey Americano",
        Price: 65,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Coffee", "Milk", "Honey", "Recommend"]
      },
      {
        Drink_Name: "Honey Americano",
        Price: 70,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Coffee", "Milk", "Honey", "Recommend"]
      },
      {
        Drink_Name: "Black Yuzu",
        Price: 70,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Coffee", "Milk", "Yuzu", "Recommend"]
      },
      {
        Drink_Name: "Orange Coffee",
        Price: 70,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Coffee", "Milk", "Orange", "Recommend"]
      },
      {
        Drink_Name: "Coconut Flower Americano",
        Price: 70,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Coffee", "Milk", "Coconut", "Recommend"]
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
      {
        Drink_Name: "Twist Matcha Latte",
        Price: 110,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Matcha (Ceremonial Grade)", "Milk", "Recommend Menu", "Nutty", "Umami"]
      },
      {
        Drink_Name: "Twist Matcha Latte",
        Price: 120,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Matcha (Ceremonial Grade)", "Milk", "Recommend Menu", "Nutty", "Umami"]
      },
      {
        Drink_Name: "Caramel Fresh Milk",
        Price: 45,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Non- Coffee", "Milk"]
      },
      {
        Drink_Name: "Caramel Fresh Milk",
        Price: 50,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Non- Coffee", "Milk"]
      },
      {
        Drink_Name: "Pinky Milk",
        Price: 45,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Non- Coffee", "Milk","Pinky"]
      },
      {
        Drink_Name: "Pinky Milk",
        Price: 50,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Non- Coffee", "Milk","Pinky"]
      },
      {
        Drink_Name: "Black Tea",
        Price: 50,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Non- Coffee", "Milk","Tea"]
      },
      {
        Drink_Name: "Black Tea",
        Price: 55,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Non- Coffee", "Milk","Tea"]
      },
      {
        Drink_Name: "Cocoa",
        Price: 55,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Non- Coffee", "Milk","Cocoa"]
      },
      {
        Drink_Name: "Cocoa",
        Price: 60,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Non- Coffee", "Milk","Cocoa"]
      },
      {
        Drink_Name: "Thai Milk Tea",
        Price: 55,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Non- Coffee", "Milk","Tea"]
      },
      {
        Drink_Name: "Thai Milk Tea",
        Price: 60,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Non- Coffee", "Milk","Tea"]
      },
      {
        Drink_Name: "Assam Black Milk Tea",
        Price: 60,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Non- Coffee", "Milk","Tea"]
      },
      {
        Drink_Name: "Assam Black Milk Tea",
        Price: 60,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Non- Coffee", "Milk","Tea"]
      },
      {
        Drink_Name: "Whipped Chesse Thai Tea",
        Price: 85,
        DrinkType: "COLD",
        img_src: "",
        Tag: ["Non- Coffee", "Milk","Tea"]
      },
      {
        Drink_Name: "Orange Juice",
        Price: 45,
        DrinkType: "",
        img_src: "",
        Tag: ["Non-Coffee", "Juice"]
    },
    {
        Drink_Name: "Lemon Thai Tea",
        Price: 55,
        DrinkType: "",
        img_src: "",
        Tag: ["Non-Coffee", "Tea"]
    },
    {
        Drink_Name: "Honey Lemonade",
        Price: 55,
        DrinkType: "",
        img_src: "",
        Tag: ["Non-Coffee", "Lemonade"]
    },
    {
        Drink_Name: "Red Lemon Soda",
        Price: 55,
        DrinkType: "",
        img_src: "",
        Tag: ["Non-Coffee", "Soda"]
    },
    {
        Drink_Name: "Honey Yuzu Soda",
        Price: 60,
        DrinkType: "",
        img_src: "",
        Tag: ["Non-Coffee", "Soda", "Yuzu"]
    },
    {
        Drink_Name: "Breezy Rose",
        Price: 60,
        DrinkType: "",
        img_src: "",
        Tag: ["Non-Coffee", "Rose"]
    },
    {
        Drink_Name: "Plum Lemon Soda",
        Price: 60,
        DrinkType: "",
        img_src: "",
        Tag: ["Non-Coffee", "Soda", "Plum"]
    },
    {
        Drink_Name: "Craft Cola",
        Price: 60,
        DrinkType: "",
        img_src: "",
        Tag: ["Non-Coffee", "Cola"]
    },
    {
        Drink_Name: "Fruit Sunshine Tea",
        Price: 70,
        DrinkType: "",
        img_src: "",
        Tag: ["Non-Coffee", "Tea", "Fruit"]
    },
    {
        Drink_Name: "Water",
        Price: 10,
        DrinkType: "",
        img_src: "",
        Tag: ["Water"]
    },
    {
        Drink_Name: "Coke",
        Price: 18,
        DrinkType: "",
        img_src: "",
        Tag: ["Soft Drink"]
    }
    ]);

    console.log(`Collection '${collectionName}' created.`);
  } else {
    console.log(`Collection '${collectionName}' already exists.`);
  }
}

module.exports = initializeBeverageCollectionIfNotExist;
