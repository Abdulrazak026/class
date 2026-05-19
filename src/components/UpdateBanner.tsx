import { useState, useEffect } from 'react';
import { Download, RefreshCw, CheckCircle2, X, Cloud, CloudOff } from 'lucide-react';
import { checkForAppUpdates, fetchRemoteData, applyUpdate } from '../utils/offline';
import { getUpdateUrl, getLiveVersion, hasLiveData, clearLiveData } from '../utils/dataLoader';

export function UpdateBanner() {
  const [updateUrl] = useState(getUpdateUrl);
  const [checking, setChecking] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateVersion, setUpdateVersion] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const isLive = hasLiveData();
  const version = getLiveVersion();

  useEffect(() => {
    if (!updateUrl.trim() || dismissed) return;
    const check = async () => {
      setChecking(true);
      const result = await checkForAppUpdates(updateUrl.trim());
      setChecking(false);
      if (!result.error && result.hasUpdate) {
        setUpdateAvailable(true);
        setUpdateVersion(result.version);
      }
    };
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, [updateUrl, dismissed]);

  const handleDownload = async () => {
    if (!updateUrl.trim()) return;
    setUpdating(true);
    setStatus('Downloading update...');
    const result = await fetchRemoteData(updateUrl.trim());
    if (result.error) {
      setStatus(`Download failed: ${result.error}`);
      setUpdating(false);
      return;
    }
    await applyUpdate(result.data, result.classworks);
    setStatus('Update applied! Reloading...');
    setUpdating(false);
    setUpdateAvailable(false);
    setTimeout(() => window.location.reload(), 1500);
  };

  if (dismissed || (!updateAvailable && !isLive)) return null;

  return (
    <div className="sticky top-0 z-50 w-full">
      {updateAvailable && (
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-4 py-2.5 shadow-lg flex items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 shrink-0" />
            <span className="font-medium">
              New version{updateVersion ? ` (${updateVersion})` : ''} available
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDownload}
              disabled={updating}
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 disabled:opacity-50 px-3 py-1.5 rounded-lg font-semibold transition-all text-xs"
            >
              {updating ? (
                <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Downloading...</>
              ) : (
                <><Download className="w-3.5 h-3.5" /> Download & Install</>
              )}
            </button>
            <button onClick={() => setDismissed(true)} className="p-1 hover:bg-white/20 rounded-lg transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      {status && (
        <div className="bg-gray-900 text-gray-200 px-4 py-2 text-xs flex items-center gap-2">
          {status.includes('applied') && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          {status}
        </div>
      )}
      {isLive && !updateAvailable && (
        <div className="bg-emerald-600 text-white px-4 py-1.5 text-xs flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3 h-3" />
          Live data loaded (v{version})
          <button onClick={() => { clearLiveData(); window.location.reload(); }}
            className="underline opacity-70 hover:opacity-100 ml-2">Reset</button>
        </div>
      )}
    </div>
  );
}
