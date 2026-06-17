import React, { useState } from 'react';
import { Globe, AlertTriangle, Shield, TrendingUp, TrendingDown, ExternalLink, Clock, MapPin, Users, Biohazard, Skull, Eye, Search, Filter, ArrowUp, ArrowDown } from 'lucide-react';

interface ThreatActor {
  id: string;
  name: string;
  type: 'APT' | 'Cybercrime' | 'Hacktivist' | 'Insider';
  origin: string;
  motivation: string;
  active: boolean;
  targets: string[];
  tools: string[];
  aliases: string[];
  description: string;
  activityLevel: 'Very High' | 'High' | 'Medium' | 'Low';
  lastSeen: string;
}

interface IoC {
  id: string;
  type: 'IP' | 'Domain' | 'Hash' | 'URL';
  value: string;
  confidence: number;
  firstSeen: string;
  tags: string[];
}

const ACTORS: ThreatActor[] = [
  {
    id: 'apt1',
    name: 'CopperJackal',
    type: 'APT',
    origin: 'Eastern Europe',
    motivation: 'Financial gain, espionage',
    active: true,
    targets: ['Financial services', 'Cryptocurrency', 'Defense contractors'],
    tools: ['Cobalt Strike', 'Brute Ratel C4', 'Mimikatz', 'Certify'],
    aliases: ['APT-36', 'GOLD JACKAL', 'TA456'],
    description: 'State-aligned threat group targeting financial institutions and cryptocurrency exchanges. Known for sophisticated social engineering campaigns and custom malware loaders.',
    activityLevel: 'Very High',
    lastSeen: '2026-06-14',
  },
  {
    id: 'apt2',
    name: 'PhantomShell',
    type: 'APT',
    origin: 'East Asia',
    motivation: 'Intellectual property theft',
    active: true,
    targets: ['Semiconductors', 'AI/ML companies', 'Pharmaceuticals'],
    tools: ['PlugX', 'Cobalt Strike', 'Mimikatz', 'Certutil', 'Living-off-the-land binaries'],
    aliases: ['APT-41', 'Barium', 'WICKED PANDA'],
    description: 'Well-resourced group targeting supply chains and technology companies. Uses custom backdoors and extensive living-off-the-land techniques.',
    activityLevel: 'High',
    lastSeen: '2026-06-15',
  },
  {
    id: 'crime1',
    name: 'RansomHub',
    type: 'Cybercrime',
    origin: 'Russia-aligned',
    motivation: 'Ransomware, extortion',
    active: true,
    targets: ['Healthcare', 'Education', 'Government', 'Critical infrastructure'],
    tools: ['LockBit 3.0', 'BlackCat/ALPHV', 'Exmatter', 'SystemBC'],
    aliases: ['RansomHub Group', 'ALPHV Affiliate'],
    description: 'Ransomware-as-a-Service affiliate group responsible for attacks on healthcare and education sectors. Double extortion tactics with data leak sites.',
    activityLevel: 'Very High',
    lastSeen: '2026-06-16',
  },
  {
    id: 'crime2',
    name: 'DarkFlow',
    type: 'Cybercrime',
    origin: 'Brazil',
    motivation: 'Financial fraud',
    active: true,
    targets: ['Banking', 'E-commerce', 'Fintech'],
    tools: ['Grandoreiro', 'Mekotio', 'Astronaut', 'JRC'],
    aliases: ['Tetrade', 'Banco do Brasil crew'],
    description: 'Financially motivated banking trojan group targeting Latin American financial institutions. Sophisticated web injects and MFA bypass techniques.',
    activityLevel: 'High',
    lastSeen: '2026-06-10',
  },
  {
    id: 'hack1',
    name: 'GreenLeak',
    type: 'Hacktivist',
    origin: 'Global',
    motivation: 'Environmental activism',
    active: true,
    targets: ['Oil & gas', 'Mining companies', 'Government agencies'],
    tools: ['DDoS tools', 'SQLmap', 'Custom doxing scripts'],
    aliases: ['EcoHack', 'GreenCyber'],
    description: 'Environmentally motivated hacktivist group targeting fossil fuel companies. Known for DDoS attacks and data leaks of internal communications.',
    activityLevel: 'Medium',
    lastSeen: '2026-05-28',
  },
  {
    id: 'insider1',
    name: 'Insider Risk Profile',
    type: 'Insider',
    origin: 'Various',
    motivation: 'Disgruntlement, financial gain',
    active: false,
    targets: ['Internal systems', 'Customer data', 'Intellectual property'],
    tools: ['USB exfiltration', 'Cloud storage upload', 'Emails', 'Printer'],
    aliases: [],
    description: 'Common insider threat pattern: employees with privileged access exfiltrating data prior to departure. Accounts for 34% of all data breaches.',
    activityLevel: 'Low',
    lastSeen: '2026-06-01',
  },
];

