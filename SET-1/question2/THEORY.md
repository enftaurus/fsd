# SET-1 Question 2: Simple HTTP Server Returning Plain Text

## Problem Statement
Create a simple HTTP server that returns a plain text message.

---

## Theory & Concepts

### 1. The Node.js `http` Module
Node.js comes with a built-in `http` module that allows creating HTTP servers and clients without requiring external dependencies like Express.

### 2. `http.createServer(callback)`
- The `createServer` method creates an HTTP server instance.
- The callback accepts two parameters:
  - **`req` (IncomingMessage)**: An object representing the incoming HTTP request (headers, method, URL, body stream).
  - **`res` (ServerResponse)**: An object used to prepare and send the HTTP response back to the client.

### 3. Setting Headers & Plain Text Content-Type
```javascript
res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
```
- **Status Code 200**: Standard HTTP success response.
- **Content-Type `text/plain`**: Tells the client/browser to treat the response body as unformatted text, not HTML or JSON.

### 4. Sending the Response: `res.end()`
The `res.end()` method signals to the server that all response headers and body have been sent, closing the connection.

---

## Project Structure
```
SET-1/question2/
├── package.json
├── server.js
└── THEORY.md
```

---

## How to Install and Run

1. Navigate to the folder:
   ```bash
   cd SET-1/question2
   ```

2. Install dependencies:
   ```bash
   npm i
   ```
   *(Note: uses Node.js standard library, no external packages required)*

3. Run the server:
   ```bash
   npm run dev
   ```

4. Open your browser at:
   `http://localhost:4352`

   Or test via terminal:
   ```bash
   curl http://localhost:4352/
   ```
