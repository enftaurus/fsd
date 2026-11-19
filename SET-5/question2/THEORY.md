# SET-5 Question 2: Express Route Redirection

## Problem Statement
Create routes and redirect from one route to another.

---

## Theory & Concepts

### 1. What is HTTP Redirection?
Redirection is when a web server responds to a client request with a 3xx HTTP status code and a `Location` header, instructing the browser or client to request a different URL.

### 2. Express `res.redirect()`
Express simplifies redirection with the `res.redirect([status,] url)` method:
```javascript
// Temporary Redirect (Default 302 Found)
res.redirect('/new-path');

// Permanent Redirect (301 Moved Permanently)
res.redirect(301, '/new-path');

// External Redirect
res.redirect('https://example.com');
```

### 3. Common Redirection Status Codes
- **301 (Moved Permanently)**: The target resource has been permanently moved to a new URL. Browsers and search engines cache this redirect.
- **302 (Found / Temporary Redirect)**: The resource resides temporarily at another URI.
- **307 (Temporary Redirect)** / **308 (Permanent Redirect)**: Preserves the HTTP method (e.g. POST remains POST).

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-5/question2
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:4352` and click on the redirect links!
