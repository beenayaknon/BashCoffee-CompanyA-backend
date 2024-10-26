const dbName = "BashCoffeeDB";
const collectionName = "beverage";

// Function to create the Baker collection if it doesn't exist
async function createBakerCollectionIfNotExist() {

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db(dbName);

    // Check if the collection already exists
    const collections = await db.listCollections({ name: 'bakery' }).toArray();

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

  } catch (err) {
    console.error("Error creating collection:", err); // Handle any errors
  } finally {
    await client.close(); // Close the connection
  }
}

module.exports = createBakerCollectionIfNotExist;
