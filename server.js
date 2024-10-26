const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;
app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = "BashCoffeeDB"; // Define your database name here
let db; // Initialize a variable to hold the database reference

// Import the beverage collection initializer
const initializeBeverageCollection = require("./Database beverage/beverage");
const initializeMemberCollectionIfNotExist = require("./Database member/member")
// Function to initialize all collections
async function initializeCollections() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    db = client.db(dbName); // Assign the database reference
    // Initialize beverage collection
    await initializeBeverageCollection(client);
    // Initialize member collection
    await initializeMemberCollectionIfNotExist(client);
    // Add any additional collection initializers here if needed
  } catch (err) {
    console.error("Error initializing collections:", err);
  }
}

// Call initializeCollections when the server starts
initializeCollections();

// Define beverage routes
app.get("/beverage", async (req, res) => {
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

app.get("/members", async (req, res) => {
    try {

      const members = await db.collection("member").find({}).toArray();
    //   console.log(members)
  
      res.status(200).json(members);
    } catch (err) {
      console.error("Error fetching members:", err);
      res.status(500).json({ error: "An error occurred while fetching members" });
    } finally {
      await client.close();
    }
  });
  
  app.get("/member/:tel", async (req, res) => {
    const { tel } = req.params;
  
    try {
      const member = await db.collection(collectionName).findOne({ Tel: tel });
  
      if (member) {
        res.status(200).json(member);
      } else {
        res.status(404).json({ error: "Member not found" });
      }
    } catch (err) {
      console.error("Error fetching member by phone number:", err);
      res.status(500).json({ error: "An error occurred while fetching the member" });
    } finally {
      await client.close();
    }
  });
  
  // Add a new member
  app.post("/member", async (req, res) => {
    const { Mname, Tel } = req.body;
  
    if (!Mname || !Tel) {
      return res.status(400).json({ error: "All member fields are required" });
    }
  
    try {
      const existingMember = await db.collection(collectionName).findOne({ Tel });
  
      if (existingMember) {
        return res.status(409).json({ error: "Member with this phone number already exists" });
      }
  
      const lastMember = await db.collection(collectionName)
        .find({})
        .sort({ MID: -1 })
        .limit(1)
        .toArray();
  
      const MID = lastMember.length > 0 ? lastMember[0].MID + 1 : 0; 
      const Points = 0;
  
      const newMember = { MID, Mname, Tel, Points };
      await db.collection(collectionName).insertOne(newMember);
      res.status(201).json(newMember);
    } catch (err) {
      console.error("Error adding new member:", err);
      res.status(500).json({ error: "An error occurred while adding the member" });
    } finally {
      await client.close();
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
