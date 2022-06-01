var express = require('express');
const { response } = require('../app');
var router = express.Router();
const db= require('../data/database');

/* GET users listing. */
router.get('/', function (req, res, next) {
    var sql = "CREATE TABLE BRANCH (IFSC CHAR(10) PRIMARY KEY, CITY VARCHAR(20), MANID INTEGER );"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    }) 
    sql = "CREATE TABLE CUSTOMER (ID INTEGER PRIMARY KEY, FNAME VARCHAR(10), LNAME VARCHAR(10), DOB DATE, GENDER CHAR(1), PHONE CHAR(10), EMAIL VARCHAR(30), AADHAR CHAR(12), PAN CHAR(10));"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })
    sql = "CREATE TABLE LOGIN (USERNAME VARCHAR(20) PRIMARY KEY, PASSWORD VARCHAR(20), UTYPE VARCHAR(8), ID INTEGER);"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })
    sql = "CREATE TABLE CADDRESS (ID INTEGER PRIMARY KEY,LINE1 VARCHAR(20),LINE2 VARCHAR(20),CITY VARCHAR(20),PINCODE CHAR(6));"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })
    sql = "CREATE TABLE EMPLOYEE (EMPID INTEGER PRIMARY KEY, EMPNAME VARCHAR(20), GENDER CHAR(1), SALARY INTEGER,DESIGNATION VARCHAR(20), WIFSC CHAR(10));"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })
    sql = "CREATE TABLE EADDRESS (ID INTEGER PRIMARY KEY,LINE1 VARCHAR(20),LINE2 VARCHAR(20),CITY VARCHAR(20),PINCODE CHAR(6));"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })
    sql = "CREATE TABLE ACCOUNT (ID INTEGER, ACCNO VARCHAR(10) PRIMARY KEY, IFSC CHAR(10), ACCTYPE VARCHAR(10));"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })

    sql = "CREATE TABLE SAVINGSACC (ACCNO VARCHAR(10) PRIMARY KEY, BALANCE INTEGER, STATUS VARCHAR(10), INTEREST INTEGER(3));"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })

    sql = "CREATE TABLE FDACC (ACCNO VARCHAR(10) PRIMARY KEY, PRINCIPLE INTEGER, AMOUNT INTEGER, INTEREST INTEGER(3), STATUS VARCHAR(10), DEPDATE DATE, TERM VARCHAR(15), MATURDATE DATE);"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })

    sql = "CREATE TABLE TRANSACTION (TRANSID INTEGER(10) PRIMARY KEY, ACCNO VARCHAR(10), TTYPE VARCHAR(50), TRANSDATE DATE, CRDIT REAL, DEBIT REAL, BALANCE REAL);"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })
    sql = "CREATE TABLE BILLERS (ID INTEGER, CATEGORY VARCHAR(20), LOCATION VARCHAR(20), BILLERNAME VARCHAR(20));"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })
    sql = "CREATE TABLE BILLDET( ID INTEGER, BILLDATE DATE, BILLAMOUNT REAL, BILLERNAME VARCHAR(20));" 
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })
    sql = "CREATE TABLE LOAN (ACCNO VARCHAR(10), LOANTYPE VARCHAR(20), APPBY VARCHAR(20), PRINCIPLE INTEGER, OUTSTANDING INTEGER, STATUS VARCHAR(8), INTERSETRATE INTEGER(3));"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })
    sql = "CREATE TABLE REQUEST (SDATE DATE, SERVICE_TYPE VARCHAR(20), ID INTEGER(10));"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })

    res.send('alla table um successfully created!');
});

module.exports = router;
