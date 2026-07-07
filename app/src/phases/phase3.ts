interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  explanation?: string;
  certTags?: string[];
}

interface Topic {
  id: string;
  title: string;
  description: string;
  type: 'learn' | 'practice' | 'project' | 'review' | 'lab';
  duration: string;
  content?: string;
  aiPrompt?: string;
  labUrl?: string;
  labTitle?: string;
  interviewQuestion?: string;
  interviewAnswer?: string;
  quiz?: QuizQuestion[];
}

interface Module {
  id: string;
  title: string;
  durationText: string;
  focus: string;
  output: string;
  topics: Topic[];
}

export const phase3: Module[] = [
  {
    id: 'week11',
    title: 'Threats, Attacks & Vulnerabilities Part 1',
    durationText: 'Week 11 - 2 topics',
    focus: 'Core security concepts, threat actors, and malware fundamentals',
    output: 'Ability to classify threats, identify malware types, and explain CIA triad failures',
    topics: [
      {
        id: 'we11d01',
        title: 'CIA Triad, AAA & Threat Actors',
        description: 'Deep dive into the foundational security model, authentication/authorization/accounting, and the landscape of threat actors and their motivations.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'Can you explain the CIA triad and give a real-world example of each component being compromised?',
        interviewAnswer: 'The CIA triad consists of Confidentiality, Integrity, and Availability. Confidentiality is compromised when unauthorized users access sensitive data, like the Equifax breach. Integrity is violated when data is altered without authorization, as in the Stuxnet attack modifying PLC firmware. Availability is impacted when systems become inaccessible, such as ransomware encrypting hospital patient records.',
        content: `:::objectives
- Explain each component of the CIA triad with real-world failure examples
- Differentiate between Authentication, Authorization, and Accounting
- Identify threat actor types and their motivations
- Map threat actors to typical attack patterns
:::

:::info
The CIA triad is the cornerstone of information security. Every security control, policy, and technology ultimately serves to protect one or more of these three properties.
:::

## CIA Triad Deep Dive

### Confidentiality
Ensuring information is accessible only to authorized individuals.

**Real failures:**
- **Equifax (2017):** 147 million records exposed due to unpatched Apache Struts vulnerability — confidentiality breach of SSNs, birth dates, addresses
- **Capital One (2019):** Misconfigured WAF allowed SSRF attack, exposing 100M+ credit applications stored in AWS S3
- **Hospital insider:** Nurse accesses celebrity patient records out of curiosity — confidentiality breach via authorized user

**Controls that protect confidentiality:** Encryption (AES-256), access controls (RBAC), data classification, DLP, MFA

### Integrity
Ensuring data has not been altered in an unauthorized manner.

**Real failures:**
- **Stuxnet (2010):** Modified PLC firmware to spin uranium centrifuges beyond safe limits — integrity attack on industrial control systems
- **Target breach:** Attackers modified HVAC vendor credentials to pivot into payment network
- **Grade tampering:** Student modifies their grade in the university database — integrity violation

**Controls that protect integrity:** Hashing (SHA-256), digital signatures, file permissions, version control, change management, checksums

### Availability
Ensuring systems and data are accessible when needed.

**Real failures:**
- **Dyn DNS attack (2016):** Mirai botnet DDoS took down Twitter, Netflix, Reddit — availability destruction via IoT botnet
- **Ransomware on hospital:** City Hospital locked out of EHR during emergency — availability denial with patient safety impact
- **Power outage:** Data center without UPS loses all active sessions — availability failure

**Controls that protect availability:** Redundancy (RAID, failover), backups, DDoS mitigation, UPS/generators, load balancing, disaster recovery plans

:::warning
A single incident can impact all three pillars simultaneously. The Colonial Pipeline ransomware attack (2021) compromised confidentiality (data exfiltrated), integrity (system encryption), and availability (pipeline shutdown).
:::

## Authentication vs Authorization vs Accounting (AAA)

| Concept | Question It Answers | Example |
|---|---|---|
| **Authentication** | "Who are you?" | Username + password + fingerprint scan |
| **Authorization** | "What can you do?" | User can read files but not delete them |
| **Accounting** | "What did you do?" | Audit log showing user accessed file X at time Y |

### Authentication Factors (3 categories)
1. **Something you know:** Password, PIN, security questions
2. **Something you have:** Smart card, YubiKey, phone (OTP)
3. **Something you are:** Fingerprint, retina scan, facial recognition

**Multi-Factor Authentication (MFA):** Requires 2+ different factor categories. Password + SMS code = MFA. Password + security question = NOT MFA (both are "something you know").

### Authorization Models
- **DAC:** Owner decides permissions (Windows file sharing)
- **MAC:** System enforces labels (military Top Secret/Secret)
- **RBAC:** Permissions based on role (nurse vs doctor)
- **ABAC:** Attributes determine access (time of day + department + clearance)

### Accounting
Audit trails that answer: who, what, when, where, and outcome.
- Windows Security Event Log (Event IDs 4624 = successful logon, 4625 = failed logon)
- Linux auth.log entries
- SIEM correlation for anomaly detection

## Threat Actors

| Actor | Motivation | Typical Methods | Real Example |
|---|---|---|---|
| **Nation-state (APT)** | Espionage, warfare | Zero-days, supply chain, APTs | APT29 (Cozy Bear) — SolarWinds |
| **Organized crime** | Financial gain | Ransomware, credit card theft, BEC | FIN7 — POS malware |
| **Hacktivists** | Ideology, publicity | DDoS, defacement, data leaks | Anonymous — Operation Payback |
| **Insider threat** | Varies | Data exfiltration, sabotage | Edward Snowden — NSA leak |
| **Script kiddies** | Thrill, recognition | Pre-made tools, simple exploits | Teens using LOIC for DDoS |
| **Competitors** | Competitive advantage | Corporate espionage | Economic espionage targeting IP |

### Motivation Breakdown
- **Financial:** Ransomware ($20M+ demands), credit card fraud, cryptomining
- **Espionage:** State-sponsored IP theft, defense secrets, political intelligence
- **Ideology:** Political statements, religious beliefs, social causes
- **Disruption:** Revenge, competitive sabotage, warfare preparation
- **Recognition:** Bug bounties, bragging rights, notoriety

:::checkpoint
Before moving on, verify you can:
1. Give a real-world example of a CIA triad failure for each component
2. Explain why password + security question is not true MFA
3. Distinguish between a nation-state actor and organized crime
:::`,
        quiz: [
          { question: 'A hospital ransomware attack encrypts patient records and demands Bitcoin payment. Which CIA triad component is MOST directly impacted?', options: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'Ransomware denies access to data, directly impacting availability.', certTags: ['Security+'] },
          { question: 'An employee uses admin credentials to access payroll data and sell employee SSNs. Which AAA component failed?', options: ['Authentication', 'Authorization', 'Accounting', 'Availability'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'The admin should not have had access to payroll data - this is an authorization failure (over-privileged account).', certTags: ['Security+'] },
          { question: 'Which is an example of a nation-state threat actor objective?', options: ['Stealing credit cards for resale', 'Disrupting a website for political publicity', 'Exfiltrating defense contractor IP over months', 'Using public exploits for notoriety'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'Nation-state actors conduct long-term espionage targeting IP, defense secrets, and government intelligence.', certTags: ['Security+'] },
          { question: 'A company implements purchase order approval limits by role (manager $5K, director $25K, VP $100K). Which access control model?', options: ['DAC', 'MAC', 'RBAC', 'ABAC'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'RBAC assigns permissions based on organizational roles. The approval limits are determined by the role.', certTags: ['Security+'] },
          { question: 'Stuxnet compromised which CIA triad component by modifying PLC firmware?', options: ['Confidentiality', 'Integrity', 'Availability', 'All three equally'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Stuxnet modified PLC firmware to cause centrifuges to spin at dangerous speeds - a textbook integrity attack.', certTags: ['Security+'] },
          { question: 'Which authentication setup constitutes true MFA?', options: ['Username and password', 'Password and security question', 'Smart card and PIN', 'Fingerprint and facial recognition'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'Smart card (something you have) + PIN (something you know) = two different factor categories = true MFA.', certTags: ['Security+'] },
          { question: 'An APT group maintains access for 18 months slowly exfiltrating data. Which characteristics does this demonstrate?', options: ['Low sophistication, high motivation', 'High sophistication, high resources, long-term objective', 'Opportunistic targeting, quick extraction', 'Ideology-driven, public tools only'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'APTs are characterized by high sophistication, significant resources, and long-term persistent access.', certTags: ['Security+'] },
          { question: 'A DDoS attack takes down a banking website for 6 hours. Which triad component is violated?', options: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'DDoS directly impacts availability by making systems inaccessible to legitimate users.', certTags: ['Security+'] },
          { question: 'What is the PRIMARY difference between authentication and authorization?', options: ['Authentication happens first', 'Authentication verifies identity; authorization determines permissions', 'Authentication uses passwords; authorization uses biometrics', 'Authentication is technical; authorization is administrative'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Authentication answers "Who are you?" Authorization answers "What can you do?"', certTags: ['Security+'] },
          { question: 'A hacktivist group defaces a website to protest environmental policies. What is their motivation?', options: ['Financial gain', 'Espionage', 'Ideology', 'Revenge'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'Hacktivists are motivated by ideology - political, social, or environmental causes.', certTags: ['Security+'] },
          { question: 'The Mirai botnet compromised IoT devices for a massive DDoS. Which threat actor type would most likely create it?', options: ['Nation-state', 'Organized crime', 'Script kiddies or cybercriminals', 'Insider threat'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'Mirai was created by a college student targeting devices with default credentials - script kiddie/cybercriminal capability.', certTags: ['Security+'] },
          { question: 'Accounting in the AAA framework serves which critical function?', options: ['Prevents unauthorized login', 'Determines resource access', 'Creates audit trails for forensic analysis', 'Encrypts passwords'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'Accounting tracks user activities for forensic investigation, compliance, and anomaly detection.', certTags: ['Security+'] },
          { question: 'Why is availability critical in healthcare systems?', options: ['Patient records must stay confidential', 'System downtime during emergencies can endanger lives', 'Integrity affects insurance billing', 'Healthcare data is valuable on black market'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'If EHR systems are down during emergencies, clinicians cannot access critical patient information, potentially leading to incorrect treatment.', certTags: ['Security+'] },
          { question: 'An insider uses legitimate query tools to slowly extract customer records over months. Which AAA component is MOST deficient?', options: ['Authentication', 'Authorization', 'Accounting', 'Availability'], correctAnswerIndex: 2, difficulty: 'advanced', explanation: 'Prolonged undetected exfiltration indicates accounting failure - monitoring and anomaly detection should have caught unusual query patterns.', certTags: ['Security+', 'CySA+'] },
          { question: 'Which scenario BEST demonstrates defense in depth?', options: ['Using only AES-256 encryption', 'Implementing firewalls, IDS/IPS, encryption, access controls, and monitoring together', 'Replacing passwords with biometrics', 'Moving to a single cloud provider'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Defense in depth layers multiple controls across the CIA triad for comprehensive protection.', certTags: ['Security+'] }
        ]
      },
      {
        id: 'we11d02',
        title: 'Malware Types & Attack Vectors',
        description: 'Comprehensive overview of malware categories, their behaviors, delivery mechanisms, and real-world examples.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'What is the difference between a virus and a worm, and why does that distinction matter for defense?',
        interviewAnswer: 'A virus requires a host file and user action to spread, while a worm self-replicates across networks autonomously. This distinction matters because worms like WannaCry can cause widespread damage rapidly without human interaction, requiring network-level defenses like segmentation, while viruses require user education and email filtering.',
        content: `:::objectives
- Classify malware into distinct categories based on behavior and propagation
- Identify delivery methods and attack vectors for each malware type
- Analyze real-world malware incidents to understand impact
- Distinguish between file-based and fileless malware techniques
:::

:::info
Malware is any software designed to cause damage to a computer, server, client, or computer network. Understanding malware taxonomy is essential for selecting appropriate defensive controls.
:::

## Malware Taxonomy

| Type | Self-Replicating | Requires Host File | Network Propagation | Primary Impact |
|---|---|---|---|---|
| Virus | No | Yes | No | Data corruption, system damage |
| Worm | Yes | No | Yes | Network congestion, backdoor |
| Trojan | No | No | No | Remote access, data theft |
| Ransomware | Varies | Varies | Varies | Data encryption, extortion |
| Spyware | No | No | No | Data exfiltration, surveillance |
| Adware | No | No | No | Unwanted advertisements |
| Rootkit | No | No | No | Persistence, stealth |
| Bootkit | No | No | No | Pre-OS persistence |
| Fileless malware | No | No | No | In-memory only, hard to detect |

## Detailed Malware Types

### Viruses
Malicious code that attaches to a legitimate file and requires user action to spread.

**Real examples:**
- **ILOVEYOU (2000):** Email attachment "LOVE-LETTER-FOR-YOU.txt.vbs" — $10B in damages
- **Melissa (1999):** Word macro virus that mailed itself to Outlook contacts
- **CIH/Chernobyl (1998):** Overwrote first megabyte of hard drive and corrupted BIOS

### Worms
Standalone malware that self-replicates across networks without user interaction.

**Real examples:**
- **WannaCry (2017):** Exploited EternalBlue (SMBv1). 200,000+ systems in 150 countries. NHS hospitals diverted ambulances.
- **NotPetya (2017):** Spread via compromised Ukrainian tax software. $10B in damages globally.
- **Conficker (2008):** Infected 9-15 million computers using dictionary attacks on admin passwords.

### Trojans
Malware disguised as legitimate software. Does not self-replicate.

**Real examples:**
- **Emotet:** Started as banking Trojan, evolved into malware-as-a-service
- **Remote Access Trojans (RATs):** DarkComet, njRAT — give attackers full control
- **Gameover Zeus:** P2P Trojan that stole banking credentials and delivered ransomware

### Ransomware
Malware that encrypts victim's files and demands payment for decryption key.

**Evolution:**
1. **CryptoLocker (2013):** First widespread crypto-ransomware
2. **Locky (2016):** Spread via phishing emails with Office documents
3. **WannaCry (2017):** Combined ransomware with worm capabilities
4. **Ryuk (2019):** Targeted enterprises, demanded $40M+ from Foxconn
5. **Double extortion (modern):** Encrypt data AND threaten to leak it (Maze, Conti, LockBit)

### Rootkits & Bootkits
**Rootkit:** Hides its presence by modifying OS components. User-mode, kernel-mode, hypervisor-level.
**Bootkit:** Infects MBR, VBR, or UEFI firmware. **LoJax (2018):** First in-the-wild UEFI rootkit — survives OS reinstall.

### Fileless Malware
Runs entirely in memory, leaving no files on disk. Uses PowerShell scripts, registry persistence, LOLBin techniques.

:::warning
Modern malware often combines multiple techniques. Emotet evolved to deliver Ryuk ransomware. The attack chain matters more than any single classification.
:::

## Delivery Methods / Attack Vectors

### Phishing (90%+ of breaches start here)
| Type | Target | Method |
|---|---|---|
| Phishing | General users | Mass email |
| Spear phishing | Specific individual | Personalized email |
| Whaling | C-suite executives | Highly targeted |
| Vishing | Phone targets | Voice calls |
| Smishing | SMS targets | Text messages |

### Other Vectors
- **Drive-by downloads:** Malware downloaded when visiting compromised website
- **USB/Removable Media:** BadUSB, Stuxnet via USB, Rubber Ducky
- **Supply chain:** SolarWinds (2020), Kaseya (2021), 3CX (2023)

:::tip
When analyzing malware, always consider the full kill chain: initial access → execution → persistence → privilege escalation → lateral movement → exfiltration → impact.
:::`,
        quiz: [
          { question: 'What is the KEY difference between a virus and a worm?', options: ['A virus is more dangerous', 'A virus requires a host file and user action; a worm self-replicates across networks', 'A worm only targets servers', 'A virus encrypts data; a worm steals data'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Viruses need a host file and user action to spread. Worms are standalone programs that self-replicate across networks autonomously.', certTags: ['Security+'] },
          { question: 'WannaCry (2017) combined two dangerous characteristics. What were they?', options: ['Spyware and keylogging', 'Ransomware encryption and worm-like network propagation', 'Rootkit stealth and bootkit persistence', 'Adware and browser hijacking'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'WannaCry combined ransomware (file encryption) with worm capabilities (EternalBlue exploit for automatic network propagation).', certTags: ['Security+'] },
          { question: 'An employee receives a call from "IT help desk" asking for their password. What technique is this?', options: ['Phishing', 'Vishing', 'Baiting', 'Tailgating'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Vishing is voice-based social engineering conducted over the phone.', certTags: ['Security+'] },
          { question: 'Which malware runs entirely in memory without writing files to disk?', options: ['Rootkit', 'Bootkit', 'Fileless malware', 'Spyware'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'Fileless malware operates entirely in RAM using PowerShell scripts, registry persistence, and LOLBins.', certTags: ['Security+'] },
          { question: 'The SolarWinds attack (2020) demonstrated which security concern?', options: ['Phishing bypasses all controls', 'Trusted software updates can be compromised to distribute malware', 'IoT devices are vulnerable to default credentials', 'Ransomware spreads through email'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'SolarWinds showed supply chain attacks compromise the trust relationship between vendors and customers.', certTags: ['Security+'] },
          { question: 'A malware sample modifies kernel system call tables to hide its processes. What type is this?', options: ['Fileless malware', 'User-mode rootkit', 'Kernel-mode rootkit', 'Bootkit'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'Kernel-mode rootkits operate at the highest privilege level, modifying kernel data structures.', certTags: ['Security+'] },
          { question: 'Which delivery method compromises a software vendor\'s build process to inject malicious code into updates?', options: ['Phishing', 'Drive-by download', 'Supply chain attack', 'USB drop'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'Supply chain attacks target the software development or distribution pipeline.', certTags: ['Security+'] },
          { question: 'Double extortion ransomware adds which threat beyond encryption?', options: ['Deleting backups', 'Threatening to publicly leak stolen data', 'Encrypting the MBR', 'Launching DDoS'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Double extortion adds the threat of data publication even if the victim has backups.', certTags: ['Security+'] },
          { question: 'LoJax (2018) is particularly dangerous because it:', options: ['Uses zero-day exploits', 'Infects UEFI firmware, surviving OS reinstall and disk formatting', 'Encrypts all data instantly', 'Spread only through zero-day phishing'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'LoJax is a UEFI bootkit that infects firmware itself, persisting through OS reinstalls and disk formatting.', certTags: ['Security+'] },
          { question: 'Malware executing through PowerShell and WMIC without files on disk represents:', options: ['Rootkit and bootkit', 'Spyware and keylogger', 'Fileless malware using LOLBins', 'Worm and Trojan'], correctAnswerIndex: 2, difficulty: 'advanced', explanation: 'Fileless malware with LOLBins uses legitimate system tools for malicious purposes, blending with normal operations.', certTags: ['Security+', 'CySA+'] },
          { question: 'Emotet evolved from a banking Trojan to a malware distribution platform. What model does this represent?', options: ['Single-purpose to multi-purpose', 'Malware-as-a-Service (MaaS)', 'Fileless replacing file-based', 'Nation-state tools released publicly'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Emotet became a delivery platform for other malware (TrickBot, Ryuk), representing the MaaS ecosystem.', certTags: ['Security+', 'CySA+'] },
          { question: 'How did Stuxnet initially enter the Iranian nuclear facility\'s air-gapped network?', options: ['Spear phishing email', 'Infected USB drive', 'Exploiting a web application', 'Supply chain vendor compromise'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Stuxnet entered via infected USB drives, demonstrating air gaps are not impenetrable.', certTags: ['Security+'] },
          { question: 'A document has a .docm extension. What does this indicate?', options: ['Macro-enabled Word document', 'Compressed archive', 'PDF with scripts', 'Plain text document'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: '.docm files are macro-enabled Word documents that can contain VBA macros - a common malware vector.', certTags: ['Security+', 'A+'] },
          { question: 'The Mirai botnet primarily exploited which vulnerability in IoT devices?', options: ['Outdated firmware CVEs', 'Default or weak credentials', 'Unpatched web servers', 'Insecure Wi-Fi'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Mirai used a hardcoded list of 60+ default username/password combinations to compromise IoT devices.', certTags: ['Security+'] },
          { question: 'What is the relationship between rootkits and bootkits?', options: ['Same thing with different names', 'Bootkits are rootkits that operate below the OS, infecting the boot process', 'Rootkits only affect Windows', 'Rootkits are more dangerous'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Bootkits are specialized rootkits infecting MBR/VBR/UEFI - pre-OS environments that load before security software.', certTags: ['Security+'] }
        ]
      }
    ]
  },
  {
    id: 'week12',
    title: 'Threats, Attacks & Vulnerabilities Part 2',
    durationText: 'Week 12 - 2 topics',
    focus: 'Social engineering techniques and cryptography fundamentals',
    output: 'Ability to identify social engineering attacks, explain cryptographic concepts, and understand PKI basics',
    topics: [
      {
        id: 'we12d01',
        title: 'Social Engineering',
        description: 'Understanding psychological manipulation techniques, phishing email analysis, and organizational defense strategies.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'How would you design a security awareness training program to defend against social engineering attacks?',
        interviewAnswer: 'An effective program combines regular phishing simulations with immediate feedback, teaches employees to recognize psychological triggers like urgency and authority, establishes clear reporting procedures without blame, and conducts periodic tabletop exercises. The key is creating a culture where reporting suspicious activity is rewarded rather than punished.',
        content: `:::objectives
- Identify and classify social engineering attack types
- Analyze phishing emails using header analysis and URL inspection
- Recognize psychological principles exploited by social engineers
- Design organizational defense strategies against social engineering
:::

:::info
Social engineering exploits human psychology rather than technical vulnerabilities. 91% of successful cyberattacks begin with a phishing email. Humans are consistently the weakest link in security.
:::

## Social Engineering Attack Types

| Technique | Medium | Key Characteristic | Target |
|---|---|---|---|
| **Phishing** | Email | Mass distribution, generic | General users |
| **Spear phishing** | Email | Personalized, researched | Specific individuals |
| **Whaling** | Email | Targets C-suite | CEO, CFO, board |
| **Vishing** | Phone | Voice-based, urgency | Employees with access |
| **Smishing** | SMS | Short, urgent messages | Mobile users |
| **Pretexting** | Any | Fabricated scenario | Anyone with desired info |
| **Baiting** | Physical | Free item with malware | Curious users |
| **Tailgating** | Physical | Following through secure door | Employees at entries |
| **Watering hole** | Web | Compromised frequented site | Specific organization |

### Psychological Principles Exploited
1. **Authority:** "I'm from IT, install this update immediately."
2. **Urgency:** "Your account will be locked in 24 hours."
3. **Social proof:** "All team members have already completed this."
4. **Scarcity:** "Only 2 hours left to claim your bonus."
5. **Reciprocity:** "I helped you last week, can you approve this invoice?"
6. **Fear:** "We detected unauthorized access to your bank account."

## Phishing Email Anatomy

### How to Analyze a Phishing Email
1. **Email Headers:** Check SPF/DKIM/DMARC results, verify sender IP
2. **URL Analysis:** Hover links, watch for typosquatting (paypa1.com), IP addresses
3. **Attachment Analysis:** Double extensions (.pdf.exe), macro-enabled docs, password-protected archives
4. **Content Red Flags:** Generic greetings, grammar errors, credential requests, threats

:::warning
Modern phishing bypasses technical controls. Even trained users fall for sophisticated spear phishing. Defense requires layered controls: technical (email filtering, DMARC) + training + policies.
:::

## Real-World Social Engineering Incidents

**Target Breach (2013):** HVAC vendor employee clicked phishing email. Stolen credentials used to access network. 40 million credit cards stolen. Root cause: vendor with excessive access + no MFA.

**FBI BEC Stats:** $2.7 billion lost in 2022. CEO fraud: attacker spoofs CEO email requesting wire transfer.

**Ubiquiti Networks ($46.7M BEC, 2015):** Finance employees received spoofed executive emails. Two transfers totaling $46.7M sent to attacker accounts.

## Defense Strategies
- **Technical:** Email filtering with sandboxing, DMARC/DKIM/SPF, URL rewriting, MFA
- **Administrative:** Security awareness training, verification procedures for financial transactions, separation of duties
- **Physical:** Visitor management, tailgating-resistant entry, clean desk policy

:::tip
The most effective defense is a culture where employees feel safe reporting suspicious activity without fear of punishment. Blaming users for clicking creates concealment, not security.
:::`,
        quiz: [
          { question: 'An attacker calls pretending to be from help desk requesting credentials. What technique is this?', options: ['Phishing', 'Vishing', 'Baiting', 'Watering hole'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Vishing is voice-based social engineering conducted over the phone.', certTags: ['Security+'] },
          { question: 'What is the PRIMARY difference between phishing and spear phishing?', options: ['Spear phishing uses phone', 'Spear phishing is personalized and targeted; phishing is mass-distributed', 'Spear phishing only targets executives', 'Spear phishing uses malware'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Spear phishing is targeted and personalized. Phishing is mass email with generic content.', certTags: ['Security+'] },
          { question: 'An email comes from "account-security@paypa1.com" (digit 1 instead of letter l). This is:', options: ['Vishing', 'Typosquatting', 'Watering hole', 'Pretexting'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Typosquatting registers domains visually similar to legitimate ones to deceive users.', certTags: ['Security+'] },
          { question: 'A compromised website frequented by defense contractor employees delivers a zero-day exploit. What is this?', options: ['Phishing', 'Drive-by download', 'Watering hole attack', 'Baiting'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'A watering hole attack compromises a website frequently visited by the target group.', certTags: ['Security+'] },
          { question: '"Your CEO is waiting and the deal closes in 30 minutes" exploits which principles?', options: ['Reciprocity', 'Authority and urgency', 'Social proof', 'Scarcity'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'This combines authority (CEO request) and urgency (30-minute deadline) to prevent verification.', certTags: ['Security+'] },
          { question: 'Which email authentication result indicates the sending server is authorized for that domain?', options: ['SPF = softfail', 'DKIM = none', 'SPF = pass and DMARC = pass', 'DMARC = quarantine'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'SPF pass + DMARC pass strongly indicates the email is legitimately from the claimed domain.', certTags: ['Security+'] },
          { question: 'An employee finds a USB labeled "Salary Q4 Bonuses" in the parking lot and plugs it in. What technique?', options: ['Pretexting', 'Baiting', 'Tailgating', 'Phishing'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Baiting uses curiosity or temptation to lure victims into a compromised state.', certTags: ['Security+'] },
          { question: 'Which protocol checks if email content was modified in transit?', options: ['SPF', 'DKIM', 'DMARC', 'BIMI'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'DKIM uses cryptographic signatures to verify email content was not modified after sending.', certTags: ['Security+'] },
          { question: 'A policy requires two managers to approve wire transfers via phone confirmation. This addresses:', options: ['Anti-malware', 'Separation of duties and out-of-band verification', 'Network segmentation', 'DLP'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Two-person approval + phone confirmation prevents a single compromised employee from completing fraud.', certTags: ['Security+'] },
          { question: 'The Target breach originated from an HVAC vendor phishing email. Which principle did Target MOST critically fail?', options: ['Encryption', 'Network segmentation and least privilege for vendor access', 'MFA on public sites', 'Password rotation'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Target allowed vendor network access that could reach POS systems. Segmentation would have isolated vendor access.', certTags: ['Security+'] },
          { question: 'Why are BEC attacks particularly difficult to detect with technical controls?', options: ['They use encrypted channels', 'They originate from compromised legitimate accounts', 'They only target small businesses', 'They use malware bypassing antivirus'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'BEC attacks compromise real executive accounts first, so emails genuinely come from legitimate sources with proper authentication.', certTags: ['Security+'] },
          { question: 'An attacker sends a targeted email to a CFO appearing to be from the company law firm with a real case number. Which techniques combine?', options: ['Baiting and tailgating', 'Spear phishing with pretexting and authority', 'Watering hole and drive-by', 'Vishing and smishing'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'This combines spear phishing (targeted), pretexting (fake identity), authority (legal firm), and personalization (real case number).', certTags: ['Security+'] },
          { question: 'Which phishing email indicator is MOST reliable?', options: ['Display name', 'Poor grammar', 'URL using IP address instead of domain', 'Subject containing "urgent"'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'A URL using an IP address instead of a legitimate domain is a strong indicator of phishing.', certTags: ['Security+'] },
          { question: 'Why is organizational culture more important than technical controls for social engineering defense?', options: ['Technical controls are too expensive', 'Safe reporting creates an early warning system; blame creates concealment', 'Social engineering only targets technical vulns', 'Enough training eliminates all social engineering'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'A blame-free culture means suspicious emails get reported quickly, before others click them.', certTags: ['Security+'] },
          { question: 'Pretexting is most convincing when it:', options: ['Uses technical jargon', 'Incorporates verifiable true information into the scenario', 'Speaks authoritatively', 'Provides a fake ID'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Pretexts mixing true information with fabricated requests are most convincing - victims verify the true elements.', certTags: ['Security+'] }
        ]
      },
      {
        id: 'we12d02',
        title: 'Encryption & Hashing Fundamentals',
        description: 'Core cryptographic concepts including symmetric/asymmetric encryption, hashing algorithms, digital signatures, and PKI infrastructure.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'When would you choose symmetric encryption over asymmetric, and how does TLS combine both?',
        interviewAnswer: 'Symmetric encryption is preferred for bulk data because it is significantly faster than asymmetric. TLS uses hybrid encryption: asymmetric algorithms like ECDHE securely exchange a symmetric session key, then AES-GCM encrypts the actual data. This combines the key distribution benefits of asymmetric with the performance of symmetric encryption.',
        content: `:::objectives
- Differentiate between symmetric and asymmetric encryption with use cases
- Explain major encryption algorithms and their key sizes
- Understand hashing algorithms and their security properties
- Describe the PKI certificate chain and trust model
- Perform basic hashing operations on the command line
:::

:::info
Cryptography provides the mathematical foundation for confidentiality, integrity, authentication, and non-repudiation.
:::

## Symmetric vs Asymmetric Encryption

| Property | Symmetric | Asymmetric |
|---|---|---|
| **Keys** | Same key encrypt/decrypt | Public encrypt, private decrypt |
| **Speed** | Fast (hardware-accelerated) | Slow (1000x slower) |
| **Key distribution** | Problematic — must share securely | Public key freely distributed |
| **Key size** | 128-256 bits | 2048-4096 bits (RSA), 256 bits (ECC) |
| **Use cases** | Bulk data encryption | Key exchange, digital signatures |
| **Scalability** | n(n-1)/2 keys for n users | 2n keys for n users |

:::concept
**Hybrid Encryption (most common):** Asymmetric exchanges a symmetric session key, then symmetric encrypts bulk data. TLS, PGP, and most VPNs use this approach.
:::

## Symmetric Encryption Algorithms

### AES (Advanced Encryption Standard)
- **Key sizes:** 128, 192, 256 bits | **Block size:** 128 bits
- **Status:** Current gold standard
- **Modes:** ECB (insecure — pattern preservation), CBC (requires IV, vulnerable to padding oracle), GCM (provides encryption AND authentication — recommended)

### 3DES (Triple DES)
- Applies DES three times. Effective key size: 112 bits
- **Status:** Deprecated (NIST, 2023). Slow and vulnerable.

### ChaCha20-Poly1305
- Modern stream cipher used in TLS 1.3, WireGuard VPN
- Fast on devices without AES hardware acceleration

## Asymmetric Encryption Algorithms

### RSA
- **Key sizes:** 2048, 3072, 4096 bits
- **Based on:** Difficulty of factoring large primes
- **Minimum:** 2048-bit (NIST recommendation)

### ECC (Elliptic Curve Cryptography)
- **Key sizes:** 256, 384, 521 bits
- **Advantage:** 256-bit ECC ≈ 3072-bit RSA in security
- **Performance:** Faster key generation, smaller keys

### Diffie-Hellman Key Exchange
- Establishes shared secret over insecure channel
- **Vulnerability:** Susceptible to MITM (no authentication)
- **Forward secrecy:** Ephemeral DH (DHE) generates new keys per session

:::warning
RSA and Diffie-Hellman are vulnerable to quantum computing (Shor's algorithm). Post-quantum cryptography (CRYSTALS-Kyber, CRYSTALS-Dilithium) will replace them.
:::

## Hashing

| Algorithm | Output | Status | Use Cases |
|---|---|---|---|
| MD5 | 128 bits | Broken | File checksums only |
| SHA-1 | 160 bits | Deprecated | Legacy systems only |
| SHA-256 | 256 bits | Secure | Certificates, blockchain |
| SHA-512 | 512 bits | Secure | High-security apps |
| bcrypt | Variable | Secure | Password storage |
| argon2 | Variable | Best | Password storage |

### Hashing Properties
1. Deterministic — same input → same output
2. Fixed output length
3. One-way — cannot reverse
4. Collision-resistant
5. Avalanche effect — small change → completely different hash

### Password Hashing & Salting
**Rainbow table:** Precomputed lookup table of hashes.
**Salt:** Random value added before hashing — defeats rainbow tables.

:::concept
**Password storage:** hash = argon2(password + unique_salt). Store: salt + hash. Never store plaintext.
:::

## Digital Signatures
1. Sender hashes the message
2. Sender encrypts hash with private key (creates signature)
3. Receiver decrypts with sender's public key
4. Receiver compares hashes

**Provides:** Integrity, Authentication, Non-repudiation

## PKI (Public Key Infrastructure)

### Certificate Chain of Trust
Root CA → Intermediate CA → Server Certificate

### Certificate Lifecycle
CSR → Validation → Issuance → Installation → Renewal → Revocation

### CRL vs OCSP
| Feature | CRL | OCSP |
|---|---|---|
| Method | Download full list | Query specific cert |
| Freshness | Periodic (days) | Real-time |
| Bandwidth | High | Low |

:::tip
**Hands-on hashing:**
\`\`\`bash
echo -n "password" | sha256sum
sha256sum important_file.zip
\`\`\`
:::`,
        quiz: [
          { question: 'What is the fundamental difference between symmetric and asymmetric encryption?', options: ['Symmetric is faster', 'Symmetric uses one key; asymmetric uses key pair (public/private)', 'Symmetric only works on text', 'Symmetric is for encryption; asymmetric for hashing'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Symmetric uses one shared key. Asymmetric uses mathematically linked key pairs.', certTags: ['Security+'] },
          { question: 'Why is ECB mode considered insecure?', options: ['Uses 56-bit key', 'Identical plaintext blocks produce identical ciphertext, revealing patterns', 'Requires two passes', 'Cannot be hardware accelerated'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'ECB encrypts each block independently, preserving patterns in the data (the "penguin problem").', certTags: ['Security+'] },
          { question: 'What is the main advantage of ECC over RSA for equivalent security?', options: ['ECC is easier to implement', 'ECC achieves same security with much smaller key sizes', 'ECC is older and more tested', 'ECC does not require key pairs'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: '256-bit ECC ≈ 3072-bit RSA, making ECC faster for key generation and encryption.', certTags: ['Security+'] },
          { question: 'A system stores passwords as SHA-256 without salt. Which attack is this MOST vulnerable to?', options: ['Brute force only', 'Rainbow table attack', 'MITM attack', 'SQL injection'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Without salt, identical passwords produce identical hashes, enabling rainbow table attacks.', certTags: ['Security+'] },
          { question: 'Why does TLS use hybrid encryption?', options: ['Symmetric cannot work over networks', 'Asymmetric is too slow for bulk data; symmetric is too slow for key distribution', 'Hybrid is mandated by NIST', 'Backward compatibility'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Asymmetric securely exchanges a symmetric session key, then symmetric handles bulk data.', certTags: ['Security+'] },
          { question: 'What does a digital signature provide that a simple hash does not?', options: ['Faster computation', 'Confidentiality', 'Authentication and non-repudiation via private key', 'Compression'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'A hash provides integrity. A digital signature adds authentication and non-repudiation.', certTags: ['Security+'] },
          { question: 'In PKI, what happens when a browser encounters a certificate from an unknown CA?', options: ['Automatically trusted', 'Warning displayed because CA is not in trusted root store', 'Website blocked', 'Browser generates its own cert'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Browsers maintain trusted root CA stores. Unknown CAs trigger security warnings.', certTags: ['Security+'] },
          { question: 'What is forward secrecy in TLS?', options: ['Server cert is always valid', 'Even if server private key is compromised, past session keys remain secure', 'Guarantees fastest connection', 'Encrypts certificate exchange'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Ephemeral DH generates unique session keys per connection. Compromised private key cannot decrypt past traffic.', certTags: ['Security+'] },
          { question: 'Why is argon2 preferred over bcrypt for passwords?', options: ['Argon2 is faster', 'Argon2 is memory-hard, making GPU/ASIC attacks more expensive', 'Argon2 produces smaller hashes', 'Argon2 is older and more tested'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Argon2 is memory-hard, requiring significant RAM per hash - making GPU attacks much more expensive.', certTags: ['Security+'] },
          { question: 'Running echo -n "mypassword" | sha256sum is insecure for password storage because:', options: ['SHA-256 is weak', 'It is not salted and SHA-256 is too fast', 'The hash is too short', 'SHA-256 only works on numbers'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'SHA-256 is designed to be fast - billions of hashes/second on GPUs. Use bcrypt or argon2 for passwords.', certTags: ['Security+'] },
          { question: 'What is the difference between CRL and OCSP?', options: ['CRL is faster', 'CRL downloads entire revocation list; OCSP queries specific certs in real-time', 'CRL is for SSL; OCSP for code signing', 'No functional difference'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'CRL requires downloading a large list. OCSP queries specific certificates with fresher data.', certTags: ['Security+'] },
          { question: 'What makes AES-256 practically unbreakable by brute force?', options: ['Built-in lockout', '2^256 keys would take longer than the age of the universe', 'AES changes key during encryption', 'Quantum computers cannot attempt AES keys'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: '2^256 ≈ 1.16 × 10^77 possible keys. Even billions/second would take longer than the universe has existed.', certTags: ['Security+'] },
          { question: 'Why does PKI use intermediate CAs instead of root CAs signing directly?', options: ['Intermediate CAs are faster', 'Root CA keys are kept offline in HSMs; intermediates handle daily signing', 'Root CAs cannot sign', 'Intermediate CAs use different algorithms'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Root keys are kept in offline HSMs. If compromised, every certificate would be affected. Intermediates limit exposure.', certTags: ['Security+'] },
          { question: 'What is the purpose of salt in password hashing?', options: ['Makes password longer', 'Ensures identical passwords produce different hashes, defeating rainbow tables', 'Encrypts the hash', 'Compresses the hash'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'A random salt ensures identical passwords produce different stored hashes, defeating rainbow tables.', certTags: ['Security+'] },
          { question: 'Which hash algorithm should NEVER be used for security due to known collision vulnerabilities?', options: ['SHA-256', 'SHA-512', 'MD5', 'bcrypt'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'MD5 has known collision vulnerabilities. Never use for passwords, signatures, or certificates.', certTags: ['Security+'] }
        ]
      }
    ]
  },
  {
    id: 'week13',
    title: 'Architecture & Implementation Part 1',
    durationText: 'Week 13 - 2 topics',
    focus: 'Identity and access management fundamentals and access control models',
    output: 'Ability to implement IAM solutions, configure MFA, and apply appropriate access control models',
    topics: [
      {
        id: 'we13d01',
        title: 'Identity & Access Management',
        description: 'Comprehensive coverage of authentication factors, MFA technologies, SSO/federation protocols, and directory services.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'Why is FIDO2/WebAuthn considered phishing-resistant, and how does it differ from TOTP-based MFA?',
        interviewAnswer: 'FIDO2 uses public key cryptography bound to specific domains, so credentials registered for a legitimate site cannot be used on a phishing site. TOTP codes can be phished in real-time by relaying the code to the legitimate service within the 30-second window. FIDO2 requires user interaction with a physical device and validates the origin.',
        content: `:::objectives
- Differentiate authentication factors and their security properties
- Implement various MFA methods (TOTP, HOTP, push, biometric)
- Explain SSO and federation concepts (SAML, OAuth2, OIDC)
- Compare RADIUS, TACACS+, and LDAP directory services
:::

:::info
IAM is the framework ensuring the right individuals access the right resources at the right times for the right reasons.
:::

## Authentication Factors

| Category | Description | Examples |
|---|---|---|
| **Something you know** | Knowledge-based | Password, PIN, security questions |
| **Something you have** | Possession-based | Smart card, phone, YubiKey |
| **Something you are** | Biometric | Fingerprint, iris, facial recognition |

### Biometric Error Rates
- **FAR (False Acceptance Rate):** Unauthorized accepted → security risk
- **FRR (False Rejection Rate):** Authorized rejected → usability issue
- **CER (Crossover Error Rate):** Where FAR = FRR → lower = better

## MFA Methods

### TOTP (Time-based One-Time Password)
- 6-digit code from shared secret + current time (30-second steps)
- Apps: Google Authenticator, Authy, Microsoft Authenticator
- **Vulnerability:** Real-time phishing relay

### HOTP (HMAC-based One-Time Password)
- Counter-based, changes after each use
- Used in hardware tokens (YubiKey HOTP mode)

### Push Notifications
- Server sends approval request to registered device
- **Vulnerability:** Fatigue attacks (repeated push until accidental approval)

### Hardware Tokens
- **YubiKey:** USB-C/NFC, supports FIDO2/WebAuthn
- **FIDO2/WebAuthn:** Phishing-resistant, uses public key cryptography

:::warning
SMS-based OTP is insecure due to SIM swapping, SS7 vulnerabilities, and interception. NIST SP 800-63B recommends against SMS as primary factor.
:::

## SSO & Federation

### SAML (Security Assertion Markup Language)
**Flow:** User → SP redirects to IdP → IdP authenticates → IdP sends assertion → SP grants access

### OAuth 2.0
**Purpose:** Authorization (not authentication). Allows limited access to resources without sharing credentials.

### OpenID Connect (OIDC)
**Purpose:** Authentication built on OAuth 2.0. Adds ID token (JWT) with user identity.

| Protocol | Purpose | Primary Use |
|---|---|---|
| SAML | SSO | Enterprise web SSO |
| OAuth 2.0 | Authorization | API access delegation |
| OIDC | Authentication | Modern web/mobile SSO |

## Directory Services

### LDAP
- Standard protocol for directory access
- Port: 389 (LDAP), 636 (LDAPS)
- Active Directory is Microsoft's LDAP implementation

### RADIUS vs TACACS+

| Feature | RADIUS | TACACS+ |
|---|---|---|
| Protocol | UDP | TCP |
| Port | 1812/1813 | 49 |
| Encryption | Password only | Full packet |
| AAA | Combined | Separated |
| Use | Network access | Device administration |

:::tip
Use RADIUS for network access (Wi-Fi, VPN). Use TACACS+ for device administration (router/switch config).
:::`,
        quiz: [
          { question: 'Badge + PIN for building access uses which authentication factors?', options: ['Two factors: have + know', 'One factor: have', 'Two factors: are + know', 'Three factors: have + know + are'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Smart card = something you have, PIN = something you know - two different factor categories.', certTags: ['Security+'] },
          { question: 'What is the PRIMARY vulnerability of TOTP-based MFA?', options: ['Codes are predictable', 'Codes can be phished and used within the 30-second window', 'TOTP requires internet', 'Codes are too long'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Phishing sites relay codes in real-time to legitimate services within the valid window.', certTags: ['Security+'] },
          { question: 'In SAML SSO, which component authenticates the user and issues assertions?', options: ['Service Provider', 'Identity Provider', 'Certificate Authority', 'RADIUS server'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'The IdP authenticates the user and issues SAML assertions. The SP consumes them.', certTags: ['Security+'] },
          { question: 'OAuth 2.0 is primarily designed for:', options: ['Authentication', 'Authorization - delegating access to resources', 'Encryption', 'Auditing'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'OAuth 2.0 is an authorization framework. OIDC adds authentication on top.', certTags: ['Security+'] },
          { question: 'Why does NIST recommend against SMS-based OTP?', options: ['SMS is too slow', 'SMS is vulnerable to SIM swapping, SS7 attacks, and interception', 'SMS does not work internationally', 'SMS codes expire too quickly'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'SMS OTP is vulnerable to SIM swapping, SS7 interception, and malware.', certTags: ['Security+'] },
          { question: 'What is the key difference between RADIUS and TACACS+?', options: ['RADIUS is faster', 'RADIUS encrypts only password; TACACS+ encrypts entire packet', 'RADIUS uses TCP; TACACS+ uses UDP', 'RADIUS supports more protocols'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'TACACS+ encrypts the entire packet body, providing better confidentiality for device administration.', certTags: ['Security+'] },
          { question: 'A biometric system has FAR of 0.01% and FRR of 5%. What does this mean?', options: ['System is perfect', '1 in 10,000 impostors accepted; 1 in 20 legitimate users rejected', '5% of users are impostors', 'System needs monthly recalibration'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'FAR of 0.01% means 1 in 10,000 unauthorized attempts succeeds. FRR of 5% means 1 in 20 legitimate users is incorrectly denied.', certTags: ['Security+'] },
          { question: 'FIDO2/WebAuthn is phishing-resistant because it uses:', options: ['Longer passwords', 'Public key cryptography bound to specific domains', 'Biometrics that cannot be replicated', 'Encrypted SMS'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'FIDO2 uses public key crypto where private keys are bound to specific origins. Phishing sites cannot use credentials registered for different domains.', certTags: ['Security+'] },
          { question: 'In Kerberos, what is a Ticket Granting Ticket (TGT)?', options: ['Final service ticket', 'Allows requesting service tickets without re-authenticating', 'Offline password backup', 'Temporary KDC-issued password'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'A TGT is issued after initial authentication. Users present it to request service tickets without re-entering passwords.', certTags: ['Security+'] },
          { question: 'Which authentication method is MOST appropriate for a high-security facility?', options: ['Password-only', 'Smart card + PIN + biometric', 'Security questions', 'SMS-based OTP'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Three-factor authentication provides maximum security and audit trail compliance.', certTags: ['Security+'] },
          { question: 'What is the difference between authentication and authorization in OAuth 2.0?', options: ['Same thing', 'OAuth handles authorization; OIDC adds authentication', 'OAuth handles both', 'OAuth handles authentication only'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'OAuth 2.0 handles authorization. OIDC is an authentication layer built on top of OAuth 2.0.', certTags: ['Security+'] },
          { question: 'FreeRADIUS uses UDP. What is encrypted in the authentication packet?', options: ['Entire packet', 'Only the password', 'Only the username', 'Nothing'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'RADIUS only encrypts the password. Usernames and other attributes are sent in cleartext.', certTags: ['Security+'] },
          { question: 'An attacker spams MFA push notifications until an employee approves. Which MFA type is vulnerable?', options: ['TOTP', 'Push notification', 'Hardware token', 'FIDO2/WebAuthn'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Push notification MFA is vulnerable to fatigue attacks. TOTP, hardware tokens, and FIDO2 require主动 user initiation.', certTags: ['Security+'] },
          { question: 'What is the PRIMARY advantage of SAML over OAuth 2.0 for enterprise SSO?', options: ['SAML is faster', 'SAML is mature with broad enterprise support for web SSO', 'SAML supports mobile better', 'SAML uses JSON'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'SAML is a mature standard designed for web-based SSO. OAuth 2.0 is better for API access and mobile.', certTags: ['Security+'] }
        ]
      },
      {
        id: 'we13d02',
        title: 'Access Control Models',
        description: 'Detailed comparison of DAC, MAC, RBAC, and ABAC models with implementation guidance and security principles.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'How would you implement access controls for a hospital EHR system, and which model would you choose?',
        interviewAnswer: 'I would implement RBAC with roles like doctor, nurse, and billing staff, each with appropriate permissions. Doctors get read/write to patient records, nurses get read access with limited write, and billing sees only billing codes. Combined with ABAC refinements for time-of-day and location restrictions, and enforced through separation of duties for critical functions like medication ordering.',
        content: `:::objectives
- Compare DAC, MAC, RBAC, and ABAC models with use cases
- Apply least privilege and need-to-know principles
- Implement separation of duties and privileged access management
- Design access control strategies for different needs
:::

:::info
Access control models define HOW decisions are made about who can access what resources. The choice depends on security requirements, regulatory environment, and operational needs.
:::

## Access Control Models Comparison

| Model | Decision Maker | Granularity | Complexity | Use Case |
|---|---|---|---|---|
| **DAC** | Resource owner | Low-Medium | Low | Personal files, small teams |
| **MAC** | System policy | High | High | Military, classified |
| **RBAC** | Role assignment | Medium | Medium | Most enterprises |
| **ABAC** | Attribute evaluation | Very High | High | Dynamic/cloud environments |

### DAC (Discretionary Access Control)
Resource owner controls access. Default in most OS (Windows NTFS, Linux).

### MAC (Mandatory Access Control)
System enforces security labels. Bell-LaPadula: No Read Up, No Write Down.

### RBAC (Role-Based Access Control)
Permissions assigned to roles, users assigned to roles. Simplifies administration.

### ABAC (Attribute-Based Access Control)
Decisions based on subject, resource, action, and environment attributes. Most flexible and granular.

## Core Security Principles

### Least Privilege
Users should have only minimum permissions needed for their job.

### Need-to-Know
Users should only access information necessary for their current responsibilities.

### Separation of Duties
Critical tasks require multiple people. Types: dual control, split knowledge, job rotation.

### Privileged Access Management (PAM)
Framework for managing, monitoring, and auditing privileged access.
- Credential vaulting, session recording, JIT access, password rotation

:::warning
Common PAM mistakes: shared admin accounts, permanent admin access, no session monitoring, credentials in scripts.
:::

:::tip
Choose: DAC for simple needs, MAC for military/government, RBAC for most enterprises, ABAC for cloud/zero-trust, Hybrid RBAC+ABAC for balanced complexity.
:::`,
        quiz: [
          { question: 'In which model does the RESOURCE OWNER grant permissions?', options: ['MAC', 'DAC', 'RBAC', 'ABAC'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'DAC gives resource owners discretion to decide access.', certTags: ['Security+'] },
          { question: 'Bell-LaPadula\'s "No Write Down" prevents:', options: ['Unauthorized reading', 'A high-classification process writing to lower classification', 'Unauthorized execution', 'Access to owned files'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'No Write Down prevents data leakage from higher to lower classification levels.', certTags: ['Security+'] },
          { question: 'Hospital assigns permissions by role (doctor, nurse, billing). Which model?', options: ['DAC', 'MAC', 'RBAC', 'ABAC'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'RBAC assigns permissions based on job roles.', certTags: ['Security+'] },
          { question: 'Separation of duties ensures:', options: ['Same person initiates and approves', 'One person cannot complete critical tasks alone', 'All employees share admin account', 'Passwords are shared'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Different people for request, approval, and processing prevents single-person fraud.', certTags: ['Security+'] },
          { question: 'Least privilege is implemented as "deny by default" because:', options: ['Easier to administer', 'Reduces attack surface by minimizing permissions', 'Prevents all malware', 'Eliminates access reviews'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Starting with zero access and granting only needed permissions minimizes potential damage.', certTags: ['Security+'] },
          { question: 'Clearance determines IF you can access; need-to-know determines:', options: ['Your password strength', 'Whether you SHOULD access specific information', 'Your device type', 'Your network location'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Clearance determines classification access level. Need-to-know determines whether you should access specific data within that level.', certTags: ['Security+'] },
          { question: 'ABAC evaluates attributes. Which is NOT typically an ABAC attribute?', options: ['User role', 'Time of day', 'Password hash value', 'Device type'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'Password hashes are credentials, not access decision attributes. ABAC uses role, time, device, etc.', certTags: ['Security+'] },
          { question: 'Just-In-Time (JIT) privileged access provides which security advantage?', options: ['Faster implementation', 'Reduces attack surface by granting access only when needed', 'Eliminates passwords', 'Works only in cloud'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'JIT grants elevated access only for specific time windows, then auto-revokes. Compromised credentials are useless outside the window.', certTags: ['Security+'] },
          { question: 'Mandatory vacations primarily prevent:', options: ['Physical theft', 'Long-term fraud requiring continuous manipulation', 'DDoS attacks', 'Social engineering'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Forced absences allow others to detect ongoing fraud or manipulation.', certTags: ['Security+'] },
          { question: 'Which model provides the MOST dynamic access decisions based on context?', options: ['DAC', 'MAC', 'RBAC', 'ABAC'], correctAnswerIndex: 3, difficulty: 'intermediate', explanation: 'ABAC evaluates multiple attributes including context (time, location, device) for dynamic decisions.', certTags: ['Security+'] },
          { question: 'An admin can reset passwords but not read emails. Which principle?', options: ['Separation of duties', 'Least privilege', 'Job rotation', 'Defense in depth'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Least privilege grants only minimum permissions needed for the job function.', certTags: ['Security+'] },
          { question: 'In Bell-LaPadula, can a Secret-cleared user read a Confidential document?', options: ['Yes - lower classification is readable', 'No - subjects read at or below clearance', 'Yes - clearance does not affect reads', 'No - only exact level'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Simple Security Property allows reading at OR BELOW clearance level. Confidential is below Secret, so yes.', certTags: ['Security+'] },
          { question: 'Why implement RBAC with ABAC refinements instead of pure ABAC?', options: ['Pure ABAC unsupported', 'RBAC provides manageable structure; ABAC adds dynamic context without full complexity', 'Cannot be combined', 'Pure ABAC is only for government'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Hybrid RBAC+ABAC balances role-based manageability with attribute-based granularity.', certTags: ['Security+'] },
          { question: 'Why are shared admin accounts a critical security failure?', options: ['Slower login', 'Eliminates individual accountability', 'Use weaker passwords', 'Only a problem in small orgs'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Shared accounts eliminate individual accountability and make forensic investigation impossible.', certTags: ['Security+'] },
          { question: 'Least privilege limits actions; need-to-know limits:', options: ['Passwords', 'Information/data access', 'Network speed', 'Device types'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Least privilege = what you can DO. Need-to-know = what you can SEE. Together they minimize exposure.', certTags: ['Security+'] }
        ]
      }
    ]
  },
  {
    id: 'week14',
    title: 'Architecture & Implementation Part 2',
    durationText: 'Week 14 - 2 topics',
    focus: 'Network security architecture, virtualization technologies, and system resilience',
    output: 'Ability to design secure networks, implement zero trust, and configure high availability',
    topics: [
      {
        id: 'we14d01',
        title: 'Secure Network Design',
        description: 'Network security architecture including DMZ, segmentation, zero trust principles, and cloud security models.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'What is zero trust architecture, and how does it differ from traditional perimeter security?',
        interviewAnswer: 'Zero trust assumes no implicit trust regardless of network location, verifying every access request based on identity, device health, and context. Traditional perimeter security trusts everything inside the firewall. Zero trust implements micro-segmentation, continuous verification, and least privilege access at every layer, reducing lateral movement if an attacker breaches the perimeter.',
        content: `:::objectives
- Design network architectures with DMZs and proper segmentation
- Implement zero trust architecture principles
- Understand micro-segmentation benefits
- Explain cloud shared responsibility models for IaaS, PaaS, SaaS
:::

:::info
Secure network design limits lateral movement, contains breaches, and provides defense in depth. Poor design can render even the best security controls ineffective.
:::

## Network Security Zones

### DMZ (Demilitarized Zone)
Internet → [Firewall 1] → DMZ → [Firewall 2] → Internal Network

DMZ systems should NEVER contain sensitive data. If compromised, attacker is contained.

### Network Segmentation
Dividing network into separate zones to limit lateral movement.
- VLANs (Layer 2), Subnets (Layer 3), Firewalls between segments

### Air-Gapped Networks
Physical separation from all networks. Use: military, SCADA, nuclear facilities.
Limitation: Stuxnet entered via USB — not impenetrable.

## Zero Trust Architecture (NIST SP 800-207)

### Core Principles
1. Never trust, always verify
2. Assume breach
3. Verify explicitly
4. Least privilege access
5. Micro-segment

### Components
- **Policy Engine (PE):** Evaluates access requests against policies
- **Policy Enforcement Point (PEP):** Enforces decisions at each access point
- **Identity Provider (IdP):** Authenticates users and devices
- **Device Trust:** Verifies device health before granting access

### Zero Trust vs Traditional
| Aspect | Traditional | Zero Trust |
|---|---|---|
| Perimeter | Strong outer boundary | No implicit trust |
| Verification | Once at perimeter | Continuous |
| Lateral movement | Easy once inside | Blocked at every segment |

### Micro-segmentation
Granular security zones around individual workloads. Reduces blast radius of any compromise.

## Cloud Security — Shared Responsibility Model

| Responsibility | IaaS | PaaS | SaaS |
|---|---|---|---|
| Data | Customer | Customer | Customer |
| Applications | Customer | Customer | Provider |
| OS | Customer | Provider | Provider |
| Physical | Provider | Provider | Provider |

:::warning
Zero Trust is not a product — it is an architectural approach requiring changes to identity, network, device, and application layers.
:::`,
        quiz: [
          { question: 'In a properly designed DMZ, what should be true about DMZ server data?', options: ['Contains production databases', 'Should NEVER contain sensitive internal data', 'Has direct internal network access', 'Runs same software as internal servers'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'DMZ is a buffer zone. If compromised, attacker should find nothing valuable.', certTags: ['Security+'] },
          { question: '"Never trust, always verify" means:', options: ['Authenticate once at perimeter', 'Every request is authenticated and authorized regardless of source', 'Only external requests need verification', 'Eliminates firewalls'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Zero trust verifies every request, whether internal or external.', certTags: ['Security+'] },
          { question: 'In IaaS, who patches the guest OS?', options: ['Cloud provider', 'Customer', 'Shared', 'Third-party vendor'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'In IaaS, customer manages everything above physical infrastructure, including OS patching.', certTags: ['Security+'] },
          { question: 'Network segmentation primarily prevents:', options: ['Faster traffic', 'Lateral movement between compromised segments', 'Firewall need', 'Hardware costs'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Segmentation contains breaches by limiting communication between segments.', certTags: ['Security+'] },
          { question: 'Micro-segmentation differs from macro-segmentation by:', options: ['Being less secure', 'Creating zones around individual workloads vs larger network segments', 'Being the same thing', 'Only working in cloud'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Micro-segmentation operates at the individual workload level with granular policies.', certTags: ['Security+'] },
          { question: 'Azure AD + Intune + conditional access implementing identity and device health checks represents:', options: ['Traditional perimeter', 'Zero trust architecture', 'DAC', 'NAT'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'This implements zero trust: verify explicitly, check identity AND device health for every request.', certTags: ['Security+'] },
          { question: 'Stuxnet infected an air-gapped network via:', options: ['Wi-Fi signals', 'Infected USB drives', 'Internet connection', 'Phone calls'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Air gaps prevent network attacks but not physical media attacks.', certTags: ['Security+'] },
          { question: 'Which zero trust component evaluates requests against policies?', options: ['PEP', 'Policy Engine', 'IdP', 'SIEM'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'The Policy Engine evaluates all data (identity, device, context) and makes access decisions.', certTags: ['Security+'] },
          { question: 'In SaaS, the customer is responsible for:', options: ['Application uptime', 'Physical data center security', 'Data encryption and user management', 'Server patching'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'In SaaS, customer manages data, access controls, and user management.', certTags: ['Security+'] },
          { question: 'A flat network is dangerous because:', options: ['It is slower', 'A single compromised host can reach every other system', 'Cannot support cloud', 'Requires more admins'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Flat networks have no internal barriers - one compromise means full network access.', certTags: ['Security+'] },
          { question: 'Castle-and-moat vs zero trust differs fundamentally in:', options: ['Internal traffic trust', 'Castle-and-moat trusts internal; zero trust verifies all', 'Castle-and-moat is more secure', 'Zero trust only applies externally'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Castle-and-moat trusts everything inside the perimeter. Zero trust assumes internal is hostile.', certTags: ['Security+'] },
          { question: 'Which cloud model gives customers MOST security control?', options: ['SaaS', 'PaaS', 'IaaS', 'Equal control'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'IaaS provides most customer control (and responsibility) over OS, middleware, and applications.', certTags: ['Security+'] },
          { question: 'The MOST impactful first step for zero trust implementation is:', options: ['Deploy micro-segmentation', 'Implement strong identity verification and MFA', 'Replace all firewalls', 'Move to cloud'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Identity is the foundation. Without strong identity verification, other zero trust components are meaningless.', certTags: ['Security+'] },
          { question: 'Placing web servers in DMZ, databases on internal VLAN, with firewall allowing only port 3306 implements:', options: ['Defense in depth', 'Network segmentation with least privilege', 'Zero trust', 'Air-gapping'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Separating server types with strict port-based rules implements segmentation with least privilege.', certTags: ['Security+'] }
        ]
      },
      {
        id: 'we14d02',
        title: 'Virtualization & Resilience',
        description: 'Hypervisor types, containerization, high availability, load balancing, backup strategies, and RAID configurations.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'Explain the difference between RPO and RTO and how they influence backup strategy design.',
        interviewAnswer: 'RPO defines the maximum acceptable data loss measured in time, determining how frequently backups must occur. RTO defines the maximum acceptable downtime, influencing recovery infrastructure and failover design. A 1-hour RPO requires at least hourly backups, while a 4-hour RTO may justify warm standby systems. Together they drive investment in backup frequency, storage, and recovery automation.',
        content: `:::objectives
- Compare Type 1 and Type 2 hypervisors
- Differentiate VMs and containers
- Implement high availability, load balancing, and failover
- Select appropriate backup types and RAID levels
:::

:::info
Virtualization and resilience technologies provide secure, available, and recoverable infrastructure.
:::

## Hypervisors

| Feature | Type 1 (Bare Metal) | Type 2 (Hosted) |
|---|---|---|
| Performance | Better (no host OS) | Worse (host OS overhead) |
| Security | More secure (smaller attack surface) | Less secure |
| Use case | Production servers | Development, personal |
| Examples | VMware ESXi, Hyper-V, KVM | VirtualBox, VMware Workstation |

## VMs vs Containers

| Feature | VMs | Containers |
|---|---|---|
| Isolation | Full OS per instance | Shared OS kernel |
| Size | GBs | MBs |
| Startup | Minutes | Seconds |
| Security | Stronger isolation | Weaker (shared kernel) |
| Density | Fewer per host | Many more per host |

:::warning
Containers share the host kernel — container escape attacks can affect the host. For maximum isolation, run containers inside VMs.
:::

## High Availability

### Load Balancing
- **Layer 4 (Transport):** Based on IP:port — fast
- **Layer 7 (Application):** Based on HTTP headers/URL — intelligent routing
- Algorithms: Round Robin, Least Connections, IP Hash, Weighted

### Failover
- **Active-Passive:** Backup idle, activates on failure
- **Active-Active:** Both handle traffic, one takes over

## Backup Strategies

| Type | What | Speed | Storage | Recovery |
|---|---|---|---|---|
| **Full** | Everything | Slowest | Largest | Easiest |
| **Incremental** | Since last backup | Fastest | Smallest | Moderate |
| **Differential** | Since last full | Moderate | Moderate | Moderate |

### 3-2-1 Rule
- **3** copies of data
- **2** different storage media
- **1** offsite copy

### RPO vs RTO
- **RPO:** Maximum acceptable data loss
- **RTO:** Maximum acceptable downtime

:::tip
RAID is NOT backup. RAID protects against disk failure, not accidental deletion, ransomware, or theft.
:::

## RAID Levels

| Level | Min Disks | Fault Tolerance | Use Case |
|---|---|---|---|
| RAID 0 | 2 | None | Temp data |
| RAID 1 | 2 | 1 disk | OS drives |
| RAID 5 | 3 | 1 disk | General purpose |
| RAID 6 | 4 | 2 disks | Large arrays |
| RAID 10 | 4 | 1 per mirror | Databases |`,
        quiz: [
          { question: 'Key difference between Type 1 and Type 2 hypervisors?', options: ['Type 1 supports more VMs', 'Type 1 runs on hardware; Type 2 on host OS', 'Type 1 is free', 'Type 1 for servers only'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Type 1 runs directly on hardware for better performance/security. Type 2 runs on a host OS.', certTags: ['Security+'] },
          { question: 'Why do containers provide less isolation than VMs?', options: ['Weaker encryption', 'Containers share host OS kernel; VMs have separate OS', 'Containers are smaller', 'Containers cannot run on hardware'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Shared kernel means kernel vulnerabilities affect all containers. VMs provide OS-level isolation.', certTags: ['Security+'] },
          { question: '99.99% availability allows how much downtime per year?', options: ['8.76 hours', '52.6 minutes', '5.26 minutes', '87.6 hours'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: '99.99% = 0.01% downtime = 52.6 minutes per year.', certTags: ['Security+'] },
          { question: 'Restoring to Wednesday with Sunday full + Monday-Wednesday incrementals requires:', options: ['Sunday + Thursday differential', 'Sunday + each incremental through Wednesday', 'Sunday + Wednesday incremental only', 'Thursday differential only'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Incremental restoration requires the last full backup plus every incremental since.', certTags: ['Security+'] },
          { question: 'RAID 5 can survive how many simultaneous disk failures?', options: ['0', '1', '2', 'Depends on disk size'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'RAID 5 uses single distributed parity, surviving exactly one disk failure.', certTags: ['Security+'] },
          { question: 'Load balancing primarily provides:', options: ['Eliminates backups', 'Distributes traffic to prevent overload and improve redundancy', 'Encrypts traffic', 'Replaces firewalls'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Load balancing distributes requests across servers, maintaining availability if one fails.', certTags: ['Security+'] },
          { question: 'The 3-2-1 backup rule recommends:', options: ['3 full, 2 incremental, 1 differential', '3 copies, 2 media types, 1 offsite', '3 locations, 2 providers, 1 local', '3 attempts, 2 successful, 1 verified'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: '3 copies of data, 2 different storage media, 1 offsite copy for disaster protection.', certTags: ['Security+'] },
          { question: 'A load balancer routing by HTTP headers/URL operates at which layer?', options: ['Layer 3', 'Layer 4', 'Layer 7', 'Layer 2'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'Layer 7 load balancers inspect HTTP content for intelligent routing.', certTags: ['Security+'] },
          { question: 'RPO defines maximum acceptable:', options: ['Downtime', 'Data loss', 'Hardware cost', 'Network latency'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'RPO = how much data you can afford to lose. RTO = how quickly you must recover.', certTags: ['Security+'] },
          { question: 'Immutable backups are critical for ransomware defense because:', options: ['Faster restore', 'Cannot be modified or deleted by ransomware', 'Use less storage', 'Auto-patch vulnerabilities'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Immutable backups remain clean even if production data and backup systems are compromised.', certTags: ['Security+'] },
          { question: 'Container escape is unique to containers because:', options: ['Data encryption', 'Shared kernel allows breakout to host', 'Network segmentation', 'Access control'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Container escape exploits shared kernel to break out - a risk not present with fully isolated VMs.', certTags: ['Security+'] },
          { question: 'RAID 10 storage efficiency compared to RAID 1:', options: ['RAID 10 is more efficient', 'Both have 50% efficiency', 'RAID 10 uses 25%', 'RAID 1 has no penalty'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Both RAID 1 and RAID 10 have 50% storage efficiency due to mirroring.', certTags: ['Security+'] },
          { question: 'RAID 5 data recovery works by:', options: ['Permanent loss', 'XORing remaining disks with parity data', 'Reading backup tape', 'Majority voting'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'RAID 5 uses XOR parity. Missing disk data is reconstructed by XORing all remaining disks.', certTags: ['Security+'] },
          { question: 'Running containers inside VMs provides which security advantage?', options: ['Better performance', 'VM isolation limits container escape to VM, not host', 'Easier management', 'Lower cost'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'VM provides OS-level isolation. Container escape only reaches the VM, not the physical host.', certTags: ['Security+'] },
          { question: 'Achieving 99.999% availability requires:', options: ['RAID 0 + daily backups', 'Active-active cluster, RAID 10, real-time replication', 'Single server + UPS + RAID 5', 'Cloud with no redundancy'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Five 9s requires multiple redundancy layers: clustering, load balancing, RAID 10, and replication.', certTags: ['Security+'] }
        ]
      }
    ]
  },
  {
    id: 'week15',
    title: 'Operations & Incident Response Part 1',
    durationText: 'Week 15 - 2 topics',
    focus: 'Incident response lifecycle and logging/monitoring fundamentals',
    output: 'Ability to execute IR procedures, understand NIST IR lifecycle, and configure logging infrastructure',
    topics: [
      {
        id: 'we15d01',
        title: 'Incident Response Lifecycle',
        description: 'NIST incident response lifecycle, CSIRT composition, evidence handling, and playbooks for common scenarios.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'Walk me through the NIST incident response lifecycle and explain why containment comes before eradication.',
        interviewAnswer: 'The NIST lifecycle includes Preparation, Detection and Analysis, Containment, Eradication, Recovery, and Lessons Learned. Containment must precede eradication because you need to stop the bleeding and preserve evidence before removing the threat. If you eradicate first, you may lose forensic evidence, allow the attacker to maintain persistence through other vectors, or fail to close the original entry point.',
        content: `:::objectives
- Execute the six phases of the NIST Incident Response lifecycle
- Compose and manage a CSIRT
- Apply evidence preservation and chain of custody procedures
- Use playbooks and runbooks for incident handling
:::

:::info
Incident response is the organized approach to addressing and managing security incidents. The goal is to limit damage, reduce recovery time and costs, and improve defenses.
:::

:::concept
**NIST SP 800-61 Rev. 2 — Incident Response Lifecycle:**

1. **Preparation** → 2. **Detection & Analysis** → 3. **Containment, Eradication, Recovery** → 4. **Post-Incident Activity (Lessons Learned)**

This is a continuous cycle — lessons learned feed back into preparation.
:::

## Phase 1: Preparation
- Develop IR policies and procedures
- Assemble and train the CSIRT
- Deploy detection and monitoring tools
- Create communication plans (internal, external, legal)
- Establish relationships with external parties (law enforcement, ISACs)
- Conduct tabletop exercises and simulations
- Maintain contact lists and asset inventories

## Phase 2: Detection & Analysis
**Detection sources:** IDS/IPS alerts, SIEM correlation, user reports, threat intelligence, anomaly detection, log analysis

**Analysis activities:** Validate true incidents, determine scope, classify severity, document findings, begin evidence collection

:::warning
Not every alert is an incident. False positives waste resources. Validate before escalating.
:::

## Phase 3: Containment
**Short-term:** Isolate systems, block malicious IPs, disable compromised accounts, preserve evidence
**Long-term:** Apply patches, implement additional monitoring, create clean system images

## Phase 4: Eradication
- Identify root cause
- Remove malware from all affected systems
- Delete attacker-created accounts
- Close exploited vulnerabilities
- Scan for persistence mechanisms

:::tip
Eradication is not just removing malware — it's closing the entry point. If you don't close the vulnerability, the attacker returns.
:::

## Phase 5: Recovery
- Restore from verified clean backups
- Rebuild from known-good images
- Reset all potentially compromised credentials
- Monitor closely for re-compromise
- Gradually restore production access

## Phase 6: Lessons Learned
**Timeline:** Within 1-2 weeks of incident closure
- Conduct blame-free post-mortem
- Document what worked and what didn't
- Update IR procedures
- Improve detection rules

## CSIRT Composition

| Role | Responsibility |
|---|---|
| IR Manager | Overall coordination, decision-making |
| Lead Analyst | Technical investigation, forensics |
| SOC Analysts | Detection, monitoring, triage |
| Forensics Specialist | Evidence collection, chain of custody |
| Malware Analyst | Reverse engineering |
| Communications | Internal/external notifications |
| Legal Counsel | Regulatory compliance, law enforcement |
| HR Representative | Insider threat cases |

## Playbooks & Runbooks
**Playbook:** Step-by-step procedures for specific incident types (phishing, ransomware, DDoS)
**Runbook:** Automated or manual procedures for specific tasks (isolate system, collect memory dump)

## Evidence & Chain of Custody

**Order of Volatility (most to least):**
1. CPU registers and cache
2. Routing tables, ARP cache, process table
3. Memory (RAM)
4. Temporary file systems
5. Disk/SSD data
6. Remote logging data
7. Archival media

:::checkpoint
Key points: Preparation is ongoing. Contain before eradicating. Lessons learned is mandatory. Document everything.
:::`,
        quiz: [
          { question: 'What is the FIRST phase in the NIST IR lifecycle?', options: ['Detection', 'Containment', 'Preparation', 'Eradication'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'Preparation is first - you must build capabilities before an incident occurs.', certTags: ['Security+'] },
          { question: 'Why is containment performed BEFORE eradication?', options: ['Faster', 'Must stop the bleeding and preserve evidence before removing cause', 'Required by regulation', 'They happen simultaneously'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Containment stops further damage and preserves evidence. Eradication before containment risks evidence loss.', certTags: ['Security+'] },
          { question: 'According to order of volatility, which evidence is collected FIRST?', options: ['Hard drive', 'CPU registers and cache', 'RAM', 'Network logs'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'CPU registers are most volatile - lost instantly when power is removed.', certTags: ['Security+'] },
          { question: 'The PRIMARY purpose of lessons learned is:', options: ['Blame individuals', 'Improve future IR capabilities', 'Determine legal liability', 'Decide ransom payment'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Lessons learned is blame-free review focused on identifying gaps and improving procedures.', certTags: ['Security+'] },
          { question: 'A CSIRT has lead analyst, forensics specialist, malware analyst, and communications lead. Which role is MISSING for insider threats?', options: ['SOC Analyst', 'Legal Counsel', 'HR Representative', 'Threat Hunter'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'Insider threats require HR for employee policy violations and employment law considerations.', certTags: ['Security+'] },
          { question: 'Playbooks and runbooks differ in that:', options: ['Same thing', 'Playbooks cover incident types; runbooks cover specific tasks', 'Playbooks are for management; runbooks for techs', 'Playbooks are theoretical; runbooks practical'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Playbooks are strategic (phishing response). Runbooks are tactical (isolate system, collect memory).', certTags: ['Security+'] },
          { question: 'Calculating SHA-256 of disk images during evidence collection ensures:', options: ['Faster collection', 'Integrity verification - proof evidence was not altered', 'Encryption of evidence', 'Compression of data'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Hashing provides integrity verification - any modification changes the hash, proving tampering.', certTags: ['Security+'] },
          { question: 'Which containment strategy redirects C2 domains to a controlled server?', options: ['Network isolation', 'Account disabling', 'DNS sinkholing', 'Firewall rules'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'DNS sinkholing redirects malicious domains to controlled servers, allowing monitoring of compromised systems.', certTags: ['Security+'] },
          { question: 'A post-mortem meeting should be conducted within:', options: ['24 hours', '1-2 weeks of incident closure', '1 month', 'End of year'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Post-mortems should occur within 1-2 weeks while details are fresh but after the incident is resolved.', certTags: ['Security+'] },
          { question: 'Recovery after a major incident should prioritize:', options: ['Restoring all systems simultaneously', 'Critical business systems first, validate before reconnecting', 'Restoring from oldest backup', 'Waiting for vendor approval'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Recovery prioritizes critical systems first, validates integrity before reconnecting, and monitors for 24-48 hours.', certTags: ['Security+'] },
          { question: 'Chain of custody documentation tracks:', options: ['Only who collected evidence', 'Who collected, when, where stored, who accessed, and hash values at each stage', 'Only the hash values', 'Only the storage location'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Complete chain of custody documents the entire lifecycle of evidence handling.', certTags: ['Security+'] },
          { question: 'Why is eradication not just about removing malware?', options: ['Malware cannot be removed', 'Must identify and close the entry point or attacker returns', 'Eradication is automated', 'Only affects Windows'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Removing malware without closing the vulnerability allows re-exploitation. Root cause analysis is essential.', certTags: ['Security+'] },
          { question: 'What makes a "no-blame culture" important for incident response?', options: ['Employees enjoy reporting incidents', 'Fear of punishment leads to concealment; safety encourages reporting', 'Eliminates need for training', 'Reduces incident frequency'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Blame culture creates silence. Safe reporting culture means incidents are reported quickly, before others are affected.', certTags: ['Security+'] },
          { question: 'During preparation, tabletop exercises serve which purpose?', options: ['Replace actual incidents', 'Test IR procedures in a safe environment and identify gaps', 'Satisfy compliance requirements only', 'Train only new employees'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Tabletop exercises simulate scenarios to test procedures, identify gaps, and train teams without real consequences.', certTags: ['Security+'] }
        ]
      },
      {
        id: 'we15d02',
        title: 'Logging & Monitoring',
        description: 'Windows and Linux log management, syslog fundamentals, SIEM concepts, and log retention policies.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'How would you design a logging infrastructure to detect a compromised insider slowly exfiltrating data?',
        interviewAnswer: 'I would implement centralized logging with SIEM correlation across authentication, file access, and network events. Key indicators include unusual data transfer volumes, access patterns outside normal working hours, queries against sensitive tables, and connections to external IPs. Baseline normal behavior per user and alert on deviations, with PowerShell script block logging to detect fileless techniques.',
        content: `:::objectives
- Navigate Windows Event Logs and Linux log files
- Understand syslog levels and their uses
- Explain SIEM concepts: correlation, normalization, alerting
- Design log retention policies for compliance
:::

:::info
Logging and monitoring are the eyes and ears of security. You cannot detect what you cannot see. Proper logging enables detection, investigation, compliance, and forensics.
:::

## Windows Event Logs

### Primary Log Categories
- **Security:** Authentication events, audit policy changes, privilege use (Event IDs 4624/4625 = logon success/failure)
- **System:** Services, drivers, system startup/shutdown
- **Application:** Application-specific events
- **PowerShell:** Script block logging, module logging (critical for detecting fileless malware)

### Key Event IDs
| Event ID | Meaning |
|---|---|
| 4624 | Successful logon |
| 4625 | Failed logon |
| 4648 | Logon with explicit credentials (runas) |
| 4672 | Special privileges assigned (admin logon) |
| 4720 | User account created |
| 4726 | User account deleted |
| 4732 | Member added to local group |
| 7045 | Service installed |

## Linux Log Files

| Log File | Content |
|---|---|
| /var/log/syslog | General system messages |
| /var/log/auth.log | Authentication events (login, sudo) |
| /var/log/kern.log | Kernel messages |
| /var/log/dmesg | Hardware/driver messages |
| /var/log/cron | Cron job execution |
| /var/log/maillog | Mail server events |
| /var/log/httpd/ | Web server access/error logs |

## Syslog Levels (0-7)

| Level | Name | Description |
|---|---|---|
| 0 | EMERG | System is unusable |
| 1 | ALERT | Immediate action required |
| 2 | CRIT | Critical conditions |
| 3 | ERR | Error conditions |
| 4 | WARNING | Warning conditions |
| 5 | NOTICE | Normal but significant |
| 6 | INFO | Informational messages |
| 7 | DEBUG | Debug-level messages |

:::info
In practice, production systems log at INFO or WARNING level. DEBUG generates too much volume. EMERG/ALERT are rare — system is going down.
:::

## SIEM (Security Information and Event Management)

### Core Functions
1. **Log aggregation:** Collect logs from all sources into central repository
2. **Normalization:** Convert different log formats to common schema
3. **Correlation:** Link related events across sources to detect patterns
4. **Alerting:** Trigger notifications when conditions match rules
5. **Dashboards:** Visualize security posture in real-time
6. **Reporting:** Generate compliance and forensic reports

### Correlation Examples
- Multiple failed logons from different IPs (brute force detection)
- Successful logon after multiple failures (password guessing success)
- Login from unusual location + time (account compromise indicator)
- Admin account created + data export (insider threat pattern)

### SIEM Products
- **Enterprise:** Splunk, IBM QRadar, ArcSight, Microsoft Sentinel
- **Open-source:** ELK Stack (Elasticsearch, Logstash, Kibana), Wazuh, OSSIM

## Log Retention Policies

### Retention Requirements
| Regulation | Minimum Retention | Focus |
|---|---|---|
| PCI DSS | 1 year (3 months immediate) | Cardholder data access |
| HIPAA | 6 years | Healthcare records |
| SOX | 7 years | Financial records |
| GDPR | Varies (no specific minimum) | Data processing activities |
| NIST | 1 year minimum recommended | General security |

### Best Practices
- Separate hot storage (fast access, 30-90 days)
- Warm storage (slower, 90 days - 1 year)
- Cold/archive (cheapest, 1+ years)
- Encrypt logs at rest and in transit
- Protect log integrity (write-once storage, hash chaining)

:::warning
Attackers often delete logs to cover their tracks. Centralized logging (send logs to remote syslog/SIEM immediately) ensures logs survive even if the source system is compromised.
:::`,
        quiz: [
          { question: 'Which Windows Event ID indicates a successful user logon?', options: ['4625', '4624', '4672', '4720'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Event ID 4624 = successful logon. 4625 = failed logon. 4672 = special privileges assigned.', certTags: ['Security+'] },
          { question: 'Which Linux log file contains authentication events like login and sudo?', options: ['/var/log/syslog', '/var/log/auth.log', '/var/log/kern.log', '/var/log/cron'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: '/var/log/auth.log records all authentication-related events on Linux systems.', certTags: ['Security+'] },
          { question: 'Syslog level 4 corresponds to which severity?', options: ['EMERG', 'ERR', 'WARNING', 'INFO'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'Syslog levels: 0=EMERG, 1=ALERT, 2=CRIT, 3=ERR, 4=WARNING, 5=NOTICE, 6=INFO, 7=DEBUG.', certTags: ['Security+'] },
          { question: 'SIEM normalization converts:', options: ['Logs to alerts', 'Different log formats to a common schema', 'Data to reports', 'Events to incidents'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Normalization converts diverse log formats (syslog, Windows events, application logs) to a common format for correlation.', certTags: ['Security+'] },
          { question: 'SIEM correlation detects a successful logon after 50 failed attempts across 10 IPs. What does this indicate?', options: ['Normal behavior', 'Password guessing/brute force attack', 'System misconfiguration', 'Network timeout'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Multiple failures from different IPs followed by success indicates a brute force attack that eventually succeeded.', certTags: ['Security+', 'CySA+'] },
          { question: 'PCI DSS requires log retention of at least:', options: ['30 days', '6 months', '1 year (3 months immediate access)', '7 years'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'PCI DSS requires 1 year retention with 3 months immediately available for analysis.', certTags: ['Security+'] },
          { question: 'Why should logs be sent to a centralized remote system immediately?', options: ['Faster analysis', 'Source system may be compromised - logs must survive', 'Reduces storage costs', 'Simplifies configuration'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Attackers delete local logs to cover tracks. Centralized logging ensures logs survive even if the source is compromised.', certTags: ['Security+'] },
          { question: 'Windows PowerShell script block logging is critical for detecting:', options: ['Hardware failures', 'Fileless malware using PowerShell', 'Network outages', 'User account lockouts'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Script block logging captures PowerShell commands even when executed in-memory, detecting fileless malware techniques.', certTags: ['Security+'] },
          { question: 'Which SIEM function links related events across different sources to detect attack patterns?', options: ['Log aggregation', 'Normalization', 'Correlation', 'Alerting'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'Correlation links related events across sources (firewall + authentication + application) to identify complex attack patterns.', certTags: ['Security+'] },
          { question: 'ELK Stack consists of which three components?', options: ['Elasticsearch, Logstash, Kibana', 'Event Log, Linux, Kerberos', 'Email, LDAP, Kerberos', 'Encryption, Logging, Key management'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'ELK = Elasticsearch (search/storage), Logstash (processing/parsing), Kibana (visualization/dashboards).', certTags: ['Security+'] },
          { question: 'Event ID 7045 in Windows indicates:', options: ['Service installed', 'Service started', 'Service stopped', 'Service deleted'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Event 7045 = new service installed. This is a key indicator for persistence mechanisms and malware installation.', certTags: ['Security+'] },
          { question: 'Log retention in hot vs cold storage differs in:', options: ['Log format', 'Access speed and cost - hot is fast/expensive, cold is slow/cheap', 'Log content', 'Encryption level'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Hot storage provides fast access (SSD) at higher cost. Cold/archive storage is cheapest but slower to access.', certTags: ['Security+'] },
          { question: 'An attacker uses "logon with explicit credentials" (Event 4648). What might this indicate?', options: ['Normal password change', 'Lateral movement using stolen credentials with runas', 'Account lockout', 'Password reset'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Event 4648 indicates explicit credential use (runas), commonly seen in lateral movement when attackers use stolen credentials.', certTags: ['Security+', 'CySA+'] },
          { question: 'What is the PRIMARY risk of logging at DEBUG level in production?', options: ['Logs are too short', 'Excessive volume impacts performance and storage costs', 'Debug logs are encrypted', 'Debug logs expire quickly'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'DEBUG level generates massive log volume, consuming storage and impacting system performance. Use INFO or WARNING in production.', certTags: ['Security+'] },
          { question: 'SIEM alerting should balance between:', options: ['Speed and accuracy', 'Too many false positives (alert fatigue) and missing true positives', 'Cost and compliance', 'Storage and performance'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'SIEM tuning balances sensitivity - too many alerts causes fatigue (ignored), too few misses real incidents.', certTags: ['Security+', 'CySA+'] }
        ]
      }
    ]
  },
  {
    id: 'week16',
    title: 'Operations & Incident Response Part 2',
    durationText: 'Week 16 - 2 topics',
    focus: 'Vulnerability management, digital forensics, and data destruction',
    output: 'Ability to perform vulnerability scans, forensic analysis, and proper data sanitization',
    topics: [
      {
        id: 'we16d01',
        title: 'Vulnerability Management',
        description: 'Vulnerability scanning vs penetration testing, CVE/CVSS scoring, and patch management lifecycle.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'How do you prioritize vulnerability remediation beyond just CVSS score?',
        interviewAnswer: 'Beyond CVSS, I consider asset criticality, exploit availability in the wild, environmental exposure like internet-facing versus internal, compensating controls already in place, and EPSS probability scores. An internet-facing web server with CVSS 7.0 and a public exploit should be patched before an internal dev server with CVSS 9.0 and no known exploit. Business context drives prioritization.',
        content: `:::objectives
- Differentiate vulnerability scanning from penetration testing
- Interpret CVE and CVSS scores for prioritization
- Configure and use Nessus and OpenVAS
- Implement a patch management lifecycle
:::

:::info
Vulnerability management is the continuous process of identifying, classifying, remediating, and mitigating security vulnerabilities. It is proactive — finding weaknesses before attackers do.
:::

## Vulnerability Scanning vs Penetration Testing

| Aspect | Vulnerability Scan | Penetration Test |
|---|---|---|
| **Goal** | Identify known vulnerabilities | Exploit vulnerabilities to prove impact |
| **Scope** | Broad (entire network) | Targeted (specific systems) |
| **Depth** | Surface-level | Deep exploitation chain |
| **Frequency** | Regular (weekly/monthly) | Periodic (quarterly/annually) |
| **Automation** | Fully automated | Manual with tool assistance |
| **Result** | List of potential vulnerabilities | Proof of exploitability |
| **Risk** | Low (non-intrusive) | Higher (may cause outages) |

## CVE and CVSS

### CVE (Common Vulnerabilities and Exposures)
- Standardized identifier for each vulnerability
- Format: CVE-YYYY-NNNNN (e.g., CVE-2024-21762)
- Maintained by MITRE Corporation

### CVSS (Common Vulnerability Scoring System)
**Score range:** 0.0 - 10.0

| Score | Severity | Action |
|---|---|---|
| 0.0 | None | No action |
| 0.1 - 3.9 | Low | Address in next maintenance window |
| 4.0 - 6.9 | Medium | Address within 30 days |
| 7.0 - 8.9 | High | Address within 14 days |
| 9.0 - 10.0 | Critical | Address within 72 hours |

### CVSS Vector Components
- **Attack Vector (AV):** Network, Adjacent, Local, Physical
- **Attack Complexity (AC):** Low, High
- **Privileges Required (PR):** None, Low, High
- **User Interaction (UI):** None, Required
- **Scope (S):** Unchanged, Changed
- **Impact (C/I/A):** Confidentiality, Integrity, Availability

## Vulnerability Scanners

### Nessus (Tenable)
- Industry standard commercial scanner
- Agent-based and network-based scanning
- Compliance auditing templates (PCI DSS, HIPAA)
- Plugin-based with 200,000+ plugins

### OpenVAS (Open Source)
- Open-source alternative to Nessus
- Greenbone Community Edition
- Full vulnerability scanning and management
- Regular feed updates

### Scanning Best Practices
- Scan during maintenance windows (avoid production impact)
- Authenticated scans provide deeper visibility
- Scan from multiple vantage points (internal, external, DMZ)
- Document exceptions and false positives
- Track scan coverage (what percentage of assets scanned)

## Patch Management Lifecycle

1. **Inventory:** Maintain asset inventory with software versions
2. **Identify:** Monitor vendor patches and CVE databases
3. **Assess:** Prioritize based on CVSS, asset criticality, exploit availability
4. **Test:** Test patches in staging environment before production
5. **Deploy:** Roll out patches in controlled phases
6. **Verify:** Confirm patches applied successfully
7. **Document:** Track patch status for compliance

:::warning
Patching too fast risks system instability. Patching too slow leaves vulnerabilities open. Balance business needs with security requirements. Emergency patches for actively exploited CVEs within 72 hours.
:::

## Vulnerability Prioritization

**Not all vulnerabilities are equal. Consider:**
1. CVSS base score
2. Asset criticality (crown jewels vs development)
3. Exploitability (is there a public exploit?)
4. Environmental factors (internet-facing vs internal)
5. Compensating controls in place

:::concept
**EPSS (Exploit Prediction Scoring System):** Estimates the probability a vulnerability will be exploited in the wild. Combine with CVSS for better prioritization.
:::`,
        quiz: [
          { question: 'What is the PRIMARY difference between a vulnerability scan and a penetration test?', options: ['Scan is more expensive', 'Scan identifies potential vulnerabilities; pen test exploits them to prove impact', 'Scan requires authorization; pen test does not', 'They are the same thing'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Scans identify vulnerabilities. Penetration tests actively exploit them to demonstrate real-world impact.', certTags: ['Security+'] },
          { question: 'A vulnerability has a CVSS score of 9.1. What severity and remediation timeline is appropriate?', options: ['Low - next maintenance window', 'Medium - 30 days', 'High - 14 days', 'Critical - 72 hours'], correctAnswerIndex: 3, difficulty: 'beginner', explanation: 'CVSS 9.0-10.0 is Critical severity, requiring remediation within 72 hours.', certTags: ['Security+'] },
          { question: 'CVE-2024-21762 is an example of which vulnerability identification system?', options: ['CVSS', 'CVE', 'CWE', 'CAPEC'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'CVE (Common Vulnerabilities and Exposures) provides standardized identifiers for vulnerabilities.', certTags: ['Security+'] },
          { question: 'An authenticated vulnerability scan provides deeper visibility because:', options: ['It uses more plugins', 'It can access system internals with valid credentials', 'It scans faster', 'It requires less network bandwidth'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Authenticated scans log into systems to check installed software, registry settings, and configuration - providing much more accurate results.', certTags: ['Security+'] },
          { question: 'A CVSS Attack Vector of "Network" means:', options: ['The vulnerability only affects network devices', 'The attack can be initiated remotely over the network', 'The vulnerability is in the network protocol', 'The attack requires physical access'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Attack Vector: Network means the vulnerability is exploitable remotely, making it more severe than local/physical vectors.', certTags: ['Security+'] },
          { question: 'Which factor is MOST important when prioritizing patching beyond CVSS score?', options: ['Vendor marketing materials', 'Asset criticality and whether a public exploit exists', 'Number of affected users', 'Software license cost'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'CVSS alone is insufficient. Asset criticality and exploit availability determine real-world risk.', certTags: ['Security+'] },
          { question: 'The patch management lifecycle step of "testing in staging" prevents:', options: ['Vulnerability discovery', 'Production system instability from faulty patches', 'Compliance violations', 'Network outages'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Staging testing catches compatibility issues and prevents patches from breaking production systems.', certTags: ['Security+'] },
          { question: 'EPSS complements CVSS by providing:', options: ['Higher accuracy scores', 'Probability that a vulnerability will be exploited in the wild', 'Compliance requirements', 'Patch availability information'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'EPSS estimates exploitation probability. Combined with CVSS severity, it provides better prioritization than either alone.', certTags: ['Security+', 'CySA+'] },
          { question: 'Why should vulnerability scans be performed from multiple vantage points?', options: ['Faster completion', 'Different network positions reveal different vulnerabilities', 'Reduces false positives', 'Simplifies reporting'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Internal scans find internal vulnerabilities. External scans find internet-facing weaknesses. DMZ scans find perimeter issues. Each reveals different attack surfaces.', certTags: ['Security+'] },
          { question: 'OpenVAS differs from Nessus primarily in:', options: ['Better accuracy', 'Open-source vs commercial licensing', 'Scan speed', 'Number of supported OS'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'OpenVAS is the open-source alternative. Nessus is commercial with additional features and support.', certTags: ['Security+'] },
          { question: 'An internet-facing web server with CVSS 7.0 should be patched before an internal development server with CVSS 9.0 because:', options: ['Higher CVSS always wins', 'Internet-facing exposure increases real-world risk despite lower score', 'Development servers cannot be patched', 'Internal servers are always more secure'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Environmental context matters - internet-facing systems have higher exposure and are more likely to be targeted, even with lower CVSS scores.', certTags: ['Security+'] },
          { question: 'Vulnerability scanning during production hours risks:', options: ['More accurate results', 'System performance degradation or outages', 'Better compliance', 'Faster scan completion'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Aggressive scans can consume resources, cause service degradation, or trigger outages. Scan during maintenance windows.', certTags: ['Security+'] },
          { question: 'A CVSS Score with Privileges Required: None and User Interaction: None indicates:', options: ['Secure configuration', 'Easily exploitable - no authentication or user action needed', 'Requires insider access', 'Low risk vulnerability'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'No privileges required + no user interaction = anyone on the network can exploit without authentication, making it highly dangerous.', certTags: ['Security+'] }
        ]
      },
      {
        id: 'we16d02',
        title: 'Digital Forensics & Data Destruction',
        description: 'Forensic imaging, memory forensics, chain of custody, and proper data sanitization methods.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'What is the order of volatility in digital forensics, and why does it matter for evidence collection?',
        interviewAnswer: 'Order of volatility ranks evidence by how quickly it is lost: CPU registers, routing tables, RAM, temporary files, disk, remote logs, and archival media. It matters because volatile evidence like RAM is lost when power is removed, while disk data persists. Collecting in the wrong order means losing critical forensic evidence like running malware processes, network connections, or encryption keys in memory.',
        content: `:::objectives
- Explain order of volatility and evidence collection procedures
- Perform forensic imaging with dd and write blockers
- Understand Volatility framework for memory forensics
- Apply data sanitization standards (NIST 800-88, DoD 5220.22-M)
:::

:::info
Digital forensics is the recovery and investigation of digital evidence. Proper procedures ensure evidence is admissible in court and investigation is thorough.
:::

## Order of Volatility

| Priority | Data | Collection Method |
|---|---|---|
| 1 | CPU registers, cache | specialized tools (Volatile, Rekall) |
| 2 | Routing tables, ARP cache, process table | Memory dump |
| 3 | Memory (RAM) | dd, WinPMEM, LiME |
| 4 | Temporary file systems | Standard file copy |
| 5 | Disk/SSD data | Forensic imaging (dd, FTK Imager) |
| 6 | Remote logging data | Collect from SIEM/syslog server |
| 7 | Archival media | Access backups |

:::warning
If the system is powered on, collect memory FIRST. Shutting down destroys volatile evidence. If you must shut down, pull the power cord (don't use graceful shutdown — it clears RAM).
:::

## Forensic Imaging

### dd Command (Linux)
\`\`\`bash
# Basic disk image (bit-for-bit copy)
dd if=/dev/sda of=/evidence/disk_image.raw bs=4M

# With progress and error handling
dd if=/dev/sda of=/evidence/disk_image.raw bs=4M status=progress conv=noerror,sync

# Generate hash immediately
sha256sum /dev/sda > /evidence/source_hash.txt
sha256sum /evidence/disk_image.raw > /evidence/image_hash.txt
\`\`\`

### Write Blockers
- **Hardware write blockers:** Physical devices between drive and forensic workstation
- **Software write blockers:** OS-level blocks on write operations
- **Purpose:** Prevent any modification to original evidence during imaging

### Forensic Imaging Tools
- **FTK Imager:** Free, Windows-based, creates E01 (Expert Witness) format
- **Guymager:** Open-source, Linux GUI
- **dd / dc3dd:** Command-line, Linux
- **Arsenal Image Mounter:** Mounts forensic images

### Image Formats
| Format | Description | Compression |
|---|---|---|
| raw/dd | Bit-for-bit copy, no metadata | None |
| E01 (Expert Witness) | Includes metadata, compression, encryption | Yes |
| AFF (Advanced Forensic Format) | Open format, metadata support | Yes |

## Memory Forensics

### Volatility Framework
Industry-standard open-source memory forensics framework.

\`\`\`bash
# Identify the OS profile
volatility -f memory.dump imageinfo

# List processes
volatility -f memory.dump --profile=Win7SP1x64 pslist

# Network connections
volatility -f memory.dump --profile=Win7SP1x64 netscan

# Extract DLLs
volatility -f memory.dump --profile=Win7SP1x64 dlldump

# Hash executables
volatility -f memory.dump --profile=Win7SP1x64 memdump
\`\`\`

### What Memory Forensics Reveals
- Running processes (including malware)
- Network connections (C2 communications)
- Open files and registry keys
- Injected code and DLLs
- Command history
- Encryption keys in memory

## Chain of Custody

### Documentation Requirements
1. **Who** collected the evidence
2. **When** it was collected (date/time, timezone)
3. **Where** it was stored
4. **Who** accessed it and when
5. **Hash values** at each stage (SHA-256)
6. **Integrity verification** at each transfer

### Best Practices
- Two-person integrity (witness during collection)
- Tamper-evident bags/containers
- Unique evidence labels with case numbers
- Detailed evidence log spreadsheet
- Secure storage with restricted access

## Data Sanitization

### NIST SP 800-88 (Current Standard)
| Method | Description | Applicable Media |
|---|---|---|
| **Clear** | Overwrite with patterns | HDD, SSD |
| **Purge** | Physical destruction or cryptographic erase | HDD, SSD, tape |
| **Destroy** | Physical destruction (shredding, degaussing) | All media |

### DoD 5220.22-M (Legacy Standard)
- 3-pass overwrite: Write 0x00, 0xFF, random data
- 7-pass overwrite (Enhanced): Multiple patterns
- **Status:** Superseded by NIST 800-88 but still referenced

### Data Destruction Methods

**Degaussing:**
- Uses strong magnetic field to destroy data on magnetic media
- Effective for HDD and tape
- Does NOT work on SSD (uses flash memory)
- Makes drive unusable

**Cryptographic Erase:**
- Destroys encryption key, making data unrecoverable
- Fast and effective for encrypted drives
- Requires drive to support hardware encryption
- NIST-preferred method for SSD

**Physical Destruction:**
- Shredding (industrial shredders for drives)
- Disintegration (pulverizing into small particles)
- Incineration (burning)
- Melting (for extreme security)

:::concept
**Media-specific methods:**
- **HDD:** Degaussing + physical destruction, or NIST Clear/Purge
- **SSD:** Cryptographic erase preferred; degaussing does NOT work
- **Tape:** Degaussing is effective
- **Optical (CD/DVD):** Physical shredding
:::

:::tip
Always verify data destruction. After sanitization, attempt to read the media to confirm data is unrecoverable. Document the destruction with witnesses and certificates.
:::`,
        quiz: [
          { question: 'When a computer is powered on, which evidence should be collected FIRST?', options: ['Hard drive image', 'Memory (RAM) dump', 'Network logs', 'Printer spool files'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Memory is the most volatile evidence. CPU registers/cache are gone instantly; RAM is lost on power-off.', certTags: ['Security+'] },
          { question: 'What is the PRIMARY purpose of a write blocker in forensic imaging?', options: ['Speed up the imaging process', 'Prevent any modification to original evidence', 'Encrypt the image', 'Compress the data'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Write blockers ensure the original evidence is never modified during the imaging process, maintaining evidentiary integrity.', certTags: ['Security+'] },
          { question: 'The dd command with conv=noerror,sync ensures:', options: ['Faster imaging', 'Errors are skipped and blocks are padded to maintain alignment', 'Data is encrypted', 'Image is compressed'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'noerror skips read errors; sync pads blocks with zeros to maintain image alignment. This handles damaged media gracefully.', certTags: ['Security+'] },
          { question: 'Volatility framework is used for:', options: ['Network forensics', 'Memory forensics analysis', 'Hard drive imaging', 'Malware creation'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Volatility is the industry-standard open-source framework for analyzing memory dumps.', certTags: ['Security+'] },
          { question: 'NIST SP 800-88 replaces which older data sanitization standard?', options: ['ISO 27001', 'DoD 5220.22-M', 'PCI DSS', 'HIPAA'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'NIST 800-88 is the current standard, superseding DoD 5220.22-M which used multi-pass overwriting.', certTags: ['Security+'] },
          { question: 'Why is degaussing ineffective for SSD data destruction?', options: ['SSD uses too much power', 'SSD uses flash memory, not magnetic storage', 'SSD is too small', 'SSD has encryption built-in'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Degaussing uses magnetic fields to destroy data on magnetic media (HDD, tape). SSDs use flash memory chips, which are unaffected by magnetic fields.', certTags: ['Security+'] },
          { question: 'Cryptographic erase works by:', options: ['Overwriting data 7 times', 'Destroying the encryption key, making data unrecoverable', 'Physically shredding the drive', 'Formatting the drive'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'If the drive is encrypted, destroying the encryption key makes all data permanently unrecoverable without physically damaging the media.', certTags: ['Security+'] },
          { question: 'Chain of custody documentation must track:', options: ['Only the collector', 'Who collected, when, where stored, who accessed, and hash values', 'Only hash values', 'Only storage location'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Complete chain of custody documents the entire lifecycle to prove evidence integrity in court.', certTags: ['Security+'] },
          { question: 'A forensic image in E01 format differs from raw/dd format by:', options: ['Being more accurate', 'Supporting metadata, compression, and encryption', 'Being faster to create', 'Working with more operating systems'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'E01 (Expert Witness format) adds metadata, compression, and encryption capabilities beyond raw bit-for-bit copies.', certTags: ['Security+'] },
          { question: 'During memory forensics, finding network connections to known C2 IPs indicates:', options: ['Normal network activity', 'Active malware communication', 'Network misconfiguration', 'Firewall failure'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Memory forensics reveals active connections. C2 (command and control) connections in memory indicate active malware communication.', certTags: ['Security+', 'CySA+'] },
          { question: 'Why should you pull the power cord instead of graceful shutdown for volatile evidence?', options: ['Faster', 'Graceful shutdown clears RAM and runs cleanup scripts', 'Less damage to hardware', 'Required by law'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Graceful shutdown executes scripts that clear RAM, close connections, and clean logs. Pulling power preserves volatile state.', certTags: ['Security+'] },
          { question: 'NIST 800-88 "Purge" level differs from "Clear" by:', options: ['Being faster', 'Using physical destruction or cryptographic erase vs overwrite patterns', 'Applying to more media types', 'Being less thorough'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Clear overwrites with patterns. Purge uses physical destruction or cryptographic erase for stronger sanitization.', certTags: ['Security+'] },
          { question: 'Verifying data destruction by attempting to read the media is important because:', options: ['Satisfies compliance', 'Confirms data is actually unrecoverable, not just "believed to be"', 'Speeds up disposal', 'Reduces liability'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Verification ensures sanitization was successful. Assuming success without verification risks data exposure.', certTags: ['Security+'] },
          { question: 'When collecting memory from a Linux system, the LiME kernel module is used because:', options: ['It is faster than dd', 'It captures memory from live systems without writing to disk (stealthy)', 'It compresses automatically', 'It is built into the kernel'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'LiME (Loadable Kernel Module) captures memory from running Linux systems without writing artifacts to the local disk, preserving evidence integrity.', certTags: ['Security+'] }
        ]
      }
    ]
  },
  {
    id: 'week17',
    title: 'Governance, Risk & Compliance Part 1',
    durationText: 'Week 17 - 2 topics',
    focus: 'Risk management frameworks and NIST standards',
    output: 'Ability to perform risk assessments, apply NIST frameworks, and classify security controls',
    topics: [
      {
        id: 'we17d01',
        title: 'Risk Management Frameworks',
        description: 'Risk identification, assessment, response strategies, quantitative vs qualitative analysis, and risk register creation.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'How do you calculate ALE and use it to justify a security investment to management?',
        interviewAnswer: 'ALE equals SLE times ARO. For a $2M asset with 30% exposure factor and 0.5 annual occurrence rate, SLE is $600,000 and ALE is $300,000. If a $150,000 control reduces ALE by 60%, the net savings is $30,000 annually, making it cost-effective. Presenting risk in dollar terms helps management make informed decisions about security investments versus accepting residual risk.',
        content: `:::objectives
- Execute risk identification, assessment, response, and monitoring
- Compare quantitative vs qualitative risk analysis
- Calculate ALE, SLE, and ARO for risk quantification
- Create and maintain a risk register
:::

:::info
Risk management is the process of identifying, analyzing, and responding to risks. It enables informed decision-making about security investments.
:::

## Risk Management Process

1. **Identify** — What are the risks?
2. **Assess** — How likely and impactful are they?
3. **Respond** — What will we do about them?
4. **Monitor** — Are controls working? Have risks changed?

## Risk Identification

### Sources of Risk
- **Threats:** External attacks, insider threats, natural disasters
- **Vulnerabilities:** Software bugs, misconfigurations, weak passwords
- **Impacts:** Financial loss, reputational damage, legal liability
- **Assets:** Data, systems, people, reputation

### Risk Assessment Methods
- **Asset-based:** Identify assets, then threats to each
- **Threat-based:** Identify threats, then vulnerable assets
- **Attack tree analysis:** Model attack scenarios
- **Vulnerability scanning:** Technical identification

## Quantitative vs Qualitative Analysis

| Aspect | Quantitative | Qualitative |
|---|---|---|
| **Output** | Numbers, dollar values | Ratings (high/medium/low) |
| **Precision** | More precise | Subjective |
| **Speed** | Slower (requires data) | Faster |
| **Use case** | Financial decisions, insurance | General prioritization |
| **Methods** | ALE, SLE, ARO | Risk matrix, brainstorming |

### Quantitative Risk Calculations

**SLE (Single Loss Expectancy):** Expected loss from a single incident
\`\`\`
SLE = Asset Value × Exposure Factor (EF)
\`\`\`

**ARO (Annualized Rate of Occurrence):** How often the incident occurs per year
\`\`\`
Example: Once every 4 years = ARO of 0.25
\`\`\`

**ALE (Annualized Loss Expectancy):** Expected annual loss
\`\`\`
ALE = SLE × ARO
\`\`\`

### Example Calculation
\`\`\`
Asset: Customer database
Asset Value: $5,000,000
Exposure Factor: 40% (40% of data compromised in breach)
SLE = $5,000,000 × 0.40 = $2,000,000
ARO = 0.25 (once every 4 years)
ALE = $2,000,000 × 0.25 = $500,000 per year

If a $200,000 security control reduces ALE by 60%, it is cost-effective.
\`\`\`

## Risk Response Strategies

| Strategy | Description | Example |
|---|---|---|
| **Mitigate** | Reduce likelihood or impact | Implement MFA to reduce breach risk |
| **Transfer** | Shift risk to another party | Cyber insurance, cloud hosting |
| **Avoid** | Eliminate the risk activity | Don't collect sensitive data |
| **Accept** | Acknowledge and monitor | Low-impact risk within tolerance |

### Risk Response Decision Matrix
- **High likelihood + High impact:** Mitigate immediately
- **High likelihood + Low impact:** Mitigate cost-effectively
- **Low likelihood + High impact:** Transfer (insurance) or mitigate
- **Low likelihood + Low impact:** Accept and monitor

## Risk Register

### Essential Fields
1. Risk ID (unique identifier)
2. Description (what is the risk?)
3. Category (operational, financial, compliance, strategic)
4. Asset affected
5. Threat source
6. Vulnerability
7. Likelihood (1-5 or %)
8. Impact (1-5 or $)
9. Risk score (likelihood × impact)
10. Response strategy (mitigate/transfer/accept/avoid)
11. Control owner
12. Status (open, in progress, closed)
13. Review date

:::warning
Risk assessment is not a one-time event. Risks change as the environment, threats, and business objectives evolve. Review and update regularly (at least quarterly).
:::

## Risk Monitoring
- Track key risk indicators (KRIs)
- Review control effectiveness
- Update risk scores as conditions change
- Report to management regularly
- Audit compliance with risk treatment plans

:::tip
The goal of risk management is not to eliminate all risk - it's to make informed decisions about which risks to accept, which to mitigate, and how much to invest in security.
:::`,
        quiz: [
          { question: 'What is the formula for Annualized Loss Expectancy (ALE)?', options: ['SLE + ARO', 'SLE × ARO', 'Asset Value × EF', 'ALE ÷ SLE'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'ALE = SLE (Single Loss Expectancy) × ARO (Annualized Rate of Occurrence).', certTags: ['Security+'] },
          { question: 'A server costs $100,000 and a fire would destroy 60% of its value. What is the SLE?', options: ['$100,000', '$60,000', '$166,667', '$40,000'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'SLE = Asset Value × Exposure Factor = $100,000 × 0.60 = $60,000.', certTags: ['Security+'] },
          { question: 'Qualitative risk analysis differs from quantitative by:', options: ['Being more accurate', 'Using subjective ratings (high/medium/low) instead of dollar values', 'Being slower', 'Requiring more data'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Qualitative uses subjective ratings. Quantitative uses numerical values and dollar amounts.', certTags: ['Security+'] },
          { question: 'Transferring risk means:', options: ['Ignoring the risk', 'Shifting risk to another party (insurance, cloud provider)', 'Eliminating the risk activity', 'Reducing the risk impact'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Risk transfer shifts financial burden to another party - common examples are cyber insurance and outsourcing to cloud providers.', certTags: ['Security+'] },
          { question: 'A risk has likelihood of 0.4 and impact of $500,000. What is the risk score?', options: ['$200,000', '$500,000', '$125,000', '$2,000,000'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Risk Score = Likelihood × Impact = 0.4 × $500,000 = $200,000.', certTags: ['Security+'] },
          { question: 'A vulnerability exists but exploitation would only affect a development server with no sensitive data. Which response strategy is MOST appropriate?', options: ['Mitigate immediately', 'Transfer via insurance', 'Accept and monitor', 'Avoid by decommissioning'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'Low-impact risk on non-critical assets is typically accepted and monitored rather than investing in expensive controls.', certTags: ['Security+'] },
          { question: 'Which risk register field tracks who is responsible for implementing controls?', options: ['Risk ID', 'Control owner', 'Status', 'Category'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'The control owner field identifies who is accountable for implementing and maintaining risk treatment measures.', certTags: ['Security+'] },
          { question: 'If a $150,000 firewall reduces ALE from $500,000 to $200,000, is it cost-effective?', options: ['No - it costs more than the ALE', 'Yes - net savings of $150,000 annually', 'Cannot determine without more data', 'No - it should cost less than ALE'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Net benefit = ALE reduction ($300,000) minus control cost ($150,000) = $150,000 annual savings.', certTags: ['Security+'] },
          { question: 'Risk identification should consider which four elements?', options: ['Threats, vulnerabilities, assets, and impacts', 'Firewalls, IDS, antivirus, and encryption', 'Managers, employees, vendors, and customers', 'Hardware, software, data, and networks'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Risk identification considers threats (what could happen), vulnerabilities (weaknesses), assets (what we protect), and impacts (consequences).', certTags: ['Security+'] },
          { question: 'An ARO of 2.0 means:', options: ['The event occurs twice per year', 'The event occurs once every two years', 'The event will never occur', 'The event occurs 200% of the time'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'ARO = Annualized Rate of Occurrence. ARO of 2.0 means the event is expected to occur twice per year.', certTags: ['Security+'] },
          { question: 'The PRIMARY limitation of quantitative risk analysis is:', options: ['It is too subjective', 'Requires accurate historical data that may not be available', 'It is too fast', 'It does not consider assets'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Quantitative analysis requires accurate data on asset values, exposure factors, and historical occurrence rates - data that is often unavailable or estimated.', certTags: ['Security+'] },
          { question: 'Risk monitoring should be continuous because:', options: ['It is required by law', 'Risks change as environment, threats, and business evolve', 'It is easy to implement', 'It eliminates all risks'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'New vulnerabilities, changing threats, and evolving business objectives mean yesterday\'s risk assessment may not reflect today\'s reality.', certTags: ['Security+'] },
          { question: 'Risk avoidance differs from risk mitigation by:', options: ['Being more expensive', 'Eliminating the risk activity entirely vs reducing likelihood/impact', 'Being easier to implement', 'Only addressing high risks'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Avoidance eliminates the risk by not performing the risky activity. Mitigation implements controls to reduce the risk while still performing the activity.', certTags: ['Security+'] },
          { question: 'An asset valued at $1M has an exposure factor of 25% and occurs every 5 years. What is the ALE?', options: ['$250,000', '$50,000', '$125,000', '$20,000'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'SLE = $1M × 0.25 = $250,000. ARO = 1/5 = 0.2. ALE = $250,000 × 0.2 = $50,000.', certTags: ['Security+'] }
        ]
      },
      {
        id: 'we17d02',
        title: 'NIST Frameworks',
        description: 'NIST RMF (SP 800-37), NIST CSF, NIST SP 800-53 controls, and security control categories.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'Explain the difference between NIST CSF and NIST SP 800-53, and how they work together.',
        interviewAnswer: 'NIST CSF is a strategic framework defining what to do through five functions: Identify, Protect, Detect, Respond, and Recover. SP 800-53 is a detailed catalog of how to do it with specific security controls across 20 families. CSF provides the high-level structure for risk management, while SP 800-53 maps specific controls to each CSF category for implementation guidance.',
        content: `:::objectives
- Execute the 7 steps of the NIST Risk Management Framework
- Apply NIST Cybersecurity Framework (CSF) functions
- Understand NIST SP 800-53 control families
- Classify controls as technical, managerial, operational, or physical
:::

:::info
NIST provides the most widely adopted frameworks for managing cybersecurity risk in the United States and globally. Understanding these frameworks is essential for compliance and effective security programs.
:::

## NIST Risk Management Framework (RMF) — SP 800-37

### 7 Steps

1. **Categorize** — Classify system based on impact (Low, Moderate, High)
2. **Select** — Choose appropriate security controls from SP 800-53
3. **Implement** — Deploy selected controls
4. **Assess** — Evaluate control effectiveness
5. **Authorize** — ATO (Authority to Operate) decision
6. **Monitor** — Continuous monitoring of controls
7. **Prepare** — Organizational preparation (new in Rev 2)

:::concept
**RMF creates a continuous cycle:** Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor → (back to Prepare)
:::

## NIST Cybersecurity Framework (CSF) — 5 Functions

### 1. IDENTIFY (ID)
Understand organizational context, assets, and risks.
- Asset Management (ID.AM)
- Business Environment (ID.BE)
- Governance (ID.GV)
- Risk Assessment (ID.RA)
- Supply Chain Risk Management (ID.SC)

### 2. PROTECT (PR)
Implement safeguards to ensure delivery of critical services.
- Identity Management and Access Control (PR.AC)
- Awareness and Training (PR.AT)
- Data Security (PR.DS)
- Information Protection Processes (PR.IP)
- Maintenance (PR.MA)
- Protective Technology (PR.PT)

### 3. DETECT (DE)
Implement activities to identify cybersecurity events.
- Anomalies and Events (DE.AE)
- Security Continuous Monitoring (DE.CM)
- Detection Processes (DE.DP)

### 4. RESPOND (RS)
Take action regarding detected events.
- Response Planning (RS.RP)
- Communications (RS.CO)
- Analysis (RS.AN)
- Mitigation (RS.MI)
- Improvements (RS.IM)

### 5. RECOVER (RC)
Restore capabilities and services.
- Recovery Planning (RC.RP)
- Improvements (RC.IM)
- Communications (RC.CO)

### CSF Tiers (Maturity)
- **Tier 1:** Partial (ad hoc, reactive)
- **Tier 2:** Risk Informed (aware but not org-wide)
- **Tier 3:** Repeatable (formal policies, regularly updated)
- **Tier 4:** Adaptive (continuous improvement, threat-informed)

## NIST SP 800-53 Security Controls

### Control Families (20 families)

| ID | Family | Examples |
|---|---|---|
| AC | Access Control | Least privilege, remote access |
| AT | Awareness and Training | Security training, phishing awareness |
| AU | Audit and Accountability | Audit logs, log retention |
| CA | Assessment, Authorization | Security assessments, POA&M |
| CM | Configuration Management | Baseline configs, change control |
| CP | Contingency Planning | DR plans, backup testing |
| IA | Identification and Authentication | MFA, password policies |
| IR | Incident Response | IR plans, reporting |
| MA | Maintenance | Remote maintenance, tools |
| MP | Media Protection | Sanitization, labeling |
| PE | Physical Protection | Facility access, monitoring |
| PL | Planning | System security plan |
| PM | Program Management | Risk strategy, leadership |
| PS | Personnel Security | Background checks, termination |
| PT | PII Processing | Privacy controls |
| RA | Risk Assessment | Vulnerability scanning, risk analysis |
| SA | System and Services Acquisition | SDLC, acquisition controls |
| SC | System and Communications | Encryption, network protection |
| SI | System and Information Integrity | Flaw remediation, input validation |
| SR | Supply Chain Risk Management | Supply chain controls |

### Control Categories

| Category | Description | Examples |
|---|---|---|
| **Technical** | Technology-implemented controls | Firewalls, encryption, MFA |
| **Managerial** | Administrative/policy controls | Risk assessments, policies |
| **Operational** | Process/procedure controls | Incident response, training |
| **Physical** | Tangible/environmental controls | Locks, guards, HVAC |

### Control Types (Effectiveness)

| Type | Purpose | Examples |
|---|---|---|
| **Preventive** | Stop incidents before they occur | Firewalls, MFA, encryption |
| **Detective** | Identify incidents during/after | IDS, log monitoring, audits |
| **Corrective** | Fix issues after detection | Antivirus, patching, backups |
| **Deterrent** | Discourage potential attackers | Warning signs, security cameras |
| **Compensating** | Alternative for controls that cannot be implemented | Manual procedures when automation unavailable |

:::warning
Controls are not mutually exclusive. A single control can be technical + preventive + detective. Select controls based on risk assessment, not checklist compliance.
:::

:::tip
**Quick mapping:**
- **CSF** = What to do (strategic framework)
- **SP 800-53** = How to do it (detailed controls)
- **RMF** = Process for implementing and maintaining controls
:::`,
        quiz: [
          { question: 'What is the FIRST step in the NIST RMF?', options: ['Select controls', 'Categorize the system', 'Implement controls', 'Assess controls'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Categorization is first - you must understand the system\'s impact level before selecting controls.', certTags: ['Security+'] },
          { question: 'Which NIST CSF function focuses on implementing safeguards?', options: ['Identify', 'Protect', 'Detect', 'Respond'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Protect implements safeguards to ensure delivery of critical services.', certTags: ['Security+'] },
          { question: 'NIST SP 800-53 AC family covers:', options: ['Audit logs', 'Access Control', 'Incident Response', 'Configuration management'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'AC = Access Control family. AU = Audit, IR = Incident Response, CM = Configuration Management.', certTags: ['Security+'] },
          { question: 'A firewall is an example of which control category?', options: ['Managerial', 'Operational', 'Technical', 'Physical'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'Firewalls are technology-implemented controls - technical category.', certTags: ['Security+'] },
          { question: 'NIST CSF Tier 4 (Adaptive) represents:', options: ['No security program', 'Formal policies but not updated', 'Continuous improvement with threat-informed defense', 'Aware but ad hoc'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'Tier 4 Adaptive is the highest maturity - continuous improvement based on threat intelligence and lessons learned.', certTags: ['Security+'] },
          { question: 'An IDS (Intrusion Detection System) is an example of which control type?', options: ['Preventive', 'Detective', 'Corrective', 'Deterrent'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'IDS detects (identifies) incidents but does not prevent them - detective control.', certTags: ['Security+'] },
          { question: 'The RMF step "Authorize" results in:', options: ['Control selection', 'Authority to Operate (ATO) decision', 'Vulnerability scan', 'Policy creation'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Authorization is the formal decision to operate the system based on residual risk acceptance.', certTags: ['Security+'] },
          { question: 'Security awareness training is classified as which control category?', options: ['Technical', 'Managerial', 'Operational', 'Physical'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'Training is a process/procedure control - operational category. It involves human processes, not technology.', certTags: ['Security+'] },
          { question: 'Backup and recovery procedures are primarily classified as which control type?', options: ['Preventive', 'Detective', 'Corrective', 'Deterrent'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'Backups correct (remediate) data loss after an incident - corrective control.', certTags: ['Security+'] },
          { question: 'Which NIST CSF function includes risk assessment activities?', options: ['Protect', 'Identify', 'Detect', 'Recover'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Risk Assessment is part of the Identify function (ID.RA).', certTags: ['Security+'] },
          { question: 'Physical security guards are an example of which control category and type?', options: ['Technical - Preventive', 'Physical - Detective', 'Physical - Deterrent', 'Operational - Corrective'], correctAnswerIndex: 2, difficulty: 'advanced', explanation: 'Guards are physical controls (tangible) and deterrent controls (discourage unauthorized access).', certTags: ['Security+'] },
          { question: 'A compensating control is used when:', options: ['Primary control fails', 'The primary control cannot be implemented and an alternative is needed', 'Risk increases', 'Budget is reduced'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Compensating controls provide equivalent protection when the primary control cannot be implemented (e.g., manual procedure when automation unavailable).', certTags: ['Security+'] },
          { question: 'NIST CSF is described as a:', options: ['Mandatory regulation', 'Voluntary framework of standards, guidelines, and best practices', 'Certification program', 'Compliance checklist'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'CSF is voluntary - widely adopted but not mandatory. Organizations choose to implement it for risk management.', certTags: ['Security+'] },
          { question: 'Which SP 800-53 control family addresses supply chain risks?', options: ['SA', 'SC', 'SR', 'RA'], correctAnswerIndex: 2, difficulty: 'advanced', explanation: 'SR = Supply Chain Risk Management family. SA = System/Services Acquisition, SC = System/Communications, RA = Risk Assessment.', certTags: ['Security+'] }
        ]
      }
    ]
  },
  {
    id: 'week18',
    title: 'Governance, Risk & Compliance Part 2',
    durationText: 'Week 18 - 2 topics',
    focus: 'GDPR overview and NDPR deep dive for data protection compliance',
    output: 'Ability to explain GDPR/NDPR requirements and implement data protection controls',
    topics: [
      {
        id: 'we18d01',
        title: 'GDPR Overview',
        description: 'General Data Protection Regulation fundamentals including data processing principles, data subject rights, and breach notification.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'What are the seven GDPR data processing principles, and how do they affect application design?',
        interviewAnswer: 'The principles are lawfulness, purpose limitation, data minimization, accuracy, storage limitation, integrity and confidentiality, and accountability. They affect design by requiring privacy by design, collecting only necessary data, implementing retention policies, providing data subject access mechanisms, and maintaining audit trails. Applications must support data portability, erasure requests, and consent management from the ground up.',
        content: `:::objectives
- Explain GDPR data processing principles
- Identify lawful bases for processing personal data
- Describe data subject rights and how organizations must comply
- Understand breach notification requirements and penalties
:::

:::info
GDPR (General Data Protection Regulation) is the EU's comprehensive data protection law, effective since May 25, 2018. It applies to ANY organization processing personal data of EU residents, regardless of where the organization is located.
:::

## GDPR Scope
**Applies to:**
- Organizations in the EU processing personal data
- Organizations outside the EU offering goods/services to EU residents
- Organizations outside the EU monitoring behavior of EU residents

**Personal data:** Any information relating to an identified or identifiable natural person (name, email, IP address, location data, biometric data)

## 7 Data Processing Principles

| Principle | Description |
|---|---|
| **Lawfulness, Fairness, Transparency** | Process data legally, fairly, and transparently |
| **Purpose Limitation** | Collect for specified, explicit, legitimate purposes |
| **Data Minimization** | Only collect data that is necessary |
| **Accuracy** | Keep data accurate and up to date |
| **Storage Limitation** | Keep data only as long as necessary |
| **Integrity & Confidentiality** | Process securely with appropriate measures |
| **Accountability** | Demonstrate compliance with all principles |

## Lawful Bases for Processing

1. **Consent:** Data subject has given clear, affirmative consent
2. **Contract:** Processing necessary for contract performance
3. **Legal obligation:** Required by law (tax records, employment law)
4. **Vital interests:** Protecting someone's life
5. **Public interest:** Performing a task in the public interest
6. **Legitimate interests:** Organization's legitimate interests (balanced against data subject rights)

:::warning
Consent must be freely given, specific, informed, and unambiguous. Pre-ticked boxes and bundled consent are NOT valid under GDPR.
:::

## Data Subject Rights

| Right | Description | Timeline |
|---|---|---|
| **Access** | Request copy of personal data held | 1 month |
| **Rectification** | Correct inaccurate data | 1 month |
| **Erasure ("Right to be forgotten")** | Delete personal data | 1 month |
| **Restrict processing** | Limit how data is used | 1 month |
| **Data portability** | Receive data in structured format | 1 month |
| **Object** | Object to processing (including profiling) | 1 month |
| **Automated decisions** | Right not to be subject to solely automated decisions | 1 month |

## Data Protection Officer (DPO)
**Required when:**
- Public authority/organization
- Large-scale systematic monitoring
- Large-scale processing of special categories

**DPO responsibilities:**
- Inform and advise on GDPR obligations
- Monitor compliance
- Act as contact point for data subjects and supervisory authorities

## Breach Notification

### 72-Hour Rule
- **To supervisory authority:** Within 72 hours of becoming aware
- **To data subjects:** Without undue delay if high risk to rights and freedoms
- **Documentation:** All breaches must be documented (even if not reported)

### Notification Content
- Nature of breach (categories, approximate numbers)
- DPO contact details
- Likely consequences
- Measures taken or proposed to address

## Penalties

| Tier | Maximum Fine | Violations |
|---|---|---|
| **Lower** | €10 million or 2% annual global turnover | Record-keeping, DPO, security measures |
| **Upper** | €20 million or 4% annual global turnover | Processing principles, lawful basis, data subject rights |

:::concept
**Extraterritorial reach:** GDPR applies to ANY organization worldwide that processes EU resident data. A US company selling to EU customers must comply. Non-EU organizations must appoint an EU representative.
:::

:::tip
GDPR compliance is not just about avoiding fines — it builds customer trust, improves data quality, and creates competitive advantage through responsible data handling.
:::`,
        quiz: [
          { question: 'GDPR applies to organizations:', options: ['Only located in the EU', 'Only EU government agencies', 'Anywhere in the world that processes EU resident personal data', 'Only organizations with more than 250 employees'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'GDPR has extraterritorial reach - it applies to any organization processing personal data of EU residents.', certTags: ['Security+'] },
          { question: 'Which GDPR principle requires organizations to collect only necessary data?', options: ['Purpose Limitation', 'Data Minimization', 'Storage Limitation', 'Accuracy'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Data Minimization requires collecting only data that is necessary for the specified purpose.', certTags: ['Security+'] },
          { question: 'Organizations must notify supervisory authorities of a data breach within:', options: ['24 hours', '48 hours', '72 hours', '1 week'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'GDPR requires notification to supervisory authorities within 72 hours of becoming aware of a breach.', certTags: ['Security+'] },
          { question: 'The maximum fine for serious GDPR violations is:', options: ['€1 million', '€10 million or 2% turnover', '€20 million or 4% turnover', '€50 million or 10% turnover'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'Upper tier fines for serious violations: €20 million or 4% of annual global turnover, whichever is higher.', certTags: ['Security+'] },
          { question: 'Consent under GDPR must be:', options: ['Implied from user actions', 'Freely given, specific, informed, and unambiguous', 'Obtained once for all purposes', 'Given in writing only'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'GDPR consent must be freely given, specific, informed, and unambiguous. Pre-ticked boxes are invalid.', certTags: ['Security+'] },
          { question: 'The "Right to be forgotten" allows data subjects to:', options: ['View their data only', 'Request deletion of personal data', 'Transfer data to competitors', 'Change their name in records'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'The right to erasure allows data subjects to request deletion of their personal data under certain conditions.', certTags: ['Security+'] },
          { question: 'A DPO (Data Protection Officer) is required when:', options: ['Any organization processes personal data', 'Public authorities or large-scale systematic monitoring/processing', 'Organization has more than 50 employees', 'Organization processes financial data'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'DPO is required for public authorities, large-scale systematic monitoring, or large-scale processing of special categories.', certTags: ['Security+'] },
          { question: 'Which lawful basis for processing allows using data for tax record keeping?', options: ['Consent', 'Contract', 'Legal obligation', 'Legitimate interests'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'Legal obligation - processing is required by law (tax regulations, employment law).', certTags: ['Security+'] },
          { question: 'A data subject requests access to their data. The organization has how long to respond?', options: ['7 days', '1 month', '3 months', '6 months'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'GDPR provides 1 month to respond to data subject requests (extendable by 2 months for complex requests).', certTags: ['Security+'] },
          { question: 'Data portability allows data subjects to:', options: ['Only view their data', 'Receive their data in a structured, machine-readable format', 'Delete data from all systems', 'Prevent all processing'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Data portability allows receiving personal data in structured, commonly used, machine-readable format for transfer.', certTags: ['Security+'] },
          { question: 'GDPR storage limitation principle requires:', options: ['Keeping data forever for safety', 'Keeping data only as long as necessary for the specified purpose', 'Storing data in the EU only', 'Using encryption for all storage'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Storage Limitation means data should not be kept longer than necessary for the purpose it was collected.', certTags: ['Security+'] },
          { question: 'If a breach affects EU residents but the organization is in the US, which authority should be notified?', options: ['US Federal Trade Commission only', 'The EU supervisory authority in the affected member state', 'Both US and EU authorities', 'No notification required'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'GDPR requires notification to the relevant EU supervisory authority (DPA) regardless of where the organization is located.', certTags: ['Security+'] },
          { question: 'Processing personal data based on "legitimate interests" requires:', options: ['No conditions', 'A balancing test weighing organization\'s interests against data subject rights', 'Explicit consent first', 'Only applies to financial data'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Legitimate interests requires a documented balancing test showing the organization\'s interests don\'t override data subject rights.', certTags: ['Security+'] },
          { question: 'GDPR accountability principle means:', options: ['Data processors are always liable', 'Organizations must be able to DEMONSTRATE compliance, not just be compliant', 'Only EU organizations must comply', 'Accounting departments handle GDPR'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Accountability requires documenting and demonstrating compliance - having policies, records, and evidence of compliance measures.', certTags: ['Security+'] },
          { question: 'A bundle consent where accepting terms automatically consents to marketing violates GDPR because:', options: ['Marketing is always illegal', 'Consent must be freely given and not bundled with other terms', 'Terms cannot include marketing', 'Only email marketing requires consent'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'GDPR requires consent to be freely given. Bundling consent with terms of service is not freely given - consent must be a separate, affirmative action.', certTags: ['Security+'] }
        ]
      },
      {
        id: 'we18d02',
        title: 'NDPR Deep Dive',
        description: 'Nigeria Data Protection Regulation requirements, NDPC oversight, data subject rights, and comparison with GDPR.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'How does Nigeria NDPR compare to GDPR, and what must a company operating in both regions consider?',
        interviewAnswer: 'NDPR was modeled after GDPR but has key differences: DPO is required for all controllers, registration with NDPC is mandatory, and fines are capped at 2% of annual gross revenue. Companies operating in both regions should comply with the higher standard, typically GDPR, and document compliance for both frameworks. Breach notification is 72 hours under both, but separate notifications may be required to NDPC and EU DPAs.',
        content: `:::objectives
- Explain NDPR scope and requirements for data controllers/processors
- Identify data subject rights under NDPR
- Describe NDPC role and enforcement mechanisms
- Compare NDPR with GDPR requirements
:::

:::info
The Nigeria Data Protection Regulation (NDPR) is Nigeria's comprehensive data protection law, issued by the National Information Technology Development Agency (NITDA) in 2019. The Nigeria Data Protection Commission (NDPC) now provides oversight.
:::

## NDPR Scope

### Applicability
- All entities processing personal data of Nigerian citizens/residents
- Organizations established in Nigeria
- Organizations processing data of individuals in Nigeria
- Applies regardless of where processing occurs

### Personal Data Definition
Any information relating to an identified or identifiable natural person, including:
- Name, address, email, phone number
- Identification numbers (NIN, BVN, passport)
- Location data, online identifiers
- Factors specific to physical, physiological, genetic, mental, economic, cultural identity

## NDPR Requirements

### For Data Controllers
1. **Registration with NDPC:** Mandatory for all data controllers
2. **Data Protection Officer (DPO):** Appoint a qualified DPO
3. **Privacy Policy:** Clear, accessible privacy notices
4. **Lawful Processing:** Establish lawful basis for processing
5. **Data Protection Impact Assessment (DPIA):** For high-risk processing
6. **Breach Notification:** Notify NDPC within 72 hours
7. **Record of Processing:** Maintain documentation of processing activities

### For Data Processors
1. Process only on documented instructions from controller
2. Ensure confidentiality of processing
3. Implement appropriate security measures
4. Assist controller in fulfilling data subject rights
5. Delete or return data after service completion

## Data Subject Rights Under NDPR

| Right | Description | Timeline |
|---|---|---|
| **Right to be informed** | Know how data is collected and processed | At collection |
| **Right of access** | Obtain confirmation and copy of data | Within reasonable time |
| **Right to rectification** | Correct inaccurate data | Within reasonable time |
| **Right to erasure** | Delete personal data | Within reasonable time |
| **Right to restrict processing** | Limit how data is used | Within reasonable time |
| **Right to data portability** | Receive data in structured format | Within reasonable time |
| **Right to object** | Object to processing | Within reasonable time |
| **Right not to be subject to automated decisions** | Avoid solely automated decisions with legal effects | N/A |

## Nigeria Data Protection Commission (NDPC)

### Role
- Regulate data protection in Nigeria
- Enforce NDPR compliance
- Issue guidance and codes of practice
- Handle complaints from data subjects
- Conduct investigations and audits

### Enforcement Powers
- Issue compliance orders
- Impose administrative fines
- Order data processing to stop
- Refer matters for prosecution

### Fines Under NDPR
- Organizations: Up to 2% of annual gross revenue
- Individuals: Up to ₦10 million
- Criminal penalties for willful violations

## Cross-Border Data Transfer

### Requirements
1. Adequate level of protection in recipient country
2. Appropriate safeguards (SCCs, BCRs)
3. Data subject consent
4. Contractual necessity
5. Legal requirements

### Transfer Mechanisms
- **Adequacy decisions:** NDPC determines country has adequate protection
- **Standard Contractual Clauses (SCCs):** Approved contract terms
- **Binding Corporate Rules (BCRs):** For intra-group transfers
- **Explicit consent:** Data subject consents to transfer

:::warning
Cross-border transfers require documented safeguards. Transfers to countries without adequate protection require additional mechanisms like SCCs or BCRs.
:::

## NDPR vs GDPR Comparison

| Aspect | NDPR | GDPR |
|---|---|---|
| **Enforcement body** | NDPC (formerly NITDA) | National DPAs |
| **DPO requirement** | Required for all controllers | Required in specific cases |
| **Registration** | Mandatory with NDPC | Not mandatory (but DPA notification) |
| **Breach notification** | 72 hours to NDPC | 72 hours to DPA + subjects if high risk |
| **Fines** | 2% revenue / ₦10M | 4% revenue / €20M |
| **Consent age** | 13+ (parental for under 13) | 16+ (varies by member state 13-16) |
| **Scope** | Nigeria-based processing of Nigerian data | EU-based processing of EU resident data |
| **Extraterritorial** | Yes (Nigerian data anywhere) | Yes (EU data anywhere) |

:::concept
**Key similarities:** Both require lawful basis, data subject rights, breach notification, DPO appointment, and cross-border transfer safeguards. NDPR was modeled after GDPR but with Nigeria-specific adaptations.
:::

:::tip
Organizations operating in both EU and Nigeria can harmonize compliance by meeting the higher standard (GDPR) and documenting compliance for both frameworks.
:::`,
        quiz: [
          { question: 'The NDPR applies to organizations:', options: ['Only located in Nigeria', 'Only Nigerian government agencies', 'Any entity processing personal data of Nigerian citizens/residents', 'Only organizations with 100+ employees'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'NDPR applies to any entity processing personal data of Nigerian citizens or residents, regardless of location.', certTags: ['Security+'] },
          { question: 'NDPR breach notification requires reporting to NDPC within:', options: ['24 hours', '48 hours', '72 hours', '1 week'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'NDPR follows the same 72-hour breach notification timeline as GDPR.', certTags: ['Security+'] },
          { question: 'Under NDPR, a DPO is:', options: ['Only required for large organizations', 'Required for all data controllers', 'Optional for all organizations', 'Only required for government'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'NDPR requires all data controllers to appoint a qualified Data Protection Officer.', certTags: ['Security+'] },
          { question: 'Maximum fine under NDPR for organizations is:', options: ['₦1 million', '2% of annual gross revenue', '4% of annual revenue', '€20 million'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'NDPR fines: up to 2% of annual gross revenue or ₦10 million for individuals.', certTags: ['Security+'] },
          { question: 'Cross-border data transfer from Nigeria to a country without adequate protection requires:', options: ['No safeguards needed', 'Appropriate safeguards like SCCs or BCRs', 'Only data subject consent', 'NDPC approval for each transfer'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Transfers to countries without adequate protection require additional mechanisms like SCCs, BCRs, or explicit consent.', certTags: ['Security+'] },
          { question: 'NDPR data subject rights include all EXCEPT:', options: ['Right to access', 'Right to erasure', 'Right to unlimited data retention', 'Right to data portability'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'There is no right to unlimited retention. In fact, storage limitation principle requires data to be kept only as long as necessary.', certTags: ['Security+'] },
          { question: 'NDPR was modeled primarily after which international framework?', options: ['CCPA (California)', 'GDPR (European Union)', 'HIPAA (US Healthcare)', 'PIPEDA (Canada)'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'NDPR was modeled after GDPR but adapted for Nigerian context with specific requirements like mandatory DPO for all controllers.', certTags: ['Security+'] },
          { question: 'A Data Protection Impact Assessment (DPIA) is required under NDPR for:', options: ['All data processing', 'High-risk processing activities', 'Only financial data processing', 'Only government processing'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'DPIA is required for processing that is likely to result in high risk to the rights and freedoms of data subjects.', certTags: ['Security+'] },
          { question: 'Under NDPR, parental consent is required for children under:', options: ['16', '13', '18', '21'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'NDPR sets the age of digital consent at 13. Parental consent is required for processing data of children under 13.', certTags: ['Security+'] },
          { question: 'The NDPC (Nigeria Data Protection Commission) replaced which agency in oversight responsibility?', options: ['CBN', 'NITDA', 'EFCC', 'NCC'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'The NDPC now provides oversight for data protection in Nigeria, taking over from NITDA which originally issued the NDPR.', certTags: ['Security+'] },
          { question: 'GDPR applies extraterritorially based on:', options: ['Organization location only', 'Processing data of EU residents regardless of organization location', 'Having servers in the EU', 'EU citizenship of employees'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'GDPR applies to any organization worldwide that processes personal data of EU residents, regardless of where the organization is based.', certTags: ['Security+'] },
          { question: 'GDPR\'s right to data portability allows receiving data in:', options: ['PDF format only', 'Structured, commonly used, machine-readable format', 'Any format the organization chooses', 'Handwritten form'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Data portability requires providing data in a structured, commonly used, machine-readable format (e.g., CSV, JSON) for transfer.', certTags: ['Security+'] },
          { question: 'A Nigerian company processing data of US customers but not EU or Nigerian residents must comply with:', options: ['GDPR and NDPR', 'Neither GDPR nor NDPR', 'Only NDPR', 'Only GDPR'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Neither GDPR (no EU resident data) nor NDPR (no Nigerian resident data) applies. However, US state laws (CCPA, etc.) may apply.', certTags: ['Security+'] },
          { question: 'Under GDPR, "legitimate interests" as a lawful basis requires:', options: ['No conditions', 'Documented balancing test weighing interests vs data subject rights', 'Prior consent from supervisory authority', 'Only applies to non-profit organizations'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Legitimate interests requires a documented Legitimate Interests Assessment (LIA) balancing organizational interests against data subject rights.', certTags: ['Security+'] }
        ]
      }
    ]
  },
  {
    id: 'week19',
    title: 'Cryptography & PKI Part 1',
    durationText: 'Week 19 - 2 topics',
    focus: 'Symmetric/asymmetric cryptography and hashing for password security',
    output: 'Ability to apply cryptographic algorithms, understand key management, and implement secure password storage',
    topics: [
      {
        id: 'we19d01',
        title: 'Symmetric & Asymmetric Crypto',
        description: 'AES key sizes and modes, RSA key generation, ECC efficiency, Diffie-Hellman key exchange, and forward secrecy.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'Why is AES-GCM preferred over AES-CBC in modern applications, and what problem does forward secrecy solve?',
        interviewAnswer: 'AES-GCM provides authenticated encryption with associated data, combining encryption and integrity verification in one operation, while CBC requires separate HMAC computation and is vulnerable to padding oracle attacks. Forward secrecy ensures that if a server private key is compromised, past session keys remain secure because each session used ephemeral keys that were discarded after use.',
        content: `:::objectives
- Explain AES key sizes and encryption modes (ECB, CBC, GCM)
- Describe RSA key generation, encryption, and signing processes
- Understand why ECC provides equivalent security with smaller keys
- Explain Diffie-Hellman key exchange and forward secrecy
:::

:::info
Symmetric and asymmetric cryptography form the backbone of modern security. Understanding their properties, strengths, and weaknesses is essential for selecting appropriate algorithms for different use cases.
:::

## AES (Advanced Encryption Standard)

### Key Sizes and Security
| Key Size | Rounds | Security Level | Status |
|---|---|---|---|
| 128 bits | 10 | 128-bit | Secure |
| 192 bits | 12 | 192-bit | Secure |
| 256 bits | 14 | 256-bit | Most secure |

### AES Modes of Operation

| Mode | Description | IV Required | Parallelizable | Security |
|---|---|---|---|---|
| **ECB** | Each block encrypted independently | No | Yes | Insecure — pattern preservation |
| **CBC** | Each block XORed with previous ciphertext | Yes | Encrypt: No, Decrypt: Yes | Good with authentication |
| **GCM** | Counter mode + Galois authentication | Yes (nonce) | Yes | Best — provides AEAD |

### ECB Problems (The Penguin Problem)
ECB mode encrypts identical plaintext blocks into identical ciphertext blocks. When encrypting an image, the outline and patterns remain visible — this is the "penguin problem" demonstrating ECB's insecurity for large data.

### CBC with Authentication
- Requires Initialization Vector (IV) for each encryption
- Vulnerable to padding oracle attacks if not properly implemented
- Should be combined with HMAC for authentication

### GCM (Galois/Counter Mode) — Recommended
- **AEAD (Authenticated Encryption with Associated Data):** Provides both encryption AND integrity
- No padding needed (counter mode)
- Hardware-accelerated (AES-NI instruction set)
- Used in TLS 1.3, IPsec, SSH

## RSA (Rivest-Shamir-Adleman)

### Key Generation
1. Choose two large prime numbers (p, q)
2. Compute n = p × q (modulus)
3. Compute φ(n) = (p-1)(q-1) (Euler's totient)
4. Choose e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1
5. Compute d ≡ e⁻¹ (mod φ(n)) (private exponent)
6. Public key: (e, n) | Private key: (d, n)

### RSA Operations
- **Encryption:** c = mᵉ mod n (with public key)
- **Decryption:** m = cᵈ mod n (with private key)
- **Signing:** s = hᵈ mod n (hash encrypted with private key)
- **Verification:** h = sᵉ mod n (verify with public key)

### RSA Key Sizes
| Key Size | Security Level | Status |
|---|---|---|
| 1024 bits | ~80-bit | Deprecated |
| 2048 bits | ~112-bit | Minimum recommended |
| 3072 bits | ~128-bit | Recommended |
| 4096 bits | ~140-bit | High security |

:::warning
RSA is vulnerable to quantum computing (Shor's algorithm). For long-term security, consider post-quantum alternatives (CRYSTALS-Kyber, CRYSTALS-Dilithium).
:::

## ECC (Elliptic Curve Cryptography)

### Why Smaller Keys = Same Security
ECC is based on the elliptic curve discrete logarithm problem, which is harder than integer factorization (RSA) or discrete logarithm (DH).

| ECC Key Size | RSA Equivalent | DH Equivalent |
|---|---|---|
| 256 bits | 3072 bits | 3072 bits |
| 384 bits | 7680 bits | 7680 bits |
| 521 bits | 15360 bits | 15360 bits |

### ECC Advantages
- **Smaller keys:** Less storage, faster transmission
- **Faster key generation:** Important for ephemeral keys
- **Better performance:** Lower computational overhead
- **Smaller signatures:** Less bandwidth usage
- **Used in:** TLS 1.3, Bitcoin (secp256k1), Signal, WhatsApp

## Diffie-Hellman Key Exchange

### How It Works
1. Alice and Bob agree on public parameters (p, g)
2. Alice generates private key a, computes A = gᵃ mod p
3. Bob generates private key b, computes B = gᵇ mod p
4. They exchange A and B publicly
5. Alice computes s = Bᵃ mod p
6. Bob computes s = Aᵇ mod p
7. Both arrive at shared secret s = gᵃᵇ mod p

### Man-in-the-Middle Vulnerability
Plain DH is vulnerable to MITM — an attacker can intercept and relay communications, establishing separate keys with each party.

### Solution: Ephemeral DH with Authentication
- **DHE (Ephemeral Diffie-Hellman):** Generates new keys per session
- **ECDHE (Ephemeral Elliptic Curve DH):** Faster, smaller keys
- Combined with certificates for authentication

## Forward Secrecy

### What It Provides
Even if the server's long-term private key is compromised, past session keys remain secure because each session used different ephemeral keys.

### Why It Matters
Without forward secrecy, an attacker who captures encrypted traffic today and steals the server key tomorrow can decrypt ALL past traffic.

### Implementation
- TLS 1.3 mandates forward secrecy (ECDHE)
- Signal Protocol uses Double Ratchet with forward secrecy
- WireGuard uses Curve25519 for ephemeral key exchange

:::concept
**Hybrid encryption in practice:** TLS uses asymmetric (ECDHE) to exchange a symmetric session key (AES-256-GCM), then symmetric for bulk data. This combines the best of both worlds.
:::

:::tip
**Hands-on with OpenSSL:**
\`\`\`bash
# Generate RSA key pair
openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private.pem -out public.pem

# Encrypt/decrypt
openssl pkeyutl -encrypt -pubin -inkey public.pem -in plaintext.txt -out encrypted.bin
openssl pkeyutl -decrypt -inkey private.pem -in encrypted.bin -out decrypted.txt

# Generate ECC key
openssl ecparam -genkey -name prime256v1 -noout -out ec_private.pem
\`\`\`
:::`,
        quiz: [
          { question: 'Why is ECB mode considered insecure for encrypting large data?', options: ['Uses 56-bit key', 'Identical plaintext blocks produce identical ciphertext, revealing patterns', 'Requires two passes', 'Cannot be hardware accelerated'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'ECB encrypts each block independently, preserving patterns in the data (the "penguin problem").', certTags: ['Security+'] },
          { question: 'AES-GCM is preferred over AES-CBC because:', options: ['GCM is faster', 'GCM provides authenticated encryption (AEAD) - encryption AND integrity', 'GCM uses larger keys', 'GCM does not require an IV'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'GCM provides Authenticated Encryption with Associated Data - both encryption and integrity verification in one operation.', certTags: ['Security+'] },
          { question: '256-bit ECC provides equivalent security to:', options: ['256-bit RSA', '1024-bit RSA', '3072-bit RSA', '4096-bit RSA'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: '256-bit ECC ≈ 3072-bit RSA in security level due to the harder mathematical problem (ECDLP vs factoring).', certTags: ['Security+'] },
          { question: 'RSA key generation starts with choosing:', options: ['One large prime', 'Two large prime numbers', 'A large random number', 'An elliptic curve'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'RSA generates two large primes (p, q) and computes n = p × q as the modulus.', certTags: ['Security+'] },
          { question: 'Diffie-Hellman key exchange alone is vulnerable to:', options: ['Brute force attacks', 'Man-in-the-middle attacks (no authentication)', 'Quantum computing only', 'SQL injection'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Plain DH provides no authentication - an attacker can intercept and establish separate keys with each party.', certTags: ['Security+'] },
          { question: 'Forward secrecy ensures that:', options: ['Keys are never deleted', 'If a private key is compromised, past session keys remain secure', 'All traffic is encrypted', 'Keys are shared publicly'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Ephemeral keys per session mean compromising the long-term key does not expose past encrypted communications.', certTags: ['Security+'] },
          { question: 'AES-256 requires how many rounds of encryption?', options: ['10', '12', '14', '16'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'AES-128: 10 rounds, AES-192: 12 rounds, AES-256: 14 rounds.', certTags: ['Security+'] },
          { question: 'RSA signing works by:', options: ['Encrypting the message with public key', 'Encrypting the hash with the private key', 'Hashing with the public key', 'Decrypting with the private key'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'RSA signing: hash the message, then encrypt the hash with the private key. Verification uses the public key.', certTags: ['Security+'] },
          { question: 'ECC is particularly advantageous for:', options: ['Bulk data encryption', 'Key exchange and signatures on resource-constrained devices', 'Password hashing', 'File compression'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'ECC\'s smaller keys and faster computation make it ideal for mobile, IoT, and embedded systems.', certTags: ['Security+'] },
          { question: 'TLS 1.3 mandates forward secrecy by requiring:', options: ['Static RSA key exchange', 'Ephemeral key exchange (ECDHE)', 'Pre-shared keys only', 'No encryption for performance'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'TLS 1.3 removed static RSA key exchange, requiring ephemeral ECDHE for all connections.', certTags: ['Security+'] },
          { question: 'The main advantage of AES-GCM over AES-CBC is:', options: ['Faster encryption', 'Built-in authentication eliminates need for separate HMAC', 'Smaller key size', 'No IV required'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'GCM provides authenticated encryption - integrity is built-in. CBC requires separate HMAC computation.', certTags: ['Security+'] },
          { question: 'What makes the elliptic curve discrete logarithm problem (ECDLP) harder than integer factorization?', options: ['ECC uses larger numbers', 'No known sub-exponential algorithm exists for ECDLP', 'ECC is newer technology', 'ECC uses prime numbers'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Factoring has sub-exponential algorithms (General Number Field Sieve). No similar algorithm exists for ECDLP, making it harder per bit.', certTags: ['Security+'] },
          { question: 'AES-NI instruction set provides:', options: ['Larger key sizes', 'Hardware acceleration for AES operations in CPUs', 'Post-quantum security', 'Key management'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'AES-NI is a CPU instruction set that accelerates AES encryption/decryption, significantly improving performance.', certTags: ['Security+'] },
          { question: 'In hybrid encryption, which algorithm handles bulk data?', options: ['RSA', 'AES', 'ECC', 'Diffie-Hellman'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Hybrid encryption uses asymmetric (RSA/ECC) for key exchange and symmetric (AES) for bulk data encryption.', certTags: ['Security+'] }
        ]
      },
      {
        id: 'we19d02',
        title: 'Hashing & Password Security',
        description: 'SHA-256, SHA-512, HMAC, bcrypt, argon2, rainbow tables, and practical hashing operations.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'Why should you never use SHA-256 for password storage, and what makes argon2 the preferred alternative?',
        interviewAnswer: 'SHA-256 is designed for speed, enabling billions of hashes per second on GPUs for brute force attacks. Argon2 is memory-hard, requiring significant RAM per hash computation, making GPU and ASIC attacks much more expensive. It also supports tunable time and memory parameters, automatic salting, and resists both brute force and side-channel attacks through its argon2id variant.',
        content: `:::objectives
- Understand SHA-256 and SHA-512 properties and use cases
- Explain HMAC for message authentication
- Implement bcrypt and argon2 for secure password storage
- Demonstrate rainbow table attacks and why salting defeats them
:::

:::info
Hashing converts arbitrary data into fixed-size digests. Unlike encryption, hashing is one-way — you cannot reverse a hash to get the original data. This makes hashing ideal for integrity verification and password storage.
:::

## Hash Functions Comparison

| Algorithm | Output Size | Speed | Security | Primary Use |
|---|---|---|---|---|
| MD5 | 128 bits | Very fast | Broken (collisions) | Checksums only |
| SHA-1 | 160 bits | Fast | Deprecated (collisions 2017) | Legacy systems |
| SHA-256 | 256 bits | Moderate | Secure | Certificates, blockchain |
| SHA-384 | 384 bits | Slower | Secure | High-security applications |
| SHA-512 | 512 bits | Slower (on 64-bit) | Secure | High-security, password hashing |
| bcrypt | Variable | Adjustable | Secure | Password storage |
| argon2 | Variable | Memory-hard | Best | Password storage |

### Hashing Properties
1. **Deterministic:** Same input → same output, every time
2. **Fixed output:** Regardless of input size, output is fixed length
3. **One-way:** Cannot reverse to recover original input
4. **Collision-resistant:** Computationally infeasible to find two inputs with same hash
5. **Avalanche effect:** Small input change → completely different hash

## SHA-256 and SHA-512

### SHA-256
- Part of the SHA-2 family (designed by NSA, published by NIST)
- 256-bit (32-byte) output
- Used in: Bitcoin mining, TLS certificates, digital signatures, file integrity

### SHA-512
- 512-bit (64-byte) output
- Faster than SHA-256 on 64-bit processors (optimized for 64-bit words)
- Used in: High-security applications, HMAC-SHA512

### Practical Usage
\`\`\`bash
# Hash a string
echo -n "password" | sha256sum
# Output: 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8

# Hash a file
sha256sum important_file.zip

# Verify integrity
sha256sum downloaded_file.iso
# Compare output to published checksum from vendor
\`\`\`

## HMAC (Hash-based Message Authentication Code)

### How It Works
HMAC combines a hash function with a secret key to provide both integrity AND authentication.

\`\`\`
HMAC(K, m) = H((K' ⊕ opad) || H((K' ⊕ ipad) || m))
\`\`\`

### Properties
- Requires secret key to compute
- Anyone with the key can verify
- Even if hash function is compromised, HMAC remains secure (if key is secret)

### Use Cases
- API authentication (HMAC-SHA256 signatures)
- JWT (JSON Web Token) signatures
- TLS message authentication
- Secure webhook verification

## Password Hashing

### Why Not Use SHA-256 for Passwords?
SHA-256 is designed to be fast - billions of hashes/second on GPUs. This enables brute-force attacks at massive scale.

### bcrypt
- Based on Blowfish cipher
- Includes work factor (cost parameter)
- Work factor of 10: ~100ms per hash
- Each increment doubles the computation time
- Includes salt automatically

### argon2
- Winner of Password Hashing Competition (2015)
- Memory-hard function - resists GPU/ASIC attacks
- Parameters: time cost, memory cost, parallelism
- Three variants: argon2d (data-dependent), argon2i (data-independent), argon2id (hybrid - recommended)

### Password Storage Best Practice
\`\`\`
hash = argon2id(password, unique_salt, time_cost, memory_cost, parallelism)
Store: salt + hash parameters + hash
Never store: plaintext password
\`\`\`

## Rainbow Tables & Salting

### Rainbow Tables
Precomputed lookup tables mapping common password hashes to their plaintext equivalents.

### Why Salting Defeats Rainbow Tables
A salt is a random value added to the password before hashing:
- Same password + different salt = different hash
- Rainbow tables must account for every possible salt
- With 128-bit salt: 2^128 possible salts - infeasible to precompute

### Salt Properties
- Unique per user (stored alongside hash, not secret)
- Sufficiently random (cryptographically secure random)
- Long enough (128+ bits recommended)

:::concept
**Password storage best practice:**
\`\`\`
// When user registers
salt = generateRandomSalt()
hash = argon2id(password + salt)
store(username, salt, hash)

// When user logs in
stored_hash = lookup(username)
computed_hash = argon2id(password + stored_salt)
if computed_hash == stored_hash: authenticate
\`\`\`
:::

:::warning
Rainbow tables are less effective against bcrypt/argon2 because these algorithms include built-in salting and are deliberately slow. However, salting is still best practice for any password hashing scheme.
:::

:::tip
**Hands-on verification:**
\`\`\`bash
# Generate a salt and hash a password with argon2
echo -n "mypassword" | argon2 <random_salt> -id -t 1 -m 16 -p 1

# Verify a file's integrity
sha256sum -c checksums.txt
\`\`\`
:::`,
        quiz: [
          { question: 'Why is SHA-256 NOT suitable for password storage?', options: ['It produces too long hashes', 'It is too fast - enables brute force at billions of hashes/second', 'It is not secure enough', 'It requires a key'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'SHA-256 is designed for speed. Password hashing must be deliberately slow to resist brute force.', certTags: ['Security+'] },
          { question: 'What does a salt accomplish in password hashing?', options: ['Makes passwords shorter', 'Ensures identical passwords produce different hashes, defeating rainbow tables', 'Encrypts the hash', 'Compresses the output'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'A random salt ensures even identical passwords produce different stored hashes.', certTags: ['Security+'] },
          { question: 'bcrypt differs from SHA-256 for passwords by:', options: ['Being faster', 'Including a work factor that makes computation deliberately slow', 'Producing shorter output', 'Using a different hash algorithm'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'bcrypt includes a work factor that increases computation time, making brute force much harder.', certTags: ['Security+'] },
          { question: 'HMAC provides:', options: ['Encryption only', 'Integrity AND authentication via secret key', 'Confidentiality only', 'Compression'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'HMAC combines hash function with secret key to provide both integrity verification and authentication.', certTags: ['Security+'] },
          { question: 'argon2 is preferred over bcrypt because:', options: ['It is faster to compute', 'It is memory-hard, making GPU/ASIC attacks more expensive', 'It produces smaller hashes', 'It is an older, more tested algorithm'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'argon2 is memory-hard, requiring significant RAM per hash computation - making GPU attacks much more expensive.', certTags: ['Security+'] },
          { question: 'A rainbow table attack is defeated by:', options: ['Using longer passwords', 'Adding a unique random salt to each password before hashing', 'Using SHA-512 instead of SHA-256', 'Encrypting the hash'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Unique salts make precomputed rainbow tables infeasible - each user needs a different table for every possible salt.', certTags: ['Security+'] },
          { question: 'HMAC-SHA256 is commonly used for:', options: ['Password storage', 'API authentication and JWT signatures', 'File encryption', 'Key exchange'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'HMAC-SHA256 provides authenticated integrity for API requests, JWT tokens, and webhook verification.', certTags: ['Security+'] },
          { question: 'What property makes argon2id the recommended variant?', options: ['Fastest computation', 'Hybrid of data-dependent and data-independent modes', 'Smallest output', 'Oldest and most tested'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'argon2id combines argon2d (resistant to GPU attacks) and argon2i (resistant to side-channel attacks) for balanced security.', certTags: ['Security+'] },
          { question: 'Running echo -n "mypassword" | sha256sum produces the same hash every time. This demonstrates which property?', options: ['Collision resistance', 'Deterministic output', 'Avalanche effect', 'One-way function'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Deterministic: same input always produces the same output - fundamental property of hash functions.', certTags: ['Security+'] },
          { question: 'bcrypt includes salt automatically. Why is it still good practice to store the salt separately?', options: ['It is not - bcrypt handles everything', 'For algorithm flexibility and verification during login', 'To save storage space', 'To make the hash longer'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Storing salt separately allows verifying which algorithm and parameters were used, supporting migration between hashing schemes.', certTags: ['Security+'] },
          { question: 'HMAC requires a secret key. Without the key, an attacker:', options: ['Can still compute valid HMACs', 'Cannot forge or verify HMACs', 'Can reverse the hash', 'Can perform brute force'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Without the secret key, an attacker cannot produce valid HMACs even if they know the hash algorithm.', certTags: ['Security+'] },
          { question: 'SHA-512 is often faster than SHA-256 on 64-bit processors because:', options: ['SHA-512 uses weaker compression', 'SHA-512 is optimized for 64-bit word operations', 'SHA-512 has fewer rounds', 'SHA-256 is not supported on 64-bit'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'SHA-512 uses 64-bit words, which are native to 64-bit CPUs. SHA-256 uses 32-bit words, requiring more operations on 64-bit hardware.', certTags: ['Security+'] },
          { question: 'In a password storage breach, if passwords were hashed with salted bcrypt (work factor 12), an attacker would:', options: ['Immediately have all passwords', 'Need significant time/resources per password due to bcrypt\'s slowness', 'Only see the hash algorithm, not the passwords', 'Have no useful information'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'bcrypt with work factor 12 makes each hash attempt take ~250ms, making brute force of millions of passwords extremely time-consuming.', certTags: ['Security+'] },
          { question: 'Which statement about rainbow tables is TRUE?', options: ['They work against any hash algorithm', 'They precompute hashes for common passwords to enable instant lookup', 'They require access to the target system', 'They only work against MD5'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Rainbow tables are precomputed lookup tables. Given a hash, they instantly find the plaintext - but only for passwords that were precomputed.', certTags: ['Security+'] }
        ]
      }
    ]
  },
  {
    id: 'week20',
    title: 'Cryptography & PKI Part 2',
    durationText: 'Week 20 - 2 topics',
    focus: 'Digital signatures, certificates, and comprehensive Phase 3 review',
    output: 'Ability to manage certificate lifecycles, understand revocation mechanisms, and demonstrate Security+ domain mastery',
    topics: [
      {
        id: 'we20d01',
        title: 'Digital Signatures & Certificates',
        description: 'How digital signatures work, certificate lifecycle, CRL vs OCSP, and Let\'s Encrypt implementation.',
        type: 'learn',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'Explain how digital signatures provide non-repudiation and the difference between CRL and OCSP for certificate revocation.',
        interviewAnswer: 'Digital signatures use the signer private key to encrypt a hash of the document, providing non-repudiation because only the private key holder could have created the signature. CRL downloads a full revocation list periodically, providing stale data, while OCSP queries specific certificates in real-time. OCSP stapling improves this by having the server include the OCSP response in the TLS handshake.',
        content: `:::objectives
- Explain how digital signatures provide integrity, authentication, and non-repudiation
- Describe the certificate lifecycle: request, issuance, renewal, revocation
- Compare CRL and OCSP for certificate revocation checking
- Understand self-signed vs CA-signed certificates
:::

:::info
Digital signatures and certificates are the foundation of trust on the internet. They verify identity, ensure data integrity, and enable secure communications.
:::

## How Digital Signatures Work

### Signing Process
1. **Create hash:** Hash the document/message with SHA-256
2. **Encrypt hash:** Encrypt the hash with signer's PRIVATE key
3. **Attach signature:** Signature is sent with the document

### Verification Process
1. **Decrypt signature:** Use signer's PUBLIC key to decrypt the signature
2. **Hash document:** Hash the received document independently
3. **Compare hashes:** If hashes match, signature is valid

### Properties Provided
| Property | How |
|---|---|
| **Integrity** | Any modification changes the hash, invalidating signature |
| **Authentication** | Only the private key owner could have created the signature |
| **Non-repudiation** | Signer cannot deny signing (only they have the private key) |

### Common Algorithms
- **RSA-SHA256:** Most widely used
- **ECDSA:** Smaller signatures, faster
- **EdDSA (Ed25519):** Modern, fast, recommended for new implementations

## Certificate Lifecycle

### 1. Certificate Signing Request (CSR)
\`\`\`bash
# Generate private key
openssl genpkey -algorithm RSA -out server.key -pkeyopt rsa_keygen_bits:2048

# Generate CSR
openssl req -new -key server.key -out server.csr
# Fill in: Country, State, Organization, Common Name (domain), Email
\`\`\`

**CSR contains:** Subject (domain, organization), public key, validity period, signature from requester

### 2. Validation
The CA verifies domain ownership:
- **HTTP challenge:** Place file at well-known URL on the domain
- **DNS challenge:** Create specific DNS record (TXT)
- **Email challenge:** Respond to email sent to domain contacts

### 3. Issuance
CA signs the certificate with their private key, creating a trusted credential.

### 4. Installation
Configure server with certificate and private key. Web server presents certificate during TLS handshake.

### 5. Renewal
Certificates expire (typically 90 days for Let's Encrypt, 1 year for commercial CAs). Must renew before expiration.

### 6. Revocation
If private key is compromised, certificate must be revoked immediately.

## CRL vs OCSP

| Feature | CRL | OCSP |
|---|---|---|
| **Method** | Download full revocation list | Query specific certificate |
| **Freshness** | Periodic updates (days) | Real-time |
| **Bandwidth** | High (full list) | Low (single query) |
| **Privacy** | Reveals which cert is checked | Can be more private with stapling |
| **Performance** | Cached locally | Network request per check |

### OCSP Stapling
Server periodically queries OCSP responder and "staples" the response to the TLS handshake. Clients don't need to contact the CA directly.

## Self-Signed vs CA-Signed Certificates

| Feature | Self-Signed | CA-Signed |
|---|---|---|
| **Trust** | Only by explicit import | Trusted by default in browsers |
| **Use case** | Internal testing, development | Production, public-facing |
| **Cost** | Free | Free (Let's Encrypt) or paid |
| **Validation** | None | Domain/organization validated |
| **Warning** | Browsers show security warning | No warning |

## Let's Encrypt & Certbot

### Let's Encrypt
- Free, automated certificate authority
- 90-day certificates (auto-renewed)
- Domain validation only (no organization validation)
- Widely trusted by all major browsers

### Certbot (ACME Client)
\`\`\`bash
# Install certbot
sudo apt install certbot

# Obtain certificate (standalone)
sudo certbot certonly --standalone -d example.com -d www.example.com

# Obtain certificate (Nginx plugin)
sudo certbot --nginx -d example.com

# Auto-renewal (cron job)
0 0,12 * * * certbot renew --quiet

# Check certificate status
certbot certificates
\`\`\`

### Certificate Transparency (CT)
All publicly trusted certificates are logged in CT logs - publicly auditable records of certificate issuance. This enables detection of mis-issued certificates.

:::warning
Never share your private key. The private key is the identity - if compromised, anyone can impersonate your server. Protect private keys with strong permissions and consider HSMs for production.
:::

:::concept
**Trust chain:** Browser trusts Root CA → Root CA signed Intermediate CA → Intermediate CA signed your certificate. If any link breaks (revocation, expiration), trust is broken.
:::

:::tip
**Quick certificate check:**
\`\`\`bash
# View certificate details
openssl x509 -in certificate.pem -text -noout

# Check certificate expiration
openssl x509 -enddate -noout -in certificate.pem

# Test TLS connection
openssl s_client -connect example.com:443
\`\`\`
:::`,
        quiz: [
          { question: 'A digital signature provides all EXCEPT:', options: ['Integrity', 'Authentication', 'Confidentiality', 'Non-repudiation'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'Digital signatures provide integrity, authentication, and non-repudiation. They do NOT provide confidentiality - the message is sent in plaintext.', certTags: ['Security+'] },
          { question: 'To verify a digital signature, you use the signer\'s:', options: ['Private key', 'Public key', 'Certificate only', 'Session key'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Verification uses the public key to decrypt the signature. If decryption produces a matching hash, the signature is valid.', certTags: ['Security+'] },
          { question: 'A Certificate Signing Request (CSR) contains:', options: ['The private key', 'The public key and subject information', 'The CA\'s private key', 'The signed certificate'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'A CSR contains the requester\'s public key and subject information (domain, organization). The private key never leaves the requester.', certTags: ['Security+'] },
          { question: 'OCSP stapling improves certificate revocation checking by:', options: ['Removing the need for revocation checking', 'The server queries OCSP and staples the response to the TLS handshake', 'Caching revocation status for 30 days', 'Using CRL instead of OCSP'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'OCSP stapling has the server query the OCSP responder and include the response in the TLS handshake, improving privacy and performance.', certTags: ['Security+'] },
          { question: 'Let\'s Encrypt certificates expire after:', options: ['1 year', '90 days', '30 days', '6 months'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Let\'s Encrypt issues 90-day certificates with auto-renewal via certbot.', certTags: ['Security+'] },
          { question: 'A self-signed certificate will cause browsers to:', options: ['Work normally', 'Display a security warning because the CA is not in the trusted root store', 'Block the connection entirely', 'Auto-renew the certificate'], correctAnswerIndex: 1, difficulty: 'beginner', explanation: 'Self-signed certificates are not signed by a trusted CA, so browsers display security warnings.', certTags: ['Security+'] },
          { question: 'Certificate Transparency (CT) logs serve which purpose?', options: ['Encrypt certificates', 'Publicly audit all issued certificates to detect mis-issuance', 'Store private keys', 'Manage certificate renewal'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'CT logs publicly record all certificates, enabling detection of unauthorized or mis-issued certificates.', certTags: ['Security+'] },
          { question: 'During the TLS handshake, a server presents its certificate. Which key signs this certificate?', options: ['Server\'s private key', 'CA\'s private key', 'Client\'s public key', 'Session key'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'The CA signs the certificate with its private key. Clients verify with the CA\'s public key (in the trusted root store).', certTags: ['Security+'] },
          { question: 'The HTTP challenge for domain validation requires:', options: ['Placing a file at /.well-known/acme-challenge/', 'Creating a DNS TXT record', 'Responding to an email', 'Installing a browser extension'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'HTTP challenge: CA requests a specific file at a well-known URL. If the server responds correctly, domain control is proven.', certTags: ['Security+'] },
          { question: 'Why is CRL less preferred than OCSP for revocation checking?', options: ['CRL is more accurate', 'CRL provides stale data (periodic updates) and requires downloading large lists', 'CRL is more private', 'CRL is faster'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'CRL is updated periodically (could be days old), while OCSP provides real-time revocation status with less bandwidth.', certTags: ['Security+'] },
          { question: 'If a private key is compromised, the immediate action is:', options: ['Generate a new key pair', 'Revoke the certificate and obtain a new one', 'Continue using the key with monitoring', 'Report to law enforcement only'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Immediate certificate revocation prevents attackers from using the compromised key to impersonate the server.', certTags: ['Security+'] },
          { question: 'ECDSA signatures differ from RSA signatures by:', options: ['Being more secure', 'Being smaller and faster to compute', 'Being compatible with more algorithms', 'Using symmetric encryption'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'ECDSA uses elliptic curve mathematics, producing smaller signatures and faster computation than RSA.', certTags: ['Security+'] },
          { question: 'Certbot auto-renewal cron job should run:', options: ['Once a year', 'Twice daily', 'Weekly', 'Monthly'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Certbot recommends running renewal twice daily to ensure certificates are renewed well before expiration.', certTags: ['Security+'] },
          { question: 'What happens if an intermediate CA certificate expires?', options: ['Nothing - only root CAs matter', 'All certificates signed by that intermediate become untrusted', 'Only the intermediate needs renewal', 'Browsers auto-update the chain'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'If an intermediate CA expires, its certificate chain is broken. All certificates it signed become untrusted until renewed.', certTags: ['Security+'] },
          { question: 'A private key should be stored with which file permissions on Linux?', options: ['644 (world-readable)', '600 (owner read/write only)', '777 (full access)', '444 (read-only)'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'chmod 600 restricts access to the owner only. Private keys must never be world-readable.', certTags: ['Security+'] }
        ]
      },
      {
        id: 'we20d02',
        title: 'Phase 3 Review & Practice',
        description: 'Comprehensive review of all Security+ domains covered in Phase 3 with practice scenarios and assessment.',
        type: 'review',
        duration: '4 hours',
        labUrl: '',
        aiPrompt: '',
        interviewQuestion: 'How would you explain the PKI chain of trust, and what happens when an intermediate CA is compromised?',
        interviewAnswer: 'The PKI chain of trust flows from Root CA to Intermediate CA to end-entity certificates. Root CAs are kept offline in HSMs, while intermediates handle daily signing. If an intermediate CA is compromised, all certificates it signed become untrusted because the chain of trust is broken. The intermediate must be revoked, and all affected certificates reissued through a different intermediate CA.',
        content: `:::objectives
- Review all five Security+ domains covered in Phase 3
- Apply knowledge through scenario-based questions
- Identify weak areas for targeted study
- Map Phase 3 topics to Security+ exam domains
:::

## Security+ Domain Mapping

| Domain | Weight | Phase 3 Topics |
|---|---|---|
| **1.0 Threats, Attacks, and Vulnerabilities** | 22% | Week 11-12: CIA triad, malware, social engineering, crypto |
| **2.0 Architecture and Design** | 18% | Week 13-14: IAM, access control, network design, virtualization |
| **3.0 Implementation** | 22% | Week 13-14: MFA, SSO, cloud security, RAID |
| **4.0 Operations and Incident Response** | 18% | Week 15-16: IR lifecycle, logging, forensics, vulnerability mgmt |
| **5.0 Governance, Risk, and Compliance** | 20% | Week 17-18: Risk management, NIST, GDPR, NDPR |

## Key Concepts Review

### Week 11-12: Threats, Attacks & Vulnerabilities
- **CIA Triad:** Confidentiality, Integrity, Availability
- **AAA:** Authentication (who), Authorization (what), Accounting (audit)
- **Malware:** Viruses, worms, trojans, ransomware, rootkits, fileless
- **Social Engineering:** Phishing, vishing, pretexting, baiting
- **Crypto Fundamentals:** Symmetric vs asymmetric, hashing, PKI

### Week 13-14: Architecture & Implementation
- **IAM:** MFA (TOTP, push, FIDO2), SSO (SAML, OAuth2, OIDC)
- **Access Control:** DAC, MAC, RBAC, ABAC, least privilege, SoD
- **Network Design:** DMZ, segmentation, zero trust, cloud shared responsibility
- **Virtualization:** Type 1/2 hypervisors, VMs vs containers, HA, RAID

### Week 15-16: Operations & Incident Response
- **IR Lifecycle:** Preparation → Detection → Containment → Eradication → Recovery → Lessons Learned
- **Logging:** Windows Event Logs, Linux logs, syslog, SIEM
- **Vulnerability Mgmt:** CVE/CVSS, Nessus, OpenVAS, patch management
- **Forensics:** Order of volatility, dd, Volatility, chain of custody
- **Data Destruction:** NIST 800-88, degaussing, crypto erase

### Week 17-18: Governance, Risk & Compliance
- **Risk Management:** SLE, ALE, ARO, risk response strategies
- **NIST Frameworks:** RMF (7 steps), CSF (5 functions), SP 800-53 controls
- **GDPR:** 7 principles, data subject rights, breach notification (72 hrs)
- **NDPR:** Nigeria data protection, NDPC, comparison with GDPR

### Week 19: Cryptography & PKI
- **AES:** Key sizes (128/192/256), modes (ECB insecure, CBC good, GCM best)
- **RSA:** Key generation, encryption/signing, minimum 2048-bit
- **ECC:** 256-bit ≈ 3072-bit RSA, used in TLS 1.3
- **Diffie-Hellman:** Key exchange, forward secrecy (ECDHE)
- **Password Security:** bcrypt, argon2 (memory-hard), salting

:::checkpoint
**Assessment Checklist — Can you:**
1. Explain each CIA triad component with real-world examples
2. Distinguish malware types and their propagation methods
3. Analyze phishing emails and identify red flags
4. Compare symmetric vs asymmetric encryption with use cases
5. Implement MFA methods and explain why SMS is insecure
6. Describe zero trust architecture principles
7. Execute the NIST IR lifecycle phases
8. Explain SIEM correlation and log analysis
9. Calculate ALE for risk quantification
10. Describe GDPR data subject rights and breach notification
11. Explain digital signature creation and verification
12. Compare CRL and OCSP for certificate revocation
:::

## Practice Scenario Questions

### Scenario 1: Incident Response
A company discovers ransomware encrypting file shares. Users cannot access critical documents. The attacker demands 50 Bitcoin.

**Questions:**
1. Which CIA triad components are impacted? (Availability + Integrity)
2. What are the first three actions in the IR lifecycle? (Contain, Eradicate, Recover)
3. Should the company pay the ransom? (Generally no — no guarantee of decryption, funds criminal activity)

### Scenario 2: Access Control
A hospital wants to implement access controls for its EHR system.

**Questions:**
1. Which model is most appropriate? (RBAC — roles: doctor, nurse, billing)
2. How does least privilege apply? (Each role gets minimum necessary access)
3. What AAA protocol for network device admin? (TACACS+ — encrypts full packet)

### Scenario 3: Cryptography
A startup needs to encrypt data in transit and at rest.

**Questions:**
1. Which protocol for data in transit? (TLS 1.3 with ECDHE + AES-GCM)
2. Which algorithm for data at rest? (AES-256-GCM)
3. How to store user passwords? (argon2id with unique salt)

### Scenario 4: Compliance
A Nigerian company processes EU customer data.

**Questions:**
1. Which regulations apply? (Both GDPR and NDPR)
2. What are breach notification requirements? (72 hours to both NDPC and relevant EU DPA)
3. Do they need a DPO? (Yes — required under both frameworks)

:::warning
The Security+ exam tests application, not memorization. Understand concepts deeply enough to apply them to novel scenarios. Practice explaining concepts in your own words.
:::

:::tip
**Exam day tips:**
1. Read questions carefully — look for keywords (FIRST, BEST, MOST)
2. Eliminate obviously wrong answers first
3. Consider the business context, not just technical correctness
4. Time management — don't spend too long on any single question
5. Flag difficult questions and return to them
:::`,
        quiz: [
          { question: 'A company\'s web server is compromised and the attacker encrypts the database. Which components of the CIA triad are impacted?', options: ['Confidentiality only', 'Availability only', 'Integrity and Availability', 'All three equally'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'Encryption impacts integrity (data modified) and availability (data inaccessible). Confidentiality may also be impacted if data was exfiltrated.', certTags: ['Security+'] },
          { question: 'During incident response, what should happen BEFORE eradication?', options: ['Recovery', 'Lessons learned', 'Containment', 'Preparation'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'Containment stops the attack and preserves evidence before eradication removes the threat.', certTags: ['Security+'] },
          { question: 'A hospital implements access controls where doctors can read/write patient records but billing staff can only see billing codes. Which model is this?', options: ['DAC', 'MAC', 'RBAC', 'ABAC'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'RBAC assigns permissions based on job roles (doctor, billing).', certTags: ['Security+'] },
          { question: 'TLS 1.3 uses ECDHE for key exchange and AES-GCM for data. This is an example of:', options: ['Symmetric encryption only', 'Asymmetric encryption only', 'Hybrid encryption', 'Hash-based encryption'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'TLS 1.3 combines asymmetric (ECDHE) for key exchange with symmetric (AES-GCM) for bulk data - hybrid encryption.', certTags: ['Security+'] },
          { question: 'A Nigerian company processes EU customer data and must notify both NDPC and EU DPA of a breach. The notification deadline is:', options: ['24 hours', '48 hours', '72 hours', '1 week'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'Both GDPR and NDPR require breach notification within 72 hours.', certTags: ['Security+'] },
          { question: 'A user\'s password hash is stored with a unique salt. An attacker obtains the hash database. Which attack is MOST defeated?', options: ['Brute force', 'Rainbow table attack', 'Dictionary attack', 'Keylogger'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Unique salts make precomputed rainbow tables infeasible - the attacker would need a separate table for every possible salt.', certTags: ['Security+'] },
          { question: 'Zero trust architecture differs from traditional perimeter security by:', options: ['Being less secure', 'Verifying every access request regardless of network location', 'Eliminating the need for firewalls', 'Only applying to external traffic'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Zero trust assumes the internal network is hostile and verifies every request, unlike traditional models that trust internal traffic.', certTags: ['Security+'] },
          { question: 'AES-256-GCM provides which security property that AES-CBC does not natively provide?', options: ['Faster encryption', 'Authenticated encryption (integrity + confidentiality)', 'Smaller key size', 'No IV requirement'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'GCM is an AEAD mode providing both encryption and integrity. CBC requires separate HMAC for integrity.', certTags: ['Security+'] },
          { question: 'An organization calculates: Asset Value = $2M, Exposure Factor = 30%, ARO = 0.5. What is the ALE?', options: ['$600,000', '$300,000', '$100,000', '$1,000,000'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'SLE = $2M × 0.30 = $600,000. ALE = $600,000 × 0.5 = $300,000.', certTags: ['Security+'] },
          { question: 'NIST CSF "Detect" function includes which activity?', options: ['Implementing firewalls', 'Continuous monitoring and anomaly detection', 'Incident response planning', 'Risk assessment'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'Detect includes security continuous monitoring (DE.CM) and detection processes (DE.DP).', certTags: ['Security+'] },
          { question: 'Order of volatility for evidence collection lists which item as MOST volatile?', options: ['Hard drive', 'RAM', 'CPU registers and cache', 'Network logs'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'CPU registers and cache are most volatile - lost instantly when power is removed.', certTags: ['Security+'] },
          { question: 'An attacker sends an email from the CEO\'s actual email account requesting a wire transfer. This is:', options: ['Spear phishing', 'Business Email Compromise (BEC)', 'Phishing', 'Vishing'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'BEC uses compromised legitimate accounts to send convincing requests - harder to detect than spoofed emails.', certTags: ['Security+'] },
          { question: 'Under GDPR, a data subject requests deletion of their data. The organization has how long to respond?', options: ['7 days', '30 days', '1 month', '3 months'], correctAnswerIndex: 2, difficulty: 'beginner', explanation: 'GDPR provides 1 month to respond to data subject requests (extendable by 2 months for complex requests).', certTags: ['Security+'] },
          { question: 'The password "P@ssw0rd" hashed with MD5 without salt is vulnerable to which attack?', options: ['SQL injection', 'Rainbow table attack', 'Buffer overflow', 'Cross-site scripting'], correctAnswerIndex: 1, difficulty: 'intermediate', explanation: 'MD5 without salt produces predictable hashes that can be looked up in precomputed rainbow tables.', certTags: ['Security+'] },
          { question: 'A certificate is signed by an intermediate CA, which is signed by a root CA. If the intermediate CA is revoked, what happens to certificates it signed?', options: ['They remain valid', 'They become untrusted because the chain of trust is broken', 'They auto-renew', 'Browsers ignore the revocation'], correctAnswerIndex: 1, difficulty: 'advanced', explanation: 'Revoking an intermediate CA breaks the chain of trust. All certificates it signed become untrusted.', certTags: ['Security+'] },
          { question: 'Which NIST RMF step involves the formal decision to operate a system?', options: ['Categorize', 'Select', 'Authorize', 'Monitor'], correctAnswerIndex: 2, difficulty: 'intermediate', explanation: 'Authorize is the formal Authority to Operate (ATO) decision based on residual risk acceptance.', certTags: ['Security+'] }
        ]
      }
    ]
  }
];
