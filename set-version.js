// Dijalankan GitHub Actions sebelum build: menyamakan nomor versi di package.json
// dan di dalam aplikasi (www/index.html) dengan tag rilis, misalnya v1.2.0.
const fs = require('fs');
const ref = (process.env.REF || '').replace(/^v/, '');
const v = ref || '0.0.' + (process.env.RUN || '0');
const pj = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pj.version = v;
fs.writeFileSync('package.json', JSON.stringify(pj, null, 2) + '\n');
const p = 'www/index.html';
fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace('__APP_VERSION__', v));
console.log('Versi:', v);
