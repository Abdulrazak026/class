import { curriculum, BUILD_VERSION } from '../src/data';
import { topicClassworks } from '../src/classworks';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

const dataJson = {
  version: BUILD_VERSION,
  modules: curriculum,
};

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(
  path.join(publicDir, 'data.json'),
  JSON.stringify(dataJson, null, 2),
  'utf-8'
);

fs.writeFileSync(
  path.join(publicDir, 'classworks.json'),
  JSON.stringify(topicClassworks, null, 2),
  'utf-8'
);

fs.writeFileSync(
  path.join(publicDir, 'version.json'),
  JSON.stringify({ version: BUILD_VERSION, timestamp: new Date().toISOString() }, null, 2),
  'utf-8'
);

console.log(`Generated data.json, classworks.json, version.json (v${BUILD_VERSION})`);
