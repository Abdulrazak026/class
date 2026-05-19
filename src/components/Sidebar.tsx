import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, BookOpen, BarChart3, MessageSquare, X, PanelLeftClose, PanelLeft, User, Moon, Sun, Cloud, CloudOff } from 'lucide-react';
import { getLiveVersion, hasLiveData, clearLiveData } from '../utils/dataLoader';

export type Tab = 'overview' | 'syllabus' | 'projects' | 'studyroom';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  userCode: string;
  darkMode: boolean;
  onDarkModeChange: (dark: boolean) => void;
}

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Overview', icon: <Home className="w-5 h-5" /> },
  { id: 'syllabus', label: 'Syllabus', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'projects', label: 'Projects', icon: <BarChart3 className="w-5 h-5" /> },
  { id: 'studyroom', label: 'Study Room', icon: <MessageSquare className="w-5 h-5" /> },
];

function SidebarContent({ activeTab, setActiveTab, collapsed, onToggleCollapse, userCode, darkMode, onDarkModeChange }: {
  activeTab: Tab; setActiveTab: (tab: Tab) => void; collapsed: boolean; onToggleCollapse: () => void;
  userCode: string; darkMode: boolean; onDarkModeChange: (dark: boolean) => void;
}) {
  const isLive = hasLiveData();
  const version = getLiveVersion();

  return (
    <div className={`flex flex-col h-full bg-surface border-r border-border transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className={`p-4 border-b border-border flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Data Analyst</h1>
            <p className="text-xs text-slate-500 mt-0.5">Accelerator Program</p>
          </div>
        )}
        <button onClick={onToggleCollapse} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-deeper transition-all" title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>
      <nav className={`flex-1 p-2 space-y-1 ${collapsed ? 'flex flex-col items-center' : ''}`}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-sm font-medium ${
              activeTab === tab.id ? 'bg-accent text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-deeper hover:text-slate-800 dark:hover:text-slate-200'
            } ${collapsed ? 'justify-center w-12' : 'w-full'}`}
            title={collapsed ? tab.label : undefined}>
            {tab.icon}
            {!collapsed && <span>{tab.label}</span>}
          </button>
        ))}
      </nav>
      <div className="border-t border-border">
        {!collapsed && (
          <div className="p-3 space-y-2">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-deeper">
              <User className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{userCode}</span>
              <span className="ml-auto flex items-center gap-1 text-xs text-slate-400">
                {isLive ? <Cloud className="w-3 h-3 text-indigo-500" /> : <CloudOff className="w-3 h-3 text-slate-400" />}
                {isLive ? 'Live' : 'Built-in'}
              </span>
            </div>

            <div className="flex items-center justify-between px-2">
              <button onClick={() => onDarkModeChange(!darkMode)}
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{darkMode ? 'Light' : 'Dark'}</span>
              </button>
              <span className="text-[10px] text-slate-400 font-mono">v{version}</span>
            </div>
            <div className="flex items-center gap-2 px-2 pt-1">
              <button onClick={() => window.location.reload()}
                className="flex-1 text-[10px] px-2 py-1.5 rounded-lg bg-deeper hover:bg-accent/10 text-slate-500 hover:text-accent transition-all font-medium text-center">
                Reload App
              </button>
              <button onClick={() => { clearLiveData(); window.location.reload(); }}
                className="flex-1 text-[10px] px-2 py-1.5 rounded-lg bg-deeper hover:bg-red-50 text-slate-500 hover:text-red-600 transition-all font-medium text-center">
                Clear Cache
              </button>
            </div>
            <div className="px-2 pt-1">
              <p className="text-[10px] text-slate-400/60">&copy; Savannix Tech Ltd.</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="p-2 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-deeper flex items-center justify-center text-xs font-bold text-slate-500" title={userCode}>
              {userCode.charAt(0).toUpperCase()}
            </div>
            <button onClick={() => onDarkModeChange(!darkMode)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-deeper transition-all" title="Toggle dark mode">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => window.location.reload()}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-deeper transition-all" title="Reload app">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16"/></svg>
            </button>
            <button onClick={() => { clearLiveData(); window.location.reload(); }}
              className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-all" title="Clear cache">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
            </button>
            <p className="text-[9px] text-slate-400/40">&copy; STL</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function Sidebar({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen, userCode, darkMode, onDarkModeChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <aside className="hidden lg:flex h-screen sticky top-0 shrink-0">
        <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab}
          collapsed={collapsed} onToggleCollapse={() => setCollapsed(prev => !prev)}
          userCode={userCode} darkMode={darkMode} onDarkModeChange={onDarkModeChange} />
      </aside>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setIsMobileOpen(false)} />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed left-0 top-0 bottom-0 w-72 z-40 lg:hidden">
              <div className="relative h-full">
                <button onClick={() => setIsMobileOpen(false)}
                  className="absolute top-4 right-4 z-10 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
                <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab}
                  collapsed={false} onToggleCollapse={() => {}}
                  userCode={userCode} darkMode={darkMode} onDarkModeChange={onDarkModeChange} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
