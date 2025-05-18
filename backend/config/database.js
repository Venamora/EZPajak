const { Sequelize } = require('sequelize');
require('dotenv').config(); // <-- ini yang kamu lupa

const sequelize = new Sequelize('defaultdb', 'avnadmin', process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false, // opsional, disable log query di console
});

module.exports = sequelize;