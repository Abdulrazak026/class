import { generateChart } from './chartRenderer';
import { createMockPandas, createMockNumpy, createMockScipyStats, createMockSeaborn, createMockStatistics } from './mockModules';
import { DEMO_BASE_URL, getHtmlForUrl } from './demoSiteData';

const mockMath = {
  __type: 'module', pi: Math.PI, e: Math.E, sqrt: Math.sqrt, pow: Math.pow,
  floor: Math.floor, ceil: Math.ceil, abs: Math.abs, round: Math.round,
  sin: Math.sin, cos: Math.cos, tan: Math.tan, log: Math.log, log10: Math.log10,
  exp: Math.exp, max: Math.max, min: Math.min,
};

class MockDateTime {
  __type = 'module';
  datetime = class {
    __type = 'datetime'; year: number; month: number; day: number;
    constructor(...args: number[]) {
      const d = args.length ? new Date(args[0], (args[1]||1)-1, args[2]||1) : new Date();
      this.year = d.getFullYear(); this.month = d.getMonth()+1; this.day = d.getDate();
    }
    strftime(fmt: string) { return fmt.replace('%Y', String(this.year)).replace('%m', String(this.month).padStart(2,'0')).replace('%d', String(this.day).padStart(2,'0')); }
  };
  date = class {
    __type = 'date'; year: number; month: number; day: number;
    constructor(y: number, m: number, d: number) { this.year = y; this.month = m; this.day = d; }
  };
  timedelta = class {
    __type = 'timedelta'; days: number;
    constructor(days: number) { this.days = days; }
  };
}

class MockCollections {
  __type = 'module';
  Counter = class {
    __type = 'counter'; _data: Record<string, number>;
    constructor(iterable?: any[]) {
      this._data = {};
      if (iterable) for (const item of iterable) this._data[item] = (this._data[item] || 0) + 1;
    }
    get(key: string) { return this._data[key] || 0; }
    most_common(n?: number) { return Object.entries(this._data).sort((a, b) => b[1] - a[1]).slice(0, n); }
  };
  defaultdict = class {
    __type = 'defaultdict'; _default: () => any; _data: Record<string, any>;
    constructor(defaultFn: () => any) { this._default = defaultFn; this._data = {}; }
    get(key: string) { if (!(key in this._data)) this._data[key] = this._default(); return this._data[key]; }
  };
}

class MockRe {
  __type = 'module';
  match(pattern: string, text: string) { const m = text.match(new RegExp(pattern)); return m ? { group: (i?: number) => m[i ?? 0] } : null; }
  search(pattern: string, text: string) { const m = text.search(new RegExp(pattern)); return m >= 0 ? { start: () => m } : null; }
  findall(pattern: string, text: string) { return text.match(new RegExp(pattern, 'g')) || []; }
  sub(pattern: string, repl: string, text: string) { return text.replace(new RegExp(pattern, 'g'), repl); }
  compile(pattern: string) { return new MockRePattern(pattern); }
}

class MockRePattern {
  private pattern: RegExp;
  constructor(pattern: string) { this.pattern = new RegExp(pattern, 'g'); }
  findall(text: string) { return text.match(this.pattern) || []; }
  sub(repl: string, text: string) { return text.replace(this.pattern, repl); }
  search(text: string) { const m = this.pattern.exec(text); return m ? { group: () => m[0] } : null; }
}

class MockCsv {
  __type = 'module';
  reader(data: string) { return data.split('\n').filter(Boolean).map(line => line.split(',')); }
  writer() { return { writerow: (row: string[]) => {}, writerows: (rows: string[][]) => {} }; }
}

class MockJson {
  __type = 'module';
  dumps(obj: any) { return JSON.stringify(obj); }
  loads(str: string) { return JSON.parse(str); }
}

export interface PythonOutput {
  type: 'stdout' | 'stderr' | 'info';
  text: string;
}

interface PlotSeries {
  type: 'line' | 'bar';
  x: any[];
  y: any[];
  label?: string;
  color?: string;
  marker?: string;
  linestyle?: string;
}

class MockAxes {
  __type = 'axes';
  series: PlotSeries[] = [];
  title = '';
  xlabel = '';
  ylabel = '';

  plot(x: any[], y: any[], options?: any) {
    const opts = options || {};
    this.series.push({ type: 'line', x, y, label: opts.label, color: opts.color, marker: opts.marker, linestyle: opts.linestyle });
  }
  bar(x: any[], y: any[], options?: any) {
    const opts = options || {};
    this.series.push({ type: 'bar', x, y, label: opts.label, color: opts.color });
  }
  set_title(t: string) { this.title = t; }
  set_xlabel(l: string) { this.xlabel = l; }
  set_ylabel(l: string) { this.ylabel = l; }
  legend() {}
}

