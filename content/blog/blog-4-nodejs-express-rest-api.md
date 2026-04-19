# How to Build a REST API with Node.js and Express (Step-by-Step)

**Meta Description:** Learn how to build a fully functional REST API using Node.js and Express from scratch. Includes CRUD operations, middleware, error handling, and best practices with code examples.

**Tags:** Node.js, Express, REST API, Backend Development, JavaScript, CRUD  
**Reading Time:** 14 min  
**Published:** March 11, 2025

---

## Introduction

Building a REST API is a core backend skill every web developer should have. With **Node.js** and **Express**, you can spin up a production-ready API in minutes.

In this tutorial, we'll build a complete **Books API** with full CRUD (Create, Read, Update, Delete) operations from scratch.

---

## Prerequisites

- Node.js (v18+) installed
- Basic JavaScript knowledge
- A terminal and code editor

---

## Project Setup

```bash
# Create project directory
mkdir books-api && cd books-api

# Initialize Node project
npm init -y

# Install dependencies
npm install express
npm install --save-dev nodemon
```

Update `package.json` scripts:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev":   "nodemon index.js"
  }
}
```

---

## Project Structure

```
books-api/
├── index.js          # Entry point
├── routes/
│   └── books.js      # Book routes
├── controllers/
│   └── booksController.js
├── middleware/
│   └── errorHandler.js
└── package.json
```

---

## Step 1: Create the Entry Point

```javascript
// index.js
const express = require('express');
const app     = express();
const PORT    = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const booksRouter = require('./routes/books');
app.use('/api/books', booksRouter);

// Root route
app.get('/', (req, res) => {
  res.json({ message: '📚 Books API is running!' });
});

// Error handling middleware (must be last)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
```

---

## Step 2: Create the Controller

We'll use an in-memory array as our "database" for simplicity.

```javascript
// controllers/booksController.js

let books = [
  { id: 1, title: 'The Pragmatic Programmer', author: 'Andy Hunt',       year: 1999 },
  { id: 2, title: 'Clean Code',               author: 'Robert C. Martin', year: 2008 },
  { id: 3, title: 'You Don\'t Know JS',        author: 'Kyle Simpson',    year: 2015 },
];

let nextId = 4;

// GET all books
const getAllBooks = (req, res) => {
  const { author, year } = req.query;

  let result = [...books];
  if (author) result = result.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  if (year)   result = result.filter(b => b.year === Number(year));

  res.json({ success: true, count: result.length, data: result });
};

// GET single book
const getBookById = (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));

  if (!book) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }

  res.json({ success: true, data: book });
};

// POST create book
const createBook = (req, res) => {
  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    return res.status(400).json({
      success: false,
      message: 'Please provide title, author, and year',
    });
  }

  const newBook = { id: nextId++, title, author, year: Number(year) };
  books.push(newBook);

  res.status(201).json({ success: true, data: newBook });
};

// PUT update book
const updateBook = (req, res) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }

  books[index] = { ...books[index], ...req.body, id: books[index].id };
  res.json({ success: true, data: books[index] });
};

// DELETE book
const deleteBook = (req, res) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }

  const deleted = books.splice(index, 1)[0];
  res.json({ success: true, message: 'Book deleted', data: deleted });
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
```

---

## Step 3: Create the Routes

```javascript
// routes/books.js
const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/booksController');

router.get('/',      controller.getAllBooks);
router.get('/:id',   controller.getBookById);
router.post('/',     controller.createBook);
router.put('/:id',   controller.updateBook);
router.delete('/:id',controller.deleteBook);

module.exports = router;
```

---

## Step 4: Error Handling Middleware

```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
```

---

## Testing Your API

Run the server:

```bash
npm run dev
```

### Sample API Requests

```bash
# Get all books
GET http://localhost:3000/api/books

# Get a single book
GET http://localhost:3000/api/books/1

# Create a new book
POST http://localhost:3000/api/books
Content-Type: application/json
{
  "title": "Eloquent JavaScript",
  "author": "Marijn Haverbeke",
  "year": 2018
}

# Update a book
PUT http://localhost:3000/api/books/1
Content-Type: application/json
{
  "title": "The Pragmatic Programmer (20th Anniversary Edition)"
}

# Delete a book
DELETE http://localhost:3000/api/books/3
```

---

## API Response Format

All responses follow a consistent structure:

```json
{
  "success": true,
  "count": 3,
  "data": [
    { "id": 1, "title": "The Pragmatic Programmer", "author": "Andy Hunt", "year": 1999 }
  ]
}
```

---

## Best Practices Checklist

- ✅ Use consistent response format
- ✅ Validate all incoming data
- ✅ Return proper HTTP status codes (200, 201, 400, 404, 500)
- ✅ Use centralized error handling
- ✅ Keep controllers separate from routes
- ✅ Use environment variables for PORT and secrets

---

## Conclusion

You've built a fully functional REST API with Node.js and Express! The architecture we used — routes, controllers, and middleware — scales well for real-world applications.

**Next steps:**
- Add MongoDB with Mongoose for a real database
- Add JWT authentication
- Deploy to Railway, Render, or AWS

---

**Further Reading:**
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
