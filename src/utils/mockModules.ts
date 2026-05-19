export class MockDataFrame {
  __type = 'dataframe';
  _data: Record<string, any[]>;
  private _index: number[];
  _name?: string;

  constructor(data: Record<string, any[]>) {
    this._data = {};
    for (const [k, v] of Object.entries(data)) {
      this._data[k] = [...v];
    }
    const len = Object.values(this._data)[0]?.length || 0;
    this._index = Array.from({ length: len }, (_, i) => i);
  }

  get length() { return Object.values(this._data)[0]?.length || 0; }
  get shape() { return [this.length, Object.keys(this._data).length]; }
  get columns() { return Object.keys(this._data); }
  get dtypes() { return Object.fromEntries(Object.entries(this._data).map(([k, v]) => [k, typeof v[0]])); }

  get(key: string | number): any {
    if (typeof key === 'number') return this.iloc[key];
    return this._data[key];
  }

  _col(key: string): MockSeries { return new MockSeries(this._data[key] || [], { name: key }); }
  _set(key: string, value: any) {
    if (Array.isArray(value)) this._data[key] = value;
    else if (value && typeof value === 'object' && value.__type === 'series') this._data[key] = value.values;
    else this._data[key] = [value];
  }

  iloc(key: any): any {
    if (typeof key === 'number') {
      if (key < 0) key = this.length + key;
      const row: Record<string, any> = {};
      for (const [k, v] of Object.entries(this._data)) row[k] = v[key];
      return row;
    }
    if (key instanceof Array) {
      const rows = key.map((i: number) => {
        const row: Record<string, any> = {};
        for (const [k, v] of Object.entries(this._data)) row[k] = v[i];
        return row;
      });
      const newData: Record<string, any[]> = {};
      for (const k of Object.keys(this._data)) newData[k] = rows.map(r => r[k]);
      return new MockDataFrame(newData);
    }
    return null;
  }

  loc(key: any): any {
    if (typeof key === 'object' && key !== null) {
      const rows: Record<string, any>[] = [];
      for (let i = 0; i < this.length; i++) {
        const row: Record<string, any> = {};
        for (const [k, v] of Object.entries(this._data)) row[k] = v[i];
        if (this._evalCond(key, row)) rows.push(row);
      }
      const newData: Record<string, any[]> = {};
      for (const k of Object.keys(this._data)) newData[k] = rows.map(r => r[k]);
      return new MockDataFrame(newData);
    }
    return this;
  }

  private _evalCond(cond: Record<string, any>, row: Record<string, any>): boolean {
    let result = true;
    for (const [k, v] of Object.entries(cond)) {
      if (k === '__type') continue;
      if (typeof v === 'object' && v !== null) {
        for (const [op, val] of Object.entries(v)) {
          if (op === '>') result = result && Number(row[k]) > Number(val);
          else if (op === '<') result = result && Number(row[k]) < Number(val);
          else if (op === '>=') result = result && Number(row[k]) >= Number(val);
          else if (op === '<=') result = result && Number(row[k]) <= Number(val);
          else if (op === '==') result = result && String(row[k]) === String(val);
          else if (op === '!=') result = result && String(row[k]) !== String(val);
        }
      } else if (typeof v === 'function') {
        result = result && v(row[k]);
      } else {
        result = result && String(row[k]) === String(v);
      }
    }
    return result;
  }

  head(n = 5) {
    const newData: Record<string, any[]> = {};
    for (const [k, v] of Object.entries(this._data)) newData[k] = v.slice(0, n);
    return new MockDataFrame(newData);
  }
  tail(n = 5) {
    const newData: Record<string, any[]> = {};
    for (const [k, v] of Object.entries(this._data)) newData[k] = v.slice(-n);
    return new MockDataFrame(newData);
  }
  sample(n = 1) {
    const idx = Math.floor(Math.random() * this.length);
    return this.iloc(idx);
  }
  info() {
    let s = `<class 'MockDataFrame'>\n`;
    s += `RangeIndex: ${this.length} entries\n`;
    s += `Data columns (total ${Object.keys(this._data).length} columns):\n`;
    for (const [k, v] of Object.entries(this._data)) s += `  ${k}: ${v.length} non-null values\n`;
    s += `dtypes: ${Object.values(this.dtypes).join(', ')}`;
    return s;
  }
  describe() {
    const nums = Object.entries(this._data).filter(([, v]) => v.some(x => !isNaN(Number(x))));
    let s = '';
    for (const [k, v] of nums) {
      const vals = v.map(Number).filter(x => !isNaN(x));
      if (vals.length === 0) continue;
      vals.sort((a, b) => a - b);
      const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
      const mid = Math.floor(vals.length / 2);
      const median = vals.length % 2 ? vals[mid] : (vals[mid - 1] + vals[mid]) / 2;
      const min = vals[0], max = vals[vals.length - 1];
      const std = Math.sqrt(vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length);
      const q1 = vals[Math.floor(vals.length * 0.25)];
      const q3 = vals[Math.floor(vals.length * 0.75)];
      s += `\n${k}:\n  count: ${vals.length}, mean: ${mean.toFixed(2)}, std: ${std.toFixed(2)}\n  min: ${min}, 25%: ${q1}, 50%: ${median}, 75%: ${q3}, max: ${max}`;
    }
    return s.trim() || 'No numeric columns';
  }

  isnull() {
    const newData: Record<string, any[]> = {};
    for (const [k, v] of Object.entries(this._data)) newData[k] = v.map(x => x === null || x === undefined || (typeof x === 'number' && isNaN(x)));
    return new MockDataFrame(newData);
  }
  isna() { return this.isnull(); }

  dropna(opts?: { subset?: string[] }) {
    const newData: Record<string, any[]> = {};
    for (const k of Object.keys(this._data)) newData[k] = [];
    for (let i = 0; i < this.length; i++) {
      let hasNa = false;
      const cols = opts?.subset || Object.keys(this._data);
      for (const k of cols) {
        const v = this._data[k][i];
        if (v === null || v === undefined || (typeof v === 'number' && isNaN(v))) { hasNa = true; break; }
      }
      if (!hasNa) for (const k of Object.keys(this._data)) newData[k].push(this._data[k][i]);
    }
    return new MockDataFrame(newData);
  }

  fillna(value: any) {
    const newData: Record<string, any[]> = {};
    for (const [k, v] of Object.entries(this._data)) {
      newData[k] = v.map(x => (x === null || x === undefined || (typeof x === 'number' && isNaN(x))) ? (typeof value === 'function' ? value() : value) : x);
    }
    return new MockDataFrame(newData);
  }

  groupby(col: string) {
    const groups: Record<string, MockDataFrame> = {};
    for (let i = 0; i < this.length; i++) {
      const key = String(this._data[col]?.[i] ?? 'NULL');
      if (!groups[key]) {
        const gData: Record<string, any[]> = {};
        for (const k of Object.keys(this._data)) gData[k] = [];
        groups[key] = new MockDataFrame(gData);
      }
      for (const k of Object.keys(this._data)) groups[key]._data[k].push(this._data[k][i]);
    }
    return new MockGroupBy(groups, Object.keys(this._data));
  }

  melt(opts?: { id_vars?: string[]; value_vars?: string[]; var_name?: string; value_name?: string }) {
    const idCols = opts?.id_vars || [];
    const valCols = opts?.value_vars || Object.keys(this._data).filter(k => !idCols.includes(k));
    const varName = opts?.var_name || 'variable';
    const valName = opts?.value_name || 'value';
    const result: Record<string, any[]> = {};
    for (const id of idCols) result[id] = [];
    result[varName] = [];
    result[valName] = [];
    for (let i = 0; i < this.length; i++) {
      for (const vc of valCols) {
        for (const id of idCols) result[id].push(this._data[id][i]);
        result[varName].push(vc);
        result[valName].push(this._data[vc][i]);
      }
    }
    return new MockDataFrame(result);
  }

  merge(other: MockDataFrame, opts?: { on?: string; how?: string; left_on?: string; right_on?: string }) {
    const leftKey = opts?.on || opts?.left_on || '';
    const rightKey = opts?.on || opts?.right_on || '';
    const how = opts?.how || 'inner';
    const result: Record<string, any[]> = {};
    const allCols = [...new Set([...Object.keys(this._data), ...Object.keys(other._data)])];
    for (const c of allCols) result[c] = [];
    for (let i = 0; i < this.length; i++) {
      let matched = false;
      const lv = this._data[leftKey]?.[i];
      for (let j = 0; j < other.length; j++) {
        const rv = other._data[rightKey]?.[j];
        if (String(lv) === String(rv)) {
          for (const c of allCols) result[c].push(c in this._data ? this._data[c][i] : other._data[c][j]);
          matched = true;
        }
      }
      if (!matched && (how === 'left' || how === 'outer')) {
        for (const c of allCols) result[c].push(c in this._data ? this._data[c][i] : null);
      }
    }
    if (how === 'right' || how === 'outer') {
      for (let j = 0; j < other.length; j++) {
        let matched = false;
        const rv = other._data[rightKey]?.[j];
        for (let i = 0; i < this.length; i++) {
          if (String(this._data[leftKey]?.[i]) === String(rv)) { matched = true; break; }
        }
        if (!matched) {
          for (const c of allCols) result[c].push(c in other._data ? other._data[c][j] : null);
        }
      }
    }
    return new MockDataFrame(result);
  }

  pivot_table(opts: { values: string; index: string; columns?: string; aggfunc?: string; margins?: boolean }) {
    const { values, index, columns, aggfunc = 'mean' } = opts;
    const groups: Record<string, number[]> = {};
    for (let i = 0; i < this.length; i++) {
      const key = String(this._data[index]?.[i] ?? '') + (columns ? '|' + String(this._data[columns]?.[i] ?? '') : '');
      if (!groups[key]) groups[key] = [];
      groups[key].push(Number(this._data[values]?.[i] ?? 0));
    }
    const result: Record<string, any[]> = {};
    result[index] = [];
    const colSet = new Set<string>();
    for (const key of Object.keys(groups)) {
      const parts = key.split('|');
      if (columns) colSet.add(parts[1]);
    }
    for (const c of colSet) result[c] = [];
    for (const key of Object.keys(groups)) {
      const parts = key.split('|');
      const idxVal = parts[0];
      const colVal = columns ? parts[1] : '';
      const vals = groups[key];
      let agg: number;
      if (aggfunc === 'sum') agg = vals.reduce((a, b) => a + b, 0);
      else if (aggfunc === 'count') agg = vals.length;
      else if (aggfunc === 'max') agg = Math.max(...vals);
      else if (aggfunc === 'min') agg = Math.min(...vals);
      else agg = vals.reduce((a, b) => a + b, 0) / vals.length;
      if (!result[index].includes(idxVal)) result[index].push(idxVal);
      if (columns) {
        if (!result[colVal]) result[colVal] = [];
        const idx = result[index].indexOf(idxVal);
        result[colVal][idx] = Math.round(agg * 100) / 100;
      }
    }
    return new MockDataFrame(result);
  }

  sort_values(cols: string | string[]) {
    const col = typeof cols === 'string' ? cols : cols[0];
    const indices = Array.from({ length: this.length }, (_, i) => i);
    indices.sort((a, b) => String(this._data[col]?.[a] ?? '').localeCompare(String(this._data[col]?.[b] ?? '')));
    const newData: Record<string, any[]> = {};
    for (const k of Object.keys(this._data)) newData[k] = indices.map(i => this._data[k][i]);
    return new MockDataFrame(newData);
  }

  shift(periods = 1) {
    const newData: Record<string, any[]> = {};
    for (const [k, v] of Object.entries(this._data)) {
      newData[k] = [...Array(periods).fill(null), ...v.slice(0, -periods)];
    }
    return new MockDataFrame(newData);
  }

  apply(func: any) {
    if (typeof func === 'function') {
      const newData: Record<string, any[]> = {};
      for (const [k, v] of Object.entries(this._data)) {
        newData[k] = v.map(func);
      }
      return new MockDataFrame(newData);
    }
    return this;
  }

  corr() {
    const nums = Object.entries(this._data).filter(([, v]) => v.some(x => !isNaN(Number(x))));
    const result: Record<string, any[]> = {};
    const names = nums.map(([k]) => k);
    for (const [k1] of nums) {
      result[k1] = [];
      for (const [k2] of nums) {
        if (k1 === k2) result[k1].push(1);
        else result[k1].push(0.5);
      }
    }
    return new MockDataFrame(result);
  }

  sum() {
    const result: Record<string, any[]> = {};
    for (const [k, v] of Object.entries(this._data)) {
      result[k] = [v.reduce((a: number, b: any) => a + (Number(b) || 0), 0)];
    }
    return new MockDataFrame(result);
  }

  mean() {
    const result: Record<string, any[]> = {};
    for (const [k, v] of Object.entries(this._data)) {
      const nums = v.map(Number).filter(x => !isNaN(x));
      result[k] = [nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0];
    }
    return new MockDataFrame(result);
  }

  count() {
    const result: Record<string, any[]> = {};
    for (const [k, v] of Object.entries(this._data)) {
      result[k] = [v.filter((x: any) => x !== null && x !== undefined && !(typeof x === 'number' && isNaN(x))).length];
    }
    return new MockDataFrame(result);
  }

  min() {
    const result: Record<string, any[]> = {};
    for (const [k, v] of Object.entries(this._data)) {
      const nums = v.map(Number).filter(x => !isNaN(x));
      result[k] = [nums.length ? Math.min(...nums) : 0];
    }
    return new MockDataFrame(result);
  }

  max() {
    const result: Record<string, any[]> = {};
    for (const [k, v] of Object.entries(this._data)) {
      const nums = v.map(Number).filter(x => !isNaN(x));
      result[k] = [nums.length ? Math.max(...nums) : 0];
    }
    return new MockDataFrame(result);
  }

  value_counts(normalize?: boolean) {
    if (Object.keys(this._data).length === 1) {
      const col = Object.keys(this._data)[0];
      const counts: Record<string, number> = {};
      for (const v of this._data[col]) {
        counts[String(v)] = (counts[String(v)] || 0) + 1;
      }
      const total = Object.values(counts).reduce((a, b) => a + b, 0);
      const result: Record<string, any[]> = {};
      const keys = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
      result[col] = keys;
      result['count'] = keys.map(k => normalize ? Math.round((counts[k] / total) * 100) / 100 : counts[k]);
      return new MockDataFrame(result);
    }
    return this;
  }

  isin(values: any[]) {
    const col = Object.keys(this._data)[0];
    const newData: Record<string, any[]> = {};
    for (const [k, v] of Object.entries(this._data)) newData[k] = v.map((x: any) => values.includes(x));
    return new MockDataFrame(newData);
  }

  toString() {
    if (this.length === 0) return 'Empty DataFrame';
    const cols = Object.keys(this._data);
    const widths = cols.map(c => Math.max(c.length, ...this._data[c].map(v => String(v ?? '').length), 3));
    const lines: string[] = [];
    const header = cols.map((c, i) => c.padEnd(widths[i])).join('  ');
    lines.push(header);
    lines.push(cols.map((_, i) => '-'.repeat(widths[i])).join('  '));
    for (let r = 0; r < this.length; r++) {
      lines.push(cols.map((c, i) => String(this._data[c][r] ?? '').padEnd(widths[i])).join('  '));
    }
    return lines.join('\n');
  }
}

