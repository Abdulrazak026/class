const fs = require('fs');
const file = 'C:/Users/user/Desktop/cyber/app/src/phases/phase0.ts';
let content = fs.readFileSync(file, 'utf8');

// Find week05 module start
const week05Start = content.indexOf('id: "week05"');
if (week05Start === -1) { console.log('week05 not found'); process.exit(0); }

// Find the start of the module object
let start = content.lastIndexOf('{', week05Start);

// Find the end of the module
let braceCount = 0;
let end = start;
for (let i = start; i < content.length; i++) {
  if (content[i] === '{') braceCount++;
  if (content[i] === '}') braceCount--;
  if (braceCount === 0) {
    end = i + 1;
    break;
  }
}

// Remove the module
content = content.substring(0, start) + content.substring(end);

// Clean up trailing comma before ];
content = content.replace(/,\s*\n\s*\n\s*];/, '\n];');

fs.writeFileSync(file, content, 'utf8');
console.log('Removed week05 module');
