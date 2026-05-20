export interface SpreadsheetCell {
  value: string;
  formula?: string;
}

export interface SpreadsheetData {
  cells: Record<string, SpreadsheetCell>;
  cols: number;
  rows: number;
}

function colToIndex(col: string): number {
  let n = 0;
  for (let i = 0; i < col.length; i++) n = n * 26 + (col.charCodeAt(i) - 64);
  return n - 1;
}

function indexToCol(n: number): string {
  let s = '';
  n++;
  while (n > 0) { n--; s = String.fromCharCode(65 + (n % 26)) + s; n = Math.floor(n / 26); }
  return s;
}

function parseRange(range: string): string[] {
  const m = range.replace(/\$/g, '').match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);
  if (!m) return [];
  const c1 = colToIndex(m[1].toUpperCase()), r1 = parseInt(m[2]) - 1;
  const c2 = colToIndex(m[3].toUpperCase()), r2 = parseInt(m[4]) - 1;
  const cells: string[] = [];
  for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) cells.push(`${indexToCol(c)}${r + 1}`);
  return cells;
}

function getCellRawValue(ref: string, data: SpreadsheetData): string {
  const key = ref.toUpperCase();
  const cell = data.cells[key];
  if (!cell) return '';
  return cell.value;
}

function getCellValue(ref: string, data: SpreadsheetData, visited: Set<string>): number | string {
  const key = ref.toUpperCase();
  if (visited.has(key)) return 0;
  visited.add(key);
  const cell = data.cells[key];
  if (!cell) return 0;
  const v = cell.formula ? evaluateFormula(cell.formula, data, visited) : cell.value;
  const n = parseFloat(v as string);
  return isNaN(n) ? (v as string) : n;
}

function extractArgs(formula: string, funcName: string): string {
  const idx = formula.toUpperCase().indexOf(funcName.toUpperCase() + '(');
  if (idx === -1) return '';
  const start = idx + funcName.length + 1;
  let depth = 0;
  for (let i = start; i < formula.length; i++) {
    if (formula[i] === '(') depth++;
    if (formula[i] === ')') {
      if (depth === 0) return formula.slice(start, i);
      depth--;
    }
  }
  return '';
}

function splitArgs(s: string): string[] {
  const parts: string[] = [];
  let depth = 0, start = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '[') depth++;
    if (s[i] === ')' || s[i] === ']') depth--;
    if (s[i] === ',' && depth === 0) { parts.push(s.slice(start, i).trim()); start = i + 1; }
  }
  parts.push(s.slice(start).trim());
  return parts;
}

function evalCondSimple(cond: string, data: SpreadsheetData): boolean {
  const m = cond.match(/^(.+?)\s*(=|>|<|>=|<=|!=)\s*(.+)$/);
  if (!m) return !!evaluateSimple(cond, data);
  const l = String(evaluateSimple(m[1].trim(), data));
  const op = m[2];
  const r = String(evaluateSimple(m[3].trim(), data));
  const ln = parseFloat(l), rn = parseFloat(r);
  if (!isNaN(ln) && !isNaN(rn)) {
    if (op === '=') return ln === rn;
    if (op === '>') return ln > rn;
    if (op === '<') return ln < rn;
    if (op === '>=') return ln >= rn;
    if (op === '<=') return ln <= rn;
    if (op === '!=') return ln !== rn;
  }
  if (op === '=') return l.toLowerCase() === r.toLowerCase();
  if (op === '!=') return l.toLowerCase() !== r.toLowerCase();
  return false;
}

function evaluateSimple(v: string, data: SpreadsheetData): string | number {
  v = v.trim();
  const cellMatch = v.match(/^([A-Z]+\d+)$/i);
  if (cellMatch) return getCellValue(cellMatch[1].toUpperCase(), data, new Set());
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1);
  if (v === 'TRUE') return 'TRUE';
  if (v === 'FALSE') return 'FALSE';
  const n = parseFloat(v);
  return isNaN(n) ? v : n;
}

function getNum(val: string | number): number {
  return typeof val === 'number' ? val : (parseFloat(val) || 0);
}

function getStr(val: string | number): string {
  return typeof val === 'string' ? val : String(val);
}

