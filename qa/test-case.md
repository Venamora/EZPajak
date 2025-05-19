# Test Case – Aplikasi Pengajuan Pajak

## 📋 Test Case Validasi Formulir Pengajuan Pajak

| TC ID | Field         | Test Condition | Action                          | Input Specification           | Expected Output                             |
|-------|---------------|----------------|----------------------------------|-------------------------------|----------------------------------------------|
| TC01  | Nama Lengkap  | Negative       | Kosongkan field                 | (kosong)                      | Error: "Nama tidak boleh kosong"             |
| TC02  | Nama Lengkap  | Positive       | Isi dengan angka                | 12345                         | Form valid                                   |
| TC03  | Nama Lengkap  | Positive       | Isi dengan tanda baca umum      | . , ' -                       | Form valid                                   |
| TC04  | Nama Lengkap  | Negative       | Isi dengan simbol tidak umum    | @ # $ % ^ & *                 | Error: "Nama mengandung karakter tidak valid"|
| TC05  | Nama Lengkap  | Positive       | Isi dengan nama alfabet standar | Budi Santoso                  | Form valid – lanjut ke form berikutnya       |
| TC06  | Nama Lengkap  | Positive       | Isi dengan nama campuran angka  | Andi 2                        | Form valid                                   |
| TC07  | Nama Lengkap  | Positive       | Isi dengan nama dan tanda petik | O'Connor                      | Form valid                                   |
| TC08  | NIK   | Negative       | Kosongkan field         | (blank)                   | Error "NIK tidak boleh kosong"                 | 
| TC09  | NIK   | Negative       | Kurang dari 16 digit    | 1234567890123             | Error "NIK harus terdiri dari 16 angka"  | 
| TC10  | NIK   | Negative       | Lebih dari 16 digit     | 1234567890123456789       | Hanya 16 digit pertama yang bisa dimasukkan | 
| TC11  | NIK   | Negative       | Berisi huruf            | 1234abcd90112233          | Error "NIK harus terdiri dari 16 angka"           | 
| TC12  | NIK   | Negative       | Semua angka nol         | 0000000000000000          | Error "NIK tidak boleh seluruhnya nol"         | 
| TC13  | NIK   | Positive       | NIK valid               | 1234567890123456          | Tidak ada error, lanjut ke form berikutnya     | 
| TC11  | Alamat  | Negative       | Kosongkan field     | (blank)                      | Error "Alamat tidak boleh kosong"      |
| TC12  | Alamat  | Positive       | Isi alamat valid    | Jl. Kaliurang KM 10, Sleman | Tidak ada error, lanjut ke form berikut|
| TC13  | Email  | Negative       | Kosongkan field               | (blank)                     | Error "Email tidak boleh kosong"       |
| TC14  | Email  | Negative       | Isi email tanpa domain        | user@                       | Error "Format email tidak valid"       |
| TC15  | Email  | Negative       | Isi email tanpa @             | user.domain.com             | Error "Format email tidak valid"       |
| TC16  | Email  | Negative       | Isi dengan karakter tidak sah | user@!mail.com              | Error "Format email tidak valid"       |
| TC17  | Email  | Positive       | Isi email valid               | user@mail.com               | Tidak ada error, lanjut ke form berikut |
| TC18  | Nomor Telepon  | Negative       | Kosongkan field             | (blank)                  | Error "Nomor telepon tidak boleh kosong"     |
| TC19  | Nomor Telepon  | Negative       | Isi kurang dari 10 digit    | 08123                    | Error "Nomor telepon harus terdiri dari 10-14 angka"       |
| TC20  | Nomor Telepon  | Negative       | Isi lebih dari 14 digit     | 0812345678901234         | Hanya 16 digit pertama yang bisa dimasukkan       |
| TC21  | Nomor Telepon  | Negative       | Isi dengan huruf            | 08ABCD5678               | Error "Nomor telepon harus terdiri dari 10-14 angka"       |
| TC22  | Nomor Telepon  | Positive       | Isi nomor valid             | 081234567890             | Tidak ada error, lanjut ke form berikut       |
| TC23  | Jenis Pajak | Negative       | Tidak memilih jenis pajak   | (blank)             | Error "Jenis pajak harus dipilih"       |
| TC24  | Jenis Pajak | Positive       | Pilih jenis pajak valid     | Pajak Penghasilan   | Tidak ada error, lanjut ke form berikut |
| TC25  | Jumlah Pajak | Negative       | Kosongkan field                     | (blank)              | Error "Jumlah pajak tidak boleh kosong"         |
| TC26  | Jumlah Pajak | Negative       | Isi jumlah < Rp 5.000               | 3000                 | Error "Jumlah pajak minimal Rp 5.000"   |
| TC27  | Jumlah Pajak | Exploratory    | Isi jumlah melebihi batas maksimal | 10000000000          | Error "Jumlah terlalu besar" (opsional)         |
| TC28  | Jumlah Pajak | Positive       | Isi jumlah valid                    | 5000                 | Tidak ada error, lanjut ke form berikut         |

