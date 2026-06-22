import { curriculum } from './app/src/data-content.ts';
import * as fs from 'fs';

function markdownTablesToHtml(text: string): string {
  const lines = text.split('\n');
  const result: string[] = [];
  let i = 0;
  
  while (i < lines.length) {
    if (lines[i].trim().match(/^\| .+ \|$/)) {
      const headerCells = lines[i].trim().replace(/^\| /, '').replace(/ \|$/, '').split('|').map(s => s.trim());
      
      if (i + 1 < lines.length && lines[i + 1].trim().match(/^\|[-| ]+\|$/)) {
        i += 2;
        const dataRows: string[][] = [];
        while (i < lines.length && lines[i].trim().match(/^\| .+ \|$/)) {
          dataRows.push(lines[i].trim().replace(/^\| /, '').replace(/ \|$/, '').split('|').map(s => s.trim()));
          i++;
        }
        
        let html = '<table><thead><tr>';
        headerCells.forEach(c => { html += '<th>' + c + '</th>'; });
        html += '</tr></thead><tbody>';
        dataRows.forEach(row => {
          html += '<tr>';
          row.forEach(c => { html += '<td>' + c + '</td>'; });
          html += '</tr>';
        });
        html += '</tbody></table>';
        result.push(html);
        continue;
      }
    }
    result.push(lines[i]);
    i++;
  }
  return result.join('\n');
}

// Re-serialize the curriculum back to TypeScript source
const sourcePath = 'app/src/data-content.ts';
const originalSource = fs.readFileSync(sourcePath, 'utf-8');

// We need to find and replace the content strings in the source
// Find each "content": "..." and replace the markdown tables within
let count = 0;
const newSource = originalSource.replace(/"content": "((?:[^"\\]|\\.)*)"/g, (match, contentStr) => {
  // Decode the escaped string
  const decoded = contentStr.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  
  if (!decoded.includes('| ') || !decoded.includes('|---')) return match;
  
  const fixed = markdownTablesToHtml(decoded);
  if (fixed === decoded) return match;
  
  count++;
  // Re-encode
  const reEncoded = fixed.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  return '"content": "' + reEncoded + '"';
});

if (count > 0) {
  fs.writeFileSync(sourcePath, newSource, 'utf-8');
  console.log('Fixed ' + count + ' content strings with tables');
} else {
  console.log('No tables found to fix');
}
