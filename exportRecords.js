const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-writer').createObjectCsvWriter;

const uri = 'your_mongodb_connection_string'; // Update this with your MongoDB connection string
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
        const csvFilePath = path.join(__dirname, 'records.csv');
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
