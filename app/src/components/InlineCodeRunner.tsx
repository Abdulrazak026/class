import React, { useState } from 'react';
import { Play, CheckCircle2, AlertCircle, Code, HelpCircle } from 'lucide-react';
import { executePython, PythonOutput } from '../utils/pythonExecutor';
import { executeSQL, QueryResult, DmlResult } from '../utils/sqlExecutor';
import { ClassworkLanguage } from './ClassworkCard';
import { explainSql, SqlStep } from '../utils/sqlExplainer';

interface InlineCodeRunnerProps {
  language: ClassworkLanguage;
  code: string;
  task?: string;
  initialCode?: string;
  expectedOutput?: string;
  showVerify?: boolean;
  onComplete?: () => void;
}

function checkTextAnswer(answer: string, expected: string): boolean {
  if (!expected) return false;
  if (expected.includes('||')) {
    const keywords = expected.split('||').map(k => k.trim().toLowerCase()).filter(Boolean);
    const lower = answer.toLowerCase();
    return keywords.every(k => lower.includes(k));
  }
  return answer.trim().toLowerCase() === expected.trim().toLowerCase();
}

export function InlineCodeRunner({ language, code, task, initialCode, expectedOutput, showVerify, onComplete }: InlineCodeRunnerProps) {
  const [editableCode, setEditableCode] = useState(initialCode ?? code);
  const [output, setOutput] = useState<{ type: 'stdout' | 'stderr'; text: string }[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState<'pass' | 'fail' | null>(null);
  const [ran, setRan] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const sqlSteps = language === 'sql' ? explainSql(editableCode) : [];

  const handleRun = () => {
    setError(null);
    setOutput(null);
    setVerified(null);
    setRan(true);

    try {
      if (language === 'python') {
        const pyOut = executePython(editableCode);
        setOutput(pyOut.map(o => ({ type: o.type === 'stderr' ? 'stderr' : 'stdout', text: o.text })));
      } else if (language === 'sql') {
        const sqlResult = executeSQL(editableCode);
        if ('error' in sqlResult) {
          setError(sqlResult.error);
        } else if ('command' in sqlResult) {
          setOutput([{ type: 'stdout', text: sqlResult.message }]);
        } else {
          const rows = sqlResult.rows.map(r => sqlResult.columns.map((c, idx) => r[sqlResult.columnKeys?.[idx] ?? ''] ?? r[sqlResult.columns[idx]] ?? '').join(' | ')).join('\n');
          const header = sqlResult.columns.join(' | ');
          setOutput([{ type: 'stdout', text: `${header}\n${'-'.repeat(header.length)}\n${rows}\n\n(${sqlResult.rows.length} rows)` }]);
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const handleVerify = () => {
    if (language === 'text') {
      const answer = editableCode.trim();
      if (!answer) return;
      if (!expectedOutput) {
        setVerified('fail');
        return;
      }
      const pass = checkTextAnswer(answer, expectedOutput);
      setVerified(pass ? 'pass' : 'fail');
      if (pass) {
        setCompleted(true);
        if (onComplete) onComplete();
      }
      return;
    }
    if (!output) return;
    if (!expectedOutput) {
      const hasOutput = output.some(o => o.text.length > 0 && !o.text.startsWith('Error'));
      setVerified(hasOutput ? 'pass' : 'fail');
      if (hasOutput) {
        setCompleted(true);
        if (onComplete) onComplete();
      }
      return;
    }
    const actual = output.map(o => o.text).join('\n').trim();
    const expected = expectedOutput.trim();
    setVerified(actual === expected ? 'pass' : 'fail');
    if (actual === expected) {
      setCompleted(true);
      if (onComplete) onComplete();
    }
  };

  const outputText = output?.map(o => o.text).join('\n') ?? '';
  const textareaClasses = 'w-full p-3 text-sm font-mono text-gray-900 bg-white focus:outline-none resize-none border-0';

  if (language === 'text') {
    return (
      <div className="not-prose my-4 rounded-xl border border-gray-400 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-200 border-b border-gray-400">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-gray-700" />
            <span className="text-xs font-bold text-gray-900 uppercase">Response</span>
          </div>
        </div>
        <div className="relative">
          <textarea value={editableCode}
            onChange={e => { setEditableCode(e.target.value); setVerified(null); setCompleted(false); }}
            className={textareaClasses}
            rows={4}
            placeholder="Type your answer here..."
            spellCheck={false} />
        </div>
        {!completed ? (
          <div className="px-4 py-2.5 border-t border-gray-400 bg-gray-100 flex items-center gap-3">
            <button onClick={handleVerify}
              className="text-xs font-bold px-4 py-1.5 rounded-md transition-colors bg-indigo-600 text-white hover:bg-indigo-700 border-0">
              Submit
            </button>
            {verified && (
              <span className={`text-xs font-bold ${verified === 'pass' ? 'text-emerald-700' : 'text-red-700'}`}>
                {verified === 'pass' ? <><CheckCircle2 className="w-4 h-4 inline mr-1" />Correct!</> : <><AlertCircle className="w-4 h-4 inline mr-1" />Not quite. Try again.</>}
              </span>
            )}
          </div>
        ) : (
          <div className="px-4 py-2.5 border-t border-gray-400 bg-emerald-50 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold text-emerald-900">Completed</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="not-prose my-4 rounded-xl border border-gray-400 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-200 border-b border-gray-400">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-gray-700" />
          <span className="text-xs font-bold text-gray-900 uppercase">{language}</span>
          {task && <span className="text-xs text-gray-700 ml-1 font-medium">{task}</span>}
        </div>
        <div className="flex items-center gap-1.5">
          {language === 'sql' && (
            <button onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center gap-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-md transition-colors border-0 cursor-pointer">
              <HelpCircle className="w-3.5 h-3.5" /> {showExplanation ? 'Hide Steps' : 'Explain'}
            </button>
          )}
          <button onClick={handleRun}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-md transition-colors border-0 cursor-pointer">
            <Play className="w-3.5 h-3.5" /> Run
          </button>
        </div>
      </div>

      <div className="relative">
        <textarea value={editableCode} onChange={e => { setEditableCode(e.target.value); setRan(false); setVerified(null); }}
          className={textareaClasses}
          rows={Math.min(Math.max(editableCode.split('\n').length, 2), 8)}
          spellCheck={false} />
      </div>

      {showExplanation && sqlSteps.length > 0 && (
        <div className="border-t border-gray-400 bg-indigo-50">
          <div className="px-4 py-3">
            <div className="text-xs text-indigo-700 font-bold uppercase mb-3 tracking-wider">&#9679; Execution Steps</div>
            <div className="space-y-3">
              {sqlSteps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-indigo-700">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <code className="block text-xs font-mono text-indigo-800 bg-indigo-100/50 px-2 py-1 rounded mb-1">{step.clause}</code>
                    <p className="text-xs text-indigo-700/80 leading-relaxed">{step.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {ran && (error || (output && output.length > 0)) && (
        <div className="border-t border-gray-400">
          {error && (
            <div className="px-4 py-2.5 bg-red-50 border-b border-gray-400 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
              <span className="text-sm font-medium text-red-900">{error}</span>
            </div>
          )}
          {output && output.length > 0 && (
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-400">
              <div className="text-xs text-gray-700 font-bold uppercase mb-2 tracking-wider">Output</div>
              <pre className="text-sm font-mono text-gray-900 whitespace-pre-wrap leading-relaxed">{outputText}</pre>
            </div>
          )}
          {showVerify && (
            <div className="px-4 py-2.5 bg-gray-100 flex items-center gap-3">
              <button onClick={handleVerify}
                className="text-xs font-bold px-4 py-1.5 rounded-md transition-colors bg-indigo-600 text-white hover:bg-indigo-700 border-0 cursor-pointer">
                Verify
              </button>
              {verified && (
                <span className={`text-xs font-bold ${verified === 'pass' ? 'text-emerald-800' : 'text-red-800'}`}>
                  {verified === 'pass' ? <><CheckCircle2 className="w-4 h-4 inline mr-1" />Correct!</> : <><AlertCircle className="w-4 h-4 inline mr-1" />Not quite. Try again.</>}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
