const express = require('express');
const User = require('../models/user');
const { console } = require('inspector');

const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { name, email, age, mob } = req.body;
    const user = await User.create({ name, email, age, mob });
    res.status(201).json(user);
    console.log(name,email,age,mob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 