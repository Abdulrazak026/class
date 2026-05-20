import { curriculum } from '../src/data-content';
import { BUILD_VERSION } from '../src/data';
import { topicClassworks } from '../src/classworks-content';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

// Content encryption key — must match what's in Firestore config/contentKey
// Also accepted via env var VITE_CONTENT_KEY
const CONTENT_KEY: string = (process as any).env?.VITE_CONTENT_KEY || 'DACAMP-2026';

function encryptFile(inputPath: string, outputPath: string): void {
  const data = fs.readFileSync(inputPath, 'utf-8');
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);

  const key = crypto.pbkdf2Sync(CONTENT_KEY, salt, 100000, 32, 'sha256');
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  const encrypted = Buffer.concat([cipher.update(data, 'utf-8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  // Format: salt (16) + iv (12) + ciphertext + authTag (16) — authTag last for WebCrypto compat
  const output = Buffer.concat([salt, iv, encrypted, authTag]);
  fs.writeFileSync(outputPath, output);
  console.log(`  Encrypted: ${path.basename(outputPath)}`);
}

const dataJson = {
  version: BUILD_VERSION,
  modules: curriculum,
};

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write plaintext JSON files temporarily for Vite to pick up
// Vite copies public/ to dist/, so we write .enc files there directly
const dataJsonPath = path.join(publicDir, 'data.json');
const classworksJsonPath = path.join(publicDir, 'classworks.json');

fs.writeFileSync(dataJsonPath, JSON.stringify(dataJson, null, 2), 'utf-8');
fs.writeFileSync(classworksJsonPath, JSON.stringify(topicClassworks, null, 2), 'utf-8');

// Encrypt them
encryptFile(dataJsonPath, path.join(publicDir, 'data.enc'));
encryptFile(classworksJsonPath, path.join(publicDir, 'classworks.enc'));

// Remove plaintext JSON — only encrypted files in the build
fs.unlinkSync(dataJsonPath);
fs.unlinkSync(classworksJsonPath);

// Write version.json (plaintext — no course content)
fs.writeFileSync(
  path.join(publicDir, 'version.json'),
  JSON.stringify({ version: BUILD_VERSION, timestamp: new Date().toISOString() }, null, 2),
  'utf-8'
);

console.log(`Generated data.enc, classworks.enc, version.json (v${BUILD_VERSION})`);
