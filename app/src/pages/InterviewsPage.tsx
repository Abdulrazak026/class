import React, { useState } from 'react';
import { Briefcase, MessageSquare, Search, Filter, ChevronDown, Star, BookOpen, Lightbulb, CheckCircle2, ArrowRight, Clock, Shield } from 'lucide-react';

const CATEGORIES = [
  { id: 'foundational', label: 'Foundational', icon: Shield },
  { id: 'soc', label: 'SOC / Blue Team', icon: Shield },
  { id: 'pentest', label: 'Penetration Testing', icon: Lightbulb },
  { id: 'cloud', label: 'Cloud Security', icon: BookOpen },
  { id: 'grc', label: 'GRC & Compliance', icon: CheckCircle2 },
  { id: 'dfir', label: 'DFIR', icon: Shield },
  { id: 'behavioral', label: 'Behavioral', icon: MessageSquare },
  { id: 'scenario', label: 'Scenario-Based', icon: ArrowRight },
];

const INTERVIEWS = [
  { id: 'iq1', category: 'foundational', difficulty: 'entry', question: 'What is the CIA triad and why is it important in cybersecurity?', answer: 'CIA stands for Confidentiality (data accessible only to authorized users), Integrity (data is accurate and unaltered), and Availability (systems and data are accessible when needed). It\'s the foundational model for developing security policies and evaluating risk, used by frameworks like NIST and ISO 27001. Every security control maps back to at least one element of the triad.' },
  { id: 'iq2', category: 'foundational', difficulty: 'entry', question: 'Explain the difference between a vulnerability, a threat, and a risk.', answer: 'A vulnerability is a weakness (e.g., unpatched software). A threat is something that could exploit that weakness (e.g., a ransomware group). Risk is the likelihood and potential impact of a threat exploiting a vulnerability. Formula: Risk = Threat × Vulnerability × Impact. Risk management involves identifying, assessing, and prioritizing these factors.' },
  { id: 'iq3', category: 'foundational', difficulty: 'entry', question: 'What is defense in depth?', answer: 'Defense in depth is a layered security strategy where multiple independent controls protect assets. If one layer fails, others still provide protection. For example: firewall at network perimeter, EDR on endpoints, encryption for data, access controls, and security awareness training for users. No single control is relied upon.' },
  { id: 'iq4', category: 'foundational', difficulty: 'entry', question: 'What ports do HTTP, HTTPS, SSH, DNS, and FTP use?', answer: 'HTTP=80 (TCP), HTTPS=443 (TCP), SSH=22 (TCP), DNS=53 (UDP/TCP), FTP=21 (control) and 20 (data) (TCP). Knowing these is essential for firewall rule analysis and identifying suspicious traffic.' },
  { id: 'iq5', category: 'foundational', difficulty: 'entry', question: 'Explain the OSI model and which layers are most relevant to security.', answer: '7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. Security-relevant: Layer 2 (MAC flooding, ARP spoofing), Layer 3 (IP spoofing, routing attacks), Layer 4 (port scanning, SYN floods), Layer 7 (web app attacks, SQLi, XSS). Firewalls operate at L3-L4, WAFs at L7.' },
  { id: 'iq6', category: 'foundational', difficulty: 'mid', question: 'What is the difference between symmetric and asymmetric encryption?', answer: 'Symmetric uses one key for both encryption and decryption (e.g., AES, DES). Fast but key distribution is a challenge. Asymmetric uses a public/private key pair (e.g., RSA, ECC). Slower but enables secure key exchange and digital signatures. In practice: asymmetric is used for key exchange (TLS handshake), then symmetric for bulk data encryption.' },
  { id: 'iq7', category: 'foundational', difficulty: 'mid', question: 'Explain how a TLS handshake works.', answer: '1) Client sends ClientHello with supported TLS versions and cipher suites. 2) Server responds with ServerHello, its certificate (containing public key), and selects cipher suite. 3) Client verifies the certificate against a trusted CA, generates a pre-master secret, encrypts it with the server\'s public key, and sends it. 4) Server decrypts with its private key. Both derive session keys from the pre-master secret. 5) They exchange Finished messages (encrypted with session keys) to confirm. Now secure symmetric encryption is established.' },
  { id: 'iq8', category: 'soc', difficulty: 'entry', question: 'Walk me through how you would handle a phishing alert.', answer: '1) Triage: verify the alert and check if other users received similar emails. 2) Analyze headers: check SPF, DKIM, DMARC; examine sender IP against threat intel. 3) Sandbox: open links/attachments in isolated environment. 4) Contain: block sender domain, delete emails from all inboxes, update security filtering rules. 5) Report: document IoCs (sender, subject, hashes), escalate if credentials were compromised or malware executed.' },
  { id: 'iq9', category: 'soc', difficulty: 'entry', question: 'What is the difference between IDS and IPS?', answer: 'IDS (Intrusion Detection System) monitors traffic and alerts on suspicious activity but does not take action. IPS (Intrusion Prevention System) sits inline and actively blocks malicious traffic. IPS adds latency risk (may block legitimate traffic) but reduces response time. Both use signature-based, anomaly-based, or behavior-based detection. Many modern tools are unified (NGIPS).' },
  { id: 'iq10', category: 'soc', difficulty: 'entry', question: 'What would you do if you saw a spike in outbound traffic at 3 AM?', answer: '1) Check which host and destination IP/port. 2) Verify against known business operations (scheduled backups, updates). 3) Query firewall logs — if to an unknown external IP on non-standard port, investigate for data exfiltration. 4) Check for malware indicators: abnormal process connecting out, encoded traffic. 5) Contain: block at firewall, isolate host if confirmed malicious. 6) Document and escalate per IR plan.' },
  { id: 'iq11', category: 'soc', difficulty: 'mid', question: 'Explain the incident response lifecycle.', answer: 'NIST SP 800-61 defines 4 phases: 1) Preparation — tools, playbooks, training in place before incident. 2) Detection & Analysis — identify anomalies, validate alerts, scope the incident. 3) Containment, Eradication & Recovery — short-term containment (isolate host), long-term containment (apply patches), eradicate root cause, restore systems. 4) Post-Incident Activity — lessons learned, update playbooks, report to stakeholders. This is iterative; findings from each incident improve preparation.' },
  { id: 'iq12', category: 'soc', difficulty: 'mid', question: 'How do you prioritize alerts in a SOC?', answer: 'Based on: 1) Criticality of affected assets (crown jewels vs. test servers). 2) Type of threat (ransomware > scanning). 3) Verdict confidence (multiple correlated signals > single alert). 4) MITRE ATT&CK tactics (lateral movement > reconnaissance). 5) Business context (GDPR data involved = higher priority). Many SOCs use a triage matrix: Critical (respond within 15 min), High (1 hr), Medium (4 hrs), Low (next business day).' },
  { id: 'iq13', category: 'soc', difficulty: 'senior', question: 'Design a detection for ransomware on an endpoint.', answer: 'Use multiple signals: 1) Process behavior: rapid file modifications/renames, shadow copy deletion (vssadmin.exe), volume shadow copy deletions. 2) File telemetry: many newly created .encrypted/.locked files, entropy increase. 3) Network: C2 callbacks, SMB spikes (lateral movement). 4) Alert correlation: same host triggers file change alerts + process creation alerts + network alerts. Implement in EDR with custom Sigma rules combining these signals. Threshold: >50 file renames in <60s on non-backup directories.' },
  { id: 'iq14', category: 'pentest', difficulty: 'mid', question: 'Walk me through a web application penetration test.', answer: '1) Reconnaissance: subdomain enumeration, directory brute-force, technology fingerprinting. 2) Configuration testing: default credentials, debug endpoints, exposed config files. 3) OWASP Top 10 testing: SQLi, XSS, CSRF, SSRF, IDOR, file upload, authentication bypass. 4) Logic testing: business logic flaws, race conditions, privilege escalation. 5) API testing: injection, broken auth, excessive data exposure. 6) Reporting: findings with CVSS scores, PoC, remediation steps.' },
  { id: 'iq15', category: 'pentest', difficulty: 'mid', question: 'What is the difference between a vulnerability scan and a penetration test?', answer: 'A vulnerability scan is an automated check for known CVEs — broad but noisy, can flag false positives. A penetration test is a manual, goal-oriented assessment that actively exploits vulnerabilities to prove business impact. Pentesting includes chaining multiple vulnerabilities, testing business logic, and creative bypasses that scanners miss. Analogy: scanning = checking if doors are locked; pentesting = trying to pick the locks.' },
  { id: 'iq16', category: 'pentest', difficulty: 'senior', question: 'How would you bypass a Web Application Firewall (WAF)?', answer: '1) Encoding bypasses: double URL encoding, Unicode encoding, case variation. 2) HTTP smuggling: CL.TE or TE.CL discrepancies between proxy and backend. 3) Parameter pollution: sending unexpected parameter structures. 4) IP rotation: using proxies/rotating IPs to avoid rate limits. 5) Payload obfuscation: comment insertion, hex encoding, whitespace manipulation. 6) Protocol downgrade: forcing HTTP/1.0 to bypass WAF rules optimized for HTTP/2. 7) Out-of-band techniques: using DNS/HTTP exfiltration for SQLi/blind command injection.' },
  { id: 'iq17', category: 'cloud', difficulty: 'mid', question: 'What is the shared responsibility model in cloud security?', answer: 'The cloud provider is responsible for security OF the cloud (physical security, hypervisor, network infrastructure). The customer is responsible for security IN the cloud (data, IAM configurations, OS patches, network ACLs, app security). Specifics vary by service model: IaaS gives customer more control/responsibility, SaaS gives cloud provider more responsibility. Common customer mistakes: misconfigured S3 buckets, overly permissive IAM roles, unencrypted data at rest.' },
  { id: 'iq18', category: 'cloud', difficulty: 'senior', question: 'How would you architect a zero-trust network for a multi-cloud environment?', answer: '1) Identity as perimeter: strong IAM with MFA, least-privilege, Just-In-Time access. 2) Micro-segmentation: granular security groups between workloads, no trust between pods/services. 3) Service mesh (e.g., Istio): mutual TLS, fine-grained policy between services. 4) Cloud-agnostic: use Terraform for consistent policies across AWS/Azure/GCP. 5) Continuous monitoring: CloudTrail/Azure Monitor/GCP Audit Logs aggregated in SIEM. 6) Secrets management: Vault/Secrets Manager, never hardcoded. 7) Network: no direct internet ingress — use CloudFront/API Gateway + WAF.' },
  { id: 'iq19', category: 'grc', difficulty: 'mid', question: 'What is the difference between PCI DSS, HIPAA, and SOC 2?', answer: 'PCI DSS applies to any organization handling credit card data — prescriptive 12 requirements with annual assessments. HIPAA applies to healthcare providers handling PHI in the US — focuses on administrative, physical, and technical safeguards. SOC 2 is a broad service-organization audit covering 5 trust criteria (security, availability, processing integrity, confidentiality, privacy). PCI is regulatory (fines for non-compliance), HIPAA is regulatory (law enforcement), SOC 2 is contractual (customer-driven).' },
  { id: 'iq20', category: 'grc', difficulty: 'senior', question: 'How do you quantify cyber risk to the board?', answer: 'Use FAIR model (Factor Analysis of Information Risk): 1) Identify assets and threat scenarios. 2) Estimate Loss Event Frequency (LEF) — how often will it happen? 3) Estimate Loss Magnitude (LM) — financial impact per event. 4) Calculate Annualized Loss Expectancy (ALE) = LEF × LM. 5) Compare with proposed control costs. Present in $ terms, not technical jargon. Example: "Our unpatched web server has a 15% annual probability of breach with expected $2M loss, vs. $50K for a WAF that reduces probability to 2%."' },
  { id: 'iq21', category: 'dfir', difficulty: 'mid', question: 'What is the order of volatility when collecting evidence?', answer: 'RFC 3227 guidelines: Collect from most volatile to least: 1) CPU registers and cache. 2) Running processes and kernel memory. 3) Network connections and ARP cache. 4) System memory (RAM). 5) Temporary file systems. 6) Disk storage (HDD/SSD). 7) Remote logs and archives. Rationale: more volatile data disappears quickly and cannot be recovered. RAM is collected first on a live system; disk imaging happens after shutdown.' },
  { id: 'iq22', category: 'dfir', difficulty: 'senior', question: 'Walk me through analyzing a potentially infected memory dump.', answer: 'Using Volatility: 1) Profile identification (imageinfo/kdbgscan to get OS version). 2) Process listing (pslist, psscan, pstree) — look for hidden/injected processes. 3) DLL listing (dlllist, ldrmodules) — detect DLL injection. 4) Network connections (netscan) — find C2 callbacks. 5) Handles (handles) — suspicious file handles, mutexes. 6) MFT (mftparser) — recently created/deleted files. 7) Malware config extraction (malware config parsers). Key indicators: process not listed in pstools but in psscan, suspicious connections, injected code.' },
  { id: 'iq23', category: 'behavioral', difficulty: 'entry', question: 'Tell me about a time you solved a difficult technical problem.', answer: 'Use STAR method: Situation (I was the first responder on a suspected ransomware incident), Task (contain the outbreak and determine scope), Action (isolated the host from the network, collected memory dump with FTK Imager, analyzed Event Logs for lateral movement, extracted ransomware note for IoCs), Result (confirmed single-host compromise, blocked C2 IPs at the firewall, documented process for future incidents). Emphasize methodology, communication, and collaboration.' },
  { id: 'iq24', category: 'behavioral', difficulty: 'mid', question: 'How do you handle a situation where you disagree with a senior engineer about a security approach?', answer: '1) Respectfully acknowledge their experience and perspective. 2) Present my reasoning with data/evidence (e.g., "Based on CVE-2026-1001, patching is critical even though it causes temporary downtime"). 3) Propose a compromise (e.g., staged rollout with rollback plan). 4) Accept and learn from the outcome — if my approach was correct, they gain respect; if theirs was, I learn. Key: be humble, evidence-driven, and team-oriented. Security is about risk acceptance, not winning arguments.' },
  { id: 'iq25', category: 'scenario', difficulty: 'mid', question: 'You find an unpatched critical vulnerability in production. The business says patching will cause 4 hours of downtime. What do you do?', answer: '1) Assess actual exploitability: is this CVE actively exploited? Does the vulnerable service face the internet? 2) Check if virtual patching is possible via WAF/IPS rules. 3) Propose alternatives: deploy to a staging environment first, test, then schedule maintenance outside business hours. 4) Negotiate a timeline: if critical, patch within 24-48 hours; if actively exploited in the wild, escalate to executive decision-maker. 5) Document risk acceptance if business decides to defer — signed by appropriate authority with agreed-upon compensating controls.' },
  { id: 'iq26', category: 'scenario', difficulty: 'senior', question: 'Your CEO receives a spear-phishing email that appears to come from the board chair, requesting urgent wire transfer. What happened and what do you do?', answer: 'Incident: Business Email Compromise (BEC) / CEO fraud. Immediate: 1) Confirm with board chair via separate channel (phone, in-person) — do not reply to the email. 2) Check if any wire transfers were already initiated — contact finance to verify. 3) If transfer happened, contact bank immediately for reversal (Wolfsberg Group guidance — time-critical). 4) Analyze the email: header analysis (SPF/DKIM/DMARC), check if it was external spoofing or compromised vendor. 5) Scope the compromise: was the CEO\'s account actually compromised? Check mailbox access logs, forwarding rules. 6) Block the attacker\'s domain at email gateway, reset affected accounts. 7) Report to law enforcement (FBI IC3 for US). 8) Conduct security awareness retraining focused on financial transaction verification procedures.' },
];

