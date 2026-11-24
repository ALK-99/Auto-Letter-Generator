# Memperbaiki repo GitHub dari nol supaya isinya bersih dan build memakai kode terbaru.
# Cara pakai: buka PowerShell DI DALAM folder proyek ini (yang berisi package.json), lalu:
#   powershell -ExecutionPolicy Bypass -File .\perbaiki-repo.ps1
$repo = 'https://github.com/ALK-99/Auto-Letter-Generator.git'

function G {
  $o = & git @args 2>&1 | ForEach-Object { "$_" }
  $o | Out-Host
  if ($LASTEXITCODE -ne 0) { throw "Perintah gagal: git $($args -join ' ')" }
}

$tag = Read-Host 'Nomor tag rilis baru, belum pernah dipakai (contoh v1.2.0)'
if ($tag -notmatch '^v\d+\.\d+\.\d+$') { throw 'Format tag harus seperti v1.2.0' }

$wajib = 'package.json', 'set-version.js', 'main.js', 'www\index.html', '.github\workflows\build.yml', 'signing\debug.keystore'
foreach ($f in $wajib) {
  if (-not (Test-Path $f)) { throw "File wajib tidak ada: $f. Jalankan skrip ini di dalam folder proyek hasil ekstrak zip terbaru." }
}

# buang sisa file git yang salah tempat dan riwayat lokal yang rusak
foreach ($n in 'hooks','info','logs','objects','refs','workflows','COMMIT_EDITMSG','GITGUI_MSG','HEAD','config','description','index') {
  if (Test-Path $n) { Remove-Item $n -Recurse -Force }
}
if (Test-Path .git) { Remove-Item .git -Recurse -Force }

G init -b main
G add -A
G commit -m "proyek bersih $tag"
G remote add origin $repo
G push -u origin main --force

# hapus tag lama di GitHub supaya tidak ada rilis yang menunjuk ke kode lama
$lama = (& git ls-remote --tags origin 2>$null) | ForEach-Object { ($_ -split "`t")[1] } |
  Where-Object { $_ -and $_ -notmatch '\^\{\}$' } | ForEach-Object { $_ -replace '^refs/tags/', '' }
foreach ($t in $lama) { G push origin --delete $t }

G tag $tag
G push origin $tag
Write-Host ''
Write-Host "Selesai. Buka tab Actions di GitHub, tunggu dua pekerjaan selesai, lalu ambil file dari Releases ($tag)."
