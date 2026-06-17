# CYBERCAMP-2026: Cybersecurity Accelerator — Definitive Plan

> **Goal:** Transform the existing Data Analyst Accelerator platform into a comprehensive Cybersecurity Accelerator (CYBERCAMP-2026) covering 56 weeks from zero to industry expert.

---

## 1. Architecture Summary

### Current State
- 26-week Data Analyst Accelerator (DACAMP-2026)
- React 19 + Vite 6 + TypeScript 5.8 + TailwindCSS 4 + Firebase
- 17 components, 4 pages (Dashboard, CoursePlayer, Projects, StudyRoom)
- AES-256-GCM encrypted data files with key `DACAMP-2026`
- ~10,300 lines of curriculum content, ~1,500 lines of lab exercises

### Target State
- 56-week Cybersecurity Accelerator (CYBERCAMP-2026) — 7 phases
- Same React/Vite/Firebase architecture, fully rebranded
- 8 new interactive security components, 3 new pages
- Teal/Cyan accent theme, encrypted with key `CYBERCAMP-2026`
- ~30,000+ lines of curriculum content, ~3,500 lines of exercises

---

## 2. Gap Analysis: Provided Industry Plan vs. Original Plan

### Provided Plan Structure
| Section | Content |
|---|---|
| Roles & Requirements | Entry (0-2yr), Mid (3-5yr), Senior (5+yr) with BLS/Indeed citations |
| Certifications | Foundational → Entry-Level → Advanced with prerequisites explained |
| Career Progression | Entry → Mid → Senior → Executive with lateral moves |
| Learning Timeline | Months 1-3 → 4-6 → 7-12 → 1-3yr → 3-7yr → 7+yr |
| NICE Framework | Categorizes tasks: Securely Provision, Protect & Defend, Investigate, |
| Soft Skills | Teamwork, communication, problem-solving |
| Education Paths | Bachelor's, associate, certification alternatives |

### What My Plan Was Missing vs. the Provided Plan

| Gap | Severity | Resolution |
|---|---|---|
| IT Fundamentals (A+/hardware) | **Critical** | Added Phase 00 |
| Home Lab Setup guidance | **Moderate** | Added concrete VM/network setup module |
| Soft Skills (communication, teamwork) | **Moderate** | Added to Phase 06 |
| Degree/Education paths | **Moderate** | Added education options section |
| Professional Networking (LinkedIn, meetups, cons) | **Moderate** | Added to Phase 06 |
| Continuous Learning plan | **Moderate** | Added post-cert learning module |
| NICE Framework integration | **Moderate** | Each phase mapped to NICE categories |
| CCISO Certification | **Minor** | Added to executive track |
| Vendor certs (Cisco CCNA Security, Azure AZ-500) | **Moderate** | Added vendor cert options |
| Bug Bounties as practice | **Minor** | Added to Red Team phase |
| ISC2 Associate workaround | **Minor** | Added cert path workarounds |
| Entry-level job reality (help desk pipeline) | **Moderate** | Added job-seeking strategy |
| Executive pathway (7-10yr CISO track) | **Moderate** | Added Phase 06 executive module |
| Cert timing guide (1-2 per year) | **Moderate** | Added year-by-year targets |

### What My Plan Does Better Than the Provided Plan

| Advantage | Details |
|---|---|
| **Interactive tools** | 8 security-specific components: TerminalSimulator, SiemDashboard, NetworkVisualizer, VulnScanner, ThreatIntelBoard, ForensicsWorkspace, CtfChallenge, CertTracker |
| **Hands-on structure** | Per-topic lab challenges with code, quizzes, AI prompts |
| **Certification database** | 25+ certs with cost, format, validity, DoD 8140, TCO |
| **Salary data** | Multi-region (US, UK, EU, India, Remote) |
| **Interview Q&A** | 30+ questions with category/difficulty filtering |
| **Full app integration** | Progress tracking, Firebase sync, dark mode, mobile |
| **DoD 8140 alignment** | Mapped per certification |
| **MITRE ATT&CK** | Dedicated ThreatIntelBoard component |

