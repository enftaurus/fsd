const http = require('http');

const PORT = process.env.PORT || 4352;
const HOST = 'localhost';

// Create HTTP server using Node.js built-in 'http' module
const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request received at ${req.url}`);

  // Set HTTP Response Headers: 200 OK with plain text Content-Type
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8'
  });

  // Response plain text body
  res.end('Hello, World! This is a simple HTTP server returning a plain text message.\nStatus: 200 OK\nNode.js HTTP module demonstration.');
});

// Start the server
server.listen(PORT, HOST, () => {
  console.log(`======================================================`);
  console.log(`HTTP Server is running at http://${HOST}:${PORT}/`);
  console.log(`To test: open the URL in your browser or run:`);
  console.log(`  curl http://${HOST}:${PORT}/`);
  console.log(`======================================================`);
});