class MockPlt {
  series: PlotSeries[] = [];
  chartTitle = '';
  chartXlabel = '';
  chartYlabel = '';
  legendEnabled = false;
  outputs: string[] = [];
  _currentAxes: MockAxes | null = null;
  _pieData: { values: number[]; labels: string[]; autopct?: string } | null = null;
  _histData: { values: number[]; bins: number } | null = null;
  _scatterData: { x: number[]; y: number[] } | null = null;

  plot(x: any[], y?: any[], options?: any) {
    if (y === undefined && Array.isArray(x)) { y = x; x = Array.from({ length: y.length }, (_, i) => i); }
    const opts = options || {};
    this.series.push({ type: 'line', x, y, label: opts.label, color: opts.color, marker: opts.marker, linestyle: opts.linestyle });
    this._currentAxes = null;
  }
  bar(x: any[], y: any[], options?: any) {
    const opts = options || {};
    this.series.push({ type: 'bar', x, y, label: opts.label, color: opts.color });
    this._currentAxes = null;
  }
  scatter(x: any[], y: any[], options?: any) {
    const xv = x ? ((x.__type === 'series') ? x.values : x) : [];
    const yv = y ? ((y.__type === 'series') ? y.values : y) : [];
    this._scatterData = { x: xv.map(Number), y: yv.map(Number) };
    const pairs = xv.map((_: any, i: number) => `(${xv[i]}, ${yv[i]})`).join(' ');
    this.outputs.push(`Scatter plot: ${pairs}`);
    this._currentAxes = null;
  }
  hist(data: any[], bins?: number) {
    const values = data ? ((data.__type === 'series') ? data.values : data) : [];
    this._histData = { values: values.map(Number), bins: bins || 10 };
    const sorted = [...this._histData.values].sort((a, b) => a - b);
    const binCount = this._histData.bins;
    const min = sorted[0], max = sorted[sorted.length - 1];
    const binWidth = (max - min) / binCount || 1;
    const bins_arr: number[] = new Array(binCount).fill(0);
    for (const v of sorted) {
      const idx = Math.min(Math.floor((v - min) / binWidth), binCount - 1);
      bins_arr[idx]++;
    }
    const maxFreq = Math.max(...bins_arr, 1);
    const barW = 20;
    this.outputs.push(' Histogram:');
    for (let i = 0; i < binCount; i++) {
      const lo = (min + i * binWidth).toFixed(1);
      const hi = (min + (i + 1) * binWidth).toFixed(1);
      const freq = bins_arr[i];
      const bar = '█'.repeat(Math.round((freq / maxFreq) * barW)) || '▏';
      this.outputs.push(` ${lo}-${hi} | ${bar} ${freq}`);
    }
    this._currentAxes = null;
  }
  pie(values: any[], options?: any) {
    const opts = options || {};
    this._pieData = { values: values.map(Number), labels: opts.labels || [], autopct: opts.autopct };
    const total = values.reduce((a: number, b: number) => a + Number(b), 0);
    this.outputs.push(' Pie Chart:');
    const labels = opts.labels || values.map((_: any, i: number) => `Slice ${i + 1}`);
    for (let i = 0; i < values.length; i++) {
      const pct = total > 0 ? ((Number(values[i]) / total) * 100).toFixed(1) : '0.0';
      this.outputs.push(` ${labels[i]}: ${values[i]} (${pct}%)`);
    }
    this._currentAxes = null;
  }
  title(t: string) { this.chartTitle = t; }
  xlabel(l: string) { this.chartXlabel = l; }
  ylabel(l: string) { this.chartYlabel = l; }
  legend() { this.legendEnabled = true; }
  tight_layout() {}
  figure() { return { __type: 'fig' }; }
  subplots(rows: number, cols: number, options?: any) {
    const count = rows * cols;
    const axesList: MockAxes[] = [];
    for (let i = 0; i < count; i++) axesList.push(new MockAxes());
    return { __type: 'tuple', values: [{ __type: 'fig' }, axesList] };
  }
  show() {
    if (this._pieData) {
      this._pieData = null;
      if (!this.outputs.some(o => o.startsWith(' Pie Chart:'))) {
        this.outputs.push('[Chart generated]');
      }
      return;
    }
    let chart = '';
    if (this._currentAxes) {
      const ax = this._currentAxes;
      chart = renderChart(ax.series, ax.title || this.chartTitle, ax.xlabel || this.chartXlabel, ax.ylabel || this.chartYlabel);
    } else if (this.series.length > 0) {
      chart = renderChart(this.series, this.chartTitle, this.chartXlabel, this.chartYlabel);
    }
    if (chart) {
      this.outputs.push(chart);
      this.outputs.push('[Chart generated]');
    }
    this.series = [];
    this.chartTitle = '';
    this.chartXlabel = '';
    this.chartYlabel = '';
    this.legendEnabled = false;
    this._currentAxes = null;
  }
}

function renderChart(series: PlotSeries[], title: string, xlabel: string, ylabel: string): string {
  return generateChart(series, title, xlabel, ylabel);
}

