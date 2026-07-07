const fs = require('fs');
const file = 'C:/Users/user/Desktop/cyber/app/src/phases/phase0.ts';
let content = fs.readFileSync(file, 'utf8');

// 1. Delete we03d03 topic (Linux Introduction)
// Find the topic and remove it
const we03d03Start = content.indexOf('id: "we03d03"');
if (we03d03Start > 0) {
  // Find the start of this topic object (go back to find the opening {)
  let start = content.lastIndexOf('{', we03d03Start);
  // Find the end - look for the next topic or module boundary
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
  // Also remove trailing comma if present
  while (end < content.length && (content[end] === ' ' || content[end] === '\n' || content[end] === ',')) {
    end++;
  }
  content = content.substring(0, start) + content.substring(end);
  console.log('Deleted we03d03');
}

// 2. Delete we04d01, we04d02, we04d03 topics (from old week04)
const topicsToDelete = ['we04d01', 'we04d02', 'we04d03'];
for (const topicId of topicsToDelete) {
  const topicStart = content.indexOf(`id: "${topicId}"`);
  if (topicStart > 0) {
    let start = content.lastIndexOf('{', topicStart);
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
    while (end < content.length && (content[end] === ' ' || content[end] === '\n' || content[end] === ',')) {
      end++;
    }
    content = content.substring(0, start) + content.substring(end);
    console.log(`Deleted ${topicId}`);
  }
}

// 3. Delete empty week04 module (the old one that had the deleted topics)
const week04ModuleStart = content.indexOf('id: "week04"');
if (week04ModuleStart > 0) {
  // Find the start of this module object
  let start = content.lastIndexOf('{', week04ModuleStart);
  // Find the end of this module
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
  // Also remove trailing comma
  while (end < content.length && (content[end] === ' ' || content[end] === '\n' || content[end] === ',')) {
    end++;
  }
  content = content.substring(0, start) + content.substring(end);
  console.log('Deleted empty week04 module');
}

// 4. Rename weekLINUX to week04
content = content.replace(/id: "weekLINUX"/g, 'id: "week04"');
content = content.replace(/durationText: "Week L - 10 Projects"/g, 'durationText: "Week 4 - 10 Tutorials"');

// 5. Rename weekLINUXproj to week04proj
content = content.replace(/id: "weekLINUXproj"/g, 'id: "week04proj"');
content = content.replace(/durationText: "Week L - 4 Projects"/g, 'durationText: "Week 4 - 4 Projects"');

// 6. Rename topic IDs
content = content.replace(/id: "weLINUXd01"/g, 'id: "we04d01"');
content = content.replace(/id: "weLINUXd02"/g, 'id: "we04d02"');
content = content.replace(/id: "weLINUXd03"/g, 'id: "we04d03"');
content = content.replace(/id: "weLINUXd04"/g, 'id: "we04d04"');
content = content.replace(/id: "weLINUXd05"/g, 'id: "we04d05"');
content = content.replace(/id: "weLINUXd06"/g, 'id: "we04d06"');
content = content.replace(/id: "weLINUXd07"/g, 'id: "we04d07"');
content = content.replace(/id: "weLINUXd08"/g, 'id: "we04d08"');
content = content.replace(/id: "weLINUXd09"/g, 'id: "we04d09"');
content = content.replace(/id: "weLINUXd10"/g, 'id: "we04d10"');

// 7. Update week03 title
content = content.replace(/title: "Operating System Basics"/g, 'title: "Windows Fundamentals"');

// 8. Update week05 title (it's now called week04 after deletion, but we need to find the right one)
// The week05 module should have WSL2 topics - let me find it
// Actually, let me just update the week that has WSL2 topics
// Let me find the module that has we05d01
const we05d01Pos = content.indexOf('id: "we05d01"');
if (we05d01Pos > 0) {
  // Find the module that contains this topic
  const moduleStart = content.lastIndexOf('id: "week', we05d01Pos);
  // Update the title of this module
  content = content.substring(0, moduleStart) + 
    content.substring(moduleStart).replace(
      /title: "Environment Setup"/,
      'title: "Environment Setup & Deeper Linux"'
    );
}

// 9. Move we00d00 (Toolkit Setup) from week00 to week05
// First, extract the we00d00 topic
const we00d00Start = content.indexOf('id: "we00d00"');
if (we00d00Start > 0) {
  let start = content.lastIndexOf('{', we00d00Start);
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
  
  // Extract the topic content (including trailing comma and newline)
  let topicContent = content.substring(start, end);
  // Check if there's a comma after the closing brace
  if (end < content.length && content[end] === ',') {
    topicContent += ',';
    end++;
  }
  // Also capture any trailing whitespace/newline
  while (end < content.length && (content[end] === ' ' || content[end] === '\n')) {
    topicContent += content[end];
    end++;
  }
  
  // Remove from current position
  content = content.substring(0, start) + content.substring(end);
  
  // Find the week05 module (the one with WSL2 topics) and insert at the beginning
  const we05d01Pos2 = content.indexOf('id: "we05d01"');
  if (we05d01Pos2 > 0) {
    // Find the topics array in this module
    const topicsArrayStart = content.lastIndexOf('topics: [', we05d01Pos2);
    // Insert after "topics: [\n"
    const insertPoint = topicsArrayStart + 'topics: ['.length;
    // Add proper indentation
    const indentedTopic = '\n      ' + topicContent.trim().replace(/\n/g, '\n      ') + '\n    ';
    content = content.substring(0, insertPoint) + indentedTopic + content.substring(insertPoint);
    console.log('Moved we00d00 to week05');
  }
}

// 10. Reorder modules - extract each module and rearrange
// Find module boundaries
const modulePattern = /{[\s\n]*id: "(week\w+proj?)"/g;
const modules = {};
let match;

// First, let me find all module positions
const modulePositions = [];
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].match(/^\s+id: "week/)) {
    const id = lines[i].match(/id: "(week\w+proj?)"/)[1];
    modulePositions.push({ id, line: i });
  }
}

console.log('Module positions:', modulePositions.map(m => m.id));

// Write the file
fs.writeFileSync(file, content, 'utf8');
console.log('File updated successfully');
