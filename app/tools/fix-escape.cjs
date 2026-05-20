const fs = require('fs');
const content = fs.readFileSync(__dirname + '/../src/data-content.ts', 'utf-8');

// The corruption: inside JSON "content" strings, bare quotes where \ was removed
// Fix: In "content" values, any " that is part of \x"Food\x" pattern needs \ before both quotes

// Strategy: Find all content strings and fix bare quotes inside them
// A bare " inside content should be \x" — add backslash where missing

let result = '';
let i = 0;
let fixed = 0;

while (i < content.length) {
  // Find "content": " patterns
  const contentMatch = content.substring(i).match(/"content": "/);
  if (!contentMatch) {
    result += content.substring(i);
    break;
  }
  
  const contentStart = i + contentMatch.index + contentMatch[0].length;
  result += content.substring(i, contentStart);
  
  // Now find the end of this content value
  // Walk through the content value tracking escapes
  let j = contentStart;
  let value = '';
  
  while (j < content.length) {
    const c = content[j];
    if (c === '\\') {
      // Escaped char — keep both characters
      value += '\\' + (j + 1 < content.length ? content[j + 1] : '');
      j += 2;
    } else if (c === '"') {
      // Check if this is a bare quote that should have been escaped
      // A bare quote inside content should be preceded by backslash
      // But we need to distinguish from the closing quote of the content value
      
      // Look ahead: if followed by , or \r or \n, it's the closing quote
      const rest = content.substring(j + 1).replace(/\s*$/, '');
      if (rest.startsWith(',') || rest.startsWith('}') || rest.startsWith(']') || rest.startsWith('\r') || rest.startsWith('\n')) {
        value += '"';
        j++;
        break;
      }
      
      // Otherwise, it's a bare quote inside the content — add backslash
      value += '\\"';
      fixed++;
      j++;
    } else {
      value += c;
      j++;
    }
  }
  
  result += value;
  i = j;
}

console.log(`Fixed ${fixed} bare quotes`);
fs.writeFileSync(__dirname + '/../src/data-content.ts', result, 'utf-8');
console.log('Saved');
