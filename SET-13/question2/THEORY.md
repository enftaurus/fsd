# SET-13 Question 2: Array forEach() Method Logging

## Problem Statement
Write a script that takes an array of strings and uses the `forEach()` method to log each item in the array to the console.

---

## Theory & Concepts

### 1. What is `Array.prototype.forEach()`?
`forEach()` is an iterative higher-order method that executes a provided callback function once for each element in the array.

### 2. Syntax & Parameters
```javascript
array.forEach(function(currentValue, index, arr) {
  // Logic here
});
```
- **`currentValue`**: The current item being processed.
- **`index`** *(optional)*: The index of the current item.
- **`arr`** *(optional)*: The array `forEach` was called upon.

### 3. Difference between `forEach()` and `map()`
- **`forEach()`**: Executes side effects (such as logging or updating an external variable) and returns `undefined`.
- **`map()`**: Returns a new transformed array of the same length without mutating original items.

### 4. Code Example
```javascript
const technologies = ['React', 'Node.js', 'Express', 'MongoDB'];

technologies.forEach((tech, index) => {
  console.log(`Item ${index + 1}: ${tech}`);
});
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-13/question2
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Check your terminal output and browser console at `http://localhost:4352`!
