const express = require('express');
const app = express();
const PORT = process.env.PORT || 4352;

// ========================================================
// CORE SCRIPT: Array of strings + forEach() logging
// ========================================================
const programmingLanguages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'Go (Golang)',
  'Rust',
  'C++'
];

console.log('==================================================');
console.log('Running forEach() on array of strings:');
programmingLanguages.forEach((item, index) => {
  console.log(`  Item ${index + 1}: ${item}`);
});
console.log('==================================================');

app.use(express.json());

// Interactive Webpage
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SET-13 Q2: Array forEach() Logging</title>
      <style>
        body { font-family: sans-serif; max-width: 750px; margin: 40px auto; padding: 20px; background: #f8fafc; }
        .card { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
        input { width: 70%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 4px; }
        button { padding: 10px 18px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; background: #2563eb; color: white; }
        pre { background: #1e293b; color: #38bdf8; padding: 15px; border-radius: 6px; overflow-x: auto; font-family: monospace; font-size: 0.95rem; }
      </style>
    </head>
    <body>
      <h1>JavaScript Array.prototype.forEach() Demo</h1>
      <p>SET-13 Question 2: Iterating over an array of strings and logging each item</p>

      <div class="card">
        <h3>Add Item to Array & Re-run forEach():</h3>
        <div style="display: flex; gap: 8px;">
          <input id="newItem" placeholder="Enter programming language or framework..." value="Swift" />
          <button onclick="addItem()">Add & Run forEach()</button>
        </div>
      </div>

      <div class="card">
        <h3>Console Output Simulation:</h3>
        <pre id="output">Loading items...</pre>
      </div>

      <script>
        let items = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go (Golang)', 'Rust', 'C++'];

        function runForEach() {
          let log = "=== Array.prototype.forEach() Execution ===\\n";
          items.forEach((item, index) => {
            log += '[' + (index + 1) + '/' + items.length + '] -> ' + item + '\\n';
            console.log('Item ' + (index + 1) + ': ' + item);
          });
          document.getElementById('output').textContent = log;
        }

        function addItem() {
          const input = document.getElementById('newItem');
          if (input.value.trim()) {
            items.push(input.value.trim());
            input.value = '';
            runForEach();
          }
        }

        runForEach();
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Array forEach server running at http://localhost:${PORT}/`);
});
