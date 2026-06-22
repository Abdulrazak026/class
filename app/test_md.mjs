import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';

const content = `### Major Hardware Components

| Component | Function |
|-----------|----------|
| **CPU** | Executes instructions, does all calculations |
| **RAM** | Temporary working memory — fast but loses data on power-off |
`;

async function main() {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkStringify)
    .process(content);

  console.log('Output:');
  console.log(String(file));
  
  // Also parse and inspect AST
  const mdast = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .parse(content);
    
  console.log('\nAST root type:', mdast.type);
  console.log('Children count:', mdast.children.length);
  for (const child of mdast.children) {
    console.log(`  - ${child.type}:`, child.type === 'heading' ? `depth=${child.depth}` : '');
    if (child.type === 'table') {
      console.log(`    align: ${child.align}`);
      console.log(`    rows: ${child.children.length}`);
      console.log('    TABLE PARSED OK!');
    }
  }
}

main().catch(e => console.error(e));
