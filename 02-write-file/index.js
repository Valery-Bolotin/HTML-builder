const path = require('path');
const fs = require('fs');
const process = require('process');


const stream = fs.createWriteStream(path.join(__dirname, './text.txt'));

process.stdout.write('Welcome, my friend!\nEnter your text\n');

process.stdin.addListener('data', data => data.toString().trim() === 'exit' ? process.exit(process.stdout.write('ByE-BYE!')) : stream.write(data));

process.addListener('SIGINT', () => process.exit(process.stdout.write('ByE-BYE!')));