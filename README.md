# EZPajak 🧾

**EZPajak** adalah aplikasi web yang memudahkan pengajuan pembayaran pajak secara online. Dibuat untuk memberikan kemudahan, kecepatan, dan transparansi dalam proses administrasi pajak.

---

## 👤 Anggota Kelompok

| Nama Lengkap         | NIM                 | Role                |
|----------------------|---------------------|---------------------|
| Iqbal Hidayat R.     | 22/506066/TK/55425  | Backend Developer   |
| Steven Namora R.     | 22/505930/TK/55405  | Frontend Developer  |
| Della Febi A.        | 22/505892/TK/55393  | QA Engineer         |

---

## 🚀 Fitur Utama

EZPajak adalah sistem web untuk pengajuan dan konfirmasi pembayaran pajak secara online. Sistem ini menyediakan berbagai fitur penting untuk memudahkan pengguna dalam proses administrasi pajak.

### 🧾 Formulir Pengajuan Pajak (F01)
- Form input untuk nama, NIK, alamat, email, nomor HP, jenis pajak, dan jumlah pajak.

### ✔️ Validasi Form (F02)
- Validasi otomatis untuk memastikan semua field diisi sesuai aturan (panjang karakter, format email, dll).

### 📂 Dropdown Jenis Pajak (F03)
- Dropdown dengan pilihan jenis pajak seperti:
  - PPh 21, PPh 22, PPh 23
  - PPN, PBB, PKB

### 🔢 Nomor Referensi Otomatis (F04)
- Sistem akan secara otomatis membuat nomor referensi unik (contoh: `TAX2025-001`) setelah form berhasil disubmit.

### 📄 Halaman Bukti Pengajuan (F05)
- Menampilkan detail pengajuan: data wajib pajak, jumlah pajak, instruksi pembayaran, dan status pembayaran.

### 🔍 Cek Status Pembayaran (F06)
- Fitur untuk mengecek status dan riwayat pengajuan berdasarkan nomor referensi.

### ✅ Konfirmasi Pembayaran (F07)
- Tombol aksi yang digunakan untuk menyatakan bahwa pembayaran telah dilakukan.
- Sistem akan mengubah status menjadi `Lunas`.

### 🎉 Notifikasi Sukses (F08)
- Menampilkan pesan sukses dan status “Lunas” jika proses pembayaran berhasil.

### 📥 Unduh Bukti (F09)
- Tombol untuk mengunduh bukti pengajuan atau pembayaran dalam bentuk file PDF.

### 📱 Desain Responsif & Aksesibel (F10)
- Tampilan web bersifat clean, konsisten, mudah dibaca, dan mendukung tampilan mobile.
- Dioptimalkan untuk aksesibilitas semua pengguna.

---


## ✅ Acceptance Criteria dan QA

Penjelasan fitur beserta *acceptance criteria* tersedia dalam dokumentasi QA.  
Screenshot hasil pengujian API serta coverage unit test juga telah disertakan pada folder `qa/` dan `documentation/`.

---

## 🧪 Struktur Repository

- `/backend/` → Codebase backend + unit test  
- `/frontend/` → Codebase frontend + unit test  
- `/qa/` → User Requirement, test case, screenshot hasil API testing, dan acceptance criteria 

---

## 📊 Link Slide Presentasi

[Klik di sini untuk membuka slide presentasi](https://www.canva.com/design/DAGnuuA_wso/hbnjTQze3_ckJjwMgygw4w/edit?utm_content=DAGnuuA_wso&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
