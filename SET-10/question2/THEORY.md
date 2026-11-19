# SET-10 Question 2: Basic Express Server with GET Route

## Problem Statement
Build a basic Express server with GET route.

---

## Theory & Concepts

### 1. What is Express?
Express is a fast, unopinionated, minimalist web framework for Node.js that simplifies handling routing, middleware, and HTTP requests.

### 2. Defining a GET Route
```javascript
const express = require('express');
const app = express();

app.get('/path', (req, res) => {
  res.send('Response text');
});
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-10/question2
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:4352` in your browser!
