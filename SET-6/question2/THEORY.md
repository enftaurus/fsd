# SET-6 Question 2: Node.js Program Logging Events using Events Module

## Problem Statement
Create a Node program that logs events using the Events module.

---

## Theory & Concepts

### 1. The `events` Module in Node.js
Much of Node.js core architecture is built around an asynchronous, event-driven pattern where objects called "emitters" emit named events that cause `Function` objects ("listeners") to be called.

### 2. The `EventEmitter` Class
To use events:
```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();
```

### 3. Key Methods:
- **`emitter.on(eventName, listener)`**: Registers a listener function for the event.
- **`emitter.emit(eventName, [...args])`**: Synchronously calls each listener registered for the event, in registration order, passing the supplied arguments.
- **`emitter.once(eventName, listener)`**: Registers a listener that is called at most once after which it is removed.

### 4. Custom Logger Example
```javascript
class Logger extends EventEmitter {
  log(message) {
    this.emit('messageLogged', { id: 1, text: message });
  }
}
```

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-6/question2
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:4352` to emit custom events and see them logged live!