class MockRandom {
  __type = 'module';
  randint(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  random() { return Math.random(); }
  choice(arr: any[]) { return arr[Math.floor(Math.random() * arr.length)]; }
  shuffle(arr: any[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  seed(n: number) {}
}

class MockResponse {
  __type = 'response';
  status_code: number;
  text: string;
  _url: string;

  constructor(url: string) {
    this._url = url;
    const html = getHtmlForUrl(url);
    if (html) {
      this.status_code = 200;
      this.text = html;
    } else if (url.includes('api.github.com')) {
      this.status_code = 200;
      this.text = JSON.stringify({ name: 'octocat', public_repos: 8, login: 'octocat', location: 'San Francisco' });
    } else {
      this.status_code = 404;
      this.text = '<html><body><h1>404 Not Found</h1></body></html>';
    }
  }

  json() {
    try { return JSON.parse(this.text); } catch { return {}; }
  }
}

class MockRequests {
  __type = 'module';
  get(url: string) { return new MockResponse(url); }
  post(url: string, data?: any) { return new MockResponse(url); }
}

class MockTag {
  __type = 'tag';
  name: string;
  attrs: Record<string, string>;
  children: MockTag[];
  _rawText: string;

  constructor(name: string, attrs: Record<string, string>, children: MockTag[], rawText: string) {
    this.name = name;
    this.attrs = attrs;
    this.children = children;
    this._rawText = rawText;
  }

  get text(): string {
    if (this.name === '__text__') return this._rawText;
    const parts: string[] = [];
    const collect = (t: MockTag) => {
      if (t.name === '__text__' && t._rawText.trim()) parts.push(t._rawText.trim());
      for (const c of t.children) collect(c);
    };
    collect(this);
    return parts.join(' ');
  }

  get(attr: string): string | null { return this.attrs[attr] || null; }

  find(tagName: string, attrs?: Record<string, string>): MockTag | null {
    if (this.name === tagName || tagName === '*') {
      if (!attrs) return this;
      let match = true;
      for (const [k, v] of Object.entries(attrs)) {
        if (k === 'class_' && this.attrs['class'] !== v) { match = false; break; }
        if (k !== 'class_' && this.attrs[k] !== v) { match = false; break; }
      }
      if (match) return this;
    }
    for (const child of this.children) {
      const found = child.find(tagName, attrs);
      if (found) return found;
    }
    return null;
  }

  find_all(tagName: string, attrs?: Record<string, string>): MockTag[] {
    const results: MockTag[] = [];
    if (this.name === tagName || tagName === '*') {
      if (!attrs) results.push(this);
      else {
        let match = true;
        for (const [k, v] of Object.entries(attrs)) {
          if (k === 'class_' && this.attrs['class'] !== v) { match = false; break; }
          if (k !== 'class_' && this.attrs[k] !== v) { match = false; break; }
        }
        if (match) results.push(this);
      }
    }
    for (const child of this.children) {
      results.push(...child.find_all(tagName, attrs));
    }
    return results;
  }
}

function parseHtmlToTags(html: string): MockTag[] {
  const root = new MockTag('root', {}, [], '');
  const stack: MockTag[] = [root];
  const tagRegex = /<(\/?)(\w+)([^>]*)>/g;
  let lastEnd = 0;
  let m: RegExpExecArray | null;

  const parseAttrs = (s: string): Record<string, string> => {
    const attrs: Record<string, string> = {};
    const attrRegex = /(\w[\w-]*)\s*=\s*"([^"]*)"/g;
    let a: RegExpExecArray | null;
    while ((a = attrRegex.exec(s)) !== null) attrs[a[1]] = a[2];
    return attrs;
  };

  while ((m = tagRegex.exec(html)) !== null) {
    const isClosing = m[1] === '/';
    const tagName = m[2];
    const attrStr = m[3].trim();
    const start = m.index;

    const textBefore = html.slice(lastEnd, start).replace(/\s+/g, ' ').trim();
    if (textBefore && stack[stack.length - 1]) {
      stack[stack.length - 1].children.push(new MockTag('__text__', {}, [], textBefore));
    }

    if (isClosing) {
      if (stack.length > 1) stack.pop();
      lastEnd = tagRegex.lastIndex;
      continue;
    }

    const isSelfClosing = attrStr.endsWith('/') || ['br', 'hr', 'img', 'input', 'meta', 'link'].includes(tagName);
    const tag = new MockTag(tagName, parseAttrs(attrStr), [], '');

    if (stack[stack.length - 1]) {
      stack[stack.length - 1].children.push(tag);
    }

    if (!isSelfClosing) {
      stack.push(tag);
    }
    lastEnd = tagRegex.lastIndex;
  }

  const remaining = html.slice(lastEnd).replace(/\s+/g, ' ').trim();
  if (remaining && stack[stack.length - 1]) {
    stack[stack.length - 1].children.push(new MockTag('__text__', {}, [], remaining));
  }

  return root.children;
}

class BeautifulSoup {
  __type = 'module';
  _root: MockTag;

