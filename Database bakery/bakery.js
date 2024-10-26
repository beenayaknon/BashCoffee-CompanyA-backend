const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = 'mongodb://127.0.0.1:27017'; 
const dbName = 'Bakery'; 
let bakCollection;

app.use('/images', express.static('resource'));

// Function to create the Baker collection if it doesn't exist
async function createBakerCollectionIfNotExist() {
  const client = new MongoClient(uri);

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
    bakCollection = db.collection('bakery'); // Assign the collection to bakCollection

  } catch (err) {
    console.error("Error creating collection:", err); // Handle any errors
  }
}

// GET method to fetch all bakery items
app.get('/bakery', async (req, res) => {
  try {
    const tagQuery = req.query.tag;
    const filter = tagQuery ? { tag: { $in: [tagQuery] }} : {};

    console.log("Filter being used:", filter);

    const items = await bakCollection.find(filter).toArray();
    console.log("Items found:", items);

    res.status(200).json(items); // Return data as JSON
  } catch (err) {
    console.error('Error fetching bakery items:', err);
    res.status(500).json({ error: 'Error occurred' });
  }
});

// GET method to fetch bakery item by name
app.get('/bakery/:name', async (req, res) => {
  try {
    const bakeryName = req.params.name; // Get the bakery name from the URL parameter
    const item = await bakCollection.findOne({ Bakery_Name: bakeryName }); // Fetch the bakery item by name
    console.log("Items found:", item);

    if (item) {
      res.status(200).json(item); // Return the bakery item if found
    } else {
      res.status(404).json({ error: 'Bakery item not found' }); // Return a 404 if not found
    }
  } catch (err) {
    console.error('Error fetching bakery item by name:', err);
    res.status(500).json({ error: 'Error occurred' });
  }
});

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await createBakerCollectionIfNotExist();
});
