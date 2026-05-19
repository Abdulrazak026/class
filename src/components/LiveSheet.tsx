import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, RotateCcw, ArrowUpDown, Search, BarChart3, Filter, X, Table as TableIcon, Plus } from 'lucide-react';
import { evaluateFormula } from '../utils/spreadsheetEngine';
import type { SpreadsheetData } from '../utils/spreadsheetEngine';
import { getPreset } from '../utils/spreadsheetPresets';

const DEFAULT_COLS = 7;
const DEFAULT_ROWS = 18;
const colLabels = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

function toSpreadsheetData(cells: Record<string, string>, cols: number, rows: number): SpreadsheetData {
  const data: SpreadsheetData = { cells: {}, cols, rows };
  for (const [ref, value] of Object.entries(cells)) {
    const clean = ref.toUpperCase().trim();
    if (value.startsWith('=')) {
      data.cells[clean] = { value, formula: value };
    } else {
      data.cells[clean] = { value };
    }
  }
  return data;
}

function createFromPreset(topicId: string): { data: Record<string, string>; cols: number; rows: number; readOnly: Set<string> } | null {
  const preset = getPreset(topicId);
  if (!preset) return null;
  const newData: Record<string, string> = {};
  for (let r = 1; r <= preset.rows; r++) {
    for (let c = 0; c < preset.cols; c++) {
      const ref = `${colLabels[c]}${r}`;
      newData[ref] = preset.data[ref] || '';
    }
  }
  const readOnly = new Set<string>(preset.readOnlyCells || []);
  return { data: newData, cols: preset.cols, rows: preset.rows, readOnly };
}

function createDefaultData(): Record<string, string> {
  const d: Record<string, string> = {};
  for (let r = 1; r <= DEFAULT_ROWS; r++) {
    for (let c = 0; c < DEFAULT_COLS; c++) {
      d[`${colLabels[c]}${r}`] = '';
    }
  }
  d['B1'] = 'Item'; d['C1'] = 'Price'; d['D1'] = 'Qty';
  d['B2'] = 'Apples'; d['C2'] = '10'; d['D2'] = '3';
  d['B3'] = 'Bananas'; d['C3'] = '20'; d['D3'] = '2';
  d['B4'] = 'Cherries'; d['C4'] = '15'; d['D4'] = '5';
  d['B5'] = 'Dates'; d['C5'] = '25'; d['D5'] = '1';
  d['B6'] = 'Elderberries'; d['C6'] = '12'; d['D6'] = '4';
  d['E1'] = 'Total';
  return d;
}

