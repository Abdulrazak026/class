// SQL executor stub - students should use real SQLite in WSL2
export interface QueryResult {
  columns: string[];
  rows: Record<string, any>[];
  columnKeys?: string[];
}

export interface DmlResult {
  command: string;
  message: string;
}

export function executeSQL(query: string): QueryResult | DmlResult | { error: string } {
  return {
    error: 'This is a simulated environment. For real SQL practice:\n\n1. Open your WSL2 Ubuntu terminal\n2. Install SQLite: sudo apt install sqlite3\n3. Create a database: sqlite3 practice.db\n4. Run queries directly in the SQLite shell\n\nYour WSL2 Ubuntu terminal has SQLite installed.'
  };
}
