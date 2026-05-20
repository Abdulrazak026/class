import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import { BarChart3, LineChart, PieChart, LayoutDashboard, Plus, X } from 'lucide-react';

interface ChartDef {
  id: string;
  type: 'bar' | 'line' | 'pie' | 'table';
  title: string;
  metric: string;
  dimension: string;
}

const SAMPLE_DATA = {
  sales_by_region: [
    { region: 'North', sales: 45000, profit: 12000, orders: 320 },
    { region: 'South', sales: 38000, profit: 9500, orders: 280 },
    { region: 'East', sales: 52000, profit: 15000, orders: 410 },
    { region: 'West', sales: 41000, profit: 11000, orders: 350 },
  ],
  sales_by_month: [
    { month: 'Jan', sales: 42000, profit: 11000 },
    { month: 'Feb', sales: 38000, profit: 9800 },
    { month: 'Mar', sales: 51000, profit: 14000 },
    { month: 'Apr', sales: 47000, profit: 12500 },
    { month: 'May', sales: 55000, profit: 16000 },
    { month: 'Jun', sales: 49000, profit: 13200 },
  ],
  sales_by_product: [
    { product: 'Widget A', sales: 28000, profit: 8400 },
    { product: 'Widget B', sales: 35000, profit: 10500 },
    { product: 'Widget C', sales: 22000, profit: 6600 },
    { product: 'Widget D', sales: 18000, profit: 5400 },
    { product: 'Widget E', sales: 31000, profit: 9300 },
  ],
};

type DataKey = keyof typeof SAMPLE_DATA;

function generateColor(idx: number): string {
  const colors = ['#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#ec4899'];
  return colors[idx % colors.length];
}

