export const phase1: Module[] = [
  {
    id: "week05",
    title: "Environment Setup",
    durationText: "Week 5 - 5 Days",
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

Then enter a password when prompted (typing will not show characters - this is normal Linux behavior):

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
\`sudo\` = "superuser do" - runs the command with administrator privileges. You'll be prompted for your password the first time.
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

Now check your Windows Desktop - you should see \`wsl-test.txt\`.

:::checkpoint
1. What command enables WSL2 on Windows?
2. What does \`sudo apt update\` do versus \`sudo apt upgrade\`?
3. What is the path to access your Windows C: drive from WSL2?
4. Where are WSL2 files accessible from Windows Explorer?
:::

## Step 5: Configure Windows Terminal

1. Open **Windows Terminal** from the Start menu
2. Click the **down arrow** (▼) in the tab bar
3. You should see **Ubuntu** listed - click it to open a new Ubuntu tab
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
            explanation: "WSL2 mounts Windows drives under /mnt/ - C: becomes /mnt/c/, D: becomes /mnt/d/, etc."
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
              "Nowhere - it's a virtual path"
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
            explanation: "The && operator is a logical AND - it only runs the next command if the previous one returned exit code 0 (success)."
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
3. Run the installer - accept defaults, but **check these boxes**:
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
3. Run the installer - accept all defaults
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
3. Run the installer - accept defaults
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
# Nmap - network scanner
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
# Gobuster - directory/file/DNS brute-forcer
sudo apt install gobuster -y
gobuster version
\`\`\`

### Web Vulnerability Scanning

\`\`\`bash
# Nikto - web server scanner
sudo apt install nikto -y
nikto -Version
\`\`\`

### SQL Injection Testing

\`\`\`bash
# SQLMap - automated SQL injection tool
sudo apt install sqlmap -y
sqlmap --version
\`\`\`

### Password Cracking

\`\`\`bash
# John the Ripper - password cracker
sudo apt install john -y
john --version

# Hashcat - GPU-accelerated password cracker
sudo apt install hashcat -y
hashcat --version
\`\`\`

:::warning
Hashcat requires a GPU for full functionality. In WSL2 without GPU passthrough, it will work in CPU-only mode. We'll configure GPU access later.
:::

### Utility Packages

\`\`\`bash
# curl - HTTP requests from command line
sudo apt install curl -y
curl --version

# wget - file downloader
sudo apt install wget -y
wget --version

# netcat - TCP/UDP connections (Swiss army knife of networking)
sudo apt install netcat-openbsd -y
nc -h

# git - version control
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
The \`{web,network,crypto,malware}\` syntax is brace expansion - Bash creates all four directories at once.
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
# Scan yourself - always safe to scan localhost
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
            options: ["nmap 192.168.1.1", "nmap 127.0.0.1", "nmap localhost", "nmap 0.0.0.0"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "127.0.0.1 is the loopback address that always refers to your own machine. 'localhost' resolves to it but may fail if DNS is misconfigured. 192.168.1.1 is typically the router, not your machine."
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
      },
      {
        id: "we05d04",
        title: "Linux File System & Permissions",
        description: "Navigate the Linux directory structure, understand file types, and master permissions with chmod, chown, chgrp, SUID, SGID, and the sticky bit.",
        type: "learn",
        duration: "3-4 hours",
        content: `:::objectives
- Understand the Linux directory hierarchy (/etc, /var, /tmp, /home, /usr)
- Identify file types using ls -l output
- Change permissions with chmod (octal and symbolic)
- Change ownership with chown and chgrp
- Understand special permissions: sticky bit, SUID, SGID
- Read /etc/passwd and /etc/shadow
- Find files with find, locate, and which
:::

## Step 1: The Linux Directory Hierarchy

Every directory in Linux has a specific purpose:

| Directory | Purpose | Example Files |
|---|---|---|
| \`/\` | Root of the entire filesystem | Everything starts here |
| \`/home\` | User home directories | \`/home/cyberlab/\` |
| \`/etc\` | System configuration files | \`/etc/passwd\`, \`/etc/ssh/\` |
| \`/var\` | Variable data (logs, caches) | \`/var/log/syslog\` |
| \`/tmp\` | Temporary files (cleared on reboot) | Session files, caches |
| \`/usr\` | User programs and libraries | \`/usr/bin/\`, \`/usr/lib/\` |
| \`/bin\` | Essential user commands | \`ls\`, \`cp\`, \`mv\` |
| \`/sbin\` | System admin commands | \`iptables\`, \`fdisk\` |
| \`/opt\` | Optional/third-party software | \`/opt/google/chrome/\` |
| \`/proc\` | Virtual filesystem (process info) | \`/proc/cpuinfo\`, \`/proc/self/\` |
| \`/dev\` | Device files | \`/dev/sda\`, \`/dev/null\` |
| \`/boot\` | Boot loader files | \`vmlinuz\`, \`grub/\` |

Explore the filesystem:

\`\`\`bash
# List root directory
ls /

# See what's in /etc
ls /etc | head -20

# Check system logs
ls /var/log/

# See running processes as files
ls /proc/ | head -10

# Check your home directory
ls -la ~/
\`\`\`

**Expected output:**
\`\`\`
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
\`\`\`

:::info
The Filesystem Hierarchy Standard (FHS) defines these directory purposes. Knowing this structure helps you find config files, logs, and programs quickly.
:::

## Step 2: File Types

Every file in Linux has a type, shown as the first character in \`ls -l\` output:

| Character | File Type | Description |
|---|---|---|
| \`-\` | Regular file | Text, binary, images, etc. |
| \`d\` | Directory | A folder containing other files |
| \`l\` | Symbolic link | A shortcut/pointer to another file |
| \`c\` | Character device | Reads data character by character (keyboard) |
| \`b\` | Block device | Reads data in blocks (hard drives) |

\`\`\`bash
# See file types in your home directory
ls -la ~/

# Look at /dev for device files
ls -la /dev/sd*
ls -la /dev/null

# Check /proc for special files
ls -la /proc/self
\`\`\`

**Expected output:**
\`\`\`
-rw-r--r-- 1 cyberlab cyberlab  220 Jun 22 10:00 .bash_logout
-rw-r--r-- 1 cyberlab cyberlab 3771 Jun 22 10:00 .bashrc
drwxr-xr-x 1 cyberlab cyberlab 4096 Jun 22 10:05 Desktop
lrwxrwxrwx 1 root root       21 Jun 22 10:00 sh -> /usr/bin/dash
\`\`\`

**Parse the first column:**
\`\`\`
d rwxr-xr-x
│ └────────── permissions
└──────────── file type
\`\`\`

## Step 3: File Permissions (chmod)

Permissions control who can read, write, and execute a file. The \`ls -l\` output shows:

\`\`\`
-rwxr-xr-- 1 cyberlab cyberlab 4096 Jun 22 10:00 script.sh
│ │││ │││ │  │        │
│ │││ │││ │  owner    group
│ └┘└─┘└─┘  user     group   others
│  W R X   W R X     R X
└── u      g         o
\`\`\`

| Permission | File Effect | Directory Effect |
|---|---|---|
| \`r\` (read) | View file contents | List directory contents |
| \`w\` (write) | Modify file contents | Create/delete files inside |
| \`x\` (execute) | Run as a program | Enter the directory |

### Octal Permissions

Each permission maps to a number:

| Symbol | Octal | Binary |
|---|---|---|
| \`r\` | 4 | 100 |
| \`w\` | 2 | 010 |
| \`x\` | 1 | 001 |
| \`-\` | 0 | 000 |

Combine them by adding:

| Permission | Octal | Meaning |
|---|---|---|
| \`rwx\` | 4+2+1 = 7 | Full access |
| \`r-x\` | 4+0+1 = 5 | Read + execute |
| \`r--\` | 4+0+0 = 4 | Read only |
| \`rw-\` | 4+2+0 = 6 | Read + write |
| \`---\` | 0+0+0 = 0 | No access |

\`\`\`bash
# Create a test file
echo "#!/bin/bash" > ~/testfile.sh
echo "echo Hello" >> ~/testfile.sh
ls -la ~/testfile.sh

# Set permissions: owner=rwx, group=r-x, others=---
chmod 750 ~/testfile.sh
ls -la ~/testfile.sh

# Set permissions: owner=rw, group=r, others=r
chmod 644 ~/testfile.sh
ls -la ~/testfile.sh

# Set permissions: owner=rwx, group=rwx, others=rwx
chmod 777 ~/testfile.sh
ls -la ~/testfile.sh

# Remove all permissions for others
chmod o= ~/testfile.sh
ls -la ~/testfile.sh
\`\`\`

**Expected output after chmod 750:**
\`\`\`
-rwxr-x--- 1 cyberlab cyberlab 38 Jun 22 10:00 /home/cyberlab/testfile.sh
\`\`\`

### Symbolic Permissions

\`\`\`bash
# Add execute for owner
chmod u+x ~/testfile.sh

# Remove write for group
chmod g-w ~/testfile.sh

# Add read for others
chmod o+r ~/testfile.sh

# Remove all permissions for others
chmod o= ~/testfile.sh

# Multiple changes at once
chmod u+rwx,g+rx,o= ~/testfile.sh
\`\`\`

## Step 4: Ownership (chown, chgrp)

\`\`\`bash
# Check current ownership
ls -la ~/testfile.sh

# Change owner (requires root)
sudo chown root:root ~/testfile.sh
ls -la ~/testfile.sh

# Change only the group
sudo chgrp cyberlab ~/testfile.sh
ls -la ~/testfile.sh

# Change recursively (for directories)
sudo chown -R cyberlab:cyberlab ~/labs/

# Change ownership of a file you created back to yourself
chown cyberlab:cyberlab ~/testfile.sh
\`\`\`

**Expected output after sudo chown root:root:**
\`\`\`
-rwxr-x--- 1 root root 38 Jun 22 10:00 /home/cyberlab/testfile.sh
\`\`\`

:::warning
Only use \`chown\` with \`sudo\`. Regular users can only change ownership of files they own, and only the group to one they belong to.
:::

## Step 5: Special Permissions

### Sticky Bit (\`chmod +t\`)

The sticky bit on a directory means only the file owner (or root) can delete files inside it, regardless of directory permissions.

\`\`\`bash
# /tmp has the sticky bit set
ls -ld /tmp
# Output: drwxrwxrwt 10 root root 4096 Jun 22 10:00 /tmp

# Set sticky bit on your own directory
chmod +t ~/shared/
ls -ld ~/shared/
# Output: drwxr-xr-t 2 cyberlab cyberlab 4096 Jun 22 10:00 /home/cyberlab/shared/

# Remove sticky bit
chmod -t ~/shared/
\`\`\`

:::info
The \`t\` in the execute position means the sticky bit is set. Without the sticky bit, it would be \`x\`.
:::

### SUID - Set User ID (\`chmod u+s\`)

When SUID is set on an executable, it runs with the file owner's permissions (usually root), not the user who ran it.

\`\`\`bash
# /usr/bin/passwd has SUID set (allows regular users to change their password)
ls -la /usr/bin/passwd
# Output: -rwsr-xr-x 1 root root 68208 Jun 22 10:00 /usr/bin/passwd

# The 's' in the owner execute position = SUID

# Set SUID on a file
chmod u+s ~/suid_script.sh
ls -la ~/suid_script.sh
# Output: -rwsr-xr-- 1 cyberlab cyberlab 38 Jun 22 10:00 /home/cyberlab/suid_script.sh

# Remove SUID
chmod u-s ~/suid_script.sh
\`\`\`

:::warning
SUID is a security risk. A SUID root program with a vulnerability can give an attacker full root access. Always audit SUID files.
:::

### SGID - Set Group ID (\`chmod g+s\`)

\`\`\`bash
# Set SGID on a directory - new files inherit the group
chmod g+s ~/shared/
ls -ld ~/shared/
# Output: drwxrwsr-x 2 cyberlab cyberlab 4096 Jun 22 10:00 shared/

# Set SGID on a file - runs with group permissions
chmod g+s ~/sgid_script.sh
ls -la ~/sgid_script.sh
# Output: -rwxr-sr-x 1 cyberlab cyberlab 38 Jun 22 10:00 sgid_script.sh
\`\`\`

### Finding Special Permissions

\`\`\`bash
# Find all SUID files on the system
find / -perm -4000 -type f 2>/dev/null

# Find all SGID files
find / -perm -2000 -type f 2>/dev/null

# Find all files with sticky bit
find / -perm -1000 -type d 2>/dev/null
\`\`\`

**Expected SUID output (partial):**
\`\`\`
/usr/bin/passwd
/usr/bin/sudo
/usr/bin/newgrp
/usr/bin/chsh
/usr/bin/chfn
/usr/bin/gpasswd
/usr/bin/mount
/usr/bin/umount
/usr/lib/openssh/ssh-keysign
\`\`\`

## Step 6: /etc/passwd and /etc/shadow

These two files are critical for user management:

### /etc/passwd

\`\`\`bash
cat /etc/passwd | head -10
\`\`\`

**Expected output:**
\`\`\`
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
cyberlab:x:1000:1000:cyberlab:/home/cyberlab:/bin/bash
\`\`\`

**Format:** \`username:password:UID:GID:comment:home:shell\`

| Field | Meaning |
|---|---|
| \`username\` | Login name |
| \`x\` | Password stored in /etc/shadow (not here) |
| \`0\` | UID (0 = root, 1-999 = system, 1000+ = regular users) |
| \`0\` | GID (group ID) |
| \`root\` | GECOS comment field |
| \`/root\` | Home directory |
| \`/bin/bash\` | Default shell |

### /etc/shadow

\`\`\`bash
# Requires root to read
sudo cat /etc/shadow | head -5
\`\`\`

**Expected output:**
\`\`\`
root:$6$xKz...:19000:0:99999:7:::
cyberlab:$6$abc...:19000:0:99999:7:::
\`\`\`

**Format:** \`username:encrypted_password:last_changed:min:max:warn:inactive:expire:reserved\`

:::warning
/etc/shadow is only readable by root. The password hashes are salted and hashed (usually SHA-512). Never attempt to crack passwords without explicit authorization.
:::

## Step 7: Finding Files

### find - The Power Tool

\`\`\`bash
# Find files by name
find /home/cyberlab -name "*.txt"

# Find directories named "logs"
find / -type d -name "logs" 2>/dev/null

# Find files modified in the last 24 hours
find /var/log -mtime -1

# Find files larger than 100MB
find / -size +100M -type f 2>/dev/null

# Find files with specific permissions
find /home/cyberlab -perm 777

# Find and execute a command on results
find /home/cyberlab -name "*.log" -exec grep -l "error" {} \\;

# Find all empty files
find /home/cyberlab -empty -type f

# Find files owned by a specific user
find /home/cyberlab -user cyberlab
\`\`\`

### locate - Fast Search (uses a database)

\`\`\`bash
# Update the database (run periodically)
sudo updatedb

# Search for files by name (much faster than find)
locate passwd
locate httpd.conf
\`\`\`

### which - Find Executable Paths

\`\`\`bash
which python3
which nmap
which curl
\`\`\`

**Expected output:**
\`\`\`
/usr/bin/python3
/usr/bin/nmap
/usr/bin/curl
\`\`\`

## Quick Reference

| Task | Command |
|---|---|
| List all files with details | \`ls -la\` |
| Change permissions | \`chmod 755 file\` |
| Change ownership | \`sudo chown user:group file\` |
| Find SUID files | \`find / -perm -4000 -type f 2>/dev/null\` |
| Find files by name | \`find / -name "filename" 2>/dev/null\` |
| Check file type | \`file filename\` |

:::checkpoint
1. What does the first character in \`ls -l\` output tell you?
2. What octal value represents read + write for owner, read for group, nothing for others?
3. What is the sticky bit and where is it commonly used?
4. What does SUID do on an executable file?
5. What is the difference between /etc/passwd and /etc/shadow?
:::
`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "You discover a file with SUID root permissions. What security risks does this present and how would you investigate?",
        interviewAnswer: "A SUID root file runs with root privileges regardless of who executes it. If that file has a vulnerability (buffer overflow, command injection), an attacker can escalate to root. I would first find all SUID files using 'find / -perm -4000 -type f', then research each one for known vulnerabilities. I'd check if any SUID binaries are unnecessary and remove them, and verify that the ones that remain are from trusted packages with no known CVEs.",
        quiz: [
          {
            question: "What does the 'd' prefix in 'drwxr-xr-x' indicate?",
            options: ["A regular file", "A directory", "A symbolic link", "A device file"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The first character of ls -l output indicates file type. 'd' means directory, '-' means regular file, 'l' means symlink."
          },
          {
            question: "What octal permission value gives read + write to owner, read to group, and no access to others?",
            options: ["755", "644", "640", "750"],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "Owner: 6 (rw-), Group: 4 (r--), Others: 0 (---) = 640."
          },
          {
            question: "What does 'chmod o= file' do?",
            options: [
              "Sets owner permissions to nothing",
              "Sets others permissions to nothing",
              "Removes all permissions for everyone",
              "Opens the file for editing"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "'o=' with no value after the equals sign sets others permissions to nothing (---)."
          },
          {
            question: "Where are user password hashes stored on a Linux system?",
            options: ["/etc/passwd", "/etc/shadow", "/etc/passwords", "/var/auth"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "/etc/shadow stores hashed passwords. /etc/passwd only contains an 'x' placeholder indicating the password is in shadow."
          },
          {
            question: "What does the 's' in '-rwsr-xr-x' indicate?",
            options: [
              "The file is a shared library",
              "The sticky bit is set",
              "SUID (Set User ID) is set",
              "The file is a socket"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "The 's' in the owner execute position means SUID is set. The file will execute with the owner's permissions."
          },
          {
            question: "What is the purpose of the sticky bit on a directory?",
            options: [
              "Prevents anyone from writing to it",
              "Only the file owner can delete files inside it",
              "Makes all files executable",
              "Hides the directory from listings"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The sticky bit on a directory means only the file's owner (or root) can delete or rename files, regardless of directory write permissions."
          },
          {
            question: "Which command finds all SUID files on a system?",
            options: [
              "find / -perm -4000 -type f 2>/dev/null",
              "ls -la /usr/bin/*",
              "grep -r 's' /etc/passwd",
              "find / -name 'suid' 2>/dev/null"
            ],
            correctAnswerIndex: 0,
            difficulty: "intermediate",
            explanation: "-perm -4000 matches files with the SUID bit (octal 4000) set. -type f limits to regular files."
          },
          {
            question: "What UID does the root user always have?",
            options: ["1", "1000", "0", "65535"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "UID 0 is always root. UID 1-999 are system accounts. UID 1000+ are regular user accounts."
          },
          {
            question: "What does 'chown -R user:group /path' do?",
            options: [
              "Changes ownership of only the top-level directory",
              "Recursively changes ownership of all files and subdirectories",
              "Changes the permissions of all files",
              "Creates a backup of the directory"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The -R flag makes chown recursive, changing ownership of the directory and everything inside it."
          },
          {
            question: "Which command is faster for searching filenames: find or locate?",
            options: [
              "find is always faster",
              "locate is faster because it uses a pre-built database",
              "They are the same speed",
              "locate only works on files smaller than 1MB"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "locate searches a database built by updatedb, making it much faster than find's real-time filesystem traversal."
          }
        ]
      },
      {
        id: "we05d05",
        title: "Linux Process Management & Services",
        description: "View, manage, and control running processes using ps, top, kill, jobs, crontab, and systemd systemctl commands.",
        type: "learn",
        duration: "3-4 hours",
        content: `:::objectives
- Understand the difference between processes and programs
- View processes with ps, top, and htop
- Send signals to processes with kill
- Manage background jobs with jobs, bg, and fg
- Schedule tasks with crontab
- Understand systemd units and systemctl
- Check listening services with ss and netstat
:::

## Step 1: Processes vs Programs

A **program** is a static file on disk (like /usr/bin/nmap). A **process** is a running instance of a program. Each process has:

| Attribute | Description |
|---|---|
| **PID** | Process ID (unique number) |
| **PPID** | Parent Process ID (the process that spawned it) |
| **UID** | User ID (who owns it) |
| **State** | Running, sleeping, stopped, zombie |
| **Priority** | Scheduling priority |

\`\`\`bash
# See your own PID
echo $$

# See your shell's PID and its parent
ps -o pid,ppid,comm
\`\`\`

**Expected output:**
\`\`\`
  PID  PPID COMM
 1234  1230 bash
\`\`\`

## Step 2: Viewing Processes with ps

\`\`\`bash
# Show all processes for current user
ps aux
\`\`\`

**Expected output (truncated):**
\`\`\`
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 169324 11804 ?        Ss   10:00   0:02 /sbin/init
root         2  0.0  0.0      0     0 ?        S    10:00   0:00 [kthreadd]
cyberlab  1234  0.0  0.1  21472  5280 pts/0    Ss   10:01   0:00 -bash
cyberlab  1300  0.0  0.1  37364  3360 pts/0    R+   10:05   0:00 ps aux
\`\`\`

**Key columns:**
- \`USER\` - who owns the process
- \`PID\` - process ID
- \`%CPU\` / \`%MEM\` - resource usage
- \`STAT\` - process state (S=sleeping, R=running, T=stopped, Z=zombie, s=session leader)
- \`COMMAND\` - the command that started it

\`\`\`bash
# Filter for specific processes
ps aux | grep sshd
ps aux | grep -v grep  # exclude the grep itself

# Show process tree
ps auxf

# Show specific columns
ps -eo pid,ppid,user,comm --sort=-%mem | head -10
\`\`\`

## Step 3: top and htop

### top - Built-in Process Monitor

\`\`\`bash
top
\`\`\`

**Key shortcuts in top:**
- \`q\` - quit
- \`1\` - show individual CPU cores
- \`M\` - sort by memory usage
- \`P\` - sort by CPU usage
- \`k\` - kill a process (enter PID)
- \`r\` - renice a process

### htop - Better Process Monitor (if installed)

\`\`\`bash
sudo apt install htop -y
htop
\`\`\`

htop adds:
- Color-coded output
- Mouse support
- Tree view toggle (F5)
- Search (F3)
- Kill process (F9)

:::tip
Use \`top -bn1 | head -20\` for a one-shot snapshot (useful in scripts).
:::

## Step 4: Killing Processes with kill

\`\`\`bash
# Find the PID of a process
ps aux | grep firefox
# Example output: cyberlab 5678 5.2 2.1 ... /usr/lib/firefox/firefox

# Send SIGTERM (graceful shutdown - default)
kill 5678

# Send SIGKILL (force kill - use when SIGTERM fails)
kill -9 5678
kill -SIGKILL 5678

# Kill by name (all instances)
pkill firefox
killall firefox
\`\`\`

### Common Signals

| Signal | Number | Action | When to Use |
|---|---|---|---|
| \`SIGHUP\` | 1 | Reload configuration | Reload config without restarting |
| \`SIGINT\` | 2 | Interrupt (Ctrl+C) | Stop a running process |
| \`SIGQUIT\` | 3 | Quit with core dump | Debugging |
| \`SIGTERM\` | 15 | Graceful termination | Default kill signal |
| \`SIGKILL\` | 9 | Force kill (unblockable) | Last resort when process won't die |
| \`SIGSTOP\` | 19 | Pause (can't be caught) | Freeze a process |
| \`SIGCONT\` | 18 | Continue a stopped process | Resume after SIGSTOP |

\`\`\`bash
# SIGHUP is used to reload configs
# Example: reload nginx config
sudo kill -HUP $(cat /var/run/nginx.pid)

# Stop a process (Ctrl+C sends SIGINT)
# Press Ctrl+C in terminal

# Pause a running process
kill -STOP 5678

# Resume it
kill -CONT 5678
\`\`\`

:::warning
SIGKILL (kill -9) cannot be caught or ignored. Use it only when SIGTERM doesn't work. The process won't get a chance to clean up.
:::

## Step 5: Background Jobs

\`\`\`bash
# Run a command in the background
sleep 100 &
# Output: [1] 7890  (job number 1, PID 7890)

# List background jobs
jobs
# Output: [1]+  Running    sleep 100 &

# Bring job to foreground
fg %1

# Send to background (after pressing Ctrl+Z)
# Ctrl+Z pauses the process
# Then type:
bg %1

# Kill a background job
kill %1
\`\`\`

**Workflow:**
\`\`\`bash
# Start a long scan in background
nmap -sV 192.168.1.0/24 > scan_results.txt &

# Check it's running
jobs

# Check output
cat scan_results.txt

# When done, remove from job list
wait
\`\`\`

## Step 6: Scheduling with crontab

Cron runs commands on a schedule. Edit your crontab with:

\`\`\`bash
crontab -e
\`\`\`

### Crontab Syntax

\`\`\`
┌───── minute (0-59)
│ ┌───── hour (0-23)
│ │ ┌───── day of month (1-31)
│ │ │ ┌───── month (1-12)
│ │ │ │ ┌───── day of week (0-7, 0 and 7 = Sunday)
│ │ │ │ │
* * * * * command_to_run
\`\`\`

**Examples:**

| Schedule | Crontab Line |
|---|---|
| Every day at 3 AM | \`0 3 * * * /home/cyberlab/backup.sh\` |
| Every 15 minutes | \`*/15 * * * * /home/cyberlab/check.sh\` |
| Monday at 9 AM | \`0 9 * * 1 /home/cyberlab/report.sh\` |
| First day of month | \`0 0 1 * * /home/cyberlab/monthly.sh\` |
| Every 5 minutes | \`*/5 * * * * /home/cyberlab/monitor.sh\` |

\`\`\`bash
# View current crontab
crontab -l

# Create a simple scheduled task
(crontab -l 2>/dev/null; echo "0 * * * * echo 'Hourly check' >> /tmp/cron_test.log") | crontab -

# Verify
crontab -l
\`\`\`

**Expected output:**
\`\`\`
0 * * * * echo 'Hourly check' >> /tmp/cron_test.log
\`\`\`

:::tip
Use \`crontab -l\` to list, \`crontab -e\` to edit. System-wide cron jobs are in \`/etc/crontab\` and \`/etc/cron.d/\`.
:::

## Step 7: systemd and systemctl

Most modern Linux distributions use **systemd** to manage services.

\`\`\`bash
# List all running services
systemctl list-units --type=service --state=running

# Check if a service is running
systemctl status sshd
systemctl status apache2
systemctl status nginx

# Start a service
sudo systemctl start nginx

# Stop a service
sudo systemctl stop nginx

# Restart a service
sudo systemctl restart nginx

# Reload configuration (without downtime)
sudo systemctl reload nginx

# Enable a service to start on boot
sudo systemctl enable nginx

# Disable a service from starting on boot
sudo systemctl disable nginx
\`\`\`

**Expected output of systemctl status sshd:**
\`\`\`
● sshd.service - OpenBSD Secure Shell server
     Loaded: loaded (/lib/systemd/system/sshd.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2026-06-22 10:00:05 UTC; 2h ago
   Main PID: 567 (sshd)
      Tasks: 1 (limit: 4617)
     Memory: 6.2M
        CPU: 125ms
     CGroup: /system.slice/sshd.service
             └─567 sshd: /usr/sbin/sshd -D [listener] 10 of 10-100 startups
\`\`\`

### Key systemd Concepts

| Concept | Description |
|---|---|
| **Unit** | A resource systemd manages (service, mount, socket, timer) |
| **Target** | A group of units (like runlevels: multi-user.target, graphical.target) |
| **Unit file** | Configuration at \`/lib/systemd/system/\` or \`/etc/systemd/system/\` |
| **Journal** | systemd's logging system (replaces syslog) |

\`\`\`bash
# View logs for a service
journalctl -u sshd --since "1 hour ago"

# View system logs
journalctl -xe

# List all failed services
systemctl --failed

# List available services
systemctl list-unit-files --type=service
\`\`\`

## Step 8: Checking Listening Ports with ss and netstat

\`\`\`bash
# Show all listening TCP/UDP ports
ss -tlnu
\`\`\`

**Expected output:**
\`\`\`
Netid  State   Recv-Q  Send-Q   Local Address:Port    Peer Address:Port  Process
udp    UNCONN  0       0          127.0.0.53%lo:53           0.0.0.0:*
tcp    LISTEN  0       128          0.0.0.0:22           0.0.0.0:*    users:(("sshd",pid=567,fd=3))
tcp    LISTEN  0       4096         0.0.0.0:80           0.0.0.0:*    users:(("nginx",pid=890,fd=6))
tcp    LISTEN  0       128             [::]:22              [::]:*    users:(("sshd",pid=567,fd=4))
\`\`\`

**Useful ss flags:**

| Flag | Meaning |
|---|---|
| \`-t\` | TCP sockets |
| \`-u\` | UDP sockets |
| \`-l\` | Listening sockets only |
| \`-n\` | Don't resolve service names |
| \`-p\` | Show process using the socket |

\`\`\`bash
# Show listening ports with process names
sudo ss -tlnp

# Show established connections
ss -tnp

# Find what's using a specific port
ss -tlnp | grep :80

# Traditional netstat (if installed)
netstat -tlnp
\`\`\`

## Quick Reference

| Task | Command |
|---|---|
| List all processes | \`ps aux\` |
| Interactive process viewer | \`top\` or \`htop\` |
| Kill a process | \`kill PID\` or \`kill -9 PID\` |
| Kill by name | \`pkill name\` or \`killall name\` |
| Background job | \`command &\` |
| List jobs | \`jobs\` |
| Edit crontab | \`crontab -e\` |
| Check service status | \`systemctl status service\` |
| Start/stop service | \`sudo systemctl start/stop service\` |
| Show listening ports | \`ss -tlnp\` |

:::checkpoint
1. What is the difference between SIGTERM and SIGKILL?
2. What does 'kill -9' do that 'kill' alone doesn't?
3. How do you schedule a script to run every day at midnight?
4. What is the PID of the init/systemd process?
5. What does 'ss -tlnp' show you?
:::
`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "A service on a Linux server is not responding. Walk me through your process management approach to diagnose and resolve the issue.",
        interviewAnswer: "I would start by checking if the service is running with 'systemctl status'. If it's down, I'd check logs with 'journalctl -u service --since 10 min ago' for errors. I'd check if it's listening on the expected port with 'ss -tlnp | grep :port'. If the process is running but unresponsive, I'd check resource usage with 'top' to see if it's CPU or memory bound, then check 'dmesg' for kernel-level issues like OOM kills. If the service needs restarting, I'd try 'systemctl reload' first for graceful restart, then 'systemctl restart' if needed.",
        quiz: [
          {
            question: "What is the difference between a program and a process?",
            options: [
              "They are the same thing",
              "A program is a file on disk; a process is a running instance of it",
              "A process is always faster than a program",
              "A program requires root to run"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "A program is a static executable file. A process is created when the program is executed, with its own PID, memory, and state."
          },
          {
            question: "What does 'kill -9' send to a process?",
            options: ["SIGHUP", "SIGTERM", "SIGKILL", "SIGINT"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "kill -9 sends SIGKILL, which forcefully terminates the process. It cannot be caught or ignored."
          },
          {
            question: "What does the STAT column 'S' mean in ps aux output?",
            options: [
              "The process is stopped",
              "The process is sleeping (waiting for an event)",
              "The process is a session leader",
              "The process is a zombie"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "S means sleeping - the process is waiting for an event, I/O, or a signal. This is normal for most idle processes."
          },
          {
            question: "How do you run a command in the background?",
            options: ["Run it with sudo", "Append & to the command", "Press Ctrl+B", "Use the --bg flag"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Appending & to a command runs it as a background job, freeing your terminal for other commands."
          },
          {
            question: "What crontab entry runs a script every 15 minutes?",
            options: [
              "15 * * * * script.sh",
              "*/15 * * * * script.sh",
              "0,15,30,45 * * * * script.sh",
              "* */15 * * * script.sh"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "*/15 in the minute field means every 15 minutes (0, 15, 30, 45). Both options B and C work, but B is the canonical syntax."
          },
          {
            question: "What does 'systemctl status sshd' show?",
            options: [
              "Only the PID of sshd",
              "Whether sshd is running, its PID, memory usage, and recent logs",
              "The sshd configuration file",
              "Network connections to sshd"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "systemctl status shows the service state, main PID, resource usage, and the last few log lines."
          },
          {
            question: "What is the difference between SIGTERM and SIGKILL?",
            options: [
              "They are the same thing",
              "SIGTERM allows graceful shutdown; SIGKILL forces immediate termination",
              "SIGTERM is faster than SIGKILL",
              "SIGKILL can be caught, SIGTERM cannot"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "SIGTERM lets the process clean up and shut down gracefully. SIGKILL is immediate and cannot be caught."
          },
          {
            question: "Which command shows all listening TCP and UDP ports with process names?",
            options: ["ps aux", "top", "ss -tlnp", "crontab -l"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "ss -tlnp shows TCP (-t) listening (-l) ports with numeric addresses (-n) and process info (-p)."
          },
          {
            question: "What does 'fg %1' do?",
            options: [
              "Forces a background job to exit",
              "Brings job number 1 from background to foreground",
              "Creates a new foreground job",
              "Sends job 1 to the background"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "fg %1 brings the background job numbered 1 to the foreground so you can interact with it."
          },
          {
            question: "Where are systemd service unit files stored?",
            options: [
              "/etc/init.d/",
              "/lib/systemd/system/",
              "/etc/systemd.conf",
              "/usr/services/"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Default unit files are in /lib/systemd/system/. Custom overrides go in /etc/systemd/system/."
          },
          {
            question: "A process shows 'Z' in the STAT column. What is it?",
            options: [
              "Running at high priority",
              "A zombie - terminated but parent hasn't collected its exit status",
              "Stopped by a signal",
              "A session leader"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "Z means zombie - the process has exited but its parent hasn't called wait() to collect its exit status. It's not using resources but its PID entry remains."
          },
          {
            question: "What does 'pkill' do differently from 'kill'?",
            options: [
              "pkill only works on zombie processes",
              "pkill kills by process name, not by PID",
              "pkill is always safe to use",
              "pkill sends SIGKILL only"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "pkill matches processes by name (or other attributes) and sends a signal to all matching processes. kill requires a specific PID."
          }
        ]
      }
    ]
  },
  {
    id: "week06",
    title: "Python for Security Automation",
    durationText: "Week 6 - 5 Days",
    focus: "Python fundamentals, security libraries, and building custom scanning tools",
    output: "Working Python scripts for port scanning, directory brute-forcing, log parsing, and security header analysis",
    topics: [
      {
        id: "we06d01",
        title: "Python Foundations",
        description: "Master Python basics: variables, data types, strings, loops, conditionals, functions, and file I/O with security-focused examples.",
        type: "learn",
        duration: "5-6 hours",
        content: `## Before We Begin

**WHY:** You need Python to automate security tasks. Typing commands by hand is slow and error-prone. Python lets you write scripts that do the work for you.

**Your setup:**
- VS Code is your editor
- The terminal inside VS Code connects to WSL2 (Ubuntu)
- Python3 is already installed in WSL2

**Open the terminal:**
1. Open VS Code
2. Press \`Ctrl + \`\` (backtick key, top-left of keyboard)
3. You should see a terminal that says something like \`user@hostname:~$\`
4. Type \`python3 --version\` and press Enter
5. You should see \`Python 3.x.x\`

If it says "command not found", run \`sudo apt install python3 -y\` first.

**How to run Python code:**

Option A - Interactive shell (good for testing):
\`\`\`bash
python3
\`\`\`
You will see \`>>>\` which means Python is ready. Type \`exit()\` to leave.

Option B - Save to a file and run it (good for real scripts):
\`\`\`bash
touch hello.py
python3 hello.py
\`\`\`

:::tip
For this lesson, use the interactive shell (Option A) to try each example. Type each line after the \`>>>\` prompt.
:::

---

## 1. Variables

**WHY:** You need to store data so your script can use it later. Without variables, you would have to hardcode everything.

**Think of variables as sticky notes.** You write a label on the sticky note and stick a value on it. Later, you read the sticky note to get the value back.

\`\`\`python
target_ip = "192.168.1.1"
open_ports = 5
is_vulnerable = True
\`\`\`

- \`target_ip\` is a sticky note labeled "target_ip" with the value "192.168.1.1"
- \`open_ports\` is a sticky note with the number 5
- \`is_vulnerable\` is a sticky note with True (yes/no value)

**Rules for variable names:**
- Use letters, numbers, underscores
- Cannot start with a number
- No spaces
- Examples: \`target_ip\`, \`port_80\`, \`scan_result\`

**Try It Yourself:**
Open the Python shell (\`python3\`) and type:
\`\`\`python
target_ip = "192.168.1.1"
print(target_ip)
\`\`\`

:::practice
Create a variable called \`my_port\` and set it to 443. Then print it.
:::

---

## 2. Strings

**WHY:** Most security data is text - IP addresses, URLs, log lines, commands. Strings let you store and manipulate text.

**Strings are text wrapped in quotes.** Single or double quotes both work.

\`\`\`python
target_ip = "192.168.1.1"
scan_type = 'nmap -sV'
\`\`\`

**f-strings (format strings):**
Put an \`f\` before the quotes and use curly braces \`{}\` to insert variables.

\`\`\`python
target_ip = "192.168.1.1"
port = 80
print(f"Scanning {target_ip} on port {port}")
\`\`\`

Output: \`Scanning 192.168.1.1 on port 80\`

**Useful string methods:**

\`\`\`python
# .lower() - convert to lowercase (useful for comparing text)
response = "HTTP/1.1 200 OK"
print(response.lower())

# .strip() - remove extra spaces from start and end
password_hash = "  5f4dcc3b5aa765d61d8327deb882cf99  "
clean_hash = password_hash.strip()
print(clean_hash)

# .split() - break a string into parts
log_line = "192.168.1.10 - - [10:30:45] GET /admin 403"
parts = log_line.split()
print(parts[0])  # First part: the IP address

# "in" keyword - check if text contains something
user_agent = "Mozilla/5.0 Windows NT 10.0"
if "Windows" in user_agent:
    print("Windows user detected")
\`\`\`

**Try It Yourself:**
\`\`\`python
log_line = "192.168.1.10 - - [10:30:45] GET /admin 403"
parts = log_line.split()
print(f"IP: {parts[0]}")
print(f"Status: {parts[-1]}")
\`\`\`

:::practice
Create a variable \`target_url\` set to "http://example.com". Print it using an f-string like: "Target: http://example.com".
:::

---

## 3. Integers

**WHY:** Ports, timeouts, counts, and status codes are all numbers. You need integers to do math and comparisons.

**Integers are whole numbers with no quotes.**

\`\`\`python
port = 80
timeout = 30
status_code = 403
\`\`\`

**Math operations:**
\`\`\`python
port_start = 1
port_end = 1024
total_ports = port_end - port_start + 1
print(total_ports)  # 1024

# Check if a port is in a range
port = 443
if port >= 1 and port <= 1024:
    print("Privileged port")
\`\`\`

**Convert strings to integers:**
\`\`\`python
status_str = "403"
status_int = int(status_str)
if status_int >= 400:
    print("Client error")
\`\`\`

**Try It Yourself:**
\`\`\`python
port = 8080
if port > 1024:
    print("High port - not a system service")
\`\`\`

:::practice
Create two variables: \`start_port\` (1) and \`end_port\` (1000). Calculate how many ports that is and print the result.
:::

---

## 4. Booleans

**WHY:** Your script needs to make decisions. Is the port open? Is the user an admin? Booleans answer YES or NO.

**Think of Booleans as a light switch.** It is either ON (True) or OFF (False). Nothing in between.

\`\`\`python
is_vulnerable = True
scan_complete = False
is_admin = True
\`\`\`

**Booleans come from comparisons:**
\`\`\`python
port = 80
print(port == 80)    # True  (is it equal?)
print(port == 443)   # False
print(port != 443)   # True  (is it NOT equal?)
print(port > 1024)   # False (is it greater?)
print(port < 1024)   # True  (is it less?)
\`\`\`

**Combining conditions:**
\`\`\`python
is_admin = True
is_authenticated = True

if is_admin and is_authenticated:
    print("Full access")

if is_admin or is_authenticated:
    print("Some access")

if not is_admin:
    print("Not an admin")
\`\`\`

**Try It Yourself:**
\`\`\`python
port = 22
is_open = True
print(port == 22 and is_open)  # True
\`\`\`

:::practice
Create a variable \`status_code\` set to 403. Check if it equals 403 using \`==\`. Print the result.
:::

---

## 5. Lists

**WHY:** You often have many items of the same type - a list of IPs, a list of ports, a list of usernames. Lists hold them all in one variable.

**Think of a list as a numbered parking garage.** Each spot has a number starting from 0. You can put a car (value) in each spot.

\`\`\`python
ports = [22, 80, 443, 8080]
print(ports[0])  # 22  (first spot)
print(ports[1])  # 80  (second spot)
print(ports[-1]) # 8080 (last spot)
\`\`\`

**Important:** Counting starts at 0, not 1.

**Common list operations:**
\`\`\`python
# Add to a list
ports = [22, 80]
ports.append(443)
print(ports)  # [22, 80, 443]

# How many items?
print(len(ports))  # 3

# Check if something is in the list
if 80 in ports:
    print("Port 80 found!")

# Loop through a list
for port in ports:
    print(f"Checking port {port}")
\`\`\`

**Try It Yourself:**
\`\`\`python
targets = ["192.168.1.1", "192.168.1.2", "192.168.1.3"]
print(targets[0])
print(len(targets))

for ip in targets:
    print(f"Scanning {ip}")
\`\`\`

:::practice
Create a list of 3 usernames: "admin", "root", "test". Print the second one. Then loop through all of them.
:::

---

## 6. Dictionaries

**WHY:** Sometimes you need to store data with labels, not just numbers. A dictionary connects a key to a value, like a label on a box.

**Think of a dictionary as a contact card.** The name is the key, the phone number is the value.

\`\`\`python
target = {
    "ip": "192.168.1.1",
    "hostname": "webserver.local",
    "os": "Ubuntu 22.04",
    "open_ports": [22, 80, 443]
}

print(target["ip"])          # 192.168.1.1
print(target["hostname"])    # webserver.local
print(target["open_ports"])  # [22, 80, 443]
\`\`\`

**Adding and changing values:**
\`\`\`python
target["status"] = "scanned"
target["ip"] = "10.0.0.1"
print(target)
\`\`\`

**Looping through a dictionary:**
\`\`\`python
for key, value in target.items():
    print(f"{key}: {value}")
\`\`\`

**Try It Yourself:**
\`\`\`python
user = {
    "username": "admin",
    "role": "administrator",
    "active": True
}

print(f"User: {user['username']}")
print(f"Role: {user['role']}")
\`\`\`

:::practice
Create a dictionary for a server with keys: "ip", "port", and "service". Set the values to "10.0.0.5", 443, and "https". Print the service.
:::

---

## 7. Loops

**WHY:** Typing the same command 100 times is a waste of time. Loops let you repeat code automatically.

### For Loop

**Use a for loop when you have a list of items to go through.**

\`\`\`python
targets = ["192.168.1.1", "192.168.1.2", "192.168.1.3"]

for ip in targets:
    print(f"Scanning {ip}...")
\`\`\`

Output:
\`\`\`
Scanning 192.168.1.1...
Scanning 192.168.1.2...
Scanning 192.168.1.3...
\`\`\`

**Loop a specific number of times with range():**
\`\`\`python
for i in range(5):
    print(f"Attempt {i + 1}")
\`\`\`

**Get both index and value with enumerate():**
\`\`\`python
ports = [22, 80, 443]
for i, port in enumerate(ports):
    print(f"  {i + 1}. Port {port}")
\`\`\`

### While Loop

**Use a while loop when you want to keep going until something changes.**

\`\`\`python
attempts = 0
max_attempts = 3

while attempts < max_attempts:
    attempts += 1
    print(f"Attempt {attempts}/{max_attempts}")
\`\`\`

Output:
\`\`\`
Attempt 1/3
Attempt 2/3
Attempt 3/3
\`\`\`

**Try It Yourself:**
\`\`\`python
common_ports = [21, 22, 25, 80, 443, 3389]

for port in common_ports:
    if port == 22:
        print(f"Port {port} - SSH")
    elif port == 80 or port == 443:
        print(f"Port {port} - Web")
    else:
        print(f"Port {port} - Other")
\`\`\`

:::practice
Write a for loop that prints numbers 1 to 5 using \`range(6)\`. Then write a while loop that counts down from 5 to 1.
:::

---

## 8. If Statements

**WHY:** Your script needs to make decisions. If the port is 22, do one thing. If it is 80, do another. That is what if statements do.

\`\`\`python
port = 443

if port == 22:
    print("SSH service")
elif port == 80 or port == 443:
    print("Web service")
elif port == 3306:
    print("MySQL database")
else:
    print("Unknown service")
\`\`\`

Output: \`Web service\`

**How it works:**
- Python checks each condition from top to bottom
- It runs the first one that is True
- \`elif\` means "else if" - check this if the previous ones were False
- \`else\` means "if nothing else matched"

**Nested conditions:**
\`\`\`python
status_code = 403

if status_code >= 400:
    if status_code == 403:
        print("Forbidden - access denied")
    elif status_code == 404:
        print("Not found")
    else:
        print(f"Other 4xx error: {status_code}")
\`\`\`

**Try It Yourself:**
\`\`\`python
ip = "192.168.1.1"

if ip.startswith("192.168."):
    print("Private IP - internal network")
elif ip.startswith("10."):
    print("Private IP - Class A")
else:
    print("Public IP")
\`\`\`

:::practice
Create a variable \`status_code\` set to 500. Write an if/elif/else that prints "Server error" for 500+, "Client error" for 400+, and "Success" for 200-299.
:::

---

## 9. Functions

**WHY:** If you write the same code in multiple places, you will have to fix bugs in every place. A function is a reusable recipe - write it once, use it everywhere.

**Think of a function as a recipe.** You give it ingredients (parameters), it does the steps, and gives you back a dish (return value).

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Hello, Alice!
greet("Bob")    # Hello, Bob!
\`\`\`

**A function that returns a value:**
\`\`\`python
def build_scan_command(target, port):
    cmd = f"nmap -sV -p {port} {target}"
    return cmd

result = build_scan_command("192.168.1.1", 80)
print(result)
\`\`\`

Output: \`nmap -sV -p 80 192.168.1.1\`

**Default parameters:**
\`\`\`python
def scan_port(ip, port, timeout=2):
    print(f"Scanning {ip}:{port} (timeout: {timeout}s)")

scan_port("192.168.1.1", 80)        # Uses default timeout=2
scan_port("192.168.1.1", 443, 5)   # Uses timeout=5
\`\`\`

**Try It Yourself:**
\`\`\`python
def is_high_port(port):
    if port > 1024:
        return True
    return False

print(is_high_port(80))    # False
print(is_high_port(8080))  # True
\`\`\`

:::practice
Write a function called \`is_private_ip\` that takes an IP address string. Return True if it starts with "192.168." or "10.". Test it with "192.168.1.1" and "8.8.8.8".
:::

---

## 10. Files

**WHY:** Security tools read log files, write scan results, and save data. Python can read and write files easily.

**Writing to a file:**
\`\`\`python
with open("targets.txt", "w") as f:
    f.write("192.168.1.1\\n")
    f.write("192.168.1.2\\n")
    f.write("192.168.1.3\\n")
\`\`\`

- \`"w"\` means write mode (creates new file or overwrites)
- \`"a"\` means append mode (adds to the end)
- \`with\` automatically closes the file when done

**Reading from a file:**
\`\`\`python
# Read everything at once
with open("targets.txt", "r") as f:
    content = f.read()
    print(content)

# Read line by line (better for large files)
with open("targets.txt", "r") as f:
    for line in f:
        ip = line.strip()  # Remove the newline character
        print(f"Target: {ip}")
\`\`\`

**Try It Yourself:**
\`\`\`python
# Write some data
with open("test.txt", "w") as f:
    f.write("line one\\n")
    f.write("line two\\n")

# Read it back
with open("test.txt", "r") as f:
    for line in f:
        print(line.strip())
\`\`\`

:::practice
Create a file called "ports.txt" with three port numbers (one per line: 22, 80, 443). Then read the file and print each port.
:::

---

## 11. Security Example: Log Parser

Let's combine everything you learned. This script reads a fake SSH log and finds brute-force attackers.

\`\`\`python
# Sample log data (in real life, you would read from /var/log/auth.log)
sample_log = [
    "Failed password for root from 192.168.1.100 port 22",
    "Failed password for admin from 192.168.1.100 port 22",
    "Failed password for root from 192.168.1.100 port 22",
    "Accepted publickey for user1 from 10.0.0.5 port 22",
    "Failed password for root from 192.168.1.100 port 22",
    "Failed password for root from 10.0.0.99 port 22",
    "Accepted password for test from 192.168.1.50 port 22",
]

# Dictionary to count failed attempts per IP
failed_attempts = {}

for line in sample_log:
    if "Failed password" in line:
        parts = line.split("from ")
        ip = parts[1].split(" ")[0]
        if ip in failed_attempts:
            failed_attempts[ip] += 1
        else:
            failed_attempts[ip] = 1

# Print results
print("=== Suspicious IPs ===")
for ip, count in failed_attempts.items():
    if count >= 3:
        print(f"BLOCK {ip}: {count} failed attempts")
    else:
        print(f"WATCH {ip}: {count} failed attempts")
\`\`\`

Output:
\`\`\`
=== Suspicious IPs ===
BLOCK 192.168.1.100: 4 failed attempts
WATCH 10.0.0.99: 1 failed attempts
\`\`\`

**What this script uses:**
- **Variables** to store data
- **Strings** to parse log lines
- **Lists** to hold log entries
- **Dictionaries** to count attempts per IP
- **For loop** to go through each line
- **If statements** to check for "Failed password"
- **f-strings** to format the output

---

## Mini Quiz

Test your knowledge. Answers are at the bottom.

**Q1:** What is the index of "443" in this list: \`ports = [22, 80, 443, 8080]\`?

**Q2:** What does \`f"IP: {target_ip}"\` do?

**Q3:** What is the difference between \`=\` and \`==\`?

**Q4:** What does \`"w"\` mean when opening a file?

**Q5:** What does this print?
\`\`\`python
x = 10
if x > 5:
    print("big")
else:
    print("small")
\`\`\`

---

**Answers:**

1. Index 2 (counting starts at 0)
2. It creates a string and inserts the value of \`target_ip\` into it
3. \`=\` assigns a value. \`==\` compares two values.
4. Write mode - creates a new file or overwrites an existing one
5. "big"
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
              "No exceptions - it's a pass statement"
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
- Understand what Python libraries are and why they matter for security
- Use requests to fetch web pages and check security headers
- Use socket to resolve DNS and check open ports
- Use hashlib to hash strings and verify file integrity
- Use re to extract patterns like IP addresses from text
- Combine all four libraries into a working log parser
:::

## Before We Begin

### What Are Libraries?

Think of a library as a toolbox. Instead of building a wrench from scratch, you open a toolbox and grab one.

Python comes with many built-in toolboxes. Today we use four:

| Library | What It Does | Security Use |
|---------|-------------|--------------|
| requests | Talks to web servers | Check headers, fetch pages |
| socket | Opens network connections | Port scanning, DNS lookups |
| hashlib | Creates fingerprints of data | Verify file integrity, crack hashes |
| re | Finds patterns in text | Extract IPs, parse logs |

### Why This Matters

Security work means talking to networks, checking websites, hashing files, and reading logs. These four libraries handle all of that.

Open your VS Code terminal (Ctrl + backtick) and let's start.

---

## Part 1: requests — Sending a Letter

Think of requests like sending a letter. You write a request, mail it to a server, and get a response back.

### Install requests

\`\`\`bash
pip3 install requests
\`\`\`

### GET Request — Asking for a Page

\`\`\`python
import requests

response = requests.get("http://example.com")
print(f"Status: {response.status_code}")
print(f"Server: {response.headers.get('Server', 'Unknown')}")
\`\`\`

**What happened:**
- You sent a GET request (like asking "give me this page")
- The server replied with a status code (200 = OK)
- The response headers tell you what software the server runs

### Status Codes — The Server's Mood

| Code | Meaning | Security Note |
|------|---------|---------------|
| 200 | OK | Page exists |
| 301 | Moved | Redirect — follow it |
| 403 | Forbidden | You're blocked |
| 404 | Not Found | Page doesn't exist |
| 500 | Server Error | Something broke (probe further) |

### POST Request — Sending Data

\`\`\`python
data = {"username": "admin", "password": "test123"}
response = requests.post("http://httpbin.org/post", data=data)
print(f"POST status: {response.status_code}")
\`\`\`

### Check Security Headers

\`\`\`python
response = requests.get("http://example.com")
headers = response.headers

security_headers = [
    "Content-Security-Policy",
    "Strict-Transport-Security",
    "X-Content-Type-Options",
    "X-Frame-Options"
]

print("=== Security Header Check ===")
for header in security_headers:
    value = headers.get(header)
    if value:
        print(f"  [PASS] {header}: {value[:50]}")
    else:
        print(f"  [MISSING] {header}")
\`\`\`

### Handle Errors

\`\`\`python
try:
    response = requests.get("http://nonexistent.invalid", timeout=5)
except requests.exceptions.ConnectionError:
    print("Connection failed — host unreachable")
except requests.exceptions.Timeout:
    print("Request timed out")
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
\`\`\`

**Why timeout?** Without it, your script hangs forever if the server doesn't respond.

### Try It Yourself

1. Fetch \`http://httpbin.org/get\` and print the response body
2. Check if \`https://google.com\` has a Content-Security-Policy header
3. Try fetching a non-existent URL and catch the error

---

## Part 2: socket — Making a Phone Call

Think of sockets like phone calls. You dial a number (IP + port), and if someone answers, the port is open.

### DNS Resolution — Looking Up a Number

\`\`\`python
import socket

hostname = "example.com"
ip = socket.gethostbyname(hostname)
print(f"{hostname} resolves to {ip}")
\`\`\`

### Check if a Port Is Open

\`\`\`python
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

target = "127.0.0.1"
test_ports = [22, 80, 443, 3306, 8080]

for port in test_ports:
    status = "OPEN" if check_port(target, port) else "closed"
    print(f"  Port {port}: {status}")
\`\`\`

**What connect_ex returns:**
- 0 = port is open (someone answered the phone)
- Non-zero = port is closed or blocked

### Try It Yourself

1. Resolve the IP address of \`scanme.nmap.org\`
2. Check if ports 22, 80, and 443 are open on \`scanme.nmap.org\`
3. Check what ports are open on \`127.0.0.1\` (your own machine)

---

## Part 3: hashlib — Fingerprinting Data

Think of hashing like fingerprinting. Every file or string gets a unique fingerprint. Change one tiny thing, and the fingerprint changes completely.

### Hash a String

\`\`\`python
import hashlib

message = "password123"

md5 = hashlib.md5(message.encode()).hexdigest()
print(f"MD5:     {md5}")

sha1 = hashlib.sha1(message.encode()).hexdigest()
print(f"SHA-1:   {sha1}")

sha256 = hashlib.sha256(message.encode()).hexdigest()
print(f"SHA-256: {sha256}")
\`\`\`

**Which to use?**
- MD5 — broken, never use for security. But you'll see it in CTFs.
- SHA-1 — also broken. Avoid.
- SHA-256 — strong. Use this.

### Verify a File

\`\`\`python
def hash_file(filepath):
    """Calculate SHA-256 hash of a file."""
    sha256 = hashlib.sha256()
    with open(filepath, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            sha256.update(chunk)
    return sha256.hexdigest()

# Create a test file to hash
with open("/tmp/test.txt", "w") as f:
    f.write("Hello, security!")

file_hash = hash_file("/tmp/test.txt")
print(f"File hash: {file_hash}")
\`\`\`

**Why read in chunks?** Large files won't fit in memory. Reading piece by piece works for any file size.

### Crack a Hash (Demo)

\`\`\`python
known_hashes = {
    "482c811da5d5b4bc6d497ffa98491e38": "password123",
    "e99a18c428cb38d5f260853678922e03": "abc123",
    "d8578edf8458ce06fbc5bb76a58c5ca4": "qwerty"
}

target = "482c811da5d5b4bc6d497ffa98491e38"
if target in known_hashes:
    print(f"Cracked: {target} = {known_hashes[target]}")
else:
    print("Hash not found in dictionary")
\`\`\`

### Try It Yourself

1. Hash the string "admin" with SHA-256
2. Create a file, hash it, then change one character and hash again — compare the results
3. Look up the MD5 hash \`5f4dcc3b5aa765d61d8327deb882cf99\` — what does it crack to?

---

## Part 4: re — Pattern Matching

Think of regex like a metal detector. You tell it what pattern to look for, and it scans through text finding every match.

### Find IP Addresses

\`\`\`python
import re

log_data = """
192.168.1.1 - - [22/Jun/2026] "GET /admin" 403
10.0.0.5 - - [22/Jun/2026] "POST /login" 200
Connection from 203.0.113.42 refused
"""

ip_pattern = r'\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b'
ips = re.findall(ip_pattern, log_data)
print("IPs found:", ips)
\`\`\`

### Parse Failed Logins

\`\`\`python
auth_log = """
Failed password for root from 192.168.1.100 port 22
Failed password for admin from 192.168.1.100 port 22
Accepted password for user1 from 10.0.0.5 port 22
Failed password for root from 10.0.0.99 port 22
"""

failed_pattern = r'Failed password for (\\w+) from (\\S+)'
failures = re.findall(failed_pattern, auth_log)

print("Failed logins:")
for user, ip in failures:
    print(f"  User: {user} from {ip}")
\`\`\`

### Mask Sensitive Data

\`\`\`python
sensitive = 'User admin logged in with password=secret123 at 10:00'
masked = re.sub(r'password=\\S+', 'password=***', sensitive)
print(masked)
\`\`\`

### Try It Yourself

1. Extract all email addresses from: "Contact admin@corp.com or help@site.org"
2. Count how many failed logins came from 192.168.1.100
3. Write a pattern to find all URLs (http://...) in a block of text

---

## Part 5: Build a Log Parser

Now let's combine everything. Save this as \`~/labs/web/log_parser.py\`:

\`\`\`python
#!/usr/bin/env python3
"""
Security Log Parser — extracts failed logins and suspicious IPs.
Usage: python3 log_parser.py <logfile>
"""

import re
import sys
from collections import Counter

def parse_auth_log(filepath):
    """Parse an authentication log file."""
    failed = []
    successful = []
    ip_counter = Counter()

    failed_pattern = r'Failed password for (\\w+) from (\\S+) port (\\d+)'
    success_pattern = r'Accepted (?:password|publickey) for (\\w+) from (\\S+) port (\\d+)'

    with open(filepath, 'r') as f:
        for line_num, line in enumerate(f, 1):
            fail_match = re.search(failed_pattern, line)
            if fail_match:
                user, ip, port = fail_match.groups()
                failed.append({'line': line_num, 'user': user, 'ip': ip})
                ip_counter[ip] += 1
                continue

            success_match = re.search(success_pattern, line)
            if success_match:
                user, ip, port = success_match.groups()
                successful.append({'line': line_num, 'user': user, 'ip': ip})

    return failed, successful, ip_counter

def generate_report(failed, successful, ip_counter):
    """Generate a security report."""
    print("=" * 50)
    print("SECURITY LOG ANALYSIS")
    print("=" * 50)

    print(f"\\nFailed logins: {len(failed)}")
    print(f"Successful logins: {len(successful)}")

    print("\\n--- Top Offending IPs ---")
    for ip, count in ip_counter.most_common(10):
        severity = "CRITICAL" if count >= 5 else "HIGH" if count >= 3 else "MEDIUM"
        print(f"  [{severity}] {ip}: {count} attempts")

    print("\\n--- Targeted Users ---")
    users = set(f['user'] for f in failed)
    for user in sorted(users):
        count = sum(1 for f in failed if f['user'] == user)
        print(f"  {user}: {count} attempts")

    print("\\n" + "=" * 50)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <logfile>")
        sys.exit(1)

    failed, successful, ip_counter = parse_auth_log(sys.argv[1])
    generate_report(failed, successful, ip_counter)
\`\`\`

**What this script uses:**
- **re** to extract usernames and IPs from log lines
- **Counter** to count attempts per IP
- **sys.argv** to accept the log file path from the command line

### Practice

1. Create a sample log file with some fake entries
2. Run the parser on it
3. Modify the script to also flag IPs with more than 3 failed attempts as "BLOCK"

---

## Mini Quiz

Test your knowledge. Answers are at the bottom.

**Q1:** What does \`requests.get(url, timeout=5)\` do differently from \`requests.get(url)\`?

**Q2:** What does \`socket.connect_ex()\` return when a port is open?

**Q3:** Why is SHA-256 better than MD5 for security?

**Q4:** What does \`re.findall(pattern, text)\` return?

**Q5:** Why do we read files in chunks when hashing them?

---

**Answers:**

1. It stops waiting after 5 seconds if the server doesn't respond, preventing the script from hanging
2. It returns 0 (success)
3. MD5 is broken — attackers can create collisions. SHA-256 is still strong.
4. A list of all matches found in the text
5. Large files may not fit in memory. Chunks let you process any file size.
:::checkpoint
1. What does requests.get() return?
2. How do you find all IP addresses in a string using re?
3. What is the difference between MD5 and SHA-256?
4. Why use a timeout with requests.get()?
5. What does connect_ex() return when a port is open?
:::
`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Explain the difference between a GET and a POST request, and when you'd use each in security testing.",
        interviewAnswer: "GET requests retrieve data and append parameters in the URL, making them visible in logs and browser history - useful for testing for parameter manipulation. POST requests send data in the request body, which is better for submitting forms, login credentials, and file uploads. In security testing, you test GET for URL-based injection and POST for form-based vulnerabilities like SQL injection.",
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
              "It's vulnerable to collision attacks - different inputs can produce the same hash",
              "It only works on Windows",
              "It requires a GPU to compute"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "MD5 is cryptographically broken - attackers can easily create two different inputs that produce the same hash."
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
- Understand why security pros build their own tools
- Build a TCP port scanner step by step using Python sockets
- Add threading to make the scanner fast
- Build a directory brute-forcer step by step using requests
- Combine both tools into a security toolkit
:::

## Before We Begin: Why Build Your Own Tools?

You already know how to use nmap and gobuster. So why build your own?

Three reasons:

1. **Understanding**. When you build a tool, you know exactly what it does. No magic.
2. **Customization**. Off-the-shelf tools do one thing. Your tool can do exactly what you need.
3. **Interviews**. Employers love candidates who can build, not just use.

Think of it like cooking. You can order takeout. But if you know how to cook, you can make anything.

:::warning
Only scan systems you own or have explicit permission to test. Unauthorized scanning is illegal.
:::

## Project 1: Port Scanner

We will build this in 5 steps. Each step adds one feature. Test after every step.

### Step 1: Connect to One Port

A port is like a door on a building. Each door leads to a different service.

- Port 22 = SSH (remote login)
- Port 80 = HTTP (web server)
- Port 443 = HTTPS (secure web)

Our first task: check if one door is open.

Create the project folder:

\`\`\`bash
mkdir -p ~/tools
cd ~/tools
\`\`\`

Save as \`~/tools/scanner_step1.py\`:

\`\`\`python
import socket

target = "127.0.0.1"
port = 80

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.settimeout(1)
result = sock.connect_ex((target, port))

if result == 0:
    print(f"Port {port} is OPEN")
else:
    print(f"Port {port} is CLOSED")

sock.close()
\`\`\`

Run it:

\`\`\`bash
python3 scanner_step1.py
\`\`\`

**What is happening?**

- \`socket.socket()\` creates a connection object
- \`connect_ex()\` tries to connect. Returns 0 if success, error code if fail
- We use \`connect_ex()\` instead of \`connect()\` because \`connect()\` throws an exception on failure. \`connect_ex()\` just returns a number. Cleaner code.

:::checkpoint
Try changing the port to 22, 443, 9999. What happens?
:::

### Step 2: Scan Multiple Ports

One port is not useful. We need to check many ports.

A \`for\` loop lets us repeat the connection test for each port number.

Save as \`~/tools/scanner_step2.py\`:

\`\`\`python
import socket

target = "127.0.0.1"

print(f"Scanning {target}...")
print("-" * 30)

for port in range(1, 1025):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(1)
    result = sock.connect_ex((target, port))

    if result == 0:
        print(f"  Port {port} is OPEN")

    sock.close()

print("Done.")
\`\`\`

Run it:

\`\`\`bash
python3 scanner_step2.py
\`\`\`

**Problem**: This is slow. 1024 ports x 1 second timeout = up to 17 minutes.

We need to make it faster.

### Step 3: Add Threading for Speed

Imagine you have 100 tasks. Doing them one by one takes 100 minutes.

Now imagine you have 100 workers. Each does one task. Total time: 1 minute.

That is threading. One thread = one worker.

Python's \`ThreadPoolExecutor\` manages a pool of worker threads for us.

Save as \`~/tools/scanner_step3.py\`:

\`\`\`python
import socket
from concurrent.futures import ThreadPoolExecutor

target = "127.0.0.1"

def scan_port(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(1)
    result = sock.connect_ex((target, port))
    sock.close()

    if result == 0:
        return port
    return None

print(f"Scanning {target} with threads...")
print("-" * 30)

open_ports = []

with ThreadPoolExecutor(max_workers=100) as executor:
    results = executor.map(scan_port, range(1, 1025))

    for port in results:
        if port is not None:
            print(f"  Port {port} is OPEN")
            open_ports.append(port)

print(f"\\nDone. Open ports: {len(open_ports)}")
\`\`\`

Run it:

\`\`\`bash
python3 scanner_step3.py
\`\`\`

**What changed?**

- \`ThreadPoolExecutor(max_workers=100)\` creates 100 worker threads
- \`executor.map()\` sends each port number to a thread
- All 100 ports are scanned at the same time
- 1024 ports now take about 10 seconds instead of 17 minutes

:::checkpoint
Change \`max_workers\` to 10, then 500. What happens to the speed?
:::

### Step 4: Identify Services

An open port is useful. But knowing *what service* runs on that port is more useful.

\`socket.getservbyport()\` looks up the service name for a port number.

Save as \`~/tools/scanner_step4.py\`:

\`\`\`python
import socket
from concurrent.futures import ThreadPoolExecutor

target = "127.0.0.1"

def scan_port(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(1)
    result = sock.connect_ex((target, port))
    sock.close()

    if result == 0:
        try:
            service = socket.getservbyport(port, 'tcp')
        except OSError:
            service = "unknown"
        return port, service
    return None

print(f"Scanning {target}...")
print("-" * 40)

open_ports = []

with ThreadPoolExecutor(max_workers=100) as executor:
    results = executor.map(scan_port, range(1, 1025))

    for result in results:
        if result is not None:
            port, service = result
            print(f"  Port {port:5d}  {service}")
            open_ports.append((port, service))

print(f"\\nDone. Open ports: {len(open_ports)}")
\`\`\`

Run it:

\`\`\`bash
python3 scanner_step4.py
\`\`\`

### Step 5: Add Output Formatting and File Saving

Real tools save results. They also accept user input.

Save as \`~/tools/port_scanner.py\` (our final version):

\`\`\`python
#!/usr/bin/env python3
import socket
import sys
import time
from concurrent.futures import ThreadPoolExecutor

def scan_port(target, port):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((target, port))
        sock.close()

        if result == 0:
            try:
                service = socket.getservbyport(port, 'tcp')
            except OSError:
                service = "unknown"
            return port, service
    except socket.error:
        pass
    return None

def main():
    if len(sys.argv) < 2:
        print(f"Usage: python3 {sys.argv[0]} <target> [start] [end] [threads]")
        print(f"Example: python3 {sys.argv[0]} 192.168.1.1 1 1024 100")
        sys.exit(1)

    target = sys.argv[1]
    start_port = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    end_port = int(sys.argv[3]) if len(sys.argv) > 3 else 1024
    threads = int(sys.argv[4]) if len(sys.argv) > 4 else 100

    try:
        target_ip = socket.gethostbyname(target)
        print(f"Target: {target} ({target_ip})")
    except socket.gaierror:
        print(f"Error: Cannot resolve {target}")
        sys.exit(1)

    print(f"Scanning ports {start_port}-{end_port} with {threads} threads")
    print("-" * 50)

    start_time = time.time()
    open_ports = []

    with ThreadPoolExecutor(max_workers=threads) as executor:
        results = executor.map(lambda p: scan_port(target_ip, p), range(start_port, end_port + 1))

        for result in results:
            if result is not None:
                port, service = result
                print(f"  [OPEN]  {port:5d}  {service}")
                open_ports.append((port, service))

    elapsed = time.time() - start_time

    print("-" * 50)
    print(f"Scan complete in {elapsed:.2f} seconds")
    print(f"Open ports found: {len(open_ports)}")

    if open_ports:
        output_file = f"scan_{target}_{int(time.time())}.txt"
        with open(output_file, "w") as f:
            for port, service in sorted(open_ports):
                f.write(f"{port}/tcp  open  {service}\\n")
        print(f"Results saved to {output_file}")

if __name__ == "__main__":
    main()
\`\`\`

Run it:

\`\`\`bash
cd ~/tools
python3 port_scanner.py 127.0.0.1 1 1024 100
\`\`\`

### Try It Yourself: Port Scanner

Before moving on, try these:

1. Run the scanner against \`scanme.nmap.org\` (nmap's legal test target)
2. Change the timeout from 1 to 0.5 seconds. What happens?
3. Add a progress indicator that prints every 100 ports scanned
4. Add a \`--json\` flag that outputs results as JSON instead of text

## Project 2: Directory Brute-Forcer

Web servers have hidden pages. \`/admin\`, \`/backup\`, \`/config\`, \`.git\`.

A directory brute-forcer tries a list of common paths and reports which ones exist.

We build this in 4 steps.

### Step 1: Make One HTTP Request

Before we brute-force, we need to check one URL.

The \`requests\` library makes HTTP requests in Python.

Install it first:

\`\`\`bash
pip3 install requests
\`\`\`

Save as \`~/tools/dir_step1.py\`:

\`\`\`python
import requests

url = "http://testphp.vulnweb.com/admin"
response = requests.get(url)

print(f"URL: {url}")
print(f"Status: {response.status_code}")
print(f"Size: {len(response.content)} bytes")
\`\`\`

Run it:

\`\`\`bash
python3 dir_step1.py
\`\`\`

**Status codes tell you what happened:**

| Code | Meaning |
|------|---------|
| 200 | Found! Page exists |
| 301 | Redirect (page moved) |
| 403 | Forbidden (exists, but blocked) |
| 404 | Not found |

### Step 2: Read a Wordlist File

A wordlist is a text file. One word per line. Each word is a path to try.

\`\`\`
admin
login
dashboard
api
backup
.git
.env
\`\`\`

Save as \`~/tools/dir_step2.py\`:

\`\`\`python
import requests

# Create a small wordlist
words = ["admin", "login", "dashboard", "api", "backup", "test", ".git", ".env"]

url = "http://testphp.vulnweb.com"

for word in words:
    full_url = f"{url}/{word}"
    response = requests.get(full_url)
    print(f"[{response.status_code}] /{word}")
\`\`\`

Run it:

\`\`\`bash
python3 dir_step2.py
\`\`\`

### Step 3: Check Status Codes and Filter

We do not care about 404 (not found). We only want interesting responses.

Also, we should stop following redirects. A 301 is useful info by itself.

Save as \`~/tools/dir_step3.py\`:

\`\`\`python
import requests

words = ["admin", "login", "dashboard", "api", "backup", "test", ".git", ".env"]
url = "http://testphp.vulnweb.com"

print(f"Scanning {url}...")
print("-" * 50)

for word in words:
    full_url = f"{url}/{word}"
    response = requests.get(full_url, allow_redirects=False)

    status = response.status_code

    if status != 404:
        size = len(response.content)
        print(f"  [{status}] /{word:<20} ({size} bytes)")

print("Done.")
\`\`\`

Run it:

\`\`\`bash
python3 dir_step3.py
\`\`\`

**Key change**: \`allow_redirects=False\`. This tells requests to stop at 301/302 instead of following them. We want to see the redirect, not the destination.

### Step 4: Add Threading and Wordlist File

Same idea as the port scanner. Use threads to check many URLs at once.

Save as \`~/tools/dir_brute.py\` (final version):

\`\`\`python
#!/usr/bin/env python3
import requests
import sys
import time
from concurrent.futures import ThreadPoolExecutor

def check_path(url, path):
    full_url = f"{url.rstrip('/')}/{path.strip()}"
    try:
        response = requests.get(
            full_url,
            timeout=5,
            allow_redirects=False,
            headers={"User-Agent": "Mozilla/5.0 (SecurityScanner/1.0)"}
        )
        if response.status_code != 404:
            return path, response.status_code, len(response.content)
    except requests.exceptions.RequestException:
        pass
    return None

def main():
    if len(sys.argv) < 3:
        print(f"Usage: python3 {sys.argv[0]} <url> <wordlist> [threads]")
        print(f"Example: python3 {sys.argv[0]} http://192.168.1.1 wordlist.txt 50")
        sys.exit(1)

    url = sys.argv[1]
    wordlist_path = sys.argv[2]
    threads = int(sys.argv[3]) if len(sys.argv) > 3 else 50

    if not url.startswith(("http://", "https://")):
        url = "http://" + url

    try:
        with open(wordlist_path, "r") as f:
            words = [line.strip() for line in f if line.strip()]
    except FileNotFoundError:
        print(f"Error: File not found: {wordlist_path}")
        sys.exit(1)

    print(f"Target: {url}")
    print(f"Wordlist: {wordlist_path} ({len(words)} entries)")
    print(f"Threads: {threads}")
    print("-" * 50)

    start_time = time.time()
    found = []

    with ThreadPoolExecutor(max_workers=threads) as executor:
        results = executor.map(lambda w: check_path(url, w), words)

        for result in results:
            if result is not None:
                path, status, size = result
                print(f"  [{status}] /{path:<25} ({size} bytes)")
                found.append((path, status, size))

    elapsed = time.time() - start_time

    print("-" * 50)
    print(f"Done in {elapsed:.2f} seconds")
    print(f"Found: {len(found)} paths")

    if found:
        output_file = f"dirscan_{url.split('//')[1].replace('/', '_')}_{int(time.time())}.txt"
        with open(output_file, "w") as f:
            for path, status, size in sorted(found):
                f.write(f"[{status}] /{path} ({size} bytes)\\n")
        print(f"Results saved to {output_file}")

if __name__ == "__main__":
    main()
\`\`\`

Create a test wordlist and run:

\`\`\`bash
cd ~/tools

cat > wordlist.txt << 'EOF'
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

python3 dir_brute.py http://testphp.vulnweb.com wordlist.txt 20
\`\`\`

### Try It Yourself: Directory Brute-Forcer

1. Add the response body size to the output. Does size help distinguish real pages from error pages?
2. Try a bigger wordlist. Download from: \`wget https://github.com/danielmiessler/SecLists/raw/master/Discovery/Web-Content/common.txt\`
3. Add a \`--status\` flag to only show responses with specific codes (e.g., \`--status 200,301\`)
4. What happens if you remove \`allow_redirects=False\`? Test it.

## Project 3: Security Toolkit

Now combine both tools into one script.

Save as \`~/tools/security_toolkit.py\`:

\`\`\`python
#!/usr/bin/env python3
import socket
import requests
import sys
from concurrent.futures import ThreadPoolExecutor

def quick_scan(target, ports=[22, 80, 443, 8080, 8443, 3306, 3389]):
    print("\\n[1] Quick Port Scan")
    print("-" * 40)
    open_ports = []
    for port in ports:
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(1)
            result = sock.connect_ex((target, port))
            if result == 0:
                try:
                    service = socket.getservbyport(port, 'tcp')
                except OSError:
                    service = "unknown"
                print(f"  OPEN  {port}/tcp  {service}")
                open_ports.append((port, service))
            sock.close()
        except:
            pass
    if not open_ports:
        print("  No open ports found")
    return open_ports

def check_headers(url):
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
            ('X-Powered-By', 'Server Info Leaked'),
        ]
        for header, name in checks:
            value = headers.get(header)
            if header == 'X-Powered-By':
                if value:
                    print(f"  [WARN] {name}: {value}")
                else:
                    print(f"  [OK]   {name}: Not present")
            else:
                if value:
                    print(f"  [OK]   {name}: Present")
                else:
                    print(f"  [MISS] {name}: Missing")
    except Exception as e:
        print(f"  Error: {e}")

def main():
    if len(sys.argv) < 3:
        print(f"Usage: python3 {sys.argv[0]} <ip> <url>")
        print(f"Example: python3 {sys.argv[0]} 192.168.1.1 http://192.168.1.1")
        sys.exit(1)

    target_ip = sys.argv[1]
    target_url = sys.argv[2]

    if not target_url.startswith(('http://', 'https://')):
        target_url = 'http://' + target_url

    print("=" * 50)
    print("SECURITY TOOLKIT")
    print("=" * 50)

    open_ports = quick_scan(target_ip)
    check_headers(target_url)

    print("\\n" + "=" * 50)
    print("SUMMARY")
    print("=" * 50)
    print(f"Open ports: {len(open_ports)}")

if __name__ == "__main__":
    main()
\`\`\`

Run it:

\`\`\`bash
cd ~/tools
python3 security_toolkit.py 127.0.0.1 http://127.0.0.1
\`\`\`

### Try It Yourself: Toolkit

1. Add a third function that checks for \`/robots.txt\` and prints any disallowed paths
2. Add a function that grabs the server banner (the \`Server\` header)
3. Save all results to a single report file

## Practice

Complete these to lock in your skills:

1. **Modify the port scanner** to also scan UDP ports (hint: \`socket.SOCK_DGRAM\`)
2. **Add a delay option** to the directory brute-forcer (e.g., \`--delay 0.1\` to wait 100ms between requests)
3. **Build a subdomain scanner** that takes a domain and wordlist, then resolves \`word.domain.com\` for each word
4. **Combine all three** (port scan + dir brute + subdomain) into one mega toolkit

:::checkpoint
1. Why does the port scanner use \`connect_ex()\` instead of \`connect()\`?
2. What does \`ThreadPoolExecutor\` do and why is it faster?
3. Why do we set \`allow_redirects=False\` in the directory brute-forcer?
4. What status codes does the brute-forcer report? Why skip 404?
5. How would you modify the tools to output JSON for use with other programs?
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
              "IP addresses are always more accurate than hostnames"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "Resolving the hostname first lets us handle DNS failures gracefully before attempting any connections, providing cleaner error messages."
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
              "403 means the directory exists but access is denied - worth noting",
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
              "Nothing - more threads is always better"
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
              "Write the data as XML instead"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "The json module's json.dumps() serializes Python objects (like lists and dicts) into JSON strings. You'd serialize the results and either print or write them to a file."
          }
        ]
      },
      {
        id: "we06d04",
        title: "Text Processing for Security",
        description: "Master grep, sed, and awk for log analysis, parsing /etc/passwd, extracting failed SSH attempts, and building security analysis pipelines.",
        type: "practice",
        duration: "3-4 hours",
        content: `:::objectives
- Understand why text processing is a core security skill
- Use grep to search logs for attack patterns
- Use sed to redact and transform log data
- Use awk to extract columns from structured logs
- Build a combined pipeline to analyze auth.log
:::

## Before We Begin: Why Text Processing Matters

Imagine you are a security analyst. Your server just got attacked. You have a 2 GB log file. You need answers now.

- Who attacked you?
- When did it happen?
- What did they try?

You cannot read 2 GB by hand. You need tools that search, filter, and extract data fast. That is what grep, sed, and awk do. They are the foundation of security log analysis. Every SOC analyst, penetration tester, and incident responder uses them daily.

:::tip
Think of these three tools as specialized search functions:
- **grep** = Find lines that match a pattern
- **sed** = Edit or transform those lines
- **awk** = Extract specific columns from those lines
:::

## Step 1: grep — Searching for a Word in a Book

Imagine a 1000-page book. You want every page that says "password." You cannot read every page. grep does it instantly.

### Basic grep

\`\`\`bash
# Create a sample log file to practice with
cat > ~/labs/web/sample_auth.log << 'EOF'
Jun 22 10:01:23 server sshd[1234]: Failed password for root from 192.168.1.100 port 22 ssh2
Jun 22 10:01:25 server sshd[1235]: Failed password for admin from 192.168.1.100 port 22 ssh2
Jun 22 10:01:27 server sshd[1236]: Failed password for root from 192.168.1.100 port 22 ssh2
Jun 22 10:02:01 server sshd[1237]: Accepted publickey for user1 from 10.0.0.5 port 22 ssh2
Jun 22 10:02:15 server sshd[1238]: Failed password for root from 192.168.1.100 port 22 ssh2
Jun 22 10:03:00 server sshd[1239]: Failed password for root from 10.0.0.99 port 22 ssh2
Jun 22 10:03:05 server sshd[1240]: Connection closed by authenticating user root 192.168.1.100 port 22 [preauth]
Jun 22 10:04:00 server sshd[1241]: Accepted password for test from 192.168.1.50 port 22 ssh2
Jun 22 10:05:00 server nginx[1300]: 200 GET /index.html from 192.168.1.1
Jun 22 10:05:30 server nginx[1301]: 403 GET /admin from 192.168.1.100
Jun 22 10:06:00 server kernel: [UFW BLOCK] IN=eth0 SRC=203.0.113.42 DST=192.168.1.1
EOF
\`\`\`

\`\`\`bash
# Find every line containing "Failed"
grep "Failed" ~/labs/web/sample_auth.log

# Case-insensitive search (matches "failed", "FAILED", "Failed")
grep -i "failed" ~/labs/web/sample_auth.log

# Show line numbers
grep -n "Failed" ~/labs/web/sample_auth.log

# Count how many lines match
grep -c "Failed password" ~/labs/web/sample_auth.log

# Show lines that do NOT match (invert)
grep -v "sshd" ~/labs/web/sample_auth.log
\`\`\`

**Expected output for \`grep -c "Failed password":**
\`\`\`
5
\`\`\`

### grep Flags Cheat Sheet

| Flag | What It Does | Example |
|---|---|---|
| \`-i\` | Case-insensitive | \`grep -i "error" log.txt\` |
| \`-n\` | Show line numbers | \`grep -n "Failed" log.txt\` |
| \`-c\` | Count matches only | \`grep -c "Failed" log.txt\` |
| \`-v\` | Invert (show non-matches) | \`grep -v "sshd" log.txt\` |
| \`-o\` | Show only the matched part | \`grep -o "root" log.txt\` |
| \`-r\` | Search recursively in dirs | \`grep -r "password" /etc/\` |

### grep with Regex

Regex (regular expressions) are patterns. They let you search for things like "any IP address" instead of a fixed string.

| Pattern | What It Matches | Example |
|---|---|---|
| \`.\` | Any single character | \`grep "r.o" file\` matches "root", "rXo" |
| \`[0-9]\` | Any digit | \`grep "[0-9]" file\` matches lines with digits |
| \`^\` | Start of line | \`grep "^Jun" file\` matches lines starting with Jun |
| \`$\` | End of line | \`grep "ssh2$" file\` matches lines ending with ssh2 |
| \`.*\` | Any number of any character | \`grep "Failed.*root" file\` |

\`\`\`bash
# Find all IP addresses in the log
grep -oE "[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+" ~/labs/web/sample_auth.log

# Find lines with "Failed" or "Connection closed"
grep -E "Failed|Connection closed" ~/labs/web/sample_auth.log

# Find failed logins for root specifically
grep "Failed password for root" ~/labs/web/sample_auth.log
\`\`\`

:::warning
grep uses Basic Regex by default. Use \`-E\` for Extended Regex (supports \`+\`, \`?\`, \`|\`). Use \`-o\` to output only the matched text instead of the whole line.
:::

### Try It Yourself

\`\`\`bash
# 1. How many lines contain "Accepted"?
grep -c "Accepted" ~/labs/web/sample_auth.log

# 2. Show all lines that are NOT from sshd
grep -v "sshd" ~/labs/web/sample_auth.log

# 3. Extract every unique IP address from the log
grep -oE "[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+" ~/labs/web/sample_auth.log | sort -u
\`\`\`

## Step 2: sed — Find and Replace

sed is a stream editor. It reads text, applies changes, and outputs the result. Think of it as a smart find-and-replace.

### Basic Substitution

\`\`\`bash
# Replace first occurrence of "root" with "ADMIN" on each line
sed 's/root/ADMIN/' ~/labs/web/sample_auth.log

# Replace ALL occurrences on each line (add g flag)
sed 's/root/ADMIN/g' ~/labs/web/sample_auth.log

# Edit the file directly (careful!)
sed -i 's/root/ADMIN/g' ~/labs/web/sample_auth.log
\`\`\`

:::danger
\`sed -i\` modifies the file permanently. Always test your sed command without \`-i\` first. Use \`sed -i.bak\` to create a backup before modifying.
:::

### Deleting Lines

\`\`\`bash
# Delete all lines containing "sshd"
sed '/sshd/d' ~/labs/web/sample_auth.log

# Delete blank lines
sed '/^$/d' ~/labs/web/sample_auth.log

# Delete comment lines (starting with #)
sed '/^#/d' /etc/ssh/sshd_config
\`\`\`

### Security Use Case: Mask IP Addresses

When sharing logs for analysis, you must hide real IPs. sed does this easily.

\`\`\`bash
# Replace the last octet of each IP with XXX
sed -E 's/([0-9]+\\.[0-9]+\\.[0-9]+)\\.[0-9]+/\\1.XXX/g' ~/labs/web/sample_auth.log
\`\`\`

**Expected output:**
\`\`\`
Jun 22 10:01:23 server sshd[1234]: Failed password for root from 192.168.1.XXX port 22 ssh2
Jun 22 10:01:25 server sshd[1235]: Failed password for admin from 192.168.1.XXX port 22 ssh2
Jun 22 10:02:01 server sshd[1237]: Accepted publickey for user1 from 10.0.0.XXX port 22 ssh2
\`\`\`

### Try It Yourself

\`\`\`bash
# 1. Replace "Failed" with "ALERT" in the log
sed 's/Failed/ALERT/g' ~/labs/web/sample_auth.log

# 2. Delete all lines containing "Accepted" (show only rejections)
sed '/Accepted/d' ~/labs/web/sample_auth.log

# 3. Mask all usernames after "for" with "REDACTED"
sed -E 's/for [a-z]+/for REDACTED/g' ~/labs/web/sample_auth.log
\`\`\`

## Step 3: awk — Reading a Spreadsheet

awk processes text column by column. If grep finds the right lines, awk picks the right columns.

Imagine a spreadsheet. Each line is a row. Each word is a column. awk lets you say "give me column 1 and column 7."

\`\`\`bash
# Print column 1 and column 3 from the log
awk '{print $1, $3}' ~/labs/web/sample_auth.log

# Print column 1 only
awk '{print $1}' ~/labs/web/sample_auth.log
\`\`\`

### Custom Delimiters

By default, awk splits on whitespace. Use \`-F\` to set a different delimiter.

\`\`\`bash
# Parse /etc/passwd (colon-delimited)
# Format: username:password:UID:GID:comment:home:shell
awk -F: '{print $1}' /etc/passwd        # usernames
awk -F: '{print $6}' /etc/passwd        # home directories
awk -F: '{print $1, $7}' /etc/passwd    # username + shell
\`\`\`

### Filtering Rows

awk can filter rows based on column values, like a spreadsheet filter.

\`\`\`bash
# Show only lines where column 3 is "Failed"
awk '$3 == "Failed" {print $0}' ~/labs/web/sample_auth.log

# Show users with UID >= 1000 (real users)
awk -F: '$3 >= 1000 {print $1, "(UID:", $3, ")"}' /etc/passwd

# Show users with /bin/bash shell
awk -F: '$7 == "/bin/bash" {print $1}' /etc/passwd
\`\`\`

**Expected output:**
\`\`\`
cyberlab (UID: 1000 )
\`\`\`

### Try It Yourself

\`\`\`bash
# 1. Print the date (column 1) and time (column 2) from the log
awk '{print $1, $2}' ~/labs/web/sample_auth.log

# 2. Print all usernames with their home directories from /etc/passwd
awk -F: '{print $1, "->", $6}' /etc/passwd

# 3. Show only lines that contain "nginx" in the program field
awk '/nginx/ {print $0}' ~/labs/web/sample_auth.log
\`\`\`

## Step 4: Log Analysis Pipeline

The real power comes from combining tools with pipes (\`|\`). A pipe sends the output of one command as input to the next.

The standard security log analysis pattern:

\`\`\`
grep (filter lines) | awk (extract fields) | sort | uniq -c | sort -rn
\`\`\`

### Analyze auth.log

\`\`\`bash
# Count failed attempts per IP
grep "Failed password" ~/labs/web/sample_auth.log | \\
  awk '{for(i=1;i<=NF;i++) if($i=="from") print $(i+1)}' | \\
  sort | uniq -c | sort -rn
\`\`\`

**Expected output:**
\`\`\`
      4 192.168.1.100
      1 10.0.0.99
\`\`\`

This tells you: IP 192.168.1.100 tried 4 times. That is a brute-force attempt.

### Full Security Analysis Script

\`\`\`bash
cat > ~/labs/web/analyze.sh << 'SCRIPT'
#!/bin/bash
LOG=~/labs/web/sample_auth.log

echo "=== SECURITY LOG ANALYSIS ==="
echo ""

echo "--- Failed Login Summary ---"
grep "Failed password" "$LOG" | \\
  awk '{for(i=1;i<=NF;i++) if($i=="from") print $(i+1)}' | \\
  sort | uniq -c | sort -rn | \\
  while read count ip; do
    if [ "$count" -ge 3 ]; then
      echo "  [BLOCK] $ip: $count attempts"
    else
      echo "  [WATCH] $ip: $count attempts"
    fi
  done

echo ""
echo "--- Targeted Usernames ---"
grep "Failed password" "$LOG" | \\
  awk '{for(i=1;i<=NF;i++) if($i=="for") print $(i+1)}' | sort -u

echo ""
echo "--- Successful Logins ---"
grep "Accepted" "$LOG" | \\
  awk '{print $9, $11, $14}'

echo ""
echo "--- Non-SSH Activity ---"
grep -v "sshd" "$LOG"
SCRIPT

chmod +x ~/labs/web/analyze.sh
bash ~/labs/web/analyze.sh
\`\`\`

**Expected output:**
\`\`\`
=== SECURITY LOG ANALYSIS ===

--- Failed Login Summary ---
  [BLOCK] 192.168.1.100: 4 attempts
  [WATCH] 10.0.0.99: 1 attempts

--- Targeted Usernames ---
admin
root
test

--- Successful Logins ---
publickey user1 10.0.0.5
password test 192.168.1.50

--- Non-SSH Activity ---
Jun 22 10:05:00 server nginx[1300]: 200 GET /index.html from 192.168.1.1
Jun 22 10:05:30 server nginx[1301]: 403 GET /admin from 192.168.1.100
Jun 22 10:06:00 server kernel: [UFW BLOCK] IN=eth0 SRC=203.0.113.42 DST=192.168.1.1
\`\`\`

:::tip
In a real SOC, this is how analysts triage incidents. They pipe logs through grep and awk to quickly identify attackers, targeted accounts, and attack timelines.
:::

### Try It Yourself

\`\`\`bash
# 1. Find the top 3 IPs with the most connections in the log
grep -oE "[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+" ~/labs/web/sample_auth.log | \\
  sort | uniq -c | sort -rn | head -3

# 2. Count how many successful vs failed logins
echo "Failed: $(grep -c 'Failed' ~/labs/web/sample_auth.log)"
echo "Accepted: $(grep -c 'Accepted' ~/labs/web/sample_auth.log)"

# 3. Show a timeline: how many events per minute?
awk '{print $1, $2}' ~/labs/web/sample_auth.log | cut -d: -f1,2 | sort | uniq -c
\`\`\`

## Quick Reference

| Task | Tool | Command |
|---|---|---|
| Find lines matching a pattern | grep | \`grep "pattern" file\` |
| Case-insensitive search | grep | \`grep -i "pattern" file\` |
| Count matches | grep | \`grep -c "pattern" file\` |
| Show non-matching lines | grep | \`grep -v "pattern" file\` |
| Replace text | sed | \`sed 's/old/new/g' file\` |
| Delete matching lines | sed | \`sed '/pattern/d' file\` |
| Edit file in-place | sed | \`sed -i 's/old/new/g' file\` |
| Print columns | awk | \`awk '{print $1, $3}' file\` |
| Use custom delimiter | awk | \`awk -F: '{print $1}' file\` |
| Filter by column value | awk | \`awk '$3 == "value" {print $0}' file\` |
| Count occurrences | combo | \`sort \\| uniq -c \\| sort -rn\` |

:::checkpoint
1. Why is grep the most-used tool for security log analysis?
2. What is the difference between grep -v and grep -i?
3. What does sed -i do, and why should you test first?
4. How does awk know which column is $1, $2, $3?
5. What is the standard pipe pattern for counting occurrences in logs?
:::
`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "You're given a 10GB auth.log file. How would you find the top 10 source IPs of failed SSH attempts without loading the entire file into memory?",
        interviewAnswer: "I would pipe grep to extract only the failed login lines, then use awk to extract the IP address field after 'from', pipe to sort, then uniq -c to count, and sort -rn for descending order, limiting to the top 10 with head. The command would be: grep 'Failed password' auth.log | awk '{for(i=1;i<=NF;i++) if($i==\"from\") print $(i+1)}' | sort | uniq -c | sort -rn | head -10. This streams through the file line by line without loading it entirely into memory.",
        quiz: [
          {
            question: "What does grep -i do?",
            options: [
              "Searches for IP addresses",
              "Makes the search case-insensitive",
              "Shows line numbers",
              "Inverts the match"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The -i flag makes grep ignore case, so 'failed' matches 'Failed', 'FAILED', etc."
          },
          {
            question: "What does sed 's/old/new/g' do?",
            options: [
              "Deletes lines containing 'old'",
              "Replaces all occurrences of 'old' with 'new' on each line",
              "Inserts 'old' before 'new' on each line",
              "Moves 'old' to the end of each line"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "s is the substitute command, and g means global (all occurrences per line, not just the first)."
          },
          {
            question: "In awk, what does '{print $1, $3}' do?",
            options: [
              "Prints lines 1 and 3",
              "Prints the 1st and 3rd columns",
              "Prints the first and third words",
              "Prints the file twice"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "$1 and $3 refer to the first and third fields (columns) of each line, separated by whitespace."
          },
          {
            question: "How do you count the number of lines matching a pattern?",
            options: [
              "grep pattern file | wc -l",
              "grep -c pattern file",
              "grep --count pattern file",
              "All of these work"
            ],
            correctAnswerIndex: 3,
            difficulty: "intermediate",
            explanation: "All three approaches work. grep -c is the most direct, while grep | wc -l is also common."
          },
          {
            question: "What does 'sort | uniq -c | sort -rn' do?",
            options: [
              "Sorts alphabetically",
              "Counts unique occurrences and sorts by count descending",
              "Removes duplicate lines",
              "Sorts by line length"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "uniq -c counts adjacent duplicates, sort -rn sorts numerically in reverse (highest first)."
          },
          {
            question: "What does sed -i do?",
            options: [
              "Shows line numbers for matches",
              "Edits the file in-place (modifies the original)",
              "Ignores case",
              "Inverts the match"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The -i flag tells sed to modify the file directly instead of just outputting to stdout."
          },
          {
            question: "How would you extract all IP addresses from a log file?",
            options: [
              "grep [0-9] file",
              "grep -oE '\\b[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\b' file",
              "awk '{print $1}' file",
              "sed 's/:/ /g' file"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The -o flag outputs only the matched parts, and the regex matches the IP address pattern."
          },
          {
            question: "What does awk -F: '{print $1}' /etc/passwd do?",
            options: [
              "Prints the first line of /etc/passwd",
              "Prints the username (first field) from each line",
              "Prints the file permissions",
              "Prints the line count"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "-F: sets the field separator to colon, so $1 is the username in /etc/passwd's colon-delimited format."
          },
          {
            question: "What is the purpose of grep -v?",
            options: [
              "Verbose output",
              "Inverts the match (shows lines NOT matching the pattern)",
              "Shows version information",
              "Validates the pattern"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "grep -v inverts the match, printing only lines that do NOT contain the pattern."
          },
          {
            question: "Why is piping preferred over loading large files into memory?",
            options: [
              "It's always faster",
              "It processes data line by line, using minimal memory",
              "It's required by Unix",
              "It compresses the data"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Piping streams data through processes one line at a time, keeping memory usage constant regardless of file size."
          }
        ]
      },
      {
        id: "we06d05",
        title: "Network Fundamentals with Linux Tools",
        description: "Use ip, ping, traceroute, dig, nslookup, curl, wget, ss, and iptables to understand and manage Linux networking.",
        type: "learn",
        duration: "3-4 hours",
        content: `:::objectives
- Find your IP address and understand routes
- Test if other machines are reachable
- Look up domain names and DNS records
- Fetch web pages and inspect HTTP responses
- See which ports are open on your system
- Build basic firewall rules with iptables
:::

## Before We Begin

Network tools are your eyes on the network.

Without them, you are blind. You cannot see who is talking. You cannot see what is open. You cannot see where traffic goes.

With them, you see everything. Every connection. Every open port. Every hop between you and a target.

Attackers use these tools to find targets. Defenders use them to find problems. You need to know both sides.

All tools are already installed in your Ubuntu WSL2 environment. Open your terminal and follow along.

## IP Addresses and Routes

Every device on a network has an address. Like a street address for your house, an IP address tells the network where to find you.

Your computer has at least two addresses:
- **127.0.0.1** — loopback, means "myself"
- **192.168.x.x** — your local network address

### Find Your IP Address

\`\`\`bash
ip addr
\`\`\`

You will see output like this:

\`\`\`
1: lo: <LOOPBACK,UP,LOWER_UP>
    inet 127.0.0.1/8 scope host lo
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP>
    inet 192.168.1.50/24 brd 192.168.1.255 scope global eth0
\`\`\`

The \`lo\` interface is your loopback. The \`eth0\` interface is your real network card.

The \`/24\` after the IP is the subnet mask. It means the first 24 bits are the network part. The rest is your device. Think of it like a zip code — the first part says which neighborhood, the rest says which house.

### See Your Routes

A route tells your computer: "to reach this network, go this way."

\`\`\`bash
ip route
\`\`\`

Output:

\`\`\`
default via 192.168.1.1 dev eth0
192.168.1.0/24 dev eth0 scope link
\`\`\`

The \`default\` line is the most important. It says: "if you don't know where to send traffic, send it to 192.168.1.1." That is your router — your gateway to the internet.

:::tip
You can also use \`ip route get 8.8.8.8\` to see which route would be used to reach a specific destination.
:::

### Try It Yourself

Run these commands and answer the questions:

\`\`\`bash
# What is your IP address?
ip -4 addr show

# What is your default gateway?
ip route show default

# Which interface is used to reach Google's DNS?
ip route get 8.8.8.8
\`\`\`

Write down your IP and gateway. You will need them later.

## Connectivity Testing

Can you reach another machine? The \`ping\` command is like knocking on a door. You send a small packet and wait for a reply.

### ping — Knock on the Door

\`\`\`bash
# Send 4 pings to Google's DNS server
ping -c 4 8.8.8.8
\`\`\`

Output:

\`\`\`
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=116 time=12.3 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=116 time=11.8 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=116 time=12.1 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=116 time=11.9 ms

--- 8.8.8.8 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss
\`\`\`

Key things to notice:
- **time=12.3 ms** — how long the round trip took (latency)
- **0% packet loss** — all packets arrived (good)
- **ttl=116** — time to live, counts down at each router hop

:::warning
Some servers block ping (ICMP). If ping fails, it does not always mean the host is down. Use other tools to confirm.
:::

### traceroute — See the Path

Traceroute shows every router between you and the destination. Like seeing every stop on a bus route.

\`\`\`bash
traceroute 8.8.8.8
\`\`\`

Output (simplified):

\`\`\`
traceroute to 8.8.8.8 (8.8.8.8), 30 hops max
 1  192.168.1.1 (192.168.1.1)  1.234 ms  1.102 ms  1.023 ms
 2  10.0.0.1 (10.0.0.1)  5.678 ms  5.543 ms  5.432 ms
 3  72.14.236.201 (72.14.236.201)  8.901 ms  8.765 ms  8.654 ms
\`\`\`

Hop 1 is your router. Each hop after that is another router on the path. Some hops show \`*\` — that router does not respond to traceroute. This is normal and often a security measure.

### Try It Yourself

\`\`\`bash
# Can you reach your gateway?
ping -c 2 192.168.1.1

# Can you reach the internet?
ping -c 2 8.8.8.8

# Can you reach a website by name?
ping -c 2 google.com

# What is the path to Google?
traceroute google.com
\`\`\`

If the first two work but the third fails, you have a DNS problem. If none work, check your network connection.

## DNS Lookups

DNS is the phone book of the internet. You type "google.com" — DNS turns that into an IP address like 142.250.80.46.

Without DNS, you would have to memorize IP addresses for every website. DNS is what makes the internet usable.

### dig — The Professional's Tool

\`\`\`bash
# Look up a domain
dig google.com
\`\`\`

The important part is the ANSWER SECTION:

\`\`\`
;; ANSWER SECTION:
google.com.         300     IN      A       142.250.80.46
\`\`\`

This means google.com points to 142.250.80.46. The \`300\` is the TTL — how many seconds until this record expires and must be looked up again.

For a cleaner output:

\`\`\`bash
# Just the IP address
dig +short google.com
\`\`\`

### Different Record Types

DNS stores different kinds of information:

\`\`\`bash
# Mail servers (who handles email for this domain)
dig google.com MX

# Name servers (who is authoritative for this domain)
dig google.com NS

# Text records (SPF, DKIM, verification strings)
dig google.com TXT

# IPv6 address
dig google.com AAAA

# Reverse lookup — what domain belongs to this IP?
dig -x 142.250.80.46
\`\`\`

:::info
Security professionals use DNS records to map a target's infrastructure. MX records reveal email providers. NS records reveal DNS providers. TXT records can leak internal information.
:::

### nslookup — Simpler Alternative

\`\`\`bash
nslookup google.com
\`\`\`

Output:

\`\`\`
Server:         127.0.0.53
Address:        127.0.0.53#53

Non-authoritative answer:
Name:   google.com
Address: 142.250.80.46
\`\`\`

Use \`nslookup\` for quick lookups. Use \`dig\` when you need detail.

### Try It Yourself

\`\`\`bash
# What is the IP of your favorite website?
dig +short your-favorite-site.com

# What mail servers does google.com use?
dig google.com MX +short

# What name servers does github.com use?
dig github.com NS +short

# Can you trace the full DNS resolution path?
dig +trace google.com
\`\`\`

## HTTP Testing

HTTP is how your browser talks to web servers. \`curl\` and \`wget\` let you speak HTTP from the command line.

Think of it like sending a letter. You write a request, send it to an address, and get a reply.

### curl — Your HTTP Swiss Army Knife

\`\`\`bash
# Get a web page (like your browser does)
curl http://example.com

# See only the response headers (like checking an envelope without opening it)
curl -I http://example.com

# See headers AND body
curl -i http://example.com

# Follow redirects (important — many sites redirect)
curl -L http://example.com
\`\`\`

### Security-Relevant curl Usage

\`\`\`bash
# Check HTTP status codes (useful for finding hidden pages)
for path in admin login dashboard api config backup .git; do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://target/\$path)
  echo "  /\$path -> \$code"
done
\`\`\`

Status codes tell you what happened:
- **200** — found it
- **301/302** — redirected
- **403** — forbidden (exists, but you can't access it)
- **404** — not found
- **500** — server error

\`\`\`bash
# Send POST data (like submitting a form)
curl -X POST -d "username=admin&password=test" http://target/login

# Send JSON data
curl -X POST -H "Content-Type: application/json" \\
  -d '{"username":"admin","password":"test"}' \\
  http://target/api/login

# Send cookies (session hijacking checks)
curl -b "session=abc123" http://target/dashboard
\`\`\`

### wget — Download Files

\`\`\`bash
# Download a file
wget http://target/file.zip

# Download with a different name
wget -O output.zip http://target/file.zip

# Resume an interrupted download
wget -c http://target/large_file.iso
\`\`\`

:::tip
Use \`curl\` for testing APIs and inspecting HTTP details. Use \`wget\` for downloading files. Both are essential.
:::

### Try It Yourself

\`\`\`bash
# Fetch a web page and see the HTML
curl -s http://example.com | head -20

# Check if a site redirects (and where to)
curl -s -o /dev/null -w "%{redirect_url}" http://google.com

# Get only the HTTP status code
curl -s -o /dev/null -w "%{http_code}" http://example.com
\`\`\`

## Checking Open Ports

Open ports are doors into your system. Each open port is a service listening for connections. An attacker scans for open ports to find targets.

### ss — See What Is Listening

\`\`\`bash
# Show all listening TCP ports with process info
sudo ss -tlnp
\`\`\`

Output:

\`\`\`
State   Recv-Q  Send-Q   Local Address:Port    Process
LISTEN  0       128          0.0.0.0:22         users:(("sshd",pid=567,fd=3))
LISTEN  0       4096         0.0.0.0:80         users:(("nginx",pid=890,fd=6))
\`\`\`

The flags mean:
- **-t** — TCP only
- **-l** — listening (waiting for connections)
- **-n** — numeric (don't resolve names, faster)
- **-p** — show the process using each port

\`\`\`bash
# Show all listening ports (TCP and UDP)
ss -tlnu

# Show established (active) connections
ss -tnp

# Filter for a specific port
ss -tlnp | grep :22
\`\`\`

### Quick Security Check

\`\`\`bash
# List all open ports as a simple list
ss -tlnp | awk 'NR>1 {print \$4}' | grep -oE ':[0-9]+' | sort -t: -k2 -n | uniq

# Check if a specific port is open
ss -tlnp | grep -q ":80" && echo "Port 80 OPEN" || echo "Port 80 CLOSED"
\`\`\`

:::warning
Every open port is a potential attack vector. If you don't recognize a port, investigate it. Close services you don't need.
:::

### Try It Yourself

\`\`\`bash
# What ports are open on your machine right now?
sudo ss -tlnp

# Do you see anything unexpected?
# Common ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 53 (DNS)

# Check a specific port
ss -tlnp | grep :22
\`\`\`

## iptables Firewall

A firewall is a security guard for your network. It checks every packet coming in or going out and decides: let it through, or block it.

iptables is the traditional Linux firewall. It works with rules organized in chains.

### The Three Chains

| Chain | What It Controls |
|---|---|
| **INPUT** | Traffic coming INTO your machine |
| **OUTPUT** | Traffic going OUT from your machine |
| **FORWARD** | Traffic passing THROUGH your machine (like a router) |

### Actions: What to Do With Packets

| Action | What It Does | Use When |
|---|---|---|
| \`ACCEPT\` | Let the packet through | You want to allow this traffic |
| \`DROP\` | Silently discard — no response | You want to hide (attacker gets no feedback) |
| \`REJECT\` | Discard and send error back | You want to be polite (sender knows it was blocked) |
| \`LOG\` | Record the packet, then continue | You want to see what is happening |

### View Current Rules

\`\`\`bash
sudo iptables -L -n -v
\`\`\`

This shows all rules in all chains. The \`-n\` flag prevents DNS lookups (faster). The \`-v\` flag shows packet counts.

### Build a Basic Firewall

**CRITICAL: Always allow SSH first, or you will lock yourself out.**

\`\`\`bash
# Step 1: Allow SSH (so you can still log in)
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Step 2: Allow established connections (replies to your requests)
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Step 3: Allow loopback (local traffic)
sudo iptables -A INPUT -i lo -j ACCEPT

# Step 4: Allow HTTP and HTTPS (if running a web server)
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Step 5: Drop everything else
sudo iptables -P INPUT DROP
\`\`\`

:::danger
If you set the default policy to DROP before allowing SSH, you will lose access to your own machine. Always add ACCEPT rules first.
:::

### Block a Specific IP

\`\`\`bash
# Block all traffic from a malicious IP
sudo iptables -A INPUT -s 203.0.113.42 -j DROP

# Block a specific port from everyone
sudo iptables -A INPUT -p tcp --dport 3306 -j REJECT
\`\`\`

### Delete Rules

\`\`\`bash
# List rules with line numbers
sudo iptables -L -n -v --line-numbers

# Delete a specific rule by line number
sudo iptables -D INPUT 3

# Flush all rules (reset — be careful!)
sudo iptables -F
\`\`\`

### Save and Restore Rules

Rules are lost on reboot unless you save them:

\`\`\`bash
# Save current rules
sudo iptables-save > ~/iptables-rules.txt

# Restore rules from file
sudo iptables-restore < ~/iptables-rules.txt
\`\`\`

### Try It Yourself

\`\`\`bash
# View your current rules
sudo iptables -L -n -v

# Add a rule to block port 8080
sudo iptables -A INPUT -p tcp --dport 8080 -j DROP

# Verify the rule was added
sudo iptables -L -n -v

# Delete the rule (use line number from the list)
sudo iptables -D INPUT <line-number>
\`\`\`

## Network Troubleshooting Workflow

When something breaks, follow this order. Always start from the bottom and work up.

### Step-by-Step Process

\`\`\`bash
# 1. Check your own IP — do you have an address?
ip addr show

# 2. Check your gateway — can you reach your router?
ip route show default
ping -c 2 192.168.1.1

# 3. Check internet — can you reach the outside world?
ping -c 2 8.8.8.8

# 4. Check DNS — can you resolve domain names?
dig google.com +short

# 5. Check the service — is the specific port open?
curl -s -o /dev/null -w "%{http_code}" http://target

# 6. Check local ports — what is listening?
sudo ss -tlnp

# 7. Check firewall — is traffic being blocked?
sudo iptables -L -n -v
\`\`\`

### The Order Matters

| Step | Layer | Question | Tool |
|---|---|---|---|
| 1 | Physical/IP | Do I have an address? | \`ip addr\` |
| 2 | Network | Can I reach my gateway? | \`ping\` |
| 3 | Network | Can I reach the internet? | \`ping 8.8.8.8\` |
| 4 | DNS | Can I resolve names? | \`dig\` |
| 5 | Application | Is the service responding? | \`curl\` |
| 6 | Local | What is listening? | \`ss\` |
| 7 | Firewall | Is traffic blocked? | \`iptables\` |

:::tip
If step 3 works but step 4 fails, you have a DNS problem. If step 2 works but step 3 fails, you have a routing or firewall problem. Work through the layers.
:::

## Quick Reference

| Task | Command |
|---|---|
| Show IP addresses | \`ip addr show\` |
| Show routing table | \`ip route show\` |
| Test connectivity | \`ping -c 4 target\` |
| Trace route | \`traceroute target\` |
| DNS lookup | \`dig domain\` or \`nslookup domain\` |
| Check HTTP response | \`curl -I http://target\` |
| Download file | \`wget url\` |
| Show listening ports | \`ss -tlnp\` |
| View firewall rules | \`sudo iptables -L -n -v\` |
| Allow a port | \`sudo iptables -A INPUT -p tcp --dport PORT -j ACCEPT\` |
| Block an IP | \`sudo iptables -A INPUT -s IP -j DROP\` |

:::checkpoint
1. What is the difference between \`ip addr\` and \`ip route\`?
2. What does \`ping -c 4\` do, and what does the output tell you?
3. Why do security professionals prefer \`dig\` over \`nslookup\`?
4. What is the difference between \`curl\` and \`wget\`?
5. What is the difference between DROP and REJECT in iptables?
:::
`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Explain the difference between DROP and REJECT in iptables. When would you use each?",
        interviewAnswer: "DROP silently discards the packet - the sender gets no response and eventually times out. REJECT sends an ICMP port unreachable error back to the sender. Use DROP for stealth (attacker can't tell if the host is alive) and for blocking known malicious IPs. Use REJECT for internal troubleshooting where you want the sender to know the connection was refused, or when you need to comply with network policies that require responding to connections.",
        quiz: [
          {
            question: "What does 'ip addr show' display?",
            options: [
              "The routing table",
              "All network interfaces and their IP addresses",
              "Firewall rules",
              "DNS resolver configuration"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "ip addr show displays all network interfaces with their IP addresses, MAC addresses, and status."
          },
          {
            question: "What does the /24 in 192.168.1.50/24 represent?",
            options: [
              "The host number",
              "The subnet mask (255.255.255.0)",
              "The default gateway",
              "The DNS server"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "/24 means 24 bits are set in the subnet mask: 255.255.255.0. It defines the network portion of the address."
          },
          {
            question: "What does 'ping -c 4 google.com' do?",
            options: [
              "Sends 4 TCP packets to google.com",
              "Sends 4 ICMP echo requests and waits for replies",
              "Downloads 4 files from google.com",
              "Opens 4 browser tabs to google.com"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "ping uses ICMP echo requests. -c 4 limits it to 4 packets before stopping."
          },
          {
            question: "What is the advantage of dig over nslookup?",
            options: [
              "dig is faster",
              "dig provides more detailed output and supports all DNS record types",
              "dig works on Windows, nslookup doesn't",
              "nslookup is deprecated"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "dig provides verbose output with TTL, record types, and supports advanced queries like +trace."
          },
          {
            question: "When would you use curl -I instead of curl?",
            options: [
              "To download a file faster",
              "To send only a HEAD request and see HTTP headers",
              "To follow redirects",
              "To send POST data"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "curl -I sends a HEAD request, which returns only the HTTP headers without the response body."
          },
          {
            question: "What does 'sudo iptables -P INPUT DROP' do?",
            options: [
              "Drops all packets on all chains",
              "Sets the default policy for incoming packets to DROP",
              "Drops the iptables configuration",
              "Drops all established connections"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "It sets the INPUT chain's default policy to DROP. Any incoming packet not matching an explicit rule will be dropped."
          },
          {
            question: "What is the difference between DROP and REJECT in iptables?",
            options: [
              "They are identical",
              "DROP silently discards; REJECT sends an error response back",
              "DROP is faster; REJECT is slower",
              "REJECT is only for UDP"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "DROP gives no feedback to the sender (they timeout). REJECT sends an ICMP error, letting the sender know the connection was refused."
          },
          {
            question: "What does 'ss -tlnp' show?",
            options: [
              "All active TCP connections",
              "TCP listening ports with process info",
              "UDP port statistics",
              "Network interface statistics"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "ss -t (TCP) -l (listening) -n (numeric) -p (process) shows all listening TCP ports with the process using each."
          },
          {
            question: "What is the correct order for network troubleshooting?",
            options: [
              "DNS → IP → Physical → Application",
              "Physical → IP → DNS → Application",
              "Application → DNS → IP → Physical",
              "It doesn't matter what order"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Always work from the bottom up: physical connectivity first, then IP, then DNS, then application-layer issues."
          },
          {
            question: "What does curl -s -o /dev/null -w %{http_code} http://target do?",
            options: [
              "Downloads the page content",
              "Silently fetches the page and prints only the HTTP status code",
              "Saves the page to /dev/null",
              "Checks if curl is installed"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "-s silences progress, -o /dev/null discards the body, -w prints the format string (status code). Useful for scripting."
          }
        ]
      }
    ]
  }
];
