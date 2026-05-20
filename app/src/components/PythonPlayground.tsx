import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, CheckCircle2, AlertCircle, Code } from 'lucide-react';
import { executePython, PythonOutput } from '../utils/pythonExecutor';

function extractPythonCode(content?: string): string | null {
  if (!content) return null;
  const regex = /```python(?:\\n|\n)([\s\S]*?)```/g;
  const blocks: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    blocks.push(match[1].trim());
  }
  return blocks.length > 0 ? blocks.join('\n\n') : null;
}

const pythonPresets: Record<string, string> = {
  'w13-d1': [
    '# Python basics: variables and types',
    'name = "Data Analyst"',
    'age = 28',
    'salary = 75000.50',
    'is_employed = True',
    '',
    'print(f"Name: {name}")',
    'print(f"Age: {age}")',
    'print(f"Salary: ${salary}")',
    'print(f"Employed: {is_employed}")',
    '',
    '# Lists',
    'skills = ["Python", "SQL", "Excel", "Tableau"]',
    'print("Skills:", skills)',
    'print("Number of skills:", len(skills))',
    'print("First skill:", skills[0])',
  ].join('\n'),
  'w13-d2': [
    '# Python: lists and loops',
    'numbers = [10, 25, 37, 42, 55, 68, 73]',
    'total = 0',
    '',
    'for num in numbers:',
    '    total += num',
    '    print(f"Added {num}, running total: {total}")',
    '',
    'print(f"Final total: {total}")',
    'print(f"Average: {total / len(numbers)}")',
    'print(f"Max: {max(numbers)}")',
    'print(f"Min: {min(numbers)}")',
    '',
    '# List comprehension',
    'squares = [n**2 for n in numbers]',
    'print(f"Squares: {squares}")',
  ].join('\n'),
  'w13-d3': [
    '# Python: functions and conditionals',
    'def analyze_sales(sales_list):',
    '    """Analyze a list of sales numbers."""',
    '    total = sum(sales_list)',
    '    avg = total / len(sales_list)',
    '    best = max(sales_list)',
    '    worst = min(sales_list)',
    '    ',
    '    print(f"Total Sales: ${total}")',
    '    print(f"Average: ${avg:.2f}")',
    '    print(f"Best: ${best}")',
    '    print(f"Worst: ${worst}")',
    '    ',
    '    if avg > 1000:',
    '        print("Status: Excellent performance!")',
    '    elif avg > 500:',
    '        print("Status: Good performance")',
    '    else:',
    '        print("Status: Needs improvement")',
    '    return total, avg',
    '',
    'monthly_sales = [1200, 950, 1400, 800, 1100, 1600]',
    'analyze_sales(monthly_sales)',
  ].join('\n'),
  'w13-d4': [
    '# Python: dictionaries and data structures',
    'employee = {',
    '    "name": "Alice Chen",',
    '    "department": "Data Science",',
    '    "salary": 95000,',
    '    "skills": ["Python", "SQL", "Machine Learning"],',
    '    "projects_completed": 12',
    '}',
    '',
    'print("Employee Profile:")',
    'for key, value in employee.items():',
    '    print(f"  {key}: {value}")',
    '',
    '# List of dictionaries',
    'employees = [',
    '    {"name": "Alice", "sales": 12000},',
    '    {"name": "Bob", "sales": 9500},',
    '    {"name": "Charlie", "sales": 15000},',
    ']',
    '',
    'print("Sales Report:")',
    'for emp in employees:',
    '    print(f"  {emp["name"]}: ${emp["sales"]}")',
    '',
    'total_sales = sum(emp["sales"] for emp in employees)',
    'print(f"Total Sales: ${total_sales}")',
  ].join('\n'),
  'w13-d5': [
    '# Python mini-project: data analysis tool',
    'import math',
    '',
    'data = [23, 45, 67, 12, 89, 34, 56, 78, 90, 11]',
    '',
    'def analyze(data):',
    '    n = len(data)',
    '    mean = sum(data) / n',
    '    variance = sum((x - mean) ** 2 for x in data) / n',
    '    std_dev = math.sqrt(variance)',
    '    sorted_data = sorted(data)',
    '    ',
    '    print(f"Dataset: {data}")',
    '    print("Analysis Results:")',
    '    print(f"  Count: {n}")',
    '    print(f"  Mean: {mean:.2f}")',
    '    print(f"  Median: {sorted_data[n//2] if n%2 else (sorted_data[n//2-1]+sorted_data[n//2])/2}")',
    '    print(f"  Std Dev: {std_dev:.2f}")',
    '    print(f"  Min: {min(data)}")',
    '    print(f"  Max: {max(data)}")',
    '    print(f"  Range: {max(data) - min(data)}")',
    '',
    'analyze(data)',
  ].join('\n'),
  'w15-d5': [
    '# Web scraping with requests + BeautifulSoup',
    'import requests',
    'from bs4 import BeautifulSoup',
    '',
    '# Fetch the demo products page',
    'response = requests.get("http://demo-shop.local/products")',
    'print(f"Status: {response.status_code}")',
    'print()',
    '',
    '# Parse HTML and extract product names and prices',
    'soup = BeautifulSoup(response.text, "html.parser")',
    'products = soup.find_all("div", class_="product")',
    'print(f"Found {len(products)} products:")',
    'print()',
    '',
    'for product in products:',
    '    name = product.find("h3").text',
    '    price = product.find("span", class_="price").text',
    '    rating = product.find("span", class_="rating").text',
    '    print(f"  {name} - {price} (Rating: {rating})")',
    '',
    '# Also try the customers page',
    'print()',
    'print("--- Now scraping customers ---")',
    'resp2 = requests.get("http://demo-shop.local/customers")',
    'soup2 = BeautifulSoup(resp2.text, "html.parser")',
    'rows = soup2.find_all("tr")',
    'for row in rows:',
    '    cells = row.find_all("td")',
    '    if cells:',
    '        print(f"  {cells[1].text}: {cells[4].text} orders")',
  ].join('\n'),
};

