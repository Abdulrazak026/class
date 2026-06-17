import React, { useState, useMemo } from 'react';
import { Play, CheckCircle2, AlertCircle, Code, HelpCircle, Terminal, Edit3, Eye } from 'lucide-react';
import { executePython, PythonOutput } from '../utils/pythonExecutor';
import { executeSQL, QueryResult, DmlResult } from '../utils/sqlExecutor';
import { ClassworkLanguage } from './ClassworkCard';
import { explainSql, SqlStep } from '../utils/sqlExplainer';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-sql.min.js';
import 'prismjs/themes/prism-tomorrow.min.css';

interface InlineCodeRunnerProps {
  language: ClassworkLanguage;
  code: string;
  task?: string;
  initialCode?: string;
  expectedOutput?: string;
  showVerify?: boolean;
  onComplete?: () => void;
}

function simulateBash(code: string): string {
  const lines = code.trim().split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
  const outputs: string[] = [];
  for (const line of lines) {
    const cmd = line.trim();
    if (cmd.startsWith('ls')) {
      const target = cmd.includes(' ') ? cmd.split(/\s+/)[1] : '.';
      outputs.push(`$ ${cmd}`);
      if (target === '-la' || target === '-l' || cmd === 'ls -la' || cmd === 'ls -l') {
        outputs.push('total 64\ndrwxr-xr-x  2 root root  4096 Jun 16 10:00 .\ndrwxr-xr-x 24 root root  4096 Jun 16 09:30 ..\n-rw-r--r--  1 root root   220 Jun 16 09:30 .bash_logout\n-rw-r--r--  1 root root  3771 Jun 16 09:30 .bashrc\n-rw-r--r--  1 root root   898 Jun 16 09:30 .profile');
      } else {
        outputs.push('file1.txt  file2.txt  documents  pictures');
      }
    } else if (cmd.startsWith('cd ')) {
      outputs.push(`$ ${cmd}`);
    } else if (cmd.startsWith('pwd')) {
      outputs.push('$ pwd\n/home/user');
    } else if (cmd.startsWith('whoami')) {
      outputs.push('$ whoami\nuser');
    } else if (cmd.startsWith('uname -a')) {
      outputs.push('$ uname -a\nLinux kali 6.1.0-kali5-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.12-1kali2 (2023-02-23) x86_64 GNU/Linux');
    } else if (cmd.startsWith('ip a') || cmd.startsWith('ip addr')) {
      outputs.push('$ ip a\n1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default\n    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default\n    link/ether 08:00:27:ab:cd:ef brd ff:ff:ff:ff:ff:ff\n    inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0');
    } else if (cmd.startsWith('ping ')) {
      const target = cmd.split(/\s+/).slice(1).filter(s => !s.startsWith('-')).pop() || 'example.com';
      outputs.push(`$ ${cmd}\nPING ${target} (93.184.216.34) 56(84) bytes of data.\n64 bytes from ${target}: icmp_seq=1 ttl=56 time=12.3 ms\n64 bytes from ${target}: icmp_seq=2 ttl=56 time=11.8 ms\n64 bytes from ${target}: icmp_seq=3 ttl=56 time=12.1 ms\n\n--- ${target} ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 2002ms`);
    } else if (cmd.startsWith('ps aux')) {
      outputs.push('$ ps aux\nUSER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.4 169848 10044 ?        Ss   09:30   0:02 /sbin/init\nuser      1234  0.1  0.2  45678  5678 pts/0    Ss+  10:00   0:00 bash\nuser      1300  0.0  0.1  23456  3456 pts/1    Ss+  10:05   0:00 bash\nroot      1400  0.0  0.3  78901  6789 ?        Ss   09:31   0:00 /usr/sbin/sshd');
    } else if (cmd.startsWith('cat ')) {
      const file = cmd.slice(4).trim() || 'unknown';
      outputs.push(`$ ${cmd}\nContents of ${file}:\n[file content would be displayed]`);
    } else if (cmd.startsWith('grep ')) {
      outputs.push(`$ ${cmd}\nroot:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin`);
    } else if (cmd.match(/^(sudo\s+)?apt/)) {
      outputs.push(`$ ${cmd}\nReading package lists... Done\nBuilding dependency tree... Done\nAll packages are up to date.`);
    } else if (cmd.startsWith('chmod ')) {
      outputs.push(`$ ${cmd}`);
    } else if (cmd.startsWith('chown ')) {
      outputs.push(`$ ${cmd}`);
    } else if (cmd.startsWith('mkdir ')) {
      outputs.push(`$ ${cmd}`);
    } else if (cmd.startsWith('systemctl ')) {
      outputs.push(`$ ${cmd}`);
    } else if (cmd.startsWith('ufw ')) {
      outputs.push(`$ ${cmd}\nRules updated`);
    } else if (cmd.startsWith('ss ')) {
      outputs.push(`$ ${cmd}\nState     Recv-Q    Send-Q       Local Address:Port       Peer Address:Port\nLISTEN    0         128                0.0.0.0:22              0.0.0.0:*\nLISTEN    0         128                   [::]:22                 [::]:*\nESTAB     0         0             192.168.1.100:22         192.168.1.50:54321`);
    } else if (cmd.startsWith('ssh ')) {
      outputs.push(`$ ${cmd}\nThe authenticity of host '192.168.1.10' can't be established.\nAre you sure you want to continue connecting?`);
    } else if (cmd.startsWith('sudo ')) {
      outputs.push(`$ ${cmd}\n[sudo] password for user:\nCommand executed successfully.`);
    } else {
      outputs.push(`$ ${cmd}\nCommand executed. (simulated output)`);
    }
  }
  return outputs.join('\n');
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
  const [editing, setEditing] = useState(false);
  const sqlSteps = language === 'sql' ? explainSql(editableCode) : [];

  const highlightedCode = useMemo(() => {
    if (language === 'text') return null;
    try {
      const lang = Prism.languages[language];
      if (lang) return Prism.highlight(editableCode, lang, language);
    } catch {}
    return null;
  }, [editableCode, language]);

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
      } else if (language === 'bash') {
        const simulated = simulateBash(editableCode);
        setOutput([{ type: 'stdout', text: simulated }]);
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
      <div className={`flex items-center justify-between px-4 py-2.5 border-b border-gray-400 ${
        language === 'bash' ? 'bg-emerald-100' :
        language === 'python' ? 'bg-sky-100' :
        language === 'sql' ? 'bg-amber-100' :
        'bg-gray-200'
      }`}>
        <div className="flex items-center gap-2">
          {language === 'bash' ? <Terminal className="w-4 h-4 text-emerald-700" /> :
           <Code className="w-4 h-4 text-gray-700" />}
          <span className={`text-xs font-bold uppercase ${
            language === 'bash' ? 'text-emerald-800' :
            language === 'python' ? 'text-sky-800' :
            language === 'sql' ? 'text-amber-800' :
            'text-gray-900'
          }`}>{language === 'bash' ? 'Terminal' : language === 'python' ? 'Python' : language === 'sql' ? 'SQL' : language}</span>
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
        {editing || !highlightedCode ? (
          <textarea value={editableCode} onChange={e => { setEditableCode(e.target.value); setRan(false); setVerified(null); }}
            className={textareaClasses}
            rows={Math.min(Math.max(editableCode.split('\n').length, 2), 8)}
            spellCheck={false} />
        ) : (
          <pre className="m-0 p-3 text-sm font-mono leading-relaxed overflow-x-auto bg-[#2d2d2d] min-h-[3rem] cursor-text"
            style={{ borderRadius: 0 }}
            onClick={() => setEditing(true)}>
            <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          </pre>
        )}
        {!editing && highlightedCode && (
          <button onClick={(e) => { e.stopPropagation(); setEditing(true); }}
            className="absolute top-2 right-2 flex items-center gap-1 text-[10px] bg-gray-700/80 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded transition-colors border-0 cursor-pointer">
            <Edit3 className="w-3 h-3" /> Edit
          </button>
        )}
        {editing && highlightedCode && (
          <button onClick={() => setEditing(false)}
            className="absolute top-2 right-2 flex items-center gap-1 text-[10px] bg-gray-700/80 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded transition-colors border-0 cursor-pointer">
            <Eye className="w-3 h-3" /> View
          </button>
        )}
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
