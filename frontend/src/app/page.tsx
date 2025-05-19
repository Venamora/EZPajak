"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type TaxFormData = {
  nama: string;
  nik: string;
  alamat: string;
  email: string;
  telepon: string;
  jenisPajak: string;
  jumlahPajak: string;
};

export default function TaxSubmissionForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<TaxFormData>({
    nama: "",
    nik: "",
    alamat: "",
    email: "",
    telepon: "",
    jenisPajak: "",
    jumlahPajak: "",
  });

  const jenisPajakOptions = [
    { value: "", label: "Pilih Jenis Pajak" },
    { value: "pph21", label: "Pajak Penghasilan (PPh) 21" },
    { value: "pph22", label: "Pajak Penghasilan (PPh) 22" },
    { value: "pph23", label: "Pajak Penghasilan (PPh) 23" },
    { value: "ppn", label: "Pajak Pertambahan Nilai (PPN)" },
    { value: "pbb", label: "Pajak Bumi dan Bangunan (PBB)" },
    { value: "pkb", label: "Pajak Kendaraan Bermotor (PKB)" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let errors = { ...formErrors };
    
    switch (name) {
      case "nik":
        if (value && (!/^\d+$/.test(value) || value.length !== 16)) {
          errors[name] = "NIK harus terdiri dari 16 angka";
        } else {
          delete errors[name];
        }
        break;
      
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors[name] = "Format email tidak valid";
        } else {
          delete errors[name];
        }
        break;
      
      case "telepon":
        if (value && (!/^\d+$/.test(value) || value.length < 10 || value.length > 14)) {
          errors[name] = "Nomor telepon harus terdiri dari 10-14 angka";
        } else {
          delete errors[name];
        }
        break;
      
      case "jumlahPajak":
        const jumlahPajakValue = parseFloat(value);
        if (value && (isNaN(jumlahPajakValue) || jumlahPajakValue < 5000)) {
          errors[name] = "Jumlah pajak minimal Rp 5.000";
        } else {
          delete errors[name];
        }
        break;
      
      default:
        break;
    }
    
    setFormErrors(errors);
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors: Record<string, string> = {};
    let generalError = "";
    
    if (!formData.nama) {
      newErrors.nama = "Nama tidak boleh kosong";
      isValid = false;
    }
    
    if (!formData.nik) {
      newErrors.nik = "NIK tidak boleh kosong";
      isValid = false;
    } else if (!/^\d+$/.test(formData.nik) || formData.nik.length !== 16) {
      newErrors.nik = "NIK harus terdiri dari 16 angka";
      isValid = false;
    }
    
    if (!formData.alamat) {
      newErrors.alamat = "Alamat tidak boleh kosong";
      isValid = false;
    }
    
    if (!formData.email) {
      newErrors.email = "Email tidak boleh kosong";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
      isValid = false;
    }
    
    if (formData.telepon && (!/^\d+$/.test(formData.telepon) || formData.telepon.length < 10 || formData.telepon.length > 14)) {
      newErrors.telepon = "Nomor telepon harus terdiri dari 10-14 angka";
      isValid = false;
    }
    
    if (!formData.jenisPajak) {
      newErrors.jenisPajak = "Jenis pajak harus dipilih";
      isValid = false;
    }
    
    const jumlahPajakValue = parseFloat(formData.jumlahPajak);
    if (!formData.jumlahPajak) {
      newErrors.jumlahPajak = "Jumlah pajak tidak boleh kosong";
      isValid = false;
    } else if (isNaN(jumlahPajakValue)) {
      newErrors.jumlahPajak = "Jumlah pajak harus berupa angka";
      isValid = false;
    } else if (jumlahPajakValue < 5000) {
      newErrors.jumlahPajak = "Jumlah pajak minimal Rp 5.000";
      isValid = false;
    }
    
    setFormErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      generalError = "Mohon perbaiki error pada formulir";
    }
    
    setError(generalError);
    return isValid;
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  const jumlahPajakValue = parseFloat(formData.jumlahPajak);
  const currentDate = new Date();
  const refNumber = `TAX${currentDate.getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

  const taxSubmission = {
    ...formData,
    referensi: refNumber,
    tanggalPengajuan: currentDate.toISOString(),
    jumlahPajak: jumlahPajakValue,
    status: "Menunggu Pembayaran"
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taxSubmission),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal mengirim data.");
    }

    const result = await response.json();
    const refNumber = result.data.referensi;

    // Simpan hanya referensi untuk redirect
    localStorage.setItem('currentSubmission', refNumber);

    // Redirect ke halaman bukti pengajuan
    router.push('/bukti-pengajuan');
  } catch (err: any) {
    setError(err.message || "Terjadi kesalahan saat mengirim data.");
  }
};


  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-black">Formulir Pengajuan Pembayaran Pajak</h1>
            <p className="text-black mt-1">Lengkapi formulir di bawah ini untuk mengajukan pembayaran pajak</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-black mb-3">Data Wajib Pajak</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-black border ${formErrors.nama ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {formErrors.nama && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.nama}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    NIK <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nik"
                    value={formData.nik}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border text-black ${formErrors.nik ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    maxLength={16}
                  />
                  {formErrors.nik && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.nik}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-black mb-1">
                    Alamat <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    rows={2}
                    className={`w-full px-3 py-2 text-black border ${formErrors.alamat ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {formErrors.alamat && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.alamat}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border text-black ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    name="telepon"
                    value={formData.telepon}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-black border ${formErrors.telepon ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    maxLength={14}
                  />
                  {formErrors.telepon && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.telepon}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-black mb-3">Informasi Pembayaran Pajak</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Jenis Pajak <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jenisPajak"
                    value={formData.jenisPajak}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-black border ${formErrors.jenisPajak ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    {jenisPajakOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  {formErrors.jenisPajak && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.jenisPajak}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Jumlah Pajak (Rp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="jumlahPajak"
                    value={formData.jumlahPajak}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-black border ${formErrors.jumlahPajak ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Minimal Rp 5.000"
                  />
                  {formErrors.jumlahPajak && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.jumlahPajak}</p>
                  )}
                </div>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md border border-red-200">
                {error}
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    nama: "",
                    nik: "",
                    alamat: "",
                    email: "",
                    telepon: "",
                    jenisPajak: "",
                    jumlahPajak: "",
                  });
                  setError("");
                  setFormErrors({});
                }}
                className="px-4 py-2 text-black bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Ajukan Pembayaran
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
