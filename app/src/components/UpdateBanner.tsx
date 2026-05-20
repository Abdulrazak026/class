import { useState, useEffect, useRef } from 'react';
import { Cloud, CloudOff, X, CheckCircle2 } from 'lucide-react';
import { checkForAppUpdates, fetchAndApplyUpdate } from '../utils/offline';
import { getUpdateUrl, getDecryptKey } from '../utils/dataLoader';

export function UpdateBanner() {
  const [updateUrl] = useState(getUpdateUrl);
  const [checking, setChecking] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [toastError, setToastError] = useState<string | null>(null);
  const [updateVer, setUpdateVer] = useState<string | null>(null);
  const [updateReady, setUpdateReady] = useState(false);
  const appliedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!updateUrl.trim()) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const check = async () => {
      setChecking(true);
      const result = await checkForAppUpdates(updateUrl.trim());
      setChecking(false);

      if (result.error) return;
      if (result.hasUpdate && result.version !== appliedRef.current) {
        const key = getDecryptKey();
        if (!key) {
          setUpdateVer(result.version);
          setUpdateReady(true);
          return;
        }

        appliedRef.current = result.version;
        const fetchResult = await fetchAndApplyUpdate(updateUrl.trim());
        if (fetchResult.error) {
          setToastError(`Update failed: ${fetchResult.error}`);
          timeouts.push(setTimeout(() => setToastError(null), 5000));
          return;
        }
        setToast(`Updated to v${result.version}`);
        timeouts.push(setTimeout(() => setToast(null), 3000));
      }
    };

    check();
    const interval = setInterval(check, 60000);
    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, [updateUrl]);

  return (
    <div className="sticky top-0 z-50 w-full">
      {updateReady && (
        <div className="bg-indigo-600 text-white px-4 py-2 text-sm flex items-center justify-center gap-2">
          <Cloud className="w-4 h-4 shrink-0" />
          Update v{updateVer} available — restart the app to apply
          <button onClick={() => { setUpdateReady(false); }} className="ml-2 p-0.5 hover:bg-white/20 rounded">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      {toast && (
        <div className="bg-emerald-600 text-white px-4 py-2 text-sm flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {toast}
        </div>
      )}
      {toastError && (
        <div className="bg-red-600 text-white px-4 py-2 text-sm flex items-center justify-center gap-2">
          <CloudOff className="w-4 h-4 shrink-0" />
          {toastError}
          <button onClick={() => setToastError(null)} className="ml-2 p-0.5 hover:bg-white/20 rounded">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
