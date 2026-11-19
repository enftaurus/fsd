const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 4352;
const storageDir = path.join(__dirname, 'uploaded_files');

if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true });
}

// Node.js HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // GET / : Serve HTML form
  if (req.method === 'GET' && parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>SET-10 Q1: HTTP Module File Creator</title>
        <style>
          body { font-family: sans-serif; max-width: 650px; margin: 40px auto; padding: 20px; background: #f8fafc; }
          .card { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          input, textarea { width: 100%; box-sizing: border-box; padding: 10px; margin: 8px 0; border: 1px solid #cbd5e1; border-radius: 4px; }
          button { padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
          .msg { margin-top: 15px; padding: 12px; border-radius: 4px; display: none; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Create File via Node.js HTTP Server</h2>
          <p>SET-10 Question 1: Use HTTP request data to write and create a file on the server</p>
          <form id="fileForm" onsubmit="submitForm(event)">
            <label>Filename:</label>
            <input id="filename" name="filename" value="http_created.txt" required />
            <label>Content:</label>
            <textarea id="content" name="content" rows="4">This file was created by streaming data over HTTP to Node.js!</textarea>
            <button type="submit">Send HTTP Request to Create File</button>
          </form>
          <div id="status" class="msg"></div>
        </div>

        <script>
          async function submitForm(e) {
            e.preventDefault();
            const filename = document.getElementById('filename').value;
            const content = document.getElementById('content').value;

            const res = await fetch('/create-file', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ filename, content })
            });

            const data = await res.json();
            const status = document.getElementById('status');
            status.style.display = 'block';
            status.style.background = '#dcfce7';
            status.style.color = '#15803d';
            status.textContent = '✅ ' + data.message + ' (Path: ' + data.filepath + ')';
          }
        </script>
      </body>
      </html>
    `);
  }

  // POST /create-file : Read request stream and create file using fs.writeFile
  if (req.method === 'POST' && parsedUrl.pathname === '/create-file') {
    let body = '';

    // Collect data chunks from incoming HTTP request stream
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // When entire body has been received
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        const filename = parsed.filename || 'default.txt';
        const fileContent = parsed.content || 'Empty content';
        const targetPath = path.join(storageDir, filename);

        // Write file using FS module
        fs.writeFile(targetPath, fileContent, 'utf8', (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: err.message }));
          }

          console.log(`File successfully created: ${targetPath}`);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            message: `File "${filename}" created successfully using HTTP & FS modules!`,
            filepath: targetPath
          }));
        });
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

server.listen(PORT, () => {
  console.log(`HTTP File Creator Server running at http://localhost:${PORT}/`);
});
