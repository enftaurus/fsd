# SET-9 Question 2: useEffect Cleanup Function in React

## Problem Statement
Demonstrate the use of the `useEffect` cleanup function in React to start a timer and properly clear it when the component unmounts.

---

## Theory & Concepts

### 1. What is `useEffect` in React?
The `useEffect` hook lets you synchronize a component with external systems (such as setting up subscriptions, event listeners, or timers).

### 2. The Problem with Timers and Memory Leaks
If you start a timer (`setInterval`) inside a component and the user navigates away or unmounts the component without clearing it, the timer continues running in background memory indefinitely. This is a common **memory leak**.

### 3. The Cleanup Function
To clean up side effects, return a function from the effect callback:
```javascript
useEffect(() => {
  // Setup: runs after render
  const intervalId = setInterval(() => {
    console.log('Tick');
  }, 1000);

  // Cleanup: runs before component unmounts
  return () => {
    clearInterval(intervalId);
  };
}, []);
```

### 4. When Does the Cleanup Function Run?
1. **When the component unmounts** from the DOM.
2. **Before the effect runs again** if dependencies change.

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-9/question2
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Click **Unmount Timer Component** to see the cleanup function execute in real-time!
