const express = require('express');
const app = express();
const PORT = process.env.PORT || 4352;

// ========================================================
// CORE MIDDLEWARES
// ========================================================
// 1. Parses incoming requests with JSON payloads (application/json)
app.use(express.json());

// 2. Parses incoming requests with URL-encoded payloads (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

let lastSubmission = null;

// Interactive Webpage
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SET-11 Q2: Express Body Parsing</title>
      <style>
        body { font-family: sans-serif; max-width: 850px; margin: 30px auto; padding: 20px; background: #f8fafc; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        input { width: 100%; box-sizing: border-box; padding: 8px; margin: 6px 0; border: 1px solid #cbd5e1; border-radius: 4px; }
        button { padding: 10px 18px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; }
        .btn-json { background: #2563eb; color: white; }
        .btn-form { background: #10b981; color: white; }
        pre { background: #1e293b; color: #f8fafc; padding: 15px; border-radius: 6px; overflow-x: auto; font-size: 0.9rem; }
      </style>
    </head>
    <body>
      <h1>Express Form Data & Body Parsers</h1>
      <p>SET-11 Question 2: Handling <code>express.json()</code> and <code>express.urlencoded()</code></p>

      <div class="grid">
        <!-- FORM 1: Traditional HTML Form (URL-encoded) -->
        <div class="card">
          <h3 style="color: #10b981;">1. Standard HTML Form (URL-Encoded)</h3>
          <p style="font-size: 0.85rem; color: #64748b;">Sent with <code>Content-Type: application/x-www-form-urlencoded</code></p>
          <form action="/submit-urlencoded" method="POST">
            <input name="fullName" placeholder="Full Name" value="Maria Garcia" required />
            <input name="email" placeholder="Email Address" value="maria@example.com" required />
            <input name="department" placeholder="Department" value="Finance" />
            <button class="btn-form" type="submit">Submit Form (URL-Encoded)</button>
          </form>
        </div>

        <!-- FORM 2: Fetch API JSON Form -->
        <div class="card">
          <h3 style="color: #2563eb;">2. REST Client / Fetch (JSON Payload)</h3>
          <p style="font-size: 0.85rem; color: #64748b;">Sent with <code>Content-Type: application/json</code></p>
          <input id="jsonTitle" placeholder="Project Title" value="Cloud Migration" />
          <input id="jsonBudget" placeholder="Budget ($)" type="number" value="50000" />
          <input id="jsonLead" placeholder="Lead Architect" value="Dr. Robert" />
          <button class="btn-json" onclick="submitJson()">Send JSON Payload</button>
        </div>
      </div>

      <div class="card" style="margin-top: 20px;">
        <h3>Parsed Data Result (from req.body):</h3>
        <pre id="resultOutput">${lastSubmission ? JSON.stringify(lastSubmission, null, 2) : 'Submit either form above to see parsed req.body output...'}</pre>
      </div>

      <script>
        async function submitJson() {
          const title = document.getElementById('jsonTitle').value;
          const budget = Number(document.getElementById('jsonBudget').value);
          const lead = document.getElementById('jsonLead').value;

          const res = await fetch('/submit-json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, budget, lead, submittedVia: 'application/json' })
          });
          const data = await res.json();
          document.getElementById('resultOutput').textContent = JSON.stringify(data, null, 2);
        }
      </script>
    </body>
    </html>
  `);
});

// Route 1: Receives URL-encoded form data (express.urlencoded())
app.post('/submit-urlencoded', (req, res) => {
  lastSubmission = {
    source: 'express.urlencoded()',
    contentType: req.headers['content-type'],
    parsedBody: req.body
  };
  console.log('Received URL-encoded body:', req.body);
  res.redirect('/');
});

// Route 2: Receives JSON data (express.json())
app.post('/submit-json', (req, res) => {
  lastSubmission = {
    source: 'express.json()',
    contentType: req.headers['content-type'],
    parsedBody: req.body
  };
  console.log('Received JSON body:', req.body);
  res.json(lastSubmission);
});

app.listen(PORT, () => {
  console.log(`Body Parser Server running at http://localhost:${PORT}/`);
});
