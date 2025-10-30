const Author = require('./Author');
const Book = require('./Book');
const sequelize = require('../config/database');

// TODO: Set up relationships
// Author hasMany Books (with cascade delete)
// Book belongsTo Author

module.exports = {
  Author,
  Book,
  sequelize,
};
