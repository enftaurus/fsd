# SET-8 Question 1: HTML Form with Welcome Message

## Problem Statement
Create a simple HTML form that collects a user's name and displays a welcome message after submitting.

---

## Theory & Concepts

### 1. HTML Form Handling
The HTML `<form>` element captures user input through elements like `<input type="text">` and submits it via `<button type="submit">`.

### 2. Preventing Page Reload with `event.preventDefault()`
By default, submitting a form triggers an HTTP GET or POST request causing the entire page to reload. To handle submissions client-side via JavaScript:
```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Cancels the default reload behavior
  const name = input.value;
  displayWelcome(name);
});
```

### 3. Dynamic DOM Manipulation
JavaScript accesses and updates the DOM using:
- `document.getElementById()`
- Element property `.textContent` or `.innerHTML`
- Modifying CSS styling: `element.style.display = 'block'`

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-8/question1
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:4352` in browser, enter your name, and submit!
