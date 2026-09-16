
const fs = require('fs');

const file = 'android/build.gradle';

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/IBM_SEMERU/g, 'ADOPTIUM');
  fs.writeFileSync(file, content);
}
