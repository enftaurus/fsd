const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4352;
const outputDir = path.join(__dirname, 'created_files');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Core function demonstrating file creation using fs.writeFile
function createNewFile(filename, content, callback) {
  const fullPath = path.join(outputDir, filename);

  // fs.writeFile creates a new file or overwrites if it already exists
  fs.writeFile(fullPath, content, 'utf8', (err) => {
    if (err) return callback(err);
    callback(null, fullPath);
  });
}

// Seed a starter file on boot
createNewFile('welcome.txt', 'Hello! This file was created using Node.js FS module (fs.writeFile).\nCreated on: ' + new Date().toISOString(), (err, p) => {
  if (!err) console.log('Sample file created at: ' + p);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Interactive Web UI
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SET-7 Q1: FS Module File Creator</title>
      <style>
        body { font-family: sans-serif; max-width: 800px; margin: 30px auto; padding: 20px; background: #f8fafc; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
        input, textarea { width: 100%; box-sizing: border-box; padding: 10px; margin: 8px 0; border: 1px solid #cbd5e1; border-radius: 4px; font-family: inherit; }
        button { padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; background: #2563eb; color: white; }
        .file-badge { display: inline-block; padding: 6px 12px; margin: 4px; background: #e0f2fe; color: #0369a1; border-radius: 4px; font-family: monospace; }
        pre { background: #1e293b; color: #f8fafc; padding: 15px; border-radius: 6px; overflow-x: auto; }
      </style>
    </head>
    <body>
      <h1>Node.js FS Module - File Creator</h1>
      <p>SET-7 Question 1: Create a file using Node.js <code>fs.writeFile()</code></p>

      <div class="card">
        <h3>Create a New File:</h3>
        <label>Filename:</label>
        <input id="filename" value="student_notes.txt" />
        <label>File Content:</label>
        <textarea id="content" rows="4">Full Stack Development - Node.js File System module provides asynchronous and synchronous APIs to manipulate files.</textarea>
        <button onclick="createFile()">Create File Now</button>
      </div>

      <div class="card">
        <h3>Created Files in Directory (<code>created_files/</code>):</h3>
        <div id="fileList">Loading files...</div>
        <hr style="margin: 15px 0; border: none; border-top: 1px solid #e2e8f0;"/>
        <h4>File Content Preview:</h4>
        <pre id="preview">Select or create a file above to inspect content.</pre>
      </div>

      <script>
        async function loadFiles() {
          const res = await fetch('/api/files');
          const data = await res.json();
          const list = document.getElementById('fileList');
          list.innerHTML = data.files.map(f =>
            '<span class="file-badge" style="cursor: pointer;" onclick="viewFile(\'' + f + '\')">' + f + '</span>'
          ).join('') || '<em>No files created yet.</em>';
        }

        async function createFile() {
          const filename = document.getElementById('filename').value;
          const content = document.getElementById('content').value;

          const res = await fetch('/api/create-file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename, content })
          });
          const result = await res.json();
          alert(result.message);
          loadFiles();
          viewFile(filename);
        }

        async function viewFile(name) {
          const res = await fetch('/api/files/' + name);
          const data = await res.json();
          document.getElementById('preview').textContent = data.content;
        }

        loadFiles();
      </script>
    </body>
    </html>
  `);
});

// API Endpoints
app.get('/api/files', (req, res) => {
  fs.readdir(outputDir, (err, files) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ files });
  });
});

app.get('/api/files/:filename', (req, res) => {
  const filePath = path.join(outputDir, req.params.filename);
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) return res.status(404).json({ error: 'File not found' });
    res.json({ filename: req.params.filename, content });
  });
});

app.post('/api/create-file', (req, res) => {
  const { filename, content } = req.body;
  if (!filename) return res.status(400).json({ error: 'Filename is required' });

  createNewFile(filename, content || '', (err, fullPath) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      success: true,
      message: `File "${filename}" created successfully!`,
      path: fullPath
    });
  });
});

app.listen(PORT, () => {
  console.log(`FS File Creator Server running at http://localhost:${PORT}/`);
});
