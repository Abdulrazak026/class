import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, '..', 'src');

interface CodeBlock {
  topicId: string;
  language: 'python' | 'sql';
  code: string;
  source: string;
}

const dataContent = readFileSync(join(srcDir, 'data.ts'), 'utf-8');
const classworksContent = readFileSync(join(srcDir, 'classworks.ts'), 'utf-8');

// ============ Extract from data.ts ============

// Split by topic boundaries. Topic objects start like: "id": "wX-dY",
// The pattern: end of previous topic `},` then newline+spaces+`{`
const topicSections = dataContent.split(/\n\s*\{/);

const dataBlocks: CodeBlock[] = [];

for (const section of topicSections) {
  // Find topic ID
  const idMatch = section.match(/"id":\s*"([^"]+)"/);
  if (!idMatch) continue;
  const topicId = idMatch[1];

  // Find content field - it's a single line with "content": "..."
  // The content value uses \n escapes for newlines
  const contentMatch = section.match(/"content":\s*"((?:[^"\\]|\\.)*)"/);
  if (!contentMatch) continue;
  const content = contentMatch[1];

  // Find all python/sql code blocks in this content
  // Content has escaped \n, so we look for ```python\n or ```sql\n
  const codeRegex = /```(python|sql)\\n([\s\S]*?)```/g;
  let cm;
  while ((cm = codeRegex.exec(content)) !== null) {
    const lang = cm[1] as 'python' | 'sql';
    let code = cm[2];
    // Unescape escaped characters
    code = code.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    code = code.trim();
    if (!code) continue;
    // Skip if only comments
    if (/^(\s*#.*\n?)*\s*$/.test(code)) continue;
    dataBlocks.push({ topicId, language: lang, code, source: 'data.ts' });
  }
}

// ============ Extract from classworks.ts ============

// Find topic sections: 'topicId': [
const classworkSections = classworksContent.split(/\n\s*'([^']+)':\s*\[/);
const classworkBlocks: CodeBlock[] = [];

for (let i = 1; i < classworkSections.length; i += 2) {
  const topicId = classworkSections[i];
  const sectionContent = classworkSections[i + 1] || '';

  // Match code blocks with single-quoted strings
  const singleQuoteRegex = /language:\s*'(python|sql)',\s*\n\s*code:\s*'([^']*)'/g;
  let sqMatch;
  while ((sqMatch = singleQuoteRegex.exec(sectionContent)) !== null) {
    const lang = sqMatch[1] as 'python' | 'sql';
    let code = sqMatch[2].replace(/\\n/g, '\n');
    code = code.trim();
    if (!code) continue;
    classworkBlocks.push({ topicId, language: lang, code, source: 'classworks.ts' });
  }

  // Match code blocks with backtick strings
  const backtickRegex = /language:\s*'(python|sql)',\s*\n\s*code:\s*`([^`]*)`/g;
  let btMatch;
  while ((btMatch = backtickRegex.exec(sectionContent)) !== null) {
    const lang = btMatch[1] as 'python' | 'sql';
    let code = btMatch[2].trim();
    if (!code) continue;
    classworkBlocks.push({ topicId, language: lang, code, source: 'classworks.ts' });
  }
}

// ============ Combine and output ============

const allBlocks = [...dataBlocks, ...classworkBlocks];

console.log(`data.ts: ${dataBlocks.length} blocks (${dataBlocks.filter(b => b.language === 'python').length} python, ${dataBlocks.filter(b => b.language === 'sql').length} sql)`);
console.log(`classworks.ts: ${classworkBlocks.length} blocks (${classworkBlocks.filter(b => b.language === 'python').length} python, ${classworkBlocks.filter(b => b.language === 'sql').length} sql)`);
console.log(`Total: ${allBlocks.length} blocks`);

// Save for inspection
writeFileSync(join(__dirname, '..', 'extracted-blocks.json'), JSON.stringify(allBlocks, null, 2));

// Group by topic
const grouped: Record<string, number> = {};
for (const b of allBlocks) {
  grouped[b.topicId] = (grouped[b.topicId] || 0) + 1;
}
console.log('\nTopics with code blocks:');
for (const [tid, count] of Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]))) {
  const py = allBlocks.filter(b => b.topicId === tid && b.language === 'python').length;
  const sql = allBlocks.filter(b => b.topicId === tid && b.language === 'sql').length;
  console.log(`  ${tid}: ${count} blocks (${py} py, ${sql} sql)`);
}
