import type { Module, Topic } from '../data';
import type { ParsedClasswork } from '../components/ClassworkCard';

const LIVE_DATA_KEY = 'live-data';
const LIVE_CLASSWORKS_KEY = 'live-classworks';
const LIVE_VERSION_KEY = 'live-data-version';
const FULL_MODULES_KEY = 'full-module-cache';

let cachedCurriculum: Module[] | null = null;
let cachedClassworks: Record<string, ParsedClasswork[]> | null = null;

// Holds full module content keyed by module id (merged with index on demand)
let fullModuleCache: Record<string, Module> = {};

export function setDecryptedData(data: any, classworks?: any): void {
  if (data && Array.isArray(data.modules)) {
    cachedCurriculum = data.modules as Module[];
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
  fullModuleCache = {};
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

/** Fetch and cache a single module's full content (including content/quiz) */
export async function loadModuleContent(moduleId: string): Promise<Module | null> {
  if (fullModuleCache[moduleId]) return fullModuleCache[moduleId];
  try {
    const res = await fetch(`/${moduleId}.json?t=${Date.now()}`, { cache: 'no-cache' });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.module) {
      fullModuleCache[moduleId] = data.module;
      return data.module;
    }
    return null;
  } catch {
    return null;
  }
}

/** Merge a module's full content into the cached curriculum */
export function mergeModuleIntoCurriculum(moduleId: string, fullModule: Module): boolean {
  const idx = cachedCurriculum?.findIndex(m => m.id === moduleId);
  if (idx !== undefined && idx >= 0 && cachedCurriculum) {
    // Merge content, quiz, aiPrompt, requirements into the topics
    for (const fullTopic of fullModule.topics) {
      const topicIdx = cachedCurriculum[idx].topics.findIndex(t => t.id === fullTopic.id);
      if (topicIdx >= 0) {
        cachedCurriculum[idx].topics[topicIdx] = fullTopic;
      }
    }
    return true;
  }
  return false;
}
