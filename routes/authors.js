const express = require('express');
const router = express.Router();
const { Author, Book } = require('../models');

// GET /api/authors
// TODO: Get all authors
router.get('/', async (req, res) => {
  try {
    // TODO: Implement
    res.json({ message: 'Not implemented yet' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/authors/:id
// TODO: Get single author with their books
router.get('/:id', async (req, res) => {
  try {
    // TODO: Implement (include books)
    res.json({ message: 'Not implemented yet' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/authors
// TODO: Create new author (check email is unique)
router.post('/', async (req, res) => {
  try {
    // TODO: Implement
    res.status(201).json({ message: 'Not implemented yet' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/authors/:id
// TODO: Update author
router.put('/:id', async (req, res) => {
  try {
    // TODO: Implement
    res.json({ message: 'Not implemented yet' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/authors/:id
// TODO: Delete author (BONUS: cascade deletes books if relationships set up)
router.delete('/:id', async (req, res) => {
  try {
    // TODO: Implement (return 204)
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/authors/:authorId/books
// TODO: Get all books for a specific author
router.get('/:authorId/books', async (req, res) => {
  try {
    // TODO: Implement
    res.json({ message: 'Not implemented yet' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/authors/:authorId/books
// TODO: Create book for specific author (BONUS: validate authorId exists)
router.post('/:authorId/books', async (req, res) => {
  try {
    // TODO: Implement
    res.status(201).json({ message: 'Not implemented yet' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