const DIFFICULTIES = ['entry', 'mid', 'senior'] as const;
const DIFF_LABELS: Record<string, string> = { entry: 'Entry-Level', mid: 'Mid-Level', senior: 'Senior-Level' };

export function InterviewsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('foundational');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = INTERVIEWS.filter(iq => {
    const catMatch = iq.category === activeCategory;
    const diffMatch = activeDifficulty === 'all' || iq.difficulty === activeDifficulty;
    const searchMatch = !search.trim() || iq.question.toLowerCase().includes(search.toLowerCase()) || iq.answer.toLowerCase().includes(search.toLowerCase());
    return catMatch && diffMatch && searchMatch;
  });

  const CatIcon = CATEGORIES.find(c => c.id === activeCategory)?.icon || Shield;

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100">Interview Preparation</h1>
        <p className="text-sm text-gray-400 mt-1">30+ real interview questions with detailed answers across all security domains</p>
      </div>

      <div className="flex flex-wrap gap-1 mb-6">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          const count = INTERVIEWS.filter(i => i.category === cat.id).length;
          return (
            <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setExpandedId(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                isActive ? 'bg-accent text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}>
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
              <span className={`text-[9px] px-1 rounded ${isActive ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-600'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-accent/40"
            placeholder="Search questions..." />
        </div>
        <div className="flex gap-1">
          {DIFFICULTIES.map(d => (
            <button key={d} onClick={() => setActiveDifficulty(d === activeDifficulty ? 'all' : d)}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                activeDifficulty === d ? 'bg-accent text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}>
              {DIFF_LABELS[d]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">No interview questions match your search.</div>
        )}
        {filtered.map(iq => {
          const isExpanded = expandedId === iq.id;
          return (
            <div key={iq.id}
              className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden transition-all ${
                isExpanded ? 'shadow-md ring-1 ring-accent/20' : 'hover:shadow-sm hover:border-accent/40'
              }`}>
              <button onClick={() => setExpandedId(isExpanded ? null : iq.id)}
                className="w-full text-left p-4 flex items-start gap-3">
                <div className={`mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${
                  iq.difficulty === 'entry' ? 'bg-green-500' : iq.difficulty === 'mid' ? 'bg-amber-500' : 'bg-red-500'
                }`}>
                  {iq.difficulty === 'entry' ? 'E' : iq.difficulty === 'mid' ? 'M' : 'S'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-relaxed">{iq.question}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 mt-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 pt-0">
                  <div className="ml-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
                        {iq.answer.split('\n').map((para, i) => (
                          <p key={i}>{para.trim()}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-gray-400 mt-8 text-center">
        {filtered.length} question{filtered.length !== 1 ? 's' : ''} in this view. Press any question to reveal the answer.
      </p>
    </div>
  );
}
