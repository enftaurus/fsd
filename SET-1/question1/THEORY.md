# SET-1 Question 1: React useState() Button Click

## Problem Statement
Create a button that updates the state when clicked (`useState()`).

---

## Theory & Concepts

### 1. What is State in React?
State represents data that can change over time within a React component. Whenever the state changes, React automatically re-renders the component to reflect the new state in the DOM.

### 2. What is the `useState()` Hook?
`useState` is a built-in React Hook introduced in React 16.8 that allows functional components to hold and update local component state.

### 3. Syntax
```javascript
const [state, setState] = useState(initialValue);
```
- **`state`**: The current value of the state.
- **`setState`**: The updater function that triggers re-render when called.
- **`initialValue`**: The initial value assigned during the first render.

### 4. Updating State on Click
In React, button clicks are handled using the synthetic `onClick` event:
```javascript
<button onClick={() => setCount(count + 1)}>Click Me</button>
```
Or using functional updater for safety when dependent on previous state:
```javascript
setCount(prevCount => prevCount + 1);
```

---

## Project Structure
```
SET-1/question1/
├── index.html
├── package.json
├── vite.config.js
├── THEORY.md
└── src/
    ├── main.jsx
    ├── App.jsx
    └── index.css
```

---

## How to Install and Run

1. Navigate to the folder:
   ```bash
   cd SET-1/question1
   ```

2. Install dependencies:
   ```bash
   npm i
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at the displayed local URL (default: `http://localhost:4352`).
