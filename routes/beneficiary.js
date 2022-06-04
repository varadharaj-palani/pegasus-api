var express = require('express');
var router = express.Router();
var db = require("../data/database");
const bcrypt = require('bcryptjs');

/* GET users listing. */
router.post('/', async function (req, res, next) {
    console.log("hii")
    const email = req.body.email;
    const acct = req.body.facc;
    console.log(acct, email, req.body)
    var sql = "SELECT ID FROM LOGIN WHERE USERNAME=? AND UTYPE='Customer'";
    const usr = await db.query(sql, email);
    var beneficiary = [];
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
        var sql = "SELECT PASSWORD FROM LOGIN WHERE USERNAME=? AND UTYPE='CUSTOMER'";
        const pwd = await db.query(sql, email);
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
            sql = "SELECT BENEFICIARY_ACCNO FROM BENEFICIARY WHERE ACCNO=?"
            const acc = await db.query(sql, acct);
            console.log(acc)
            for (const a of acc[0]) {
                beneficiary.push(a.BENEFICIARY_ACCNO);
            }
            console.log(acct)
            return res.status(200).send(beneficiary);

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
