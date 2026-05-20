import React, { useState, useMemo, useEffect, useCallback, Suspense, lazy } from 'react';
import { Menu, Loader2 } from 'lucide-react';
import { Sidebar, Tab } from './components/Sidebar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getCurriculum, setDecryptedData } from './utils/dataLoader';
import { decryptFile } from './utils/crypto';
import {
  addTopicComment, subscribeToTopicComments, ChatMessage, TopicComment,
  sendChatMessage, subscribeToChat, registerDevice, getMyUserId,
  syncUserProgress, subscribeToProgress,
} from './firebase/services';
import { UserCodePrompt } from './components/UserCodePrompt';
import { UpdateBanner } from './components/UpdateBanner';
import { LockScreen } from './components/LockScreen';
import { ErrorBoundary } from './components/ErrorBoundary';

export type { Tab };

const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const CoursePlayer = lazy(() => import('./pages/CoursePlayer').then(m => ({ default: m.CoursePlayer })));
const Projects = lazy(() => import('./pages/Projects').then(m => ({ default: m.Projects })));
const StudyRoom = lazy(() => import('./pages/StudyRoom').then(m => ({ default: m.StudyRoom })));

export default function App() {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const hasToken = !!localStorage.getItem('access-token');
  const lastMsgCountRef = React.useRef(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [accessGranted, setAccessGranted] = useState(() => hasToken);
  const [activeTab, setActiveTab] = useLocalStorage<Tab>('active-tab', 'overview');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useLocalStorage<string[]>('completed-tasks', []);
  const [otherTasks, setOtherTasks] = useState<string[]>([]);
  const [otherUserCode, setOtherUserCode] = useState<string>('');
  const [activeTopicId, setActiveTopicId] = useLocalStorage<string | null>('active-topic', null);
  const [userCode, setUserCode] = useLocalStorage<string | null>('user-code', null);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('dark-mode', false);
  const [onlineMessages, setOnlineMessages] = useState<ChatMessage[]>([]);
  const [onlineComments, setOnlineComments] = useState<Record<string, TopicComment[]>>({});
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (isLocalhost && !hasToken) {
      (async () => {
        try {
          const [encRes, classworksRes] = await Promise.all([
            fetch('/data.enc?t=' + Date.now(), { cache: 'no-cache' }),
            fetch('/classworks.enc?t=' + Date.now(), { cache: 'no-cache' }),
          ]);
          const encData = await encRes.arrayBuffer();
          let classworksData: ArrayBuffer | null = null;
          if (classworksRes.ok) classworksData = await classworksRes.arrayBuffer();
          const key = 'DACAMP-2026';
          const decrypted = await decryptFile(encData, key);
          let decryptedClassworks = null;
          if (classworksData) {
            try { decryptedClassworks = await decryptFile(classworksData, key); } catch {}
          }
          setDecryptedData(JSON.parse(decrypted), decryptedClassworks ? JSON.parse(decryptedClassworks) : null);
          localStorage.setItem('access-token', JSON.stringify({ dev: true, grantedAt: Date.now() }));
          setAccessGranted(true);
        } catch (e) { console.error('Dev auto-unlock failed:', e); }
      })();
    }
  }, []);

  useEffect(() => {
    registerDevice().then(setUserId);
  }, []);

  useEffect(() => {
    if (!userId) return;
    const otherId = userId === 1 ? 2 : 1;
    const unsub = subscribeToProgress(
      otherId,
      (data) => { setOtherTasks(data.tasks); if (data.userCode) setOtherUserCode(data.userCode); },
      (err) => console.warn('Other user progress sub error:', err)
    );
    return () => unsub();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    syncUserProgress(userId, completedTasks, userCode || undefined);
  }, [completedTasks, userId, userCode]);

  const mergedTasks = useMemo(() => {
    if (otherTasks.length === 0) return completedTasks;
    const set = new Set([...completedTasks, ...otherTasks]);
    return Array.from(set);
  }, [completedTasks, otherTasks]);

  useEffect(() => {
    const unsub = subscribeToChat(
      (msgs) => {
        setOnlineMessages(msgs);
        if (msgs.length > lastMsgCountRef.current && activeTab !== 'studyroom') {
          setUnreadCount(prev => prev + (msgs.length - lastMsgCountRef.current));
        }
        lastMsgCountRef.current = msgs.length;
      },
      (err) => console.warn('Chat sub error:', err)
    );
    return () => unsub();
  }, [activeTab]);

  const resetUnread = useCallback(() => {
    setUnreadCount(0);
    lastMsgCountRef.current = onlineMessages.length;
  }, [onlineMessages.length]);

  useEffect(() => {
    if (!activeTopicId) return;
    const unsub = subscribeToTopicComments(
      activeTopicId,
      (comments) => setOnlineComments(prev => ({ ...prev, [activeTopicId]: comments })),
      (err) => console.warn('Comment sub error:', err)
    );
    return () => unsub();
  }, [activeTopicId]);

  const toggleTask = useCallback((taskId: string) => {
    setCompletedTasks(prev => {
      if (prev.includes(taskId)) {
        return prev.filter(id => id !== taskId);
      } else {
        const today = new Date().toISOString().slice(0, 10);
        const stored = localStorage.getItem('streak-dates');
        let dates: string[] = [];
        try { dates = stored ? JSON.parse(stored) : []; } catch { dates = []; }
        if (!dates.includes(today)) {
          localStorage.setItem('streak-dates', JSON.stringify([...dates, today]));
        }
        return [...prev, taskId];
      }
    });
  }, [setCompletedTasks]);

  const handleSendMessage = useCallback((text: string) => {
    if (!userCode) return;
    const msg: ChatMessage = {
      user: userCode,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    sendChatMessage(msg);
  }, [userCode]);

  const handleAddComment = useCallback((topicId: string, text: string) => {
    if (!userCode) return;
    const comment: TopicComment = {
      user: userCode,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      topicId,
    };
    addTopicComment(comment);
  }, [userCode]);

  const curriculumData = useMemo(() => getCurriculum(), []);
  const resumeTopicId = useMemo(() => {
    for (const m of curriculumData) {
      for (const t of m.topics) {
        if (!completedTasks.includes(t.id)) {
          return t.id;
        }
      }
    }
    return null;
  }, [completedTasks, curriculumData]);

  const handleOpenCourse = (topicId?: string) => {
    setActiveTab('syllabus');
    if (topicId) {
       setActiveTopicId(topicId);
    } else if (resumeTopicId) {
       setActiveTopicId(resumeTopicId);
    }
  };

  const topicComments = activeTopicId ? (onlineComments[activeTopicId] || []) : [];

  if (!accessGranted) {
    return <LockScreen onUnlock={() => { setAccessGranted(true); window.location.reload(); }} />;
  }

  return (
    <>
      {!userCode && <UserCodePrompt onSubmit={(code) => setUserCode(code)} />}
      <UpdateBanner />
      <div className="flex bg-deep min-h-screen font-sans">
        {activeTab !== 'syllabus' && (
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isMobileOpen={isMobileOpen} 
          setIsMobileOpen={setIsMobileOpen}
          userCode={userCode || ''}
          darkMode={darkMode}
          onDarkModeChange={setDarkMode}
          unreadCount={unreadCount}
        />
        )}
        
        <div className="flex-1 flex flex-col min-h-screen min-w-0">
          <header className="lg:hidden flex items-center gap-4 h-16 px-4 border-b border-border bg-surface/80 backdrop-blur-xl sticky top-0 z-30">
            {activeTab !== 'syllabus' && (
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="p-2 -ml-2 rounded-lg text-muted hover:bg-black/5 focus:ring-2 focus:ring-accent"
            >
              <Menu className="w-6 h-6" />
            </button>
            )}
            <h1 className="font-bold text-primary tracking-tight">Data Analyst Accelerator</h1>
          </header>

          <main className="flex-1 overflow-x-hidden">
            <ErrorBoundary>
            <Suspense fallback={<div className="flex items-center justify-center h-64 text-slate-400 font-medium">Loading...</div>}>
              {activeTab === 'overview' && (
                <Dashboard 
                  curriculum={curriculumData}
                  completedTasks={mergedTasks}
                  resumeTopicId={resumeTopicId}
                  onOpenCourse={handleOpenCourse}
                />
              )}
              {activeTab === 'syllabus' && (
                <CoursePlayer 
                  curriculum={curriculumData}
                  completedTasks={mergedTasks}
                  toggleTask={toggleTask}
                  activeTopicId={activeTopicId}
                  setActiveTopicId={setActiveTopicId}
                  topicComments={topicComments}
                  onAddComment={handleAddComment}
                  userCode={userCode || ''}
                  setActiveTab={setActiveTab}
                />
              )}
              {activeTab === 'projects' && (
                <Projects 
                  onOpenProject={handleOpenCourse} 
                  completedTasks={mergedTasks}
                />
              )}
              {activeTab === 'studyroom' && (
                <StudyRoom
                  completedTasks={mergedTasks}
                  completedTasksOwn={completedTasks}
                  completedTasksOther={otherTasks}
                  otherUserCode={otherUserCode}
                  curriculum={curriculumData}
                  onlineMessages={onlineMessages}
                  onSendMessage={handleSendMessage}
                  userCode={userCode || ''}
                  onOpen={() => resetUnread()}
                />
              )}
            </Suspense>
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </>
  );
}
