import React, { useState } from 'react';
import { Shield, Search, FileText, FolderOpen, Clock, Hash, AlertTriangle, CheckCircle2, Download, Eye, Trash2, HardDrive, FileWarning, Image, Copy } from 'lucide-react';

interface EvidenceFile {
  id: string;
  name: string;
  type: 'image' | 'log' | 'memory' | 'registry' | 'artifact';
  size: string;
  hash: string;
  timestamp: string;
  source: string;
  description: string;
  tags: string[];
  indicators: string[];
}

interface Artifact {
  id: string;
  name: string;
  value: string;
  category: string;
  significance: string;
}

const EVIDENCE: EvidenceFile[] = [
  { id: 'ev1', name: 'memory.dump', type: 'memory', size: '4.2 GB', hash: 'SHA256: a1b2...c3d4', timestamp: '2026-06-15 14:32:10', source: 'Workstation-04 (192.168.1.104)', description: 'Full memory capture from compromised workstation during incident response.', tags: ['Volatile', 'RAM'], indicators: ['Suspicious process: svch0st.exe', 'Network connection to 185.234.72.18:443'] },
  { id: 'ev2', name: 'auth.log', type: 'log', size: '2.8 MB', hash: 'SHA256: e5f6...g7h8', timestamp: '2026-06-15 14:28:00', source: 'Web-Server-01 (10.0.0.5)', description: 'Authentication logs showing brute force pattern from multiple IPs.', tags: ['Linux', 'SSH'], indicators: ['1,247 failed login attempts in 15 min', 'IP range: 185.234.72.0/24'] },
  { id: 'ev3', name: 'malware_sample.exe', type: 'artifact', size: '156 KB', hash: 'SHA256: i9j0...k1l2', timestamp: '2026-06-15 13:15:00', source: 'Email Attachment (phish@malicious.com)', description: 'Suspicious executable recovered from email attachment.', tags: ['PE32', 'Executable'], indicators: ['Detected as: Trojan.Generic.12345', 'Suspicious import: CreateRemoteThread', 'UPX packed'] },
  { id: 'ev4', name: 'registry_hives.zip', type: 'registry', size: '890 KB', hash: 'SHA256: m3n4...o5p6', timestamp: '2026-06-15 12:00:00', source: 'DC-01 (10.0.0.1)', description: 'Registry hives (SAM, SYSTEM, SOFTWARE) for persistence analysis.', tags: ['Windows', 'Persistence'], indicators: ['Run key: "C:\\Users\\Public\\svch0st.exe"', 'Service: "SecurityUpdate" pointing to malicious binary'] },
  { id: 'ev5', name: 'disk_image_e01', type: 'image', size: '120 GB', hash: 'SHA256: q7r8...s9t0', timestamp: '2026-06-14 22:00:00', source: 'Workstation-04 (192.168.1.104)', description: 'Forensic disk image (E01 format) for deep file system analysis.', tags: ['Disk', 'E01'], indicators: ['Deleted files in %TEMP%', 'Browser history: clear all data event at 14:30'] },
  { id: 'ev6', name: 'network_capture.pcap', type: 'memory', size: '456 MB', hash: 'SHA256: u1v2...w3x4', timestamp: '2026-06-15 14:30:00', source: 'Network TAP on switch-01', description: 'Full packet capture during the attack window.', tags: ['PCAP', 'Network'], indicators: ['TLS to unknown IP: 185.234.72.18', 'DNS query: cdn-update.systems', 'SMB lateral movement detected'] },
];

