const fs = require('fs');
const path = require('path');

const phasesDir = 'C:/Users/user/Desktop/cyber/app/src/phases';
const files = fs.readdirSync(phasesDir).filter(f => f.endsWith('.ts'));

let totalFixed = 0;

for (const file of files) {
  const filePath = path.join(phasesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Replace all em dashes with regular dashes
  const fixed = content.replace(/—/g, '-');
  
  const count = (content.match(/—/g) || []).length;
  if (count > 0) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    console.log(`Fixed ${count} em dashes in ${file}`);
    totalFixed += count;
  }
}

console.log(`\nTotal fixed: ${totalFixed}`);
