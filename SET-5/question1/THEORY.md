# SET-5 Question 1: Blocking vs Non-Blocking Code Example

## Problem Statement
Demonstrate a blocking vs. non-blocking code example in Node.js.

---

## Theory & Concepts

### 1. The Node.js Single-Threaded Event Loop
Node.js runs JavaScript on a single thread. To handle concurrent operations efficiently without freezing, it relies on the **libuv event loop** and a background thread pool for I/O tasks.

### 2. Blocking (Synchronous) Code
- **Definition**: Code execution stops and waits until the I/O operation (reading disk, network request) finishes.
- **Method**: `fs.readFileSync()`
- **Consequence**: Freezes the event loop. No other incoming requests or operations can be handled while blocked.
```javascript
console.log('1. Before Read');
const data = fs.readFileSync('file.txt', 'utf8'); // BLOCKS THREAD
console.log('2. After Read');
// Output order: 1 -> 2
```

### 3. Non-Blocking (Asynchronous) Code
- **Definition**: The I/O operation is offloaded to the operating system or libuv thread pool, and a callback is scheduled.
- **Method**: `fs.readFile()`
- **Consequence**: Execution proceeds immediately to the next line of JavaScript code.
```javascript
console.log('1. Before Read');
fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log('3. Callback Finished');
});
console.log('2. After Read');
// Output order: 1 -> 2 -> 3
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-5/question1
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:4352` to compare the step-by-step timelines visually!
