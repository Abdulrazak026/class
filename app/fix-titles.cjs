const fs = require('fs');
const file = 'C:/Users/user/Desktop/cyber/app/src/phases/phase0.ts';
let c = fs.readFileSync(file, 'utf8');
c = c.replace(/title: "Project \d+: /g, 'title: "');
fs.writeFileSync(file, c, 'utf8');
console.log('Done');
