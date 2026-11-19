# SET-6 Question 1: React Class Component with State

## Problem Statement
Build a class component that displays a message using state.

---

## Theory & Concepts

### 1. What is a Class Component?
Before React Hooks (v16.8), class components extending `React.Component` were the primary way to manage state and lifecycle in React.

### 2. Constructor & Initial State
- The `constructor(props)` method is called when an instance of the component is created.
- You must call `super(props)` before accessing `this.props`.
- State is initialized as an object:
```javascript
constructor(props) {
  super(props);
  this.state = { message: 'Initial Message' };
}
```

### 3. Updating State with `this.setState()`
- State in class components is updated via `this.setState()`.
- **Never mutate state directly** (e.g., `this.state.message = ...` is illegal because it will not trigger a re-render).
- `setState()` can accept an object or an updater function:
```javascript
this.setState({ message: 'New Message' });
// Or with previous state:
this.setState(prevState => ({ count: prevState.count + 1 }));
```

### 4. Method Binding
In JavaScript classes, methods are not bound to `this` by default. You bind them in the constructor:
```javascript
this.handleClick = this.handleClick.bind(this);
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-6/question1
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
