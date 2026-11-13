# Product Requirements Document (PRD)

## Imonoke Cup — "Battle of Colosseum"

### Enter as a Player, Rise as a Gladiator

**Versi Dokumen:** 1.0 **Tanggal:** 12 November 2026 **Status:** Draft

---

## 1. Latar Belakang & Ringkasan

Imonoke Cup adalah platform event turnamen (esport/kompetisi) yang membutuhkan sebuah situs web/aplikasi untuk mendukung penyelenggaraan event secara digital. Platform ini mengangkat tema **"Battle of Colosseum"** — mengajak peserta memasuki arena sebagai seorang Player dan membuktikan diri untuk naik level menjadi seorang Gladiator melalui rangkaian pertandingan kompetitif.

Platform ini menjadi pusat informasi dan interaksi utama bagi peserta, penonton, dan panitia selama event berlangsung — mulai dari melihat jadwal pertandingan, menyaksikan pertandingan yang sedang berlangsung, memantau hasil pertandingan, hingga melakukan pembelian tiket secara online.

## 2. Tujuan Produk (Goals)

1. Menyediakan satu platform terpusat untuk informasi turnamen Imonoke Cup.
2. Memudahkan penonton/peserta mengakses jadwal, status live match, dan hasil pertandingan secara real-time.
3. Memberikan pengalaman pembelian tiket online yang cepat, aman, dan mudah.
4. Memperkuat branding tema "Battle of Colosseum" melalui visual dan pengalaman pengguna yang imersif (nuansa arena gladiator).
5. Mengurangi beban operasional panitia dalam menyampaikan informasi manual (lewat grup chat/sosial media saja).

### Non-Goals (Di Luar Cakupan v1)

- Sistem pendaftaran tim/peserta turnamen (asumsi: pendaftaran dilakukan di luar platform atau sistem terpisah, kecuali ditentukan lain).
- Live streaming video pertandingan (platform hanya menampilkan status/skor live, bukan player video — kecuali ditentukan lain pada fase berikutnya).
- Fitur komunitas/forum diskusi.

## 3. Target Pengguna & Persona

| Persona | Deskripsi | Kebutuhan Utama |
| --- | --- | --- |
| Penonton/Fans | Pengunjung umum yang ingin mengikuti jalannya turnamen | Jadwal jelas, live score, hasil match, beli tiket mudah |
| Peserta/Player | Pemain yang berkompetisi dalam turnamen | Tahu jadwal main sendiri, cek hasil, status match |
| Panitia/Admin | Pengelola event | Mudah update jadwal, skor live, hasil, dan data tiket |
| Sponsor/Partner | Pihak yang ingin melihat eksposur event | Tampilan profesional, data kehadiran (tiket terjual) |

## 4. Tema & Pengalaman Visual

Seluruh elemen UI/UX platform mengusung nuansa **Colosseum/Gladiator Arena**:

- Palet warna: merah marun, emas/perunggu, hitam, dengan tekstur batu/arena.
- Tipografi tegas bernuansa "epic"/heroik untuk judul, tetap readable untuk body text.
- Istilah dalam platform disesuaikan tema, misalnya:
  - "Player" untuk peserta terdaftar.
  - "Gladiator" untuk status peserta yang menang/naik level/juara.
  - "Arena" untuk sebutan venue/bracket pertandingan.
- Elemen visual: ikon perisai, pedang, helm gladiator, arena colosseum sebagai background/hero section.

## 5. Lingkup Fitur (Scope)

Platform v1 mencakup 4 fitur utama:

1. Jadwal Match
2. Match Sedang Bermain (Live Match)
3. Hasil Pertandingan
4. Tiket Online

Ditambah halaman pendukung: Landing Page/Homepage bertema, dan (opsional) halaman admin/dashboard panitia untuk mengelola data di atas.

### Kategori & Format Turnamen

Seluruh pertandingan Imonoke Cup terbagi menjadi 3 kategori: **SMA Putra**, **SMA Putri**, dan **Umum**. Setiap kategori menggunakan format **sistem gugur (single elimination)** — tim/player yang kalah di suatu babak langsung tersingkir, sementara pemenang otomatis melaju ke babak berikutnya hingga ditemukan juara per kategori.

