# Acceptance Criteria (Detailed) – Aplikasi Pengajuan Pajak 
> **Catatan**: Acceptance Criteria ini disusun oleh QA berdasarkan user story dan hasil pengujian awal terhadap UI yang dikembangkan, guna memastikan semua fitur berfungsi sesuai kebutuhan pengguna.


## 1. Formulir Pengajuan

### Data Wajib Pajak

* **Nama Lengkap**, **Alamat**, dan **Email**: Wajib diisi.
* **NIK (Nomor Induk Kependudukan)**:
  * Harus 16 digit angka.
  * Error: `NIK harus terdiri dari 16 angka`.
* **Nomor Telepon**:
  * Hanya angka, 10–14 digit.
  * Error: `Nomor telepon harus terdiri dari 10-14 angka`.
* **Email**:
  * Format valid.
  * Error: `Format email tidak valid`.

## Informasi Pajak

* **Jenis Pajak**: Dipilih dari dropdown dengan pilihan:
  * Pajak Penghasilan (PPh) 21  
  * Pajak Penghasilan (PPh) 22  
  * Pajak Penghasilan (PPh) 23  
  * Pajak Pertambahan Nilai (PPN)  
  * Pajak Bumi dan Bangunan (PBB)  
  * Pajak Kendaraan Bermotor (PKB)
* **Jumlah Pajak (Rp)**:
  * Minimal Rp 5.000.
  * Hanya angka positif.
  * Error: `Jumlah pajak minimal Rp 5.000`.


## 2. Validasi Form

* Semua input harus valid sebelum tombol **Ajukan Pembayaran** aktif.
* Error muncul di bawah input, border merah.

## 3. Setelah Pengajuan

### Halaman Bukti Pengajuan

* **Nomor Referensi**: Format `TAX2025-XXX`, status: `Menunggu Pembayaran` (badge kuning).
* **Tanggal Pengajuan**: Format lokal (contoh: 19 Mei 2025, 15.58).
* **Data Wajib Pajak** dan **Informasi Pembayaran**:
  * Nama Lengkap, NIK, Alamat, Email, Telepon
  * Jenis Pajak, Jumlah (format `Rp x.xxx`)
* **Instruksi Pembayaran**:
  * Bank: Bank Republik Indonesia
  * Rekening: 123-456-7890
  * Atas Nama: Direktorat Jenderal Pajak
  * Catatan: Pembayaran dalam 24 jam, sertakan nomor referensi
* **Tombol Aksi**:
  * Kembali ke Halaman Utama
  * Unduh Bukti Pengajuan
  * Cek Status Pembayaran

## 4. Cek Status Pembayaran

### Tampilan Awal

* URL: `/cek-status`
* Elemen:
  * Judul: **Cek Status Pembayaran Pajak**
  * Input: **Nomor Referensi**
  * Tombol: **Cari** (aktif jika input valid)
  * Tombol: **Kembali ke Beranda**

### Jika Referensi Valid

* Tampilkan:
  * **Nomor Referensi**, **Status** (badge warna)
  * **Ringkasan Pembayaran**: Nama, NIK, Jenis Pajak, Jumlah, Tanggal
  * **Riwayat Status**: Daftar kronologis dengan ikon (✔️ untuk aktif)
  * **Instruksi Pembayaran** (jika status: *Menunggu Pembayaran*)
* Tombol:
  * **Konfirmasi Pembayaran**
  * **Kembali ke Beranda**

### Jika Referensi Tidak Ditemukan

* Tampilkan pesan: *Nomor referensi tidak ditemukan.*

### Jika Pembayaran Berhasil

* Notifikasi sukses (ikon ✔️, pesan **"Pembayaran Berhasil"**)
* Status: **Lunas** (badge hijau)
* Tambahan:
  * Tanggal Pembayaran
  * Tombol: **Unduh Bukti Pembayaran**

## 5. Desain & UX

* Responsif, skema warna:
  * Header: Biru `#0057FF`
  * Badge status: Kuning (pending), Hijau (lunas), Abu (gagal)
* Gunakan ikon status (✔️, ⏳, ✖️)
* Layout terpusat dan rapi