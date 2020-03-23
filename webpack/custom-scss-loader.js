const path = require('path'),
  fs = require('fs');
const cssMap = new Map();
const cssMapObj = {};
const sass = require('node-sass');
const nodeSassImporter = require('node-sass-magic-importer');
const nodeSassOptions = {
  cwd: process.cwd(),
  packageKeys: [
    'sass',
    'scss',
    'css'
  ],
  packagePrefix: '~'
}


function privatefromDir(startPath, filter) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }
  let files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    let filename = path.join(startPath, files[i]);
    let stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      let compiledCss = sass.renderSync({
        file: filename,
        importer: nodeSassImporter(nodeSassOptions),
        outputStyle: 'compressed'
      });
      let file = path.basename(filename);
      if (!cssMap.has(file)) {
        cssMap.set(file, compiledCss.css.toString());
        cssMapObj[file] = `${compiledCss.css.toString()}`;
      }
    };
  };
};

function fromDir(startPath, filter) {
  if(Array.isArray(startPath)) {
    startPath.forEach(_path => {
      privatefromDir(_path, filter);  
    })
  } else {
    privatefromDir(startPath, filter);
  }
  return cssMapObj;
}

module.exports = fromDir;