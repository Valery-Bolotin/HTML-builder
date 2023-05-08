const fs = require('fs'); 
const promises = require('fs/promises') 
const path = require('path'); 
const styles = path.join(__dirname, 'styles'); 
const bundle = path.join(__dirname, 'project-dist', 'style.css'); 
const folderDist = path.join(__dirname, 'project-dist');
const writeStream = fs.createWriteStream(bundle);


(async function createHTML() {
  const template = path.join(__dirname, 'template.html'); 
  const components = path.join(__dirname, 'components'); 

  let templateData = await promises.readFile(template, {
    encoding: 'utf-8' });

  fs.readdir(
    components, {
      withFileTypes: true
    },
    (error, files) => {
      files.forEach(file => {
        if (file.name.split('.')[1] === 'html' && file.isFile()) {

          fs.createReadStream(path.join(__dirname, 'components', file.name), {
            encoding: 'utf-8'
          }).on('data', data => {
            templateData = templateData.replace(`{{${file.name.split('.')[0]}}}`, data);
            fs.writeFile(
              path.join(__dirname, 'project-dist', 'index.html'),
              templateData,
              (error) => {
                if (error) throw error;
              }
            );
          });
        }
      });
    });
})();

fs.readdir(styles, {
  withFileTypes: true 
}, (error, files) => {
  for (let file of files) {
    if (file.isFile() && file.name.split('.')[1] === 'css') {
      const filePath = path.join(styles, file.name);
      const readStream = fs.createReadStream(filePath, 'utf-8');
      let result = '';

      readStream.on('data', chunk => result += chunk);
      readStream.on('end', () => writeStream.write(result));
    }
  }
});

fs.mkdir(folderDist, {
  recursive: true
}, err => {
  if (err) throw err;
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { 
  recursive: true
}, error => {
  if (error) throw error;
});

(async function copyAssets() {
  fs.readdir(
    path.join(__dirname, 'assets'), {
      withFileTypes: true
    },
    (error, folders) => {
      if (error) {
        throw error
      };
      folders.forEach(folder => {
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', folder.name), {
          recursive: true
        }, error => {
          if (error) throw error;
        });

        let folderPath = path.join(__dirname, 'assets', folder.name); 
        let copyFolderPath = path.join(__dirname, 'project-dist', 'assets', folder.name); 

        fs.readdir(
          folderPath, {
            withFileTypes: true
          },
          (error, files) => {
            files.forEach(file => {
              fs.copyFile(
                path.join(folderPath, file.name),
                path.join(copyFolderPath, file.name),
                error => {
                  if (error) throw error
                }
              );
            });
          });
      });
    });
})();