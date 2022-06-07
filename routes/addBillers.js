var express = require('express');
var router = express.Router();
const db = require('../data/database');
var randomstring = require('randomstring');


/* GET users listing. */

function genBillerId() {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}
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
            sql = "INSERT INTO BILLERS VALUES (?)"
            const billerid = genBillerId();
            await db.query(sql,[[billerid,data.category,data.location,data.billername]])
            return res.status(200).send({ message: "Biller Added", flag: "success", label: "biller" });

        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: "Server Error. Try again.", flag: "danger", label: "biller" });
        }
    }

});

module.exports = router;
