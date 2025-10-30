# CS300 - Problem Set 2: Library System with ORM Relationships

## Assignment Overview

Build a library management system with authors and books using Sequelize relationships. This is a starter project - you'll need to implement the functionality described below.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` if you want to change the port (default is 3000).

3. **Start the server:**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Server will be running at:**
   - http://localhost:3000
   - API endpoints: http://localhost:3000/api

## What You Need to Finish

### Step 1: Database Models

#### Author Model (`models/Author.js`)
Create the Author model with:
- `id`: Integer, primary key, auto-increment
- `name`: String, required, max 100 characters
- `email`: String, required, unique, must be valid email
- `bio`: Text, optional
- `birthYear`: Integer, optional, validation: between 1900-2024

#### Book Model (`models/Book.js`)
Create the Book model with:
- `id`: Integer, primary key, auto-increment
- `title`: String, required, max 200 characters
- `isbn`: String, required, unique, exactly 13 characters
- `publishedYear`: Integer, optional
- `authorId`: Integer, foreign key to Author

#### Relationships (`models/index.js`)
Set up the relationships:
- **One Author has many Books** (one-to-many)
- **One Book belongs to one Author**
- **When an Author is deleted, all their Books should be deleted** (cascade)

### Step 2: Author Endpoints (`routes/authors.js`)

1. GET /api/authors - Get all authors

2. GET /api/authors/:id - Get single author with their books
   - Must include all books by this author in response

3. POST /api/authors - Create new author
   - Validate email format
   - Check uniqueness of email
   - Return error if email already exists

4. PUT /api/authors/:id - Update author

5. DELETE /api/authors/:id - Delete author and all their books
   - Should return status 204 on success
   - All books by this author should be automatically deleted (cascade)

6. GET /api/authors/:authorId/books - Get all books by specific author

7. POST /api/authors/:authorId/books - Create book for specific author
   - BONUS: Validate that authorId exists

### Step 3: Book Endpoints (`routes/books.js`)

1. GET /api/books - Get all books with author information
   - Each book should include author name in response
   - HINT: Support query parameter ?year=2020 to filter by published year
   - HINT: Support query parameter ?author=Smith to search books by author name

2. GET /api/books/:id - Get single book with author details
   - Include full author details in response

3. POST /api/books - Create new book
   - Validate that authorId exists
   - Return error if author doesn't exist

## Working with a Partner

If you're working with a partner, here are some ways to split up the work:

### Option 1: By Layer
**Partner A:**
- `models/Author.js` - Author model
- `models/Book.js` - Book model  
- `models/index.js` - Relationships
- `routes/authors.js` - All author endpoints (7 endpoints)

**Partner B:**
- `routes/books.js` - All book endpoints (3 endpoints)
- Testing all endpoints together

### Option 2: By Feature
**Partner A:**
- `models/Author.js` - Author model
- `models/Book.js` - Book model
- `models/index.js` - Relationships
- `routes/authors.js` - GET all authors, GET single author, POST author, PUT author

**Partner B:**
- `routes/authors.js` - DELETE author, GET books by author, POST book for author
- `routes/books.js` - All book endpoints
- Testing together

### Option 3: Frontend/Backend Split
**Partner A (Backend Logic):**
- `models/Author.js` - Author model
- `models/Book.js` - Book model
- `models/index.js` - Relationships
- Validation logic in routes

**Partner B (API Endpoints):**
- `routes/authors.js` - All author endpoints
- `routes/books.js` - All book endpoints
- Testing and error handling

### Tips for Partner Work
- Start together - both partners should understand the relationships (`models/index.js`) together
- Test frequently - test your endpoints as you build them
- Merge carefully - make sure both partners' code works together
- Communicate - discuss validation rules and error messages to keep them consistent

## Testing Your Implementation

Here are some examples you can use to test your endpoints:

### 1. Create Author
```bash
POST http://localhost:3000/api/authors
Content-Type: application/json

{
  "name": "J. K. Rowling",
  "email": "jk@email.com",
  "birthYear": 1965
}
```

### 2. Create Book for Author
```bash
POST http://localhost:3000/api/authors/1/books
Content-Type: application/json

{
  "title": "Harry Potter",
  "isbn": "9780439708180",
  "publishedYear": 1997
}
```

### 3. Get Author with All Books
```bash
GET http://localhost:3000/api/authors/1
```
Returns author object with nested array of all their books

### 4. Delete Author (should delete all books too)
```bash
DELETE http://localhost:3000/api/authors/1
```
Status 204, all books by this author also deleted

### Testing with cURL

#### Create an author:
```bash
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{"name": "J. K. Rowling", "email": "jk@email.com", "birthYear": 1965}'
```

#### Create a book for an author:
```bash
curl -X POST http://localhost:3000/api/authors/1/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Harry Potter", "isbn": "9780439708180", "publishedYear": 1997}'
```

#### Get author with books:
```bash
curl http://localhost:3000/api/authors/1
```

#### Get all books with author info:
```bash
curl http://localhost:3000/api/books
```

#### Filter books by year:
```bash
curl "http://localhost:3000/api/books?year=1997"
```

#### Search books by author name:
```bash
curl "http://localhost:3000/api/books?author=Rowling"
```

#### Sort authors by name:
```bash
curl "http://localhost:3000/api/authors?sortBy=name"
```

#### Delete author (cascade deletes books):
```bash
curl -X DELETE http://localhost:3000/api/authors/1
```

## Project Structure

