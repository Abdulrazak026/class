import React, { useState } from 'react';
import { Beaker, Terminal, Shield, Globe, Wifi, Lock, AlertTriangle, ExternalLink, Clock, Star, Search, Filter, ChevronDown } from 'lucide-react';
import { TerminalSimulator } from '../components/TerminalSimulator';
import { SiemDashboard } from '../components/SiemDashboard';
import { NetworkVisualizer } from '../components/NetworkVisualizer';
import { VulnScanner } from '../components/VulnScanner';
import { ThreatIntelBoard } from '../components/ThreatIntelBoard';
import { ForensicsWorkspace } from '../components/ForensicsWorkspace';
import { CtfChallenge } from '../components/CtfChallenge';

const LAB_TOOLS = [
  { id: 'terminal', label: 'Terminal Simulator', icon: Terminal, component: 'TerminalSimulator', desc: 'Practice Linux/Windows security commands in a safe environment' },
  { id: 'siem', label: 'SIEM Dashboard', icon: Shield, component: 'SiemDashboard', desc: 'Explore security event monitoring and log analysis' },
  { id: 'network', label: 'Network Topology', icon: Wifi, component: 'NetworkVisualizer', desc: 'Visualize network architectures and attack scenarios' },
  { id: 'vuln', label: 'Vuln Scanner', icon: AlertTriangle, component: 'VulnScanner', desc: 'Simulate vulnerability scanning against target systems' },
  { id: 'threat', label: 'Threat Intel', icon: Globe, component: 'ThreatIntelBoard', desc: 'Track threat actors and indicators of compromise' },
  { id: 'forensics', label: 'Forensics Lab', icon: Lock, component: 'ForensicsWorkspace', desc: 'Analyze evidence files and forensic artifacts' },
  { id: 'ctf', label: 'CTF Challenges', icon: Beaker, component: 'CtfChallenge', desc: 'Solve capture-the-flag challenges across categories' },
];

const EXTERNAL_LABS = [
  { name: 'TryHackMe', url: 'https://tryhackme.com', desc: 'Gamified cybersecurity training', free: true, level: 'Beginner-Pro' },
  { name: 'Hack The Box', url: 'https://hackthebox.com', desc: 'Advanced penetration testing labs', free: true, level: 'Intermediate-Pro' },
  { name: 'PortSwigger Web Security', url: 'https://portswigger.net/web-security', desc: 'Free web app security labs', free: true, level: 'All Levels' },
  { name: 'PicoCTF', url: 'https://picoctf.com', desc: 'CTF platform for beginners', free: true, level: 'Beginner-Intermediate' },
  { name: 'CVE Database', url: 'https://cve.mitre.org', desc: 'Official CVE vulnerability database', free: true, level: 'All Levels' },
  { name: 'MITRE ATT&CK', url: 'https://attack.mitre.org', desc: 'Adversarial tactics & techniques', free: true, level: 'All Levels' },
];

export function LabsPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = LAB_TOOLS.filter(t =>
    t.label.toLowerCase().includes(search.toLowerCase()) ||
    t.desc.toLowerCase().includes(search.toLowerCase())
  );

  const renderComponent = () => {
    if (!activeTool) return null;
    switch (activeTool) {
      case 'TerminalSimulator': return <TerminalSimulator />;
      case 'SiemDashboard': return <SiemDashboard />;
      case 'NetworkVisualizer': return <NetworkVisualizer />;
      case 'VulnScanner': return <VulnScanner />;
      case 'ThreatIntelBoard': return <ThreatIntelBoard />;
      case 'ForensicsWorkspace': return <ForensicsWorkspace />;
      case 'CtfChallenge': return <CtfChallenge />;
      default: return null;
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100">Interactive Labs</h1>
          <p className="text-sm text-gray-400 mt-1">Security tools, simulators, and hands-on exercises</p>
        </div>
      </div>

      {!activeTool && (
        <div className="mb-6">
          <div className="relative max-w-md mb-6">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-accent/40"
              placeholder="Search tools..." />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map(tool => {
              const Icon = tool.icon;
              return (
                <button key={tool.id} onClick={() => setActiveTool(tool.component)}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 text-left hover:border-accent/40 hover:shadow-sm transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-all">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">{tool.label}</h3>
                  <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{tool.desc}</p>
                  <span className="text-[10px] font-bold text-accent mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Launch <ChevronDown className="w-3 h-3 -rotate-90" />
                  </span>
                </button>
              );
            })}
          </div>

          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-10 mb-4">External Lab Platforms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EXTERNAL_LABS.map(lab => (
              <a key={lab.name} href={lab.url} target="_blank" rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:border-accent/40 hover:shadow-sm transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">{lab.name}</h3>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-accent transition-all" />
                </div>
                <p className="text-[11px] text-gray-400">{lab.desc}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${lab.free ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-amber-100 text-amber-700'}`}>
                    {lab.free ? 'Free' : 'Paid'}
                  </span>
                  <span className="text-[9px] text-gray-400">{lab.level}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {activeTool && (
        <div>
          <button onClick={() => setActiveTool(null)}
            className="text-xs font-bold text-accent hover:text-accent-dark mb-4 flex items-center gap-1">
            ← Back to all labs
          </button>
          {renderComponent()}
        </div>
      )}
    </div>
  );
}
