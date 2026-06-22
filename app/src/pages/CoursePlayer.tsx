import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Module, Topic } from '../data';
import { Menu, PlayCircle, BookOpen, Presentation, CheckCircle2, XCircle, RefreshCw, ListChecks, MessageSquare, Send, ChevronLeft, ChevronRight, Wifi, Lightbulb, AlertTriangle, Info, Terminal, Home, BarChart3, MessageSquare as MessageSquareIcon, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'motion/react';
import { SqlPlayground } from '../components/SqlPlayground';
import { GitTerminal } from '../components/GitTerminal';
import { PythonPlayground } from '../components/PythonPlayground';
import { QuizModal } from '../components/QuizModal';
import { ScenarioPlayer } from '../components/ScenarioPlayer';
import { APIPlayground } from '../components/APIPlayground';
import { TerminalSimulator } from '../components/TerminalSimulator';
import { VirtualShell } from '../components/VirtualShell';
import { InlineCodeRunner } from '../components/InlineCodeRunner';
import { ClassworkCard, parseClassworks, ParsedClasswork } from '../components/ClassworkCard';
import { TopicComment } from '../firebase/services';
import { hasFirebaseConfig } from '../firebase/config';
import { getClassworks, loadModuleContent } from '../utils/dataLoader';
import { SearchBar } from '../components/SearchBar';
import { InfoBox, WarningBox, TipBox, DangerBox, ConceptCard, LearningObjectives, StepGuide, SummaryCard, CodeBlock } from '../components/ContentComponents';
import { parseContentDirectives, ParsedCheckpoint, ContentSegment } from '../utils/contentParser';
import type { Tab } from '../App';

interface CheckpointState {
  selected: number | null;
  revealed: boolean;
}

interface CoursePlayerProps {
  curriculum: Module[];
  completedTasks: string[];
  toggleTask: (taskId: string) => void;
  activeTopicId: string | null;
  setActiveTopicId: (id: string) => void;
  topicComments: TopicComment[];
  onAddComment: (topicId: string, text: string) => void;
  userCode: string;
  setActiveTab: (tab: Tab) => void;
}

function parseCheckpoints(content: string): ContentSegment[] {
  return parseContentDirectives(content);
}

const getIcon = (type: string) => {
  switch(type) {
    case 'learn': return <PlayCircle className="w-4 h-4" />;
    case 'practice': return <BookOpen className="w-4 h-4" />;
    case 'project': return <Presentation className="w-4 h-4" />;
    case 'review': return <RefreshCw className="w-4 h-4" />;
    default: return <PlayCircle className="w-4 h-4" />;
  }
};

const APP_TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Overview', icon: <Home className="w-4 h-4" /> },
  { id: 'syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'projects', label: 'Projects', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'studyroom', label: 'Study Room', icon: <MessageSquareIcon className="w-4 h-4" /> },
];

function TabBar({ activeTab, setActiveTab, isMobile }: { activeTab: Tab; setActiveTab: (t: Tab) => void; isMobile?: boolean }) {
  return (
    <div className={`flex gap-0.5 ${isMobile ? 'px-2 py-2' : 'px-2 py-1.5'}`}>
      {APP_TABS.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isActive ? 'bg-accent text-white shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}>
            {tab.icon}
            {isMobile && <span>{tab.label}</span>}
          </button>
        );
      })}
    </div>
  );
}

