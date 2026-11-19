# SET-12 Question 1: Stateless Functional Greeting Component

## Problem Statement
Create a stateless functional component that displays a greeting message.

---

## Theory & Concepts

### 1. What is a Stateless Functional Component?
A **stateless functional component** (also called a presentational or "dumb" component) is a JavaScript function that:
- Accepts `props` as its argument.
- Returns JSX elements.
- **Does not manage internal state** (does not use `useState` or class `this.state`).
- Does not contain side effects.

### 2. Characteristics & Benefits
- **Pure Functions**: Given the same props, they always return identical JSX output.
- **Easy to Test**: No setup or mock state needed; just pass props and assert rendered HTML.
- **High Performance**: Lightweight with minimal overhead.

### 3. Syntax Example
```jsx
function Greeting({ name, timeOfDay }) {
  return <h2>Good {timeOfDay}, {name}!</h2>;
}
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-12/question1
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
