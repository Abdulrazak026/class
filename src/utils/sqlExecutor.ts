export interface TableData {
  columns: string[];
  rows: Record<string, string>[];
}

export interface ParsedQuery {
  _dml?: ParsedDml;
  columns: string[];
  columnKeys: string[];
  table: string;
  tableAlias?: string;
  where?: (row: Record<string, string>) => boolean;
  joins?: { table: string; type: 'INNER' | 'LEFT' | 'RIGHT'; alias: string; on: (a: Record<string, string>, b: Record<string, string>) => boolean }[];
  groupBy?: string;
  having?: { col: string; op: string; val: string };
  orderBy?: { col: string; desc: boolean };
  limit?: number;
  isUnion?: boolean;
  unionAll?: boolean;
  cteCtx?: Record<string, TableData>;
  fromSubquery?: { query: string; alias: string };
  windowFuncs?: { alias: string; fn: string; arg: string; partitionBy?: string; orderByCol?: string; orderByDesc?: boolean; frameStart?: string; frameEnd?: string }[];
  stringFuncs?: { alias: string; fn: string; arg: string; colKey: string }[];
  arithmeticExprs?: { alias: string; expr: string; colKey: string }[];
  subqueryCompare?: { op: string; col: string; subquery: string; type: 'scalar' | 'in' };
  existsSubquery?: string;
}

export interface QueryResult {
  columns: string[];
  columnKeys: string[];
  rows: Record<string, string>[];
}

export interface DmlResult {
  command: string;
  table: string;
  affectedRows: number;
  message: string;
}

export let TABLES: Record<string, TableData> = {
  employees: {
    columns: ['id', 'name', 'department', 'salary', 'hire_date'],
    rows: [
      { id: '1', name: 'Alice', department: 'Engineering', salary: '75000', hire_date: '2022-01-15' },
      { id: '2', name: 'Bob', department: 'Marketing', salary: '68000', hire_date: '2021-06-01' },
      { id: '3', name: 'Charlie', department: 'Engineering', salary: '82000', hire_date: '2023-03-20' },
      { id: '4', name: 'Diana', department: 'Sales', salary: '72000', hire_date: '2022-09-10' },
      { id: '5', name: 'Eve', department: 'Marketing', salary: '65000', hire_date: '2021-11-05' },
      { id: '6', name: 'Frank', department: 'Engineering', salary: '90000', hire_date: '2020-04-12' },
      { id: '7', name: 'Grace', department: 'Sales', salary: '71000', hire_date: '2023-07-22' },
    ],
  },
  departments: {
    columns: ['id', 'name', 'budget'],
    rows: [
      { id: '1', name: 'Engineering', budget: '500000' },
      { id: '2', name: 'Marketing', budget: '300000' },
      { id: '3', name: 'Sales', budget: '400000' },
    ],
  },
  orders: {
    columns: ['id', 'customer', 'amount', 'status', 'order_date'],
    rows: [
      { id: '1', customer: 'Alice', amount: '299.99', status: 'delivered', order_date: '2024-01-15' },
      { id: '2', customer: 'Bob', amount: '149.50', status: 'processing', order_date: '2024-02-01' },
      { id: '3', customer: 'Alice', amount: '89.99', status: 'shipped', order_date: '2024-02-15' },
      { id: '4', customer: 'Charlie', amount: '599.99', status: 'delivered', order_date: '2024-01-20' },
      { id: '5', customer: 'Bob', amount: '249.99', status: 'cancelled', order_date: '2024-03-01' },
      { id: '6', customer: 'Diana', amount: '179.99', status: 'processing', order_date: '2024-03-10' },
    ],
  },
  users: {
    columns: ['user_id', 'name', 'signup_date'],
    rows: [
      { user_id: '1', name: 'Alice', signup_date: '2024-01-01' },
      { user_id: '2', name: 'Bob', signup_date: '2024-01-15' },
      { user_id: '3', name: 'Charlie', signup_date: '2024-02-01' },
      { user_id: '4', name: 'Diana', signup_date: '2024-02-10' },
    ],
  },
  events: {
    columns: ['event_id', 'user_id', 'event', 'event_date'],
    rows: [
      { event_id: '1', user_id: '1', event: 'page_view', event_date: '2024-01-01' },
      { event_id: '2', user_id: '2', event: 'page_view', event_date: '2024-01-15' },
      { event_id: '3', user_id: '1', event: 'signup', event_date: '2024-01-01' },
      { event_id: '4', user_id: '2', event: 'signup', event_date: '2024-01-15' },
      { event_id: '5', user_id: '1', event: 'onboarding_complete', event_date: '2024-01-02' },
      { event_id: '6', user_id: '2', event: 'onboarding_complete', event_date: '2024-01-16' },
      { event_id: '7', user_id: '1', event: 'purchase', event_date: '2024-01-15' },
      { event_id: '8', user_id: '3', event: 'page_view', event_date: '2024-02-01' },
      { event_id: '9', user_id: '3', event: 'signup', event_date: '2024-02-01' },
      { event_id: '10', user_id: '4', event: 'page_view', event_date: '2024-02-10' },
    ],
  },
  store_sales: {
    columns: ['store_name', 'region', 'sales'],
    rows: [
      { store_name: 'Store A', region: 'North', sales: '50000' },
      { store_name: 'Store B', region: 'North', sales: '65000' },
      { store_name: 'Store C', region: 'South', sales: '45000' },
      { store_name: 'Store D', region: 'South', sales: '70000' },
      { store_name: 'Store E', region: 'East', sales: '55000' },
      { store_name: 'Store F', region: 'East', sales: '60000' },
      { store_name: 'Store G', region: 'West', sales: '48000' },
      { store_name: 'Store H', region: 'West', sales: '72000' },
    ],
  },
  accounts: {
    columns: ['id', 'name', 'balance'],
    rows: [
      { id: '1', name: 'Checking', balance: '5000' },
      { id: '2', name: 'Savings', balance: '10000' },
      { id: '3', name: 'Investment', balance: '25000' },
    ],
  },
  user_activities: {
    columns: ['activity_id', 'user_id', 'activity', 'activity_date'],
    rows: [
      { activity_id: '1', user_id: '1', activity: 'login', activity_date: '2024-01-02' },
      { activity_id: '2', user_id: '1', activity: 'purchase', activity_date: '2024-01-15' },
      { activity_id: '3', user_id: '1', activity: 'login', activity_date: '2024-02-01' },
      { activity_id: '4', user_id: '2', activity: 'login', activity_date: '2024-01-20' },
      { activity_id: '5', user_id: '2', activity: 'purchase', activity_date: '2024-02-01' },
      { activity_id: '6', user_id: '2', activity: 'login', activity_date: '2024-02-15' },
      { activity_id: '7', user_id: '1', activity: 'logout', activity_date: '2024-03-01' },
      { activity_id: '8', user_id: '3', activity: 'login', activity_date: '2024-02-05' },
    ],
  },
  marketing_spend: {
    columns: ['campaign_name', 'channel', 'spend', 'revenue', 'spend_date'],
    rows: [
      { campaign_name: 'Summer Sale', channel: 'Email', spend: '5000', revenue: '15000', spend_date: '2024-06-01' },
      { campaign_name: 'Summer Sale', channel: 'Social', spend: '8000', revenue: '12000', spend_date: '2024-06-01' },
      { campaign_name: 'Summer Sale', channel: 'Search', spend: '10000', revenue: '25000', spend_date: '2024-06-01' },
      { campaign_name: 'Winter Promo', channel: 'Email', spend: '3000', revenue: '9000', spend_date: '2024-12-01' },
      { campaign_name: 'Winter Promo', channel: 'Social', spend: '6000', revenue: '8000', spend_date: '2024-12-01' },
    ],
  },
};