class MockGroupBy {
  __type = 'groupby';
  private groups: Record<string, MockDataFrame>;
  private cols: string[];

  constructor(groups: Record<string, MockDataFrame>, cols: string[]) {
    this.groups = groups;
    this.cols = cols;
  }

  _selectCol(col: string) {
    const newGroups: Record<string, MockDataFrame> = {};
    for (const [key, df] of Object.entries(this.groups)) {
      newGroups[key] = new MockDataFrame({ [col]: df._data[col] || [] });
    }
    return new MockGroupBy(newGroups, [col]);
  }

  agg(fn: any) {
    if (typeof fn === 'string') {
      return this._apply(fn);
    }
    if (Array.isArray(fn)) {
      const result: Record<string, any[]> = {};
      result['__group__'] = Object.keys(this.groups);
      for (const f of fn) {
        const vals = Object.values(this.groups).map(g => this._aggCol(g, this.cols[0], f));
        result[String(f)] = vals;
      }
      return new MockDataFrame(result);
    }
    if (typeof fn === 'object') {
      const result: Record<string, any[]> = {};
      result['__group__'] = Object.keys(this.groups);
      for (const [col, f] of Object.entries(fn)) {
        const vals = Object.values(this.groups).map(g => this._aggCol(g, col, String(f)));
        result[col] = vals;
      }
      return new MockDataFrame(result);
    }
    return this;
  }

