const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4352;
const filePath = path.join(__dirname, 'sample.txt');

// Interactive Webpage
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SET-5 Q1: Blocking vs Non-Blocking</title>
      <style>
        body { font-family: sans-serif; max-width: 850px; margin: 30px auto; padding: 20px; background: #f8fafc; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        button { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
        .btn-blocking { background: #ef4444; color: white; }
        .btn-nonblocking { background: #10b981; color: white; }
        pre { background: #1e293b; color: #f8fafc; padding: 15px; border-radius: 6px; font-size: 0.9rem; overflow-x: auto; }
      </style>
    </head>
    <body>
      <h1>Node.js Blocking vs Non-Blocking I/O Demonstration</h1>
      <p>SET-5 Question 1: Comparing Synchronous (Blocking) vs Asynchronous (Non-Blocking) File Operations</p>

      <div class="grid">
        <div class="card">
          <h3 style="color: #ef4444;">1. Blocking (fs.readFileSync)</h3>
          <p>Halts the JavaScript execution thread until file reading completes. No other task can run during this time.</p>
          <button class="btn-blocking" onclick="runTest('/api/blocking')">Run Blocking Code</button>
        </div>

        <div class="card">
          <h3 style="color: #10b981;">2. Non-Blocking (fs.readFile)</h3>
          <p>Delegates I/O to libuv thread pool. The event loop continues processing other instructions immediately.</p>
          <button class="btn-nonblocking" onclick="runTest('/api/non-blocking')">Run Non-Blocking Code</button>
        </div>
      </div>

      <div class="card">
        <h3>Execution Logs & Timeline:</h3>
        <pre id="output">Click one of the buttons above to see the step-by-step execution timeline...</pre>
      </div>

      <script>
        async function runTest(url) {
          document.getElementById('output').textContent = 'Executing...';
          const res = await fetch(url);
          const data = await res.json();
          document.getElementById('output').textContent = JSON.stringify(data, null, 2);
        }
      </script>
    </body>
    </html>
  `);
});

// Endpoint 1: BLOCKING EXAMPLE
app.get('/api/blocking', (req, res) => {
  const logs = [];
  const start = Date.now();

  logs.push({ step: 1, message: 'BLOCKING: Start of function' });
  logs.push({ step: 2, message: 'Reading file synchronously using fs.readFileSync...' });

  // Synchronous, blocking execution
  const data = fs.readFileSync(filePath, 'utf8');

  logs.push({ step: 3, message: `File read completed (${data.length} bytes)` });
  logs.push({ step: 4, message: 'Next instruction executes ONLY AFTER file read completes' });
  logs.push({ step: 5, message: `BLOCKING: End of function. Elapsed: ${Date.now() - start}ms` });

  res.json({
    type: 'Blocking (Synchronous)',
    executionOrder: logs
  });
});

// Endpoint 2: NON-BLOCKING EXAMPLE
app.get('/api/non-blocking', (req, res) => {
  const logs = [];
  const start = Date.now();

  logs.push({ step: 1, message: 'NON-BLOCKING: Start of function' });
  logs.push({ step: 2, message: 'Dispatching asynchronous fs.readFile to background libuv thread pool...' });

  // Asynchronous, non-blocking execution
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return;
    logs.push({
      step: 'CALLBACK',
      message: `Async callback executed! File read finished (${data.length} bytes). Elapsed: ${Date.now() - start}ms`
    });

    res.json({
      type: 'Non-Blocking (Asynchronous)',
      note: 'Notice how Step 3 was logged BEFORE the callback completed!',
      executionOrder: logs
    });
  });

  logs.push({ step: 3, message: 'NON-BLOCKING: Subsequent instructions execute IMMEDIATELY without waiting!' });
});

app.listen(PORT, () => {
  console.log(`Blocking vs Non-blocking demo running at http://localhost:${PORT}/`);
});
