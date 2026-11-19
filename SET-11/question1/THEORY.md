# SET-11 Question 1: Node.js EventEmitter "userLoggedIn" Event

## Problem Statement
Create a custom event using Node.js `EventEmitter`, trigger it, and listen for the `userLoggedIn` event.

---

## Theory & Concepts

### 1. The `EventEmitter` Class
In Node.js, the `events` module provides the `EventEmitter` class which implements the **Observer Design Pattern**:
- An **Emitter** object broadcasts an event.
- One or more **Listeners** (subscriber functions) listen for and respond to that event.

### 2. Creating & Listening for an Event
```javascript
const EventEmitter = require('events');
const authEmitter = new EventEmitter();

// 1. Register listener with .on()
authEmitter.on('userLoggedIn', (user) => {
  console.log(`User ${user.username} logged in at ${user.loginTime}`);
});
```

### 3. Emitting (Triggering) the Event
```javascript
// 2. Trigger the event with .emit()
authEmitter.emit('userLoggedIn', {
  username: 'alice',
  userId: '101',
  loginTime: new Date()
});
```

### 4. Multiple Listeners
Multiple independent functions can listen to the same `userLoggedIn` event (e.g. an audit logger, an email notifier, and a metrics tracker), promoting decoupled, modular code.

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-11/question1
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:4352` and trigger login events to watch them broadcast!
