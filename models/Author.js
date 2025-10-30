const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// TODO: Define Author model
// Fields: id (PK, auto-increment), name (required, max 100), email (required, unique, valid email), 
//         bio (optional), birthYear (optional, 1900-2024)

const Author = sequelize.define('Author', {
  // TODO: Add fields
  
}, {
  tableName: 'authors',
  timestamps: true,
});

module.exports = Author;
