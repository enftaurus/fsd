# SET-15 Question 1: JSX Literals & Expressions

## Problem Statement
Create a component using JSX literals & expressions to display user details (name, age).

---

## Theory & Concepts

### 1. What is JSX?
JSX (JavaScript XML) is a syntax extension for JavaScript that looks like HTML. Under the hood, JSX compiles into `React.createElement()` calls.

### 2. Embedding JavaScript Expressions in JSX: Curly Braces `{}`
Any valid JavaScript expression can be placed inside curly braces `{}` within JSX:
- **Variables**: `{user.name}`, `{user.age}`
- **Arithmetic**: `{2026 - user.birthYear}`
- **String Methods**: `{user.name.toUpperCase()}`
- **Template Literals**: `{`${user.firstName} ${user.lastName}`}`
- **Function Calls**: `{formatDate(user.registeredAt)}`
- **Ternary Operators**: `{user.age >= 18 ? 'Adult' : 'Minor'}`

### 3. Syntax Rules
- Statements like `if/else` or `for` cannot be used directly inside `{}` (use ternary operators `? :` or `.map()` instead).
- All tags must be properly closed (`<img />`, `<input />`).

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-15/question1
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
