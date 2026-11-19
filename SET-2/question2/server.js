const express = require('express');
const app = express();
const PORT = process.env.PORT || 4352;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data store for demonstration
let items = [
  { id: 1, name: 'MacBook Pro', price: 1999, category: 'Electronics' },
  { id: 2, name: 'Mechanical Keyboard', price: 120, category: 'Accessories' },
  { id: 3, name: 'Coffee Mug', price: 15, category: 'Kitchenware' }
];

// Serve an interactive HTML page at '/' for instant testing
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SET-2 Q2: Express CRUD Routes</title>
      <style>
        body { font-family: sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f8fafc; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
        button { padding: 8px 16px; margin: 4px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
        .btn-get { background: #3b82f6; color: white; }
        .btn-post { background: #10b981; color: white; }
        .btn-put { background: #f59e0b; color: white; }
        .btn-delete { background: #ef4444; color: white; }
        pre { background: #1e293b; color: #f8fafc; padding: 15px; border-radius: 6px; overflow-x: auto; }
        input { padding: 8px; margin: 4px; border: 1px solid #cbd5e1; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>Express GET, POST, PUT, DELETE Routes Demo</h1>
      <p>Test the four fundamental HTTP methods interactively or using curl:</p>

      <div class="card">
        <h3>Actions</h3>
        <button class="btn-get" onclick="fetchItems()">GET All Items (/api/items)</button>
        <hr/>
        <h4>Create Item (POST)</h4>
        <input id="postName" placeholder="Name" value="Gaming Mouse" />
        <input id="postPrice" placeholder="Price" type="number" value="60" />
        <button class="btn-post" onclick="createItem()">POST /api/items</button>
        <hr/>
        <h4>Update Item (PUT)</h4>
        <input id="putId" placeholder="Item ID" type="number" value="1" style="width: 80px;" />
        <input id="putName" placeholder="New Name" value="MacBook Pro M3" />
        <input id="putPrice" placeholder="New Price" type="number" value="2199" />
        <button class="btn-put" onclick="updateItem()">PUT /api/items/:id</button>
        <hr/>
        <h4>Delete Item (DELETE)</h4>
        <input id="deleteId" placeholder="Item ID" type="number" value="3" style="width: 80px;" />
        <button class="btn-delete" onclick="deleteItem()">DELETE /api/items/:id</button>
      </div>

      <div class="card">
        <h3>Live Response:</h3>
        <pre id="output">Click a button above to test a route...</pre>
      </div>

      <script>
        async function fetchItems() {
          const res = await fetch('/api/items');
          const data = await res.json();
          document.getElementById('output').textContent = JSON.stringify(data, null, 2);
        }

        async function createItem() {
          const name = document.getElementById('postName').value;
          const price = Number(document.getElementById('postPrice').value);
          const res = await fetch('/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, category: 'General' })
          });
          const data = await res.json();
          document.getElementById('output').textContent = JSON.stringify(data, null, 2);
        }

        async function updateItem() {
          const id = document.getElementById('putId').value;
          const name = document.getElementById('putName').value;
          const price = Number(document.getElementById('putPrice').value);
          const res = await fetch('/api/items/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price })
          });
          const data = await res.json();
          document.getElementById('output').textContent = JSON.stringify(data, null, 2);
        }

        async function deleteItem() {
          const id = document.getElementById('deleteId').value;
          const res = await fetch('/api/items/' + id, { method: 'DELETE' });
          const data = await res.json();
          document.getElementById('output').textContent = JSON.stringify(data, null, 2);
        }
      </script>
    </body>
    </html>
  `);
});

// 1. GET: Retrieve all items or single item
app.get('/api/items', (req, res) => {
  res.status(200).json({
    success: true,
    count: items.length,
    data: items
  });
});

app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  res.status(200).json({ success: true, data: item });
});

// 2. POST: Create a new item
app.post('/api/items', (req, res) => {
  const { name, price, category } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ success: false, message: 'Please provide name and price' });
  }

  const newItem = {
    id: items.length ? Math.max(...items.map(i => i.id)) + 1 : 1,
    name,
    price: Number(price),
    category: category || 'General'
  };

  items.push(newItem);
  res.status(201).json({
    success: true,
    message: 'Item created successfully (POST)',
    data: newItem
  });
});

// 3. PUT: Update an existing item by ID
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  const { name, price, category } = req.body;
  items[itemIndex] = {
    ...items[itemIndex],
    ...(name && { name }),
    ...(price !== undefined && { price: Number(price) }),
    ...(category && { category })
  };

  res.status(200).json({
    success: true,
    message: `Item ${id} updated successfully (PUT)`,
    data: items[itemIndex]
  });
});

// 4. DELETE: Remove an item by ID
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  const deletedItem = items.splice(itemIndex, 1)[0];
  res.status(200).json({
    success: true,
    message: `Item ${id} deleted successfully (DELETE)`,
    data: deletedItem
  });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
  console.log('Routes available:');
  console.log('  GET    /api/items');
  console.log('  POST   /api/items');
  console.log('  PUT    /api/items/:id');
  console.log('  DELETE /api/items/:id');
});