export function LiveSheet({ topicId: externalTopicId, topicTitle, content }: { topicId?: string; topicTitle?: string; content?: string }) {
  const [editedData, setEditedData] = useState<Record<string, string> | null>(null);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editing, setEditing] = useState(false);

  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [filterCol, setFilterCol] = useState<number | null>(null);
  const [filterText, setFilterText] = useState('');

  const [showChart, setShowChart] = useState(false);
  const [chartCol, setChartCol] = useState<number | null>(null);
  const [chartLabelCol, setChartLabelCol] = useState<number | null>(null);
  const [pivotMode, setPivotMode] = useState(false);
  const [pivotRowField, setPivotRowField] = useState<number | null>(null);
  const [pivotColField, setPivotColField] = useState<number | null>(null);
  const [pivotValField, setPivotValField] = useState<number | null>(null);
  const [pivotAggFn, setPivotAggFn] = useState<'SUM' | 'COUNT' | 'AVERAGE' | 'MIN' | 'MAX'>('SUM');

  const [showSlicers, setShowSlicers] = useState(false);
  const [slicerSelections, setSlicerSelections] = useState<Record<string, string[]>>({});

  const [showCalcField, setShowCalcField] = useState(false);
  const [calcFieldName, setCalcFieldName] = useState('');
  const [calcFieldFormula, setCalcFieldFormula] = useState('');
  const [calculatedFields, setCalculatedFields] = useState<{ name: string; formula: string }[]>([]);

  const [showValidation, setShowValidation] = useState(false);
  const [validationRules, setValidationRules] = useState<{ col: number; type: string; params: Record<string, string> }[]>([]);
  const [validationCol, setValidationCol] = useState<number>(0);
  const [validationType, setValidationType] = useState('dropdown');
  const [validationParam, setValidationParam] = useState('');

  const presetInfo = useMemo(() => {
    const result = externalTopicId ? createFromPreset(externalTopicId) : null;
    if (result) return result;
    return { data: createDefaultData(), cols: DEFAULT_COLS, rows: DEFAULT_ROWS, readOnly: new Set<string>() };
  }, [externalTopicId]);

  const data = editedData || presetInfo.data;
  const cols = presetInfo.cols;
  const rows = presetInfo.rows;
  const readOnlyCells = presetInfo.readOnly;

  const ssData = useMemo(() => toSpreadsheetData(data, cols, rows), [data, cols, rows]);

  const getCellVal = useCallback((ref: string): string => {
    const v = data[ref.toUpperCase()];
    if (!v) return '';
    if (v.startsWith('=')) {
      try {
        return String(evaluateFormula(v, ssData));
      } catch { return '#ERROR'; }
    }
    return v;
  }, [data, ssData]);

  const invalidCells = useMemo(() => {
    const invalid = new Set<string>();
    if (validationRules.length === 0) return invalid;
    for (const rule of validationRules) {
      for (let r = 2; r <= rows; r++) {
        const ref = `${colLabels[rule.col]}${r}`;
        const raw = data[ref] || '';
        const val = raw.startsWith('=') ? getCellVal(ref) : raw;
        if (!val) continue;
        let ok = true;
        switch (rule.type) {
          case 'dropdown': {
            const allowed = (rule.params.values || '').split(',').map(v => v.trim().toLowerCase());
            if (!allowed.includes(val.toLowerCase())) ok = false;
            break;
          }
          case 'number': {
            const num = parseFloat(val);
            const min = rule.params.min !== undefined ? parseFloat(rule.params.min) : -Infinity;
            const max = rule.params.max !== undefined ? parseFloat(rule.params.max) : Infinity;
            if (isNaN(num) || num < min || num > max) ok = false;
            break;
          }
          case 'textLength': {
            const maxLen = parseInt(rule.params.maxLength) || Infinity;
            if (val.length > maxLen) ok = false;
            break;
          }
          case 'required': {
            if (!val.trim()) ok = false;
            break;
          }
          case 'contains': {
            const substr = (rule.params.substring || '').toLowerCase();
            if (substr && !val.toLowerCase().includes(substr)) ok = false;
            break;
          }
        }
        if (!ok) invalid.add(ref);
      }
    }
    return invalid;
  }, [validationRules, data, rows, getCellVal]);

  const addValidationRule = useCallback(() => {
    const params: Record<string, string> = {};
    if (validationType === 'dropdown') params.values = validationParam;
    else if (validationType === 'number') {
      const parts = validationParam.split(',').map(s => s.trim());
      if (parts[0]) params.min = parts[0];
      if (parts[1]) params.max = parts[1];
    } else if (validationType === 'textLength') params.maxLength = validationParam;
    else if (validationType === 'contains') params.substring = validationParam;
    setValidationRules(prev => [...prev, { col: validationCol, type: validationType, params }]);
    setValidationParam('');
  }, [validationCol, validationType, validationParam]);

  const displayedValue = useMemo(() => {
    if (!selectedCell) return '';
    const raw = data[selectedCell] || '';
    if (raw.startsWith('=')) return getCellVal(selectedCell);
    return raw;
  }, [data, selectedCell, getCellVal]);

  const visibleRows = useMemo(() => {
    const rowNums = Array.from({ length: rows }, (_, i) => i + 1);
    let filtered = rowNums;
    if (filterCol !== null && filterText) {
      filtered = filtered.filter(r => {
        const ref = `${colLabels[filterCol]}${r}`;
        const val = getCellVal(ref).toLowerCase();
        return val.includes(filterText.toLowerCase());
      });
    }
    const activeSlicerCols = Object.entries(slicerSelections).filter(([, sel]) => sel.length > 0);
    if (activeSlicerCols.length > 0) {
      filtered = filtered.filter(r =>
        activeSlicerCols.every(([colIdxStr, sel]) => {
          const colIdx = parseInt(colIdxStr);
          const ref = `${colLabels[colIdx]}${r}`;
          const val = getCellVal(ref).toLowerCase().trim();
          return sel.includes(val);
        })
      );
    }
    return filtered;
  }, [rows, filterCol, filterText, getCellVal, slicerSelections]);

  const sortedVisibleRows = useMemo(() => {
    if (sortCol === null) return visibleRows;
    const sorted = [...visibleRows].sort((a, b) => {
      const refA = `${colLabels[sortCol]}${a}`;
      const refB = `${colLabels[sortCol]}${b}`;
      const valA = getCellVal(refA);
      const valB = getCellVal(refB);
      const numA = parseFloat(valA), numB = parseFloat(valB);
      if (!isNaN(numA) && !isNaN(numB)) return sortAsc ? numA - numB : numB - numA;
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
    return sorted;
  }, [visibleRows, sortCol, sortAsc, getCellVal]);

  const handleCellClick = useCallback((ref: string) => {
    setSelectedCell(ref);
    setEditValue(data[ref] || '');
    setEditing(false);
  }, [data]);

  const handleCellChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  }, []);

  const handleCellBlur = useCallback(() => {
    if (selectedCell && !readOnlyCells.has(selectedCell)) {
      setEditedData(prev => ({ ...(prev || presetInfo.data), [selectedCell]: editValue }));
    }
    setEditing(false);
  }, [selectedCell, editValue, readOnlyCells, presetInfo]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && editing) { handleCellBlur(); }
    else if (e.key === 'Enter' && !editing && selectedCell) { setEditing(true); }
    else if (e.key === 'Tab') {
      e.preventDefault();
      if (selectedCell) {
        const colIdx = selectedCell.charCodeAt(0) - 65;
        const rowIdx = parseInt(selectedCell.slice(1));
        const nextCol = (colIdx + 1) % cols;
        const nextRow = nextCol === 0 ? rowIdx + 1 : rowIdx;
        if (nextRow <= rows) setSelectedCell(`${colLabels[nextCol]}${nextRow}`);
      }
    }
  }, [editing, selectedCell, cols, rows, handleCellBlur]);

  const handleReset = useCallback(() => {
    setEditedData(null);
    setSortCol(null); setFilterCol(null); setFilterText('');
    setShowChart(false); setChartCol(null); setChartLabelCol(null);
    setPivotMode(false); setPivotRowField(null); setPivotColField(null); setPivotValField(null);
    setShowSlicers(false); setSlicerSelections({});
    setShowCalcField(false); setCalculatedFields([]);
    setShowValidation(false); setValidationRules([]);
  }, []);

  const toggleSort = useCallback((colIdx: number) => {
    if (sortCol === colIdx) { setSortAsc(!sortAsc); } else { setSortCol(colIdx); setSortAsc(true); }
  }, [sortCol, sortAsc]);

  const toggleSlicer = useCallback((colIdx: number, value: string) => {
    const key = String(colIdx);
    const val = value.toLowerCase().trim();
    setSlicerSelections(prev => {
      const curr = prev[key] || [];
      const next = curr.includes(val) ? curr.filter(v => v !== val) : [...curr, val];
      return { ...prev, [key]: next.length > 0 ? next : [] };
    });
  }, []);

  const chartData = useMemo(() => {
    if (chartCol === null || chartLabelCol === null) return [];
    return visibleRows.map(r => ({
      label: getCellVal(`${colLabels[chartLabelCol]}${r}`),
      value: parseFloat(getCellVal(`${colLabels[chartCol]}${r}`)) || 0,
    })).filter(d => d.value > 0).slice(0, 20);
  }, [chartCol, chartLabelCol, visibleRows, getCellVal]);

  const isReadOnly = (ref: string) => readOnlyCells.has(ref);

  const slicerUniqueValues = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (let c = 0; c < cols; c++) {
      const vals: string[] = [];
      for (let r = 2; r <= rows; r++) {
        const v = getCellVal(`${colLabels[c]}${r}`).trim();
        if (v && !vals.includes(v.toLowerCase())) vals.push(v.toLowerCase());
      }
      map[String(c)] = vals;
    }
    return map;
  }, [cols, rows, getCellVal]);

  const evaluateCalcField = useCallback((formula: string, row: number): string => {
    try {
      let expr = formula.replace(/^=/, '').trim();
      expr = expr.replace(/\b([A-Z])\b/g, (_, col: string) => {
        const ref = `${col.toUpperCase()}${row}`;
        const raw = getCellVal(ref) || '0';
        const num = parseFloat(raw);
        return isNaN(num) ? '0' : String(num);
      });
      return String(Function('"use strict"; return (' + expr + ')')());
    } catch { return '#ERROR'; }
  }, [getCellVal]);

  const addCalculatedField = useCallback(() => {
    if (!calcFieldName.trim() || !calcFieldFormula.trim()) return;
    setCalculatedFields(prev => [...prev, { name: calcFieldName.trim(), formula: calcFieldFormula.trim() }]);
    setCalcFieldName('');
    setCalcFieldFormula('');
  }, [calcFieldName, calcFieldFormula]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="mb-8 rounded-2xl border border-border bg-surface/50 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-deeper border-b border-border">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-semibold text-slate-800">LiveSheet</span>
          <span className="text-[10px] text-slate-700 font-mono bg-surface px-2 py-0.5 rounded">Interactive</span>
        </div>
        <div className="flex items-center gap-2">
          {selectedCell && <span className="text-[11px] font-mono text-slate-500 bg-surface px-2 py-1 rounded">{selectedCell}</span>}
          <button onClick={handleReset} className="text-slate-500 hover:text-slate-700"><RotateCcw className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-2 bg-surface border-b border-border">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Sort</span>
          <select onChange={e => { const v = parseInt(e.target.value); if (!isNaN(v)) toggleSort(v); else setSortCol(null); }}
            className="text-[11px] bg-deeper border border-border rounded px-2 py-1 text-slate-600 font-mono"
            value={sortCol !== null ? String(sortCol) : ''}>
            <option value="">—</option>
            {Array.from({ length: cols }, (_, i) => (
              <option key={i} value={i}>Col {colLabels[i]}</option>
            ))}
          </select>
          {sortCol !== null && (
            <button onClick={() => setSortAsc(!sortAsc)}
              className={`text-[11px] px-2 py-1 rounded font-mono border ${sortAsc ? 'bg-accent/10 text-accent border-accent/30' : 'bg-deeper text-slate-500 border-border'}`}>
              {sortAsc ? 'A→Z ↑' : 'Z→A ↓'}
            </button>
          )}
        </div>

        <div className="w-px h-5 bg-border" />

        <div className="flex items-center gap-1.5">
          <Filter className="w-3 h-3 text-slate-500" />
          <select onChange={e => setFilterCol(e.target.value ? parseInt(e.target.value) : null)}
            className="text-[11px] bg-deeper border border-border rounded px-2 py-1 text-slate-600 font-mono"
            value={filterCol !== null ? String(filterCol) : ''}>
            <option value="">Filter col</option>
            {Array.from({ length: cols }, (_, i) => (
              <option key={i} value={i}>Col {colLabels[i]}</option>
            ))}
          </select>
          {filterCol !== null && (
            <input value={filterText} onChange={e => setFilterText(e.target.value)}
              className="text-[11px] bg-deeper border border-border rounded px-2 py-1 text-slate-600 font-mono w-20"
              placeholder="search..." />
          )}
          {filterText && <button onClick={() => setFilterText('')} className="text-slate-400 hover:text-slate-600"><X className="w-3 h-3" /></button>}
        </div>

        <div className="w-px h-5 bg-border" />

        <div className="flex items-center gap-1.5">
          <button onClick={() => { setPivotMode(!pivotMode); if (!pivotMode) { setShowChart(false); } }}
            className={`text-[11px] px-2 py-1 rounded font-mono border flex items-center gap-1 ${pivotMode ? 'bg-accent/10 text-accent border-accent/30' : 'bg-deeper text-slate-500 border-border'}`}>
            <TableIcon className="w-3 h-3" /> Pivot
          </button>
          <button onClick={() => setShowSlicers(!showSlicers)}
            className={`text-[11px] px-2 py-1 rounded font-mono border flex items-center gap-1 ${showSlicers ? 'bg-accent/10 text-accent border-accent/30' : 'bg-deeper text-slate-500 border-border'}`}>
            <Filter className="w-3 h-3" /> Slicers
          </button>
          <button onClick={() => setShowCalcField(!showCalcField)}
            className={`text-[11px] px-2 py-1 rounded font-mono border flex items-center gap-1 ${showCalcField ? 'bg-accent/10 text-accent border-accent/30' : 'bg-deeper text-slate-500 border-border'}`}>
            <Calculator className="w-3 h-3" /> Calc Field
          </button>
          <button onClick={() => setShowValidation(!showValidation)}
            className={`text-[11px] px-2 py-1 rounded font-mono border flex items-center gap-1 ${showValidation ? 'bg-accent/10 text-accent border-accent/30' : 'bg-deeper text-slate-500 border-border'}`}>
            <Filter className="w-3 h-3" /> Validn
          </button>
        </div>

        <div className="w-px h-5 bg-border" />

        <div className="flex items-center gap-1.5">
          <BarChart3 className="w-3 h-3 text-slate-500" />
          <select onChange={e => setChartLabelCol(e.target.value ? parseInt(e.target.value) : null)}
            className="text-[11px] bg-deeper border border-border rounded px-2 py-1 text-slate-600 font-mono"
            value={chartLabelCol !== null ? String(chartLabelCol) : ''}>
            <option value="">Label col</option>
            {Array.from({ length: cols }, (_, i) => (
              <option key={i} value={i}>Col {colLabels[i]}</option>
            ))}
          </select>
          <select onChange={e => setChartCol(e.target.value ? parseInt(e.target.value) : null)}
            className="text-[11px] bg-deeper border border-border rounded px-2 py-1 text-slate-600 font-mono"
            value={chartCol !== null ? String(chartCol) : ''}>
            <option value="">Value col</option>
            {Array.from({ length: cols }, (_, i) => (
              <option key={i} value={i}>Col {colLabels[i]}</option>
            ))}
          </select>
          {chartLabelCol !== null && chartCol !== null && (
            <button onClick={() => setShowChart(!showChart)}
              className={`text-[11px] px-2 py-1 rounded font-mono border ${showChart ? 'bg-accent/10 text-accent border-accent/30' : 'bg-deeper text-slate-500 border-border'}`}>
              {showChart ? 'Hide' : 'Chart'}
            </button>
          )}
        </div>
      </div>

      {selectedCell && (
        <div className="px-4 py-2 bg-surface border-b border-border flex items-center gap-3">
          <span className="text-[11px] font-mono font-bold text-slate-600 w-12">{selectedCell}</span>
          <input value={editing ? editValue : (data[selectedCell] || displayedValue)}
            onChange={handleCellChange}
            onBlur={handleCellBlur}
            onFocus={() => { setEditValue(data[selectedCell] || ''); setEditing(true); }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-deeper text-slate-800 text-sm font-mono px-3 py-1.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/40"
            placeholder="Enter value or formula (=SUM(A1:A5))" />
        </div>
      )}

      {/* Chart panel */}
      {showChart && chartData.length > 0 && (
        <div className="px-4 py-4 bg-deeper/30 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Bar Chart</span>
            <button onClick={() => setShowChart(false)} className="text-slate-400 hover:text-slate-600"><X className="w-3.5 h-3.5" /></button>
          </div>
          <div className="space-y-1.5">
            {chartData.map((d, i) => {
              const maxVal = Math.max(...chartData.map(x => x.value), 1);
              const colors = ['#7c3aed','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f97316','#ec4899','#14b8a6','#84cc16'];
              return (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-500 w-16 text-right truncate">{d.label}</span>
                  <div className="flex-1 bg-deeper rounded-full h-4 overflow-hidden">
                    <div className="h-full rounded-full flex items-center justify-end pr-1.5 text-[9px] font-bold text-white transition-all duration-500"
                      style={{ width: `${(d.value / maxVal) * 100}%`, backgroundColor: colors[i % colors.length] }}>
                      {d.value > maxVal * 0.15 ? d.value : ''}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 w-12">{d.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Slicers panel */}
      {showSlicers && (
        <div className="px-4 py-3 bg-surface border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Slicers</span>
            <div className="flex items-center gap-2">
              {Object.values(slicerSelections).some(s => s.length > 0) && (
                <button onClick={() => setSlicerSelections({})}
                  className="text-[10px] text-accent hover:underline font-mono">Clear all</button>
              )}
              <button onClick={() => setShowSlicers(false)} className="text-slate-400 hover:text-slate-600"><X className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: cols }, (_, c) => {
              const colVals = slicerUniqueValues[String(c)] || [];
              if (colVals.length === 0) return null;
              const activeSel = slicerSelections[String(c)] || [];
              return (
                <div key={c} className="min-w-[120px]">
                  <div className="text-[10px] font-bold text-slate-500 mb-1.5 font-mono">Col {colLabels[c]}</div>
                  <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                    {colVals.map(v => {
                      const isOn = activeSel.includes(v);
                      return (
                        <button key={v} onClick={() => toggleSlicer(c, v)}
                          className={`text-[10px] px-2 py-0.5 rounded font-mono border transition-colors ${
                            isOn
                              ? 'bg-accent text-white border-accent'
                              : 'bg-deeper text-slate-600 border-border hover:border-accent/40'
                          }`}>
                          {v}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Calculated Field dialog */}
      {showCalcField && (
        <div className="px-4 py-3 bg-surface border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Calculated Field</span>
            <button onClick={() => setShowCalcField(false)} className="text-slate-400 hover:text-slate-600"><X className="w-3.5 h-3.5" /></button>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <input value={calcFieldName} onChange={e => setCalcFieldName(e.target.value)}
              className="text-[11px] bg-deeper border border-border rounded px-2 py-1 text-slate-600 font-mono w-32"
              placeholder="Field name (e.g. Profit)" />
            <input value={calcFieldFormula} onChange={e => setCalcFieldFormula(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addCalculatedField(); }}
              className="text-[11px] bg-deeper border border-border rounded px-2 py-1 text-slate-600 font-mono flex-1"
              placeholder="Formula, e.g. =C*D or =C2*0.05" />
            <button onClick={addCalculatedField}
              className="text-[11px] px-3 py-1 rounded font-mono bg-accent text-white border border-accent hover:bg-accent/90 flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
          {calculatedFields.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {calculatedFields.map((cf, i) => (
                <div key={i}
                  className="text-[10px] bg-deeper border border-border rounded px-2 py-1 font-mono text-slate-600 flex items-center gap-2">
                  <span className="font-bold text-accent">{cf.name}</span>
                  <span className="text-slate-400">=</span>
                  <span>{cf.formula}</span>
                  <button onClick={() => setCalculatedFields(prev => prev.filter((_, j) => j !== i))}
                    className="text-slate-400 hover:text-red-500 ml-1"><X className="w-2.5 h-2.5" /></button>
                </div>
              ))}
            </div>
          )}
          <div className="mt-2 text-[9px] text-slate-400 font-mono">
            Use column letters (A, B, C...) to reference row values. Example: <span className="text-accent">=C*D</span> multiplies columns C and D for each row.
          </div>
        </div>
      )}

      {/* Data Validation panel */}
      {showValidation && (
        <div className="px-4 py-3 bg-surface border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Data Validation</span>
            <button onClick={() => setShowValidation(false)} className="text-slate-400 hover:text-slate-600"><X className="w-3.5 h-3.5" /></button>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <select value={validationCol} onChange={e => setValidationCol(parseInt(e.target.value))}
              className="text-[11px] bg-deeper border border-border rounded px-2 py-1 text-slate-600 font-mono">
              {Array.from({ length: cols }, (_, i) => (<option key={i} value={i}>Col {colLabels[i]}</option>))}
            </select>
            <select value={validationType} onChange={e => setValidationType(e.target.value)}
              className="text-[11px] bg-deeper border border-border rounded px-2 py-1 text-slate-600 font-mono">
              <option value="dropdown">Dropdown</option>
              <option value="number">Number Range</option>
              <option value="textLength">Text Length</option>
              <option value="contains">Contains</option>
              <option value="required">Required</option>
            </select>
            {validationType !== 'required' && (
              <input value={validationParam} onChange={e => setValidationParam(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') addValidationRule(); }}
                className="text-[11px] bg-deeper border border-border rounded px-2 py-1 text-slate-600 font-mono flex-1"
                placeholder={
                  validationType === 'dropdown' ? 'comma-separated values (e.g. Yes,No,Maybe)' :
                  validationType === 'number' ? 'min,max (e.g. 18,120)' :
                  validationType === 'textLength' ? 'max length (e.g. 100)' :
                  'required substring (e.g. @)'
                } />
            )}
            <button onClick={addValidationRule}
              className="text-[11px] px-3 py-1 rounded font-mono bg-accent text-white border border-accent hover:bg-accent/90 flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
          {validationRules.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {validationRules.map((rule, i) => (
                <div key={i}
                  className="text-[10px] bg-deeper border border-border rounded px-2 py-1 font-mono text-slate-600 flex items-center gap-2">
                  <span className="font-bold text-accent">Col {colLabels[rule.col]}</span>
                  <span className="text-slate-400">|</span>
                  <span>{rule.type}</span>
                  <span className="text-slate-400">{Object.values(rule.params).join(', ')}</span>
                  <button onClick={() => setValidationRules(prev => prev.filter((_, j) => j !== i))}
                    className="text-slate-400 hover:text-red-500 ml-1"><X className="w-2.5 h-2.5" /></button>
                </div>
              ))}
            </div>
          )}
          <div className="mt-2 text-[9px] text-slate-400 font-mono">
            Invalid cells are highlighted with a <span className="text-red-500">red border</span>.
          </div>
        </div>
      )}

      {/* Pivot config */}
      {pivotMode && (
        <div className="px-4 py-2 bg-surface border-b border-border flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pivot</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400">Rows</span>
            <select onChange={e => setPivotRowField(e.target.value ? parseInt(e.target.value) : null)}
              className="text-[11px] bg-deeper border border-border rounded px-2 py-1 text-slate-600 font-mono"
              value={pivotRowField !== null ? String(pivotRowField) : ''}>
              <option value="">—</option>
              {Array.from({ length: cols }, (_, i) => (<option key={i} value={i}>Col {colLabels[i]}</option>))}
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400">Columns</span>
            <select onChange={e => setPivotColField(e.target.value ? parseInt(e.target.value) : null)}
              className="text-[11px] bg-deeper border border-border rounded px-2 py-1 text-slate-600 font-mono"
              value={pivotColField !== null ? String(pivotColField) : ''}>
              <option value="">—</option>
              {Array.from({ length: cols }, (_, i) => (<option key={i} value={i}>Col {colLabels[i]}</option>))}
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400">Values</span>
            <select onChange={e => setPivotValField(e.target.value ? parseInt(e.target.value) : null)}
              className="text-[11px] bg-deeper border border-border rounded px-2 py-1 text-slate-600 font-mono"
              value={pivotValField !== null ? String(pivotValField) : ''}>
              <option value="">—</option>
              {Array.from({ length: cols }, (_, i) => (<option key={i} value={i}>Col {colLabels[i]}</option>))}
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400">Agg</span>
            <select onChange={e => setPivotAggFn(e.target.value as any)}
              className="text-[11px] bg-deeper border border-border rounded px-2 py-1 text-slate-600 font-mono"
              value={pivotAggFn}>
              <option value="SUM">SUM</option>
              <option value="COUNT">COUNT</option>
              <option value="AVERAGE">AVERAGE</option>
              <option value="MIN">MIN</option>
              <option value="MAX">MAX</option>
            </select>
          </div>
        </div>
      )}

      {/* Pivot grid */}
      {pivotMode && pivotRowField !== null && pivotValField !== null && (() => {
        type PivotKey = string;
        const rowMap = new Map<PivotKey, Map<PivotKey, number[]>>();
        const rowSet = new Set<PivotKey>();
        const colSet = new Set<PivotKey>();
        for (let r = 1; r <= rows; r++) {
          const rowVal = getCellVal(`${colLabels[pivotRowField]}${r}`);
          const valRaw = getCellVal(`${colLabels[pivotValField]}${r}`);
          const numVal = parseFloat(valRaw);
          if (rowVal === '' || isNaN(numVal)) continue;
          const colVal = pivotColField !== null ? getCellVal(`${colLabels[pivotColField]}${r}`) : '(All)';
          rowSet.add(rowVal); colSet.add(colVal);
          if (!rowMap.has(rowVal)) rowMap.set(rowVal, new Map());
          const colMap = rowMap.get(rowVal)!;
          if (!colMap.has(colVal)) colMap.set(colVal, []);
          colMap.get(colVal)!.push(numVal);
        }
        const sortedRows = Array.from(rowSet).sort();
        const sortedCols = Array.from(colSet).sort();
        const agg = (vals: number[]): number | string => {
          if (vals.length === 0) return 0;
          switch (pivotAggFn) {
            case 'SUM': return vals.reduce((a, b) => a + b, 0);
            case 'COUNT': return vals.length;
            case 'AVERAGE': return vals.reduce((a, b) => a + b, 0) / vals.length;
            case 'MIN': return Math.min(...vals);
            case 'MAX': return Math.max(...vals);
          }
        };
        return (
          <div className="overflow-x-auto border-b border-border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-1.5 bg-deeper border-b border-border text-[10px] text-slate-500 font-bold text-center">
                    {pivotColField !== null ? colLabels[pivotRowField] : colLabels[pivotRowField]}
                  </th>
                  {sortedCols.map(c => (
                    <th key={c} className="px-2 py-1.5 bg-deeper border-b border-border text-[10px] text-slate-500 font-bold text-center">{c}</th>
                  ))}
                  <th className="px-2 py-1.5 bg-deeper border-b border-border text-[10px] text-accent font-bold text-center">Grand Total</th>
                </tr>
              </thead>
              <tbody>
                {sortedRows.map(rowVal => {
                  const colMap = rowMap.get(rowVal)!;
                  const allRowVals: number[] = [];
                  return (
                    <tr key={rowVal}>
                      <td className="px-2 py-1 bg-deeper border-b border-border text-[10px] text-slate-500 font-bold">{rowVal}</td>
                      {sortedCols.map(colVal => {
                        const vals = colMap.get(colVal) || [];
                        allRowVals.push(...vals);
                        const result = agg(vals);
                        return (
                          <td key={colVal} className="px-2 py-1 border-b border-r border-border text-[13px] font-mono text-center text-slate-700">
                            {typeof result === 'number' ? result.toFixed(2) : result}
                          </td>
                        );
                      })}
                      <td className="px-2 py-1 border-b border-r border-border text-[13px] font-mono text-center text-accent font-bold">
                        {agg(allRowVals).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
                {/* Grand total row */}
                <tr>
                  <td className="px-2 py-1 bg-deeper border-b border-border text-[10px] text-accent font-bold">Grand Total</td>
                  {sortedCols.map(colVal => {
                    const colVals: number[] = [];
                    sortedRows.forEach(rv => {
                      const cv = rowMap.get(rv)?.get(colVal);
                      if (cv) colVals.push(...cv);
                    });
                    return (
                      <td key={colVal} className="px-2 py-1 border-b border-r border-border text-[13px] font-mono text-center text-accent font-bold">
                        {agg(colVals).toFixed(2)}
                      </td>
                    );
                  })}
                  <td className="px-2 py-1 border-b border-r border-border text-[13px] font-mono text-center text-accent font-bold">
                    {(() => {
                      const all: number[] = [];
                      sortedRows.forEach(rv => {
                        const colMap = rowMap.get(rv)!;
                        sortedCols.forEach(cv => {
                          const vals = colMap.get(cv);
                          if (vals) all.push(...vals);
                        });
                      });
                      return agg(all).toFixed(2);
                    })()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })()}

      {/* Grid */}
      {!pivotMode && <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-10 px-2 py-1.5 bg-deeper border-b border-border text-[10px] text-slate-500 font-bold text-center">#</th>
              {Array.from({ length: cols }, (_, i) => (
                <th key={i} className="px-2 py-1.5 bg-deeper border-b border-border text-[10px] text-slate-500 font-bold text-center">
                  {colLabels[i]}
                  {sortCol === i && <span className="ml-1 text-accent">{sortAsc ? '↑' : '↓'}</span>}
                </th>
              ))}
              {calculatedFields.map((cf, i) => (
                <th key={`cf-${i}`} className="px-2 py-1.5 bg-violet-50 border-b border-border text-[10px] text-violet-600 font-bold text-center">
                  {cf.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedVisibleRows.map(row => (
              <tr key={row}>
                <td className="px-2 py-1 bg-deeper border-b border-border text-[10px] text-slate-400 font-mono text-center">{row}</td>
                {Array.from({ length: cols }, (_, c) => {
                  const ref = colLabels[c] + row;
                  const raw = data[ref] || '';
                  const display = raw.startsWith('=') ? getCellVal(ref) : raw;
                  const isSelected = selectedCell === ref;
                  const isHighlighted = isReadOnly(ref);
                  const isInvalid = invalidCells.has(ref);
                  return (
                    <td key={ref} onClick={() => handleCellClick(ref)} onDoubleClick={() => { if (!isReadOnly(ref)) { setEditing(true); setEditValue(data[ref] || ''); } }}
                      className={`px-2 py-1 border-b border-r cursor-pointer transition-colors text-[13px] font-mono ${
                        isSelected ? 'bg-accent/10 ring-2 ring-inset ring-accent' : 'hover:bg-deeper/50'
                      } ${isHighlighted ? 'bg-emerald-50' : ''} ${raw.startsWith('=') ? 'text-indigo-600' : 'text-slate-700'} ${
                        isInvalid ? 'border-red-400 bg-red-50' : 'border-border'
                      }`}
                      title={raw.startsWith('=') ? raw : ''}>
                      {display || <span className="text-slate-300">—</span>}
                    </td>
                  );
                })}
                {calculatedFields.map((cf, ci) => {
                  const cfVal = evaluateCalcField(cf.formula, row);
                  return (
                    <td key={`cf-${ci}`} className="px-2 py-1 border-b border-r border-border text-[13px] font-mono text-violet-700 bg-violet-50/30 text-center"
                      title={`${cf.name}: ${cf.formula}`}>
                      {cfVal}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>}

      <div className="px-4 py-2 bg-deeper/50 border-t border-border text-[10px] text-slate-500 flex items-center gap-4 flex-wrap">
        <span>Formulas: SUM, AVERAGE, MIN, MAX, COUNT, COUNTA, IF, AND, OR, NOT</span>
        <span>Text: LEFT, RIGHT, MID, CONCATENATE, TRIM, UPPER, LOWER, PROPER, FIND, LEN, SUBSTITUTE</span>
        <span>Lookup: VLOOKUP, XLOOKUP</span>
        <span>Conditional: SUMIF, COUNTIF, SUMIFS, COUNTIFS, AVERAGEIFS</span>
      </div>
    </motion.div>
  );
}
