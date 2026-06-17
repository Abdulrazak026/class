import React, { useState, useEffect, useRef } from 'react';
import { Shield, Search, AlertTriangle, CheckCircle2, Target, Zap, Clock, Server, Globe, Lock, Bug, ArrowRight } from 'lucide-react';

interface Vulnerability {
  id: string;
  name: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  cvss: number;
  description: string;
  remediation: string;
  cve?: string;
  affected: string;
}

interface ScanTarget {
  id: string;
  host: string;
  ports: string;
  os: string;
}

const SCAN_TARGETS: ScanTarget[] = [
  { id: 't1', host: '192.168.1.10', ports: '22, 80, 443, 3306', os: 'Ubuntu 22.04 LTS' },
  { id: 't2', host: '10.0.0.5', ports: '445, 3389, 5985', os: 'Windows Server 2022' },
  { id: 't3', host: '172.16.0.20', ports: '80, 443, 8080, 8443', os: 'Apache/2.4.57 (Debian)' },
  { id: 't4', host: '192.168.1.50', ports: '22, 443', os: 'FreeBSD 13.2' },
  { id: 't5', host: '10.0.1.100', ports: '23, 80, 161', os: 'Cisco IOS 15.7' },
];

const VULN_DB: Record<string, Vulnerability[]> = {
  t1: [
    { id: 'CVE-2026-1001', name: 'OpenSSH 8.9p1 Username Enumeration', severity: 'Medium', cvss: 5.3, cve: 'CVE-2026-1001', description: 'OpenSSH server is vulnerable to username enumeration via timing-based side-channel attack.', remediation: 'Upgrade OpenSSH to version 9.0p1 or later.', affected: 'SSH port 22' },
    { id: 'CVE-2026-1002', name: 'Apache HTTP Server Directory Traversal', severity: 'High', cvss: 7.5, cve: 'CVE-2026-1002', description: 'Directory traversal vulnerability in Apache HTTP Server allows reading arbitrary files.', remediation: 'Apply Apache patch 2.4.58 or configure mod_rewrite rules.', affected: 'HTTP port 80' },
    { id: 'CVE-2026-1003', name: 'OpenSSL 3.0.7 Heartbleed Variant', severity: 'Critical', cvss: 9.1, cve: 'CVE-2026-1003', description: 'Memory disclosure vulnerability in OpenSSL heartbeat extension.', remediation: 'Upgrade OpenSSL to 3.0.8+ and revoke/reissue TLS certificates.', affected: 'HTTPS port 443' },
    { id: 'CVE-2026-1004', name: 'MySQL 8.0.32 Default Credentials', severity: 'High', cvss: 8.0, description: 'MySQL instance running with default root credentials on non-standard port.', remediation: 'Change default credentials, restrict access via firewall.', affected: 'MySQL port 3306' },
  ],
  t2: [
    { id: 'CVE-2026-2001', name: 'SMBv1 Protocol Enabled', severity: 'Critical', cvss: 9.0, description: 'SMBv1 protocol enabled, vulnerable to EternalBlue-style attacks.', remediation: 'Disable SMBv1 via Windows Features or Group Policy.', affected: 'SMB port 445' },
    { id: 'CVE-2026-2002', name: 'RDP Weak Encryption Allowed', severity: 'High', cvss: 7.0, description: 'Remote Desktop configured to allow connections with weak encryption.', remediation: 'Enforce Network Level Authentication (NLA) and TLS 1.2+.', affected: 'RDP port 3389' },
    { id: 'CVE-2026-2003', name: 'WinRM Basic Auth Enabled', severity: 'Medium', cvss: 6.0, description: 'Windows Remote Management allowing Basic authentication over HTTP.', remediation: 'Enable Kerberos authentication and enforce HTTPS for WinRM.', affected: 'WinRM port 5985' },
  ],
  t3: [
    { id: 'CVE-2026-3001', name: 'Apache Tomcat AJP Connector', severity: 'Critical', cvss: 9.8, cve: 'CVE-2020-1938', description: 'AJP connector exposed allowing Ghostcat file read/include attack.', remediation: 'Disable AJP connector if unused, or upgrade Tomcat and set requiredSecret.', affected: 'AJP port 8009 → 8080' },
    { id: 'CVE-2026-3002', name: 'TLS 1.0/1.1 Enabled', severity: 'Medium', cvss: 5.0, description: 'Server supports deprecated TLS protocol versions.', remediation: 'Disable TLS 1.0 and 1.1, enable TLS 1.3.', affected: 'HTTPS ports 443, 8443' },
    { id: 'CVE-2026-3003', name: 'HTTP Security Headers Missing', severity: 'Medium', cvss: 4.0, description: 'Missing security headers: HSTS, X-Frame-Options, CSP, X-Content-Type-Options.', remediation: 'Add recommended security headers to web server configuration.', affected: 'HTTP port 80, 8080' },
  ],
  t4: [
    { id: 'CVE-2026-4001', name: 'FreeBSD OpenSSH Legacy Host Key', severity: 'Low', cvss: 3.0, description: 'SSH server configured with 1024-bit DSA host key.', remediation: 'Generate new Ed25519 host key, remove DSA key.', affected: 'SSH port 22' },
    { id: 'CVE-2026-4002', name: 'Self-Signed TLS Certificate', severity: 'Low', cvss: 2.0, description: 'HTTPS using self-signed certificate not in trusted CA store.', remediation: 'Replace with certificate from trusted CA or Let\'s Encrypt.', affected: 'HTTPS port 443' },
  ],
  t5: [
    { id: 'CVE-2026-5001', name: 'Cisco IOS Telnet Enabled', severity: 'High', cvss: 7.5, description: 'Telnet service enabled with plaintext authentication on router.', remediation: 'Disable Telnet, enable SSHv2 for remote management.', affected: 'Telnet port 23' },
    { id: 'CVE-2026-5002', name: 'SNMPv1/v2c Public Community', severity: 'High', cvss: 7.0, description: 'SNMP configured with default "public" community string (read/write).', remediation: 'Disable SNMPv1/v2c, migrate to SNMPv3 with auth/priv.', affected: 'SNMP port 161' },
  ],
};

