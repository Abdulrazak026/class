import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, RotateCcw, CheckCircle2, GitBranch } from 'lucide-react';

interface RemoteState {
  name: string;
  url: string;
  branches: { name: string; log: { hash: string; message: string; branch: string }[] }[];
}

interface GitState {
  log: { hash: string; message: string; branch: string }[];
  staged: string[];
  branch: string;
  branches: string[];
  files: { name: string; content: string; modified: boolean }[];
  remotes: RemoteState[];
}

const INITIAL_FILES = [
  { name: 'index.html', content: '<h1>Hello World</h1>', modified: false },
  { name: 'style.css', content: 'body { color: black; }', modified: false },
  { name: 'app.js', content: 'console.log("hi");', modified: false },
];

function shortHash(): string {
  return Math.random().toString(16).slice(2, 7);
}

export function GitTerminal() {
  const [state, setState] = useState<GitState>({
    log: [], staged: [], branch: 'main', branches: ['main'], files: INITIAL_FILES.map(f => ({ ...f })), remotes: [],
  });
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['Welcome to the Git Simulator! Try: git init, git add, git commit -m "message", git branch, git checkout', '', 'Type a command and press Enter.']);
  const [initDone, setInitDone] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [output]);

  const appendOutput = useCallback((...lines: string[]) => setOutput(prev => [...prev, ...lines]), []);

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    appendOutput(`$ ${trimmed}`);

    if (trimmed === 'git init') {
      setInitDone(true);
      appendOutput('Initialized empty Git repository in workspace/.git/');
    } else if (trimmed === 'git status') {
      if (!initDone) { appendOutput("fatal: not a git repository"); return; }
      appendOutput(`On branch ${state.branch}`);
      const modified = state.files.filter(f => f.modified);
      if (modified.length === 0 && state.staged.length === 0) appendOutput('nothing to commit, working tree clean');
      else {
        if (modified.length > 0) appendOutput('Changes not staged for commit:', ...modified.map(f => `  modified:   ${f.name}`));
        if (state.staged.length > 0) appendOutput('Changes to be committed:', ...state.staged.map(f => `  staged:   ${f}`));
      }
    } else if (trimmed === 'git add .' || trimmed === 'git add --all') {
      if (!initDone) { appendOutput("fatal: not a git repository"); return; }
      const modified = state.files.filter(f => f.modified);
      if (modified.length === 0) appendOutput('No changes to stage');
      else { setState(prev => ({ ...prev, staged: modified.map(f => f.name) })); appendOutput(...modified.map(f => `  staged: ${f}`)); }
    } else if (trimmed.startsWith('git add ')) {
      if (!initDone) { appendOutput("fatal: not a git repository"); return; }
      const fileName = trimmed.replace('git add ', '').trim();
      const file = state.files.find(f => f.name === fileName);
      if (file && file.modified) { setState(prev => ({ ...prev, staged: [...prev.staged.filter(s => s !== fileName), fileName] })); appendOutput(`  staged: ${fileName}`); }
      else appendOutput(`fatal: pathspec '${fileName}' did not match any files`);
    } else if (trimmed.startsWith('git commit')) {
      if (!initDone) { appendOutput("fatal: not a git repository"); return; }
      if (state.staged.length === 0) { appendOutput('nothing to commit (no changes staged)', '  use git add to stage changes'); return; }
      const msgMatch = trimmed.match(/-m ["'](.+?)["']/);
      const message = msgMatch ? msgMatch[1] : 'commit';
      const hash = shortHash();
      setState(prev => ({ ...prev, log: [...prev.log, { hash, message, branch: prev.branch }], staged: [], files: prev.files.map(f => prev.staged.includes(f.name) ? { ...f, modified: false } : f) }));
      appendOutput(`[${state.branch} ${hash}] ${message}`, `  ${state.staged.length} file(s) changed`);
    } else if (trimmed === 'git log') {
      if (!initDone) { appendOutput("fatal: not a git repository"); return; }
      if (state.log.length === 0) appendOutput('fatal: your current branch has no commits yet');
      else appendOutput(...state.log.map(c => `commit ${c.hash} (${c.branch})\n    ${c.message}`));
    } else if (trimmed === 'git branch') {
      if (!initDone) { appendOutput("fatal: not a git repository"); return; }
      appendOutput(...state.branches.map(b => b === state.branch ? `* ${b}` : `  ${b}`));
    } else if (trimmed.startsWith('git branch ')) {
      if (!initDone) { appendOutput("fatal: not a git repository"); return; }
      const newBranch = trimmed.replace('git branch ', '').trim();
      if (state.branches.includes(newBranch)) appendOutput(`fatal: a branch named '${newBranch}' already exists`);
      else { setState(prev => ({ ...prev, branches: [...prev.branches, newBranch] })); appendOutput(`Created branch '${newBranch}'`); }
    } else if (trimmed.startsWith('git checkout ')) {
      if (!initDone) { appendOutput("fatal: not a git repository"); return; }
      const target = trimmed.replace('git checkout ', '').trim();
      if (!state.branches.includes(target)) appendOutput(`error: pathspec '${target}' did not match any file(s) known to git`);
      else { setState(prev => ({ ...prev, branch: target })); appendOutput(`Switched to branch '${target}'`); }
    } else if (trimmed.startsWith('git merge ')) {
      if (!initDone) { appendOutput("fatal: not a git repository"); return; }
      const source = trimmed.replace('git merge ', '').trim();
      if (!state.branches.includes(source)) appendOutput(`merge: ${source} - not something we can merge`);
      else if (source === state.branch) appendOutput('Already up to date.');
      else {
        const sourceCommits = state.log.filter(c => c.branch === source);
        setState(prev => ({ ...prev, log: [...prev.log, ...sourceCommits.map(c => ({ ...c, branch: prev.branch }))] }));
        appendOutput(`Merge made by the 'recursive' strategy.\n  ${sourceCommits.length} commit(s) merged from ${source}`);
      }
    } else if (trimmed.startsWith('git remote add ')) {
      if (!initDone) { appendOutput("fatal: not a git repository"); return; }
      const parts = trimmed.replace('git remote add ', '').trim().split(/\s+/);
      const name = parts[0] || 'origin';
      const url = parts[1] || 'https://github.com/user/repo.git';
      if (state.remotes.find(r => r.name === name)) { appendOutput(`fatal: remote '${name}' already exists.`); return; }
      setState(prev => ({ ...prev, remotes: [...prev.remotes, { name, url, branches: [] }] }));
      appendOutput(`Added remote '${name}' at ${url}`);
    } else if (trimmed === 'git remote -v' || trimmed === 'git remote') {
      if (!initDone) { appendOutput("fatal: not a git repository"); return; }
      if (state.remotes.length === 0) appendOutput('No remotes configured.');
      else state.remotes.forEach(r => appendOutput(`${r.name}\t${r.url} (fetch)`, `${r.name}\t${r.url} (push)`));
    } else if (trimmed === 'git push' || trimmed.startsWith('git push ')) {
      if (!initDone) { appendOutput("fatal: not a git repository"); return; }
      if (state.remotes.length === 0) { appendOutput("fatal: No configured remote. Use 'git remote add origin <url>' first."); return; }
      if (state.log.length === 0) { appendOutput("Everything up-to-date (no commits to push)."); return; }
      const remoteName = trimmed === 'git push' ? 'origin' : trimmed.replace('git push ', '').trim().split(/\s+/)[0] || 'origin';
      setState(prev => {
        const remote = prev.remotes.find(r => r.name === remoteName);
        if (!remote) return prev;
        const existingBranch = remote.branches.find(b => b.name === prev.branch);
        const branchLog = prev.log.filter(c => c.branch === prev.branch);
        const updatedRemote = existingBranch
          ? { ...remote, branches: remote.branches.map(b => b.name === prev.branch ? { ...b, log: [...branchLog] } : b) }
          : { ...remote, branches: [...remote.branches, { name: prev.branch, log: [...branchLog] }] };
        return { ...prev, remotes: prev.remotes.map(r => r.name === remoteName ? updatedRemote : r) };
      });
      const targetRemote = state.remotes.find(r => r.name === remoteName);
      appendOutput(`Pushing to ${targetRemote?.url || remoteName}`, `To ${targetRemote?.url || remoteName}`, `   ${shortHash()}..${shortHash()}  ${state.branch} -> ${state.branch}`);
    } else if (trimmed === 'git pull' || trimmed.startsWith('git pull ')) {
      if (!initDone) { appendOutput("fatal: not a git repository"); return; }
      if (state.remotes.length === 0) { appendOutput("fatal: No configured remote."); return; }
      const pullRemoteName = trimmed === 'git pull' ? 'origin' : trimmed.replace('git pull ', '').trim().split(/\s+/)[0] || 'origin';
      const remote = state.remotes.find(r => r.name === pullRemoteName);
      const remoteBranch = remote.branches.find(b => b.name === state.branch);
      if (!remoteBranch || remoteBranch.log.length === 0) { appendOutput("Already up to date."); return; }
      const newCommits = remoteBranch.log.filter(rc => !state.log.find(lc => lc.hash === rc.hash));
      if (newCommits.length === 0) { appendOutput("Already up to date."); return; }
      setState(prev => ({ ...prev, log: [...prev.log, ...newCommits.map(c => ({ ...c, branch: prev.branch }))] }));
      appendOutput(`Pulling from ${remote.url}`, `Updating ${shortHash()}..${shortHash()}`, `Fast-forward`, `  ${newCommits.length} commit(s) pulled.`);
    } else if (trimmed.startsWith('git clone ')) {
      const url = trimmed.replace('git clone ', '').trim();
      setState({
        log: [{ hash: shortHash(), message: 'Initial commit (cloned)', branch: 'main' }],
        staged: [], branch: 'main', branches: ['main'],
        files: INITIAL_FILES.map(f => ({ ...f })),
        remotes: [{ name: 'origin', url, branches: [{ name: 'main', log: [{ hash: shortHash(), message: 'Initial commit (cloned)', branch: 'main' }] }] }],
      });
      setInitDone(true);
      appendOutput(`Cloning into '${url.split('/').pop()?.replace('.git','') || 'repo'}'...`, 'remote: Counting objects: 3, done.', 'Receiving objects: 100% (3/3), done.', 'Resolving deltas: 100%, done.');
    } else if (trimmed === 'clear') setOutput([]);
    else if (trimmed === 'help' || trimmed === 'git help') {
      appendOutput('Available commands:', '  git init', '  git status', '  git add <file>', '  git commit -m ""', '  git log', '  git branch', '  git checkout <n>', '  git merge <n>', '  git remote add origin <url>', '  git push', '  git pull', '  git clone <url>', '  clear', '  edit <file>', '  cat <file>', '  ls');
    } else if (trimmed.startsWith('edit ')) {
      const fileName = trimmed.replace('edit ', '').trim();
      const file = state.files.find(f => f.name === fileName);
      if (file) { setState(prev => ({ ...prev, files: prev.files.map(f => f.name === fileName ? { ...f, modified: true, content: f.content + '\n// edited' } : f) })); appendOutput(`Modified: ${fileName}`); }
      else appendOutput(`File not found: ${fileName}`);
    } else if (trimmed.startsWith('cat ')) {
      const fileName = trimmed.replace('cat ', '').trim();
      const file = state.files.find(f => f.name === fileName);
      if (file) appendOutput(file.content); else appendOutput(`File not found: ${fileName}`);
    } else if (trimmed === 'ls') appendOutput(...state.files.map(f => f.name + (f.modified ? ' (modified)' : '')));
    else appendOutput(`bash: ${trimmed.split(' ')[0]}: command not found`);
  }, [initDone, state, appendOutput]);

  const handleReset = () => {
    setState({ log: [], staged: [], branch: 'main', branches: ['main'], files: INITIAL_FILES.map(f => ({ ...f })), remotes: [] });
    setInitDone(false); setInput(''); setOutput(['Simulation reset. Type git init to start.']);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="mb-8 rounded-2xl border border-border bg-surface/50 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-deeper border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-slate-800">Git Terminal</span>
          <span className="text-[10px] text-slate-700 font-mono bg-surface px-2 py-0.5 rounded">Simulator</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <GitBranch className="w-3.5 h-3.5" />
            <span className="font-mono">{state.branch}</span>
            <span>{state.log.length} commit{state.log.length !== 1 ? 's' : ''}</span>
            {state.staged.length > 0 && <><span>|</span><span className="text-amber-600">{state.staged.length} staged</span></>}
          </div>
          <button onClick={handleReset} className="text-slate-500 hover:text-slate-700"><RotateCcw className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <div ref={outputRef} className="bg-slate-900 p-4 font-mono text-sm leading-relaxed overflow-y-auto max-h-80" style={{ minHeight: '200px' }}>
        {output.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap ${
            line.startsWith('$') ? 'text-emerald-400' : line.startsWith('fatal') || line.startsWith('error') ? 'text-red-400' :
            line.startsWith('*') ? 'text-emerald-300' : line.startsWith('commit') || line.startsWith('    ') ? 'text-slate-400' :
            line.startsWith('Modified') ? 'text-amber-300' : 'text-slate-300'
          }`}>{line}</div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-t border-slate-700">
        <span className="text-emerald-400 font-mono text-sm">$</span>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { handleCommand(input); setInput(''); } }}
          className="flex-1 bg-transparent text-slate-200 font-mono text-sm focus:outline-none placeholder-slate-600" placeholder="Type a command (try: help)" autoFocus />
      </div>
    </motion.div>
  );
}
