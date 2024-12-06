const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config');
const User = require('./models/user');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;


// Set up middleware
app.use(express.json());

// Create Sequelize instance
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});


// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully!'))
  .catch(err => console.error('Unable to connect to the database:', err));


  sequelize.sync()
  .then(() => console.log('Models synced successfully'))
  .catch((err) => console.error('Error syncing models:', err));

  // Use the user routes
app.use('/api', userRoutes);





// Start Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
