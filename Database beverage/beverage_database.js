const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = "beverageDB";
const collectionName = "beverage";

async function createDrinksCollectionIfNotExist() {
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
            Drink_Name: "Clear Matcha",
            Price: 60,
            DrinkType: "HOT",
            img_src:"",
            Tag: [
              "Matcha (Ceremonial Grade) ",
              "Milk"
            ]
          },
          {
            Drink_Name: "Clear Matcha",
            Price: 65,
            DrinkType: "COLD",
            img_src:"",
            Tag: [
              "Matcha (Ceremonial Grade) ",
              "Milk"
            ]
          },
          {
            Drink_Name: "Matcha Latte",
            Price: 65,
            DrinkType: "HOT",
            img_src:"",
            Tag: [
              "Matcha (Ceremonial Grade) ",
              "Milk"
            ]
          },
          {
            Drink_Name: "Orange Matcha",
            Price: 70,
            DrinkType: "COLD",
            img_src:"",
            Tag: [
              "Matcha (Ceremonial Grade) ",
              "Milk",
              "Recommend Menu"
            ]
          },
          {
            Drink_Name: "Coconut Flower Matcha",
            Price: 90,
            DrinkType: "COLD",
            img_src:"",
            Tag: [
              "Matcha (Ceremonial Grade) ",
              "Milk",
              "Recommend Menu"
            ]
          },
          {
            Drink_Name: "Premium Matcha Latte",
            Price: 85,
            DrinkType: "HOT",
            img_src:"",
            Tag: [
              "Matcha (Ceremonial Grade) ",
              "Milk",
              "Recommend Menu",
              "Nutty",
              "Umami"
            ]
          },
          {
            Drink_Name: "Premium Matcha Latte",
            Price: 90,
            DrinkType: "COLD",
            img_src:"",
            Tag: [
              "Matcha (Ceremonial Grade) ",
              "Milk",
              "Recommend Menu",
              "Nutty",
              "Umami"
            ]
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
  
  createDrinksCollectionIfNotExist();
  
  app.get("/beverage", async (req, res) => {
    try {
      await client.connect();
      const db = client.db(dbName);
  
      const drinkName = req.query.name; // Get the drink name from query parameters
  
      let query = {};
      if (drinkName) {
        query.Drink_Name = drinkName;
      }
  
      const drinks = await db.collection(collectionName).find(query).toArray();
  
      res.status(200).json(drinks);
    } catch (err) {
      console.error("Error fetching drinks:", err);
      res.status(500).json({ error: "An error occurred while fetching drinks" });
    } finally {
      await client.close();
    }
  });

  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
