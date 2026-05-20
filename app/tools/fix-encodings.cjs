const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data-content.ts');
let content = fs.readFileSync(filePath, 'utf-8');

let replacements = 0;

// Helper: replace all occurrences of a literal string with another
function replaceAll(str, find, replace) {
  const before = str;
  str = str.split(find).join(replace);
  if (str !== before) replacements += (before.length - str.length) / find.length;
  return str;
}

// 1. Formula coefficient β
content = replaceAll(content, 'sum(\ufffd_j²)', 'sum(β_j²)');
content = replaceAll(content, 'sum(|\ufffd_j|)', 'sum(|β_j|)');
content = replaceAll(content, '2 * sum(\ufffd_j²)', '2 * sum(β_j²)');
content = replaceAll(content, 'λ * sum(\ufffd_j²)', 'λ * sum(β_j²)');
content = replaceAll(content, 'λ1 * sum(|\ufffd_j|) + λ2 * sum(\ufffd_j²)', 'λ1 * sum(|β_j|) + λ2 * sum(β_j²)');

// 2. Regression coefficients: β0, β1, β2, β3, βn
content = replaceAll(content, '\ufffd0', 'β0');
content = replaceAll(content, '\ufffd1', 'β1');
content = replaceAll(content, '\ufffd2', 'β2');
content = replaceAll(content, '\ufffd3', 'β3');
content = replaceAll(content, '\ufffdn', 'βn');

// 3. Probability/significance
content = replaceAll(content, 'Probability = \ufffd.', 'Probability = α.');
content = replaceAll(content, 'Power = 1 - \ufffd:', 'Power = 1 - β:');
content = replaceAll(content, 'Power = 1 - \ufffd,**', 'Power = 1 - β,**');

// 4. Table milestones
content = replaceAll(content, '| \ufffd | \ufffd |', '| ✓ | ✓ |');
content = replaceAll(content, '| \ufffd |', '| ✓ |');

