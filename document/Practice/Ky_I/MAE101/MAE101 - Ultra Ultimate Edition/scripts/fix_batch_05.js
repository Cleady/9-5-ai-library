const fs = require('fs');
let code = fs.readFileSync('scripts/create_batch_05.js', 'utf8');
code = code.replace(/answer_status: "corrected"/g, 'answer_status: "conflict"');
code = code.replace(/chapter: "(DSTT1|GT1)",/g, 'chapter: "$1",\n    folder: "$1",');
fs.writeFileSync('scripts/create_batch_05.js', code, 'utf8');
console.log('Fixed create_batch_05.js');
