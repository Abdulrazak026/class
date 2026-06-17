import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, Trash2, AlertTriangle, Shield, CheckCircle2 } from 'lucide-react';

interface Command {
  cmd: string;
  output: string;
  isError?: boolean;
}

const COMMANDS: Record<string, () => string> = {
  help: () => `Available commands:
  ping <host>       Test connectivity
  nmap <target>     Scan open ports
  whois <domain>    Look up domain info
  traceroute <host> Trace network path
  netstat           Show network connections
  dig <domain>      DNS lookup
  curl <url>        Fetch URL
  ssh <user>@<host> Connect via SSH
  clear             Clear terminal
  help              Show this help`,

  ping: () => `PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=12.3ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=11.8ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=117 time=12.1ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=117 time=11.9ms

--- 8.8.8.8 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss
rtt min/avg/max/mdev = 11.8/12.025/12.3/0.192 ms`,

  nmap: () => `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.18s latency).
Not shown: 992 filtered tcp ports (no-response)
PORT     STATE    SERVICE
22/tcp   open     ssh
25/tcp   filtered smtp
80/tcp   open     http
443/tcp  open     https
3389/tcp filtered ms-wbt-server
8080/tcp open     http-proxy

Nmap done: 1 IP address (1 host up) scanned in 14.23s`,

  whois: () => `Domain Name: EXAMPLE.COM
Registry Domain ID: 2336799_DOMAIN_COM-VRSN
Registrar WHOIS Server: whois.iana.org
Creation Date: 1995-08-14T04:00:00Z
Registry Expiry Date: 2026-08-13T04:00:00Z
Name Server: A.IANA-SERVERS.NET, B.IANA-SERVERS.NET
DNSSEC: signedDelegation
Status: clientDeleteProhibited, clientTransferProhibited`,

  traceroute: () => `traceroute to 8.8.8.8 (8.8.8.8), 30 hops max
 1  <1 ms    <1 ms    <1 ms   192.168.1.1
 2   8 ms     7 ms     9 ms   10.0.0.1
 3  11 ms    10 ms    12 ms   72.14.242.33
 4  13 ms    12 ms    14 ms   108.170.252.129
 5  13 ms    13 ms    14 ms   216.239.43.195
 6  14 ms    14 ms    13 ms   8.8.8.8`,

  netstat: () => `Active Internet connections (servers & established)
Proto  Local Address          Foreign Address        State
tcp    0.0.0.0:22             0.0.0.0:*              LISTEN
tcp    0.0.0.0:80             0.0.0.0:*              LISTEN
tcp    0.0.0.0:443            0.0.0.0:*              LISTEN
tcp    192.168.1.10:54372     142.250.80.46:443      ESTABLISHED
tcp    192.168.1.10:54380     8.8.8.8:53             ESTABLISHED
tcp    192.168.1.10:54401     104.16.132.229:443     TIME_WAIT
udp    0.0.0.0:5353           0.0.0.0:*`,

  dig: () => `; <<>> DiG 9.18.19 <<>> example.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 2

;; QUESTION SECTION:
;example.com.           IN  A

;; ANSWER SECTION:
example.com.    86400   IN  A   93.184.216.34

;; Query time: 47 msec
;; SERVER: 8.8.8.8#53(8.8.8.8) (UDP)
;; WHEN: Mon Jun 16 14:22:01 EDT 2026
;; MSG SIZE  rcvd: 56`,

  curl: () => `HTTP/2 200
date: Mon, 16 Jun 2026 14:22:01 GMT
content-type: text/html; charset=UTF-8
content-length: 1256
server: ECS (dcb/7F3E)
cache-control: max-age=604800

<!DOCTYPE html>
<html>
<head><title>Example Domain</title>...</head>
<body><h1>Example Domain</h1>
<p>This domain is for use in illustrative examples...</p>
</body>
</html>`,

  ssh: () => `The authenticity of host 'server.example.com (10.0.0.5)' can't be established.
ED25519 key fingerprint is SHA256:abc123def456ghij789klm.
Are you sure you want to continue connecting? Yes
Warning: Permanently added 'server.example.com' (ED25519) to the list of known hosts.
Password: 
Last login: Mon Jun 16 13:45:22 2026 from 192.168.1.10
[user@server ~]$ _`,
};

export function TerminalSimulator() {
  const [commands, setCommands] = useState<Command[]>([
    { cmd: '', output: 'CYBERCAMP-2026 Security Terminal v1.0\nType "help" for available commands.', isError: false },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commands]);

  const execute = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setHistory(prev => [...prev, trimmed]);
    setHistoryIdx(-1);

    if (trimmed === 'clear') {
      setCommands([]);
      return;
    }

    const base = trimmed.split(' ')[0];
    const handler = COMMANDS[base];
    if (handler) {
      setCommands(prev => [...prev, { cmd: trimmed, output: handler() }]);
    } else {
      setCommands(prev => [...prev, { cmd: trimmed, output: `Command not found: ${base}. Type "help" for available commands.`, isError: true }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      execute(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx >= 0) {
        const idx = historyIdx + 1;
        if (idx >= history.length) {
          setHistoryIdx(-1);
          setInput('');
        } else {
          setHistoryIdx(idx);
          setInput(history[idx]);
        }
      }
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Security Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] text-gray-500"><Shield className="w-3 h-3 text-green-400" /> Encrypted</span>
          <button onClick={() => setCommands([{ cmd: '', output: 'Terminal cleared.', isError: false }])}
            className="text-gray-500 hover:text-gray-300 transition-colors" title="Clear">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed max-h-96 overflow-y-auto custom-scrollbar" onClick={() => inputRef.current?.focus()}>
        {commands.map((c, i) => (
          <div key={i}>
            {c.cmd && <div className="flex items-start gap-2 text-cyan-300"><span className="text-gray-500 shrink-0">$</span><span>{c.cmd}</span></div>}
            <pre className={`whitespace-pre-wrap ${c.isError ? 'text-red-400' : 'text-gray-300'} ml-4 mb-2`}>{c.output}</pre>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-cyan-400 font-bold">$</span>
          <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-gray-200 outline-none border-none font-mono placeholder-gray-600"
            placeholder="Type a command..." spellCheck={false} autoComplete="off" />
        </div>
        <div ref={endRef} />
      </div>
      <div className="px-4 py-1.5 bg-gray-800/50 border-t border-gray-700 flex items-center gap-3">
        <Play className="w-3 h-3 text-gray-500" />
        <span className="text-[10px] text-gray-500">Try: ping, nmap, whois, traceroute, netstat, dig, curl, ssh</span>
      </div>
    </div>
  );
}
