const fs = require('fs');
const lines = fs.readFileSync(__dirname + '/../src/data-content.ts', 'utf-8').split('\n');
const line = lines[957];

// Show bytes around column 876 (1-indexed)
const idx = 875; // 0-indexed
console.log('Byte dump around column 876:');
for (let i = Math.max(0, idx - 8); i < Math.min(line.length, idx + 12); i++) {
  const code = line.charCodeAt(i);
  const hex = code.toString(16).padStart(4, '0');
  const char = line[i];
  const printable = code >= 32 && code < 127 ? char : '\\u' + hex;
  console.log(`  col ${i+1}: 0x${hex} ${printable}`);
}
