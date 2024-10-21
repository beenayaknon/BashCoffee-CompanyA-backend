require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const nosqlRouter = require('./nosql');

const app = express();

// Connect to noSQL MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Middleware
app.use(express.json());

// Mount noSQL router
app.use('/nosql', nosqlRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});