---

## 3. Final Revised 7-Phase Structure

```
Phase 00: IT Fundamentals         [Weeks 00-06 | Months 1-2]
Phase 01: Security Foundations    [Weeks 07-14 | Months 3-4]
Phase 02: Blue Team Core          [Weeks 15-26 | Months 5-7]
Phase 03: Red Team Fundamentals   [Weeks 27-34 | Months 8-10]
Phase 04: Specialization          [Weeks 35-42 | Months 11-13]
Phase 05: Cert Prep + Advanced    [Weeks 43-48 | Months 14-16]
Phase 06: Career & Executive      [Weeks 49-56 | Months 17-18+]
```

### Phase 00 — IT Fundamentals (Weeks 00-06)

Focus: Building the IT foundation required before any cybersecurity role.

| Week | Topics | Lab | Cert Alignment |
|---|---|---|---|
| 00 | Computer hardware basics, OS types, file systems | VirtualBox/VMware setup, install Ubuntu VM | A+ |
| 01 | Networking fundamentals: TCP/IP, OSI model, subnetting | Wireshark packet capture, ipconfig/nslookup | Network+ |
| 02 | Networking advanced: DNS, DHCP, HTTP/HTTPS, TLS | Set up local Apache/Nginx, inspect TLS certs | Network+ |
| 03 | Linux basics: file system, permissions, processes, package mgmt | Bash commands: ls, chmod, grep, awk, ssh | LFCS / Linux+ |
| 04 | Windows basics: AD, Group Policy, PowerShell, Event Viewer | PowerShell scripting, Event Viewer inspection | MS-900 |
| 05 | Python scripting for security: parsing logs, automation | Write log parser in Python | — |
| 06 | Home Lab deep dive: isolated network, firewalls, VLANs | pfSense setup, Snort IDS, Kali VM | — |

**Milestone:** IT fundamentals mastery — able to set up a home lab, navigate Linux/Windows, understand networking stack.

### Phase 01 — Security Foundations (Weeks 07-14)

Focus: Core security concepts, frameworks, and principles.

| Week | Topics | Lab | Cert Alignment |
|---|---|---|---|
| 07 | CIA Triad, AAA (Auth/Auth/Acct), defense in depth | Identify violations in real-world breach scenarios | Security+ |
| 08 | Threat modeling: STRIDE, DREAD, attack trees | Threat model a sample web app (e.g. e-commerce) | Security+ |
| 09 | Risk management: quantitative vs qualitative, RMF | Risk assessment of a real company | Security+ |
| 10 | Cryptography: AES, RSA, hashing, PKI, SSL/TLS | OpenSSL commands, GPG encryption | Security+ |
| 11 | Identity & Access Management: RBAC, least privilege, MFA | Set up AD users/groups, configure MFA | Security+ |
| 12 | Network security: firewalls, IDS/IPS, VPN, NAC | Configure iptables, set up Snort/Suricata | Security+ |
| 13 | Compliance & regulation: GDPR, HIPAA, PCI-DSS, SOX | Map controls to NIST CSF framework | Security+ / CISA |
| 14 | Security policies, standards, and procedures | Write an Acceptable Use Policy | — |

**Milestone:** Security+ exam-ready. Understand risk management, cryptography, IAM, and compliance.

### Phase 02 — Blue Team Core (Weeks 15-26)

Focus: SOC operations, SIEM, detection, incident response.

