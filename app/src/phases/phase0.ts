export const phase0: Module[] = [
  {
    id: "weekLINUX",
    title: "Linux Fundamentals",
    durationText: "Week L - 10 Projects",
    focus: "Master Linux from absolute beginner to intermediate level through hands-on projects",
    output: "Ability to navigate, read, search, script, and analyze systems on Linux — the hacker's primary tool",
    topics: [
      {
        id: "weLINUXd01",
        title: "Project 1: Hello Terminal — Your First Commands",
        description: "Learn what a terminal is, why hackers use it, and your first 5 commands: whoami, pwd, ls, echo, clear.",
        type: "practice",
        duration: "30 min",
        content: `:::objectives
- Understand what a terminal is and why hackers prefer it over GUI
- Learn the difference between shell, terminal, and command line
- Execute your first 5 Linux commands with confidence
:::

## What Is a Terminal?

A terminal is a text-based interface to your computer. Instead of clicking icons, you type commands. Every hacker uses the terminal because it's faster, more powerful, and works on any system — including remote servers you've compromised.

**Three things people confuse:**

| Term | What It Is | Example |
|------|-----------|---------|
| Terminal | The window that displays text | Windows Terminal, GNOME Terminal |
| Shell | The program that interprets your commands | bash, zsh, fish |
| Command Line | The interface where you type | The \`$\` prompt |

When you type \`whoami\`, the terminal sends it to the shell (bash), bash executes it, and the terminal displays the output.

## Your First Command: whoami

The first thing a hacker does after gaining access to a system: find out who they are.

\`\`\`bash
whoami
\`\`\`

Output: \`user\`

This tells you the username of the current user. If you're \`root\`, you have full control. If you're \`www-data\` or \`nobody\`, you need to escalate privileges.

:::checkpoint
What does \`whoami\` return?
- Your IP address
- Your current username
- Your home directory
- Your operating system
:::

## Where Am I? pwd

\`\`\`bash
pwd
\`\`\`

Output: \`/home/user\`

**pwd** stands for "Print Working Directory." It shows your current location in the filesystem. Every hacker needs to know where they are — especially when navigating a compromised system.

The path \`/home/user\` means you're in the \`user\` directory inside \`/home\`. The \`/\` at the beginning is the root of the entire filesystem.

:::checkpoint
What does \`pwd\` stand for?
- Password Directory
- Print Working Directory
- Previous Working Disk
- Program Working Data
:::

## What's Here? ls

\`\`\`bash
ls
\`\`\`

Output: \`Documents  Downloads  scripts  notes.txt\`

**ls** lists the files and directories in your current location. This is how you see what's available — configuration files, scripts, databases, credentials.

:::checkpoint
What command lists files in the current directory?
- dir
- list
- ls
- show
:::

## Say Something: echo

\`\`\`bash
echo "Hello World"
\`\`\`

Output: \`Hello World\`

**echo** prints text to the screen. It's also used to display variable values:

\`\`\`bash
echo $USER
\`\`\`

Output: \`user\`

The \`$\` before \`USER\` means it's a variable. \`$USER\` contains your username. Hackers use \`echo\` to test scripts, display environment variables, and create files.

## Clear the Screen: clear

\`\`\`bash
clear
\`\`\`

This clears the terminal. When your screen is full of output from previous commands, \`clear\` gives you a fresh start. Shortcut: \`Ctrl+L\`.

## Your First 5 Commands — Summary

| Command | What It Does | Why Hackers Use It |
|---------|-------------|-------------------|
| \`whoami\` | Shows current username | First command after gaining access |
| \`pwd\` | Shows current directory | Know where you are on the target |
| \`ls\` | Lists files | Find config files, scripts, credentials |
| \`echo\` | Prints text/variables | Test scripts, check environment |
| \`clear\` | Clears screen | Clean up after messy output |

:::checkpoint
You've gained access to a target machine. What's the FIRST command you should type?
- ls
- pwd
- whoami
- clear
:::

## Try It Yourself

Open your terminal (WSL2 Ubuntu) and run each command. Don't just read — type them yourself. Muscle memory matters.

\`\`\`bash
whoami
pwd
ls
echo "I am learning Linux"
clear
\`\`\``,
        aiPrompt: "Explain what a terminal is and why hackers prefer it over GUI interfaces.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "What is the first command you run after gaining access to a target system?",
        interviewAnswer: "whoami — I need to know what user account I'm running as. If I'm root, I have full control. If I'm a low-privilege user, I need to enumerate for privilege escalation vectors.",
        quiz: [
          { question: "What does whoami return?", options: ["Your IP address", "Your current username", "Your home directory", "Your OS version"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "whoami returns the username of the current user.", certTags: ["Linux+"] },
          { question: "What does pwd stand for?", options: ["Password Directory", "Print Working Directory", "Previous Working Disk", "Program Working Data"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "pwd stands for Print Working Directory — it shows where you are.", certTags: ["Linux+"] },
          { question: "What command lists files in the current directory?", options: ["dir", "list", "ls", "show"], correctAnswerIndex: 2, difficulty: "beginner", explanation: "ls lists files and directories in the current location.", certTags: ["Linux+"] },
          { question: "What does echo $USER display?", options: ["The word USER", "Your username", "Your IP address", "Nothing"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "$USER is an environment variable containing your username. echo prints it.", certTags: ["Linux+"] },
          { question: "What is the difference between a terminal and a shell?", options: ["They are the same thing", "Terminal displays output, shell interprets commands", "Shell displays output, terminal interprets commands", "Terminal is for Windows, shell is for Linux"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "The terminal is the display window. The shell (bash, zsh) interprets and executes your commands.", certTags: ["Linux+"] },
          { question: "Why do hackers prefer the terminal over GUI?", options: ["It looks cooler", "It's faster, more powerful, and works on any system including remote servers", "GUI doesn't exist on Linux", "Terminal has more colors"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "Terminal is faster, automatable, and works on remote systems where no GUI is available.", certTags: ["Security+"] },
          { question: "What does /home/user represent?", options: ["A file called user", "The user directory inside the home directory", "A network path", "A Windows path"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "/home/user is a path — home is a directory, user is a directory inside it.", certTags: ["Linux+"] },
          { question: "What is the root of the Linux filesystem?", options: ["C:\\", "/home", "/", "~"], correctAnswerIndex: 2, difficulty: "beginner", explanation: "/ is the root — the top of the entire filesystem. Everything is under it.", certTags: ["Linux+"] }
        ]
      },
      {
        id: "weLINUXd02",
        title: "Project 2: Files & Directories — Building Your Lab",
        description: "Navigate the filesystem, create directories, move and delete files. Build your pentest workspace.",
        type: "practice",
        duration: "30 min",
        content: `:::objectives
- Navigate the Linux filesystem using cd and understand absolute vs relative paths
- Create, move, copy, and delete files and directories
- Build a pentest workspace directory structure
:::

## Navigating the Filesystem: cd

**cd** (Change Directory) moves you between directories.

\`\`\`bash
cd /home/user
pwd
\`\`\`

Output: \`/home/user\`

**Absolute vs Relative paths:**

| Type | Example | Meaning |
|------|---------|---------|
| Absolute | \`cd /etc\` | Starts from root — always works |
| Relative | \`cd Documents\` | From current location |
| Home | \`cd ~\` or just \`cd\` | Go to your home directory |
| Up | \`cd ..\` | Go up one level |
| Back | \`cd -\` | Go to previous directory |

:::checkpoint
What does \`cd ..\` do?
- Go to the home directory
- Go up one directory level
- Go to the root directory
- Delete the current directory
:::

## Listing Files in Detail: ls -la

\`\`\`bash
ls -la
\`\`\`

Output:
\`\`\`
total 32
drwxr-xr-x 4 user user 4096 Jul  7 10:00 .
drwxr-xr-x 3 root root 4096 Jul  7 09:00 ..
-rw-r--r-- 1 user user  220 Jul  7 09:00 .bash_history
-rw-r--r-- 1 user user 3771 Jul  7 09:00 .bashrc
drwxr-xr-x 2 user user 4096 Jul  7 10:00 Documents
drwxr-xr-x 2 user user 4096 Jul  7 10:00 Downloads
-rw-r--r-- 1 user user  807 Jul  7 09:00 .profile
\`\`\`

**Breaking it down:**
- \`-l\` = long format (shows permissions, owner, size, date)
- \`-a\` = all files (including hidden files starting with \`.\`)
- Hidden files like \`.bashrc\` contain user configuration — often interesting targets

:::checkpoint
What flag shows hidden files in ls?
- -h
- -a
- -s
- -x
:::

## Creating Directories: mkdir

\`\`\`bash
mkdir -p ~/pentest/{tools,loot,notes,scans}
\`\`\`

**Breaking it down:**
- \`mkdir\` = make directory
- \`-p\` = create parent directories if they don't exist
- \`~/pentest/\` = in your home directory
- \`{tools,loot,notes,scans}\` = create all four at once (brace expansion)

This creates your pentest workspace:
\`\`\`
~/pentest/
├── tools/
├── loot/
├── notes/
└── scans/
\`\`\`

:::checkpoint
What does the -p flag do in mkdir?
- Makes the directory private
- Creates parent directories if they don't exist
- Prints the path after creation
- Prompts for confirmation
:::

## Creating Files: touch

\`\`\`bash
touch ~/pentest/notes/targets.txt
ls ~/pentest/notes/
\`\`\`

Output: \`targets.txt\`

**touch** creates an empty file. It's also used to update the timestamp of an existing file.

## Copying Files: cp

\`\`\`bash
cp ~/pentest/notes/targets.txt ~/pentest/notes/targets_backup.txt
ls ~/pentest/notes/
\`\`\`

Output: \`targets.txt  targets_backup.txt\`

**cp** copies files. Use \`-r\` for directories:
\`\`\`bash
cp -r ~/pentest/notes ~/pentest/notes_backup
\`\`\`

## Moving/Renaming: mv

\`\`\`bash
mv ~/pentest/notes/targets_backup.txt ~/pentest/loot/targets_copy.txt
\`\`\`

**mv** moves or renames files. If the destination is a different directory, it moves. If it's the same directory with a different name, it renames.

## Deleting Files: rm

\`\`\`bash
rm ~/pentest/loot/targets_copy.txt
\`\`\`

**rm** deletes files. Use \`-r\` for directories:
\`\`\`bash
rm -r ~/pentest/notes_backup
\`\`\`

:::warning
\`rm -rf /\` deletes everything on the system. Always double-check your rm commands. There is no undo.
:::

## Your Pentest Workspace

Build this structure now:

\`\`\`bash
mkdir -p ~/pentest/{tools,loot,notes,scans}
touch ~/pentest/notes/targets.txt
touch ~/pentest/notes/scope.txt
touch ~/pentest/scans/nmap_quick.txt
ls -la ~/pentest/
\`\`\`

:::checkpoint
What command creates multiple directories at once?
- mkdir tools loot notes scans
- mkdir -p {tools,loot,notes,scans}
- mkdir --all tools loot notes scans
- mkdir -r tools loot notes scans
:::`,
        aiPrompt: "Explain the Linux directory structure and why organizing files matters for penetration testing.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "How do you organize your files during a penetration test?",
        interviewAnswer: "I create a structured workspace with separate directories for tools, loot (captured data), notes, and scan results. This keeps the engagement organized and makes report writing easier.",
        quiz: [
          { question: "What does cd .. do?", options: ["Go home", "Go up one level", "Go to root", "Delete directory"], correctAnswerIndex: 1, difficulty: "beginner", explanation: ".. means parent directory. cd .. goes up one level.", certTags: ["Linux+"] },
          { question: "What flag shows hidden files?", options: ["-h", "-a", "-s", "-x"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "-a shows all files including hidden ones starting with a dot.", certTags: ["Linux+"] },
          { question: "What does mkdir -p do?", options: ["Makes private directory", "Creates parent directories if needed", "Prints path", "Prompts for confirmation"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "-p creates the full path including any missing parent directories.", certTags: ["Linux+"] },
          { question: "How do you copy a directory?", options: ["cp dir", "cp -r dir", "cp --dir", "copy dir"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "-r (recursive) is required to copy directories and their contents.", certTags: ["Linux+"] },
          { question: "What does mv do?", options: ["Copy file", "Move or rename file", "Delete file", "Create file"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "mv moves files between directories or renames them.", certTags: ["Linux+"] },
          { question: "What is the danger of rm -rf /?", options: ["Nothing", "Deletes everything on the system", "Only deletes hidden files", "Creates a backup"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "rm -rf / recursively force-deletes everything from the root. There is no undo.", certTags: ["Security+"] },
          { question: "What does touch do?", options: ["Deletes a file", "Creates an empty file or updates timestamp", "Copies a file", "Moves a file"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "touch creates a new empty file or updates the modification time of an existing file.", certTags: ["Linux+"] },
          { question: "What is ~/pentest/notes/targets.txt?", options: ["An absolute path", "A relative path", "A network path", "A Windows path"], correctAnswerIndex: 0, difficulty: "beginner", explanation: "~/pentest starts from home directory — this is an absolute path.", certTags: ["Linux+"] }
        ]
      },
      {
        id: "weLINUXd03",
        title: "Project 3: Reading Files — Extracting Intelligence",
        description: "Read files using cat, head, tail, wc, and file. Learn why reading files is the #1 hacker skill.",
        type: "practice",
        duration: "30 min",
        content: `:::objectives
- Read files using cat, head, tail, and less
- Count lines, words, and characters with wc
- Identify file types with file command
- Understand why reading files is critical for hackers
:::

## Why Reading Files Matters

During a pentest, you spend most of your time reading files: configuration files (database passwords), log files (user activity), /etc/passwd (user accounts), SSH keys (access), and more.

If you can't read files quickly, you can't hack.

## Reading Entire Files: cat

\`\`\`bash
cat /etc/hostname
\`\`\`

Output: \`kali\`

**cat** prints the entire file to the screen. Use it for small files.

:::warning
Don't use cat on large files — it will flood your screen. Use head, tail, or less instead.
:::

## Reading the First Lines: head

\`\`\`bash
head -5 /etc/passwd
\`\`\`

Output:
\`\`\`
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
\`\`\`

**head** shows the first N lines. Default is 10. Use \`-n\` to specify.

## Reading the Last Lines: tail

\`\`\`bash
tail -3 /etc/passwd
\`\`\`

Output:
\`\`\`
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-network:x:100:102::/run/systemd:/usr/sbin/nologin
user:x:1000:1000::/home/user:/bin/bash
\`\`\`

**tail** shows the last N lines. Essential for monitoring log files in real-time:
\`\`\`bash
tail -f /var/log/auth.log
\`\`\`

The \`-f\` flag follows the file — new lines appear as they're added. Perfect for watching login attempts in real-time.

:::checkpoint
What command shows the last 10 lines of a file?
- head -10
- tail -10
- cat -10
- last -10
:::

## Counting Lines, Words, Characters: wc

\`\`\`bash
wc -l /etc/passwd
\`\`\`

Output: \`35 /etc/passwd\`

**wc** counts lines (\`-l\`), words (\`-w\`), and characters (\`-c\`). Use it to understand file size and content.

\`\`\`bash
wc -l /etc/passwd /etc/shadow /etc/hosts
\`\`\`

:::checkpoint
What does wc -l count?
- Characters
- Words
- Lines
- Files
:::

## Identifying File Types: file

\`\`\`bash
file /bin/bash
\`\`\`

Output: \`/bin/bash: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2\`

**file** tells you what type a file is — executable, text, image, archive, etc. Essential for identifying suspicious files on a compromised system.

\`\`\`bash
file /etc/passwd
file /tmp/suspicious.exe
file /var/log/auth.log
\`\`\`

:::checkpoint
What command identifies a file's type?
- type
- file
- identify
- what
:::

## Practical Exercise: Read /etc/passwd

\`\`\`bash
cat /etc/passwd
\`\`\`

Each line is a user account:
\`\`\`
root:x:0:0:root:/root:/bin/bash
user:x:1000:1000::/home/user:/bin/bash
\`\`\`

Format: \`username:password:UID:GID:comment:home:shell\`

- \`x\` in password field means password is in /etc/shadow
- UID 0 = root
- UID 1000+ = normal users
- \`/bin/bash\` = user has a shell (can log in)
- \`/usr/sbin/nologin\` = user cannot log in

:::checkpoint
In /etc/passwd, what does UID 0 indicate?
- A regular user
- The root user
- A system user
- A deleted user
:::`,
        aiPrompt: "Explain why reading files is the most important skill for a hacker and give examples of files that contain sensitive information.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "What files do you check first when you gain access to a Linux system?",
        interviewAnswer: "I check /etc/passwd for user accounts, /etc/shadow for password hashes (if root), .bash_history for command history, SSH keys in ~/.ssh/, and config files in /etc/ for credentials.",
        quiz: [
          { question: "What does cat do?", options: ["Deletes a file", "Prints entire file to screen", "Copies a file", "Creates a file"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "cat prints the entire contents of a file to the screen.", certTags: ["Linux+"] },
          { question: "What command shows the last 10 lines of a file?", options: ["head -10", "tail -10", "cat -10", "last -10"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "tail shows the last N lines of a file.", certTags: ["Linux+"] },
          { question: "What does wc -l count?", options: ["Characters", "Words", "Lines", "Files"], correctAnswerIndex: 2, difficulty: "beginner", explanation: "-l flag counts lines.", certTags: ["Linux+"] },
          { question: "What command identifies a file's type?", options: ["type", "file", "identify", "what"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "file command analyzes the file content and reports its type.", certTags: ["Linux+"] },
          { question: "In /etc/passwd, what does UID 0 indicate?", options: ["Regular user", "Root user", "System user", "Deleted user"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "UID 0 is always the root (superuser) account.", certTags: ["Security+"] },
          { question: "What does tail -f do?", options: ["Show first lines", "Follow file in real-time", "Find text in file", "Format file output"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "-f follows the file — new lines appear as they're added. Used for monitoring logs.", certTags: ["Linux+"] },
          { question: "What does /bin/bash in /etc/passwd indicate?", options: ["User has a shell and can log in", "User is root", "User has no password", "User is deleted"], correctAnswerIndex: 0, difficulty: "intermediate", explanation: "/bin/bash means the user has an interactive shell and can log in.", certTags: ["Security+"] },
          { question: "What does x in the password field of /etc/passwd mean?", options: ["Password is empty", "Password is stored in /etc/shadow", "Account is disabled", "Account is root"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "x means the actual password hash is in /etc/shadow, not in /etc/passwd.", certTags: ["Security+"] }
        ]
      },
      {
        id: "weLINUXd04",
        title: "Project 4: Searching — Finding Needles in Haystacks",
        description: "Search inside files with grep, find files by name/size/type with find, and locate executables with which.",
        type: "practice",
        duration: "30 min",
        content: `:::objectives
- Search inside files using grep with basic patterns
- Find files by name, size, type, and permissions using find
- Locate executables with which and type
- Understand why search skills are critical for hackers
:::

## Why Search Matters

During a pentest, you need to find:
- Passwords in configuration files
- Sensitive data in web application code
- Exploitable files on the target system
- Log entries indicating attacks

The faster you can search, the faster you can hack.

## Searching Inside Files: grep

\`\`\`bash
grep "root" /etc/passwd
\`\`\`

Output: \`root:x:0:0:root:/root:/bin/bash\`

**grep** searches for text patterns inside files. It prints every line that matches.

\`\`\`bash
# Count matching lines
grep -c "error" /var/log/syslog

# Show line numbers
grep -n "password" /etc/ssh/sshd_config

# Case-insensitive search
grep -i "error" /var/log/syslog

# Recursive search (all files in directory)
grep -r "password" /etc/ 2>/dev/null
\`\`\`

:::checkpoint
What does grep -r do?
- Reverse the search
- Search recursively through all files in a directory
- Return only the first match
- Remove matching lines
:::

## Finding Files: find

\`\`\`bash
# Find files by name
find / -name "*.conf" -type f 2>/dev/null

# Find files by size (larger than 10MB)
find / -size +10M -type f 2>/dev/null

# Find files by permission (SUID)
find / -perm -4000 -type f 2>/dev/null

# Find files modified in the last 24 hours
find / -mtime -1 -type f 2>/dev/null
\`\`\`

**Breaking it down:**
- \`/\` = start from root (search entire system)
- \`-name\` = match filename pattern
- \`-type f\` = only files (not directories)
- \`2>/dev/null\` = suppress error messages

:::checkpoint
What does 2>/dev/null do in a find command?
- Saves output to a file
- Suppresses error messages
- Shows only errors
- Redirects to /dev/null
:::

## Locating Executables: which

\`\`\`bash
which nmap
\`\`\`

Output: \`/usr/bin/nmap\`

**which** tells you the full path of a command. Use it to:
- Verify a tool is installed
- Find where a binary is located
- Check if a command is in your PATH

\`\`\`bash
which python3
which sqlmap
which metasploit
\`\`\`

## Practical Exercise: Find SSH Config

\`\`\`bash
# Find SSH configuration
find / -name "sshd_config" -type f 2>/dev/null

# Read it
cat /etc/ssh/sshd_config

# Search for password authentication setting
grep "PasswordAuthentication" /etc/ssh/sshd_config
\`\`\`

:::checkpoint
What is the correct command to find all .log files in /var/log?
- find /var/log -name "*.log"
- grep "*.log" /var/log
- ls *.log /var/log
- which *.log
:::`,
        aiPrompt: "Explain the difference between grep and find commands and when to use each one.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "How do you search for sensitive information on a compromised Linux system?",
        interviewAnswer: "I use grep -r to search recursively for keywords like password, secret, key, token in config files. I use find to locate files by permission (SUID), size, or modification time. I check /etc/shadow, .bash_history, and SSH keys.",
        quiz: [
          { question: "What does grep do?", options: ["Find files by name", "Search text patterns inside files", "Delete files", "Create files"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "grep searches for text patterns inside files and prints matching lines.", certTags: ["Linux+"] },
          { question: "What does grep -r do?", options: ["Reverse search", "Search recursively through directories", "Return first match only", "Remove matches"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "-r searches all files in a directory and its subdirectories.", certTags: ["Linux+"] },
          { question: "What does find / -name '*.conf' do?", options: ["Create a config file", "Find all .conf files starting from root", "Delete config files", "Edit config files"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "find searches for files by name pattern starting from the specified directory.", certTags: ["Linux+"] },
          { question: "What does 2>/dev/null do?", options: ["Save output to file", "Suppress error messages", "Show only errors", "Redirect stdout"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "2>/dev/null redirects stderr (error messages) to the null device, suppressing them.", certTags: ["Linux+"] },
          { question: "What does which nmap return?", options: ["nmap version", "Full path to nmap binary", "nmap help text", "nmap scan results"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "which returns the full path of an executable in your PATH.", certTags: ["Linux+"] },
          { question: "What find flag searches for SUID files?", options: ["-suid", "-perm -4000", "-type suid", "-exec"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "-perm -4000 finds files with the SUID permission bit set.", certTags: ["Security+"] },
          { question: "What does grep -i do?", options: ["Inverse match", "Case-insensitive search", "Include hidden files", "Incremental search"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "-i makes the search case-insensitive.", certTags: ["Linux+"] },
          { question: "How do you find files modified in the last 24 hours?", options: ["find / -mtime -1", "find / -newer 1", "find / -changed 24h", "find / -recent"], correctAnswerIndex: 0, difficulty: "intermediate", explanation: "-mtime -1 finds files modified less than 1 day ago.", certTags: ["Linux+"] }
        ]
      },
      {
        id: "weLINUXd05",
        title: "Project 5: Permissions — Who Can Do What",
        description: "Understand Linux permissions (rwx), ownership (user/group), and why SUID binaries are the #1 privilege escalation vector.",
        type: "practice",
        duration: "30 min",
        content: `:::objectives
- Read and interpret Linux permission strings (rwxr-xr-x)
- Change permissions with chmod and ownership with chown
- Understand SUID/SGID and why they matter for privilege escalation
- Find SUID binaries that can be exploited
:::

## How Linux Permissions Work

Every file has three permission levels:

| Level | Who | Abbreviation |
|-------|-----|-------------|
| Owner | The user who owns the file | u |
| Group | Users in the file's group | g |
| Others | Everyone else | o |

Each level has three permissions:

| Permission | Symbol | Number | For Files | For Directories |
|-----------|--------|--------|-----------|-----------------|
| Read | r | 4 | View contents | List contents |
| Write | w | 2 | Modify file | Create/delete files |
| Execute | x | 1 | Run as program | Enter directory |

## Reading Permissions: ls -la

\`\`\`bash
ls -la /etc/passwd
\`\`\`

Output: \`-rw-r--r-- 1 root root 1869 Jul  7 09:00 /etc/passwd\`

Breaking down \`-rw-r--r--\`:
| Position | Meaning |
|----------|---------|
| - | Regular file (d = directory, l = link) |
| rw- | Owner: read + write |
| r-- | Group: read only |
| r-- | Others: read only |

:::checkpoint
What does rwx mean in Linux permissions?
- Read, Write, Execute
- Run, Work, Exit
- Root, Write, Execute
- Read, Write, Exit
:::

## Changing Permissions: chmod

**Numeric mode:**
\`\`\`bash
chmod 755 script.sh
\`\`\`

755 = rwxr-xr-x (owner: all, group: read+execute, others: read+execute)

| Number | Permission |
|--------|-----------|
| 7 | rwx (4+2+1) |
| 6 | rw- (4+2) |
| 5 | r-x (4+1) |
| 4 | r-- (4) |
| 0 | --- (none) |

**Symbolic mode:**
\`\`\`bash
chmod +x script.sh    # Add execute for everyone
chmod u+w script.sh   # Add write for owner only
chmod g-r file.txt    # Remove read for group
\`\`\`

:::checkpoint
What does chmod 755 set?
- rwxr-xr-x
- rwxrwxrwx
- rw-r--r--
- rwx------
:::

## Changing Ownership: chown

\`\`\`bash
sudo chown root:root script.sh
\`\`\`

**chown** changes the owner and group. Format: \`owner:group\`

## SUID — The Privilege Escalation Vector

The SUID bit makes a program run with the FILE OWNER's privileges, not the user running it.

\`\`\`bash
ls -la /usr/bin/passwd
\`\`\`

Output: \`-rwsr-xr-x 1 root root 68208 Jul  7 10:00 /usr/bin/passwd\`

Notice the \`s\` in \`rws\` — that's the SUID bit. When you run passwd, it runs as root (the file owner) even though you're a normal user.

**Why this matters for hackers:** If a SUID binary is owned by root AND has a vulnerability, you can get root.

\`\`\`bash
# Find all SUID binaries
find / -perm -4000 -type f 2>/dev/null
\`\`\`

:::checkpoint
What does the SUID bit (s in rws) do?
- Makes the file read-only
- Runs the program with the file owner's privileges
- Prevents the file from being deleted
- Encrypts the file
:::

## Practical Exercise

\`\`\`bash
# Create a script
echo '#!/bin/bash' > ~/test.sh
echo 'echo "Hello from $(whoami)"' >> ~/test.sh

# Make it executable
chmod +x ~/test.sh

# Run it
./test.sh

# Find SUID binaries
find / -perm -4000 -type f 2>/dev/null
\`\`\``,
        aiPrompt: "Explain Linux permissions and why SUID binaries are a security risk.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "How do you find and exploit SUID binaries for privilege escalation?",
        interviewAnswer: "I use find / -perm -4000 -type f to find SUID binaries. Then I check GTFOBins for exploitation methods. Common targets include find, vim, python, nmap — all can spawn a root shell if they have SUID set.",
        quiz: [
          { question: "What does rwx mean?", options: ["Read, Write, Execute", "Run, Work, Exit", "Root, Write, Execute", "Read, Write, Exit"], correctAnswerIndex: 0, difficulty: "beginner", explanation: "rwx = Read, Write, Execute — the three basic permissions.", certTags: ["Linux+"] },
          { question: "What does chmod 755 set?", options: ["rwxr-xr-x", "rwxrwxrwx", "rw-r--r--", "rwx------"], correctAnswerIndex: 0, difficulty: "beginner", explanation: "7=rwx, 5=r-x. So 755 = rwxr-xr-x.", certTags: ["Linux+"] },
          { question: "What does the SUID bit do?", options: ["Makes file read-only", "Runs with file owner's privileges", "Prevents deletion", "Encrypts file"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "SUID makes the program execute with the file owner's (usually root) privileges.", certTags: ["Security+"] },
          { question: "How do you find SUID files?", options: ["find / -perm -4000", "ls -la /suid", "grep suid /etc", "which suid"], correctAnswerIndex: 0, difficulty: "intermediate", explanation: "find / -perm -4000 searches for files with the SUID permission bit.", certTags: ["OSCP"] },
          { question: "What does the 's' in rws indicate?", options: ["Secure file", "SUID bit set", "Shared file", "System file"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "The s in the execute position means the SUID bit is set.", certTags: ["Security+"] },
          { question: "What is the numeric value for rwx?", options: ["7", "6", "5", "4"], correctAnswerIndex: 0, difficulty: "beginner", explanation: "r=4, w=2, x=1. 4+2+1=7.", certTags: ["Linux+"] },
          { question: "What does chown root:root file do?", options: ["Delete the file", "Change owner and group to root", "Make file executable", "Create a copy"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "chown changes file ownership. root:root = owner:group.", certTags: ["Linux+"] },
          { question: "Why are SUID binaries dangerous?", options: ["They use more memory", "They can be exploited for privilege escalation", "They slow down the system", "They delete files"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "SUID binaries run as root. If exploitable, they give attackers root access.", certTags: ["Security+"] }
        ]
      },
      {
        id: "weLINUXd06",
        title: "Project 6: Processes — What's Running",
        description: "View running processes with ps and top, kill processes, and understand process states. Learn to identify suspicious processes.",
        type: "practice",
        duration: "30 min",
        content: `:::objectives
- View running processes with ps aux and top
- Understand process states (R, S, D, Z, T)
- Kill processes with kill and killall
- Identify suspicious processes on a compromised system
:::

## What Is a Process?

A process is a running instance of a program. Every command you run creates a process. Every service on a system is a process. Hackers need to understand processes to:
- Find running services to exploit
- Kill malware or suspicious processes
- Understand what's consuming resources
- Maintain persistence (run malicious processes)

## Viewing Processes: ps aux

\`\`\`bash
ps aux
\`\`\`

Output:
\`\`\`
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.4 169848 10044 ?        Ss   09:30   0:02 /sbin/init
root       456  0.0  0.0  72308  4096 ?        Ss   09:30   0:00 /usr/sbin/sshd
user      1234  0.1  0.2  45678  5678 pts/0    Ss+  10:00   0:00 bash
user      1300  0.0  0.1  23456  3456 pts/1    Ss+  10:05   0:00 bash
root      1400  0.0  0.3  78901  6789 ?        Ss   09:31   0:00 /usr/sbin/sshd
\`\`\`

**Breaking it down:**
| Column | Meaning |
|--------|---------|
| USER | Who owns the process |
| PID | Process ID (unique number) |
| %CPU | CPU usage percentage |
| %MEM | Memory usage percentage |
| STAT | Process state |
| COMMAND | The command that started it |

:::checkpoint
What does PID mean?
- Process Identifier
- Program Internal Data
- Process Input Device
- Program Installation Date
:::

## Process States

| State | Meaning | What It Means |
|-------|---------|---------------|
| R | Running | Currently executing |
| S | Sleeping | Waiting for something (normal) |
| D | Uninterruptible sleep | Waiting for I/O (cannot be killed) |
| Z | Zombie | Finished but parent hasn't cleaned up |
| T | Stopped | Paused by signal |

:::checkpoint
What does a zombie (Z) process indicate?
- A malicious process
- A process that finished but parent hasn't cleaned it up
- A process consuming all memory
- A root process
:::

## Real-Time Monitoring: top

\`\`\`bash
top
\`\`\`

**top** shows processes in real-time, sorted by CPU usage. Press:
- \`q\` to quit
- \`k\` to kill a process (enter PID)
- \`M\` to sort by memory
- \`P\` to sort by CPU

## Killing Processes: kill

\`\`\`bash
kill 1234           # Send SIGTERM (graceful)
kill -9 1234        # Send SIGKILL (force)
killall firefox     # Kill by name
\`\`\`

| Signal | Number | Effect |
|--------|--------|--------|
| SIGTERM | 15 | Graceful shutdown (can be caught) |
| SIGKILL | 9 | Force kill (cannot be caught) |
| SIGHUP | 1 | Restart/reload |

:::warning
SIGKILL (-9) should be a last resort. It doesn't allow the process to clean up.
:::

## Finding Suspicious Processes

Look for:
- Unusual process names (random strings, misspellings)
- Processes running as root that shouldn't be
- High CPU/memory usage from unknown processes
- Processes with network connections to unknown IPs
- Processes running from /tmp or /dev/shm

\`\`\`bash
# Find processes running from /tmp
ls -la /proc/*/exe 2>/dev/null | grep /tmp

# Find processes with network connections
ss -tulnp
\`\`\``,
        aiPrompt: "Explain how to identify and handle suspicious processes on a compromised Linux system.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "How do you identify a suspicious process on a Linux system?",
        interviewAnswer: "I check ps aux for unusual names, high resource usage, and processes running from /tmp or /dev/shm. I check /proc/PID/exe for the binary path, lsof -p PID for open files, and ss -tulnp for network connections.",
        quiz: [
          { question: "What does PID mean?", options: ["Process Identifier", "Program Internal Data", "Process Input Device", "Program Installation Date"], correctAnswerIndex: 0, difficulty: "beginner", explanation: "PID = Process ID, a unique number for each running process.", certTags: ["Linux+"] },
          { question: "What does a zombie (Z) process indicate?", options: ["Malicious process", "Finished but parent hasn't cleaned up", "High memory usage", "Root process"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "Zombie processes have exited but their parent hasn't called wait() to collect their status.", certTags: ["Linux+"] },
          { question: "What signal does kill -9 send?", options: ["SIGTERM", "SIGKILL", "SIGHUP", "SIGSTOP"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "-9 sends SIGKILL, which force-kills the process immediately.", certTags: ["Linux+"] },
          { question: "What command shows processes in real-time?", options: ["ps aux", "top", "ls proc", "who"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "top displays processes in real-time, sorted by CPU usage.", certTags: ["Linux+"] },
          { question: "What does STAT 'Ss' mean?", options: ["Stopped, secure", "Sleeping, session leader", "System, suspended", "Started, stopped"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "S = sleeping, s = session leader. This is normal for most processes.", certTags: ["Linux+"] },
          { question: "How do you force kill PID 1234?", options: ["kill 1234", "kill -9 1234", "kill -TERM 1234", "killall 1234"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "-9 sends SIGKILL, which cannot be caught or ignored.", certTags: ["Linux+"] },
          { question: "What is a suspicious process indicator?", options: ["Running as user", "Running from /tmp", "Using 0% CPU", "Sleeping state"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "Processes running from /tmp or /dev/shm are often malicious — these are writable directories.", certTags: ["Security+"] },
          { question: "What does ss -tulnp show?", options: ["File contents", "Listening network ports and processes", "CPU usage", "Memory usage"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "ss shows socket statistics. -tulnp shows TCP/UDP listening ports with process names.", certTags: ["Security+"] }
        ]
      },
      {
        id: "weLINUXd07",
        title: "Project 7: Pipes & Redirects — Chaining Commands",
        description: "Chain commands together with pipes, redirect output to files, and build powerful one-liners for recon.",
        type: "practice",
        duration: "30 min",
        content: `:::objectives
- Chain commands using pipes (|) to process output
- Redirect output to files with > and >>
- Understand stderr vs stdout and how to redirect both
- Build powerful one-liners for security reconnaissance
:::

## Pipes: Connecting Commands

A pipe sends the output of one command as input to the next.

\`\`\`bash
ls -la | grep ".txt"
\`\`\`

Output: Only lines containing ".txt" from the ls output.

**How it works:**
1. \`ls -la\` produces a list of files
2. \`|\` sends that list to grep
3. \`grep ".txt"\` filters for lines containing ".txt"

:::checkpoint
What does a pipe (|) do?
- Deletes the output
- Sends output of one command to input of next
- Saves output to a file
- Runs commands in parallel
:::

## Building Recon Pipelines

\`\`\`bash
# Find failed SSH login attempts
cat /var/log/auth.log | grep "Failed" | wc -l

# Count unique attacking IPs
grep "Failed" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn

# Find large files
find / -size +10M -type f 2>/dev/null | head -20
\`\`\`

:::checkpoint
What does \`sort | uniq -c\` do?
- Deletes duplicate lines
- Sorts lines and counts unique occurrences
- Finds unique files
- Creates a backup
:::

## Output Redirection: > and >>

\`\`\`bash
# Overwrite file
echo "Scan started" > scan_log.txt

# Append to file
echo "Scan completed" >> scan_log.txt

# Redirect both stdout and stderr
command > all.txt 2>&1

# Suppress all output
command > /dev/null 2>&1
\`\`\`

| Operator | Meaning |
|----------|---------|
| \`>\` | Redirect stdout to file (overwrite) |
| \`>>\` | Redirect stdout to file (append) |
| \`2>\` | Redirect stderr to file |
| \`2>&1\` | Redirect stderr to stdout |
| \`> /dev/null\` | Suppress output |

:::checkpoint
What does > do?
- Appends to file
- Overwrites file with output
- Deletes the file
- Creates a pipe
:::

## Practical Exercise: Log Analysis Pipeline

\`\`\`bash
# Find all failed SSH attempts, extract IPs, count and sort
grep "Failed password" /var/log/auth.log | \\
  awk '{print $11}' | \\
  sort | \\
  uniq -c | \\
  sort -rn | \\
  head -5
\`\`\`

This one-liner:
1. Finds failed login attempts
2. Extracts the IP address (field 11)
3. Sorts the IPs
4. Counts unique occurrences
5. Sorts by count (highest first)
6. Shows top 5

:::checkpoint
What does awk '{print $11}' do?
- Print the 11th line
- Print the 11th field/column
- Print 11 copies
- Delete the 11th field
:::`,
        aiPrompt: "Explain how pipes and redirects work in Linux and give examples of security-focused one-liners.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Write a one-liner to find the top 5 IPs with the most failed SSH login attempts.",
        interviewAnswer: "grep 'Failed password' /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn | head -5",
        quiz: [
          { question: "What does a pipe (|) do?", options: ["Deletes output", "Sends output to next command's input", "Saves to file", "Runs in parallel"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "Pipes connect commands — stdout of one becomes stdin of next.", certTags: ["Linux+"] },
          { question: "What does > do?", options: ["Append to file", "Overwrite file with output", "Delete file", "Create pipe"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "> redirects stdout to a file, overwriting it.", certTags: ["Linux+"] },
          { question: "What does >> do differently from >?", options: ["Nothing", "Appends instead of overwriting", "Deletes the file", "Creates a new file"], correctAnswerIndex: 1, difficulty: "beginner", explanation: ">> appends to the file. > overwrites it.", certTags: ["Linux+"] },
          { question: "What does 2>&1 do?", options: ["Delete errors", "Redirect stderr to stdout", "Show only errors", "Redirect stdout to stderr"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "2>&1 redirects file descriptor 2 (stderr) to file descriptor 1 (stdout).", certTags: ["Linux+"] },
          { question: "What does sort | uniq -c do?", options: ["Delete duplicates", "Sort and count unique lines", "Find unique files", "Create backup"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "sort orders lines, then uniq -c counts consecutive identical lines.", certTags: ["Linux+"] },
          { question: "What does awk '{print $11}' do?", options: ["Print line 11", "Print the 11th field", "Print 11 copies", "Delete field 11"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "awk splits each line into fields. $11 is the 11th field.", certTags: ["Linux+"] },
          { question: "What does /dev/null do?", options: ["Store data", "Discard all output", "Create a file", "Show errors"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "/dev/null is the null device — writing to it discards the data.", certTags: ["Linux+"] },
          { question: "How do you chain multiple commands?", options: ["Use ;", "Use |", "Use &", "All of the above"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "| (pipe) chains commands by sending output of one to input of next.", certTags: ["Linux+"] }
        ]
      },
      {
        id: "weLINUXd08",
        title: "Project 8: Bash Scripting — Writing Your First Tools",
        description: "Write bash scripts with variables, conditionals, and loops. Automate reconnaissance and build custom tools.",
        type: "practice",
        duration: "45 min",
        content: `:::objectives
- Write bash scripts with proper shebang and structure
- Use variables, conditionals (if/else), and loops (for/while)
- Accept command-line arguments
- Build a simple recon script
:::

## What Is a Script?

A script is a file containing commands that execute sequentially. Instead of typing 10 commands manually, you write them once and run the script.

## Your First Script

\`\`\`bash
#!/bin/bash
# This is a comment

echo "Hello, $USER!"
echo "Today is $(date +%A)"
echo "You are in $(pwd)"
\`\`\`

**Breaking it down:**
- \`#!/bin/bash\` — shebang line (tells the system to use bash)
- \`#\` — comment (ignored by bash)
- \`$USER\` — variable (your username)
- \`$(date +%A)\` — command substitution (runs date, inserts output)

Save it and make it executable:
\`\`\`bash
chmod +x hello.sh
./hello.sh
\`\`\`

:::checkpoint
What does #!/bin/bash do?
- Comments out the line
- Tells the system which interpreter to use
- Sets the file permissions
- Creates a variable
:::

## Variables

\`\`\`bash
#!/bin/bash

TARGET="192.168.1.100"
PORT=80
echo "Scanning $TARGET on port $PORT"
\`\`\`

- No spaces around \`=\`
- Use \`$VAR\` to access the value
- Use \`"$VAR"\` in strings to preserve spaces

:::checkpoint
How do you assign a value to a variable in bash?
- var = "value"
- var="value"
- $var="value"
- set var "value"
:::

## Command-Line Arguments

\`\`\`bash
#!/bin/bash

echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "Number of arguments: $#"
echo "All arguments: $@"
\`\`\`

Run it:
\`\`\`bash
./script.sh 192.168.1.100 80
\`\`\`

Output:
\`\`\`
Script name: ./script.sh
First argument: 192.168.1.100
Second argument: 80
Number of arguments: 2
All arguments: 192.168.1.100 80
\`\`\`

:::checkpoint
What does $1 represent in a bash script?
- The script name
- The first argument
- The number of arguments
- All arguments
:::

## Conditionals: if/else

\`\`\`bash
#!/bin/bash

if [ "$1" = "" ]; then
    echo "Usage: $0 <target>"
    exit 1
fi

echo "Scanning $1..."
\`\`\`

**Comparison operators:**
| Operator | Meaning |
|----------|---------|
| \`-eq\` | Equal (numbers) |
| \`-ne\` | Not equal |
| \`-gt\` | Greater than |
| \`-lt\` | Less than |
| \`=\` | Equal (strings) |
| \`-z\` | String is empty |

:::checkpoint
What does -z "$1" check?
- If $1 is zero
- If $1 is empty
- If $1 is a number
- If $1 exists
:::

## Loops: for

\`\`\`bash
#!/bin/bash

for ip in 192.168.1.{1..10}; do
    ping -c 1 $ip > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "$ip is alive"
    fi
done
\`\`\`

This loops through IPs 192.168.1.1 to 192.168.1.10, pings each one, and reports which are alive.

:::checkpoint
What does {1..10} generate?
- Numbers 1 to 10
- Files 1 to 10
- Directories 1 to 10
- Nothing
:::

## Your First Recon Script

\`\`\`bash
#!/bin/bash
# recon.sh — Basic host reconnaissance

TARGET=$1

if [ -z "$TARGET" ]; then
    echo "Usage: $0 <target>"
    exit 1
fi

echo "=== Recon Report for $TARGET ==="
echo "Date: $(date)"
echo ""

echo "--- Ping Test ---"
ping -c 3 $TARGET

echo ""
echo "--- Open Ports ---"
nmap -T4 --top-ports 20 $TARGET 2>/dev/null | grep "open"

echo ""
echo "--- DNS Info ---"
host $TARGET 2>/dev/null
\`\`\`

\`\`\`bash
chmod +x recon.sh
./recon.sh 192.168.1.1
\`\`\``,
        aiPrompt: "Explain how bash scripts work and why automation is important for security professionals.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Write a bash script that pings a list of IPs and reports which are alive.",
        interviewAnswer: "for ip in $(cat ips.txt); do ping -c 1 $ip > /dev/null 2>&1 && echo $ip is alive; done",
        quiz: [
          { question: "What does #!/bin/bash do?", options: ["Comments out the line", "Tells the system which interpreter to use", "Sets permissions", "Creates a variable"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "The shebang line tells the OS to use bash to execute the script.", certTags: ["Linux+"] },
          { question: "How do you assign a variable in bash?", options: ["var = 'value'", "var='value'", "$var='value'", "set var 'value'"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "No spaces around = when assigning variables in bash.", certTags: ["Linux+"] },
          { question: "What does $1 represent?", options: ["Script name", "First argument", "Number of arguments", "All arguments"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "$1 is the first command-line argument passed to the script.", certTags: ["Linux+"] },
          { question: "What does -z '$1' check?", options: ["If $1 is zero", "If $1 is empty", "If $1 is a number", "If $1 exists"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "-z tests if the string is empty (zero length).", certTags: ["Linux+"] },
          { question: "What does {1..10} generate?", options: ["Numbers 1 to 10", "Files 1 to 10", "Directories 1 to 10", "Nothing"], correctAnswerIndex: 0, difficulty: "beginner", explanation: "Brace expansion generates a sequence: {1..10} = 1 2 3 4 5 6 7 8 9 10.", certTags: ["Linux+"] },
          { question: "What does $? contain?", options: ["The last command's exit code", "The current directory", "The number of arguments", "The script name"], correctAnswerIndex: 0, difficulty: "intermediate", explanation: "$? holds the exit code of the last command. 0 = success, non-zero = failure.", certTags: ["Linux+"] },
          { question: "What does exit 1 do?", options: ["Exits with success", "Exits with error", "Pauses the script", "Loops the script"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "exit 1 exits the script with error code 1 (failure). exit 0 = success.", certTags: ["Linux+"] },
          { question: "What is command substitution?", options: ["Running a command in background", "$(command) inserts command output into a string", "Deleting a command", "Saving a command to file"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "$(command) runs the command and inserts its output. date +%A in $(date +%A) inserts the day name.", certTags: ["Linux+"] }
        ]
      },
      {
        id: "weLINUXd09",
        title: "Project 9: Log Analysis — Reading the Battlefield",
        description: "Analyze auth.log, syslog, and application logs to detect attacks, find patterns, and extract indicators of compromise.",
        type: "practice",
        duration: "30 min",
        content: `:::objectives
- Understand Linux log file locations and types
- Parse auth.log for failed logins and successful authentications
- Extract indicators of compromise (IOCs) from logs
- Build log analysis pipelines for security monitoring
:::

## Why Log Analysis Matters

Logs are the primary source of evidence in security investigations. Every attack leaves traces in logs:
- Failed login attempts (brute force)
- Successful logins from unusual IPs (compromise)
- Process creation (malware execution)
- File modifications (data tampering)

If you can't read logs, you can't detect attacks.

## Linux Log Locations

| File | Content |
|------|---------|
| /var/log/auth.log | Authentication events (SSH, sudo, login) |
| /var/log/syslog | System messages |
| /var/log/kern.log | Kernel messages |
| /var/log/apache2/access.log | Web server requests |
| /var/log/apache2/error.log | Web server errors |

## Reading auth.log

\`\`\`bash
tail -20 /var/log/auth.log
\`\`\`

A typical failed SSH login:
\`\`\`
Jun 15 03:22:14 server sshd[12345]: Failed password for invalid user admin from 10.0.0.50 port 22 ssh2
\`\`\`

:::checkpoint
What log file contains SSH login attempts?
- /var/log/syslog
- /var/log/auth.log
- /var/log/messages
- /var/log/ssh.log
:::

## Detecting Brute Force Attacks

\`\`\`bash
# Count failed login attempts
grep -c "Failed password" /var/log/auth.log

# Find attacking IPs
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn

# Find successful logins (potential compromise)
grep "Accepted" /var/log/auth.log

# Find successful logins from specific IP
grep "Accepted" /var/log/auth.log | grep "10.0.0.50"
\`\`\`

:::checkpoint
What does grep -c do?
- Show matching lines
- Count matching lines
- Delete matching lines
- Copy matching lines
:::

## Building a Log Analysis Report

\`\`\`bash
#!/bin/bash
# log_analysis.sh — Quick security log analysis

echo "=== Security Log Analysis ==="
echo "Date: $(date)"
echo ""

echo "--- Failed Login Attempts ---"
grep -c "Failed password" /var/log/auth.log

echo ""
echo "--- Top 5 Attacking IPs ---"
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn | head -5

echo ""
echo "--- Successful Logins ---"
grep "Accepted" /var/log/auth.log | awk '{print $9, $11}' | sort -u

echo ""
echo "--- Users Targeted ---"
grep "Failed password" /var/log/auth.log | awk '{print $9}' | sort | uniq -c | sort -rn
\`\`\`

:::checkpoint
What does awk '{print $11}' extract from a log line?
- The timestamp
- The IP address (11th field)
- The username
- The port number
:::

## Practical Exercise

\`\`\`bash
# Analyze your own auth.log
cat /var/log/auth.log | head -20

# Count failed attempts
grep -c "Failed" /var/log/auth.log

# Find the most common attacking IP
grep "Failed" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn | head -1

# Find successful logins
grep "Accepted" /var/log/auth.log
\`\`\``,
        aiPrompt: "Explain how to analyze Linux log files to detect security incidents.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "How do you detect a brute force attack from Linux logs?",
        interviewAnswer: "I grep auth.log for 'Failed password', extract source IPs with awk, count occurrences with sort | uniq -c, and sort by frequency. If one IP has many failures, it's likely brute force. I also check for successful logins from that IP.",
        quiz: [
          { question: "What log file contains SSH login attempts?", options: ["/var/log/syslog", "/var/log/auth.log", "/var/log/messages", "/var/log/ssh.log"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "auth.log contains authentication events including SSH.", certTags: ["Security+"] },
          { question: "What does grep -c do?", options: ["Show matching lines", "Count matching lines", "Delete matches", "Copy matches"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "-c counts the number of matching lines.", certTags: ["Linux+"] },
          { question: "What does awk '{print $11}' extract?", options: ["Timestamp", "IP address", "Username", "Port"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "In auth.log, the 11th field is typically the source IP address.", certTags: ["Security+"] },
          { question: "What does sort | uniq -c | sort -rn do?", options: ["Delete duplicates", "Count unique values and sort by frequency", "Find unique files", "Create backup"], correctAnswerIndex: 1, difficulty: "intermediate", explanation: "sort orders lines, uniq -c counts consecutive identical lines, sort -rn sorts numerically in reverse.", certTags: ["Linux+"] },
          { question: "What indicates a successful login in auth.log?", options: ["Failed password", "Accepted password", "Connection closed", "Invalid user"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "Accepted password indicates a successful authentication.", certTags: ["Security+"] },
          { question: "What is an IOC?", options: ["Input/Output Control", "Indicator of Compromise", "Internal Operating Command", "Internet Open Connection"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "IOC = Indicator of Compromise — evidence that a system has been breached.", certTags: ["Security+"] },
          { question: "How do you find successful logins from a specific IP?", options: ["grep 'Accepted' auth.log | grep 'IP'", "find auth.log IP", "awk IP auth.log", "tail IP auth.log"], correctAnswerIndex: 0, difficulty: "beginner", explanation: "Chain two greps: first for Accepted, then for the IP.", certTags: ["Security+"] },
          { question: "What is the purpose of log analysis in security?", options: ["Delete old logs", "Detect attacks and extract IOCs", "Compress log files", "Create new logs"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "Log analysis detects attacks, extracts IOCs, and supports incident response.", certTags: ["Security+"] }
        ]
      },
      {
        id: "weLINUXd10",
        title: "Project 10: System Recon — Know Your Target",
        description: "Perform full system enumeration: OS version, users, network, services, scheduled tasks. The first step of any pentest.",
        type: "practice",
        duration: "30 min",
        content: `:::objectives
- Enumerate system information (OS, kernel, hostname)
- Enumerate users and groups
- Enumerate network configuration and listening ports
- Enumerate services and scheduled tasks
- Build a complete system recon script
:::

## Why System Recon Matters

The first thing a hacker does after gaining access: enumerate the system. You need to know:
- What OS and version (find kernel exploits)
- Who has accounts (find targets)
- What's running (find attack surface)
- What's scheduled (find persistence opportunities)

## System Information

\`\`\`bash
hostname                    # Computer name
uname -a                    # Full kernel info
cat /etc/os-release         # OS distribution
uptime                      # How long the system has been running
\`\`\`

:::checkpoint
What command shows the kernel version?
- hostname
- uname -a
- cat /etc/hosts
- id
:::

## Users and Groups

\`\`\`bash
id                          # Current user's UID, GID, groups
whoami                      # Current username
cat /etc/passwd             # All users
cat /etc/group              # All groups
last                        # Recent login history
\`\`\`

**Users with shells (can log in):**
\`\`\`bash
grep -v "nologin\|false" /etc/passwd
\`\`\`

:::checkpoint
What file contains user account information?
- /etc/shadow
- /etc/passwd
- /etc/group
- /etc/users
:::

## Network Configuration

\`\`\`bash
ip addr                     # Network interfaces and IPs
ip route                    # Routing table
ss -tlnp                    # Listening ports with process names
cat /etc/resolv.conf        # DNS servers
\`\`\`

:::checkpoint
What command shows listening ports?
- ip addr
- ss -tlnp
- cat /etc/passwd
- uname -a
:::

## Services and Processes

\`\`\`bash
systemctl list-units --type=service --state=running
ps aux
\`\`\`

## Scheduled Tasks

\`\`\`bash
crontab -l                  # Current user's cron jobs
ls -la /etc/cron*           # System cron directories
cat /etc/crontab            # System crontab
\`\`\`

## Full Recon Script

\`\`\`bash
#!/bin/bash
# full_recon.sh — Complete system enumeration

echo "=========================================="
echo " SYSTEM RECONNAISSANCE REPORT"
echo " Date: $(date)"
echo "=========================================="

echo ""
echo "--- System Info ---"
echo "Hostname: $(hostname)"
echo "Kernel: $(uname -r)"
echo "OS: $(cat /etc/os-release | grep PRETTY_NAME | cut -d= -f2)"
echo "Uptime: $(uptime -p)"

echo ""
echo "--- User Info ---"
echo "Current user: $(whoami)"
echo "UID: $(id -u)"
echo "Groups: $(id -Gn)"
echo ""
echo "Users with shells:"
grep -v "nologin\|false\|sync" /etc/passwd | cut -d: -f1

echo ""
echo "--- Network ---"
echo "Interfaces:"
ip addr show | grep "inet " | awk '{print $2}'
echo ""
echo "Listening ports:"
ss -tlnp 2>/dev/null | grep LISTEN

echo ""
echo "--- Cron Jobs ---"
crontab -l 2>/dev/null || echo "No user crontab"
ls -la /etc/cron.d/ 2>/dev/null

echo ""
echo "--- SUID Files ---"
find / -perm -4000 -type f 2>/dev/null | head -10
\`\`\`

:::checkpoint
What is the first thing you do after gaining access to a Linux system?
- Delete logs
- Change passwords
- Enumerate the system
- Install backdoors
:::`,
        aiPrompt: "Explain the methodology for system enumeration on a compromised Linux host.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "What information do you gather when you first access a Linux system during a pentest?",
        interviewAnswer: "I gather OS/kernel version for exploit matching, user accounts for lateral movement, network interfaces for pivoting, listening ports for services, cron jobs for persistence opportunities, and SUID binaries for privilege escalation.",
        quiz: [
          { question: "What command shows the kernel version?", options: ["hostname", "uname -a", "cat /etc/hosts", "id"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "uname -a shows full kernel information including version.", certTags: ["Linux+"] },
          { question: "What file contains user accounts?", options: ["/etc/shadow", "/etc/passwd", "/etc/group", "/etc/users"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "/etc/passwd contains user account information.", certTags: ["Linux+"] },
          { question: "What command shows listening ports?", options: ["ip addr", "ss -tlnp", "cat /etc/passwd", "uname -a"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "ss -tlnp shows TCP listening ports with process names.", certTags: ["Security+"] },
          { question: "What does id show?", options: ["IP address", "UID, GID, and group memberships", "Hostname", "Kernel version"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "id shows user ID, group ID, and all group memberships.", certTags: ["Linux+"] },
          { question: "What is the first step after gaining access?", options: ["Delete logs", "Change passwords", "Enumerate the system", "Install backdoors"], correctAnswerIndex: 2, difficulty: "intermediate", explanation: "Always enumerate first — you need to understand the system before acting.", certTags: ["OSCP"] },
          { question: "What does crontab -l show?", options: ["Current directory", "Scheduled tasks for current user", "Running processes", "Network connections"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "crontab -l lists the current user's scheduled cron jobs.", certTags: ["Linux+"] },
          { question: "Why check /etc/os-release?", options: ["Get IP address", "Identify OS distribution and version", "Find users", "Check network"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "/etc/os-release contains the OS name and version — needed for exploit matching.", certTags: ["Security+"] },
          { question: "What does uptime show?", options: ["Current time", "How long the system has been running", "User accounts", "Network status"], correctAnswerIndex: 1, difficulty: "beginner", explanation: "uptime shows how long the system has been running since last reboot.", certTags: ["Linux+"] }
        ]
      },
    ]
  },
  {
    id: "week00",
    title: "What a Computer Is",
    durationText: "Week 0 - Days 0-3",
    focus: "Set up your lab environment and understand how computers work at a fundamental level",
    output: "Fully configured WSL2 Ubuntu environment with all security tools installed, and understand the input-process-output cycle",
    topics: [
      {
        id: "we00d00",
        title: "Your Toolkit Setup (Do This First)",
        description: "Install WSL2, Ubuntu, and all security tools before starting Day 1. This is your lab environment.",
        type: "learn",
        duration: "1-2 hours",
        content: `:::objectives
- Install WSL2 and Ubuntu on Windows
- Install Windows-native security tools (Burp Suite, Wireshark, Nmap, VS Code)
- Install Linux security tools in Ubuntu (nmap, sqlmap, metasploit, etc.)
- Verify everything works before proceeding to Day 1
:::

## Why Set Up First?

You will use these tools every single day for the next 60 weeks. Getting them installed now means you can focus on learning instead of troubleshooting installations mid-lesson.

:::warning
Complete this setup BEFORE moving to Day 1. Every subsequent lesson assumes these tools are ready.
:::

## Step 1: WSL2 + Ubuntu (10 minutes)

Open **PowerShell as Administrator** (right-click Start button, select "Windows Terminal (Admin)"):

\`\`\`powershell
wsl --install
\`\`\`

**Restart your PC** when prompted. After restart:

1. Open the **Start Menu**
2. Click **Ubuntu** (it will open a terminal)
3. Wait for the first-time setup to complete
4. Enter a **username** (lowercase, no spaces)
5. Enter a **password** (typing will not show characters - this is normal Linux behavior)

You should see something like:

\`\`\`
Welcome to Ubuntu 24.04 LTS (GNU/Linux 5.15.0-91-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

Last login: Mon Jun 22 10:30:45 2026
username@desktop:~$
\`\`\`

:::checkpoint
If you see the \`$\` prompt with your username, WSL2 is working. Type \`exit\` to close Ubuntu.
:::

## Step 2: Windows Native Tools

Install these on **Windows** (not inside Ubuntu):

| Tool | Purpose | Download |
|------|---------|----------|
| **Burp Suite Community** | Web application testing proxy | https://portswigger.net/burp/communitydownload |
| **Wireshark** | Packet capture and analysis | https://www.wireshark.org/download.html |
| **Nmap** | Network port scanner | https://nmap.org/download.html |
| **VS Code** | Code editor with terminal | https://code.visualstudio.com |

:::info
Burp Suite is the industry-standard tool for web application security testing. You will use it extensively in Weeks 21-29.
:::

## Step 3: WSL2 Ubuntu Tools

Open **Ubuntu** from the Start Menu and paste these commands one at a time:

\`\`\`bash
# Update package lists and upgrade existing packages
sudo apt update && sudo apt upgrade -y
\`\`\`

Then install all security tools:

\`\`\`bash
sudo apt install -y nmap metasploit-framework sqlmap hashcat john \
  nikto hydra gobuster dirb netcat curl wget python3 python3-pip \
  git wireshark net-tools dnsutils traceroute whois
\`\`\`

This installs:

| Tool | What It Does |
|------|-------------|
| **nmap** | Network port scanner |
| **metasploit-framework** | Exploitation framework |
| **sqlmap** | Automated SQL injection |
| **hashcat** | GPU password cracker |
| **john** | Password cracker |
| **nikto** | Web server scanner |
| **hydra** | Brute-force login tool |
| **gobuster** | Directory brute-forcer |
| **dirb** | Directory scanner |
| **netcat** | TCP/UDP connections (Swiss army knife) |
| **curl/wget** | HTTP requests from command line |
| **python3** | Programming language for automation |
| **git** | Version control |
| **wireshark** | Packet analysis |
| **dnsutils** | dig, nslookup (DNS tools) |
| **traceroute** | Network path tracing |
| **whois** | Domain registration lookup |

## Step 4: Verify Installation

Run these checks in Ubuntu:

\`\`\`bash
# Check each tool
nmap --version
msfconsole --version
sqlmap --version
python3 --version
git --version
\`\`\`

:::checkpoint
All commands should return version numbers. If any fail, re-run the apt install command for that specific tool.
:::

## Step 5: Access Windows Files from Ubuntu

WSL2 automatically mounts your Windows drives:

| Windows Path | Ubuntu Path |
|-------------|-------------|
| C:\\Users\\you\\Desktop | /mnt/c/Users/you/Desktop |
| D:\\Projects | /mnt/d/Projects |

Test it:

\`\`\`bash
# List your Windows Desktop contents
ls /mnt/c/Users/*/Desktop
\`\`\`

## You Are Ready

Your lab environment is now fully configured. Every tool you need for the next 60 weeks is installed. Proceed to Day 1 to start learning.
`,
        aiPrompt: "Explain the purpose of each security tool in the toolkit and what it will be used for in a cybersecurity career.",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "What is WSL2 and why do cybersecurity professionals use it?",
        interviewAnswer: "WSL2 (Windows Subsystem for Linux 2) lets you run a full Linux kernel inside Windows without dual-booting or virtual machines. Cybersecurity professionals use it because most security tools (nmap, metasploit, sqlmap, hashcat) are native to Linux and run more reliably there. WSL2 also shares the Windows network stack, so you can scan Windows-hosted targets from Linux tools.",
        quiz: [
          {
            question: "What does WSL2 stand for?",
            options: ["Windows Security Layer 2", "Windows Subsystem for Linux 2", "Wireless Security Logger 2", "Web Server Linux 2"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "WSL2 stands for Windows Subsystem for Linux 2. It lets you run a full Linux environment inside Windows.",
            certTags: ["Security+"]
          },
          {
            question: "Which tool is used for web application proxy testing?",
            options: ["Nmap", "Wireshark", "Burp Suite", "John the Ripper"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Burp Suite is the industry-standard proxy tool for intercepting and testing web application traffic.",
            certTags: ["Security+"]
          },
          {
            question: "What does nmap scan?",
            options: ["Hard drives for malware", "Network ports and services", "Windows Registry", "Email attachments"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Nmap (Network Mapper) scans network ports to discover which services are running on a target machine.",
            certTags: ["Security+"]
          },
          {
            question: "How do you access Windows files from Ubuntu in WSL2?",
            options: ["Copy them to Ubuntu manually", "Use the /mnt/ mount point", "They are not accessible", "Use a shared network folder"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "WSL2 automatically mounts Windows drives under /mnt/. C: becomes /mnt/c/, D: becomes /mnt/d/, etc.",
            certTags: ["A+"]
          },
          {
            question: "Which command updates all Ubuntu packages?",
            options: ["sudo apt update && sudo apt upgrade -y", "sudo apt install all", "sudo update ubuntu", "sudo apt refresh"],
            correctAnswerIndex: 0,
            difficulty: "beginner",
            explanation: "apt update refreshes package lists, apt upgrade -y installs all available updates without prompting.",
            certTags: ["Linux+"]
          },
          {
            question: "What is sqlmap used for?",
            options: ["Network mapping", "SQL injection testing", "Password cracking", "Packet capture"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "sqlmap is an automated tool for detecting and exploiting SQL injection vulnerabilities in web applications.",
            certTags: ["Security+"]
          },
          {
            question: "Why do cybersecurity professionals prefer Linux tools?",
            options: ["Linux is faster than Windows", "Most security tools are native to Linux and run more reliably there", "Linux has no viruses", "Windows does not support networking"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Most security tools (nmap, metasploit, hashcat) were built for Linux first. Linux also gives more control over networking and system configurations.",
            certTags: ["Security+"]
          },
          {
            question: "What does Wireshark capture?",
            options: ["Hard drive contents", "Network packets", "CPU usage", "Keyboard input"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Wireshark captures and analyzes network packets, letting you inspect traffic at the protocol level.",
            certTags: ["Network+"]
          }
        ]
      },
      {
        id: "we00d01",
        title: "The Input-Processing-Storage-Output Cycle",
        description: "Every computer follows one fundamental pattern: data comes in, gets processed, is stored somewhere, and results come out.",
        type: "learn",
        duration: "45 min",
        content: `## The Computing Cycle

Every computer follows four steps:

### 1. Input
Data enters through an **input device**:
- **Keyboard**: You type text, characters become electrical signals
- **Mouse**: Movement and clicks produce coordinate data
- **Microphone**: Sound waves become digital audio samples
- **Camera**: Light becomes pixel data (RGB values)
- **Network card**: Packets arrive from the internet

When you press "A", the keyboard sends scan code 0x1E to the USB controller, which forwards it to the OS.

### 2. Processing
The **CPU** takes input and performs operations:
- Receives instructions from memory
- Executes arithmetic, logic, and control operations
- Writes results back to memory

Example: When you type "Hello", the CPU receives scan codes, maps them to ASCII values (72, 101, 108, 108, 111), stores them in RAM, and tells the GPU to render them.

### 3. Storage
Data persists in two forms:
- **Volatile (RAM)**: Fast, lost when power cuts. Used for active programs.
- **Non-volatile (SSD/HDD)**: Slower, retained when power is off. Used for files and the OS.

When you save a file, data sits in RAM, the OS copies it to a storage device, and the file system writes it to specific disk sectors.

### 4. Output
Results are presented to the user:
- **Monitor**: Visual output (text, images, video)
- **Speakers**: Audio output
- **Printer**: Physical output
- **Network**: Data sent to another computer

:::info
**Why this matters for cybersecurity**: Every attack exploits some part of this cycle. Malware enters as input, is processed by the CPU, stored on disk, and produces output like data exfiltration. Understanding the cycle helps you understand attack vectors.
:::

:::concept
**Analogy**: Think of a restaurant. Input = customer order. Processing = chef cooking. Storage = refrigerator and pantry. Output = served meal.
:::

### Putting It Together

\`\`\`
Keyboard -> CPU processes keystroke -> Stored in RAM -> Displayed on monitor
   INPUT       PROCESSING               STORAGE            OUTPUT
\`\`\`

This happens billions of times per second. Each component in the chain is a potential point of failure or attack.`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "If a user clicks a malicious link and their computer starts behaving strangely, which part of the computing cycle is the malicious code first entering?",
        interviewAnswer: "Input - the malicious URL is data entering the system through the network card (an input device). The browser processes it, stores malicious files (storage), and the malware executes its payload (output).",
        quiz: [
          {
            question: "Which component of the computing cycle performs arithmetic and logic operations?",
            options: [
              "Input - receives data from devices",
              "Processing - the CPU executes operations",
              "Storage - saves data to disk",
              "Output - displays results on screen"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The processing step involves the CPU executing instructions. Input receives data, storage persists it, and output presents results."
          },
          {
            question: "What happens to data stored in RAM when the computer is powered off?",
            options: [
              "It is saved automatically to the hard drive",
              "It remains until overwritten by new data",
              "It is lost because RAM is volatile",
              "It transfers to the CPU cache"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "RAM is volatile memory - it requires continuous power to maintain stored data. When power is cut, all contents are lost."
          },
          {
            question: "A user types a command into a terminal. Trace the correct sequence through the computing cycle.",
            options: [
              "Output -> Processing -> Storage -> Input",
              "Input -> Storage -> Processing -> Output",
              "Input -> Processing -> Storage -> Output",
              "Storage -> Input -> Processing -> Output"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "The correct order is Input (keystroke) -> Processing (CPU interprets command) -> Storage (results written) -> Output (displayed on screen)."
          },
          {
            question: "Which of these is an example of non-volatile storage?",
            options: [
              "L1 CPU cache",
              "DDR5 RAM module",
              "NVMe SSD drive",
              "CPU registers"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "An SSD retains data without power, making it non-volatile. CPU cache, RAM, and registers are all volatile."
          },
          {
            question: "What does the CPU do when it receives a keystroke from a keyboard?",
            options: [
              "Ignores it until the user presses Enter",
              "Directly displays the character on screen",
              "Receives the scan code, maps it to a character, and stores it in RAM",
              "Saves it immediately to the hard drive"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "The keyboard sends a scan code to the CPU. The OS maps it to a character using ASCII/Unicode, stores it in RAM, and the GPU renders it."
          },
          {
            question: "In cybersecurity terms, what is a keylogger primarily exploiting?",
            options: [
              "A storage failure in the hard drive",
              "A processing vulnerability in the CPU",
              "The input stage of the computing cycle",
              "An output buffering overflow"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "A keylogger intercepts data at the input stage - it captures keystrokes before they reach their intended destination."
          },
          {
            question: "How many bytes are needed to store the ASCII values for the word 'CYBER'?",
            options: [
              "4 bytes - one less than the character count",
              "5 bytes - one byte per character",
              "10 bytes - two bytes per character",
              "8 bytes - ASCII uses 8-bit encoding"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Each ASCII character is 1 byte. 'CYBER' has 5 characters, so it requires 5 bytes."
          },
          {
            question: "A ransomware attack encrypts a user's files. Which part of the cycle is the encryption occurring in?",
            options: [
              "Input - the malware enters through a phishing email",
              "Processing - the CPU performs the encryption algorithm",
              "Storage - the encrypted files are written to disk",
              "Output - the ransom note is displayed to the user"
            ],
            correctAnswerIndex: 3,
            difficulty: "advanced",
            explanation: "While ransomware touches all stages, the final visible stage is output: the ransom note displayed to the victim after encryption completes."
          },
          {
            question: "Which statement about volatile memory is TRUE?",
            options: [
              "It retains data indefinitely without power",
              "It is slower than non-volatile storage like SSDs",
              "It requires constant electrical power to maintain data",
              "It is only found in the CPU, not in separate modules"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Volatile memory requires continuous power. RAM loses all data when power is disconnected."
          },
          {
            question: "What is the role of the GPU in the computing cycle?",
            options: [
              "It processes input from the keyboard and mouse",
              "It stores files on the hard drive",
              "It handles visual output by rendering graphics for display",
              "It manages network traffic coming into the computer"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "The GPU specializes in rendering visual output - drawing pixels, text, and graphics on the monitor."
          },
          {
            question: "A network interface card receiving a data packet is an example of which cycle stage?",
            options: [
              "Processing - the NIC computes checksums",
              "Input - data enters the computer from an external source",
              "Storage - the packet is buffered in NIC memory",
              "Output - the NIC sends acknowledgments back"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Receiving data from the network is input - external data is entering the system through the network interface card."
          },
          {
            question: "Which component acts as the primary intermediary between input devices and storage?",
            options: [
              "The power supply unit",
              "The CPU",
              "The monitor",
              "The case chassis"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The CPU processes input data and coordinates where it gets stored. It is the central hub of the computing cycle."
          }
        ]
      },
      {
        id: "we00d02",
        title: "Hardware Components",
        description: "Inside every computer is a collection of physical components that work together. Learn what each component does, how they connect, and what to look for when evaluating hardware.",
        type: "learn",
        duration: "50 min",
        content: `## Core Hardware Components

### CPU (Central Processing Unit)
The "brain" of the computer. Executes instructions billions of times per second.

- **Clock speed** (GHz): Cycles per second. A 3.5 GHz CPU performs 3.5 billion cycles per second. Higher isn't always better — architecture matters.
- **Cores**: Independent processing units. A 4-core CPU handles 4 tasks simultaneously.
- **Cache**: Tiny, fast memory built into the CPU. L1 is ~32KB (~1 cycle access). L2 is ~256KB (~10 cycles). L3 is shared across cores (~40 cycles).
- **TDP (Thermal Design Power)**: Heat output in watts. Higher TDP = more heat = better cooling needed.

**Modern CPU families**: Intel Core i3/i5/i7/i9 (x86-64), AMD Ryzen 3/5/7/9 (x86-64), Apple M-series (ARM64). For security work, x86-64 compatibility matters for running penetration testing tools.

### RAM (Random Access Memory)
Temporary working memory for active programs and data.

- **DDR4**: Up to 3200 MHz, 1.2V. Still common in many systems.
- **DDR5**: Up to 6400 MHz, 1.1V. Better bandwidth, on-die ECC.
- **Capacity**: 8GB minimum, 16GB recommended, 32GB+ for heavy multitasking.
- **Dual-channel**: Two sticks working together doubles bandwidth. Always install in matched pairs.

### Storage Devices

**HDD (Hard Disk Drive)**:
- Spinning magnetic platters (5400 or 7200 RPM)
- Cheap per GB (~$0.02/GB) but slow (80-160 MB/s)
- Fragile — moving parts can fail from drops

**SSD (Solid State Drive)**:
- No moving parts — uses NAND flash memory
- 10x faster than HDD (500 MB/s to 7,000+ MB/s)
- SATA SSDs: limited to ~550 MB/s
- NVMe SSDs: use PCIe lanes, up to 7,000 MB/s (PCIe Gen 4)

### Motherboard
The main circuit board connecting all components.

- **Socket**: CPU connector — must match your CPU (LGA 1700 for Intel 12th/13th gen, AM5 for AMD Ryzen 7000+)
- **RAM slots**: Usually 2 or 4. Determines max RAM capacity.
- **Expansion slots (PCIe)**: For GPU, network cards, NVMe SSDs
- **VRM (Voltage Regulator Module)**: Powers the CPU. Better VRMs = more stable overclocking.

### GPU (Graphics Processing Unit)
Renders images, video, and 3D graphics. Has its own dedicated memory (VRAM).

- **Integrated GPU**: Built into CPU, shares system RAM. Fine for office work.
- **Discrete GPU**: Separate card with dedicated VRAM. Needed for gaming, video editing, GPU-accelerated computing.
- **VRAM**: 4GB minimum, 8-12GB for gaming, 24GB+ for professional workloads.

### Power Supply Unit (PSU)
Converts AC wall power to DC power for components.

- **Wattage**: Must exceed total system power draw by 20-30%
- **80+ ratings**: Bronze, Silver, Gold, Platinum, Titanium — efficiency at various loads
- **Modular**: Lets you use only needed cables, reducing clutter

:::warning
**Common mistake**: People confuse MB/s (megabytes) and Mb/s (megabits). 1 byte = 8 bits. A "1 Gbps" connection delivers ~125 MB/s actual download speed.
:::

:::checkpoint
**Quick check**: If you want to run a virtual machine for cybersecurity practice alongside your host OS, which component needs the most attention? **RAM** — each VM needs its own allocated memory.
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "What is the difference between a SATA SSD and an NVMe SSD, and why does it matter?",
        interviewAnswer: "A SATA SSD uses the SATA III interface limited to ~550 MB/s. An NVMe SSD uses PCIe lanes directly, reaching 3,500-7,000 MB/s. NVMe also has lower latency and better parallelism with thousands of queues vs SATA's single queue. For cybersecurity work, NVMe means faster OS boot and quicker VM loading.",
        quiz: [
          {
            question: "What does CPU clock speed measure?",
            options: [
              "The number of cores in the processor",
              "The number of cycles the CPU executes per second",
              "The amount of cache memory available",
              "The voltage required to power the CPU"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Clock speed (measured in GHz) indicates how many cycles per second a CPU can perform."
          },
          {
            question: "How much faster is a typical NVMe SSD compared to a SATA SSD?",
            options: [
              "About 2x faster",
              "About 5x faster",
              "About 10-12x faster",
              "About 50x faster"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "SATA SSDs max out around 550 MB/s. NVMe SSDs on PCIe Gen 3 reach ~3,500 MB/s and Gen 4 reaches ~7,000 MB/s."
          },
          {
            question: "Why is dual-channel RAM configuration important?",
            options: [
              "It allows two different operating systems to run simultaneously",
              "It doubles the data bandwidth by using two memory channels in parallel",
              "It provides redundancy so if one stick fails, the other continues",
              "It enables ECC error correction on consumer hardware"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Dual-channel mode uses two RAM sticks simultaneously, doubling the data path width and significantly increasing memory bandwidth."
          },
          {
            question: "A user reports slow performance with many programs open. Which component is most likely the bottleneck?",
            options: [
              "The GPU - insufficient video memory",
              "The RAM - not enough capacity for all active programs",
              "The PSU - not providing enough wattage",
              "The case - insufficient airflow"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "When RAM is full, the system swaps data to disk (page file/swap), which is 100x slower. Insufficient RAM is the most common cause of slowdowns."
          },
          {
            question: "What is the purpose of L1 cache in a CPU?",
            options: [
              "To store the operating system kernel permanently",
              "To provide extremely fast, tiny memory for the most frequently accessed data",
              "To buffer data coming from the hard drive",
              "To store the BIOS/UEFI firmware settings"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "L1 cache is the smallest (~32KB) and fastest cache level, built directly into the CPU core for near-instant access."
          },
          {
            question: "Which storage type is best for running multiple virtual machines?",
            options: [
              "A 5400 RPM HDD",
              "A SATA SSD",
              "An NVMe SSD",
              "A USB 2.0 flash drive"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "VMs perform many random read/write operations simultaneously. NVMe SSDs excel at random I/O with high queue depths."
          },
          {
            question: "What does TDP indicate about a CPU?",
            options: [
              "The maximum clock speed it can achieve",
              "The maximum amount of data it can process per second",
              "The amount of heat the cooling system must dissipate",
              "The total number of transistors on the die"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "TDP (measured in watts) tells you how much heat the CPU generates under typical workloads."
          },
          {
            question: "An M.2 slot on a motherboard supports which types of drives?",
            options: [
              "Only SATA SSDs",
              "Only NVMe SSDs",
              "Either SATA or NVMe, depending on the slot's keying and lane assignment",
              "Only traditional HDDs in a smaller form factor"
            ],
            correctAnswerIndex: 2,
            difficulty: "advanced",
            explanation: "M.2 is a form factor. An M.2 slot can support SATA or NVMe depending on which PCIe lanes it's wired to."
          },
          {
            question: "What is the main advantage of a discrete GPU over an integrated GPU?",
            options: [
              "It uses less power",
              "It has dedicated VRAM and thousands of cores for parallel processing",
              "It requires no drivers to function",
              "It is always cheaper than an integrated solution"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "A discrete GPU has its own dedicated memory (VRAM) and thousands of processing cores for parallel workloads."
          },
          {
            question: "A 1 Gbps internet connection has a theoretical maximum download speed of approximately:",
            options: [
              "1,000 megabytes per second",
              "125 megabytes per second",
              "12.5 megabytes per second",
              "1,000 bytes per second"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "1 Gbps = 1,000 megabits per second. Since 1 byte = 8 bits, that is 1,000 / 8 = 125 megabytes per second."
          },
          {
            question: "Which PSU efficiency rating indicates the highest efficiency?",
            options: [
              "80+ Bronze",
              "80+ Silver",
              "80+ Gold",
              "80+ Titanium"
            ],
            correctAnswerIndex: 3,
            difficulty: "beginner",
            explanation: "The 80+ ratings from lowest to highest are: Standard, Bronze, Silver, Gold, Platinum, Titanium."
          },
          {
            question: "Why is DDR5 considered an improvement over DDR4?",
            options: [
              "DDR5 uses less physical pins on the DIMM slot",
              "DDR5 has higher bandwidth, lower voltage, and on-die ECC",
              "DDR5 is backwards compatible with DDR4 motherboards",
              "DDR5 eliminates the need for RAM entirely"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "DDR5 offers higher bandwidth, lower voltage (1.1V vs 1.2V), and on-die ECC for improved reliability."
          }
        ]
      },
      {
        id: "we00d03",
        title: "Operating Systems - Windows, Linux, macOS",
        description: "An operating system manages hardware resources and provides an interface for users and applications. Compare the three major desktop operating systems.",
        type: "learn",
        duration: "45 min",
        content: `## What an Operating System Does

An OS is the layer between hardware and applications:

1. **Process management**: Which programs run, in what order, for how long
2. **Memory management**: Allocating and freeing RAM for programs
3. **File system management**: Organizing data on storage (NTFS, ext4, APFS)
4. **Device management**: Communicating with hardware through drivers
5. **Security**: User authentication, permissions, access control
6. **Networking**: TCP/IP stack, firewall, Wi-Fi management

### Windows
- **Market share**: ~72% of desktops worldwide
- **File system**: NTFS (primary), ReFS (server)
- **Shell**: PowerShell (object-oriented) and CMD (legacy)
- **Package manager**: winget (built-in since Windows 11)
- **Strengths**: Broad software compatibility, enterprise management (Active Directory, Group Policy)
- **Weaknesses**: Large attack surface, telemetry collection, frequent forced updates

### Linux
- **Market share**: ~4% of desktops, but dominates servers (~96%) and cloud
- **Distributions**: Ubuntu (beginner-friendly), Kali (penetration testing), Parrot (lightweight security), Arch (advanced), Debian (stable/server)
- **File system**: ext4 (most common), btrfs (snapshots), XFS (large files)
- **Package management**: apt (Debian/Ubuntu), dnf (Fedora), pacman (Arch)
- **Shell**: Bash (default), Zsh (popular alternative)
- **Strengths**: Open-source, highly customizable, minimal bloat, vast security tool ecosystem

### macOS
- **Market share**: ~15% of desktops
- **Based on**: Darwin kernel (Unix-derived, BSD heritage)
- **File system**: APFS with encryption, snapshots, and cloning
- **Shell**: Zsh (default since Catalina)
- **Package manager**: Homebrew (community)
- **Strengths**: Unix-based (POSIX-compliant), stable, good hardware-software integration

:::info
**Why OS choice matters for cybersecurity**:
- **Defense**: You need to secure whatever OS your organization uses
- **Offense**: Attackers use Linux (Kali) for tooling but target Windows (most enterprise desktops)
- **Forensics**: You may analyze evidence from any OS
:::

:::tip
**Dual-boot tip**: If you want to try Linux without replacing Windows, use a virtual machine (VirtualBox, VMware) first. VMs are safer for experimentation.
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Why is Linux preferred for cybersecurity workstations while Windows is the primary attack target?",
        interviewAnswer: "Linux provides native access to security tools (Nmap, Metasploit, Wireshark), a powerful command line, and minimal overhead. It's open-source so professionals can inspect tools. Windows is the primary target because it holds ~72% desktop market share, making it the highest-value target for attackers.",
        quiz: [
          {
            question: "Which component of the operating system is responsible for allocating RAM to running programs?",
            options: [
              "The file system manager",
              "The memory manager",
              "The device driver layer",
              "The network stack"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The memory manager handles allocation and deallocation of RAM to processes and manages virtual memory."
          },
          {
            question: "What is the primary file system used by modern Windows installations?",
            options: [
              "ext4",
              "APFS",
              "NTFS",
              "FAT32"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "NTFS (New Technology File System) is the standard Windows file system, supporting permissions, encryption, and journaling."
          },
          {
            question: "Which Linux distribution is specifically designed for penetration testing?",
            options: [
              "Ubuntu",
              "Debian",
              "Kali Linux",
              "Fedora"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Kali Linux is maintained by Offensive Security and is purpose-built for penetration testing and digital forensics."
          },
          {
            question: "What does POSIX compliance in macOS mean for a security professional?",
            options: [
              "macOS cannot run any Windows applications",
              "macOS shares the same command-line interface conventions as Linux",
              "macOS uses the same file system as Linux",
              "macOS is immune to all malware"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "POSIX compliance means macOS follows Unix standards, so commands like ls, grep, ssh, and chmod work similarly to Linux."
          },
          {
            question: "Which package manager is used by Ubuntu Linux?",
            options: [
              "dnf",
              "pacman",
              "apt",
              "brew"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "apt (Advanced Package Tool) is the package manager for Debian-based distributions including Ubuntu."
          },
          {
            question: "Why is Windows considered to have a larger attack surface than Linux?",
            options: [
              "Windows has no firewall or antivirus capabilities",
              "Windows runs more third-party software, has legacy code, and a larger user base",
              "Linux cannot connect to the internet",
              "Windows uses a simpler file system"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Windows has more legacy code, wider software compatibility, more default services running, and a massive user base."
          },
          {
            question: "What is the role of an operating system kernel?",
            options: [
              "It provides the graphical user interface",
              "It manages hardware resources and provides core system services to applications",
              "It stores user files and documents",
              "It runs web browsers and email clients"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The kernel is the core of the OS - it manages CPU scheduling, memory, device drivers, and system calls."
          },
          {
            question: "A cybersecurity analyst needs to analyze a Windows hard drive image. Which file system structure should they examine?",
            options: [
              "ext4 inodes and superblocks",
              "APFS snapshots and clones",
              "NTFS Master File Table (MFT) and $LogFile",
              "FAT32 file allocation tables"
            ],
            correctAnswerIndex: 2,
            difficulty: "advanced",
            explanation: "NTFS stores file metadata in the MFT, and the $LogFile journal records changes - both critical for forensic analysis."
          },
          {
            question: "What is the default shell on macOS since Catalina?",
            options: [
              "Bash",
              "Fish",
              "Zsh",
              "PowerShell"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Apple switched the default shell from Bash to Zsh in macOS Catalina due to Bash licensing concerns."
          },
          {
            question: "Which command installs software on a Fedora Linux system?",
            options: [
              "apt install packageName",
              "yum install packageName",
              "dnf install packageName",
              "pacman -S packageName"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "dnf is the modern package manager for Fedora. apt is for Debian/Ubuntu, pacman is for Arch."
          },
          {
            question: "What advantage does a virtual machine provide for cybersecurity experimentation?",
            options: [
              "It makes the host computer faster",
              "It allows running potentially dangerous tools in an isolated environment",
              "It eliminates the need for an operating system",
              "It provides free internet access"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "VMs are sandboxed from the host. If malware escapes or a tool damages the OS, you can restore from a snapshot."
          },
          {
            question: "Which OS dominates the server and cloud infrastructure market?",
            options: [
              "Windows Server",
              "macOS Server",
              "Linux",
              "FreeBSD"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Linux runs on approximately 96% of the world's top servers and dominates cloud infrastructure."
          }
        ]
      }
    ]
  },
  {
    id: "week01",
    title: "Daily Computer Use",
    durationText: "Week 1 - Days 1–3",
    focus: "Master essential everyday computer skills and file management",
    output: "Navigate operating systems efficiently, manage files and folders, and handle basic software and browser tasks",
    topics: [
      {
        id: "we01d01",
        title: "Keyboard, Mouse, and Shortcuts",
        description: "Develop efficient input skills that save hours of time. Learn keyboard shortcuts for Windows and Linux that professionals use daily.",
        type: "learn",
        duration: "40 min",
        content: `## Keyboard Proficiency

### Touch Typing Basics
- **Home row position**: Fingers rest on A, S, D, F (left hand) and J, K, L, ; (right hand). Raised bumps on F and J help find position without looking.
- **Speed target**: 40 WPM is functional. 60+ WPM is professional. 80+ WPM is fast.
- **Accuracy over speed**: A fast typist who makes errors wastes more time than a slower, accurate one.

### Essential Windows Shortcuts

| Shortcut | Action |
|----------|--------|
| \`Ctrl + C\` | Copy selected item |
| \`Ctrl + X\` | Cut selected item |
| \`Ctrl + V\` | Paste clipboard contents |
| \`Ctrl + Z\` | Undo last action |
| \`Ctrl + Y\` | Redo last undone action |
| \`Ctrl + A\` | Select all items |
| \`Ctrl + S\` | Save current document |
| \`Ctrl + F\` | Find/search in current app |
| \`Ctrl + W\` | Close current window/tab |
| \`Alt + Tab\` | Switch between open applications |
| \`Alt + F4\` | Close active window |
| \`Windows + E\` | Open File Explorer |
| \`Windows + L\` | Lock computer |
| \`Windows + D\` | Show/hide desktop |
| \`Windows + I\` | Open Settings |
| \`Windows + R\` | Open Run dialog |
| \`Windows + X\` | Quick Link menu (power user) |
| \`Ctrl + Shift + Esc\` | Open Task Manager directly |
| \`Print Screen\` | Capture full screen to clipboard |
| \`Alt + Print Screen\` | Capture active window to clipboard |

### Essential Linux Shortcuts (Bash/Zsh)

| Shortcut | Action |
|----------|--------|
| \`Ctrl + A\` | Move cursor to beginning of line |
| \`Ctrl + E\` | Move cursor to end of line |
| \`Ctrl + U\` | Delete from cursor to beginning of line |
| \`Ctrl + K\` | Delete from cursor to end of line |
| \`Ctrl + R\` | Search command history |
| \`Ctrl + L\` | Clear terminal screen |
| \`Ctrl + C\` | Cancel running process |
| \`Ctrl + Z\` | Suspend running process (resume with \`fg\`) |
| \`Tab\` | Auto-complete file names and commands |
| \`Tab Tab\` | Show all possible completions |
| \`!!\` | Repeat last command |
| \`history\` | Show command history |

### Mouse Skills
- **Left click**: Select / activate
- **Right click**: Context menu (options vary by application)
- **Middle click / scroll wheel**: Scroll vertically. Press wheel to auto-scroll.
- **Double click**: Open files or applications
- **Click and drag**: Select text, move files, resize windows
- **Shift + click**: Select a range of items in a list
- **Ctrl + click**: Select multiple individual items

:::tip
**Pro tip**: Learn keyboard shortcuts gradually. Start with 5 you'll use daily (Alt+Tab, Ctrl+C/V/Z, Windows+E) and add more over two weeks.
:::

:::warning
**Common trap**: New users often use the mouse for everything. This is 2-3x slower than keyboard shortcuts for repetitive tasks.
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "How would you efficiently copy a file from one folder to another without using the mouse?",
        interviewAnswer: "On Windows: open File Explorer with Windows+E, navigate to the source, Ctrl+C to copy, navigate to destination, Ctrl+V to paste. On Linux terminal: use 'cp /path/to/source /path/to/destination'.",
        quiz: [
          {
            question: "What keyboard shortcut opens Task Manager directly in Windows?",
            options: [
              "Alt + Delete",
              "Ctrl + Shift + Esc",
              "Windows + M",
              "Ctrl + Alt + T"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Ctrl+Shift+Esc opens Task Manager directly. Ctrl+Alt+Del shows a security screen where you can then select Task Manager."
          },
          {
            question: "In a Linux terminal, what does pressing Tab twice do?",
            options: [
              "Insert two tab characters",
              "Close the terminal window",
              "Show all possible command or file completions",
              "Clear the terminal screen"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Double-tab in Bash/Zsh lists all possible completions for the current command or path."
          },
          {
            question: "Which shortcut pastes the clipboard contents?",
            options: [
              "Ctrl + P",
              "Ctrl + V",
              "Ctrl + B",
              "Ctrl + Insert"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Ctrl+V pastes clipboard contents. Ctrl+C copies, Ctrl+X cuts, Ctrl+Z undoes."
          },
          {
            question: "In a Bash terminal, what does Ctrl+R do?",
            options: [
              "Redo the last action",
              "Refresh the screen",
              "Search backward through command history",
              "Restart the terminal"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "Ctrl+R initiates a reverse incremental search through your command history."
          },
          {
            question: "A user wants to select files 1, 3, and 7 from a list in File Explorer. Which method works?",
            options: [
              "Shift-click each file individually",
              "Ctrl+click each file individually",
              "Alt-click each file individually",
              "Drag a selection box around all three"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Ctrl+click selects multiple non-adjacent items. Shift+click selects a continuous range."
          },
          {
            question: "What does '!!' do in a Bash terminal?",
            options: [
              "Exits the terminal",
              "Clears all variables",
              "Repeats the last command executed",
              "Opens a new terminal window"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "'!!' repeats the last command. Useful with 'sudo !!' to repeat with root privileges."
          },
          {
            question: "Which Windows shortcut opens File Explorer?",
            options: [
              "Windows + F",
              "Windows + E",
              "Windows + X",
              "Ctrl + E"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Windows+E opens File Explorer."
          },
          {
            question: "In a terminal, Ctrl+C is used to:",
            options: [
              "Copy the current line",
              "Cancel the currently running process",
              "Close the terminal",
              "Clear the screen"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Ctrl+C sends a SIGINT (interrupt signal) to the foreground process, causing it to terminate."
          },
          {
            question: "What is the benefit of using keyboard shortcuts over mouse navigation?",
            options: [
              "Keyboard shortcuts use less memory",
              "They are significantly faster for repetitive tasks once learned",
              "They work only in specific applications",
              "They prevent data loss"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Keyboard shortcuts are 2-3x faster than mouse navigation for repetitive tasks."
          },
          {
            question: "In Bash, what does Ctrl+U do?",
            options: [
              "Undoes the last command",
              "Uploads a file to the current directory",
              "Deletes from the cursor to the beginning of the line",
              "Moves up one directory level"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "Ctrl+U deletes from the current cursor position to the beginning of the line."
          },
          {
            question: "A user accidentally closes a terminal window. What shortcut would lock their screen instead?",
            options: [
              "Ctrl + W",
              "Alt + F4",
              "Windows + L",
              "Ctrl + Q"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Windows+L locks the computer screen."
          },
          {
            question: "What does 'Shift + click' do in a file manager?",
            options: [
              "Deletes the selected file",
              "Opens the file in a new window",
              "Selects a range of files from the first selection to the clicked item",
              "Copies the file to the clipboard"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Shift+click selects a contiguous range from the last selected item to the newly clicked item."
          }
        ]
      },
      {
        id: "we01d02",
        title: "File Management - Folders, Copy, Paste, Search",
        description: "Effective file organization saves time and prevents data loss. Learn to create, move, rename, and search for files using GUI and command line methods.",
        type: "learn",
        duration: "45 min",
        content: `## File System Organization

### Directory Structure Concepts

**Windows**:
\`\`\`
C:\\
├── Users\\
│   ├── YourName\\
│   │   ├── Desktop\\
│   │   ├── Documents\\
│   │   ├── Downloads\\
│   │   └── AppData\\
├── Program Files\\
├── Windows\\
└── ProgramData\\
\`\`\`

**Linux/macOS**:
\`\`\`
/
├── home/
│   └── yourname/
│       ├── Desktop/
│       ├── Documents/
│       ├── Downloads/
│       └── .config/
├── etc/          (system configuration)
├── var/          (logs, web content)
├── usr/          (user programs)
├── tmp/          (temporary files)
├── bin/          (essential binaries)
└── opt/          (third-party software)
\`\`\`

### Creating Folders

**Windows CMD**:
\`\`\`cmd
mkdir C:\\Users\\YourName\\Projects\\CyberLab
\`\`\`

**Linux/macOS**:
\`\`\`bash
mkdir -p ~/Projects/CyberLab/{Tools,Notes,Scripts}
\`\`\`
The \`-p\` flag creates parent directories as needed.

### Copy, Move, Rename, Delete

**Windows CMD**:
\`\`\`cmd
copy file.txt backup.txt
move oldname.txt newname.txt
del unwanted.txt
rmdir /s /q old_folder
\`\`\`

**Linux/macOS**:
\`\`\`bash
cp file.txt backup.txt              # Copy file
cp -r old_folder/ new_folder/       # Copy directory recursively
mv oldname.txt newname.txt          # Rename
mv file.txt ~/Documents/            # Move
rm file.txt                         # Delete file
rm -rf old_folder/                  # Delete directory (DANGEROUS)
\`\`\`

:::warning
**Dangerous commands**: \`rm -rf\` permanently deletes files without recovery. There is no trash can. Double-check paths before running recursive delete commands.
:::

### Searching for Files

**Windows**:
\`\`\`powershell
Get-ChildItem -Recurse -Filter "*.pdf" -Path C:\\Users\\YourName
\`\`\`

**Linux**:
\`\`\`bash
find / -name "*.pdf" 2>/dev/null          # Find all PDFs
find ~ -type f -size +100M                 # Find files larger than 100MB
locate filename                            # Fast search using pre-built index
grep -r "search term" ~/Documents/         # Search inside file contents
\`\`\`

### File Extensions That Matter

| Extension | Type |
|-----------|------|
| \`.exe\`, \`.msi\` | Windows executable (potential malware vector) |
| \`.sh\`, \`.bash\` | Shell scripts (Linux/macOS) |
| \`.py\` | Python scripts |
| \`.pdf\` | PDF document (common malware delivery) |
| \`.docx\`, \`.xlsx\` | Office documents (macros can contain malware) |
| \`.zip\`, \`.7z\`, \`.tar.gz\` | Archives (may hide malicious files) |

:::tip
**File naming**: Use lowercase, no spaces, use hyphens or underscores. Example: \`incident-report-2024-01-15.txt\` instead of \`Incident Report Jan 15.txt\`.
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "How would you find all PDF files larger than 50MB on a Linux system?",
        interviewAnswer: "Use: find / -name \"*.pdf\" -size +50M 2>/dev/null. The -name flag filters by extension, -size +50M filters by size, and 2>/dev/null suppresses permission denied errors.",
        quiz: [
          {
            question: "What does 'mkdir -p' do in Linux?",
            options: [
              "Creates a directory and opens it",
              "Creates a file with the specified name",
              "Creates parent directories as needed along the path",
              "Prompts for confirmation before creating"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "The -p (parents) flag creates any missing parent directories in the path."
          },
          {
            question: "In Windows File Explorer, what happens when you press Ctrl+X and then Ctrl+V on a file?",
            options: [
              "The file is copied and the original remains",
              "The file is moved from its original location to the new location",
              "The file is deleted",
              "The file is renamed"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Ctrl+X cuts (marks for moving), and Ctrl+V pastes - this moves the file."
          },
          {
            question: "Which command recursively copies an entire directory in Linux?",
            options: [
              "cp directory/ destination/",
              "cp -r directory/ destination/",
              "mv directory/ destination/",
              "copy directory/ destination/"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The -r (recursive) flag tells cp to copy the directory and all contents."
          },
          {
            question: "What is the difference between 'rm file.txt' and 'rm -rf folder/'?",
            options: [
              "No difference, both delete files",
              "rm deletes a file, rm -rf deletes a directory and all contents without confirmation",
              "rm moves to trash, rm -rf permanently deletes",
              "rm requires sudo, rm -rf does not"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "rm deletes individual files. rm -rf recursively forces deletion of directories and all their contents."
          },
          {
            question: "How do you find all .log files in /var on Linux?",
            options: [
              "ls /var/*.log",
              "find /var -name \"*.log\"",
              "grep \".log\" /var",
              "search /var --extension=log"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "find with -name and a wildcard pattern searches recursively for matching files."
          },
          {
            question: "In PowerShell, how do you rename a file?",
            options: [
              "ren report.docx final-report.docx",
              "mv report.docx final-report.docx",
              "Move-Item report.docx final-report.docx",
              "rename report.docx final-report.docx"
            ],
            correctAnswerIndex: 3,
            difficulty: "intermediate",
            explanation: "ren, mv, Move-Item, and rename all work in PowerShell for renaming files. 'rename' is actually an alias for Move-Item."
          },
          {
            question: "Why is 'rm -rf' dangerous with a wildcard or typo?",
            options: [
              "It may not delete anything",
              "It uses too much CPU",
              "It can delete entire directory trees without confirmation or recovery",
              "It only works on empty directories"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "rm -rf permanently deletes files and directories recursively without confirmation."
          },
          {
            question: "What does '2>/dev/null' do in a Linux find command?",
            options: [
              "Saves output to /dev/null for later retrieval",
              "Redirects error messages to prevent them from displaying",
              "Filters results to show only errors",
              "Mounts /dev/null as a temporary filesystem"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "2>/dev/null redirects stderr to /dev/null, suppressing permission denied and other error messages."
          },
          {
            question: "Which Windows search syntax finds all PDF files?",
            options: [
              "find: pdf",
              "*.pdf",
              "ext:pdf",
              "pdf files"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "*.pdf uses a wildcard to match all files with the .pdf extension."
          },
          {
            question: "What is the Linux equivalent of the Windows 'Documents' folder?",
            options: [
              "/var/documents",
              "/etc/documents",
              "~/Documents",
              "/usr/documents"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "~/Documents is the standard Documents folder in Linux."
          },
          {
            question: "A file is named 'resume.docx.exe'. What should you suspect?",
            options: [
              "It is a legitimate Word document",
              "It is a malicious executable disguised with a double extension",
              "It is an auto-generated backup file",
              "It is a compressed archive"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Double extensions like .docx.exe are a classic malware technique. The file is an executable, not a Word document."
          },
          {
            question: "What does 'mv file.txt ~/Documents/' do?",
            options: [
              "Copies file.txt to Documents",
              "Renames file.txt to Documents",
              "Moves file.txt to the Documents folder",
              "Deletes file.txt"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "mv (move) relocates file.txt from the current directory to ~/Documents/."
          }
        ]
      },
      {
        id: "we01d03",
        title: "Software Management, Browsers, and Troubleshooting",
        description: "Install, update, and remove software safely. Navigate the web effectively and perform basic troubleshooting.",
        type: "learn",
        duration: "45 min",
        content: `## Installing Software Safely

### Windows Package Managers
\`\`\`powershell
winget install Mozilla.Firefox          # Install Firefox
winget upgrade --all                     # Update all installed apps
winget uninstall Mozilla.Firefox         # Remove Firefox
\`\`\`

### Linux Software Installation
\`\`\`bash
# Debian/Ubuntu
sudo apt update                         # Refresh package lists
sudo apt install nmap                   # Install a package
sudo apt upgrade                        # Update all packages
sudo apt remove nmap                    # Remove package
sudo apt autoremove                     # Clean unused dependencies

# Fedora/RHEL
sudo dnf install wireshark
sudo dnf upgrade

# Arch
sudo pacman -S metasploit
sudo pacman -Syu                        # Full system upgrade
\`\`\`

### macOS
\`\`\`bash
brew install python3
brew update && brew upgrade
\`\`\`

:::warning
**Malware risk**: Always download software from official sources. Third-party download sites bundle adware and malware. Verify checksums when available.
:::

## Web Browser Basics

### Browser Comparison

| Feature | Chrome | Firefox | Brave | Edge |
|---------|--------|---------|-------|------|
| Privacy | Google telemetry | Strong privacy defaults | Built-in ad/tracker blocking | Microsoft telemetry |
| Extensions | Web Store | Add-ons | Web Store | Web Store |

### Browser Safety Practices
- **HTTPS**: Look for the padlock icon. Never enter sensitive data on HTTP sites.
- **Extensions**: Minimize extensions. Each one has access to your browsing data.
- **Downloads**: Scan downloaded files before opening.
- **Saved passwords**: Don't save banking passwords in the browser. Use a password manager.

### Browser Developer Tools (F12)
- **Elements tab**: Inspect HTML/CSS
- **Console tab**: Execute JavaScript, see errors
- **Network tab**: View all HTTP requests and responses
- **Application tab**: View cookies, local storage

## Basic Troubleshooting

### Step-by-Step Problem Solving

**1. Restart the application or computer**
**2. Check Task Manager / System Monitor**
\`\`\`cmd
# Windows
tasklist /fi "STATUS eq running"

# Linux
top
htop
\`\`\`

**3. Check error messages** - Google the exact error text
**4. Check network connectivity**
\`\`\`bash
ping 8.8.8.8              # Test internet connectivity
ping google.com           # Test DNS resolution
nslookup google.com       # Verify DNS
ipconfig /all             # Windows network config
ip addr show              # Linux network config
\`\`\`

**5. Check disk space**
\`\`\`bash
df -h                     # Linux disk usage
\`\`\`

:::checkpoint
**Practice**: Open a terminal and run:
1. \`whoami\` - shows your username
2. \`hostname\` - shows your computer's name
3. \`date\` - shows current date and time
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "A user reports websites are loading slowly but other apps work fine. What steps would you take?",
        interviewAnswer: "Check DNS first: run 'ping 8.8.8.8' for raw connectivity, then 'ping google.com' for DNS. If DNS fails, check DNS settings. If DNS works, check browser extensions, clear cache, try a different browser, and verify no other process is consuming bandwidth.",
        quiz: [
          {
            question: "What is the first thing to do when troubleshooting a slow computer?",
            options: [
              "Reinstall the operating system",
              "Restart the application or computer",
              "Buy more RAM",
              "Run a full antivirus scan"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Restarting clears stuck processes, memory leaks, and transient issues."
          },
          {
            question: "Why is downloading from third-party sites risky?",
            options: [
              "The download speed is always slower",
              "These sites often bundle adware, malware, or modified installers",
              "The files are always corrupted",
              "They charge hidden fees"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Third-party download sites often wrap legitimate installers with adware, toolbars, or malware."
          },
          {
            question: "Which command tests DNS resolution?",
            options: [
              "ping 8.8.8.8",
              "ping google.com",
              "ipconfig /all",
              "tracert 8.8.8.8"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "ping google.com tests DNS resolution (converting domain to IP) and connectivity."
          },
          {
            question: "What does 'winget upgrade --all' do?",
            options: [
              "Reinstalls Windows",
              "Upgrades all installed applications to latest versions",
              "Upgrades hardware drivers",
              "Upgrades the BIOS"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "winget can upgrade all installed applications that have newer versions available."
          },
          {
            question: "What does 'df -h' show on Linux?",
            options: [
              "System date and time",
              "Disk filesystem usage in human-readable format",
              "Running processes and memory usage",
              "Network interface configuration"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "df (disk free) shows filesystem disk space usage in human-readable format (GB, MB)."
          },
          {
            question: "Why remove end-of-life plugins like Java and Flash?",
            options: [
              "They consume too much RAM",
              "They no longer receive security updates and are common attack vectors",
              "They are incompatible with modern websites",
              "They slow down internet speed"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "End-of-life software no longer receives security patches and is a common attack vector."
          },
          {
            question: "What does the HTTPS padlock icon indicate?",
            options: [
              "The website is safe and free of malware",
              "The connection between your browser and the server is encrypted",
              "The website has been verified by a government agency",
              "The website loads faster"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The padlock indicates an encrypted HTTPS connection, but it does NOT mean the site is safe."
          },
          {
            question: "A user cannot access any websites. Which command should they run first?",
            options: [
              "defrag C:",
              "ping 8.8.8.8",
              "sfc /scannow",
              "disk cleanup"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "ping 8.8.8.8 tests basic internet connectivity. If it fails, the issue is network-level."
          },
          {
            question: "What does 'sudo apt autoremove' do?",
            options: [
              "Removes all installed packages",
              "Removes packages no longer needed as dependencies",
              "Automatically removes malware",
              "Removes the sudo configuration"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "autoremove cleans up packages that were installed as dependencies but are no longer required."
          },
          {
            question: "Why use a dedicated password manager instead of browser password storage?",
            options: [
              "Browser password storage is always encrypted",
              "Password managers are free while browsers charge",
              "Browser stored passwords are more accessible to malware",
              "Browsers don't support long passwords"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "Dedicated password managers have stronger encryption and are designed specifically for credential security."
          },
          {
            question: "What does the Network tab in F12 Developer Tools show?",
            options: [
              "The browser's saved passwords",
              "All HTTP requests, responses, headers, and their timing",
              "The browser's cache files",
              "A list of installed extensions"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The Network tab logs every HTTP request the browser makes, showing headers, status codes, and timing."
          },
          {
            question: "How do you update all packages on Fedora?",
            options: [
              "sudo apt update && sudo apt upgrade",
              "sudo dnf upgrade",
              "sudo pacman -Syu",
              "sudo yum clean all"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Fedora uses dnf as its package manager. 'sudo dnf upgrade' updates all packages."
          }
        ]
      }
    ]
  },
  {
    id: "week02",
    title: "Internet & Online Safety",
    durationText: "Week 2 - Days 1–3",
    focus: "Understand how the internet works and stay safe online",
    output: "Explain networking basics, practice email security, and implement strong authentication habits",
    topics: [
      {
        id: "we02d01",
        title: "How the Internet Works - URLs, HTTP, DNS",
        description: "Every time you visit a website, a complex chain of events happens in milliseconds. Understand URLs, protocols, and DNS.",
        type: "learn",
        duration: "45 min",
        content: `## What Is the Internet?

The internet is a global network of interconnected computers communicating using standardized protocols. It's thousands of networks (ISPs, universities, companies) linked together.

### The URL Breakdown

\`\`\`
https://www.example.com:443/page?id=123#section
|      |           |    |   |        |       |
|      |           |    |   |        |       + Fragment
|      |           |    |   |        + Query parameter
|      |           |    |   + Path
|      |           |    + Port (443 = HTTPS default)
|      |           + Top-level domain (.com)
|      + Domain name
+ Protocol (HTTPS = encrypted HTTP)
\`\`\`

### HTTP vs HTTPS

**HTTP (HyperText Transfer Protocol)**:
- Data sent in plain text
- Anyone on the network can read it
- Vulnerable to man-in-the-middle attacks
- Default port: 80

**HTTPS (HTTP Secure)**:
- Data encrypted using TLS (Transport Layer Security)
- Requires an SSL/TLS certificate from a Certificate Authority
- Default port: 443
- Chrome shows "Not Secure" for HTTP sites

:::warning
**Never enter passwords, credit cards, or personal information on HTTP websites.** Always verify the padlock icon and check the domain is correct (not lookalikes like g00gle.com).
:::

### DNS (Domain Name System)

DNS translates domain names to IP addresses. Without DNS, you'd need to memorize numbers like 93.184.216.34 instead of typing example.com.

**How DNS resolution works**:
\`\`\`
1. You type "example.com" in your browser
2. Browser checks local cache
3. OS checks its DNS cache
4. Query sent to ISP's DNS resolver (recursive resolver)
5. Resolver queries Root DNS servers
6. Root server directs to .com TLD servers
7. TLD server directs to example.com's authoritative nameserver
8. Authoritative server returns the IP address
9. Resolver caches the result and returns it
10. Browser connects to the IP on port 443
\`\`\`

**DNS record types**:
- **A**: Maps domain to IPv4 address
- **AAAA**: Maps domain to IPv6 address
- **CNAME**: Alias pointing one domain to another
- **MX**: Mail server for the domain
- **TXT**: Text records (SPF, DKIM for email authentication)
- **NS**: Nameserver records

**Public DNS servers**:

| Provider | Primary | Secondary |
|----------|---------|-----------|
| Google | 8.8.8.8 | 8.8.4.4 |
| Cloudflare | 1.1.1.1 | 1.0.0.1 |
| Quad9 | 9.9.9.9 | 149.112.112.112 |

\`\`\`bash
# Test DNS resolution
nslookup example.com
dig example.com           # More detailed (Linux/macOS)
\`\`\`

:::concept
**Analogy**: DNS is like a phone book. "google.com" is the name, the IP address is the phone number. The "phone book" is distributed across thousands of servers worldwide for speed and redundancy.
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "What happens during DNS resolution when you visit a website, and what are the security risks?",
        interviewAnswer: "DNS resolution involves: browser cache, OS cache, ISP resolver, root servers, TLD servers, authoritative server. Security risks include DNS spoofing (poisoned cache), DNS hijacking (attacker controls resolver), and unencrypted DNS queries visible to ISP. Mitigations include DNSSEC, DoH/DoT, and caching only from trusted sources.",
        quiz: [
          {
            question: "What does HTTPS encrypt that HTTP does not?",
            options: [
              "The website's HTML content",
              "The data transmitted between your browser and the server",
              "The DNS queries you make",
              "The files stored on your computer"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "HTTPS encrypts the data in transit using TLS. Anyone intercepting the connection sees only encrypted data."
          },
          {
            question: "In 'https://www.example.com:443/path', what does ':443' specify?",
            options: [
              "The database port",
              "The encrypted HTTPS port number",
              "The file version number",
              "The server rack location"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Port 443 is the default port for HTTPS. HTTP uses port 80."
          },
          {
            question: "What is the first step in DNS resolution?",
            options: [
              "Query the root DNS server",
              "Check the browser's local DNS cache",
              "Contact the ISP's DNS resolver",
              "Send an email to the domain registrar"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The browser first checks its own DNS cache for recently visited domains."
          },
          {
            question: "What is DNS spoofing?",
            options: [
              "Changing DNS server settings on your router",
              "Injecting false DNS responses to redirect users to malicious sites",
              "Using DNS to hide your IP address",
              "Encrypting DNS queries for privacy"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "DNS spoofing sends fake DNS responses mapping a legitimate domain to an attacker-controlled IP."
          },
          {
            question: "Which public DNS provider is operated by Cloudflare?",
            options: [
              "8.8.8.8",
              "1.1.1.1",
              "9.9.9.9",
              "208.67.222.222"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Cloudflare operates 1.1.1.1 (primary) and 1.0.0.1 (secondary)."
          },
          {
            question: "What is the purpose of a DNS MX record?",
            options: [
              "Maps a domain to an IP address",
              "Identifies the mail server responsible for the domain",
              "Provides text information for email authentication",
              "Redirects one domain to another"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "MX (Mail Exchange) records specify which mail servers handle email for a domain."
          },
          {
            question: "Why should you be cautious about entering info on HTTP sites?",
            options: [
              "HTTP websites load slower",
              "HTTP data is sent in plain text and can be intercepted",
              "HTTP doesn't support images or forms",
              "HTTP is only used for file downloads"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "HTTP transmits data in plain text. Anyone intercepting the traffic can read passwords and other sensitive data."
          },
          {
            question: "What is the purpose of DNSSEC?",
            options: [
              "To encrypt DNS queries for privacy",
              "To verify the authenticity of DNS responses and prevent spoofing",
              "To speed up DNS resolution",
              "To block access to malicious websites"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "DNSSEC adds cryptographic signatures to DNS records, allowing resolvers to verify responses are authentic."
          },
          {
            question: "A phishing email links to 'https://paypa1.com/login'. What attack is this?",
            options: [
              "SQL injection",
              "Typosquatting / domain spoofing",
              "Cross-site scripting",
              "Buffer overflow"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "This is typosquatting - registering a domain similar to a legitimate one using '1' instead of 'l'."
          },
          {
            question: "What does 'dig example.com' do on Linux?",
            options: [
              "Downloads the website content",
              "Performs a DNS lookup and displays detailed DNS records",
              "Pings the server to check latency",
              "Traces the network route to the server"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "dig (Domain Information Groper) performs DNS queries and displays detailed DNS records."
          },
          {
            question: "What is the purpose of a port number in a URL?",
            options: [
              "To encrypt the connection",
              "To specify which service on the server to connect to",
              "To track user sessions",
              "To compress the data transfer"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Port numbers identify specific services. Port 443 = HTTPS, 80 = HTTP, 22 = SSH, 25 = SMTP."
          },
          {
            question: "DNS over HTTPS (DoH) provides which security benefit?",
            options: [
              "Faster DNS resolution",
              "Encrypted DNS queries that ISPs cannot inspect or modify",
              "Automatic blocking of malicious domains",
              "Eliminates the need for DNS servers"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "DoH encrypts DNS queries using HTTPS, preventing ISPs from seeing which domains you visit."
          }
        ]
      },
      {
        id: "we02d02",
        title: "Email Basics and Phishing Awareness",
        description: "Email is the primary attack vector for most cyberattacks. Learn how email works, identify phishing attempts, and protect yourself.",
        type: "learn",
        duration: "45 min",
        content: `## How Email Works

### Email Protocols
- **SMTP**: Sending email. Port 587 (submission) or 25 (server-to-server).
- **IMAP**: Reading email from server. Port 143 (unencrypted) or 993 (encrypted). Emails stay on server.
- **POP3**: Downloads email to local device. Port 110 or 995 (encrypted). Emails removed from server.

### Email Authentication
- **SPF**: DNS record listing which servers can send email for a domain
- **DKIM**: Cryptographic signature proving the email wasn't modified
- **DMARC**: Policy telling receivers what to do if SPF/DKIM fail

## Phishing Detection

### Common Phishing Indicators

**1. Urgency and fear tactics**
- "Your account will be suspended in 24 hours!"
- "Immediate action required"

**2. Sender address mismatch**
- Display name: "Netflix Support"
- Actual email: support@netf1ix-service.com (note the '1' instead of 'l')
- Always check the actual email address

**3. Suspicious links**
- Hover over links (don't click) to see the actual URL
- Look for subdomains: paypal.com.secure-login.xyz

**4. Unexpected attachments**
- .zip, .exe, .js, .vbs, .ps1 files are high-risk
- Even .docx and .pdf can contain malicious macros

**5. Grammar and spelling errors**
- Legitimate companies proofread their emails

**6. Requests for sensitive information**
- Legitimate companies NEVER ask for passwords via email

### Phishing Types
- **Email phishing**: Mass emails impersonating services
- **Spear phishing**: Targeted emails using personal information
- **Whaling**: Phishing targeting executives
- **Vishing**: Voice phishing (phone calls)
- **Smishing**: SMS phishing (text messages)

:::warning
**Test yourself**: When you receive a suspicious email, do NOT click links. Go directly to the website by typing the URL. If the message is legitimate, you'll see the same info when you log in normally.
:::

:::tip
**Safe practice**: When in doubt, contact the organization through a verified channel (phone from their official website, not from the email).
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "How would you determine if an email claiming to be from your bank is legitimate?",
        interviewAnswer: "Check the sender's actual email address for domain spoofing. Hover over all links without clicking. Look for urgency tactics and requests for personal info. Verify by logging into your bank directly through the official app. Check email headers for SPF/DKIM/DMARC pass status.",
        quiz: [
          {
            question: "What does SMTP stand for?",
            options: [
              "Secure Message Transfer Protocol",
              "Simple Mail Transfer Protocol",
              "System Message Transfer Protocol",
              "Secure Mail Transmission Process"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "SMTP (Simple Mail Transfer Protocol) is the standard for sending email."
          },
          {
            question: "Which email header indicates the sending server was authorized?",
            options: [
              "DKIM",
              "SPF",
              "DMARC",
              "Received"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "SPF is a DNS record listing authorized mail servers."
          },
          {
            question: "A phishing email shows 'Amazon Support' but the email is 'support@amaz0n-security.net'. What should you notice?",
            options: [
              "The display name matches, so it is legitimate",
              "The actual email domain is not amazon.com - this is spoofed",
              "The .net extension means it is safe",
              "Amazon uses multiple domains"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Always check the actual email address, not just the display name."
          },
          {
            question: "What is the key difference between IMAP and POP3?",
            options: [
              "IMAP is faster than POP3",
              "IMAP keeps email on the server; POP3 downloads and removes it",
              "IMAP only works with Gmail",
              "POP3 is encrypted; IMAP is not"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "IMAP syncs with the server (multiple devices), while POP3 downloads to one device and removes from server."
          },
          {
            question: "What is spear phishing?",
            options: [
              "Phishing via phone calls",
              "Phishing targeting specific individuals using personalized information",
              "Phishing via SMS",
              "Mass phishing emails to millions"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Spear phishing is targeted phishing using personal details to appear more legitimate."
          },
          {
            question: "Which attachment type is MOST likely to contain malware?",
            options: [
              "A .txt file",
              "A .jpg image",
              "A .zip archive or .exe executable",
              "A .csv spreadsheet"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Zip files can contain hidden executables, and .exe files are directly executable."
          },
          {
            question: "How should you verify if an email from your bank is real?",
            options: [
              "Reply to the email asking if it is real",
              "Click the link and log in",
              "Call the bank using the number from their official website",
              "Forward it to all colleagues"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Never use contact info from suspicious email. Always use official channels."
          },
          {
            question: "What does DMARC 'p=reject' tell receiving servers?",
            options: [
              "Allow the email regardless of SPF/DKIM",
              "Quarantine failed emails in spam",
              "Reject emails that fail SPF/DKIM entirely",
              "Forward failed emails to administrator"
            ],
            correctAnswerIndex: 2,
            difficulty: "advanced",
            explanation: "DMARC p=reject instructs servers to reject emails that fail authentication."
          },
          {
            question: "IT asks you to install a 'security update' via email attachment. What should you do?",
            options: [
              "Install it immediately",
              "Forward to colleagues for awareness",
              "Do not open - verify with IT through a separate channel",
              "Reply asking for more info"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "Legitimate IT departments push updates through managed systems, not email attachments."
          },
          {
            question: "Why is hovering over a link useful?",
            options: [
              "It loads the page in the background",
              "It shows the actual URL destination in the browser's status bar",
              "It scans the link for malware",
              "It blocks the link from opening"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Hovering reveals the actual URL, letting you verify the destination before clicking."
          },
          {
            question: "What port does IMAP use for encrypted connections?",
            options: [
              "Port 80",
              "Port 143",
              "Port 587",
              "Port 993"
            ],
            correctAnswerIndex: 3,
            difficulty: "intermediate",
            explanation: "IMAP over SSL/TLS uses port 993."
          },
          {
            question: "What should you do after clicking a suspicious link?",
            options: [
              "Close the browser immediately",
              "Enter credentials if the page looks correct",
              "Disconnect from network, run antivirus, change passwords from a clean device",
              "Nothing - it was probably harmless"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "Disconnect to prevent data exfiltration, scan, change passwords, and report the incident."
          }
        ]
      },
      {
        id: "we02d03",
        title: "Passwords, MFA, and Safe Browsing",
        description: "Your password is the first line of defense. Learn strong passwords, multi-factor authentication, and safe browsing habits.",
        type: "learn",
        duration: "40 min",
        content: `## Password Security

### Why Passwords Get Compromised
- **Credential stuffing**: Leaked username/password pairs used on other sites
- **Brute force**: Automated tools try every combination
- **Dictionary attacks**: Tries common words and patterns
- **Keyloggers**: Malware records keystrokes
- **Phishing**: Tricked into entering credentials on fake sites

### Creating Strong Passwords

**Passphrase method** (recommended):
\`\`\`
correct-horse-battery-staple
my-$ecure-Passw0rd-2024!
\`\`\`

**Length is king**: A 20-character passphrase is exponentially harder to crack than a 12-character complex password.

**What NOT to use**:
- Password, 123456, qwerty
- Your name, birthdate, or pet's name
- Any single dictionary word
- Reusing the same password across sites

### Password Strength Comparison

| Password | Type | Time to crack |
|----------|------|---------------|
| password | Dictionary word | Instant |
| P@ssw0rd | Simple substitution | ~10 minutes |
| Tr0ub4dor&3 | Common pattern | ~3 years |
| correct-horse-battery-staple | 4-word passphrase | ~550 million years |

### Password Managers

A password manager generates, stores, and fills unique passwords for every site.

**Benefits**:
- One master password to remember
- Generates random, unique passwords
- Auto-fills on websites and apps
- Alerts you to phishing (won't fill on fake domains)
- Syncs across devices

**Recommended**: Bitwarden (free/open-source), 1Password, KeePass (offline)

## Multi-Factor Authentication (MFA)

MFA requires two or more verification factors:
1. **Something you know**: Password, PIN
2. **Something you have**: Phone, hardware token
3. **Something you are**: Fingerprint, face recognition

### MFA Methods (strongest to weakest)

**Hardware security keys** (strongest):
- YubiKey, Google Titan
- Phishing-resistant, costs $25-70

**Authenticator apps** (strong):
- Google Authenticator, Authy
- Generate TOTP codes every 30 seconds
- Work offline, free

**Push notifications** (moderate):
- Microsoft Authenticator, Duo
- Vulnerable to MFA fatigue attacks

**SMS codes** (weakest MFA):
- Vulnerable to SIM swapping
- Better than nothing

:::warning
**Never share MFA codes** with anyone. Legitimate companies will NEVER ask for your MFA code.
:::

## Safe Browsing Habits

1. **Verify HTTPS** before entering sensitive information
2. **Don't click ads** - type the URL directly
3. **Use ad blockers** (uBlock Origin) to prevent malvertising
4. **Keep browsers updated**
5. **Use privacy-focused search engines**: DuckDuckGo, Brave Search
6. **Use a VPN** on public Wi-Fi
7. **Log out** of banking when done
8. **Don't save passwords** in browsers for critical accounts

:::checkpoint
**Action items**:
1. Install a password manager
2. Generate unique passwords for your top 5 accounts
3. Enable MFA on email and banking
4. Install uBlock Origin in your browser
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "What makes a password manager more secure than using the same complex password everywhere?",
        interviewAnswer: "A password manager generates unique, random passwords for every site. If one site is breached, attackers can't use those credentials elsewhere. It also prevents phishing - it won't auto-fill on fake domains. The only password to remember is the master password.",
        quiz: [
          {
            question: "What makes a passphrase stronger than a complex password?",
            options: [
              "Passphrases use special characters",
              "Passphrases use multiple unrelated words, creating more entropy",
              "Passphrases are always shorter",
              "Passphrases are only stronger with numbers"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "A 4-word passphrase has more entropy than common substitution patterns."
          },
          {
            question: "Which MFA method is strongest against phishing?",
            options: [
              "SMS verification codes",
              "Email verification codes",
              "Hardware security keys (YubiKey)",
              "Security questions"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "Hardware security keys use cryptographic challenges that verify the legitimate website's domain."
          },
          {
            question: "Why is reusing passwords dangerous?",
            options: [
              "It makes passwords easier to remember",
              "A breach on one site exposes all accounts using that password",
              "It slows down internet speed",
              "It prevents password managers from working"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Credential stuffing attacks use leaked pairs from one breach to attempt login on other sites."
          },
          {
            question: "What is a SIM swapping attack?",
            options: [
              "Installing malware on a SIM card",
              "An attacker convincing your carrier to transfer your phone number to their SIM",
              "Physically stealing your SIM card",
              "Using two SIM cards simultaneously"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "In SIM swapping, an attacker social-engineers your carrier into porting your number to their SIM."
          },
          {
            question: "Why not save banking passwords in your browser?",
            options: [
              "Browsers don't support complex passwords",
              "Browser password stores are more accessible to malware",
              "Banks don't allow password saving",
              "It causes the browser to crash"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Browser password stores are accessible to malware. Dedicated managers have stronger security."
          },
          {
            question: "What is 'credential stuffing'?",
            options: [
              "Adding extra characters to passwords",
              "Using leaked username/password pairs from one breach on other sites",
              "Cracking passwords by trying every combination",
              "Storing passwords in a database"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Credential stuffing exploits password reuse across multiple services."
          },
          {
            question: "How long to brute-force 'P@ssw0rd!' offline?",
            options: [
              "Instantly",
              "About 10 minutes",
              "About 100 years",
              "About 1 billion years"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Despite looking complex, it follows a common pattern that password crackers have in their dictionaries."
          },
          {
            question: "What does TOTP stand for?",
            options: [
              "Two-Office Transfer Protocol",
              "Time-based One-Time Password",
              "Temporary Offline Transfer Process",
              "Tokenized Online Authentication Protocol"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "TOTP generates a unique code every 30 seconds based on time and a shared secret key."
          },
          {
            question: "Authenticator apps are better than SMS codes because:",
            options: [
              "Apps are more convenient",
              "SMS codes can be intercepted via SIM swapping; app codes are generated locally",
              "Apps work without internet",
              "SMS codes are always free"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Authenticator app codes are generated locally and can't be intercepted remotely."
          },
          {
            question: "What is the recommended minimum password length?",
            options: [
              "8 characters",
              "12 characters",
              "16+ characters",
              "4 words regardless of length"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "NIST recommends a minimum of 16 characters for passwords."
          },
          {
            question: "Best practice for browsing on public Wi-Fi?",
            options: [
              "Only visit HTTP websites",
              "Use a VPN to encrypt your traffic",
              "Disable your firewall",
              "Share the Wi-Fi password"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "A VPN encrypts all traffic, protecting from eavesdropping on untrusted networks."
          },
          {
            question: "What is an MFA fatigue attack?",
            options: [
              "Exhausting MFA codes by using too many",
              "Spamming push notifications until the victim accidentally approves",
              "Forcing a system to bypass MFA",
              "Cracking MFA codes with brute force"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "In MFA fatigue, the attacker continuously sends prompts hoping the victim accidentally approves."
          }
        ]
      }
    ]
  },
  {
    id: "week03",
    title: "Operating System Basics",
    durationText: "Week 3 - Days 1–3",
    focus: "Navigate and manage Windows and Linux operating systems",
    output: "Use Windows system tools, understand Linux basics, and manage system resources",
    topics: [
      {
        id: "we03d01",
        title: "Windows Desktop, Settings, and File Explorer",
        description: "Master the Windows interface - navigate settings, customize the desktop, and use File Explorer efficiently.",
        type: "learn",
        duration: "40 min",
        content: `## Windows Desktop Essentials

### The Taskbar
- **Start Menu**: Access all installed applications, settings, and power options
- **Search**: Type to search files, apps, settings, and the web (Windows key to activate)
- **Task View**: Virtual desktops (Windows+Tab) — separate desktops for different projects
- **System Tray**: Clock, network, volume, antivirus, background apps

### Windows Settings vs. Control Panel

**Settings** (modern, Windows 10/11):
- System, Display, Sound, Notifications
- Network & Internet, Personalization, Apps
- Accounts, Privacy & Security, Windows Update

**Control Panel** (legacy, still needed for some tasks):
- Programs and Features (uninstall software)
- Device Manager (hardware management)
- Administrative Tools (Event Viewer, Services)
- Windows Defender Firewall (advanced rules)

\`\`\`cmd
control                         # Open Control Panel
\`\`\`

### File Explorer Power Features

| Shortcut | Action |
|----------|--------|
| \`Alt + Left\` | Go back one folder |
| \`Alt + Right\` | Go forward one folder |
| \`Alt + Up\` | Go to parent folder |
| \`F2\` | Rename selected item |
| \`F5\` | Refresh current folder |
| \`Ctrl + N\` | Open new Explorer window |
| \`Ctrl + Shift + N\` | Create new folder |
| \`Shift + Delete\` | Permanently delete (skip Recycle Bin) |

**Address bar tricks**:
- Type \`C:\\\` - goes to C: drive
- Type \`\\\\server\\share\` - access network shares
- Type \`%temp%\` - opens the Temp folder
- Type \`shell:startup\` - opens the Startup folder

:::warning
**Security**: Windows hides known file extensions by default. This lets malware disguise itself - 'document.pdf.exe' appears as 'document.pdf'. Always enable file extension visibility!
:::

### System Information Commands
\`\`\`cmd
systeminfo                        # OS version, RAM, processor, hotfixes
hostname                          # Computer name
whoami                            # Current logged-in user
whoami /priv                      # Current user's privileges
ipconfig                          # Network configuration
\`\`\`

:::tip
**Quick access**: Right-click the Start button (or Windows+X) to open the Power User menu with shortcuts to Task Manager, Device Manager, Disk Management, PowerShell, and more.
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "A user can't find where to uninstall a program in Windows Settings. Where else can they look?",
        interviewAnswer: "Open Control Panel (type 'control' in Run dialog) and go to Programs and Features. Alternatively, Settings → Apps → Installed apps shows all installed software. For stubborn programs, use 'winget list' in PowerShell.",
        quiz: [
          {
            question: "Why should you enable file extension visibility in Windows?",
            options: [
              "It makes files load faster",
              "It prevents malware from disguising executable files as documents",
              "It allows you to change file icons",
              "It reduces disk space usage"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Hidden file extensions let malware like 'invoice.pdf.exe' appear as 'invoice.pdf'."
          },
          {
            question: "What does 'systeminfo' display?",
            options: [
              "A list of installed programs",
              "OS version, hardware specifications, and installed updates",
              "Network connection details",
              "Running processes and CPU usage"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "systeminfo shows OS name/version, processor, RAM, network cards, and installed hotfixes."
          },
          {
            question: "What shortcut opens the Power User menu?",
            options: [
              "Windows + P",
              "Windows + X",
              "Ctrl + X",
              "Alt + X"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Windows+X opens the Power User menu with shortcuts to system tools."
          },
          {
            question: "How do you permanently delete a file, bypassing Recycle Bin?",
            options: [
              "Press Delete",
              "Press Shift + Delete",
              "Press Ctrl + Delete",
              "Right-click and select Remove"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Shift+Delete permanently deletes the file without sending it to the Recycle Bin."
          },
          {
            question: "What is the difference between Settings and Control Panel?",
            options: [
              "They are identical",
              "Settings is modern; Control Panel is legacy but needed for some advanced tasks",
              "Control Panel is only in Windows 11",
              "Settings cannot change display resolution"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Settings is the modern replacement, but Control Panel is still needed for advanced features."
          },
          {
            question: "What does 'whoami /priv' show?",
            options: [
              "The current user's name",
              "All user accounts on the system",
              "The privileges assigned to the current user",
              "User group memberships"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "whoami /priv lists security privileges like SeDebugPrivilege, SeShutdownPrivilege."
          },
          {
            question: "Which address bar shortcut opens the Temp folder?",
            options: [
              "%appdata%",
              "%temp%",
              "%systemroot%",
              "%programfiles%"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "%temp% resolves to the current user's temporary files directory."
          },
          {
            question: "What is Task View used for?",
            options: [
              "Viewing system performance metrics",
              "Managing virtual desktops and switching between windows",
              "Viewing running services",
              "Managing startup programs"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Task View (Windows+Tab) shows all open windows and allows creating virtual desktops."
          },
          {
            question: "How do you open a new File Explorer window with the keyboard?",
            options: [
              "Windows + E",
              "Ctrl + N",
              "Alt + N",
              "Ctrl + Shift + N"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Ctrl+N opens a new Explorer window when one is already open."
          },
          {
            question: "A file named 'report.docx.exe' is suspicious because:",
            options: [
              "It has too many characters",
              "The double extension suggests malware hiding an executable as a document",
              "Word documents can't have .exe",
              "It is a legitimate system file"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Double extensions are a classic malware technique."
          },
          {
            question: "What does 'ipconfig' show?",
            options: [
              "A list of network adapters and their configuration",
              "Hardware specifications",
              "Running network connections",
              "The routing table"
            ],
            correctAnswerIndex: 0,
            difficulty: "beginner",
            explanation: "ipconfig displays network adapters, IP addresses, subnet masks, gateways, and DNS servers."
          },
          {
            question: "Which command opens Control Panel from the command line?",
            options: [
              "control panel",
              "control",
              "open-cpl",
              "sysdm.cpl"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Typing 'control' in Run dialog or CMD opens the classic Control Panel."
          }
        ]
      },
      {
        id: "we03d02",
        title: "Windows Task Manager, Device Manager, and Utilities",
        description: "Use Windows built-in tools to monitor performance, manage hardware, and diagnose system issues.",
        type: "learn",
        duration: "40 min",
        content: `## Task Manager

**Open**: \`Ctrl+Shift+Esc\` or right-click taskbar

### Tabs Overview

**Processes tab**: Shows all running apps and background processes with CPU, Memory, Disk, Network, GPU usage. Right-click → End task, Go to details.

**Performance tab**: Real-time graphs for CPU, Memory, Disk, Network, GPU. Shows utilization, speed, cores.

**Startup tab**: Programs that launch at Windows start. Disable to improve boot times.

### Identifying Suspicious Processes
- Unusual process names (random characters: \`xk7df2.exe\`)
- High CPU or network usage when idle
- Missing digital signature (Properties → Digital Signatures)
- Running from unusual locations (C:\\Temp\\, AppData\\)

## Device Manager

**Open**: Right-click Start → Device Manager, or \`devmgmt.msc\`

- Yellow triangle = driver problem
- Red X = disabled device
- Right-click → Properties → Driver tab shows driver version and date

### Common Tasks
- **Update driver**: Right-click → Update driver
- **Disable device**: Right-click → Disable device
- **View hidden devices**: View → Show hidden devices

## System Utilities

### Event Viewer
\`\`\`
eventvwr.msc
\`\`\`
- **Windows Logs → System**: OS events, driver failures
- **Windows Logs → Security**: Login attempts, audit events
- **Application Logs**: Program-specific errors

### Disk Management
\`\`\`
diskmgmt.msc
\`\`\`
- View storage partitions, create/delete/format
- Change drive letters, extend/shrink volumes

### Services
\`\`\`
services.msc
\`\`\`
- Background processes without user interaction
- Startup type: Automatic, Manual, Disabled
- Right-click → Start, Stop, Restart

### Registry Editor
\`\`\`
regedit
\`\`\`
- Central database of Windows configuration
- **Backup first**: File → Export before changes
- Key locations:
  - \`HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\` (startup)
  - \`HKLM\\SYSTEM\\CurrentControlSet\\Services\` (services)

:::warning
**Registry caution**: Incorrect edits can prevent Windows from booting. Always backup first.
:::

:::tip
**Troubleshooting flow**: Task Manager → Event Viewer → Device Manager → Services → Registry
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "You notice 'svchost.exe' using 100% CPU. How would you determine if it's legitimate or malware?",
        interviewAnswer: "svchost.exe is a legitimate Windows host process. Check: Task Manager → Details → right-click → Go to details → check command line (shows which service DLL it's hosting). Check file location - legitimate runs from C:\\Windows\\System32. Check digital signature in Properties.",
        quiz: [
          {
            question: "What does a yellow triangle in Device Manager indicate?",
            options: [
              "The device is disabled",
              "There is a driver problem",
              "The device is not connected",
              "The device is working normally"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "A yellow triangle with exclamation mark indicates a driver issue."
          },
          {
            question: "How do you identify startup programs that slow boot time?",
            options: [
              "Device Manager → Boot tab",
              "Task Manager → Startup tab, Impact column",
              "systeminfo command",
              "Control Panel → Startup"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Task Manager's Startup tab lists programs with their impact level."
          },
          {
            question: "What does Event Viewer provide?",
            options: [
              "Real-time CPU and memory usage",
              "System events, errors, warnings, and security audit records",
              "Installed hardware drivers",
              "Network traffic statistics"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Event Viewer records system events, application errors, security logins, and driver failures."
          },
          {
            question: "How do you view background services?",
            options: [
              "Task Manager → Processes",
              "Device Manager → Services",
              "services.msc or Task Manager → Details",
              "Control Panel → Programs"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "services.msc shows all Windows services. Task Manager → Details shows running executables."
          },
          {
            question: "What should you do before editing the Windows Registry?",
            options: [
              "Create a System Restore point and export the registry key",
              "Format the hard drive",
              "Disable all antivirus",
              "Disconnect from the internet"
            ],
            correctAnswerIndex: 0,
            difficulty: "intermediate",
            explanation: "Always back up the registry (File → Export) and create a restore point."
          },
          {
            question: "A program runs from C:\\Temp\\. What should you check?",
            options: [
              "Its file size",
              "Its digital signature and whether it matches a known legitimate application",
              "Whether it appears in Recycle Bin",
              "Whether it has a .exe extension"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Check Properties → Digital Signatures. Unsigned executables from unusual locations are suspicious."
          },
          {
            question: "What is the purpose of 'msconfig'?",
            options: [
              "To install software",
              "To configure boot options, startup programs, and services",
              "To manage network connections",
              "To update drivers"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "msconfig configures boot options, startup programs, and services."
          },
          {
            question: "What does Task Manager's Details tab show that Processes does not?",
            options: [
              "Real-time CPU graphs",
              "Full executable path, PID, and status of each process",
              "Network speed test results",
              "List of installed applications"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Details shows PIDs, full executable paths, status, and username."
          },
          {
            question: "How do you open Device Manager from command line?",
            options: [
              "devmgmt.msc",
              "diskmgmt.msc",
              "eventvwr.msc",
              "services.msc"
            ],
            correctAnswerIndex: 0,
            difficulty: "beginner",
            explanation: "devmgmt.msc opens Device Manager."
          },
          {
            question: "What does a red X in Device Manager mean?",
            options: [
              "Needs driver update",
              "Device is disabled",
              "Device is disconnected",
              "Device is working normally"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "A red X indicates the device has been disabled."
          },
          {
            question: "Which Event Viewer log records failed login attempts?",
            options: [
              "Windows Logs → System",
              "Windows Logs → Application",
              "Windows Logs → Security",
              "Applications and Services Logs → PowerShell"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "The Security log records login events including failed attempts (Event ID 4625)."
          }
        ]
      },
      {
        id: "we03d03",
        title: "Linux Introduction - Terminal, Commands, Directory Structure",
        description: "Get comfortable with the Linux terminal. Learn essential commands, understand the filesystem hierarchy, and navigate with confidence.",
        type: "learn",
        duration: "50 min",
        content: `## The Linux Terminal

### Opening a Terminal
- **Ubuntu/Debian**: Ctrl+Alt+T
- **Kali Linux**: Click terminal icon
- **SSH**: \`ssh user@hostname\` (remote access)

### The Prompt
\`\`\`
username@hostname:~$
|        |        | |
|        |        | +-- Current directory ($ = user, # = root)
|        |        +---- Hostname
|        +------------- Username
\`\`\`

## Essential Commands

### Navigation
\`\`\`bash
pwd                     # Print working directory
ls                      # List files in current directory
ls -la                  # List all files (including hidden) with details
ls -lh                  # Human-readable file sizes
cd /path/to/dir         # Change directory
cd ..                   # Go up one directory
cd ~                    # Go to home directory
cd -                    # Go to previous directory
\`\`\`

**Understanding \`ls -la\` output**:
\`\`\`
-rw-r--r-- 1 user group 4096 Jan 22 10:30 file.txt
| |  |  |     |     |     |       |           |
| |  |  |     |     |     |       |           +-- Filename
| |  |  |     |     |     |       +-- Date/time
| |  |  |     |     |     +-- File size
| |  |  |     |     +-- Group owner
| |  |  |     +-- User owner
| +--+-+-- Permissions (user/group/other)
+-- File type (- file, d directory, l link)
\`\`\`

### File Operations
\`\`\`bash
touch file.txt                  # Create empty file
cp file.txt backup.txt          # Copy file
cp -r dir1/ dir2/               # Copy directory recursively
mv old.txt new.txt              # Rename or move
rm file.txt                     # Delete file
rm -i file.txt                  # Delete with confirmation
mkdir projects                  # Create directory
mkdir -p a/b/c                  # Create nested directories
rmdir emptydir                  # Remove empty directory
\`\`\`

### Viewing Files
\`\`\`bash
cat file.txt                    # Display entire file
less file.txt                   # Page through file (q to quit)
head -n 20 file.txt             # First 20 lines
tail -n 20 file.txt             # Last 20 lines
tail -f /var/log/syslog         # Follow log in real-time
wc -l file.txt                  # Count lines
\`\`\`

### Searching
\`\`\`bash
grep "search term" file.txt     # Search in file
grep -r "search" /path/         # Recursive search
find / -name "*.conf"           # Find files by name
find / -type f -size +100M      # Find files >100MB
which python3                   # Find command location
\`\`\`

### Permissions (Linux)

**Three permission types**: r (read=4), w (write=2), x (execute=1)
**Three levels**: User (u), Group (g), Other (o)

\`\`\`bash
chmod 755 script.sh             # rwxr-xr-x (owner: full, others: read+execute)
chmod 644 file.txt              # rw-r--r-- (owner: read+write, others: read)
chmod +x script.sh              # Make executable
chown user:group file.txt       # Change ownership
\`\`\`

**Permission numeric values**:
\`\`\`
7 = rwx (4+2+1) = full access
6 = rw- (4+2+0) = read + write
5 = r-x (4+0+1) = read + execute
4 = r-- (4+0+0) = read only
0 = --- (0+0+0) = no access
\`\`\`

### System Information
\`\`\`bash
uname -a                         # Kernel and OS info
hostname                         # Computer name
whoami                           # Current user
id                               # User ID, group ID, groups
uptime                           # How long running
free -h                          # RAM usage
df -h                            # Disk usage
du -sh /path                     # Directory size
lscpu                            # CPU information
\`\`\`

### Process Management
\`\`\`bash
ps aux                           # List all running processes
top                              # Real-time process monitor
kill PID                         # Send SIGTERM
kill -9 PID                      # Force kill (SIGKILL)
\`\`\`

### Networking
\`\`\`bash
ip addr show                     # Show IP addresses
ping google.com                  # Test connectivity
curl -I https://example.com      # Fetch HTTP headers
ss -tuln                         # Show listening ports
\`\`\`

:::tip
**Getting help**: Use \`man command\` for full manual. Use \`command --help\` for quick info. Use \`apropos keyword\` to search commands by description.
:::

:::warning
**Be careful with root**: Commands prefixed with \`sudo\` run with root privileges. A typo with sudo can delete critical system files.
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Explain the difference between 'chmod 755' and 'chmod 644' on a file.",
        interviewAnswer: "chmod 755 gives the owner full access (read+write+execute) and others read+execute. Use this for scripts and programs. chmod 644 gives owner read+write and others read-only. Use this for regular files like documents and config files. 755 on a regular file is a security risk.",
        quiz: [
          {
            question: "What does 'ls -la' do?",
            options: [
              "Lists files in long format including hidden files",
              "Lists only hidden files",
              "Lists files sorted by size",
              "Lists files recursively"
            ],
            correctAnswerIndex: 0,
            difficulty: "beginner",
            explanation: "ls -l shows detailed format, -a shows all files including hidden ones."
          },
          {
            question: "What permission does 'chmod 644' set?",
            options: [
              "Owner: rwx, Group: rwx, Other: rwx",
              "Owner: rw-, Group: r--, Other: r--",
              "Owner: r-x, Group: r-x, Other: r-x",
              "Owner: ---, Group: ---, Other: ---"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "6 = rw-, 4 = r--. Owner can read and write; group and others can only read."
          },
          {
            question: "Which command shows the current working directory?",
            options: [
              "ls",
              "cd",
              "pwd",
              "dir"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "pwd (print working directory) shows your current location."
          },
          {
            question: "What does 'cd -' do?",
            options: [
              "Goes to root directory",
              "Goes to home directory",
              "Goes to the previous directory",
              "Clears the terminal"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "cd - toggles between current and previous working directory."
          },
          {
            question: "How do you view the last 30 lines of a log in real-time?",
            options: [
              "cat /var/log/syslog",
              "head -30 /var/log/syslog",
              "tail -f /var/log/syslog",
              "less /var/log/syslog"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "tail -f follows a file, displaying new lines as they're added."
          },
          {
            question: "What is the difference between 'rm' and 'rmdir'?",
            options: [
              "They are the same",
              "rm deletes files; rmdir deletes only empty directories",
              "rm is safe; rmdir is dangerous",
              "rmdir requires root; rm does not"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "rmdir only removes empty directories. rm removes files."
          },
          {
            question: "What does 'grep -r' do?",
            options: [
              "Removes all occurrences of a pattern",
              "Searches recursively through all files in a directory",
              "Reverses grep output",
              "Runs grep with root privileges"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "grep -r searches through all files in the directory and subdirectories."
          },
          {
            question: "How do you make a shell script executable?",
            options: [
              "chmod 644 script.sh",
              "chmod 755 script.sh",
              "chmod 400 script.sh",
              "chmod 200 script.sh"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "chmod 755 grants read, write, and execute permissions to the owner, and read/execute to group and others. This is the standard way to make a script executable while maintaining reasonable security."
          },
          {
            question: "What does 'ps aux' display?",
            options: [
              "IP addresses",
              "All running processes with detailed information",
              "Disk usage statistics",
              "Network connections"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "ps aux lists all running processes with user, CPU, memory info."
          },
          {
            question: "What is the purpose of 'sudo'?",
            options: [
              "Switch to a different user",
              "Execute a command with superuser (root) privileges",
              "Shut down the computer",
              "Search for files"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "sudo (SuperUser Do) runs a command with root privileges."
          },
          {
            question: "What does 'ss -tuln' show?",
            options: [
              "System statistics",
              "TCP/UDP listening ports with numeric addresses",
              "SSH connections",
              "Disk usage"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "ss shows socket statistics: -t TCP, -u UDP, -l listening, -n numeric."
          },
          {
            question: "What does 'du -sh /var/log' display?",
            options: [
              "List of all files in /var/log",
              "Total size of /var/log in human-readable format",
              "Number of files in /var/log",
              "Permissions of /var/log"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "du with -s (summary) and -h (human-readable) shows total directory size."
          }
        ]
      }
    ]
  },
  {
    id: "week04",
    title: "First Command Line Skills",
    durationText: "Week 4 - Days 1–3",
    focus: "Build practical command line proficiency through hands-on exercises",
    output: "Navigate filesystems, manipulate files, write simple scripts, and combine commands from the terminal",
    topics: [
      {
        id: "we04d01",
        title: "Navigation Commands - cd, ls, pwd, mkdir, touch",
        description: "Master filesystem navigation in the terminal. Create directories, generate files, and build muscle memory with path manipulation.",
        type: "practice",
        duration: "50 min",
        content: `## Practice: Filesystem Navigation

### Creating a Practice Environment

\`\`\`bash
mkdir -p ~/cyberlab/{tools,notes,scripts,logs}
touch ~/cyberlab/notes/readme.txt
touch ~/cyberlab/scripts/scan.sh
touch ~/cyberlab/logs/access.log
\`\`\`

### Navigation Drills

**Exercise 1**: Navigate to each directory
\`\`\`bash
cd ~/cyberlab
pwd                     # /home/username/cyberlab
cd tools
pwd                     # /home/username/cyberlab/tools
cd ..                   # Back to parent
pwd                     # /home/username/cyberlab
cd ~/cyberlab/logs
pwd                     # /home/username/cyberlab/logs
cd -                    # Back to previous directory
\`\`\`

**Exercise 2**: List contents with different options
\`\`\`bash
cd ~/cyberlab
ls                      # Basic listing
ls -l                   # Long format (permissions, owner, size, date)
ls -la                  # Include hidden files
ls -lh                  # Human-readable sizes
ls -ltr                 # Sort by modification time, newest last
ls -lR                  # Recursive (show subdirectory contents)
\`\`\`

**Exercise 3**: Create files with touch
\`\`\`bash
touch newfile.txt                   # Create empty file
touch file{1..5}.txt                # Create file1.txt through file5.txt
ls -la                              # Verify files were created
\`\`\`

**Exercise 4**: Create nested directories
\`\`\`bash
mkdir -p level1/level2/level3       # Create entire path at once
mkdir -p project/{src,tests,docs}   # Create sibling directories
tree ~/cyberlab                     # Visual directory tree
\`\`\`

### Path Types

**Absolute paths** start from root (/):
\`\`\`bash
cd /home/username/cyberlab
cd /var/log
\`\`\`

**Relative paths** start from current location:
\`\`\`bash
cd ../..                    # Go up two directories
cd ./scripts                # Go into scripts in current directory
cd ~/Documents              # ~ expands to home directory
\`\`\`

### Tab Completion

The single most important terminal skill:
\`\`\`bash
cd /ho<Tab>                # Auto-completes to /home/
cd /home/use<Tab>           # Auto-completes to /home/username/
cat /etc/ho<Tab>            # Auto-completes to /etc/hostname
ls -l /etc/net<Tab>         # Shows all matches if ambiguous
\`\`\`

:::checkpoint
**Speed challenge**: Time yourself:
1. Create /tmp/practice
2. Navigate into it
3. Create 5 files (test1.txt through test5.txt)
4. List them with details
5. Navigate back to home

Target: under 30 seconds.
:::

:::tip
**Pro tip**: Press up arrow to cycle through previous commands. Press Ctrl+R to search command history.
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "What is the difference between an absolute path and a relative path?",
        interviewAnswer: "An absolute path starts from root (/) and specifies the full location - like /home/user/documents. A relative path starts from the current working directory - like ../documents. Absolute paths always work regardless of where you are.",
        quiz: [
          {
            question: "What does 'mkdir -p a/b/c' do?",
            options: [
              "Creates only the 'c' directory",
              "Creates directories a, a/b, and a/b/c in one command",
              "Creates three separate directories named a, b, and c",
              "Fails if directory 'a' already exists"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The -p flag creates parent directories as needed."
          },
          {
            question: "What happens when you press Tab twice?",
            options: [
              "Inserts a tab character",
              "Lists all possible completions for the current command or path",
              "Clears the terminal",
              "Closes the terminal"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Double-tab shows all possible completions when the shell can't uniquely determine your input."
          },
          {
            question: "What does 'cd -' do?",
            options: [
              "Goes to root directory",
              "Goes to home directory",
              "Toggles between current and previous directory",
              "Deletes the current directory"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "cd - switches to the previous working directory."
          },
          {
            question: "What does 'touch file.txt' do if the file already exists?",
            options: [
              "Creates a backup copy",
              "Deletes the file",
              "Updates the file's modification timestamp without changing contents",
              "Throws an error"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "touch updates the access and modification timestamps. If the file doesn't exist, it creates an empty file."
          },
          {
            question: "Which command shows a visual directory tree?",
            options: [
              "ls -R",
              "find . -type d",
              "tree",
              "du -a"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "tree displays directories and files in a tree-like format. Install with 'sudo apt install tree' if not available."
          },
          {
            question: "What does 'cd ..' do?",
            options: [
              "Goes to the home directory",
              "Goes up one directory level",
              "Lists parent directory contents",
              "Creates a new directory"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "cd .. moves to the parent directory of your current location."
          },
          {
            question: "What does the '~' symbol represent in a Linux path?",
            options: [
              "The root directory (/)",
              "The current user's home directory",
              "The previous directory",
              "The temporary directory"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "~ expands to the current user's home directory (e.g., /home/username)."
          },
          {
            question: "What does 'ls -lh' show that 'ls -l' does not?",
            options: [
              "Hidden files",
              "File sizes in human-readable format (KB, MB, GB)",
              "File permissions",
              "File ownership"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The -h flag formats file sizes in human-readable units instead of raw bytes."
          },
          {
            question: "What is the difference between an absolute and relative path?",
            options: [
              "Absolute paths are shorter",
              "Absolute starts from root (/); relative starts from current directory",
              "Relative paths always start with ~",
              "Absolute paths don't work in scripts"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Absolute paths specify the full location from root. Relative paths are relative to where you currently are."
          },
          {
            question: "What does 'mkdir -p project/{src,tests,docs}' create?",
            options: [
              "One directory named 'src,tests,docs'",
              "Three directories: project/src, project/tests, project/docs",
              "One directory named 'project' with curly brace files",
              "An error - curly braces aren't valid"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Brace expansion creates multiple directories. Combined with -p, it creates the parent 'project' and all three subdirectories."
          },
          {
            question: "What does 'touch file{1..5}.txt' create?",
            options: [
              "One file named 'file{1..5}.txt'",
              "Five files: file1.txt through file5.txt",
              "A directory named file{1..5}.txt",
              "An error - brace expansion doesn't work in bash"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Brace expansion {1..5} generates the sequence file1.txt file2.txt file3.txt file4.txt file5.txt, creating five separate files."
          },
          {
            question: "What does Ctrl+R do in the terminal?",
            options: [
              "Clears the screen",
              "Restarts the terminal",
              "Searches backward through command history",
              "Redo last command"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "Ctrl+R initiates reverse incremental search through command history."
          }
        ]
      },
      {
        id: "we04d02",
        title: "File Operations - cp, mv, rm, cat, less, head, tail",
        description: "Practice copying, moving, deleting, and viewing files from the command line with real-world exercises.",
        type: "practice",
        duration: "50 min",
        content: `## Practice: File Operations

### Setting Up Practice Files
\`\`\`bash
mkdir -p ~/filelab/{source,backup,logs}
echo "Line 1: System started" > ~/filelab/logs/syslog.txt
echo "Line 2: User login" >> ~/filelab/logs/syslog.txt
echo "Line 3: File access" >> ~/filelab/logs/syslog.txt
echo "Line 4: Error occurred" >> ~/filelab/logs/syslog.txt
echo "Line 5: System shutdown" >> ~/filelab/logs/syslog.txt
echo "Important configuration data" > ~/filelab/source/config.txt
\`\`\`

### Exercise 1: Copy Operations
\`\`\`bash
# Copy a file
cp ~/filelab/source/config.txt ~/filelab/backup/config.txt

# Copy with a new name
cp ~/filelab/source/config.txt ~/filelab/backup/config.backup.txt

# Copy entire directory recursively
cp -r ~/filelab/source/ ~/filelab/source_copy/

# Copy with verbose output (see what's happening)
cp -v ~/filelab/source/*.txt ~/filelab/backup/

# Copy preserving permissions and timestamps
cp -p ~/filelab/source/config.txt ~/filelab/backup/

# Interactive copy (asks before overwriting)
cp -i ~/filelab/source/config.txt ~/filelab/backup/
\`\`\`

### Exercise 2: Move and Rename
\`\`\`bash
# Rename a file
mv ~/filelab/source/config.txt ~/filelab/source/configuration.txt

# Move a file
mv ~/filelab/source/configuration.txt ~/filelab/backup/

# Move multiple files
mv ~/filelab/backup/*.txt ~/filelab/logs/

# Move with verbose output
mv -v ~/filelab/logs/*.txt ~/filelab/backup/
\`\`\`

### Exercise 3: Delete Operations
\`\`\`bash
# Delete a single file
rm ~/filelab/backup/config.backup.txt

# Delete with confirmation
rm -i ~/filelab/logs/syslog.txt

# Delete all .txt files in a directory
rm ~/filelab/logs/*.txt

# Delete empty directory
rmdir ~/filelab/empty_dir

# Force delete directory with contents (DANGEROUS)
# rm -rf ~/filelab/source_copy/
\`\`\`

:::warning
**Never run \`rm -rf /\`** - this deletes your entire filesystem. Always double-check paths before recursive deletes.
:::

### Exercise 4: Viewing Files
\`\`\`bash
# View entire file
cat ~/filelab/backup/syslog.txt

# View with line numbers
cat -n ~/filelab/backup/syslog.txt

# View first 3 lines
head -n 3 ~/filelab/backup/syslog.txt

# View last 3 lines
tail -n 3 ~/filelab/backup/syslog.txt

# Follow file in real-time (Ctrl+C to stop)
tail -f ~/filelab/backup/syslog.txt

# Page through file (q to quit, /search, n for next match)
less ~/filelab/backup/syslog.txt

# Count lines, words, characters
wc -l ~/filelab/backup/syslog.txt
wc -w ~/filelab/backup/syslog.txt
wc -c ~/filelab/backup/syslog.txt
\`\`\`

### Exercise 5: Combining Operations
\`\`\`bash
# Find and view a specific file
cat ~/filelab/backup/config.txt

# View the 3rd line of a file
head -n 3 ~/filelab/backup/syslog.txt | tail -n 1

# View lines containing "Error"
grep "Error" ~/filelab/backup/syslog.txt

# View lines with line numbers containing "Error"
grep -n "Error" ~/filelab/backup/syslog.txt

# Sort file contents
sort ~/filelab/backup/syslog.txt

# Remove duplicate lines
sort ~/filelab/backup/syslog.txt | uniq
\`\`\`

:::tip
**Pro tip**: Use \`!!\` to repeat the last command. Use \`!$\` to use the last argument. Use \`history | grep cp\` to find previous copy commands.
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "What is the difference between 'cp' and 'mv' when the source and destination are on the same filesystem?",
        interviewAnswer: "On the same filesystem, 'mv' is essentially instant - it just changes the file's directory entry (inode pointer). 'cp' must read and write the entire file contents, which takes time proportional to file size. On different filesystems, 'mv' also copies the data, making it similar to 'cp' + 'rm'.",
        quiz: [
          {
            question: "What does 'cp -r' do?",
            options: [
              "Copies a file recursively",
              "Copies a directory and all its contents recursively",
              "Removes files while copying",
              "Replaces files without asking"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The -r flag tells cp to copy directories and all their contents recursively."
          },
          {
            question: "What is the difference between 'mv' and 'cp'?",
            options: [
              "They are the same command",
              "mv moves/renames; cp creates a copy and leaves the original",
              "mv is faster than cp",
              "cp works on directories; mv does not"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "mv relocates files (or renames them). cp creates a copy and leaves the original in place."
          },
          {
            question: "What does 'head -n 5 file.txt' show?",
            options: [
              "The last 5 lines",
              "The first 5 lines",
              "Lines 5 through 10",
              "The file size"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "head -n 5 displays the first 5 lines of the file."
          },
          {
            question: "What does 'wc -l' count?",
            options: [
              "The number of words",
              "The number of characters",
              "The number of lines",
              "The number of files"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "wc -l counts the number of lines in a file."
          },
          {
            question: "What is the purpose of 'tail -f'?",
            options: [
              "Shows the last 10 lines and exits",
              "Follows a file and displays new lines as they're added in real-time",
              "Forces deletion of a file",
              "Finds files matching a pattern"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "tail -f follows the file, continuously displaying new lines as they're appended. Used for monitoring logs."
          },
          {
            question: "What does 'rm -i' do differently from 'rm'?",
            options: [
              "It recursively deletes directories",
              "It asks for confirmation before each deletion",
              "It moves files to trash instead of deleting",
              "It only removes empty files"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The -i flag makes rm interactive, prompting for confirmation before each deletion."
          },
          {
            question: "How do you view the last line of a file?",
            options: [
              "head -n 1 file.txt",
              "tail -n 1 file.txt",
              "cat file.txt | last",
              "view file.txt"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "tail -n 1 shows the last line of the file."
          },
          {
            question: "What does 'cat -n' do?",
            options: [
              "Concatenates two files",
              "Displays the file with line numbers",
              "Creates a new file named 'n'",
              "Shows only numbered lines"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "cat -n displays the file content with each line prefixed by its line number."
          },
          {
            question: "What does 'cp -p' preserve that plain 'cp' does not?",
            options: [
              "The file content",
              "File permissions and timestamps",
              "The file name",
              "The file location"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "cp -p preserves file permissions, ownership, and timestamps from the source."
          },
          {
            question: "How do you search for 'Error' in a file using grep?",
            options: [
              "grep 'Error' file.txt",
              "grep -r 'Error' file.txt",
              "grep -n 'Error' file.txt",
              "find 'Error' file.txt"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "grep -n 'Error' file.txt searches for the pattern and displays line numbers with each match. The -r flag is for recursive directory search, not needed for a single file."
          },
          {
            question: "What does 'mv old.txt new.txt' do when old.txt and new.txt are in different directories?",
            options: [
              "Creates a symlink",
              "Moves old.txt to the location of new.txt",
              "Copies old.txt and renames it to new.txt",
              "Swaps the contents of both files"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "mv moves the file to the destination path with the specified name."
          },
          {
            question: "What is 'less' used for?",
            options: [
              "Deleting files",
              "Page through large files one screen at a time",
              "Comparing two files",
              "Finding files by size"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "less is a pager that displays file contents one screen at a time, allowing scrolling and searching."
          }
        ]
      },
      {
        id: "we04d03",
        title: "Simple Scripts and Combining Commands",
        description: "Write basic shell scripts, chain commands together, and build practical automation for daily tasks.",
        type: "practice",
        duration: "50 min",
        content: `## Practice: Shell Scripts and Command Chaining

### Your First Script

\`\`\`bash
#!/bin/bash
# Save as ~/scripts/hello.sh

echo "Hello, $USER!"
echo "Today is $(date +%A)"
echo "You are in $(pwd)"
echo "Your home is $HOME"
\`\`\`

**Make it executable and run**:
\`\`\`bash
chmod +x ~/scripts/hello.sh
~/scripts/hello.sh
\`\`\`

### Script with User Input

\`\`\`bash
#!/bin/bash
# Save as ~/scripts/greet.sh

echo -n "Enter your name: "
read name
echo "Welcome to cybersecurity, $name!"
echo "Your username is: $(whoami)"
echo "Current time: $(date)"
\`\`\`

### Script with Conditionals

\`\`\`bash
#!/bin/bash
# Save as ~/scripts/check_disk.sh

USAGE=$(df -h / | tail -1 | awk '{print $5}' | tr -d '%')

if [ "$USAGE" -gt 90 ]; then
    echo "WARNING: Disk usage is at \${USAGE}%!"
elif [ "$USAGE" -gt 70 ]; then
    echo "CAUTION: Disk usage is at \${USAGE}%"
else
    echo "Disk usage is normal at \${USAGE}%"
fi
\`\`\`

### Command Chaining

**Semicolon (;)**: Run commands sequentially regardless of success
\`\`\`bash
echo "Step 1"; echo "Step 2"; echo "Step 3"
\`\`\`

**AND (&&)**: Run next command only if previous succeeded
\`\`\`bash
mkdir newdir && cd newdir && echo "Success!"
\`\`\`

**OR (||)**: Run next command only if previous failed
\`\`\`bash
cd /nonexistent || echo "Directory not found, creating it..."
mkdir -p /tmp/newdir
\`\`\`

**Pipe (|)**: Send output of one command as input to another
\`\`\`bash
ls -la | grep ".txt"              # List only .txt files
cat /etc/passwd | grep username   # Find a user
ps aux | grep nginx               # Find nginx processes
history | tail -20                # Show last 20 commands
\`\`\`

### Practical Script Examples

**System info script**:
\`\`\`bash
#!/bin/bash
# Save as ~/scripts/sysinfo.sh

echo "=== System Information ==="
echo "Hostname: $(hostname)"
echo "OS: $(uname -o)"
echo "Kernel: $(uname -r)"
echo "Uptime: $(uptime -p)"
echo ""
echo "=== Resources ==="
echo "CPU: $(lscpu | grep 'Model name' | cut -d: -f2 | xargs)"
echo "RAM: $(free -h | grep Mem | awk '{print $2 " total, " $3 " used"}')"
echo "Disk: $(df -h / | tail -1 | awk '{print $3 " used of " $2}')"
\`\`\`

**File search script**:
\`\`\`bash
#!/bin/bash
# Save as ~/scripts/search_files.sh
# Usage: ./search_files.sh <directory> <pattern>

DIR=\${1:-.}
PATTERN=\${2:-*}

echo "Searching for '$PATTERN' in $DIR..."
find "$DIR" -name "$PATTERN" -type f 2>/dev/null | head -20
\`\`\`

### Output Redirection
\`\`\`bash
command > file.txt         # Redirect stdout to file (overwrite)
command >> file.txt        # Redirect stdout to file (append)
command 2> errors.txt      # Redirect stderr to file
command > all.txt 2>&1     # Redirect both stdout and stderr
command > /dev/null 2>&1   # Suppress all output
\`\`\`

### Variables and Arguments
\`\`\`bash
#!/bin/bash
# Script arguments: $0=script name, $1=first arg, $2=second arg

echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "Number of arguments: $#"
echo "All arguments: $@"

# Store output of a command
DATE=\$(date +%Y-%m-%d)
echo "Today's date: $DATE"

# Check if argument was provided
if [ -z "$1" ]; then
    echo "Usage: $0 <filename>"
    exit 1
fi
\`\`\`

:::checkpoint
**Create a backup script**: Write a script that:
1. Creates a timestamped backup directory
2. Copies all .txt files from ~/documents to it
3. Prints a summary of what was backed up
:::

:::tip
**Debug scripts**: Add \`set -x\` at the top to see each command before it runs. Add \`set -e\` to stop on first error. Use \`bash -x script.sh\` to debug without modifying the file.
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "What is the difference between ';' and '&&' when chaining commands?",
        interviewAnswer: "Semicolon (;) runs all commands regardless of whether previous ones succeed. AND (&&) only runs the next command if the previous one succeeded (exit code 0). For example, 'mkdir dir; cd dir' runs both even if mkdir fails, while 'mkdir dir && cd dir' only changes directory if the directory was created successfully.",
        quiz: [
          {
            question: "What does the shebang (#!/bin/bash) do at the top of a script?",
            options: [
              "It prints a message when the script runs",
              "It tells the system which interpreter to use to execute the script",
              "It imports the bash library",
              "It defines the script as a function"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The shebang tells the OS to use /bin/bash to interpret the script."
          },
          {
            question: "What does '&&' do when chaining commands?",
            options: [
              "Runs all commands regardless of success",
              "Runs the next command only if the previous one succeeded",
              "Runs commands in parallel",
              "Runs the previous command again"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "AND (&&) only runs the next command if the previous one returned exit code 0 (success)."
          },
          {
            question: "What does '$#' represent in a bash script?",
            options: [
              "The script name",
              "The first argument",
              "The number of arguments passed to the script",
              "The last argument"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "$# holds the count of arguments passed to the script."
          },
          {
            question: "What does 'command > file.txt' do?",
            options: [
              "Reads file.txt as input",
              "Redirects command output to file.txt (overwriting existing content)",
              "Appends output to file.txt",
              "Deletes file.txt"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "> redirects stdout to a file, overwriting existing content. Use >> to append instead."
          },
          {
            question: "What does 'command 2>&1' do?",
            options: [
              "Runs the command twice",
              "Redirects stderr to the same place as stdout",
              "Increases verbosity",
              "Runs the command with superuser privileges"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "2>&1 redirects stderr (file descriptor 2) to wherever stdout (file descriptor 1) is going."
          },
          {
            question: "How do you make a shell script executable?",
            options: [
              "chmod 644 script.sh",
              "chmod +x script.sh",
              "bash script.sh",
              "execute script.sh"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "chmod +x adds execute permission to the file."
          },
          {
            question: "What does '| grep' do in a command pipeline?",
            options: [
              "Saves the output to a file",
              "Filters the output, showing only lines matching the pattern",
              "Sorts the output alphabetically",
              "Counts the number of lines"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "grep filters input, displaying only lines that match the specified pattern."
          },
          {
            question: "What is the purpose of 'echo -n' in a script?",
            options: [
              "Echoes a newline character",
              "Suppresses the trailing newline, so the cursor stays on the same line",
              "Enables numeric output",
              "Echoes nothing"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "echo -n suppresses the trailing newline, useful for prompts where input appears on the same line."
          },
          {
            question: "What does '\$(command)' do inside a script?",
            options: [
              "Runs the command in a subshell and uses its output as a value",
              "Checks if the command exists",
              "Installs the command",
              "Alias for the command"
            ],
            correctAnswerIndex: 0,
            difficulty: "intermediate",
            explanation: "Command substitution runs the command and captures its output into the variable or string."
          },
          {
            question: "How do you suppress all output from a command?",
            options: [
              "command > /dev/null",
              "command 2> /dev/null",
              "command > /dev/null 2>&1",
              "command --silent"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "Redirecting both stdout and stderr to /dev/null suppresses all output."
          },
          {
            question: "What does 'set -e' do at the top of a script?",
            options: [
              "Enables verbose mode",
              "Stops the script immediately if any command fails",
              "Sets the exit code to 0",
              "Enables debug output"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "set -e (errexit) causes the script to exit immediately if any command returns a non-zero exit code."
          },
          {
            question: "What is the difference between 'echo' and 'printf'?",
            options: [
              "They are identical",
              "printf gives more control over formatting and doesn't add a trailing newline by default",
              "echo is faster than printf",
              "printf only works in bash"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "printf provides formatted output with precise control. echo adds a newline by default and has limited formatting options."
          }
        ]
      }
    ]
  }
];
