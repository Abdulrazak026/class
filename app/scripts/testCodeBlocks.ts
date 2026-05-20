import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, '..', 'src');

// Read raw file contents
const dataContent = readFileSync(join(srcDir, 'data.ts'), 'utf-8');
const classworksContent = readFileSync(join(srcDir, 'classworks.ts'), 'utf-8');

// Extract topic IDs and content from data.ts
// Pattern: id: "wX-dY", ... content: "..." (multiline)
interface TopicBlock {
  id: string;
  content: string;
  source: string;
  weekTitle: string;
}

function extractTopicBlocks(raw: string): TopicBlock[] {
  const blocks: TopicBlock[] = [];
  // Find all topic objects by matching patterns
  const lines = raw.split('\n');
  let currentTopic: Partial<TopicBlock> | null = null;
  let inContent = false;
  let contentLines: string[] = [];
  let braceDepth = 0;
  let inObject = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect topic object start: `{` after `id: "...",`
    const idMatch = line.match(/^\s*id:\s*"([^"]+)",?\s*$/);
    if (idMatch) {
      if (currentTopic) {
        // Save previous if we have content
        if (currentTopic.content) {
          currentTopic.source = currentTopic.id || 'unknown';
          blocks.push(currentTopic as TopicBlock);
        }
      }
      currentTopic = { id: idMatch[1], content: '' };
      inContent = false;
      contentLines = [];
      continue;
    }

    if (!currentTopic) continue;

    // Detect content field
    const contentMatch = line.match(/^\s*content:\s*"([^"]*)"\s*,?\s*$/);
    if (contentMatch) {
      currentTopic.content = (currentTopic.content || '') + contentMatch[1];
      inContent = false;
      continue;
    }

    // Handle multiline content (template literal backtick strings)
    const contentStart = line.match(/^\s*content:\s*`/);
    if (contentStart) {
      inContent = true;
      contentLines = [];
      // Check if content ends on same line
      const rest = line.replace(/^\s*content:\s*`/, '');
      if (rest.includes('`')) {
        currentTopic.content = (currentTopic.content || '') + rest.replace(/`\s*,?\s*$/, '');
        inContent = false;
      } else {
        contentLines.push(rest);
      }
      continue;
    }

    if (inContent) {
      if (line.includes('`')) {
        const idx = line.indexOf('`');
        contentLines.push(line.substring(0, idx));
        currentTopic.content = (currentTopic.content || '') + contentLines.join('\n');
        contentLines = [];
        inContent = false;
      } else {
        contentLines.push(line);
      }
      continue;
    }

    // Check for end of topic object
    if (line.match(/^\s*\}\s*,?\s*$/) && currentTopic) {
      if (currentTopic.content) {
        currentTopic.source = currentTopic.id || 'unknown';
        blocks.push(currentTopic as TopicBlock);
      }
      currentTopic = null;
    }
  }

  // Fix: content in data.ts is JSON-escaped, not raw
  return blocks;
}

// Simpler approach: use regex to find code blocks in the raw file content
interface CodeBlock {
  topicId: string;
  language: 'python' | 'sql';
  code: string;
  source: string; // 'data' or 'classworks'
  weekTitle?: string;
}

function findPythonSqlBlocks(text: string, topicId: string, source: string): CodeBlock[] {
  const blocks: CodeBlock[] = [];
  // Match ```python ... ``` and ```sql ... ```
  const regex = /```(python|sql)\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const lang = match[1] as 'python' | 'sql';
    let code = match[2].trim();
    // Skip empty code
    if (!code) continue;
    // Skip if it's just comments
    if (/^(\s*#.*\n?)*\s*$/.test(code)) continue;
    blocks.push({ topicId, language: lang, code, source });
  }
  return blocks;
}

// Since content in data.ts is JSON-escaped, we need to unescape it
function unescapeJsonString(str: string): string {
  return str
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .replace(/\\r/g, '')
    .replace(/\\`/g, '`')
    .replace(/\\\$/g, '$');
}

