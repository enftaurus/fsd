const express = require('express');
const app = express();
const PORT = process.env.PORT || 4352;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SET-8 Q1: HTML Form & Welcome Message</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f1f5f9;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
        }
        .container {
          background: white;
          padding: 35px 30px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          max-width: 420px;
          width: 100%;
          text-align: center;
        }
        h2 { color: #1e3a8a; margin-top: 0; }
        p { color: #64748b; font-size: 0.95rem; }
        .form-group {
          margin: 20px 0;
          text-align: left;
        }
        label {
          display: block;
          font-weight: 600;
          margin-bottom: 6px;
          color: #334155;
        }
        input[type="text"] {
          width: 100%;
          box-sizing: border-box;
          padding: 12px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }
        input[type="text"]:focus {
          border-color: #2563eb;
        }
        button {
          width: 100%;
          padding: 12px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        button:hover { background: #1d4ed8; }
        .welcome-card {
          margin-top: 25px;
          padding: 20px;
          background: #dbeafe;
          border: 1px solid #93c5fd;
          border-radius: 8px;
          animation: fadeIn 0.4s ease-in-out;
        }
        .welcome-title {
          font-size: 1.3rem;
          font-weight: bold;
          color: #1e40af;
          margin: 0 0 6px;
        }
        .welcome-sub {
          color: #1e3a8a;
          margin: 0;
          font-size: 0.9rem;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>User Welcome Portal</h2>
        <p>SET-8 Question 1: Form Submission</p>

        <form id="nameForm" onsubmit="handleSubmit(event)">
          <div class="form-group">
            <label for="userName">Enter Your Name:</label>
            <input type="text" id="userName" name="userName" placeholder="e.g. Alex Johnson" required autocomplete="off" />
          </div>
          <button type="submit">Submit & Welcome</button>
        </form>

        <div id="welcomeContainer" style="display: none;" class="welcome-card">
          <div class="welcome-title" id="welcomeMessage"></div>
          <p class="welcome-sub">We are thrilled to have you here today!</p>
        </div>
      </div>

      <script>
        function handleSubmit(e) {
          e.preventDefault(); // Prevent full page reload
          const nameInput = document.getElementById('userName');
          const name = nameInput.value.trim();

          if (name) {
            const welcomeContainer = document.getElementById('welcomeContainer');
            const welcomeMessage = document.getElementById('welcomeMessage');

            welcomeMessage.textContent = '🎉 Welcome, ' + name + '!';
            welcomeContainer.style.display = 'block';
          }
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`HTML Form Server running at http://localhost:${PORT}/`);
});