  private _aggCol(df: MockDataFrame, col: string, fn: string): number {
    const vals = df._data[col]?.map(Number).filter((v: number) => !isNaN(v)) || [];
    if (vals.length === 0) return 0;
    if (fn === 'sum') return vals.reduce((a: number, b: number) => a + b, 0);
    if (fn === 'mean') return vals.reduce((a: number, b: number) => a + b, 0) / vals.length;
    if (fn === 'count') return vals.length;
    if (fn === 'min') return Math.min(...vals);
    if (fn === 'max') return Math.max(...vals);
    if (fn === 'median') {
      const s = [...vals].sort((a, b) => a - b);
      const mid = Math.floor(s.length / 2);
      return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
    }
    return 0;
  }

  private _apply(fn: string) {
    const result: Record<string, any[]> = {};
    result['__group__'] = Object.keys(this.groups);
    for (const col of Object.keys(Object.values(this.groups)[0]?._data || {})) {
      result[col] = Object.values(this.groups).map(g => this._aggCol(g, col, fn));
    }
    return new MockDataFrame(result);
  }

  mean() { return this._apply('mean'); }
  sum() { return this._apply('sum'); }
  count() { return this._apply('count'); }
  min() { return this._apply('min'); }
  max() { return this._apply('max'); }
  median() { return this._apply('median'); }
  std() { return this._apply('std'); }
}