| Week | Topics | Lab | Cert Alignment |
|---|---|---|---|
| 15 | SOC structure: L1/L2/L3 roles, shift work, KPIs | Tour a SOC (virtual), understand alert pipelines | CySA+ |
| 16 | SIEM deployment: Splunk, Elastic, Wazuh | Set up Wazuh, ingest test logs | CySA+ |
| 17 | Log analysis: syslog, Windows Event Log, Apache logs | Write Splunk/ELK search queries | CySA+ |
| 18 | Alert triage: severity classification, false positives | Triage 50 simulated alerts in SiemDashboard | CySA+ |
| 19 | Threat intelligence: MITRE ATT&CK, IOCs, STIX/TAXII | Use ThreatIntelBoard to map techniques | CySA+ |
| 20 | EDR & endpoint security: CrowdStrike, SentinelOne | Investigate simulated malware infection | CySA+ |
| 21 | Vulnerability management: Nessus, OpenVAS, CVSS | Run a vuln scan on a target system | CySA+ |
| 22 | Detection engineering: Sigma rules, YARA | Write custom Sigma rule, detect with YARA | — |
| 23 | Network traffic analysis: Wireshark deep dive, Zeek | Analyze pcap of real attack | GCIA |
| 24 | Email security: SPF, DKIM, DMARC, phishing analysis | Analyze phishing email headers | — |
| 25 | Purple teaming basics | Coordinate red/blue exercise | — |
| 26 | Capstone: Full incident response drill | End-to-end IR simulation | — |

**Milestone:** CySA+ exam-ready. Can function as a SOC L1-L2 analyst.

### Phase 03 — Red Team Fundamentals (Weeks 27-34)

Focus: Penetration testing methodology, web attacks, Active Directory.

| Week | Topics | Lab | Cert Alignment |
|---|---|---|---|
| 27 | Pentest methodology: PTES, OWASP, report writing | Write your first pentest report | PenTest+ |
| 28 | Reconnaissance & OSINT: theHarvester, Shodan, Maltego | OSINT gathering on a target company | PenTest+ |
| 29 | Scanning & enumeration: Nmap, enum4linux, gobuster | Full Nmap scan suite, directory brute force | PenTest+ |
| 30 | Web application attacks: OWASP Top 10 (SQLi, XSS, CSRF) | PortSwigger Web Security Academy labs | PenTest+ / CEH |
| 31 | Exploitation: Metasploit, manual exploit dev | Exploit a vulnerable service | OSCP |
| 32 | Post-exploitation: lateral movement, privilege escalation | LinPEAS/WinPEAS, Mimikatz, JuicyPotato | OSCP |
| 33 | Active Directory attacks: Kerberoasting, DCSync, AS-REP Roasting | Build AD lab, execute attack chain | OSCP / CRTP |
| 34 | Password attacks: hashcat, John, wordlists, cracking | Crack NTLM hashes, GPU acceleration | OSCP |

**Milestone:** PenTest+ ready. Can run a basic pentest engagement end-to-end.

### Phase 04 — Specialization (Weeks 35-42)

Choose **one** track (others available as reference material).

#### Track A: Blue Team Specialist
| Week | Topics | Lab |
|---|---|---|
| 35-36 | Advanced SIEM: correlation rules, dashboards, SOAR | Build custom Splunk correlation rule |
| 37-38 | Detection engineering: advanced Sigma, custom detection | Write advanced detection logic |
| 39-40 | Threat hunting: hypothesis-driven, threat intel fusion | Conduct threat hunt exercise |
| 41-42 | SOC automation: playbooks, orchestration | Automate IR playbook with SOAR |

#### Track B: Red Team Specialist
| Week | Topics | Lab |
|---|---|---|
| 35-36 | C2 frameworks: Cobalt Strike, Sliver, Havoc | Set up C2 infrastructure |
| 37-38 | Custom malware: droppers, loaders, obfuscation | Write basic dropper in C# |
| 39-40 | AV/EDR evasion: AMSI bypass, unhooking, syscall | Bypass Defender with custom payload |
| 41-42 | Advanced AD: RBCD, Shadow Credentials, ACL abuse | Execute full AD attack chain |

#### Track C: Cloud Security
| Week | Topics | Lab |
|---|---|---|
| 35-36 | AWS security: IAM, S3, VPC, CloudTrail, GuardDuty | Set up secure AWS account, review CloudTrail |
| 37-38 | Azure security: Azure AD, RBAC, Key Vault, Sentinel | Configure Azure security center |
| 39-40 | Container security: Docker, Kubernetes, Pod Security | Scan images, harden K8s cluster |
| 41-42 | CSPM tools: Wiz, Prisma Cloud, Orca | Review CSPM findings, remediate |