export function evaluateFormula(formula: string, data: SpreadsheetData, visited: Set<string> = new Set()): number | string {
  const normalized = formula.toUpperCase().replace(/\s/g, '');
  if (!normalized.startsWith('=')) return formula;
  const expr = normalized.slice(1);

  try {
    if (expr.startsWith('SUM(')) {
      const range = expr.slice(4, -1);
      const cells = range.includes(':') ? parseRange(range) : splitArgs(range);
      return cells.reduce((s, ref) => s + getNum(getCellValue(ref, data, new Set(visited))), 0);
    }
    if (expr.startsWith('AVERAGE(')) {
      const range = expr.slice(8, -1);
      const cells = range.includes(':') ? parseRange(range) : splitArgs(range);
      const vals = cells.map(ref => getNum(getCellValue(ref, data, new Set(visited))));
      return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    }
    if (expr.startsWith('COUNT(')) {
      const range = expr.slice(6, -1);
      const cells = range.includes(':') ? parseRange(range) : splitArgs(range);
      return cells.filter(ref => {
        const v = getCellValue(ref, data, new Set(visited));
        return typeof v === 'number' && !isNaN(v);
      }).length;
    }
    if (expr.startsWith('COUNTA(')) {
      const range = expr.slice(7, -1);
      const cells = range.includes(':') ? parseRange(range) : splitArgs(range);
      return cells.filter(ref => {
        const v = getCellRawValue(ref, data);
        return v !== '';
      }).length;
    }
    if (expr.startsWith('MAX(')) {
      const range = expr.slice(4, -1);
      const cells = range.includes(':') ? parseRange(range) : splitArgs(range);
      const vals = cells.map(ref => getNum(getCellValue(ref, data, new Set(visited))));
      return vals.length ? Math.max(...vals) : 0;
    }
    if (expr.startsWith('MIN(')) {
      const range = expr.slice(4, -1);
      const cells = range.includes(':') ? parseRange(range) : splitArgs(range);
      const vals = cells.map(ref => getNum(getCellValue(ref, data, new Set(visited))));
      return vals.length ? Math.min(...vals) : 0;
    }
    if (expr.startsWith('IF(')) {
      const inner = expr.slice(3, -1);
      const parts = splitArgs(inner);
      if (parts.length < 2) return '#ERROR';
      const cond = parts[0];
      const tVal = parts[1];
      const fVal = parts.length > 2 ? parts[2] : '';
      return evalCondSimple(cond, data) ? evaluateSimple(tVal, data) : evaluateSimple(fVal, data);
    }
    if (expr.startsWith('AND(')) {
      const inner = expr.slice(4, -1);
      const parts = splitArgs(inner);
      return parts.every(p => evalCondSimple(p, data)) ? 'TRUE' : 'FALSE';
    }
    if (expr.startsWith('OR(')) {
      const inner = expr.slice(3, -1);
      const parts = splitArgs(inner);
      return parts.some(p => evalCondSimple(p, data)) ? 'TRUE' : 'FALSE';
    }
    if (expr.startsWith('NOT(')) {
      const inner = expr.slice(4, -1);
      return evalCondSimple(inner, data) ? 'FALSE' : 'TRUE';
    }
    if (expr.startsWith('LEFT(')) {
      const args = extractArgs(formula, 'LEFT');
      const parts = splitArgs(args);
      if (parts.length < 2) return '#ERROR';
      const text = getStr(evaluateSimple(parts[0], data));
      const n = Math.floor(getNum(evaluateSimple(parts[1], data)));
      return text.slice(0, n);
    }
    if (expr.startsWith('RIGHT(')) {
      const args = extractArgs(formula, 'RIGHT');
      const parts = splitArgs(args);
      if (parts.length < 2) return '#ERROR';
      const text = getStr(evaluateSimple(parts[0], data));
      const n = Math.floor(getNum(evaluateSimple(parts[1], data)));
      return text.slice(-n) || text;
    }
    if (expr.startsWith('MID(')) {
      const args = extractArgs(formula, 'MID');
      const parts = splitArgs(args);
      if (parts.length < 3) return '#ERROR';
      const text = getStr(evaluateSimple(parts[0], data));
      const start = Math.floor(getNum(evaluateSimple(parts[1], data))) - 1;
      const n = Math.floor(getNum(evaluateSimple(parts[2], data)));
      return text.slice(start, start + n);
    }
    if (expr.startsWith('CONCATENATE(') || expr.startsWith('CONCAT(')) {
      const args = extractArgs(formula, expr.startsWith('CONCATENATE') ? 'CONCATENATE' : 'CONCAT');
      const parts = splitArgs(args);
      return parts.map(p => getStr(evaluateSimple(p, data))).join('');
    }
    if (expr.startsWith('TRIM(')) {
      const args = extractArgs(formula, 'TRIM');
      const text = getStr(evaluateSimple(args.trim(), data));
      return text.replace(/\s+/g, ' ').trim();
    }
    if (expr.startsWith('UPPER(')) {
      const args = extractArgs(formula, 'UPPER');
      const text = getStr(evaluateSimple(args.trim(), data));
      return text.toUpperCase();
    }
    if (expr.startsWith('LOWER(')) {
      const args = extractArgs(formula, 'LOWER');
      const text = getStr(evaluateSimple(args.trim(), data));
      return text.toLowerCase();
    }
    if (expr.startsWith('PROPER(')) {
      const args = extractArgs(formula, 'PROPER');
      const text = getStr(evaluateSimple(args.trim(), data));
      return text.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    }
    if (expr.startsWith('FIND(')) {
      const args = extractArgs(formula, 'FIND');
      const parts = splitArgs(args);
      if (parts.length < 2) return '#ERROR';
      const findText = getStr(evaluateSimple(parts[0], data));
      const withinText = getStr(evaluateSimple(parts[1], data));
      const startNum = parts.length > 2 ? Math.floor(getNum(evaluateSimple(parts[2], data))) - 1 : 0;
      const idx = withinText.indexOf(findText, startNum);
      return idx >= 0 ? idx + 1 : '#VALUE!';
    }
    if (expr.startsWith('LEN(')) {
      const args = extractArgs(formula, 'LEN');
      const text = getStr(evaluateSimple(args.trim(), data));
      return text.length;
    }
    if (expr.startsWith('SUBSTITUTE(')) {
      const args = extractArgs(formula, 'SUBSTITUTE');
      const parts = splitArgs(args);
      if (parts.length < 3) return '#ERROR';
      const text = getStr(evaluateSimple(parts[0], data));
      const oldText = getStr(evaluateSimple(parts[1], data));
      const newText = getStr(evaluateSimple(parts[2], data));
      if (parts.length > 3) {
        const instance = Math.floor(getNum(evaluateSimple(parts[3], data)));
        let count = 0;
        return text.replace(new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), m => (++count === instance ? newText : m));
      }
      return text.split(oldText).join(newText);
    }
    if (expr.startsWith('COUNTIF(')) {
      const args = extractArgs(formula, 'COUNTIF');
      const parts = splitArgs(args);
      if (parts.length < 2) return 0;
      const range = parseRange(parts[0]);
      const criteria = parts[1];
      return range.filter(ref => criteriaMatch(criteria, ref, data)).length;
    }
    if (expr.startsWith('SUMIF(')) {
      const args = extractArgs(formula, 'SUMIF');
      const parts = splitArgs(args);
      if (parts.length < 2) return 0;
      const range = parseRange(parts[0]);
      const criteria = parts[1];
      const sumRange = parts.length > 2 ? parseRange(parts[2]) : range;
      return sumRange.reduce((s, ref, i) => {
        const matchRef = range[i] || ref;
        return s + (criteriaMatch(criteria, matchRef, data) ? getNum(getCellValue(ref, data, new Set(visited))) : 0);
      }, 0);
    }
    if (expr.startsWith('COUNTIFS(')) {
      const args = extractArgs(formula, 'COUNTIFS');
      const parts = splitArgs(args);
      if (parts.length < 2 || parts.length % 2 !== 0) return 0;
      const rangePairs: { range: string[]; criteria: string }[] = [];
      for (let i = 0; i < parts.length; i += 2) {
        rangePairs.push({ range: parseRange(parts[i]), criteria: parts[i + 1] });
      }
      const maxLen = Math.max(...rangePairs.map(p => p.range.length));
      let count = 0;
      for (let row = 0; row < maxLen; row++) {
        const match = rangePairs.every(p => {
          const ref = p.range[row] || p.range[p.range.length - 1];
          return criteriaMatch(p.criteria, ref, data);
        });
        if (match) count++;
      }
      return count;
    }
    if (expr.startsWith('SUMIFS(')) {
      const args = extractArgs(formula, 'SUMIFS');
      const parts = splitArgs(args);
      if (parts.length < 3) return 0;
      const sumRange = parseRange(parts[0]);
      const rangePairs: { range: string[]; criteria: string }[] = [];
      for (let i = 1; i < parts.length; i += 2) {
        if (i + 1 < parts.length) rangePairs.push({ range: parseRange(parts[i]), criteria: parts[i + 1] });
      }
      const maxLen = Math.max(sumRange.length, ...rangePairs.map(p => p.range.length));
      let total = 0;
      for (let row = 0; row < maxLen; row++) {
        const match = rangePairs.every(p => {
          const ref = p.range[row] || p.range[p.range.length - 1];
          return criteriaMatch(p.criteria, ref, data);
        });
        if (match) total += getNum(getCellValue(sumRange[row] || sumRange[sumRange.length - 1], data, new Set(visited)));
      }
      return total;
    }
    if (expr.startsWith('AVERAGEIFS(')) {
      const args = extractArgs(formula, 'AVERAGEIFS');
      const parts = splitArgs(args);
      if (parts.length < 3) return 0;
      const avgRange = parseRange(parts[0]);
      const rangePairs: { range: string[]; criteria: string }[] = [];
      for (let i = 1; i < parts.length; i += 2) {
        if (i + 1 < parts.length) rangePairs.push({ range: parseRange(parts[i]), criteria: parts[i + 1] });
      }
      const maxLen = Math.max(avgRange.length, ...rangePairs.map(p => p.range.length));
      const vals: number[] = [];
      for (let row = 0; row < maxLen; row++) {
        const match = rangePairs.every(p => {
          const ref = p.range[row] || p.range[p.range.length - 1];
          return criteriaMatch(p.criteria, ref, data);
        });
        if (match) vals.push(getNum(getCellValue(avgRange[row] || avgRange[avgRange.length - 1], data, new Set(visited))));
      }
      return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    }
    if (expr.startsWith('VLOOKUP(')) {
      const afterOpen = expr.slice(8);
      let depth = 0, closeIdx = -1;
      for (let i = 0; i < afterOpen.length; i++) {
        if (afterOpen[i] === '(') depth++;
        if (afterOpen[i] === ')') {
          if (depth === 0) { closeIdx = i; break; }
          depth--;
        }
      }
      if (closeIdx === -1) return '#N/A';
      const argsStr = afterOpen.slice(0, closeIdx);
      const restExpr = afterOpen.slice(closeIdx + 1);
      const parts = splitArgs(argsStr);
      if (parts.length < 3) return '#N/A';
      const lookupVal = getStr(evaluateSimple(parts[0], data)).toLowerCase();
      const range = parseRange(parts[1]);
      const colIdx = Math.floor(getNum(evaluateSimple(parts[2], data))) - 1;
      const tableCols = Math.max(...range.map(ref => colToIndex(ref.replace(/\d+$/, '').toUpperCase()))) + 1;
      const tableRows: { first: string; row: string[] }[] = [];
      const firstColLetter = range[0].replace(/\d+$/, '');
      for (const ref of range) {
        const rowIdx = parseInt(ref.match(/\d+/)?.[0] || '1');
        if (!tableRows.find(r => r.first === String(rowIdx))) {
          const row: string[] = [];
          for (let c = 0; c < tableCols; c++) {
            const cellRef = `${indexToCol(colToIndex(firstColLetter) + c)}${rowIdx}`;
            row.push(getStr(getCellValue(cellRef, data, new Set(visited))));
          }
          if (row[0]) tableRows.push({ first: String(rowIdx), row });
        }
      }
      const found = tableRows.find(r => r.row[0].toLowerCase() === lookupVal);
      const vlookupResult = found && found.row[colIdx] ? found.row[colIdx] : '#N/A';
      if (restExpr && vlookupResult !== '#N/A') {
        return evaluateFormula('=' + String(vlookupResult) + restExpr, data, visited);
      }
      return vlookupResult;
    }
    if (expr.startsWith('XLOOKUP(')) {
      const args = extractArgs(formula, 'XLOOKUP');
      const parts = splitArgs(args);
      if (parts.length < 3) return '#N/A';
      const lookupVal = getStr(evaluateSimple(parts[0], data)).toLowerCase();
      const lookupRange = parseRange(parts[1]);
      const returnRange = parseRange(parts[2]);
      for (let i = 0; i < lookupRange.length; i++) {
        const ref = lookupRange[i];
        const val = getStr(getCellValue(ref, data, new Set(visited))).toLowerCase();
        if (val === lookupVal) {
          const retRef = returnRange[i] || returnRange[returnRange.length - 1];
          return getCellValue(retRef, data, new Set(visited));
        }
      }
      return parts.length > 3 ? evaluateSimple(parts[3], data) : '#N/A';
    }
    if (expr.startsWith('MATCH(')) {
      const args = extractArgs(formula, 'MATCH');
      const parts = splitArgs(args);
      if (parts.length < 2) return '#N/A';
      const lookupVal = getStr(evaluateSimple(parts[0], data)).toLowerCase();
      const lookupRange = parseRange(parts[1]);
      const matchType = parts.length > 2 ? Math.floor(getNum(evaluateSimple(parts[2], data))) : 1;
      for (let i = 0; i < lookupRange.length; i++) {
        const cellVal = getStr(getCellValue(lookupRange[i], data, new Set(visited))).toLowerCase();
        if (matchType === 0 && cellVal === lookupVal) return String(i + 1);
        if (matchType !== 0 && cellVal === lookupVal) return String(i + 1);
      }
      return '#N/A';
    }
    if (expr.startsWith('INDEX(')) {
      const args = extractArgs(formula, 'INDEX');
      const parts = splitArgs(args);
      if (parts.length < 2) return '#N/A';
      const arrayRange = parseRange(parts[0]);
      const rowNum = Math.floor(getNum(evaluateSimple(parts[1], data))) - 1;
      if (rowNum < 0 || rowNum >= arrayRange.length) return '#REF!';
      if (parts.length >= 3) {
        const colNum = Math.floor(getNum(evaluateSimple(parts[2], data))) - 1;
        const firstColLetter = arrayRange[0].replace(/\d+$/, '');
        const rowIdx = arrayRange[rowNum].match(/\d+/)?.[0] || '1';
        const ref = `${indexToCol(colToIndex(firstColLetter) + colNum)}${rowIdx}`;
        return getCellValue(ref, data, new Set(visited));
      }
      return getCellValue(arrayRange[rowNum], data, new Set(visited));
    }

    if (expr.startsWith('SMALL(') || expr.startsWith('LARGE(')) {
      const isSmall = expr.startsWith('SMALL');
      const inner = expr.slice(isSmall ? 6 : 6, -1);
      const comma = inner.lastIndexOf(',');
      if (comma === -1) return 0;
      const range = parseRange(inner.slice(0, comma).trim());
      const k = Math.floor(getNum(evaluateSimple(inner.slice(comma + 1).trim(), data))) || 1;
      const vals = range.map(ref => getNum(getCellValue(ref, data, new Set(visited)))).filter(v => v !== 0).sort((a, b) => isSmall ? a - b : b - a);
      return vals[k - 1] || 0;
    }
    if (expr.startsWith('ROUND(')) {
      const inner = expr.slice(6, -1);
      const comma = inner.lastIndexOf(',');
      if (comma === -1) return 0;
      const num = getNum(evaluateSimple(inner.slice(0, comma).trim(), data));
      const places = Math.floor(getNum(evaluateSimple(inner.slice(comma + 1).trim(), data))) || 0;
      return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
    }
    if (expr === 'TODAY()') return new Date().toLocaleDateString();
    if (expr === 'NOW()') return new Date().toLocaleString();

    const resolved = expr.replace(/[A-Z]+\d+/gi, ref => {
      const v = getCellValue(ref.toUpperCase(), data, new Set(visited));
      return getStr(v);
    });
    return Function(`"use strict"; return (${resolved})`)();
  } catch { return '#ERROR'; }
}

