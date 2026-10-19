# Logbook Magang — Joseph Hasugian

Blog logbook magang statis (HTML/CSS/JS murni, tanpa build tool), bergradasi
ungu–cyan–pink dari logo Laksita (hero logo, KPI otomatis, logbook mingguan
yang bisa di-expand, galeri foto kiri-kanan).

## Struktur folder

```
blog-magang/
├── index.html          → halaman utama
├── style.css           → tampilan/desain
├── script.js           → logika render KPI, status, tabel logbook
├── assets/
│   ├── config.js         → identitas & tanggal magang (edit di sini)
│   ├── entries.js        → SEMUA isi logbook ada di sini
│   └── images/           → taruh foto dokumentasi di sini
└── README.md
```

## Cara menambah entri logbook baru (tampil per minggu)

Data tetap ditulis **harian**; halaman otomatis mengelompokkannya menjadi kartu
**mingguan** (Senin–Jumat). Buka `assets/entries.js`, tambahkan objek baru
**di paling atas** array `LOGBOOK_ENTRIES`:

```js
{
  date: "2026-10-05",             // format YYYY-MM-DD
  category: "User Guide",         // atau "Testing Web", atau kategori baru
  title: "Judul singkat entri",
  body: "Isi cerita/aktivitas hari itu.",

  // dua baris di bawah ini OPSIONAL, hapus kalau tidak perlu:
  status: "8/8 Lulus",             // teks singkat badge status
  statusType: "pass"               // "pass" (hijau) | "info" (ungu) | "warn" (kuning)
}
```

Kartu minggu dibuat otomatis dari tanggal entri. Minggu ke-1 adalah minggu yang
memuat tanggal mulai di `assets/config.js`. Minggu terbaru terbuka otomatis,
kategori baru otomatis menjadi tombol filter, dan KPI ikut berubah.

### Ringkasan mingguan (opsional)

Di bagian bawah `assets/entries.js` ada `WEEKLY_SUMMARIES`. Isi judul dan
ringkasan per nomor minggu, misalnya:

```js
7: { title: "Judul minggu ke-7", body: "Ringkasan kegiatan minggu ini." }
```

Kalau suatu minggu tidak punya ringkasan, kartunya tetap tampil dengan judul
"N kegiatan harian". Ringkasan minggu 1–6 yang ada saat ini disusun dari entri
harian; silakan diubah sesuai keinginan.

## Sinkronisasi dengan jurnal harian (Google Docs)

Situs ini statis, jadi **tidak otomatis** membaca Google Docs. Setiap ada
jurnal baru, tambahkan entrinya ke `assets/entries.js` (di paling atas array).

## Logo di halaman utama

Bagian atas (hero) menampilkan logo perusahaan dari `companyLogo` di
`assets/config.js` (default `assets/images/laksitalogo.png`). Ganti file atau
nilainya kalau logo berubah; logo yang sama juga dipakai di bagian "Tentang".

## Cara mengubah identitas / tanggal magang

`assets/config.js` adalah satu-satunya sumber data identitas (tidak ada data cadangan di `script.js`).
Isinya: nama, NIM, program studi, pembimbing,
tanggal mulai & selesai magang, logo perusahaan (`companyLogo`), dan daftar
rekan sekelompok (`teammates`). "Minggu ke-", "hari terlaksana", "hari
tersisa" dan progress bar di KPI strip dihitung otomatis dari tanggal-tanggal
ini — **hanya hari kerja Senin–Jumat** yang dihitung, Sabtu–Minggu dilewati.

## Cara menambah foto dokumentasi

1. Taruh file foto di `assets/images/` (mis. `assets/images/uat-01.jpg`).
2. Buka `index.html`, cari `<div class="gallery" id="gallery">`.
3. Salin salah satu blok `<figure class="doc-item">` yang sudah ada, lalu ganti
   `src`, `alt`, tanggal (`doc-date`), dan keterangan (`doc-title`):

```html
<figure class="doc-item">
  <img src="assets/images/uat-01.jpg" alt="Deskripsi singkat foto" loading="lazy" />
  <figcaption class="doc-text">
    <p class="doc-date">1 Oktober 2026</p>
    <h3 class="doc-title">Keterangan foto</h3>
  </figcaption>
</figure>
```

Foto tersusun berdampingan **kiri-kanan** (dua foto per layar di desktop, satu
di ponsel). Kalau lebih dari dua, geser dengan tombol panah, swipe, atau
tombol keyboard kiri/kanan. Nomor urut (01, 02, ...) otomatis.

## Tema & warna

Tampilan cerah dengan gradasi ungu, cyan, dan pink yang diturunkan dari logo Laksita. Semua warna dan font ada di bagian
`:root` pada `style.css` (`--bg`, `--purple`, `--cyan`, `--pink`, `--coral`, `--serif`, dst).
Font (Bodoni Moda, Cormorant Garamond, Inter) dimuat dari Google Fonts, jadi
butuh internet; kalau offline otomatis memakai font serif/sans bawaan.

## Melihat hasil di VS Code

1. Buka folder ini di VS Code (`File → Open Folder…`).
2. Install ekstensi **Live Server** (oleh Ritwick Dey).
3. Klik kanan `index.html` → **Open with Live Server**.

> Catatan: kalau dibuka langsung lewat `file://` (klik dua kali di File
> Explorer), sebagian besar tampilan tetap jalan, tapi lebih disarankan
> pakai Live Server supaya perilakunya sama persis dengan versi online.

## Deploy gratis ke GitHub Pages

1. Buat repository baru di GitHub, misal `blog-magang`.
2. Di terminal VS Code, dari dalam folder ini:
   ```bash
   git init
   git add .
   git commit -m "Setup awal blog magang"
   git branch -M main
   git remote add origin https://github.com/USERNAME/blog-magang.git
   git push -u origin main
   ```
3. Di GitHub: **Settings → Pages** → Source: branch `main`, folder `/ (root)` → **Save**.
4. Situs akan tersedia di `https://USERNAME.github.io/blog-magang/`.

Setiap ada pembaruan: `git add . && git commit -m "..." && git push`.