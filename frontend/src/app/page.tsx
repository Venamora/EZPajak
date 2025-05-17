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
    
    if (name === "jumlahPajak") {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const jumlahPajakValue = parseFloat(formData.jumlahPajak);
    if (isNaN(jumlahPajakValue) || jumlahPajakValue <= 0) {
      setError("Jumlah pajak harus berupa angka positif");
      return;
    }

    if (!formData.jenisPajak) {
      setError("Silakan pilih jenis pajak");
      return;
    }

    if (!formData.nama || !formData.nik || !formData.alamat || !formData.email) {
      setError("Semua kolom bertanda (*) wajib diisi");
      return;
    }

    const currentDate = new Date();
    const refNumber = `TAX${currentDate.getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    const taxSubmission = {
      ...formData,
      referensi: refNumber,
      tanggalPengajuan: currentDate.toISOString(),
      jumlahPajak: jumlahPajakValue,
      status: "Menunggu Pembayaran"
    };
    
    const existingSubmissions = JSON.parse(localStorage.getItem('taxSubmissions') || '[]');
    localStorage.setItem('taxSubmissions', JSON.stringify([...existingSubmissions, taxSubmission]));
    
    localStorage.setItem('currentSubmission', refNumber);
    
    router.push('/bukti-pengajuan');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-black">Formulir Pengajuan Pembayaran Pajak</h1>
            <p className="text-black mt-1">Lengkapi formulir di bawah ini untuk mengajukan pembayaran pajak</p>
          </div>
          
          <div onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
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
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
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
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
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
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
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
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Informasi Pajak */}
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
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {jenisPajakOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
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
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: 1000000"
                  />
                </div>
              </div>
            </div>
            
            {/* Error message */}
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md border border-red-200">
                {error}
              </div>
            )}
            
            {/* Form actions */}
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
                }}
                className="px-4 py-2 text-black bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Ajukan Pembayaran
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}