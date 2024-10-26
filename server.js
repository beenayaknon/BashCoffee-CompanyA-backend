const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;
app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const initializeBeverageCollection = require("./collections/beverage");
const initializeMemberCollection = require("./collections/member");

async function initializeCollections() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");

        // Initialize each collection
        await initializeBeverageCollection(client);
        await initializeMemberCollection(client);
    } catch (err) {
        console.error("Error initializing collections:", err);
    }
}

initializeCollections();

// Routes for beverages
app.get("/beverages", async (req, res) => {
    try {
        const db = client.db("BashCoffee");
        const drinks = await db.collection("beverage").find({}).toArray();
        res.status(200).json(drinks);
    } catch (err) {
        console.error("Error fetching beverages:", err);
        res.status(500).json({ error: "An error occurred while fetching beverages" });
    }
});

// Routes for members
app.get("/members", async (req, res) => {
    try {
        const db = client.db("BashCoffee");
        const members = await db.collection("member").find({}).toArray();
        res.status(200).json(members);
    } catch (err) {
        console.error("Error fetching members:", err);
        res.status(500).json({ error: "An error occurred while fetching members" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
