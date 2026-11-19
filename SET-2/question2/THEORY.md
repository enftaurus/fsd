# SET-2 Question 2: Express GET, POST, PUT, DELETE Routes

## Problem Statement
Create routes for GET, POST, PUT, DELETE in Express.

---

## Theory & Concepts

### 1. HTTP Methods (REST Verbs)
- **GET**: Used to retrieve resources from the server. Should be idempotent and safe.
- **POST**: Used to send data to the server to create a new resource.
- **PUT**: Used to replace or update an existing resource by its ID.
- **DELETE**: Used to remove a resource from the server.

### 2. Express Routing Methods
Express provides methods corresponding to HTTP verbs:
```javascript
app.get('/route', (req, res) => { ... });
app.post('/route', (req, res) => { ... });
app.put('/route/:id', (req, res) => { ... });
app.delete('/route/:id', (req, res) => { ... });
```

### 3. Route Parameters (`req.params`)
URL path segments prefixed with a colon (e.g., `:id`) are captured as route parameters accessible via `req.params.id`.

### 4. Body Parsing
To access JSON sent in `POST` or `PUT` requests, use:
```javascript
app.use(express.json());
```
Data is accessible via `req.body`.

---

## How to Install and Run

1. Navigate to directory:
   ```bash
   cd SET-2/question2
   ```

2. Install dependencies:
   ```bash
   npm i
   ```

3. Start server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:4352` in browser to test all four methods interactively!
