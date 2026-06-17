import type { Module } from '../data';
import type { ParsedClasswork } from '../components/ClassworkCard';

const LIVE_DATA_KEY = 'live-data';
const LIVE_CLASSWORKS_KEY = 'live-classworks';
const LIVE_VERSION_KEY = 'live-data-version';

let cachedCurriculum: Module[] | null = null;
let cachedClassworks: Record<string, ParsedClasswork[]> | null = null;

export function setDecryptedData(data: any, classworks?: any): void {
  if (data && Array.isArray(data.modules)) {
    cachedCurriculum = data.modules as Module[];
    // Also cache in localStorage for persistence
    try {
      localStorage.setItem(LIVE_DATA_KEY, JSON.stringify(data));
      if (data.version) localStorage.setItem(LIVE_VERSION_KEY, data.version);
    } catch {}
  }
  if (classworks && typeof classworks === 'object') {
    cachedClassworks = classworks as Record<string, ParsedClasswork[]>;
    try {
      localStorage.setItem(LIVE_CLASSWORKS_KEY, JSON.stringify(classworks));
    } catch {}
  }
}

export function getCurriculum(): Module[] {
  if (cachedCurriculum) return cachedCurriculum;
  const stored = localStorage.getItem(LIVE_DATA_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed && Array.isArray(parsed.modules)) {
        cachedCurriculum = parsed.modules as Module[];
        return cachedCurriculum;
      }
    } catch {}
  }
  return [];
}

export function getClassworks(): Record<string, ParsedClasswork[]> {
  if (cachedClassworks) return cachedClassworks;
  const stored = localStorage.getItem(LIVE_CLASSWORKS_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        cachedClassworks = parsed as Record<string, ParsedClasswork[]>;
        return cachedClassworks;
      }
    } catch {}
  }
  return {};
}

export function getLiveVersion(): string {
  return localStorage.getItem(LIVE_VERSION_KEY) || 'built-in';
}

export function clearLiveData(): void {
  localStorage.removeItem(LIVE_DATA_KEY);
  localStorage.removeItem(LIVE_CLASSWORKS_KEY);
  localStorage.removeItem(LIVE_VERSION_KEY);
  cachedCurriculum = null;
  cachedClassworks = null;
}

export function hasLiveData(): boolean {
  return !!localStorage.getItem(LIVE_DATA_KEY);
}

export function getDecryptKey(): string | null {
  try {
    const token = localStorage.getItem('access-token');
    if (!token) return null;
    const parsed = JSON.parse(token);
    return parsed.contentKey || null;
  } catch {
    return null;
  }
}
