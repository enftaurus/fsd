# SET-15 Question 2: React Real-Time Form Validation

## Problem Statement
Create a React form component that performs real-time validation for:
- Required fields
- Email format (Regex)
- Minimum length

---

## Theory & Concepts

### 1. Controlled Components in React
Form input elements whose values are controlled by React state rather than the DOM itself are called **controlled components**:
```jsx
<input
  value={formData.email}
  onChange={(e) => handleChange(e)}
/>
```

### 2. Real-Time Validation Pattern
Validations run synchronously upon every keystroke (`onChange`) or when the user leaves the input (`onBlur`):
- **Required**: `!value.trim()`
- **Minimum Length**: `value.length < minLength`
- **Email Regex**: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)`

### 3. User Experience (UX) Best Practices
- **Touched State**: Prevent displaying error messages before the user has touched or interacted with the field.
- **Visual Feedback**: Border color changes to green (valid) or red (invalid) with helpful error descriptions.
- **Button Disabling**: Keep submit button disabled until all constraints are satisfied.

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-15/question2
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Type in each field to watch live validation indicators update!
