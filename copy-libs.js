// Jalan otomatis setelah "npm install". Menyalin library ke www/libs supaya
// ikut terbungkus di aplikasi PC maupun APK dan bisa dipakai tanpa internet.
const fs = require('fs'), path = require('path');
const daftar = [
  ['node_modules/jspdf/dist/jspdf.umd.min.js', 'www/libs/jspdf.umd.min.js'],
  ['node_modules/jszip/dist/jszip.min.js', 'www/libs/jszip.min.js'],
  ['node_modules/@capacitor/core/dist/capacitor.js', 'www/libs/capacitor.js'],
  ['node_modules/@capacitor/filesystem/dist/plugin.js', 'www/libs/capacitor-filesystem.js'],
  ['node_modules/@capacitor/share/dist/plugin.js', 'www/libs/capacitor-share.js'],
];
fs.mkdirSync(path.join(__dirname, 'www/libs'), { recursive: true });
daftar.forEach(([dari, ke]) => {
  const src = path.join(__dirname, dari);
  if (fs.existsSync(src)) { fs.copyFileSync(src, path.join(__dirname, ke)); console.log('Disalin:', ke); }
  else { console.error('TIDAK DITEMUKAN:', dari); process.exitCode = 1; }
});
