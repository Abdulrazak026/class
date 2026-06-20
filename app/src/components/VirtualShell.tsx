import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal, Play, Trash2, Maximize2, Minimize2, Shield } from 'lucide-react';
import { ShellEngine, ShellOutput } from '../utils/shellEngine';

interface Line {
  type: 'input' | 'output' | 'system';
  text: string;
}

export function VirtualShell() {
  const [engine] = useState(() => new ShellEngine());
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: 'Welcome to CYBERCAMP-2026 Virtual Terminal v2.0' },
    { type: 'output', text: 'Type "help" for available commands. Type "exit" to close.' },
    { type: 'output', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [maximized, setMaximized] = useState(false);
  const [tabCompletion, setTabCompletion] = useState<string[] | null>(null);
  const [tabIdx, setTabIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const execute = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newLines: Line[] = [...lines, { type: 'input', text: `${engine.getPrompt()} ${trimmed}` }];
    setTabCompletion(null);

    if (trimmed === 'clear') {
      setLines([]);
      return;
    }

    const outputs = engine.execute(trimmed);
    for (const out of outputs) {
      if (out.type === 'system') {
        newLines.push({ type: 'system', text: out.text });
      } else {
        newLines.push({ type: 'output', text: out.text });
      }
    }

    if (outputs.length === 0 && trimmed !== 'clear') {
      newLines.push({ type: 'output', text: '' });
    }

    setLines(newLines);
    setHistory(prev => [...prev, trimmed]);
    setHistoryIdx(-1);
  }, [lines, engine]);

  const getCompletions = useCallback((partial: string): string[] => {
    const commands = ['ls', 'cd', 'cat', 'echo', 'pwd', 'whoami', 'id', 'head', 'tail', 'mkdir', 'touch', 'rm', 'cp', 'mv', 'chmod', 'chown', 'grep', 'find', 'wc', 'sort', 'uniq', 'ps', 'kill', 'who', 'ping', 'hostname', 'uname', 'date', 'uptime', 'free', 'df', 'sudo', 'su', 'clear', 'help', 'exit', 'man'];
    return commands.filter(c => c.startsWith(partial));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      execute(input);
      setInput('');
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx >= 0) {
        const idx = historyIdx + 1;
        if (idx >= history.length) { setHistoryIdx(-1); setInput(''); }
        else { setHistoryIdx(idx); setInput(history[idx]); }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const words = input.split(' ');
      if (words.length === 1) {
        const partial = words[0];
        const completions = getCompletions(partial);
        if (completions.length === 1) {
          setInput(completions[0] + ' ');
          setTabCompletion(null);
        } else if (completions.length > 1) {
          if (tabCompletion && tabCompletion.length > 0) {
            const nextIdx = (tabIdx + 1) % completions.length;
            setTabIdx(nextIdx);
            setInput(completions[nextIdx]);
          } else {
            setTabCompletion(completions);
            setTabIdx(0);
            setInput(completions[0]);
          }
        }
      }
    } else if (e.key === 'Escape') {
      setTabCompletion(null);
    }
  };

  return (
    <div className={`bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg transition-all ${
      maximized ? 'fixed inset-4 z-50' : 'my-6'
    }`}>
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <Terminal className="w-4 h-4 text-cyan-400 ml-2" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Virtual Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] text-gray-500">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span className="hidden sm:inline">Simulated Environment</span>
          </span>
          <button onClick={() => setMaximized(!maximized)}
            className="text-gray-500 hover:text-gray-300 transition-colors p-1 rounded hover:bg-gray-700 border-0 cursor-pointer">
            {maximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => setLines([
            { type: 'output', text: 'Welcome to CYBERCAMP-2026 Virtual Terminal v2.0' },
            { type: 'output', text: 'Type "help" for available commands. Type "exit" to close.' },
            { type: 'output', text: '' },
          ])}
            className="text-gray-500 hover:text-gray-300 transition-colors p-1 rounded hover:bg-gray-700 border-0 cursor-pointer"
            title="Clear">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div
        className={`font-mono text-sm leading-relaxed overflow-y-auto custom-scrollbar ${
          maximized ? 'h-[calc(100%-48px)]' : 'max-h-[500px]'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="p-4">
          {lines.map((line, i) => {
            if (line.type === 'input') {
              return (
                <div key={i} className="flex items-start gap-2 mb-1">
                  <span className="text-emerald-400 shrink-0 font-medium select-none">{'>'}</span>
                  <span className="text-gray-200 whitespace-pre-wrap break-all">{line.text}</span>
                </div>
              );
            }
            if (line.type === 'system') {
              return (
                <div key={i} className="text-amber-400 italic mb-1 ml-4 text-xs">
                  {line.text}
                </div>
              );
            }
            if (line.text === '') return <div key={i} className="h-2" />;
            return (
              <pre key={i} className="text-gray-300 whitespace-pre-wrap mb-0.5 ml-4 font-mono text-sm leading-relaxed">
                {line.text}
              </pre>
            );
          })}

          {tabCompletion && tabCompletion.length > 1 && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 my-2 ml-4 flex flex-wrap gap-1.5">
              {tabCompletion.map((c, i) => (
                <span key={c} className={`text-xs px-2 py-0.5 rounded ${
                  i === tabIdx ? 'bg-cyan-600 text-white' : 'text-gray-400 bg-gray-700/50'
                }`}>{c}</span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 mt-2">
            <span className="text-emerald-400 font-medium shrink-0 select-none">{engine.getPrompt()}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => { setInput(e.target.value); setTabCompletion(null); }}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-gray-200 outline-none border-none font-mono text-sm placeholder-gray-600"
              placeholder="Type a command..."
              spellCheck={false}
              autoComplete="off"
              autoFocus
            />
          </div>
          <div ref={endRef} />
        </div>
      </div>
      <div className="px-4 py-1.5 bg-gray-800/50 border-t border-gray-700 flex items-center gap-3">
        <Play className="w-3 h-3 text-gray-500" />
        <span className="text-[10px] text-gray-500">
          Try: <span className="text-gray-400">ls -la /home/student</span>
          {' | '}
          <span className="text-gray-400">cat /etc/hosts</span>
          {' | '}
          <span className="text-gray-400">grep Failed /var/log/auth/auth.log</span>
        </span>
      </div>
    </div>
  );
}
