const express = require('express');
const app = express();
const PORT = process.env.PORT || 4352;

// Interactive Homepage
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SET-5 Q2: Route Redirection</title>
      <style>
        body { font-family: sans-serif; max-width: 750px; margin: 40px auto; padding: 20px; background: #f8fafc; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
        a { display: inline-block; padding: 10px 18px; margin: 6px 0; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; }
        a:hover { background: #1d4ed8; }
        .badge { background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; }
      </style>
    </head>
    <body>
      <h1>Express Route Redirection Demo</h1>
      <p>SET-5 Question 2: Create routes and redirect from one route to another using <code>res.redirect()</code></p>

      <div class="card">
        <h3>1. Old Route Redirection (302 Found)</h3>
        <p>Visiting <code>/old-home</code> redirects you to <code>/dashboard</code></p>
        <a href="/old-home">Test /old-home &rarr;</a>
      </div>

      <div class="card">
        <h3>2. Permanent Route Redirection (301 Moved Permanently)</h3>
        <p>Visiting <code>/v1/users</code> permanently redirects you to <code>/v2/users</code></p>
        <a href="/v1/users">Test /v1/users &rarr;</a>
      </div>

      <div class="card">
        <h3>3. External Redirection</h3>
        <p>Visiting <code>/github</code> redirects to GitHub's official homepage</p>
        <a href="/github">Test /github &rarr;</a>
      </div>
    </body>
    </html>
  `);
});

// 1. Temporary redirect (HTTP 302 by default)
app.get('/old-home', (req, res) => {
  console.log('Redirecting from /old-home to /dashboard...');
  res.redirect('/dashboard?source=old-home');
});

// 2. Permanent redirect (HTTP 301)
app.get('/v1/users', (req, res) => {
  console.log('Permanent redirect 301 from /v1/users to /v2/users...');
  res.redirect(301, '/v2/users');
});

// 3. External redirect
app.get('/github', (req, res) => {
  console.log('Redirecting externally to https://github.com...');
  res.redirect('https://github.com');
});

// Target destination route 1
app.get('/dashboard', (req, res) => {
  const source = req.query.source || 'direct';
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>Dashboard</title><style>body { font-family: sans-serif; text-align: center; margin-top: 60px; }</style></head>
    <body>
      <h1 style="color: #10b981;">🎉 Welcome to Dashboard!</h1>
      <p>You arrived here successfully via redirection (source: <strong>${source}</strong>).</p>
      <a href="/" style="color: #2563eb;">&larr; Back to Home</a>
    </body>
    </html>
  `);
});

// Target destination route 2
app.get('/v2/users', (req, res) => {
  res.json({
    status: 'success',
    version: 'v2',
    message: 'Welcome to Users API v2 (Redirected from legacy /v1/users via HTTP 301 Moved Permanently)',
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
