const fs = require("fs");
const path = require("path");

fs.readdir(
  path.join(__dirname, "secret-folder"),
  { withFileTypes: true },
  (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      data.forEach((file) => {
        if (file.isFile()) {
          fs.stat(
            path.join(__dirname, "secret-folder", file.name),
            (err, stats) => {
              if (err) {
                return console.error(err);
              }
              console.log(
                `${path.parse(file.name).name} - ${path
                  .parse(file.name)
                  .ext.substring(1)} - ${stats.size} bytes`
              );
            }
          );
        }
      });
    }
  }
);