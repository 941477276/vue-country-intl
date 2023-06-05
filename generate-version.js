const fs = require('fs');
const path = require('path');

const packageJson = require('./package.json');

fs.writeFileSync(path.resolve(__dirname, './version.js'), `export const version = '${packageJson.version}';`, 'utf-8');
