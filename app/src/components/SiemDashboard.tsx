import React, { useState, useEffect } from 'react';
import { Shield, Activity, AlertTriangle, Users, Server, Clock, Filter, RefreshCw, Search, ChevronDown, AlertCircle, Info, Eye, CheckCircle2 } from 'lucide-react';

interface LogEvent {
  id: string;
  timestamp: string;
  source: string;
  type: 'alert' | 'warning' | 'info' | 'critical';
  message: string;
  destination: string;
  protocol: string;
  port: number;
}

const SEVERITY_CONFIG = {
  critical: { color: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950', label: 'CRITICAL', icon: AlertCircle },
  alert: { color: 'bg-orange-500', text: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950', label: 'ALERT', icon: AlertTriangle },
  warning: { color: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950', label: 'WARNING', icon: AlertTriangle },
  info: { color: 'bg-blue-500', text: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950', label: 'INFO', icon: Info },
};

const SAMPLE_EVENTS: LogEvent[] = Array.from({ length: 50 }, (_, i) => {
  const types: LogEvent['type'][] = ['critical', 'alert', 'warning', 'info'];
  const sources = ['192.168.1.105', '10.0.0.23', '172.16.0.50', 'web-01', 'db-01', 'mail-01', '10.0.1.200', '192.168.2.15', 'vpn-gateway', 'dns-01'];
  const destinations = ['10.0.0.1', '203.0.113.5', '198.51.100.22', '8.8.8.8', '172.16.0.1', '10.0.0.100'];
  const protocols = ['TCP', 'UDP', 'HTTP', 'HTTPS', 'DNS', 'SMB', 'SSH', 'RDP'];
  const ports = [22, 80, 443, 3389, 445, 53, 3306, 8080, 8443, 25];
  const messages = [
    'Multiple failed login attempts detected',
    'Suspicious outbound connection to unknown IP',
    'Port scan detected from internal host',
    'DNS query to known malicious domain',
    'Elevated privilege escalation attempt',
    'Unusual data transfer detected',
    'Firewall rule violation',
    'SSL certificate mismatch',
    'Brute force attack in progress',
    'Malware signature match: Trojan.Generic',
    'Unauthorized access attempt on admin panel',
    'Cross-site scripting attempt detected',
    'SQL injection attempt on web form',
    'VPN tunnel established successfully',
    'System patch applied automatically',
    'User account created with admin privileges',
    'Sensitive file access audit',
    'RDP connection from unusual location',
    'Email attachment with suspicious hash',
    'IDS signature match: CVE-2026-1234',
  ];

  return {
    id: `evt-${i.toString().padStart(3, '0')}`,
    timestamp: new Date(Date.now() - i * 45000 - Math.random() * 300000).toISOString(),
    source: sources[i % sources.length],
    type: types[Math.floor(Math.random() * (i < 5 ? 2 : 4))],
    message: messages[i % messages.length],
    destination: destinations[i % destinations.length],
    protocol: protocols[i % protocols.length],
    port: ports[i % ports.length],
  };
});

const SUMMARY_STATS = {
  totalEvents: 12847,
  criticalAlerts: 3,
  warnings: 47,
  sourcesMonitored: 24,
  uptime: '99.97%',
  last24h: 3421,
};

export function SiemDashboard() {
  const [events] = useState(SAMPLE_EVENTS);
  const [filteredEvents, setFilteredEvents] = useState(SAMPLE_EVENTS);
  const [activeFilter, setActiveFilter] = useState<LogEvent['type'] | 'all'>('all');
  const [search, setSearch] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<LogEvent | null>(null);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    let filtered = events;
    if (activeFilter !== 'all') {
      filtered = filtered.filter(e => e.type === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(e =>
        e.source.toLowerCase().includes(q) ||
        e.message.toLowerCase().includes(q) ||
        e.destination.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q)
      );
    }
    setFilteredEvents(filtered);
    setVisibleCount(20);
  }, [activeFilter, search, events]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      setFilteredEvents(prev => prev.length > 100 ? prev.slice(0, 100) : prev);
    }, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const totalSeverity = (type: LogEvent['type']) => events.filter(e => e.type === type).length;

  const FilterBtn = ({ type, label }: { type: LogEvent['type'] | 'all'; label: string }) => (
    <button onClick={() => setActiveFilter(type)}
      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
        activeFilter === type ? 'bg-accent text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}>{label}</button>
  );

  return (
    <div className="my-6 space-y-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">SIEM Event Dashboard</h3>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                autoRefresh ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700'
              }`}>
              <RefreshCw className={`w-3 h-3 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? 'Auto' : 'Paused'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-gray-200 dark:bg-gray-700">
          {[
            { label: 'Total Events', value: SUMMARY_STATS.totalEvents.toLocaleString(), icon: Activity, color: 'text-blue-600' },
            { label: 'Critical', value: SUMMARY_STATS.criticalAlerts, icon: AlertCircle, color: 'text-red-600' },
            { label: 'Warnings', value: SUMMARY_STATS.warnings, icon: AlertTriangle, color: 'text-amber-600' },
            { label: 'Sources', value: SUMMARY_STATS.sourcesMonitored, icon: Server, color: 'text-purple-600' },
            { label: 'Uptime', value: SUMMARY_STATS.uptime, icon: Shield, color: 'text-green-600' },
            { label: '24h Ingest', value: SUMMARY_STATS.last24h.toLocaleString(), icon: Activity, color: 'text-accent' },
          ].map(stat => {
            const StatIcon = stat.icon;
            return (
              <div key={stat.label} className="bg-white dark:bg-gray-800 px-3 py-3 text-center">
                <StatIcon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
                <p className="text-lg font-black text-gray-900 dark:text-gray-100">{stat.value}</p>
                <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 flex-wrap">
            <FilterBtn type="all" label="All" />
            <FilterBtn type="critical" label="Critical" />
            <FilterBtn type="alert" label="Alert" />
            <FilterBtn type="warning" label="Warning" />
            <FilterBtn type="info" label="Info" />
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              className="w-48 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-accent/40"
              placeholder="Search IP, message..." />
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-96 overflow-y-auto custom-scrollbar">
          {filteredEvents.slice(0, visibleCount).map(event => {
            const sev = SEVERITY_CONFIG[event.type];
            const SevIcon = sev.icon;
            const time = new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const isSelected = selectedEvent?.id === event.id;
            return (
              <div key={event.id} onClick={() => setSelectedEvent(isSelected ? null : event)}
                className={`flex items-start gap-3 px-4 py-2.5 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                  isSelected ? 'bg-accent/5 dark:bg-accent/10' : ''
                } ${event.type === 'critical' ? 'bg-red-50/50 dark:bg-red-950/20' : ''}`}>
                <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${sev.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${sev.text} ${sev.bg}`}>{sev.label}</span>
                    <span className="text-[10px] font-mono text-gray-400">{event.id}</span>
                    <span className="text-[10px] text-gray-400">{time}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-0.5 truncate">{event.message}</p>
                  <div className="flex items-center gap-3 mt-0.5 text-[10px] text-gray-500">
                    <span className="font-mono">Src: {event.source}</span>
                    <span>→</span>
                    <span className="font-mono">Dst: {event.destination}</span>
                    <span>{event.protocol}:{event.port}</span>
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 mt-1 transition-transform ${isSelected ? 'rotate-180' : ''}`} />
              </div>
            );
          })}
          {filteredEvents.length === 0 && (
            <div className="p-8 text-center text-gray-400 text-sm">No matching events found.</div>
          )}
          {visibleCount < filteredEvents.length && (
            <button onClick={() => setVisibleCount(prev => prev + 20)}
              className="w-full py-2.5 text-xs font-bold text-accent hover:bg-accent/5 transition-all">
              Show {Math.min(20, filteredEvents.length - visibleCount)} more events
            </button>
          )}
        </div>

        {selectedEvent && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-accent" /> Event Details — {selectedEvent.id}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                ['Timestamp', new Date(selectedEvent.timestamp).toLocaleString()],
                ['Severity', SEVERITY_CONFIG[selectedEvent.type].label],
                ['Source', selectedEvent.source],
                ['Destination', selectedEvent.destination],
                ['Protocol', selectedEvent.protocol],
                ['Port', String(selectedEvent.port)],
                ['Message', selectedEvent.message],
              ].map(([label, value]) => (
                <div key={label} className="bg-white dark:bg-gray-800 rounded-lg p-2.5 border border-gray-200 dark:border-gray-700">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className={`font-mono font-semibold text-gray-800 dark:text-gray-200 ${label === 'Message' ? 'col-span-2' : ''}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <p className="text-[10px] text-gray-400 flex items-center gap-1">
        <Info className="w-3 h-3" /> Simulated SIEM data for educational purposes. Click any event to inspect details.
      </p>
    </div>
  );
}