#### Track D: GRC (Governance, Risk, Compliance)
| Week | Topics | Lab |
|---|---|---|
| 35-36 | Risk assessment: NIST RMF, FAIR, risk registers | Conduct full risk assessment |
| 37-38 | Audit coordination: internal/external, evidence collection | Mock SOC 2 Type II audit |
| 39-40 | Compliance frameworks: ISO 27001, NIST CSF, PCI-DSS | Write ISO 27001 SoA |
| 41-42 | Third-party risk management, vendor assessments | Complete TPRM questionnaire |

#### Track E: DFIR (Digital Forensics & Incident Response)
| Week | Topics | Lab |
|---|---|---|
| 35-36 | Disk forensics: NTFS, APFS, file carving, Autopsy | ForensicsWorkspace: recover deleted files |
| 37-38 | Memory forensics: Volatility, process analysis, dump analysis | Analyze memory dump of malware infection |
| 39-40 | Network forensics: pcap analysis, protocol extraction | ForensicsWorkspace: reconstruct network attack |
| 41-42 | Malware analysis: static/dynamic, sandbox, RE basics | Analyze phishing doc with CAPA/Fakenet |

#### Track F: AI Security
| Week | Topics | Lab |
|---|---|---|
| 35-36 | Adversarial ML: prompt injection, jailbreaking, data poisoning | Execute prompt injection on LLM |
| 37-38 | LLM security: RAG pipeline attacks, model extraction | Attack RAG pipeline |
| 39-40 | AI governance: NIST AI RMF, AI risk management | Write AI security policy |
| 41-42 | AI red teaming: automated evaluation, guardrails | Build AI red teaming framework |

### Phase 05 — Certification Prep (Weeks 43-48)

| Week | Focus | Content |
|---|---|---|
| 43 | CompTIA Security+ (SY0-701) drills | Practice exams, PBQs, domain review |
| 44 | CompTIA CySA+ (CS0-003) drills | Practice exams, log analysis drills |
| 45 | OSCP+ (PEN-200) prep | Active Directory lab, exploit development |
| 46 | CISSP prep | 8 domains deep dive, practice test |
| 47 | CISA/CISM prep | Practice exams, audit scenarios |
| 48 | CCSP / cloud cert prep | Cloud security scenarios, practice test |

**Goal:** Cert exam-ready for target certifications.

### Phase 06 — Career & Executive (Weeks 49-56)

| Week | Topics | Details |
|---|---|---|
| 49 | Resume + LinkedIn optimization | Write ATS-friendly resume, LinkedIn headline |
| 50 | Portfolio building | CTF writeups, lab documentation, GitHub |
| 51 | Interview preparation (entry-mid) | 30+ practice questions, STARR method |
| 52 | Salary negotiation by region | US / UK / EU / India / Remote data |
| 53 | DoD 8140 & cleared positions | Clearance paths, contractor roles |
| 54 | Soft skills: communication, report writing | Write executive summary of breach |
| 55 | Professional networking | BSides talks, LinkedIn strategy, conferences |
| 56 | Capstone: Full career plan + Continuous learning roadmap | Personal 5-year plan, post-cert learning |

**Milestone:** Job-ready with resume, portfolio, interview skills, 5-year career plan.

---

## 4. Certification Roadmap

### By Career Stage

| Stage | Year(s) | Recommended Certs | Cost (3yr TCO) | DoD 8140 |
|---|---|---|---|---|
| **Entry (0-2yr)** | 1 | A+, Network+, Security+ | ~$1,195 | IAT I-II |
| **Entry (0-2yr)** | 2 | CySA+, PenTest+ | ~$808 | CSSP |
| **Mid (2-4yr)** | 3 | OSCP+, CEH | ~$1,499-2,749 | CSSP Analyst |
| **Mid (4-5yr)** | 4-5 | CISSP | ~$1,154 | IAT III, IAM II/III |
| **Senior (5-7yr)** | 5-6 | CISM, CCSP | ~$1,950 | IAM II/III |
| **Expert (7+yr)** | 7+ | GIAC, CCISO, MBA | Varies | Executive |

