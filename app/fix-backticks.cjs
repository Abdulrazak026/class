const fs = require('fs');
const file = 'C:/Users/user/Desktop/cyber/app/src/phases/phase1.ts';
let content = fs.readFileSync(file, 'utf8');

// Find the we06d05 content section (Network Fundamentals)
// The content starts with `:::objectives and ends with the closing backtick

// Strategy: Find all triple backticks that are NOT inside template literals
// and escape them

// First, find all template literal boundaries
const lines = content.split('\n');
let inTemplate = false;
let templateStart = -1;
let changes = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check for template literal start
  if (line.includes('content: `') || line.match(/^\s*content:\s*`/)) {
    inTemplate = true;
    templateStart = i;
  }
  
  // Check for template literal end
  if (inTemplate && (line.trim().endsWith('`,') || line.trim() === '`,' || line.trim() === '`')) {
    inTemplate = false;
  }
  
  // If inside template literal, escape triple backticks
  if (inTemplate && line.match(/^```/)) {
    lines[i] = '\\`\\`\\`' + line.substring(3);
    changes++;
  }
  if (inTemplate && line.match(/^```$/)) {
    lines[i] = '\\`\\`\\`';
    changes++;
  }
}

content = lines.join('\n');
fs.writeFileSync(file, content, 'utf8');
console.log(`Fixed ${changes} triple backtick lines`);
