import React, { useState } from 'react';
import { CheckCircle2, Terminal } from 'lucide-react';

export type ClassworkLanguage = 'python' | 'sql' | 'text' | 'bash';

export interface ParsedClasswork {
  task: string;
  language: ClassworkLanguage;
  code: string;
  expectedOutput: string;
  hint?: string;
}

interface ClassworkCardProps {
  classwork: ParsedClasswork;
  onComplete?: () => void;
}

export function ClassworkCard({ classwork, onComplete }: ClassworkCardProps) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    if (onComplete) onComplete();
  };

  return (
    <div className="not-prose my-6 rounded-xl border-2 border-indigo-500 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-indigo-100 border-b border-indigo-200">
        <div className="shrink-0 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
          {completed ? <CheckCircle2 className="w-4 h-4 text-white" /> : <span className="text-[11px] font-bold text-white">CW</span>}
        </div>
        <span className="text-sm font-bold text-indigo-800">Classwork</span>
        {completed && <span className="text-[11px] font-semibold text-emerald-700 ml-auto"><CheckCircle2 className="w-3.5 h-3.5 inline mr-0.5" />Done</span>}
      </div>

      <div className="px-4 py-3">
        <p className="text-sm text-gray-800 mb-3 leading-relaxed font-medium">{classwork.task}</p>

        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 border-b border-gray-800">
            <Terminal className="w-3 h-3 text-gray-500" />
            <span className="text-[10px] text-gray-500 font-medium uppercase">{classwork.language}</span>
          </div>
          <pre className="p-3 overflow-x-auto text-xs font-mono text-gray-200 leading-relaxed">{classwork.code}</pre>
        </div>

        <p className="text-xs text-gray-500 mt-2">Open your WSL2 terminal and try this yourself. Type the commands, don't copy-paste.</p>

        <button
          onClick={handleComplete}
          disabled={completed}
          className={`mt-3 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            completed
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {completed ? 'Completed' : 'Mark as Done'}
        </button>

        {classwork.hint && (
          <details className="mt-2">
            <summary className="text-xs text-gray-600 font-semibold cursor-pointer hover:text-gray-800">Need a hint?</summary>
            <p className="text-sm text-gray-700 mt-1 bg-gray-50 rounded-lg p-3 border border-gray-300">{classwork.hint}</p>
          </details>
        )}
      </div>
    </div>
  );
}

export function parseClassworks(content: string): { type: 'markdown' | 'classwork'; value: string; classwork?: ParsedClasswork }[] {
  const segments: { type: 'markdown' | 'classwork'; value: string; classwork?: ParsedClasswork }[] = [];
  const parts = content.split(/(?=:::classwork)/);
  for (const part of parts) {
    if (part.startsWith(':::classwork')) {
      const block = part.replace(/^:::classwork\s*\n?/, '').trim();
      const taskMatch = block.match(/^task:\s*(.+)/im);
      const langMatch = block.match(/^language:\s*(python|sql|text|bash)/im);
      const expectedMatch = block.match(/^expected:\s*(.+)/im);
      const hintMatch = block.match(/^hint:\s*(.+)/im);
      const codeMatch = block.match(/```(python|sql|text|bash)\s*\n([\s\S]*?)```/i);

      if (taskMatch && langMatch) {
        const lang = langMatch[1].toLowerCase() as ClassworkLanguage;
        if (codeMatch) {
          segments.push({
            type: 'classwork',
            value: part,
            classwork: {
              task: taskMatch[1].trim(),
              language: lang,
              code: codeMatch ? codeMatch[2].trim() : '',
              expectedOutput: expectedMatch ? expectedMatch[1].trim() : '',
              hint: hintMatch ? hintMatch[1].trim() : undefined,
            },
          });
        } else {
          segments.push({ type: 'markdown', value: part });
        }
      } else {
        segments.push({ type: 'markdown', value: part });
      }
    } else {
      segments.push({ type: 'markdown', value: part });
    }
  }
  return segments;
}