export function PythonPlayground({ topicId, topicTitle, content }: { topicId?: string; topicTitle?: string; content?: string }) {
  const [code, setCode] = useState('# Write Python code here');
  const [output, setOutput] = useState<PythonOutput[]>([]);
  const [loading, setLoading] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    const extracted = extractPythonCode(content);
    if (extracted) {
      setCode(extracted);
    } else if (topicId && pythonPresets[topicId]) {
      setCode(pythonPresets[topicId]);
    } else if (content) {
      setCode(content.slice(0, 200));
    }
    initialized.current = true;
  }, [topicId, content]);

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const handleRun = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setLoading(true);
    setOutput([]);
    timerRef.current = setTimeout(() => {
      const result = executePython(code);
      setOutput(result.length > 0 ? result : [{ type: 'info', text: '(no output)' }]);
      setLoading(false);
    }, 300);
  }, [code]);

  const handleClear = () => {
    setCode('');
    setOutput([]);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="mb-8 rounded-2xl border border-border bg-surface/50 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-deeper border-b border-border">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-slate-800">Python Playground</span>
          <span className="text-[10px] text-slate-700 font-mono bg-surface px-2 py-0.5 rounded">v3.12 Sim</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleRun} className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all">
            <Play className="w-3.5 h-3.5" /> Run
          </button>
          <button onClick={handleClear} className="text-slate-500 hover:text-slate-700"><RotateCcw className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        <textarea value={code} onChange={e => setCode(e.target.value)}
          className="w-full p-4 text-sm font-mono text-slate-800 bg-deeper focus:outline-none resize-none min-h-[250px]"
          placeholder="# Write Python code..." />

        <div className="p-4 bg-deeper/30 min-h-[250px] max-h-[400px] overflow-y-auto custom-scrollbar font-mono text-sm">
          {output.length === 0 && !loading && <span className="text-slate-500 italic">Run code to see output here...</span>}
          {loading && <span className="text-slate-500">Running...</span>}
          {output.map((o, i) => (
            <div key={i} className={`whitespace-pre-wrap ${o.type === 'stderr' ? 'text-red-600' : o.type === 'info' ? 'text-slate-500 italic' : 'text-slate-700'}`}>
              {o.type === 'stdout' && <CheckCircle2 className="w-3 h-3 inline mr-1 text-emerald-500" />}
              {o.type === 'stderr' && <AlertCircle className="w-3 h-3 inline mr-1 text-red-500" />}
              {o.text}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-2 bg-deeper/50 border-t border-border text-[10px] text-slate-500">
        Supports: variables, f-strings, print(), if/else, for loops, math, string methods (upper, lower, split, join, replace), list methods (append, pop, sort), builtins (len, str, int, range, sum, max, min, abs, round, sorted, enumerate)
      </div>
    </motion.div>
  );
}
