const dbName = "BashCoffeeDB";
const collectionName = "bakery";

// Function to create the Baker collection if it doesn't exist
async function initializbakeryCollectionIfNotExist(client) {
  const db = client.db(dbName);
  const collections = await db.listCollections({ name: collectionName }).toArray();

    // If the collection does not exist, create it
    if (collections.length === 0) {
      await db.createCollection('bakery');

      // Insert some data
      await db.collection('bakery').insertMany([
        {
          Bakery_Name: "PlainCroissant",
          Price: 45,
          image_src: "/images/cro.png",
          tag: ["croissant", "bakery"]
        },
        {
          Bakery_Name: "ChocolateCroissant",
          Price: 50,
          image_src: "/images/chocolate.png",
          tag: ["croissant", "chocolate", "bakery", "sweet"]
        },
        {
          Bakery_Name: "NutellaCroissant",
          Price: 65,
          image_src: "/images/nutella.png",
          tag: ["croissant", "nutella", "bakery", "chocolate", "sweet"]
        },
        {
          Bakery_Name: "CreamCheeseDanish",
          Price: 50,
          image_src: "/images/creamcheese.png",
          tag: ["danish", "cream cheese", "bakery", "cheese"]
        },
        {
          Bakery_Name: "Donut",
          Price: 50,
          image_src: "/images/donut.png",
          tag: ["donut", "bakery", "sweet"]
        }
      ]);

      console.log(`Collection 'bakery' created with initial bakery items.`);
    } else {
      console.log(`Collection 'bakery' already exists.`);
    }
}

module.exports = initializbakeryCollectionIfNotExist;
