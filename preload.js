const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desktop', {
  aiFetch: (opt) => ipcRenderer.invoke('ai-fetch', opt),
  simpanFile: (namaFile, dataBase64) => ipcRenderer.invoke('simpan-file', { namaFile, dataBase64 }),
});
