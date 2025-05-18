const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TaxSubmission = sequelize.define('TaxSubmission', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nik: {
    type: DataTypes.STRING(16),
    allowNull: false
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telepon: {
    type: DataTypes.STRING,
    allowNull: true
  },
  jenisPajak: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'jenispajak'
  },
  jumlahPajak: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'jumlahpajak'
  },
  referensi: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  tanggalPengajuan: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'tanggalpengajuan',
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Menunggu Pembayaran'
  },
}, {
  tableName: 'TaxSubmissions', // pastikan ini sesuai dengan nama tabel di DB
  freezeTableName: true,        // hindari pluralisasi otomatis
  createdAt: 'createdat',
  updatedAt: 'updatedat'
});

module.exports = TaxSubmission;