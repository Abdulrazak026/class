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
  if (n < 0) return '';
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
  const rStart = Math.min(r1, r2), rEnd = Math.max(r1, r2);
  const cStart = Math.min(c1, c2), cEnd = Math.max(c1, c2);
  const colCount = cEnd - cStart + 1, rowCount = rEnd - rStart + 1;
  if (colCount * rowCount > 100000) return [];
  for (let r = rStart; r <= rEnd; r++) for (let c = cStart; c <= cEnd; c++) cells.push(`${indexToCol(c)}${r + 1}`);
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
  if (v === 'TRUE') return true;
  if (v === 'FALSE') return false;
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
  const normalized = (() => {
    let result = '';
    let inStr = false;
    let quoteChar = '';
    for (const ch of formula) {
      if (!inStr && (ch === '"' || ch === "'")) { inStr = true; quoteChar = ch; result += ch; continue; }
      if (inStr && ch === quoteChar) { inStr = false; result += ch; continue; }
      if (inStr) { result += ch; continue; }
      if (ch === ' ') continue;
      result += ch.toUpperCase();
    }
    return result;
  })();
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
        const v = getCellValue(ref, data, new Set(visited));
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
      return n > 0 ? text.slice(0, n) : '';
    }
    if (expr.startsWith('RIGHT(')) {
      const args = extractArgs(formula, 'RIGHT');
      const parts = splitArgs(args);
      if (parts.length < 2) return '#ERROR';
      const text = getStr(evaluateSimple(parts[0], data));
      const n = Math.floor(getNum(evaluateSimple(parts[1], data)));
      return n > 0 ? text.slice(-n) : '';
    }
    if (expr.startsWith('MID(')) {
      const args = extractArgs(formula, 'MID');
      const parts = splitArgs(args);
      if (parts.length < 3) return '#ERROR';
      const text = getStr(evaluateSimple(parts[0], data));
      const start = Math.max(0, Math.floor(getNum(evaluateSimple(parts[1], data))) - 1);
      const n = Math.floor(getNum(evaluateSimple(parts[2], data)));
      return n > 0 ? text.slice(start, start + n) : '';
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
      return text.replace(/\b\w/g, c => c.toUpperCase());
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
      if (!oldText) return text;
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
          if (!p.range[row]) return false;
          return criteriaMatch(p.criteria, p.range[row], data);
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
          if (!p.range[row]) return false;
          return criteriaMatch(p.criteria, p.range[row], data);
        });
        if (match && sumRange[row]) total += getNum(getCellValue(sumRange[row], data, new Set(visited)));
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
          if (!p.range[row]) return false;
          return criteriaMatch(p.criteria, p.range[row], data);
        });
        if (match && avgRange[row]) vals.push(getNum(getCellValue(avgRange[row], data, new Set(visited))));
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
      if (range.length === 0) return '#VALUE!';
      const colIdx = Math.floor(getNum(evaluateSimple(parts[2], data))) - 1;
      const firstColLetter = range[0].replace(/\d+$/, '');
      const firstColIdx = colToIndex(firstColLetter.toUpperCase());
      const lastColLetter = range[range.length - 1].replace(/\d+$/, '').toUpperCase();
      const tableCols = colToIndex(lastColLetter) - firstColIdx + 1;
      const tableRows: { first: string; row: string[] }[] = [];
      for (const ref of range) {
        const rowIdx = parseInt(ref.match(/\d+/)?.[0] || '1');
        if (!tableRows.find(r => r.first === String(rowIdx))) {
          const row: string[] = [];
          for (let c = 0; c < tableCols; c++) {
            const cellRef = `${indexToCol(colToIndex(firstColLetter) + c)}${rowIdx}`;
            row.push(getStr(getCellValue(cellRef, data, new Set(visited))));
          }
          if (typeof row[0] === 'string' && row[0] !== '') tableRows.push({ first: String(rowIdx), row });
        }
      }
      const found = tableRows.find(r => r.row[0].toLowerCase() === lookupVal);
      const vlookupResult = found ? found.row[colIdx] : '#N/A';
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
      const args = splitArgs(extractArgs(formula, isSmall ? 'SMALL' : 'LARGE'));
      if (args.length < 2) return 0;
      const range = parseRange(args[0]);
      const k = Math.floor(getNum(evaluateSimple(args[1], data)));
      if (k < 1) return '#NUM!';
      const vals = range.map(ref => getNum(getCellValue(ref, data, new Set(visited)))).sort((a, b) => isSmall ? a - b : b - a);
      if (k > vals.length) return '#NUM!';
      return vals[k - 1];
    }
    if (expr.startsWith('ROUND(')) {
      const args = splitArgs(extractArgs(formula, 'ROUND'));
      if (args.length < 2) return 0;
      const num = getNum(evaluateSimple(args[0], data));
      const places = Math.floor(getNum(evaluateSimple(args[1], data))) || 0;
      return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
    }
    if (expr === 'TODAY()') return new Date().toISOString().split('T')[0];
    if (expr === 'NOW()') return new Date().toLocaleString();

    const resolved = expr.replace(/[A-Z]+\d+/gi, ref => {
      const v = getCellValue(ref.toUpperCase(), data, new Set(visited));
      const n = typeof v === 'number' ? v : parseFloat(v as string);
      return isNaN(n) ? '0' : String(n);
    });
    if (/[a-zA-Z_$][0-9a-zA-Z_$]*\s*\(/.test(resolved)) return '#ERROR!';
    const safeResolved = resolved.replace(/[^0-9+\-*/.()eE\s]/g, '');
    if (!safeResolved) return '#ERROR!';
    try { return Function(`"use strict"; return (${safeResolved})`)(); } catch { return '#ERROR!'; }
  } catch { return '#ERROR'; }
}