---

## 6. Rincian Fitur & Requirements

### 6.1 Jadwal Match

**Deskripsi:** Menampilkan daftar seluruh pertandingan yang terjadwal dalam turnamen.

**User Story:**

- Sebagai penonton, saya ingin melihat jadwal lengkap pertandingan agar saya tahu kapan dan di mana pertandingan favorit saya berlangsung.
- Sebagai player, saya ingin memfilter jadwal berdasarkan tim/nama saya agar mudah menemukan jadwal main sendiri.

**Functional Requirements:**

- FR-1.1: Menampilkan daftar match dengan informasi: tanggal, waktu, nama tim/player A vs B, babak/stage (grup, perempat final, semifinal, final), lokasi/arena, status (akan datang/berlangsung/selesai).
- FR-1.2: Filter jadwal berdasarkan tanggal, babak, dan/atau nama tim/player.
- FR-1.3: Pencarian (search) berdasarkan nama tim/player.
- FR-1.4: Tampilan responsif (mobile & desktop) dalam format list/kalender.
- FR-1.5: Notifikasi atau penanda visual untuk match yang akan dimulai dalam waktu dekat (misal 30 menit sebelum).
- FR-1.6 (Admin): Panitia dapat menambah, mengedit, dan menghapus entri jadwal.

**Acceptance Criteria:**

- Jadwal terupdate otomatis tanpa reload manual (atau minimal refresh berkala).
- Data jadwal konsisten dengan data di fitur Live Match dan Hasil Pertandingan.

### 6.2 Match Sedang Bermain (Live Match)

**Deskripsi:** Menampilkan pertandingan yang sedang berlangsung secara real-time (skor, status babak, waktu berjalan jika relevan).

**User Story:**

- Sebagai penonton, saya ingin melihat skor dan status pertandingan yang sedang berjalan secara real-time tanpa harus datang langsung ke venue.

**Functional Requirements:**

- FR-2.1: Menampilkan daftar match berstatus "LIVE" dengan badge/indikator visual mencolok (misal animasi/label merah "LIVE").
- FR-2.2: Menampilkan skor terkini dan tim/player yang bertanding.
- FR-2.3: Update skor secara real-time atau near real-time (via polling/websocket).
- FR-2.4: Jika ada lebih dari satu match live bersamaan (multi-arena), tampilkan semua secara paralel/tab.
- FR-2.5 (Admin): Panitia/operator dapat mengupdate skor secara manual dari dashboard saat pertandingan berjalan.
- FR-2.6: Opsional — tautan ke live streaming eksternal (YouTube/Twitch) jika tersedia.

**Acceptance Criteria:**

- Update skor tampil ke pengguna dalam waktu maksimal beberapa detik setelah diinput admin.
- Status match otomatis berubah dari "Live" menjadi "Selesai" saat admin menutup pertandingan.

### 6.3 Hasil Pertandingan

**Deskripsi:** Menampilkan rekap hasil seluruh pertandingan yang telah selesai, termasuk bracket/standing turnamen.

**User Story:**

- Sebagai penonton/player, saya ingin melihat hasil pertandingan sebelumnya dan posisi klasemen/bracket untuk mengetahui perkembangan turnamen.

**Functional Requirements:**

- FR-3.1: Menampilkan daftar match selesai dengan skor akhir dan pemenang.
- FR-3.2: Menampilkan bracket turnamen (visual tournament tree) jika format knockout, atau tabel klasemen jika format liga/grup.
- FR-3.3: Filter hasil berdasarkan tanggal/babak/nama tim.
- FR-3.4: Halaman detail per match (skor per ronde/map, statistik tambahan jika ada).
- FR-3.5: Highlight status "Gladiator" untuk tim/player yang menang sesuai tema platform.

**Acceptance Criteria:**

- Data hasil konsisten dan otomatis terhubung dengan data dari fitur Live Match saat match ditutup oleh admin.
- Bracket/klasemen terupdate otomatis setelah hasil match disimpan.

### 6.4 Tiket Online

**Deskripsi:** Sistem penjualan dan manajemen tiket untuk menonton event secara langsung (atau akses tertentu), dilakukan sepenuhnya online.

