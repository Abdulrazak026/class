const fs = require('fs');
const file = 'C:/Users/user/Desktop/cyber/app/src/phases/phase0.ts';
let content = fs.readFileSync(file, 'utf8');

// Helper function to extract a topic object by ID
function extractTopic(content, topicId) {
  const idPattern = `id: "${topicId}"`;
  const idPos = content.indexOf(idPattern);
  if (idPos === -1) return null;
  
  // Find the start of the topic object
  let start = content.lastIndexOf('{', idPos);
  
  // Find the end by counting braces
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
  
  return { start, end, content: content.substring(start, end) };
}

// Helper function to remove a topic by ID
function removeTopic(content, topicId) {
  const topic = extractTopic(content, topicId);
  if (!topic) return content;
  
  // Find the end including trailing comma and whitespace
  let end = topic.end;
  while (end < content.length && (content[end] === ' ' || content[end] === '\n' || content[end] === ',')) {
    end++;
  }
  
  return content.substring(0, topic.start) + content.substring(end);
}

// Helper function to extract a module by ID
function extractModule(content, moduleId) {
  const idPattern = `id: "${moduleId}"`;
  const idPos = content.indexOf(idPattern);
  if (idPos === -1) return null;
  
  // Find the start of the module object
  let start = content.lastIndexOf('{', idPos);
  
  // Find the end by counting braces
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
  
  return { start, end, content: content.substring(start, end) };
}

// Step 1: Delete duplicate topics
console.log('Step 1: Deleting duplicate topics...');
content = removeTopic(content, 'we03d03');
console.log('  Deleted we03d03');
content = removeTopic(content, 'we04d01');
console.log('  Deleted we04d01');
content = removeTopic(content, 'we04d02');
console.log('  Deleted we04d02');
content = removeTopic(content, 'we04d03');
console.log('  Deleted we04d03');

// Step 2: Delete the empty week04 module (the old one)
console.log('Step 2: Deleting empty week04 module...');
const week04Module = extractModule(content, 'week04');
if (week04Module) {
  // Check if it's empty (no topics)
  if (week04Module.content.includes('topics: [\n    ]') || week04Module.content.includes('topics: []')) {
    let end = week04Module.end;
    while (end < content.length && (content[end] === ' ' || content[end] === '\n' || content[end] === ',')) {
      end++;
    }
    content = content.substring(0, week04Module.start) + content.substring(end);
    console.log('  Deleted empty week04 module');
  } else {
    console.log('  week04 module is not empty, skipping');
  }
}

// Step 3: Rename weekLINUX to week04
console.log('Step 3: Renaming weekLINUX to week04...');
content = content.replace(/id: "weekLINUX"/, 'id: "week04"');
content = content.replace(/durationText: "Week L - 10 Projects"/, 'durationText: "Week 4 - 10 Tutorials"');

// Step 4: Rename weekLINUXproj to week04proj
console.log('Step 4: Renaming weekLINUXproj to week04proj...');
content = content.replace(/id: "weekLINUXproj"/, 'id: "week04proj"');
content = content.replace(/durationText: "Week L - 4 Projects"/, 'durationText: "Week 4 - 4 Projects"');

// Step 5: Rename topic IDs
console.log('Step 5: Renaming topic IDs...');
const topicRenames = [
  ['weLINUXd01', 'we04d01'],
  ['weLINUXd02', 'we04d02'],
  ['weLINUXd03', 'we04d03'],
  ['weLINUXd04', 'we04d04'],
  ['weLINUXd05', 'we04d05'],
  ['weLINUXd06', 'we04d06'],
  ['weLINUXd07', 'we04d07'],
  ['weLINUXd08', 'we04d08'],
  ['weLINUXd09', 'we04d09'],
  ['weLINUXd10', 'we04d10'],
];

for (const [oldId, newId] of topicRenames) {
  content = content.replace(new RegExp(`id: "${oldId}"`, 'g'), `id: "${newId}"`);
  console.log(`  Renamed ${oldId} -> ${newId}`);
}

// Step 6: Update week03 title
console.log('Step 6: Updating week03 title...');
content = content.replace(/title: "Operating System Basics"/, 'title: "Windows Fundamentals"');

// Step 7: Update week05 title (find the module with WSL2 topics)
console.log('Step 7: Updating week05 title...');
// Find the module that contains we05d01
const we05d01Pos = content.indexOf('id: "we05d01"');
if (we05d01Pos > 0) {
  // Go back to find the module title
  const moduleTitleStart = content.lastIndexOf('title:', we05d01Pos);
  // Find the module's title line
  const lineStart = content.lastIndexOf('\n', moduleTitleStart);
  const lineEnd = content.indexOf('\n', moduleTitleStart);
  const line = content.substring(lineStart, lineEnd);
  if (line.includes('Environment Setup')) {
    content = content.substring(0, lineStart + 1) + 
      '    title: "Environment Setup & Deeper Linux",' + 
      content.substring(lineEnd);
    console.log('  Updated week05 title');
  }
}

// Step 8: Move we00d00 from week00 to week05
console.log('Step 8: Moving we00d00 to week05...');
const we00d00 = extractTopic(content, 'we00d00');
if (we00d00) {
  // Remove from current position
  let end = we00d00.end;
  while (end < content.length && (content[end] === ' ' || content[end] === '\n' || content[end] === ',')) {
    end++;
  }
  content = content.substring(0, we00d00.start) + content.substring(end);
  
  // Find week05 module's topics array and insert at beginning
  const we05d01Pos2 = content.indexOf('id: "we05d01"');
  if (we05d01Pos2 > 0) {
    // Find "topics: [" before we05d01
    const topicsStart = content.lastIndexOf('topics: [', we05d01Pos2);
    const insertPoint = topicsStart + 'topics: ['.length;
    
    // Format the topic with proper indentation
    const topicLines = we00d00.content.split('\n');
    const indentedTopic = topicLines.map((line, i) => {
      if (i === 0) return '      ' + line;
      return '      ' + line;
    }).join('\n');
    
    content = content.substring(0, insertPoint) + '\n' + indentedTopic + ',' + content.substring(insertPoint);
    console.log('  Moved we00d00 to week05');
  }
}

// Step 9: Reorder modules
console.log('Step 9: Reordering modules...');
// Extract all modules
const moduleIds = ['week00', 'week01', 'week02', 'week03', 'week04', 'week04proj', 'week05'];
const modules = {};

for (const id of moduleIds) {
  const module = extractModule(content, id);
  if (module) {
    modules[id] = module.content;
    console.log(`  Extracted ${id}`);
  }
}

// Build new content
let newContent = 'export const phase0: Module[] = [\n';
for (const id of moduleIds) {
  if (modules[id]) {
    newContent += '  ' + modules[id].trim() + ',\n';
  }
}
newContent += '];\n';

fs.writeFileSync(file, newContent, 'utf8');
console.log('File restructured successfully!');
