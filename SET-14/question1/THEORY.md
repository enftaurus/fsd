# SET-14 Question 1: Click Event Counting Button Clicks

## Problem Statement
Create a click event that counts button clicks.

---

## Theory & Concepts

### 1. Event Handling in React
React handles DOM events using camelCase syntax (e.g., `onClick` instead of HTML `onclick`). Event handlers are passed as function references rather than strings:
```jsx
<button onClick={handleClick}>Click Me</button>
```

### 2. SyntheticEvent
React wraps native browser events in cross-browser `SyntheticEvent` wrappers ensuring consistent behavior across different browsers.

### 3. State Updating
Click counts are preserved across renders using state:
```javascript
const [clicks, setClicks] = useState(0);
const handleClick = () => setClicks(prev => prev + 1);
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-14/question1
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
