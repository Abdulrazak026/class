const fs = require('fs');
const filePath = 'app/src/data-content.ts';
const content = fs.readFileSync(filePath, 'utf-8');

// Find all separator patterns like |---|---| in the file
const sepPattern = /\|[-]+\|[-| ]+\|/g;
let m;
let replacements = [];

while ((m = sepPattern.exec(content)) !== null) {
  const sepIdx = m.index;
  const sepLen = m[0].length;
  
  // The separator in source is like: |-----------|----------|
  // Before it: \n (literal backslash-n in source file = 2 chars)
  // Before that: header row ending with |
  // After separator: \n then data rows
  
  // Go back to find header line
  // Between header and separator there's \n (2 chars)
  let headerEnd = sepIdx - 2; // skip the \n before separator
  if (content[headerEnd] !== 'n' || content[headerEnd - 1] !== '\\') {
    console.log('Skipping - no \\n before separator at', sepIdx);
    continue;
  }
  
  // Find start of header line - go back to previous \n or start
  let headerStart = headerEnd - 2; // skip the \n that starts this line
  while (headerStart > 1) {
    if (content[headerStart] === 'n' && content[headerStart - 1] === '\\') {
      // Found a \n - but is this the one ending the previous line?
      // Check if what follows is the start of our header line (should be space or |)
      if (content[headerStart + 1] === ' ' || content[headerStart + 1] === '|') {
        headerStart += 2; // skip this \n, header starts here
        break;
      }
    }
    headerStart--;
  }
  if (headerStart <= 1) headerStart = 0;
  
  const headerLine = content.substring(headerStart, headerEnd);
  
  // Now find end of data rows after separator
  let dataEnd = sepIdx + sepLen;
  let dataRows = [];
  
  while (dataEnd < content.length - 2) {
    // Expect \n after current position
    if (content[dataEnd] !== '\\' || content[dataEnd + 1] !== 'n') break;
    dataEnd += 2; // skip \n
    
    // Expect space then |
    if (content[dataEnd] !== ' ' || content[dataEnd + 1] !== '|') break;
    
    let rowStart = dataEnd;
    let rowEnd = dataEnd;
    while (rowEnd < content.length && content[rowEnd] !== '\n' && content[rowEnd] !== '"') {
      // Check for source-file \n
      if (content[rowEnd] === '\\' && content[rowEnd + 1] === 'n') break;
      rowEnd++;
    }
    
    const row = content.substring(rowStart, rowEnd);
    if (row.trim().startsWith('|')) {
      dataRows.push(row.trim());
      dataEnd = rowEnd;
    } else {
      break;
    }
  }
  
  if (headerLine.includes('|') && dataRows.length > 0) {
    // Determine replacement range: from before header to end of last data row
    // We want to keep the \n before header
    let replaceFrom = headerStart;
    let replaceTo = dataEnd;
    
    // But go back to include the \n before header
    if (replaceFrom >= 2 && content[replaceFrom - 1] === 'n' && content[replaceFrom - 2] === '\\') {
      replaceFrom -= 2;
    }
    
    // Parse
    const headerCells = headerLine.split('|').map(s => s.trim()).filter(Boolean);
    
    let html = '<table><thead><tr>';
    headerCells.forEach(c => { html += '<th>' + c + '</th>'; });
    html += '</tr></thead><tbody>';
    dataRows.forEach(row => {
      const cells = row.replace(/^\| /, '').replace(/ \|$/, '').split('|').map(s => s.trim());
      html += '<tr>';
      cells.forEach(c => { html += '<td>' + c + '</td>'; });
      html += '</tr>';
    });
    html += '</tbody></table>';
    
    replacements.push({ from: replaceFrom, to: replaceTo, html, headerCells, rowCount: dataRows.length });
  }
}

if (replacements.length === 0) {
  console.log('No tables found');
} else {
  // Apply replacements in reverse order to preserve indices
  let result = content;
  for (let i = replacements.length - 1; i >= 0; i--) {
    const r = replacements[i];
    result = result.substring(0, r.from) + r.html + result.substring(r.to);
    console.log('Replaced table: [' + r.headerCells.join(', ') + '] with ' + r.rowCount + ' rows');
  }
  fs.writeFileSync(filePath, result, 'utf-8');
  console.log('\nTotal: ' + replacements.length + ' tables replaced');
}
