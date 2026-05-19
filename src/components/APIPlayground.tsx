import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Send, RotateCcw, CheckCircle2, Terminal, Copy, Loader } from 'lucide-react';

interface Endpoint {
  method: 'GET' | 'POST';
  path: string;
  description: string;
  response: string;
  requestBody?: string;
}

const ENDPOINTS: Endpoint[] = [
  {
    method: 'GET',
    path: '/api/customers',
    description: 'List all customers',
    response: JSON.stringify([
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', total_orders: 12 },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', total_orders: 8 },
      { id: 3, name: 'Carol White', email: 'carol@example.com', total_orders: 3 },
    ], null, 2),
  },
  {
    method: 'GET',
    path: '/api/customers/:id',
    description: 'Get a single customer by ID',
    response: JSON.stringify({ id: 1, name: 'Alice Johnson', email: 'alice@example.com', total_orders: 12, joined: '2024-01-15', lifetime_value: 3420.50 }, null, 2),
  },
  {
    method: 'GET',
    path: '/api/products',
    description: 'List all products with inventory',
    response: JSON.stringify([
      { id: 1, name: 'Wireless Mouse', price: 29.99, stock: 150, category: 'Electronics' },
      { id: 2, name: 'USB-C Hub', price: 49.99, stock: 82, category: 'Electronics' },
      { id: 3, name: 'Desk Lamp', price: 39.99, stock: 200, category: 'Office' },
    ], null, 2),
  },
  {
    method: 'POST',
    path: '/api/orders',
    description: 'Create a new order',
    requestBody: JSON.stringify({ customer_id: 1, items: [{ product_id: 1, quantity: 2 }] }, null, 2),
    response: JSON.stringify({ id: 101, customer_id: 1, status: 'created', total: 59.98, created_at: '2025-05-08T10:30:00Z' }, null, 2),
  },
  {
    method: 'GET',
    path: '/api/analytics/sales-summary',
    description: 'Get sales summary statistics',
    response: JSON.stringify({ total_revenue: 48250.00, total_orders: 345, avg_order_value: 139.86, top_category: 'Electronics', period: '2025-04-01 to 2025-04-30' }, null, 2),
  },
  {
    method: 'GET',
    path: '/api/analytics/daily-sales',
    description: 'Get daily sales data for the last 30 days',
    response: JSON.stringify([
      { date: '2025-04-08', revenue: 1850.00, orders: 14 },
      { date: '2025-04-09', revenue: 2100.50, orders: 17 },
      { date: '2025-04-10', revenue: 1620.75, orders: 11 },
    ], null, 2),
  },
];

export function APIPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<number>(0);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [latency, setLatency] = useState<number | null>(null);

  const endpoint = ENDPOINTS[selectedEndpoint];

  const handleSend = () => {
    setLoading(true);
    setResponse(null);
    setStatusCode(null);
    setLatency(null);
    const start = performance.now();
    setTimeout(() => {
      const elapsed = Math.round(performance.now() - start);
      setResponse(endpoint.response);
      setStatusCode(endpoint.method === 'GET' ? 200 : 201);
      setLatency(elapsed);
      setLoading(false);
    }, 600 + Math.random() * 400);
  };

  const copyResponse = () => {
    if (response) navigator.clipboard?.writeText(response);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="mb-8 rounded-2xl border border-border bg-surface/50 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-deeper border-b border-border">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-semibold text-slate-800">API Playground</span>
          <span className="text-[10px] text-slate-500 font-mono bg-slate-800 px-2 py-0.5 rounded">REST Client</span>
        </div>
        <button onClick={() => { setResponse(null); setStatusCode(null); setLatency(null); }}
          className="text-slate-500 hover:text-slate-700"><RotateCcw className="w-3.5 h-3.5" /></button>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-1.5 max-h-36 overflow-y-auto custom-scrollbar">
          {ENDPOINTS.map((ep, i) => (
            <button key={i} onClick={() => { setSelectedEndpoint(i); setResponse(null); setStatusCode(null); setLatency(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                i === selectedEndpoint ? 'bg-sky-500/10 border border-sky-500/30 text-sky-300' : 'text-slate-600 hover:text-slate-800 border border-transparent'
              }`}>
              <span className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold ${
                ep.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}>{ep.method}</span>
              <span className="font-mono truncate">{ep.path}</span>
              <span className="ml-auto text-slate-600">{ep.description}</span>
            </button>
          ))}
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className={`shrink-0 px-2.5 py-1 rounded text-xs font-bold ${
              endpoint.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
            }`}>{endpoint.method}</span>
            <span className="font-mono text-sm text-slate-200">{endpoint.path}</span>
            <button onClick={handleSend} disabled={loading}
              className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/50 text-white text-xs font-bold transition-all">
              {loading ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>

          {endpoint.method === 'POST' && endpoint.requestBody && (
            <div className="mb-3">
              <p className="text-[10px] text-slate-500 font-medium mb-1">Request Body</p>
              <pre className="bg-slate-900 text-slate-400 p-3 rounded-lg text-[11px] font-mono leading-relaxed overflow-x-auto">{endpoint.requestBody}</pre>
            </div>
          )}

          {response && (
            <div>
              <div className="flex items-center gap-3 mb-1">
                <p className="text-[10px] text-slate-500 font-medium">Response</p>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  statusCode && statusCode < 300 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}>{statusCode}</span>
                {latency !== null && <span className="text-[10px] text-slate-600 font-mono">{latency}ms</span>}
                <button onClick={copyResponse} className="ml-auto text-slate-600 hover:text-slate-400"><Copy className="w-3 h-3" /></button>
              </div>
              <pre className="bg-slate-900 text-slate-300 p-3 rounded-lg text-[11px] font-mono leading-relaxed overflow-x-auto max-h-48">{response}</pre>
            </div>
          )}

          {!response && !loading && (
            <div className="flex items-center justify-center py-6 text-slate-600 text-xs">
              <Terminal className="w-4 h-4 mr-2" />
              Click Send to execute the request
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
