<p align="center">
  <img src="../assets/images/icon.png" alt="Nunmasae Companion" width="96"><br>
  <a href="#apa-ini">Tentang</a> |
  <a href="#laporkan-kesalahan">Laporkan kesalahan</a> |
  <a href="#untuk-pengembang">Untuk pengembang</a><br>
  [<a href="../README.md">English</a>] | [<a href="README-KR.md">한국어</a>] | [<a href="README-JP.md">日本語</a>] | [<a href="README-ZH.md">简体中文</a>] | [<a href="README-TW.md">繁體中文</a>] | [<a href="README-ES.md">Español</a>] | [<a href="README-PTBR.md">Português (Brasil)</a>] | [<a href="README-FR.md">Français</a>] | [<a href="README-DE.md">Deutsch</a>] | [<a href="README-IT.md">Italiano</a>] | [<a href="README-RU.md">Русский</a>] | [<a href="README-PL.md">Polski</a>] | [<a href="README-TR.md">Türkçe</a>] | [<a href="README-ID.md">Bahasa Indonesia</a>] | [<a href="README-VN.md">Tiếng Việt</a>] | [<a href="README-TH.md">ไทย</a>] | [<a href="README-AR.md">العربية</a>] | [<a href="README-HI.md">हिन्दी</a>]
</p>

# Nunmasae Companion

Aplikasi pendamping penggemar yang tidak resmi dan bebas spoiler untuk novel fantasi Korea "The Bird That Drinks Tears" (눈물을 마시는 새). Aplikasi ini hanya menampilkan tokoh, tempat, dan istilah sampai buku yang sudah Anda baca.

> [!NOTE]
> Tampilan aplikasi hanya tersedia dalam bahasa Inggris dan Korea. README ini diterjemahkan secara otomatis dengan Claude; koreksi sangat kami harapkan.

## Apa ini

- Pilih sejauh mana Anda sudah membaca (Buku 1 sampai 4). Aplikasi hanya menampilkan tokoh, ras, tempat, dan istilah yang sudah muncul sampai titik itu, dan di setiap entri hanya fakta yang sudah terungkap sampai titik itu.
- Entri dan fakta dari buku yang belum Anda baca tidak diburamkan; semuanya sama sekali tidak ditampilkan, sehingga jumlahnya pun tetap tersembunyi.
- Kejutan besar di buku yang sedang Anda baca tetap tertutup di layar detail sampai Anda mengetuknya.
- Tampilan bahasa Inggris dan Korea. Tampilan bahasa Inggris juga menampilkan nama Korea agar Anda bisa mencocokkannya dengan karya aslinya.
- Tanpa iklan, tanpa donasi, tanpa fitur berbayar, tanpa login, tanpa server. Satu-satunya yang disimpan di perangkat Anda adalah progres membaca dan pilihan bahasa.
- Unduh: Google Play (Segera hadir)

## Laporkan kesalahan

Fakta-fakta di aplikasi ini dirangkum dari sumber sekunder, bukan langsung dari bukunya, jadi sebagian mungkin keliru atau ditempatkan di buku yang salah. Beri tahu kami dan kami akan memperbaikinya.

- Di aplikasi: "Settings" (Pengaturan) > "Report on GitHub" (Laporkan di GitHub) atau "Report by email" (Laporkan lewat email)
- [Buka issue di GitHub](https://github.com/HanJaeJoon/nunmasae-companion/issues/new/choose) lalu pilih formulir: fakta salah / terungkap terlalu cepat (spoiler) / nama bahasa Inggris / fakta yang terlewat
- Perbaiki sendiri dan kirim pull request: [CONTRIBUTING.md](CONTRIBUTING.md)

**Peringatan spoiler**: jika judul atau isi issue Anda bisa membocorkan cerita bagi pembaca yang belum selesai, tulis `[Spoiler Book N]` di baris pertama.

## Tidak resmi

Ini adalah proyek penggemar yang tidak berafiliasi dengan penulis, penerbit (Golden Bough, HarperCollins), maupun Krafton. Nama, latar, dan istilah adalah milik karya aslinya; setiap kalimat fakta di aplikasi adalah ringkasan orisinal. Tidak ada kutipan dari buku, sampul, maupun ilustrasi. Jika pemegang hak memintanya, kami akan segera menghapusnya.

## Untuk pengembang

- Panduan kontribusi (bahasa Inggris): [CONTRIBUTING.md](CONTRIBUTING.md)
- Dokumentasi pengembang (layar, struktur kode, format data, perintah; hanya dalam bahasa Korea): [DEVELOPMENT.md](DEVELOPMENT.md)

Expo SDK 57 / React Native 0.86 / expo-router / TypeScript. Pengelola paketnya adalah pnpm.

## Lisensi

Kode: lihat `LICENSE`. Nama tokoh, tempat, dan istilah adalah milik karya aslinya; semua kalimat fakta di `entries.json` adalah ringkasan orisinal yang ditulis untuk aplikasi ini.
