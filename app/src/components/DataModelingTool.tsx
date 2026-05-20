import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Database, Plus, Trash2, Key, Table2, Eye, RotateCcw } from 'lucide-react';

interface Column {
  name: string;
  type: 'INT' | 'VARCHAR' | 'TEXT' | 'BOOLEAN' | 'DATE' | 'DECIMAL';
  primaryKey: boolean;
  foreignKey?: string;
  nullable: boolean;
}

interface Table {
  name: string;
  columns: Column[];
}

const PRESETS: Record<string, Table[]> = {
  'E-commerce': [
    { name: 'customers', columns: [
      { name: 'id', type: 'INT', primaryKey: true, nullable: false },
      { name: 'name', type: 'VARCHAR', primaryKey: false, nullable: false },
      { name: 'email', type: 'VARCHAR', primaryKey: false, nullable: false },
      { name: 'created_at', type: 'DATE', primaryKey: false, nullable: true },
    ]},
    { name: 'orders', columns: [
      { name: 'id', type: 'INT', primaryKey: true, nullable: false },
      { name: 'customer_id', type: 'INT', primaryKey: false, foreignKey: 'customers.id', nullable: false },
      { name: 'total', type: 'DECIMAL', primaryKey: false, nullable: false },
      { name: 'status', type: 'VARCHAR', primaryKey: false, nullable: false },
      { name: 'order_date', type: 'DATE', primaryKey: false, nullable: false },
    ]},
    { name: 'products', columns: [
      { name: 'id', type: 'INT', primaryKey: true, nullable: false },
      { name: 'name', type: 'VARCHAR', primaryKey: false, nullable: false },
      { name: 'price', type: 'DECIMAL', primaryKey: false, nullable: false },
      { name: 'category', type: 'VARCHAR', primaryKey: false, nullable: true },
    ]},
  ],
  'Library': [
    { name: 'authors', columns: [
      { name: 'id', type: 'INT', primaryKey: true, nullable: false },
      { name: 'name', type: 'VARCHAR', primaryKey: false, nullable: false },
      { name: 'birth_year', type: 'INT', primaryKey: false, nullable: true },
    ]},
    { name: 'books', columns: [
      { name: 'id', type: 'INT', primaryKey: true, nullable: false },
      { name: 'title', type: 'VARCHAR', primaryKey: false, nullable: false },
      { name: 'author_id', type: 'INT', primaryKey: false, foreignKey: 'authors.id', nullable: false },
      { name: 'isbn', type: 'VARCHAR', primaryKey: false, nullable: false },
      { name: 'published_year', type: 'INT', primaryKey: false, nullable: true },
    ]},
  ],
};

const COLUMN_TYPES: Column['type'][] = ['INT', 'VARCHAR', 'TEXT', 'BOOLEAN', 'DATE', 'DECIMAL'];

