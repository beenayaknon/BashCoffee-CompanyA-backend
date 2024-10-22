const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

// MongoDB connection URI
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Define the database and collection names
const dbName = "BashCoffee";
const collectionName = "Promotion";

app.use(express.json()); // Middleware to parse incoming JSON requests

// Function to create the Promotion collection if it doesn't exist
async function createPromotionCollectionIfNotExist() {
  const client = new MongoClient(uri); // Create a new MongoDB client

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db(dbName);
    // Check if the collection already exists
    const collections = await db
      .listCollections({ name: collectionName })
      .toArray();

    // If the collection does not exist, create it
    if (collections.length === 0) {
      await db.createCollection(collectionName);

      // Insert some initial data into the collection
      await db.collection(collectionName).insertMany([
        {
          Pro_ID: "001",
          Promo_Description: "Buy 1 Get 1 Free",
          start_date: new Date("2024-01-01"),
          expiry_date: new Date("2024-12-31"),
        },
        {
          Pro_ID: "002",
          Promo_Description: "20% Off",
          start_date: new Date("2024-05-01"),
          expiry_date: new Date("2024-06-30"),
        },
        {
          Pro_ID: "003",
          Promo_Description: "Free Coffee on Fridays",
          start_date: new Date("2024-07-01"),
          expiry_date: new Date("2024-12-31"),
        },
      ]);

      console.log(`Collection '${collectionName}' created.`);
    } else {
      console.log(`Collection '${collectionName}' already exists.`);
    }
  } catch (err) {
    console.error("Error creating collection:", err); // Handle any errors
  } finally {
    await client.close(); // Close the MongoDB connection
  }
}

// Call the function to check and create the collection
createPromotionCollectionIfNotExist();

// Endpoint to get all promotions
app.get("/promotions", async (req, res) => {
  try {
    await client.connect(); // Connect to MongoDB
    const db = client.db(dbName);
    const promotions = await db.collection(collectionName).find({}).toArray(); // Fetch all promotions

    res.status(200).json(promotions); // Send promotions data as response
  } catch (err) {
    console.error("Error fetching promotions:", err); // Log error
    res.status(500).json({ error: "An error occurred while fetching promotions" }); // Send error response
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});

// Endpoint to create a new promotion
app.post("/promotions", async (req, res) => {
  try {
    const newPromotion = req.body; // Get the new promotion data from request body
    // Validate the incoming promotion data
    if (!newPromotion.Pro_ID || !newPromotion.Promo_Description || !newPromotion.start_date || !newPromotion.expiry_date) {
      return res.status(400).json({ error: "All fields are required: Pro_ID, Promo_Description, start_date, expiry_date" });
    }

    await client.connect(); // Connect to MongoDB
    const db = client.db(dbName);
    await db.collection(collectionName).insertOne(newPromotion); // Insert the new promotion into the collection

    res.status(201).json(newPromotion); // Send the created promotion as response
  } catch (err) {
    console.error("Error creating promotion:", err); // Log error
    res.status(500).json({ error: "An error occurred while creating the promotion" }); // Send error response
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});

// Endpoint to get a promotion by Pro_ID
app.get("/promotions/:Pro_ID", async (req, res) => {
  try {
    await client.connect(); // Connect to MongoDB
    const db = client.db(dbName);
    const promotion = await db.collection(collectionName).findOne({ Pro_ID: req.params.Pro_ID }); // Find promotion by Pro_ID

    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" }); // Send error if promotion not found
    }

    res.status(200).json(promotion); // Send the found promotion as response
  } catch (err) {
    console.error("Error fetching promotion:", err); // Log error
    res.status(500).json({ error: "An error occurred while fetching the promotion" }); // Send error response
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});

// Endpoint to update a promotion by Pro_ID
app.put("/promotions/:Pro_ID", async (req, res) => {
  try {
    const updatedPromotion = req.body; // Get the updated promotion data from request body
    // Validate the incoming promotion data
    if (!updatedPromotion.Pro_ID || !updatedPromotion.Promo_Description || !updatedPromotion.start_date || !updatedPromotion.expiry_date) {
      return res.status(400).json({ error: "All fields are required: Pro_ID, Promo_Description, start_date, expiry_date" });
    }

    await client.connect(); // Connect to MongoDB
    const db = client.db(dbName);
    const result = await db.collection(collectionName).updateOne(
      { Pro_ID: req.params.Pro_ID }, // Find promotion by Pro_ID
      { $set: updatedPromotion } // Update promotion with new data
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Promotion not found" }); // Send error if promotion not found
    }

    res.status(200).json(updatedPromotion); // Send the updated promotion as response
  } catch (err) {
    console.error("Error updating promotion:", err); // Log error
    res.status(500).json({ error: "An error occurred while updating the promotion" }); // Send error response
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});

// Endpoint to delete a promotion by Pro_ID
app.delete("/promotions/:Pro_ID", async (req, res) => {
  try {
    await client.connect(); // Connect to MongoDB
    const db = client.db(dbName);
    const result = await db.collection(collectionName).deleteOne({ Pro_ID: req.params.Pro_ID }); // Delete promotion by Pro_ID

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Promotion not found" }); // Send error if promotion not found
    }

    res.sendStatus(204); // Send no content response after successful deletion
  } catch (err) {
    console.error("Error deleting promotion:", err); // Log error
    res.status(500).json({ error: "An error occurred while deleting the promotion" }); // Send error response
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log that the server is running
});
