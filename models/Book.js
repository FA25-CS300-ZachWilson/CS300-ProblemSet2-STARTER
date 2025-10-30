const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// TODO: Define Book model
// Fields: id (PK, auto-increment), title (required, max 200), isbn (required, unique, 13 chars),
//         publishedYear (optional), authorId (FK to Author)

const Book = sequelize.define('Book', {
  // TODO: Add fields
  
}, {
  tableName: 'books',
  timestamps: true,
});

module.exports = Book;
