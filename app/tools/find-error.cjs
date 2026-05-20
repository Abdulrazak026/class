const fs = require('fs');
const lines = fs.readFileSync(__dirname + '/../src/data-content.ts', 'utf-8').split('\n');
const line = lines[957]; // line 958 (0-indexed)

// Find where the content string starts
const contentKey = '"content": "';
const start = line.indexOf(contentKey);
if (start === -1) {
  console.log('Could not find "content": " on line 958');
  console.log('First 200 chars:', line.substring(0, 200));
  process.exit(1);
}

const contentStart = start + contentKey.length;
console.log('Content starts at column:', contentStart + 1);

// Walk through the content string tracking escaped quotes
let i = contentStart;
let output = '';
while (i < line.length) {
  const c = line[i];
  if (c === '\\') {
    // Escaped char - output both chars
    output += '\\' + (i + 1 < line.length ? line[i + 1] : 'EOF');
    i += 2;
  } else if (c === '"') {
    // This should be the closing quote of the content value
    // But first check if this is a legitimate closing quote
    console.log(`\nFOUND unescaped quote at column ${i + 1}`);
    console.log(`Context before: ${JSON.stringify(line.substring(Math.max(0, i - 30), i))}`);
    console.log(`Context after:  ${JSON.stringify(line.substring(i + 1, Math.min(line.length, i + 40)))}`);
    console.log(`Output so far: ${JSON.stringify(output.substring(output.length - 60))}`);
    output += '"';
    
    // Continue to see if this is actually the closing quote
    // A closing quote should be followed by , or \n or \r\n
    const rest = line.substring(i + 1).trim();
    if (rest.startsWith(',') || rest.startsWith('}') || rest.startsWith(']')) {
      console.log('This is the ENDING quote of the content value (valid)');
      i++;
      break;
    } else {
      console.log('WARNING: This quote is NOT followed by , or } — might be BROKEN escaping');
      i++;
    }
  } else {
    output += c;
    i++;
  }
}

// Show the rest of the line after the closing quote
if (i < line.length) {
  console.log(`\nAfter content value: ${JSON.stringify(line.substring(i, i + 50))}`);
}
