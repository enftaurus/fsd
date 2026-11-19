const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 4352;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = 'inventory_db';
const COLLECTION_NAME = 'items';

let collection = null;

let inMemoryItems = [
  { _id: '101', name: 'Desk Chair', quantity: 15, status: 'In Stock' }
];

async function connectMongoDB() {
  try {
    const client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 2000 });
    await client.connect();
    collection = client.db(DB_NAME).collection(COLLECTION_NAME);
    console.log(`Connected to MongoDB: ${DB_NAME}.${COLLECTION_NAME}`);
  } catch (err) {
    console.warn('MongoDB local server not found; operating in-memory for testing.');
  }
}

app.use(express.json());

// Web UI
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SET-9 Q1: MongoDB Collection CRUD</title>
      <style>
        body { font-family: sans-serif; max-width: 800px; margin: 30px auto; padding: 20px; background: #f8fafc; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
        input { padding: 8px; margin: 4px; border: 1px solid #cbd5e1; border-radius: 4px; }
        button { padding: 8px 16px; margin: 4px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
        .btn-add { background: #10b981; color: white; }
        .btn-update { background: #f59e0b; color: white; }
        .btn-del { background: #ef4444; color: white; }
        pre { background: #1e293b; color: #f8fafc; padding: 15px; border-radius: 6px; overflow-x: auto; }
      </style>
    </head>
    <body>
      <h1>MongoDB: Database & Collection Management</h1>
      <p>SET-9 Question 1: <strong>Add a document</strong> &bull; <strong>Update a document</strong> &bull; <strong>Delete a document</strong></p>

      <div class="card">
        <h3>1. Add Document (insertOne)</h3>
        <input id="addName" placeholder="Item Name" value="Mechanical Keyboard" />
        <input id="addQty" placeholder="Quantity" type="number" value="25" />
        <button class="btn-add" onclick="addItem()">Insert Document</button>
      </div>

      <div class="card">
        <h3>2. Update Document (updateOne)</h3>
        <input id="updateId" placeholder="Document _id" />
        <input id="updateQty" placeholder="New Quantity" type="number" value="50" />
        <button class="btn-update" onclick="updateItem()">Update Document ($set)</button>
      </div>

      <div class="card">
        <h3>3. Delete Document (deleteOne)</h3>
        <input id="deleteId" placeholder="Document _id to delete" />
        <button class="btn-del" onclick="deleteItem()">Delete Document</button>
      </div>

      <div class="card">
        <h3>Current Documents in Collection:</h3>
        <pre id="output">Loading...</pre>
      </div>

      <script>
        async function loadDocs() {
          const res = await fetch('/api/items');
          const data = await res.json();
          document.getElementById('output').textContent = JSON.stringify(data, null, 2);
        }

        async function addItem() {
          const name = document.getElementById('addName').value;
          const quantity = Number(document.getElementById('addQty').value);
          await fetch('/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, quantity, status: 'In Stock' })
          });
          loadDocs();
        }

        async function updateItem() {
          const id = document.getElementById('updateId').value;
          const quantity = Number(document.getElementById('updateQty').value);
          await fetch('/api/items/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity })
          });
          loadDocs();
        }

        async function deleteItem() {
          const id = document.getElementById('deleteId').value;
          await fetch('/api/items/' + id, { method: 'DELETE' });
          loadDocs();
        }

        loadDocs();
      </script>
    </body>
    </html>
  `);
});

// GET all
app.get('/api/items', async (req, res) => {
  if (collection) {
    const items = await collection.find().toArray();
    return res.json(items);
  }
  res.json(inMemoryItems);
});

// 1. ADD DOCUMENT (insertOne)
app.post('/api/items', async (req, res) => {
  const { name, quantity, status } = req.body;
  const doc = { name, quantity: Number(quantity) || 1, status: status || 'Active', createdAt: new Date() };

  if (collection) {
    const result = await collection.insertOne(doc);
    return res.status(201).json({ success: true, message: 'Document added to MongoDB', _id: result.insertedId });
  } else {
    doc._id = String(Date.now());
    inMemoryItems.push(doc);
    return res.status(201).json({ success: true, message: 'Document added to memory', doc });
  }
});

// 2. UPDATE DOCUMENT (updateOne)
app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity, name } = req.body;
  const updateFields = {};
  if (quantity !== undefined) updateFields.quantity = Number(quantity);
  if (name) updateFields.name = name;

  if (collection) {
    const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    const result = await collection.updateOne(filter, { $set: updateFields });
    return res.json({ success: true, matchedCount: result.matchedCount });
  } else {
    const item = inMemoryItems.find(i => i._id === id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    Object.assign(item, updateFields);
    return res.json({ success: true, item });
  }
});

// 3. DELETE DOCUMENT (deleteOne)
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;

  if (collection) {
    const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    const result = await collection.deleteOne(filter);
    return res.json({ success: true, deletedCount: result.deletedCount });
  } else {
    const idx = inMemoryItems.findIndex(i => i._id === id);
    if (idx !== -1) inMemoryItems.splice(idx, 1);
    return res.json({ success: true, message: 'Deleted' });
  }
});

connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`MongoDB CRUD server running at http://localhost:${PORT}/`);
  });
});
