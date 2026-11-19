# SET-9 Question 1: MongoDB Database, Collection, Add, Update, and Delete Document

## Problem Statement
Create a MongoDB database and collection:
- Add a document (`insertOne`)
- Update a document (`updateOne`)
- Delete a document (`deleteOne`)

---

## Theory & Concepts

### 1. MongoDB Database and Collection Creation
In MongoDB, databases and collections are created implicitly upon first document insertion.
```javascript
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();

// Database 'inventory_db' and collection 'items' are created on insertion
const db = client.db('inventory_db');
const collection = db.collection('items');
```

### 2. Adding a Document (`insertOne`)
```javascript
const result = await collection.insertOne({
  name: 'Mechanical Keyboard',
  quantity: 25,
  status: 'In Stock'
});
console.log('Inserted ID:', result.insertedId);
```

### 3. Updating a Document (`updateOne`)
```javascript
await collection.updateOne(
  { _id: new ObjectId(id) },
  { $set: { quantity: 50 } }
);
```

### 4. Deleting a Document (`deleteOne`)
```javascript
await collection.deleteOne({ _id: new ObjectId(id) });
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-9/question1
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:4352` to execute Add, Update, and Delete operations!
