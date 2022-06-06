var express = require('express');
var router = express.Router();
const db = require('../data/database');
const { all } = require('./auth');


const getBiller = async (item) => {
    try {
        sql = "SELECT * FROM BILLERS WHERE BILLERID = ?"
        const billers = await db.query(sql, item.BILLERID);
        return billers[0][0];

    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Server Error. Try again.", flag: "danger", label: "getname" });
    }
}

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const email = req.headers.authorization;
    var sql = "SELECT ID FROM LOGIN WHERE USERNAME=? AND UTYPE='Customer'";
    const usr = await db.query(sql, email);
    if (usr[0].length == 0) {
        return res.status(401).send({
            message: 'User doesn\'t exist',
            flag: 'danger'
        })
    }
    else {

        try {
            sql = "SELECT * FROM BILLDET WHERE EMAIL = ? AND STATUS = 'DUE'"
            const bills = await db.query(sql, email)
            var billList = [];
            for (let i = 0; i < bills[0].length; i++) {
                const billers = await getBiller(bills[0][i])
                const data = { ...bills[0][i], ...billers}
                billList.push(data);
            }

            console.log(billList);
            return res.status(200).send({
                billList
            })
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: "Server Error. Try again.", flag: "danger", label: "bills" });
        }

    }

});

module.exports = router;
