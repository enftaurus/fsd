const express = require('express');

// Initialize Express Application
const app = express();
const PORT = process.env.PORT || 4352;

// Basic GET route at '/'
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SET-10 Q2: Basic Express Server</title>
      <style>
        body { font-family: sans-serif; text-align: center; margin-top: 80px; background: #f8fafc; }
        .card { max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
        h1 { color: #1e3a8a; }
        a { color: #2563eb; font-weight: bold; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Express GET Route Active!</h1>
        <p>SET-10 Question 2: Basic Express server with GET route responding successfully.</p>
        <p>Try the JSON endpoint: <a href="/api/info">/api/info</a></p>
      </div>
    </body>
    </html>
  `);
});

// Second GET route returning JSON
app.get('/api/info', (req, res) => {
  res.status(200).json({
    status: 'online',
    server: 'Express.js',
    message: 'Hello from Express GET route!',
    timestamp: new Date().toISOString()
  });
});

// Start listening for connections
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`Basic Express server is running on http://localhost:${PORT}/`);
  console.log(`GET route: http://localhost:${PORT}/`);
  console.log(`GET route: http://localhost:${PORT}/api/info`);
  console.log(`==================================================`);
});