## 🧾 Bukti Pengajuan Pembayaran Pajak

| TC ID  | Field               | Test Condition     | Action                                                        | Input Specification                      | Expected Result                                  |
|-------|------------------------|---------------|------------------------------------------------------------------|-----------------------------------|---------------------------------------------------|
| TC29  | Button "Kembali"       | Positive      | Klik tombol untuk kembali ke halaman utama                      | Klik "Kembali ke Halaman Utama"   | Dialihkan ke halaman utama                       |
| TC30  | Button "Unduh Bukti"   | Positive      | Klik tombol unduh bukti pengajuan pembayaran pajak              | Klik "Unduh Bukti Pengajuan"      | File PDF/download berhasil dimulai               |
| TC31  | Button "Cek Status"    | Positive      | Klik tombol untuk cek status pembayaran pajak                   | Klik "Cek Status Pembayaran"      | Dialihkan ke halaman status atau muncul info     |
| TC32  | Halaman ini (general)  | Exploratory   | Coba akses halaman tanpa data valid / refresh langsung          | Akses langsung via URL            | Halaman muncul dengan catatan "Data Tidak Ditemukan, Nomor referensi tidak ditemukan"  |

## 📄 Cek Status Pembayaran Pajak

| TC ID | Field                  | Test Condition     | Action                                                        | Input Specification                    | Expected Result                                           |
|-------|---------------------------|---------------|------------------------------------------------------------------|---------------------------------|------------------------------------------------------------|
| TC51  | Input Nomor Referensi     | Positive      | Input nomor referensi yang valid                                | TAX2025-001 → klik Cari        | Status pengajuan muncul sesuai data referensi             |
| TC52  | Input Kosong              | Negative      | Tidak mengisi nomor referensi lalu klik cari                    | "" → klik Cari                 | Muncul pesan error validasi: "Nomor referensi wajib diisi" |
| TC53  | Nomor Tidak Terdaftar     | Negative      | Masukkan nomor referensi yang tidak ditemukan di sistem         | TAX2025-XYZ → klik Cari        | Muncul pesan error: "Data tidak ditemukan untuk nomor referensi tersebut"                 |
| TC54  | Tombol "Kembali"          | Positive      | Klik tombol kembali untuk kembali ke halaman utama              | Klik "Kembali ke Beranda"      | Dialihkan ke halaman utama                                |
| TC55  | Paste teks panjang/salah  | Exploratory   | Paste teks acak ke input nomor referensi                        | "abcdefg123" → klik Cari       | Muncul pesan error: "Data tidak ditemukan untuk nomor referensi tersebut"      |
| TC56  | Klik tombol "Konfirmasi Pembayaran"  | Klik tombol biru bertuliskan "Konfirmasi Pembayaran"                        | Dialihkan ke halaman konfirmasi pembayaran atau menampilkan form konfirmasi     |
| TC57  | Unduh bukti pembayaran (PDF)            | Klik tombol biru "Unduh PDF"                                                | File bukti pembayaran (PDF) berhasil diunduh                                     |
---

<!-- ### 📝 Catatan QA / Future Enhancement
- Tidak tersedia tombol untuk **edit data** (misal: Nama, NPWP, Email).
- Tidak ada **popup konfirmasi** saat klik "Kembali" — berpotensi meninggalkan halaman tanpa sadar.
- Tombol “Unduh Bukti” tidak memberikan **feedback jika download gagal**.
- Data instruksi pembayaran bersifat statis, tidak ada **copy-to-clipboard**. -->
