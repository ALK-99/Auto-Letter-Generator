# Surat Otomatis: PC (.exe) dan Android (.apk) dari satu repo

Satu kode (`www/index.html`) dibungkus dua cara: Electron untuk PC, Capacitor untuk Android.
Semua build dikerjakan GitHub Actions. Kamu tidak perlu install Node.js atau Android Studio.

## Memasang pembaruan ini ke repo yang sudah ada
1. Ekstrak zip ini, lalu salin semua isinya ke folder proyekmu (timpa file yang sama). Folder `.git` milikmu jangan dihapus.
2. Di folder proyek, jalankan:
   ```
   git add .
   git commit -m "v1.1.0: output Word, mode gelap/terang, pembaruan berkala"
   git push
   git tag v1.1.0
   git push --tags
   ```
3. Tunggu tab **Actions** selesai, lalu ambil file dari tab **Releases**.

## Kalau hasil build tidak berubah (versi lama terus)
Biasanya `main` atau tag di GitHub menunjuk ke kode lama. Cara paling bersih: ekstrak zip terbaru, buka PowerShell di dalam foldernya, lalu jalankan:
```
powershell -ExecutionPolicy Bypass -File .\perbaiki-repo.ps1
```
Skrip ini membuat repo lokal baru, menimpa isi GitHub dengan file yang benar, menghapus tag lama, lalu mengirim tag rilis baru. Nama file APK sekarang memuat nomor versi (`Surat-Otomatis-1.2.0.apk`), jadi mudah dicocokkan dengan nomor di lobi aplikasi.

## Cara merilis pembaruan berikutnya (pola sama seperti aplikasi KKN)
1. Ubah kode, terutama `www/index.html`. Lalu commit dan push.
2. Beri tag versi baru yang lebih besar: `git tag v1.1.1` lalu `git push --tags`.
3. GitHub membuild PC dan Android, lalu memasangnya ke Releases beserta catatan perubahan otomatis.
4. Aplikasi yang sudah terpasang mengecek Releases saat dibuka (butuh internet). Kalau ada versi lebih baru, muncul pop-up **Pembaruan tersedia** dengan tombol unduh. Kalau offline, pengecekan dilewati tanpa pesan error.
5. APK baru bisa menimpa yang lama tanpa uninstall, karena nomor versinya naik dan kunci penandatangannya tetap.

Aturan nomor: `v1.1.1` untuk perbaikan kecil, `v1.2.0` untuk fitur baru, `v2.0.0` untuk perubahan besar.

## Tahap pengembangan
- Tahap 1 (selesai): lobi, proyek, 8 jenis surat, perapi ejaan, PDF, PC dan Android.
- Tahap 2 (v1.1.x): output Word, mode gelap/terang, pembaruan berkala, aturan gelar dan jabatan.
- Tahap 3 (v1.3.0): Profil Instansi dan logo kop, nomor surat otomatis, Riwayat Surat, impor penerima dari Excel/CSV, output Excel.
- Tahap 4 (v1.4.0): Proposal Kegiatan lengkap, Surat Tugas, Surat Keterangan, Surat Pernyataan, Surat Kuasa.
- Tahap 5 (v1.5.0, ini): Asisten AI untuk menulis isi surat dan proposal.
- Berikutnya: daftar isi otomatis untuk proposal, kamus salah ketik offline, cadangan data, bot Telegram.

## Asisten AI (v1.5.0)
Membantu menulis isi surat dan bagian proposal (latar belakang, tujuan, manfaat, penutup). Kamu memakai kunci API milik sendiri, jadi tidak ada biaya dari aplikasi ini.

**Cara mengaktifkan**
1. Buka Profil Instansi, lalu kartu "Asisten AI".
2. Pilih penyedia dan tempel kunci API:
   - **Google Gemini:** kunci gratis di aistudio.google.com/apikey. Model Flash gratis dengan batas pemakaian.
   - **Groq:** kunci gratis tanpa kartu di console.groq.com/keys.
   - **OpenRouter:** kunci di openrouter.ai/keys, pakai model berakhiran `:free`.
   - **OpenAI / ChatGPT API:** berbayar per pemakaian dan perlu saldo. Setahu saya, langganan ChatGPT tidak termasuk akses API.
   - **Lainnya:** layanan apa pun yang kompatibel dengan OpenAI (isi alamat, model, dan kunci).
3. Tekan "Uji koneksi". Nama model boleh dikosongkan: aplikasi memilih model yang cocok otomatis. Tombol "Ambil daftar model" menampilkan pilihan yang tersedia untuk kuncimu.

