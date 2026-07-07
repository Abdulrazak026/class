const fs = require('fs');
const original = fs.readFileSync('C:/Users/user/Desktop/cyber/app/src/phases/phase0-original.ts', 'utf8');
let current = fs.readFileSync('C:/Users/user/Desktop/cyber/app/src/phases/phase0.ts', 'utf8');

// Extract we00d00 topic from original
const we00d00Start = original.indexOf('id: "we00d00"');
let start = original.lastIndexOf('{', we00d00Start);
let braceCount = 0;
let end = start;
for (let i = start; i < original.length; i++) {
  if (original[i] === '{') braceCount++;
  if (original[i] === '}') braceCount--;
  if (braceCount === 0) { end = i + 1; break; }
}
const we00d00Topic = original.substring(start, end);
console.log('Extracted we00d00 topic, length:', we00d00Topic.length);

// Add we00d00 to week00 module in current file
const week00Start = current.indexOf('id: "week00"');
const topicsStart = current.indexOf('topics: [', week00Start);
const insertPoint = topicsStart + 'topics: ['.length;

// Insert we00d00 as first topic
current = current.substring(0, insertPoint) + 
  '\n      ' + we00d00Topic.trim().replace(/\n/g, '\n      ') + ',\n    ' + 
  current.substring(insertPoint);

