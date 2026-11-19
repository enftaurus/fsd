const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 4352;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = 'user_crud_db';
const COLLECTION_NAME = 'users';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usersCol = null;
let inMemoryUsers = [
  { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', age: 28 },
  { _id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', age: 24 }
];

async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 2000 });
    await client.connect();
    usersCol = client.db(DB_NAME).collection(COLLECTION_NAME);
    console.log('Connected to MongoDB User Collection');
  } catch (err) {
    console.warn('MongoDB not running locally; using in-memory mock store for User CRUD.');
  }
}

// Interactive Webpage
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SET-4 Q2: User CRUD REST API</title>
      <style>
        body { font-family: sans-serif; max-width: 900px; margin: 30px auto; padding: 20px; background: #f8fafc; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        input, select { width: 100%; box-sizing: border-box; padding: 8px; margin: 6px 0; border: 1px solid #cbd5e1; border-radius: 4px; }
        button { padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
        .btn-primary { background: #2563eb; color: white; }
        .btn-danger { background: #ef4444; color: white; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { text-align: left; padding: 8px; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; }
      </style>
    </head>
    <body>
      <h1>User CRUD REST API Dashboard</h1>
      <p>SET-4 Question 2: Create User &bull; Get Users &bull; Update User &bull; Delete User</p>

      <div class="grid">
        <div class="card">
          <h3>Add / Create User (POST /api/users)</h3>
          <input id="userName" placeholder="Full Name" />
          <input id="userEmail" placeholder="Email Address" type="email" />
          <input id="userAge" placeholder="Age" type="number" />
          <select id="userRole">
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
          </select>
          <button class="btn-primary" onclick="createUser()">Create User</button>
        </div>

        <div class="card">
          <h3>Update User (PUT /api/users/:id)</h3>
          <input id="updateId" placeholder="User ID" />
          <input id="updateName" placeholder="New Name" />
          <input id="updateRole" placeholder="New Role" />
          <button class="btn-primary" onclick="updateUser()">Update User</button>
        </div>
      </div>

      <div class="card" style="margin-top: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3>User List (GET /api/users)</h3>
          <button class="btn-primary" onclick="loadUsers()">Refresh List</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="userTableBody"></tbody>
        </table>
      </div>

      <script>
        async function loadUsers() {
          const res = await fetch('/api/users');
          const data = await res.json();
          const tbody = document.getElementById('userTableBody');
          tbody.innerHTML = '';
          (data.data || []).forEach(u => {
            const tr = document.createElement('tr');
            tr.innerHTML = '<td><small>' + u._id + '</small></td>' +
              '<td><strong>' + u.name + '</strong></td>' +
              '<td>' + u.email + '</td>' +
              '<td>' + u.role + '</td>' +
              '<td>' + u.age + '</td>' +
              '<td><button class="btn-danger" style="padding: 4px 8px;" onclick="deleteUser(\'' + u._id + '\')">Delete</button></td>';
            tbody.appendChild(tr);
          });
        }

        async function createUser() {
          const name = document.getElementById('userName').value;
          const email = document.getElementById('userEmail').value;
          const age = Number(document.getElementById('userAge').value);
          const role = document.getElementById('userRole').value;

          await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, age, role })
          });
          loadUsers();
        }

        async function updateUser() {
          const id = document.getElementById('updateId').value;
          const name = document.getElementById('updateName').value;
          const role = document.getElementById('updateRole').value;

          await fetch('/api/users/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, role })
          });
          loadUsers();
        }

        async function deleteUser(id) {
          if (confirm('Delete user ' + id + '?')) {
            await fetch('/api/users/' + id, { method: 'DELETE' });
            loadUsers();
          }
        }

        loadUsers();
      </script>
    </body>
    </html>
  `);
});

// 1. CREATE USER (POST /api/users)
app.post('/api/users', async (req, res) => {
  const { name, email, role, age } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required.' });
  }

  const newUser = {
    name,
    email,
    role: role || 'User',
    age: Number(age) || 20,
    createdAt: new Date()
  };

  try {
    if (usersCol) {
      const result = await usersCol.insertOne(newUser);
      return res.status(201).json({ success: true, message: 'User created in MongoDB', data: { _id: result.insertedId, ...newUser } });
    } else {
      newUser._id = String(Date.now());
      inMemoryUsers.push(newUser);
      return res.status(201).json({ success: true, message: 'User created in memory', data: newUser });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. GET USERS (GET /api/users)
app.get('/api/users', async (req, res) => {
  try {
    if (usersCol) {
      const users = await usersCol.find().toArray();
      return res.status(200).json({ success: true, count: users.length, data: users });
    } else {
      return res.status(200).json({ success: true, count: inMemoryUsers.length, data: inMemoryUsers });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. UPDATE USER (PUT /api/users/:id)
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };
  delete updateData._id;

  try {
    if (usersCol) {
      const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
      const result = await usersCol.updateOne(filter, { $set: updateData });
      if (result.matchedCount === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.status(200).json({ success: true, message: 'User updated successfully' });
    } else {
      const user = inMemoryUsers.find(u => u._id === id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      Object.assign(user, updateData);
      return res.status(200).json({ success: true, message: 'User updated in memory', data: user });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. DELETE USER (DELETE /api/users/:id)
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (usersCol) {
      const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
      const result = await usersCol.deleteOne(filter);
      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.status(200).json({ success: true, message: 'User deleted successfully' });
    } else {
      const index = inMemoryUsers.findIndex(u => u._id === id);
      if (index === -1) return res.status(404).json({ success: false, message: 'User not found' });
      const deleted = inMemoryUsers.splice(index, 1)[0];
      return res.status(200).json({ success: true, message: 'User deleted in memory', data: deleted });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`User CRUD API running at http://localhost:${PORT}/`);
  });
});
