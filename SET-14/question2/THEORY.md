# SET-14 Question 2: Dynamic List with Add and Remove Buttons

## Problem Statement
Build a dynamic list where user inputs items. Create a button to perform adds and removes items from a list.

---

## Theory & Concepts

### 1. State Immutability with Arrays
In React, state arrays must never be mutated directly (avoid `array.push()` or `array.splice()`). Instead, create new array references.

### 2. Adding Items (Spread Operator)
```javascript
const [items, setItems] = useState([]);

const addItem = (newItem) => {
  setItems([...items, newItem]);
};
```

### 3. Removing Items (`Array.prototype.filter()`)
```javascript
const removeItem = (idToRemove) => {
  setItems(items.filter(item => item.id !== idToRemove));
};
```

### 4. Keys in Dynamic Lists
Each item rendered from an array must have a unique, stable `key` prop (such as a timestamp or ID) so React can track additions and deletions accurately.

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-14/question2
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