  constructor(html: string, parser?: string) {
    const tags = parseHtmlToTags(html);
    this._root = new MockTag('__soup__', {}, tags, '');
  }

  find(tagName: string, attrs?: Record<string, string>): MockTag | null {
    return this._root.find(tagName, attrs);
  }

  find_all(tagName: string, attrs?: Record<string, string>): MockTag[] {
    return this._root.find_all(tagName, attrs);
  }

  get text(): string {
    const texts: string[] = [];
    const collect = (tag: MockTag) => {
      if (tag.name === '__text__' && tag.text.trim()) texts.push(tag.text.trim());
      for (const child of tag.children) collect(child);
    };
    collect(this._root);
    return texts.join(' ');
  }
}

function resolveVar(name: string, vars: Record<string, any>): any {
  if (name in vars) return vars[name];
  const subMatch = name.match(/^(.+?)\[(-?\d+)\]$/);
  if (subMatch) {
    const obj = resolveVar(subMatch[1], vars);
    const idx = parseInt(subMatch[2]);
    if (Array.isArray(obj)) return idx >= 0 ? obj[idx] : obj[obj.length + idx];
    if (obj && typeof obj === 'object' && obj.values) return idx >= 0 ? obj.values[idx] : obj.values[obj.values.length + idx];
    return undefined;
  }
  return undefined;
}

function evaluate(expr: string, vars: Record<string, any>): any {
  const s = expr.trim();
  if (!s) return '';
  if (s === 'True') return true;
  if (s === 'False') return false;
  if (s === 'None') return null;

  if (!isNaN(Number(s))) return Number(s);

  const ternaryMatch = s.match(/^(.+)\s+if\s+(.+)\s+else\s+(.+)$/);
  if (ternaryMatch) {
    const condition = evaluate(ternaryMatch[2].trim(), vars);
    if (condition) return evaluate(ternaryMatch[1].trim(), vars);
    return evaluate(ternaryMatch[3].trim(), vars);
  }

  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    let inner = s.slice(1, -1);
    if (s.startsWith('f"') || s.startsWith("f'")) {
      inner = inner.replace(/\{(.+?)\}/g, (_, expr2) => String(evaluate(expr2.trim(), vars) ?? ''));
    }
    return inner;
  }

  const lambdaMatch = s.match(/^lambda\s+([a-zA-Z_]\w*(?:\s*,\s*[a-zA-Z_]\w*)*)\s*:\s*(.+)$/);
  if (lambdaMatch) {
    const paramNames = lambdaMatch[1].split(',').map((p: string) => p.trim());
    const body = lambdaMatch[2].trim();
    const closure = { ...vars };
    return (...callArgs: any[]) => {
      const scope = { ...closure };
      for (let i = 0; i < paramNames.length; i++) {
        scope[paramNames[i]] = callArgs[i];
      }
      return evaluate(body, scope);
    };
  }

  if (s.startsWith('(') && s.endsWith(')')) {
    const inner = s.slice(1, -1);
    const parts = splitTopLevel(inner, ',');
    if (parts.length > 1) {
      return { __type: 'tuple', values: parts.map(p => evaluate(p.trim(), vars)) };
    }
    return evaluate(inner, vars);
  }

  if (s.startsWith('[') && s.endsWith(']')) {
    const inner = s.slice(1, -1);
    if (!inner.trim()) return [];
    const compMatch = inner.match(/^(.+)\s+for\s+([a-zA-Z_]\w*)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);
    if (compMatch) {
      const expr = compMatch[1].trim();
      const varName = compMatch[2];
      const iterable = evaluate(compMatch[3].trim(), vars);
      const condition = compMatch[4] ? compMatch[4].trim() : null;
      const result: any[] = [];
      if (Array.isArray(iterable) || typeof iterable === 'string') {
        for (const item of iterable) {
          vars[varName] = item;
          if (!condition || evaluate(condition, vars)) {
            result.push(evaluate(expr, vars));
          }
        }
        delete vars[varName];
      }
      return result;
    }
    const parts = splitTopLevel(inner, ',');
    return parts.map(p => evaluate(p.trim(), vars));
  }

  if (s.startsWith('{') && s.endsWith('}')) {
    const inner = s.slice(1, -1);
    if (!inner.trim()) return { __type: 'dict' };
    const parts = splitTopLevel(inner, ',');
    const obj: Record<string, any> = { __type: 'dict' };
    for (const part of parts) {
      const kv = splitTopLevel(part, ':');
      if (kv.length === 2) {
        const k = evaluate(kv[0].trim(), vars);
        obj[String(k)] = evaluate(kv[1].trim(), vars);
      }
    }
    return obj;
  }

  const resolved = resolveVar(s, vars);
  if (resolved !== undefined) return resolved;

