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

export const phase2: Module[] = [
  {
    id: "week07",
    title: "OSI Model & Packet Theory",
    durationText: "Week 7 \u00b7 3 Days",
    focus: "Master the OSI model, TCP/UDP protocols, and port-based service enumeration",
    output: "Ability to map network traffic to OSI layers and identify services via port scanning",
    topics: [
      {
        id: "we07d01",
        title: "OSI Model Deep Dive",
        description: "Learn all 7 layers of the OSI model, the protocols at each layer, encapsulation/decapsulation, PDU names, and security relevance.",
        type: "learn",
        duration: "3 hours",
        content: `:::objectives
- Understand the purpose and structure of the OSI model
- Identify protocols and devices at each layer
- Explain encapsulation and decapsulation
- Know PDU names for each layer
- Recognize security implications at each layer
:::

:::info
The OSI (Open Systems Interconnection) model is a conceptual framework that standardizes network communication into seven abstraction layers. While real-world networking uses TCP/IP, the OSI model remains essential for troubleshooting, security analysis, and vendor-agnostic communication.
:::

## The 7 Layers (Bottom to Top)

| Layer | Name | PDU | Devices | Protocols | Security Relevance |
|-------|------|-----|---------|-----------|-------------------|
| 7 | Application | Data | Firewalls (WAF), Proxies | HTTP, DNS, FTP, SMTP, SSH | Injection attacks, authentication bypass |
| 6 | Presentation | Data | \u2014 | SSL/TLS, JPEG, ASCII | Encryption/decryption, data leakage |
| 5 | Session | Data | \u2014 | NetBIOS, RPC, PPTP | Session hijacking, token theft |
| 4 | Transport | Segment | Load Balancers | TCP, UDP, SCTP | Port scanning, DoS attacks |
| 3 | Packet | Packet | Routers, L3 Firewalls | IP, ICMP, OSPF, BGP | IP spoofing, routing attacks |
| 2 | Frame | Frame | Switches, Bridges | Ethernet, ARP, VLAN | ARP spoofing, MAC flooding, VLAN hopping |
| 1 | Bits | Bits | Cables, NICs, Hubs | Electrical signals, radio waves | Wiretapping, jamming, physical access |

## Encapsulation & Decapsulation

As data moves down the OSI stack, each layer adds its own header (and sometimes trailer):

\\\`\\\`\\\`
Application Data
  \u2193 Layer 7-5 headers added
Session Data
  \u2193 Layer 4 header (TCP/UDP)
Segment (TCP) or Datagram (UDP)
  \u2193 Layer 3 header (IP)
Packet
  \u2193 Layer 2 header (Ethernet) + trailer (FCS)
Frame
  \u2193 Layer 1 encoding
Bits on the wire
\\\`\\\`\\\`

**Decapsulation** reverses this process as data moves up the stack at the destination.

:::concept
### OSI Stack Visualization

\\\`\\\`\\\`
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502  7. Application    (HTTP,DNS)   \u2502  \u2190 User-facing protocols
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502  6. Presentation   (TLS,SSL)    \u2502  \u2190 Encryption, encoding
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502  5. Session        (NetBIOS)    \u2502  \u2190 Connection management
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502  4. Transport      (TCP, UDP)   \u2502  \u2190 End-to-end delivery
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502  3. Network        (IP, ICMP)   \u2502  \u2190 Routing & addressing
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502  2. Data Link      (Ethernet)   \u2502  \u2190 MAC addressing, frames
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502  1. Physical       (Cables)     \u2502  \u2190 Bit transmission
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
\\\`\\\`\\\`
:::

### Security Relevance by Layer

**Layer 1 (Physical):** Physical access to network equipment enables packet capture, wiretapping, and denial of service through cable disconnection.

**Layer 2 (Data Link):** ARP spoofing allows man-in-the-middle attacks. MAC flooding overwhelms switches. VLAN hopping can bypass network segmentation.

**Layer 3 (Network):** IP spoofing masks attacker origins. Routing protocol attacks (BGP hijacking) can redirect entire traffic flows.

**Layer 4 (Transport):** Port scanning reveals open services. SYN floods cause denial of service. Unencrypted TCP sessions can be intercepted.

**Layer 5-6 (Session/Presentation):** Session hijacking steals active connections. Weak encryption (SSLv3, RC4) can be broken. Certificate spoofing enables MITM.

**Layer 7 (Application):** SQL injection, XSS, command injection, authentication bypass \u2014 the majority of web application attacks target this layer.`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Why do security professionals need to understand the OSI model if they mainly work with web applications?",
        interviewAnswer: "Understanding the OSI model allows security professionals to identify where in the network stack an attack is occurring. For example, an ARP spoofing attack targets Layer 2, while SQL injection targets Layer 7. This helps prioritize defenses, choose the right security tools (WAF vs. IDS vs. firewall), and communicate effectively with network engineers and system administrators.",
        quiz: [
          {
            question: "At which OSI layer do routers primarily operate?",
            options: ["Layer 1 - Physical", "Layer 2 - Data Link", "Layer 3 - Network", "Layer 4 - Transport"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Routers operate at Layer 3 (Network) where they make forwarding decisions based on IP addresses.",
            certTags: ["Network+"]
          },
          {
            question: "What is the PDU (Protocol Data Unit) name at Layer 2 of the OSI model?",
            options: ["Packet", "Segment", "Frame", "Datagram"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Layer 2 uses 'frames'. Packets are Layer 3, segments are Layer 4 TCP, and datagrams are Layer 4 UDP.",
            certTags: ["Network+"]
          },
          {
            question: "ARP spoofing is an attack that targets which OSI layer?",
            options: ["Layer 1 - Physical", "Layer 2 - Data Link", "Layer 3 - Network", "Layer 7 - Application"],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "ARP operates at Layer 2, mapping IP addresses to MAC addresses. ARP spoofing corrupts this mapping to enable man-in-the-middle attacks.",
            certTags: ["Security+"]
          },
          {
            question: "Which layer of the OSI model is responsible for encryption and decryption of data?",
            options: ["Layer 5 - Session", "Layer 6 - Presentation", "Layer 7 - Application", "Layer 4 - Transport"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Layer 6 (Presentation) handles data formatting, encryption, and decryption \u2014 translating between application format and network format.",
            certTags: ["Network+"]
          },
          {
            question: "A SYN flood attack targets which OSI layer?",
            options: ["Layer 2 - Data Link", "Layer 3 - Network", "Layer 4 - Transport", "Layer 7 - Application"],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "SYN floods exploit the TCP three-way handshake at Layer 4 (Transport), exhausting server connection state.",
            certTags: ["Security+"]
          },
          {
            question: "What happens during encapsulation as data moves from Layer 7 to Layer 1?",
            options: [
              "Headers are removed at each layer",
              "Each layer adds its own header to the data",
              "Data is compressed at each layer",
              "Encryption is applied at each layer"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Encapsulation is the process where each layer wraps the data from the layer above by adding its own header (and sometimes trailer).",
            certTags: ["Network+"]
          },
          {
            question: "Which device operates at Layer 1 of the OSI model?",
            options: ["Router", "Switch", "Hub", "Firewall"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "A hub is a Layer 1 device \u2014 it simply repeats electrical signals to all ports without any addressing or filtering.",
            certTags: ["Network+"]
          },
          {
            question: "VLAN hopping attacks target which layer?",
            options: ["Layer 3", "Layer 2", "Layer 4", "Layer 7"],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "VLAN hopping exploits Layer 2 (Data Link) switching protocols to gain access to traffic on different VLANs.",
            certTags: ["Security+", "CEH"]
          },
          {
            question: "At which layer does a Web Application Firewall (WAF) primarily inspect traffic?",
            options: ["Layer 3 - Network", "Layer 4 - Transport", "Layer 7 - Application", "Layer 2 - Data Link"],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "A WAF operates at Layer 7 (Application) to inspect HTTP/HTTPS traffic for attacks like SQL injection and XSS.",
            certTags: ["Security+"]
          },
          {
            question: "Which of these is a Layer 5 (Session) attack?",
            options: ["SQL injection", "Session hijacking", "IP spoofing", "MAC flooding"],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "Session hijacking targets Layer 5 by stealing or manipulating active session tokens to impersonate authenticated users.",
            certTags: ["CEH"]
          },
          {
            question: "What is the correct order of encapsulation from top to bottom?",
            options: [
              "Data \u2192 Segment \u2192 Packet \u2192 Frame \u2192 Bits",
              "Bits \u2192 Frame \u2192 Packet \u2192 Segment \u2192 Data",
              "Data \u2192 Packet \u2192 Segment \u2192 Frame \u2192 Bits",
              "Frame \u2192 Packet \u2192 Segment \u2192 Data \u2192 Bits"
            ],
            correctAnswerIndex: 0,
            difficulty: "beginner",
            explanation: "Data flows from Application (Data) \u2192 Transport (Segment) \u2192 Network (Packet) \u2192 Data Link (Frame) \u2192 Physical (Bits).",
            certTags: ["Network+"]
          },
          {
            question: "A switch operates at which OSI layer and uses what addressing?",
            options: [
              "Layer 1, uses IP addresses",
              "Layer 2, uses MAC addresses",
              "Layer 3, uses MAC addresses",
              "Layer 4, uses port numbers"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Switches operate at Layer 2 (Data Link) and forward frames based on MAC address tables.",
            certTags: ["Network+"]
          },
          {
            question: "BGP hijacking is an attack at which OSI layer?",
            options: ["Layer 2", "Layer 3", "Layer 4", "Layer 7"],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "BGP (Border Gateway Protocol) is a Layer 3 routing protocol. BGP hijacking manipulates routing tables to redirect traffic.",
            certTags: ["Security+"]
          }
        ]
      },
      {
        id: "we07d02",
        title: "TCP/UDP & The Three-Way Handshake",
        description: "Master TCP and UDP protocols, the three-way handshake, connection teardown, and packet analysis with Wireshark.",
        type: "learn",
        duration: "3 hours",
        content: `:::objectives
- Understand TCP header fields and flags
- Explain the TCP three-way handshake step by step
- Describe TCP connection teardown (FIN/ACK)
- Compare TCP and UDP use cases
- Capture and analyze TCP handshakes in Wireshark
:::

## TCP Header Fields

Key fields in a TCP header:

| Field | Purpose |
|-------|---------|
| Source Port | Sender's port number |
| Destination Port | Receiver's port number |
| Sequence Number | Byte offset of data in this segment |
| Acknowledgment Number | Next expected byte from sender |
| Flags (SYN, ACK, FIN, RST, PSH, URG) | Control the connection state |
| Window Size | Flow control \u2014 how much data can be received |
| Checksum | Error detection |

### TCP Flags Explained

- **SYN** \u2014 Synchronize: Initiates a connection
- **ACK** \u2014 Acknowledge: Confirms receipt of data
- **FIN** \u2014 Finish: Gracefully closes a connection
- **RST** \u2014 Reset: Abruptly terminates a connection
- **PSH** \u2014 Push: Tells receiver to pass data to application immediately
- **URG** \u2014 Urgent: Marks data as priority

## The Three-Way Handshake

\\\`\\\`\\\`
Client                          Server
  \u2502                               \u2502
  \u2502\u2500\u2500\u2500\u2500 SYN (seq=x) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2192\u2502  Step 1: Client sends SYN
  \u2502                               \u2502
  \u2502\u2190\u2500\u2500\u2500 SYN-ACK (seq=y, ack=x+1) \u2500\u2502  Step 2: Server responds with SYN-ACK
  \u2502                               \u2502
  \u2502\u2500\u2500\u2500\u2500 ACK (seq=x+1, ack=y+1) \u2500\u2500\u2500\u2500\u2192\u2502  Step 3: Client sends ACK
  \u2502                               \u2502
  \u2502       CONNECTION ESTABLISHED   \u2502
\\\`\\\`\\\`

**Step 1:** Client sends a SYN packet with sequence number x.
**Step 2:** Server responds with SYN-ACK \u2014 its own SYN (seq=y) and acknowledgment of client's SYN (ack=x+1).
**Step 3:** Client sends ACK (ack=y+1). Connection is now established.

## TCP Connection Teardown

\\\`\\\`\\\`
Client                          Server
  \u2502                               \u2502
  \u2502\u2500\u2500\u2500\u2500 FIN (seq=u) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2192\u2502  Step 1: Client sends FIN
  \u2502                               \u2502
  \u2502\u2190\u2500\u2500\u2500 ACK (ack=u+1) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2502  Step 2: Server acknowledges
  \u2502                               \u2502
  \u2502\u2190\u2500\u2500\u2500 FIN (seq=v) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2502  Step 3: Server sends its own FIN
  \u2502                               \u2502
  \u2502\u2500\u2500\u2500\u2500 ACK (ack=v+1) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2192\u2502  Step 4: Client acknowledges
  \u2502                               \u2502
  \u2502       CONNECTION CLOSED        \u2502
\\\`\\\`\\\`

## TCP vs UDP Comparison

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Guaranteed delivery | Best-effort delivery |
| Ordering | Ordered (sequence numbers) | No ordering |
| Speed | Slower (handshake overhead) | Faster (no handshake) |
| Header size | 20-60 bytes | 8 bytes |
| Flow control | Yes (window size) | No |
| Use cases | HTTP, SSH, FTP, SMTP | DNS, DHCP, VoIP, video streaming, gaming |

:::warning
UDP does not guarantee delivery, ordering, or error recovery. Applications using UDP must handle these concerns themselves if needed.
:::

## Wireshark Exercise

To capture and analyze a TCP handshake:

1. Open Wireshark and start capture on your network interface
2. In the filter bar, enter: \\\`tcp.flags.syn == 1\\\`
3. Open a browser and visit any website
4. You should see the SYN \u2192 SYN-ACK \u2192 ACK pattern

To follow a TCP stream:
1. Right-click on any packet in the handshake
2. Select "Follow" \u2192 "TCP Stream"
3. This shows the full conversation in order`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Explain the TCP three-way handshake and why it matters for security.",
        interviewAnswer: "The three-way handshake establishes a reliable TCP connection: the client sends SYN, the server responds with SYN-ACK, and the client confirms with ACK. From a security perspective, this handshake is exploited in SYN flood attacks where an attacker sends many SYN packets without completing the handshake, exhausting the server's connection table. Understanding this process is also essential for analyzing network traffic with tools like Wireshark and for configuring firewalls that need to distinguish between established and new connections.",
        quiz: [
          {
            question: "In the TCP three-way handshake, what does the second step involve?",
            options: [
              "Client sends ACK to server",
              "Server sends SYN-ACK to client",
              "Server sends RST to client",
              "Client sends FIN to server"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Step 2 is the server responding with a SYN-ACK \u2014 acknowledging the client's SYN and sending its own SYN.",
            certTags: ["Network+"]
          },
          {
            question: "Which TCP flag is used to abruptly terminate a connection without a graceful teardown?",
            options: ["FIN", "ACK", "RST", "SYN"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "RST (Reset) immediately terminates a connection without the FIN/ACK teardown sequence.",
            certTags: ["Network+"]
          },
          {
            question: "Why is UDP preferred for DNS queries?",
            options: [
              "UDP provides guaranteed delivery",
              "UDP encrypts the DNS data",
              "UDP has lower overhead and faster response times",
              "UDP supports larger packet sizes than TCP"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "DNS queries are small and need fast responses. UDP's connectionless nature eliminates handshake overhead, making it ideal for DNS.",
            certTags: ["Network+"]
          },
          {
            question: "A SYN flood attack exploits which part of TCP?",
            options: [
              "The FIN/ACK teardown process",
              "The three-way handshake",
              "The window size mechanism",
              "The sequence number space"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "SYN floods send many SYN packets without completing the handshake, filling the server's half-open connection table and denying legitimate connections.",
            certTags: ["Security+"]
          },
          {
            question: "How many bytes is a minimum TCP header (without options)?",
            options: ["8 bytes", "20 bytes", "32 bytes", "60 bytes"],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "A TCP header without options is 20 bytes. Options can extend it up to 60 bytes.",
            certTags: ["Network+"]
          },
          {
            question: "In Wireshark, which filter would show only TCP SYN packets?",
            options: [
              "tcp.flags == 0x02",
              "tcp.flags.syn == 1",
              "tcp.flags.ack == 1",
              "tcp.port == 80"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The filter tcp.flags.syn == 1 isolates packets with the SYN flag set, which are connection initiation packets.",
            certTags: ["Security+"]
          },
          {
            question: "What is the purpose of TCP sequence numbers?",
            options: [
              "To encrypt the data payload",
              "To reorder segments and detect missing data",
              "To authenticate the sender",
              "To compress the data"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Sequence numbers track the byte offset of data, allowing the receiver to reorder segments and request retransmission of missing data.",
            certTags: ["Network+"]
          },
          {
            question: "Which TCP flag combination is used to acknowledge a FIN?",
            options: ["SYN-ACK", "FIN-ACK", "PSH-ACK", "RST-ACK"],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "When one side sends FIN, the other responds with FIN-ACK to acknowledge the close request and initiate its own close.",
            certTags: ["Network+"]
          },
          {
            question: "How does UDP handle packet loss?",
            options: [
              "It automatically retransmits lost packets",
              "It requests retransmission from the sender",
              "It does not handle packet loss at all",
              "It uses forward error correction"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "UDP is best-effort delivery with no built-in reliability. Lost packets are simply lost \u2014 applications must handle recovery if needed.",
            certTags: ["Network+"]
          },
          {
            question: "What is the TCP window size used for?",
            options: [
              "Encrypting data in transit",
              "Flow control \u2014 limiting how much unacknowledged data can be sent",
              "Compressing the data payload",
              "Determining the maximum packet size"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "Window size implements flow control. The receiver advertises how much buffer space it has, preventing the sender from overwhelming it.",
            certTags: ["Network+"]
          },
          {
            question: "During a TCP teardown, who initiates the close?",
            options: [
              "Only the client can initiate",
              "Only the server can initiate",
              "Either side can initiate by sending FIN",
              "The firewall initiates the close"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "Either the client or server can initiate connection teardown by sending a FIN packet.",
            certTags: ["Network+"]
          },
          {
            question: "Which protocol would you use for real-time video conferencing and why?",
            options: [
              "TCP, because reliability is critical",
              "UDP, because low latency matters more than guaranteed delivery",
              "ICMP, because it supports multicast",
              "ARP, because it resolves addresses quickly"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Video conferencing prioritizes low latency over perfect reliability. A few dropped frames are acceptable, but TCP's retransmission delays would cause lag.",
            certTags: ["Network+"]
          }
        ]
      },
      {
        id: "we07d03",
        title: "Ports, Protocols & Banner Grabbing",
        description: "Learn common port/protocol mappings, use Nmap and Netcat for banner grabbing, and understand why service version detection matters.",
        type: "practice",
        duration: "3 hours",
        content: `:::objectives
- Memorize common port numbers and associated protocols
- Perform banner grabbing with Nmap and Netcat
- Explain why service version detection is critical for vulnerability assessment
- Complete a hands-on banner grabbing exercise
:::

## Common Ports Reference

| Port | Protocol | Service | Notes |
|------|----------|---------|-------|
| 21 | TCP | FTP | Unencrypted file transfer |
| 22 | TCP | SSH | Encrypted remote access |
| 23 | TCP | Telnet | Unencrypted remote access \u2014 never use |
| 25 | TCP | SMTP | Email sending |
| 53 | TCP/UDP | DNS | Name resolution |
| 80 | TCP | HTTP | Unencrypted web traffic |
| 110 | TCP | POP3 | Email retrieval |
| 143 | TCP | IMAP | Email retrieval |
| 443 | TCP | HTTPS | Encrypted web traffic |
| 445 | TCP | SMB | Windows file sharing |
| 3389 | TCP | RDP | Windows remote desktop |
| 3306 | TCP | MySQL | Database |
| 5432 | TCP | PostgreSQL | Database |
| 8080 | TCP | HTTP Alt | Common proxy/web port |

:::warning
Never expose Telnet (23), FTP (21), or other unencrypted protocols to the internet. Use SSH (22), SFTP, and HTTPS (443) instead.
:::

## Nmap Banner Grabbing

**Service version detection with default scripts:**
\\\`\\\`\\\`bash
nmap -sV -sC target_ip
\\\`\\\`\\\`

**Aggressive scan (includes OS detection, version, scripts, traceroute):**
\\\`\\\`\\\`bash
nmap -A target_ip
\\\`\\\`\\\`

**Specific port scan:**
\\\`\\\`\\\`bash
nmap -sV -p 22,80,443 target_ip
\\\`\\\`\\\`

**Example output:**
\\\`\\\`\\\`
PORT    STATE SERVICE VERSION
22/tcp  open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.3
80/tcp  open  http    Apache httpd 2.4.41 ((Ubuntu))
443/tcp open  ssl/http Apache httpd 2.4.41 ((Ubuntu))
\\\`\\\`\\\`

## Netcat Banner Grabbing

**Basic banner grab:**
\\\`\\\`\\\`bash
nc -v target_ip port
\\\`\\\`\\\`

**HTTP banner grab:**
\\\`\\\`\\\`bash
nc -v target_ip 80
GET / HTTP/1.1
Host: target.com
[Enter twice]
\\\`\\\`\\\`

**SSH banner grab:**
\\\`\\\`\\\`bash
nc -v target_ip 22
# Server responds automatically with: SSH-2.0-OpenSSH_8.2p1
\\\`\\\`\\\`

## Why Service Version Detection Matters

Knowing the exact version of a service allows you to:
1. Search for known CVEs (Common Vulnerabilities and Exposures)
2. Identify default configurations that may be insecure
3. Determine if the service is end-of-life (EOL)
4. Map the attack surface accurately

**Example:** Finding Apache 2.4.49 means searching "Apache 2.4.49 CVE" reveals CVE-2021-41773 (path traversal vulnerability).

:::classwork
### Banner Grabbing Exercise

1. **Target setup:** Use a local VM or intentionally vulnerable machine (e.g., Metasploitable, DVWA)

2. **Nmap banner grab:**
\\\`\\\`\\\`bash
nmap -sV -sC 192.168.1.100
\\\`\\\`\\\`
Record all open ports and service versions.

3. **Netcat banner grab on port 80:**
\\\`\\\`\\\`bash
nc -v 192.168.1.100 80
HEAD / HTTP/1.1
Host: target

[Enter twice]
\\\`\\\`\\\`

4. **Compare results:** How do the Nmap and Netcat results differ? What additional information does each provide?

5. **Research:** For each service found, search for known vulnerabilities using the version information.
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "What is banner grabbing and why is it an important reconnaissance technique?",
        interviewAnswer: "Banner grabbing is the process of identifying the software, version, and configuration of a remote service by examining the response it sends. Attackers use this to find known vulnerabilities for specific software versions. Defenders use it to audit their own attack surface and ensure services aren't leaking unnecessary information. Tools like Nmap and Netcat can perform banner grabbing, and the technique is a fundamental part of the reconnaissance phase in both offensive and defensive security.",
        quiz: [
          {
            question: "Which port is used by SSH?",
            options: ["21", "23", "22", "25"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "SSH uses port 22. Port 21 is FTP, 23 is Telnet, and 25 is SMTP.",
            certTags: ["Network+"]
          },
          {
            question: "Which Nmap flag enables service version detection?",
            options: ["-sS", "-sV", "-sU", "-sN"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "-sV probes open ports to determine service and version information.",
            certTags: ["Security+"]
          },
          {
            question: "Why is Telnet considered insecure?",
            options: [
              "It uses encryption that is easily broken",
              "It transmits all data including credentials in cleartext",
              "It only works on Windows systems",
              "It requires a VPN connection"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Telnet transmits everything in cleartext \u2014 usernames, passwords, and all data. SSH should be used instead.",
            certTags: ["Security+"]
          },
          {
            question: "What information does banner grabbing reveal?",
            options: [
              "The target's physical location",
              "Service type, version, and sometimes OS information",
              "The target's password policy",
              "The network bandwidth available"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Banner grabbing identifies the software, version, and configuration of running services, which helps in vulnerability research.",
            certTags: ["Security+"]
          },
          {
            question: "Which command performs an aggressive Nmap scan?",
            options: ["nmap -sV target", "nmap -A target", "nmap -sS target", "nmap -O target"],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The -A flag enables aggressive scanning: OS detection, version detection, script scanning, and traceroute.",
            certTags: ["Security+"]
          },
          {
            question: "If you discover Apache 2.4.49 on a target, what should you do next?",
            options: [
              "Try to exploit it immediately",
              "Search for known CVEs affecting that specific version",
              "Ignore it \u2014 Apache is always secure",
              "Reboot the target server"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Always research known vulnerabilities for the specific version. Apache 2.4.49 has CVE-2021-41773, a critical path traversal vulnerability.",
            certTags: ["CEH"]
          },
          {
            question: "Which Netcat command would grab a banner from port 22?",
            options: [
              "nc -l 22",
              "nc -v target_ip 22",
              "nc -p 22 -o output.txt",
              "nc -u target_ip 22"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "nc -v target_ip 22 connects verbosely to port 22 and displays the banner the server sends.",
            certTags: ["Security+"]
          },
          {
            question: "What port does HTTPS typically use?",
            options: ["80", "8080", "443", "8443"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "HTTPS uses port 443. Port 80 is HTTP, 8080 is commonly used as an alternative HTTP port.",
            certTags: ["Network+"]
          },
          {
            question: "Which protocol is used for Windows file sharing?",
            options: ["FTP", "SMB", "NFS", "TFTP"],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "SMB (Server Message Block) is used for Windows file sharing on port 445. FTP is for file transfer, NFS is Linux-based.",
            certTags: ["Network+"]
          },
          {
            question: "Why is service version information a security risk if exposed?",
            options: [
              "It reveals the network topology",
              "It allows attackers to find known vulnerabilities for that specific version",
              "It increases network bandwidth usage",
              "It disables firewall protections"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Specific version numbers let attackers search CVE databases for known exploits targeting that exact software version.",
            certTags: ["Security+"]
          },
          {
            question: "What is the difference between a TCP connect scan and a SYN scan?",
            options: [
              "TCP connect completes the handshake; SYN scan sends SYN but doesn't complete",
              "SYN scan is slower but more reliable",
              "TCP connect scan doesn't need root privileges",
              "SYN scan works on UDP ports"
            ],
            correctAnswerIndex: 0,
            difficulty: "advanced",
            explanation: "A TCP connect scan completes the three-way handshake (detected by the target). A SYN scan sends SYN, waits for SYN-ACK, then sends RST \u2014 never completing the connection.",
            certTags: ["Security+", "CEH"]
          },
          {
            question: "Which Nmap scan type is stealthier and doesn't complete the TCP handshake?",
            options: ["-sT (connect scan)", "-sS (SYN scan)", "-sU (UDP scan)", "-sA (ACK scan)"],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "SYN scan (-sS) is called a stealth scan because it doesn't complete the three-way handshake \u2014 it sends RST after receiving SYN-ACK.",
            certTags: ["CEH"]
          },
          {
            question: "FTP transmits credentials in what form?",
            options: ["Encrypted", "Hashed", "Cleartext", "Base64 encoded"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "FTP transmits all data including usernames and passwords in cleartext. SFTP should be used instead for secure file transfers.",
            certTags: ["Security+"]
          }
        ]
      }
    ]
  },
  {
    id: "week08",
    title: "IP Addressing & Subnetting",
    durationText: "Week 8 \u00b7 3 Days",
    focus: "Master binary math, IP addressing, CIDR notation, subnetting, DHCP, and ARP",
    output: "Ability to perform subnet calculations, understand network segmentation, and analyze DHCP/ARP traffic",
    topics: [
      {
        id: "we08d01",
        title: "Binary Math & IP Structure",
        description: "Convert between binary and decimal, understand IP address structure, IP classes, and subnet masks.",
        type: "learn",
        duration: "3 hours",
        content: `:::objectives
- Convert between binary and decimal numbers
- Understand IP address structure (network + host portions)
- Identify IP address classes and why CIDR replaced them
- Interpret subnet masks
:::

## Binary to Decimal Conversion

Each bit position represents a power of 2:

\\\`\\\`\\\`
Position:  7    6    5    4    3    2    1    0
Value:   128   64   32   16    8    4    2    1
\\\`\\\`\\\`

**Example: Convert 11000000 to decimal**

\\\`\\\`\\\`
1\u00d7128 + 1\u00d764 + 0\u00d732 + 0\u00d716 + 0\u00d78 + 0\u00d74 + 0\u00d72 + 0\u00d71
= 128 + 64
= 192
\\\`\\\`\\\`

**Example: Convert 10101000 to decimal**

\\\`\\\`\\\`
1\u00d7128 + 0\u00d764 + 1\u00d732 + 0\u00d716 + 1\u00d78 + 0\u00d74 + 0\u00d72 + 0\u00d71
= 128 + 32 + 8
= 168
\\\`\\\`\\\`

:::concept
### Binary Conversion Table

\\\`\\\`\\\`
Decimal   Binary
  0       00000000
  1       00000001
  127     01111111
  128     10000000
  192     11000000
  224     11100000
  240     11110000
  248     11111000
  252     11111100
  254     11111110
  255     11111111
\\\`\\\`\\\`
:::

## Decimal to Binary Conversion

**Example: Convert 172 to binary**

172 \u00f7 2 = 86 remainder **0**
86 \u00f7 2 = 43 remainder **0**
43 \u00f7 2 = 21 remainder **1**
21 \u00f7 2 = 10 remainder **1**
10 \u00f7 2 = 5 remainder **0**
5 \u00f7 2 = 2 remainder **1**
2 \u00f7 2 = 1 remainder **0**
1 \u00f7 2 = 0 remainder **1**

Read remainders bottom to top: **10101100**

**Shortcut method:** Starting from 128, subtract if the value fits:

\\\`\\\`\\\`
172 - 128 = 44  \u2192 bit = 1
44 - 64 = -20   \u2192 bit = 0
44 - 32 = 12    \u2192 bit = 1
12 - 16 = -4    \u2192 bit = 0
12 - 8 = 4      \u2192 bit = 1
4 - 4 = 0       \u2192 bit = 1
0 - 2 = -2      \u2192 bit = 0
0 - 1 = -1      \u2192 bit = 0

Result: 10101100
\\\`\\\`\\\`

## IP Address Structure

An IPv4 address is 32 bits, written as four octets (dotted decimal):

\\\`\\\`\\\`
192 . 168 . 1 . 100
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524 \u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2524
Network portion  Host portion
(with /24 mask)
\\\`\\\`\\\`

**Network portion:** Identifies the network
**Host portion:** Identifies the specific device on that network

## IP Address Classes (Historical)

| Class | First Octet Range | Default Mask | Network/Host Bits | Use |
|-------|-------------------|--------------|-------------------|-----|
| A | 1-126 | /8 (255.0.0.0) | 8/24 | Large organizations |
| B | 128-191 | /16 (255.255.0.0) | 16/16 | Medium organizations |
| C | 192-223 | /24 (255.255.255.0) | 24/8 | Small organizations |

:::warning
Classful addressing (Classes A, B, C) is obsolete. CIDR (Classless Inter-Domain Routing) replaced it, allowing arbitrary prefix lengths like /25 or /22.
:::

## Subnet Masks

A subnet mask determines which bits are the network portion:

\\\`\\\`\\\`
IP:      192.168.1.100   = 11000000.10101000.00000001.01100100
Mask:    255.255.255.0   = 11111111.11111111.11111111.00000000
         \u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 Network \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524\u251c\u2500 Host \u2500\u2524
\\\`\\\`\\\`

**Common masks:**

| CIDR | Subnet Mask | # of Hosts |
|------|-------------|------------|
| /8 | 255.0.0.0 | 16,777,214 |
| /16 | 255.255.0.0 | 65,534 |
| /24 | 255.255.255.0 | 254 |
| /25 | 255.255.255.128 | 126 |
| /26 | 255.255.255.192 | 62 |
| /27 | 255.255.255.224 | 30 |
| /28 | 255.255.255.240 | 14 |
| /29 | 255.255.255.248 | 6 |
| /30 | 255.255.255.252 | 2 |

**Formula:** Number of usable hosts = 2^(host bits) - 2
The -2 accounts for the network address and broadcast address.`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Why do we subtract 2 when calculating usable hosts in a subnet?",
        interviewAnswer: "Every subnet reserves two addresses: the network address (all host bits set to 0) which identifies the subnet itself, and the broadcast address (all host bits set to 1) which is used to send traffic to all hosts on the subnet. These cannot be assigned to individual devices, so we subtract 2 from the total to get the number of usable host addresses.",
        quiz: [
          {
            question: "What is 11000000 in decimal?",
            options: ["128", "192", "224", "255"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "1\u00d7128 + 1\u00d764 = 192. The remaining bits are 0.",
            certTags: ["Network+"]
          },
          {
            question: "How many usable hosts are in a /24 network?",
            options: ["256", "254", "252", "255"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "2^8 - 2 = 254 usable hosts. The -2 subtracts the network and broadcast addresses.",
            certTags: ["Network+"]
          },
          {
            question: "What is the subnet mask for a /26 network?",
            options: ["255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224"],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "A /26 means 26 network bits: 11111111.11111111.11111111.11000000 = 255.255.255.192",
            certTags: ["Network+"]
          },
          {
            question: "What is 10101000 in decimal?",
            options: ["160", "168", "172", "192"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "1\u00d7128 + 0\u00d764 + 1\u00d732 + 0\u00d716 + 1\u00d78 + 0\u00d74 + 0\u00d72 + 0\u00d71 = 128+32+8 = 168",
            certTags: ["Network+"]
          },
          {
            question: "Why was CIDR introduced to replace classful addressing?",
            options: [
              "Classes were too complex to understand",
              "Classes wasted IP addresses by forcing fixed block sizes",
              "Classes didn't support IPv6",
              "Classes couldn't be routed"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Classful addressing wasted addresses because organizations had to take entire /8 or /16 blocks even if they didn't need them. CIDR allows variable-length prefixes.",
            certTags: ["Network+"]
          },
          {
            question: "In the IP 172.16.5.100 with a /16 mask, which portion is the network?",
            options: ["172", "172.16", "172.16.5", "172.16.5.100"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "With /16 (255.255.0.0), the first 16 bits (172.16) form the network portion.",
            certTags: ["Network+"]
          },
          {
            question: "How many usable hosts are in a /27 network?",
            options: ["32", "30", "28", "62"],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "2^5 - 2 = 30 usable hosts. A /27 leaves 5 bits for hosts.",
            certTags: ["Network+"]
          },
          {
            question: "What is the broadcast address of 192.168.1.0/24?",
            options: ["192.168.1.0", "192.168.1.254", "192.168.1.255", "192.168.1.1"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "The broadcast address has all host bits set to 1. For /24, that's 192.168.1.255.",
            certTags: ["Network+"]
          },
          {
            question: "Convert 240 to binary.",
            options: ["11100000", "11110000", "11111000", "11111100"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "240 = 128+64+32+16 = 11110000",
            certTags: ["Network+"]
          },
          {
            question: "What is the maximum number of subnets you can create from a /16 by subnetting to /24?",
            options: ["8", "16", "256", "65536"],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "Going from /16 to /24 adds 8 bits for subnetting: 2^8 = 256 subnets.",
            certTags: ["Network+"]
          },
          {
            question: "Why is 127.0.0.1 significant?",
            options: [
              "It's the first usable IP in Class A",
              "It's the loopback address used to test local TCP/IP stack",
              "It's a broadcast address",
              "It's reserved for DHCP servers"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "127.0.0.1 is the loopback address \u2014 traffic sent to it loops back to the local machine without going on the network.",
            certTags: ["Network+"]
          },
          {
            question: "How many host bits does a /28 subnet mask leave?",
            options: ["4", "6", "8", "2"],
            correctAnswerIndex: 0,
            difficulty: "intermediate",
            explanation: "32 - 28 = 4 host bits. This gives 2^4 - 2 = 14 usable hosts.",
            certTags: ["Network+"]
          },
          {
            question: "What is the network address of 10.5.130.200/24?",
            options: ["10.0.0.0", "10.5.0.0", "10.5.130.0", "10.5.130.200"],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "With /24, the first three octets (10.5.130) are the network portion. The network address sets all host bits to 0: 10.5.130.0.",
            certTags: ["Network+"]
          }
        ]
      },
      {
        id: "we08d02",
        title: "CIDR, Subnetting & Private Ranges",
        description: "Perform CIDR subnetting, understand private IP ranges, NAT, and subnet calculation exercises.",
        type: "practice",
        duration: "3 hours",
        content: `:::objectives
- Subnet a /24 into smaller subnets using CIDR
- Identify private IP ranges
- Explain how NAT works
- Complete subnet calculation exercises
:::

## CIDR Notation

CIDR uses a slash followed by the number of network bits:

\\\`\\\`\\\`
192.168.1.0/24    \u2192 256 addresses, 254 hosts
192.168.1.0/25    \u2192 128 addresses, 126 hosts
192.168.1.0/26    \u2192 64 addresses, 62 hosts
192.168.1.0/27    \u2192 32 addresses, 30 hosts
192.168.1.0/28    \u2192 16 addresses, 14 hosts
\\\`\\\`\\\`

## Subnetting a /24 into /26 Subnets

Starting network: 192.168.1.0/24

To create /26 subnets, we borrow 2 bits from the host portion (26 - 24 = 2 extra bits):

\\\`\\\`\\\`
/24 mask: 11111111.11111111.11111111.00000000
/26 mask: 11111111.11111111.11111111.11000000

Number of subnets: 2^2 = 4
Hosts per subnet: 2^6 - 2 = 62
\\\`\\\`\\\`

**Resulting subnets:**

| Subnet | Network Address | First Host | Last Host | Broadcast |
|--------|-----------------|------------|-----------|-----------|
| 1 | 192.168.1.0/26 | 192.168.1.1 | 192.168.1.62 | 192.168.1.63 |
| 2 | 192.168.1.64/26 | 192.168.1.65 | 192.168.1.126 | 192.168.1.127 |
| 3 | 192.168.1.128/26 | 192.168.1.129 | 192.168.1.190 | 192.168.1.191 |
| 4 | 192.168.1.192/26 | 192.168.1.193 | 192.168.1.254 | 192.168.1.255 |

**Pattern:** Subnets increment by the block size (64 for /26).

## Private IP Ranges (RFC 1918)

| Range | CIDR | Addresses | Typical Use |
|-------|------|-----------|-------------|
| 10.0.0.0 \u2013 10.255.255.255 | 10.0.0.0/8 | 16,777,216 | Large enterprise networks |
| 172.16.0.0 \u2013 172.31.255.255 | 172.16.0.0/12 | 1,048,576 | Medium networks |
| 192.168.0.0 \u2013 192.168.255.255 | 192.168.0.0/16 | 65,536 | Home/small office networks |

:::warning
Private IP addresses are NOT routable on the public internet. They must be translated to public IPs via NAT before crossing the internet.
:::

## NAT (Network Address Translation)

NAT translates private IPs to public IPs at the router/firewall:

\\\`\\\`\\\`
Internal Network              NAT Router              Internet
192.168.1.100 \u2500\u2500\u253c          \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
192.168.1.101 \u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u253c\u2500 NAT Table \u2500\u253c\u2500\u2500\u2192 Internet
192.168.1.102 \u2500\u2500\u253c          \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518

NAT Table:
192.168.1.100:4421 \u2192 203.0.113.5:4421
192.168.1.101:5533 \u2192 203.0.113.5:5533
\\\`\\\`\\\`

**Types of NAT:**
- **Static NAT:** One-to-one permanent mapping
- **Dynamic NAT:** Pool of public IPs assigned on-demand
- **PAT (Port Address Translation):** Many-to-one using port numbers (most common)

## Subnet Calculation Exercises

**Exercise 1:** How many subnets and hosts per subnet if you subnet 10.0.0.0/8 to /16?
- Extra bits: 16 - 8 = 8
- Subnets: 2^8 = 256
- Hosts per subnet: 2^16 - 2 = 65,534

**Exercise 2:** What is the broadcast address of 172.16.5.128/25?
- Block size for /25 = 128
- Network: 172.16.5.128
- Broadcast: 172.16.5.255

**Exercise 3:** Is 192.168.5.200 in the subnet 192.168.5.0/26 or 192.168.5.128/26?
- /26 block size = 64
- Subnets: .0, .64, .128, .192
- .200 falls in the .192 subnet (192.168.5.192/26)`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "How do you determine which subnet a given IP address belongs to?",
        interviewAnswer: "Apply the subnet mask to the IP address using a bitwise AND operation. For example, with 192.168.5.200 and a /26 mask (255.255.255.192), you AND the last octet: 200 AND 192 = 192. So the network address is 192.168.5.192/26. Alternatively, calculate the block size (256 - 192 = 64), list the subnet boundaries (.0, .64, .128, .192), and find which range the IP falls into.",
        quiz: [
          {
            question: "How many usable hosts are in a /26 subnet?",
            options: ["64", "62", "60", "126"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "2^6 - 2 = 62 usable hosts. The -2 removes the network and broadcast addresses.",
            certTags: ["Network+"]
          },
          {
            question: "Which of these is a private IP address?",
            options: ["8.8.8.8", "172.20.0.1", "203.0.113.5", "11.0.0.1"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "172.20.0.1 falls within the private range 172.16.0.0/12 (172.16.0.0 \u2013 172.31.255.255).",
            certTags: ["Network+"]
          },
          {
            question: "What is the block size of a /27 subnet?",
            options: ["32", "16", "64", "8"],
            correctAnswerIndex: 0,
            difficulty: "intermediate",
            explanation: "Block size = 256 - subnet mask value. /27 = 255.255.255.224. 256 - 224 = 32.",
            certTags: ["Network+"]
          },
          {
            question: "How many subnets do you get by subnetting a /16 to /20?",
            options: ["4", "8", "16", "32"],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "You borrow 4 bits (20 - 16 = 4). 2^4 = 16 subnets.",
            certTags: ["Network+"]
          },
          {
            question: "What does NAT stand for and what does it do?",
            options: [
              "Network Access Translation \u2014 filters malicious traffic",
              "Network Address Translation \u2014 maps private IPs to public IPs",
              "Network Authentication Tunnel \u2014 encrypts traffic",
              "Network Allocation Table \u2014 assigns IP addresses"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "NAT (Network Address Translation) translates private IP addresses to public IP addresses, allowing multiple devices to share one public IP.",
            certTags: ["Network+"]
          },
          {
            question: "What is the broadcast address of 10.0.5.0/28?",
            options: ["10.0.5.15", "10.0.5.16", "10.0.5.31", "10.0.5.255"],
            correctAnswerIndex: 0,
            difficulty: "intermediate",
            explanation: "/28 block size = 16. Network is 10.0.5.0. Broadcast = 0 + 16 - 1 = 15 \u2192 10.0.5.15.",
            certTags: ["Network+"]
          },
          {
            question: "PAT (Port Address Translation) is also known as:",
            options: [
              "Static NAT",
              "Dynamic NAT",
              "NAPT or NAT Overload",
              "Double NAT"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "PAT (Port Address Translation), also called NAPT or NAT Overload, maps multiple private IPs to one public IP using different port numbers.",
            certTags: ["Network+"]
          },
          {
            question: "Which private IP range has the most available addresses?",
            options: ["192.168.0.0/16", "172.16.0.0/12", "10.0.0.0/8", "All are equal"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "10.0.0.0/8 has 2^24 = 16.7 million addresses. 172.16.0.0/12 has ~1 million. 192.168.0.0/16 has ~65,000.",
            certTags: ["Network+"]
          },
          {
            question: "What is the network address of 192.168.10.150/26?",
            options: ["192.168.10.0", "192.168.10.128", "192.168.10.192", "192.168.10.64"],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "/26 block size = 64. Subnets: .0, .64, .128, .192. 150 falls in the .128 subnet.",
            certTags: ["Network+"]
          },
          {
            question: "Why can't private IP addresses be routed on the internet?",
            options: [
              "They use a different protocol than public IPs",
              "Routers are configured to drop packets with private source IPs",
              "Private IPs are always IPv6",
              "Private IPs are too short to be routed"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Internet routers drop packets with private IP source addresses because RFC 1918 reserves these ranges for internal use only.",
            certTags: ["Network+"]
          },
          {
            question: "How many /28 subnets fit in a /24?",
            options: ["4", "8", "16", "32"],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "24 - 28 = -4, so you borrow 4 extra bits: 2^4 = 16 subnets.",
            certTags: ["Network+"]
          },
          {
            question: "Which subnet does IP 10.1.1.100/25 belong to?",
            options: ["10.1.1.0/25", "10.1.1.128/25", "10.1.1.64/25", "10.1.1.32/25"],
            correctAnswerIndex: 0,
            difficulty: "advanced",
            explanation: "/25 block size = 128. Subnets: .0 and .128. 100 < 128, so it's in 10.1.1.0/25.",
            certTags: ["Network+"]
          },
          {
            question: "What is the maximum number of subnets you can create from a /24 by subnetting to /28?",
            options: ["4", "8", "16", "32"],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "28 - 24 = 4 borrowed bits. 2^4 = 16 subnets.",
            certTags: ["Network+"]
          }
        ]
      },
      {
        id: "we08d03",
        title: "DHCP, ARP & Subnet Drills",
        description: "Understand the DHCP DORA process, ARP resolution, ARP spoofing attacks, and complete subnetting drills.",
        type: "lab",
        duration: "3 hours",
        content: `:::objectives
- Explain the DHCP DORA process
- Describe how ARP resolves IP to MAC addresses
- Understand ARP spoofing as an attack vector
- Use ipconfig, arp, and dhcpdump commands
- Complete subnet drill problems
:::

## DHCP DORA Process

DHCP assigns IP addresses dynamically using four steps:

\\\`\\\`\\\`
Client                          DHCP Server
  \u2502                                \u2502
  \u2502\u2500\u2500\u2500\u2500\u2500\u2500 1. DISCOVER (broadcast) \u2500\u2500\u2192\u2502  Client broadcasts looking for DHCP
  \u2502                                \u2502
  \u2502\u2190\u2500\u2500\u2500\u2500\u2500\u2500\u2500 2. OFFER (unicast) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2502  Server offers an IP address
  \u2502                                \u2502
  \u2502\u2500\u2500\u2500\u2500\u2500\u2500 3. REQUEST (broadcast) \u2500\u2500\u2192\u2502  Client accepts the offer
  \u2502                                \u2502
  \u2502\u2190\u2500\u2500\u2500\u2500\u2500\u2500\u2500 4. ACKNOWLEDGE (unicast) \u2500\u2502  Server confirms the assignment
  \u2502                                \u2502
  \u2502    Client now has:              \u2502
  \u2502    IP: 192.168.1.100            \u2502
  \u2502    Mask: 255.255.255.0          \u2502
  \u2502    Gateway: 192.168.1.1         \u2502
  \u2502    DNS: 8.8.8.8                 \u2502
  \u2502    Lease: 24 hours              \u2502
\\\`\\\`\\\`

**DISCOVER:** Client sends a broadcast (255.255.255.255) with its MAC address.
**OFFER:** Server responds with an available IP, subnet mask, gateway, and lease time.
**REQUEST:** Client formally requests the offered IP (broadcast so other DHCP servers know).
**ACKNOWLEDGE:** Server confirms the lease and the client configures its network interface.

## ARP (Address Resolution Protocol)

ARP maps IP addresses to MAC addresses on a local network:

\\\`\\\`\\\`
Computer A (192.168.1.10) wants to reach Computer B (192.168.1.20)

1. A checks its ARP cache for 192.168.1.20
2. If not found, A sends ARP broadcast:
   "Who has 192.168.1.20? Tell 192.168.1.10"
3. B responds with ARP reply:
   "192.168.1.20 is at MAC AA:BB:CC:DD:EE:FF"
4. A stores this mapping in its ARP cache
\\\`\\\`\\\`

**View ARP cache:**
\\\`\\\`\\\`bash
# Windows
arp -a

# Linux
arp -n
ip neigh
\\\`\\\`\\\`

## ARP Spoofing Attack

\\\`\\\`\\\`
Normal:
Victim (192.168.1.10) \u2194 Gateway (192.168.1.1)
                          MAC: AA:BB:CC:DD:EE:FF

ARP Spoofed:
Victim (192.168.1.10) \u2194 Attacker (192.168.1.50) \u2194 Gateway (192.168.1.1)
                          MAC: 11:22:33:44:55:66 (attacker's MAC)
                          Attacker sends forged ARP replies:
                          "192.168.1.1 is at MAC 11:22:33:44:55:66"
\\\`\\\`\\\`

The attacker positions themselves as a man-in-the-middle, intercepting all traffic between the victim and the gateway.

:::warning
ARP has no authentication \u2014 any device can send ARP replies. This is why ARP spoofing is such a common attack on local networks.
:::

## Useful Commands

**Windows:**
\\\`\\\`\\\`bash
ipconfig /all          # Full network configuration
ipconfig /release      # Release DHCP lease
ipconfig /renew        # Request new DHCP lease
arp -a                 # View ARP table
\\\`\\\`\\\`

**Linux:**
\\\`\\\`\\\`bash
ip addr show           # View IP configuration
dhclient -r            # Release DHCP lease
dhclient               # Request new lease
arp -n                 # View ARP table
ip neigh               # View neighbor (ARP) table
\\\`\\\`\\\`

**Capture DHCP traffic:**
\\\`\\\`\\\`bash
sudo dhcpdump -i eth0  # Monitor DHCP DORA in real-time
\\\`\\\`\\\`

:::classwork
### Subnet Drill Problems

Solve each problem without a calculator:

**Problem 1:** What is the broadcast address of 10.10.5.67/28?
<details><summary>Answer</summary>
/28 block size = 16. Subnets: .0, .16, .32, .48, .64. 67 is in the .64 subnet. Broadcast = 64 + 16 - 1 = 79 \u2192 **10.10.5.79**
</details>

**Problem 2:** How many usable hosts in 172.16.0.0/20?
<details><summary>Answer</summary>
Host bits = 32 - 20 = 12. Usable hosts = 2^12 - 2 = 4096 - 2 = **4,094**
</details>

**Problem 3:** Can 192.168.1.100/26 and 192.168.1.130/26 communicate directly without a router?
<details><summary>Answer</summary>
/26 block size = 64. 100 is in .0 subnet (0-63). 130 is in .128 subnet (128-191). They're on different subnets \u2192 **No, they need a router.**
</details>

**Problem 4:** Subnet 10.0.0.0/8 into /12 subnets. How many subnets do you get?
<details><summary>Answer</summary>
Borrowed bits = 12 - 8 = 4. Subnets = 2^4 = **16 subnets**
</details>

**Problem 5:** What is the first usable host in 192.168.5.192/27?
<details><summary>Answer</summary>
Network: 192.168.5.192. First usable: 192.168.5.**193**
</details>
:::

:::checkpoint
### Phase 2 Knowledge Checkpoint

Before moving to Week 9, verify you can:

1. Convert any IP address between binary and decimal
2. Given an IP/CIDR, identify the network address, broadcast, first/last host, and number of usable hosts
3. Subnet a network into smaller subnets and list all subnet ranges
4. Explain the DHCP DORA process
5. Describe how ARP works and how ARP spoofing enables MITM attacks
6. Identify whether two IPs are in the same subnet without a calculator
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Explain the DHCP DORA process and why the DISCOVER message is sent as a broadcast.",
        interviewAnswer: "DORA stands for Discover, Offer, Request, and Acknowledge. The client sends a DISCOVER broadcast because it doesn't yet have an IP address and doesn't know the DHCP server's address. Broadcasting ensures any DHCP server on the local network can respond. The server responds with an OFFER containing an available IP, the client sends a REQUEST to formally accept, and the server confirms with an ACKNOWLEDGE. This entire process allows automatic IP configuration without manual setup.",
        quiz: [
          {
            question: "What does DHCP DORA stand for?",
            options: [
              "Discover, Output, Request, Accept",
              "Discover, Offer, Request, Acknowledge",
              "Define, Open, Reserve, Allocate",
              "Detect, Obtain, Reply, Approve"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "DORA = Discover, Offer, Request, Acknowledge \u2014 the four steps of DHCP IP assignment.",
            certTags: ["Network+"]
          },
          {
            question: "Why is the DHCP DISCOVER message sent as a broadcast?",
            options: [
              "Because the client doesn't know its own MAC address",
              "Because the client doesn't know the DHCP server's IP address",
              "Because broadcasts are faster than unicasts",
              "Because the router requires broadcasts for DHCP"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The client has no IP and doesn't know the DHCP server's address. Broadcasting ensures any DHCP server on the network can respond.",
            certTags: ["Network+"]
          },
          {
            question: "What is the purpose of ARP?",
            options: [
              "To assign IP addresses dynamically",
              "To resolve IP addresses to MAC addresses",
              "To encrypt network traffic",
              "To route packets between networks"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "ARP (Address Resolution Protocol) maps IP addresses to MAC addresses so devices can communicate on the same local network.",
            certTags: ["Network+"]
          },
          {
            question: "How does ARP spoofing enable a man-in-the-middle attack?",
            options: [
              "By encrypting all network traffic",
              "By sending fake ARP replies to associate the attacker's MAC with the gateway's IP",
              "By blocking all DHCP requests",
              "By overloading the switch with traffic"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "ARP spoofing sends forged ARP replies telling the victim that the attacker's MAC address is the gateway, redirecting traffic through the attacker.",
            certTags: ["Security+"]
          },
          {
            question: "Which command shows the ARP cache on Windows?",
            options: ["ipconfig /arp", "arp -a", "netstat -arp", "show arp table"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "arp -a displays the current ARP cache entries showing IP-to-MAC mappings.",
            certTags: ["Network+"]
          },
          {
            question: "What happens after the DHCP server sends an OFFER?",
            options: [
              "The client immediately uses the IP",
              "The client sends a REQUEST to accept the offer",
              "The server sends an ACK automatically",
              "The client sends a DISCOVER again"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "After receiving the OFFER, the client sends a REQUEST to formally accept the offered IP address.",
            certTags: ["Network+"]
          },
          {
            question: "Can two devices on different subnets communicate directly without a router?",
            options: [
              "Yes, if they have the same subnet mask",
              "No, they need a Layer 3 device (router) to communicate",
              "Yes, if they're on the same VLAN",
              "Only if ARP is disabled"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Devices on different subnets need a router (Layer 3 device) to forward traffic between networks.",
            certTags: ["Network+"]
          },
          {
            question: "What is the broadcast address for the subnet 192.168.10.0/28?",
            options: ["192.168.10.15", "192.168.10.16", "192.168.10.255", "192.168.10.31"],
            correctAnswerIndex: 0,
            difficulty: "intermediate",
            explanation: "/28 block size = 16. Network .0, broadcast = .0 + 16 - 1 = .15",
            certTags: ["Network+"]
          },
          {
            question: "Why is ARP considered insecure?",
            options: [
              "It uses encryption that can be broken",
              "It has no authentication \u2014 any device can send ARP replies",
              "It only works on wired networks",
              "It requires root privileges to use"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "ARP has no authentication mechanism. Any device on the network can send fake ARP replies, enabling spoofing attacks.",
            certTags: ["Security+"]
          },
          {
            question: "What information does a DHCP ACKNOWLEDGE contain?",
            options: [
              "Only the IP address",
              "IP address, subnet mask, gateway, DNS, and lease time",
              "The server's MAC address only",
              "The client's previous IP address"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The ACK confirms the lease and includes all network configuration: IP, mask, gateway, DNS servers, and lease duration.",
            certTags: ["Network+"]
          },
          {
            question: "What is the first step when troubleshooting network connectivity on a host?",
            options: [
              "Reboot the router",
              "Check IP configuration with ipconfig or ip addr",
              "Scan for vulnerabilities",
              "Change the subnet mask"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Always start by verifying the host's IP configuration \u2014 correct IP, mask, gateway, and DNS settings.",
            certTags: ["Network+"]
          },
          {
            question: "How can you defend against ARP spoofing?",
            options: [
              "Disable ARP on all devices",
              "Use static ARP entries or Dynamic ARP Inspection (DAI)",
              "Use a hub instead of a switch",
              "Increase the ARP cache timeout"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "Static ARP entries pin critical mappings. Dynamic ARP Inspection (DAI) on switches validates ARP packets against a trusted database (DHCP snooping).",
            certTags: ["Security+"]
          },
          {
            question: "What is the lease time in DHCP?",
            options: [
              "The time the server takes to respond",
              "How long the client can use the assigned IP before renewing",
              "The time to complete the DORA process",
              "The maximum number of DHCP clients"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The lease time is how long the client is authorized to use the assigned IP. It must renew before expiry or risk losing the address.",
            certTags: ["Network+"]
          }
        ]
      }
    ]
  },
  {
    id: "week09",
    title: "DNS, DHCP & HTTP Deep Dive",
    durationText: "Week 9 \u00b7 3 Days",
    focus: "Master DNS resolution, HTTP methods and headers, TLS handshake, and traffic analysis",
    output: "Ability to analyze DNS queries, inspect HTTP traffic, and understand TLS encryption",
    topics: [
      {
        id: "we09d01",
        title: "DNS Resolution Chain",
        description: "Understand the complete DNS resolution process, record types, dig/nslookup commands, and DNS security risks.",
        type: "learn",
        duration: "3 hours",
        content: `:::objectives
- Trace the complete DNS resolution chain
- Identify and explain DNS record types
- Use dig and nslookup for DNS queries
- Understand DNS zone transfers and rebinding attacks
:::

## DNS Resolution Flow

\\\`\\\`\\\`
User types "www.example.com" in browser

1. Browser cache \u2192 check for cached IP
2. OS cache (hosts file + DNS cache)
3. Recursive resolver (ISP or 8.8.8.8)
   \u251c\u2500\u2500 Root server (.) \u2192 "Ask .com server"
   \u251c\u2500\u2500 TLD server (.com) \u2192 "Ask example.com's server"
   \u2514\u2500\u2500 Authoritative server \u2192 "www.example.com = 93.184.216.34"
4. Resolver caches result and returns IP to OS
5. Browser connects to IP address
\\\`\\\`\\\`

:::concept
### DNS Resolution Chain Diagram

\\\`\\\`\\\`
Browser \u2192 OS Cache \u2192 Recursive Resolver \u2192 Root Server (.)
    \u2502                                           \u2502
    \u2502                                     "Ask .com"
    \u2502                                           \u2193
    \u2502                                     TLD Server (.com)
    \u2502                                           \u2502
    \u2502                                     "Ask ns1.example.com"
    \u2502                                           \u2193
    \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2190  Authoritative Server
              "93.184.216.34"
\\\`\\\`\\\`
:::

## DNS Record Types

| Record | Purpose | Example |
|--------|---------|---------|
| A | Maps domain to IPv4 address | example.com \u2192 93.184.216.34 |
| AAAA | Maps domain to IPv6 address | example.com \u2192 2606:2800:220:1::248 |
| CNAME | Alias pointing to another domain | www.example.com \u2192 example.com |
| MX | Mail server for the domain | example.com \u2192 mail.example.com (priority 10) |
| NS | Authoritative name server for domain | example.com \u2192 ns1.example.com |
| TXT | Text data (SPF, DKIM, domain verification) | "v=spf1 include:_spf.google.com ~all" |
| SOA | Start of Authority \u2014 zone metadata | Serial, refresh, retry, expire timers |
| PTR | Reverse DNS \u2014 IP to domain name | 34.216.184.93.in-addr.arpa \u2192 example.com |

## dig Command Examples

**Basic query:**
\\\`\\\`\\\`bash
dig www.example.com
\\\`\\\`\\\`

**Query specific record type:**
\\\`\\\`\\\`bash
dig MX example.com
dig AAAA example.com
dig NS example.com
\\\`\\\`\\\`

**Short output:**
\\\`\\\`\\\`bash
dig +short www.example.com
# Output: 93.184.216.34
\\\`\\\`\\\`

**Trace the full resolution path:**
\\\`\\\`\\\`bash
dig +trace www.example.com
\\\`\\\`\\\`

**Query specific DNS server:**
\\\`\\\`\\\`bash
dig @8.8.8.8 www.example.com
\\\`\\\`\\\`

## nslookup Examples

\\\`\\\`\\\`bash
nslookup www.example.com
nslookup -type=MX example.com
nslookup www.example.com 8.8.8.8
\\\`\\\`\\\`

## DNS Zone Transfer

A zone transfer (AXFR) copies DNS records between servers. If misconfigured, an attacker can request a full zone dump:

\\\`\\\`\\\`bash
dig axfr example.com @ns1.example.com
\\\`\\\`\\\`

:::warning
Zone transfers should only occur between authorized DNS servers. An open zone transfer reveals the entire DNS zone structure, including internal hostnames and IP addresses.
:::

## DNS Rebinding Attacks

DNS rebinding tricks a browser into connecting to an internal IP:

1. Attacker registers evil.com with a very short TTL
2. First DNS response returns attacker's public IP
3. After browser connects, TTL expires
4. Second DNS response returns 192.168.1.1 (internal gateway)
5. Browser sends requests to the internal IP, bypassing firewalls

**Defense:** DNS pinning, DNSSEC, and browsers implementing DNS rebinding protections.`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "How does DNS resolution work and what security risks does it introduce?",
        interviewAnswer: "DNS resolution starts with the browser cache, then OS cache, then a recursive resolver that queries root servers, TLD servers, and authoritative servers to find the IP address. Security risks include DNS spoofing (injecting false records), DNS rebinding (tricking browsers into connecting to internal IPs), open zone transfers (leaking entire DNS zones), and DNS tunneling (encoding data in DNS queries to exfiltrate data). DNSSEC helps prevent spoofing, while proper zone transfer configuration prevents information leakage.",
        quiz: [
          {
            question: "What does a DNS A record map a domain to?",
            options: ["IPv6 address", "IPv4 address", "Mail server", "Name server"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "A records map domains to IPv4 addresses. AAAA records are used for IPv6.",
            certTags: ["Network+"]
          },
          {
            question: "What is the first step in DNS resolution after the browser cache?",
            options: [
              "Query the root server",
              "Check the OS cache (hosts file + DNS cache)",
              "Contact the authoritative server",
              "Send a broadcast on the local network"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "After the browser cache, the OS cache (hosts file and system DNS cache) is checked before contacting any external DNS server.",
            certTags: ["Network+"]
          },
          {
            question: "Which dig flag shows only the answer without additional details?",
            options: ["+trace", "+short", "+nocmd", "+nostats"],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "+short outputs just the IP address(s) without the full DNS response details.",
            certTags: ["Security+"]
          },
          {
            question: "Why are DNS zone transfers a security risk?",
            options: [
              "They cause denial of service",
              "They reveal the entire DNS zone structure including internal hostnames",
              "They encrypt DNS traffic",
              "They redirect traffic to attacker servers"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Open zone transfers expose all DNS records in a zone, revealing internal hostnames, IP addresses, and network structure to attackers.",
            certTags: ["Security+"]
          },
          {
            question: "What is a DNS CNAME record?",
            options: [
              "A record pointing to an IPv6 address",
              "An alias that points to another domain name",
              "A mail server record",
              "A text record for SPF configuration"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "CNAME (Canonical Name) creates an alias pointing one domain to another \u2014 e.g., www.example.com \u2192 example.com.",
            certTags: ["Network+"]
          },
          {
            question: "How does a DNS rebinding attack work?",
            options: [
              "It floods the DNS server with requests",
              "It tricks a browser into connecting to an internal IP after initial connection to attacker's IP",
              "It encrypts DNS queries to hide malicious traffic",
              "It redirects all traffic to a phishing site"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "DNS rebinding uses a short TTL to first return the attacker's IP, then after connection, returns an internal IP (like 192.168.1.1), bypassing firewall rules.",
            certTags: ["CEH"]
          },
          {
            question: "What is the purpose of an MX record?",
            options: [
              "Map a domain to an IP address",
              "Specify the mail server for a domain",
              "Create a domain alias",
              "Define the authoritative name server"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "MX (Mail Exchange) records specify which mail server handles email for a domain, along with a priority value.",
            certTags: ["Network+"]
          },
          {
            question: "Which command queries the DNS server 8.8.8.8 directly?",
            options: [
              "dig www.example.com",
              "dig @8.8.8.8 www.example.com",
              "dig --server=8.8.8.8 www.example.com",
              "dig -dns=8.8.8.8 www.example.com"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The @ syntax before an IP address tells dig to query that specific DNS server instead of the system default.",
            certTags: ["Security+"]
          },
          {
            question: "What does the SOA record contain?",
            options: [
              "The IP address of the domain",
              "Zone metadata: serial number, refresh, retry, and expire timers",
              "The mail server configuration",
              "The list of name servers"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "SOA (Start of Authority) contains zone metadata including serial number, refresh interval, retry interval, expire time, and minimum TTL.",
            certTags: ["Network+"]
          },
          {
            question: "What is DNSSEC used for?",
            options: [
              "Encrypting DNS queries",
              "Preventing DNS spoofing by digitally signing DNS records",
              "Speeding up DNS resolution",
              "Blocking DNS rebinding attacks"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "DNSSEC adds cryptographic signatures to DNS records, allowing resolvers to verify that responses haven't been tampered with.",
            certTags: ["Security+"]
          },
          {
            question: "Which record type is used for reverse DNS lookups?",
            options: ["A", "AAAA", "PTR", "CNAME"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "PTR (Pointer) records map IP addresses back to domain names, used for reverse DNS lookups.",
            certTags: ["Network+"]
          },
          {
            question: "What is the purpose of the TTL value in a DNS record?",
            options: [
              "The maximum number of queries allowed",
              "How long (in seconds) the record can be cached before re-querying",
              "The timeout for DNS resolution",
              "The priority of the record"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "TTL (Time To Live) specifies how many seconds a DNS record can be cached. After expiry, the resolver must query the authoritative server again.",
            certTags: ["Network+"]
          }
        ]
      },
      {
        id: "we09d02",
        title: "HTTP Methods, Headers & TLS",
        description: "Master HTTP methods, request/response structure, important headers, and the TLS handshake process.",
        type: "learn",
        duration: "3 hours",
        content: `:::objectives
- Identify HTTP methods and their purposes
- Understand request/response structure
- Recognize important HTTP headers
- Explain the TLS handshake step by step
- Use curl to inspect HTTP traffic
:::

## HTTP Methods

| Method | Purpose | Has Body | Idempotent | Safe |
|--------|---------|----------|------------|------|
| GET | Retrieve a resource | No | Yes | Yes |
| POST | Create a new resource | Yes | No | No |
| PUT | Replace a resource entirely | Yes | Yes | No |
| PATCH | Partially update a resource | Yes | No | No |
| DELETE | Remove a resource | Optional | Yes | No |
| HEAD | Same as GET but returns headers only | No | Yes | Yes |
| OPTIONS | Describe communication options for the resource | No | Yes | Yes |

:::warning
GET requests should never modify server data. POST, PUT, PATCH, and DELETE are used for mutations.
:::

## HTTP Request Structure

\\\`\\\`\\\`
GET /api/users HTTP/1.1
Host: example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
Cookie: session=abc123
User-Agent: Mozilla/5.0 (Windows NT 10.0)
Accept: application/json
\\\`\\\`\\\`

## HTTP Response Structure

\\\`\\\`\\\`
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 256
Set-Cookie: session=abc123; HttpOnly; Secure
X-Frame-Options: DENY

{"id": 1, "name": "Alice", "role": "admin"}
\\\`\\\`\\\`

## Important HTTP Headers

| Header | Direction | Purpose |
|--------|-----------|---------|
| Host | Request | Specifies the target domain (required in HTTP/1.1) |
| Content-Type | Both | MIME type of the body (application/json, text/html) |
| Authorization | Request | Authentication credentials (Bearer token, Basic auth) |
| Cookie | Request | Session cookies sent to server |
| Set-Cookie | Response | Cookies the server wants the client to store |
| User-Agent | Request | Client software identification |
| X-Forwarded-For | Request | Original client IP (when behind proxy) |
| Content-Length | Both | Size of the body in bytes |
| Cache-Control | Response | Caching directives (no-cache, max-age) |

## TLS Handshake (Simplified)

\\\`\\\`\\\`
Client                              Server
  \u2502                                   \u2502
  \u2502\u2500\u2500\u2500 1. ClientHello \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2192\u2502  Supported TLS versions, cipher suites
  \u2502                                   \u2502
  \u2502\u2190\u2500\u2500\u2500 2. ServerHello \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2502  Chosen TLS version, cipher suite, certificate
  \u2502                                   \u2502
  \u2502    3. Client verifies certificate \u2502  Checks CA signature, expiry, domain match
  \u2502                                   \u2502
  \u2502\u2500\u2500\u2500 4. Key Exchange \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2192\u2502  Pre-master secret encrypted with server's public key
  \u2502                                   \u2502
  \u2502    5. Both derive session keys    \u2502  From shared secret
  \u2502                                   \u2502
  \u2502\u2194\u2500\u2500\u2500 Encrypted Application Data \u2194\u2500\u2500\u2500\u2502  All subsequent data is encrypted
\\\`\\\`\\\`

**Result:** A symmetric session key is established. All further communication is encrypted with AES or similar symmetric encryption.

## curl Examples

**Verbose request with headers:**
\\\`\\\`\\\`bash
curl -v -I https://example.com
\\\`\\\`\\\`

**POST with JSON body:**
\\\`\\\`\\\`bash
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Alice", "email": "alice@example.com"}'
\\\`\\\`\\\`

**Follow redirects:**
\\\`\\\`\\\`bash
curl -L -v https://example.com
\\\`\\\`\\\`

**Show response headers only:**
\\\`\\\`\\\`bash
curl -I https://example.com
\\\`\\\`\\\``,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Explain the difference between HTTP and HTTPS and describe the TLS handshake.",
        interviewAnswer: "HTTP sends data in cleartext, while HTTPS encrypts data using TLS. The TLS handshake begins with the client sending a ClientHello with supported cipher suites. The server responds with ServerHello, its chosen cipher suite, and its certificate. The client verifies the certificate against trusted CAs, then exchanges a pre-master secret encrypted with the server's public key. Both sides derive symmetric session keys from this secret. All subsequent communication is encrypted symmetrically, providing confidentiality, integrity, and authentication.",
        quiz: [
          {
            question: "Which HTTP method is used to retrieve a resource without modifying it?",
            options: ["POST", "PUT", "GET", "DELETE"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "GET retrieves a resource without causing side effects. It should be safe and idempotent.",
            certTags: ["Network+"]
          },
          {
            question: "What is the difference between PUT and PATCH?",
            options: [
              "PUT replaces the entire resource; PATCH applies partial updates",
              "PUT is faster than PATCH",
              "PATCH requires authentication; PUT does not",
              "There is no difference"
            ],
            correctAnswerIndex: 0,
            difficulty: "intermediate",
            explanation: "PUT replaces the entire resource with the new representation. PATCH applies partial modifications to specific fields.",
            certTags: ["Network+"]
          },
          {
            question: "What header contains the authentication token in an HTTP request?",
            options: ["Cookie", "User-Agent", "Authorization", "X-Forwarded-For"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "The Authorization header carries authentication credentials, typically as 'Bearer <token>' or 'Basic <base64>'.",
            certTags: ["Security+"]
          },
          {
            question: "What is the purpose of the TLS handshake?",
            options: [
              "To assign an IP address to the client",
              "To establish a symmetric encryption key for secure communication",
              "To resolve the domain name to an IP address",
              "To compress the data before transmission"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The TLS handshake negotiates cipher suites and exchanges keys to establish symmetric encryption for the session.",
            certTags: ["Security+"]
          },
          {
            question: "What does the HTTP 403 status code indicate?",
            options: [
              "Resource not found",
              "Server error",
              "Forbidden \u2014 server understood but refuses to authorize",
              "Temporary redirect"
            ],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "403 Forbidden means the server understands the request but the client lacks permission to access the resource.",
            certTags: ["Network+"]
          },
          {
            question: "Which curl flag makes the request verbose to see headers?",
            options: ["-v", "-I", "-L", "-X"],
            correctAnswerIndex: 0,
            difficulty: "beginner",
            explanation: "-v (verbose) shows detailed request and response headers, TLS negotiation, and other connection details.",
            certTags: ["Security+"]
          },
          {
            question: "What does the Host header specify?",
            options: [
              "The client's IP address",
              "The target domain name (required in HTTP/1.1)",
              "The server's operating system",
              "The authentication method"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The Host header specifies which domain the client is requesting. It's required in HTTP/1.1 for virtual hosting.",
            certTags: ["Network+"]
          },
          {
            question: "Why is the TLS handshake secure even though the pre-master secret is sent over the network?",
            options: [
              "It's sent via UDP which is harder to intercept",
              "It's encrypted with the server's public key, only the server can decrypt it",
              "It's compressed so it's too small to intercept",
              "The firewall blocks interception"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "The pre-master secret is encrypted with the server's RSA public key. Only the server with the corresponding private key can decrypt it, making interception useless.",
            certTags: ["Security+"]
          },
          {
            question: "What does the Set-Cookie header with HttpOnly flag prevent?",
            options: [
              "The cookie from being sent over HTTPS",
              "JavaScript from accessing the cookie (prevents XSS cookie theft)",
              "The cookie from expiring",
              "The cookie from being sent to subdomains"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "HttpOnly prevents client-side JavaScript from accessing the cookie, mitigating XSS attacks that try to steal session tokens.",
            certTags: ["Security+"]
          },
          {
            question: "Which HTTP method is idempotent and has no request body?",
            options: ["POST", "PUT", "DELETE", "HEAD"],
            correctAnswerIndex: 3,
            difficulty: "advanced",
            explanation: "HEAD is idempotent (like GET) and returns only headers with no body. PUT and DELETE are idempotent but typically have bodies.",
            certTags: ["Network+"]
          },
          {
            question: "What is the purpose of the X-Forwarded-For header?",
            options: [
              "To encrypt the request",
              "To identify the original client IP when behind a proxy or load balancer",
              "To forward the request to another server",
              "To specify the HTTP version"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "X-Forwarded-For preserves the original client IP address when requests pass through proxies or load balancers.",
            certTags: ["Security+"]
          },
          {
            question: "What is the difference between symmetric and asymmetric encryption in TLS?",
            options: [
              "Symmetric uses one key; asymmetric uses a public/private key pair",
              "Symmetric is slower than asymmetric",
              "Asymmetric encrypts data; symmetric only hashes",
              "There is no difference in TLS"
            ],
            correctAnswerIndex: 0,
            difficulty: "intermediate",
            explanation: "Asymmetric encryption (public/private key pair) is used during the handshake to exchange the symmetric key. Symmetric encryption (same key both sides) is then used for bulk data transfer because it's much faster.",
            certTags: ["Security+"]
          }
        ]
      },
      {
        id: "we09d03",
        title: "HTTP Security & Wireshark Analysis",
        description: "Inspect HTTP traffic in Wireshark, identify cleartext credentials, analyze security headers, and complete a hands-on exercise.",
        type: "lab",
        duration: "3 hours",
        content: `:::objectives
- Capture and analyze HTTP traffic with Wireshark
- Follow TCP streams to reconstruct conversations
- Identify cleartext credentials in HTTP traffic
- Analyze security headers (HSTS, CSP, X-Frame-Options)
- Complete a Wireshark HTTP analysis exercise
:::

## Inspecting HTTP Traffic in Wireshark

**Start capture and filter HTTP:**
\\\`\\\`\\\`
http
\\\`\\\`\\\`

**Filter by HTTP method:**
\\\`\\\`\\\`
http.request.method == "POST"
http.request.method == "GET"
\\\`\\\`\\\`

**Filter by host:**
\\\`\\\`\\\`
http.host == "example.com"
\\\`\\\`\\\`

**Filter by content type:**
\\\`\\\`\\\`
http.content_type contains "text"
\\\`\\\`\\\`

## Following TCP Streams

1. Find an HTTP packet in Wireshark
2. Right-click \u2192 Follow \u2192 TCP Stream
3. This reassembles the full conversation in order

The TCP stream shows:
- The HTTP request headers and body
- The HTTP response headers and body
- Any data exchanged between client and server

:::warning
HTTP traffic (port 80) is completely unencrypted. Anyone on the network path can read usernames, passwords, session tokens, and all other data using Wireshark or similar tools.
:::

## Identifying Credentials in Cleartext HTTP

Look for POST requests with form data:
\\\`\\\`\\\`
POST /login HTTP/1.1
Content-Type: application/x-www-form-urlencoded

username=admin&password=P@ssw0rd123
\\\`\\\`\\\`

**Wireshark filter to find login attempts:**
\\\`\\\`\\\`
http.request.method == "POST" && http.request.uri == "/login"
\\\`\\\`\\\`

Right-click the packet \u2192 Follow \u2192 TCP Stream to see the credentials.

## Security Headers Analysis

**HSTS (HTTP Strict Transport Security):**
\\\`\\\`\\\`
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
\\\`\\\`\\\`
Forces browsers to always use HTTPS for this domain.

**CSP (Content Security Policy):**
\\\`\\\`\\\`
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.com
\\\`\\\`\\\`
Controls which resources the browser is allowed to load, preventing XSS.

**X-Frame-Options:**
\\\`\\\`\\\`
X-Frame-Options: DENY
\\\`\\\`\\\`
Prevents the page from being embedded in iframes (clickjacking protection).

**Other important headers:**
\\\`\\\`\\\`
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=()
\\\`\\\`\\\`

## Analyzing Security Headers with curl

\\\`\\\`\\\`bash
curl -I -s https://example.com | grep -iE "strict-transport|content-security|x-frame|x-content-type|x-xss"
\\\`\\\`\\\`

:::classwork
### Wireshark HTTP Analysis Exercise

**Setup:** Create a simple HTTP server on one machine and access it from another (or use a vulnerable VM).

1. **Start Wireshark capture** on the network interface

2. **Generate HTTP traffic:**
   - Visit an HTTP website (not HTTPS)
   - Submit a login form if available
   - Download a file

3. **Filter and analyze:**
   - Filter: \\\`http.request.method == "POST"\\\`
   - Find the login POST request
   - Right-click \u2192 Follow \u2192 TCP Stream
   - What credentials can you see?

4. **Analyze HTTP headers:**
   - Find the HTTP response
   - Examine the response headers
   - Which security headers are present? Which are missing?

5. **Document findings:**
   - List all cleartext data visible in the capture
   - List all security headers present (or missing)
   - Write recommendations for securing this traffic

6. **Test HTTPS version:**
   - Access the same service over HTTPS
   - Can you read the data in Wireshark now?
   - What can you still see (SNI, certificate info)?
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "What security headers should every web application implement and why?",
        interviewAnswer: "Key security headers include: HSTS (forces HTTPS, preventing downgrade attacks), Content-Security-Policy (prevents XSS by controlling resource loading), X-Frame-Options (prevents clickjacking by blocking iframe embedding), X-Content-Type-Options (prevents MIME sniffing), and Referrer-Policy (controls referrer information leakage). These headers are simple to implement at the server or CDN level and provide significant defense-in-depth against common web attacks.",
        quiz: [
          {
            question: "What does the HSTS header do?",
            options: [
              "Encrypts all HTTP traffic",
              "Forces browsers to always use HTTPS for the domain",
              "Blocks all HTTP requests",
              "Redirects HTTP to a different domain"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "HSTS (HTTP Strict Transport Security) tells the browser to only connect via HTTPS, preventing SSL stripping attacks.",
            certTags: ["Security+"]
          },
          {
            question: "In Wireshark, how do you view the full HTTP conversation?",
            options: [
              "Right-click \u2192 Copy \u2192 Stream",
              "Right-click \u2192 Follow \u2192 TCP Stream",
              "Right-click \u2192 Analyze \u2192 HTTP",
              "Right-click \u2192 Export \u2192 Stream"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Following the TCP stream reassembles the full conversation in order, showing request and response data together.",
            certTags: ["Security+"]
          },
          {
            question: "What does the Content-Security-Policy header prevent?",
            options: [
              "SQL injection",
              "Cross-Site Scripting (XSS) by controlling resource loading",
              "Denial of service attacks",
              "Man-in-the-middle attacks"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "CSP restricts which resources (scripts, styles, images) the browser can load, preventing XSS by blocking unauthorized scripts.",
            certTags: ["Security+"]
          },
          {
            question: "Why is HTTP login form submission dangerous?",
            options: [
              "It's too slow for modern applications",
              "Credentials are sent in cleartext, readable by anyone on the network path",
              "It doesn't support modern browsers",
              "It uses too much bandwidth"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "HTTP sends all data including credentials in cleartext. Attackers can capture them with Wireshark or network sniffing tools.",
            certTags: ["Security+"]
          },
          {
            question: "What does X-Frame-Options: DENY prevent?",
            options: [
              "Cross-site request forgery",
              "Clickjacking by blocking iframe embedding",
              "SQL injection",
              "Directory traversal"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "X-Frame-Options: DENY prevents the page from being loaded in iframes, stopping clickjacking attacks where invisible frames trick users.",
            certTags: ["Security+"]
          },
          {
            question: "What can an attacker still see in HTTPS traffic using Wireshark?",
            options: [
              "The full request and response body",
              "The Server Name Indication (SNI) in the TLS handshake",
              "The user's password",
              "The session cookies in plaintext"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "While HTTPS encrypts the data, the TLS handshake reveals the SNI (which domain is being accessed) and the server certificate. This is why encrypted SNI (ESNI) was developed.",
            certTags: ["CEH"]
          },
          {
            question: "Which Wireshark filter shows only POST requests?",
            options: [
              "http.method == POST",
              "http.request.method == POST",
              "tcp.port == 80 && post",
              "http.post == true"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The correct Wireshark display filter for HTTP POST requests is http.request.method == POST.",
            certTags: ["Security+"]
          },
          {
            question: "What is the purpose of the X-Content-Type-Options header?",
            options: [
              "To specify the content encoding",
              "To prevent MIME type sniffing (nosniff)",
              "To compress the response body",
              "To cache the content type"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "X-Content-Type-Options: nosniff prevents browsers from MIME-sniffing responses, which can lead to security issues like drive-by downloads.",
            certTags: ["Security+"]
          },
          {
            question: "What is the risk of not implementing HSTS?",
            options: [
              "The website will be slower",
              "Attackers can perform SSL stripping to downgrade HTTPS to HTTP",
              "Search engines won't index the site",
              "Cookies won't work properly"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Without HSTS, an attacker performing a MITM attack can strip HTTPS from the initial connection, tricking the user into communicating over cleartext HTTP.",
            certTags: ["Security+"]
          },
          {
            question: "When analyzing HTTP traffic, where would you find the cleartext password?",
            options: [
              "In the HTTP response headers",
              "In the POST request body (form data)",
              "In the URL query parameters only",
              "In the HTTP cookies"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "When forms submit via POST, the credentials appear in the request body. In Wireshark, following the TCP stream reveals this cleartext data.",
            certTags: ["Security+"]
          },
          {
            question: "What does the Permissions-Policy header control?",
            options: [
              "Server access permissions",
              "Browser feature access (camera, microphone, geolocation)",
              "File system permissions",
              "Database access permissions"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Permissions-Policy controls which browser features the page can use \u2014 e.g., camera=(), microphone=() disables those APIs.",
            certTags: ["Security+"]
          },
          {
            question: "What is the first thing you should check when analyzing an HTTP response in Wireshark?",
            options: [
              "The response body content",
              "The status code (200, 301, 404, 500)",
              "The source IP address",
              "The packet size"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "The status code tells you immediately whether the request succeeded, redirected, or failed. This guides further analysis.",
            certTags: ["Security+"]
          }
        ]
      }
    ]
  },
  {
    id: "week10",
    title: "Network Security Architecture",
    durationText: "Week 10 \u00b7 3 Days",
    focus: "Understand firewalls, IDS/IPS, VPNs, tunneling, and implement defense in depth with a UFW capstone lab",
    output: "Ability to configure network security controls and implement defense in depth strategies",
    topics: [
      {
        id: "we10d01",
        title: "Firewalls & IDS/IPS",
        description: "Learn about packet filtering, stateful, and application-layer firewalls, plus the differences between IDS and IPS.",
        type: "learn",
        duration: "3 hours",
        content: `:::objectives
- Compare packet filtering, stateful, and application-layer firewalls
- Explain the difference between IDS and IPS
- Understand signature-based vs anomaly-based detection
- Configure basic Windows Firewall rules
:::

## Types of Firewalls

### Packet Filtering Firewall (Layer 3/4)
Filters packets based on source/destination IP, port, and protocol:

\\\`\\\`\\\`
Rules:
  ALLOW TCP 192.168.1.0/24 \u2192 any port 22
  ALLOW TCP any \u2192 any port 80,443
  DENY  any \u2192 any
\\\`\\\`\\\`

**Pros:** Fast, low overhead
**Cons:** No state tracking, can't inspect payload

### Stateful Firewall (Layer 3/4)
Tracks connection state (SYN, ESTABLISHED, RELATED):

\\\`\\\`\\\`
Rules:
  ESTABLISHED,RELATED \u2192 ALLOW
  TCP SYN \u2192 port 22,80,443 \u2192 ALLOW
  ALL \u2192 DENY
\\\`\\\`\\\`

**Pros:** Knows if a packet is part of an established connection
**Cons:** Can't inspect application-layer content

### Application Layer Firewall / WAF (Layer 7)
Inspects HTTP/HTTPS traffic for attacks:

\\\`\\\`\\\`
Detects:
  SQL injection in query parameters
  XSS in form inputs
  Path traversal in URLs
  Anomalous request patterns
\\\`\\\`\\\`

**Pros:** Deep inspection, catches application attacks
**Cons:** Slower, requires tuning, can be bypassed with encryption

:::concept
### Firewall Types Comparison

\\\`\\\`\\\`
\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 Layer 7: Application Firewall / WAF                 \u2502
\u2502 Inspects HTTP content, SQL injection, XSS           \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Layer 3/4: Stateful Firewall                        \u2502
\u2502 Tracks connections, allows ESTABLISHED traffic      \u2502
\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 Layer 3/4: Packet Filtering Firewall                \u2502
\u2502 Filters by IP, port, protocol only                  \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
\\\`\\\`\\\`
:::

## IDS vs IPS

| Feature | IDS (Intrusion Detection System) | IPS (Intrusion Prevention System) |
|---------|----------------------------------|-----------------------------------|
| Mode | Passive (monitoring only) | Inline (sits in the traffic path) |
| Action | Alerts on suspicious traffic | Blocks suspicious traffic |
| Impact | Does not affect traffic flow | Can block legitimate traffic if misconfigured |
| Placement | Connected to a SPAN/mirror port | Inline between network segments |
| Response | Log, alert, notify | Drop packets, reset connections, block IPs |

## Detection Methods

**Signature-based:**
- Matches traffic against known attack patterns
- Fast and accurate for known threats
- Cannot detect zero-day attacks
- Like antivirus for network traffic

**Anomaly-based:**
- Builds a baseline of normal behavior
- Flags deviations from the baseline
- Can detect unknown/zero-day attacks
- Higher false positive rate

## Windows Firewall Basics

**View current rules:**
\\\`\\\`\\\`powershell
Get-NetFirewallRule | Where-Object {$_.Enabled -eq 'True'} | Select-Object DisplayName, Direction, Action
\\\`\\\`\\\`

**Block inbound traffic on port 445:**
\\\`\\\`\\\`powershell
New-NetFirewallRule -DisplayName "Block SMB" -Direction Inbound -Protocol TCP -LocalPort 445 -Action Block
\\\`\\\`\\\`

**Allow inbound SSH:**
\\\`\\\`\\\`powershell
New-NetFirewallRule -DisplayName "Allow SSH" -Direction Inbound -Protocol TCP -LocalPort 22 -Action Allow
\\\`\\\`\\\`

**Remove a rule:**
\\\`\\\`\\\`powershell
Remove-NetFirewallRule -DisplayName "Block SMB"
\\\`\\\`\\\``,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "What is the difference between an IDS and an IPS, and where would you place each?",
        interviewAnswer: "An IDS (Intrusion Detection System) monitors traffic passively and generates alerts \u2014 it doesn't block anything. It's typically connected to a SPAN/mirror port on a switch. An IPS (Intrusion Prevention System) sits inline in the traffic path and can actively drop malicious packets or reset connections. The IDS approach doesn't impact network performance but provides no active protection, while the IPS provides active defense but can become a single point of failure or introduce latency.",
        quiz: [
          {
            question: "What is the main limitation of a packet filtering firewall?",
            options: [
              "It's too slow for high-traffic networks",
              "It cannot track connection state or inspect payloads",
              "It only works with IPv6",
              "It requires a dedicated hardware appliance"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Packet filtering firewalls only examine headers (IP, port, protocol) without tracking connection state or inspecting application-layer content.",
            certTags: ["Security+"]
          },
          {
            question: "How does a stateful firewall improve upon packet filtering?",
            options: [
              "It inspects HTTP content for SQL injection",
              "It tracks the state of connections (SYN, ESTABLISHED, etc.)",
              "It encrypts all traffic passing through",
              "It blocks all traffic by default"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Stateful firewalls maintain a state table tracking active connections, allowing them to permit only packets belonging to established sessions.",
            certTags: ["Security+"]
          },
          {
            question: "What is the key difference between IDS and IPS?",
            options: [
              "IDS is faster than IPS",
              "IDS alerts on threats; IPS actively blocks them",
              "IDS works on Layer 2; IPS works on Layer 7",
              "There is no difference"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "IDS is passive (alert only) while IPS is inline and actively blocks malicious traffic by dropping packets or resetting connections.",
            certTags: ["Security+"]
          },
          {
            question: "What is a disadvantage of anomaly-based detection?",
            options: [
              "It cannot detect known attacks",
              "It requires frequent updates to signature databases",
              "It has a higher false positive rate than signature-based detection",
              "It only works on encrypted traffic"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "Anomaly-based detection flags deviations from normal behavior, which can generate many false positives when legitimate traffic is unusual.",
            certTags: ["Security+"]
          },
          {
            question: "Where should an IDS be placed on the network?",
            options: [
              "Inline between the router and the internal network",
              "Connected to a SPAN/mirror port on a switch",
              "At the endpoint on each workstation",
              "Between the DNS server and the internet"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "IDS is passive and connects to a SPAN/mirror port to receive a copy of traffic without being inline in the data path.",
            certTags: ["Security+"]
          },
          {
            question: "What type of firewall can detect SQL injection attacks?",
            options: [
              "Packet filtering firewall",
              "Stateful firewall",
              "Application layer firewall / WAF",
              "All of the above"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "Only application layer firewalls/WAFs inspect Layer 7 HTTP content to detect attacks like SQL injection and XSS.",
            certTags: ["Security+"]
          },
          {
            question: "Why is signature-based detection unable to detect zero-day attacks?",
            options: [
              "Zero-day attacks use encryption",
              "Signature-based detection only matches known attack patterns",
              "Zero-day attacks don't generate network traffic",
              "Signature databases update too frequently"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Signature-based detection requires pre-defined patterns. Zero-day attacks have no known signature yet, so they bypass signature matching.",
            certTags: ["Security+"]
          },
          {
            question: "What is a potential risk of deploying an IPS?",
            options: [
              "It cannot detect encrypted traffic",
              "It becomes a single point of failure and can block legitimate traffic if misconfigured",
              "It only works with TCP connections",
              "It requires no configuration"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "IPS is inline, so a failure or misconfiguration can block all traffic. It also introduces latency and must be carefully tuned.",
            certTags: ["Security+"]
          },
          {
            question: "What Windows PowerShell command creates a firewall rule to allow inbound SSH?",
            options: [
              "New-NetFirewallRule -DisplayName 'Allow SSH' -Direction Inbound -Protocol TCP -LocalPort 22 -Action Allow",
              "Set-NetFirewall -SSH enable",
              "Enable-Firewall -Port 22 -Protocol TCP",
              "netsh firewall add ssh allow"
            ],
            correctAnswerIndex: 0,
            difficulty: "intermediate",
            explanation: "The PowerShell cmdlet New-NetFirewallRule creates a new firewall rule with specific parameters for direction, protocol, port, and action.",
            certTags: ["Security+"]
          },
          {
            question: "What is defense in depth?",
            options: [
              "Using a single very strong firewall",
              "Layering multiple security controls throughout the network",
              "Encrypting all traffic with TLS",
              "Blocking all inbound traffic"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Defense in depth uses multiple layers of security controls (firewalls, IDS, encryption, access controls) so that if one fails, others still protect the system.",
            certTags: ["Security+"]
          },
          {
            question: "Which firewall approach is most likely to have false positives that block legitimate traffic?",
            options: [
              "Packet filtering",
              "Stateful inspection",
              "Anomaly-based IPS",
              "Rule-based WAF"
            ],
            correctAnswerIndex: 2,
            difficulty: "advanced",
            explanation: "Anomaly-based systems flag deviations from baseline behavior, which can cause false positives when legitimate users do something unusual.",
            certTags: ["Security+"]
          },
          {
            question: "What is the advantage of an application layer firewall over a stateful firewall?",
            options: [
              "It's faster and has lower latency",
              "It can inspect and filter content within HTTP requests",
              "It doesn't require any configuration",
              "It works with all protocols equally"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Application layer firewalls/WAFs inspect the actual content of HTTP requests, detecting attacks that stateful firewalls would miss because they only examine headers.",
            certTags: ["Security+"]
          }
        ]
      },
      {
        id: "we10d02",
        title: "VPNs, Tunneling & Defense in Depth",
        description: "Learn about VPN types, WireGuard setup, SSH tunneling, and the defense in depth security model.",
        type: "learn",
        duration: "3 hours",
        content: `:::objectives
- Compare site-to-site and remote access VPNs
- Set up WireGuard on Ubuntu
- Configure SSH tunneling (local, remote, SOCKS proxy)
- Apply defense in depth and least privilege principles
:::

## VPN Types

### Site-to-Site VPN
Connects entire networks over the internet:

\\\`\\\`\\\`
Office A Network \u2500\u2500\u2500\u2500 VPN Gateway \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 VPN Gateway \u2500\u2500\u2500\u2500 Office B Network
10.0.0.0/24              \u2502      Encrypted Tunnel      \u2502              10.1.0.0/24
                         \u2502  (IPsec, IKEv2, WireGuard)  \u2502
\\\`\\\`\\\`

### Remote Access VPN
Connects individual users to a network:

\\\`\\\`\\\`
Laptop (Coffee Shop) \u2500\u2500\u2500\u2500 VPN Client \u2550\u2550\u2550\u2550\u2550\u2550 VPN Server \u2500\u2500\u2500\u2500 Corporate Network
Dynamic IP                   \u2502    Encrypted Tunnel  \u2502     10.0.0.0/24
                             \u2502  (WireGuard, OpenVPN) \u2502
\\\`\\\`\\\`

## WireGuard Setup on Ubuntu

**Install WireGuard:**
\\\`\\\`\\\`bash
sudo apt update
sudo apt install wireguard
\\\`\\\`\\\`

**Generate keys:**
\\\`\\\`\\\`bash
wg genkey | tee privatekey | wg pubkey > publickey
\\\`\\\`\\\`

**Server configuration** (/etc/wireguard/wg0.conf):
\\\`\\\`\\\`
[Interface]
PrivateKey = <server_private_key>
Address = 10.0.0.1/24
ListenPort = 51820

[Peer]
PublicKey = <client_public_key>
AllowedIPs = 10.0.0.2/32
\\\`\\\`\\\`

**Start WireGuard:**
\\\`\\\`\\\`bash
sudo wg-quick up wg0
sudo systemctl enable wg-quick@wg0
\\\`\\\`\\\`

## SSH Tunneling

### Local Port Forwarding
Access a remote service through the SSH server:

\\\`\\\`\\\`bash
ssh -L 8080:internal-server:80 user@ssh-server
\\\`\\\`\\\`
Now browse to http://localhost:8080 to reach internal-server:80.

### Remote Port Forwarding
Expose a local service to the remote network:

\\\`\\\`\\\`bash
ssh -R 9090:localhost:3000 user@remote-server
\\\`\\\`\\\`
Now remote-server:9090 forwards to your local port 3000.

### SOCKS Proxy
Route all traffic through the SSH server:

\\\`\\\`\\\`bash
ssh -D 1080 user@ssh-server
\\\`\\\`\\\`
Configure your browser to use SOCKS5 proxy at localhost:1080.

:::warning
SSH tunneling can bypass network security controls. Monitor for unauthorized tunnels in your environment.
:::

## Defense in Depth

Multiple layers of security controls:

\\\`\\\`\\\`
Layer 1: Physical Security
  \u2514\u2500\u2500 Locked doors, security cameras, access badges

Layer 2: Network Security
  \u2514\u2500\u2500 Firewalls, IDS/IPS, VPNs, network segmentation

Layer 3: Host Security
  \u2514\u2500\u2500 OS hardening, antivirus, host firewalls, patching

Layer 4: Application Security
  \u2514\u2500\u2500 Secure coding, WAF, input validation, authentication

Layer 5: Data Security
  \u2514\u2500\u2500 Encryption at rest and in transit, access controls, backups

Layer 6: User Security
  \u2514\u2500\u2500 Training, MFA, least privilege, security awareness
\\\`\\\`\\\`

## Least Privilege Principle

Grant users and systems only the minimum permissions needed:

- **Users:** Role-based access control (RBAC)
- **Services:** Run with dedicated service accounts, not root/admin
- **Network:** Micro-segmentation \u2014 servers only access what they need
- **Applications:** API keys with minimal scopes`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Explain the difference between local and remote SSH port forwarding and give a use case for each.",
        interviewAnswer: "Local port forwarding (-L) creates a tunnel from your local machine through the SSH server to a destination service. For example, SSH -L 8080:internal-server:80 user@jump-box lets you access an internal web server that isn't directly reachable. Remote port forwarding (-R) works in reverse \u2014 it exposes your local service to the remote network. For example, SSH -R 9090:localhost:3000 user@cloud-server lets the cloud server forward port 9090 traffic back to your local development server, useful for sharing a local app with remote testers.",
        quiz: [
          {
            question: "What is the difference between a site-to-site VPN and a remote access VPN?",
            options: [
              "Site-to-site is encrypted; remote access is not",
              "Site-to-site connects entire networks; remote access connects individual users",
              "Site-to-site uses WireGuard; remote access uses IPsec",
              "There is no difference"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Site-to-site VPNs connect entire office networks over the internet. Remote access VPNs allow individual users to connect to the corporate network from anywhere.",
            certTags: ["Security+"]
          },
          {
            question: "Which command generates a WireGuard key pair?",
            options: [
              "wg-keygen",
              "wg genkey | tee privatekey | wg pubkey > publickey",
              "wireguard --generate-keys",
              "ssh-keygen -t wireguard"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "WireGuard key generation uses wg genkey to create a private key, pipes it to tee for saving, and wg pubkey derives the public key.",
            certTags: ["Security+"]
          },
          {
            question: "What does SSH local port forwarding do?",
            options: [
              "Exposes a local service to the remote network",
              "Accesses a remote service through the SSH server by forwarding a local port",
              "Creates a VPN tunnel using SSH",
              "Forwards all internet traffic through the SSH server"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Local port forwarding (-L) maps a local port to a remote service, letting you access internal resources through the SSH server.",
            certTags: ["Security+"]
          },
          {
            question: "What is the least privilege principle?",
            options: [
              "Giving users as many permissions as possible for convenience",
              "Granting only the minimum permissions needed to perform a task",
              "Using the least secure authentication method",
              "Limiting the number of users on a network"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Least privilege means giving users and systems only the permissions they absolutely need, reducing the attack surface if credentials are compromised.",
            certTags: ["Security+"]
          },
          {
            question: "What is a risk of SSH tunneling from a security perspective?",
            options: [
              "It slows down the network significantly",
              "It can bypass firewalls and network security controls",
              "It only works on Linux systems",
              "It requires root access"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "SSH tunnels encrypt all traffic, making it invisible to IDS/IPS and firewalls. Attackers use this to exfiltrate data or establish covert channels.",
            certTags: ["Security+"]
          },
          {
            question: "Which SSH flag creates a SOCKS proxy?",
            options: ["-L", "-R", "-D", "-N"],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "-D opens a SOCKS proxy on the specified port, allowing all traffic to be routed through the SSH server.",
            certTags: ["Security+"]
          },
          {
            question: "In defense in depth, what is the purpose of network segmentation?",
            options: [
              "To make the network faster",
              "To limit the blast radius of a breach by isolating network segments",
              "To reduce the number of firewalls needed",
              "To eliminate the need for encryption"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Segmentation limits lateral movement \u2014 if one segment is compromised, the attacker can't easily reach other segments.",
            certTags: ["Security+"]
          },
          {
            question: "What port does WireGuard use by default?",
            options: ["22", "1194", "51820", "443"],
            correctAnswerIndex: 2,
            difficulty: "beginner",
            explanation: "WireGuard uses UDP port 51820 by default, configurable in the [Interface] section.",
            certTags: ["Security+"]
          },
          {
            question: "What is the purpose of remote SSH port forwarding?",
            options: [
              "To access the SSH server's files",
              "To expose a local service to the remote network",
              "To encrypt local disk storage",
              "To create a site-to-site VPN"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "Remote port forwarding (-R) makes a local service accessible from the remote network \u2014 useful for sharing development servers or providing temporary access.",
            certTags: ["Security+"]
          },
          {
            question: "Which layer of defense in depth addresses user training?",
            options: [
              "Layer 1 - Physical",
              "Layer 2 - Network",
              "Layer 5 - Data",
              "Layer 6 - User"
            ],
            correctAnswerIndex: 3,
            difficulty: "beginner",
            explanation: "Layer 6 (User Security) includes security awareness training, phishing simulations, and MFA implementation.",
            certTags: ["Security+"]
          },
          {
            question: "Why should VPN traffic be monitored even though it's encrypted?",
            options: [
              "VPN traffic is always unencrypted",
              "Monitoring can detect unauthorized tunnels and anomalous traffic patterns",
              "VPN traffic doesn't need monitoring",
              "Monitoring decrypts the traffic automatically"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "Even though VPN traffic is encrypted, metadata like volume, timing, and endpoints can reveal unauthorized access or data exfiltration.",
            certTags: ["Security+"]
          },
          {
            question: "What is micro-segmentation?",
            options: [
              "Dividing a network into large subnets",
              "Creating very granular network segments, often at the workload level",
              "Using VLANs for network isolation",
              "Splitting a firewall into multiple instances"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "Micro-segmentation creates granular security zones around individual workloads or applications, limiting lateral movement even within the same subnet.",
            certTags: ["Security+"]
          }
        ]
      },
      {
        id: "we10d03",
        title: "UFW Capstone Lab",
        description: "Install and configure UFW on Ubuntu, create firewall rules, test with nmap, and verify Phase 2 knowledge.",
        type: "lab",
        duration: "3 hours",
        content: `:::objectives
- Install and enable UFW on Ubuntu
- Configure default policies (deny incoming, allow outgoing)
- Create specific port rules
- Test firewall rules with nmap from another terminal
- Monitor UFW logs in real-time
:::

## UFW Setup

**Check UFW status:**
\\\`\\\`\\\`bash
sudo ufw status verbose
\\\`\\\`\\\`

**Set default policies:**
\\\`\\\`\\\`bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
\\\`\\\`\\\`

**Allow SSH (critical \u2014 do this before enabling!):**
\\\`\\\`\\\`bash
sudo ufw allow 22/tcp
\\\`\\\`\\\`

**Allow HTTP and HTTPS:**
\\\`\\\`\\\`bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
\\\`\\\`\\\`

**Enable UFW:**
\\\`\\\`\\\`bash
sudo ufw enable
\\\`\\\`\\\`

:::warning
Always allow SSH (port 22) BEFORE enabling UFW, or you will lock yourself out of remote access!
:::

## Useful UFW Commands

\\\`\\\`\\\`bash
sudo ufw status numbered      # Show rules with line numbers
sudo ufw status verbose       # Detailed status with logging info
sudo ufw delete 3             # Delete rule #3
sudo ufw allow from 192.168.1.0/24  # Allow entire subnet
sudo ufw deny 445/tcp         # Block SMB
sudo ufw logging on           # Enable logging
sudo ufw logging high         # Log all blocked packets
\\\`\\\`\\\`

## Testing with Nmap

**From another machine (or second terminal):**

**Scan for open ports:**
\\\`\\\`\\\`bash
nmap -sV -p 22,80,443,445 target_ip
\\\`\\\`\\\`

**SYN scan:**
\\\`\\\`\\\`bash
nmap -sS -p 1-1000 target_ip
\\\`\\\`\\\`

**Full port scan:**
\\\`\\\`\\\`bash
nmap -p- target_ip
\\\`\\\`\\\`

Expected results:
- Port 22: open (SSH allowed)
- Port 80: open (HTTP allowed)
- Port 443: open (HTTPS allowed)
- Port 445: filtered (blocked by UFW)
- All other ports: filtered (default deny)

## Monitoring UFW Logs

**Watch logs in real-time:**
\\\`\\\`\\\`bash
sudo journalctl -f | grep UFW
\\\`\\\`\\\`

**Or check UFW log directly:**
\\\`\\\`\\\`bash
sudo tail -f /var/log/ufw.log
\\\`\\\`\\\`

**Example log output:**
\\\`\\\`\\\`
[UFW BLOCK] IN=eth0 OUT= MAC=... SRC=192.168.1.50 DST=192.168.1.100 PROTO=TCP SPT=44231 DPT=445 LEN=60
\\\`\\\`\\\`

:::classwork
### UFW Capstone Exercise

**Step 1: Initial Setup**
\\\`\\\`\\\`bash
# Check current status
sudo ufw status verbose

# If UFW is active, disable it first for a clean start
sudo ufw disable

# Set default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing
\\\`\\\`\\\`

**Step 2: Allow Essential Services**
\\\`\\\`\\\`bash
# Allow SSH (BEFORE enabling!)
sudo ufw allow 22/tcp comment 'SSH'

# Allow web traffic
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'

# Verify rules
sudo ufw status numbered
\\\`\\\`\\\`

**Step 3: Block Specific Services**
\\\`\\\`\\\`bash
# Block SMB (common attack vector)
sudo ufw deny 445/tcp comment 'Block SMB'

# Block Telnet (insecure)
sudo ufw deny 23/tcp comment 'Block Telnet'
\\\`\\\`\\\`

**Step 4: Enable and Test**
\\\`\\\`\\\`bash
# Enable UFW
sudo ufw enable

# Verify it's active
sudo ufw status verbose
\\\`\\\`\\\`

**Step 5: Test from Another Terminal**
\\\`\\\`\\\`bash
# On the ATTACKER machine (or second terminal):
nmap -sV -p 22,80,443,445,23 target_ip
\\\`\\\`\\\`

Document the results:
- Which ports show as open?
- Which ports show as filtered?
- Can you connect via Telnet? Why or why not?

**Step 6: Monitor and Analyze**
\\\`\\\`\\\`bash
# Terminal 1: Watch UFW logs
sudo journalctl -f | grep UFW

# Terminal 2: Generate traffic from attacker
nmap -sS target_ip
\\\`\\\`\\\`

Review the logs:
- What information is logged for blocked packets?
- Can you identify the attacker's IP address?
- What protocols were attempted?

**Step 7: Cleanup**
\\\`\\\`\\\`bash
# Remove specific rules if needed
sudo ufw status numbered
sudo ufw delete <rule_number>

# Or reset UFW entirely
sudo ufw reset
\\\`\\\`\\\`

:::checkpoint
### Phase 2 Complete \u2014 Knowledge Verification

By the end of Phase 2, you should be able to:

1. Map any network concept to its OSI layer
2. Explain the TCP three-way handshake and identify it in Wireshark
3. Perform binary-to-decimal and decimal-to-binary conversion
4. Subnet a network into any CIDR prefix and calculate addresses
5. Describe the DHCP DORA process and ARP resolution
6. Trace DNS resolution and use dig/nslookup effectively
7. Identify HTTP methods, headers, and analyze traffic in Wireshark
8. Explain the TLS handshake and its security properties
9. Compare firewall types and IDS/IPS deployment strategies
10. Configure UFW rules and verify them with nmap
11. Set up SSH tunnels for legitimate administrative purposes
12. Apply defense in depth and least privilege in network design
:::`,
        aiPrompt: "",
        labUrl: "",
        labTitle: "",
        interviewQuestion: "Walk through how you would configure a basic Ubuntu firewall to secure a web server.",
        interviewAnswer: "First, I'd set default policies to deny incoming and allow outgoing. Before enabling UFW, I'd allow SSH on port 22 to avoid lockout. Then I'd allow HTTP (80) and HTTPS (443). I'd block known attack vectors like SMB (445) and Telnet (23). After enabling UFW, I'd test with nmap from another machine to verify only the intended ports are open. Finally, I'd enable logging with ufw logging high and monitor logs with journalctl to detect any blocked attempts. This follows the principle of least privilege \u2014 only the services the server needs are accessible.",
        quiz: [
          {
            question: "What should you always do BEFORE enabling UFW?",
            options: [
              "Install Apache",
              "Allow SSH (port 22) to prevent lockout",
              "Set up a VPN",
              "Install nmap"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Always allow SSH before enabling UFW to avoid locking yourself out of remote access.",
            certTags: ["Security+"]
          },
          {
            question: "Which command sets the default policy to block all incoming connections?",
            options: [
              "sudo ufw default deny incoming",
              "sudo ufw deny all",
              "sudo ufw block incoming",
              "sudo ufw default block all"
            ],
            correctAnswerIndex: 0,
            difficulty: "beginner",
            explanation: "ufw default deny incoming sets the default action for all unspecified incoming traffic to block.",
            certTags: ["Security+"]
          },
          {
            question: "How do you view UFW rules with line numbers?",
            options: [
              "sudo ufw list",
              "sudo ufw status numbered",
              "sudo ufw show rules",
              "sudo ufw --verbose"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "ufw status numbered shows all rules with line numbers, which you can use to delete specific rules.",
            certTags: ["Security+"]
          },
          {
            question: "What is the expected nmap result for a port blocked by UFW?",
            options: [
              "open",
              "closed",
              "filtered",
              "It doesn't appear in the scan"
            ],
            correctAnswerIndex: 2,
            difficulty: "intermediate",
            explanation: "UFW blocks packets by default without sending a response, so nmap reports the port as 'filtered' rather than 'closed'.",
            certTags: ["Security+"]
          },
          {
            question: "Which UFW command allows an entire subnet?",
            options: [
              "sudo ufw allow 192.168.1.0/24",
              "sudo ufw allow from 192.168.1.0/24",
              "sudo ufw allow subnet 192.168.1.0/24",
              "sudo ufw permit 192.168.1.0/24"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "The 'from' keyword specifies the source subnet: sudo ufw allow from 192.168.1.0/24.",
            certTags: ["Security+"]
          },
          {
            question: "What does 'sudo ufw enable' do if SSH isn't allowed first?",
            options: [
              "Nothing \u2014 UFW won't enable without SSH",
              "Blocks all traffic including SSH, potentially locking you out",
              "Automatically allows SSH",
              "Only blocks non-SSH traffic"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "UFW enables with the default deny incoming policy. If SSH (22) isn't explicitly allowed, you lose remote access.",
            certTags: ["Security+"]
          },
          {
            question: "How do you delete a specific UFW rule by line number?",
            options: [
              "sudo ufw remove 3",
              "sudo ufw delete 3",
              "sudo ufw drop rule 3",
              "sudo ufw erase 3"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "ufw delete <number> removes the rule at that line number from the status output.",
            certTags: ["Security+"]
          },
          {
            question: "What information does UFW log for blocked packets?",
            options: [
              "Only the destination IP",
              "Source IP, destination IP, protocol, ports, and packet length",
              "Only the port number",
              "Nothing \u2014 blocked packets aren't logged"
            ],
            correctAnswerIndex: 1,
            difficulty: "intermediate",
            explanation: "UFW logs the full packet header information including source/destination IPs, protocol, ports, and packet length.",
            certTags: ["Security+"]
          },
          {
            question: "What does 'sudo ufw default allow outgoing' mean?",
            options: [
              "Blocks all outgoing traffic",
              "Allows all outgoing traffic unless specifically denied",
              "Only allows outgoing HTTP/HTTPS",
              "Allows outgoing to trusted IPs only"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "Default allow outgoing means all outbound connections are permitted unless a specific deny rule exists.",
            certTags: ["Security+"]
          },
          {
            question: "Why would you use 'sudo ufw logging high' instead of 'sudo ufw logging on'?",
            options: [
              "High is faster than on",
              "High logs all blocked packets including those at the kernel level",
              "On only logs allowed traffic",
              "High disables logging for allowed traffic"
            ],
            correctAnswerIndex: 1,
            difficulty: "advanced",
            explanation: "UFW logging levels control verbosity. 'high' captures more detail including kernel-level blocked packets, useful for security analysis.",
            certTags: ["Security+"]
          },
          {
            question: "After enabling UFW with default deny incoming, which nmap scan type is most useful for testing?",
            options: [
              "nmap -sU (UDP scan)",
              "nmap -sT (connect scan)",
              "nmap -sS (SYN scan)",
              "nmap -sV (version scan)"
            ],
            correctAnswerIndex: 2,
            difficulty: "advanced",
            explanation: "SYN scan is most useful because it's fast and UFW's response (or lack thereof) clearly shows filtered vs open ports.",
            certTags: ["Security+"]
          },
          {
            question: "What does 'sudo ufw reset' do?",
            options: [
              "Disables UFW temporarily",
              "Removes all rules and disables UFW completely",
              "Resets UFW to default allow-all policy",
              "Restarts the UFW service"
            ],
            correctAnswerIndex: 1,
            difficulty: "beginner",
            explanation: "UFW reset removes all configured rules, disables the firewall, and returns to the default (inactive) state.",
            certTags: ["Security+"]
          }
        ]
      }
    ]
  }
];
