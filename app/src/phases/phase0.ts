export const phase0: Module[] = [
  {
    id: "week00",
    title: "What a Computer Is",
    durationText: "Week 0 — Days 1–3",
    focus: "Understand how computers work at a fundamental level",
    output: "Identify hardware components, explain the input-process-output cycle, and compare operating systems",
    topics: [
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
        interviewAnswer: "Input — the malicious URL is data entering the system through the network card (an input device). The browser processes it, stores malicious files (storage), and the malware executes its payload (output).",
        quiz: [
          {
            question: "Which component of the computing cycle performs arithmetic and logic operations?",
            options: [
              "Input — receives data from devices",
              "Processing — the CPU executes operations",
              "Storage — saves data to disk",
              "Output — displays results on screen"
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
            explanation: "RAM is volatile memory — it requires continuous power to maintain stored data. When power is cut, all contents are lost."
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
            explanation: "A keylogger intercepts data at the input stage — it captures keystrokes before they reach their intended destination."
          },
          {
            question: "How many bytes are needed to store the ASCII values for the word 'CYBER'?",
            options: [
              "4 bytes — one less than the character count",
              "5 bytes — one byte per character",
              "10 bytes — two bytes per character",
              "8 bytes — ASCII uses 8-bit encoding"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Each ASCII character is 1 byte. 'CYBER' has 5 characters, so it requires 5 bytes."
          },
          {
            question: "A ransomware attack encrypts a user's files. Which part of the cycle is the encryption occurring in?",
            options: [
              "Input — the malware enters through a phishing email",
              "Processing — the CPU performs the encryption algorithm",
              "Storage — the encrypted files are written to disk",
              "Output — the ransom note is displayed to the user"
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
            explanation: "The GPU specializes in rendering visual output — drawing pixels, text, and graphics on the monitor."
          },
          {
            question: "A network interface card receiving a data packet is an example of which cycle stage?",
            options: [
              "Processing — the NIC computes checksums",
              "Input — data enters the computer from an external source",
              "Storage — the packet is buffered in NIC memory",
              "Output — the NIC sends acknowledgments back"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Receiving data from the network is input — external data is entering the system through the network interface card."
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
              "The GPU — insufficient video memory",
              "The RAM — not enough capacity for all active programs",
              "The PSU — not providing enough wattage",
              "The case — insufficient airflow"
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
        title: "Operating Systems — Windows, Linux, macOS",
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
            explanation: "The kernel is the core of the OS — it manages CPU scheduling, memory, device drivers, and system calls."
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
            explanation: "NTFS stores file metadata in the MFT, and the $LogFile journal records changes — both critical for forensic analysis."
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
    durationText: "Week 1 — Days 1–3",
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
        title: "File Management — Folders, Copy, Paste, Search",
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
            explanation: "Ctrl+X cuts (marks for moving), and Ctrl+V pastes — this moves the file."
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

**3. Check error messages** — Google the exact error text
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
1. \`whoami\` — shows your username
2. \`hostname\` — shows your computer's name
3. \`date\` — shows current date and time
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
    durationText: "Week 2 — Days 1–3",
    focus: "Understand how the internet works and stay safe online",
    output: "Explain networking basics, practice email security, and implement strong authentication habits",
    topics: [
      {
        id: "we02d01",
        title: "How the Internet Works — URLs, HTTP, DNS",
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
            explanation: "This is typosquatting — registering a domain similar to a legitimate one using '1' instead of 'l'."
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
              "The actual email domain is not amazon.com — this is spoofed",
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
              "Do not open — verify with IT through a separate channel",
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
              "Nothing — it was probably harmless"
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
2. **Don't click ads** — type the URL directly
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
        interviewAnswer: "A password manager generates unique, random passwords for every site. If one site is breached, attackers can't use those credentials elsewhere. It also prevents phishing — it won't auto-fill on fake domains. The only password to remember is the master password.",
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
    durationText: "Week 3 — Days 1–3",
    focus: "Navigate and manage Windows and Linux operating systems",
    output: "Use Windows system tools, understand Linux basics, and manage system resources",
    topics: [
      {
        id: "we03d01",
        title: "Windows Desktop, Settings, and File Explorer",
        description: "Master the Windows interface — navigate settings, customize the desktop, and use File Explorer efficiently.",
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
- Type \`C:\\\` — goes to C: drive
- Type \`\\\\server\\share\` — access network shares
- Type \`%temp%\` — opens the Temp folder
- Type \`shell:startup\` — opens the Startup folder

:::warning
**Security**: Windows hides known file extensions by default. This lets malware disguise itself — 'document.pdf.exe' appears as 'document.pdf'. Always enable file extension visibility!
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
        interviewAnswer: "svchost.exe is a legitimate Windows host process. Check: Task Manager → Details → right-click → Go to details → check command line (shows which service DLL it's hosting). Check file location — legitimate runs from C:\\Windows\\System32. Check digital signature in Properties.",
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
        title: "Linux Introduction — Terminal, Commands, Directory Structure",
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
    durationText: "Week 4 — Days 1–3",
    focus: "Build practical command line proficiency through hands-on exercises",
    output: "Navigate filesystems, manipulate files, write simple scripts, and combine commands from the terminal",
    topics: [
      {
        id: "we04d01",
        title: "Navigation Commands — cd, ls, pwd, mkdir, touch",
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
        interviewAnswer: "An absolute path starts from root (/) and specifies the full location — like /home/user/documents. A relative path starts from the current working directory — like ../documents. Absolute paths always work regardless of where you are.",
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
              "An error — curly braces aren't valid"
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
              "An error — brace expansion doesn't work in bash"
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
        title: "File Operations — cp, mv, rm, cat, less, head, tail",
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
**Never run \`rm -rf /\`** — this deletes your entire filesystem. Always double-check paths before recursive deletes.
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
        interviewAnswer: "On the same filesystem, 'mv' is essentially instant — it just changes the file's directory entry (inode pointer). 'cp' must read and write the entire file contents, which takes time proportional to file size. On different filesystems, 'mv' also copies the data, making it similar to 'cp' + 'rm'.",
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