  const attrMatch = s.match(/^(.+)\.([a-zA-Z_]\w*)$/);
  if (attrMatch) {
    const obj = evaluate(attrMatch[1], vars);
    const attr = attrMatch[2];
    if (obj && typeof obj === 'object' && attr in obj) return obj[attr];
    return `Error: attribute ${attr} not found`;
  }

  const bracketAccess = s.match(/^(.+?)\[(.+)\]$/);
  if (bracketAccess) {
    const obj = evaluate(bracketAccess[1], vars);
    const key = evaluate(bracketAccess[2], vars);
    if (obj && typeof obj === 'object') {
      if (obj.__type === 'dataframe') {
        if (Array.isArray(key)) return key.map(k => obj._col(String(k)));
        return obj._col(String(key));
      }
      if (obj.__type === 'series') return obj.values[Number(key)];
      if (obj.__type === 'groupby') return obj._selectCol(String(key));
      if (obj.__type === 'dict') return obj[String(key)];
    }
    if (Array.isArray(obj)) {
      const idx = Number(key);
      if (!isNaN(idx)) return idx >= 0 ? obj[idx] : obj[obj.length + idx];
      return obj[key];
    }
    if (typeof obj === 'string') {
      const idx = Number(key);
      if (!isNaN(idx)) return idx >= 0 ? obj[idx] : obj[obj.length + idx];
    }
    return undefined;
  }

  const methMatch = s.match(/^(.+)\.([a-zA-Z_]\w*)\((.*)\)$/);
  if (methMatch) {
    const obj = evaluate(methMatch[1], vars);
    const method = methMatch[2];
    const parsedArgs = parseArgs(methMatch[3], vars);
    let args = parsedArgs.positional;
    if (Object.keys(parsedArgs.keywords).length > 0) args.push(parsedArgs.keywords);

    if (obj && typeof obj === 'object' && obj.__type) {
      if (obj.__type === 'plt' && typeof obj[method] === 'function') return obj[method](...args);
      if (obj.__type === 'axes' && typeof obj[method] === 'function') return obj[method](...args);
      if (obj.__type === 'fig') return obj;
      if (typeof obj[method] === 'function') return obj[method](...args);
    }

    if (obj && typeof obj === 'object' && obj.__type === 'dict') {
      if (method === 'keys') return Object.keys(obj).filter(k => k !== '__type');
      if (method === 'values') return Object.entries(obj).filter(([k]) => k !== '__type').map(([, v]) => v);
      if (method === 'items') return Object.entries(obj).filter(([k]) => k !== '__type');
      if (method === 'get') return obj[String(args[0])];
    }

    if (typeof obj === 'string') {
      if (method === 'upper') return obj.toUpperCase();
      if (method === 'lower') return obj.toLowerCase();
      if (method === 'strip') return obj.trim();
      if (method === 'replace') return obj.split(args[0]).join(args[1]);
      if (method === 'split') return obj.split(args[0] || ' ');
      if (method === 'join') return (args[0] || []).join(obj);
      if (method === 'startswith') return obj.startsWith(args[0]);
      if (method === 'endswith') return obj.endsWith(args[0]);
      if (method === 'find') return obj.indexOf(args[0]);
      if (method === 'count') return obj.split(args[0]).length - 1;
      if (method === 'capitalize') return obj.charAt(0).toUpperCase() + obj.slice(1).toLowerCase();
      if (method === 'title') return obj.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    }
    if (Array.isArray(obj)) {
      if (method === 'append') { obj.push(args[0]); return obj; }
      if (method === 'pop') return obj.pop();
      if (method === 'sort') return [...obj].sort();
      if (method === 'reverse') return [...obj].reverse();
      if (method === 'count') return obj.filter(x => x === args[0]).length;
      if (method === 'index') return obj.indexOf(args[0]);
      if (method === 'remove') { const idx = obj.indexOf(args[0]); if (idx >= 0) obj.splice(idx, 1); return obj; }
    }
    return `Error: unsupported method ${method}`;
  }