**Cara memakai**
- Di halaman proyek, tekan "Bantu tulis dengan AI" di bawah Isi surat, atau di bawah tiap bagian proposal.
- Tulis permintaanmu (misalnya "buat lebih formal dan tambahkan komitmen menjaga ketertiban"), lalu tekan "Buat dengan AI".
- Hasilnya muncul di kotak yang bisa diedit. Hasil dirapikan otomatis sesuai PUEBI. Tekan "Pakai hasil ini" kalau sudah cocok. Tidak ada yang tertimpa sebelum kamu menekan tombol itu.

**Privasi dan batasan**
- Yang dikirim ke penyedia hanya teks isi dengan kode seperti `{{nama}}` dan `{{kegiatan}}` (bukan data aslinya), jenis surat, sektor, dan permintaanmu. Nama, alamat, dan isian lain tetap di perangkatmu dan baru dimasukkan setelah hasil kembali. Jangan menulis data pribadi sensitif di kolom permintaan.
- Di paket gratis, penyedia seperti Google dapat memakai teks yang dikirim untuk meningkatkan produknya, dan peninjau manusia dapat membacanya.
- Paket gratis punya batas permintaan per menit dan per hari. Kalau tercapai, tunggu beberapa menit.
- AI bisa keliru atau mengarang. Baca ulang hasilnya sebelum surat dicetak.
- Fitur ini butuh internet dan hanya berjalan di aplikasi PC dan Android, bukan di halaman web pratinjau.

## Cara memakai fitur v1.4.0
- **Proposal Kegiatan (lengkap):** pilih jenis "Proposal Kegiatan (lengkap)" saat membuat proyek. Hasilnya satu dokumen berisi sampul, Bab I sampai V, tabel susunan acara, kepanitiaan, rencana anggaran biaya (jumlah dan terbilang dihitung otomatis), tanda tangan, dan nomor halaman. Isi tiap bab dan semua tabel bisa diedit di halaman proyek. Baris anggaran yang masih kosong ditandai di bagian "Perlu dilengkapi". Format Excel pada proposal menghasilkan tabel RAB. Untuk surat permohonan pengantarnya, buat proyek terpisah dengan jenis "Proposal Dana".
- **Surat Tugas dan Surat Keterangan:** judul di tengah (SURAT TUGAS / SURAT KETERANGAN), nomor di bawah judul, tanda tangan satu orang, dan tanggal di atas tanda tangan. Satu baris penerima sama dengan satu surat untuk satu orang.
- **Surat Pernyataan:** yang membuat pernyataan adalah orang di baris penerima, dan dialah penandatangannya. Tersedia tempat materai Rp10.000.
- **Surat Kuasa:** penerima kuasa di kiri, pemberi kuasa (nama yang kamu isi sebagai penandatangan) di kanan dengan tempat materai.
- Surat Pernyataan, Surat Kuasa, dan Lamaran Kerja bersifat pribadi, jadi tidak memakai kop dan penandatangan dari Profil Instansi dan tidak memakai nomor otomatis.

## Cara memakai fitur v1.3.0
- **Profil Instansi:** menu 4 di lobi. Isi nama instansi, alamat, kota, kode instansi (misalnya HMJ), penandatangan, dan logo. Semuanya otomatis terisi di setiap proyek baru. Surat lamaran kerja tidak memakai profil.
- **Nomor otomatis:** kosongkan kolom nomor surat, dan nomor dibuat saat surat dibuat, misalnya 003/PRO/HMJ/XI/2026. Satu nomor urut berjalan per tahun untuk semua jenis surat. Membuat ulang surat yang sama memakai nomor yang sama. Untuk nomor baru, kosongkan sel No. Surat penerima itu. Kalau sudah punya surat sebelumnya tahun ini, isi "nomor urut terakhir" di Profil.
- **Riwayat:** menu 3 di lobi. Cari berdasarkan nomor, penerima, atau proyek, ketuk untuk membuka proyeknya, dan ekspor semuanya ke Excel.
- **Impor penerima:** di halaman proyek, tombol "Impor dari Excel/CSV". Kolom yang dibaca: Nama, Alamat, dan (opsional) No. Surat. File harus .xlsx atau .csv.
- **Output Excel:** pilih format "Excel (rekap penerima)" untuk mendapat tabel nomor, tanggal, jenis, hal, penerima, dan alamat. Format ini tidak membuat surat dan tidak memakai nomor urut.

## Coba tanpa membuat Release
Tab **Actions**, pilih "Build PC dan Android", tekan **Run workflow**. Hasilnya ada di bagian **Artifacts**.

## Catatan
- Windows bisa menampilkan "Windows protected your PC" karena aplikasi belum bertanda tangan resmi. Pilih **More info**, lalu **Run anyway**.
- Kunci di `signing/` adalah kunci debug yang bersifat publik. Cukup untuk pemakaian pribadi. Kalau nanti ke Play Store, buat kunci rilis sendiri.
- Ukuran: APK sekitar 5 MB. File PC sekitar 70 sampai 80 MB karena Electron membawa mesin browser sendiri.