function criteriaMatch(criteria: string, ref: string, data: SpreadsheetData): boolean {
  const val = getStr(getCellValue(ref.toUpperCase(), data, new Set()));
  criteria = criteria.trim();

  const opMatch = criteria.match(/^(\d+)([=><]=?)(\d+)$/);
  if (opMatch) {
    const cellVal = parseFloat(val);
    const op = opMatch[2];
    const critVal = parseFloat(opMatch[3]);
    if (isNaN(cellVal)) return false;
    if (op === '>') return cellVal > critVal;
    if (op === '<') return cellVal < critVal;
    if (op === '>=') return cellVal >= critVal;
    if (op === '<=') return cellVal <= critVal;
    if (op === '=') return cellVal === critVal;
    if (op === '!=') return cellVal !== critVal;
    return false;
  }

  const comparisonMatch = criteria.match(/^([><]=?|!=)\s*(.+)$/);
  if (comparisonMatch) {
    const op = comparisonMatch[1];
    const critVal = comparisonMatch[2].trim();
    const cellNum = parseFloat(val), critNum = parseFloat(critVal);
    if (!isNaN(cellNum) && !isNaN(critNum)) {
      if (op === '>') return cellNum > critNum;
      if (op === '<') return cellNum < critNum;
      if (op === '>=') return cellNum >= critNum;
      if (op === '<=') return cellNum <= critNum;
      if (op === '!=') return cellNum !== critNum;
    }
    return false;
  }

  if ((criteria.startsWith('"') && criteria.endsWith('"'))) {
    return val.toLowerCase() === criteria.slice(1, -1).toLowerCase();
  }
  if (criteria.startsWith("'") && criteria.endsWith("'")) {
    return val.toLowerCase() === criteria.slice(1, -1).toLowerCase();
  }

  return val.toLowerCase() === criteria.toLowerCase();
}

