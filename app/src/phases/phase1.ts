export const phase1: Module[] = [
  {
    id: "week05",
    title: "Environment Setup",
    durationText: "Week 5 — 3 Days",
    focus: "Installing WSL2, Ubuntu, security tools, and organizing your lab workspace",
    output: "Fully configured WSL2 Ubuntu environment with all security tools installed and a GitHub repo for write-ups",
    topics: [
      {
        id: "we05d01",
        title: "WSL2 + Ubuntu Installation",
        description: "Enable WSL2 on Windows, install Ubuntu, configure Windows Terminal, and understand the Windows/Linux filesystem bridge.",
        type: "learn",
        duration: "4-5 hours",
        content: `:::objectives
- Enable the Windows Subsystem for Linux feature
- Install WSL2 and Ubuntu from the Microsoft Store
- Create your first Linux user account
- Update and upgrade Ubuntu packages
- Navigate the Windows/Linux filesystem bridge
- Configure Windows Terminal with an Ubuntu profile
:::

## Step 1: Enable WSL Feature

Open **PowerShell as Administrator** (right-click Start button → Windows Terminal (Admin)) and run:

\`\`\`powershell
wsl --install
\`\`\`

This command does three things automatically:
1. Enables the "Virtual Machine Platform" Windows feature
2. Enables the "Windows Subsystem for Linux" Windows feature
3. Downloads and installs the latest WSL2 Linux kernel
4. Sets WSL2 as the default version
5. Downloads Ubuntu from the Microsoft Store

**Expected output:**
\`\`\`
Installing: Windows Subsystem for Linux
The requested operation requires success until reboot...
Installing: Ubuntu
The requested operation requires success until reboot...
\`\`\`

:::warning
You MUST restart your computer after running \`wsl --install\`. The changes won't take effect until reboot.
:::

## Step 2: Launch Ubuntu and Create User

After restarting:

1. Open the **Microsoft Store** app
2. Search for **Ubuntu** (you'll see "Ubuntu" by Canonical)
3. Click **Open** (or launch from Start menu)

A terminal window will open showing:

\`\`\`
Installing, this may take a few minutes...
Please create a default UNIX user account.
The username should not include capital letters.
username:
\`\`\`

Type your desired username (all lowercase, no spaces):

\`\`\`
username: cyberlab
\`\`\`

Then enter a password when prompted (typing will not show characters — this is normal Linux behavior):

\`\`\`
password:
Retype password:
\`\`\`

:::tip
Your password won't be visible as you type. This is a security feature. Just type it and press Enter.
:::

**Expected output after setup:**
\`\`\`
Installation successful!
Welcome to Ubuntu 22.04.3 LTS
...
cyberlab@DESKTOP-XXXXXX:~$
\`\`\`

The \`$\` prompt means you're logged in and ready.

## Step 3: Update and Upgrade Packages

Run these commands in your Ubuntu terminal:

\`\`\`bash
sudo apt update
\`\`\`

This downloads the latest package lists from Ubuntu's repositories. You'll see lines like:

\`\`\`
Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
Reading package lists... Done
\`\`\`

:::info
\`sudo\` = "superuser do" — runs the command with administrator privileges. You'll be prompted for your password the first time.
:::

Now upgrade all installed packages to their latest versions:

\`\`\`bash
sudo apt upgrade -y
\`\`\`

The \`-y\` flag automatically answers "yes" to all confirmation prompts.

**Expected output:**
\`\`\`
Reading package lists... Done
Building dependency tree... Done
The following packages will be upgraded:
  ...
Do you want to continue? [Y/n] 
\`\`\`

This may take 5-15 minutes depending on your internet speed.

## Step 4: Understand the Filesystem Bridge

WSL2 lets you access Windows files from Linux and vice versa:

| You want to access | From where | Path |
|---|---|---|
| C:\\Users\\cyberlab\\Documents | WSL2 Ubuntu | \`/mnt/c/Users/cyberlab/Documents\` |
| WSL2 home directory | Windows Explorer | \\\\wsl$\\Ubuntu\\home\\cyberlab |
| D:\\tools | WSL2 Ubuntu | \`/mnt/d/tools\` |

Test it now:

\`\`\`bash
# List your Windows C: drive from Linux
ls /mnt/c/Users/

# Create a file in Linux that Windows can see
echo "Hello from WSL2" > /mnt/c/Users/cyberlab/Desktop/wsl-test.txt
\`\`\`

Now check your Windows Desktop — you should see \`wsl-test.txt\`.

:::checkpoint
1. What command enables WSL2 on Windows?
2. What does \`sudo apt update\` do versus \`sudo apt upgrade\`?
3. What is the path to access your Windows C: drive from WSL2?
4. Where are WSL2 files accessible from Windows Explorer?
:::

## Step 5: Configure Windows Terminal

1. Open **Windows Terminal** from the Start menu
2. Click the **down arrow** (▼) in the tab bar
3. You should see **Ubuntu** listed — click it to open a new Ubuntu tab
4. To make Ubuntu the default: press **Ctrl+,** to open Settings
5. Set **Default profile** to **Ubuntu**

:::tip
You can also pin Windows Terminal to your taskbar for quick access. Right-click the taskbar icon → Pin to taskbar.
:::
`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Why would an employer want you to use WSL2 instead of a full Linux VM for security testing?",
        interviewAnswer: "WSL2 shares the Windows host's network stack, making it easier to test internal tools without network isolation. It's faster to spin up than a full VM, uses less RAM, and integrates with Windows tools like VS Code. However, for malware analysis or full kernel exploitation, a dedicated VM with snapshots is safer.",
        quiz: [
          {
            question: "What PowerShell command installs WSL2 with Ubuntu as the default distribution?",
            options: ["wsl --install", "wsl --setup", "wsl --enable", "wsl --download ubuntu"],
            correctAnswerIndex: 0,
            difficulty: "beginner",
            explanation: "wsl --install enables WSL, installs the kernel, and sets Ubuntu as the default distribution.",
            certTags: ["CompTIA Security+", "CEH"]
          },
          {
            question: "After running wsl --install, what must you do before Ubuntu will work?",
            options: ["Run wsl --update", "Restart your computer", "Create a new user", "Install VirtualBox"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "WSL requires a reboot to enable the Virtual Machine Platform and WSL Windows features."
          },
          {
            question: "What does the command 'sudo apt update' do?",
            options: ["Installs all available updates", "Downloads the latest package lists from repositories", "Upgrades Ubuntu to the latest version", "Removes old packages"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "apt update only refreshes the local package index. apt upgrade actually installs the updates."
          },
          {
            question: "In WSL2, what is the path to access the Windows C: drive?",
            options: ["/c/", "/windows/c/", "/mnt/c/", "/drive/c/"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "WSL2 mounts Windows drives under /mnt/ — C: becomes /mnt/c/, D: becomes /mnt/d/, etc."
          },
          {
            question: "What does the -y flag do in 'sudo apt upgrade -y'?",
            options: ["Runs the upgrade in verbose mode", "Automatically answers yes to all prompts", "Only upgrades security packages", "Yields the CPU to background processes"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The -y flag confirms all prompts automatically, useful for scripted or non-interactive installs."
          },
          {
            question: "You want to access your WSL2 home directory from Windows Explorer. What path do you type in the address bar?",
            options: ["wsl://home", "\\\\wsl$\\Ubuntu\\home\\youruser", "file:///wsl2/", "\\\\.\\wsl\\home"],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Windows accesses WSL2 filesystems via the \\\\wsl$\\ network path, with the distro name as a subfolder."
          },
          {
            question: "What is the correct order of operations when setting up WSL2 from scratch?",
            options: [
              "Install Ubuntu → Enable WSL → Restart → Create user",
              "Enable WSL → Restart → Install Ubuntu → Create user → Update packages",
              "Install VirtualBox → Install WSL → Create user → Install Ubuntu",
              "Restart → Enable WSL → Install Ubuntu → Skip user creation"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "You must enable WSL first, restart to activate it, then install Ubuntu which handles user creation and package updates."
          },
          {
            question: "You create a file at /mnt/c/Users/you/Desktop/test.txt. Where does this file appear?",
            options: [
              "Only in the WSL2 filesystem",
              "On your Windows Desktop",
              "In the Windows Recycle Bin",
              "Nowhere — it's a virtual path"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The /mnt/c/ path maps directly to your C: drive, so files written there are visible from Windows."
          },
          {
            question: "Why does typing a password in the Ubuntu terminal show no characters?",
            options: [
              "The terminal is broken",
              "Linux doesn't support password input",
              "It's a security feature to prevent shoulder surfing",
              "You need to install a keyboard driver"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Linux terminals don't echo password characters to prevent onlookers from seeing the password length or characters."
          },
          {
            question: "What does the '$' symbol indicate in the Ubuntu terminal prompt?",
            options: [
              "You're logged in as root",
              "You're in a Bash subshell",
              "You're logged in as a regular user",
              "The command is still running"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "A $ prompt indicates a regular user. A # prompt indicates root or superuser access."
          },
          {
            question: "Which command would you run to see what Ubuntu version you're running inside WSL2?",
            options: ["wsl --version", "cat /etc/os-release", "ubuntu --version", "lsb-release --all"],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "cat /etc/os-release displays detailed OS information. lsb_release -a also works but is less common."
          },
          {
            question: "What is the key difference between WSL1 and WSL2?",
            options: [
              "WSL1 uses a real Linux kernel, WSL2 uses translation",
              "WSL2 uses a real Linux kernel in a lightweight VM, WSL1 translates system calls",
              "WSL2 only supports Ubuntu, WSL1 supports all distros",
              "There is no functional difference"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "WSL2 runs a real Linux kernel via Hyper-V, providing full syscall compatibility. WSL1 translates Windows/Linux system calls."
          },
          {
            question: "You run 'sudo apt update && sudo apt upgrade -y'. What does the && operator do?",
            options: [
              "Runs both commands simultaneously",
              "Runs the second command only if the first succeeds",
              "Combines the output of both commands",
              "Runs the second command regardless of the first"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The && operator is a logical AND — it only runs the next command if the previous one returned exit code 0 (success)."
          }
        ]
      },
      {
        id: "we05d02",
        title: "Security Tool Installation",
        description: "Install and verify essential security tools: VS Code with WSL extension, Burp Suite, Wireshark, nmap, gobuster, nikto, sqlmap, John the Ripper, Hashcat, and utility packages.",
        type: "learn",
        duration: "4-5 hours",
        content: `:::objectives
- Install VS Code with Remote-WSL extension
- Install Burp Suite Community Edition on Windows
- Install Wireshark on Windows
- Install nmap, gobuster, nikto, sqlmap, John, Hashcat, and utility packages in WSL2
- Verify every tool works correctly
:::

## Step 1: Install VS Code + Remote-WSL Extension

### Install VS Code on Windows

1. Go to https://code.visualstudio.com/
2. Click the **Windows** download button
3. Run the installer — accept defaults, but **check these boxes**:
   - ✅ Add "Open with Code" to the context menu
   - ✅ Add to PATH
   - ✅ Register Code as an editor for supported file types

### Install the Remote-WSL Extension

1. Open VS Code
2. Press **Ctrl+Shift+X** to open Extensions
3. Search for **Remote - WSL** (by Microsoft)
4. Click **Install**

### Test the Connection

Open your Ubuntu terminal and type:

\`\`\`bash
code .
\`\`\`

This opens VS Code connected to WSL2. The bottom-left corner should show:

\`\`\`
>< WSL: Ubuntu
\`\`\`

:::info
When you run \`code .\` from WSL2, VS Code opens with full Linux filesystem access. Extensions install inside WSL2, not on Windows.
:::

## Step 2: Install Burp Suite Community Edition (Windows)

1. Go to https://portswigger.net/burp/communitydownload
2. Download **Burp Suite Community Edition** for Windows
3. Run the installer — accept all defaults
4. Launch Burp Suite and select **Temporary Project** → **Use Burp defaults**

:::tip
Burp Suite Community is free and sufficient for this course. The Professional edition adds automated scanning and is used in professional pentesting.
:::

**Verify it works:**
- Burp opens with the Proxy tab visible
- The built-in browser (Proxy → Intercept) loads pages successfully

## Step 3: Install Wireshark (Windows)

1. Go to https://www.wireshark.org/download.html
2. Download the **Windows Installer (64-bit)**
3. Run the installer — accept defaults
4. When prompted, **check ✅ Install Npcap** (required for packet capture)
5. In the Npcap installer, check **✅ Install in WinPcap API-compatible Mode**

**Verify it works:**
- Launch Wireshark
- You should see network interfaces listed (Ethernet, Wi-Fi, WSL)
- Click your active interface and click the blue shark fin ▶ to start capture

## Step 4: Install Security Tools in WSL2 Ubuntu

Open your Ubuntu terminal and run these commands:

### Network Scanning

\`\`\`bash
# Nmap — network scanner
sudo apt install nmap -y
nmap --version
\`\`\`

**Expected output:**
\`\`\`
Nmap version 7.93 ( https://nmap.org )
Platform: x86_64-pc-linux-gnu
\`\`\`

### Web Directory Brute-Forcing

\`\`\`bash
# Gobuster — directory/file/DNS brute-forcer
sudo apt install gobuster -y
gobuster version
\`\`\`

### Web Vulnerability Scanning

\`\`\`bash
# Nikto — web server scanner
sudo apt install nikto -y
nikto -Version
\`\`\`

### SQL Injection Testing

\`\`\`bash
# SQLMap — automated SQL injection tool
sudo apt install sqlmap -y
sqlmap --version
\`\`\`

### Password Cracking

\`\`\`bash
# John the Ripper — password cracker
sudo apt install john -y
john --version

# Hashcat — GPU-accelerated password cracker
sudo apt install hashcat -y
hashcat --version
\`\`\`

:::warning
Hashcat requires a GPU for full functionality. In WSL2 without GPU passthrough, it will work in CPU-only mode. We'll configure GPU access later.
:::

### Utility Packages

\`\`\`bash
# curl — HTTP requests from command line
sudo apt install curl -y
curl --version

# wget — file downloader
sudo apt install wget -y
wget --version

# netcat — TCP/UDP connections (Swiss army knife of networking)
sudo apt install netcat-openbsd -y
nc -h

# git — version control
sudo apt install git -y
git --version
\`\`\`

## Step 5: Verify All Tools

Run this one-liner to verify everything installed:

\`\`\`bash
echo "=== Tool Verification ===" && \\
echo "nmap: $(nmap --version | head -1)" && \\
echo "gobuster: $(gobuster version 2>&1 | head -1)" && \\
echo "nikto: $(nikto -Version 2>&1 | head -1)" && \\
echo "sqlmap: $(sqlmap --version 2>&1)" && \\
echo "john: $(john --version 2>&1 | head -1)" && \\
echo "hashcat: $(hashcat --version 2>&1 | head -1)" && \\
echo "curl: $(curl --version | head -1)" && \\
echo "wget: $(wget --version | head -1 | cut -d' ' -f3)" && \\
echo "git: $(git --version)" && \\
echo "python3: $(python3 --version)"
\`\`\`

**Expected output:**
\`\`\`
=== Tool Verification ===
nmap: Nmap version 7.93
gobuster: gobuster 3.6
nikto: No version specific, Nikto
sqlmap: 1.7.12
john: john 2.2.0
hashcat: v6.2.6
curl: curl 7.81.0
wget: 1.21.2
git: git version 2.34.1
python3: Python 3.10.12
\`\`\`

:::checkpoint
1. What VS Code extension connects to WSL2?
2. What is the difference between apt update and apt upgrade?
3. Which tool would you use to scan for open ports on a target?
4. Why do you need Npcap when installing Wireshark?
5. Name two password cracking tools installed in this lesson.
:::

## Tool Quick Reference

| Tool | Purpose | Example Command |
|---|---|---|
| nmap | Port scanning | \`nmap -sV -sC 192.168.1.1\` |
| gobuster | Directory brute-force | \`gobuster dir -u http://target -w wordlist.txt\` |
| nikto | Web server scan | \`nikto -h http://target\` |
| sqlmap | SQL injection | \`sqlmap -u "http://target/?id=1"\` |
| john | Password cracking | \`john --wordlist=rockyou.txt hashes.txt\` |
| hashcat | GPU password cracking | \`hashcat -m 0 hashes.txt wordlist.txt\` |
| curl | HTTP requests | \`curl -I http://target\` |
| nc | Netcat connections | \`nc -zv target 1-1000\` |
`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "You need to test a web application for SQL injection. Walk me through your tool selection and approach.",
        interviewAnswer: "I would start with manual testing using Burp Suite to intercept and modify requests. For automation, I'd use sqlmap with --forms and --batch flags to test all forms automatically. I'd also use nikto for a general web vulnerability scan first to identify the technology stack, then target specific parameters with sqlmap for deeper injection testing.",
        quiz: [
          {
            question: "What VS Code extension allows you to develop directly in WSL2?",
            options: ["WSL Toolkit", "Remote - WSL", "Linux Extension Pack", "Ubuntu Connector"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The Remote - WSL extension by Microsoft lets VS Code run extensions inside WSL2 while using the Windows GUI."
          },
          {
            question: "Which tool is specifically designed for automated SQL injection testing?",
            options: ["nikto", "gobuster", "sqlmap", "nmap"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "sqlmap automates the detection and exploitation of SQL injection flaws in database servers."
          },
          {
            question: "What command installs a package and automatically answers yes to prompts in apt?",
            options: ["sudo apt install package --yes", "sudo apt install package -y", "sudo apt install package --force", "sudo apt install package --auto"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The -y flag tells apt to automatically answer yes to all confirmation prompts."
          },
          {
            question: "What is the primary purpose of gobuster?",
            options: ["Port scanning", "Password cracking", "Directory and file brute-forcing", "Packet capture"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Gobuster brute-forces URIs (directories and files), DNS subdomains, and virtual host names."
          },
          {
            question: "Why must you install Npcap when installing Wireshark on Windows?",
            options: [
              "Npcap provides the GUI for Wireshark",
              "Npcap is required to capture network traffic on Windows",
              "Npcap decrypts encrypted traffic",
              "Npcap is only needed for wireless adapters"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Npcap (or WinPcap) is the packet capture driver that allows Wireshark to intercept network packets at the OS level."
          },
          {
            question: "You run 'nc -zv 192.168.1.1 80'. What does this command do?",
            options: [
              "Downloads a file from 192.168.1.1 port 80",
              "Scans if port 80 is open on 192.168.1.1 with verbose output",
              "Creates a reverse shell on port 80",
              "Sends an email to 192.168.1.1"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The -z flag makes netcat scan without sending data, and -v enables verbose output to show if the port is open."
          },
          {
            question: "What does 'code .' do when run from the WSL2 Ubuntu terminal?",
            options: [
              "Opens the current directory in Windows Explorer",
              "Opens VS Code connected to the WSL2 filesystem",
              "Creates a new file called code",
              "Lists all installed VS Code extensions"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Running 'code .' from WSL2 launches VS Code with the Remote-WSL extension, opening the current Linux directory."
          },
          {
            question: "Which tool would you use to discover hidden directories on a web server?",
            options: ["john", "hashcat", "gobuster", "nmap"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Gobuster brute-forces directory paths using a wordlist to find hidden files and folders on web servers."
          },
          {
            question: "What is the difference between John the Ripper and Hashcat?",
            options: [
              "John uses GPU acceleration, Hashcat uses CPU",
              "Hashcat supports GPU acceleration, John is CPU-only by default",
              "They are identical tools with different names",
              "John is for Linux only, Hashcat is for Windows only"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Hashcat leverages GPU for massively parallel password cracking. John the Ripper uses CPU and is simpler for quick tasks."
          },
          {
            question: "You want to check what technology a web server is running. Which command gives you HTTP headers?",
            options: ["nmap -sV target", "curl -I http://target", "gobuster dir -u http://target", "nikto -h target"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "curl -I sends a HEAD request and displays HTTP response headers, revealing server software and technology."
          },
          {
            question: "What does the '-sV' flag do in nmap?",
            options: [
              "Scans all 65535 ports",
              "Performs service version detection on open ports",
              "Runs a stealth scan",
              "Outputs results in XML format"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The -sV flag probes open ports to determine what service and version is running on each port."
          },
          {
            question: "Which package provides netcat on Ubuntu?",
            options: ["netcat", "netcat-openbsd", "netcat-traditional", "ncat"],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "On modern Ubuntu, netcat-openbsd is the recommended package. It provides the nc command with enhanced features."
          },
          {
            question: "You run 'curl -I http://localhost'. What HTTP method does this use?",
            options: ["GET", "HEAD", "POST", "OPTIONS"],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The -I flag tells curl to use the HEAD method, which fetches only the headers without the response body."
          }
        ]
      },
      {
        id: "we05d03",
        title: "Lab Organization & GitHub",
        description: "Create a structured lab workspace, initialize a GitHub repository for write-ups, and verify all tools are operational.",
        type: "practice",
        duration: "3-4 hours",
        content: `:::objectives
- Create a standardized lab folder structure
- Initialize and configure git with your identity
- Create a GitHub repository for security write-ups
- Write a lab write-up template
- Run a full verification of all installed tools
:::

## Step 1: Create Lab Folder Structure

In your Ubuntu terminal:

\`\`\`bash
# Create the main directories
mkdir -p ~/labs/{web,network,crypto,malware}
mkdir -p ~/notes
mkdir -p ~/tools
mkdir -p ~/wordlists
\`\`\`

Verify the structure:

\`\`\`bash
tree ~/labs -L 2
\`\`\`

If \`tree\` isn't installed, install it or use:

\`\`\`bash
ls -R ~/labs
\`\`\`

**Expected structure:**
\`\`\`
/home/youruser/labs/
├── crypto/
├── malware/
├── network/
└── web/
\`\`\`

:::info
The \`{web,network,crypto,malware}\` syntax is brace expansion — Bash creates all four directories at once.
:::

## Step 2: Download Wordlists

Grab a starter wordlist for directory brute-forcing:

\`\`\`bash
# Download SecLists (common wordlists for security testing)
cd ~/wordlists
sudo apt install seclists -y

# If seclists package isn't available, download a subset:
curl -L -o common.txt https://raw.githubusercontent.com/danielmiessler/SecLists/master/Discovery/Web-Content/common.txt
\`\`\`

Check what you got:

\`\`\`bash
wc -l ~/wordlists/common.txt
# Should show ~4600+ lines
\`\`\`

## Step 3: Configure Git

\`\`\`bash
# Set your identity (use YOUR name and email)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Verify
git config --global --list
\`\`\`

:::tip
Use the same email as your GitHub account. This connects your local commits to your GitHub profile.
:::

## Step 4: Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: **security-lab-writeups**
3. Description: "My cybersecurity lab exercises and write-ups"
4. Select **Private** (keeps your notes secure)
5. Check ✅ Add a README file
6. Click **Create repository**

## Step 5: Clone and Set Up the Repo

\`\`\`bash
# Navigate to your notes directory
cd ~/notes

# Clone your new repo (replace YOUR_USERNAME)
git clone https://github.com/YOUR_USERNAME/security-lab-writeups.git
cd security-lab-writeups
\`\`\`

## Step 6: Create a Write-Up Template

\`\`\`bash
cat > ~/notes/security-lab-writeups/templates/writeup-template.md << 'EOF'
# [Lab Name]

**Date:** YYYY-MM-DD
**Category:** [Web/Network/Crypto/Malware]
**Tools Used:** [list tools]
**Difficulty:** [Beginner/Intermediate/Advanced]

## Objective
[What were you trying to accomplish?]

## Environment
- Target: [IP/URL]
- Attacker: [your IP]
- Tools: [specific versions]

## Methodology
### Step 1: Reconnaissance
[Commands run and results]

### Step 2: Enumeration
[Commands run and results]

### Step 3: Exploitation
[Commands run and results]

### Step 4: Post-Exploitation
[Commands run and results]

## Findings
[Summary of vulnerabilities found]

## Remediation
[How to fix each vulnerability]

## Lessons Learned
[What you learned, what you'd do differently]

## References
- [Links to relevant documentation]
EOF
\`\`\`

## Step 7: Push to GitHub

\`\`\`bash
cd ~/notes/security-lab-writeups

# Add the template
git add templates/

# Commit
git commit -m "Add write-up template"

# Push to GitHub
git push origin main
\`\`\`

:::warning
If git asks for credentials, you may need to set up a Personal Access Token. Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Generate New Token.
:::

## Step 8: Full Tool Verification Checklist

Run each command and confirm you see valid output:

\`\`\`bash
echo "====== TOOL VERIFICATION ======"

echo -n "nmap: "
nmap --version 2>/dev/null | head -1 || echo "NOT INSTALLED"

echo -n "gobuster: "
gobuster version 2>&1 | head -1 || echo "NOT INSTALLED"

echo -n "nikto: "
nikto -Version 2>&1 | head -1 || echo "NOT INSTALLED"

echo -n "sqlmap: "
sqlmap --version 2>&1 || echo "NOT INSTALLED"

echo -n "john: "
john --version 2>&1 | head -1 || echo "NOT INSTALLED"

echo -n "hashcat: "
hashcat --version 2>&1 || echo "NOT INSTALLED"

echo -n "python3: "
python3 --version 2>&1 || echo "NOT INSTALLED"

echo -n "git: "
git --version 2>&1 || echo "NOT INSTALLED"

echo -n "curl: "
curl --version 2>/dev/null | head -1 || echo "NOT INSTALLED"

echo -n "wget: "
wget --version 2>/dev/null | head -1 || echo "NOT INSTALLED"

echo -n "nc (netcat): "
nc -h 2>&1 | head -1 || echo "NOT INSTALLED"

echo "====== ALL DONE ======"
\`\`\`

:::checkpoint
Every tool should report a version number. If any shows "NOT INSTALLED", go back to Day 2 and reinstall that tool.
:::

## Lab Folder Structure Summary

\`\`\`
~/
├── labs/
│   ├── web/          # Web application testing
│   ├── network/      # Network scanning and analysis
│   ├── crypto/       # Cryptography exercises
│   └── malware/      # Malware analysis
├── notes/
│   └── security-lab-writeups/  # GitHub repo
├── tools/            # Custom scripts and tools
└── wordlists/        # Password and directory lists
\`\`\`

## Quick Reference: Your First Commands

Test nmap against your own machine (safe practice):

\`\`\`bash
# Scan yourself — always safe to scan localhost
nmap 127.0.0.1

# Scan with version detection
nmap -sV 127.0.0.1

# Quick scan of common ports
nmap -F 127.0.0.1
\`\`\`

:::tip
Always practice on your own systems first. Scanning systems you don't own without permission is illegal.
:::
`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "How do you organize your security testing workspace and why does structure matter?",
        interviewAnswer: "I use a standardized folder structure separating labs by category (web, network, crypto, malware), maintain notes in a Git repository for version control, and keep wordlists and tools organized. This structure ensures reproducibility of tests, easy knowledge retrieval, and professional documentation practices that employers expect.",
        quiz: [
          {
            question: "What does the mkdir -p ~/labs/{web,network,crypto,malware} command do?",
            options: [
              "Creates one directory named 'web network crypto malware'",
              "Creates four separate directories under ~/labs/",
              "Downloads four security tools",
              "Creates a compressed archive of lab folders"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Brace expansion {a,b,c,d} creates multiple directories in a single command."
          },
          {
            question: "Why should your GitHub security write-up repository be set to Private?",
            options: [
              "GitHub doesn't allow public security repos",
              "To prevent unauthorized users from seeing vulnerability details and target info",
              "Private repos have more storage space",
              "It's required by CompTIA"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Security write-ups may contain sensitive information about targets, IPs, and vulnerabilities that shouldn't be publicly accessible."
          },
          {
            question: "What does 'git config --global user.name' set?",
            options: [
              "Your GitHub password",
              "The name attached to all your git commits",
              "Your SSH key passphrase",
              "The default branch name"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Git config sets metadata that's attached to every commit you make, including your name and email."
          },
          {
            question: "Which command downloads files from a URL in the terminal?",
            options: ["curl", "git pull", "apt download", "wget"],
            correctAnswerIndex: 3,
            difficulty: "beginner",
            explanation: "wget is a dedicated file downloader. curl can also download files but wget is purpose-built for this."
          },
          {
            question: "What is the purpose of a write-up template?",
            options: [
              "It auto-generates exploits",
              "It ensures consistent documentation format for every lab exercise",
              "It replaces the need for taking notes",
              "It connects to GitHub automatically"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Templates ensure every write-up follows the same structure, making it easier to review and reference later."
          },
          {
            question: "You want to scan your own machine for open ports. Which command is correct?",
            options: ["nmap 192.168.1.1", "nmap 127.0.0.1", "nmap localhost", "Both B and C"],
            correctAnswerIndex: 3,
            difficulty: "beginner",
            explanation: "Both 127.0.0.1 and 'localhost' refer to your own machine (loopback address). Either works."
          },
          {
            question: "What does the -F flag do in nmap?",
            options: [
              "Performs a fast scan of the most common ports",
              "Forces a scan even if the target is down",
              "Filters out filtered ports",
              "Outputs results to a file"
            ],
            correctAnswerIndex: 0,
            difficulty: "intermediate",
            explanation: "The -F flag tells nmap to scan only the most common 100 ports instead of all 1000 in the default scan."
          },
          {
            question: "You clone a GitHub repo and want to add a new file. What is the correct git workflow?",
            options: [
              "git commit → git add → git push",
              "git add filename → git commit -m 'message' → git push",
              "git push → git add → git commit",
              "git save → git commit → git push"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The correct order is: stage (add), commit (with message), then push to remote."
          },
          {
            question: "Why is it important to practice nmap on your own machine first?",
            options: [
              "nmap only works on localhost",
              "It's safe and legal, and helps you understand the output before scanning targets",
              "Your machine has more vulnerabilities",
              "It's required by the tool"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Scanning your own machine is always legal and safe, letting you learn nmap's output format before scanning networks."
          },
          {
            question: "What directory would you use to store password lists for John the Ripper?",
            options: ["~/tools/", "~/notes/", "~/wordlists/", "~/labs/web/"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "The ~/wordlists/ directory is specifically for password lists and directory wordlists."
          },
          {
            question: "You run 'wc -l ~/wordlists/common.txt' and get 4614. What does this mean?",
            options: [
              "The file is 4614 bytes",
              "The file contains 4614 lines (words/entries)",
              "The file has 4614 characters",
              "The file is 4614 KB"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "wc -l counts the number of lines in a file. Each line is typically one word or entry in a wordlist."
          },
          {
            question: "What is the purpose of the ~/tools/ directory?",
            options: [
              "To store downloaded software installers",
              "To store custom scripts and tools you create or download",
              "To store browser extensions",
              "To store Windows applications"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The ~/tools/ directory keeps your custom scripts, exploits, and third-party tools organized."
          },
          {
            question: "Which command shows the full directory structure recursively?",
            options: ["ls", "tree ~/labs -L 2", "find ~/labs", "dir /s"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "tree displays directories in a tree-like format. -L 2 limits the depth to 2 levels."
          }
        ]
      }
    ]
  },
  {
    id: "week06",
    title: "Python for Security Automation",
    durationText: "Week 6 — 3 Days",
    focus: "Python fundamentals, security libraries, and building custom scanning tools",
    output: "Working Python scripts for port scanning, directory brute-forcing, log parsing, and security header analysis",
    topics: [
      {
        id: "we06d01",
        title: "Python Foundations",
        description: "Master Python basics: variables, data types, strings, loops, conditionals, functions, and file I/O with security-focused examples.",
        type: "learn",
        duration: "5-6 hours",
        content: `:::objectives
- Verify Python 3 is installed and working
- Understand variables and data types
- Use string operations for security tasks
- Write loops and conditionals
- Define functions with parameters and return values
- Perform file I/O operations
- Complete security-focused coding exercises
:::

## Step 1: Verify Python Installation

\`\`\`bash
python3 --version
\`\`\`

**Expected output:**
\`\`\`
Python 3.10.12
\`\`\`

If Python 3 isn't installed:

\`\`\`bash
sudo apt install python3 -y
\`\`\`

Also install pip (Python package manager):

\`\`\`bash
sudo apt install python3-pip -y
\`\`\`

:::info
Python 3 is the current version. Python 2 is end-of-life. Always use \`python3\` to invoke the correct version.
:::

## Step 2: Start the Python Shell

\`\`\`bash
python3
\`\`\`

You'll see the Python prompt:

\`\`\`
Python 3.10.12 (main, May 27 2022, 17:12:29) [GCC 11.2.0] on linux
Type "help" for more information.
>>>
\`\`\`

Type \`exit()\` to leave the Python shell.

## Step 3: Variables and Data Types

Type these in the Python shell (after the \`>>>\` prompt):

\`\`\`python
# Strings
target_ip = "192.168.1.1"
target_url = "http://example.com"
scan_type = "nmap -sV"

# Integers
open_ports = 5
timeout = 30
port_start = 1
port_end = 1024

# Booleans
is_vulnerable = True
scan_complete = False

# Lists (arrays)
ports = [22, 80, 443, 8080, 8443]
open_ports_list = []
services = ["ssh", "http", "https"]

# Dictionaries (key-value pairs)
target_info = {
    "ip": "192.168.1.1",
    "hostname": "webserver.local",
    "os": "Ubuntu 22.04",
    "open_ports": [22, 80, 443]
}

# Print values
print(target_ip)
print(f"Scanning {target_ip} on ports {ports}")
print(target_info["hostname"])
\`\`\`

**Output:**
\`\`\`
192.168.1.1
Scanning 192.168.1.1 on ports [22, 80, 443, 8080, 8443]
webserver.local
\`\`\`

:::tip
Use f-strings (f"...") for easy string interpolation. Put variables inside curly braces {}.
:::

## Step 4: String Operations

\`\`\`python
# Common string operations for security
user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# Check if a string contains something
if "Windows" in user_agent:
    print("Windows user detected")

# Split strings (parsing logs)
log_line = "192.168.1.10 - - [22/Jun/2026:10:30:45] GET /admin HTTP/1.1 403"
parts = log_line.split()
ip_address = parts[0]
timestamp = log_line.split("[")[1].split("]")[0]
status_code = parts[-1]

print(f"IP: {ip_address}")
print(f"Time: {timestamp}")
print(f"Status: {status_code}")

# String formatting
nmap_command = f"nmap -sV -p {port_start}-{port_end} {target_ip}"
print(nmap_command)

# Lowercase/uppercase for comparison
response = "HTTP/1.1 200 OK"
if response.lower().startswith("http/1.1 200"):
    print("Successful response")

# Replace and strip
password_hash = "  5f4dcc3b5aa765d61d8327deb882cf99  "
clean_hash = password_hash.strip()
print(f"Clean hash: {clean_hash}")

# Check string length
api_key = "abc123def456"
if len(api_key) < 16:
    print("Warning: API key too short")
\`\`\`

**Output:**
\`\`\`
Windows user detected
IP: 192.168.1.10
Time: 22/Jun/2026:10:30:45
Status: 403
nmap -sV -p 1-1024 192.168.1.1
Successful response
Clean hash: 5f4dcc3b5aa765d61d8327deb882cf99
Warning: API key too short
\`\`\`

## Step 5: Loops

\`\`\`python
# For loop — iterate over a list of targets
targets = ["192.168.1.1", "192.168.1.2", "192.168.1.3"]

for target in targets:
    print(f"Scanning {target}...")

# For loop with range — scan ports
common_ports = [21, 22, 25, 53, 80, 443, 445, 3389]

print("\\nCommon ports to scan:")
for i, port in enumerate(common_ports):
    print(f"  {i+1}. Port {port}")

# While loop — keep trying until successful
attempts = 0
max_attempts = 3

while attempts < max_attempts:
    attempts += 1
    print(f"Connection attempt {attempts}/{max_attempts}")
    # Simulating a failed connection
    connected = False
    if not connected:
        print("  Failed, retrying...")
        continue
    break

print(f"Total attempts: {attempts}")

# List comprehension — quick way to generate port ranges
web_ports = [80, 443, 8000, 8080, 8443, 8888]
filtered_ports = [p for p in web_ports if p > 8000]
print(f"High ports: {filtered_ports}")
\`\`\`

**Output:**
\`\`\`
Scanning 192.168.1.1...
Scanning 192.168.1.2...
Scanning 192.168.1.3...

Common ports to scan:
  1. Port 21
  2. Port 22
  ...
  8. Port 3389
Connection attempt 1/3
  Failed, retrying...
Connection attempt 2/3
  Failed, retrying...
Connection attempt 3/3
  Failed, retrying...
Total attempts: 3
High ports: [8080, 8443, 8888]
\`\`\`

## Step 6: Conditionals

\`\`\`python
# Check port status
port = 443
service = "https"

if port == 22:
    print("SSH — possible brute-force target")
elif port == 80 or port == 443:
    print(f"Web server on {service} — check for web vulnerabilities")
elif port == 3306:
    print("MySQL — check for SQL injection")
elif port == 445:
    print("SMB — check for EternalBlue or null session")
else:
    print(f"Port {port} ({service}) — investigate further")

# Check HTTP status code
status_code = 403

if status_code == 200:
    print("Resource accessible")
elif status_code == 301 or status_code == 302:
    print("Redirect — follow the redirect")
elif status_code == 403:
    print("Forbidden — might need authentication bypass")
elif status_code == 404:
    print("Not found — path doesn't exist")
elif status_code >= 500:
    print("Server error — potential for input-based attacks")

# Multiple conditions
is_admin = True
is_authenticated = True

if is_admin and is_authenticated:
    print("Full access granted")
elif is_authenticated and not is_admin:
    print("Standard user access")
else:
    print("Access denied — login required")
\`\`\`

**Output:**
\`\`\`
Web server on https — check for web vulnerabilities
Forbidden — might need authentication bypass
Full access granted
\`\`\`

## Step 7: Functions

\`\`\`python
# Function with parameters and return value
def scan_port(ip, port, timeout=2):
    """Attempt to connect to a specific port."""
    import socket
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        result = sock.connect_ex((ip, port))
        sock.close()
        if result == 0:
            return True
        return False
    except Exception as e:
        return False

# Function with multiple return values
def parse_nmap_output(line):
    """Parse a single line of nmap output."""
    parts = line.strip().split()
    if len(parts) >= 3:
        port = parts[0]
        state = parts[1]
        service = parts[2]
        return port, state, service
    return None, None, None

# Function with default parameters
def create_nmap_command(target, ports="1-1000", scan_type="-sV", extra_args=""):
    """Build an nmap command string."""
    cmd = f"nmap {scan_type} -p {ports} {extra_args} {target}"
    return cmd.strip()

# Using the functions
print(create_nmap_command("192.168.1.1"))
print(create_nmap_command("10.0.0.1", ports="22,80,443", extra_args="-A"))

# Function that processes a list
def filter_open_ports(all_ports, target_ip):
    """Scan a list of ports and return only open ones."""
    open_ports = []
    for port in all_ports:
        if scan_port(target_ip, port):
            open_ports.append(port)
    return open_ports

# Lambda functions (inline one-liners)
is_privileged = lambda port: port < 1024
print(f"Port 80 privileged: {is_privileged(80)}")
print(f"Port 8080 privileged: {is_privileged(8080)}")
\`\`\`

**Output:**
\`\`\`
nmap -sV -p 1-1000  192.168.1.1
nmap -sV -p 22,80,443 -A 10.0.0.1
Port 80 privileged: True
Port 8080 privileged: False
\`\`\`

## Step 8: File I/O

\`\`\`python
import os

# Create a lab directory if it doesn't exist
lab_dir = os.path.expanduser("~/labs/python")
os.makedirs(lab_dir, exist_ok=True)

# Write to a file
targets_file = os.path.join(lab_dir, "targets.txt")
with open(targets_file, "w") as f:
    f.write("192.168.1.1\\n")
    f.write("192.168.1.2\\n")
    f.write("192.168.1.3\\n")
    f.write("10.0.0.1\\n")

print(f"Written targets to {targets_file}")

# Read the file back
with open(targets_file, "r") as f:
    content = f.read()
    print(f"File contents:\\n{content}")

# Read line by line
with open(targets_file, "r") as f:
    for line in f:
        ip = line.strip()
        if ip:  # skip empty lines
            print(f"Target: {ip}")

# Append to a file
results_file = os.path.join(lab_dir, "results.txt")
with open(results_file, "a") as f:
    f.write("Scan started\\n")

# Read and write simultaneously (copy with modification)
backup_file = os.path.join(lab_dir, "targets_backup.txt")
with open(targets_file, "r") as src, open(backup_file, "w") as dst:
    for line in src:
        dst.write(line.strip() + " (unscanned)\\n")

print("Backup created")
\`\`\`

## Step 9: Security-Focused Example — Log Parser

\`\`\`python
import os

# Create a sample auth.log
log_dir = os.path.expanduser("~/labs/web")
os.makedirs(log_dir, exist_ok=True)

sample_log = """Jun 22 10:01:23 server sshd[1234]: Failed password for root from 192.168.1.100 port 22 ssh2
Jun 22 10:01:25 server sshd[1235]: Failed password for admin from 192.168.1.100 port 22 ssh2
Jun 22 10:01:27 server sshd[1236]: Failed password for root from 192.168.1.100 port 22 ssh2
Jun 22 10:02:01 server sshd[1237]: Accepted publickey for user1 from 10.0.0.5 port 22 ssh2
Jun 22 10:02:15 server sshd[1238]: Failed password for root from 192.168.1.100 port 22 ssh2
Jun 22 10:03:00 server sshd[1239]: Failed password for root from 10.0.0.99 port 22 ssh2
Jun 22 10:03:05 server sshd[1240]: Connection closed by authenticating user root 192.168.1.100 port 22 [preauth]
Jun 22 10:04:00 server sshd[1241]: Accepted password for test from 192.168.1.50 port 22 ssh2
"""

log_path = os.path.join(log_dir, "auth.log")
with open(log_path, "w") as f:
    f.write(sample_log)

# Parse the log
failed_attempts = {}
success_logins = []

with open(log_path, "r") as f:
    for line in f:
        if "Failed password" in line:
            # Extract IP address
            parts = line.split("from ")
            if len(parts) > 1:
                ip = parts[1].split(" ")[0]
                failed_attempts[ip] = failed_attempts.get(ip, 0) + 1
        elif "Accepted" in line:
            parts = line.split("for ")
            if len(parts) > 1:
                username = parts[1].split(" from ")[0]
                success_logins.append(username)

# Report
print("=== Failed Login Attempts ===")
for ip, count in sorted(failed_attempts.items(), key=lambda x: x[1], reverse=True):
    status = "BLOCK" if count >= 3 else "WATCH"
    print(f"  {ip}: {count} attempts [{status}]")

print(f"\\n=== Successful Logins ===")
for user in success_logins:
    print(f"  {user}")
\`\`\`

**Output:**
\`\`\`
=== Failed Login Attempts ===
  192.168.1.100: 4 attempts [BLOCK]
  10.0.0.99: 1 attempts [WATCH]

=== Successful Logins ===
  user1
  test
\`\`\`

:::checkpoint
1. What is the difference between a list and a dictionary in Python?
2. Write a for loop that prints numbers 1-10.
3. What does the 'with' statement do when opening files?
4. How do you create an f-string with a variable inside?
5. What does socket.connect_ex() return when a port is open?
:::
`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Why is Python preferred over Bash scripting for security automation?",
        interviewAnswer: "Python has richer libraries for network interactions (socket, requests), string processing (re for regex), and data handling. It's cross-platform, has better error handling, and scales to larger projects. Bash is great for quick one-liners but Python excels at building reusable tools, handling complex logic, and maintaining code over time.",
        quiz: [
          {
            question: "What is the output of: print(type(42))?",
            options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'number'>"],
            correctAnswerIndex: 0,
            difficulty: "beginner",
            explanation: "42 is an integer, so type(42) returns <class 'int'>."
          },
          {
            question: "What does the 'with' statement do when opening files?",
            options: [
              "It reads the entire file into memory",
              "It automatically closes the file when the block exits",
              "It creates a backup of the file",
              "It locks the file for other processes"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The 'with' statement is a context manager that ensures the file is properly closed even if an exception occurs."
          },
          {
            question: "What is the correct way to create an f-string with a variable?",
            options: [
              '"Hello $name"',
              '"Hello {name}".format(name=name)',
              'f"Hello {name}"',
              '"Hello" + name'
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "F-strings (f\"...\") let you embed variables directly in curly braces inside the string."
          },
          {
            question: "What does socket.connect_ex() return when a port is open?",
            options: ["1", "0", "True", "None"],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "connect_ex() returns 0 when the connection succeeds (port open), and a non-zero error code when it fails."
          },
          {
            question: "What does 'for i, port in enumerate(ports):' give you?",
            options: [
              "Only the port numbers",
              "Only the indices",
              "Both the index and port number for each item",
              "A random port from the list"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "enumerate() returns tuples of (index, value) for each item in the iterable."
          },
          {
            question: "What is a dictionary in Python?",
            options: [
              "An ordered collection of numbers",
              "A key-value pair data structure",
              "A function that looks up words",
              "A file format for storing data"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "A dictionary stores data as key-value pairs, like {\"ip\": \"192.168.1.1\", \"port\": 80}."
          },
          {
            question: "What does 'except Exception as e:' catch?",
            options: [
              "Only syntax errors",
              "Only file not found errors",
              "Any exception and stores it in variable e",
              "No exceptions — it's a pass statement"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "Exception is the base class for most errors. Catching it with 'as e' stores the error message for debugging."
          },
          {
            question: "What is the output of: print('web' in {'app': 'http', 'web': 'https'}?)",
            options: ["True", "False", "web", "Error"],
            correctAnswerIndex: 0,
            difficulty: "beginner",
            explanation: "The 'in' operator checks if a key exists in a dictionary. 'web' is a key, so it returns True."
          },
          {
            question: "How do you expand ~ to the full home directory path in Python?",
            options: [
              "os.path.expanduser('~')",
              "~",
              "os.getcwd()",
              "os.path.join('~', '')"
            ],
            correctAnswerIndex: 0,
            difficulty: "intermediate",
            explanation: "os.path.expanduser('~') converts ~ to /home/username on Linux or C:\\Users\\username on Windows."
          },
          {
            question: "What does the 'continue' statement do in a loop?",
            options: [
              "Stops the loop entirely",
              "Skips to the next iteration of the loop",
              "Repeats the current iteration",
              "Exits the program"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "continue skips the rest of the current loop iteration and jumps to the next one."
          },
          {
            question: "You want to read a file line by line without loading the entire file. What's the best approach?",
            options: [
              "data = open(f).read()",
              "for line in open(f):",
              "data = f.readlines()",
              "data = pickle.load(f)"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Iterating over the file object reads one line at a time, which is memory-efficient for large files."
          },
          {
            question: "What does 'os.makedirs(path, exist_ok=True)' do?",
            options: [
              "Deletes the directory if it exists",
              "Creates directories recursively, no error if already exists",
              "Creates only the final directory in the path",
              "Moves files into the directory"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "makedirs creates all intermediate directories. exist_ok=True prevents errors if the directory already exists."
          },
          {
            question: "What is the output of: print(len([1,2,3,4,5]))?",
            options: ["4", "5", "6", "Error"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "len() returns the number of items in a list. There are 5 elements, so it returns 5."
          }
        ]
      },
      {
        id: "we06d02",
        title: "Security Libraries & Scripts",
        description: "Use Python's requests, socket, hashlib, and re modules to build a log parser and HTTP security header checker.",
        type: "practice",
        duration: "5-6 hours",
        content: `:::objectives
- Use the requests library to make HTTP requests
- Use the socket module for network connections
- Use hashlib for hashing strings
- Use re for regular expression pattern matching
- Build a complete log parser script
- Build an HTTP security header checker script
:::

## Part 1: HTTP Requests with requests

### Install requests (if not already available)

\`\`\`bash
pip3 install requests
\`\`\`

### Basic HTTP Operations

\`\`\`python
import requests

# GET request
response = requests.get("http://httpbin.org/get")
print(f"Status: {response.status_code}")
print(f"Headers: {dict(response.headers)}")

# HEAD request (headers only)
response = requests.head("http://httpbin.org/get")
print(f"Content-Type: {response.headers.get('Content-Type')}")

# POST request with data
data = {"username": "admin", "password": "test123"}
response = requests.post("http://httpbin.org/post", data=data)
print(f"POST status: {response.status_code}")

# Check specific headers
response = requests.get("http://example.com")
print(f"\\nServer: {response.headers.get('Server', 'Unknown')}")
print(f"X-Powered-By: {response.headers.get('X-Powered-By', 'Not set')}")
print(f"Content-Security-Policy: {response.headers.get('Content-Security-Policy', 'Not set')}")

# Handle errors gracefully
try:
    response = requests.get("http://nonexistent.invalid", timeout=5)
    print(f"Status: {response.status_code}")
except requests.exceptions.ConnectionError:
    print("Connection failed — host unreachable")
except requests.exceptions.Timeout:
    print("Request timed out")
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
\`\`\`

## Part 2: Socket Programming

\`\`\`python
import socket

# DNS resolution
hostname = "example.com"
ip = socket.gethostbyname(hostname)
print(f"{hostname} resolves to {ip}")

# Get full DNS info
try:
    result = socket.getaddrinfo(hostname, 80)
    for info in result[:2]:
        family, type, proto, canonname, sockaddr = info
        print(f"  {sockfamily_to_str(family)}: {sockaddr[0]}")
except socket.gaierror as e:
    print(f"DNS resolution failed: {e}")

# Simple port check
def check_port(ip, port, timeout=1):
    """Check if a single port is open."""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        result = sock.connect_ex((ip, port))
        sock.close()
        return result == 0
    except:
        return False

# Test a few ports
target = "127.0.0.1"
test_ports = [22, 80, 443, 3306, 8080]
for port in test_ports:
    status = "OPEN" if check_port(target, port) else "closed"
    print(f"  Port {port}: {status}")
\`\`\`

## Part 3: Hashing with hashlib

\`\`\`python
import hashlib

# Hash a string
message = "password123"

# MD5 (weak — don't use for security, but you'll see it in CTFs)
md5_hash = hashlib.md5(message.encode()).hexdigest()
print(f"MD5:    {md5_hash}")

# SHA-1 (also weak)
sha1_hash = hashlib.sha1(message.encode()).hexdigest()
print(f"SHA-1:  {sha1_hash}")

# SHA-256 (strong)
sha256_hash = hashlib.sha256(message.encode()).hexdigest()
print(f"SHA-256: {sha256_hash}")

# Hash a file (without loading entire file into memory)
def hash_file(filepath):
    """Calculate SHA-256 hash of a file."""
    sha256 = hashlib.sha256()
    with open(filepath, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            sha256.update(chunk)
    return sha256.hexdigest()

# Practical use: verify downloaded file integrity
# expected = "abc123..."
# actual = hash_file("/path/to/downloaded/file")
# if actual == expected:
#     print("File integrity verified")
# else:
#     print("File may be tampered with")

# Crack common hashes (demo)
known_hashes = {
    "5f4dcc3b5aa765d61d8327deb882cf99": "password",
    "e99a18c428cb38d5f260853678922e03": "abc123",
    "d8578edf8458ce06fbc5bb76a58c5ca4": "qwerty"
}

target_hash = "5f4dcc3b5aa765d61d8327deb882cf99"
if target_hash in known_hashes:
    print(f"\\nCracked: {target_hash} = {known_hashes[target_hash]}")
\`\`\`

**Output:**
\`\`\`
MD5:    482c811da5d5b4bc6d497ffa98491e38
SHA-1:  f7e50f897fb6c4608d6cd8e3f5d427348a3fa02f
SHA-256: ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f

Cracked: 5f4dcc3b5aa765d61d8327deb882cf99 = password
\`\`\`

## Part 4: Regular Expressions with re

\`\`\`python
import re

# Find all IP addresses in a string
log_data = """
192.168.1.1 - - [22/Jun/2026] "GET /admin" 403
10.0.0.5 - - [22/Jun/2026] "POST /login" 200
172.16.0.100 - - [22/Jun/2026] "GET /api/users" 401
Connection from 203.0.113.42 refused
"""

ip_pattern = r'\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b'
ips = re.findall(ip_pattern, log_data)
print("IPs found:", ips)

# Extract email addresses
text = "Contact admin@company.com or support@example.org for help"
email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
emails = re.findall(email_pattern, text)
print("Emails:", emails)

# Parse HTTP status codes
log_lines = [
    '192.168.1.1 "GET /index.html" 200',
    '192.168.1.2 "GET /admin" 403',
    '192.168.1.3 "POST /login" 500'
]

status_pattern = r'"(GET|POST|PUT|DELETE)\\s+(\\S+)\\s+HTTP/\\d.?"\\s+(\\d{3})'
for line in log_lines:
    match = re.search(status_pattern, line)
    if match:
        method, path, status = match.groups()
        print(f"  {method} {path} → {status}")

# Find all failed login attempts
auth_log = """
Failed password for root from 192.168.1.100 port 22
Failed password for admin from 192.168.1.100 port 22
Accepted password for user1 from 10.0.0.5 port 22
Failed password for root from 10.0.0.99 port 22
"""

failed_pattern = r'Failed password for (\\w+) from (\\S+)'
failures = re.findall(failed_pattern, auth_log)
print("\\nFailed logins:")
for user, ip in failures:
    print(f"  User: {user} from {ip}")

# Replace sensitive data (mask passwords in logs)
sensitive_log = 'User admin logged in with password=secret123 at 10:00'
masked = re.sub(r'password=\\S+', 'password=***MASKED***', sensitive_log)
print(f"\\nMasked: {masked}")
\`\`\`

## Part 5: Complete Log Parser Script

Save this as \`~/labs/web/log_parser.py\`:

\`\`\`python
#!/usr/bin/env python3
"""
Security Log Parser — extracts failed logins, suspicious IPs, and status codes.
Usage: python3 log_parser.py /path/to/auth.log
"""

import re
import sys
from collections import Counter

def parse_auth_log(filepath):
    """Parse an authentication log file."""
    failed_logins = []
    successful_logins = []
    ip_counter = Counter()
    
    failed_pattern = r'Failed password for (\w+) from (\S+) port (\d+)'
    success_pattern = r'Accepted (?:password|publickey) for (\w+) from (\S+) port (\d+)'
    
    with open(filepath, 'r') as f:
        for line_num, line in enumerate(f, 1):
            fail_match = re.search(failed_pattern, line)
            if fail_match:
                user, ip, port = fail_match.groups()
                failed_logins.append({
                    'line': line_num,
                    'user': user,
                    'ip': ip,
                    'port': port
                })
                ip_counter[ip] += 1
                continue
            
            success_match = re.search(success_pattern, line)
            if success_match:
                user, ip, port = success_match.groups()
                successful_logins.append({
                    'line': line_num,
                    'user': user,
                    'ip': ip,
                    'port': port
                })
    
    return failed_logins, successful_logins, ip_counter

def generate_report(failed, successful, ip_counter):
    """Generate a security report."""
    print("=" * 60)
    print("SECURITY LOG ANALYSIS REPORT")
    print("=" * 60)
    
    print(f"\\nTotal failed login attempts: {len(failed)}")
    print(f"Total successful logins: {len(successful)}")
    
    print("\\n--- Failed Login Summary ---")
    for ip, count in ip_counter.most_common(10):
        severity = "CRITICAL" if count >= 5 else "HIGH" if count >= 3 else "MEDIUM"
        print(f"  [{severity}] {ip}: {count} attempts")
    
    print("\\n--- Unique Targeted Users ---")
    users = set(f['user'] for f in failed)
    for user in sorted(users):
        attempts = sum(1 for f in failed if f['user'] == user)
        print(f"  {user}: {attempts} attempts")
    
    print("\\n--- Successful Logins ---")
    for s in successful:
        print(f"  {s['user']} from {s['ip']} on port {s['port']}")
    
    print("\\n" + "=" * 60)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <logfile>")
        sys.exit(1)
    
    failed, successful, ip_counter = parse_auth_log(sys.argv[1])
    generate_report(failed, successful, ip_counter)
\`\`\`

Test it:

\`\`\`bash
cd ~/labs/web
python3 log_parser.py auth.log
\`\`\`

## Part 6: Security Header Checker

Save this as \`~/labs/web/header_checker.py\`:

\`\`\`python
#!/usr/bin/env python3
"""
HTTP Security Header Checker — checks for recommended security headers.
Usage: python3 header_checker.py <url>
"""

import requests
import sys

SECURITY_HEADERS = {
    'Strict-Transport-Security': {
        'description': 'Enforces HTTPS connections',
        'severity': 'HIGH'
    },
    'Content-Security-Policy': {
        'description': 'Prevents XSS and injection attacks',
        'severity': 'HIGH'
    },
    'X-Content-Type-Options': {
        'description': 'Prevents MIME-type sniffing',
        'severity': 'MEDIUM'
    },
    'X-Frame-Options': {
        'description': 'Prevents clickjacking',
        'severity': 'MEDIUM'
    },
    'X-XSS-Protection': {
        'description': 'Legacy XSS filter (deprecated but still useful)',
        'severity': 'LOW'
    },
    'Referrer-Policy': {
        'description': 'Controls referrer information leakage',
        'severity': 'MEDIUM'
    },
    'Permissions-Policy': {
        'description': 'Controls browser feature access',
        'severity': 'LOW'
    }
}

def check_headers(url):
    """Check security headers for a given URL."""
    try:
        response = requests.get(url, timeout=10, allow_redirects=True)
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None
    
    headers = response.headers
    results = []
    
    print(f"\\nChecking: {url}")
    print(f"Status: {response.status_code}")
    print(f"Server: {headers.get('Server', 'Not disclosed')}")
    print("\\n--- Security Headers ---")
    
    for header, info in SECURITY_HEADERS.items():
        value = headers.get(header)
        if value:
            status = "PASS"
            print(f"  [PASS] {header}: {value[:50]}...")
        else:
            status = "MISSING"
            print(f"  [FAIL] {header}: Not set ({info['severity']} risk)")
        results.append((header, status, info['severity']))
    
    # Check for dangerous headers
    dangerous = ['X-Powered-By', 'Server']
    print("\\n--- Information Disclosure ---")
    for header in dangerous:
        value = headers.get(header)
        if value:
            print(f"  [WARN] {header}: {value} (consider removing)")
    
    # Summary
    passed = sum(1 for _, s, _ in results if s == "PASS")
    total = len(results)
    score = (passed / total) * 100
    print(f"\\nScore: {passed}/{total} headers present ({score:.0f}%)")
    
    return results

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <url>")
        sys.exit(1)
    
    url = sys.argv[1]
    if not url.startswith(('http://', 'https://')):
        url = 'http://' + url
    
    check_headers(url)
\`\`\`

Test it:

\`\`\`bash
cd ~/labs/web
python3 header_checker.py http://example.com
python3 header_checker.py https://google.com
\`\`\`

:::checkpoint
1. What does requests.get() return?
2. How do you extract all IP addresses from text using re?
3. What is the difference between MD5 and SHA-256?
4. Why should you use a timeout with requests.get()?
5. What does Counter do in Python's collections module?
:::
`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Explain the difference between a GET and a POST request, and when you'd use each in security testing.",
        interviewAnswer: "GET requests retrieve data and append parameters in the URL, making them visible in logs and browser history — useful for testing for parameter manipulation. POST requests send data in the request body, which is better for submitting forms, login credentials, and file uploads. In security testing, you test GET for URL-based injection and POST for form-based vulnerabilities like SQL injection.",
        quiz: [
          {
            question: "What does requests.get().status_code return?",
            options: ["The HTML content of the page", "The HTTP response status code", "The response headers", "The response time in milliseconds"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "status_code is an integer like 200, 404, or 500 indicating the result of the HTTP request."
          },
          {
            question: "What pattern would you use to match an IP address with re?",
            options: [
              "r'\\d+.\\d+.\\d+.\\d+'",
              "r'\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b'",
              "r'[0-9]*[0-9]*[0-9]*[0-9]*'",
              "r'IP=\\w+'"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The pattern matches exactly 4 groups of 1-3 digits separated by dots, with word boundaries."
          },
          {
            question: "Why is MD5 considered weak for security purposes?",
            options: [
              "It's too slow to compute",
              "It's vulnerable to collision attacks — different inputs can produce the same hash",
              "It only works on Windows",
              "It requires a GPU to compute"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "MD5 is cryptographically broken — attackers can easily create two different inputs that produce the same hash."
          },
          {
            question: "What does socket.connect_ex() return when a port is closed?",
            options: ["0", "1", "A non-zero error code", "None"],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "connect_ex returns 0 on success and a non-zero error code (like 111 for connection refused) on failure."
          },
          {
            question: "What is the purpose of the timeout parameter in requests.get()?",
            options: [
              "It limits the response size",
              "It prevents the request from hanging indefinitely",
              "It caches the response for that duration",
              "It retries the request after timeout"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Timeout prevents your script from hanging forever if the server doesn't respond."
          },
          {
            question: "What does re.findall() return?",
            options: [
              "The first match only",
              "A list of all matches",
              "True or False if any match exists",
              "The match object with details"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "findall returns a list of all non-overlapping matches in the string."
          },
          {
            question: "You want to hash a large file without loading it all into memory. What approach works?",
            options: [
              "open(f).read() then hashlib.sha256(data)",
              "Read in chunks using iter(lambda: f.read(8192), b\"\") and update the hash",
              "Use os.system() to call sha256sum",
              "There's no way to hash large files in Python"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "Reading in chunks (typically 8192 bytes) and calling hash.update() processes the file piece by piece."
          },
          {
            question: "What does the 'requests.exceptions.ConnectionError' exception handle?",
            options: [
              "Invalid URLs",
              "DNS resolution failure or refused connection",
              "HTTP 404 errors",
              "Timeout exceeded"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "ConnectionError catches network-level issues like DNS failures, connection refused, and unreachable hosts."
          },
          {
            question: "What is a Counter in Python's collections module?",
            options: [
              "A timer for measuring execution speed",
              "A dict subclass for counting hashable objects",
              "A counter for loop iterations",
              "A number formatting utility"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Counter creates a dictionary-like object that counts occurrences, with most_common() to get top items."
          },
          {
            question: "In the header checker script, why do we check for 'X-Powered-By'?",
            options: [
              "It improves performance",
              "It reveals server technology to attackers",
              "It's required by HTTP standards",
              "It enables caching"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "X-Powered-By reveals technology (PHP, ASP.NET) that attackers can use to find known vulnerabilities."
          },
          {
            question: "What does requests.get(url, allow_redirects=True) do?",
            options: [
              "Prevents any redirects",
              "Automatically follows HTTP redirects (301, 302)",
              "Only follows redirects to HTTPS",
              "Logs all redirects to console"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "allow_redirects=True makes requests follow redirects automatically, loading the final destination page."
          },
          {
            question: "How do you extract the matched groups from a re.search() result?",
            options: [
              "match.groups()",
              "match.items()",
              "match.findall()",
              "match.extract()"
            ],
            correctAnswerIndex: 0,
            difficulty: "beginner",
            explanation: "groups() returns a tuple of all captured groups from the match. match.group(1) gets a specific group."
          },
          {
            question: "Why do we use 'rb' mode when reading files for hashing?",
            options: [
              "It reads faster",
              "It reads the file as raw bytes, not decoded text",
              "It compresses the file first",
              "It's required by hashlib"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "Hashing requires bytes, not strings. 'rb' mode reads raw bytes without text encoding conversion."
          }
        ]
      },
      {
        id: "we06d03",
        title: "Port Scanner & Directory Brute-Forcer",
        description: "Build a threaded TCP port scanner and a directory brute-forcing tool from scratch using Python's socket and requests modules.",
        type: "project",
        duration: "5-6 hours",
        content: `:::objectives
- Build a TCP port scanner using the socket module
- Add multi-threading for scanning speed
- Build a directory brute-forcer using the requests module
- Accept command-line arguments for target configuration
- Combine tools into a mini security toolkit
:::

## Project 1: Threaded Port Scanner

Save this as \`~/tools/port_scanner.py\`:

\`\`\`python
#!/usr/bin/env python3
"""
TCP Port Scanner — scans target ports with optional threading.
Usage: python3 port_scanner.py <target> [start_port] [end_port] [threads]
Example: python3 port_scanner.py 192.168.1.1 1 1024 50
"""

import socket
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

def scan_port(target, port, timeout=1):
    """Scan a single port and return (port, is_open, service)."""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        result = sock.connect_ex((target, port))
        
        if result == 0:
            try:
                service = socket.getservbyport(port, 'tcp')
            except OSError:
                service = 'unknown'
            sock.close()
            return port, True, service
        else:
            sock.close()
            return port, False, None
    except socket.error:
        return port, False, None

def scan_ports(target, start_port, end_port, max_threads=100):
    """Scan a range of ports using a thread pool."""
    open_ports = []
    total_ports = end_port - start_port + 1
    
    print(f"\\nScanning {target} ports {start_port}-{end_port}")
    print(f"Threads: {max_threads}")
    print("-" * 50)
    
    start_time = time.time()
    
    with ThreadPoolExecutor(max_workers=max_threads) as executor:
        futures = {
            executor.submit(scan_port, target, port): port 
            for port in range(start_port, end_port + 1)
        }
        
        completed = 0
        for future in as_completed(futures):
            port, is_open, service = future.result()
            completed += 1
            
            if is_open:
                open_ports.append((port, service))
                print(f"  [OPEN]  Port {port:5d}  {service}")
            
            # Progress indicator every 100 ports
            if completed % 100 == 0:
                elapsed = time.time() - start_time
                rate = completed / elapsed if elapsed > 0 else 0
                print(f"  ... scanned {completed}/{total_ports} ports ({rate:.0f} ports/sec)")
    
    elapsed = time.time() - start_time
    
    # Summary
    print("\\n" + "=" * 50)
    print(f"Scan complete in {elapsed:.2f} seconds")
    print(f"Open ports found: {len(open_ports)}")
    
    if open_ports:
        print("\\nOpen Port Summary:")
        print(f"  {'Port':<10} {'Service':<20}")
        print(f"  {'-'*10} {'-'*20}")
        for port, service in sorted(open_ports):
            print(f"  {port:<10} {service:<20}")
    
    return open_ports

def main():
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <target> [start_port] [end_port] [threads]")
        print(f"Example: {sys.argv[0]} 192.168.1.1 1 1024 50")
        sys.exit(1)
    
    target = sys.argv[1]
    start_port = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    end_port = int(sys.argv[3]) if len(sys.argv) > 3 else 1024
    threads = int(sys.argv[4]) if len(sys.argv) > 4 else 100
    
    # Resolve hostname
    try:
        target_ip = socket.gethostbyname(target)
        print(f"Target: {target} ({target_ip})")
    except socket.gaierror:
        print(f"Error: Could not resolve {target}")
        sys.exit(1)
    
    # Sanity check
    if end_port > 65535:
        print("Error: Maximum port number is 65535")
        sys.exit(1)
    
    if start_port > end_port:
        print("Error: Start port must be less than end port")
        sys.exit(1)
    
    open_ports = scan_ports(target_ip, start_port, end_port, threads)
    
    # Save results
    output_file = f"scan_{target}_{int(time.time())}.txt"
    with open(output_file, "w") as f:
        f.write(f"Port Scan Results for {target} ({target_ip})\\n")
        f.write(f"Ports scanned: {start_port}-{end_port}\\n")
        f.write(f"Open ports: {len(open_ports)}\\n\\n")
        for port, service in sorted(open_ports):
            f.write(f"{port}/tcp  open  {service}\\n")
    
    print(f"\\nResults saved to {output_file}")

if __name__ == "__main__":
    main()
\`\`\`

### Test the Port Scanner

\`\`\`bash
cd ~/tools
chmod +x port_scanner.py

# Scan common ports on your own machine
python3 port_scanner.py 127.0.0.1 1 1000

# Scan specific ports
python3 port_scanner.py 127.0.0.1 22 443 10

# Scan with more threads for speed
python3 port_scanner.py 127.0.0.1 1 65535 500
\`\`\`

:::warning
Only scan systems you own or have explicit permission to test. Unauthorized scanning is illegal.
:::

## Project 2: Directory Brute-Forcer

Save this as \`~/tools/dir_brute.py\`:

\`\`\`python
#!/usr/bin/env python3
"""
Directory Brute-Forcer — discovers hidden directories and files on web servers.
Usage: python3 dir_brute.py <url> <wordlist> [threads]
Example: python3 dir_brute.py http://192.168.1.1 /usr/share/wordlists/dirb/common.txt
"""

import requests
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

# Common HTTP status codes to report
INTERESTING_CODES = {
    200: "OK (Found)",
    301: "Redirect (Moved Permanently)",
    302: "Redirect (Found)",
    401: "Unauthorized (Auth Required)",
    403: "Forbidden (Access Denied)",
    405: "Method Not Allowed",
    500: "Internal Server Error"
}

def check_directory(url, path, timeout=5):
    """Check if a directory/file exists on the target."""
    full_url = f"{url.rstrip('/')}/{path.strip()}"
    
    try:
        response = requests.get(
            full_url, 
            timeout=timeout,
            allow_redirects=False,
            headers={'User-Agent': 'Mozilla/5.0 (compatible; SecurityScanner/1.0)'}
        )
        
        if response.status_code in INTERESTING_CODES:
            size = len(response.content)
            return path, response.status_code, size, INTERESTING_CODES[response.status_code]
    except requests.exceptions.RequestException:
        pass
    
    return None

def brute_force(url, wordlist_path, max_threads=50):
    """Brute-force directories using a wordlist."""
    # Load wordlist
    try:
        with open(wordlist_path, 'r') as f:
            words = [line.strip() for line in f if line.strip()]
    except FileNotFoundError:
        print(f"Error: Wordlist not found: {wordlist_path}")
        sys.exit(1)
    
    print(f"\\nTarget: {url}")
    print(f"Wordlist: {wordlist_path} ({len(words)} entries)")
    print(f"Threads: {max_threads}")
    print("-" * 60)
    
    found = []
    start_time = time.time()
    
    with ThreadPoolExecutor(max_workers=max_threads) as executor:
        futures = {
            executor.submit(check_directory, url, word): word 
            for word in words
        }
        
        completed = 0
        for future in as_completed(futures):
            completed += 1
            result = future.result()
            
            if result:
                path, status, size, description = result
                found.append((path, status, size))
                print(f"  [{status}] /{path:<30} ({size} bytes) - {description}")
            
            # Progress every 100 requests
            if completed % 100 == 0:
                elapsed = time.time() - start_time
                rate = completed / elapsed if elapsed > 0 else 0
                print(f"  ... {completed}/{len(words)} checked ({rate:.0f} req/sec)")
    
    elapsed = time.time() - start_time
    
    # Summary
    print("\\n" + "=" * 60)
    print(f"Scan complete in {elapsed:.2f} seconds")
    print(f"Directories/files found: {len(found)}")
    
    if found:
        print("\\nFound Resources:")
        print(f"  {'Status':<8} {'Path':<35} {'Size':<10}")
        print(f"  {'-'*8} {'-'*35} {'-'*10}")
        for path, status, size in sorted(found, key=lambda x: x[1]):
            print(f"  {status:<8} /{path:<35} {size:<10}")
    
    return found

def main():
    if len(sys.argv) < 3:
        print(f"Usage: {sys.argv[0]} <url> <wordlist> [threads]")
        print(f"Example: {sys.argv[0]} http://192.168.1.1 /usr/share/wordlists/dirb/common.txt")
        sys.exit(1)
    
    url = sys.argv[1]
    wordlist = sys.argv[2]
    threads = int(sys.argv[3]) if len(sys.argv) > 3 else 50
    
    # Ensure URL has protocol
    if not url.startswith(('http://', 'https://')):
        url = 'http://' + url
    
    found = brute_force(url, wordlist, threads)
    
    # Save results
    output_file = f"dirscan_{url.split('//')[1].replace('/', '_')}_{int(time.time())}.txt"
    with open(output_file, "w") as f:
        f.write(f"Directory Scan Results for {url}\\n")
        f.write(f"Wordlist: {wordlist}\\n")
        f.write(f"Found: {len(found)} resources\\n\\n")
        for path, status, size in sorted(found):
            f.write(f"[{status}] /{path} ({size} bytes)\\n")
    
    print(f"\\nResults saved to {output_file}")

if __name__ == "__main__":
    main()
\`\`\`

### Test the Directory Brute-Forcer

First, create a small test wordlist:

\`\`\`bash
cd ~/tools

# Create a small test wordlist
cat > test_wordlist.txt << 'EOF'
admin
login
dashboard
api
config
backup
test
robots.txt
sitemap.xml
.git
.env
wp-admin
wp-login.php
phpmyadmin
server-status
EOF

# Test against a known target
python3 dir_brute.py http://testphp.vulnweb.com test_wordlist.txt 10
\`\`\`

## Project 3: Combined Toolkit

Save this as \`~/tools/security_toolkit.py\`:

\`\`\`python
#!/usr/bin/env python3
"""
Mini Security Toolkit — combines port scanning, directory brute-forcing, and header checking.
Usage: python3 security_toolkit.py <target_ip> <target_url>
"""

import socket
import requests
import sys
from concurrent.futures import ThreadPoolExecutor

def quick_scan(target, ports=[22, 80, 443, 8080, 8443, 3306, 3389]):
    """Quick scan of common ports."""
    print("\\n[1] Quick Port Scan")
    print("-" * 40)
    
    open_ports = []
    for port in ports:
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(1)
            result = sock.connect_ex((target, port))
            if result == 0:
                service = socket.getservbyport(port, 'tcp')
                print(f"  OPEN  {port}/tcp  {service}")
                open_ports.append((port, service))
            sock.close()
        except:
            pass
    
    if not open_ports:
        print("  No open ports found in common range")
    return open_ports

def check_security_headers(url):
    """Check for important security headers."""
    print("\\n[2] Security Header Check")
    print("-" * 40)
    
    try:
        response = requests.get(url, timeout=10)
        headers = response.headers
        
        checks = [
            ('Strict-Transport-Security', 'HSTS'),
            ('Content-Security-Policy', 'CSP'),
            ('X-Content-Type-Options', 'XCTO'),
            ('X-Frame-Options', 'XFO'),
            ('X-Powered-By', 'Server Info'),
        ]
        
        for header, name in checks:
            value = headers.get(header)
            if value:
                if header.startswith('X-Powered-By'):
                    print(f"  [WARN] {name}: {value} (should be removed)")
                else:
                    print(f"  [PASS] {name}: Present")
            else:
                if header.startswith('X-Powered-By'):
                    print(f"  [PASS] {name}: Not disclosed")
                else:
                    print(f"  [FAIL] {name}: Missing")
        
        return True
    except Exception as e:
        print(f"  Error: {e}")
        return False

def resolve_target(target):
    """Resolve target hostname to IP."""
    print(f"\\nTarget: {target}")
    try:
        ip = socket.gethostbyname(target)
        print(f"Resolved: {ip}")
        return ip
    except socket.gaierror:
        print(f"Could not resolve {target}")
        sys.exit(1)

def main():
    if len(sys.argv) < 3:
        print(f"Usage: {sys.argv[0]} <target_ip> <target_url>")
        print(f"Example: {sys.argv[0]} 192.168.1.1 http://192.168.1.1")
        sys.exit(1)
    
    target_ip = sys.argv[1]
    target_url = sys.argv[2]
    
    print("=" * 50)
    print("SECURITY TOOLKIT — Quick Assessment")
    print("=" * 50)
    
    # 1. Port scan
    open_ports = quick_scan(target_ip)
    
    # 2. Header check
    if not target_url.startswith(('http://', 'https://')):
        target_url = 'http://' + target_url
    check_security_headers(target_url)
    
    # Summary
    print("\\n" + "=" * 50)
    print("SUMMARY")
    print("=" * 50)
    print(f"Open ports: {len(open_ports)}")
    print(f"Recommendation: {'Review open services' if open_ports else 'No obvious entry points found'}")

if __name__ == "__main__":
    main()
\`\`\`

### Test the Toolkit

\`\`\`bash
cd ~/tools
chmod +x security_toolkit.py

# Run against your own machine (safe test)
python3 security_toolkit.py 127.0.0.1 http://127.0.0.1
\`\`\`

## Key Concepts

:::concept
### Threading for Speed
Without threading, a port scan of 1000 ports at 1 second timeout = 1000 seconds (~17 minutes).
With 100 threads, the same scan takes ~10 seconds.
:::

:::concept
### Why Custom Tools?
- **Understanding**: Building tools teaches you how they work
- **Customization**: Modify for specific scenarios
- **Stealth**: Custom tools have unique signatures
- **Interview**: Shows deep technical capability
:::

:::checkpoint
1. Why does the port scanner use connect_ex() instead of connect()?
2. What does ThreadPoolExecutor do?
3. Why do we set allow_redirects=False in the directory brute-forcer?
4. How does the progress indicator help during a long scan?
5. What would you modify to make the port scanner output JSON?
:::
`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Explain how multi-threading improves port scanning speed and what risks it introduces.",
        interviewAnswer: "Multi-threading allows scanning multiple ports simultaneously instead of sequentially. With 100 threads, you can test 100 ports at once, reducing scan time from hours to minutes. However, aggressive threading can overwhelm targets, trigger IDS alerts, cause network congestion, or crash fragile services. A professional balances speed with stealth by using adjustable thread counts and adding delays.",
        quiz: [
          {
            question: "What does socket.connect_ex() return on success?",
            options: ["1", "0", "True", "The open port number"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "connect_ex() returns 0 when the connection succeeds (port is open), and a non-zero error code on failure."
          },
          {
            question: "Why use ThreadPoolExecutor instead of threading.Thread for port scanning?",
            options: [
              "It's slower but more reliable",
              "It manages a pool of threads and reuses them efficiently",
              "It doesn't require Python",
              "It only works on Linux"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "ThreadPoolExecutor manages thread creation, reuse, and cleanup, making it more efficient than manual thread management."
          },
          {
            question: "What does allow_redirects=False do in requests.get()?",
            options: [
              "Blocks all HTTP requests",
              "Prevents automatically following 301/302 redirects",
              "Only allows HTTPS connections",
              "Disables SSL verification"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Setting allow_redirects=False keeps the response at the original URL, showing the redirect rather than following it."
          },
          {
            question: "In the port scanner, why do we resolve the hostname to an IP first?",
            options: [
              "socket.connect_ex() requires an IP address",
              "It's faster to connect with IPs",
              "DNS resolution might fail and we want to catch that early",
              "All of the above"
            ],
            correctAnswerIndex: 3,
            difficulty: "intermediate",
            explanation: "connect_ex works with hostnames but resolving first catches DNS failures early and provides cleaner output."
          },
          {
            question: "What is the default timeout set in the port scanner's scan_port function?",
            options: ["5 seconds", "3 seconds", "1 second", "0.5 seconds"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "The default timeout is 1 second, which balances speed with reliability for most networks."
          },
          {
            question: "Why does the directory brute-forcer check for status code 403 (Forbidden)?",
            options: [
              "403 means the directory doesn't exist",
              "403 means the directory exists but access is denied — worth noting",
              "403 is always an error",
              "We skip 403 responses"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "A 403 response confirms the resource exists but requires authentication or different permissions."
          },
          {
            question: "What happens if you run the port scanner with 1000 threads against a slow network?",
            options: [
              "It scans faster",
              "It may overwhelm the target and miss open ports",
              "Python automatically reduces the thread count",
              "Nothing — more threads is always better"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "Too many threads can cause packet loss, timeouts, and inaccurate results. The target may also drop connections."
          },
          {
            question: "In the directory brute-forcer, what does the size of the response tell you?",
            options: [
              "Nothing useful",
              "Different sizes may indicate different content (error page vs real page)",
              "Larger size always means more content",
              "Size is random"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Comparing response sizes helps distinguish between generic error pages (small) and actual content (larger)."
          },
          {
            question: "What User-Agent string does the directory brute-forcer use?",
            options: [
              "python-requests",
              "Mozilla/5.0 (compatible; SecurityScanner/1.0)",
              "curl/7.81.0",
              "It uses no User-Agent"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "A custom User-Agent identifies the tool as a security scanner, which is ethical and transparent."
          },
          {
            question: "Why save scan results to a file?",
            options: [
              "To make the script run faster",
              "For documentation, reporting, and later comparison",
              "Python requires output files",
              "To reduce console output"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Saving results allows documentation, comparison over time, and sharing with team members or clients."
          },
          {
            question: "What is the difference between a port scan and a directory brute-force?",
            options: [
              "They are the same thing",
              "Port scan finds open network services; directory brute-force finds hidden web paths",
              "Port scan is faster than directory brute-force",
              "Directory brute-force only works on Linux"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Port scanning tests TCP/UDP ports for open services. Directory brute-forcing tests web paths for existing pages."
          },
          {
            question: "How does the progress indicator help during long scans?",
            options: [
              "It speeds up the scan",
              "It shows completion percentage and scan rate so you know how long to wait",
              "It reduces network traffic",
              "It's purely cosmetic"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Progress indicators show scan rate and estimated time remaining, helping you decide whether to wait or abort."
          },
          {
            question: "What would you modify to make the port scanner output JSON instead of text?",
            options: [
              "Change the print statements to json.dumps()",
              "Use the json module to serialize the open_ports list",
              "Redirect output to a .json file",
              "Both A and B"
            ],
            correctAnswerIndex: 3,
            difficulty: "advanced",
            explanation: "You'd serialize the results using json.dumps() and either print or write the JSON string to a file."
          }
        ]
      }
    ]
  }
];