export class MockSeries {
  __type = 'series';
  private data: any[];
  _name?: string;

  constructor(data: any[], opts?: { name?: string }) {
    this.data = [...data];
    this._name = opts?.name;
  }

  get values() { return this.data; }
  get length() { return this.data.length; }

  mean() { const v = this.data.map(Number).filter(x => !isNaN(x)); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0; }
  median() {
    const v = this.data.map(Number).filter(x => !isNaN(x)).sort((a, b) => a - b);
    if (!v.length) return 0;
    const mid = Math.floor(v.length / 2);
    return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
  }
  std() {
    const v = this.data.map(Number).filter(x => !isNaN(x));
    if (v.length < 2) return 0;
    const mean = v.reduce((a, b) => a + b, 0) / v.length;
    return Math.sqrt(v.reduce((a, b) => a + (b - mean) ** 2, 0) / (v.length - 1));
  }
  min() { return Math.min(...this.data.map(Number).filter(x => !isNaN(x))); }
  max() { return Math.max(...this.data.map(Number).filter(x => !isNaN(x))); }
  sum() { return this.data.map(Number).filter(x => !isNaN(x)).reduce((a, b) => a + b, 0); }
  count() { return this.data.length; }

  quantile(q: number | number[]) {
    const v = this.data.map(Number).filter(x => !isNaN(x)).sort((a, b) => a - b);
    if (!v.length) return 0;
    if (Array.isArray(q)) return q.map(qi => v[Math.floor(qi * (v.length - 1))]);
    return v[Math.floor(q * (v.length - 1))];
  }

