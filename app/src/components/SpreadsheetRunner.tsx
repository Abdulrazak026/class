import React, { useState, useCallback } from 'react';
import { SpreadsheetData, SpreadsheetCell, createDefaultData, evaluateFormula } from '../utils/spreadsheetEngine';

interface SpreadsheetRunnerProps {
  initialData?: SpreadsheetData;
  height?: number;
}

function colLabel(n: number): string {
  let s = '';
  n++;
  while (n > 0) { n--; s = String.fromCharCode(65 + (n % 26)) + s; n = Math.floor(n / 26); }
  return s;
}

export function SpreadsheetRunner({ initialData, height = 350 }: SpreadsheetRunnerProps) {
  const [data, setData] = useState<SpreadsheetData>(initialData || createDefaultData());
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [evalResults, setEvalResults] = useState<Record<string, string>>({});

  const recompute = useCallback((d: SpreadsheetData) => {
    const results: Record<string, string> = {};
    for (const [ref, cell] of Object.entries(d.cells)) {
      if (cell.formula) {
        try {
          results[ref] = String(evaluateFormula(cell.formula, d));
        } catch { results[ref] = '#ERROR'; }
      } else {
        results[ref] = cell.value;
      }
    }
    setEvalResults(results);
  }, []);

  React.useEffect(() => { recompute(data); }, [data, recompute]);

  const startEdit = (ref: string) => {
    const cell = data.cells[ref.toUpperCase()];
    setEditValue(cell ? (cell.formula || cell.value) : '');
    setEditing(ref);
  };

  const commitEdit = (ref: string) => {
    if (editing !== ref) return;
    const key = ref.toUpperCase();
    const val = editValue.trim();
    setData(prev => {
      const next = { ...prev, cells: { ...prev.cells } };
      if (!val) {
        delete next.cells[key];
      } else if (val.startsWith('=')) {
        next.cells[key] = { value: val, formula: val };
      } else {
        next.cells[key] = { value: val };
      }
      return next;
    });
    setEditing(null);
  };

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl bg-white shadow-sm">
      <table className="border-collapse text-xs w-full" style={{ minWidth: 400 }}>
        <thead>
          <tr>
            <th className="w-10 h-8 bg-gray-100 border border-gray-300 sticky left-0 z-10" />
            {Array.from({ length: data.cols }, (_, i) => (
              <th key={i} className="h-8 bg-gray-100 border border-gray-300 text-gray-600 font-semibold text-center min-w-[80px]">
                {colLabel(i)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: data.rows }, (_, r) => (
            <tr key={r}>
              <td className="w-10 h-8 bg-gray-100 border border-gray-300 text-gray-500 font-semibold text-center sticky left-0 z-10">
                {r + 1}
              </td>
              {Array.from({ length: data.cols }, (_, c) => {
                const ref = `${colLabel(c)}${r + 1}`;
                const isEditing = editing === ref;
                const cellData = data.cells[ref.toUpperCase()];
                const displayVal = cellData?.formula ? evalResults[ref.toUpperCase()] : (cellData?.value || '');
                return (
                  <td key={c}
                    className="h-8 border border-gray-200 cursor-cell"
                    onClick={() => !isEditing && startEdit(ref)}>
                    {isEditing ? (
                      <input autoFocus
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={() => commitEdit(ref)}
                        onKeyDown={e => { if (e.key === 'Enter') commitEdit(ref); if (e.key === 'Escape') setEditing(null); }}
                        className="w-full h-full px-2 text-xs font-mono text-gray-900 bg-white border-2 border-indigo-500 outline-none"
                      />
                    ) : (
                      <div className={`w-full h-full px-2 flex items-center text-xs font-mono truncate ${cellData?.formula ? 'text-indigo-700' : 'text-gray-900'}`}
                        title={cellData?.formula || ''}>
                        {displayVal}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
