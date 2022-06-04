var express = require('express');
var router = express.Router();
const db = require('../data/database');
const { all } = require('./auth');

/* GET users listing. */
router.get('/:type/:acct/', async function (req, res, next) {
    const email = req.headers.authorization;
    const type = req.params.type;
    const acct = req.params.acct;
    console.log(type, acct);
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

        if (type == "savings") {
            sql = "SELECT * FROM SAVINGSACC WHERE ACCNO = ?";
        }
        else {
            sql = "SELECT * FROM FDACC WHERE ACCNO = ?";
        }
        const account = await db.query(sql, acct);
        if (account[0].length == 0) {
            console.log("HIIII",account)
            return res.status(401).send({
                message: 'Account doesn\'t exist',
                flag: 'danger'
            })
        }
        else {
            console.log("Hiiii")
            sql = "SELECT * FROM CUSTOMER WHERE ID=?";
            const cust = await db.query(sql, usr[0][0].ID);
            if (type == "savings") {
                sql = "SELECT * FROM ACCOUNT WHERE ACCNO=? AND ACCTYPE='Savings'";
            }
            else {
                sql = "SELECT * FROM ACCOUNT WHERE ACCNO=? AND ACCTYPE='FD'";
            }
            
            const acc = await db.query(sql, acct);
            sql = "SELECT * FROM BRANCH WHERE IFSC=?";
            const branch = await db.query(sql, acc[0][0].IFSC);
            const allData = { 'customer': cust[0][0], 'account': account[0][0], 'branch': branch[0][0] }
            return res.status(200).send(allData);
        }

    }

});

module.exports = router;