function scalarCompare(row: Record<string, string>, col: string, op: string, val: string): boolean {
  const rv = row[col] || '';
  if (op === '=') return rv.toLowerCase() === val.toLowerCase();
  if (op === '>') return parseFloat(rv) > parseFloat(val);
  if (op === '<') return parseFloat(rv) < parseFloat(val);
  if (op === '>=') return parseFloat(rv) >= parseFloat(val);
  if (op === '<=') return parseFloat(rv) <= parseFloat(val);
  if (op === '!=') return rv.toLowerCase() !== val.toLowerCase();
  if (op === 'LIKE') {
    const pattern = '^' + val.replace(/%/g, '.*').replace(/_/g, '.').toLowerCase() + '$';
    return new RegExp(pattern).test(rv.toLowerCase());
  }
  return true;
}

function evalStringFn(fn: string, val: string, args: string[]): string {
  if (fn === 'UPPER') return val.toUpperCase();
  if (fn === 'LOWER') return val.toLowerCase();
  if (fn === 'LENGTH') return String(val.length);
  if (fn === 'SUBSTR') {
    const start = parseInt(args[0]) - 1 || 0;
    const len = args[1] ? parseInt(args[1]) : undefined;
    return len ? val.substr(start, len) : val.substring(start);
  }
  return val;
}

function getColumnValue(row: Record<string, string>, colKey: string, columnKeys: string[], columns: string[]): string {
  if (colKey in row) return row[colKey] || '';
  for (let i = 0; i < columns.length; i++) {
    if (columnKeys[i] === colKey || columns[i] === colKey) {
      const v = row[columns[i]];
      if (v !== undefined) return v;
    }
  }
  return '';
}

export type ParsedDml = {
  type: 'INSERT' | 'UPDATE' | 'DELETE' | 'TRUNCATE';
  table: string;
  columns?: string[];
  values?: string[];
  setClauses?: { col: string; val: string }[];
  where?: (row: Record<string, string>) => boolean;
};

