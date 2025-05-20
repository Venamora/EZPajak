# ✅ Formulir Pengajuan Pajak — Execution Result

## End-to-End Test

| No | Halaman    | Aksi                                                                 | Expected Value                                                                 | Hasil |
|----|------------|----------------------------------------------------------------------|----------------------------------------------------------------------------------|--------|
| 1  | Dashboard  | Isi semua data wajib pajak dengan input valid                        | Tidak muncul error, tombol "Ajukan Pembayaran" aktif                           | Pass  |
| 2  | Dashboard  | Isi NIK kurang dari 16 digit                                          | Muncul error "NIK harus terdiri dari 16 angka", tombol tidak aktif             | Pass  |
| 3  | Dashboard  | Isi nomor HP kurang dari 14 digit                                     | Muncul error "Nomor telepon harus terdiri dari 10-14 angka"                    | Pass  |
| 4  | Dashboard  | Isi email tidak valid (tidak memakai `@` atau domain)                | Muncul error "Format email tidak valid"                                        | Pass  |
| 5  | Dashboard  | Isi jumlah pajak di bawah Rp 5.000                                    | Jumlah pajak minimal Rp 5.000                                                  | Pass  |
| 6  | Dashboard  | Klik "Ajukan Pembayaran" setelah semua input valid                   | Redirect ke halaman `/bukti`, data tampil lengkap                              | Pass  |
| 7  | Bukti      | Cek data referensi & informasi pajak                                 | Nomor Referensi TAX2025-XXX, info lengkap, instruksi transfer muncul          | Pass  |
| 8  | Bukti      | Klik "Unduh Bukti Pengajuan"                                          | File berhasil terunduh                                                         | Pass  |
| 9  | Cek Status | Input nomor referensi valid dan klik "Cari"                           | Data lengkap muncul, status: "Menunggu Pembayaran"                             | Pass  |
| 10 | Cek Status | Input nomor referensi tidak valid                                     | Muncul pesan Nomor referensi tidak ditemukan                                   | Pass  |
| 11 | Cek Status | Input nomor referensi kosong                                          | Nomor referensi wajib diisi                                                    | Pass  |
| 12 | Cek Status | Klik "Konfirmasi Pembayaran"                                          | Status berubah jadi "Lunas", notifikasi sukses muncul                          | Pass  |
| 13 | Cek Status | Klik "Unduh Bukti Pembayaran"                                         | File bukti berhasil diunduh                                                    | Pass  |