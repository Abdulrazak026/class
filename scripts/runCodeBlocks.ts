import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { executePython } from '../src/utils/pythonExecutor.ts';
import { executeSQL } from '../src/utils/sqlExecutor.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const blocksPath = join(__dirname, '..', 'extracted-blocks.json');
  let blocks: any[];
  try {
    blocks = JSON.parse(readFileSync(blocksPath, 'utf-8'));
  } catch {
    const { execSync } = await import('child_process');
    execSync('npx tsx scripts/extractBlocks.ts', { cwd: join(__dirname, '..'), stdio: 'inherit' });
    blocks = JSON.parse(readFileSync(blocksPath, 'utf-8'));
  }

  const results: Record<string, { topicId: string; language: string; code: string; status: 'pass' | 'error'; error?: string; output?: string }[]> = {};

  let total = 0;
  let passed = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const block of blocks) {
    const { topicId, language, code, source } = block;
    total++;
    const key = `${source}/${topicId}`;
    
    try {
      let output: any;
      
      if (language === 'python') {
        output = executePython(code);
        const hasError = output.some((o: any) => o.type === 'stderr');
        if (hasError) {
          failed++;
          const errText = output.filter((o: any) => o.type === 'stderr').map((o: any) => o.text).join('; ');
          if (!results[key]) results[key] = [];
          results[key].push({ topicId, language, code, status: 'error', error: errText, output: JSON.stringify(output) });
          const msg = `[FAIL] ${key} (${language}): ${errText.substring(0, 120)}`;
          console.log(msg);
          errors.push(msg + '\nCode: ' + code.substring(0, 200));
        } else {
          passed++;
          const outText = output.filter((o: any) => o.type === 'stdout').map((o: any) => o.text).join('\n');
          if (!results[key]) results[key] = [];
          results[key].push({ topicId, language, code, status: 'pass', output: outText });
          console.log(`[PASS] ${key} (${language})`);
        }
      } else if (language === 'sql') {
        output = executeSQL(code);
        if (output.error) {
          failed++;
          if (!results[key]) results[key] = [];
          results[key].push({ topicId, language, code, status: 'error', error: output.error, output: JSON.stringify(output) });
          const msg = `[FAIL] ${key} (${language}): ${output.error.substring(0, 120)}`;
          console.log(msg);
          errors.push(msg + '\nCode: ' + code.substring(0, 200));
        } else {
          passed++;
          const outText = JSON.stringify(output);
          if (!results[key]) results[key] = [];
          results[key].push({ topicId, language, code, status: 'pass', output: outText });
          console.log(`[PASS] ${key} (${language})`);
        }
      }
    } catch (err: any) {
      failed++;
      if (!results[key]) results[key] = [];
      results[key].push({ topicId, language, code, status: 'error', error: err.message || String(err) });
      const msg = `[FAIL] ${key} (${language}): ${(err.message || String(err)).substring(0, 120)}`;
      console.log(msg);
      errors.push(msg + '\nCode: ' + code.substring(0, 200));
    }
  }

  console.log(`\n========================================`);
  console.log(`Total: ${total} | PASS: ${passed} | FAIL: ${failed}`);
  console.log(`========================================`);

  if (errors.length > 0) {
    console.log(`\nFailed blocks:`);
    for (const e of errors) {
      console.log(`\n${e}`);
    }
  }

  writeFileSync(join(__dirname, '..', 'test-results.json'), JSON.stringify(results, null, 2));
}

main().catch(console.error);
