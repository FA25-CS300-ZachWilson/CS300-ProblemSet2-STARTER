const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Author, Book } = require('../models');

// GET /api/books
// TODO: Get all books with author info
// HINT: ?year=2020 and ?author=Smith
router.get('/', async (req, res) => {
  try {
    // TODO: Implement (include author, handle year/author filters)
    res.json({ message: 'Not implemented yet' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/books/:id
// TODO: Get single book with author details
router.get('/:id', async (req, res) => {
  try {
    // TODO: Implement (include author)
    res.json({ message: 'Not implemented yet' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/books
// TODO: Create new book (validate authorId exists)
router.post('/', async (req, res) => {
  try {
    // TODO: Implement
    res.status(201).json({ message: 'Not implemented yet' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