function SidebarTopicList({ curriculum, completedTasks, activeTopicId, onSelect }: {
  curriculum: Module[]; completedTasks: string[]; activeTopicId: string | null; onSelect: (id: string) => void;
}) {
  return curriculum.map((mod, mIdx) => {
    const completedInMod = mod.topics.filter(t => completedTasks.includes(t.id)).length;
    const modProgress = mod.topics.length > 0 ? Math.round((completedInMod / mod.topics.length) * 100) : 0;
    return (
    <div key={mod.id} className="mb-3">
      <div className="flex items-center justify-between px-3 py-2">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{mod.title}</h3>
        <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{completedInMod}/{mod.topics.length}</span>
      </div>
      <div className="mx-3 mb-2 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all duration-500" style={{ width: `${modProgress}%` }} />
      </div>
      {mod.topics.map((topic, tIdx) => {
        const done = completedTasks.includes(topic.id);
        const isActive = activeTopicId === topic.id;
        return (
          <button key={topic.id} onClick={() => onSelect(topic.id)}
            className={`w-full text-left p-2.5 rounded-lg flex items-start gap-3 transition-all mx-1 ${
              isActive ? 'bg-accent/5 border border-accent/20 text-gray-900' : 
              done ? 'bg-emerald-50 hover:bg-emerald-100 text-gray-700 border border-transparent' :
              'hover:bg-gray-100 text-gray-600 border border-transparent'
            }`}>
            <div className={`mt-0.5 shrink-0 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
              isActive ? 'bg-accent text-white' : done ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>{done ? <CheckCircle2 className="w-3.5 h-3.5" /> : tIdx + 1}</div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate leading-tight ${isActive ? 'text-gray-900' : done ? 'text-emerald-700' : 'text-gray-700'}`}>{topic.title}</p>
              <div className={`flex items-center gap-1.5 mt-0.5 text-[10px] font-mono ${isActive ? 'text-accent' : 'text-gray-400'}`}>
                {getIcon(topic.type)} <span className="uppercase">{topic.type}</span> • <span>{topic.duration}</span>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )});
}

function MobileSidebarContent(props: { curriculum: Module[]; completedTasks: string[]; activeTopicId: string | null; onSelect: (id: string) => void }) {
  return <div className="overflow-y-auto flex-1 p-2 custom-scrollbar"><SearchBar onSelectTopic={props.onSelect} /><SidebarTopicList {...props} /></div>;
}

function DesktopSidebarContent(props: { curriculum: Module[]; completedTasks: string[]; activeTopicId: string | null; onSelect: (id: string) => void }) {
  return <><SearchBar onSelectTopic={props.onSelect} /><SidebarTopicList {...props} /></>;
}

const MarkdownComponents = {
  table({ children, ...props }: any) {
    return (
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse" {...props}>{children}</table>
      </div>
    );
  },
  thead({ children, ...props }: any) {
    return <thead className="border-b-2 border-gray-200" {...props}>{children}</thead>;
  },
  tbody({ children, ...props }: any) {
    return <tbody {...props}>{children}</tbody>;
  },
  tr({ children, ...props }: any) {
    return <tr className="border-b border-gray-100 hover:bg-gray-50/50" {...props}>{children}</tr>;
  },
  th({ children, ...props }: any) {
    return <th className="text-left px-4 py-3 font-bold text-gray-900 bg-gray-50 text-sm" {...props}>{children}</th>;
  },
  td({ children, ...props }: any) {
    return <td className="px-4 py-3 text-gray-700 text-sm" {...props}>{children}</td>;
  },
  code({ className, children, ...props }: any) {
    const isInline = !className;
    if (isInline) {
      return <code className="bg-accent/10 text-accent px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>;
    }
    const match = /language-(\w+)/.exec(className || '');
    const lang = match?.[1];
    if (lang === 'python' || lang === 'sql' || lang === 'bash') {
      return <InlineCodeRunner language={lang === 'bash' ? 'bash' : lang} code={String(children).replace(/\n$/, '')} />;
    }
    return (
      <div className="bg-gray-900 rounded-lg sm:rounded-xl overflow-hidden my-4 border border-gray-800">
        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800/50 border-b border-gray-800">
          <Terminal className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Code</span>
        </div>
        <pre className="p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm font-mono text-gray-200 leading-relaxed">{children}</pre>
      </div>
    );
  },
  blockquote({ children, ...props }: any) {
    return (
      <div className="bg-accent/5 border-l-4 border-accent rounded-r-lg sm:rounded-r-xl px-4 sm:px-5 py-3 sm:py-4 my-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0 mt-0.5" />
          <div className="text-sm sm:text-base text-gray-600 italic">{children}</div>
        </div>
      </div>
    );
  },
  strong({ children, ...props }: any) {
    return <strong className="text-gray-900 font-extrabold bg-accent/5 px-1 rounded">{children}</strong>;
  },
  h2({ children, ...props }: any) {
    return <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mt-6 sm:mt-8 mb-3 sm:mb-4 pb-2 border-b border-gray-100 flex items-center gap-2"><BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />{children}</h2>;
  },
  h3({ children, ...props }: any) {
    return <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-4 sm:mt-6 mb-2 sm:mb-3 flex items-center gap-2">{children}</h3>;
  },
  ul({ children, ...props }: any) {
    return <ul className="space-y-1.5 my-3">{children}</ul>;
  },
  li({ children, ...props }: any) {
    return <li className="flex items-start gap-2 text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-2 shrink-0" />{children}</li>;
  },

};

function CheckpointCard({ checkpoint, checkpointIndex, onAnswer }: { checkpoint: ParsedCheckpoint; checkpointIndex: number; onAnswer: (idx: number, correct: boolean) => void }) {
  const [state, setState] = useState<CheckpointState>({ selected: null, revealed: false });
  const handleSelect = (idx: number) => {
    if (state.revealed) return;
    const correct = idx === checkpoint.correctIndex;
    setState({ selected: idx, revealed: true });
    onAnswer(checkpointIndex, correct);
  };
  const isCorrect = state.selected === checkpoint.correctIndex;
  return (
    <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 sm:p-5 my-4 sm:my-6">
      <p className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-[15px]">{checkpoint.question}</p>
      <div className="space-y-2">
        {checkpoint.options.map((opt, i) => {
          const selected = state.selected === i;
          const isRight = i === checkpoint.correctIndex;
          let btnClass = 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700';
          if (state.revealed && isRight) btnClass = 'border-green-500 bg-green-50 text-green-800';
          else if (state.revealed && selected && !isRight) btnClass = 'border-red-500 bg-red-50 text-red-800';
          return (
            <button key={i} onClick={() => handleSelect(i)} className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${btnClass}`}>
              <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                state.revealed && isRight ? 'border-green-500 bg-green-500 text-white' :
                state.revealed && selected && !isRight ? 'border-red-500 bg-red-500 text-white' :
                'border-gray-300 text-gray-500'
              }`}>{String.fromCharCode(65 + i)}</span>
              <span className="font-medium">{opt}</span>
              {state.revealed && isRight && <CheckCircle2 className="w-5 h-5 ml-auto shrink-0 text-green-500" />}
              {state.revealed && selected && !isRight && <XCircle className="w-5 h-5 ml-auto shrink-0 text-red-500" />}
            </button>
          );
        })}
      </div>
      {state.revealed && <p className={`mt-4 text-sm font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{isCorrect ? 'Correct!' : 'Not quite. Try again next time!'}</p>}
    </div>
  );
}

export function CoursePlayer({ curriculum, completedTasks, toggleTask, activeTopicId, setActiveTopicId, topicComments, onAddComment, userCode, setActiveTab }: CoursePlayerProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [checkpointResults, setCheckpointResults] = useState<Record<string, boolean>>({});
  const [commentInput, setCommentInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [fullModule, setFullModule] = useState<Module | null>(null);
  const [loadingModule, setLoadingModule] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSidebarOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (!activeTopicId) {
      if (curriculum[0]?.topics[0]) setActiveTopicId(curriculum[0].topics[0].id);
    }
  }, [activeTopicId, curriculum, setActiveTopicId]);

  // On-demand module content loading: index has metadata only, fetch full content when needed
  useEffect(() => {
    if (!activeTopicId || !activeModule) return;
    // Already loaded full content for this module
    if (fullModule?.id === activeModule.id) return;
    // Check if content is already available in the prop curriculum
    const curMod = curriculum.find(m => m.id === activeModule.id);
    if (curMod?.topics.some(t => t.content !== undefined)) return;
    setLoadingModule(true);
    loadModuleContent(activeModule.id).then(mod => {
      setFullModule(mod);
      setLoadingModule(false);
    }).catch(() => setLoadingModule(false));
  }, [activeTopicId]);

  let activeModule: Module | undefined;
  let activeTopic: Topic | undefined;
  let topicIndex = -1;
  let moduleIndex = -1;

  // Prefer fullModule (has content/quiz loaded on-demand) over curriculum prop (has metadata only)
  if (fullModule && activeTopicId) {
    const tIdx = fullModule.topics.findIndex(t => t.id === activeTopicId);
    if (tIdx !== -1) {
      moduleIndex = curriculum.findIndex(m => m.id === fullModule.id);
      activeModule = fullModule;
      activeTopic = fullModule.topics[tIdx];
      topicIndex = tIdx;
    }
  }

  // Fall back to curriculum prop
  if (!activeTopic) {
    for (let mIdx = 0; mIdx < curriculum.length; mIdx++) {
      const mod = curriculum[mIdx];
      const tIdx = mod.topics.findIndex(t => t.id === activeTopicId);
      if (tIdx !== -1) { moduleIndex = mIdx; activeModule = mod; activeTopic = mod.topics[tIdx]; topicIndex = tIdx; break; }
    }
  }

  const isCompleted = activeTopic ? completedTasks.includes(activeTopic.id) : false;
  const hasNextTopic = moduleIndex !== -1 && curriculum[moduleIndex] && (topicIndex < curriculum[moduleIndex].topics.length - 1 || moduleIndex < curriculum.length - 1);

  const parsedContent = useMemo(() => {
    if (!activeTopic?.content) return null;
    const checkpointSegments = parseCheckpoints(activeTopic.content);
    const segments: ContentSegment[] = [];
    for (const seg of checkpointSegments) {
      if (seg.type === 'checkpoint' || seg.type === 'info' || seg.type === 'warning' || seg.type === 'tip' || seg.type === 'danger' || seg.type === 'success' || seg.type === 'objectives' || seg.type === 'concept' || seg.type === 'steps' || seg.type === 'summary') {
        segments.push(seg);
      } else {
        const classworkParts = parseClassworks(seg.value);
        segments.push(...classworkParts);
      }
    }
    const classworks = getClassworks();
    const extraClassworks = classworks?.[activeTopic.id];
    if (extraClassworks) {
      for (const cw of extraClassworks) {
        segments.push({ type: 'classwork', value: '', classwork: cw });
      }
    }
    return segments;
  }, [activeTopic?.content, activeTopic?.id]);

  const addComment = () => {
    if (!activeTopic || !commentInput.trim()) return;
    onAddComment(activeTopic.id, commentInput.trim());
    setCommentInput('');
  };

  const handleCheckpointAnswer = useCallback((topicId: string, checkpointIndex: number, correct: boolean) => {
    setCheckpointResults(prev => ({ ...prev, [`${topicId}-${checkpointIndex}`]: correct }));
  }, []);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [activeTopic?.id]);

  useEffect(() => {
    if (!activeTopic || !activeTopic.content) return;
    const segments = parseCheckpoints(activeTopic.content);
    const checkpoints = segments.filter(s => s.type === 'checkpoint');
    if (checkpoints.length === 0) return;
    const allCorrect = checkpoints.every((_, idx) => checkpointResults[`${activeTopic.id}-${idx}`] === true);
    if (allCorrect && !completedTasks.includes(activeTopic.id)) toggleTask(activeTopic.id);
  }, [checkpointResults, activeTopic?.id, activeTopic?.content, completedTasks, toggleTask]);

  const handleNextTopic = () => {
    if (moduleIndex === -1) return;
    if (topicIndex < curriculum[moduleIndex].topics.length - 1) setActiveTopicId(curriculum[moduleIndex].topics[topicIndex + 1].id);
    else if (moduleIndex < curriculum.length - 1 && curriculum[moduleIndex + 1].topics.length > 0) setActiveTopicId(curriculum[moduleIndex + 1].topics[0].id);
  };

  const handlePrevTopic = () => {
    if (moduleIndex === -1) return;
    if (topicIndex > 0) setActiveTopicId(curriculum[moduleIndex].topics[topicIndex - 1].id);
    else if (moduleIndex > 0 && curriculum[moduleIndex - 1].topics.length > 0) setActiveTopicId(curriculum[moduleIndex - 1].topics[curriculum[moduleIndex - 1].topics.length - 1].id);
  };

  const wordMatch = useCallback((text: string, word: string): boolean => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('\\b' + escaped + '\\b', 'i').test(text);
  }, []);

  const shouldShowSql = useCallback((topic: Topic): boolean => {
    if (/^w(0[5-9]|1[0-2]|5|6|7|8|9|10|11|12)/.test(topic.id)) return true;
    const t = topic.title.toLowerCase(), d = topic.description.toLowerCase();
    return wordMatch(t, 'sql') || wordMatch(d, 'sql') || (topic.content && topic.content.includes('```sql')) || topic.content?.toLowerCase().includes('sql playground') === true;
  }, [wordMatch]);

  const shouldShowGit = useCallback((topic: Topic): boolean => {
    const kw = ['git', 'commit', 'branch', 'merge', 'push', 'pull', 'github', 'version control'];
    const t = topic.title.toLowerCase(), d = topic.description.toLowerCase();
    return kw.some(k => t.includes(k) || d.includes(k));
  }, []);

  const shouldShowPython = useCallback((topic: Topic): boolean => {
    if (/^w(07|13|14|15|16|17|7|13|14|15|16|17)/.test(topic.id)) return true;
    const t = topic.title.toLowerCase(), d = topic.description.toLowerCase();
    return wordMatch(t, 'python') || wordMatch(d, 'python') || (topic.content && topic.content.includes('```python')) || topic.content?.toLowerCase().includes('python playground') === true;
  }, [wordMatch]);

  const shouldShowScenario = useCallback((topic: Topic): boolean => {
    const kw = ['scenario', 'decision', 'case study', 'business case', 'analytical thinking', 'capstone', 'incident response'];
    const t = topic.title.toLowerCase(), d = topic.description.toLowerCase();
    return kw.some(k => t.includes(k) || d.includes(k)) || (topic.content && topic.content.includes(':::checkpoint'));
  }, []);

  const shouldShowAPI = useCallback((topic: Topic): boolean => {
    const kw = ['api', 'rest', 'endpoint', 'request', 'response'];
    const t = topic.title.toLowerCase(), d = topic.description.toLowerCase();
    return kw.some(k => t.includes(k) || d.includes(k));
  }, []);

  const shouldShowBash = useCallback((topic: Topic): boolean => {
    if (/^w(0[1-6]|01|02|03|04|05|06|1|2|3|4|5|6)/.test(topic.id)) return true;
    if (topic.content && topic.content.includes('```bash')) return true;
    const kw = ['terminal', 'command line', 'bash', 'shell', 'linux command', 'powershell', 'cli'];
    const t = topic.title.toLowerCase(), d = topic.description.toLowerCase();
    return kw.some(k => t.includes(k) || d.includes(k));
  }, []);

  const shouldShowTerminal = useCallback((topic: Topic): boolean => {
    if (/^w(0[1-6]|01|02|03|04|05|06|1|2|3|4|5|6)/.test(topic.id)) return true;
    const kw = ['terminal', 'network', 'security tool', 'scan', 'ping', 'nmap', 'wireshark', 'tcpdump'];
    const t = topic.title.toLowerCase(), d = topic.description.toLowerCase();
    return kw.some(k => t.includes(k) || d.includes(k));
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)] lg:h-screen bg-gray-50 max-w-[1600px] mx-auto border-x border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      {/* Mobile overlay sidebar */}
      {isMobile && (
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
              <motion.aside initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="fixed left-0 top-0 bottom-0 w-72 z-40 bg-white border-r border-gray-200 flex flex-col lg:hidden">
                <TabBar activeTab="syllabus" setActiveTab={setActiveTab} isMobile />
                <div className="px-4 py-2 border-b border-gray-200 shrink-0 flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-gray-900">Course Contents</h2>
                    <p className="text-xs text-gray-400 mt-1">{completedTasks.length} / {curriculum.reduce((sum, m) => sum + m.topics.length, 0)} tasks</p>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <MobileSidebarContent curriculum={curriculum} completedTasks={completedTasks} activeTopicId={activeTopicId} onSelect={setActiveTopicId} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      )}

      {/* Desktop push sidebar */}
      {!isMobile && (
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 320, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
              className="shrink-0 border-r border-gray-200 bg-white flex flex-col h-full overflow-hidden">
              <div className="shrink-0">
                <TabBar activeTab="syllabus" setActiveTab={setActiveTab} />
                <div className="px-4 py-2 border-b border-gray-200">
                  <h2 className="font-bold text-gray-900">Course Contents</h2>
                  <p className="text-xs text-gray-400 mt-1">{completedTasks.length} / {curriculum.reduce((sum, m) => sum + m.topics.length, 0)} tasks</p>
                </div>
              </div>
              <div className="overflow-y-auto flex-1 p-2 custom-scrollbar">
                <DesktopSidebarContent curriculum={curriculum} completedTasks={completedTasks} activeTopicId={activeTopicId} onSelect={setActiveTopicId} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div className="flex-1 flex flex-col h-full bg-gray-50 relative">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="absolute top-4 left-4 z-20 bg-white border border-gray-200 text-gray-500 p-2 rounded-lg hover:bg-gray-100 shadow-sm"><Menu className="w-5 h-5" /></button>

        <div ref={contentRef} className="flex-1 overflow-y-auto px-4 py-8 sm:px-10 md:px-16 sm:py-16 custom-scrollbar">
          <AnimatePresence mode="wait">
          {activeTopic ? (
            <motion.div key={activeTopic.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="max-w-3xl mx-auto">
              
              <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-accent tracking-wider uppercase">
                  <span className="truncate max-w-[200px] sm:max-w-none">{activeModule?.title}</span>
                  <span className="text-gray-300">/</span>
                  <span className="text-gray-400 font-mono shrink-0">Topic {topicIndex + 1}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{activeTopic.title}</h1>
              </div>

              {shouldShowSql(activeTopic) && <SqlPlayground topicTitle={activeTopic.title} content={activeTopic.content} />}
              {shouldShowGit(activeTopic) && <GitTerminal />}
              {shouldShowPython(activeTopic) && <PythonPlayground topicId={activeTopic.id} topicTitle={activeTopic.title} content={activeTopic.content} />}
              {shouldShowScenario(activeTopic) && <ScenarioPlayer />}
              {shouldShowAPI(activeTopic) && <APIPlayground />}
              {shouldShowTerminal(activeTopic) && <VirtualShell />}

              {activeTopic.requirements && activeTopic.requirements.length > 0 && (
                <div className="mb-10 bg-white border border-accent/20 rounded-xl p-6">
                  <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4"><ListChecks className="w-5 h-5 text-accent" /> Project Requirements</h3>
                  <ul className="space-y-3">{activeTopic.requirements.map((req, i) => (
                    <li key={i} className="flex gap-3 text-gray-600 text-sm">
                      <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full border border-accent/30 flex items-center justify-center bg-accent/10 text-xs font-bold text-accent">{i + 1}</div>
                      <span>{req}</span>
                    </li>
                  ))}</ul>
                </div>
              )}

              <div className="text-gray-700 leading-relaxed space-y-6">
                <div className="prose prose-sm sm:prose-base prose-gray max-w-none break-words prose-headings:text-gray-900 prose-strong:text-gray-900 prose-code:text-accent prose-code:bg-accent/5 prose-code:px-1 prose-code:rounded prose-a:text-accent">
                  {activeTopic.content ? (() => {
                    let checkpointCounter = 0;
                    return (parsedContent ?? []).map((seg, i) => {
                      if (seg.type === 'checkpoint' && seg.checkpoint) {
                        const cIdx = checkpointCounter++;
                        return <CheckpointCard key={`cp-${i}`} checkpoint={seg.checkpoint} checkpointIndex={cIdx} onAnswer={(idx, correct) => handleCheckpointAnswer(activeTopic.id, cIdx, correct)} />;
                      }
                      if (seg.type === 'info') return <InfoBox key={`info-${i}`}>{seg.value}</InfoBox>;
                      if (seg.type === 'warning') return <WarningBox key={`warn-${i}`}>{seg.value}</WarningBox>;
                      if (seg.type === 'tip') return <TipBox key={`tip-${i}`}>{seg.value}</TipBox>;
                      if (seg.type === 'danger') return <DangerBox key={`danger-${i}`}>{seg.value}</DangerBox>;
                      if (seg.type === 'success') return <InfoBox key={`success-${i}`} variant="success">{seg.value}</InfoBox>;
                      if (seg.type === 'objectives') {
                        const items = seg.value.split('\n').map(l => l.replace(/^[-*]\s*/, '').trim()).filter(Boolean);
                        return <LearningObjectives key={`obj-${i}`} items={items} />;
                      }
                      if (seg.type === 'concept') {
                        return <ConceptCard key={`concept-${i}`} title={seg.meta || 'Key Concept'}>{seg.value}</ConceptCard>;
                      }
                      if (seg.type === 'steps') {
                        const lines = seg.value.split('\n').filter(l => l.trim().match(/^\d+[.)]\s/));
                        const steps = lines.map(l => ({ title: l.replace(/^\d+[.)]\s*/, '').trim(), content: '' }));
                        if (steps.length === 0) {
                          return <div key={`steps-${i}`}><ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>{seg.value}</ReactMarkdown></div>;
                        }
                        return <StepGuide key={`steps-${i}`} steps={steps.map(s => ({ ...s, content: '' }))} />;
                      }
                      if (seg.type === 'summary') {
                        const lines = seg.value.split('\n').map(l => l.replace(/^[-*]\s*/, '').trim()).filter(Boolean);
                        const items = lines.map(l => {
                          const colon = l.indexOf(':');
                          if (colon > 0) return { label: l.slice(0, colon), description: l.slice(colon + 1).trim() };
                          return { label: '', description: l };
                        });
                        return <SummaryCard key={`summary-${i}`} items={items} />;
                      }
                      if (seg.type === 'classwork' && seg.classwork) {
                        try {
                          return <ClassworkCard key={`cw-${i}`} classwork={seg.classwork} onComplete={() => toggleTask(activeTopic.id)} />;
                        } catch (e) {
                          console.error('[CoursePlayer] Error rendering ClassworkCard:', e);
                          return <div key={`err-${i}`} className="my-6 p-4 border-2 border-red-400 bg-red-50 rounded-xl"><p className="text-red-700 font-bold">Classwork render error</p><pre className="text-red-600 text-sm mt-2">{String(e)}</pre></div>;
                        }
                      }
                      return <div key={`md-${i}`}><ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>{seg.value}</ReactMarkdown></div>;
                    });

                  })() : loadingModule ? (
                    <div className="flex items-center justify-center py-16 text-gray-400">
                      <Loader2 className="w-6 h-6 animate-spin mr-3" />
                      <span className="font-medium">Loading content...</span>
                    </div>
                  ) : <p className="text-gray-400">{activeTopic.description}</p>}
                </div>
              </div>

              {/* Comment Section */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-accent" />
                  Discussion ({topicComments.length})
                  {hasFirebaseConfig && <Wifi className="w-3 h-3 text-green-500" />}
                </h3>
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto custom-scrollbar">
                  {topicComments.length === 0 && <p className="text-sm text-gray-400 italic">No comments yet.</p>}
                  {topicComments.map((c, i) => {
                    const isOwn = c.user === userCode;
                    return (
                    <div key={`${c.user}-${c.time}-${i}`} className={`flex gap-3 p-3 rounded-lg ${isOwn ? 'bg-accent/5 border border-accent/20' : 'bg-emerald-50 border border-emerald-200'}`}>
                      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${isOwn ? 'bg-accent' : 'bg-emerald-500'}`}>
                        {isOwn ? 'You' : c.user.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-700">{isOwn ? 'You' : c.user}</span>
                          <span className="text-[10px] text-gray-400">{c.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{c.text}</p>
                      </div>
                    </div>
                  );
                  })}
                </div>
                <div className="flex gap-2">
                  <input className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40"
                    value={commentInput} onChange={e => setCommentInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addComment(); }}
                    placeholder="Share a thought or question..." />
                  <button onClick={addComment} className="bg-accent hover:bg-accent-dark text-white px-4 py-2.5 rounded-lg transition-all font-bold flex items-center gap-2"><Send className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-12">
                <button onClick={handlePrevTopic} className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all text-gray-500 bg-white border border-gray-200 hover:text-gray-800 hover:border-gray-300 shadow-sm"><ChevronLeft className="w-5 h-5" /> Previous</button>
                <button onClick={() => { if (isCompleted) toggleTask(activeTopic!.id); else setShowQuiz(true); }}
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold transition-all shadow-sm ${
                    isCompleted ? 'bg-white border border-emerald-300 text-emerald-600 hover:bg-emerald-50' : 'bg-accent text-white hover:bg-accent-dark'
                  }`}>
                  {isCompleted ? <><CheckCircle2 className="w-5 h-5" /> Completed</> : 'Complete & Take Quiz'}
                </button>
                {hasNextTopic && <button onClick={handleNextTopic} className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all text-gray-500 bg-white border border-gray-200 hover:text-gray-800 hover:border-gray-300 shadow-sm">Next <ChevronRight className="w-5 h-5" /></button>}
              </div>

              {showQuiz && <QuizModal topicId={activeTopic.id} topicTitle={activeTopic.title} quiz={activeTopic.quiz} onClose={() => setShowQuiz(false)} onPass={() => toggleTask(activeTopic!.id)} />}

            </motion.div>
          ) : (
             <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex items-center justify-center text-gray-400 font-medium">Select a topic to begin.</motion.div>
          )}
          </AnimatePresence>
          <footer className="text-center pt-8 pb-4">
            <p className="text-[10px] text-gray-400">&copy; {new Date().getFullYear()} Savannix Tech Ltd.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}