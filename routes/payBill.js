var express = require('express');
var router = express.Router();
var db = require("../data/database");
const bcrypt = require('bcryptjs');


/* GET users listing. */
router.post('/', async function (req, res, next) {
    const email = req.body.email;
    const data = req.body;
    console.log(data);

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

        const validpwd = await bcrypt.compare(password, pwd[0][0].PASSWORD);
        console.log(data.accno);

        if (validpwd) {
            if (data.accno != "") {
                sql = "SELECT BALANCE FROM SAVINGSACC WHERE ACCNO=?"
                const balance = await db.query(sql, data.accno);
                if (balance[0][0].BALANCE < data.amount) {
                    return res.status(401).send({
                        message: 'No Sufficient Balance',
                        flag: 'danger'
                    })
                }

                sql = "SELECT * FROM BILLDET WHERE ID=?"
                const bill = await db.query(sql, data.billno);
                if (bill[0].length == 0) {
                    return res.status(401).send({
                        message: 'No Such Bill',
                        flag: 'danger'
                    })
                }
                const dateOb = new Date();
                let date = dateOb.toISOString().slice(0, 10);
                sql = "UPDATE BILLDET SET STATUS='PAID', BILLDATE = ?, PAIDBY = ? WHERE ID=?";
                await db.query(sql, [date, data.accno, data.billno]);

                return res.status(200).send({
                    message: "Transaction Successful!",
                    flag: 'success'
                });

            }
            else {
                return res.status(401).send({
                    message: "Please Select an Account",
                    flag: 'danger'
                });
            }

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
