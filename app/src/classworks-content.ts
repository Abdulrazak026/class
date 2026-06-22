import { ParsedClasswork } from "./components/ClassworkCard";
export const topicClassworks: Record<string, ParsedClasswork[]> = {
  "we00d01": [
    {
      task: `List three main parts of a computer and what each does.`,
      language: "text",
      code: ``,
      expectedOutput: "cpu||ram||storage||motherboard||input||output",
      hint: `Think about processing, memory, and storage.`,
    },
  ],
  "we00d02": [
    {
      task: `What is the difference between hardware and software? Give 2 examples of each.`,
      language: "text",
      code: ``,
      expectedOutput: "hardware||software||physical||program||code",
      hint: `Hardware is physical, software is code.`,
    },
  ],
  "we00d03": [
    {
      task: `Describe what an operating system does in 3 sentences.`,
      language: "text",
      code: ``,
      expectedOutput: "operating system||manage||hardware||software||interface||applications",
      hint: `Think about managing resources and running programs.`,
    },
  ],
  "we00d04": [
    {
      task: `What happens when you press the power button on a computer? List the steps.`,
      language: "text",
      code: ``,
      expectedOutput: "power||bios||boot||loader||kernel||operating system||login",
      hint: `Think POST -> BIOS -> Boot loader -> OS -> Login.`,
    },
  ],
  "we00d05": [
    {
      task: `Name 3 types of storage and rank them from fastest to slowest.`,
      language: "text",
      code: ``,
      expectedOutput: "ram||ssd||hdd||cache||register||speed",
      hint: `Cache/Registers > RAM > SSD > HDD.`,
    },
  ],
  "we01d01": [
    {
      task: `List 5 file extensions and what type of file each represents.`,
      language: "text",
      code: ``,
      expectedOutput: ".docx||.pdf||.jpg||.png||.exe||.zip||.py||.html",
      hint: `Think about documents, images, executables.`,
    },
  ],
  "we01d02": [
    {
      task: `What is a browser and name 3 examples.`,
      language: "text",
      code: ``,
      expectedOutput: "browser||chrome||firefox||edge||safari||web pages",
      hint: `Browsers display web pages.`,
    },
  ],
  "we01d03": [
    {
      task: `How would you organize files for a security course? Describe your folder structure.`,
      language: "text",
      code: ``,
      expectedOutput: "folder||notes||labs||scanning||reporting||scripts||organized",
      hint: `Create a logical hierarchy.`,
    },
  ],
  "we01d04": [
    {
      task: `Explain what Ctrl+C, Ctrl+V, Ctrl+Z, and Ctrl+S do.`,
      language: "text",
      code: ``,
      expectedOutput: "ctrl+c||copy||ctrl+v||paste||ctrl+z||undo||ctrl+s||save",
      hint: `Common keyboard shortcuts.`,
    },
  ],
  "we01d05": [
    {
      task: `What information can you find in File Explorer properties of a file?`,
      language: "text",
      code: ``,
      expectedOutput: "size||type||created||modified||permissions||location",
      hint: `Right-click > Properties to see details.`,
    },
  ],
  "we02d01": [
    {
      task: `What is a URL? Break down: https://www.example.com/page into its parts.`,
      language: "text",
      code: ``,
      expectedOutput: "protocol||domain||path||https||www||example||com||/page",
      hint: `https = protocol, example.com = domain, /page = path.`,
    },
  ],
  "we02d02": [
    {
      task: `Name 3 things you should never share online and explain why.`,
      language: "text",
      code: ``,
      expectedOutput: "password||ssn||address||phone||bank||private||identity theft",
      hint: `Think about what criminals could use.`,
    },
  ],
  "we02d03": [
    {
      task: `How can you tell if a website is safe to enter your credit card?`,
      language: "text",
      code: ``,
      expectedOutput: "https||lock icon||valid certificate||padlock||encrypted",
      hint: `Look for HTTPS and the padlock icon.`,
    },
  ],
  "we02d04": [
    {
      task: `What is phishing? Give an example of a phishing email.`,
      language: "text",
      code: ``,
      expectedOutput: "phishing||fake||email||link||password||urgent||login",
      hint: `Phishing tries to steal your info via fake messages.`,
    },
  ],
  "we02d05": [
    {
      task: `Create a list of 5 strong password rules.`,
      language: "text",
      code: ``,
      expectedOutput: "length||uppercase||lowercase||number||symbol||12||complex",
      hint: `Long, complex, unique passwords.`,
    },
  ],
  "we03d01": [
    {
      task: `Name 3 common operating systems and one difference between them.`,
      language: "text",
      code: ``,
      expectedOutput: "windows||macos||linux||kernel||gui||open source||proprietary",
      hint: `Windows, macOS, Linux are the main ones.`,
    },
  ],
  "we03d02": [
    {
      task: `What is the Task Manager and how do you open it?`,
      language: "text",
      code: ``,
      expectedOutput: "task manager||ctrl+shift+esc||processes||performance||monitor",
      hint: `Ctrl+Shift+Esc opens it directly.`,
    },
  ],
  "we03d03": [
    {
      task: `How do you check what version of Windows you are running?`,
      language: "text",
      code: ``,
      expectedOutput: "winver||settings||about||version||windows||system",
      hint: `Press Win+R, type winver.`,
    },
  ],
  "we03d04": [
    {
      task: `What information does the Windows Event Viewer show?`,
      language: "text",
      code: ``,
      expectedOutput: "event viewer||logs||errors||warnings||security||system||application",
      hint: `Event Viewer logs system events.`,
    },
  ],
  "we03d05": [
    {
      task: `What are the differences between an admin account and a standard user account?`,
      language: "text",
      code: ``,
      expectedOutput: "admin||install||change settings||limited||standard||user account control",
      hint: `Admins can modify system settings.`,
    },
  ],
  "we04d01": [
    {
      task: `Run pwd, ls, and cd in sequence. What does each command do?`,
      language: "bash",
      code: ``,
      expectedOutput: "pwd||print working directory||ls||list||cd||change directory",
      hint: `pwd shows location, ls lists files, cd navigates.`,
    },
  ],
  "we04d02": [
    {
      task: `Create a directory called lab-files, then create 3 empty files inside it using touch.`,
      language: "bash",
      code: ``,
      expectedOutput: "mkdir||touch||lab-files||file1||file2||file3",
      hint: `mkdir creates dir, touch creates files.`,
    },
  ],
  "we04d03": [
    {
      task: `Redirect the output of ls to a file called listing.txt, then view it with cat.`,
      language: "bash",
      code: ``,
      expectedOutput: "ls||>||listing.txt||cat||redirect||output",
      hint: `Use > to redirect output to a file.`,
    },
  ],
  "we04d04": [
    {
      task: `Create a script that prints your username and the current date, make it executable, and run it.`,
      language: "bash",
      code: ``,
      expectedOutput: "#!/bin/bash||echo||whoami||date||chmod||+x||executable",
      hint: `Use the shebang line and chmod +x.`,
    },
  ],
  "we04d05": [
    {
      task: `Find all .txt files in your home directory using a pipe and grep.`,
      language: "bash",
      code: ``,
      expectedOutput: "ls||grep||\.txt||pipe||filter",
      hint: `Pipe ls output into grep to filter.`,
    },
  ],
  "we05d01": [
    {
      task: `Write the command to update all packages on Ubuntu.`,
      language: "bash",
      code: ``,
      expectedOutput: "sudo apt update||sudo apt upgrade||apt||update||upgrade||-y",
      hint: `Use apt update then apt upgrade.`,
    },
  ],
  "we05d02": [
    {
      task: `Verify that Python3, pip, and git are installed. Show the commands.`,
      language: "bash",
      code: ``,
      expectedOutput: "python3 --version||pip --version||git --version||verify",
      hint: `Use --version flag to check each tool.`,
    },
  ],
  "we05d03": [
    {
      task: `Install nmap and verify it works.`,
      language: "bash",
      code: ``,
      expectedOutput: "sudo apt install nmap -y||nmap --version||install||verify",
      hint: `Install with apt, verify with --version.`,
    },
  ],
  "we05d04": [
    {
      task: `Create the lab directory structure: ~/cyber-lab/{scanning,exploitation,reporting,scripts,notes}.`,
      language: "bash",
      code: ``,
      expectedOutput: "mkdir -p||cyber-lab||scanning||exploitation||reporting||scripts||notes",
      hint: `Use the -p flag to create nested directories.`,
    },
  ],
  "we05d05": [
    {
      task: `Initialize a git repo in ~/cyber-lab and make the first commit.`,
      language: "bash",
      code: ``,
      expectedOutput: "git init||git add||git commit||-m||initial commit",
      hint: `git init, git add ., git commit.`,
    },
  ],
  "we06d01": [
    {
      task: `Write a Python script that prints a list of ports to scan.`,
      language: "python",
      code: ``,
      expectedOutput: "print||list||ports||range||for||loop",
      hint: `Use a list and for loop to print ports 20-25.`,
    },
  ],
  "we06d02": [
    {
      task: `Write a script that reads a file and counts how many lines contain 'ERROR'.`,
      language: "python",
      code: ``,
      expectedOutput: "open||read||for||in||if||error||count||+=1",
      hint: `Open file, loop lines, check for ERROR substring.`,
    },
  ],
  "we06d03": [
    {
      task: `Use the requests library to fetch http://example.com and print the status code.`,
      language: "python",
      code: ``,
      expectedOutput: "import requests||get||status_code||200||print",
      hint: `response.status_code returns the HTTP status.`,
    },
  ],
  "we06d04": [
    {
      task: `Generate an MD5 hash of a string using hashlib.`,
      language: "python",
      code: ``,
      expectedOutput: "import hashlib||md5||hexdigest||hash||string",
      hint: `hashlib.md5(b'string').hexdigest()`,
    },
  ],
  "we06d05": [
    {
      task: `Write a script that resolves a domain to an IP address using socket.`,
      language: "python",
      code: ``,
      expectedOutput: "import socket||gethostbyname||print||domain||ip",
      hint: `socket.gethostbyname('example.com')`,
    },
  ],
  "we07d01": [
    {
      task: `List the 7 layers of the OSI model from bottom to top.`,
      language: "text",
      code: ``,
      expectedOutput: "physical||data link||network||transport||session||presentation||application",
      hint: `Remember: Please Do Not Throw Sausage Pizza Away.`,
    },
  ],
  "we07d02": [
    {
      task: `Describe the TCP 3-way handshake. What are the three steps?`,
      language: "text",
      code: ``,
      expectedOutput: "syn||syn-ack||ack||handshake||connection||establish",
      hint: `SYN -> SYN-ACK -> ACK.`,
    },
  ],
  "we07d03": [
    {
      task: `What is the difference between TCP and UDP? Give an example use for each.`,
      language: "text",
      code: ``,
      expectedOutput: "tcp||connection-oriented||reliable||udp||connectionless||fast||http||dns||streaming",
      hint: `TCP: reliable, UDP: fast.`,
    },
  ],
  "we07d04": [
    {
      task: `What port does HTTP use? What about HTTPS? SSH? DNS?`,
      language: "text",
      code: ``,
      expectedOutput: "80||443||22||53||ports||services",
      hint: `HTTP=80, HTTPS=443, SSH=22, DNS=53.`,
    },
  ],
  "we07d05": [
    {
      task: `What is banner grabbing and why is it useful for security?`,
      language: "text",
      code: ``,
      expectedOutput: "banner||grabbing||service||version||fingerprint||nmap||netcat",
      hint: `Banners reveal service versions which may have known vulns.`,
    },
  ],
  "we08d01": [
    {
      task: `Convert the binary 11000000 to decimal.`,
      language: "text",
      code: ``,
      expectedOutput: "192||binary||decimal||conversion",
      hint: `128+64 = 192`,
    },
  ],
  "we08d02": [
    {
      task: `What is the subnet mask for a /24 network? How many usable IPs does it have?`,
      language: "text",
      code: ``,
      expectedOutput: "255.255.255.0||254||subnet||/24||usable||hosts",
      hint: `/24 = 255.255.255.0, 254 usable hosts.`,
    },
  ],
  "we08d03": [
    {
      task: `What is the difference between a private IP and a public IP?`,
      language: "text",
      code: ``,
      expectedOutput: "private||local||10.0.0.0||192.168.0.0||172.16.0.0||public||internet||routable",
      hint: `Private IPs are for internal networks only.`,
    },
  ],
  "we08d04": [
    {
      task: `What does DHCP do? Describe the DORA process.`,
      language: "text",
      code: ``,
      expectedOutput: "dhcp||discover||offer||request||acknowledge||ip||assignment",
      hint: `DORA = Discover, Offer, Request, Acknowledge.`,
    },
  ],
  "we08d05": [
    {
      task: `What does ARP do and why is it important?`,
      language: "text",
      code: ``,
      expectedOutput: "arp||ip||mac||resolution||broadcast||local network",
      hint: `ARP maps IP addresses to MAC addresses.`,
    },
  ],
  "we09d01": [
    {
      task: `Trace the DNS resolution steps for www.example.com.`,
      language: "text",
      code: ``,
      expectedOutput: "browser||cache||resolver||root||tld||authoritative||dns",
      hint: `Cache -> Resolver -> Root -> TLD -> Authoritative.`,
    },
  ],
  "we09d02": [
    {
      task: `Name 4 DNS record types and what each does.`,
      language: "text",
      code: ``,
      expectedOutput: "a||aaaa||cname||mx||txt||ns||ptr||dns records",
      hint: `A=IPv4, AAAA=IPv6, CNAME=alias, MX=mail.`,
    },
  ],
  "we09d03": [
    {
      task: `What are the main HTTP methods and what does each do?`,
      language: "text",
      code: ``,
      expectedOutput: "get||post||put||delete||patch||head||options",
      hint: `GET=read, POST=create, PUT=update, DELETE=remove.`,
    },
  ],
  "we09d04": [
    {
      task: `List 5 HTTP headers and what they control.`,
      language: "text",
      code: ``,
      expectedOutput: "content-type||authorization||user-agent||cookie||cache-control||host||referer",
      hint: `Headers control caching, auth, content type, etc.`,
    },
  ],
  "we09d05": [
    {
      task: `Describe the TLS handshake in 4 main steps.`,
      language: "text",
      code: ``,
      expectedOutput: "client hello||server hello||certificate||key exchange||finished||tls||handshake",
      hint: `ClientHello -> ServerHello/Cert -> Key Exchange -> Secure.`,
    },
  ],
  "we10d01": [
    {
      task: `What is a firewall and what does it do?`,
      language: "text",
      code: ``,
      expectedOutput: "firewall||filter||traffic||rules||allow||deny||network",
      hint: `Firewalls filter traffic based on rules.`,
    },
  ],
  "we10d02": [
    {
      task: `What is the difference between IDS and IPS?`,
      language: "text",
      code: ``,
      expectedOutput: "ids||detect||alert||ips||prevent||block||inline",
      hint: `IDS detects, IPS prevents.`,
    },
  ],
  "we10d03": [
    {
      task: `How does a VPN protect your traffic?`,
      language: "text",
      code: ``,
      expectedOutput: "vpn||encrypt||tunnel||privacy||secure||remote",
      hint: `VPN encrypts traffic and hides your IP.`,
    },
  ],
  "we10d04": [
    {
      task: `Explain the concept of defense in depth.`,
      language: "text",
      code: ``,
      expectedOutput: "layers||multiple||controls||firewall||edr||encryption||iam||training",
      hint: `Multiple independent security layers.`,
    },
  ],
  "we10d05": [
    {
      task: `Configure UFW to allow SSH and HTTP, then enable it.`,
      language: "bash",
      code: ``,
      expectedOutput: "sudo ufw allow 22||sudo ufw allow 80||sudo ufw enable||firewall",
      hint: `ufw allow <port>, then ufw enable.`,
    },
  ],
  "we11d01": [
    {
      task: `Explain the CIA triad and give an example of a breach for each letter.`,
      language: "text",
      code: ``,
      expectedOutput: "confidentiality||integrity||availability||data breach||ransomware||tampering",
      hint: `Confidentiality = secrecy, Integrity = accuracy, Availability = uptime.`,
    },
  ],
  "we11d02": [
    {
      task: `Name 4 types of threat actors and their motivations.`,
      language: "text",
      code: ``,
      expectedOutput: "nation-state||cybercriminal||hacktivist||insider||motivation||political||financial",
      hint: `Different actors have different goals.`,
    },
  ],
  "we11d03": [
    {
      task: `List 3 types of malware and describe what each does.`,
      language: "text",
      code: ``,
      expectedOutput: "virus||worm||trojan||ransomware||spyware||malware",
      hint: `Virus replicates, Worm spreads, Trojan disguises.`,
    },
  ],
  "we11d04": [
    {
      task: `What is social engineering? Name 3 techniques.`,
      language: "text",
      code: ``,
      expectedOutput: "social engineering||phishing||pretexting||baiting||tailgating||manipulation",
      hint: `Manipulating people to reveal information.`,
    },
  ],
  "we11d05": [
    {
      task: `Describe the difference between symmetric and asymmetric encryption.`,
      language: "text",
      code: ``,
      expectedOutput: "symmetric||one key||aes||asymmetric||public||private||rsa||key pair",
      hint: `Symmetric: same key. Asymmetric: public/private pair.`,
    },
  ],
  "we12d01": [
    {
      task: `What is a DDoS attack and how does it work?`,
      language: "text",
      code: ``,
      expectedOutput: "ddos||distributed||denial||service||traffic||overwhelm||botnet",
      hint: `Multiple systems flood a target with traffic.`,
    },
  ],
  "we12d02": [
    {
      task: `What is a man-in-the-middle attack? How can it be prevented?`,
      language: "text",
      code: ``,
      expectedOutput: "mitm||intercept||traffic||tls||encryption||certificate",
      hint: `Attacker intercepts communication between two parties.`,
    },
  ],
  "we12d03": [
    {
      task: `Explain SQL injection in one sentence.`,
      language: "text",
      code: ``,
      expectedOutput: "sql injection||query||database||input||malicious||exploit",
      hint: `Injecting SQL code through user input.`,
    },
  ],
  "we12d04": [
    {
      task: `What is XSS and what are the three types?`,
      language: "text",
      code: ``,
      expectedOutput: "xss||cross-site||scripting||reflected||stored||dom||injection",
      hint: `Reflected, Stored, DOM-based XSS.`,
    },
  ],
  "we12d05": [
    {
      task: `What is a zero-day vulnerability?`,
      language: "text",
      code: ``,
      expectedOutput: "zero-day||unknown||vendor||patch||unpatched||exploit",
      hint: `A vulnerability unknown to the vendor.`,
    },
  ],
  "we13d01": [
    {
      task: `What is IAM and what three components does it cover?`,
      language: "text",
      code: ``,
      expectedOutput: "iam||identification||authentication||authorization||identity||access",
      hint: `IAM = Identification + Authentication + Authorization.`,
    },
  ],
  "we13d02": [
    {
      task: `Name 3 types of MFA factors and give an example of each.`,
      language: "text",
      code: ``,
      expectedOutput: "something you know||password||something you have||phone||something you are||fingerprint",
      hint: `Knowledge, Possession, Inherence factors.`,
    },
  ],
  "we13d03": [
    {
      task: `What are the 3 access control models?`,
      language: "text",
      code: ``,
      expectedOutput: "rbac||dac||mac||role||discretionary||mandatory||access control",
      hint: `RBAC, DAC, MAC.`,
    },
  ],
  "we13d04": [
    {
      task: `What is the principle of least privilege?`,
      language: "text",
      code: ``,
      expectedOutput: "least privilege||minimum||access||required||permissions||security",
      hint: `Users get only the permissions they need.`,
    },
  ],
  "we13d05": [
    {
      task: `What is a DMZ in network security?`,
      language: "text",
      code: ``,
      expectedOutput: "dmz||demilitarized zone||perimeter||web server||firewall||bastion",
      hint: `DMZ sits between internal and external networks.`,
    },
  ],
  "we14d01": [
    {
      task: `What is cloud security and what is the shared responsibility model?`,
      language: "text",
      code: ``,
      expectedOutput: "cloud||security||shared responsibility||provider||customer||iaas||paas||saas",
      hint: `Provider secures the cloud, customer secures in the cloud.`,
    },
  ],
  "we14d02": [
    {
      task: `What is virtualization and how does it improve security?`,
      language: "text",
      code: ``,
      expectedOutput: "virtualization||vm||hypervisor||isolation||snapshot||sandbox",
      hint: `VMs isolate workloads and enable snapshots.`,
    },
  ],
  "we14d03": [
    {
      task: `What is a HIDS and how does it differ from NIDS?`,
      language: "text",
      code: ``,
      expectedOutput: "hids||host||intrusion||detection||nids||network||monitor",
      hint: `HIDS monitors a single host, NIDS monitors the network.`,
    },
  ],
  "we14d04": [
    {
      task: `What is RAID and which types provide redundancy?`,
      language: "text",
      code: ``,
      expectedOutput: "raid||0||1||5||6||10||redundancy||stripe||mirror||parity",
      hint: `RAID 1=mirroring, RAID 5/6=parity.`,
    },
  ],
  "we14d05": [
    {
      task: `Describe the difference between warm, cold, and hot sites for disaster recovery.`,
      language: "text",
      code: ``,
      expectedOutput: "hot site||warm site||cold site||recovery||downtime||replication",
      hint: `Hot=immediate, Warm=hours, Cold=days.`,
    },
  ],
  "we15d01": [
    {
      task: `List the 6 phases of the NIST Incident Response lifecycle.`,
      language: "text",
      code: ``,
      expectedOutput: "preparation||detection||containment||eradication||recovery||lessons learned",
      hint: `NIST IR: Prepare, Detect, Contain, Eradicate, Recover, Learn.`,
    },
  ],
  "we15d02": [
    {
      task: `What is a SIEM and name 3 examples.`,
      language: "text",
      code: ``,
      expectedOutput: "siem||splunk||elastic||wazuh||log||analysis||correlation",
      hint: `SIEM aggregates and analyzes logs.`,
    },
  ],
  "we15d03": [
    {
      task: `What is the difference between a SOAR and a SIEM?`,
      language: "text",
      code: ``,
      expectedOutput: "soar||automation||orchestration||response||siem||detection||playbook",
      hint: `SOAR automates response, SIEM detects.`,
    },
  ],
  "we15d04": [
    {
      task: `What should be included in an incident response plan?`,
      language: "text",
      code: ``,
      expectedOutput: "roles||communication||escalation||containment||recovery||post-mortem",
      hint: `Define roles, procedures, and communication.`,
    },
  ],
  "we15d05": [
    {
      task: `What is the difference between containment and eradication?`,
      language: "text",
      code: ``,
      expectedOutput: "containment||isolate||stop||eradication||remove||clean||malware",
      hint: `Containment stops the spread, eradication removes the threat.`,
    },
  ],
  "we16d01": [
    {
      task: `What is a playbook in cybersecurity?`,
      language: "text",
      code: ``,
      expectedOutput: "playbook||step-by-step||procedure||automation||ir||checklist",
      hint: `A standardized procedure for handling incidents.`,
    },
  ],
  "we16d02": [
    {
      task: `Name 3 log sources you should monitor.`,
      language: "text",
      code: ``,
      expectedOutput: "firewall logs||system logs||application logs||dns logs||authentication logs",
      hint: `Monitor network, system, and app logs.`,
    },
  ],
  "we16d03": [
    {
      task: `What is the difference between a false positive and a false negative?`,
      language: "text",
      code: ``,
      expectedOutput: "false positive||alert||benign||false negative||missed||attack||undetected",
      hint: `FP = wrong alert, FN = missed attack.`,
    },
  ],
  "we16d04": [
    {
      task: `What is a compromise indicator (IOC)? Give 3 examples.`,
      language: "text",
      code: ``,
      expectedOutput: "ioc||hash||ip||domain||indicator||compromise||artifact",
      hint: `IOCs are evidence of a breach.`,
    },
  ],
  "we16d05": [
    {
      task: `What is a post-mortem and why is it important?`,
      language: "text",
      code: ``,
      expectedOutput: "post-mortem||review||lessons||learned||incident||improvement",
      hint: `Analyze what happened and how to prevent recurrence.`,
    },
  ],
  "we17d01": [
    {
      task: `What is the difference between a threat, a vulnerability, and a risk?`,
      language: "text",
      code: ``,
      expectedOutput: "threat||danger||vulnerability||weakness||risk||likelihood||impact",
      hint: `Threat x Vulnerability = Risk.`,
    },
  ],
  "we17d02": [
    {
      task: `What is the NIST Risk Management Framework (RMF)?`,
      language: "text",
      code: ``,
      expectedOutput: "nist||rmf||categorize||select||implement||assess||authorize||monitor",
      hint: `RMF = Categorize, Select, Implement, Assess, Authorize, Monitor.`,
    },
  ],
  "we17d03": [
    {
      task: `What is the difference between quantitative and qualitative risk assessment?`,
      language: "text",
      code: ``,
      expectedOutput: "quantitative||numbers||money||qualitative||ratings||high||medium||low",
      hint: `Quant = numeric, Qual = subjective ratings.`,
    },
  ],
  "we17d04": [
    {
      task: `What is a risk register and what fields does it contain?`,
      language: "text",
      code: ``,
      expectedOutput: "risk register||id||description||likelihood||impact||owner||mitigation",
      hint: `Document that tracks identified risks.`,
    },
  ],
  "we17d05": [
    {
      task: `What is risk treatment and what are the 4 options?`,
      language: "text",
      code: ``,
      expectedOutput: "accept||mitigate||transfer||avoid||risk treatment",
      hint: `Accept, Mitigate, Transfer, Avoid.`,
    },
  ],
  "we18d01": [
    {
      task: `What is GDPR and who does it apply to?`,
      language: "text",
      code: ``,
      expectedOutput: "gdpr||general data protection regulation||eu||personal data||privacy",
      hint: `EU data protection regulation.`,
    },
  ],
  "we18d02": [
    {
      task: `What are data subject rights under GDPR? Name 4.`,
      language: "text",
      code: ``,
      expectedOutput: "access||rectification||erasure||portability||restriction||object||gdpr",
      hint: `Right to access, correct, delete, port data.`,
    },
  ],
  "we18d03": [
    {
      task: `What is a data breach notification and what are the requirements?`,
      language: "text",
      code: ``,
      expectedOutput: "breach||notification||72 hours||gdpr||dpa||data subject||supervisory",
      hint: `Must notify regulator within 72 hours.`,
    },
  ],
  "we18d04": [
    {
      task: `What is a Data Protection Impact Assessment (DPIA)?`,
      language: "text",
      code: ``,
      expectedOutput: "dpia||impact||assessment||privacy||risk||high risk||processing",
      hint: `Required for high-risk data processing activities.`,
    },
  ],
  "we18d05": [
    {
      task: `What is the difference between a Data Controller and a Data Processor?`,
      language: "text",
      code: ``,
      expectedOutput: "controller||determines||purpose||processor||processes||on behalf||gdpr",
      hint: `Controller decides, Processor acts on instructions.`,
    },
  ],
  "we19d01": [
    {
      task: `What is AES and what key sizes does it support?`,
      language: "text",
      code: ``,
      expectedOutput: "aes||advanced encryption standard||128||192||256||symmetric||block cipher",
      hint: `AES = 128, 192, or 256-bit symmetric encryption.`,
    },
  ],
  "we19d02": [
    {
      task: `OpenSSL: Generate an RSA private key.`,
      language: "bash",
      code: ``,
      expectedOutput: "openssl genrsa -out private.pem 2048||rsa||key||2048",
      hint: `openssl genrsa -out key.pem 2048`,
    },
  ],
  "we19d03": [
    {
      task: `OpenSSL: Extract the public key from a private key.`,
      language: "bash",
      code: ``,
      expectedOutput: "openssl rsa -in private.pem -pubout -out public.pem||rsa||public||key",
      hint: `openssl rsa -in private.pem -pubout -out public.pem`,
    },
  ],
  "we19d04": [
    {
      task: `What is Diffie-Hellman key exchange used for?`,
      language: "text",
      code: ``,
      expectedOutput: "diffie-hellman||key||exchange||secure||shared secret||public channel",
      hint: `Enables two parties to securely agree on a shared key.`,
    },
  ],
  "we19d05": [
    {
      task: `What is SHA-256 and how is it different from encryption?`,
      language: "text",
      code: ``,
      expectedOutput: "sha-256||hash||one-way||fixed||output||integrity||vs encryption",
      hint: `Hashing is one-way, encryption is two-way.`,
    },
  ],
  "we20d01": [
    {
      task: `What is a digital signature and how does it work?`,
      language: "text",
      code: ``,
      expectedOutput: "digital signature||private key||sign||public key||verify||non-repudiation",
      hint: `Sign with private key, verify with public key.`,
    },
  ],
  "we20d02": [
    {
      task: `What is a Certificate Authority (CA) and what does it do?`,
      language: "text",
      code: ``,
      expectedOutput: "ca||certificate authority||issues||certificates||verifies||identity||pki",
      hint: `CA issues and signs digital certificates.`,
    },
  ],
  "we20d03": [
    {
      task: `What is a self-signed certificate and when would you use one?`,
      language: "text",
      code: ``,
      expectedOutput: "self-signed||certificate||lab||testing||internal||no ca",
      hint: `Used for testing/internal, not trusted by browsers.`,
    },
  ],
  "we20d04": [
    {
      task: `What is a certificate chain?`,
      language: "text",
      code: ``,
      expectedOutput: "chain||root ca||intermediate ca||leaf||trust||hierarchy",
      hint: `Root CA -> Intermediate CA -> Server Certificate.`,
    },
  ],
  "we20d05": [
    {
      task: `What is Let's Encrypt and why is it important?`,
      language: "text",
      code: ``,
      expectedOutput: "lets encrypt||free||tls||automated||certbot||certificate authority",
      hint: `Free automated CA that helps encrypt the web.`,
    },
  ],
  "we21d01": [
    {
      task: `What is SQL injection and what is the simplest test string?`,
      language: "text",
      code: ``,
      expectedOutput: "sql injection||' or 1=1--||'--||login bypass||input||query",
      hint: `Test with ' OR 1=1-- as a username.`,
    },
  ],
  "we21d02": [
    {
      task: `Set up Burp Suite proxy and configure your browser to use it.`,
      language: "bash",
      code: ``,
      expectedOutput: "burp||proxy||127.0.0.1:8080||intercept||certificate||ca",
      hint: `Configure browser proxy to 127.0.0.1:8080.`,
    },
  ],
  "we21d03": [
    {
      task: `What is the difference between Burp Proxy, Repeater, and Intruder?`,
      language: "text",
      code: ``,
      expectedOutput: "proxy||intercept||repeater||modify||resend||intruder||fuzz||brute",
      hint: `Proxy intercepts, Repeater modifies/retries, Intruder automates.`,
    },
  ],
  "we21d04": [
    {
      task: `Write a SQL injection payload that bypasses a login form.`,
      language: "sql",
      code: ``,
      expectedOutput: "' OR '1'='1' --||admin' --||sql injection||login bypass",
      hint: `Try: ' OR '1'='1' --`,
    },
  ],
  "we21d05": [
    {
      task: `What does the UNION keyword do in SQL injection?`,
      language: "text",
      code: ``,
      expectedOutput: "union||sql||rows||extract||data||columns||database",
      hint: `UNION combines results from two SELECT queries.`,
    },
  ],
  "we22d01": [
    {
      task: `What is blind SQL injection and how is it different from regular SQLi?`,
      language: "text",
      code: ``,
      expectedOutput: "blind||sqli||boolean||time||no output||inference||response",
      hint: `Blind SQLi infers data from true/false or time delays.`,
    },
  ],
  "we22d02": [
    {
      task: `Write a boolean-based blind SQLi test.`,
      language: "sql",
      code: ``,
      expectedOutput: "' AND 1=1--||' AND 1=2--||blind||boolean||true||false",
      hint: `Compare responses for ' AND 1=1 vs ' AND 1=2.`,
    },
  ],
  "we22d03": [
    {
      task: `What is time-based SQL injection?`,
      language: "text",
      code: ``,
      expectedOutput: "time-based||waitfor||delay||sleep||sqli||blind||response time",
      hint: `Uses WAITFOR DELAY or SLEEP to infer data.`,
    },
  ],
  "we22d04": [
    {
      task: `What is error-based SQL injection?`,
      language: "text",
      code: ``,
      expectedOutput: "error-based||sqli||error message||database||extract||information",
      hint: `Extracts data from database error messages.`,
    },
  ],
  "we22d05": [
    {
      task: `How do you find the number of columns in a SQL injection UNION attack?`,
      language: "sql",
      code: ``,
      expectedOutput: "UNION SELECT NULL,NULL,NULL--||ORDER BY 1--||columns||null",
      hint: `Use ORDER BY or NULL columns to find the right count.`,
    },
  ],
  "we23d01": [
    {
      task: `What is XSS and what is the simplest test payload?`,
      language: "text",
      code: ``,
      expectedOutput: "xss||cross-site||scripting||<script>alert(1)</script>||payload",
      hint: `Test with <script>alert(1)</script>.`,
    },
  ],
  "we23d02": [
    {
      task: `What is the difference between reflected and stored XSS?`,
      language: "text",
      code: ``,
      expectedOutput: "reflected||url||parameter||stored||database||persistent||every visitor",
      hint: `Reflected appears in URL, Stored is saved on server.`,
    },
  ],
  "we23d03": [
    {
      task: `Craft a reflected XSS payload that displays a dialog.`,
      language: "text",
      code: ``,
      expectedOutput: "<script>alert('xss')</script>||%3Cscript%3E||reflected||payload",
      hint: `Encode the payload if needed.`,
    },
  ],
  "we23d04": [
    {
      task: `What is DOM-based XSS?`,
      language: "text",
      code: ``,
      expectedOutput: "dom-based||client-side||javascript||document||write||innerHTML||sink",
      hint: `XSS that occurs entirely in the browser's DOM.`,
    },
  ],
  "we23d05": [
    {
      task: `Where can XSS payloads be injected beyond JavaScript?`,
      language: "text",
      code: ``,
      expectedOutput: "html||attribute||onclick||onerror||href||src||event handler||img",
      hint: `Attributes like onerror, onclick, href can execute JS.`,
    },
  ],
  "we24d01": [
    {
      task: `What is HTML entity encoding and how does it prevent XSS?`,
      language: "text",
      code: ``,
      expectedOutput: "html entity||encode||&lt;||&gt;||&amp;||sanitize||output encoding",
      hint: `Encodes < > & to prevent script execution.`,
    },
  ],
  "we24d02": [
    {
      task: `How would you bypass a filter that blocks <script> tags?`,
      language: "text",
      code: ``,
      expectedOutput: "<img src=x onerror=alert(1)>||<body onload=>||<svg onload=>||bypass||xss",
      hint: `Use other tags like img, body, or svg with event handlers.`,
    },
  ],
  "we24d03": [
    {
      task: `What is an XSS context and why does it matter?`,
      language: "text",
      code: ``,
      expectedOutput: "context||html||attribute||javascript||url||encoding||escape",
      hint: `Different contexts require different payloads.`,
    },
  ],
  "we24d04": [
    {
      task: `Bypass a filter that removes 'script' (case-insensitive).`,
      language: "text",
      code: ``,
      expectedOutput: "<ScRiPt>alert(1)</ScRiPt>||<img src=x onerror=alert(1)>||mixed case||bypass",
      hint: `Try mixed case or alternate tags.`,
    },
  ],
  "we24d05": [
    {
      task: `What is Content Security Policy (CSP) and how does it mitigate XSS?`,
      language: "text",
      code: ``,
      expectedOutput: "csp||content security policy||header||allow||script-src||restrict||source",
      hint: `CSP restricts which scripts can execute.`,
    },
  ],
  "we25d01": [
    {
      task: `What is a password reset poisoning attack?`,
      language: "text",
      code: ``,
      expectedOutput: "password reset||poisoning||host header||token||email||reset link",
      hint: `Attacker modifies the Host header to redirect the reset link.`,
    },
  ],
  "we25d02": [
    {
      task: `How does a host header attack work on password reset?`,
      language: "text",
      code: ``,
      expectedOutput: "host header||manipulation||reset||link||redirect||attacker||server",
      hint: `Server trusts the Host header to generate the reset URL.`,
    },
  ],
  "we25d03": [
    {
      task: `What is dangling markup attack?`,
      language: "text",
      code: ``,
      expectedOutput: "dangling markup||html injection||attribute||unclosed||exfiltrate||csrf token",
      hint: `Unclosed HTML tag captures subsequent content.`,
    },
  ],
  "we25d04": [
    {
      task: `What is the difference between authentication and authorization?`,
      language: "text",
      code: ``,
      expectedOutput: "authentication||who you are||authorization||what you can do||identity||permissions",
      hint: `Authn = identity, Authz = permissions.`,
    },
  ],
  "we25d05": [
    {
      task: `What is a brute force attack and how do you prevent it?`,
      language: "text",
      code: ``,
      expectedOutput: "brute force||password||cracking||rate limiting||account lockout||mfa",
      hint: `Mitigate with rate limiting, lockout, and MFA.`,
    },
  ],
  "we26d01": [
    {
      task: `What does JWT stand for and what are its three parts?`,
      language: "text",
      code: ``,
      expectedOutput: "jwt||json web token||header||payload||signature||base64||claims",
      hint: `Header.Payload.Signature`,
    },
  ],
  "we26d02": [
    {
      task: `What happens if a server does not verify the JWT signature?`,
      language: "text",
      code: ``,
      expectedOutput: "jwt||signature||verify||tamper||modify||none algorithm||attack",
      hint: `Attacker can modify the payload without detection.`,
    },
  ],
  "we26d03": [
    {
      task: `What is the JWT 'none' algorithm attack?`,
      language: "text",
      code: ``,
      expectedOutput: "none||algorithm||jwt||header||alg||unverified||signature bypass",
      hint: `Setting alg to 'none' bypasses signature verification.`,
    },
  ],
  "we26d04": [
    {
      task: `What is IDOR (Insecure Direct Object Reference)?`,
      language: "text",
      code: ``,
      expectedOutput: "idor||object||reference||direct||access control||user id||parameter",
      hint: `Changing a parameter to access another user's data.`,
    },
  ],
  "we26d05": [
    {
      task: `What is horizontal vs vertical privilege escalation?`,
      language: "text",
      code: ``,
      expectedOutput: "horizontal||same level||different user||vertical||higher||privilege||admin",
      hint: `Horizontal = same role different user, Vertical = higher role.`,
    },
  ],
  "we27d01": [
    {
      task: `What is API recon and what tools would you use?`,
      language: "text",
      code: ``,
      expectedOutput: "api||recon||discovery||endpoints||gobuster||swagger||postman||documentation",
      hint: `Discover API endpoints and documentation.`,
    },
  ],
  "we27d02": [
    {
      task: `What is mass assignment vulnerability?`,
      language: "text",
      code: ``,
      expectedOutput: "mass assignment||api||parameter||role||is_admin||privilege escalation",
      hint: `API binds all parameters including sensitive ones.`,
    },
  ],
  "we27d03": [
    {
      task: `What is server-side parameter pollution?`,
      language: "text",
      code: ``,
      expectedOutput: "parameter||pollution||sspp||override||duplicate||api||injection",
      hint: `Injecting duplicate parameters to override server values.`,
    },
  ],
  "we27d04": [
    {
      task: `How would you discover hidden API endpoints?`,
      language: "text",
      code: ``,
      expectedOutput: "gobuster||api||swagger.json||common paths||/api/||/v1/||endpoints",
      hint: `Brute force common API paths and look for docs.`,
    },
  ],
  "we27d05": [
    {
      task: `What status code indicates an API is not properly securing access?`,
      language: "text",
      code: ``,
      expectedOutput: "200||unauthenticated||no auth||403||bypass||status code||api Security",
      hint: `A 200 without auth indicates missing access controls.`,
    },
  ],
  "we28d01": [
    {
      task: `What is SSRF and what can an attacker do with it?`,
      language: "text",
      code: ``,
      expectedOutput: "ssrf||server-side||request||forgery||internal||localhost||127.0.0.1",
      hint: `Trick the server into making requests to internal resources.`,
    },
  ],
  "we28d02": [
    {
      task: `Test for basic SSRF: try to make the server request itself.`,
      language: "text",
      code: ``,
      expectedOutput: "http://127.0.0.1||http://localhost||http://[::1]||ssrf||internal",
      hint: `Pass internal IPs as URL parameters.`,
    },
  ],
  "we28d03": [
    {
      task: `What is prompt injection in AI systems?`,
      language: "text",
      code: ``,
      expectedOutput: "prompt injection||ai||llm||override||instructions||ignore||jailbreak",
      hint: `Injecting instructions that override the AI's system prompt.`,
    },
  ],
  "we28d04": [
    {
      task: `How can AI-powered scanners be exploited by attackers?`,
      language: "text",
      code: ``,
      expectedOutput: "ai scanner||tool||generate||payload||indirect injection||poison",
      hint: `Attackers craft inputs that trigger malicious AI-suggested actions.`,
    },
  ],
  "we28d05": [
    {
      task: `What is indirect prompt injection?`,
      language: "text",
      code: ``,
      expectedOutput: "indirect||prompt injection||third party||data||email||web page||context",
      hint: `Malicious content injected through external data sources.`,
    },
  ],
  "we29d01": [
    {
      task: `Write a finding for a web security audit. Include: vulnerability name, impact, remediation.`,
      language: "text",
      code: ``,
      expectedOutput: "sql injection||critical||input validation||parameterized queries||remediation",
      hint: `Template: Vulnerability, Impact, Remediation.`,
    },
  ],
  "we29d02": [
    {
      task: `List the 5 sections of a penetration testing report.`,
      language: "text",
      code: ``,
      expectedOutput: "executive summary||scope||findings||critical||high||medium||low||remediation||appendix",
      hint: `Executive summary, Scope, Findings, Remediation, Appendix.`,
    },
  ],
  "we29d03": [
    {
      task: `Prioritize these vulnerabilities: SQLi, Missing HSTS header, Self-XSS. Explain your order.`,
      language: "text",
      code: ``,
      expectedOutput: "critical||high||low||sql injection||hsts||self-xss||risk||impact",
      hint: `SQLi = critical, HSTS = medium, Self-XSS = low.`,
    },
  ],
  "we29d04": [
    {
      task: `What should you NEVER do during a pentest?`,
      language: "text",
      code: ``,
      expectedOutput: "social engineering||without permission||data exfiltration||production||availability||scope",
      hint: `Never exceed scope or impact production systems.`,
    },
  ],
  "we29d05": [
    {
      task: `What is responsible disclosure?`,
      language: "text",
      code: ``,
      expectedOutput: "responsible disclosure||vendor||90 days||report||fix||public||coordinated",
      hint: `Report to vendor, give time to fix, then publish.`,
    },
  ],
  "we30d01": [
    {
      task: `Run a SYN scan on localhost ports 1-1000.`,
      language: "bash",
      code: ``,
      expectedOutput: "nmap -sS -p 1-1000 localhost||syn||stealth||scan||ports",
      hint: `nmap -sS -p 1-1000 localhost`,
    },
  ],
  "we30d02": [
    {
      task: `Run a service version detection scan on a target.`,
      language: "bash",
      code: ``,
      expectedOutput: "nmap -sV 192.168.1.1||version||detection||service||nmap",
      hint: `nmap -sV <target>`,
    },
  ],
  "we30d03": [
    {
      task: `What is the difference between a SYN scan and a connect scan?`,
      language: "text",
      code: ``,
      expectedOutput: "syn||half-open||stealth||connect||full||tcp handshake||nmap",
      hint: `SYN scan doesn't complete handshake, connect scan does.`,
    },
  ],
  "we30d04": [
    {
      task: `Use an NSE script to check for vulnerable services.`,
      language: "bash",
      code: ``,
      expectedOutput: "nmap --script vuln 192.168.1.1||nse||vulnerability||script||scan",
      hint: `nmap --script vuln <target>`,
    },
  ],
  "we30d05": [
    {
      task: `What is OS detection in Nmap and how does it work?`,
      language: "text",
      code: ``,
      expectedOutput: "os detection||fingerprint||ttl||tcp stack||nmap -O||guess",
      hint: `Nmap analyzes TCP/IP stack behavior to identify the OS.`,
    },
  ],
  "we31d01": [
    {
      task: `Start Metasploit and search for a module related to SMB.`,
      language: "bash",
      code: ``,
      expectedOutput: "msfconsole||search smb||msf||module||smb||vulnerability",
      hint: `msfconsole then search smb.`,
    },
  ],
  "we31d02": [
    {
      task: `What are the 6 main directories in Metasploit's module structure?`,
      language: "text",
      code: ``,
      expectedOutput: "exploit||auxiliary||post||payload||encoder||nop||metasploit",
      hint: `exploit, auxiliary, post, payload, encoder, nop.`,
    },
  ],
  "we31d03": [
    {
      task: `What is a Meterpreter payload and why is it powerful?`,
      language: "text",
      code: ``,
      expectedOutput: "meterpreter||payload||interactive||shell||extensions||upload||download||migrate",
      hint: `Advanced payload with file system, network, and extension capabilities.`,
    },
  ],
  "we31d04": [
    {
      task: `Select a payload and set the LHOST option in Metasploit.`,
      language: "bash",
      code: ``,
      expectedOutput: "set payload windows/meterpreter/reverse_tcp||set lhost 192.168.1.100||options||msf",
      hint: `Use set payload, set LHOST, show options.`,
    },
  ],
  "we31d05": [
    {
      task: `What is the difference between a staged and stageless payload?`,
      language: "text",
      code: ``,
      expectedOutput: "staged||small||download||stage2||stageless||all-in-one||self-contained",
      hint: `Staged sends a small stager that downloads the rest.`,
    },
  ],
  "we32d01": [
    {
      task: `List 4 hash modes in Hashcat and what they crack.`,
      language: "text",
      code: ``,
      expectedOutput: "0||md5||1000||ntlm||1400||sha256||3200||bcrypt||hashcat||mode",
      hint: `MD5=0, NTLM=1000, SHA256=1400, bcrypt=3200.`,
    },
  ],
  "we32d02": [
    {
      task: `What is a wordlist attack vs a brute force attack?`,
      language: "text",
      code: ``,
      expectedOutput: "wordlist||dictionary||common passwords||brute force||all combos||keyspace",
      hint: `Wordlist uses known passwords, brute force tries all combinations.`,
    },
  ],
  "we32d03": [
    {
      task: `Use Hashcat to crack MD5 hashes with rockyou.txt.`,
      language: "bash",
      code: ``,
      expectedOutput: "hashcat -m 0 -a 0 hashes.txt rockyou.txt||md5||hashcat||crack||mode 0",
      hint: `hashcat -m 0 -a 0 hashes.txt <wordlist>`,
    },
  ],
  "we32d04": [
    {
      task: `What is a rules-based attack in Hashcat?`,
      language: "text",
      code: ``,
      expectedOutput: "rules||transform||append||prepend||leet||substitute||best64",
      hint: `Rules modify words to try common variations.`,
    },
  ],
  "we32d05": [
    {
      task: `Use John to crack a shadow file.`,
      language: "bash",
      code: ``,
      expectedOutput: "unshadow passwd shadow > hashes.txt && john hashes.txt||john||unshadow||crack",
      hint: `Use unshadow then john.`,
    },
  ],
  "we33d01": [
    {
      task: `What is privilege escalation and what are the two types?`,
      language: "text",
      code: ``,
      expectedOutput: "vertical||higher||privilege||horizontal||same level||different user||escalation",
      hint: `Vertical = getting more power, Horizontal = accessing other users.`,
    },
  ],
  "we33d02": [
    {
      task: `Check for SUID binaries on Linux.`,
      language: "bash",
      code: ``,
      expectedOutput: "find / -perm -4000 2>/dev/null||suid||setuid||binary||elevation",
      hint: `find / -perm -4000 shows SUID files.`,
    },
  ],
  "we33d03": [
    {
      task: `What is sudo privilege escalation?`,
      language: "text",
      code: ``,
      expectedOutput: "sudo||misconfiguration||sudo -l||exploit||gtfobins||root",
      hint: `Misconfigured sudo entries can allow command execution as root.`,
    },
  ],
  "we33d04": [
    {
      task: `Check what sudo commands the current user can run.`,
      language: "bash",
      code: ``,
      expectedOutput: "sudo -l||sudo||privileges||commands||root",
      hint: `sudo -l shows available sudo commands.`,
    },
  ],
  "we33d05": [
    {
      task: `What is LinPEAS and what does it do?`,
      language: "text",
      code: ``,
      expectedOutput: "linpeas||enumeration||privilege escalation||automated||check||linux||vulnerabilities",
      hint: `LinPEAS automates Linux priv-esc enumeration.`,
    },
  ],
  "we34d01": [
    {
      task: `What is Active Directory and what is its main purpose?`,
      language: "text",
      code: ``,
      expectedOutput: "active directory||domain||controller||centralized||authentication||group policy",
      hint: `AD centrally manages users, computers, and policies.`,
    },
  ],
  "we34d02": [
    {
      task: `What is LDAP used for in Active Directory?`,
      language: "text",
      code: ``,
      expectedOutput: "ldap||lightweight directory access protocol||query||authenticate||directory",
      hint: `LDAP queries and modifies the AD directory.`,
    },
  ],
  "we34d03": [
    {
      task: `What is Kerberos and how does it authenticate users?`,
      language: "text",
      code: ``,
      expectedOutput: "kerberos||ticket||tgt||tgs||authentication||kdc||active directory",
      hint: `Kerberos uses tickets for authentication.`,
    },
  ],
  "we34d04": [
    {
      task: `What is Kerberoasting?`,
      language: "text",
      code: ``,
      expectedOutput: "kerberoasting||spn||tgs||hash||crack||service account||ad attack",
      hint: `Request TGS tickets for service accounts and crack offline.`,
    },
  ],
  "we34d05": [
    {
      task: `What is AS-REP Roasting?`,
      language: "text",
      code: ``,
      expectedOutput: "as-rep||roasting||pre-authentication||disabled||hash||krb5asrep",
      hint: `Targets accounts without Kerberos pre-authentication enabled.`,
    },
  ],
  "we35d01": [
    {
      task: `Write a one-paragraph summary of what you learned in Phase 1.`,
      language: "text",
      code: ``,
      expectedOutput: "network||scanning||recon||tools||nmap||metasploit||cracking||phases||review",
      hint: `Summarize your Phase 1 learning.`,
    },
  ],
  "we35d02": [
    {
      task: `Create a markdown template for a lab writeup.`,
      language: "text",
      code: ``,
      expectedOutput: "# lab||## objective||## steps||## findings||## screenshots||template",
      hint: `Include: Objective, Steps, Findings, Screenshots.`,
    },
  ],
  "we35d03": [
    {
      task: `Write a git commit message for a new Nmap scan script.`,
      language: "text",
      code: ``,
      expectedOutput: "add||nmap||scan||script||feat||description||commit message",
      hint: `Format: type(scope): description`,
    },
  ],
  "we35d04": [
    {
      task: `Organize your notes from the last 5 weeks into markdown files.`,
      language: "bash",
      code: ``,
      expectedOutput: "mkdir -p ~/cyber-lab/notes/phase1||mv||notes||organize||structure",
      hint: `Create phase directories and move notes.`,
    },
  ],
  "we35d05": [
    {
      task: `What is the most important skill you developed so far? Explain why.`,
      language: "text",
      code: ``,
      expectedOutput: "reflection||skill||terminal||python||nmap||metasploit||cracking||growth",
      hint: `Reflect on your progress and key learnings.`,
    },
  ],
  "we36d01": [
    {
      task: `What is Wazuh and what are its main components?`,
      language: "text",
      code: ``,
      expectedOutput: "wazuh||siem||edr||manager||agent||indexer||dashboard||security",
      hint: `Wazuh = Manager + Indexer + Dashboard + Agents.`,
    },
  ],
  "we36d02": [
    {
      task: `What is the difference between Wazuh Manager and Wazuh Agent?`,
      language: "text",
      code: ``,
      expectedOutput: "manager||server||central||rule||agent||endpoint||collect||send",
      hint: `Manager processes data, Agent collects from endpoints.`,
    },
  ],
  "we36d03": [
    {
      task: `Install the Wazuh agent on a Linux system.`,
      language: "bash",
      code: ``,
      expectedOutput: "wazuh||agent||install||curl||repository||apt||yum",
      hint: `Add Wazuh repo, install wazuh-agent, configure and start.`,
    },
  ],
  "we36d04": [
    {
      task: `Check the status of the Wazuh agent.`,
      language: "bash",
      code: ``,
      expectedOutput: "systemctl status wazuh-agent||service||status||running||active||wazuh",
      hint: `systemctl status wazuh-agent`,
    },
  ],
  "we36d05": [
    {
      task: `What events does Wazuh collect by default?`,
      language: "text",
      code: ``,
      expectedOutput: "system logs||auth logs||syscheck||file integrity||vulnerability||events",
      hint: `Wazuh collects syslog, auth logs, file changes, etc.`,
    },
  ],
  "we37d01": [
    {
      task: `What is Syslog and what are its severity levels?`,
      language: "text",
      code: ``,
      expectedOutput: "syslog||facility||severity||0||emerg||7||debug||logging||protocol",
      hint: `0=Emergency, 1=Alert, 2=Critical, 3=Error, 4=Warning, 5=Notice, 6=Info, 7=Debug.`,
    },
  ],
  "we37d02": [
    {
      task: `Search for SSH failed login attempts in auth.log.`,
      language: "bash",
      code: ``,
      expectedOutput: "grep 'Failed password' /var/log/auth.log||ssh||failed||auth||brute force",
      hint: `grep for 'Failed password' in /var/log/auth.log.`,
    },
  ],
  "we37d03": [
    {
      task: `What is Sigma and how does it compare to YARA?`,
      language: "text",
      code: ``,
      expectedOutput: "sigma||generic||log||detection||rules||yara||files||sigma converts",
      hint: `Sigma = log detection rules like YARA = file detection.`,
    },
  ],
  "we37d04": [
    {
      task: `Search for sudo commands in auth.log.`,
      language: "bash",
      code: ``,
      expectedOutput: "grep 'sudo' /var/log/auth.log||sudo||command||audit||user",
      hint: `Grep for sudo in auth.log to see privilege use.`,
    },
  ],
  "we37d05": [
    {
      task: `Write a simple Sigma rule that detects multiple failed logins.`,
      language: "text",
      code: ``,
      expectedOutput: "title||detection||selection||event_id||4625||condition||sigma",
      hint: `Rule: selection for EventID 4625 with count > 5.`,
    },
  ],
  "we38d01": [
    {
      task: `What are the 3 severity levels in SOC triage and how do you classify each?`,
      language: "text",
      code: ``,
      expectedOutput: "critical||high||medium||low||impact||scope||data sensitivity||classification",
      hint: `Critical = widespread/high impact, High = significant, Medium = limited, Low = informational.`,
    },
  ],
  "we38d02": [
    {
      task: `Describe the escalation process in a SOC.`,
      language: "text",
      code: ``,
      expectedOutput: "l1||triage||l2||investigation||l3||hunting||escalation||soc",
      hint: `L1 triage, L2 investigate, L3 advanced analysis.`,
    },
  ],
  "we38d03": [
    {
      task: `What information should a SOC ticket contain?`,
      language: "text",
      code: ``,
      expectedOutput: "timestamp||source||destination||event||severity||description||analyst||actions",
      hint: `Ticket = Who, What, When, Where, Severity, Actions taken.`,
    },
  ],
  "we38d04": [
    {
      task: `What is the difference between an alert and an incident?`,
      language: "text",
      code: ``,
      expectedOutput: "alert||notification||possible||incident||confirmed||breach||investigation",
      hint: `Alert = potential, Incident = confirmed malicious activity.`,
    },
  ],
  "we38d05": [
    {
      task: `What is a SIEM correlation rule? Give an example.`,
      language: "text",
      code: ``,
      expectedOutput: "correlation||rule||multiple events||pattern||detect||brute force||failed login",
      hint: `Example: 5 failed logins in 1 minute = brute force alert.`,
    },
  ],
  "we39d01": [
    {
      task: `What is the MITRE ATT&CK framework?`,
      language: "text",
      code: ``,
      expectedOutput: "mitre||attack||knowledge base||tactics||techniques||adversary||behavior",
      hint: `ATT&CK catalogs adversary tactics and techniques.`,
    },
  ],
  "we39d02": [
    {
      task: `Name 5 tactics from the MITRE ATT&CK enterprise matrix.`,
      language: "text",
      code: ``,
      expectedOutput: "reconnaissance||resource development||initial access||execution||persistence||privilege escalation||defense evasion||credential access||discovery||lateral movement||collection||command and control||exfiltration||impact",
      hint: `Pick any 5 from the attack chain.`,
    },
  ],
  "we39d03": [
    {
      task: `Map a phishing attack to MITRE ATT&CK techniques.`,
      language: "text",
      code: ``,
      expectedOutput: "phishing||t1566||initial access||spearphishing||link||attachment",
      hint: `Phishing = T1566 (Initial Access).`,
    },
  ],
  "we39d04": [
    {
      task: `What is a threat intelligence feed and how is it used?`,
      language: "text",
      code: ``,
      expectedOutput: "threat intel||feed||ioc||ip||domain||hash||blocklist||detection",
      hint: `Automated feeds of known malicious indicators.`,
    },
  ],
  "we39d05": [
    {
      task: `What is the Cyber Kill Chain and how does it differ from ATT&CK?`,
      language: "text",
      code: ``,
      expectedOutput: "kill chain||lockheed martin||7 steps||recon||weaponize||deliver||exploit||c2||actions",
      hint: `Kill Chain = linear, ATT&CK = matrix/non-linear.`,
    },
  ],
  "we40d01": [
    {
      task: `What is the difference between signature-based and behavior-based detection?`,
      language: "text",
      code: ``,
      expectedOutput: "signature||known||pattern||match||behavior||anomaly||baseline||deviation",
      hint: `Signature = exact match, Behavior = pattern deviation.`,
    },
  ],
  "we40d02": [
    {
      task: `Write a YARA rule that detects a simple text string.`,
      language: "text",
      code: ``,
      expectedOutput: "rule suspicious_string||strings:||$a = 'malicious'||condition:||$a||yara",
      hint: `rule name { strings: $a = 'text' condition: $a }`,
    },
  ],
  "we40d03": [
    {
      task: `What is a false positive and how do you reduce them?`,
      language: "text",
      code: ``,
      expectedOutput: "false positive||alert||benign||tuning||whitelist||threshold||exception",
      hint: `Reduce by tuning thresholds, whitelisting, and exceptions.`,
    },
  ],
  "we40d04": [
    {
      task: `What is a detection coverage gap?`,
      language: "text",
      code: ``,
      expectedOutput: "coverage gap||undetected||attack||technique||missing||rule||visibility",
      hint: `An attack technique that has no detection rule.`,
    },
  ],
  "we40d05": [
    {
      task: `How do you test if a detection rule works?`,
      language: "text",
      code: ``,
      expectedOutput: "atomic red team||test||simulate||attack||rule||trigger||validation",
      hint: `Use Atomic Red Team or manual simulation to trigger the rule.`,
    },
  ],
  "we41d01": [
    {
      task: `What is Sysmon and what does it monitor?`,
      language: "text",
      code: ``,
      expectedOutput: "sysmon||system monitor||process||network||file||registry||driver||events",
      hint: `Sysmon logs process creation, network connections, file changes.`,
    },
  ],
  "we41d02": [
    {
      task: `What EventID is used for process creation in Sysmon/Windows?`,
      language: "text",
      code: ``,
      expectedOutput: "4688||process creation||event id||windows||security log||audit",
      hint: `Event 4688 = Process Creation, Sysmon event 1.`,
    },
  ],
  "we41d03": [
    {
      task: `What is a suspicious command line? Give 3 examples.`,
      language: "text",
      code: ``,
      expectedOutput: "powershell -enc||cmd.exe /c||rundll32||wmic||regsvr32||mimikatz",
      hint: `Encoded PowerShell, unusual LOLBins, execution from temp.`,
    },
  ],
  "we41d04": [
    {
      task: `How do you investigate a suspicious process?`,
      language: "text",
      code: ``,
      expectedOutput: "parent process||command line||hash||virustotal||network||connections",
      hint: `Check parent PID, CMD line, hash on VT, and connections.`,
    },
  ],
  "we41d05": [
    {
      task: `What is an EDR and how does it differ from antivirus?`,
      language: "text",
      code: ``,
      expectedOutput: "edr||endpoint||detection||response||behavior||av||signature||antivirus",
      hint: `AV = signature-based, EDR = behavioral + response.`,
    },
  ],
  "we42d01": [
    {
      task: `What is the order of volatility and why does it matter?`,
      language: "text",
      code: ``,
      expectedOutput: "volatility||order||ram||network||process||disk||forensics||preserve",
      hint: `Capture most volatile data first (RAM before disk).`,
    },
  ],
  "we42d02": [
    {
      task: `What is memory forensics and what tool is commonly used?`,
      language: "text",
      code: ``,
      expectedOutput: "memory||forensics||volatility||ram||dump||process||analysis",
      hint: `Volatility is the most common memory forensics tool.`,
    },
  ],
  "we42d03": [
    {
      task: `What is a forensic image and how is it different from a backup?`,
      language: "text",
      code: ``,
      expectedOutput: "forensic image||bit-for-bit||copy||hash||integrity||backup||file-level",
      hint: `Forensic image captures deleted data and unallocated space.`,
    },
  ],
  "we42d04": [
    {
      task: `What is file carving and what tool can do it?`,
      language: "text",
      code: ``,
      expectedOutput: "file carving||recover||deleted||files||signature||foremost||scalpel||photorec",
      hint: `File carving recovers files based on headers/footers.`,
    },
  ],
  "we42d05": [
    {
      task: `Analyze a pcap file: what would you look for first?`,
      language: "text",
      code: ``,
      expectedOutput: "pcap||wireshark||http||dns||unusual||traffic||ips||protocols||follow stream",
      hint: `Check for HTTP, DNS queries to suspicious domains, unusual ports.`,
    },
  ],
  "we43d01": [
    {
      task: `Write a 5-step ransomware response playbook.`,
      language: "text",
      code: ``,
      expectedOutput: "isolate||identify||contain||eradicate||recover||notify||playbook",
      hint: `1. Isolate, 2. Identify strain, 3. Contain, 4. Eradicate, 5. Recover.`,
    },
  ],
  "we43d02": [
    {
      task: `Write a 5-step phishing response playbook.`,
      language: "text",
      code: ``,
      expectedOutput: "report||quarantine||email||analyze||headers||links||block||ioc||training",
      hint: `1. Report, 2. Quarantine, 3. Analyze, 4. Block IOCs, 5. Train users.`,
    },
  ],
  "we43d03": [
    {
      task: `Write a brute force response playbook.`,
      language: "text",
      code: ``,
      expectedOutput: "block||ip||firewall||account||lockout||investigate||source||rate limit",
      hint: `1. Block source IP, 2. Lock affected accounts, 3. Investigate access.`,
    },
  ],
  "we43d04": [
    {
      task: `What should be in a recovery checklist?`,
      language: "text",
      code: ``,
      expectedOutput: "backup||verify||restore||test||monitor||validate||system||online",
      hint: `Restore from clean backup, verify integrity, monitor for re-infection.`,
    },
  ],
  "we43d05": [
    {
      task: `What is the first thing you do when you detect a breach?`,
      language: "text",
      code: ``,
      expectedOutput: "contain||isolate||affected||systems||preserve||evidence||notify||team",
      hint: `Contain the breach to prevent further damage.`,
    },
  ],
  "we44d01": [
    {
      task: `What is the shared responsibility model in cloud security?`,
      language: "text",
      code: ``,
      expectedOutput: "shared responsibility||cloud provider||customer||iaas||paas||saas||division",
      hint: `Provider secures the cloud, customer secures in the cloud.`,
    },
  ],
  "we44d02": [
    {
      task: `What is IAM in AWS/Azure/GCP and what are its main components?`,
      language: "text",
      code: ``,
      expectedOutput: "iam||users||groups||roles||policies||permissions||access management",
      hint: `IAM controls who can do what with cloud resources.`,
    },
  ],
  "we44d03": [
    {
      task: `What is CloudTrail and what does it log?`,
      language: "text",
      code: ``,
      expectedOutput: "cloudtrail||aws||api calls||audit||logs||user activity||governance",
      hint: `CloudTrail logs all AWS API calls for auditing.`,
    },
  ],
  "we44d04": [
    {
      task: `What is the principle of least privilege in the cloud?`,
      language: "text",
      code: ``,
      expectedOutput: "least privilege||minimum||permissions||iam||deny||by default||access",
      hint: `Grant only the permissions needed, deny everything else.`,
    },
  ],
  "we44d05": [
    {
      task: `What is a security group vs a NACL in AWS?`,
      language: "text",
      code: ``,
      expectedOutput: "security group||stateful||allow only||nacl||stateless||allow||deny||subnet",
      hint: `SG = instance-level stateful, NACL = subnet-level stateless.`,
    },
  ],
  "we45d01": [
    {
      task: `What is purple teaming?`,
      language: "text",
      code: ``,
      expectedOutput: "purple team||red||blue||collaboration||improvement||detection||feedback",
      hint: `Red and Blue teams working together to improve defenses.`,
    },
  ],
  "we45d02": [
    {
      task: `Run a simple nmap scan against a lab target.`,
      language: "bash",
      code: ``,
      expectedOutput: "nmap -sS -O 192.168.1.100||scan||target||nmap||lab",
      hint: `nmap -sS -O <lab target>`,
    },
  ],
  "we45d03": [
    {
      task: `Check if the scan was detected by reviewing the target's logs.`,
      language: "bash",
      code: ``,
      expectedOutput: "grep 'Failed password' /var/log/auth.log||grep 'nmap'||detection||logs",
      hint: `Check auth logs for connection attempts.`,
    },
  ],
  "we45d04": [
    {
      task: `What is the difference between a red team exercise and a penetration test?`,
      language: "text",
      code: ``,
      expectedOutput: "red team||scenario||stealth||long duration||pentest||scope||limited||loud",
      hint: `Red team = stealthy, scenario-based. Pentest = scoped, loud.`,
    },
  ],
  "we45d05": [
    {
      task: `Document the results of your purple team exercise.`,
      language: "text",
      code: ``,
      expectedOutput: "scenario||detected||missed||rule||tuning||improvement||documentation",
      hint: `Write up what was detected, missed, and how to improve.`,
    },
  ],
  "we46d01": [
    {
      task: `Harden SSH: change the default port and disable root login.`,
      language: "bash",
      code: ``,
      expectedOutput: "Port 2222||PermitRootLogin no||sshd_config||ssh||harden||security",
      hint: `Edit /etc/ssh/sshd_config, restart sshd.`,
    },
  ],
  "we46d02": [
    {
      task: `Set up key-only SSH authentication.`,
      language: "bash",
      code: ``,
      expectedOutput: "ssh-keygen -t ed25519||ssh-copy-id||authorized_keys||pubkey||authentication",
      hint: `Generate key pair, copy public key to server.`,
    },
  ],
  "we46d03": [
    {
      task: `Configure UFW to allow only SSH and HTTPS.`,
      language: "bash",
      code: ``,
      expectedOutput: "sudo ufw allow 2222||sudo ufw allow 443||sudo ufw default deny incoming||ufw enable",
      hint: `ufw default deny incoming, then allow specific ports.`,
    },
  ],
  "we46d04": [
    {
      task: `Install and configure Fail2Ban.`,
      language: "bash",
      code: ``,
      expectedOutput: "sudo apt install fail2ban -y||sudo systemctl enable fail2ban||jail.local||ban",
      hint: `Install fail2ban, configure /etc/fail2ban/jail.local.`,
    },
  ],
  "we46d05": [
    {
      task: `Set up unattended security updates.`,
      language: "bash",
      code: ``,
      expectedOutput: "sudo apt install unattended-upgrades -y||dpkg-reconfigure||auto||updates",
      hint: `Configure automatic security updates.`,
    },
  ],
  "we47d01": [
    {
      task: `Harden Nginx: remove server version banner.`,
      language: "bash",
      code: ``,
      expectedOutput: "server_tokens off||nginx||config||hardening||version||header",
      hint: `Add 'server_tokens off;' to nginx.conf.`,
    },
  ],
  "we47d02": [
    {
      task: `Add security headers in Nginx.`,
      language: "bash",
      code: ``,
      expectedOutput: "X-Content-Type-Options: nosniff||X-Frame-Options: DENY||Content-Security-Policy||nginx headers",
      hint: `Add Strict-Transport-Security, X-Frame-Options, CSP.`,
    },
  ],
  "we47d03": [
    {
      task: `What is dependency scanning and what tools can do it?`,
      language: "text",
      code: ``,
      expectedOutput: "dependency scan||npm audit||pip audit||snyk||owasp dc||vulnerable library",
      hint: `Tools: npm audit, pip audit, Snyk, OWASP Dependency-Check.`,
    },
  ],
  "we47d04": [
    {
      task: `What is secret management and why is it important?`,
      language: "text",
      code: ``,
      expectedOutput: "secret||management||env variables||vault||aws secrets manager||git||commit",
      hint: `Never hardcode secrets. Use env variables or vaults.`,
    },
  ],
  "we47d05": [
    {
      task: `What is the OWASP Top 10?`,
      language: "text",
      code: ``,
      expectedOutput: "owasp||top 10||web||vulnerabilities||broken access control||sqli||xss||security",
      hint: `Updated list of the most critical web app security risks.`,
    },
  ],
  "we48d01": [
    {
      task: `Install OWASP Juice Shop using Docker.`,
      language: "bash",
      code: ``,
      expectedOutput: "docker pull bkimminich/juice-shop||docker run -d -p 3000:3000 bkimminich/juice-shop||docker",
      hint: `docker pull bkimminich/juice-shop`,
    },
  ],
  "we48d02": [
    {
      task: `What is the first challenge you should try on Juice Shop?`,
      language: "text",
      code: ``,
      expectedOutput: "score board||find||hidden||challenge||walkthrough||js||file",
      hint: `Find the Score Board to see all challenges.`,
    },
  ],
  "we48d03": [
    {
      task: `Install OWASP WebGoat using Docker.`,
      language: "bash",
      code: ``,
      expectedOutput: "docker pull webgoat/webgoat||docker run -d -p 8080:8080 webgoat/webgoat||docker",
      hint: `docker pull webgoat/webgoat`,
    },
  ],
  "we48d04": [
    {
      task: `What is the difference between Juice Shop and WebGoat?`,
      language: "text",
      code: ``,
      expectedOutput: "juice shop||realistic||web app||webgoat||educational||lesson-based||training",
      hint: `Juice Shop = realistic vulnerable app, WebGoat = lessons.`,
    },
  ],
  "we48d05": [
    {
      task: `Solve the Juice Shop 'DOM XSS' challenge.`,
      language: "text",
      code: ``,
      expectedOutput: "dom xss||<script>||search||payload||juice shop||challenge||solved",
      hint: `Test <script> in the search field.`,
    },
  ],
  "we49d01": [
    {
      task: `What is a consent management platform (CMP)?`,
      language: "text",
      code: ``,
      expectedOutput: "cmp||consent||management||cookie||banner||gdpr||opt-in||privacy",
      hint: `CMP manages user consent for data processing.`,
    },
  ],
  "we49d02": [
    {
      task: `How do you implement a 'right to delete data' workflow?`,
      language: "text",
      code: ``,
      expectedOutput: "delete||request||user||identify||anonymize||confirm||compliance",
      hint: `Verify identity, locate data, delete/anonymize, confirm.`,
    },
  ],
  "we49d03": [
    {
      task: `What is a data inventory and why is it necessary?`,
      language: "text",
      code: ``,
      expectedOutput: "data inventory||map||personal data||location||purpose||retention||gdpr",
      hint: `Document what data you hold, where, and why.`,
    },
  ],
  "we49d04": [
    {
      task: `Write a breach notification template.`,
      language: "text",
      code: ``,
      expectedOutput: "breach||date||impact||data||type||remediation||contact||notification",
      hint: `Include: what happened, data involved, actions taken, contact info.`,
    },
  ],
  "we49d05": [
    {
      task: `What is a Data Processing Agreement (DPA)?`,
      language: "text",
      code: ``,
      expectedOutput: "dpa||data processing||agreement||controller||processor||gdpr||contract",
      hint: `Contract between controller and processor mandated by GDPR.`,
    },
  ],
  "we50d01": [
    {
      task: `List the 6 domains of CompTIA Security+ (SY0-701).`,
      language: "text",
      code: ``,
      expectedOutput: "attacks||architecture||implementation||operations||incident response||governance||domains",
      hint: `General Security, Attacks, Architecture, Implementation, Operations, GRC.`,
    },
  ],
  "we50d02": [
    {
      task: `What is a PBQ (Performance-Based Question) and how do you approach it?`,
      language: "text",
      code: ``,
      expectedOutput: "pbq||performance||practical||simulation||lab||scenario||steps",
      hint: `PBQs test hands-on skills through simulations.`,
    },
  ],
  "we50d03": [
    {
      task: `List 3 topics covered in CySA+ that are NOT in Security+.`,
      language: "text",
      code: ``,
      expectedOutput: "cysa||siem||threat hunting||log analysis||forensics||compliance||advanced",
      hint: `SIEM, Threat Hunting, Log Analysis, Forensics.`,
    },
  ],
  "we50d04": [
    {
      task: `What is the ISC2 CC (Certified in Cybersecurity) exam?`,
      language: "text",
      code: ``,
      expectedOutput: "isc2||cc||entry-level||certification||principles||access control||network||incident",
      hint: `Entry-level certification covering security fundamentals.`,
    },
  ],
  "we50d05": [
    {
      task: `What is the SC-900 Microsoft Security exam about?`,
      language: "text",
      code: ``,
      expectedOutput: "sc-900||microsoft||security||compliance||identity||m365||azure||entra",
      hint: `Microsoft security, compliance, and identity fundamentals.`,
    },
  ],
  "we51d01": [
    {
      task: `Create a GitHub repo for your web security audit report.`,
      language: "bash",
      code: ``,
      expectedOutput: "mkdir web-security-audit||git init||git add||git commit -m||repo",
      hint: `Initialize repo, add report, commit, push to GitHub.`,
    },
  ],
  "we51d02": [
    {
      task: `Create a README.md for your security automation scripts repo.`,
      language: "text",
      code: ``,
      expectedOutput: "# security automation||tools||scripts||python||nmap||logs||automation",
      hint: `Describe each script, what it does, and how to run it.`,
    },
  ],
  "we51d03": [
    {
      task: `Document your Wazuh setup with screenshots in markdown.`,
      language: "text",
      code: ``,
      expectedOutput: "# wazuh||## installation||## configuration||## alerts||screenshots",
      hint: `Walk through the setup with code blocks and screenshots.`,
    },
  ],
  "we51d04": [
    {
      task: `Write a lab writeup for a PortSwigger academy lab you solved.`,
      language: "text",
      code: ``,
      expectedOutput: "# lab||## vulnerability||## steps||## payload||## remediation||portswigger",
      hint: `Document: lab name, vulnerability, steps, payload, fix.`,
    },
  ],
  "we51d05": [
    {
      task: `What makes a good cybersecurity portfolio project?`,
      language: "text",
      code: ``,
      expectedOutput: "real||vulnerability||tool||build||documentation||github||writeup",
      hint: `Real findings, custom tools, clear docs, GitHub presence.`,
    },
  ],
  "we52d01": [
    {
      task: `Write a blog post explaining SQL injection in 300 words.`,
      language: "text",
      code: ``,
      expectedOutput: "sql injection||what||how||example||prevention||parameterized queries",
      hint: `Explain what it is, show an example, explain the fix.`,
    },
  ],
  "we52d02": [
    {
      task: `Write a blog post explaining how a firewall works.`,
      language: "text",
      code: ``,
      expectedOutput: "firewall||packet filter||stateful||rules||allow||deny||network security",
      hint: `Explain types of firewalls and how they filter traffic.`,
    },
  ],
  "we52d03": [
    {
      task: `Write a blog post about setting up WSL2 for cybersecurity.`,
      language: "text",
      code: ``,
      expectedOutput: "wsl2||install||ubuntu||setup||tools||terminal||security lab",
      hint: `Step-by-step setup guide with commands.`,
    },
  ],
  "we52d04": [
    {
      task: `What makes a good technical blog post?`,
      language: "text",
      code: ``,
      expectedOutput: "clear||goal||steps||code||screenshots||examples||audience||concise",
      hint: `Clear audience, concrete steps, code examples, visuals.`,
    },
  ],
  "we52d05": [
    {
      task: `Publish one of your blog posts to dev.to or Medium.`,
      language: "text",
      code: ``,
      expectedOutput: "publish||dev.to||medium||blog||technical writing||share||feedback",
      hint: `Create account, format post, publish, share on LinkedIn.`,
    },
  ],
  "we53d01": [
    {
      task: `Write a resume bullet point for 'set up Wazuh SIEM'.`,
      language: "text",
      code: ``,
      expectedOutput: "deployed||wazuh||siem||agents||alerts||security monitoring||achievement",
      hint: `Action + tool + result format.`,
    },
  ],
  "we53d02": [
    {
      task: `Write a resume bullet point for 'solved PortSwigger labs'.`,
      language: "text",
      code: ``,
      expectedOutput: "solved||portswigger||labs||sqli||xss||web security||techniques",
      hint: `Quantified achievement with specific techniques.`,
    },
  ],
  "we53d03": [
    {
      task: `What keywords should a cybersecurity resume include?`,
      language: "text",
      code: ``,
      expectedOutput: "nist||mitre attack||siem||firewall||vulnerability||incident response||splunk||iam||risk",
      hint: `Include frameworks, tools, and methodologies.`,
    },
  ],
  "we53d04": [
    {
      task: `Write a LinkedIn headline for an entry-level cybersecurity role.`,
      language: "text",
      code: ``,
      expectedOutput: "cybersecurity||analyst||soc||junior||blue team||entry-level||aspiring",
      hint: `Headline = Current/Future Role + Key Skills + Goal.`,
    },
  ],
  "we53d05": [
    {
      task: `What is an ATS and how do you write for it?`,
      language: "text",
      code: ``,
      expectedOutput: "ats||applicant tracking||system||keywords||parsable format||no columns||simple",
      hint: `ATS parses resumes for keywords. Use simple formatting.`,
    },
  ],
  "we54d01": [
    {
      task: `Optimize your LinkedIn profile with a cybersecurity headline and summary.`,
      language: "text",
      code: ``,
      expectedOutput: "linkedin||headline||summary||experience||skills||recommendations||profile",
      hint: `Update headline, write a 2-3 sentence summary with keywords.`,
    },
  ],
  "we54d02": [
    {
      task: `Search for 'SOC Analyst Level 1' jobs on LinkedIn and list 3 common requirements.`,
      language: "text",
      code: ``,
      expectedOutput: "soc||analyst||requirements||siem||log analysis||communication||certifications",
      hint: `Identify patterns in job descriptions.`,
    },
  ],
  "we54d03": [
    {
      task: `What is the STAR method for interviews?`,
      language: "text",
      code: ``,
      expectedOutput: "star||situation||task||action||result||behavioral||interview",
      hint: `Situation, Task, Action, Result format for behavioral answers.`,
    },
  ],
  "we54d04": [
    {
      task: `Write a STAR response to 'Tell me about a time you solved a problem'.`,
      language: "text",
      code: ``,
      expectedOutput: "situation||task||action||result||specific||metrics||example",
      hint: `Structure your answer using STAR format with a real example.`,
    },
  ],
  "we54d05": [
    {
      task: `What are 3 questions you should ask in a cybersecurity interview?`,
      language: "text",
      code: ``,
      expectedOutput: "team||tools||incident response||training||career growth||culture||expectations",
      hint: `Ask about team, tools, training, and growth opportunities.`,
    },
  ],
  "we55d01": [
    {
      task: `Perform a mock interview for a SOC L1 position.`,
      language: "text",
      code: ``,
      expectedOutput: "mock||interview||soc||triaging||alert||phishing||incident||questions",
      hint: `Practice answering common SOC interview questions.`,
    },
  ],
  "we55d02": [
    {
      task: `What is the difference between blue team, red team, and purple team?`,
      language: "text",
      code: ``,
      expectedOutput: "blue team||defense||red team||offense||purple team||collaboration||soc",
      hint: `Blue = defend, Red = attack, Purple = both together.`,
    },
  ],
  "we55d03": [
    {
      task: `What is a typical day for a SOC L1 analyst?`,
      language: "text",
      code: ``,
      expectedOutput: "alerts||triaging||tickets||escalation||monitoring||shift||handover||log review",
      hint: `Review alerts, triage, escalate, document, monitor dashboards.`,
    },
  ],
  "we55d04": [
    {
      task: `How do you stay current in cybersecurity?`,
      language: "text",
      code: ``,
      expectedOutput: "news||blogs||podcasts||reddit||forums||cve||training||labs||ctf",
      hint: `Follow BleepingComputer, Krebs, Reddit netsec, CTF practice.`,
    },
  ],
  "we55d05": [
    {
      task: `Create a list of 5 cybersecurity podcasts or blogs to follow.`,
      language: "text",
      code: ``,
      expectedOutput: "podcast||blog||darknet diaries||security now||sans||krebs||bleeping computer",
      hint: `List resources with a short description of each.`,
    },
  ],
  "we56d01": [
    {
      task: `Re-solve a PortSwigger lab you previously struggled with.`,
      language: "text",
      code: ``,
      expectedOutput: "portswigger||lab||struggled||solve||review||notes||payload",
      hint: `Document what went wrong before and how you solved it now.`,
    },
  ],
  "we56d02": [
    {
      task: `Review your notes from Phase 1. What are your weakest areas?`,
      language: "text",
      code: ``,
      expectedOutput: "review||weakness||improve||practice||revisit||lab||notes",
      hint: `Identify 3 weak areas and create a plan to improve.`,
    },
  ],
  "we56d03": [
    {
      task: `Run a full nmap scan against a lab target and document all open ports.`,
      language: "bash",
      code: ``,
      expectedOutput: "nmap -sS -sV -O -p- 192.168.1.100||open ports||services||versions",
      hint: `nmap -sS -sV -O -p- <target>`,
    },
  ],
  "we56d04": [
    {
      task: `Tighten your notes: merge related topics, add missing details.`,
      language: "bash",
      code: ``,
      expectedOutput: "mkdir -p ~/cyber-lab/notes/consolidated||cat||notes||organize||merge",
      hint: `Consolidate scattered notes into organized topic files.`,
    },
  ],
  "we56d05": [
    {
      task: `What is your current strongest cybersecurity skill and why?`,
      language: "text",
      code: ``,
      expectedOutput: "skill||strongest||evidence||labs||tools||confidence||next step",
      hint: `Reflect on your progress and identify your best skill.`,
    },
  ],
  "we57d01": [
    {
      task: `What is the difference between static and dynamic malware analysis?`,
      language: "text",
      code: ``,
      expectedOutput: "static||analyze||without running||strings||hashes||dynamic||sandbox||run",
      hint: `Static = examine file, Dynamic = execute in sandbox.`,
    },
  ],
  "we57d02": [
    {
      task: `List 5 static analysis techniques.`,
      language: "text",
      code: ``,
      expectedOutput: "file hash||strings||packer detection||pe structure||imports||signature||entropy",
      hint: `Hash, strings, packer, PE headers, imports.`,
    },
  ],
  "we57d03": [
    {
      task: `What is a malware sandbox and how does it work?`,
      language: "text",
      code: ``,
      expectedOutput: "sandbox||isolated||environment||run||analyze||behavior||network||detonate",
      hint: `Runs malware in a controlled environment to observe behavior.`,
    },
  ],
  "we57d04": [
    {
      task: `What are indicators of compromise (IOCs) for malware?`,
      language: "text",
      code: ``,
      expectedOutput: "ioc||hash||ip||domain||registry||file path||mutex||network signature",
      hint: `Artifacts left by malware that indicate infection.`,
    },
  ],
  "we57d05": [
    {
      task: `What is a false positive in malware analysis?`,
      language: "text",
      code: ``,
      expectedOutput: "false positive||benign||flagged||malicious||legitimate tool||whitelist||hashing",
      hint: `When a legitimate file is incorrectly identified as malware.`,
    },
  ],
  "we58d01": [
    {
      task: `What is prompt injection and what types exist?`,
      language: "text",
      code: ``,
      expectedOutput: "prompt injection||direct||indirect||override||system prompt||jailbreak||llm",
      hint: `Direct = user input, Indirect = third-party data injection.`,
    },
  ],
  "we58d02": [
    {
      task: `What is an AI-powered scanner vulnerability?`,
      language: "text",
      code: ``,
      expectedOutput: "ai scanner||tool||command injection||output manipulation||prompt injection",
      hint: `Attackers craft payloads that exploit AI-powered analysis tools.`,
    },
  ],
  "we58d03": [
    {
      task: `What are AI guardrails and how do they prevent abuse?`,
      language: "text",
      code: ``,
      expectedOutput: "guardrails||content filter||input validation||output checking||restrictions",
      hint: `Guardrails prevent LLMs from generating harmful content.`,
    },
  ],
  "we58d04": [
    {
      task: `How can AI agents be exploited to exfiltrate data?`,
      language: "text",
      code: ``,
      expectedOutput: "ai agent||exfiltrate||data||encode||output||prompt injection||tool abuse",
      hint: `Inject prompts that cause the agent to send data to attacker.`,
    },
  ],
  "we58d05": [
    {
      task: `What is the OWASP Top 10 for LLM Applications?`,
      language: "text",
      code: ``,
      expectedOutput: "owasp||llm||prompt injection||data leakage||inadequate sandboxing||supply chain",
      hint: `Top risks for LLM-powered applications.`,
    },
  ],
  "we59d01": [
    {
      task: `Write an executive summary of a phishing incident.`,
      language: "text",
      code: ``,
      expectedOutput: "executive||summary||phishing||incident||impact||contained||users trained||brief",
      hint: `Non-technical summary: what happened, impact, actions taken.`,
    },
  ],
  "we59d02": [
    {
      task: `Practice explaining SQL injection to a non-technical manager.`,
      language: "text",
      code: ``,
      expectedOutput: "sql injection||simple||explanation||analogy||injection||forms",
      hint: `Explain in 2-3 sentences without jargon.`,
    },
  ],
  "we59d03": [
    {
      task: `What is risk communication and why is it important?`,
      language: "text",
      code: ``,
      expectedOutput: "risk||communication||stakeholders||impact||likelihood||mitigation||decision-makers",
      hint: `Translate technical risk into business impact.`,
    },
  ],
  "we59d04": [
    {
      task: `Structure a 5-minute presentation about a security topic.`,
      language: "text",
      code: ``,
      expectedOutput: "introduction||problem||solution||demonstration||conclusion||presentation",
      hint: `Intro -> Problem -> Solution -> Demo -> Conclusion.`,
    },
  ],
  "we59d05": [
    {
      task: `What is the most important soft skill in cybersecurity?`,
      language: "text",
      code: ``,
      expectedOutput: "communication||explain||technical||non-technical||teamwork||curiosity||writing",
      hint: `Ability to communicate complex topics to different audiences.`,
    },
  ],
  "we60d01": [
    {
      task: `Create a 12-month career plan with specific milestones.`,
      language: "text",
      code: ``,
      expectedOutput: "12 months||certification||lab||github||blog||job applications||network",
      hint: `Month 1-2: Cert, Month 3-4: Labs, Month 5-6: Portfolio, etc.`,
    },
  ],
  "we60d02": [
    {
      task: `List 5 entry-level cybersecurity roles you could apply for now.`,
      language: "text",
      code: ``,
      expectedOutput: "soc analyst||security analyst||junior pentester||cybersecurity specialist||grc analyst||entry-level",
      hint: `SOC L1, Security Analyst, Jr. Pentester, GRC Analyst, etc.`,
    },
  ],
  "we60d03": [
    {
      task: `What is your target role and what skills do you still need?`,
      language: "text",
      code: ``,
      expectedOutput: "target role||required skills||gap||learning plan||job description||align",
      hint: `Compare job requirements to your skills. Identify gaps.`,
    },
  ],
  "we60d04": [
    {
      task: `Clean up your GitHub portfolio for job applications.`,
      language: "bash",
      code: ``,
      expectedOutput: "git push||clean||readme||remove||temp files||organize||repos",
      hint: `Ensure each repo has a README, clean structure, and license.`,
    },
  ],
  "we60d05": [
    {
      task: `Write a 1-page career summary document.`,
      language: "text",
      code: ``,
      expectedOutput: "career summary||skills||certifications||projects||goals||direction||1 page",
      hint: `Summarize your skills, certs, projects, and career direction.`,
    },
  ],
};
