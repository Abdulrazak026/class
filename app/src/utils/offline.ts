import { BUILD_VERSION } from '../data';
import { getDecryptKey } from './dataLoader';

const SW_PATH = '/sw.js';

export interface UpdateInfo {
  available: boolean;
  version: string;
}

export function registerSW(onUpdate?: (info: UpdateInfo) => void): void {
  if (!('serviceWorker' in navigator)) return;

  navigator.serviceWorker.register(SW_PATH).then((reg) => {
    reg.addEventListener('updatefound', () => {
      const newSW = reg.installing;
      if (!newSW) return;
      let state = '';
      newSW.addEventListener('statechange', () => {
        if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
          onUpdate?.({ available: true, version: 'v1' });
        }
      });
    });
  }).catch(() => {});
}

export async function checkForAppUpdates(updateUrl: string): Promise<{ hasUpdate: boolean; version: string; error?: string }> {
  try {
    const cleanUrl = updateUrl.replace(/\/+$/, '');
    const res = await fetch(`${cleanUrl}/version.json?t=${Date.now()}`, { cache: 'no-cache' });
    if (!res.ok) return { hasUpdate: false, version: '', error: `HTTP ${res.status}` };
    const remote = await res.json();
    const remoteVer = remote.version || 'latest';
    const liveVer = localStorage.getItem('live-data-version') || '';
    const currentVer = liveVer || BUILD_VERSION || '';
    const hasUpdate = currentVer !== remoteVer;
    return { hasUpdate, version: remoteVer, error: undefined };
  } catch (e: any) {
    return { hasUpdate: false, version: '', error: e.message || 'Network error' };
  }
}

export async function fetchAndApplyUpdate(updateUrl: string): Promise<{ error?: string }> {
  try {
    const cleanUrl = updateUrl.replace(/\/+$/, '');
    const decryptKey = getDecryptKey();
    if (!decryptKey) {
      return { error: 'No decryption key available. Please re-enter your access code.' };
    }

    const [dataRes, classworksRes] = await Promise.all([
      fetch(`${cleanUrl}/data.enc?t=${Date.now()}`, { cache: 'no-cache' }),
      fetch(`${cleanUrl}/classworks.enc?t=${Date.now()}`, { cache: 'no-cache' }),
    ]);

    if (!dataRes.ok) return { error: `Data fetch failed: HTTP ${dataRes.status}` };
    const encData = await dataRes.arrayBuffer();

    // Decrypt
    const { decryptFile } = await import('./crypto');
    const decryptedStr = await decryptFile(encData, decryptKey);
    const data = JSON.parse(decryptedStr);

    let classworks = null;
    if (classworksRes.ok) {
      try {
        const encClassworks = await classworksRes.arrayBuffer();
        const classworksStr = await decryptFile(encClassworks, decryptKey);
        classworks = JSON.parse(classworksStr);
      } catch {}
    }

    // Store
    try {
      localStorage.setItem('live-data', JSON.stringify(data));
      if (classworks) localStorage.setItem('live-classworks', JSON.stringify(classworks));
      localStorage.setItem('live-data-version', data.version || Date.now().toString());
    } catch (e) {
      return { error: 'Failed to store update data.' };
    }

    return {};
  } catch (e: any) {
    return { error: e.message || 'Update failed' };
  }
}