### By Career Track

| Track | Certification Path |
|---|---|
| **Blue Team** | Security+ → CySA+ → GCIA → GCIH → CISSP |
| **Red Team** | Security+ → PenTest+ → eJPT → OSCP → OSEP → CRTO → CISSP |
| **Cloud Security** | Security+ → AWS SA-Assoc → AWS Security Spec → CCSP |
| **GRC** | Security+ → CISA → CISM → CRISC → CISSP |
| **DFIR** | Security+ → CySA+ → GCFA → GREM → EnCE |
| **AI Security** | Security+ → CySA+ → AI-300 (OSAI) → GIAC AI certs |

### Workarounds for Experience Requirements

| Cert | Requirement | Workaround |
|---|---|---|
| **CISSP** | 5 years in 2+ domains | Pass exam → become **Associate of ISC2** → gain experience → full CISSP in 5yr |
| **CISM** | 5 years management | Pass exam → 5-year window to gain experience → cert active after verification |
| **CCSP** | 5 years (3 infosec, 1 cloud) | Pass exam → Associate of ISC2 → gain experience |
| **CEH** | 2 years experience | Take official course (no experience needed) or skip and get eJPT first |
| **OSCP+** | No official requirement | 300+ hrs lab prep recommended |

---

## 5. Component & Page Architecture

### Pages (4 existing → 7 total)

| Tab | Page | Status | Purpose |
|---|---|---|---|
| Overview | Dashboard.tsx | **Rework** | Cybersecurity-themed hero, 7-phase tracker, skill radar, cert progress |
| Roadmap | CoursePlayer.tsx | **Rework** | 56-week curriculum browser, 7-phase grouping, topic detail view |
| Labs | LabsPage.tsx | **New** | Interactive security tools (Terminal, SIEM, Network, Vuln, Forensics, CTF) |
| Certs | CertsPage.tsx | **New** | 25+ cert database, cost calculator, DoD 8140 map, tracker |
| Career | CareerPage.tsx | **New** | Career paths explorer, salary comparison, education paths |
| Interviews | InterviewsPage.tsx | **New** | 30+ Q&A with filters, difficulty levels, categories |
| Study Room | StudyRoom.tsx | **Rework** | Security challenges, chat, code playground, peer practice |

### New Components (8)

| Component | Purpose | Tech Notes |
|---|---|---|
| TerminalSimulator.tsx | Linux/Windows command practice (nmap, ssh, grep, iptables) | Mock terminal with command parsing, no real exec |
| SiemDashboard.tsx | SIEM alert triage with Splunk-like log viewer | Filterable alert queue, severity, timeline, playbook viewer |
| NetworkVisualizer.tsx | Network topology + OSI layer visualization | Interactive node graph, port/protocol display |
| VulnScanner.tsx | Vulnerability scan results with CVE lookup | CVSS scoring, remediation steps, mock scan targets |
| ThreatIntelBoard.tsx | MITRE ATT&CK matrix browser | Technique cards, threat actor profiles, filterable by tactic |
| ForensicsWorkspace.tsx | Log/memory analysis with artifact extraction | File carving, hex viewer, timeline reconstruction |
| CtfChallenge.tsx | Flag-based security challenges | Encoded messages, pcap analysis, crypto puzzles |
| CertTracker.tsx | Certification progress and exam management | Study hours tracker, renewal countdown, exam scheduler |

### Components to Remove (5)

| Component | Reason |
|---|---|
| DemoSite.tsx | Data analyst specific — no cybersecurity equivalent |
| BIDashboard.tsx | Replaced by SiemDashboard.tsx |
| DataModelingTool.tsx | Replaced by VulnScanner.tsx |
| LiveSheet.tsx | Spreadsheet tool — not needed |
| SpreadsheetRunner.tsx | Spreadsheet tool — not needed |

### Utilities to Remove (4)

| Utility | Reason |
|---|---|
| spreadsheetEngine.ts | No spreadsheet features |
| spreadsheetPresets.ts | No spreadsheet features |
| chartRenderer.ts | No BI chart features |
| demoSiteData.ts | No demo site features |

