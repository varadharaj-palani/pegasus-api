const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Sasmitha@30',
    database: 'ibdb'
});

module.exports = db;