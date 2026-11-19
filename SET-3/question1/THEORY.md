# SET-3 Question 1: Render List of Names using map()

## Problem Statement
Create a list of names using `map()` and render it.

---

## Theory & Concepts

### 1. JavaScript `Array.prototype.map()`
The `map()` method creates a new array populated with the results of calling a provided function on every element in the calling array.

### 2. Using `map()` in JSX
In React, we transform arrays of data into arrays of JSX elements inside curly braces `{}`:
```jsx
<ul>
  {names.map((name, index) => (
    <li key={index}>{name}</li>
  ))}
</ul>
```

### 3. The Importance of the `key` Prop
- React uses the `key` prop to uniquely identify which items in a list have changed, been added, or been removed.
- Keys help React optimize re-renders via its reconciliation algorithm (Virtual DOM diffing).
- Best practice: Use unique, stable IDs whenever available.

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-3/question1
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
