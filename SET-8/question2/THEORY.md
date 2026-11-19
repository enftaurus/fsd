# SET-8 Question 2: JavaScript Function to Find Longest Word in a String

## Problem Statement
Write a JavaScript function that finds the longest word in a string.

---

## Theory & Concepts

### 1. Algorithm Overview
1. Clean the string to remove punctuation symbols (e.g. `,`, `.`, `!`, `?`).
2. Split the string by whitespace into an array of individual words using `str.split(/\s+/)`.
3. Iterate through the array or use `Array.prototype.reduce()` to track the word with the highest `.length`.
4. Return the longest word and its length.

### 2. Implementation Approaches

#### Approach A: Using `reduce()`
```javascript
function findLongestWord(str) {
  const words = str.replace(/[^a-zA-Z0-9\s]/g, '').split(' ');
  return words.reduce((longest, current) =>
    current.length > longest.length ? current : longest
  , "");
}
```

#### Approach B: Using `for...of` Loop
```javascript
function findLongestWord(str) {
  const words = str.match(/\w+/g) || [];
  let longest = "";
  for (const word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }
  return longest;
}
```

### 3. Time and Space Complexity
- **Time Complexity**: $\mathcal{O}(n)$, where $n$ is the length of the string, since we traverse the string to split and scan words.
- **Space Complexity**: $\mathcal{O}(w)$, where $w$ is the number of words stored in memory.

---

## How to Install and Run

1. Navigate:
   ```bash
   cd SET-8/question2
   ```
2. Install dependencies:
   ```bash
   npm i
   ```
3. Run:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:4352` to test with custom text phrases!