```
.
├── config/
│   └── database.js          # Sequelize database configuration (already set up)
├── models/
│   ├── Author.js            # TODO: Implement Author model
│   ├── Book.js               # TODO: Implement Book model
│   └── index.js              # TODO: Set up relationships
├── routes/
│   ├── authors.js           # TODO: Implement author endpoints
│   └── books.js              # TODO: Implement book endpoints
├── server.js                # Express app (already set up)
├── package.json             # Dependencies (already configured)
├── .env.example             # Environment variables template
└── README.md                # This file
```

## Important Notes

- The database file (`database.sqlite`) will be created automatically when you first run the server
- Look for `// TODO:` comments in the code to see what needs to be implemented
- Models use `alter: true` in development to sync schema changes
- All validations must be implemented in the models
- Cascade delete must be configured correctly in the relationships
- Email uniqueness and author existence must be validated in routes

## Documentation & Resources

### Express.js
- **[Express.js Official Docs](https://expressjs.com/)** - Main Express documentation
- **[Express Routing Guide](https://expressjs.com/en/guide/routing.html)** - How to set up routes
- **[Express Request/Response](https://expressjs.com/en/api/req.html)** - Understanding req and res objects
- **[Express Middleware](https://expressjs.com/en/guide/using-middleware.html)** - Middleware basics

### Sequelize (ORM)
- **[Sequelize Official Docs](https://sequelize.org/docs/v6/)** - Main Sequelize documentation
- **[Sequelize Models](https://sequelize.org/docs/v6/core-concepts/model-basics/)** - Defining models
- **[Sequelize DataTypes](https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types)** - Available data types
- **[Sequelize Validations](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/)** - Model validations
- **[Sequelize Associations](https://sequelize.org/docs/v6/core-concepts/assocs/)** - Setting up relationships
  - [hasMany Association](https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships)
  - [belongsTo Association](https://sequelize.org/docs/v6/core-concepts/assocs/#the-belongsto-association)
- **[Sequelize Queries](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)** - Querying the database
- **[Sequelize Include (Joins)](https://sequelize.org/docs/v6/core-concepts/assocs/#eager-loading)** - Including related data

### ORM Concepts
- **[What is an ORM?](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping)** - Overview of ORM concepts
- **[Database Relationships](https://www.lucidchart.com/pages/database-diagram/database-relationships)** - Understanding one-to-many, many-to-many, etc.
- **[Foreign Keys and Relationships](https://www.w3schools.com/sql/sql_foreignkey.asp)** - Database relationship basics

### SQLite (Database)
- **[SQLite Tutorial](https://www.sqlitetutorial.net/)** - SQLite basics
- **[SQLite Browser](https://sqlitebrowser.org/)** - GUI tool to view your database

### Node.js & JavaScript
- **[MDN JavaScript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** - JavaScript reference
- **[Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)** - Async programming in Node.js
- **[JavaScript Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)** - Understanding promises

### Testing Your API
- **[Postman](https://www.postman.com/downloads/)** - GUI tool for testing APIs
- **[Thunder Client (VS Code)](https://www.thunderclient.com/)** - VS Code extension for API testing
- **[REST Client (VS Code)](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)** - Another VS Code extension

## Completion Checklist

### Models & Relationships
- [ ] Author model with all required fields (`id`, `name`, `email`, `bio`, `birthYear`)
- [ ] Author validations (name max 100, email unique & valid, birthYear 1900-2024)
- [ ] Book model with all required fields (`id`, `title`, `isbn`, `publishedYear`, `authorId`)
- [ ] Book validations (title max 200, isbn unique & exactly 13 chars)
- [ ] Relationships set up (`Author.hasMany`, `Book.belongsTo`)
- [ ] Cascade delete configured on Author-Book relationship

### Author Endpoints (`routes/authors.js`)
- [ ] GET /api/authors - Get all authors
- [ ] GET /api/authors/:id - Get single author with books included
- [ ] POST /api/authors - Create author (validate email uniqueness)
- [ ] PUT /api/authors/:id - Update author
- [ ] DELETE /api/authors/:id - Delete author (returns 204)
- [ ] GET /api/authors/:authorId/books - Get books by author
- [ ] POST /api/authors/:authorId/books - Create book for author

### Book Endpoints (`routes/books.js`)
- [ ] GET /api/books - Get all books with author info
- [ ] GET /api/books - Query params working (`?year=2020`, `?author=Smith`)
- [ ] GET /api/books/:id - Get single book with author details
- [ ] POST /api/books - Create book (validate authorId exists)

### Testing
- [ ] All endpoints return correct status codes
- [ ] Error handling works (404 for not found, 400 for validation errors)
- [ ] Cascade delete works (deleting author deletes their books)
- [ ] Email uniqueness validation works
- [ ] Author existence validation works for book creation
- [ ] Query parameters work correctly

## Quick Reference

### Common Sequelize Methods You'll Need

```javascript
// Finding records
Author.findAll()                    // Get all
Author.findByPk(id)                 // Get by primary key
Author.findOne({ where: { email }}) // Find one with condition

// Creating records
Author.create({ name, email })      // Create new

// Updating records
author.update({ name: 'New Name' }) // Update existing

// Deleting records
author.destroy()                    // Delete one

// Including related data
Author.findByPk(id, {
  include: [{ model: Book, as: 'books' }]
})
```

### Common Express Patterns

```javascript
// Getting request data
req.body        // POST/PUT request body
req.params.id   // URL parameter (:id)
req.query.year  // Query string (?year=2020)

// Sending responses
res.json(data)           // JSON response
res.status(201).json()   // With status code
res.status(204).send()   // No content (DELETE success)
res.status(404).json()   // Not found error
```

Good luck! Please reach out to me if you need anything!
Office hours, class time, or email me at zwilson@oak.edu!
