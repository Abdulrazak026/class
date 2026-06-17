import React, { useState } from 'react';
import { Shield, Flag, Lock, Unlock, Lightbulb, CheckCircle2, XCircle, AlertTriangle, Trophy, Star, Code, Hash, ArrowRight } from 'lucide-react';

interface CTFChallenge {
  id: string;
  title: string;
  category: 'Cryptography' | 'Web Exploitation' | 'Reverse Engineering' | 'Forensics' | 'Binary Exploitation' | 'OSINT' | 'Steganography';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  description: string;
  hint: string;
  flagPrefix: string;
  flagPattern: string;
  points: number;
  solved: boolean;
}

const CHALLENGES: CTFChallenge[] = [
  {
    id: 'ctf1', title: 'Caesar\'s Secret', category: 'Cryptography', difficulty: 'Easy',
    description: 'We intercepted this encrypted message: "WKH_TXLFN_EURZQ_IRA_MXPSV_RYHU_WKH_ODCB_GRJ". Decrypt it using the Caesar cipher. The flag is the decrypted text in lowercase with underscores.',
    hint: 'The shift is 3 (ROT3). Shift each letter backward by 3 positions.',
    flagPrefix: 'flag{', flagPattern: 'the_quick_brown_fox_jumps_over_the_lazy_dog',
    points: 100, solved: false,
  },
  {
    id: 'ctf2', title: 'Hidden in Plain Sight', category: 'Steganography', difficulty: 'Easy',
    description: 'An image file contains a hidden message in its least significant bits (LSB). The extracted bits spell out an ASCII message. We extracted: 01000110 01001100 01000001 01000111 01111011 01101100 01110011 01100010 01011111 01110011 01110100 01100101 01100111 00110000 00110001 00110010 00110001 01111101. Decode the binary to ASCII.',
    hint: 'Convert each 8-bit binary group to its ASCII character value.',
    flagPrefix: 'flag{', flagPattern: 'lsb_steg0121',
    points: 100, solved: false,
  },
  {
    id: 'ctf3', title: 'SQL Injection 101', category: 'Web Exploitation', difficulty: 'Medium',
    description: 'A login form is vulnerable to SQL injection. The query is: SELECT * FROM users WHERE username=\'admin\' AND password=\'{input}\'. Bypass authentication by providing a password that always evaluates to true.',
    hint: 'Try: \' OR \'1\'=\'1',
    flagPrefix: 'flag{', flagPattern: 'sql_injection_master',
    points: 200, solved: false,
  },
  {
    id: 'ctf4', title: 'Packet Puzzle', category: 'Forensics', difficulty: 'Medium',
    description: 'A pcap file contains suspicious network traffic. The attacker exfiltrated data via DNS queries. Each subdomain contains a base64-encoded character. Decode: ZXhmaWx0cmF0aW9uX2RldGVjdGVk (hint: it\'s a base64 string, decode and submit as the flag).',
    hint: 'Use base64 decode: echo "ZXhmaWx0cmF0aW9uX2RldGVjdGVk" | base64 -d',
    flagPrefix: 'flag{', flagPattern: 'exfiltration_detected',
    points: 200, solved: false,
  },
  {
    id: 'ctf5', title: 'Reverse the Binary', category: 'Reverse Engineering', difficulty: 'Hard',
    description: 'A stripped binary contains a hidden flag. The function validate_flag() XORs each input byte with 0x2A and compares to: [75, 69, 74, 72, 81, 79, 72, 79, 75, 82, 74, 67, 95, 65, 79, 75, 78]. XOR each byte with 0x2A to reveal the flag.',
    hint: 'XOR each decimal value with 0x2A (42 in decimal). Convert to ASCII.',
    flagPrefix: 'flag{', flagPattern: 'r3v3rs3_m4st3r',
    points: 300, solved: false,
  },
  {
    id: 'ctf6', title: 'Privilege Escalation', category: 'Binary Exploitation', difficulty: 'Hard',
    description: 'A SUID binary runs with root privileges. It reads a file specified by the user but checks if the path starts with "/home/user/". Use a path traversal or symlink to read /root/flag.txt.',
    hint: 'Try symbolic links: ln -s /root/flag.txt /home/user/flag.txt',
    flagPrefix: 'flag{', flagPattern: 'pr1v_3sc_c0mpl3t3',
    points: 300, solved: false,
  },
  {
    id: 'ctf7', title: 'Open Source Intel', category: 'OSINT', difficulty: 'Medium',
    description: 'A company named "CyberCorp" has a GitHub repo with a comment in commit abc123 that says "TODO: Remove hardcoded key — MD5: a6b5c8e1d2f3g4h5i6j7k8l9m0n1o2p3". What is the decoded MD5? (Not actually an MD5 — the hex is a hint: reverse it, it says something).',
    hint: 'The "MD5" hex string, when reversed and decoded from hex, reveals the flag.',
    flagPrefix: 'flag{', flagPattern: 'osint_detective',
    points: 200, solved: false,
  },
  {
    id: 'ctf8', title: 'WebSocket Hijack', category: 'Web Exploitation', difficulty: 'Expert',
    description: 'A real-time chat app uses WebSockets without origin verification. Exploit CSWSH (Cross-Site WebSocket Hijacking) to read messages from the admin bot. The flag is the admin\'s first private message.',
    hint: 'Create an HTML page that connects to ws://target/chat and sends: {"type":"join","room":"admin"}',
    flagPrefix: 'flag{', flagPattern: 'ws_hijack_success',
    points: 500, solved: false,
  },
];