// 5. All remaining \ufffd chars — based on context analysis,
//    some are → (right arrow), some are table dashes
//    Do targeted replacements for known phrases
const arrowReplacements = [
  ['pelines \ufffd extracting', 'pelines → extracting'],
  ['e KPIs \ufffd a KPI', 'e KPIs → a KPI'],
  ['rchase) \ufffd directly', 'rchase) → directly'],
  ['C2:C10) \ufffd total', 'C2:C10) → total'],
  ['"Food\\") \ufffd counts', '"Food") → counts'],
  ['"East\\") \ufffd adds', '"East") → adds'],
  ['"North\\") \ufffd average', '"North") → average'],
  [', ...)` \ufffd sum', ', ...)` → sum'],
  [', ...)` \ufffd count', ', ...)` → count'],
  [', ...)` \ufffd average', ', ...)` → average'],
  ['commit \ufffd additions', 'commit → additions'],
  ['` first \ufffd it catches', '` first → it catches'],
  [' data \ufffd it runs', ' data → it runs'],
  ['itoring \ufffd glance', 'itoring → glance'],
  ['reading \ufffd includes', 'reading → includes'],
  [' valid \ufffd know', ' valid → know'],
  ["found' \ufffd lead", "found' → lead"],
  ['concise \ufffd stakeholders', 'concise → stakeholders'],
  ['ression \ufffd Deep Dive', 'ression → Deep Dive'],
  ['ation \ufffd Ridge, Lasso', 'ation → Ridge, Lasso'],
  ['bda (λ) \ufffd The Regulariz', 'bda (λ) → The Regulariz'],
  ['ntrol** \ufffd init', 'ntrol** → init'],
  ['iew tip \ufffd think', 'iew tip → think'],
  ['dback** \ufffd what went wel', 'dback** → what went wel'],
  ['ation** \ufffd set the conte', 'ation** → set the conte'],
  ['ady** \ufffd tailored for', 'ady** → tailored for'],
  ['dent** \ufffd friend, mento', 'dent** → friend, mento'],
  ['kills** \ufffd can build', 'kills** → can build'],
  ['kills** \ufffd can solve', 'kills** → can solve'],
  ['kills** \ufffd comfortable', 'kills** → comfortable'],
  ['tions** \ufffd write reusabl', 'tions** → write reusabl'],
  ['ect** \ufffd Is the code c', 'ect** → Is the code c'],
  ['ish** \ufffd Your portfoli', 'ish** → Your portfoli'],
  ['lutions \ufffd you\'ve comple', 'lutions → you\'ve comple'],
  ['ings** \ufffd you\'ve built', 'ings** → you\'ve built'],
  ['sult** \ufffd what happened', 'sult** → what happened'],
  ['ethod** \ufffd structure eve', 'method** → structure eve'],
  ['rself** \ufffd watch for ner', 'rself** → watch for ner'],
  ['iew** \ufffd this will be th', 'iew** → this will be th'],
  ['tion \ufffd every transfo', 'tion → every transfo'],
  ['ed** \ufffd keep updating', 'ed** → keep updating'],
  ['k** \ufffd organized job', 'k** → organized job'],
  ['as** \ufffd data manipula', 'as** → data manipula'],
  ['as** \ufffd filter, group', 'as** → filter, group'],
  ['ning** \ufffd handle missin', 'ning** → handle missin'],
  ['ies** \ufffd comprehension', 'ies** → comprehension'],
  ['ogy** \ufffd An organized', 'ogy** → An organized'],
  ['ch** \ufffd projects, REA', 'ch** → projects, REA'],
  ['ses** \ufffd queries, join', 'ses** → queries, join'],
  ['es** \ufffd funnel analys', 'es** → funnel analys'],
  ['tats** \ufffd mean, median,', 'tats** → mean, median,'],
  ['tics** \ufffd descriptive s', 'tics** → descriptive s'],
  ['ency** \ufffd Same formatti', 'ency** → Same formatti'],
  ['imer** \ufffd 30-45 minutes', 'imer** → 30-45 minutes'],
  ['ology** \ufffd Speed of data', 'ology** → Speed of data'],
  ['lume** \ufffd Massive quant', 'lume** → Massive quant'],
  ['iety** \ufffd Different dat', 'iety** → Different dat'],
  ['cture** \ufffd a fault-toler', 'cture** → a fault-toler'],
  ['** \ufffd Hadoop, MapRedu', '** → Hadoop, MapRedu'],
  ['** \ufffd Hadoop, Spark', '** → Hadoop, Spark'],
  ['racy** \ufffd the most wide', 'racy** → the most wide'],
  ['pare \ufffd it exposes ga', 'pare → it exposes ga'],
  ['ian** \ufffd Inverse Docum', 'ian** → Inverse Docum'],
  ['ation \ufffd bringing soft', 'ation → bringing soft'],
  ['tence** \ufffd organized job', 'tence** → organized job'],
  ['tin** \ufffd watch for burn', 'tin** → watch for burn'],
  ['nfident** \ufffd you\'re read', 'nfident** → you\'re read'],
  ['k** \ufffd data pipeline ad', 'k** → data pipeline ad'],
  ['ory** \ufffd work through it', 'ory** → work through it'],
  ['** \ufffd polished and rea', '** → polished and rea'],
  ['%** \ufffd %**', '%** → %**'],
  ['%%** \ufffd %%%%', '%%** → %%%%'],
  ['%** \ufffd %** \ufffd %**', '%** → %** → %**'],
  ['r roles \ufffd actual hands-', 'r roles → actual hands-'],
  ['r names \ufffd gives higher ', 'r names → gives higher '],
  ['e-ups** \ufffd LinkedIn arti', 'e-ups** → LinkedIn arti'],
  ['folio** \ufffd 3-5 projects ', 'folio** → 3-5 projects '],
  ['kedIn** \ufffd optimized pro', 'kedIn** → optimized pro'],
  ['demo** \ufffd GitHub Pages,', 'demo** → GitHub Pages,'],
  ['acker** \ufffd organized job', 'acker** → organized job'],
  ['Mean** \ufffd How well does', 'Mean** → How well does'],
  ['ign** \ufffd and watch for d', 'ign** → and watch for d'],
  ['stakes** \ufffd not taking b', 'stakes** → not taking b'],
  ['portunity\ufffd The ability ', 'portunity → The ability '],
  ['cture** \ufffd 5-6 verifiable', 'cture** → 5-6 verifiable'],
  ['rammar** \ufffd 2-3 bullet p', 'rammar** → 2-3 bullet p'],
  ['Pro Tip:** \ufffd Always doub', 'Pro Tip:** → Always doub'],
  ['ro Tip:** \ufffd For portfol', 'ro Tip:** → For portfol'],
];

for (const [from, to] of arrowReplacements) {
  content = replaceAll(content, from, to);
}

// 6. Any remaining \ufffd — check what they are
const remaining = (content.match(/\ufffd/g) || []).length;
console.log(`Replaced ${replacements} instances`);
console.log(`Remaining \ufffd chars: ${remaining}`);

if (remaining > 0) {
  // Show remaining contexts
  let pos = 0;
  const contexts = [];
  while ((pos = content.indexOf('\ufffd', pos)) >= 0) {
    const start = Math.max(0, pos - 20);
    const end = Math.min(content.length, pos + 20);
    contexts.push(content.slice(start, end));
    pos++;
  }
  console.log('Remaining contexts:');
  contexts.forEach((c, i) => console.log(`  ${i}: ${JSON.stringify(c)}`));
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('File saved');