function ChartRenderer({ chart, data }: { chart: ChartDef; data: Record<string, string | number>[] }) {
  const maxVal = Math.max(...data.map(d => Number(d[chart.metric] || 0)));

  if (chart.type === 'bar') {
    return (
      <div className="space-y-2">
        {data.map((d, i) => {
          const val = Number(d[chart.metric] || 0);
          const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-500 w-20 truncate text-right">{String(d[chart.dimension] || '')}</span>
              <div className="flex-1 bg-deeper rounded-full h-5 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2" style={{ width: `${pct}%`, backgroundColor: generateColor(i) }}>
                  <span className="text-[10px] font-bold text-white">{val.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (chart.type === 'line') {
    const points = data.map((d, i) => {
      const val = Number(d[chart.metric] || 0);
      return { x: i, y: val, label: String(d[chart.dimension] || ''), val };
    });
    const svgW = Math.max(data.length * 60, 200);

    return (
      <div className="relative h-40">
        <svg className="w-full h-full" viewBox={`0 0 ${svgW} 160`}>
          {points.map((p, i) => (
            <g key={i}>
              {i > 0 && (
                <line x1={(i-1)*60+30} y1={160-(points[i-1].val/maxVal)*130-15} x2={i*60+30} y2={160-(p.val/maxVal)*130-15} stroke="#7c3aed" strokeWidth="2" fill="none" />
              )}
              <circle cx={i*60+30} cy={160-(p.val/maxVal)*130-15} r="4" fill="#7c3aed" />
              <text x={i*60+30} y="155" textAnchor="middle" className="text-[10px] fill-gray-500">{p.label}</text>
              <text x={i*60+30} y={160-(p.val/maxVal)*130-20} textAnchor="middle" className="text-[9px] fill-gray-500 font-bold">{p.val.toLocaleString()}</text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (chart.type === 'pie') {
    const total = data.reduce((s, d) => s + Number(d[chart.metric] || 0), 0);
    let cumulative = 0;
    return (
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 100 100" className="w-32 h-32 shrink-0">
          {data.map((d, i) => {
            const val = Number(d[chart.metric] || 0);
            const pct = total > 0 ? val / total : 0;
            const startAngle = cumulative * 360;
            const endAngle = (cumulative + pct) * 360;
            cumulative += pct;
            const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
            const largeArc = pct > 0.5 ? 1 : 0;
            return <path key={i} d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={generateColor(i)} stroke="#1a1a2e" strokeWidth="1" />;
          })}
        </svg>
        <div className="space-y-1">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: generateColor(i) }} />
              <span className="text-slate-500">{String(d[chart.dimension] || '')}</span>
              <span className="font-bold text-slate-700">{Number(d[chart.metric] || 0).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-border">
          <th className="text-left py-1 font-semibold text-slate-500 uppercase">{chart.dimension}</th>
          <th className="text-right py-1 font-semibold text-slate-500 uppercase">{chart.metric}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={i} className="border-b border-border/50">
            <td className="py-1 text-slate-600">{String(d[chart.dimension] || '')}</td>
            <td className="py-1 text-right font-mono text-slate-700">{Number(d[chart.metric] || 0).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const CHART_TEMPLATES: ChartDef[] = [
  { id: 'c1', type: 'bar', title: 'Sales by Region', metric: 'sales', dimension: 'region' },
  { id: 'c2', type: 'line', title: 'Monthly Sales Trend', metric: 'sales', dimension: 'month' },
  { id: 'c3', type: 'bar', title: 'Sales by Product', metric: 'sales', dimension: 'product' },
  { id: 'c4', type: 'pie', title: 'Profit Distribution', metric: 'profit', dimension: 'region' },
];

export function BIDashboard({ topicId, topicTitle }: { topicId?: string; topicTitle?: string }) {
  const [charts, setCharts] = useState<ChartDef[]>(CHART_TEMPLATES.slice(0, 3));
  const [activeTab, setActiveTab] = useState<'builder' | 'preview'>('preview');

  const addChart = useCallback((template: ChartDef) => {
    if (!charts.find(c => c.title === template.title)) {
      setCharts(prev => [...prev, { ...template, id: `c${Date.now()}` }]);
    }
  }, [charts]);

  const removeChart = useCallback((id: string) => {
    setCharts(prev => prev.filter(c => c.id !== id));
  }, []);

  const availableToAdd = CHART_TEMPLATES.filter(t => !charts.find(c => c.title === t.title));

  const kpiSummary = useMemo(() => {
    let totalSales = 0;
    let totalProfit = 0;
    for (const row of SAMPLE_DATA.sales_by_region) {
      totalSales += Number(row.sales || 0);
      totalProfit += Number(row.profit || 0);
    }
    return { totalSales, totalProfit, avgOrderValue: Math.round(totalSales / 200) };
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 rounded-2xl border border-border bg-surface/50 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-deeper border-b border-border">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold text-slate-800">BI Dashboard Builder</span>
          <span className="text-[10px] text-slate-700 font-mono bg-surface px-2 py-0.5 rounded">Interactive</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab('preview')} className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${activeTab === 'preview' ? 'bg-accent text-white' : 'text-slate-600 hover:bg-surface'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('builder')} className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${activeTab === 'builder' ? 'bg-accent text-white' : 'text-slate-600 hover:bg-surface'}`}>Builder</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-4 py-4 bg-surface border-b border-border">
        <div className="bg-deeper rounded-xl p-3">
          <p className="text-[10px] font-bold text-accent uppercase tracking-wider">Total Sales</p>
          <p className="text-xl font-black text-slate-800 mt-1">${kpiSummary.totalSales.toLocaleString()}</p>
        </div>
        <div className="bg-deeper rounded-xl p-3">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Total Profit</p>
          <p className="text-xl font-black text-slate-800 mt-1">${kpiSummary.totalProfit.toLocaleString()}</p>
        </div>
        <div className="bg-deeper rounded-xl p-3">
          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Avg Order</p>
          <p className="text-xl font-black text-slate-800 mt-1">${kpiSummary.avgOrderValue}</p>
        </div>
      </div>

      {activeTab === 'builder' && (
        <div className="px-4 py-3 bg-deeper/30 border-b border-border">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Add Chart</p>
          <div className="flex flex-wrap gap-2">
            {availableToAdd.length > 0 ? availableToAdd.map(t => (
              <button key={t.id} onClick={() => addChart(t)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-surface text-slate-600 hover:border-accent/50 hover:text-accent transition-all border border-border">
                <Plus className="w-3 h-3" />
                {t.title}
              </button>
            )) : (
              <p className="text-xs text-slate-500 italic">All charts added.</p>
            )}
          </div>
        </div>
      )}

      <div className="p-4">
        {charts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {charts.map((chart) => {
              const dataKey = chart.dimension === 'month' ? 'sales_by_month' as DataKey
                : chart.dimension === 'region' ? 'sales_by_region' as DataKey
                : 'sales_by_product' as DataKey;
              const rawData = SAMPLE_DATA[dataKey];
              if (!rawData || !Array.isArray(rawData)) return null;
              const data = rawData as Record<string, string | number>[];

              return (
                <div key={chart.id} className="bg-deeper rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {chart.type === 'bar' && <BarChart3 className="w-4 h-4 text-accent" />}
                      {chart.type === 'line' && <LineChart className="w-4 h-4 text-accent" />}
                      {chart.type === 'pie' && <PieChart className="w-4 h-4 text-accent" />}
                      <h4 className="font-bold text-sm text-slate-800">{chart.title}</h4>
                    </div>
                    {activeTab === 'builder' && (
                      <button onClick={() => removeChart(chart.id)} className="text-slate-400 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                    )}
                  </div>
                  <ChartRenderer chart={chart} data={data} />
                </div>
              );
            }).filter(Boolean)}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 text-slate-400" />
            <p className="text-sm">Dashboard empty. Switch to Builder to add charts.</p>
          </div>
        )}
      </div>

      <div className="px-4 py-2 bg-deeper/50 border-t border-border text-[11px] text-slate-500 flex items-center gap-4">
        <span>Data: Sample Sales Dataset</span>
        <span>{charts.length} chart{charts.length !== 1 ? 's' : ''}</span>
      </div>
    </motion.div>
  );
}