const SEVERITY_ORDER = { Critical: 0, High: 1, Medium: 2, Low: 3 };

export function VulnScanner() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [results, setResults] = useState<Record<string, Vulnerability[]>>({});
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [scanLog, setScanLog] = useState<string[]>([]);
  const [expandedVuln, setExpandedVuln] = useState<string | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [scanLog]);

  const startScan = (targetId: string) => {
    setScanning(true);
    setScanned(false);
    setResults({});
    setScanLog([]);
    setSelectedTarget(targetId);
    setExpandedVuln(null);

    const target = SCAN_TARGETS.find(t => t.id === targetId);
    if (!target) return;

    const steps = [
      `[${new Date().toLocaleTimeString()}] Initiating vulnerability scan against ${target.host}`,
      `[${new Date().toLocaleTimeString()}] Target OS fingerprint: ${target.os}`,
      `[${new Date().toLocaleTimeString()}] Open ports detected: ${target.ports}`,
      `[${new Date().toLocaleTimeString()}] Enumerating service versions...`,
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setScanLog(prev => [...prev, steps[stepIdx]]);
        stepIdx++;
      } else {
        clearInterval(interval);
        const vulns = VULN_DB[targetId] || [];
        setTimeout(() => {
          setScanLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] Scan complete. Found ${vulns.length} vulnerabilities.`]);
          setResults({ [targetId]: vulns });
          setScanned(true);
          setScanning(false);
        }, 400);
      }
    }, 350);
  };

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-amber-500 text-white';
      case 'Low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const getRiskBar = (cvss: number) => {
    if (cvss >= 9) return 'w-[90%] bg-red-500';
    if (cvss >= 7) return 'w-[70%] bg-orange-500';
    if (cvss >= 4) return 'w-[40%] bg-amber-500';
    return 'w-[20%] bg-blue-500';
  };

  const target = selectedTarget ? SCAN_TARGETS.find(t => t.id === selectedTarget) : null;
  const allVulns = target && results[target.id] ? [...results[target.id]].sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]) : [];

  return (
    <div className="my-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Bug className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">Vulnerability Scanner</h3>
        </div>
        {scanning && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-accent">
            <Zap className="w-3.5 h-3.5 animate-pulse" /> Scanning...
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
          {SCAN_TARGETS.map(t => {
            const isSelected = selectedTarget === t.id;
            return (
              <button key={t.id} onClick={() => !scanning && startScan(t.id)}
                disabled={scanning}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  isSelected ? 'border-accent bg-accent/5' : 'border-gray-200 dark:border-gray-600 hover:border-accent/40'
                } ${scanning ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Server className={`w-3.5 h-3.5 ${isSelected ? 'text-accent' : 'text-gray-400'}`} />
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">{t.host}</span>
                </div>
                <p className="text-[9px] text-gray-400 font-mono">{t.os.slice(0, 20)}</p>
                <p className="text-[9px] text-gray-400 mt-0.5">Ports: {t.ports}</p>
              </button>
            );
          })}
        </div>

        {scanLog.length > 0 && (
          <div className="mb-4 bg-gray-900 rounded-xl p-3 max-h-32 overflow-y-auto custom-scrollbar font-mono text-[11px] leading-relaxed">
            {scanLog.map((line, i) => (
              <div key={i} className={`${line.includes('Complete') ? 'text-green-400' : line.includes('Found') ? 'text-amber-400' : 'text-gray-400'}`}>{line}</div>
            ))}
            <div ref={logEndRef} />
          </div>
        )}

        {scanned && allVulns.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-accent" /> Scan Results
              </h4>
              <div className="flex items-center gap-2">
                {['Critical', 'High', 'Medium', 'Low'].map(sev => {
                  const count = allVulns.filter(v => v.severity === sev).length;
                  return count > 0 ? (
                    <span key={sev} className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${getSeverityColor(sev)}`}>
                      {sev}: {count}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              {allVulns.map(vuln => {
                const isExpanded = expandedVuln === vuln.id;
                return (
                  <div key={vuln.id}>
                    <button onClick={() => setExpandedVuln(isExpanded ? null : vuln.id)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${getSeverityColor(vuln.severity)}`}>{vuln.severity}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{vuln.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-mono text-gray-400">CVSS {vuln.cvss}</span>
                          {vuln.cve && <span className="text-[10px] font-mono text-gray-400">{vuln.cve}</span>}
                          <span className="text-[10px] text-gray-400">{vuln.affected}</span>
                        </div>
                      </div>
                      <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden shrink-0">
                        <div className={`h-full rounded-full ${getRiskBar(vuln.cvss)}`} />
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-3 pt-0 bg-gray-50 dark:bg-gray-900">
                        <div className="ml-8 space-y-2">
                          <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase">Description</p>
                            <p className="text-xs text-gray-700 dark:text-gray-300">{vuln.description}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase">Remediation</p>
                            <p className="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-1"><Shield className="w-3 h-3 text-green-500 shrink-0" /> {vuln.remediation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-gray-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" /> Found {allVulns.length} vulnerabilities across {allVulns.filter(v => v.severity === 'Critical').length} critical, {allVulns.filter(v => v.severity === 'High').length} high severity.
            </p>
          </div>
        )}

        {!selectedTarget && !scanning && (
          <div className="text-center py-6 text-gray-400 text-sm">
            <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            Select a target to begin vulnerability scanning.
          </div>
        )}
      </div>
    </div>
  );
}
