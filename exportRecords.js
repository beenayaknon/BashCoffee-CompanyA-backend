//install first --> 1.npm install json2csv mongodb
// 2.npm install csv-writer



const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path'); // Import the 'path' module
const express = require("express");
const cors = require("cors");
const { Timestamp } = require("mongodb");

const app = express();
const port = 3030;
app.use(express.json());
app.use(cors());
const csvWriter = require('csv-writer').createObjectCsvWriter;

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = 'BashCoffeeDB';
const collectionName = 'record';

async function exportRecordsToCSV() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Fetch records from the collection
        const records = await collection.find({}).toArray();

        if (records.length === 0) {
            console.log('No records found in the database.');
            return;
        }

        // Prepare CSV writer
        const csvFilePath = path.join(__dirname, 'records.csv'); // Use 'path' here
        const writer = csvWriter({
            path: csvFilePath,
            header: [
                { id: '_id', title: 'ID' },
                { id: 'Customer', title: 'Customer' },
                { id: 'Tel', title: 'Telephone' },
                { id: 'Menu', title: 'Menu' },
                { id: 'promotion', title: 'Promotion' },
                { id: 'totalPrice', title: 'Total Price' },
                { id: 'date', title: 'Date' },
            ],
        });

        // Write records to CSV
        await writer.writeRecords(records);
        console.log(`Records successfully exported to ${csvFilePath}`);
    } catch (error) {
        console.error('Error exporting records:', error);
    } finally {
        await client.close();
    }
}

exportRecordsToCSV();