  fillna(value: any) {
    return new MockSeries(this.data.map(x => (x === null || x === undefined || (typeof x === 'number' && isNaN(x))) ? value : x));
  }

  apply(func: any) {
    if (typeof func === 'function') return new MockSeries(this.data.map(func));
    return this;
  }

  corr(other: MockSeries) {
    const a = this.data.map(Number).filter(x => !isNaN(x));
    const b = other.data.map(Number).filter(x => !isNaN(x));
    if (a.length < 2) return 0;
    const meanA = a.reduce((s, v) => s + v, 0) / a.length;
    const meanB = b.reduce((s, v) => s + v, 0) / b.length;
    const num = a.reduce((s, v, i) => s + (v - meanA) * (b[i] - meanB), 0);
    const denA = Math.sqrt(a.reduce((s, v) => s + (v - meanA) ** 2, 0));
    const denB = Math.sqrt(b.reduce((s, v) => s + (v - meanB) ** 2, 0));
    return denA && denB ? num / (denA * denB) : 0;
  }

  toString() { return `Series: [${this.data.join(', ')}]`; }
}

export function createMockPandas() {
  return {
    __type: 'module',
    DataFrame: (...args: any[]) => new MockDataFrame(...args),
    Series: (...args: any[]) => new MockSeries(...args),
    merge: (left: MockDataFrame, right: MockDataFrame, opts?: any) => left.merge(right, opts),
    to_datetime: (arg: any, opts?: any) => {
      if (arg && typeof arg === 'object' && arg.__type === 'series') {
        const vals = arg.values.map((v: any) => String(v));
        return new MockSeries(vals, { type: 'datetime' });
      }
      if (Array.isArray(arg)) {
        const vals = arg.map((v: any) => String(v));
        return new MockSeries(vals, { type: 'datetime' });
      }
      return arg;
    },
    read_csv: (path: string) => {
      return new MockDataFrame({
        name: ['Alice', 'Bob', 'Charlie', 'Diana'],
        salary: ['70000', '80000', '90000', '60000'],
        department: ['Engineering', 'Marketing', 'Engineering', 'Sales'],
        hire_date: ['2022-01-15', '2021-06-01', '2023-03-20', '2022-09-10'],
      });
    },
    read_excel: () => createMockPandas().read_csv(''),
  };
}

