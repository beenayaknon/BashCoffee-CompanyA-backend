const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;
app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = "BashCoffeeDB"; // Define your database name here
let db; // Initialize a variable to hold the database reference

// Import the beverage, member, and promotion collection initializers
const initializeBeverageCollectionIfNotExist = require("./Database beverage/beverage");
const initializeMemberCollectionIfNotExist = require("./Database member/member");
const initializePromotionCollectionIfNotExist = require("./Database promotion/promotion.js");
const initializbakeryCollectionIfNotExist = require("./Database bakery/bakery.js");
// Function to initialize all collections
async function initializeCollections() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    db = client.db(dbName); // Assign the database reference
    // Initialize collections
    await initializeBeverageCollectionIfNotExist(client);
    await initializeMemberCollectionIfNotExist(client);
    await initializePromotionCollectionIfNotExist(client);
    await initializbakeryCollectionIfNotExist(client);
  } catch (err) {
    console.error("Error initializing collections:", err);
  }
}

// Call initializeCollections when the server starts
initializeCollections();

// Define beverage routes
app.get("/beverages", async (req, res) => {
  try {
    const drinkName = req.query.name; // Get drink name from query parameters
    const drinkType = req.query.type; // Get drink type from query parameters

    let query = {};
    if (drinkName) {
      query.Drink_Name = drinkName;
    }
    if (drinkType) {
      query.DrinkType = drinkType;
    }

    const drinks = await db.collection("beverage").find(query).toArray();
    res.status(200).json(drinks);
  } catch (err) {
    console.error("Error fetching drinks:", err);
    res.status(500).json({ error: "An error occurred while fetching drinks" });
  }
});

// Define beverage routes
app.get("/beverage/:name", async (req, res) => {
    try {
      const drinkName = req.params.name; // Get drink name from URL parameter
      const drinkType = req.query.type; // Get drink type from query parameters
  
      // Create query object
      let query = { Drink_Name: drinkName }; // Filter by drink name
      if (drinkType) {
        query.DrinkType = drinkType; // Add drink type filter if provided
      }
  
      const drinks = await db.collection("beverage").find(query).toArray();
      
      // Check if any drinks were found
      if (drinks.length > 0) {
        res.status(200).json(drinks); // Return found drinks
      } else {
        res.status(404).json({ error: "No drinks found matching the criteria" }); // Return 404 if no drinks found
      }
    } catch (err) {
      console.error("Error fetching drinks:", err);
      res.status(500).json({ error: "An error occurred while fetching drinks" });
    }
  });
  

// Member routes (same pattern as above, but with the connection established)
app.get("/members", async (req, res) => {
  try {
    const members = await db.collection("member").find({}).toArray();
    res.status(200).json(members);
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ error: "An error occurred while fetching members" });
  }
});

app.get("/member/:tel", async (req, res) => {
  const { tel } = req.params;

  try {
    const member = await db.collection("member").findOne({ Tel: tel });

    if (member) {
      res.status(200).json(member);
    } else {
      res.status(404).json({ error: "Member not found" });
    }
  } catch (err) {
    console.error("Error fetching member by phone number:", err);
    res.status(500).json({ error: "An error occurred while fetching the member" });
  }
});

// Add a new member
app.post("/member", async (req, res) => {
  const { Mname, Tel } = req.body;

  if (!Mname || !Tel) {
    return res.status(400).json({ error: "All member fields are required" });
  }

  try {
    const existingMember = await db.collection("member").findOne({ Tel });

    if (existingMember) {
      return res.status(409).json({ error: "Member with this phone number already exists" });
    }

    const lastMember = await db.collection("member")
      .find({})
      .sort({ MID: -1 })
      .limit(1)
      .toArray();

    const MID = lastMember.length > 0 ? lastMember[0].MID + 1 : 0; 
    const Points = 0;

    const newMember = { MID, Mname, Tel, Points };
    await db.collection("member").insertOne(newMember);
    res.status(201).json(newMember);
  } catch (err) {
    console.error("Error adding new member:", err);
    res.status(500).json({ error: "An error occurred while adding the member" });
  }
});

// Promotions endpoints
app.get("/promotions", async (req, res) => {
  try {
    const promotions = await db.collection("Promotion").find({}).toArray();
    res.status(200).json(promotions);
  } catch (err) {
    console.error("Error fetching promotions:", err);
    res.status(500).json({ error: "An error occurred while fetching promotions" });
  }
});

app.post("/promotions", async (req, res) => {
  try {
    const newPromotion = req.body;
    if (!newPromotion.Pro_ID || !newPromotion.Promo_Description) {
      return res.status(400).json({ error: "Pro_ID and Promo_Description are required fields." });
    }

    await db.collection("Promotion").insertOne(newPromotion);
    res.status(201).json(newPromotion);
  } catch (err) {
    console.error("Error creating promotion:", err);
    res.status(500).json({ error: "An error occurred while creating the promotion" });
  }
});

// Endpoint to delete a promotion by Pro_ID
app.delete("/promotions/:Pro_ID", async (req, res) => {
    const { Pro_ID } = req.params; // Get the Pro_ID from request parameters
  
    try {
      const result = await db.collection("Promotion").deleteOne({ Pro_ID }); // Delete promotion by Pro_ID
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Promotion not found" }); // Send error if promotion not found
      }
  
      res.sendStatus(204); // Send no content response after successful deletion
    } catch (err) {
      console.error("Error deleting promotion:", err); // Log error
      res.status(500).json({ error: "An error occurred while deleting the promotion" }); // Send error response
    }
  });

// GET method to fetch all bakery items
app.get('/bakery', async (req, res) => {
    try {
      const tagQuery = req.query.tag; // Get the tag query parameter
      const filter = tagQuery ? { tag: { $in: [tagQuery] }} : {}; // Create filter based on the tag query
  
      console.log("Filter being used:", filter); // Log the filter being used
  
      const items = await db.collection("bakery").find(filter).toArray(); // Fetch items from the bakery collection
      console.log("Items found:", items); // Log the found items
  
      res.status(200).json(items); // Return data as JSON
    } catch (err) {
      console.error('Error fetching bakery items:', err); // Log any errors
      res.status(500).json({ error: 'Error occurred' }); // Return a 500 error response
    }
  });
  
  // GET method to fetch bakery item by name
  app.get('/bakery/:name', async (req, res) => {
    try {
      const bakeryName = req.params.name; // Get the bakery name from the URL parameter
      const item = await db.collection("bakery").findOne({ Bakery_Name: bakeryName }); // Fetch the bakery item by name
      console.log("Item found:", item); // Log the found item
  
      if (item) {
        res.status(200).json(item); // Return the bakery item if found
      } else {
        res.status(404).json({ error: 'Bakery item not found' }); // Return a 404 if not found
      }
    } catch (err) {
      console.error('Error fetching bakery item by name:', err); // Log any errors
      res.status(500).json({ error: 'Error occurred' }); // Return a 500 error response
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
