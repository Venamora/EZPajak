const  TaxSubmission  = require('../models/taxModel');

exports.submitTax = async (req, res) => {
  try {
    const {
      nama, nik, alamat, email, telepon,
      jenisPajak, jumlahPajak
    } = req.body;

    const tanggalPengajuan = new Date();
    const referensi = `TAX${tanggalPengajuan.getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

    const newSubmission = await TaxSubmission.create({
      nama,
      nik,
      alamat,
      email,
      telepon,
      jenisPajak,
      jumlahPajak: parseFloat(jumlahPajak),
      referensi,
      tanggalPengajuan,
      status: "Menunggu Pembayaran"
    });

    return res.status(201).json({ success: true, data: newSubmission });
  } catch (error) {
    console.error("Submit tax error:", error);
    return res.status(500).json({ success: false, message: "Gagal menyimpan data pengajuan" });
  }
};

exports.getTaxStatus = async (req, res) => {
  try {
    const { referensi } = req.params;

    const submission = await TaxSubmission.findOne({ where: { referensi } });

    if (!submission) {
      return res.status(404).json({ success: false, message: "Data pengajuan tidak ditemukan" });
    }

    return res.status(200).json({ success: true, data: submission });
  } catch (error) {
    console.error("Get tax status error:", error);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan saat mengambil data" });
  }
};

exports.updateTaxStatus = async (req, res) => {
  try {
    const { referensi } = req.params;
    const { status } = req.body;

    const submission = await TaxSubmission.findOne({ where: { referensi } });

    if (!submission) {
      return res.status(404).json({ success: false, message: "Data pengajuan tidak ditemukan" });
    }

    submission.status = status || "Lunas";
    await submission.save();

    return res.json({ success: true, message: "Status berhasil diperbarui", data: submission });
  } catch (error) {
    console.error("Update tax status error:", error);
    return res.status(500).json({ success: false, message: "Gagal memperbarui status" });
  }
};
