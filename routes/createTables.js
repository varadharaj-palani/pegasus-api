var express = require('express');
const { response } = require('../app');
var router = express.Router();
const db = require('../data/database');

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
    sql = "CREATE TABLE LOGIN (USERNAME VARCHAR(30) PRIMARY KEY, PASSWORD VARCHAR(200), UTYPE VARCHAR(15), ID INTEGER);"
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
    sql = "CREATE TABLE EMPLOYEE (EMPID INTEGER PRIMARY KEY, EMPNAME VARCHAR(30), GENDER CHAR(1), SALARY REAL,DESIGNATION VARCHAR(30), WIFSC CHAR(10), EMAIL VARCHAR(30), PHONE CHAR(10), DOB DATE);"
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

    sql = "CREATE TABLE SAVINGSACC (ACCNO VARCHAR(10) PRIMARY KEY, BALANCE REAL, STATUS VARCHAR(10), INTEREST REAL);"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })

    sql = "CREATE TABLE FDACC (ACCNO VARCHAR(10) PRIMARY KEY, PRINCIPLE REAL, AMOUNT REAL, INTEREST REAL, STATUS VARCHAR(10), DEPDATE DATE, TERM VARCHAR(15), MATURDATE DATE);"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })

    sql = "CREATE TABLE TRANSACTION (TRANSID VARCHAR(10) PRIMARY KEY, ACCNO VARCHAR(10), AACNO VARCHAR(10), TTYPE VARCHAR(15), TRANSDATE DATE, AMOUNT REAL, BALANCE REAL, PURPOSE VARCHAR(50));"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })
    sql = "CREATE TABLE BILLERS (BILLERID INTEGER PRIMARY KEY, CATEGORY VARCHAR(20), LOCATION VARCHAR(20), BILLERNAME VARCHAR(20));"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })
    sql = "CREATE TABLE BILLDET( ID INTEGER PRIMARY KEY, EMAIL VARCHAR(30),BILLDATE DATE, BILLAMOUNT REAL, STATUS VARCHAR(20), BILLERID INT);"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })
    sql = "CREATE TABLE LOAN (LOANID VARCHAR(10), EMAIL VARCHAR(30),ACCNO VARCHAR(10), LOANTYPE VARCHAR(20), SANCTBY VARCHAR(30), PRINCIPLE REAL, OUTSTANDING REAL, STATUS VARCHAR(8), INTERESTRATE REAL, TERM INT);"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })
    sql = "CREATE TABLE REQUEST (NAME VARCHAR(20), SERVICE VARCHAR(20), EMAIL VARCHAR(30), REQDATE DATE  );"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })

    sql = "CREATE TABLE BENEFICIARY (ACCNO VARCHAR(10), BENEFICIARY_NAME VARCHAR(40), BENEFICIARY_ACCNO VARCHAR(10));"
    db.query(sql).then(response => {
        if (response) {
            console.log(response);
        }
    })

    res.send('alla table um successfully created!');
});

module.exports = router;
