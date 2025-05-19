const fs = require('fs-extra');

exports.readData = async (filePath) => {
  try {
    const exists = await fs.pathExists(filePath);
    if (!exists) return [];
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    throw new Error('Gagal membaca file data.');
  }
};

exports.writeData = async (filePath, data) => {
  try {
    await fs.outputFile(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    throw new Error('Gagal menulis file data.');
  }
};
