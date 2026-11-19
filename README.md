# Full Stack Development (FSD) Lab Solutions: SET-1 to SET-15

This repository contains complete, production-quality, tested solutions for all 15 sets (30 questions total).

Each question is placed in its own dedicated folder following the required naming convention (`SET-X/question1` and `SET-X/question2`). Every folder contains:
1. `package.json` with standard `dev` and `start` scripts.
2. `THEORY.md` explaining all concepts, lifecycle, syntax, and step-by-step running instructions.
3. Fully functional code files (React apps, Express servers, Node HTTP/FS/Events programs, MongoDB scripts).
4. Web-accessible interactive interfaces for immediate testing upon running `npm run dev`.

---

## Quick Start (How to Run Any Question)

To run any question:
```bash
# 1. Navigate to the question folder (e.g., SET-1/question1)
cd SET-1/question1

# 2. Install dependencies
npm i

# 3. Start the dev server / web application
npm run dev
```
Then open your browser at the displayed URL (typically `http://localhost:4352`).

---

## Master Directory & Topic Map

| Set | Question | Path | Description | Tech Stack |
|---|---|---|---|---|
| **SET-1** | Q1 | [`SET-1/question1`](./SET-1/question1) | Button that updates state when clicked (`useState()`) | React (Vite) |
| **SET-1** | Q2 | [`SET-1/question2`](./SET-1/question2) | Simple HTTP server returning a plain text message | Node.js `http` |
| **SET-2** | Q1 | [`SET-2/question1`](./SET-2/question1) | Build a functional component and pass props to it | React (Vite) |
| **SET-2** | Q2 | [`SET-2/question2`](./SET-2/question2) | Create routes for GET, POST, PUT, DELETE in Express | Express.js |
| **SET-3** | Q1 | [`SET-3/question1`](./SET-3/question1) | Create a list of names using `map()` and render it | React (Vite) |
| **SET-3** | Q2 | [`SET-3/question2`](./SET-3/question2) | Query documents using filters (`$gt`, `$eq`, `$gte`, `$in`) | Node.js + MongoDB |
| **SET-4** | Q1 | [`SET-4/question1`](./SET-4/question1) | Parent component passing props to multiple child components | React (Vite) |
| **SET-4** | Q2 | [`SET-4/question2`](./SET-4/question2) | Complete REST API (CRUD) for User model | Express.js + MongoDB |
| **SET-5** | Q1 | [`SET-5/question1`](./SET-5/question1) | Demonstrate blocking vs non-blocking code example | Node.js `fs` |
| **SET-5** | Q2 | [`SET-5/question2`](./SET-5/question2) | Create routes and redirect from one route to another | Express.js |
| **SET-6** | Q1 | [`SET-6/question1`](./SET-6/question1) | Class component that displays a message using state | React (Vite) |
| **SET-6** | Q2 | [`SET-6/question2`](./SET-6/question2) | Node program that logs events using the Events module | Node.js `events` |
| **SET-7** | Q1 | [`SET-7/question1`](./SET-7/question1) | Node.js program using FS module to create a file | Node.js `fs` |
| **SET-7** | Q2 | [`SET-7/question2`](./SET-7/question2) | Node.js program to update documents in MongoDB | Node.js + MongoDB |
| **SET-8** | Q1 | [`SET-8/question1`](./SET-8/question1) | Simple HTML form collecting user name with welcome banner | HTML5 + CSS + Express |
| **SET-8** | Q2 | [`SET-8/question2`](./SET-8/question2) | JavaScript function that finds the longest word in a string | JavaScript ES6+ |
| **SET-9** | Q1 | [`SET-9/question1`](./SET-9/question1) | MongoDB database & collection: Add, Update, Delete doc | Node.js + MongoDB |
| **SET-9** | Q2 | [`SET-9/question2`](./SET-9/question2) | `useEffect` cleanup function to start/clear a timer on unmount | React (Vite) |
| **SET-10**| Q1 | [`SET-10/question1`](./SET-10/question1)| Node.js program using HTTP module to create a file | Node.js `http` + `fs` |
| **SET-10**| Q2 | [`SET-10/question2`](./SET-10/question2)| Basic Express server with GET route | Express.js |
| **SET-11**| Q1 | [`SET-11/question1`](./SET-11/question1)| Custom event with EventEmitter listening for `userLoggedIn` | Node.js `events` |
| **SET-11**| Q2 | [`SET-11/question2`](./SET-11/question2)| Handle form data using `express.json()` and `express.urlencoded()`| Express.js |
| **SET-12**| Q1 | [`SET-12/question1`](./SET-12/question1)| Stateless functional component displaying greeting message | React (Vite) |
| **SET-12**| Q2 | [`SET-12/question2`](./SET-12/question2)| Multi-page application using React Router | React + React Router |
| **SET-13**| Q1 | [`SET-13/question1`](./SET-13/question1)| Dynamic text color change on button click using state | React (Vite) |
| **SET-13**| Q2 | [`SET-13/question2`](./SET-13/question2)| Array of strings logged to console using `forEach()` | JavaScript ES6+ |
| **SET-14**| Q1 | [`SET-14/question1`](./SET-14/question1)| Click event that counts button clicks | React (Vite) |
| **SET-14**| Q2 | [`SET-14/question2`](./SET-14/question2)| Dynamic list with input, add, and remove buttons | React (Vite) |
| **SET-15**| Q1 | [`SET-15/question1`](./SET-15/question1)| JSX literals & expressions to display user details (name, age)| React (Vite) |
| **SET-15**| Q2 | [`SET-15/question2`](./SET-15/question2)| React form with real-time validation (required, email, min length)| React (Vite) |



scp -r cse24160@10.3.1.37:~/fsd "%USERPROFILE%\Downloads\"
