import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { curriculum } from '../src/data.ts';
import { topicClassworks } from '../src/classworks.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

const version = new Date().toISOString().split('T')[0].replace(/-/g, '.');
const versionInfo = { version, updated: new Date().toISOString() };

// Export data.json with version wrapper
writeFileSync(join(publicDir, 'data.json'), JSON.stringify({ version, modules: curriculum }, null, 2));
console.log(`Exported data.json (${curriculum.length} modules, version ${version})`);

// Export classworks.json
writeFileSync(join(publicDir, 'classworks.json'), JSON.stringify(topicClassworks, null, 2));
console.log(`Exported classworks.json (${Object.keys(topicClassworks).length} topic entries)`);

// Export version.json
writeFileSync(join(publicDir, 'version.json'), JSON.stringify(versionInfo, null, 2));
console.log(`Exported version.json (${version})`);
