## ✅ Formulir Pengajuan Pajak — Execution Result

| ID    | Test Case                                 | Input Data               | Expected Result                                         | Actual Result | Status  | Screenshot                  |
|-------|--------------------------------------------|--------------------------|----------------------------------------------------------|---------------|---------|-----------------------------|
| TC01  | Nama tidak diisi                           | `""`                     | Error: "Nama tidak boleh kosong"                         | []       | [✓]   | screenshots/TC01.png        |
| TC09  | NIK kurang dari 16 digit                   | `"123456789012345"`      | Error: "NIK harus 16 digit"                              | []       | [✓]   | screenshots/TC09.png        |
| TC13  | NIK valid                                  | `"1234567890123456"`     | Form valid, lanjut ke langkah berikutnya                 | []       | [✓]   | screenshots/TC13.png        |
| TC17  | Email format tidak valid                   | `"della@email.com"`      | Format email tidak valid                          | []       | [✓]   | screenshots/TC17.png        |
| TC22  | Nomor telepon valid                        | `"081234564"`         | Nomor telepon harus terdiri dari 10-14 angka             | []       | [✓]   | screenshots/TC22.png        |
| TC24  | Jenis pajak tidak dipilih                  | `""`                     | Error: "Jenis pajak harus dipilih"                       | []       | [✓]   | screenshots/TC24.png        |
| TC28  | Jumlah pajak valid                         | `"1500000"`              | Diterima, lanjut ke proses penghitungan                  | []       | [✓]   | screenshots/TC28.png        |
| TC30  | Unduh bukti pengajuan berhasil            | Klik tombol unduh       | File bukti berhasil diunduh tanpa error                  | []       | [✓]   | screenshots/TC30.png        |
| TC51  | Cek status dengan referensi valid          | `"EZPJK-20240519-001"`   | Status ditampilkan dengan detail pengajuan               | []       | [✓]   | screenshots/TC51.png        |
| TC52  | Cek status dengan referensi kosong         | `""`                     | Error: "Nomor referensi tidak boleh kosong"              | []       | [✓]   | screenshots/TC52.png        |