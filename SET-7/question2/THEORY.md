# SET-7 Question 2: Update Documents in MongoDB

## Problem Statement
Write a Node.js program to update documents in MongoDB using the native MongoDB driver.

---

## Theory & Concepts

### 1. MongoDB Document Update Methods
The native MongoDB driver provides two primary methods for updating existing documents:
- **`collection.updateOne(filter, update, [options])`**: Updates a single document that matches the filter criteria.
- **`collection.updateMany(filter, update, [options])`**: Updates all documents matching the filter criteria.

### 2. Update Operators
MongoDB requires explicit update operators so fields are updated rather than replacing the entire document:
- **`$set`**: Replaces the value of a field with the specified value.
- **`$inc`**: Increments the value of the field by the specified amount (can be positive or negative).
- **`$currentDate`**: Sets the value of a field to current date.
- **`$unset`**: Deletes a specific field from a document.

### 3. Syntax Example
```javascript
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const collection = client.db('mydb').collection('employees');

// 1. Single document update with $set
await collection.updateOne(
  { id: 101 },
  { $set: { role: 'Lead Developer' } }
);

// 2. Increment salary with $inc
await collection.updateOne(
  { id: 101 },
  { $inc: { salary: 5000 } }
);

// 3. Update multiple documents
await collection.updateMany(
  { department: 'Engineering' },
  { $set: { remoteEligible: true } }
);
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-7/question2
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:4352` to execute updates and observe the modified documents!
