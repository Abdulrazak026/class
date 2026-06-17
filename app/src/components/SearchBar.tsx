import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { search as flexSearch, initSearch, SearchResult } from '../utils/search';

interface SearchBarProps {
  onSelectTopic: (topicId: string) => void;
}

export function SearchBar({ onSelectTopic }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { initSearch(); }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (query.length < 2) { setResults([]); setOpen(false); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      const r = await flexSearch(query);
      setResults(r);
      setOpen(r.length > 0);
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = useCallback((id: string) => {
    setOpen(false);
    setQuery('');
    setResults([]);
    onSelectTopic(id);
  }, [onSelectTopic]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
  };

  return (
    <div ref={containerRef} className="relative mx-2 mb-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-400" />
        <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} onFocus={() => query.length >= 2 && results.length > 0 && setOpen(true)}
          placeholder="Search topics..."
          className="w-full bg-gray-100 border border-gray-200 rounded-lg pl-8 pr-8 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50" />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]); setOpen(false); }}
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"><X className="w-3.5 h-3.5" /></button>
        )}
      </div>
      {open && (
        <div className="absolute z-50 top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
          {results.map(r => (
            <button key={r.id} onClick={() => handleSelect(r.id)}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors">
              <p className="text-xs font-semibold text-gray-800 truncate">{r.title}</p>
              <p className="text-[10px] text-gray-500 truncate">{r.description}</p>
            </button>
          ))}
        </div>
      )}
      {loading && query.length >= 2 && (
        <div className="absolute z-50 top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg px-3 py-3 text-center text-xs text-gray-400">Searching...</div>
      )}
    </div>
  );
}
