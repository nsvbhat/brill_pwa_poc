const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, 'public/ambetter-logo-new.png');

Promise.all([
  sharp(inputPath).resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).png().toFile(path.join(__dirname, 'public/ambetter-logo-192.png')),
  sharp(inputPath).resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).png().toFile(path.join(__dirname, 'public/ambetter-logo-512.png')),
])
  .then(() => {
    console.log('✅ Icons resized successfully!');
    console.log('   - ambetter-logo-192.png');
    console.log('   - ambetter-logo-512.png');
  })
  .catch(err => {
    console.error('❌ Error resizing icons:', err);
    process.exit(1);
  });
