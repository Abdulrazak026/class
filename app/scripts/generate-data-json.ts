import { curriculum } from '../src/data-content';
import { BUILD_VERSION } from '../src/data';
import { topicClassworks } from '../src/classworks-content';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as crypto from 'crypto';
import FlexSearch from 'flexsearch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

const CONTENT_KEY: string = (process as any).env?.VITE_CONTENT_KEY || 'CYBERCAMP-2026';

function encryptFile(inputPath: string, outputPath: string): void {
  const data = fs.readFileSync(inputPath, 'utf-8');
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = crypto.pbkdf2Sync(CONTENT_KEY, salt, 10000, 32, 'sha256');
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(data, 'utf-8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  const output = Buffer.concat([salt, iv, encrypted, authTag]);
  fs.writeFileSync(outputPath, output);
  console.log(`  Encrypted: ${path.basename(outputPath)}`);
}

async function generateSearchIndex(): Promise<void> {
  const searchIndex = new (FlexSearch as any).Document({
    document: { id: 'id', index: ['title', 'description'], store: ['title', 'description'] },
    tokenize: 'forward',
    cache: true,
  });
  for (const mod of curriculum) {
    for (const topic of mod.topics) {
      searchIndex.add({
        id: topic.id,
        title: topic.title,
        description: topic.description,
      });
    }
  }
  const exportData: Record<string, string> = {};
  await searchIndex.export((key: string, value: string) => { exportData[key] = value; });
  fs.writeFileSync(path.join(publicDir, 'search-index.json'), JSON.stringify(exportData));
  console.log(`  Built search index: ${Object.keys(exportData).length} keys, ${curriculum.reduce((s, m) => s + m.topics.length, 0)} topics`);
}

async function main() {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  await generateSearchIndex();

  const dataJsonFull = { version: BUILD_VERSION, modules: curriculum };
  const dataJsonPath = path.join(publicDir, 'data.json');
  const classworksJsonPath = path.join(publicDir, 'classworks.json');

  // Full data.json (unencrypted - fast client load)
  fs.writeFileSync(dataJsonPath, JSON.stringify(dataJsonFull), 'utf-8');
  fs.writeFileSync(classworksJsonPath, JSON.stringify(topicClassworks), 'utf-8');
  console.log(`  Written: data.json, classworks.json`);

  // data.enc (backward compat - encrypted)
  encryptFile(dataJsonPath, path.join(publicDir, 'data.enc'));
  encryptFile(classworksJsonPath, path.join(publicDir, 'classworks.enc'));

  // Lightweight data-index.json (module + topic metadata only, no content/quiz)
  const dataIndex = {
    version: BUILD_VERSION,
    modules: curriculum.map(m => ({
      id: m.id, title: m.title, durationText: m.durationText,
      focus: m.focus, output: m.output,
      topics: m.topics.map(t => ({
        id: t.id, title: t.title, description: t.description,
        type: t.type, duration: t.duration,
        labUrl: t.labUrl, labTitle: t.labTitle,
      }))
    }))
  };
  fs.writeFileSync(path.join(publicDir, 'data-index.json'), JSON.stringify(dataIndex), 'utf-8');
  console.log(`  Written: data-index.json (lightweight)`);

  // Per-module weekXX.json files (full content loaded on demand)
  let totalBytes = 0;
  for (const mod of curriculum) {
    const weekData = { version: BUILD_VERSION, module: mod };
    const json = JSON.stringify(weekData);
    fs.writeFileSync(path.join(publicDir, `${mod.id}.json`), json, 'utf-8');
    totalBytes += json.length;
  }
  console.log(`  Written: ${curriculum.length} weekXX.json files (${(totalBytes / 1024 / 1024).toFixed(1)} MB total)`);

  console.log(`Generated all data files (v${BUILD_VERSION})`);
}

main().catch(e => { console.error('Build failed:', e); process.exit(1); });
