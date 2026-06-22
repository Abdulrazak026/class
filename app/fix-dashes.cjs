const fs = require('fs');
const path = require('path');

const phasesDir = 'C:/Users/user/Desktop/cyber/app/src/phases';
const files = fs.readdirSync(phasesDir).filter(f => f.endsWith('.ts'));

let totalFixed = 0;

for (const file of files) {
  const filePath = path.join(phasesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const lines = content.split('\n');
  let inTemplate = false;
  let fixedCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Track template literal state
    if (line.match(/\bcontent:\s*`/)) {
      inTemplate = true;
    }
    if (inTemplate && (line.trimEnd().match(/`,?\s*$/) || line.trim() === '`,')) {
      inTemplate = false;
      continue;
    }
    
    if (inTemplate) continue;
    
    // Replace all em dashes with regular dash in non-content lines
    if (line.includes(' — ')) {
      lines[i] = line.replace(/ — /g, ' - ');
      fixedCount++;
    }
  }
  
  if (fixedCount > 0) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`Fixed ${fixedCount} em dashes in ${file}`);
    totalFixed += fixedCount;
  }
}

console.log(`\nTotal fixed: ${totalFixed}`);
