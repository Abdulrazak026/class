import { useState, useEffect } from 'react';
import { Lock, Globe, WifiOff, Loader2, CheckCircle2, XCircle, KeyRound } from 'lucide-react';
import { sha256, decryptFile } from '../utils/crypto';
import { checkAccessCode } from '../firebase/accessControl';
import { setDecryptedData } from '../utils/dataLoader';

interface LockScreenProps {
  onUnlock: () => void;
}

const bars = [35, 65, 45, 80, 55, 90, 40, 70];
const colors = ['#f97316', '#8b5cf6', '#06b6d4', '#10b981', '#f43f5e', '#6366f1', '#eab308', '#3b82f6'];

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch('https://class-eight-mu.vercel.app/version.json?t=' + Date.now(), {
          cache: 'no-cache', signal: AbortSignal.timeout(5000)
        });
        if (res.ok) setStatus('online');
        else setStatus('offline');
      } catch {
        setStatus('offline');
      }
    };
    check();
  }, []);

  const handleSubmit = async () => {
    const trimmed = code.trim();
    if (!trimmed || trimmed.length < 4) {
      setMessage({ text: 'Code must be at least 4 characters.', error: true });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const codeHash = await sha256(trimmed.toLowerCase());

      const result = await checkAccessCode(codeHash);

      if (!result.success) {
        setMessage({ text: result.message, error: true });
        setLoading(false);
        return;
      }

      const encRes = await fetch('/data.enc?t=' + Date.now(), { cache: 'no-cache' });
      const classworksRes = await fetch('/classworks.enc?t=' + Date.now(), { cache: 'no-cache' });

      if (!encRes.ok) {
        setMessage({ text: 'Failed to load course data. Please try again.', error: true });
        setLoading(false);
        return;
      }

      const encData = await encRes.arrayBuffer();
      let classworksData: ArrayBuffer | null = null;
      if (classworksRes.ok) classworksData = await classworksRes.arrayBuffer();

      const decryptKey = result.contentKey || 'DACAMP-2026';
      const decrypted = await decryptFile(encData, decryptKey);
      let decryptedClassworks = null;
      if (classworksData) {
        try {
          decryptedClassworks = await decryptFile(classworksData, decryptKey);
        } catch {}
      }

      setDecryptedData(JSON.parse(decrypted), decryptedClassworks ? JSON.parse(decryptedClassworks) : null);

      const uid = result.userId || 1;
      const token = {
        deviceId: localStorage.getItem('device-id') || '',
        codeHash,
        userId: uid,
        grantedAt: Date.now(),
        contentKey: result.contentKey || null,
      };
      localStorage.setItem('access-token', JSON.stringify(token));
      localStorage.setItem('assigned-user-id', uid.toString());

      setMessage({ text: 'Course unlocked! Welcome.', error: false });
      setTimeout(() => onUnlock(), 800);
    } catch (e: any) {
      if (e?.name === 'OperationError' || e?.message?.includes('decrypt')) {
        setMessage({ text: 'DECRYPT_FAIL: Invalid access code or key mismatch.', error: true });
      } else {
        setMessage({ text: e?.message || 'NETWORK_ERR: Connection error. Please try again.', error: true });
      }
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      {/* Animated chart background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-rose-700 to-indigo-900">
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />
        <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          {/* Animated bar chart */}
          {bars.map((h, i) => (
            <rect key={`bar-${i}`} x={100 + i * 140} y={600 - h * 4}
              width={60} height={h * 4} rx={4}
              fill={colors[i]} opacity="0.6"
            >
              <animate attributeName="height" values={`${h * 2};${h * 4};${h * 2}`}
                dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="y" values={`${600 - h * 2};${600 - h * 4};${600 - h * 2}`}
                dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </rect>
          ))}

          {/* Animated line chart */}
          <path d="M0,500 C100,480 200,520 300,450 C400,380 450,420 550,400
                   C650,380 700,340 800,360 C900,380 950,300 1050,320
                   C1100,330 1150,280 1200,290"
            fill="none" stroke="white" strokeWidth="3" opacity="0.4"
            >
            <animate attributeName="d"
              values="M0,500 C100,480 200,520 300,450 C400,380 450,420 550,400 C650,380 700,340 800,360 C900,380 950,300 1050,320 C1100,330 1150,280 1200,290;
                      M0,480 C100,500 200,440 300,470 C400,420 450,390 550,420 C650,400 700,370 800,340 C900,320 950,360 1050,310 C1100,290 1150,320 1200,280;
                      M0,500 C100,480 200,520 300,450 C400,380 450,420 550,400 C650,380 700,340 800,360 C900,380 950,300 1050,320 C1100,330 1150,280 1200,290"
              dur="8s" repeatCount="indefinite" />
          </path>

          {/* Scatter dots */}
          {Array.from({ length: 30 }, (_, i) => {
            const x = 50 + Math.sin(i * 1.7) * 500 + 100;
            const y = 200 + Math.cos(i * 2.3) * 150;
            const r = 3 + (i % 4);
            return (
              <circle key={`dot-${i}`} cx={x} cy={y} r={r}
                fill={colors[i % colors.length]} opacity="0.5">
                <animate attributeName="cy"
                  values={`${y};${y - 20 + (i % 40)};${y}`}
                  dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
                <animate attributeName="opacity"
                  values="0.3;0.7;0.3" dur={`${4 + (i % 3)}s`} repeatCount="indefinite" />
              </circle>
            );
          })}

          {/* Pie chart segment */}
          <g transform="translate(1050, 150)" opacity="0.25">
            <animateTransform attributeName="transform" type="rotate"
              from="0 1050 150" to="360 1050 150" dur="30s" repeatCount="indefinite" additive="sum" />
            <path d="M0,0 L0,-80 A80,80 0 0,1 69,-40 Z" fill="#f97316" />
            <path d="M0,0 L69,-40 A80,80 0 0,1 40,69 Z" fill="#8b5cf6" />
            <path d="M0,0 L40,69 A80,80 0 0,1 -56,57 Z" fill="#06b6d4" />
            <path d="M0,0 L-56,57 A80,80 0 0,1 -76,-26 Z" fill="#10b981" />
            <circle cx="0" cy="0" r="30" fill="white" opacity="0.3" />
          </g>
        </svg>

        {/* Grid lines overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M7 16l4-8 4 4 4-6" />
              <circle cx="18" cy="6" r="1" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-xl">Data Analyst Accelerator</h1>
          <p className="text-white/80 text-sm drop-shadow-md">Enter your access code to continue</p>
        </div>

        {status === 'checking' && (
          <div className="text-center py-12 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-white mb-3" />
            <p className="text-white/80">Connecting...</p>
          </div>
        )}

        {status === 'offline' && (
          <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10">
            <WifiOff className="w-12 h-12 mx-auto text-amber-300 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Internet Required</h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Please connect to the internet to activate this course for the first time.
            </p>
          </div>
        )}

        {status === 'online' && (
          <>
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-300 text-xs mb-4 justify-center">
                <Globe className="w-3.5 h-3.5" />
                Connected
              </div>

              <div className="relative mb-4">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your access code"
                  className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent text-sm backdrop-blur-sm"
                  autoFocus
                  disabled={loading}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !code.trim()}
                className="w-full py-3 bg-white/15 hover:bg-white/25 disabled:bg-white/5 disabled:text-white/30 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm border border-white/15 disabled:border-white/5"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
                ) : (
                  <><Lock className="w-4 h-4" /> Unlock Course</>
                )}
              </button>

              {message && (
                <div className={`mt-4 flex items-start gap-2 text-sm p-3 rounded-xl ${message.error ? 'bg-red-500/20 text-red-200 border border-red-400/30' : 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30'}`}>
                  {message.error ? <XCircle className="w-4 h-4 mt-0.5 shrink-0" /> : <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />}
                  {message.text}
                </div>
              )}
            </div>

            <p className="text-center text-white/40 text-xs mt-4">
              One code per person. Codes are bound to your device.
            </p>
          </>
        )}

        {/* Branding */}
        <div className="text-center mt-8">
          <p className="text-white/30 text-xs tracking-widest uppercase">Powered by</p>
          <p className="text-white/60 text-sm font-semibold tracking-wide">Savannix Tech Ltd.</p>
        </div>
      </div>
    </div>
  );
}
