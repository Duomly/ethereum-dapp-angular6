const fs = require('fs');
const f = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(f, 'utf8', function (error,response) {
  if(!error) {
    var fix = response.replace(/node: false/g, 'node: {crypto: true, stream: true}');
    fs.writeFile(f, fix, 'utf8', function (error) {
      if (error) return console.log(error);
    });
  } else {
    return console.log(error);
  }
});
