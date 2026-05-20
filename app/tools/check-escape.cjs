const fs = require('fs');
const content = fs.readFileSync('src/data-content.ts', 'utf-8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Look for content lines that have unescaped quotes breaking JSON
  if (!line.includes('"content":')) continue;
  
  // Count quotes to see if they're properly paired
  let quoteCount = 0;
  let prevWasBackslash = false;
  let problems = [];
  for (let j = 0; j < line.length; j++) {
    const c = line[j];
    if (c === '\\' && !prevWasBackslash) {
      prevWasBackslash = true;
      continue;
    }
    if (c === '"' && !prevWasBackslash) {
      quoteCount++;
    }
    prevWasBackslash = false;
  }
  
  // A proper content line should have: "content": "..." with the value needing 
  // quotes matching. The structure is:
  //   "content": "value"
  // Inside value, quotes are escaped as \"
  // In TS, the line might be: "content": "...\"...",
  // Or it could be a template literal with backticks
  
  // Quick heuristic: count all " and check if even
  const allQuotes = line.match(/"/g);
  if (allQuotes && allQuotes.length % 2 !== 0) {
    console.log(`Line ${i+1}: ODD number of quotes (${allQuotes.length})`);
    console.log(`  ${line.substring(0, 150)}`);
  }
}
console.log('Done checking.');
