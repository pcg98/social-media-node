
const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');

const db = new Sequelize(process.env.DB_NAME, process.env.USER_DB, process.env.PASSWORD_DB, {
    host: process.env.HOST_DB,
    dialect: 'mysql',
    port: process.env.PORT_DB
});



module.exports = db;