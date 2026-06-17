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
