"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Image from 'next/image';

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
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

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

const handleSearch = async () => {
  if (!referenceNumber.trim()) {
    setError("Nomor referensi wajib diisi");
    return;
  }

  setLoading(true);
  setError("");
  setIsSearched(true);
  setSubmission(null);

  try {
    const response = await fetch(`http://localhost:3002/api/tax/status/${referenceNumber.trim()}`);
    const data = await response.json();

    if (response.ok && data.success) {
      setSubmission(data.data);
    } else {
      setError("Data tidak ditemukan untuk nomor referensi tersebut");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    setError("Terjadi kesalahan saat mengambil data dari server");
  } finally {
    setLoading(false);
  }
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

  const generatePDF = () => {
    if (!submission) return;
    
    setPdfGenerating(true);
    
    setTimeout(() => {
      try {
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        doc.setFillColor(33, 150, 243); 
        doc.rect(0, 0, 210, 35, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text('BUKTI PEMBAYARAN PAJAK', 105, 15, { align: 'center' });
        
        doc.setFontSize(12);
        doc.text('Direktorat EZPajak Republik Wakanda', 105, 25, { align: 'center' });
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('STATUS: LUNAS', 105, 45, { align: 'center' });
        
        doc.setDrawColor(33, 150, 243);
        doc.setFillColor(240, 247, 255);
        doc.roundedRect(55, 50, 100, 15, 2, 2, 'FD');
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(submission.referensi, 105, 59, { align: 'center' });
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Detail Pembayaran', 20, 80);
        
        const tableData = [
          ['Nama Wajib Pajak', ':', submission.nama],
          ['NIK / NPWP', ':', submission.nik],
          ['Alamat', ':', submission.alamat],
          ['Email', ':', submission.email],
          ['Telepon', ':', submission.telepon],
          ['Jenis Pajak', ':', getTaxTypeLabel(submission.jenisPajak)],
          ['Jumlah Pajak', ':', formatCurrency(submission.jumlahPajak)],
          ['Tanggal Pengajuan', ':', formatDate(submission.tanggalPengajuan)],
          ['Tanggal Pembayaran', ':', formatDate(new Date().toISOString())],
          ['Status', ':', 'LUNAS']
        ];
        
        let startY = 85;
        const lineHeight = 7;
        const colWidths = [50, 5, 80];
        const tableWidth = colWidths.reduce((a, b) => a + b, 0);
        const startX = 20;
        
        tableData.forEach((row, rowIndex) => {
          let currentX = startX;
          
          row.forEach((cell, colIndex) => {
            doc.setFont('helvetica', colIndex === 0 ? 'bold' : 'normal');
            doc.setFontSize(10);
            doc.text(cell, currentX, startY + (lineHeight / 2));
            currentX += colWidths[colIndex];
          });
          
          if (rowIndex < tableData.length - 1) {
            doc.setDrawColor(240, 240, 240);
            doc.line(startX, startY + lineHeight - 1, startX + tableWidth, startY + lineHeight - 1);
          }
          
          startY += lineHeight;
        });
        
        doc.setDrawColor(33, 150, 243);
        doc.setFillColor(240, 247, 255);
        doc.roundedRect(140, 160, 40, 40, 3, 3, 'FD');
        
        doc.setTextColor(33, 150, 243);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('TERVERIFIKASI', 160, 175, { align: 'center' });
        
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text('Dokumen Resmi', 160, 185, { align: 'center' });
        doc.text('Tim PPL EZPajak', 160, 190, { align: 'center' });
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text('Dokumen ini dikeluarkan secara elektronik dan sah tanpa tanda tangan.', 105, 225, { align: 'center' });
        doc.text('Nomor dokumen dapat diverifikasi di situs resmi EZPajak', 105, 230, { align: 'center' });
        
        doc.setFillColor(33, 150, 243);
        doc.rect(0, 280, 210, 15, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text('© 2025 Direktorat EZPajak Republik Wakanda', 105, 288, { align: 'center' });
        
        doc.save(`Bukti_Pembayaran_${submission.referensi}.pdf`);
        
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Terjadi kesalahan saat membuat PDF. Silakan coba lagi.');
      } finally {
        setPdfGenerating(false);
      }
    }, 500);
  };

  const handleConfirmPayment = async () => {
    if (!submission) return;

    try {
      const response = await fetch(`http://localhost:3002/api/tax/status/${submission.referensi}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Lunas" }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmission(data.data); // update UI
      } else {
        alert("Gagal memperbarui status");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert("Terjadi kesalahan saat memperbarui status");
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
              <div className="mt-4" ref={receiptRef}>
                {submission.status === "Lunas" && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4 flex items-center">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">Pembayaran Berhasil</h3>
                      <p className="text-green-700 text-sm">Pembayaran telah dikonfirmasi. Anda dapat mengunduh bukti pembayaran.</p>
                    </div>
                  </div>
                )}
                
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
                      <div className="font-bold text-blue-600">{formatCurrency(submission.jumlahPajak)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Tanggal Pengajuan</div>
                      <div className="font-medium text-black">{formatDate(submission.tanggalPengajuan)}</div>
                    </div>
                    {submission.status === "Lunas" && (
                      <div>
                        <div className="text-sm text-gray-500">Tanggal Pembayaran</div>
                        <div className="font-medium text-black">{formatDate(new Date().toISOString())}</div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Riwayat Status</h2>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 h-full border-l-2 border-gray-300"></div>
                    
                    <div className="relative mb-6">
                      <div className="absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-800">Pengajuan Diterima</div>
                        <div className="text-sm text-gray-500">{formatDate(submission.tanggalPengajuan)}</div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className={`absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full ${submission.status === "Lunas" ? "bg-green-500" : "bg-gray-300"} border-2 border-white`}></div>
                      <div className="ml-4">
                        <div className={`font-medium ${submission.status === "Lunas" ? "text-gray-800" : "text-gray-500"}`}>Pembayaran Berhasil</div>
                        <div className="text-sm text-gray-500">
                          {submission.status === "Lunas" ? 
                            `Pembayaran telah diterima pada ${formatDate(new Date().toISOString())}` : 
                            "Menunggu pembayaran"}
                        </div>
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
                
                {submission.status === "Lunas" && (
                  <div className="bg-white p-4 rounded-md border border-gray-200 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Bukti Pembayaran</h3>
                        <p className="text-gray-600 text-sm">Unduh bukti pembayaran untuk arsip Anda</p>
                      </div>
                      <button
                        onClick={generatePDF}
                        disabled={pdfGenerating}
                        className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
                      >
                        {pdfGenerating ? (
                          <span className="inline-flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Memproses...
                          </span>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Unduh PDF
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-between mt-6">
              <button
                
                onClick={() => {
                  localStorage.removeItem('currentSubmission');
                  localStorage.removeItem('taxSubmissions'); // opsional, kalau kamu pakai
                  router.push('/');
}}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Kembali ke Beranda
              </button>
              
              {submission && submission.status === "Menunggu Pembayaran" && (
                <button
                  onClick={handleConfirmPayment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Konfirmasi Pembayaran
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}