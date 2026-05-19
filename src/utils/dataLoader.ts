import { curriculum as builtinCurriculum } from '../data';
import { topicClassworks as builtinClassworks } from '../classworks';
import type { Module } from '../data';
import type { ParsedClasswork } from '../components/ClassworkCard';

const LIVE_DATA_KEY = 'live-data';
const LIVE_CLASSWORKS_KEY = 'live-classworks';
const LIVE_VERSION_KEY = 'live-data-version';
const UPDATE_URL_KEY = 'update-url';

let cachedCurriculum: Module[] | null = null;
let cachedClassworks: Record<string, ParsedClasswork[]> | null = null;

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
  cachedCurriculum = builtinCurriculum as Module[];
  return cachedCurriculum;
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
  cachedClassworks = builtinClassworks as Record<string, ParsedClasswork[]>;
  return cachedClassworks;
}

export function getDefaultUpdateUrl(): string {
  // Use the app's own origin as the default update source
  // So data.json and classworks.json are fetched from the same host the app runs on
  return window.location.origin;
}

export function getUpdateUrl(): string {
  return localStorage.getItem(UPDATE_URL_KEY) || getDefaultUpdateUrl();
}

export function setUpdateUrl(url: string): void {
  localStorage.setItem(UPDATE_URL_KEY, url);
}

export function isUsingDefaultUrl(): boolean {
  const stored = localStorage.getItem(UPDATE_URL_KEY);
  return !stored || stored === getDefaultUpdateUrl();
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
