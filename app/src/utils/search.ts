import FlexSearch from 'flexsearch';

let searchIndex: any = null;
let searchPromise: Promise<void> | null = null;

export interface SearchResult {
  id: string;
  title: string;
  description: string;
}

export async function initSearch(): Promise<void> {
  if (searchIndex) return;
  if (searchPromise) return searchPromise;
  searchPromise = (async () => {
    try {
      const resp = await fetch('/search-index.json?t=' + Date.now(), { cache: 'no-cache' });
      const data: Record<string, string> = await resp.json();
      searchIndex = new (FlexSearch as any).Document({
        document: { id: 'id', index: ['title', 'description'], store: ['title', 'description'] },
        tokenize: 'forward',
        cache: true,
      });
      for (const [key, value] of Object.entries(data)) {
        searchIndex.import(key, value);
      }
    } catch (e) {
      console.error('Search init failed:', e);
      searchIndex = null;
    }
  })();
  return searchPromise;
}

export async function search(query: string): Promise<SearchResult[]> {
  await initSearch();
  if (!searchIndex || !query.trim()) return [];
  const raw = await searchIndex.search(query.trim(), { limit: 20, enrich: true });
  const results: SearchResult[] = [];
  const seen = new Set<string>();
  for (const field of raw) {
    if (!field.result) continue;
    for (const item of field.result) {
      const id = typeof item === 'object' && item !== null ? (item as any).id : String(item);
      if (seen.has(id)) continue;
      seen.add(id);
      const doc = typeof item === 'object' && item !== null ? item as any : null;
      results.push({
        id,
        title: doc?.title ?? id,
        description: doc?.description ?? '',
      });
    }
  }
  return results.slice(0, 20);
}
