const express = require('express');
const User = require('../models/user');  // Import the user model
const bcrypt = require('bcryptjs');      // Import bcryptjs for password hashing

const router = express.Router();

// Create a new user (Sign-up)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, age, mob, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !age || !mob || !password) {
      return res.status(400).json({ error: 'All fields (name, email, age, mob, password) are required.' });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    // Check if the mobile number already exists
    const existingMobile = await User.findOne({ where: { mob } });
    if (existingMobile) {
      return res.status(400).json({ error: 'Mobile number already in use.' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user in the database (password is now hashed)
    const user = await User.create({ 
      name, 
      email, 
      age, 
      mob, 
      password: hashedPassword 
    });

    // Send the created user as a response (excluding the password)
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      mob: user.mob,
    };

    res.status(201).json(userResponse);
  } catch (error) {
    console.error('Error during user creation:', error);
    res.status(400).json({ error: error.message });
  }
});

//login route in which this is checking entered pass with stored pass 
router.post('/login', async (req, res) => {
          try {
            const { email, password } = req.body;
        
            // Check if email and password are provided
            if (!email || !password) {
              return res.status(400).json({ error: 'Email and password are required.' });
            }
        
            // Find user by email
            const user = await User.findOne({ where: { email } });
            if (!user) {
              return res.status(404).json({ error: 'User not found.' });
            }
        
            // Compare the provided password with the stored password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
              return res.status(400).json({ error: 'Invalid password.' });
            }
        
            // Send successful response with user data (without password)
            const userResponse = {
              id: user.id,
              name: user.name,
              email: user.email,
              age: user.age,
              mob: user.mob,
            };
        
            res.status(200).json({ message: 'Login successful', user: userResponse });
        
          } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Server error' });
          }
        });

module.exports = router;
