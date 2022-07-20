var express = require('express');
var router = express.Router();
const db = require('../data/database');
const { all } = require('./auth');

/* GET users listing. */
const getName = async (item) => {
    try {
        console.log(item)
        var sql;
        if (item.TTYPE == 'BILL') {
            sql = "SELECT * FROM BILLERS WHERE BILLERID=?"
            const biller = await db.query(sql, item.AACNO);
            return biller[0][0].BILLERNAME;
        }
        else {
            sql = "SELECT * FROM ACCOUNT WHERE ACCNO = ? AND ACCTYPE='Savings'";
            const account = await db.query(sql, item.AACNO);

            sql = "SELECT * FROM CUSTOMER WHERE ID=? "
            const cust = await db.query(sql, account[0][0].ID);
            const name = cust[0][0].FNAME + " " + cust[0][0].LNAME;
            return name;
        }


    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Server Error. Try again.", flag: "danger", label: "getname" });
    }
}

const Map = async (transacts) => {
    try {
        var trlist = [];
        for (let i = 0; i < transacts.length; i++) {
            const name = await getName(transacts[i])
            const data = { ...transacts[i], name: name }
            trlist.push(data)
            console.log(trlist);
        }

        return trlist;
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Server Error. Try again.", flag: "danger", label: "map" });
    }
}

router.get('/:acct/', async function (req, res, next) {
    const email = req.headers.authorization;
    const acct = req.params.acct;
    console.log(req.params, email)
    var sql = "SELECT ID FROM LOGIN WHERE USERNAME=? AND UTYPE='Customer'";
    const usr = await db.query(sql, email);
    if (usr[0].length == 0) {
        return res.status(401).send({
            message: 'User doesn\'t exist',
            flag: 'danger'
        })
    }
    else {


        sql = "SELECT * FROM TRANSACTION WHERE ACCNO = ? ORDER BY TRANSDATE DESC";

        const transactions = await db.query(sql, acct);
        const tlist = await Map(transactions[0]);
        console.log(tlist);
        return res.status(200).send({
            tlist
        })

    }

});

module.exports = router;
