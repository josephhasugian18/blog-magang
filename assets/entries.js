/**
 * ISI LOGBOOK
 * ---------------------------------------------------
 * Setiap objek = satu entri jurnal harian. Tambahkan entri baru
 * di PALING ATAS array supaya urutannya tetap terbaru-ke-lama.
 * Lihat README.md untuk format lengkap tiap field.
 */

const LOGBOOK_ENTRIES = [
  {
    date: "2026-10-16",
    category: "User Guide",
    title: "Menyempurnakan diagram flowmap user guide",
    body: "Masih mengerjakan user guide sistem Perencanaan UNMAS dengan menyempurnakan diagram flowmap yang telah dibuat, serta menyesuaikannya dengan poin-poin panduan penggunaan agar lebih jelas dan mudah dipahami."
  },
  {
    date: "2026-10-15",
    category: "User Guide",
    title: "Flowmap alur kerja antar pengguna",
    body: "Saya meneruskan penyusunan diagram flowmap pada user guide sistem Perencanaan UNMAS, dengan memetakan tahapan proses agar urutan alur kerja antar pengguna lebih terstruktur."
  },
  {
    date: "2026-10-14",
    category: "User Guide",
    title: "Mulai membuat diagram flowmap",
    body: "Melanjutkan pengerjaan user guide untuk sistem Perencanaan UNMAS dan mulai menambahkan pembuatan diagram flowmap untuk memvisualisasikan alur proses yang berjalan pada sistem."
  },
  {
    date: "2026-10-13",
    category: "User Guide",
    title: "Diagram flow alur kerja sistem Perencanaan",
    body: "Melanjutkan pengerjaan user guide untuk sistem Perencanaan UNMAS, dengan fokus menyusun diagram flow alur kerja sistem untuk menggambarkan tahapan proses secara lebih jelas dan terstruktur."
  },
  {
    date: "2026-10-12",
    category: "User Guide",
    title: "Menyempurnakan poin panduan Perencanaan",
    body: "Melanjutkan pengerjaan user guide untuk sistem Perencanaan UNMAS dengan menyempurnakan poin-poin panduan penggunaan agar alur dan penjelasannya semakin lengkap dan mudah diikuti pengguna."
  },
  {
    date: "2026-10-09",
    category: "User Guide",
    title: "Merapikan & melengkapi user guide Perencanaan",
    body: "Melanjutkan pengerjaan user guide untuk sistem Perencanaan UNMAS dengan merapikan dan melengkapi poin-poin panduan penggunaan agar mudah dipahami oleh pengguna."
  },
  {
    date: "2026-10-08",
    category: "Dokumentasi",
    title: "Menyempurnakan workflow sistem UNMAS",
    body: "Melanjutkan pembuatan alur kerja (workflow) sistem UNMAS dengan menyempurnakan dan merapikan tahapan-tahapan alur agar lebih jelas dan sesuai dengan proses yang berjalan pada sistem."
  },
  {
    date: "2026-10-07",
    category: "Dokumentasi",
    title: "Membuat workflow sistem UNMAS",
    body: "Membuat alur kerja (workflow) sistem UNMAS sebagai bagian dari dokumentasi pengembangan sistem."
  },
  {
    date: "2026-10-06",
    category: "Dashboard",
    title: "Grafik kepegawaian per fakultas & prodi",
    body: "Melanjutkan pengerjaan dashboard kepegawaian dengan fokus pada penyusunan grafik kepegawaian berdasarkan fakultas dan program studi/unit."
  },
  {
    date: "2026-10-05",
    category: "Dashboard",
    title: "KPI utama: total, aktif & tidak aktif/cuti",
    body: "Melanjutkan pengerjaan dashboard kepegawaian dengan fokus pada penyusunan KPI utama, meliputi total pegawai, pegawai aktif, dan pegawai tidak aktif/cuti."
  },
  {
    date: "2026-10-02",
    category: "Dashboard",
    title: "KPI, grafik & panel operasional admin",
    body: "Masih melanjutkan pengerjaan dashboard kepegawaian pada branch yang telah dibuat, dengan menyempurnakan KPI utama, grafik kepegawaian, dan panel operasional admin sesuai rincian tugas yang telah ditentukan."
  },
  {
    date: "2026-10-01",
    category: "Dashboard",
    title: "Menyusun KPI utama dashboard kepegawaian",
    body: "Melanjutkan pengerjaan dashboard kepegawaian pada branch yang telah dibuat sebelumnya, dengan menyusun KPI utama."
  },
  {
    date: "2026-09-30",
    category: "Dashboard",
    title: "Mulai dashboard kepegawaian",
    body: "Mulai mengerjakan tugas baru berupa pembuatan dashboard kepegawaian."
  },
  {
    date: "2026-09-29",
    category: "User Guide",
    title: "User guide Perencanaan & testing Rencana Penganggaran",
    body: "Meneruskan penyusunan user guide untuk sistem Perencanaan UNMAS dan melakukan testing pada Rencana Penganggaran."
  },
  {
    date: "2026-09-28",
    category: "User Guide",
    title: "Melengkapi & merapikan user guide Perencanaan",
    body: "Meneruskan penyusunan user guide untuk sistem Perencanaan UNMAS, dengan melengkapi dan merapikan panduan penggunaan agar setiap langkah dalam alur sistem dapat dijelaskan dengan jelas kepada pengguna."
  },
  {
    date: "2026-09-25",
    category: "User Guide",
    title: "User guide Perencanaan: Staff Univ, Fakultas & Prodi",
    body: "Melanjutkan pengerjaan user guide untuk sistem Perencanaan UNMAS, dengan fokus menyusun panduan penggunaan untuk role Staff Universitas, Staff Fakultas, dan Staff Prodi."
  },
  {
    date: "2026-09-24",
    category: "User Guide",
    title: "Menyempurnakan user guide Perencanaan UNMAS",
    body: "Melanjutkan pengerjaan user guide untuk sistem Perencanaan UNMAS dengan menyempurnakan kembali poin-poin panduan yang telah disusun."
  },
  {
    date: "2026-09-23",
    category: "User Guide",
    title: "Meninjau alur penjelasan user guide Perencanaan",
    body: "Meneruskan penyusunan user guide untuk sistem Perencanaan UNMAS, dengan meninjau kembali poin-poin panduan yang ada agar alur penjelasannya lebih runtut dan mudah diikuti pengguna."
  },
  {
    date: "2026-09-22",
    category: "User Guide",
    title: "Lanjutan user guide Perencanaan UNMAS",
    body: "Saya masih melanjutkan pengerjaan user guide untuk sistem Perencanaan UNMAS dengan menyempurnakan kembali poin-poin panduan yang telah disusun."
  },
  {
    date: "2026-09-21",
    category: "User Guide",
    title: "User guide Perencanaan: role Rektor & Wakil Rektor",
    body: "Saya masih melanjutkan pengerjaan user guide untuk sistem Perencanaan UNMAS, dengan fokus menyusun panduan penggunaan untuk role Rektor dan Wakil Rektor."
  },
  {
    date: "2026-09-18",
    category: "User Guide",
    title: "User guide Perencanaan: beberapa role pengguna",
    body: "Saya masih melanjutkan pengerjaan user guide untuk sistem Perencanaan UNMAS dengan menyempurnakan poin-poin panduan penggunaan untuk beberapa role pengguna."
  },
  {
    date: "2026-09-17",
    category: "User Guide",
    title: "Menyempurnakan poin panduan Perencanaan UNMAS",
    body: "Saya masih melanjutkan pengerjaan user guide untuk sistem Perencanaan UNMAS dengan menyempurnakan kembali poin-poin panduan yang telah disusun."
  },
  {
    date: "2026-09-16",
    category: "User Guide",
    title: "Lanjutan penyempurnaan user guide Perencanaan",
    body: "Saya masih melanjutkan pengerjaan user guide untuk sistem Perencanaan UNMAS dengan menyempurnakan kembali poin-poin panduan yang telah disusun."
  },
  {
    date: "2026-09-15",
    category: "User Guide",
    title: "Menyempurnakan user guide Perencanaan UNMAS",
    body: "Saya melanjutkan pengerjaan user guide untuk sistem Perencanaan UNMAS dengan menyempurnakan poin-poin panduan yang telah disusun sebelumnya."
  },
  {
    date: "2026-09-14",
    category: "User Guide",
    title: "Mulai user guide sistem Perencanaan UNMAS",
    body: "Saya mulai menyusun user guide untuk sistem Perencanaan UNMAS dengan menyusun poin-poin panduan penggunaan sesuai alur sistem."
  },
  {
    date: "2026-09-11",
    category: "User Guide",
    title: "Meninjau ulang panduan SIM Wisuda",
    body: "Masih melanjutkan penyempurnaan rancangan user guide untuk sistem SIM Wisuda, dengan meninjau kembali poin-poin panduan yang telah disusun agar lebih jelas dan mudah dipahami oleh pengguna."
  },
  {
    date: "2026-09-10",
    category: "User Guide",
    title: "Menyempurnakan poin-poin panduan SIM Wisuda",
    body: "Melanjutkan pengerjaan rancangan user guide untuk sistem SIM Wisuda dengan menyempurnakan kembali poin-poin panduan yang telah disusun."
  },
  {
    date: "2026-09-09",
    category: "User Guide",
    title: "Menyempurnakan panduan SIM Wisuda",
    body: "Melanjutkan pengerjaan user guide untuk sistem SIM Wisuda dengan menyempurnakan panduan yang disusun."
  },
  {
    date: "2026-09-08",
    category: "User Guide",
    title: "Lanjutan user guide SIM Wisuda",
    body: "Melanjutkan pengerjaan rancangan user guide untuk sistem SIM Wisuda dengan menyusun poin-poin panduan penggunaan sesuai alur sistem."
  },
  {
    date: "2026-09-07",
    category: "User Guide",
    title: "Menyempurnakan panduan SIM Wisuda",
    body: "Melanjutkan pengerjaan rancangan user guide untuk sistem SIM Wisuda dengan menyempurnakan kembali panduan yang disusun."
  },
  {
    date: "2026-09-04",
    category: "User Guide",
    title: "Menyempurnakan poin-poin panduan SIM Wisuda",
    body: "Melanjutkan pengerjaan rancangan user guide untuk sistem SIM Wisuda dengan menyempurnakan kembali poin-poin panduan yang telah disusun."
  },
  {
    date: "2026-09-03",
    category: "User Guide",
    title: "Melengkapi panduan penggunaan SIM Wisuda",
    body: "Masih melanjutkan pengerjaan rancangan user guide untuk sistem SIM Wisuda dengan melengkapi poin-poin panduan penggunaan yang telah disusun sebelumnya."
  },
  {
    date: "2026-09-02",
    category: "User Guide",
    title: "Menyempurnakan poin-poin panduan SIM Wisuda",
    body: "Melanjutkan pengerjaan rancangan user guide untuk sistem SIM Wisuda dengan menyempurnakan poin-poin panduan yang telah disusun sebelumnya."
  },
  {
    date: "2026-09-01",
    category: "User Guide",
    title: "Menyusun poin panduan SIM Wisuda",
    body: "Melanjutkan pengerjaan rancangan user guide untuk sistem SIM Wisuda dengan menyusun poin-poin panduan penggunaan sesuai alur sistem."
  },
  {
    date: "2026-08-31",
    category: "User Guide",
    title: "Mulai rancangan user guide SIM TA, SIM KKN & SIM Wisuda",
    body: "Mulai menyusun rancangan user guide untuk sistem SIM TA, SIM KKN, dan SIM Wisuda sebagai panduan bagi pengguna sistem tersebut."
  },
  {
    date: "2026-08-28",
    category: "Testing Web",
    title: "Laporan hasil UAT SIM Keuangan",
    body: "Melanjutkan menyusun laporan hasil pengujian UAT yang telah dilakukan pada sistem SIM Keuangan modul Pagu dan Perencanaan untuk website Satu Umas, dengan merangkum hasil skenario pengujian area Akses dan Navigasi Peran ke dalam dokumentasi laporan pengujian."
  },
  {
    date: "2026-08-27",
    category: "Testing Web",
    title: "UAT hak akses halaman Pagu Anggaran",
    body: "Melanjutkan pengujian UAT dengan mengecek ulang hak akses halaman Pagu Anggaran serta menguji akses halaman Perencanaan Program, Master Data, dan Review dan Approval untuk seluruh role, untuk memastikan tidak ada menu sidebar yang bocor maupun hilang."
  },
  {
    date: "2026-08-26",
    category: "Testing Web",
    title: "UAT SIM Keuangan – pergantian Role Aktif",
    body: "Melakukan pengujian UAT pada sistem SIM Keuangan modul Pagu dan Perencanaan untuk website Satu Umas, dengan fokus menguji mekanisme pergantian Role Aktif serta memastikan dropdown role dan notifikasi sukses berjalan dengan baik."
  }
];

