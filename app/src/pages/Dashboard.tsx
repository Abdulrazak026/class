import React from "react";
import { Module } from "../data";
import { motion } from "motion/react";
import { BookOpen, CheckCircle2, Zap, Target, Clock, BarChart3, Award, ChevronRight, GraduationCap } from "lucide-react";
import { CircularProgress } from "../components/CircularProgress";

interface DashboardProps {
  curriculum: Module[];
  completedTasks: string[];
  resumeTopicId: string | null;
  onOpenCourse: (topicId?: string) => void;
}

function calcPace(done: number, total: number): { label: string; color: string } {
  const pct = total === 0 ? 0 : (done / total) * 100;
  if (pct === 0) return { label: 'Not started', color: 'text-gray-400' };
  if (pct < 25) return { label: 'Getting started', color: 'text-blue-500' };
  if (pct < 50) return { label: 'Building momentum', color: 'text-amber-500' };
  if (pct < 75) return { label: 'Strong progress', color: 'text-accent' };
  if (pct < 100) return { label: 'Almost there!', color: 'text-emerald-500' };
  return { label: 'Complete!', color: 'text-emerald-600' };
}

export function Dashboard({ curriculum, completedTasks, resumeTopicId, onOpenCourse }: DashboardProps) {
  const allTopics = curriculum.flatMap(m => m.topics);
  const resumeTopic = allTopics.length > 0 ? (allTopics.find(t => t.id === resumeTopicId) || allTopics[0]) : null;
  const total = allTopics.length;
  const done = completedTasks.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const pace = calcPace(done, total);

  const currentWeekIdx = curriculum.findIndex(m => m.topics.some(t => !completedTasks.includes(t.id)));
  const weekIdx = currentWeekIdx > -1 ? currentWeekIdx : Math.max(0, curriculum.length - 1);
  const currentWeek = curriculum[weekIdx];
  const weekDone = currentWeek ? currentWeek.topics.filter(t => completedTasks.includes(t.id)).length : 0;
  const weekTotal = currentWeek ? currentWeek.topics.length : 0;

  if (curriculum.length === 0) {
    return (
      <div className="p-4 sm:p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
        <div className="h-full flex items-center justify-center text-gray-400 font-medium py-20">
          Loading curriculum...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      {/* Hero Section */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-6">
          <CircularProgress value={pct} size={88} strokeWidth={7} />
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              {done === 0 ? 'Welcome, Security Analyst' : 'Great work today'}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className={`text-xs font-bold ${pace.color}`}>{pace.label}</span>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-gray-400">{done}/{total} topics</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2.5 shadow-sm flex items-center gap-2.5">
            <Award className="w-5 h-5 text-accent" />
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-accent">{pct}%</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Complete</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats + Continue Learning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {/* Quick Stats */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 }}
          className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center"><BookOpen className="w-4 h-4 text-blue-600" /></div>
            </div>
            <p className="text-xl font-black text-gray-900">{total}</p>
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Total Topics</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-emerald-600" /></div>
            </div>
            <p className="text-xl font-black text-gray-900">{done}</p>
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Completed</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center"><Target className="w-4 h-4 text-amber-600" /></div>
            </div>
            <p className="text-xl font-black text-gray-900">{total - done}</p>
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Remaining</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-purple-600" /></div>
            </div>
            <p className="text-xl font-black text-gray-900">{curriculum.length}</p>
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Weeks</p>
          </div>
        </motion.div>

        {/* Continue Learning */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
          className="lg:col-span-2 bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl opacity-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl opacity-5 -translate-x-1/4 translate-y-1/4 pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-1">
                  Continue Learning
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">{resumeTopic?.title || "Start Your Journey"}</h2>
                <div className="flex items-center gap-4 mt-2 text-white/70 text-sm">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Week {weekIdx + 1}</span>
                  <span className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5" /> {weekDone}/{weekTotal} done</span>
                </div>
              </div>
            </div>
            <button onClick={() => onOpenCourse(resumeTopicId || undefined)}
              className="inline-flex items-center gap-2 bg-white text-accent font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-all text-sm shadow-sm shrink-0">
              {done === 0 ? "Start First Topic" : "Resume"} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Week Progress Grid */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.22 }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent" /> All Weeks
            <span className="text-sm font-normal text-gray-400">({done}/{total} topics)</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
          {curriculum.map((mod, mIdx) => {
            const weekDone = mod.topics.filter(t => completedTasks.includes(t.id)).length;
            const weekTotal = mod.topics.length;
            const weekPct = weekTotal > 0 ? Math.round((weekDone / weekTotal) * 100) : 0;
            const isActive = mod.topics.some(t => t.id === resumeTopicId);
            const isComplete = weekDone === weekTotal;
            const nextTopic = mod.topics.find(t => !completedTasks.includes(t.id));
            return (
              <button key={mod.id} onClick={() => onOpenCourse(nextTopic?.id || mod.topics[0].id)}
                className={`relative rounded-xl p-3 border text-left transition-all ${
                  isComplete ? 'bg-emerald-50 border-emerald-200 hover:shadow-sm' :
                  isActive ? 'bg-accent/5 border-accent/20 shadow-sm' :
                  'bg-white border-gray-200 hover:border-accent/30 hover:shadow-sm'
                }`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    isComplete ? 'bg-emerald-500 text-white' : isActive ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500'
                  }`}>{mIdx + 1}</div>
                  <span className={`text-[11px] font-semibold truncate leading-tight ${isComplete ? 'text-emerald-800' : 'text-gray-900'}`}>
                    {mod.title.length > 30 ? mod.title.slice(0, 30) + '…' : mod.title}
                  </span>
                  {isComplete && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-auto" />}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${
                      isComplete ? 'bg-emerald-400' : 'bg-gradient-to-r from-accent to-accent-light'
                    }`} style={{ width: `${weekPct}%` }} />
                  </div>
                  <span className={`text-[10px] font-bold font-mono shrink-0 ${isComplete ? 'text-emerald-600' : 'text-gray-400'}`}>
                    {weekPct}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      <footer className="mt-12 pt-6 border-t border-gray-200 text-center">
        <p className="text-[11px] text-gray-400">&copy; {new Date().getFullYear()} CYBERCAMP-2026. All rights reserved.</p>
      </footer>
    </div>
  );
}
