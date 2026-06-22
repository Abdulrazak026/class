// Simple approach: read as TS, eval the curriculum, transform tables, write back
import { curriculum } from './app/src/data-content.ts';

function markdownTablesToHtml(text) {
  // Split by actual newlines to find tables
  const lines = text.split('\n');
  let result = [];
  let i = 0;
  
  while (i < lines.length) {
    // Check if this line starts a table: | col | col |
    if (lines[i].trim().match(/^\| .+ \|$/)) {
      // Found header row
      const headerCells = lines[i].trim().replace(/^\| /, '').replace(/ \|$/, '').split('|').map(s => s.trim());
      
      // Check next line is separator
      if (i + 1 < lines.length && lines[i + 1].trim().match(/^\|[-| ]+\|$/)) {
        i += 2; // skip header + separator
        
        let dataRows = [];
        while (i < lines.length && lines[i].trim().match(/^\| .+ \|$/)) {
          const cells = lines[i].trim().replace(/^\| /, '').replace(/ \|$/, '').split('|').map(s => s.trim());
          dataRows.push(cells);
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

let count = 0;
for (const mod of curriculum) {
  for (const topic of mod.topics) {
    if (topic.content && topic.content.includes('| ') && topic.content.includes('|---')) {
      const before = topic.content;
      topic.content = markdownTablesToHtml(topic.content);
      if (before !== topic.content) {
        count++;
        console.log('Fixed: ' + topic.id);
      }
    }
  }
}
console.log('Total topics with tables fixed: ' + count);
