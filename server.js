const express = require('express');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/authors', require('./routes/authors'));
app.use('/api/books', require('./routes/books'));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Library Management System API' });
});

// Initialize database and start server
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connected.');

    // Sync database models
    // Use { force: true } to drop tables on restart (dev only!)
    await sequelize.sync({ alter: true });
    console.log('Database models synced.');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`API: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();

