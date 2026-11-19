# SET-4 Question 2: Complete REST API (CRUD) for a User Model

## Problem Statement
Build a complete REST API (CRUD) for a User model:
- Create user
- Get users
- Update user
- Delete user

---

## Theory & Concepts

### 1. What is CRUD?
CRUD stands for the four basic operations of persistent storage:
- **C**reate: `POST /api/users`
- **R**ead: `GET /api/users` and `GET /api/users/:id`
- **U**pdate: `PUT /api/users/:id`
- **D**elete: `DELETE /api/users/:id`

### 2. MongoDB Native Driver Operations
- `insertOne(doc)`: Inserts a new document.
- `find(query).toArray()`: Returns an array of matching documents.
- `updateOne(filter, { $set: updateFields })`: Updates matching document.
- `deleteOne(filter)`: Removes the matching document.

### 3. Handling MongoDB `ObjectId`
MongoDB generates a unique 12-byte `_id` of type `ObjectId`. When querying or updating by ID from URL params:
```javascript
const { ObjectId } = require('mongodb');
const filter = { _id: new ObjectId(req.params.id) };
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-4/question2
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:4352` in your browser to interact with the full User CRUD interface!
