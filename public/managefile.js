const fs = require('fs');
const os = require('os');
const path = require('path');

const abcFilePath = path.join(__dirname, 'abc.txt');

if (!fs.existsSync(abcFilePath)) {
    process.exit(1); 
}
const abcFileData = fs.readFileSync(abcFilePath, 'utf8');

const osType = os.type();
const osArch = os.arch();

console.log("Hello");
console.log("Today we learnt different modules available in node js : OS, FS and path");
console.log(OS Type: ${osType});
console.log(Architecture: ${osArch});
console.log(abcFileData);