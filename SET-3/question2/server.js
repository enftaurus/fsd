const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 4352;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = 'fsd_lab_db';
const COLLECTION_NAME = 'products';

// Mock dataset in case MongoDB is not actively running locally
const sampleProducts = [
  { name: 'Laptop Pro', price: 1200, category: 'Electronics', rating: 4.8 },
  { name: 'Wireless Mouse', price: 25, category: 'Accessories', rating: 4.2 },
  { name: 'Mechanical Keyboard', price: 95, category: 'Accessories', rating: 4.7 },
  { name: 'Monitor 4K', price: 450, category: 'Electronics', rating: 4.6 },
  { name: 'USB-C Cable', price: 15, category: 'Accessories', rating: 3.9 },
  { name: 'Smartphone', price: 899, category: 'Electronics', rating: 4.5 }
];

let db = null;
let collection = null;

async function initMongo() {
  try {
    const client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 2000 });
    await client.connect();
    db = client.db(DB_NAME);
    collection = db.collection(COLLECTION_NAME);

    // Seed if empty
    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertMany(sampleProducts);
      console.log('Seeded sample products to MongoDB collection.');
    }
    console.log(`Connected successfully to MongoDB database: ${DB_NAME}`);
  } catch (err) {
    console.warn('MongoDB connection failed or not running locally. Falling back to in-memory filter simulation.');
  }
}

app.use(express.json());

// Web UI for testing MongoDB filters
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SET-3 Q2: MongoDB Query Filters</title>
      <style>
        body { font-family: sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f8fafc; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
        button { padding: 8px 16px; margin: 4px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; background: #2563eb; color: white; }
        button:hover { background: #1d4ed8; }
        pre { background: #1e293b; color: #f8fafc; padding: 15px; border-radius: 6px; overflow-x: auto; }
      </style>
    </head>
    <body>
      <h1>MongoDB Document Filters ($gt, $eq, etc.)</h1>
      <p>Test queries on products dataset:</p>

      <div class="card">
        <h3>Pre-configured Filter Queries:</h3>
        <button onclick="runQuery('eq-category')">Filter by $eq: { category: { $eq: 'Electronics' } }</button>
        <button onclick="runQuery('gt-price')">Filter by $gt: { price: { $gt: 100 } }</button>
        <button onclick="runQuery('gte-rating')">Filter by $gte: { rating: { $gte: 4.5 } }</button>
        <button onclick="runQuery('combined')">Combined: { price: { $gt: 50 }, rating: { $gte: 4.5 } }</button>
      </div>

      <div class="card">
        <h3>Query & Results:</h3>
        <pre id="output">Click a filter button to see MongoDB query filter & results...</pre>
      </div>

      <script>
        async function runQuery(type) {
          const res = await fetch('/api/query?type=' + type);
          const data = await res.json();
          document.getElementById('output').textContent = JSON.stringify(data, null, 2);
        }
      </script>
    </body>
    </html>
  `);
});

app.get('/api/query', async (req, res) => {
  const type = req.query.type || 'all';
  let mongoFilter = {};

  switch (type) {
    case 'eq-category':
      // $eq filter
      mongoFilter = { category: { $eq: 'Electronics' } };
      break;
    case 'gt-price':
      // $gt filter
      mongoFilter = { price: { $gt: 100 } };
      break;
    case 'gte-rating':
      // $gte filter
      mongoFilter = { rating: { $gte: 4.5 } };
      break;
    case 'combined':
      // $gt and $gte combined
      mongoFilter = { price: { $gt: 50 }, rating: { $gte: 4.5 } };
      break;
    default:
      mongoFilter = {};
  }

  try {
    let results = [];
    if (collection) {
      results = await collection.find(mongoFilter).toArray();
    } else {
      // In-memory fallback if MongoDB local daemon not running
      results = sampleProducts.filter(item => {
        if (type === 'eq-category') return item.category === 'Electronics';
        if (type === 'gt-price') return item.price > 100;
        if (type === 'gte-rating') return item.rating >= 4.5;
        if (type === 'combined') return item.price > 50 && item.rating >= 4.5;
        return true;
      });
    }

    res.json({
      success: true,
      appliedFilter: mongoFilter,
      totalMatched: results.length,
      dataSource: collection ? 'Live MongoDB Server' : 'In-Memory Fallback Dataset',
      data: results
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

initMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
});
