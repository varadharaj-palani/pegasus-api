const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'ibdb.c6n1jatgwfxb.ap-south-1.rds.amazonaws.com',
    user: 'wolf',
    password: 'Afmhpysu$awsrds7',
    database: 'ibdb',
    port: 3306
});

module.exports = db;
// var mysql=require('mysql');
// var db = mysql.createConnection({
//     host     : 'ibdb.c6n1jatgwfxb.ap-south-1.rds.amazonaws.com',
//     user     : 'wolf',
//     password : 'Afmhpysu$awsrds7',
//     port     : 3306,
//     database: 'ibdb'
//   });
  
//   db.connect(function(err) {
//     if (err) {
//       console.error('Database connection failed: ' + err.stack);
//       return;
//     }
  
//     console.log('Connected to database.');
//   });

//   module.exports = db;