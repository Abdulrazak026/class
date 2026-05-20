import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Database, Play, RotateCcw, CheckCircle2, AlertCircle, Filter, ArrowUpDown, Table as TableIcon } from 'lucide-react';
import { executeSQL, TABLES, QueryResult, DmlResult } from '../utils/sqlExecutor';

function getExampleQuery(topicTitle?: string, content?: string): string {
  if (!topicTitle) return 'SELECT * FROM employees';
  const t = topicTitle.toLowerCase();
  if (t.includes('join')) return 'SELECT e.name, d.name AS department, e.salary\nFROM employees e\nJOIN departments d ON e.department = d.name';
  if (t.includes('group') || t.includes('aggregat')) return 'SELECT department, COUNT(*) AS emp_count, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department';
  if (t.includes('order') || t.includes('sort')) return 'SELECT name, salary\nFROM employees\nORDER BY salary DESC';
  if (t.includes('where') || t.includes('filter')) return 'SELECT name, salary\nFROM employees\nWHERE salary > 70000';
  if (t.includes('limit')) return 'SELECT name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 3';
  if (t.includes('subquery')) return 'SELECT name, salary\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees)';
  return 'SELECT * FROM employees';
}

export function SqlPlayground({ topicTitle, content }: { topicTitle?: string; content?: string }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [showSchema, setShowSchema] = useState(false);
  const didAutoRun = useRef(false);

  useEffect(() => {
    if (topicTitle && !didAutoRun.current) {
      const example = getExampleQuery(topicTitle, content);
      setQuery(example);
      didAutoRun.current = true;
    }
  }, [topicTitle, content]);

  useEffect(() => {
    if (!didAutoRun.current && query) {
      didAutoRun.current = true;
      const timer = setTimeout(runQuery, 300);
      return () => clearTimeout(timer);
    }
  }, [query]);

  const runQuery = useCallback(() => {
    setError(null);
    const trimmed = query.trim();
    if (!trimmed) return;
    setHistory(prev => [...prev.slice(-9), trimmed]);

    try {
      const sqlResult = executeSQL(trimmed);
      if ('error' in sqlResult) {
        setError(sqlResult.error);
      } else if ('command' in sqlResult) {
        setResult({ columns: ['result'], columnKeys: ['result'], rows: [{ result: sqlResult.message }] });
      } else {
        setResult(sqlResult);
      }
    } catch (e) {
      setError(`Query error: ${e instanceof Error ? e.message : String(e)}`);
    }
  }, [query]);

  const totalTime = useMemo(() => {
    if (!result) return '0.001';
    return (0.002 + Math.random() * 0.003).toFixed(3);
  }, [result]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 rounded-2xl border border-border bg-surface/50 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-deeper border-b border-border">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-slate-800">SQL Playground</span>
          <span className="text-[10px] text-slate-700 font-mono bg-surface px-2 py-0.5 rounded">Beta</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowSchema(!showSchema)} className="text-xs text-slate-600 hover:text-slate-800 px-2 py-1 rounded-lg hover:bg-surface">{showSchema ? 'Hide Schema' : 'Show Schema'}</button>
          <button onClick={() => { setQuery(''); setResult(null); setError(null); }} className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-800 px-2 py-1 rounded-lg hover:bg-surface"><RotateCcw className="w-3 h-3" /> Clear</button>
        </div>
      </div>

      {showSchema && (
        <div className="px-4 py-3 bg-deeper/30 border-b border-border">
          <div className="text-[11px] font-mono text-slate-600 whitespace-pre-wrap leading-relaxed">
            <div className="text-xs font-bold text-slate-700 mb-1">Schema:</div>
            {Object.entries(TABLES).map(([name, data]) => (
              <div key={name} className="mb-2">
                <span className="text-emerald-600 font-bold">{name}</span>
                <span className="text-slate-600"> ({data.columns.join(', ')})</span>
                <span className="text-slate-500 ml-2">{data.rows.length} rows</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-b border-border">
        <textarea value={query} onChange={e => setQuery(e.target.value)}
          className="w-full p-4 text-sm font-mono text-slate-800 bg-deeper focus:outline-none resize-none" rows={3} placeholder="Write your SQL query here..."
          onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) runQuery(); }} />
        <div className="flex items-center justify-between px-4 pb-3">
          <button onClick={runQuery} className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">
            <Play className="w-4 h-4" /> Run (Ctrl+Enter)
          </button>
          {history.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-slate-500">History:</span>
              <select className="text-[11px] border border-border rounded px-1.5 py-0.5 bg-surface text-slate-700" onChange={e => { if (e.target.value) setQuery(e.target.value); }} defaultValue="">
                <option value="" disabled>Recent</option>
                {history.map((h, i) => (<option key={i} value={h}>{h.length > 40 ? h.slice(0, 40) + '...' : h}</option>))}
              </select>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 bg-red-500/10 border-b border-red-500/30 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {result && !error && (
        <div className="overflow-x-auto">
          <div className="flex items-center gap-3 px-4 py-2 bg-deeper/30 border-b border-border text-[11px] text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Rows: <strong className="text-slate-800">{result.rows.length}</strong></span>
            <span>Time: <strong className="text-slate-800">{totalTime}s</strong></span>
          </div>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>{result.columns.map(col => (<th key={col} className="px-3 py-2 bg-deeper border-b border-border text-[11px] text-slate-600 font-semibold text-left">{col}</th>))}</tr>
            </thead>
            <tbody>
              {result.rows.length === 0 ? (
                <tr><td colSpan={result.columns.length} className="px-3 py-8 text-center text-sm text-slate-600">No results</td></tr>
              ) : (
                result.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-surface/20' : 'bg-deeper/20'}>
                    {result.columns.map((col, i) => (<td key={col} className="px-3 py-1.5 text-[13px] font-mono text-slate-700 border-b border-border/50">{row[result.columnKeys?.[i] || col] ?? row[col] ?? ''}</td>))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
