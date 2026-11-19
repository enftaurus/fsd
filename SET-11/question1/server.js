const EventEmitter = require('events');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4352;

// 1. Create EventEmitter instance
const authEmitter = new EventEmitter();

// In-memory array of received events
const loginHistory = [];

// 2. Listen for the 'userLoggedIn' event using authEmitter.on()
authEmitter.on('userLoggedIn', (user) => {
  const logMessage = `[EVENT RECEIVED] User "${user.username}" (ID: ${user.userId}) logged in at ${user.loginTime} from IP ${user.ipAddress}`;
  console.log('--------------------------------------------------');
  console.log(logMessage);
  console.log('Sending welcome notification & recording audit log...');
  console.log('--------------------------------------------------');

  loginHistory.unshift(user);
});

// Listener 2: Security check listener for the same event
authEmitter.on('userLoggedIn', (user) => {
  if (user.role === 'Admin') {
    console.log(`🔒 SECURITY NOTICE: Elevated Administrator login detected for ${user.username}`);
  }
});

app.use(express.json());

// Web UI
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SET-11 Q1: EventEmitter userLoggedIn</title>
      <style>
        body { font-family: sans-serif; max-width: 750px; margin: 40px auto; padding: 20px; background: #f8fafc; }
        .card { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
        input, select { padding: 8px; margin: 6px 0; border: 1px solid #cbd5e1; border-radius: 4px; width: 100%; box-sizing: border-box; }
        button { padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; }
        .event-card { padding: 12px; margin: 8px 0; background: #f0fdf4; border-left: 4px solid #10b981; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>Node.js EventEmitter: "userLoggedIn" Event</h1>
      <p>SET-11 Question 1: Create a custom event, trigger it (emit), and listen for <code>userLoggedIn</code></p>

      <div class="card">
        <h3>Simulate User Login (Emit Event):</h3>
        <label>Username:</label>
        <input id="username" value="alex_dev" />
        <label>Role:</label>
        <select id="role">
          <option value="User">Regular User</option>
          <option value="Admin">Administrator</option>
        </select>
        <button onclick="triggerLogin()">Trigger userLoggedIn Event</button>
      </div>

      <div class="card">
        <h3>Captured "userLoggedIn" Events:</h3>
        <div id="eventsList">Waiting for login events...</div>
      </div>

      <script>
        async function fetchHistory() {
          const res = await fetch('/api/logins');
          const data = await res.json();
          const list = document.getElementById('eventsList');
          if (data.length === 0) {
            list.innerHTML = '<em>No logins triggered yet.</em>';
            return;
          }
          list.innerHTML = data.map(u =>
            '<div class="event-card">' +
            '<strong>' + u.username + '</strong> (' + u.role + ') logged in at <strong>' + new Date(u.loginTime).toLocaleTimeString() + '</strong>' +
            '<div style="font-size: 0.8rem; color: #64748b;">IP: ' + u.ipAddress + ' &bull; User ID: ' + u.userId + '</div>' +
            '</div>'
          ).join('');
        }

        async function triggerLogin() {
          const username = document.getElementById('username').value;
          const role = document.getElementById('role').value;
          await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, role })
          });
          fetchHistory();
        }

        fetchHistory();
      </script>
    </body>
    </html>
  `);
});

app.get('/api/logins', (req, res) => {
  res.json(loginHistory);
});

// Trigger route: emits 'userLoggedIn'
app.post('/api/login', (req, res) => {
  const { username, role } = req.body;

  const userPayload = {
    userId: 'USR-' + Math.floor(1000 + Math.random() * 9000),
    username: username || 'Guest',
    role: role || 'User',
    ipAddress: req.ip || '127.0.0.1',
    loginTime: new Date().toISOString()
  };

  // ==========================================
  // TRIGGER THE EVENT USING authEmitter.emit()
  // ==========================================
  authEmitter.emit('userLoggedIn', userPayload);

  res.status(200).json({
    success: true,
    message: 'userLoggedIn event triggered successfully',
    payload: userPayload
  });
});

app.listen(PORT, () => {
  console.log(`EventEmitter Server running at http://localhost:${PORT}/`);
});