### Components Kept (8)

| Component | Reason |
|---|---|
| QuizModal.tsx | Quiz system works universally |
| ClassworkCard.tsx | Challenge/exercise system works universally |
| InlineCodeRunner.tsx | Code execution still needed (Python, bash) |
| PythonPlayground.tsx | Used for scripting exercises |
| SqlPlayground.tsx | Used for security log queries |
| APIPlayground.tsx | Used for API security testing |
| CircularProgress.tsx | Progress visualization reused |
| ErrorBoundary.tsx | Error handling reused |

---

## 6. Data Model — TypeScript Types

### New Types to Add to `data.ts`

```typescript
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  cost: number;
  annualFee?: number;
  validity: string;
  format: string;
  prerequisites: string;
  dod8140?: string;
  salaryImpact?: string;
  phase: number;
  prepTimeWeeks: number;
  category: 'entry' | 'mid' | 'senior' | 'expert';
  url: string;
}

export interface CareerTrack {
  id: string;
  title: string;
  description: string;
  icon: string;
  salaries: SalaryData[];
  certifications: string[];
  tools: string[];
  yearsToMid: string;
  yearsToSenior: string;
  niceCategories: string[];
}

export interface SalaryData {
  region: 'US' | 'UK' | 'EU' | 'India' | 'Remote';
  entry: string;
  mid: string;
  senior: string;
  lead: string;
}

export interface InterviewQuestion {
  id: string;
  category: 'foundational' | 'soc' | 'pentest' | 'cloud' | 'grc' | 'dfir' | 'behavioral' | 'scenario';
  question: string;
  answer: string;
  difficulty: 'entry' | 'mid' | 'senior';
  relatedCert?: string;
  relatedTopic?: string;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  free: boolean;
  url: string;
  description: string;
  phase: number;
}

export interface LabChallenge {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  platform: string;
  url: string;
  phase: number;
  category: string;
}

export interface SoftSkill {
  id: string;
  name: string;
  description: string;
  phase: number;
  exercises: string[];
}

export interface EducationPath {
  id: string;
  path: string;              // 'bachelors' | 'associate' | 'bootcamp' | 'self-taught'
  description: string;
  pros: string[];
  cons: string[];
  timeline: string;
  typicalCost: string;
}
```

---

## 7. Curriculum Content Structure

Each day (topic) includes exactly:

```
Day X: [Title]
- Content (~500 words rich markdown)
  - Why it matters (+ URL to real-world relevance)
  - Core concepts with examples
  - Real incident / case study
- AI Prompt (what to ask an AI assistant)
- Hands-On Lab (+ URL to TryHackMe/HTB/PortSwigger)
- Interview Question (relevant to today's topic, with answer)
- Quiz (3-5 multiple choice questions)
- Lab Challenge (classwork exercise with expected output)
```

Example daily content skeleton:

```typescript
{
  id: "w07-d1",
  title: "Day 1: The CIA Triad",
  description: "Why confidentiality, integrity, and availability are the foundation of all security",
  type: "learn",
  duration: "45-60 mins",
  content: "# The CIA Triad\n\n## Why It Matters\nConfidentiality, Integrity, and Availability (CIA) are the three pillars of information security...\n\n[Read more: What is the CIA Triad?](https://www.cisa.gov/...)\n\n## Core Concepts\n...",
  aiPrompt: "Explain the CIA triad with real-world examples of each principle being violated.",
  labUrl: "https://tryhackme.com/room/cia-triad",
  interviewQuestion: "Explain the CIA triad and give an example of a security incident that violated each component.",
  interviewAnswer: "Confidentiality means only authorized parties can access data (e.g., Equifax breach violated confidentiality)...",
  quiz: [
    {
      question: "Which CIA component does encryption primarily protect?",
      options: ["Confidentiality", "Integrity", "Availability", "Authentication"],
      correctAnswerIndex: 0,
    },
    // ... 3-5 questions
  ],
}
```

---

