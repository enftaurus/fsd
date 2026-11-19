# SET-3 Question 2: Query Documents Using Filters ($gt, $eq, etc.)

## Problem Statement
Query documents using filters (`$gt`, `$eq`, etc.) using the native MongoDB driver.

---

## Theory & Concepts

### 1. MongoDB Query Selectors
MongoDB provides comparison query operators that evaluate document field values:

| Operator | Meaning | Example |
|---|---|---|
| `$eq` | Matches values that are equal to a specified value | `{ category: { $eq: "Electronics" } }` |
| `$gt` | Matches values greater than a specified value | `{ price: { $gt: 100 } }` |
| `$gte`| Matches values greater than or equal to a value | `{ rating: { $gte: 4.5 } }` |
| `$lt` | Matches values less than a specified value | `{ price: { $lt: 50 } }` |
| `$lte`| Matches values less than or equal to a value | `{ price: { $lte: 100 } }` |
| `$in` | Matches any of the values specified in an array | `{ category: { $in: ["Electronics", "Books"] } }` |

### 2. Querying with Native MongoDB Driver
```javascript
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const collection = client.db('mydb').collection('products');

// Query with $gt and $eq:
const results = await collection.find({
  price: { $gt: 100 },
  category: { $eq: 'Electronics' }
}).toArray();
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-3/question2
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:4352` to test the queries interactively!
