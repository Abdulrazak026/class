const fs = require('fs');
const content = fs.readFileSync('src/data-content.ts', 'utf-8');

// Find lines containing both "Food" and escaped quote issues
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Check for \" without preceding backslash (broken escaping)
  // In a TS file, JSON strings use \" for escaped quotes inside
  const matches = line.match(/[^\\]""/g);
  if (matches && line.includes('"content"')) {
    console.log(`Line ${i+1}: double quote issue`);
    console.log(`  ${line.substring(0, 200)}`);
  }
}

// Check for the specific arrow issue - my replacement might have removed \ before "
// Look for patterns where → appears inside a JSON string value
let pos = 0;
let found = 0;
while ((pos = content.indexOf('\u2192', pos)) >= 0 && found < 10) {
  const start = Math.max(0, pos - 30);
  const ctx = content.substring(start, pos + 40);
  // The content is wrapped in " " — check for improper escaping
  console.log(`Arrow at ${pos}: ${JSON.stringify(ctx)}`);
  pos++;
  found++;
}
