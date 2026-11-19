# SET-12 Question 2: Multi-Page Application Using React Router

## Problem Statement
Create a multi-page application using React Router.

---

## Theory & Concepts

### 1. Single Page Applications (SPA) & Client-Side Routing
In traditional multi-page websites, clicking a link requests an entirely new HTML document from the server. In a **React SPA**, JavaScript intercepts link clicks, swaps UI components dynamically, and updates the browser URL without ever refreshing the page.

### 2. Core React Router Components (`react-router-dom` v6)
- **`<BrowserRouter>`**: Wraps the entire application, synchronizing the UI with the browser's `window.location` using HTML5 History API.
- **`<Routes>`**: Container that looks through all its child `<Route>` elements to find a match.
- **`<Route path="..." element={<Component />} />`**: Pairs a URL path with a React component to render.
- **`<NavLink>`**: A specialized `<Link>` that provides an `isActive` state to style active navigation links automatically.

### 3. Syntax Example
```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-12/question2
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Click between Home, About, Services, and Contact without page reloads!
