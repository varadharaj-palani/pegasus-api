var express = require('express');
var router = express.Router();
var db = require("../data/database");
const bcrypt = require('bcryptjs');
var randomstring = require('randomstring');


function randTransId() {
    return randomstring.generate({
        length: 10,
        charset: 'alphanumeric'
    });
}

/* GET users listing. */
router.post('/', async function (req, res, next) {
    const email = req.body.email;
    const data = req.body;
    
    var sql = "SELECT ID FROM LOGIN WHERE USERNAME=? AND UTYPE='Customer'";
    const usr = await db.query(sql, email);
    if (usr[0].length == 0) {
        return res.status(401).send({
            message: 'User doesn\'t exist',
            flag: 'danger'
        })
    }
    else {
        const password = req.body.pwd;
        var sql = "SELECT PASSWORD FROM LOGIN WHERE USERNAME=? AND UTYPE='CUSTOMER'";
        const pwd = await db.query(sql, email);
        if (pwd[0].length == 0) {
            return res.status(401).send({
                message: 'User doesn\'t exist',
                flag: 'danger'
            })
        }

        console.log(pwd[0][0].PASSWORD, pwd)
        const validpwd = await bcrypt.compare(password, pwd[0][0].PASSWORD);
        if (validpwd) {
            sql = "SELECT BALANCE FROM SAVINGSACC WHERE ACCNO=?"
            const balance = await db.query(sql,data.facc);
            if(balance[0][0].BALANCE < data.amount){
                return res.status(401).send({
                    message: 'No Sufficient Balance',
                    flag: 'danger'
                })
            }
            const transId = randTransId();
            let dateOb = new Date();
            let date = dateOb.toISOString().slice(0,10);
            console.log(date);
            sql = "INSERT INTO TRANSACTION VALUES (?)"
            await db.query(sql,[[transId,data.facc,data.toacc,"Debit",date,data.amount,balance[0][0].BALANCE-data.amount,data.purpose]]);
            sql = "SELECT BALANCE FROM SAVINGSACC WHERE ACCNO=?"
            const balance2 = await db.query(sql,data.toacc);
            if(balance2[0].length == 0){
                return res.status(401).send({
                    message: 'No Such Recepient',
                    flag: 'danger'
                })
            }
            sql = "INSERT INTO TRANSACTION VALUES (?)"
            const transId2 = randTransId();
            await db.query(sql,[[transId2,data.toacc,data.facc,"Credit",date,data.amount,balance2[0][0].BALANCE+data.amount,data.purpose]]);
            return res.status(200).send({
                message: "Transaction Successful!",
                flag: 'success'
            });

        }
        else {
            return res.status(401).send({
                message: 'Invalid Password',
                flag: 'danger'
            })
        }

    }
});

module.exports = router;
