"use client";

import { useState, useEffect } from 'react';
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


export default function BuktiPengajuan() {
  const router = useRouter();
  const [submission, setSubmission] = useState<TaxSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        const refNumber = localStorage.getItem('currentSubmission');
        console.log("Nomor referensi:", refNumber);
        if (!refNumber) {
          setError("Nomor referensi tidak ditemukan");
          setLoading(false);
          return;
        }
        
        const response = await fetch(`http://localhost:3002/api/tax/status/${refNumber}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          console.log(data.data);
          setSubmission(data.data);
        } else {
          setError("Data pengajuan tidak ditemukan");
        }
      } catch (error) {
        console.error("Error fetching tax status:", error);
        setError("Terjadi kesalahan saat mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissionData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleBack = () => {
    localStorage.removeItem('currentSubmission');
    router.push('/');
  };
  
  const handleDownload = () => {
    alert("Fungsi unduh bukti pengajuan akan diimplementasikan di sini");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Data Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">{error || "Bukti pengajuan tidak tersedia"}</p>
          <button
            onClick={handleBack}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Kembali ke Halaman Utama
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 p-6">
            <h1 className="text-xl font-bold text-white">Bukti Pengajuan Pembayaran Pajak</h1>
          </div>
          <div className="p-6">
            <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <div className="text-sm text-gray-500">Nomor Referensi</div>
                <div className="text-lg font-bold text-gray-800">{submission.referensi}</div>
              </div>
              <div className="mt-3 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  {submission.status}
                </span>
              </div>
            </div>
            
            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Tanggal Pengajuan</div>
                  <div className="font-medium text-black">{formatDate(submission.tanggalPengajuan)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Waktu Pengajuan</div>
                  <div className="font-medium text-black">{formatTime(submission.tanggalPengajuan)}</div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Informasi Wajib Pajak</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Nama Lengkap</div>
                    <div className="font-medium text-black">{submission.nama}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">NIK / NPWP</div>
                    <div className="font-medium text-black">{submission.nik}</div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm text-gray-500">Alamat</div>
                    <div className="font-medium text-black">{submission.alamat}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium text-black">{submission.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Nomor Telepon</div>
                    <div className="font-medium text-black">{submission.telepon || "-"}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Informasi Pembayaran</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Jenis Pajak</div>
                    <div className="font-medium text-black">{getTaxTypeLabel(submission.jenisPajak)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Jumlah</div>
                    <div className="font-bold text-lg text-blue-600">{formatCurrency(submission.jumlahPajak)}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6 bg-yellow-50 p-4 rounded-md border border-yellow-200">
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
            
            <div className="flex flex-col md:flex-row gap-3 justify-between mt-8">
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Kembali ke Halaman Utama
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Unduh Bukti Pengajuan
                </button>
                <button
                  onClick={() => router.push('/cek-status')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cek Status Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}