# Acceptance Criteria – Aplikasi Pengajuan Pajak

## 1. Formulir Pajak
- Dropdown jenis pajak tersedia minimal 2 jenis pajak.
- Ada input untuk jumlah pajak (hanya angka positif).

## 2. Validasi
- Jumlah pajak kosong → tampilkan: "Jumlah pajak harus angka positif".
- Jumlah pajak < 1 → tampilkan: "Jumlah pajak harus angka positif".

## 3. Proses Pengajuan
- Setelah klik "Ajukan Pembayaran", data dikirim ke backend.
- Sistem menampilkan bukti pengajuan:
  - Nomor referensi (format: TAX2025-XXX)
  - Jenis pajak
  - Jumlah pajak
  - Tanggal pengajuan
- Pengguna dapat **mengunduh bukti pengajuan** sebagai file PDF atau dokumen digital.

## 4. Cek Status
- Pengguna bisa input nomor referensi untuk melihat ulang datanya.

## 5. Fitur Tambahan
- Tombol “Kembali” mengarahkan pengguna ke formulir lagi.