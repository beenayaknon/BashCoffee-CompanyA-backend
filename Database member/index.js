const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = "BashCoffee";
const collectionName = "Member";

async function createMemberCollectionIfNotExist() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db(dbName);
    const collections = await db
      .listCollections({ name: collectionName })
      .toArray();

    if (collections.length === 0) {
      await db.createCollection(collectionName);

      await db.collection(collectionName).insertMany([
        {
          MID: 0,
          Mname: "Thanat Phi",
          Tel: "0625916127",
          Points: 999,
        },
        {
          MID: 1,
          Mname: "PhiPhi nat",
          Tel: "0123456789",
          Points: 3,
        },
        {
          MID: 2,
          Mname: "Thanatos Thanat",
          Tel: "1234567890",
          Points: 4,
        },
        {
          MID: 3,
          Mname: "Phi Phinat",
          Tel: "0987654321",
          Points: 5,
        },
      ]);

      console.log(`Collection '${collectionName}' created.`);
    } else {
      console.log(`Collection '${collectionName}' already exists.`);
    }
  } catch (err) {
    console.error("Error creating collection:", err);
  } finally {
    await client.close();
  }
}

createMemberCollectionIfNotExist();

app.get("/members", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const members = await db.collection(collectionName).find({}).toArray();

    // console.log(members)

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
    await client.connect();
    const db = client.db(dbName);
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
    await client.connect();
    const db = client.db(dbName);
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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
