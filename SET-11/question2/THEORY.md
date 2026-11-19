# SET-11 Question 2: Handling Form Data with express.json() and express.urlencoded()

## Problem Statement
Handle form data using `express.json()` and `express.urlencoded()`.

---

## Theory & Concepts

### 1. Why are Body Parsers Needed?
In Node.js HTTP servers, the incoming request body arrives as an asynchronous stream of raw binary buffer chunks. Express built-in middleware parses these raw streams and populates `req.body`.

### 2. `express.json()`
- Parses incoming HTTP requests with `Content-Type: application/json`.
- Converts raw JSON string payloads into JavaScript objects accessible via `req.body`.

### 3. `express.urlencoded({ extended: true })`
- Parses incoming requests submitted from traditional HTML `<form>` tags with `Content-Type: application/x-www-form-urlencoded`.
- The option `extended: true` uses the `qs` library to allow parsing nested objects and arrays.

### 4. Implementation Pattern
```javascript
const express = require('express');
const app = express();

// Parse JSON bodies (e.g. from fetch/axios)
app.use(express.json());

// Parse URL-encoded bodies (e.g. from HTML form submission)
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  console.log(req.body); // Available as a clean JS object
  res.json({ received: req.body });
});
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-11/question2
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:4352` and test both submission formats side by side!