## 8. File Change Summary

| File | Action | Est. Lines | Priority |
|---|---|---|---|
| `data.ts` | Extend types | +120 | **HIGH** |
| `index.css` | Theme update (teal/cyan) | ~30 | **HIGH** |
| `package.json` | Name update | ~1 | **HIGH** |
| `data-content.ts` | Full rewrite (56 weeks) | ~28,000 | **HIGH** |
| `classworks-content.ts` | Full rewrite | ~3,500 | **HIGH** |
| `App.tsx` | New tabs, rebrand | ~350 | **HIGH** |
| `Sidebar.tsx` | 7 tabs, rebrand | ~200 | **HIGH** |
| `Dashboard.tsx` | Cybersecurity theme | ~500 | **HIGH** |
| **New** TerminalSimulator.tsx | Interactive terminal | ~400 | **MEDIUM** |
| **New** SiemDashboard.tsx | SIEM alert triage | ~500 | **MEDIUM** |
| **New** NetworkVisualizer.tsx | Network topology | ~350 | **MEDIUM** |
| **New** VulnScanner.tsx | Vuln scanner mock | ~400 | **MEDIUM** |
| **New** ThreatIntelBoard.tsx | MITRE ATT&CK viewer | ~450 | **MEDIUM** |
| **New** ForensicsWorkspace.tsx | Forensics tool | ~400 | **MEDIUM** |
| **New** CtfChallenge.tsx | CTF interface | ~350 | **MEDIUM** |
| **New** CertTracker.tsx | Cert progress | ~300 | **MEDIUM** |
| **New** LabsPage.tsx | Security tools hub | ~300 | **MEDIUM** |
| **New** CertsPage.tsx | Cert explorer | ~400 | **MEDIUM** |
| **New** CareerPage.tsx | Career paths | ~500 | **MEDIUM** |
| **New** InterviewsPage.tsx | Q&A database | ~400 | **MEDIUM** |
| `StudyRoom.tsx` | Security challenges | ~600 | **LOW** |
| `Projects.tsx` → remove | Replaced by LabsPage | ~0 | **MEDIUM** |
| Delete: DemoSite.tsx | Removed | — | **MEDIUM** |
| Delete: BIDashboard.tsx | Removed | — | **MEDIUM** |
| Delete: DataModelingTool.tsx | Removed | — | **MEDIUM** |
| Delete: LiveSheet.tsx | Removed | — | **MEDIUM** |
| Delete: SpreadsheetRunner.tsx | Removed | — | **MEDIUM** |
| Delete: spreadsheetEngine.ts | Removed | — | **MEDIUM** |
| Delete: spreadsheetPresets.ts | Removed | — | **MEDIUM** |
| Delete: chartRenderer.ts | Removed | — | **MEDIUM** |
| Delete: demoSiteData.ts | Removed | — | **MEDIUM** |
| `generate-data-json.ts` | Key update | ~5 | **HIGH** |
| `crypto.ts` | No changes needed | — | — |
| `dataLoader.ts` | No changes needed | — | — |
| `vite.config.ts` | No changes needed | — | — |
| **Total** | | **~37,000+ lines** | |

---

## 9. Implementation Phases

### Phase A: Scaffolding & Branding (Days 1-2)

1. Update `data.ts` — new types
2. Update `index.css` — teal/cyan theme
3. Update `package.json` — project name
4. Update `App.tsx` line 55 — encryption key `CYBERCAMP-2026`
5. Update `generate-data-json.ts` line 15 — encryption key
6. Update Sidebar branding ("Data Analyst" → "Cybersecurity")

### Phase B: Component Cleanup (Days 2-3)

1. Delete legacy components (5 files)
2. Delete legacy utilities (4 files)
3. Remove imports from App.tsx, StudyRoom.tsx
4. Verify build still compiles

### Phase C: New Components (Days 4-8)

1. TerminalSimulator.tsx
2. SiemDashboard.tsx
3. NetworkVisualizer.tsx
4. VulnScanner.tsx
5. ThreatIntelBoard.tsx
6. ForensicsWorkspace.tsx
7. CtfChallenge.tsx
8. CertTracker.tsx

