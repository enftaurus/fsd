# SET-13 Question 1: Dynamic Text Color on Button Click

## Problem Statement
Build a React component where the text color dynamically changes each time a button is clicked using state.

---

## Theory & Concepts

### 1. Dynamic Inline Styles in React
React accepts inline styles through the `style` attribute as a JavaScript object (camelCased properties):
```jsx
<h2 style={{ color: currentColor }}>Dynamic Text</h2>
```

### 2. Managing Color State with `useState`
We store either the color hex code or an index to an array of colors in React state:
```javascript
const [colorIndex, setColorIndex] = useState(0);
```

### 3. Modulo Arithmetic for Cycling
To cycle through an array of colors indefinitely without going out of bounds:
```javascript
setColorIndex(prev => (prev + 1) % colors.length);
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-13/question1
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
