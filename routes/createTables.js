var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var sql = "CREATE TABLE BRANCH (IFSC CHAR(10) PRIMARY KEY, CITY CHAR(20), MANID INTEGER );"
    db.query(sql, (err, result) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        else{
            console.log('created branch');
        }
    })
    sql = "CREATE TABLE CUSTOMER (ID INTEGER PRIMARY KEY, FNAME CHAR(10), LNAME CHAR(10), DOB DATE, GENDER CHAR(1), PHONE INTEGER(10), EMAIL VARCHAR(30), AADHAR INT, PAN CHAR(10));"
    db.query(sql, (err, result) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        console.log('created customer');
    })
    sql = "CREATE TABLE LOGIN (USERNAME VARCHAR(20) PRIMARY KEY, PASSWORD VARCHAR(20), UTYPE CHAR(8), ID INTEGER);"
    db.query(sql, (err, result) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        console.log('created login');
    })
    sql = "CREATE TABLE CADDRESS (ID INTEGER PRIMARY KEY,LINE1 CHAR(20),LINE2 CHAR(20),CITY CHAR(20),PINCODE INTEGER(6));"
    db.query(sql, (err, result) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        console.log('created caddress');
    })
    sql = "CREATE TABLE EMPLOYEE (EMPID INTEGER PRIMARY KEY, EMPNAME CHAR(20), GENDER CHAR(1), SALARY INTEGER,DESIGNATION VARCHAR(20), WIFSC CHAR(10));"
    db.query(sql, (err, result) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        console.log('created employee');
    })
    sql = "CREATE TABLE EADDRESS (ID INTEGER PRIMARY KEY,LINE1 CHAR(20),LINE2 CHAR(20),CITY CHAR(20),PINCODE INTEGER(6));"
    db.query(sql, (err, result) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        console.log('created eaddress');
    })
    sql = "CREATE TABLE ACCOUNT (ID INTEGER, ACCNO INTEGER(10) PRIMARY KEY, IFSC CHAR(10), ACCTYPE VARCHAR(10));"
    db.query(sql, (err, result) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        console.log('created branch');
    })

    sql = "CREATE TABLE SAVINGSACC (ACCNO INTEGER(10) PRIMARY KEY, BALANCE INTEGER, STATUS VARCHAR(10), INTEREST INTEGER(3));"
    db.query(sql, (err, result) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        console.log('created savings account');
    })

    sql = "CREATE TABLE FDACC (ACCNO INTEGER(10) PRIMARY KEY, PRINCIPLE INTEGER, AMOUNT INTEGER, INTEREST INTEGER(3), STATUS VARCHAR(10), DEPDATE DATE, TERM INT, MATURDATE DATE);"
    db.query(sql, (err, result) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        console.log('created fd account');
    })

    sql = "CREATE TABLE TRANSACTION (TRANSACCNO INTEGER(10));"
    db.query(sql, (err, result) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
        }
        console.log('created fd account');
    })

    res.send('alla table um successfully created!');
});

module.exports = router;
