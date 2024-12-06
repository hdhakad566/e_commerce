const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(require('../config/config')); // Correct the path to the config.js file

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mob: {
    type: DataTypes.BIGINT, // Use BIGINT for mobile numbers
    allowNull: false,
    unique: true,
  },
  password: {  // Add the password field here
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
