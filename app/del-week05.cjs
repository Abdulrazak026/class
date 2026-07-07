const fs = require('fs');
const file = 'C:/Users/user/Desktop/cyber/app/src/phases/phase0.ts';
let content = fs.readFileSync(file, 'utf8');

// Find week05 module start
const week05Idx = content.indexOf('id: "week05"');
if (week05Idx === -1) { console.log('week05 not found'); process.exit(0); }

// Find the opening { of the module
const start = content.lastIndexOf('{', week05Idx);

// Find the closing } of the module
let braceCount = 0;
let end = start;
for (let i = start; i < content.length; i++) {
  if (content[i] === '{') braceCount++;
  if (content[i] === '}') braceCount--;
  if (braceCount === 0) { end = i + 1; break; }
}

// Remove the module and fix the ending
content = content.substring(0, start).replace(/,\s*$/, '') + '\n];\n';

fs.writeFileSync(file, content, 'utf8');
console.log('Deleted week05 from phase0.ts');
