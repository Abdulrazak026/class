const fs = require('fs');
const content = fs.readFileSync('src/data-content.ts', 'utf-8');

let result = content;
const fixes = [
  ['Choosing K � The Elbow Method', 'Choosing K → The Elbow Method'],
  ['PCA � Dimensionality', 'PCA → Dimensionality'],
  ['Big Data � Hadoop, MapReduce', 'Big Data → Hadoop, MapReduce'],
  ['Velocity** � Speed', 'Velocity** → Speed'],
  ['Core abstraction � a fault-tolerant', 'Core abstraction → a fault-tolerant'],
  ['columns mean � leading to', 'columns mean → leading to'],
  ['Python script � each step', 'Python script → each step'],
  ['Moving Average)** � the most', 'Moving Average)** → the most'],
  ['test on future) � NEVER random', 'test on future) → NEVER random'],
  ['Learning** � Finding', 'Learning** → Finding'],
  ['Term Frequency � Inverse Document', 'Term Frequency → Inverse Document'],
  ['Task** � what needed', 'Task** → what needed'],
  ['Action** � what YOU', 'Action** → what YOU'],
  ['work with � not just', 'work with → not just'],
  ['Find a partner** � friend', 'Find a partner** → friend'],
  ['isn\'t perfection � it\'s', 'isn\'t perfection → it\'s'],
  ['Congratulations � you\'ve', 'Congratulations → you\'ve'],
  ['STAR stories** � 5-6', 'STAR stories** → 5-6'],
  ['Project 2 � Customer', 'Project 2 → Customer'],
  ['Project 3 � Customer', 'Project 3 → Customer'],
  ['Project 4 � A/B Test', 'Project 4 → A/B Test'],
  ['Include caveats � "This test ran for', 'Include caveats → "This test ran for'],
  ['Action, Result � structured', 'Action, Result → structured'],
  ['Full-Course Recap** � This', 'Full-Course Recap** → This'],
  ['Spreadsheets** � formulas', 'Spreadsheets** → formulas'],
  ['BI** � charts', 'BI** → charts'],
  ['Learning** � supervised', 'Learning** → supervised'],
  ['Analytics** � funnel', 'Analytics** → funnel'],
  ['READMEs** � Clear title', 'READMEs** → Clear title'],
  ['live demos** � GitHub', 'live demos** → GitHub'],
  ['truly finished � keep', 'truly finished → keep'],
  ['Practice** � Simulate', 'Practice** → Simulate'],
  ['and review � then', 'and review → then'],
  ['Strategy** � An organized', 'Strategy** → An organized'],
  ['Next Steps** � Celebrate', 'Next Steps** → Celebrate'],
  ['Good luck � go', 'Good luck → go'],
  ['a metric�it\'s the', 'a metric → it\'s the'],
  ['purchase) � directly', 'purchase) → directly'],
];

for (const [from, to] of fixes) {
  result = result.split(from).join(to);
}

const remaining = (result.match(/\ufffd/g) || []).length;
console.log('Remaining after fixes:', remaining);
if (remaining > 0) {
  let pos = 0;
  while ((pos = result.indexOf('\ufffd', pos)) >= 0) {
    const ctx = result.slice(Math.max(0, pos - 30), pos + 30);
    console.log('  ', JSON.stringify(ctx));
    pos++;
  }
}

fs.writeFileSync('src/data-content.ts', result, 'utf-8');
console.log('Saved');
