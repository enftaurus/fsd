# SET-4 Question 1: Parent Component Passing Props to Multiple Child Components

## Problem Statement
Create a parent component passing props to multiple child components.

---

## Theory & Concepts

### 1. Component Composition in React
React's design philosophy encourages breaking complex UIs into small, reusable components. A top-level container component (**Parent**) maintains application state and distributes slices of data and callback functions to various specialized **Child Components**.

### 2. Passing Different Props to Different Children
A parent can render multiple child components and pass customized props to each:
```jsx
function Dashboard() {
  const [user, setUser] = useState({ name: 'Alex' });
  const [stats, setStats] = useState([...]);

  return (
    <div>
      <Header user={user} />
      <StatWidget stats={stats} />
      <ActivityFeed onClear={() => ...} />
    </div>
  );
}
```

### 3. Benefits of this Architecture
- **Single Responsibility Principle**: Each child component focuses on rendering one specific piece of UI.
- **Maintainability**: Changes in one child component do not affect sibling components.
- **Reusability**: Components like `StatWidget` can be rendered repeatedly with different inputs.

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-4/question1
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
