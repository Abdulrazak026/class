export interface SqlStep {
  clause: string;
  explanation: string;
}

function matchClause(sql: string, keyword: string): { before: string; match: string; after: string } | null {
  const regex = new RegExp(`\\b${keyword}\\b`, 'i');
  const m = regex.exec(sql);
  if (!m) return null;
  return {
    before: sql.slice(0, m.index).trim(),
    match: m[0],
    after: sql.slice(m.index + m[0].length).trim(),
  };
}

function extractBetween(sql: string, startKw: string, endKw: string): string | null {
  const startRegex = new RegExp(`\\b${startKw}\\b`, 'i');
  const endRegex = new RegExp(`\\b${endKw}\\b`, 'i');
  const startM = startRegex.exec(sql);
  if (!startM) return null;
  const afterStart = sql.slice(startM.index + startM[0].length).trim();
  const endM = endRegex.exec(afterStart);
  if (!endM) return afterStart.trim();
  return afterStart.slice(0, endM.index).trim();
}

export function explainSql(sql: string): SqlStep[] {
  const steps: SqlStep[] = [];
  const trimmed = sql.trim().replace(/\s+/g, ' ');

  const selectM = matchClause(trimmed, 'SELECT');
  if (selectM) {
    const cols = selectM.after;
    let colText = cols;
    const fromM = cols.match(/\bFROM\b/i);
    if (fromM) colText = cols.slice(0, fromM.index).trim();
    if (colText === '*') {
      steps.push({ clause: 'SELECT *', explanation: 'Selects all available columns from the table(s).' });
    } else {
      const colList = colText.split(',').map(c => c.trim().replace(/\s+AS\s+/i, ' → '));
      steps.push({ clause: `SELECT ${colText}`, explanation: `Chooses specific columns: ${colList.join(', ')}.` });
    }
  }

  const fromPart = extractBetween(trimmed, 'FROM', 'WHERE') || extractBetween(trimmed, 'FROM', 'JOIN') || extractBetween(trimmed, 'FROM', 'GROUP') || extractBetween(trimmed, 'FROM', 'HAVING') || extractBetween(trimmed, 'FROM', 'ORDER') || extractBetween(trimmed, 'FROM', 'LIMIT');
  if (fromPart) {
    const tables = fromPart.split(',').map(t => t.trim().replace(/\s+AS\s+/i, ' AS '));
    steps.push({ clause: `FROM ${fromPart}`, explanation: `Specifies the source table(s): ${tables.join(', ')}. All rows start here.` });
  }

  const joinM = trimmed.match(/\b(LEFT\s+JOIN|RIGHT\s+JOIN|INNER\s+JOIN|JOIN)\b/i);
  if (joinM) {
    const afterJoin = trimmed.slice(joinM.index + joinM[0].length).trim();
    const onM = afterJoin.match(/\bON\s+(.+?)(?:\bWHERE\b|\bGROUP\b|\bHAVING\b|\bORDER\b|\bLIMIT\b|$)/i);
    if (onM) {
      const joinType = joinM[1].toUpperCase();
      const condition = onM[1].trim();
      steps.push({ clause: `${joinType} ... ON ${condition}`, explanation: `Matching rows from the joined table where ${condition}. Rows without matches become NULL.` });
    } else {
      steps.push({ clause: joinM[1].toUpperCase(), explanation: 'Combines rows from another table based on matching columns.' });
    }
  }

  const wherePart = extractBetween(trimmed, 'WHERE', 'GROUP') || extractBetween(trimmed, 'WHERE', 'HAVING') || extractBetween(trimmed, 'WHERE', 'ORDER') || extractBetween(trimmed, 'WHERE', 'LIMIT');
  if (wherePart) {
    steps.push({ clause: `WHERE ${wherePart}`, explanation: `Filters rows to only those where: ${wherePart}. Rows that don't match are removed.` });
  }

  const groupPart = extractBetween(trimmed, 'GROUP BY', 'HAVING') || extractBetween(trimmed, 'GROUP BY', 'ORDER') || extractBetween(trimmed, 'GROUP BY', 'LIMIT');
  if (groupPart) {
    steps.push({ clause: `GROUP BY ${groupPart}`, explanation: `Groups rows by: ${groupPart}. All rows with the same values are collapsed into one row per group.` });
  }

  const havingPart = extractBetween(trimmed, 'HAVING', 'ORDER') || extractBetween(trimmed, 'HAVING', 'LIMIT');
  if (havingPart) {
    steps.push({ clause: `HAVING ${havingPart}`, explanation: `After grouping, keeps only groups where: ${havingPart}. Like WHERE but for groups.` });
  }

  const orderPart = extractBetween(trimmed, 'ORDER BY', 'LIMIT');
  if (orderPart) {
    const dir = orderPart.toUpperCase().includes('DESC') ? 'descending' : 'ascending';
    steps.push({ clause: `ORDER BY ${orderPart}`, explanation: `Sorts the result by: ${orderPart} (${dir} order).` });
  }

  const limitM = matchClause(trimmed, 'LIMIT');
  if (limitM) {
    const num = limitM.after.split(/\s+/)[0];
    steps.push({ clause: `LIMIT ${num}`, explanation: `Returns at most ${num} rows (truncates the result set).` });
  }

  if (steps.length === 0) {
    steps.push({ clause: trimmed, explanation: 'This SQL statement executes and returns results.' });
  }

  return steps;
}
