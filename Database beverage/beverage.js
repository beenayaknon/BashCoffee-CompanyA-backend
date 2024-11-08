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
        Drink_ID: 101,
        Drink_Name: "Dirty",
        Description: "",
        Price: {
          hotPrice: 85,
          coldPrice: 90
        },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee"],
        isRecommended: true,
        img_src: "",
        AddOns: [
          {
            name: "Oat Milk",
            price: 10
          },
          {
            name: "Brown Sugar Jelly",
            price: 15
          }
        ]
      },
      {
        Drink_ID: 102,
        Drink_Name: "Americano",
        Description: "An Americano is made by diluting an espresso shot with hot water...",
        Price: {
          hotPrice: 55,
          coldPrice: 60
        },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee"],
        isRecommended: false,
        img_src: "americano.png",
        AddOns: [
          {
            name: "Oat Milk",
            price: 15
          },
          {
            name: "Brown Sugar Jelly",
            price: 15
          }
        ]
      },
      {
        Drink_ID: 103,
        Drink_Name: "Espresso",
        Description: "A rich, concentrated coffee brewed by forcing a small amount of nearly boiling water through finely-ground coffee beans. Known for its bold flavor and velvety crema, espresso serves as the base for many coffee drinks.",
        Price: {
          hotPrice: 55,
          coldPrice: 60
        },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee"],
        isRecommended: false,
        img_src: "espresso.png",
        AddOns: [
          {
            name: "Oat Milk",
            price: 15
          },
          {
            name: "Brown Sugar Jelly",
            price: 15
          }
        ]
      },
      {
        Drink_ID: 104,
        Drink_Name: "Latte",
        Description: "A smooth blend of espresso and steamed milk with a creamy finish.",
        Price: { hotPrice: 60, coldPrice: 65 },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee", "Milk"],
        isRecommended: false,
        img_src: "latte.png",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 105,
        Drink_Name: "Cappuccino",
        Description: "A classic Italian coffee with equal parts espresso, steamed milk, and foam.",
        Price: { hotPrice: 60, coldPrice: 65 },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee", "Milk"],
        isRecommended: false,
        img_src: "",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 106,
        Drink_Name: "Es-Yen (Thai Style)",
        Description: "Thai iced coffee with a bold and refreshing taste.",
        Price: { hotPrice: 65, coldPrice: 70 },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee", "Milk"],
        isRecommended: false,
        img_src: "Es-Yen Thai Style.png",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 107,
        Drink_Name: "Mocha",
        Description: "A chocolate-infused coffee with a rich, sweet taste.",
        Price: { hotPrice: 65, coldPrice: 70 },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee", "Milk"],
        isRecommended: false,
        img_src: "mocha.png",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 108,
        Drink_Name: "Honey Americano",
        Description: "Americano with a touch of honey for a natural sweetness.",
        Price: { hotPrice: 65, coldPrice: 70 },
        DrinkType: "Hot/Cold",
        Tag: ["Coffee", "Milk", "Honey", "Recommend"],
        isRecommended: true,
        img_src: "",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 109,
        Drink_Name: "Black Yuzu",
        Description: "A refreshing black coffee infused with yuzu citrus.",
        Price: { hotPrice: null, coldPrice: 70 },
        DrinkType: "Cold",
        Tag: ["Coffee", "Milk", "Yuzu", "Recommend"],
        isRecommended: true,
        img_src: "",
        AddOns: [
          { name: "Extra shot", price: 15 }
        ]
      },
      {
        Drink_ID: 110,
        Drink_Name: "Orange Coffee",
        Description: "A zesty coffee with a bright orange flavor.",
        Price: { hotPrice: null, coldPrice: 70 },
        DrinkType: "Cold",
        Tag: ["Coffee", "Milk", "Orange", "Recommend"],
        isRecommended: true,
        img_src: "/images/orange coffee.png",
        AddOns: [
          { name: "Extra shot", price: 15 }
        ]
      },
      {
        Drink_ID: 111,
        Drink_Name: "Coconut Flower Macchiato",
        Description: "A creamy macchiato with a hint of coconut flower sweetness.",
        Price: { hotPrice: null, coldPrice: 70 },
        DrinkType: "Cold",
        Tag: ["Coffee", "Milk", "Coconut", "Recommend"],
        isRecommended: true,
        img_src: "coconut flower macchiato.png",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 112,
        Drink_Name: "Clear Matcha",
        Description: "A clear and refreshing ceremonial grade matcha drink.",
        Price: { hotPrice: null, coldPrice: 65 },
        DrinkType: "Cold",
        Tag: ["Matcha", "Milk"],
        isRecommended: false,
        img_src: "",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 113,
        Drink_Name: "Matcha Latte",
        Description: "A creamy blend of matcha and steamed milk.",
        Price: { hotPrice: 65, coldPrice: null },
        DrinkType: "Hot",
        Tag: ["Matcha", "Milk"],
        isRecommended: false,
        img_src: "matcha latte.png",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_ID: 114,
        Drink_Name: "Orange Matcha",
        Description: "A refreshing matcha with a burst of orange flavor.",
        Price: { hotPrice: null, coldPrice: 70 },
        DrinkType: "Cold",
        Tag: ["Matcha", "Milk", "Recommend Menu"],
        isRecommended: true,
        img_src: "/images/orange matcha.png",
        AddOns: [
          { name: "Oat Milk", price: 15 },
          { name: "Brown Sugar Jelly", price: 15 }
        ]
      },
      {
        Drink_Name: "Coconut Flower Matcha",
        Price: 90,
        DrinkType: "COLD",
        img_src: "coconut flower matcha.png",
        Tag: ["Matcha", "Milk", "Recommend Menu"]
      },
      {
        Drink_Name: "Premium Matcha Latte",
        Price: 85,
        DrinkType: "HOT",
        img_src: "",
        Tag: ["Matcha", "Milk", "Recommend Menu", "Nutty", "Umami"]
      },
      {
        Drink_ID: 115,
        Drink_Name: "Premium Matcha Latte",
        Price: { coldPrice: 90 },
        DrinkType: "Cold",
        img_src: "",
        Tag: ["Matcha", "Milk", "Recommend Menu", "Nutty", "Umami"]
      },
        {
          Drink_ID: 115,
          Drink_Name: "Premium Matcha Latte",
          Price: { coldPrice: 90 },
          DrinkType: "Cold",
          img_src: "",
          Tag: ["Matcha", "Milk", "Recommend Menu", "Nutty", "Umami"]
        },
        {
          Drink_ID: 116,
          Drink_Name: "Twist Matcha Latte",
          Price: { hotPrice: 110 },
          DrinkType: "Hot",
          img_src: "twist matcha latte.png",
          Tag: ["Matcha", "Milk", "Recommend Menu", "Nutty", "Umami"]
        },
        {
          Drink_ID: 117,
          Drink_Name: "Twist Matcha Latte",
          Price: { coldPrice: 120 },
          DrinkType: "Cold",
          img_src: "twist matcha latte.png",
          Tag: ["Matcha", "Milk", "Recommend Menu", "Nutty", "Umami"]
        },
        {
          Drink_ID: 118,
          Drink_Name: "Caramel Fresh Milk",
          Price: { hotPrice: 45 },
          DrinkType: "Hot",
          img_src: "caramel fresh milk.png",
          Tag: ["Non-Coffee", "Milk"]
        },
        {
          Drink_ID: 119,
          Drink_Name: "Caramel Fresh Milk",
          Price: { coldPrice: 50 },
          DrinkType: "Cold",
          img_src: "caramel fresh milk.png",
          Tag: ["Non-Coffee", "Milk"]
        },
        {
          Drink_ID: 120,
          Drink_Name: "Pinky Milk",
          Price: { hotPrice: 45 },
          DrinkType: "Hot",
          img_src: "",
          Tag: ["Non-Coffee", "Milk", "Pinky"]
        },
        {
          Drink_ID: 121,
          Drink_Name: "Pinky Milk",
          Price: { coldPrice: 50 },
          DrinkType: "Cold",
          img_src: "",
          Tag: ["Non-Coffee", "Milk", "Pinky"]
        },
        {
          Drink_ID: 122,
          Drink_Name: "Black Tea",
          Price: { hotPrice: 50 },
          DrinkType: "Hot",
          img_src: "",
          Tag: ["Non-Coffee", "Milk", "Tea"]
        },
        {
          Drink_ID: 123,
          Drink_Name: "Black Tea",
          Price: { coldPrice: 55 },
          DrinkType: "Cold",
          img_src: "",
          Tag: ["Non-Coffee", "Milk", "Tea"]
        },
        {
          Drink_ID: 124,
          Drink_Name: "Cocoa",
          Price: { hotPrice: 55 },
          DrinkType: "Hot",
          img_src: "cocoa.png",
          Tag: ["Non-Coffee", "Milk", "Cocoa"]
        },
        {
          Drink_ID: 125,
          Drink_Name: "Cocoa",
          Price: { coldPrice: 60 },
          DrinkType: "Cold",
          img_src: "cocoa.png",
          Tag: ["Non-Coffee", "Milk", "Cocoa"]
        },
        {
          Drink_ID: 126,
          Drink_Name: "Thai Milk Tea",
          Price: { hotPrice: 55 },
          DrinkType: "Hot",
          img_src: "thai milk tea.png",
          Tag: ["Non-Coffee", "Milk", "Tea"]
        },
        {
          Drink_ID: 127,
          Drink_Name: "Thai Milk Tea",
          Price: { coldPrice: 60 },
          DrinkType: "Cold",
          img_src: "thai milk tea.png",
          Tag: ["Non-Coffee", "Milk", "Tea"]
        },
        {
          Drink_ID: 128,
          Drink_Name: "Assam Black Milk Tea",
          Price: { hotPrice: 60, coldPrice: 60 },
          DrinkType: "Hot/Cold",
          img_src: "",
          Tag: ["Non-Coffee", "Milk", "Tea"]
        },
        {
          Drink_ID: 129,
          Drink_Name: "Whipped Cheese Thai Tea",
          Price: { coldPrice: 85 },
          DrinkType: "Cold",
          img_src: "",
          Tag: ["Non-Coffee", "Milk", "Tea"]
        },
        {
          Drink_ID: 130,
          Drink_Name: "Orange Juice",
          Price: { coldPrice: 45 },
          DrinkType: "Cold",
          img_src: "orange juice.png",
          Tag: ["Non-Coffee", "Juice"]
        },
        {
          Drink_ID: 131,
          Drink_Name: "Lemon Thai Tea",
          Price: { coldPrice: 55 },
          DrinkType: "Cold",
          img_src: "",
          Tag: ["Non-Coffee", "Tea"]
        },
        {
          Drink_ID: 132,
          Drink_Name: "Honey Lemonade",
          Price: { coldPrice: 55 },
          DrinkType: "Cold",
          img_src: "",
          Tag: ["Non-Coffee", "Lemonade"]
        },
        {
          Drink_ID: 133,
          Drink_Name: "Red Lemon Soda",
          Price: { coldPrice: 55 },
          DrinkType: "Cold",
          img_src: "",
          Tag: ["Non-Coffee", "Soda"]
        },
        {
          Drink_ID: 134,
          Drink_Name: "Honey Yuzu Soda",
          Price: { coldPrice: 60 },
          DrinkType: "Cold",
          img_src: "",
          Tag: ["Non-Coffee", "Soda", "Yuzu"]
        },
        {
          Drink_ID: 135,
          Drink_Name: "Breezy Rose",
          Price: { coldPrice: 60 },
          DrinkType: "Cold",
          img_src: "",
          Tag: ["Non-Coffee", "Rose"]
        },
        {
          Drink_ID: 136,
          Drink_Name: "Plum Lemon Soda",
          Price: { coldPrice: 60 },
          DrinkType: "Cold",
          img_src: "",
          Tag: ["Non-Coffee", "Soda", "Plum"]
        },
        {
          Drink_ID: 137,
          Drink_Name: "Craft Cola",
          Price: { coldPrice: 60 },
          DrinkType: "Cold",
          img_src: "",
          Tag: ["Non-Coffee", "Cola"]
        },
        {
          Drink_ID: 138,
          Drink_Name: "Fruit Sunshine Tea",
          Price: { coldPrice: 70 },
          DrinkType: "Cold",
          img_src: "",
          Tag: ["Non-Coffee", "Tea", "Fruit"]
        },
        {
          Drink_ID: 139,
          Drink_Name: "Water",
          Price: { coldPrice: 10 },
          DrinkType: "",
          img_src: "water.png",
          Tag: ["Water"]
        },
        {
          Drink_ID: 140,
          Drink_Name: "Coke",
          Price: { coldPrice: 18 },
          DrinkType: "",
          img_src: "",
          Tag: ["Soft Drink"]
        }
      ]
      
    );

    console.log(`Collection '${collectionName}' created.`);
  } else {
    console.log(`Collection '${collectionName}' already exists.`);
  }
}

module.exports = initializeBeverageCollectionIfNotExist;