// Now add week05 module at the end
const week05Module = `
  {
    id: "week05",
    title: "Environment Setup & Deeper Linux",
    durationText: "Week 5",
    focus: "Install WSL2, Ubuntu, and security tools. Deepen Linux skills with permissions, processes, and services.",
    output: "Fully configured WSL2 Ubuntu environment with all security tools, deeper understanding of Linux permissions and process management.",
    topics: [
      {
        id: "we05d01",
        title: "WSL2 + Ubuntu Installation",
        description: "Enable WSL2 on Windows, install Ubuntu, configure Windows Terminal, and understand the Windows/Linux filesystem bridge.",
        type: "learn",
        duration: "4-5 hours",
        content: \`:::objectives
- Enable the Windows Subsystem for Linux feature
- Install WSL2 and Ubuntu from the Microsoft Store
- Create your first Linux user account
- Update and upgrade Ubuntu packages
- Navigate the Windows/Linux filesystem bridge
- Configure Windows Terminal with an Ubuntu profile
:::

## Step 1: Enable WSL Feature

Open **PowerShell as Administrator** (right-click Start button, select "Windows Terminal (Admin)"):

\\\`\\\`\\\`powershell
wsl --install
\\\`\\\`\\\`

This command does three things automatically:
1. Enables the "Virtual Machine Platform" Windows feature
2. Enables the "Windows Subsystem for Linux" Windows feature
3. Downloads and installs the latest WSL2 Linux kernel
4. Sets WSL2 as the default version
5. Downloads Ubuntu from the Microsoft Store

**Restart your PC** when prompted. After restart:

1. Open the **Start Menu**
2. Click **Ubuntu** (it will open a terminal)
3. Wait for the first-time setup to complete
4. Enter a **username** (lowercase, no spaces)
5. Enter a **password** (typing will not show characters - this is normal Linux behavior)

:::checkpoint
If you see the \\\$\\\` prompt with your username, WSL2 is working. Type \\\`exit\\\` to close Ubuntu.
:::

## Step 2: Windows/Linux Filesystem Bridge

WSL2 automatically mounts your Windows drives:

| Windows Path | Ubuntu Path |
|-------------|-------------|
| C:\\\\Users\\\\you\\\\Desktop | /mnt/c/Users/you/Desktop |
| D:\\\\Projects | /mnt/d/Projects |

Test it:

\\\`\\\`\\\`bash
# List your Windows Desktop contents
ls /mnt/c/Users/*/Desktop
\\\`\\\`\\\`

:::checkpoint
You can access your Windows files from Ubuntu using the /mnt/ path.
:::
\`,
        aiPrompt: "Explain what WSL2 is and why cybersecurity professionals use it.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "What is WSL2 and why do cybersecurity professionals use it?",
        interviewAnswer: "WSL2 (Windows Subsystem for Linux 2) lets you run a full Linux kernel inside Windows without dual-booting or virtual machines. Cybersecurity professionals use it because most security tools (nmap, metasploit, sqlmap, hashcat) are native to Linux and run more reliably there.",
        quiz: [
          { question: "What does WSL2 stand for?", options: ["Windows Security Layer 2", "Windows Subsystem for Linux 2", "Wireless Security Logger 2", "Web Server Linux 2"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "WSL2 stands for Windows Subsystem for Linux 2.", certTags: ["Security+"] },
          { question: "How do you access Windows files from Ubuntu in WSL2?", options: ["Copy them to Ubuntu manually", "Use the /mnt/ mount point", "They are not accessible", "Use a shared network folder"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "WSL2 automatically mounts Windows drives under /mnt/. C: becomes /mnt/c/, D: becomes /mnt/d/, etc.", certTags: ["A+"] }
        ]
      },
      {
        id: "we05d02",
        title: "Security Tool Installation",
        description: "Install all security tools needed for the course: nmap, metasploit, sqlmap, hashcat, john, nikto, hydra, gobuster, and more.",
        type: "learn",
        duration: "2-3 hours",
        content: \`:::objectives
- Install all required security tools in Ubuntu
- Verify each tool is working correctly
- Understand what each tool does
:::

## Install All Security Tools

Open Ubuntu and run:

\\\`\\\`\\\`bash
sudo apt update && sudo apt upgrade -y

sudo apt install -y nmap metasploit-framework sqlmap hashcat john \\
  nikto hydra gobuster dirb netcat curl wget python3 python3-pip \\
  git wireshark net-tools dnsutils traceroute whois
\\\`\\\`\\\`

## Verify Installation

\\\`\\\`\\\`bash
nmap --version
msfconsole --version
sqlmap --version
python3 --version
git --version
\\\`\\\`\\\`

:::checkpoint
All commands should return version numbers. If any fail, re-run the apt install command for that specific tool.
:::
\`,
        aiPrompt: "Explain the purpose of each security tool and what it will be used for.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "What security tools do you have installed and what does each one do?",
        interviewAnswer: "I have nmap for network scanning, metasploit for exploitation, sqlmap for SQL injection, hashcat and john for password cracking, nikto for web server scanning, hydra for brute force, gobuster for directory enumeration, and wireshark for packet analysis.",
        quiz: [
          { question: "What is nmap used for?", options: ["Network port scanning", "Password cracking", "SQL injection", "Web server scanning"], correctAnswerIndex: 0, difficulty: "beginner", explanation: "nmap is a network port scanner used to discover hosts and services on a network.", certTags: ["Security+"] },
          { question: "What is metasploit?", options: ["A password cracker", "An exploitation framework", "A web server", "A firewall"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "Metasploit is an exploitation framework used for penetration testing.", certTags: ["Security+"] }
        ]
      },
      {
        id: "we05d03",
        title: "Lab Organization & GitHub",
        description: "Create a structured workspace for your security work and set up GitHub for tracking your progress.",
        type: "practice",
        duration: "2-3 hours",
        content: \`:::objectives
- Create a structured pentest workspace
- Set up GitHub for write-ups and progress tracking
- Understand version control basics
:::

## Create Your Workspace

\\\`\\\`\\\`bash
mkdir -p ~/cybercamp/{tools,notes,labs,writeups,scripts}
cd ~/cybercamp
ls -la
\\\`\\\`\\\`

## Set Up Git

\\\`\\\`\\\`bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git init
git add .
git commit -m "Initial workspace setup"
\\\`\\\`\\\`

:::checkpoint
You have a structured workspace and Git is configured for version control.
:::
\`,
        aiPrompt: "Explain why organizing files and using version control matters for security professionals.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "How do you organize your work during a penetration test?",
        interviewAnswer: "I create a structured workspace with separate directories for tools, notes, labs, and write-ups. I use Git for version control to track changes and maintain a history of my findings.",
        quiz: [
          { question: "What does git init do?", options: ["Delete a repository", "Initialize a new Git repository", "Clone a repository", "Push to remote"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "git init creates a new Git repository in the current directory.", certTags: ["Linux+"] }
        ]
      },
      {
        id: "we05d04",
        title: "Linux File System & Permissions (Deeper Dive)",
        description: "Deep dive into Linux filesystem hierarchy, file types, permissions, SUID/SGID, sticky bit, and security implications.",
        type: "learn",
        duration: "3-4 hours",
        content: \`:::objectives
- Understand Linux directory structure and security implications
- Master permission system including SUID, SGID, and sticky bit
- Analyze /etc/passwd and /etc/shadow for security issues
:::

:::info
This topic goes deeper into Linux permissions. If you haven't completed the Linux Fundamentals module (Week 4), do that first - it covers the basics of chmod, chown, and SUID.
:::

## Linux Directory Structure

| Directory | Purpose | Security Relevance |
|-----------|---------|-------------------|
| /etc | System configuration | Password files, SSH configs |
| /var | Variable data | Logs (/var/log) |
| /tmp | Temporary files | Often world-writable |
| /home | User directories | User data and configs |
| /usr | User programs | Installed software |
| /proc | Process information | Runtime system data |

## File Types

\\\`\\\`\\\`bash
ls -la
\\\`\\\`\\\`

| Symbol | Type | Example |
|--------|------|---------|
| - | Regular file | script.sh |
| d | Directory | /home/user |
| l | Symbolic link | /usr/bin/python |
| c | Character device | /dev/null |
| b | Block device | /dev/sda |

## Advanced Permissions

### SUID (Set User ID)
Runs program with file owner's privileges:

\\\`\\\`\\\`bash
# Find SUID files
find / -perm -4000 -type f 2>/dev/null

# Check specific file
ls -la /usr/bin/passwd
# -rwsr-xr-x 1 root root ... (s = SUID)
\\\`\\\`\\\`

### SGID (Set Group ID)
Runs program with file group's privileges:

\\\`\\\`\\\`bash
find / -perm -2000 -type f 2>/dev/null
\\\`\\\`\\\`

### Sticky Bit
Prevents users from deleting files in shared directories:

\\\`\\\`\\\`bash
ls -la /tmp
# drwxrwxrwt ... (t = sticky bit)
\\\`\\\`\\\`

## /etc/passwd and /etc/shadow

\\\`\\\`\\\`bash
cat /etc/passwd
\\\`\\\`\\\`

Format: username:password:UID:GID:comment:home:shell

- UID 0 = root
- UID 1-999 = system accounts
- UID 1000+ = regular users
- /bin/bash = has shell access
- /usr/sbin/nologin = no shell access

:::checkpoint
What does the SUID bit (s in rws) do?
- Makes the file read-only
- Runs the program with the file owner's privileges
- Prevents the file from being deleted
- Encrypts the file
:::
\`,
        aiPrompt: "Explain Linux permissions, SUID/SGID, and their security implications.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "How do you find and exploit SUID binaries for privilege escalation?",
        interviewAnswer: "I use find / -perm -4000 to find SUID binaries. Then I check GTFOBins for exploitation methods. Common targets include find, vim, python, nmap - all can spawn a root shell if they have SUID set.",
        quiz: [
          { question: "What does SUID do?", options: ["Makes file read-only", "Runs with file owner's privileges", "Prevents deletion", "Encrypts file"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "SUID makes the program execute with the file owner's (usually root) privileges.", certTags: ["Security+"] },
          { question: "What does the sticky bit (t) do?", options: ["Makes file executable", "Prevents deletion of files in directory", "Encrypts directory", "Makes directory hidden"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "Sticky bit prevents users from deleting files owned by others in shared directories.", certTags: ["Linux+"] }
        ]
      },
      {
        id: "we05d05",
        title: "Linux Process Management & Services (Deeper Dive)",
        description: "Deep dive into Linux processes, systemd, services, cron jobs, and their security implications.",
        type: "learn",
        duration: "3-4 hours",
        content: \`:::objectives
- Understand process lifecycle and states in depth
- Master systemd service management
- Analyze cron jobs for security issues
- Monitor system resources effectively
:::

:::info
This topic goes deeper into Linux processes and services. If you haven't completed the Linux Fundamentals module (Week 4), do that first - it covers ps aux, top, kill, and process states.
:::

## Process Lifecycle

Every process goes through:
1. Created (fork from parent)
2. Running (executing on CPU)
3. Waiting (for I/O or event)
4. Zombie (finished, waiting for parent to collect status)
5. Terminated (cleaned up)

\\\`\\\`\\\`bash
# See all processes with full details
ps auxf  # f = forest (shows parent-child tree)

# See process tree
pstree -p
\\\`\\\`\\\`

## systemd Services

\\\`\\\`\\\`bash
# List all running services
systemctl list-units --type=service --state=running

# Check specific service
systemctl status sshd

# Start/stop/restart
sudo systemctl start apache2
sudo systemctl stop apache2
sudo systemctl restart apache2

# Enable/disable at boot
sudo systemctl enable apache2
sudo systemctl disable apache2
\\\`\\\`\\\`

## Cron Jobs

\\\`\\\`\\\`bash
# View current user's cron jobs
crontab -l

# Edit cron jobs
crontab -e

# System-wide cron
cat /etc/crontab
ls -la /etc/cron.d/
\\\`\\\`\\\`

:::checkpoint
What does systemctl enable do?
- Start the service immediately
- Make the service start automatically at boot
- Stop the service
- Restart the service
:::
\`,
        aiPrompt: "Explain Linux process management, systemd services, and cron jobs from a security perspective.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "How do you investigate suspicious processes and services on a Linux system?",
        interviewAnswer: "I use ps auxf to see the process tree, systemctl status to check service health, and crontab -l to review scheduled tasks. I look for processes running from unusual locations like /tmp, processes with high resource usage, and cron jobs that execute scripts from writable directories.",
        quiz: [
          { question: "What does systemctl enable do?", options: ["Start service immediately", "Make service start at boot", "Stop service", "Restart service"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "systemctl enable configures a service to start automatically when the system boots.", certTags: ["Linux+"] },
          { question: "What does ps auxf show?", options: ["Only running processes", "Process tree with parent-child relationships", "Network connections", "File contents"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "ps auxf shows all processes in a forest/tree format showing parent-child relationships.", certTags: ["Linux+"] }
        ]
      }
    ]
  }
`;

// Insert week05 module before the closing ];
const lastBracket = current.lastIndexOf('];');
current = current.substring(0, lastBracket) + week05Module + '\n];\n';

// Clean up the original reference file
fs.unlinkSync('C:/Users/user/Desktop/cyber/app/src/phases/phase0-original.ts');

fs.writeFileSync('C:/Users/user/Desktop/cyber/app/src/phases/phase0.ts', current, 'utf8');
console.log('Done! Added we00d00 and week05 module.');
