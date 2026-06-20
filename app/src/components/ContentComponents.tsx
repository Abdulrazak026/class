import React from 'react';
import { Lightbulb, AlertTriangle, Info, Shield, AlertOctagon, BookOpen, Target, CheckCircle2, ArrowRight, Copy, Terminal, ListChecks, Zap } from 'lucide-react';

type InfoVariant = 'info' | 'warning' | 'tip' | 'danger' | 'success';

const variantStyles: Record<InfoVariant, { bg: string; border: string; icon: React.ReactNode; iconBg: string }> = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-300 dark:border-blue-800',
    icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    iconBg: 'bg-blue-100 dark:bg-blue-900/50',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-300 dark:border-amber-800',
    icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
  },
  tip: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-300 dark:border-emerald-800',
    icon: <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
  },
  danger: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-300 dark:border-red-800',
    icon: <AlertOctagon className="w-5 h-5 text-red-600 dark:text-red-400" />,
    iconBg: 'bg-red-100 dark:bg-red-900/50',
  },
  success: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-300 dark:border-emerald-800',
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
  },
};

export function InfoBox({ variant = 'info', title, children }: { variant?: InfoVariant; title?: string; children: React.ReactNode }) {
  const s = variantStyles[variant];
  return (
    <div className={`${s.bg} border ${s.border} rounded-xl p-5 my-6`}>
      <div className="flex items-start gap-3">
        <div className={`shrink-0 w-8 h-8 rounded-lg ${s.iconBg} flex items-center justify-center`}>
          {s.icon}
        </div>
        <div className="flex-1 min-w-0">
          {title && <p className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1.5">{title}</p>}
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&_code]:bg-gray-200/70 dark:[&_code]:bg-gray-800/70 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WarningBox(props: { title?: string; children: React.ReactNode }) { return <InfoBox variant="warning" {...props} />; }
export function TipBox(props: { title?: string; children: React.ReactNode }) { return <InfoBox variant="tip" {...props} />; }
export function DangerBox(props: { title?: string; children: React.ReactNode }) { return <InfoBox variant="danger" {...props} />; }
export function SuccessBox(props: { title?: string; children: React.ReactNode }) { return <InfoBox variant="success" {...props} />; }

export function ConceptCard({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 my-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
          {icon || <Zap className="w-5 h-5 text-accent" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</p>
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&_code]:bg-gray-200/70 dark:[&_code]:bg-gray-700/70 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LearningObjectives({ items }: { items: string[] }) {
  return (
    <div className="bg-gradient-to-r from-accent/5 to-transparent border-l-4 border-accent rounded-r-xl px-5 py-4 my-6">
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-5 h-5 text-accent" />
        <p className="font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wider">Learning Objectives</p>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StepGuide({ steps }: { steps: { title: string; content: React.ReactNode }[] }) {
  return (
    <div className="my-6 space-y-0">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4 pb-6 last:pb-0 relative">
          {i < steps.length - 1 && (
            <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
          )}
          <div className="shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shadow-sm relative z-10">
            {i + 1}
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <p className="font-bold text-gray-900 dark:text-gray-100 mb-1.5">{step.title}</p>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&_code]:bg-gray-200/70 dark:[&_code]:bg-gray-700/70 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono">
              {step.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function KeyTerm({ term, definition }: { term: string; definition: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent/10 text-accent font-semibold text-sm cursor-help border border-accent/20 group relative">
      {term}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl bg-gray-900 dark:bg-gray-700 text-white text-xs leading-relaxed shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <div className="font-bold text-accent-light mb-1">{term}</div>
        {definition}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
      </div>
    </span>
  );
}

export function SummaryCard({ items }: { items: { label: string; description: string }[] }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 my-6">
      <div className="flex items-center gap-2 mb-4">
        <ListChecks className="w-5 h-5 text-accent" />
        <p className="font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wider">Key Takeaways</p>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{item.label}:</span>{' '}
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-gray-900 dark:bg-gray-950 rounded-xl overflow-hidden my-4 border border-gray-800 dark:border-gray-800 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/70 dark:bg-gray-900/70 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{language}</span>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-gray-200 transition-colors bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded-md border-0 cursor-pointer">
          <Copy className="w-3 h-3" />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-200 leading-relaxed custom-scrollbar">{code}</pre>
    </div>
  );
}