const ARTIFACTS: Artifact[] = [
  { id: 'a1', name: 'Schedule Task', value: 'Microsoft\Windows\SecurityUpdate', category: 'Persistence', significance: 'Scheduled task runs malicious binary every 15 minutes' },
  { id: 'a2', name: 'Network Connection', value: 'TCP 192.168.1.104:49201 → 185.234.72.18:443', category: 'C2 Communication', significance: 'Outbound HTTPS to known C2 server' },
  { id: 'a3', name: 'Registry Run Key', value: 'HKCU\Software\Microsoft\Windows\CurrentVersion\Run\SecuritySvc', category: 'Persistence', significance: 'Auto-start entry for malware persistence' },
  { id: 'a4', name: 'Prefetch File', value: 'SVCH0ST.EXE-3A2B1C0F.pf', category: 'Execution', significance: 'Malware executed at 2026-06-15 13:20:17 UTC' },
  { id: 'a5', name: 'DNS Cache Entry', value: 'cdn-update.systems → 185.234.72.18', category: 'C2 Communication', significance: 'DNS resolution to malicious domain' },
  { id: 'a6', name: 'Event ID 4624', value: 'Logon Type 3 — Network logon from 10.0.0.5', category: 'Lateral Movement', significance: 'Pass-the-hash attack from web server to workstation' },
  { id: 'a7', name: 'Process Creation', value: 'cmd.exe /c "net use \\10.0.0.5\ADMIN$ /user:Administrator *"', category: 'Lateral Movement', significance: 'Admin share mount for lateral movement' },
  { id: 'a8', name: 'File Deletion', value: '%TEMP%\*.tmp — 47 files deleted at 14:30:05', category: 'Anti-Forensics', significance: 'Timestomp and evidence deletion attempt' },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  image: <Image className="w-4 h-4" />,
  log: <FileText className="w-4 h-4" />,
  memory: <HardDrive className="w-4 h-4" />,
  registry: <FileWarning className="w-4 h-4" />,
  artifact: <FileWarning className="w-4 h-4" />,
};

export function ForensicsWorkspace() {
  const [activeTab, setActiveTab] = useState<'evidence' | 'artifacts'>('evidence');
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceFile | null>(null);
  const [expandedIndicators, setExpandedIndicators] = useState<string[]>([]);

  const toggleIndicators = (id: string) => {
    setExpandedIndicators(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="my-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">Forensics Workspace</h3>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setActiveTab('evidence')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTab === 'evidence' ? 'bg-accent text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            Evidence Files
          </button>
          <button onClick={() => setActiveTab('artifacts')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTab === 'artifacts' ? 'bg-accent text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            Artifacts
          </button>
        </div>
      </div>

      {activeTab === 'evidence' && (
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EVIDENCE.map(ev => {
              const icon = TYPE_ICONS[ev.type] || <FileText className="w-4 h-4" />;
              const isExpanded = expandedIndicators.includes(ev.id);
              return (
                <div key={ev.id}
                  className={`border rounded-xl p-3 transition-all ${selectedEvidence?.id === ev.id ? 'border-accent ring-2 ring-accent/20 bg-accent/5' : 'border-gray-200 dark:border-gray-600 hover:border-accent/40'}`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="text-gray-400">{icon}</div>
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate flex-1">{ev.name}</span>
                    <span className="text-[9px] text-gray-400 uppercase font-mono">{ev.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1">
                    <span>{ev.size}</span>
                    <span>•</span>
                    <span>{ev.timestamp.split(' ')[0]}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 truncate">{ev.source}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Hash className="w-2.5 h-2.5 text-gray-400" />
                    <span className="text-[8px] font-mono text-gray-400">{ev.hash.slice(0, 20)}...</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {ev.tags.map(t => (
                      <span key={t} className="text-[8px] font-bold px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500">{t}</span>
                    ))}
                  </div>
                  <button onClick={() => toggleIndicators(ev.id)}
                    className="mt-2 w-full text-left text-[9px] font-bold text-accent hover:text-accent-dark transition-colors">
                    {isExpanded ? 'Hide indicators' : `View ${ev.indicators.length} indicators`}
                  </button>
                  {isExpanded && (
                    <div className="mt-1.5 space-y-1">
                      {ev.indicators.map((ind, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[9px] text-gray-600 dark:text-gray-400">
                          <AlertTriangle className="w-2.5 h-2.5 text-amber-500 mt-0.5 shrink-0" />
                          <span>{ind}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'artifacts' && (
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Artifact</th>
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Value</th>
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Significance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {ARTIFACTS.map(art => (
                  <tr key={art.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-2.5 px-3 font-bold text-gray-800 dark:text-gray-200">{art.name}</td>
                    <td className="py-2.5 px-3 font-mono text-[10px] text-gray-600 dark:text-gray-400 max-w-[200px] truncate">{art.value}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">{art.category}</span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-500 max-w-[250px]">{art.significance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="px-5 py-2.5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-[10px] text-gray-400 flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3 text-green-500" /> Chain of custody maintained. All evidence hashes verified. Case: IR-2026-007.
      </div>
    </div>
  );
}
