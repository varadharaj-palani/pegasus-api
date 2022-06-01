const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Wolf@707',
    database: 'ibdb'
});

module.exports = db;