export function createMockNumpy() {
  return {
    __type: 'module',
    mean: (arr: any[]) => { const v = arr.map(Number).filter(x => !isNaN(x)); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0; },
    median: (arr: any[]) => {
      const v = arr.map(Number).filter(x => !isNaN(x)).sort((a, b) => a - b);
      if (!v.length) return 0;
      const mid = Math.floor(v.length / 2);
      return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
    },
    std: (arr: any[]) => {
      const v = arr.map(Number).filter(x => !isNaN(x));
      if (v.length < 2) return 0;
      const mean = v.reduce((a, b) => a + b, 0) / v.length;
      return Math.sqrt(v.reduce((a, b) => a + (b - mean) ** 2, 0) / v.length);
    },
    random: {
      __type: 'module',
      normal: (opts?: { loc?: number; scale?: number; size?: number }) => {
        const loc = opts?.loc || 0;
        const scale = opts?.scale || 1;
        const size = opts?.size || 1;
        const result: number[] = [];
        for (let i = 0; i < size; i++) {
          const u1 = Math.random(), u2 = Math.random();
          result.push(loc + scale * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2));
        }
        return size === 1 ? result[0] : result;
      },
    },
    array: (arr: any) => arr,
  };
}

export function createMockScipyStats() {
  return {
    __type: 'module',
    zscore: (arr: any[]) => {
      const data = arr ? ((arr.__type === 'series') ? arr.values : arr) : [];
      const v = data.map(Number).filter(x => !isNaN(x));
      if (v.length < 2) return v;
      const mean = v.reduce((a, b) => a + b, 0) / v.length;
      const std = Math.sqrt(v.reduce((a, b) => a + (b - mean) ** 2, 0) / v.length);
      return v.map(x => std ? (x - mean) / std : 0);
    },
    ttest_ind: (a: any[], b: any[]) => {
      const va = a.map(Number).filter(x => !isNaN(x));
      const vb = b.map(Number).filter(x => !isNaN(x));
      const meanA = va.reduce((s, v) => s + v, 0) / va.length;
      const meanB = vb.reduce((s, v) => s + v, 0) / vb.length;
      const varA = va.reduce((s, v) => s + (v - meanA) ** 2, 0) / (va.length - 1);
      const varB = vb.reduce((s, v) => s + (v - meanB) ** 2, 0) / (vb.length - 1);
      const se = Math.sqrt(varA / va.length + varB / vb.length);
      const tStat = se ? (meanA - meanB) / se : 0;
      return { __type: 'tuple', values: [Math.round(tStat * 1000) / 1000, 0.045] };
    },
  };
}

