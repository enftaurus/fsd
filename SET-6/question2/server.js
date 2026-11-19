const EventEmitter = require('events');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4352;
const logFilePath = path.join(__dirname, 'event-log.txt');

// 1. Custom Event Logger extending EventEmitter
class EventLogger extends EventEmitter {
  logEvent(level, eventName, message, metadata = {}) {
    const timestamp = new Date().toISOString();
    const eventData = {
      timestamp,
      level,
      eventName,
      message,
      metadata
    };

    // Emit standard event
    this.emit('log', eventData);

    // Emit level-specific event
    this.emit(level, eventData);
  }
}

// 2. Instantiate Logger
const logger = new EventLogger();

// In-memory event array to show on webpage
const capturedEvents = [];

// 3. Register Event Listeners using .on()
logger.on('log', (data) => {
  const logLine = `[${data.timestamp}] [${data.level.toUpperCase()}] ${data.eventName}: ${data.message}`;
  console.log(logLine);
  capturedEvents.unshift(data);

  // Write to log file
  fs.appendFileSync(logFilePath, logLine + '\n');
});

logger.on('error', (data) => {
  console.error(`⚠️ CRITICAL ALERT TRIGGERED FOR EVENT: ${data.eventName}`);
});

// Seed some initial logged events
logger.logEvent('info', 'SYSTEM_STARTUP', 'Logger service initialized successfully');
logger.logEvent('info', 'DATABASE_CONNECTED', 'Connected to primary database cluster');
logger.logEvent('warn', 'HIGH_MEMORY_USAGE', 'RAM consumption reached 78% threshold');

app.use(express.json());

// Web UI
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SET-6 Q2: Node.js Events Logger</title>
      <style>
        body { font-family: sans-serif; max-width: 800px; margin: 30px auto; padding: 20px; background: #f8fafc; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
        input, select { padding: 8px; margin: 4px; border: 1px solid #cbd5e1; border-radius: 4px; }
        button { padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; background: #2563eb; color: white; }
        .event-item { padding: 10px; border-bottom: 1px solid #e2e8f0; font-family: monospace; font-size: 0.85rem; }
        .lvl-info { color: #0284c7; }
        .lvl-warn { color: #d97706; }
        .lvl-error { color: #dc2626; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>Node.js Events Module Logger</h1>
      <p>SET-6 Question 2: Emit and listen to custom events using <code>EventEmitter</code></p>

      <div class="card">
        <h3>Trigger New Event:</h3>
        <select id="eventLevel">
          <option value="info">INFO</option>
          <option value="warn">WARN</option>
          <option value="error">ERROR</option>
        </select>
        <input id="eventName" placeholder="Event Name (e.g. USER_PURCHASE)" value="USER_PURCHASE" />
        <input id="eventMessage" placeholder="Message" value="Customer purchased Premium Plan" style="width: 250px;" />
        <button onclick="triggerEvent()">Emit Event</button>
      </div>

      <div class="card">
        <h3>Live Event Stream:</h3>
        <div id="eventList"></div>
      </div>

      <script>
        async function fetchEvents() {
          const res = await fetch('/api/events');
          const events = await res.json();
          const list = document.getElementById('eventList');
          list.innerHTML = events.map(e =>
            '<div class="event-item">' +
            '<span class="lvl-' + e.level + '">[' + e.level.toUpperCase() + ']</span> ' +
            '<strong>' + e.eventName + '</strong>: ' + e.message +
            '<span style="color: #94a3b8; float: right;">' + new Date(e.timestamp).toLocaleTimeString() + '</span>' +
            '</div>'
          ).join('');
        }

        async function triggerEvent() {
          const level = document.getElementById('eventLevel').value;
          const eventName = document.getElementById('eventName').value;
          const message = document.getElementById('eventMessage').value;

          await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ level, eventName, message })
          });
          fetchEvents();
        }

        fetchEvents();
        setInterval(fetchEvents, 2000);
      </script>
    </body>
    </html>
  `);
});

app.get('/api/events', (req, res) => {
  res.json(capturedEvents);
});

app.post('/api/events', (req, res) => {
  const { level, eventName, message } = req.body;
  logger.logEvent(level || 'info', eventName || 'CUSTOM_EVENT', message || 'Event triggered');
  res.json({ success: true, message: 'Event emitted' });
});

app.listen(PORT, () => {
  console.log(`Event Logger Server running at http://localhost:${PORT}/`);
});
