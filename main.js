const { app, BrowserWindow, Menu, ipcMain, dialog, shell } = require('electron');
const fs = require('fs');
const path = require('path');

function buatJendela() {
  Menu.setApplicationMenu(null); // tanpa menu bawaan: lebih bersih dan ringan
  const win = new BrowserWindow({
    width: 980, height: 760, minWidth: 380, minHeight: 560,
    title: 'Surat Otomatis',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, sandbox: true },
  });
  // Tautan pembaruan (GitHub) dibuka di browser bawaan, bukan di jendela aplikasi
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https:\/\/(github\.com|api\.github\.com|objects\.githubusercontent\.com)\//.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.loadFile(path.join(__dirname, 'www', 'index.html'));
}

app.whenReady().then(buatJendela);
app.on('window-all-closed', () => app.quit());

// Menyimpan file lewat dialog "Save As" asli (dipanggil dari halaman lewat preload.js)
ipcMain.handle('simpan-file', async (e, { namaFile, dataBase64 }) => {
  const ext = path.extname(namaFile).slice(1) || 'pdf';
  const { filePath, canceled } = await dialog.showSaveDialog({
    defaultPath: namaFile,
    filters: [{ name: ext.toUpperCase(), extensions: [ext] }],
  });
  if (canceled || !filePath) return { ok: false };
  fs.writeFileSync(filePath, Buffer.from(dataBase64, 'base64'));
  return { ok: true, filePath };
});

// Panggilan ke penyedia AI dari proses utama (tanpa batasan CORS). Hanya alamat https.
ipcMain.handle('ai-fetch', async (e, { url, method, headers, body }) => {
  if (!/^https:\/\//.test(String(url))) return { status: 0, text: 'Alamat harus https' };
  try {
    const r = await fetch(url, { method: method || 'POST', headers, body, signal: AbortSignal.timeout(60000) });
    return { status: r.status, text: await r.text() };
  } catch (err) {
    return { status: 0, text: String((err && err.message) || err) };
  }
});
