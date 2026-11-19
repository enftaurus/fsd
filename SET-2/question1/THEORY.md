# SET-2 Question 1: Functional Component & Passing Props

## Problem Statement
Build a functional component and pass props to it.

---

## Theory & Concepts

### 1. What are Functional Components?
A functional component in React is a pure JavaScript function that accepts an input object called `props` and returns React elements (JSX).

### 2. What are Props (Properties)?
- **Props** are read-only attributes passed from a parent component down to child components.
- In React, data flows in a **one-way (unidirectional) data flow** from parent to child.
- Props are **immutable**: a child component must never modify the props it receives.

### 3. Passing and Receiving Props
**Passing from Parent:**
```jsx
<UserCard name="Alice" role="Developer" isActive={true} />
```

**Receiving in Child (Destructuring):**
```jsx
function UserCard({ name, role, isActive }) {
  return <div>{name} - {role}</div>;
}
```

---

## Project Structure
```
SET-2/question1/
├── index.html
├── package.json
├── vite.config.js
├── THEORY.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── UserCard.jsx
    └── index.css
```

---

## How to Install and Run

1. Navigate to directory:
   ```bash
   cd SET-2/question1
   ```

2. Install dependencies:
   ```bash
   npm i
   ```

3. Run development server:
   ```bash
   npm run dev
   ```
