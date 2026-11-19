# SET-10 Question 1: Node.js Program Using HTTP Module to Create a File

## Problem Statement
Create a Node.js program using HTTP module to create a file.

---

## Theory & Concepts

### 1. Combining HTTP and FS Modules
Node.js allows processing incoming network requests through the `http` module and translating request payloads into disk files using the `fs` module.

### 2. Streaming Request Body
In Node.js, HTTP request objects (`req`) are readable streams. To capture data sent in an HTTP POST request:
```javascript
let body = '';
req.on('data', chunk => {
  body += chunk.toString();
});
req.on('end', () => {
  const data = JSON.parse(body);
  fs.writeFile(data.filename, data.content, (err) => {
    // File written to disk
  });
});
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-10/question1
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:4352` in browser and create files!