function evaluateCondition(cond: string, data: SpreadsheetData): boolean {
  const m = cond.match(/^(.+?)\s*(=|>|<|>=|<=|!=)\s*(.+)$/);
  if (!m) return !!evaluateFormulaOrValue(cond, data);
  const l = String(evaluateFormulaOrValue(m[1].trim(), data));
  const op = m[2];
  const r = String(evaluateFormulaOrValue(m[3].trim(), data));
  const ln = parseFloat(l), rn = parseFloat(r);
  if (!isNaN(ln) && !isNaN(rn)) {
    if (op === '=') return ln === rn;
    if (op === '>') return ln > rn;
    if (op === '<') return ln < rn;
    if (op === '>=') return ln >= rn;
    if (op === '<=') return ln <= rn;
    if (op === '!=') return ln !== rn;
  }
  if (op === '=') return l.toLowerCase() === r.toLowerCase();
  if (op === '!=') return l.toLowerCase() !== r.toLowerCase();
  return false;
}

function evaluateFormulaOrValue(v: string, data: SpreadsheetData): string | number {
  v = v.trim();
  if (v.startsWith('=')) return evaluateFormula(v, data);
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1);
  const n = parseFloat(v);
  return isNaN(n) ? v : n;
}

function splitByCommas(s: string): string[] {
  const parts: string[] = [];
  let depth = 0, start = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '[') depth++;
    if (s[i] === ')' || s[i] === ']') depth--;
    if (s[i] === ',' && depth === 0) { parts.push(s.slice(start, i)); start = i + 1; }
  }
  parts.push(s.slice(start));
  return parts;
}

export function createDefaultData(): SpreadsheetData {
  return {
    cells: {
      'B1': { value: 'Item' },
      'C1': { value: 'Price' },
      'D1': { value: 'Qty' },
      'B2': { value: 'Apples' },
      'C2': { value: '10' },
      'D2': { value: '3' },
      'B3': { value: 'Bananas' },
      'C3': { value: '20' },
      'D3': { value: '2' },
      'B4': { value: 'Cherries' },
      'C4': { value: '15' },
      'D4': { value: '5' },
      'B5': { value: 'Dates' },
      'C5': { value: '25' },
      'D5': { value: '1' },
      'B6': { value: 'Elderberries' },
      'C6': { value: '12' },
      'D6': { value: '4' },
      'E1': { value: 'Total' },
    },
    cols: 6,
    rows: 8,
  };
}