export function DataModelingTool() {
  const [tables, setTables] = useState<Table[]>(JSON.parse(JSON.stringify(PRESETS['E-commerce'])));
  const [selectedPreset, setSelectedPreset] = useState('E-commerce');
  const [viewSQL, setViewSQL] = useState(false);

  const loadPreset = (name: string) => {
    setSelectedPreset(name);
    setTables(JSON.parse(JSON.stringify(PRESETS[name])));
  };

  const addTable = () => {
    setTables(prev => [...prev, { name: `table_${prev.length + 1}`, columns: [] }]);
  };

  const removeTable = (idx: number) => {
    setTables(prev => prev.filter((_, i) => i !== idx));
  };

  const renameTable = (idx: number, name: string) => {
    setTables(prev => prev.map((t, i) => i === idx ? { ...t, name } : t));
  };

  const addColumn = (tableIdx: number) => {
    setTables(prev => prev.map((t, i) => i === tableIdx ? {
      ...t, columns: [...t.columns, { name: 'new_column', type: 'VARCHAR' as Column['type'], primaryKey: false, nullable: true }]
    } : t));
  };

  const removeColumn = (tableIdx: number, colIdx: number) => {
    setTables(prev => prev.map((t, i) => i === tableIdx ? {
      ...t, columns: t.columns.filter((_, j) => j !== colIdx)
    } : t));
  };

  const updateColumn = (tableIdx: number, colIdx: number, updates: Partial<Column>) => {
    setTables(prev => prev.map((t, i) => i === tableIdx ? {
      ...t, columns: t.columns.map((c, j) => j === colIdx ? { ...c, ...updates } : c)
    } : t));
  };

  const generateSQL = (): string => {
    const lines: string[] = [];
    for (const table of tables) {
      const cols = table.columns.map(c => {
        let def = `  ${c.name} ${c.type}`;
        if (c.primaryKey) def += ' PRIMARY KEY';
        if (c.foreignKey) def += ` REFERENCES ${c.foreignKey}`;
        if (!c.nullable) def += ' NOT NULL';
        return def;
      });
      lines.push(`CREATE TABLE ${table.name} (\n${cols.join(',\n')}\n);`);
    }
    return lines.join('\n\n');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="mb-8 rounded-2xl border border-border bg-surface/50 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-deeper border-b border-border">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold text-slate-800">Data Modeler</span>
          <span className="text-[10px] text-slate-700 font-mono bg-surface px-2 py-0.5 rounded">Schema Designer</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setViewSQL(!viewSQL)}
            className={`text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all ${viewSQL ? 'bg-blue-500/20 text-blue-600 border border-blue-500/30' : 'text-slate-600 hover:text-slate-700 border border-border'}`}>
            <Eye className="w-3 h-3 inline mr-1" />{viewSQL ? 'Model' : 'SQL'}
          </button>
          <button onClick={() => loadPreset(selectedPreset)} className="text-slate-500 hover:text-slate-700">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex gap-2 mb-4">
          {Object.keys(PRESETS).map(name => (
            <button key={name} onClick={() => loadPreset(name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedPreset === name ? 'bg-blue-500/20 text-blue-600 border border-blue-500/30' : 'bg-surface text-slate-600 hover:text-slate-700 border border-border'
              }`}>{name}</button>
          ))}
        </div>

        {viewSQL ? (
          <pre className="bg-slate-900 text-slate-300 p-4 rounded-xl text-xs font-mono leading-relaxed overflow-x-auto max-h-96">
            {generateSQL()}
          </pre>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
            {tables.map((table, tIdx) => (
              <div key={`${table.name}-${tIdx}`} className="bg-deeper rounded-xl border border-border">
                <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Table2 className="w-4 h-4 text-blue-500" />
                    <input value={table.name} onChange={e => renameTable(tIdx, e.target.value)}
                      className="bg-transparent text-slate-800 font-bold text-sm focus:outline-none border-b border-transparent focus:border-blue-500/50" />
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => addColumn(tIdx)} className="text-slate-500 hover:text-blue-600 p-1"><Plus className="w-3.5 h-3.5" /></button>
                    <button onClick={() => removeTable(tIdx)} className="text-slate-500 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                {table.columns.length === 0 && <p className="text-slate-500 text-xs p-3 italic">No columns. Click + to add.</p>}
                {table.columns.map((col, cIdx) => (
                  <div key={`${col.name}-${cIdx}`} className="flex items-center gap-2 px-3 py-1.5 border-b border-border/50 last:border-0">
                    {col.primaryKey ? <Key className="w-3.5 h-3.5 text-amber-500 shrink-0" /> : <div className="w-3.5 h-3.5 shrink-0" />}
                    <input value={col.name} onChange={e => updateColumn(tIdx, cIdx, { name: e.target.value })}
                      className="bg-transparent text-slate-700 text-xs font-mono focus:outline-none border-b border-transparent focus:border-blue-500/50 w-28" />
                    <select value={col.type} onChange={e => updateColumn(tIdx, cIdx, { type: e.target.value as Column['type'] })}
                      className="bg-surface text-slate-700 text-[10px] rounded px-1.5 py-0.5 border border-border focus:outline-none">
                      {COLUMN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {col.foreignKey && <span className="text-[10px] text-blue-600 font-mono">FK: {col.foreignKey}</span>}
                    <label className="flex items-center gap-1 ml-auto text-[10px] text-slate-500 cursor-pointer">
                      <input type="checkbox" checked={!col.nullable} onChange={e => updateColumn(tIdx, cIdx, { nullable: !e.target.checked })} className="accent-blue-500" />
                      NOT NULL
                    </label>
                    <button onClick={() => removeColumn(tIdx, cIdx)} className="text-slate-400 hover:text-red-500 p-0.5"><Trash2 className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            ))}
            <button onClick={addTable} className="w-full py-2 rounded-xl border-2 border-dashed border-border text-slate-500 hover:text-slate-700 hover:border-slate-300 text-sm font-medium transition-all flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Add Table
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
