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
  const key = crypto.pbkdf2Sync(CONTENT_KEY, salt, 100000, 32, 'sha256');
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(data, 'utf-8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  const output = Buffer.concat([salt, iv, encrypted, authTag]);
  fs.writeFileSync(outputPath, output);
  console.log(`  Encrypted: ${path.basename(outputPath)}`);
}

async function generateSearchIndex(): Promise<void> {
  const searchIndex = new FlexSearch.Document<string, true>({
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

  const dataJson = { version: BUILD_VERSION, modules: curriculum };
  const dataJsonPath = path.join(publicDir, 'data.json');
  const classworksJsonPath = path.join(publicDir, 'classworks.json');

  fs.writeFileSync(dataJsonPath, JSON.stringify(dataJson, null, 2), 'utf-8');
  fs.writeFileSync(classworksJsonPath, JSON.stringify(topicClassworks, null, 2), 'utf-8');

  encryptFile(dataJsonPath, path.join(publicDir, 'data.enc'));
  encryptFile(classworksJsonPath, path.join(publicDir, 'classworks.enc'));

  fs.unlinkSync(dataJsonPath);
  fs.unlinkSync(classworksJsonPath);

  console.log(`Generated data.enc, classworks.enc (v${BUILD_VERSION})`);
}

main().catch(e => { console.error('Build failed:', e); process.exit(1); });
