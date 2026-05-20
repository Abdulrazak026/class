const fs = require('fs');
const content = fs.readFileSync('src/data-content.ts', 'utf-8');

// Find patterns where we suspect \" was broken into just "
// The typical pattern is: a bare " inside a content string
// that's NOT preceded by a backslash but SHOULD be

// Check for known patterns from the original file
const patterns = [
  // Excel formula arguments with broken escaping
  ['"Food")', '\\"Food\\")'],
  ['"Electronics",', '\\"Electronics\\",'],
  ['"Clothing",', '\\"Clothing\\",'],
  ['"East")', '\\"East\\")'],
  ['"North")', '\\"North\\")'],
  ['"Food\\")', '\\"Food\\")'],  // already has backslash? hmm
];

// Let me just find ALL cases of a quote preceded by letter/comma/paren
// that might be inside a JSON string value
const suspectQuotes = [];
let idx = 0;
while ((idx = content.indexOf('"', idx)) >= 0) {
  // Check if preceded by a backslash
  const prev = idx > 0 ? content[idx - 1] : '';
  // Check if followed by word char (like "Food, "Electronics)
  const next = idx + 1 < content.length ? content[idx + 1] : '';
  
  // We want quotes that are:
  // - NOT preceded by backslash (so not \")
  // - Followed by an uppercase letter (likely start of "Food", "Electronics", etc.)
  // - OR preceded by a comma and space (likely end of argument)
  if (prev !== '\\' && /[A-Z]/.test(next)) {
    suspectQuotes.push({ idx, context: content.substring(Math.max(0, idx - 20), idx + 30) });
  }
  idx++;
}

console.log('Bare quotes before uppercase words:', suspectQuotes.length);
for (const q of suspectQuotes.slice(0, 15)) {
  console.log(`  ${q.idx}: ${JSON.stringify(q.context)}`);
}

// Also find bare quotes after word chars (closing quotes without backslash)
const closingQuotes = [];
let pos = 0;
while ((pos = content.indexOf('"', pos)) >= 0) {
  const prev = pos > 0 ? content[pos - 1] : '';
  const prev2 = pos > 1 ? content[pos - 2] : '';
  // Looking for " that ends a word but isn't preceded by \
  // Like: toString"  or Food"  or ,"
  if (prev !== '\\' && /[a-zA-Z0-9)]/.test(prev)) {
    closingQuotes.push({ pos, context: content.substring(Math.max(0, pos - 15), pos + 10) });
  }
  pos++;
}

// Filter to unique contexts
const unique = [...new Set(closingQuotes.map(q => q.context))].slice(0, 20);
console.log('\nUnique closing quote contexts:');
unique.forEach(c => console.log(`  ${JSON.stringify(c)}`));