**User Story:**

- Sebagai penonton, saya ingin membeli tiket secara online dengan mudah dan menerima bukti tiket digital (e-ticket) tanpa perlu antre offline.

**Functional Requirements:**

- FR-4.1: Menampilkan jenis/kategori tiket (misal: Reguler, VIP, Hari-1/Hari-2/Full Pass) lengkap dengan harga dan kuota tersisa.
- FR-4.2: Proses pembelian tiket: pilih kategori → isi data pembeli → pilih metode pembayaran → konfirmasi.
- FR-4.3: Integrasi payment gateway menggunakan QRIS sebagai satu-satunya metode pembayaran.
- FR-4.4: Setelah membayar via QRIS, pembeli mengirimkan bukti pembayaran melalui WhatsApp (WA) kepada admin untuk diverifikasi secara manual.
- FR-4.5: Halaman "Tiket Saya" bagi pengguna yang login untuk melihat riwayat & status tiket yang dibeli.
- FR-4.6: Setelah admin memverifikasi pembayaran, admin mengirimkan kode tiket unik kepada pembeli melalui WhatsApp (WA). Kode tiket ini ditukarkan oleh pembeli ke panitia secara offline di lokasi venue pada hari pelaksanaan.
- FR-4.7: Pembatasan kuota otomatis (tiket tidak bisa dibeli melebihi stok).
- FR-4.8 (Admin): Dashboard penjualan tiket (jumlah terjual, pendapatan, sisa kuota per kategori).

**Acceptance Criteria:**

- Transaksi pembayaran berhasil/gagal tercatat dengan jelas dan pengguna mendapat notifikasi status.
- Kode tiket hanya dapat ditukarkan satu kali (one-time redemption); status tiket ditandai "sudah ditukar" oleh panitia saat penukaran di lokasi.
- Proses pembelian end-to-end dapat diselesaikan pengguna dalam waktu singkat (target di bawah 3 menit untuk pengguna baru).

### 6.5 Admin Panel — Manajemen Turnamen

**Deskripsi:** Panel khusus panitia untuk memverifikasi pembayaran tiket, mengatur progres babak sistem gugur, dan menentukan tim/player yang lolos ke babak berikutnya di tiap kategori (SMA Putra, SMA Putri, Umum).

**User Story:**

- Sebagai admin, saya ingin memverifikasi bukti pembayaran tiket secara manual agar transaksi yang tidak otomatis terverifikasi payment gateway tetap bisa divalidasi.
- Sebagai admin, saya ingin menandai tim pemenang suatu match agar sistem otomatis menyusun jadwal babak berikutnya sesuai sistem gugur.

**Functional Requirements:**

- FR-5.1: Menampilkan daftar transaksi tiket dengan status (Menunggu Verifikasi, Terverifikasi, Ditolak), berdasarkan bukti pembayaran QRIS yang dikirimkan pembeli melalui WhatsApp (WA).
- FR-5.2: Admin dapat menyetujui atau menolak bukti pembayaran, disertai catatan/alasan jika ditolak.
- FR-5.3: Admin mengirimkan kode tiket unik ke pembeli via WhatsApp (WA) setelah pembayaran diverifikasi, atau mengirimkan pesan penolakan beserta alasannya jika bukti pembayaran tidak valid.
- FR-5.4: Admin dapat mengelola bracket sistem gugur per kategori (SMA Putra, SMA Putri, Umum) secara terpisah.
- FR-5.5: Setelah hasil match diinput, admin dapat menandai tim/player pemenang sebagai "lolos" ke babak berikutnya.
- FR-5.6: Sistem otomatis (atau semi-otomatis dengan konfirmasi admin) membuat entri jadwal match babak berikutnya berdasarkan tim yang lolos, termasuk tanggal, waktu, dan arena.
- FR-5.7: Admin dapat melihat bracket penuh per kategori untuk memantau tim yang tersingkir maupun yang masih bertahan.
- FR-5.8: Log/riwayat (audit trail) untuk setiap verifikasi pembayaran dan update bracket, guna menghindari kesalahan input.

**Acceptance Criteria:**