export function parseSQL(query: string, cteCtx?: Record<string, TableData>): ParsedQuery | null {
  const trimmed = query.trim().replace(/;?\s*$/, '');
  const normalized = trimmed.replace(/\s+/g, ' ');
  const upper = normalized.toUpperCase();

  if (/^CREATE\s+TABLE\s/i.test(upper)) {
    const nameMatch = trimmed.match(/CREATE\s+TABLE\s+(\w+)/i);
    if (!nameMatch) return null;
    return { columns: [], columnKeys: [], table: nameMatch[1].toLowerCase(), isUnion: true };
  }

  if (/^TRUNCATE\s+TABLE\s/i.test(upper)) {
    const m = trimmed.match(/TRUNCATE\s+TABLE\s+(\w+)/i);
    if (!m) return null;
    return { columns: [], columnKeys: [], table: m[1].toLowerCase(), isUnion: true, _dml: { type: 'TRUNCATE', table: m[1].toLowerCase() } } as any;
  }

  if (/^DELETE\s+FROM\s/i.test(upper)) {
    const m = trimmed.match(/DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?$/i);
    if (!m) return null;
    const table = m[1].toLowerCase();
    const whereClause = m[2] ? m[2].trim() : '';
    let whereFn: ((row: Record<string, string>) => boolean) | undefined;
    if (whereClause) {
      const opMatch = whereClause.match(/(\w+)\s*(=|>|<|>=|<=|!=|LIKE)\s*(.+)/i);
      if (opMatch) {
        const col = opMatch[1].toLowerCase();
        const op = opMatch[2].toUpperCase();
        let val = opMatch[3].trim().replace(/^['"]|['"]$/g, '');
        whereFn = (row) => scalarCompare(row, col, op, val);
      } else {
        const inMatch = whereClause.match(/(\w+)\s+IN\s*\((.+)\)/i);
        if (inMatch) {
          const col = inMatch[1].toLowerCase();
          const values = inMatch[2].split(',').map(v => v.trim().replace(/^['"]|['"]$/g, '').toLowerCase());
          whereFn = (row) => values.includes((row[col] || '').toLowerCase());
        }
      }
    }
    return { columns: [], columnKeys: [], table, isUnion: true, _dml: { type: 'DELETE', table, where: whereFn } } as any;
  }

  if (/^UPDATE\s/i.test(upper)) {
    const m = trimmed.match(/UPDATE\s+(\w+)\s+SET\s+(.+?)(?:\s+WHERE\s+(.+))?$/i);
    if (!m) return null;
    const table = m[1].toLowerCase();
    const setClause = m[2].trim();
    const whereClause = m[3] ? m[3].trim() : '';
    const setPairs = setClause.split(',').map(s => {
      const parts = s.split('=').map(p => p.trim());
      return { col: parts[0].toLowerCase(), val: parts[1].replace(/^['"]|['"]$/g, '') };
    });
    let whereFn: ((row: Record<string, string>) => boolean) | undefined;
    if (whereClause) {
      const opMatch = whereClause.match(/(\w+)\s*(=|>|<|>=|<=|!=|LIKE)\s*(.+)/i);
      if (opMatch) {
        const col = opMatch[1].toLowerCase();
        const op = opMatch[2].toUpperCase();
        let val = opMatch[3].trim().replace(/^['"]|['"]$/g, '');
        whereFn = (row) => scalarCompare(row, col, op, val);
      }
    }
    return { columns: [], columnKeys: [], table, isUnion: true, _dml: { type: 'UPDATE', table, setClauses: setPairs, where: whereFn } } as any;
  }

  if (/^INSERT\s+INTO\s/i.test(upper)) {
    const m = trimmed.match(/INSERT\s+INTO\s+(\w+)\s*(?:\(([^)]+)\))?\s*VALUES\s*\(([^)]+)\)/i);
    if (!m) return null;
    const table = m[1].toLowerCase();
    const cols = m[2] ? m[2].split(',').map(c => c.trim().toLowerCase()) : [];
    const vals = m[3].split(',').map(v => v.trim().replace(/^['"]|['"]$/g, ''));
    return { columns: [], columnKeys: [], table, isUnion: true, _dml: { type: 'INSERT', table, columns: cols, values: vals } } as any;
  }

  let cteParsedCtx = cteCtx || {};

  const cteMatch = trimmed.match(/^WITH\s+(.+)/is);
  if (cteMatch) {
    const rest = cteMatch[1];
    const cteDefs: { name: string; query: string }[] = [];
    let pos = 0;

    while (pos < rest.length) {
      const nameMatch = rest.substring(pos).match(/^\s*(\w+)\s+AS\s*\(/i);
      if (!nameMatch) break;
      const name = nameMatch[1];
      pos += nameMatch[0].length;

      let depth = 1;
      const start = pos;
      while (pos < rest.length && depth > 0) {
        if (rest[pos] === '(') depth++;
        if (rest[pos] === ')') depth--;
        pos++;
      }
      if (depth !== 0) break;
      const subQuery = rest.substring(start, pos - 1);
      cteDefs.push({ name, query: subQuery.trim() });

      const commaMatch = rest.substring(pos).match(/^\s*,\s*/);
      if (commaMatch) pos += commaMatch[0].length;
    }

    const mainQuery = rest.substring(pos).trim();
    for (const def of cteDefs) {
      const result = executeSQL(def.query, cteParsedCtx);
      if (result && !('error' in result)) {
        cteParsedCtx[def.name.toLowerCase()] = { columns: result.columns, rows: result.rows };
      }
    }
    return parseMainSelect(mainQuery, cteParsedCtx);
  }

  return parseMainSelect(trimmed, cteCtx);
}

function parseMainSelect(trimmed: string, cteCtx?: Record<string, TableData>): ParsedQuery | null {
  const normalized = trimmed.replace(/\s+/g, ' ');
  const upper = normalized.toUpperCase();
  if (!upper.startsWith('SELECT')) return null;

  const unionMatch = trimmed.match(/^(.*?)\s+UNION\s+(ALL\s+)?(SELECT.*)$/is);
  if (unionMatch) {
    const first = parseMainSelect(unionMatch[1].trim(), cteCtx);
    if (!first) return null;
    first.isUnion = true;
    first.unionAll = !!unionMatch[2];
    return first;
  }

  let table: string;
  let tableAlias: string | undefined;
  let fromSubquery: { query: string; alias: string } | undefined;

  const fromIdx = upper.indexOf('FROM');
  if (fromIdx < 0) return null;
  const afterFrom = normalized.substring(fromIdx + 4).trim();
  if (afterFrom.startsWith('(')) {
    let depth = 1;
    let i = 1;
    while (i < afterFrom.length && depth > 0) {
      if (afterFrom[i] === '(') depth++;
      if (afterFrom[i] === ')') depth--;
      i++;
    }
    if (depth === 0) {
      const subqueryContent = afterFrom.substring(1, i - 1).trim();
      const remainder = afterFrom.substring(i).trim();
      const aliasMatch = remainder.match(/^AS\s+(\w+)/i);
      const alias = aliasMatch ? aliasMatch[1] : '';
      fromSubquery = { query: subqueryContent, alias };
      table = alias || subqueryContent.replace(/\s+/g, '_').toLowerCase().substring(0, 20);
      tableAlias = alias || table;
    } else {
      return null;
    }
  } else {
    const fromMatch = afterFrom.match(/^(\w+)(?:\s+(\w+))?/i);
    if (!fromMatch) return null;
    table = fromMatch[1].toLowerCase();
    tableAlias = fromMatch[2] ? fromMatch[2].toLowerCase() : table;
  }

  const selectPart = upper.match(/SELECT\s+(.+?)\s+FROM/i);
  if (!selectPart) return null;

  const rawColumns = selectPart[1].split(',').map(c => c.trim());
  const columns: string[] = [];
  const columnKeys: string[] = [];
  const windowFuncs: ParsedQuery['windowFuncs'] = [];
  const stringFuncs: ParsedQuery['stringFuncs'] = [];
  const arithmeticExprs: ParsedQuery['arithmeticExprs'] = [];

  for (const raw of rawColumns) {
    if (raw === '*') {
      columns.push('*');
      columnKeys.push('*');
      continue;
    }

    const winMatch = raw.match(/^(\w+)\((.+?)\)\s*OVER\s*\((.*?)\)(?:\s+AS\s+(\w+))?$/i);
    if (winMatch) {
      const fn = winMatch[1].toUpperCase();
      const arg = winMatch[2].trim();
      const overClause = winMatch[3].trim();
      const alias = winMatch[4] ? winMatch[4].toLowerCase() : `${fn.toLowerCase()}_${arg}`;
      columns.push(alias);
      columnKeys.push(raw.toLowerCase());

      const partitionMatch = overClause.match(/PARTITION\s+BY\s+(\w+)/i);
      const orderMatch = overClause.match(/ORDER\s+BY\s+(\w+(?:\.\w+)?)\s*(DESC|ASC)?/i);
      const frameMatch = overClause.match(/ROWS\s+BETWEEN\s+(\d+\s+\w+)\s+AND\s+(\d+\s+\w+)/i);

      windowFuncs!.push({
        alias,
        fn,
        arg,
        partitionBy: partitionMatch ? partitionMatch[1].toLowerCase() : undefined,
        orderByCol: orderMatch ? orderMatch[1].toLowerCase().split('.').pop() : undefined,
        orderByDesc: orderMatch ? (orderMatch[2] || '').toUpperCase() === 'DESC' : false,
        frameStart: frameMatch ? frameMatch[1].toLowerCase() : undefined,
        frameEnd: frameMatch ? frameMatch[2].toLowerCase() : undefined,
      });
      continue;
    }

    const stringFnMatch = raw.match(/^(UPPER|LOWER|LENGTH|SUBSTR)\s*\((.+?)\)(?:\s+AS\s+(\w+))?$/i);
    if (stringFnMatch) {
      const fn = stringFnMatch[1].toUpperCase();
      const arg = stringFnMatch[2].trim();
      const alias = stringFnMatch[3] ? stringFnMatch[3].toLowerCase() : arg.toLowerCase();
      columns.push(alias);
      columnKeys.push(raw.toLowerCase());
      stringFuncs!.push({ alias, fn, arg, colKey: arg });
      continue;
    }

    const arithmeticMatch = raw.match(/^(.+?)\s*([+\-*/])\s*(.+?)(?:\s+AS\s+(\w+))?$/i);
    if (arithmeticMatch && !raw.toUpperCase().includes('OVER') && !raw.toUpperCase().startsWith('CASE')) {
      const left = arithmeticMatch[1].trim();
      const op = arithmeticMatch[2];
      const right = arithmeticMatch[3].trim();
      const alias = arithmeticMatch[4] ? arithmeticMatch[4].toLowerCase() : raw.toLowerCase().replace(/\s+/g, '_');
      columns.push(alias);
      columnKeys.push(raw.toLowerCase());
      arithmeticExprs!.push({ alias, expr: raw.trim(), colKey: raw.trim() });
      continue;
    }

    const asMatch = raw.match(/AS\s+(\w+)$/i);
    if (asMatch) {
      const display = asMatch[1].toLowerCase();
      columns.push(display);
      const expr = raw.replace(/\s+AS\s+\w+$/i, '').trim();
      columnKeys.push(expr.toLowerCase());
    } else if (raw.toUpperCase().startsWith('CASE')) {
      const aliasMatch = raw.match(/END(?:\s+AS\s+(\w+))?$/i);
      const alias = aliasMatch?.[1] ? aliasMatch[1].toLowerCase() : 'case_expr';
      columns.push(alias);
      columnKeys.push(raw.toLowerCase());
    } else {
      columns.push(raw.includes('.') ? raw.split('.').pop()!.toLowerCase() : raw.toLowerCase());
      columnKeys.push(raw.trim().toLowerCase());
    }
  }

  const isStar = columns.includes('*');
  let resolvedTable = cteCtx?.[table] || null;
  if (!resolvedTable && !fromSubquery) resolvedTable = TABLES[table] || null;
  const tableCols = resolvedTable?.columns || TABLES[table]?.columns || [];

  const parsed: ParsedQuery = {
    columns: isStar ? tableCols : columns,
    columnKeys: isStar ? tableCols : columnKeys,
    table,
    tableAlias,
    cteCtx,
    fromSubquery,
    windowFuncs: windowFuncs.length > 0 ? windowFuncs : undefined,
    stringFuncs: stringFuncs.length > 0 ? stringFuncs : undefined,
    arithmeticExprs: arithmeticExprs.length > 0 ? arithmeticExprs : undefined,
  };

  let joinStr = trimmed;
  const joins: ParsedQuery['joins'] = [];
  let joinIdx = selectPart?.[0] ? trimmed.indexOf(selectPart[0]) + selectPart[0].length : 0;
  joinStr = joinStr.substring(joinIdx);

  const joinRegex = /(?:(INNER|LEFT|RIGHT|FULL\s+OUTER)\s+)?JOIN\s+(\w+)(?:\s+(\w+))?\s+ON\s+([\w.]+)\s*=\s*([\w.]+)/gi;
  let jMatch: RegExpExecArray | null;
  while ((jMatch = joinRegex.exec(trimmed)) !== null) {
    const joinType = (jMatch[1] || 'INNER').replace(/\s+OUTER$/, '').toUpperCase() as 'INNER' | 'LEFT' | 'RIGHT';
    const joinTable = jMatch[2].toLowerCase();
    const joinAlias = jMatch[3] ? jMatch[3].toLowerCase() : joinTable;
    const leftKey = jMatch[4].toLowerCase().split('.').pop()!;
    const rightKey = jMatch[5].toLowerCase().split('.').pop()!;

    const leftAlias = jMatch[4].includes('.') ? jMatch[4].toLowerCase().split('.')[0] : parsed.tableAlias || parsed.table;
    const rightAlias = jMatch[5].includes('.') ? jMatch[5].toLowerCase().split('.')[0] : joinAlias;

    joins.push({
      table: joinTable,
      type: joinType,
      alias: joinAlias,
      on: (a, b) => {
        const lv = leftAlias === parsed.tableAlias ? a[leftKey] : b[leftKey];
        const rv = rightAlias === joinAlias ? b[rightKey] : a[rightKey];
        return lv === rv;
      },
    });
  }
  if (joins.length > 0) parsed.joins = joins;

  const whereSection = trimmed.substring(trimmed.toUpperCase().indexOf('FROM') + 4);

  const existsMatch = whereSection.match(/WHERE\s+EXISTS\s*\((.+?)\)(?:\s+(GROUP|ORDER|LIMIT|HAVING)\s+|$)/is);
  if (existsMatch) {
    parsed.existsSubquery = existsMatch[1].trim();
  }

  if (!parsed.existsSubquery) {
    const subqCompareMatch = whereSection.match(/WHERE\s+(?:(\w+)\.)?(\w+)\s*(=|>|<|>=|<=|!=)\s*\(SELECT\s+(.+?)\)\s*\)/is);
    if (!subqCompareMatch) {
      const whereMatch = trimmed.match(/WHERE\s+(.+?)(?:\s+(GROUP|ORDER|LIMIT|HAVING)\s+|$)/is);
      if (whereMatch) {
        const cond = whereMatch[1].trim();
        const inMatch = cond.match(/(?:(\w+)\.)?(\w+)\s+IN\s*\((.+)\)/i);
        if (inMatch) {
          const col = inMatch[2].toLowerCase();
          const inner = inMatch[3].trim();
          if (/^SELECT\s/i.test(inner)) {
            parsed.subqueryCompare = { op: 'IN', col, subquery: inner, type: 'in' };
          } else {
            const values = inMatch[3].split(',').map(v => v.trim().replace(/^['"]|['"]$/g, '').toLowerCase());
            parsed.where = (row) => values.includes((row[col] || '').toLowerCase());
          }
        } else {
          const opMatch = cond.match(/(?:(\w+)\.)?(\w+)\s*(=|>|<|>=|<=|!=|LIKE)\s*(.+)/i);
          if (opMatch) {
            const col = opMatch[2].toLowerCase();
            const op = opMatch[3].toUpperCase();
            let val = opMatch[4].trim();
            if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
              val = val.slice(1, -1);
            }
            parsed.where = (row) => scalarCompare(row, col, op, val);
          }
        }
      }
    } else {
      parsed.subqueryCompare = {
        op: subqCompareMatch[3].toUpperCase(),
        col: subqCompareMatch[2].toLowerCase(),
        subquery: subqCompareMatch[4].trim(),
        type: 'scalar',
      };
    }
  }

  const groupMatch = trimmed.match(/GROUP\s+BY\s+(\w+(?:\.\w+)?)/i);
  if (groupMatch) {
    const parts = groupMatch[1].toLowerCase().split('.');
    parsed.groupBy = parts[parts.length - 1];
  }

  const havingMatch = trimmed.match(/HAVING\s+(.+?)(?:\s+(ORDER|LIMIT)\s+|$)/is);
  if (havingMatch) {
    const cond = havingMatch[1].trim();
    const opMatch = cond.match(/^(.+?)\s*(=|>|<|>=|<=|!=)\s*(.+)$/i);
    if (opMatch) {
      parsed.having = { col: opMatch[1].trim().toLowerCase(), op: opMatch[2].toUpperCase(), val: opMatch[3].trim() };
    }
  }

  const orderMatch = trimmed.match(/ORDER\s+BY\s+(\w+(?:\.\w+)?)\s*(DESC|ASC)?/i);
  if (orderMatch) {
    const parts = orderMatch[1].toLowerCase().split('.');
    parsed.orderBy = { col: parts[parts.length - 1], desc: (orderMatch[2] || 'ASC').toUpperCase() === 'DESC' };
  }

  const limitMatch = trimmed.match(/LIMIT\s+(\d+)/i);
  if (limitMatch) parsed.limit = parseInt(limitMatch[1]);

  return parsed;
}

export function executeSQL(query: string, cteCtx?: Record<string, TableData>): QueryResult | DmlResult | { error: string } {
  const trimmed = query.trim().replace(/;+$/, '');
  if (/^CREATE\s+TABLE\s/i.test(trimmed)) {
    return { columns: ['result'], columnKeys: ['result'], rows: [{ result: 'Table created successfully.' }] };
  }

  const upperTrimmed = trimmed.toUpperCase().replace(/\s+/g, ' ');

  if (/^TRUNCATE\s+TABLE\s/i.test(upperTrimmed)) {
    const m = trimmed.match(/TRUNCATE\s+TABLE\s+(\w+)/i);
    if (!m) return { error: 'Could not parse TRUNCATE.' };
    const tableName = m[1].toLowerCase();
    if (!TABLES[tableName]) return { error: `Table "${tableName}" not found.` };
    const count = TABLES[tableName].rows.length;
    TABLES[tableName] = { ...TABLES[tableName], rows: [] };
    return { command: 'TRUNCATE', table: tableName, affectedRows: count, message: `Truncated table "${tableName}". ${count} row(s) removed.` };
  }

  if (/^DELETE\s+FROM\s/i.test(upperTrimmed)) {
    const m = trimmed.match(/DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?$/i);
    if (!m) return { error: 'Could not parse DELETE.' };
    const tableName = m[1].toLowerCase();
    if (!TABLES[tableName]) return { error: `Table "${tableName}" not found.` };
    const whereClause = m[2] ? m[2].trim() : '';
    let before = TABLES[tableName].rows.length;
    if (whereClause) {
      const parsed = parseSQL('SELECT * FROM ' + tableName + ' WHERE ' + whereClause);
      if (!parsed || !parsed.where) return { error: 'Could not parse WHERE clause.' };
      const toDelete = TABLES[tableName].rows.filter(parsed.where);
      const ids = new Set(toDelete.map(r => r.id));
      TABLES[tableName] = { ...TABLES[tableName], rows: TABLES[tableName].rows.filter(r => !ids.has(r.id)) };
      return { command: 'DELETE', table: tableName, affectedRows: toDelete.length, message: `Deleted ${toDelete.length} row(s) from "${tableName}".` };
    } else {
      const count = TABLES[tableName].rows.length;
      TABLES[tableName] = { ...TABLES[tableName], rows: [] };
      return { command: 'DELETE', table: tableName, affectedRows: count, message: `Deleted ALL ${count} row(s) from "${tableName}".` };
    }
  }

  if (/^UPDATE\s/i.test(upperTrimmed)) {
    const m = trimmed.match(/UPDATE\s+(\w+)\s+SET\s+(.+?)(?:\s+WHERE\s+(.+))?$/i);
    if (!m) return { error: 'Could not parse UPDATE.' };
    const tableName = m[1].toLowerCase();
    if (!TABLES[tableName]) return { error: `Table "${tableName}" not found.` };
    const setClause = m[2].trim();
    const whereClause = m[3] ? m[3].trim() : '';
    const setPairs = setClause.split(',').map(s => {
      const parts = s.split('=').map(p => p.trim());
      return { col: parts[0].toLowerCase(), val: parts[1].replace(/^['"]|['"]$/g, '') };
    });
    const table = TABLES[tableName];
    const matchedRows = whereClause
      ? (() => {
          const parsed = parseSQL('SELECT * FROM ' + tableName + ' WHERE ' + whereClause);
          return parsed?.where ? table.rows.filter(parsed.where) : table.rows;
        })()
      : table.rows;
    const ids = new Set(matchedRows.map(r => r.id));
    TABLES[tableName] = {
      ...table,
      rows: table.rows.map(r => {
        if (!ids.has(r.id)) return r;
        const updated = { ...r };
        for (const { col, val } of setPairs) {
          if (col in updated) updated[col] = val;
        }
        return updated;
      }),
    };
    return { command: 'UPDATE', table: tableName, affectedRows: matchedRows.length, message: `Updated ${matchedRows.length} row(s) in "${tableName}".` };
  }

  if (/^INSERT\s+INTO\s/i.test(upperTrimmed)) {
    const m = trimmed.match(/INSERT\s+INTO\s+(\w+)\s*(?:\(([^)]+)\))?\s*VALUES\s*\(([^)]+)\)/i);
    if (!m) return { error: 'Could not parse INSERT.' };
    const tableName = m[1].toLowerCase();
    if (!TABLES[tableName]) return { error: `Table "${tableName}" not found.` };
    const cols = m[2] ? m[2].split(',').map(c => c.trim().toLowerCase()) : [];
    const vals = m[3].split(',').map(v => v.trim().replace(/^['"]|['"]$/g, ''));
    const table = TABLES[tableName];
    if (cols.length > 0 && cols.length !== vals.length) {
      return { error: 'Column count does not match value count.' };
    }
    const actualCols = cols.length > 0 ? cols : table.columns;
    if (actualCols.length > vals.length) {
      return { error: 'Not enough values provided.' };
    }
    const nextId = String(Math.max(0, ...table.rows.map(r => parseInt(r.id) || 0)) + 1);
    const newRow: Record<string, string> = { id: nextId };
    for (let i = 0; i < actualCols.length; i++) {
      newRow[actualCols[i]] = vals[i] || '';
    }
    TABLES[tableName] = { ...table, rows: [...table.rows, newRow] };
    return { command: 'INSERT', table: tableName, affectedRows: 1, message: `Inserted 1 row into "${tableName}" with id=${nextId}.` };
  }

  if (/^SELECT.+UNION\s+(ALL\s+)?SELECT/is.test(trimmed)) {
    const splitMatch = trimmed.match(/^(.*?)\s+UNION\s+(ALL\s+)?(SELECT.*)$/is);
    if (splitMatch) {
      const all = !!splitMatch[2];
      const firstResult = executeSQL(splitMatch[1].trim(), cteCtx);
      const secondResult = executeSQL(splitMatch[3].trim(), cteCtx);
      if (!firstResult || 'error' in firstResult) return firstResult;
      if (!secondResult || 'error' in secondResult) return secondResult;
      const combined = [...firstResult.rows, ...secondResult.rows];
      return {
        columns: firstResult.columns,
        columnKeys: firstResult.columnKeys,
        rows: all ? combined : combined.filter((row, idx, self) =>
          idx === self.findIndex(r => JSON.stringify(r) === JSON.stringify(row))
        ),
      };
    }
  }

  const parsed = parseSQL(trimmed, cteCtx);
  if (!parsed) return { error: 'Could not parse query.' };

  let rows: Record<string, string>[] = [];

  if (parsed.fromSubquery) {
    const subResult = executeSQL(parsed.fromSubquery.query, cteCtx);
    if (!subResult || 'error' in subResult) return subResult;
    rows = subResult.rows.map(r => {
      const o: Record<string, string> = {};
      for (const [k, v] of Object.entries(r)) {
        o[k] = v;
        o[`${parsed.fromSubquery!.alias}.${k}`] = v;
      }
      return o;
    });
  } else {
    const table = parsed.cteCtx?.[parsed.table] || cteCtx?.[parsed.table] || TABLES[parsed.table];
    if (!table) return { error: `Table "${parsed.table}" not found.` };
    rows = [...table.rows];
    if (parsed.tableAlias && parsed.tableAlias !== parsed.table) {
      rows = rows.map(r => {
        const o = { ...r };
        for (const [k, v] of Object.entries(r)) o[`${parsed.tableAlias}.${k}`] = v;
        return o;
      });
    }
  }

  if (parsed.existsSubquery) {
    rows = rows.filter(row => {
      const subResult = executeSQL(parsed.existsSubquery!, cteCtx);
      return subResult && !('error' in subResult) && subResult.rows.length > 0;
    });
  }

  if (parsed.subqueryCompare) {
    const { op, col, subquery, type } = parsed.subqueryCompare;
    const subResult = executeSQL(subquery, cteCtx);
    if (!subResult || 'error' in subResult) return { error: 'Subquery failed.' };

    if (type === 'scalar') {
      if (subResult.rows.length > 0) {
        const scalarVal = Object.values(subResult.rows[0])[0] || '0';
        parsed.where = (row) => scalarCompare(row, col, op, scalarVal);
      }
    } else if (type === 'in') {
      const values = subResult.rows.map(r => Object.values(r)[0]?.toLowerCase() || '');
      parsed.where = (row) => values.includes((row[col] || '').toLowerCase());
    }
  }

  if (parsed.joins) {
    for (const join of parsed.joins) {
      const joinTable = cteCtx?.[join.table] || TABLES[join.table];
      if (!joinTable) return { error: `Join table "${join.table}" not found.` };
      const joined: Record<string, string>[] = [];
      for (const r1 of rows) {
        let matched = false;
        for (const r2 of joinTable.rows) {
          if (join.on(r1, r2)) {
            const merged: Record<string, string> = {};
            for (const [k, v] of Object.entries(r1)) {
              merged[k] = v;
              merged[`${parsed.tableAlias || parsed.table}.${k}`] = v;
            }
            for (const [k, v] of Object.entries(r2)) {
              merged[`${join.alias}.${k}`] = v;
              if (!(k in r1)) merged[k] = v;
            }
            joined.push(merged);
            matched = true;
          }
        }
        if (!matched && (join.type === 'LEFT' || join.type === 'RIGHT')) {
          const merged: Record<string, string> = {};
          for (const [k, v] of Object.entries(r1)) {
            merged[k] = v;
            merged[`${parsed.tableAlias || parsed.table}.${k}`] = v;
          }
          joined.push(merged);
        }
      }
      rows = joined;
    }
  }

  if (parsed.where) rows = rows.filter(parsed.where);

  const hasAgg = parsed.columns.some((_, i) =>
    /(COUNT|SUM|AVG|MIN|MAX)\(/i.test(parsed.columnKeys[i]) ||
    /(COUNT|SUM|AVG|MIN|MAX)\(/i.test(parsed.columns[i])
  );

  if (hasAgg) {
    const groups: Record<string, Record<string, string>[]> = {};
    if (parsed.groupBy) {
      for (const row of rows) {
        const key = row[parsed.groupBy] || 'NULL';
        if (!groups[key]) groups[key] = [];
        groups[key].push(row);
      }
    } else {
      groups[''] = rows;
    }
    const groupCol = parsed.groupBy;
    const groupedRows: Record<string, string>[] = [];
    for (const [key, grp] of Object.entries(groups)) {
      const row: Record<string, string> = {};
      for (let i = 0; i < parsed.columns.length; i++) {
        const label = parsed.columns[i];
        const ck = parsed.columnKeys[i];
        const aggMatch = ck.match(/(COUNT|SUM|AVG|MIN|MAX)\((?:(\w+)\.)?([\w*]+)\)/i) || label.match(/(COUNT|SUM|AVG|MIN|MAX)\((?:(\w+)\.)?([\w*]+)\)/i);
        if (aggMatch) {
          const fn = aggMatch[1].toUpperCase();
          const col = aggMatch[aggMatch.length - 1].toLowerCase();
          const vals = col === '*' ? grp.map((_, idx) => idx + 1) : grp.map(r => parseFloat(r[col])).filter(v => !isNaN(v));
          switch (fn) {
            case 'COUNT': row[label] = String(vals.length); break;
            case 'SUM': row[label] = String(vals.reduce((a, b) => a + b, 0)); break;
            case 'AVG': row[label] = String(vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) / 100 : '0'); break;
            case 'MIN': row[label] = String(vals.length ? Math.min(...vals) : ''); break;
            case 'MAX': row[label] = String(vals.length ? Math.max(...vals) : ''); break;
          }
          if (label !== ck) row[ck] = row[label];
        } else if (groupCol && (ck === groupCol || label === groupCol)) {
          row[label] = key;
          if (label !== ck) row[ck] = key;
        } else {
          row[label] = '';
          if (label !== ck) row[ck] = '';
        }
      }
      groupedRows.push(row);
    }
    rows = groupedRows;
  }

  if (parsed.stringFuncs) {
    for (const sf of parsed.stringFuncs) {
      for (const row of rows) {
        const argVal = getColumnValue(row, sf.colKey, parsed.columnKeys, parsed.columns);
        const fnArgs: string[] = [];
        row[sf.alias] = evalStringFn(sf.fn, argVal, fnArgs);
      }
    }
  }

  if (parsed.arithmeticExprs) {
    for (const ae of parsed.arithmeticExprs) {
      for (const row of rows) {
        const parts = ae.expr.match(/^(.+?)\s*([+\-*/])\s*(.+)$/);
        if (parts) {
          const leftVal = parseFloat(getColumnValue(row, parts[1].trim(), parsed.columnKeys, parsed.columns)) || 0;
          const rightVal = parseFloat(getColumnValue(row, parts[3].trim(), parsed.columnKeys, parsed.columns)) || 0;
          const op = parts[2];
          if (op === '+') row[ae.alias] = String(leftVal + rightVal);
          else if (op === '-') row[ae.alias] = String(leftVal - rightVal);
          else if (op === '*') row[ae.alias] = String(leftVal * rightVal);
          else if (op === '/') row[ae.alias] = rightVal !== 0 ? String(leftVal / rightVal) : '0';
        }
      }
    }
  }

  if (parsed.having) {
    const havingCol = parsed.having.col;
    const havingOp = parsed.having.op;
    let havingVal = parsed.having.val;
    if ((havingVal.startsWith("'") && havingVal.endsWith("'")) || (havingVal.startsWith('"') && havingVal.endsWith('"'))) {
      havingVal = havingVal.slice(1, -1);
    }
    let resolvedCol: string | null = null;
    if (rows.length > 0 && havingCol in rows[0]) {
      resolvedCol = havingCol;
    } else {
      for (let i = 0; i < parsed.columns.length; i++) {
        if (parsed.columns[i].toLowerCase() === havingCol || parsed.columnKeys[i].toLowerCase() === havingCol) {
          resolvedCol = parsed.columns[i];
          break;
        }
      }
    }
    if (resolvedCol) {
      rows = rows.filter(row => {
        const rv = row[resolvedCol!] || '';
        if (havingOp === '=') return rv.toLowerCase() === havingVal.toLowerCase();
        if (havingOp === '>') return parseFloat(rv) > parseFloat(havingVal);
        if (havingOp === '<') return parseFloat(rv) < parseFloat(havingVal);
        if (havingOp === '>=') return parseFloat(rv) >= parseFloat(havingVal);
        if (havingOp === '<=') return parseFloat(rv) <= parseFloat(havingVal);
        if (havingOp === '!=') return rv.toLowerCase() !== havingVal.toLowerCase();
        return true;
      });
    }
  }

  if (parsed.orderBy) {
    rows.sort((a, b) => {
      const av = parseFloat(a[parsed.orderBy!.col]);
      const bv = parseFloat(b[parsed.orderBy!.col]);
      if (!isNaN(av) && !isNaN(bv)) return parsed.orderBy!.desc ? bv - av : av - bv;
      return parsed.orderBy!.desc
        ? String(b[parsed.orderBy!.col]).localeCompare(String(a[parsed.orderBy!.col]))
        : String(a[parsed.orderBy!.col]).localeCompare(String(b[parsed.orderBy!.col]));
    });
  }

  if (parsed.limit) rows = rows.slice(0, parsed.limit);

  if (parsed.windowFuncs) {
    for (const wf of parsed.windowFuncs) {
      const winRows = rows.length > 0 ? [...rows] : [];
      if (wf.partitionBy) {
        const partitions: Record<string, typeof winRows> = {};
        for (const r of winRows) {
          const key = r[wf.partitionBy] || 'NULL';
          if (!partitions[key]) partitions[key] = [];
          partitions[key].push(r);
        }
        for (const [, partRows] of Object.entries(partitions)) {
          applyWindowFunc(partRows, wf, parsed);
        }
      } else {
        applyWindowFunc(winRows, wf, parsed);
      }
    }
  }

  return { columns: parsed.columns, columnKeys: parsed.columnKeys, rows };
}

function applyWindowFunc(rows: Record<string, string>[], wf: NonNullable<ParsedQuery['windowFuncs']>[0], parsed: ParsedQuery) {
  if (wf.orderByCol) {
    rows.sort((a, b) => {
      const av = parseFloat(a[wf.orderByCol!]);
      const bv = parseFloat(b[wf.orderByCol!]);
      if (!isNaN(av) && !isNaN(bv)) return wf.orderByDesc ? bv - av : av - bv;
      return wf.orderByDesc
        ? String(b[wf.orderByCol!]).localeCompare(String(a[wf.orderByCol!]))
        : String(a[wf.orderByCol!]).localeCompare(String(b[wf.orderByCol!]));
    });
  }

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const vals = rows.map(r => parseFloat(r[wf.arg])).filter(v => !isNaN(v));
    const total = vals.reduce((a, b) => a + b, 0);

    if (wf.fn === 'ROW_NUMBER') {
      row[wf.alias] = String(i + 1);
    } else if (wf.fn === 'RANK') {
      let rank = 1;
      for (let j = 0; j < i; j++) {
        if (wf.orderByCol && rows[j][wf.orderByCol] !== rows[i][wf.orderByCol]) rank++;
      }
      row[wf.alias] = String(rank > 0 ? rank : i + 1);
    } else if (wf.fn === 'DENSE_RANK') {
      const uniqueVals = new Set<string>();
      for (let j = 0; j <= i; j++) {
        if (wf.orderByCol) uniqueVals.add(rows[j][wf.orderByCol] || '');
      }
      row[wf.alias] = String(uniqueVals.size);
    } else if (wf.fn === 'NTILE') {
      const n = parseInt(wf.arg) || 1;
      const bucketSize = Math.ceil(rows.length / n);
      row[wf.alias] = String(Math.min(Math.floor(i / bucketSize) + 1, n));
    } else if (wf.fn === 'LAG') {
      const offset = parseInt(wf.arg) || 1;
      row[wf.alias] = i >= offset ? rows[i - offset][wf.arg] || '0' : '0';
    } else if (wf.fn === 'LEAD') {
      const offset = parseInt(wf.arg) || 1;
      row[wf.alias] = i + offset < rows.length ? rows[i + offset][wf.arg] || '0' : '0';
    } else if (wf.fn === 'FIRST_VALUE') {
      row[wf.alias] = rows[0]?.[wf.arg] || '0';
    } else if (wf.fn === 'SUM' || wf.fn === 'AVG') {
      const frameStart = wf.frameStart ? parseFrameBound(wf.frameStart, rows.length, i) : 0;
      const frameEnd = wf.frameEnd ? parseFrameBound(wf.frameEnd, rows.length, i) : (wf.orderByCol ? i : rows.length - 1);
      const frameVals = rows.slice(frameStart, frameEnd + 1).map(r => parseFloat(r[wf.arg])).filter(v => !isNaN(v));
      const frameTotal = frameVals.reduce((a, b) => a + b, 0);
      if (wf.fn === 'SUM') {
        row[wf.alias] = String(frameTotal);
      } else {
        row[wf.alias] = String(frameVals.length ? Math.round((frameTotal / frameVals.length) * 100) / 100 : '0');
      }
    }
  }
}

function parseFrameBound(bound: string, totalRows: number, currentRow: number): number {
  const parts = bound.split(' ');
  const num = parseInt(parts[0]) || 0;
  const dir = parts[1]?.toLowerCase() || '';
  if (dir === 'preceding') return Math.max(0, currentRow - num);
  if (dir === 'following') return Math.min(totalRows - 1, currentRow + num);
  if (bound === 'unbounded preceding') return 0;
  if (bound === 'unbounded following') return totalRows - 1;
  if (bound === 'current row') return currentRow;
  return currentRow;
}
