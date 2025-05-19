const { Sequelize } = require('sequelize');
require('dotenv').config(); // <-- ini yang kamu lupa

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_ADMIN, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false, // opsional, disable log query di console
});

module.exports = sequelize;