- Status pembayaran yang diverifikasi admin langsung mengubah status tiket pembeli secara real-time di halaman "Tiket Saya".
- Tim yang ditandai "lolos" otomatis muncul di jadwal babak berikutnya tanpa input manual ulang nama tim.
- Bracket per kategori selalu merefleksikan hasil pertandingan terbaru secara akurat.

---

## 7. Kebutuhan Non-Fungsional

- **Performa:** Halaman utama dan fitur live match harus memuat dalam waktu < 3 detik pada koneksi standar.
- **Skalabilitas:** Platform harus mampu menangani lonjakan trafik saat hari-H pertandingan besar (final).
- **Keamanan:** Data pembayaran dan data pribadi pengguna dienkripsi; mengikuti standar keamanan payment gateway yang digunakan.
- **Ketersediaan:** Uptime minimal 99% selama periode event berlangsung.
- **Kompatibilitas:** Responsif di perangkat mobile dan desktop, mendukung browser modern (Chrome, Safari, Edge, Firefox).
- **Aksesibilitas:** Kontras warna tetap terbaca meski menggunakan tema gelap ala Colosseum.

## 8. Peran & Hak Akses (Role Access)

| Role | Akses |
| --- | --- |
| Guest/Pengunjung | Lihat jadwal, live match, hasil, beli tiket |
| Registered User | Semua akses guest + riwayat tiket pribadi |
| Admin/Panitia | Kelola jadwal, update skor live, input hasil, kelola tiket & laporan penjualan |
| Operator Venue | Scan/validasi tiket di lokasi |

## 9. Metrik Keberhasilan (Success Metrics)

- Jumlah tiket terjual online vs target.
- Jumlah pengunjung unik ke halaman live match saat hari-H.
- Tingkat konversi pembelian tiket (visitor → buyer).
- Waktu rata-rata update skor live (admin input → tampil ke user).
- Tingkat kepuasan pengguna (survey/feedback pasca-event).

## 10. Asumsi & Dependensi

- Tersedia data tim/peserta turnamen yang sudah final sebelum jadwal dipublikasikan.
- Tersedia akun/kontrak payment gateway untuk fitur tiket online.
- Panitia memiliki akses perangkat (laptop/tablet) untuk input skor live dan scan tiket saat event berlangsung.
- Konektivitas internet stabil di venue untuk update real-time.

## 11. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Koneksi internet venue tidak stabil | Update skor live terlambat | Siapkan koneksi cadangan (hotspot/provider lain), fallback input manual berkala |
| Lonjakan trafik saat final | Website down/lambat | Load testing sebelum event, gunakan CDN/caching |
| Kegagalan payment gateway | Transaksi tiket gagal | Sediakan lebih dari satu metode pembayaran |
| Kesalahan input skor oleh admin | Data hasil tidak akurat | Fitur edit/koreksi hasil dengan log perubahan |

## 12. Roadmap / Fase Pengembangan (Usulan)

| Fase | Cakupan |
| --- | --- |
| Fase 1 (MVP) | Landing page tema, Jadwal Match, Hasil Pertandingan (statis/manual update) |
| Fase 2 | Live Match real-time, dashboard admin untuk update skor |
| Fase 3 | Tiket Online lengkap dengan payment gateway & e-ticket |
| Fase 4 (Opsional) | Integrasi live streaming, notifikasi push, statistik lanjutan |

## 13. Open Questions

- Pendaftaran tim/player sudah selesai dan dilakukan di luar platform; platform hanya digunakan untuk kebutuhan hari-H pelaksanaan (jadwal, live match, hasil, dan tiket).
- Format turnamen: sistem gugur (knockout) untuk seluruh kategori (SMA Putra, SMA Putri, Umum).
- Payment gateway: QRIS, dengan verifikasi pembayaran manual oleh admin melalui WhatsApp (WA); kode tiket dikirim ke pembeli dan ditukarkan ke panitia secara offline di lokasi.
- Platform cukup berupa web responsif (tidak dibutuhkan aplikasi mobile terpisah).

---

*Dokumen ini adalah draft awal dan dapat disesuaikan lebih lanjut berdasarkan masukan tim produk, teknis, dan panitia event.*
