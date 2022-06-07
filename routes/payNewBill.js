var express = require('express');
var router = express.Router();
const db = require('../data/database');
var randomstring = require('randomstring')

function genBillId() {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}

function randTransId() {
    return randomstring.generate({
        length: 10,
        charset: 'alphanumeric'
    });
}

/* GET users listing. */
router.post('/', async function (req, res, next) {
    const data = req.body;
    const email = data.email;

    var sql = "SELECT ID FROM LOGIN WHERE USERNAME=? AND UTYPE='Customer'";
    const usr = await db.query(sql, email);
    if (usr[0].length == 0) {
        return res.status(401).send({
            message: 'Cannot Proceed Transaction',
            flag: 'danger'
        })
    }
    else {
        try {
            sql = "SELECT BALANCE FROM SAVINGSACC WHERE ACCNO=?"
            console.log(data)
            const balance = await db.query(sql, data.facc);
            if (balance[0][0].BALANCE < data.amount) {
                return res.status(401).send({
                    message: 'No Sufficient Balance',
                    flag: 'danger'
                })
            }

            else {
                sql = "SELECT BILLERID FROM BILLERS WHERE BILLERNAME=? AND CATEGORY=? AND LOCATION = ? "
                const biller = await db.query(sql, [data.billername, data.category, data.location])
                sql = "INSERT INTO BILLDET VALUES (?)"
                const Id = genBillId();
                const dateOb = new Date();
                let date = dateOb.toISOString().slice(0, 10);
                console.log(biller[0][0]);
                await db.query(sql, [[Id, data.email, date, data.billamount, 'PAID', biller[0][0].BILLERID, data.facc]])
                sql = "INSERT INTO TRANSACTION VALUES (?)"
                const transId2 = randTransId();
                await db.query(sql, [[transId2, data.facc, biller[0][0].BILLERID, "BILL", date, data.billamount, balance[0][0].BALANCE - data.billamount, data.category]]);
                return res.status(200).send({ message: "Bill Payment Successful", flag: "success", label: "pay new bill" });

            }

        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: "Server Error. Try again.", flag: "danger", label: "pay new bill" });
        }
    }

});

module.exports = router;