### Phase D: New Pages (Days 9-12)

1. LabsPage.tsx
2. CertsPage.tsx
3. CareerPage.tsx
4. InterviewsPage.tsx
5. Update App.tsx routing
6. Update Sidebar.tsx tabs

### Phase E: Curriculum Content (Days 13-22)

1. Phase 00: Weeks 00-06 (~4,200 lines)
2. Phase 01: Weeks 07-14 (~4,800 lines)
3. Phase 02: Weeks 15-26 (~7,200 lines)
4. Phase 03: Weeks 27-34 (~4,800 lines)
5. Phase 04: Weeks 35-42 (~4,800 lines) — 6 tracks
6. Phase 05: Weeks 43-48 (~1,800 lines)
7. Phase 06: Weeks 49-56 (~3,600 lines)

### Phase F: Lab Challenges (Days 23-25)

1. `classworks-content.ts` — 56 weeks of exercises

### Phase G: Dashboard & Polish (Days 26-28)

1. Rework Dashboard.tsx — cybersecurity theme
2. Rework CoursePlayer.tsx — 7-phase navigation
3. Rework StudyRoom.tsx — security challenges
4. Mobile responsive testing
5. Dark mode verification
6. Full build + lint check

---

## 10. Key Design Decisions

| Decision | Value | Rationale |
|---|---|---|
| **Accent color** | Teal/Cyan (#06b6d4) | Cybersecurity/hacker aesthetic, distinct from original purple |
| **Entry point** | SOC Analyst (Blue Team) | Highest hiring volume, clearest progression, most remote-friendly |
| **Certification focus** | Sec+ → CySA+ → OSCP → CISSP | Industry-standard, DoD 8140 aligned |
| **Lab platforms** | TryHackMe + HTB + PortSwigger | Best free/paid mix, covers all skill levels |
| **Salary regions** | US, UK, EU, India, Remote | Covers 90%+ of job seekers worldwide |
| **Content depth** | ~500 words/day | Rich enough to learn, not overwhelming |
| **Interview Q&A** | 30+ questions with answers | Covers entry through senior, all categories |
| **Specialization** | Choose 1 of 6 tracks | Focused learning, avoids overwhelm |
| **Encryption key** | CYBERCAMP-2026 | Fresh start, breaks backward compat (intentional) |
| **Degree flexibility** | Multiple education paths | Includes self-taught, bootcamp, associate, bachelor's |

---

## 11. Timeline & Effort

| Phase | Days | Deliverable | Est. Lines |
|---|---|---|---|
| A: Scaffolding | 2 | Types, branding, theme | ~150 |
| B: Cleanup | 1 | Remove legacy files | ~0 (negative) |
| C: Components | 5 | 8 new interactive tools | ~3,150 |
| D: Pages | 4 | 3 new pages + routing | ~1,200 |
| E: Curriculum | 10 | 56 weeks of content | ~28,000 |
| F: Lab Challenges | 3 | 56 weeks of exercises | ~3,500 |
| G: Polish | 3 | Dashboard rework, testing | ~1,000 |
| **Total** | **~28 days** | **Complete CYBERCAMP-2026** | **~37,000+** |

---

## 12. Acceptance Criteria

The plan is complete when:

1. Encryption key changed to `CYBERCAMP-2026` in all locations
2. All 5 legacy components and 4 legacy utilities deleted
3. All 8 new security components functional
4. All 3 new pages (Labs, Certs, Career, Interviews) working with routing
5. Dashboard shows cybersecurity-themed UI with 7-phase progress tracker
6. Sidebar shows 7 cybersecurity tabs with proper icons
7. CoursePlayer shows 56 weeks across 7 phases
8. Build passes with `npm run build` (tsc noEmit)
9. Dark mode works across all new components
10. Mobile responsive across all pages
11. Curriculum content covers Phases 00-06 completely
12. Lab challenges exist for every topic day

---

*This document is the definitive plan for CYBERCAMP-2026. All implementation work will follow this specification.*