  const funcMatch = s.match(/^([a-zA-Z_]\w*)\((.+)\)$/);
  if (funcMatch) {
    const fn = funcMatch[1];
    const rawArgs = funcMatch[2];
    if (fn === 'print') {
      const argVals = splitTopLevel(rawArgs, ',').map(a => evaluate(a.trim(), vars));
      const text = argVals.map(v => v === null ? 'None' : v === undefined ? '' : String(v)).join(' ');
      return { __print: true, text };
    }
    const parsedArgs = parseArgs(rawArgs, vars);
    const args = parsedArgs.positional;
    if (fn === 'len') return args[0]?.length ?? 0;
    if (fn === 'str') return String(args[0] ?? '');
    if (fn === 'int') return parseInt(args[0]) || 0;
    if (fn === 'float') return parseFloat(args[0]) || 0;
    if (fn === 'list') return args[0] ? Array.from(args[0]) : [];
    if (fn === 'range') return args.length <= 1 ? Array.from({ length: args[0] || 0 }, (_, i) => i) : Array.from({ length: Math.max(0, args[1] - (args[0] || 0)) }, (_, i) => i + (args[0] || 0));
    if (fn === 'sum') return args.reduce((a: number, b: number) => a + (Number(b) || 0), 0);
    if (fn === 'max') return args.length ? Math.max(...args.map(Number)) : -Infinity;
    if (fn === 'min') return args.length ? Math.min(...args.map(Number)) : Infinity;
    if (fn === 'abs') return Math.abs(args[0] || 0);
    if (fn === 'round') return args.length === 2 ? Math.round(args[0] * Math.pow(10, args[1])) / Math.pow(10, args[1]) : Math.round(args[0]);
    if (fn === 'type') return typeof args[0];
    if (fn === 'sorted') return args[0] ? [...args[0]].sort() : [];
    if (fn === 'enumerate') return args[0] ? [...args[0]].map((v: any, i: number) => [i, v]) : [];
    if (fn === 'map') {
      const func = args[0];
      const iterable = args[1];
      if (typeof func === 'function' && Array.isArray(iterable)) return iterable.map((item: any) => func(item));
      return [];
    }
    if (fn === 'filter') {
      const func = args[0];
      const iterable = args[1];
      if (typeof func === 'function' && Array.isArray(iterable)) return iterable.filter((item: any) => func(item));
      return [];
    }
    if (fn === 'zip') {
      const iterables = args;
      if (iterables.length < 2) return [];
      const minLen = Math.min(...iterables.map((a: any) => a.length || 0));
      const result: any[][] = [];
      for (let i = 0; i < minLen; i++) result.push(iterables.map((a: any) => a[i]));
      return result;
    }
  }

  const opMatch = s.match(/^(.+?)\s*([+\-*/%]|==|!=|>=|<=|>|<|and|or|in|not\s+in)\s*(.+)$/);
  if (opMatch) {
    let left = opMatch[1].trim(), right = opMatch[3].trim(), op = opMatch[2];

    if (op === 'not in') {
      const lv = evaluate(left, vars), rv = evaluate(right, vars);
      if (typeof rv === 'string' || Array.isArray(rv)) return !rv.includes(lv);
      return false;
    }

    const lv = evaluate(left, vars), rv = evaluate(right, vars);
    if (op === '+') {
      if (typeof lv === 'string' || typeof rv === 'string') return String(lv ?? '') + String(rv ?? '');
      return Number(lv ?? 0) + Number(rv ?? 0);
    }
    if (op === '-') return Number(lv ?? 0) - Number(rv ?? 0);
    if (op === '*') return Number(lv ?? 0) * Number(rv ?? 0);
    if (op === '/') return Number(rv) !== 0 ? Number(lv ?? 0) / Number(rv) : 'Error: division by zero';
    if (op === '%') return Number(lv ?? 0) % Number(rv ?? 0);
    if (op === '==') return String(lv) === String(rv);
    if (op === '!=') return String(lv) !== String(rv);
    if (op === '>') return Number(lv ?? 0) > Number(rv ?? 0);
    if (op === '<') return Number(lv ?? 0) < Number(rv ?? 0);
    if (op === '>=') return Number(lv ?? 0) >= Number(rv ?? 0);
    if (op === '<=') return Number(lv ?? 0) <= Number(rv ?? 0);
    if (op === 'and') return lv && rv;
    if (op === 'or') return lv || rv;
    if (op === 'in') {
      if (typeof rv === 'string' || Array.isArray(rv)) return rv.includes(lv);
      return false;
    }
  }

  return `Error: cannot evaluate "${s}"`;
}

function parseArgs(rawArgs: string, vars: Record<string, any>): { positional: any[]; keywords: Record<string, any> } {
  const parts = splitTopLevel(rawArgs, ',');
  const positional: any[] = [];
  const keywords: Record<string, any> = {};
  for (const part of parts) {
    const trimmed = part.trim();
    const kwMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
    if (kwMatch) {
      keywords[kwMatch[1]] = evaluate(kwMatch[2], vars);
    } else {
      positional.push(evaluate(trimmed, vars));
    }
  }
  return { positional, keywords };
}