// Parse the data.ts file more carefully - it's a TypeScript module
// Let's just regex search for code blocks in the entire raw text
function extractAllCodeBlocksFromRaw(raw: string, source: string): CodeBlock[] {
  const blocks: CodeBlock[] = [];
  
  // First, find all topic IDs in the file
  const topicIdRegex = /\n\s*id:\s*"([^"]+)"/g;
  const topicIds: string[] = [];
  let tidMatch;
  while ((tidMatch = topicIdRegex.exec(raw)) !== null) {
    topicIds.push(tidMatch[1]);
  }

  // Find all code blocks (python/sql) 
  // The content is JSON-escaped, so code blocks look like:
  // ```python\\n...\\n```
  const codeBlockRegex = /```(python|sql)(?:\\n|\n)([\s\S]*?)```/g;
  
  // We need to find which topic each block belongs to
  // Strategy: split raw by topic boundaries (id: "w...") and match each section
  const sections = raw.split(/\n\s*id:\s*"/);
  
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    const actualId = section.match(/^([^"]+)/);
    if (!actualId) continue;
    const topicId = actualId[1];
    
    // Find all code blocks in this section
    const blockRegex = /```(python|sql)(?:\\n|\n)([\s\S]*?)```/g;
    let bMatch;
    while ((bMatch = blockRegex.exec(section)) !== null) {
      const lang = bMatch[1] as 'python' | 'sql';
      let code = bMatch[2].trim();
      if (!code) continue;
      // Unescape
      code = code.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      if (/^(\s*#.*\n?)*\s*$/.test(code)) continue;
      blocks.push({ topicId, language: lang, code, source });
    }
  }

  return blocks;
}

function extractClassworksCodeBlocks(raw: string): CodeBlock[] {
  const blocks: CodeBlock[] = [];
  
  // In classworks.ts, each entry has topicId as key, then code fields with language
  // Pattern: 'topicId': [ { language: 'python'|'sql', code: '...' } ]
  
  // Find topic sections
  const sections = raw.split(/\n\s*'([^']+)':\s*\[/);
  
  for (let i = 1; i < sections.length; i += 2) {
    const topicId = sections[i];
    const sectionContent = sections[i + 1] || '';
    
    // Find code blocks within this section
    const codeRegex = /language:\s*'(python|sql)',\s*\n\s*code:\s*'([^']*)'/g;
    let cMatch;
    while ((cMatch = codeRegex.exec(sectionContent)) !== null) {
      const lang = cMatch[1] as 'python' | 'sql';
      let code = cMatch[2].replace(/\\n/g, '\n');
      if (!code.trim()) continue;
      blocks.push({ topicId, language: lang, code, source: 'classworks' });
    }

    // Also try backtick strings for code
    const backtickRegex = /language:\s*'(python|sql)',\s*\n\s*code:\s*`([^`]*)`/g;
    let btMatch;
    while ((btMatch = backtickRegex.exec(sectionContent)) !== null) {
      const lang = btMatch[1] as 'python' | 'sql';
      let code = btMatch[2].trim();
      if (!code) continue;
      blocks.push({ topicId, language: lang, code, source: 'classworks' });
    }
  }

  return blocks;
}

// Extract all code blocks
const dataBlocks = extractAllCodeBlocksFromRaw(dataContent, 'data');
const classworkBlocks = extractClassworksCodeBlocks(classworksContent);
const allBlocks = [...dataBlocks, ...classworkBlocks];

console.log(`Found ${dataBlocks.length} code blocks in data.ts`);
console.log(`Found ${classworkBlocks.length} code blocks in classworks.ts`);
console.log(`Total: ${allBlocks.length} code blocks`);

// Save extracted blocks for inspection
const blockSummary = allBlocks.map(b => `${b.source}/${b.topicId}: ${b.language} (${b.code.length} chars)`);
writeFileSync(join(__dirname, '..', 'extracted-blocks.json'), JSON.stringify(allBlocks, null, 2));
writeFileSync(join(__dirname, '..', 'block-summary.txt'), blockSummary.join('\n'));

console.log('\nBlocks by topic:');
const grouped: Record<string, number> = {};
for (const b of allBlocks) {
  const key = `${b.topicId}`;
  grouped[key] = (grouped[key] || 0) + 1;
}
for (const [topicId, count] of Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]))) {
  console.log(`  ${topicId}: ${count} block(s)`);
}
