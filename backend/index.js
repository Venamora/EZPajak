require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taxRoutes = require('./routes/taxRoute');
const PORT = process.env.PORT || 3002;
const sequelize = require('./config/database');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL, // Replace with your frontend URL
}));
app.use(bodyParser.json());

app.use('/api/tax', taxRoutes);

// Cek koneksi database dan sync sebelum menjalankan server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
    return sequelize.sync(); // sinkronisasi model
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });