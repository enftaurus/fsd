const express = require('express');
const app = express();
const PORT = process.env.PORT || 4352;

// ========================================================
// CORE FUNCTION: Find the Longest Word in a String
// ========================================================
function findLongestWord(str) {
  if (!str || typeof str !== 'string') {
    return { longestWord: '', length: 0, allLongest: [] };
  }

  // 1. Remove punctuation using regex and split by spaces
  const cleanStr = str.replace(/[^a-zA-Z0-9\s]/g, ' ');
  const words = cleanStr.split(/\s+/).filter(word => word.length > 0);

  if (words.length === 0) {
    return { longestWord: '', length: 0, allLongest: [] };
  }

  // 2. Find maximum length using reduce
  const longestWord = words.reduce((longest, current) => {
    return current.length > longest.length ? current : longest;
  }, "");

  // 3. Find any ties
  const allLongest = words.filter(w => w.length === longestWord.length);

  return {
    longestWord,
    length: longestWord.length,
    allLongest: [...new Set(allLongest)],
    totalWords: words.length
  };
}

// Print test in console
const sampleText = "The quick brown fox jumped over the extraordinarily lazy dog.";
console.log('Sample String:', sampleText);
console.log('Result:', findLongestWord(sampleText));

app.use(express.json());

// Interactive Web UI
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SET-8 Q2: Find Longest Word in String</title>
      <style>
        body { font-family: sans-serif; max-width: 750px; margin: 40px auto; padding: 20px; background: #f8fafc; }
        .card { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
        textarea { width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 1rem; }
        button { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; background: #2563eb; color: white; margin-top: 10px; }
        .result-box { margin-top: 20px; padding: 20px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; }
        .highlight { font-size: 1.8rem; font-weight: bold; color: #15803d; }
      </style>
    </head>
    <body>
      <h1>Longest Word Finder in JavaScript</h1>
      <p>SET-8 Question 2: JavaScript function to find the longest word in any given string</p>

      <div class="card">
        <label><strong>Enter Any Sentence or Paragraph:</strong></label>
        <textarea id="inputText" rows="4">The quick brown fox jumped over the extraordinarily lazy dog.</textarea>
        <button onclick="calculateLongest()">Find Longest Word</button>

        <div id="resultCard" class="result-box" style="display: none;">
          <div>Longest Word Found:</div>
          <div class="highlight" id="resWord"></div>
          <p style="margin: 8px 0 0; color: #374151;">
            Word Length: <strong id="resLength"></strong> characters &bull; Total Words Checked: <strong id="resCount"></strong>
          </p>
        </div>
      </div>

      <script>
        function calculateLongest() {
          const text = document.getElementById('inputText').value;
          const clean = text.replace(/[^a-zA-Z0-9\s]/g, ' ');
          const words = clean.split(/\s+/).filter(w => w.length > 0);

          if (words.length === 0) {
            alert('Please enter at least one word.');
            return;
          }

          let longest = "";
          for (let w of words) {
            if (w.length > longest.length) longest = w;
          }

          document.getElementById('resWord').textContent = '"' + longest + '"';
          document.getElementById('resLength').textContent = longest.length;
          document.getElementById('resCount').textContent = words.length;
          document.getElementById('resultCard').style.display = 'block';
        }

        // Run on load
        calculateLongest();
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Longest Word Finder running at http://localhost:${PORT}/`);
});
