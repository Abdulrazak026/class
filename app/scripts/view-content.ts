import { readFileSync } from 'fs';
const data = readFileSync('src/data.ts', 'utf-8');
const idx = data.indexOf('"w1-d1"');
const section = data.substring(idx, idx + 3500);
// Extract the content field value
const contentMatch = section.match(/"content":\s*"((?:[^"\\]|\\.)*)"/);
if (contentMatch) {
  const content = contentMatch[1];
  console.log(content.substring(0, 3000));
} else {
  console.log('Content match failed');
  console.log(section.substring(0, 500));
}
