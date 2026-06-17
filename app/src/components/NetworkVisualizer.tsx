import React, { useState } from 'react';
import { Shield, Server, Monitor, Wifi, Globe, Lock, Unlock, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface NetworkNode {
  id: string;
  label: string;
  type: 'router' | 'server' | 'workstation' | 'firewall' | 'cloud' | 'attacker';
  x: number;
  y: number;
  compromised: boolean;
  exposed: boolean;
}

interface NetworkEdge {
  from: string;
  to: string;
  blocked: boolean;
  label?: string;
}

const DEFAULT_NODES: NetworkNode[] = [
  { id: 'attacker', label: 'Threat Actor', type: 'attacker', x: 8, y: 15, compromised: false, exposed: false },
  { id: 'internet', label: 'Internet', type: 'cloud', x: 22, y: 15, compromised: false, exposed: false },
  { id: 'fw1', label: 'Firewall', type: 'firewall', x: 38, y: 15, compromised: false, exposed: false },
  { id: 'web', label: 'Web Server', type: 'server', x: 55, y: 8, compromised: false, exposed: true },
  { id: 'db', label: 'Database', type: 'server', x: 55, y: 22, compromised: false, exposed: false },
  { id: 'lan', label: 'LAN Switch', type: 'router', x: 38, y: 45, compromised: false, exposed: false },
  { id: 'ws1', label: 'Workstation 1', type: 'workstation', x: 55, y: 38, compromised: false, exposed: false },
  { id: 'ws2', label: 'Workstation 2', type: 'workstation', x: 55, y: 52, compromised: false, exposed: false },
  { id: 'vpn', label: 'VPN Gateway', type: 'router', x: 22, y: 45, compromised: false, exposed: false },
  { id: 'remote', label: 'Remote User', type: 'workstation', x: 8, y: 45, compromised: false, exposed: false },
];

const DEFAULT_EDGES: NetworkEdge[] = [
  { from: 'attacker', to: 'internet', blocked: false },
  { from: 'internet', to: 'fw1', blocked: false },
  { from: 'fw1', to: 'internet', blocked: false },
  { from: 'fw1', to: 'web', blocked: false, label: '80,443' },
  { from: 'web', to: 'db', blocked: false, label: '3306' },
  { from: 'fw1', to: 'lan', blocked: false },
  { from: 'lan', to: 'ws1', blocked: false },
  { from: 'lan', to: 'ws2', blocked: false },
  { from: 'internet', to: 'vpn', blocked: false, label: '443 UDP' },
  { from: 'vpn', to: 'lan', blocked: false },
  { from: 'remote', to: 'vpn', blocked: false },
];

const NODE_ICONS: Record<string, React.ReactNode> = {
  router: <Server className="w-4 h-4" />,
  server: <Server className="w-4 h-4" />,
  workstation: <Monitor className="w-4 h-4" />,
  firewall: <Shield className="w-4 h-4" />,
  cloud: <Globe className="w-4 h-4" />,
  attacker: <AlertTriangle className="w-4 h-4" />,
};

const SCENARIOS = [
  {
    name: 'Default — Secure',
    desc: 'Standard network with firewall protecting internal resources',
    apply: (nodes: NetworkNode[], edges: NetworkEdge[]) => {
      nodes.forEach(n => { n.compromised = false; n.exposed = n.id === 'web'; });
      edges.forEach(e => { e.blocked = false; });
    },
  },
  {
    name: 'Attack in Progress',
    desc: 'Web server compromised, lateral movement detected',
    apply: (nodes: NetworkNode[], edges: NetworkEdge[]) => {
      nodes.forEach(n => { n.compromised = n.id === 'web'; n.exposed = true; });
      edges.forEach(e => { e.blocked = false; });
    },
  },
  {
    name: 'Firewall Blocking',
    desc: 'Firewall actively blocking inbound attack traffic',
    apply: (nodes: NetworkNode[], edges: NetworkEdge[]) => {
      nodes.forEach(n => { n.compromised = false; n.exposed = n.id === 'web'; });
      edges.forEach(e => { e.blocked = e.from === 'internet' && e.to === 'fw1'; });
    },
  },
  {
    name: 'Full Compromise',
    desc: 'Entire internal network breached via lateral movement',
    apply: (nodes: NetworkNode[], edges: NetworkEdge[]) => {
      nodes.forEach(n => { n.compromised = n.id !== 'attacker' && n.id !== 'internet' && n.id !== 'remote'; n.exposed = true; });
      edges.forEach(e => { e.blocked = false; });
    },
  },
];

export function NetworkVisualizer() {
  const [nodes] = useState<NetworkNode[]>(JSON.parse(JSON.stringify(DEFAULT_NODES)));
  const [edges] = useState<NetworkEdge[]>(JSON.parse(JSON.stringify(DEFAULT_EDGES)));
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  const applyScenario = (idx: number) => {
    setAnimating(true);
    SCENARIOS[idx].apply(nodes, edges);
    setScenarioIdx(idx);
    setTimeout(() => setAnimating(false), 400);
  };

  const getEdgeColor = (edge: NetworkEdge) => {
    if (edge.blocked) return 'stroke-red-500';
    return 'stroke-gray-300 dark:stroke-gray-600';
  };

  const getNodeBorder = (node: NetworkNode) => {
    if (node.compromised) return 'ring-2 ring-red-500 ring-offset-2 dark:ring-offset-gray-900';
    if (node.exposed) return 'ring-2 ring-amber-400 ring-offset-2 dark:ring-offset-gray-900';
    return '';
  };

  const getNodeBg = (node: NetworkNode) => {
    if (node.type === 'attacker') return 'bg-red-100 dark:bg-red-900 border-red-400';
    if (node.type === 'firewall') return 'bg-amber-50 dark:bg-amber-900/30 border-amber-300';
    if (node.compromised) return 'bg-red-50 dark:bg-red-900/50 border-red-400';
    if (node.type === 'cloud') return 'bg-blue-50 dark:bg-blue-900/30 border-blue-300';
    return 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600';
  };

  return (
    <div className="my-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Wifi className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">Network Topology Visualizer</h3>
        </div>
        <div className="flex items-center gap-1">
          {SCENARIOS.map((s, i) => (
            <button key={s.name} onClick={() => applyScenario(i)}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                scenarioIdx === i ? 'bg-accent text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}>{s.name}</button>
          ))}
        </div>
      </div>

      <div className="relative w-full h-[300px] sm:h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 60">
          {edges.map(edge => {
            const from = nodes.find(n => n.id === edge.from);
            const to = nodes.find(n => n.id === edge.to);
            if (!from || !to) return null;
            return (
              <g key={`${edge.from}-${edge.to}`}>
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  className={`${getEdgeColor(edge)} ${edge.blocked ? 'stroke-[1.5] stroke-dasharray-4' : 'stroke-[1]'} ${animating ? 'transition-all duration-500' : ''}`}
                  strokeWidth={edge.blocked ? 2 : 1.5} />
                {edge.label && (
                  <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 1.5}
                    className="fill-gray-400 text-[2.5px] font-mono" textAnchor="middle">
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {nodes.map(node => {
          const NodeIcon = NODE_ICONS[node.type] || <Server className="w-4 h-4" />;
          return (
            <div key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 transition-all duration-500 ${animating ? 'scale-105' : ''}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}>
              <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center shadow-sm ${getNodeBg(node)} ${getNodeBorder(node)} ${animating ? 'transition-all duration-500' : ''}`}>
                {node.compromised ? <Unlock className="w-4 h-4 text-red-500" /> : node.type === 'attacker' ? NodeIcon : NodeIcon}
              </div>
              <span className="text-[9px] font-bold text-gray-600 dark:text-gray-400 whitespace-nowrap">{node.label}</span>
              {node.compromised && <span className="text-[7px] font-bold text-red-500 bg-red-50 dark:bg-red-900/50 px-1 rounded">BREACHED</span>}
            </div>
          );
        })}
      </div>

      <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[10px]">
          <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-amber-500" /> Firewall</span>
          <span className="flex items-center gap-1"><Server className="w-3 h-3 text-blue-500" /> Server</span>
          <span className="flex items-center gap-1"><Monitor className="w-3 h-3 text-gray-500" /> Workstation</span>
          <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-red-500" /> Attacker</span>
        </div>
        <p className="text-[10px] text-gray-400 italic">{SCENARIOS[scenarioIdx].desc}</p>
      </div>
    </div>
  );
}
