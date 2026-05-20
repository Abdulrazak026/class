const fs = require('fs');
const content = fs.readFileSync('src/data-content.ts', 'utf-8');
const lines = content.split('\n');

// Count how many " instances are unescaped inside JSON strings
// In a .ts file, JSON strings are inside backtick-quoted template literals
// Check for unescaped " that break the JSON

// Let's check line 958 specifically
const line958 = lines[957];
console.log('Line 958 length:', line958.length);

// Check for unescaped quotes at suspicious positions
let inString = false;
let prevChar = '';
let issues = [];
for (let i = 0; i < line958.length; i++) {
  const c = line958[i];
  if (c === '"' && prevChar !== '\\') {
    // This is an unescaped quote
    // Count how many unescaped quotes we've seen
  }
  prevChar = c;
}

// Simpler approach: find " patterns that look wrong
const tokens = line958.match(/"/g);
console.log('Total " chars:', tokens ? tokens.length : 0);

// Count properly escaped quotes (preceded by \)
const escapedQuotes = line958.match(/\\"/g);
console.log('Escaped \\" quotes:', escapedQuotes ? escapedQuotes.length : 0);

// Estimate: for a JSON string inside a TS string, the structure is:
// "content": "..."
// The content value is a string enclosed in "..."
// Inside that, " must be escaped as \"
// In the TS file, this becomes \\"

// Check for any " that comes right after a word without \\
const badPattern = line958.match(/[a-zA-Z0-9]","/g);
if (badPattern) console.log('Potential issues:', badPattern);

// Let me just try to parse the ENTIRE file as a JS module by looking for obvious JSON array issues
// The file defines: export const curriculum = [...]
// Let me check if the array is properly structured

// Try to find the error by checking brace/bracket balance near line 958
let depth = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (const c of line) {
    if (c === '{' || c === '[') depth++;
    if (c === '}' || c === ']') depth--;
  }
  if (i >= 955 && i <= 965) {
    console.log(`Line ${i+1}: depth=${depth}`);
  }
}
console.log('Final depth:', depth);
