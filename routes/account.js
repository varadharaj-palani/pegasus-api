var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../data/database');
const { all } = require('./auth');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const email = req.headers.authorization;
    console.log(email, "Hi")
    var sql = "SELECT ID FROM LOGIN WHERE USERNAME=? AND UTYPE='Customer'";
    const usr = await db.query(sql, email);
    if (usr[0].length == 0) {
        return res.status(401).send({
            message: 'User doesn\'t exist',
            flag: 'danger'
        })
    }
    else {

        sql = "SELECT * FROM ACCOUNT WHERE ID=?";
        console.log(sql, usr[0][0].ID)
        const acc = await db.query(sql, usr[0][0].ID);
        console.log(acc[0])
        if (acc[0].length == 0) {
            return res.status(401).send({
                message: 'User doesn\'t exist',
                flag: 'danger'
            })
        }
        else {
            if (acc[0][0].ACCTYPE == "Savings") {
                sql = "SELECT * FROM SAVINGSACC WHERE ACCNO = ?";
            }
            else {
                sql = "SELECT * FROM FDACC WHERE ACCNO = ?"
            }
            const account = await db.query(sql, acc[0][0].ACCNO);
            if (account[0].length == 0) {
                return res.status(401).send({
                    message: 'User doesn\'t exist',
                    flag: 'danger'
                })
            }
            else {
                sql = "SELECT * FROM CUSTOMER WHERE ID=?";
                const cust = await db.query(sql, usr[0][0].ID);
                sql = "SELECT * FROM BRANCH WHERE IFSC=?";
                const branch = await db.query(sql, acc[0][0].IFSC);
                const allData = { 'customer': cust[0][0], 'account1': acc[0][0], 'account2': account[0][0], 'branch': branch[0][0] }
                return res.status(200).send(allData);
            }
        }
    }

});

module.exports = router;