function splitTopLevel(s: string, delim: string): string[] {
  const parts: string[] = [];
  let depth = 0, start = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') depth--;
    else if (ch === delim && depth === 0) {
      parts.push(s.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(s.slice(start));
  return parts;
}

export function executePython(code: string): PythonOutput[] {
  const autoImports: string[] = [];
  if ((/\bpd\./).test(code) && !/import\s+pandas/.test(code)) autoImports.push('import pandas as pd');
  if ((/\bplt\./).test(code) && !/import\s+matplotlib/.test(code)) autoImports.push('import matplotlib.pyplot as plt');
  if ((/\bnp\./).test(code) && !/import\s+numpy/.test(code)) autoImports.push('import numpy as np');
  if ((/\bsns\./).test(code) && !/import\s+seaborn/.test(code)) autoImports.push('import seaborn as sns');
  if (autoImports.length) code = autoImports.join('\n') + '\n' + code;

  const results: PythonOutput[] = [];
  const lines = code.split('\n');
  const variables: Record<string, any> = {};
  let i = 0;
  let lastValue: any = undefined;

  const execLine = (line: string) => {
    const trimmed = line.trim().replace(/(?:#.*)$/, '').trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const importMatch = trimmed.match(/^(?:from\s+(\S+)\s+)?import\s+([\w,.\s]+)(?:\s+as\s+(\S+))?(?:\s*#.*)?$/);
    if (importMatch) {
      const fromModule = importMatch[1];
      const moduleNames = importMatch[2].split(',').map(s => s.trim());
      const alias = importMatch[3];
      for (const moduleName of moduleNames) {
        if (moduleName === 'matplotlib' || moduleName === 'matplotlib.pyplot' || moduleName === 'pyplot') {
          variables[alias || moduleName] = new MockPlt();
          variables[alias || moduleName].__type = 'plt';
          continue;
        }
        if (moduleName === 'random') {
          const rand = new MockRandom();
          variables[alias || moduleName] = rand;
          variables[alias || moduleName].__type = 'random';
          continue;
        }
        if (moduleName === 'math') {
          variables[alias || moduleName] = mockMath;
          variables[alias || moduleName].__type = 'math';
          continue;
        }
        if (moduleName === 'datetime') {
          const dt = new MockDateTime();
          variables[alias || moduleName] = dt;
          variables[alias || moduleName].__type = 'datetime';
          continue;
        }
        if (moduleName === 'statistics') {
          variables[alias || moduleName] = createMockStatistics();
          variables[alias || moduleName].__type = 'statistics';
          continue;
        }
        if (moduleName === 'collections') {
          const coll = new MockCollections();
          variables[alias || moduleName] = coll;
          variables[alias || moduleName].__type = 'collections';
          continue;
        }
        if (moduleName === 'pandas' || moduleName === 'pd') {
          const pd = new MockPandas();
          variables[alias || moduleName] = pd;
          variables[alias || moduleName].__type = 'pd';
          continue;
        }
        if (moduleName === 'numpy' || moduleName === 'np') {
          variables[alias || moduleName] = new MockNumpy();
          variables[alias || moduleName].__type = 'np';
          continue;
        }
        if (moduleName === 're') {
          variables[alias || moduleName] = new MockRe();
          variables[alias || moduleName].__type = 're';
          continue;
        }
        if (moduleName === 'csv') {
          variables[alias || moduleName] = new MockCsv();
          variables[alias || moduleName].__type = 'csv';
          continue;
        }
        if (moduleName === 'os') {
          variables[alias || moduleName] = {};
          variables[alias || moduleName].__type = 'os';
          continue;
        }
        if (moduleName === 'sys') {
          variables[alias || moduleName] = {};
          variables[alias || moduleName].__type = 'sys';
          continue;
        }
        if (moduleName === 'json') {
          variables[alias || moduleName] = new MockJson();
          variables[alias || moduleName].__type = 'json';
          continue;
        }
      }
      // Handle aliased imports after the loop (comma-imports skip these)
      if (moduleNames.length > 1) return;
      const primaryModule = moduleNames[0];
      if (primaryModule === 'random') {
        const rand = new MockRandom();
        rand.__type = 'module';
        variables[alias] = rand;
        return;
      }
      if (fromModule === 'scipy' && primaryModule === 'stats') {
        const mod = createMockScipyStats();
        variables[alias] = mod;
        return;
      }
      if (primaryModule === 'requests') {
        variables[alias] = new MockRequests();
        return;
      }
      if (primaryModule === 'bs4' && !fromModule) {
        const mod = { __type: 'module', BeautifulSoup };
        variables[alias] = mod;
        return;
      }
      if (fromModule === 'bs4') {
        variables[alias] = primaryModule === 'BeautifulSoup' ? BeautifulSoup : { __type: 'module' };
        return;
      }
      const moduleFactories: Record<string, () => any> = {
        pandas: createMockPandas,
        numpy: createMockNumpy,
        seaborn: createMockSeaborn,
        statistics: createMockStatistics,
      };
      if (moduleFactories[primaryModule]) {
        variables[alias] = moduleFactories[primaryModule]();
        return;
      }
      return;
    }

    const bracketAssignMatch = trimmed.match(/^([a-zA-Z_]\w*)\[(.+?)\]\s*=\s*(.+)/);
    if (bracketAssignMatch) {
      const obj = evaluate(bracketAssignMatch[1], variables);
      if (obj && typeof obj === 'object') {
        const key = evaluate(bracketAssignMatch[2], variables);
        const value = evaluate(bracketAssignMatch[3], variables);
        if (obj.__type === 'dataframe') { obj._set(String(key), value); lastValue = value; return; }
        if (obj.__type === 'dict') { obj[String(key)] = value; lastValue = value; return; }
        if (Array.isArray(obj)) { const idx = Number(key); if (!isNaN(idx)) obj[idx] = value; lastValue = value; return; }
      }
      return;
    }

    const tupleAssignMatch = trimmed.match(/^([a-zA-Z_]\w*(?:\s*,\s*[a-zA-Z_]\w*)+)\s*=\s*(.+)/);
    if (tupleAssignMatch) {
      const varNames = tupleAssignMatch[1].split(',').map(v => v.trim());
      const val = evaluate(tupleAssignMatch[2], variables);
      if (val && typeof val === 'object' && val.__type === 'tuple' && Array.isArray(val.values)) {
        for (let vi = 0; vi < varNames.length && vi < val.values.length; vi++) {
          variables[varNames[vi]] = val.values[vi];
        }
      }
      lastValue = val;
      return;
    }

    const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)/);
    if (assignMatch) {
      const val = evaluate(assignMatch[2], variables);
      variables[assignMatch[1]] = val;
      lastValue = val;
      return;
    }

    const printMatch = trimmed.match(/^print\((.+)\)$/s);
    if (printMatch) {
      const arg = printMatch[1];
      const val = evaluate(arg, variables);
      if (val && typeof val === 'object' && val.__print) {
        results.push({ type: 'stdout', text: val.text });
      } else {
        const text = val === null ? 'None' : val === undefined ? '' : String(val);
        results.push({ type: 'stdout', text });
      }
      lastValue = undefined;
      return;
    }

    if (trimmed === 'plt.show()') {
      const plt = variables['plt'];
      if (plt && plt.__type === 'plt') {
        plt.show();
        for (const out of plt.outputs) {
          results.push({ type: 'stdout', text: out });
        }
        plt.outputs = [];
      }
      lastValue = undefined;
      return;
    }

    if (trimmed.startsWith('def ')) {
      const nameMatch = trimmed.match(/^def\s+([a-zA-Z_]\w*)/);
      if (nameMatch) {
        const fnName = nameMatch[1];
        variables[fnName] = { __type: 'function', name: fnName };
      }
      return;
    }

    if (trimmed === 'return' || trimmed.startsWith('return ')) {
      return;
    }

    const ifMatch = trimmed.match(/^if\s+(.+):$/);
    if (ifMatch) { return 'if'; }

    const forMatch = trimmed.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+(.+):$/);
    if (forMatch) { return 'for'; }

    const val = evaluate(trimmed, variables);
    if (val !== undefined) {
      results.push({ type: 'stdout', text: String(val) });
      lastValue = undefined;
    }
  };

  const hasUnbalanced = (s: string): boolean => {
    let braces = 0, parens = 0, brackets = 0, inStr = false, q = '';
    for (let j = 0; j < s.length; j++) {
      const c = s[j];
      if (inStr) { if (c === q && (j === 0 || s[j-1] !== '\\')) inStr = false; continue; }
      if (c === '"' || c === "'") { inStr = true; q = c; continue; }
      if (c === '{') braces++; if (c === '}') braces--;
      if (c === '(') parens++; if (c === ')') parens--;
      if (c === '[') brackets++; if (c === ']') brackets--;
    }
    return braces > 0 || parens > 0 || brackets > 0;
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) { i++; continue; }

    const ifMatch = trimmed.match(/^if\s+(.+):$/);
    if (ifMatch) {
      const condition = evaluate(ifMatch[1], variables);
      const block: string[] = [];
      i++;
      while (i < lines.length && (lines[i].startsWith('  ') || lines[i].startsWith('\t') || lines[i] === '')) {
        if (lines[i].trim()) block.push(lines[i].trim());
        i++;
      }
      if (condition) {
        for (const bLine of block) execLine(bLine);
      }
      continue;
    }

    const forMatch = trimmed.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+(.+):$/);
    if (forMatch) {
      const iterable = evaluate(forMatch[2], variables);
      const block: string[] = [];
      i++;
      while (i < lines.length && (lines[i].startsWith('  ') || lines[i].startsWith('\t') || lines[i] === '')) {
        if (lines[i].trim()) block.push(lines[i].trim());
        i++;
      }
      if (Array.isArray(iterable) || typeof iterable === 'string') {
        for (const item of iterable) {
          variables[forMatch[1]] = item;
          for (const bLine of block) execLine(bLine);
        }
      }
      continue;
    }

    if (hasUnbalanced(trimmed)) {
      let combined = trimmed;
      i++;
      while (i < lines.length) {
        const nextLine = lines[i].trim();
        combined += '\n' + nextLine;
        i++;
        if (!hasUnbalanced(combined)) break;
      }
      execLine(combined);
      continue;
    }

    execLine(trimmed);
    i++;
  }

  if (results.length === 0 && lastValue !== undefined && typeof lastValue !== 'function') {
    results.push({ type: 'stdout', text: String(lastValue) });
  }
  return results;
}
