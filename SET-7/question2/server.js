const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 4352;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = 'employee_db';
const COLLECTION_NAME = 'employees';

let collection = null;

// Mock data
let mockEmployees = [
  { id: 1, name: 'Alice Walker', department: 'Engineering', salary: 75000, active: true },
  { id: 2, name: 'Bob Miller', department: 'Marketing', salary: 55000, active: true },
  { id: 3, name: 'Carol Danvers', department: 'Engineering', salary: 82000, active: false }
];

async function initMongo() {
  try {
    const client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 2000 });
    await client.connect();
    collection = client.db(DB_NAME).collection(COLLECTION_NAME);
    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertMany(mockEmployees.map(e => ({ ...e, _id: e.id })));
    }
    console.log('Connected to MongoDB Employee collection.');
  } catch (err) {
    console.warn('MongoDB not active; using in-memory dataset for document updates.');
  }
}

app.use(express.json());

// Interactive Web UI
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SET-7 Q2: MongoDB Update Documents</title>
      <style>
        body { font-family: sans-serif; max-width: 850px; margin: 30px auto; padding: 20px; background: #f8fafc; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
        button { padding: 8px 16px; margin: 4px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; background: #2563eb; color: white; }
        pre { background: #1e293b; color: #f8fafc; padding: 15px; border-radius: 6px; overflow-x: auto; }
      </style>
    </head>
    <body>
      <h1>MongoDB Document Update Operations</h1>
      <p>SET-7 Question 2: Update documents using native MongoDB driver (<code>updateOne</code>, <code>updateMany</code> with <code>$set</code>, <code>$inc</code>)</p>

      <div class="card">
        <h3>Perform Update Operations:</h3>
        <button onclick="runUpdate('update-one')">
          1. updateOne: Raise Alice's Salary by $5000 ($inc)
        </button>
        <button onclick="runUpdate('promote-bob')">
          2. updateOne: Promote Bob to Senior Marketer ($set)
        </button>
        <button onclick="runUpdate('update-many')">
          3. updateMany: Set all Engineering staff to active ($set)
        </button>
        <button onclick="runReset()" style="background: #64748b;">
          Reset Dataset
        </button>
      </div>

      <div class="card">
        <h3>Current Documents in Collection:</h3>
        <pre id="dataOutput">Loading...</pre>
      </div>

      <script>
        async function loadData() {
          const res = await fetch('/api/employees');
          const data = await res.json();
          document.getElementById('dataOutput').textContent = JSON.stringify(data, null, 2);
        }

        async function runUpdate(action) {
          const res = await fetch('/api/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action })
          });
          const result = await res.json();
          alert(result.message);
          loadData();
        }

        async function runReset() {
          await fetch('/api/reset', { method: 'POST' });
          loadData();
        }

        loadData();
      </script>
    </body>
    </html>
  `);
});

app.get('/api/employees', async (req, res) => {
  if (collection) {
    const docs = await collection.find().toArray();
    return res.json(docs);
  }
  res.json(mockEmployees);
});

app.post('/api/update', async (req, res) => {
  const { action } = req.body;

  if (action === 'update-one') {
    // 1. updateOne using $inc
    if (collection) {
      await collection.updateOne({ id: 1 }, { $inc: { salary: 5000 } });
    } else {
      const emp = mockEmployees.find(e => e.id === 1);
      if (emp) emp.salary += 5000;
    }
    return res.json({ success: true, message: "Updated Alice's salary with $inc: { salary: 5000 }" });
  }

  if (action === 'promote-bob') {
    // 2. updateOne using $set
    if (collection) {
      await collection.updateOne({ id: 2 }, { $set: { role: 'Senior Marketer', department: 'Growth & Marketing' } });
    } else {
      const emp = mockEmployees.find(e => e.id === 2);
      if (emp) {
        emp.role = 'Senior Marketer';
        emp.department = 'Growth & Marketing';
      }
    }
    return res.json({ success: true, message: "Promoted Bob with $set: { role: 'Senior Marketer' }" });
  }

  if (action === 'update-many') {
    // 3. updateMany using $set
    if (collection) {
      await collection.updateMany({ department: 'Engineering' }, { $set: { active: true } });
    } else {
      mockEmployees.forEach(e => {
        if (e.department === 'Engineering') e.active = true;
      });
    }
    return res.json({ success: true, message: "Updated multiple documents with updateMany: { department: 'Engineering' }" });
  }

  res.status(400).json({ error: 'Invalid action' });
});

app.post('/api/reset', async (req, res) => {
  mockEmployees = [
    { id: 1, name: 'Alice Walker', department: 'Engineering', salary: 75000, active: true },
    { id: 2, name: 'Bob Miller', department: 'Marketing', salary: 55000, active: true },
    { id: 3, name: 'Carol Danvers', department: 'Engineering', salary: 82000, active: false }
  ];
  if (collection) {
    await collection.deleteMany({});
    await collection.insertMany(mockEmployees.map(e => ({ ...e, _id: e.id })));
  }
  res.json({ success: true, message: 'Dataset reset.' });
});

initMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`MongoDB Update Server running at http://localhost:${PORT}/`);
  });
});
