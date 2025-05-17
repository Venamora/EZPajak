"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type TaxSubmission = {
  referensi: string;
  nama: string;
  nik: string;
  alamat: string;
  email: string;
  telepon: string;
  jenisPajak: string;
  jumlahPajak: number;
  tanggalPengajuan: string;
  status: string;
};

export default function CekStatus() {
  const router = useRouter();
  const [referenceNumber, setReferenceNumber] = useState("");
  const [submission, setSubmission] = useState<TaxSubmission | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const getTaxTypeLabel = (value: string) => {
    const taxTypes: {[key: string]: string} = {
      "pph21": "Pajak Penghasilan (PPh) 21",
      "pph22": "Pajak Penghasilan (PPh) 22",
      "pph23": "Pajak Penghasilan (PPh) 23",
      "ppn": "Pajak Pertambahan Nilai (PPN)",
      "pbb": "Pajak Bumi dan Bangunan (PBB)",
      "pkb": "Pajak Kendaraan Bermotor (PKB)"
    };
    
    return taxTypes[value] || value;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleSearch = () => {
    if (!referenceNumber.trim()) {
      setError("Nomor referensi wajib diisi");
      return;
    }
    
    setLoading(true);
    setError("");
    setIsSearched(true);
    
    setTimeout(() => {
      const submissions = JSON.parse(localStorage.getItem('taxSubmissions') || '[]');
      const found = submissions.find((s: TaxSubmission) => s.referensi === referenceNumber.trim());
      
      if (found) {
        setSubmission(found);
      } else {
        setSubmission(null);
        setError("Data tidak ditemukan untuk nomor referensi tersebut");
      }
      
      setLoading(false);
    }, 800);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Lunas":
        return "bg-green-100 text-green-800";
      case "Menunggu Pembayaran":
        return "bg-yellow-100 text-yellow-800";
      case "Dibatalkan":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 p-6">
            <h1 className="text-xl font-bold text-white">Cek Status Pembayaran Pajak</h1>
            <p className="text-blue-100 mt-1">Masukkan nomor referensi pengajuan Anda untuk melihat status</p>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Referensi
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="Contoh: TAX2025-001"
                  className="flex-1 px-3 py-2 text-black border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
                >
                  {loading ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mencari...
                    </span>
                  ) : (
                    "Cari"
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 text-red-700 p-3 rounded-md border border-red-200">
                {error}
              </div>
            )}

            {isSearched && !error && !loading && submission && (
              <div className="mt-4">
                <div className="border-t border-b border-gray-200 py-4 mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <div className="text-sm text-gray-500">Nomor Referensi</div>
                      <div className="text-lg font-bold text-gray-800">{submission.referensi}</div>
                    </div>
                    <div className="mt-3 md:mt-0">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Ringkasan Pembayaran</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Wajib Pajak</div>
                      <div className="font-medium text-black">{submission.nama}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">NIK / NPWP</div>
                      <div className="font-medium text-black">{submission.nik}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Jenis Pajak</div>
                      <div className="font-medium text-black">{getTaxTypeLabel(submission.jenisPajak)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Jumlah</div>
                      <div className="font-bold text-blue-600 text-black">{formatCurrency(submission.jumlahPajak)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Tanggal Pengajuan</div>
                      <div className="font-medium text-black">{formatDate(submission.tanggalPengajuan)}</div>
                    </div>
                  </div>
                </div>
                
                {/* Status timeline */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Riwayat Status</h2>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 h-full border-l-2 border-gray-300"></div>
                    
                    <div className="relative mb-6">
                      <div className="absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-500">Pengajuan Diterima</div>
                        <div className="text-sm text-gray-500">{formatDate(submission.tanggalPengajuan)}</div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className={`absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full ${submission.status === "Lunas" ? "bg-green-500" : "bg-gray-300"} border-2 border-white`}></div>
                      <div className="ml-4">
                        <div className={`font-medium ${submission.status === "Lunas" ? "text-black" : "text-gray-500"}`}>Pembayaran Berhasil</div>
                        <div className="text-sm text-gray-500">{submission.status === "Lunas" ? "Pembayaran telah diterima" : "Menunggu pembayaran"}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {submission.status === "Menunggu Pembayaran" && (
                  <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Instruksi Pembayaran</h2>
                    <p className="text-gray-700 mb-2">
                      Silakan lakukan pembayaran sesuai jumlah di atas ke rekening berikut:
                    </p>
                    <div className="bg-white p-3 rounded border border-gray-200 mb-2">
                      <div className="grid grid-cols-1 gap-y-1">
                        <div className="grid grid-cols-3">
                          <span className="text-gray-600">Bank</span>
                          <span className="col-span-2 font-medium text-black">Bank Republik Indonesia</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-gray-600">Nomor Rekening</span>
                          <span className="col-span-2 font-medium text-black">123-456-7890</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-gray-600">Atas Nama</span>
                          <span className="col-span-2 font-medium text-black">Direktorat Jenderal Pajak</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      * Pembayaran harus dilakukan dalam waktu 24 jam setelah pengajuan. Sertakan nomor referensi sebagai catatan pembayaran.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-between mt-6">
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Kembali ke Beranda
              </button>
              
              {submission && (
                <button
                  onClick={() => {
                    const submissions = JSON.parse(localStorage.getItem('taxSubmissions') || '[]');
                    const updatedSubmissions = submissions.map((s: TaxSubmission) => {
                      if (s.referensi === submission.referensi) {
                        return { ...s, status: "Lunas" };
                      }
                      return s;
                    });
                    
                    localStorage.setItem('taxSubmissions', JSON.stringify(updatedSubmissions));
                    setSubmission({ ...submission, status: "Lunas" });
                  }}
                  className={`px-4 py-2 ${submission.status === "Lunas" ? "bg-green-600" : "bg-blue-600"} text-white rounded-md hover:${submission.status === "Lunas" ? "bg-green-700" : "bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  disabled={submission.status === "Lunas"}
                >
                  {submission.status === "Lunas" ? "Pembayaran Berhasil" : "Konfirmasi Pembayaran"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}