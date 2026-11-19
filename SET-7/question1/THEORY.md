# SET-7 Question 1: Node.js FS Module to Create a File

## Problem Statement
Create a Node.js program using FS module to create a file.

---

## Theory & Concepts

### 1. The `fs` (File System) Module
Node.js includes the built-in `fs` module to interact with the file system on the host operating system.

### 2. Methods to Create / Write Files
- **`fs.writeFile(file, data, [options], callback)`**:
  Asynchronously writes data to a file. If the file does not exist, it is created. If it already exists, its contents are overwritten.
- **`fs.appendFile(file, data, [options], callback)`**:
  Asynchronously appends data to a file, creating it if it doesn't exist.
- **`fs.writeFileSync()`**:
  The synchronous blocking variant.
- **`fs.promises.writeFile()`**:
  Promise-based API for `async/await`.

### 3. Syntax Example
```javascript
const fs = require('fs');

fs.writeFile('message.txt', 'Hello Node.js!', 'utf8', (err) => {
  if (err) {
    console.error('Error creating file:', err);
    return;
  }
  console.log('File created successfully!');
});
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-7/question1
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:4352` to enter filenames and create files directly from browser!