const DIFFICULTY_COLORS = {
  Easy: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  Hard: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  Expert: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Cryptography: <Lock className="w-4 h-4" />,
  'Web Exploitation': <Code className="w-4 h-4" />,
  'Reverse Engineering': <Hash className="w-4 h-4" />,
  Forensics: <Shield className="w-4 h-4" />,
  'Binary Exploitation': <AlertTriangle className="w-4 h-4" />,
  OSINT: <ArrowRight className="w-4 h-4" />,
  Steganography: <Unlock className="w-4 h-4" />,
};

export function CtfChallenge() {
  const [challenges, setChallenges] = useState(CHALLENGES);
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [solvedCount, setSolvedCount] = useState(0);

  const filtered = categoryFilter === 'all' ? challenges : challenges.filter(c => c.category === categoryFilter);
  const totalPoints = challenges.filter(c => c.solved).reduce((sum, c) => sum + c.points, 0);
  const challenge = activeChallenge ? challenges.find(c => c.id === activeChallenge) : null;

  const handleSubmit = () => {
    if (!challenge) return;
    const normalizedInput = flagInput.trim().toLowerCase().replace(/flag\{/g, '').replace(/\}/g, '');
    const normalizedPattern = challenge.flagPattern.toLowerCase();
    if (normalizedInput === normalizedPattern) {
      setResult('correct');
      setChallenges(prev => prev.map(c => c.id === challenge.id ? { ...c, solved: true } : c));
      setSolvedCount(prev => prev + 1);
    } else {
      setResult('wrong');
    }
  };

  const openChallenge = (id: string) => {
    setActiveChallenge(id);
    setFlagInput('');
    setResult(null);
    setShowHint(false);
  };

  return (
    <div className="my-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Flag className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">CTF Challenges</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs font-bold text-gray-500">
            <Trophy className="w-4 h-4 text-amber-500" /> {totalPoints} pts
          </span>
          <span className="text-xs text-gray-400">{challenges.filter(c => c.solved).length}/{challenges.length} solved</span>
        </div>
      </div>

      <div className="p-4">
        {!activeChallenge && (
          <>
            <div className="flex items-center gap-1 mb-4 flex-wrap">
              <button onClick={() => setCategoryFilter('all')}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${categoryFilter === 'all' ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>All</button>
              {['Cryptography', 'Web Exploitation', 'Reverse Engineering', 'Forensics', 'Binary Exploitation', 'OSINT', 'Steganography'].map(cat => (
                <button key={cat} onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${categoryFilter === cat ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{cat}</button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map(c => {
                const icon = CATEGORY_ICONS[c.category] || <Flag className="w-4 h-4" />;
                return (
                  <button key={c.id} onClick={() => openChallenge(c.id)}
                    className={`border-2 rounded-xl p-4 text-left transition-all ${
                      c.solved ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-accent/40 hover:shadow-sm'
                    }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.solved ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                          {c.solved ? <CheckCircle2 className="w-4 h-4" /> : icon}
                        </div>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${DIFFICULTY_COLORS[c.difficulty]}`}>{c.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className={`w-3 h-3 ${c.solved ? 'text-green-500' : 'text-amber-400'}`} />
                        <span className="text-[10px] font-bold text-gray-500">{c.points}</span>
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">{c.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-1">{c.category}</p>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {challenge && (
          <div>
            <button onClick={() => setActiveChallenge(null)}
              className="text-xs font-bold text-accent hover:text-accent-dark mb-4 flex items-center gap-1">
              ← Back to Challenges
            </button>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold px-2 py-1 rounded ${DIFFICULTY_COLORS[challenge.difficulty]}`}>{challenge.difficulty}</span>
                <span className="text-[10px] text-gray-500">{challenge.category}</span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-500"><Star className="w-3.5 h-3.5" />{challenge.points} pts</span>
              </div>
              {challenge.solved && (
                <span className="flex items-center gap-1 text-xs font-bold text-green-600"><CheckCircle2 className="w-4 h-4" /> Solved</span>
              )}
            </div>

            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">{challenge.title}</h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{challenge.description}</p>
            </div>

            {showHint && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-4 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">Hint</p>
                  <p className="text-sm text-amber-700 dark:text-amber-400">{challenge.hint}</p>
                </div>
              </div>
            )}

            {!showHint && !challenge.solved && (
              <button onClick={() => setShowHint(true)}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 mb-4 flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5" /> Show Hint
              </button>
            )}

            {!challenge.solved && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">Enter Flag</label>
                  <div className="flex gap-2">
                    <input type="text" value={flagInput} onChange={e => setFlagInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
                      className="flex-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 text-sm font-mono text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-accent/40"
                      placeholder="flag{...}" />
                    <button onClick={handleSubmit}
                      className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2">
                      <Flag className="w-4 h-4" /> Submit
                    </button>
                  </div>
                </div>

                {result === 'correct' && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-green-700 dark:text-green-300">Correct! +{challenge.points} pts</p>
                      <p className="text-xs text-green-600 dark:text-green-400">Challenge solved successfully.</p>
                    </div>
                  </div>
                )}
                {result === 'wrong' && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-red-700 dark:text-red-300">Incorrect flag</p>
                      <p className="text-xs text-red-600 dark:text-red-400">Try again or use the hint.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {challenge.solved && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
                <Trophy className="w-10 h-10 text-amber-500 mx-auto mb-2" />
                <p className="font-bold text-green-700 dark:text-green-300">Challenge Complete!</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">You earned {challenge.points} points.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