const IOCS: IoC[] = [
  { id: 'ioc1', type: 'IP', value: '185.234.72.18', confidence: 95, firstSeen: '2026-06-01', tags: ['C2 Server', 'CopperJackal'] },
  { id: 'ioc2', type: 'Domain', value: 'cdn-update.systems', confidence: 88, firstSeen: '2026-05-15', tags: ['Phishing', 'Malware Delivery'] },
  { id: 'ioc3', type: 'Hash', value: 'a1b2c3d4e5f6...7890abcdef1234', confidence: 92, firstSeen: '2026-06-10', tags: ['LockBit 3.0', 'Ransomware'] },
  { id: 'ioc4', type: 'URL', value: 'https://secure-update.pw/dl', confidence: 85, firstSeen: '2026-06-12', tags: ['Payload Hosting', 'PhantomShell'] },
  { id: 'ioc5', type: 'IP', value: '103.45.67.89', confidence: 78, firstSeen: '2026-05-22', tags: ['Scanning', 'Recon'] },
  { id: 'ioc6', type: 'Domain', value: 'docs-share.xyz', confidence: 91, firstSeen: '2026-06-08', tags: ['Phishing', 'Credential Harvesting'] },
];

const TYPE_CONFIG = {
  APT: { color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300', icon: Skull },
  Cybercrime: { color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300', icon: Biohazard },
  Hacktivist: { color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300', icon: Globe },
  Insider: { color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300', icon: Users },
};

const LEVEL_COLORS = {
  'Very High': 'text-red-500',
  'High': 'text-orange-500',
  'Medium': 'text-amber-500',
  'Low': 'text-blue-500',
};

export function ThreatIntelBoard() {
  const [selectedActor, setSelectedActor] = useState<ThreatActor | null>(null);
  const [activeTab, setActiveTab] = useState<'actors' | 'iocs'>('actors');
  const [actorFilter, setActorFilter] = useState<string>('all');

  const filteredActors = actorFilter === 'all' ? ACTORS : ACTORS.filter(a => a.type === actorFilter);

  return (
    <div className="my-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">Threat Intelligence Board</h3>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setActiveTab('actors')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTab === 'actors' ? 'bg-accent text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            Threat Actors
          </button>
          <button onClick={() => setActiveTab('iocs')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeTab === 'iocs' ? 'bg-accent text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
            Indicators of Compromise
          </button>
        </div>
      </div>

      {activeTab === 'actors' && (
        <div className="p-4">
          <div className="flex items-center gap-1 mb-4 flex-wrap">
            <button onClick={() => setActorFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${actorFilter === 'all' ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>All</button>
            {Object.entries(TYPE_CONFIG).map(([type, config]) => (
              <button key={type} onClick={() => setActorFilter(type)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${actorFilter === type ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                {type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredActors.map(actor => {
              const config = TYPE_CONFIG[actor.type];
              const TypeIcon = config.icon;
              const isSelected = selectedActor?.id === actor.id;
              return (
                <div key={actor.id} onClick={() => setSelectedActor(isSelected ? null : actor)}
                  className={`border rounded-xl p-4 cursor-pointer transition-all ${
                    isSelected ? 'border-accent ring-2 ring-accent/20 bg-accent/5' : 'border-gray-200 dark:border-gray-600 hover:border-accent/40 hover:shadow-sm'
                  }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TypeIcon className="w-4 h-4 text-gray-500" />
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${config.color}`}>{actor.type}</span>
                    </div>
                    <span className={`text-[10px] font-bold ${actor.active ? 'text-green-500' : 'text-gray-400'}`}>
                      {actor.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">{actor.name}</h4>
                  <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-500">
                    <MapPin className="w-3 h-3" /> {actor.origin}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-gray-400">{actor.targets.slice(0, 2).join(', ')}</span>
                    <span className={`text-[10px] font-bold ${LEVEL_COLORS[actor.activityLevel]}`}>{actor.activityLevel}</span>
                  </div>
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                      <p className="text-xs text-gray-600 dark:text-gray-400">{actor.description}</p>
                      <div>
                        <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Tools & TTPs</p>
                        <div className="flex flex-wrap gap-1">{actor.tools.map(t => (
                          <span key={t} className="text-[9px] font-mono bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded">{t}</span>
                        ))}</div>
                      </div>
                      {actor.aliases.length > 0 && (
                        <div>
                          <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Aliases</p>
                          <div className="flex flex-wrap gap-1">{actor.aliases.map(a => (
                            <span key={a} className="text-[9px] font-mono bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded">{a}</span>
                          ))}</div>
                        </div>
                      )}
                      <p className="text-[9px] text-gray-400">Last seen: {actor.lastSeen}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'iocs' && (
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Value</th>
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Confidence</th>
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">First Seen</th>
                  <th className="text-left py-2 px-3 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Tags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {IOCS.map(ioc => (
                  <tr key={ioc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-[9px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded">{ioc.type}</span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-gray-800 dark:text-gray-200 text-[11px]">{ioc.value.length > 30 ? ioc.value.slice(0, 30) + '...' : ioc.value}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${ioc.confidence >= 90 ? 'bg-green-500' : ioc.confidence >= 80 ? 'bg-amber-500' : 'bg-blue-500'}`}
                            style={{ width: `${ioc.confidence}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-500">{ioc.confidence}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-gray-500">{ioc.firstSeen}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex flex-wrap gap-1">{ioc.tags.map(t => (
                        <span key={t} className="text-[8px] font-bold px-1 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">{t}</span>
                      ))}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="px-5 py-2.5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-[10px] text-gray-400 flex items-center gap-1">
        <Clock className="w-3 h-3" /> Threat data refreshed daily. {ACTORS.filter(a => a.active).length} active threat groups currently being tracked.
      </div>
    </div>
  );
}