export function createMockSeaborn() {
  const datasets: Record<string, MockDataFrame> = {
    tips: new MockDataFrame({
      total_bill: [16.99, 10.34, 21.01, 23.68, 24.59],
      tip: [1.01, 1.66, 3.50, 3.31, 3.61],
      sex: ['Female', 'Male', 'Male', 'Male', 'Female'],
      smoker: ['No', 'No', 'No', 'No', 'No'],
      day: ['Sun', 'Sun', 'Sun', 'Sun', 'Sun'],
      time: ['Dinner', 'Dinner', 'Dinner', 'Dinner', 'Dinner'],
      size: [2, 3, 3, 2, 4],
    }),
  };
  return {
    __type: 'module',
    load_dataset: (name: string) => datasets[name] || new MockDataFrame({ x: [1, 2, 3], y: [4, 5, 6] }),
    barplot: (opts?: any) => {},
    scatterplot: (opts?: any) => {},
    boxplot: (opts?: any) => {},
    countplot: (opts?: any) => {},
    heatmap: (opts?: any) => {},
    histplot: (opts?: any) => {},
  };
}

export function createMockStatistics() {
  return {
    __type: 'module',
    mean: (arr: any[]) => { const v = arr.map(Number).filter(x => !isNaN(x)); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0; },
    median: (arr: any[]) => {
      const v = arr.map(Number).filter(x => !isNaN(x)).sort((a, b) => a - b);
      if (!v.length) return 0;
      const mid = Math.floor(v.length / 2);
      return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
    },
    mode: (arr: any[]) => {
      const counts: Record<string, number> = {};
      for (const x of arr) counts[String(x)] = (counts[String(x)] || 0) + 1;
      let maxC = 0, mode = arr[0];
      for (const [k, c] of Object.entries(counts)) { if (c > maxC) { maxC = c; mode = isNaN(Number(k)) ? k : Number(k); } }
      return mode;
    },
    stdev: (arr: any[]) => {
      const v = arr.map(Number).filter(x => !isNaN(x));
      if (v.length < 2) return 0;
      const mean = v.reduce((a, b) => a + b, 0) / v.length;
      return Math.sqrt(v.reduce((a, b) => a + (b - mean) ** 2, 0) / (v.length - 1));
    },
  };
}
