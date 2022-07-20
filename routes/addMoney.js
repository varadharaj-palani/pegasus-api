var express = require('express');
var router = express.Router();
var db = require("../data/database");
const bcrypt = require('bcryptjs');
var randomstring = require('randomstring')

function randTransId() {
    return randomstring.generate({
        length: 10,
        charset: 'alphanumeric'
    });
}

/* GET users listing. */
router.post('/', async function (req, res, next) {
    console.log("hii")
    const email = req.body.email;
    const data = req.body;
    var sql = "SELECT ID FROM LOGIN WHERE USERNAME=? AND UTYPE='Customer'";
    const usr = await db.query(sql, email);
    console.log(usr);
    if (usr[0].length == 0) {
        return res.status(401).send({
            message: 'User doesn\'t exist',
            flag: 'danger'
        })
    }
    else {
        console.log(req.body)
        const password = req.body.pwd;
        var sql = "SELECT PASSWORD FROM LOGIN WHERE USERNAME=? AND UTYPE='Employee'";
        const pwd = await db.query(sql, data.appby);
        console.log(password);
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
            const bal = await db.query(sql, data.accno);
            console.log(bal[0]);
            sql = "INSERT INTO TRANSACTION VALUES (?)"
            const dateOb = new Date();
            let date = dateOb.toISOString().slice(0, 10);
            const transId = randTransId();
            
            await db.query(sql, [[transId, data.accno, data.accno, "DEPOSIT", date, data.amount, parseInt(bal[0][0].BALANCE) + parseInt(data.amount), "MONEY DEPOSIT"]]);
            // sql = "UPDATE SAVINGSACC SET BALANCE = ? WHERE ACCNO=?";
            // const result = await db.query(sql, [bal[0][0].BALANCE + data.amount, data.accno])
            // console.log(result[0]);
            return res.status(200).send({
                message: 'Amount Deposited',
                flag: 'success'
            })

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