function criteriaMatch(criteria: string, ref: string, data: SpreadsheetData): boolean {
  const val = getStr(getCellValue(ref.toUpperCase(), data, new Set()));
  criteria = criteria.trim();

  const unquote = (s: string): string => {
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) return s.slice(1, -1);
    return s;
  };

  const tryCompare = (raw: string): boolean | null => {
    const opMatch = raw.match(/^([\d.]+)([=><]=?)([\d.]+)$/);
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
    const comparisonMatch = raw.match(/^([><]=?|[!=]=)\s*(.+)$/);
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
    return null;
  };

  const unquoted = unquote(criteria);
  if (unquoted !== criteria) {
    const result = tryCompare(unquoted);
    if (result !== null) return result;
    return val.toLowerCase() === unquoted.toLowerCase();
  }

  const result = tryCompare(criteria);
  if (result !== null) return result;

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
  const data: Record<string, { value: string }> = {
    'A1': { value: 'ID' },
    'B1': { value: 'Product' },
    'C1': { value: 'Category' },
    'D1': { value: 'Price' },
    'E1': { value: 'Qty' },
    'F1': { value: 'Region' },
  };

  const products: [string, string, string, string, string, string][] = [
    ['TXN-001', 'Widget Pro', 'Electronics', '149.99', '2', 'East'],
    ['TXN-002', 'Gadget X', 'Accessories', '29.99', '5', 'East'],
    ['TXN-003', 'Power Cable', 'Accessories', '69.99', '1', 'West'],
    ['TXN-004', 'Desk Lamp', 'Office', '124.99', '3', 'West'],
    ['TXN-005', 'Ergonomic Chair', 'Office', '499.99', '1', 'Central'],
    ['TXN-006', 'Monitor 27"', 'Electronics', '349.99', '2', 'East'],
    ['TXN-007', 'Laptop Stand', 'Accessories', '79.99', '4', 'South'],
    ['TXN-008', 'USB Hub', 'Electronics', '22.99', '10', 'East'],
    ['TXN-009', 'Mechanical Keyboard', 'Electronics', '149.99', '1', 'West'],
    ['TXN-010', 'Mouse Pad XL', 'Accessories', '19.99', '8', 'Central'],
    ['TXN-011', 'Widget Pro', 'Electronics', '149.99', '3', 'South'],
    ['TXN-012', 'Desk Lamp', 'Office', '124.99', '2', 'Central'],
    ['TXN-013', 'Gadget X', 'Accessories', '29.99', '6', 'West'],
    ['TXN-014', 'Monitor 27"', 'Electronics', '349.99', '1', 'South'],
    ['TXN-015', 'Power Cable', 'Accessories', '69.99', '3', 'East'],
    ['TXN-016', 'Laptop Stand', 'Accessories', '79.99', '2', 'East'],
    ['TXN-017', 'Ergonomic Chair', 'Office', '499.99', '2', 'West'],
    ['TXN-018', 'USB Hub', 'Electronics', '22.99', '5', 'West'],
    ['TXN-019', 'Mechanical Keyboard', 'Electronics', '149.99', '3', 'Central'],
    ['TXN-020', 'Mouse Pad XL', 'Accessories', '19.99', '12', 'East'],
    ['TXN-021', 'Widget Pro', 'Electronics', '149.99', '1', 'East'],
    ['TXN-022', 'Desk Lamp', 'Office', '124.99', '4', 'South'],
    ['TXN-023', 'Gadget X', 'Accessories', '29.99', '3', 'Central'],
    ['TXN-024', 'Monitor 27"', 'Electronics', '349.99', '2', 'West'],
    ['TXN-025', 'Power Cable', 'Accessories', '69.99', '4', 'South'],
    ['TXN-026', 'Laptop Stand', 'Accessories', '79.99', '1', 'Central'],
    ['TXN-027', 'Ergonomic Chair', 'Office', '499.99', '1', 'East'],
    ['TXN-028', 'USB Hub', 'Electronics', '22.99', '8', 'East'],
    ['TXN-029', 'Mechanical Keyboard', 'Electronics', '149.99', '2', 'South'],
    ['TXN-030', 'Mouse Pad XL', 'Accessories', '19.99', '5', 'West'],
  ];

  products.forEach(([id, product, cat, price, qty, region], i) => {
    const row = i + 2;
    data[`A${row}`] = { value: id };
    data[`B${row}`] = { value: product };
    data[`C${row}`] = { value: cat };
    data[`D${row}`] = { value: price };
    data[`E${row}`] = { value: qty };
    data[`F${row}`] = { value: region };
  });

  return { cells: data, cols: 6, rows: 35 };
}
