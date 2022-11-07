const path = require('path');
const fs = require('fs');

let file = path.join(__dirname, 'text.txt');
let stream = fs.createReadStream(file);

stream.pipe(process.stdout);