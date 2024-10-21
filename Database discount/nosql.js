const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// MongoDB model for Promotion
const Promotion = mongoose.model('Promotion', {
  Pro_ID: String,
  Promo_Description: String,
  start_date: Date,
  expiry_date: Date,
});

// Validation function to check for required fields
const validatePromotion = (body) => {
  const { Pro_ID, Promo_Description, start_date, expiry_date } = body;
  if (!Pro_ID || !Promo_Description || !start_date || !expiry_date) {
    return false;
  }
  return true;
};

// MongoDB CRUD routes

// Create a new promotion with validation
router.post('/promotions', async (req, res) => {
  if (!validatePromotion(req.body)) {
    return res.status(400).send({ error: 'All fields are required: Pro_ID, Promo_Description, start_date, expiry_date' });
  }
  const promotion = new Promotion(req.body);
  await promotion.save();
  res.send(promotion);
});

// Get all promotions
router.get('/promotions', async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.send(promotions);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching promotions' });
  }
});

// Get a promotion by Pro_ID
router.get('/promotions/:Pro_ID', async (req, res) => {
  try {
    const promotion = await Promotion.findOne({ Pro_ID: req.params.Pro_ID });
    if (!promotion) {
      return res.status(404).send({ message: 'Promotion not found' });
    }
    res.send(promotion);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching promotion' });
  }
});

// Update a promotion by Pro_ID with validation
router.put('/promotions/:Pro_ID', async (req, res) => {
  if (!validatePromotion(req.body)) {
    return res.status(400).send({ error: 'All fields are required: Pro_ID, Promo_Description, start_date, expiry_date' });
  }
  try {
    const promotion = await Promotion.findOneAndUpdate({ Pro_ID: req.params.Pro_ID }, req.body, {
      new: true,
    });
    if (!promotion) {
      return res.status(404).send({ message: 'Promotion not found' });
    }
    res.send(promotion);
  } catch (error) {
    res.status(500).send({ error: 'Error updating promotion' });
  }
});

// Delete a promotion by Pro_ID
router.delete('/promotions/:Pro_ID', async (req, res) => {
  try {
    const promotion = await Promotion.findOneAndDelete({ Pro_ID: req.params.Pro_ID });
    if (!promotion) {
      return res.status(404).send({ message: 'Promotion not found' });
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ error: 'Error deleting promotion' });
  }
});

module.exports = router;