const fs = require('fs');
const file = 'C:/Users/user/Desktop/cyber/app/src/phases/phase1.ts';
let content = fs.readFileSync(file, 'utf8');

// Find the we06d05 content section
const startMarker = 'id: "we06d05"';
const startIdx = content.indexOf(startMarker);
if (startIdx === -1) { console.log('we06d05 not found'); process.exit(0); }

// Find the content field
const contentStart = content.indexOf('content: `', startIdx);
if (contentStart === -1) { console.log('content field not found'); process.exit(0); }

// Find the end of the content field (look for the closing backtick)
let inContent = true;
let i = contentStart + 9; // Skip 'content: `'
let contentEnd = -1;

while (i < content.length) {
  if (content[i] === '`' && content[i-1] !== '\\') {
    // Check if this is the closing backtick (followed by comma or newline)
    const nextChar = content[i+1];
    if (nextChar === ',' || nextChar === '\n' || nextChar === undefined) {
      contentEnd = i;
      break;
    }
  }
  i++;
}

if (contentEnd === -1) { console.log('Could not find end of content'); process.exit(0); }

// Extract the content
const contentField = content.substring(contentStart, contentEnd + 1);

// Fix single backticks inside the content (but not the outer backticks)
// Replace ` with \` inside the content, but not at the start/end
let fixed = contentField;
// Replace backticks that are not at the start or end
fixed = fixed.replace(/(?<!\\)`/g, '\\`');
// Fix the outer backticks
fixed = fixed.replace(/^content: \\`/, 'content: `');
fixed = fixed.replace(/\\`$/, '`');

content = content.substring(0, contentStart) + fixed + content.substring(contentEnd + 1);
fs.writeFileSync(file, content, 'utf8');
console.log('Fixed we06d05 content backticks');
