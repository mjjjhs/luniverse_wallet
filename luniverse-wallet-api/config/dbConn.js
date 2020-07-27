const mysql = require('mysql2/promise');
require('dotenv').config();

module.exports = () => {
    const {HOST: host, ID: user, PASSWORD: password, DATABASE: database } = process.env;
    return mysql.createPool({host, user, password, database});
};
