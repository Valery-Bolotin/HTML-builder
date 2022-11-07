const fs = require('fs');
const path = require('node:path');
const pathName = ('03-files-in-folder/secret-folder');

fs.readdir(pathName, {withFileTypes: true}, (err, files) => {

  if (err) throw err;

  files.forEach(item => {
    if (item.isFile()) {
      const parse = path.parse(`${pathName}/${item.name}`);

      fs.stat(`${pathName}/${item.name}`, (err, stats) => {

        if (err) {
          console.error(err);

          return;
        }

        console.log(`${parse.name} - ${parse.ext.replace('.','')} - ${stats.size/1000}kb`);
      })
    }
  })
});