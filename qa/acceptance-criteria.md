## 3. ✅ Acceptance Criteria

| ID    | Fitur Terkait            | Kriteria Penerimaan                                                                 |
|-------|--------------------------|-------------------------------------------------------------------------------------|
| AC01  | F01 – Formulir           | Nama, Alamat, Email tidak boleh kosong.                                            |
| AC02  | F01 – Formulir           | NIK harus 16 digit angka.                                                          |
| AC03  | F01 – Formulir           | Nomor Telepon: hanya angka, 10–14 digit.                                           |
| AC04  | F01 – Formulir           | Email: valid format (contoh: `user@email.com`).                                    |
| AC05  | F03 – Jenis Pajak        | Jenis pajak harus dipilih dari dropdown yang tersedia.                             |
| AC06  | F01 – Jumlah Pajak       | Jumlah pajak minimal Rp 5.000 dan hanya angka positif.                             |
| AC07  | F02 – Validasi Form      | Semua input harus valid sebelum tombol submit aktif.                               |
| AC08  | F05 – Bukti Pengajuan    | Setelah submit, tampil data pengajuan + instruksi pembayaran + nomor referensi.    |
| AC09  | F05 – Bukti Pengajuan    | Tombol Unduh Bukti dan Kembali ke Home harus muncul.                               |
| AC10  | F06 – Cek Status         | Input referensi yang valid harus menampilkan data dan status lengkap.              |
| AC11  | F06 – Cek Status         | Jika referensi tidak ditemukan, tampilkan pesan error.                             |
| AC12  | F08 – Notifikasi         | Jika status Lunas, tampilkan notifikasi sukses + tanggal pembayaran.               |
| AC13  | F10 – Responsif UI       | Layout tetap rapi di layar mobile, tablet, dan desktop.                            |
| AC14  | F10 – UX Visual          | Warna badge: kuning (pending), hijau (lunas); ikon status (✔️, ⏳, ✖️).            |