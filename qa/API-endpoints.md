# API Pajak - Dokumentasi Endpoint

Dokumentasi untuk API sistem pengajuan pajak.

---

## 1. Submit Pengajuan Pajak
**POST** `/api/tax/submit`

### Request Body
```json
{
  "nama": "Budi",
  "nik": "1234567890123456",
  "alamat": "Jl. Kebon Jeruk",
  "email": "budi@example.com",
  "telepon": "081234567890",
  "jenisPajak": "PPH",
  "jumlahPajak": 1500000
}
```

## 2. Cek Status Pengajuan
**GET** `api/tax/status/TAX2025-646`

### contoh
GET /api/tax/status/TAX2025-646

## 3. Update Status Pengajuan
**PUT** `/api/tax/status/:referensi`

### Request Body
```json
{
  "status": "Lunas"
}
```
### contoh
PUT /api/tax/status/TAX2025-646