/**
 * RINGKASAN MINGGUAN (opsional)
 * ---------------------------------------------------
 * Kunci = nomor minggu magang (Minggu ke-1 = minggu yang memuat tanggal
 * mulai di config.js; minggu berjalan Senin–Jumat). Kalau satu minggu tidak
 * punya ringkasan, halaman tetap menampilkan daftar kegiatan hariannya.
 */
const WEEKLY_SUMMARIES = {
  1: {
    title: "UAT SIM Keuangan – Pagu & Perencanaan",
    body: "Melakukan pengujian UAT sistem SIM Keuangan modul Pagu dan Perencanaan untuk website Satu Umas: mekanisme pergantian Role Aktif, hak akses seluruh halaman untuk setiap role, serta menyusun laporan hasil UAT."
  },
  2: {
    title: "Mulai user guide SIM TA, SIM KKN & SIM Wisuda",
    body: "Memulai penyusunan rancangan user guide untuk sistem SIM TA, SIM KKN, dan SIM Wisuda, lalu memfokuskan pengerjaan pada panduan SIM Wisuda sesuai alur sistem."
  },
  3: {
    title: "Penyempurnaan user guide SIM Wisuda",
    body: "Melanjutkan dan menyempurnakan poin-poin panduan SIM Wisuda agar lebih jelas dan mudah dipahami pengguna."
  },
  4: {
    title: "User guide Perencanaan UNMAS dimulai",
    body: "Memulai user guide sistem Perencanaan UNMAS dengan menyusun poin panduan sesuai alur sistem, lalu menyempurnakannya untuk beberapa role pengguna."
  },
  5: {
    title: "User guide Perencanaan: Rektor, Wakil Rektor & Staff",
    body: "Menyusun panduan penggunaan sistem Perencanaan UNMAS untuk role Rektor dan Wakil Rektor, kemudian Staff Universitas, Staff Fakultas, dan Staff Prodi."
  },
  6: {
    title: "User guide Perencanaan & mulai dashboard kepegawaian",
    body: "Merapikan user guide Perencanaan UNMAS dan melakukan testing pada Rencana Penganggaran, lalu mulai mengerjakan dashboard kepegawaian dengan menyusun KPI utama, grafik kepegawaian, dan panel operasional admin."
  },
  7: {
    title: "Dashboard kepegawaian & workflow sistem UNMAS",
    body: "Menyusun KPI utama (total, aktif, dan tidak aktif/cuti) serta grafik kepegawaian per fakultas dan prodi/unit, membuat dan merapikan workflow sistem UNMAS, lalu kembali melengkapi user guide Perencanaan."
  },
  8: {
    title: "Diagram flow & flowmap user guide Perencanaan",
    body: "Menyempurnakan poin panduan user guide Perencanaan UNMAS, kemudian menyusun diagram flow dan flowmap untuk memvisualisasikan alur kerja antar pengguna pada sistem."
  }
};