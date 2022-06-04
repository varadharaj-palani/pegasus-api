var express = require('express');
var router = express.Router();
var db = require("../data/database");

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const email = req.headers.authorization;
    var sql = "SELECT ID FROM LOGIN WHERE USERNAME=? AND UTYPE='Customer'";
    const usr = await db.query(sql, email);
    var acct = ['Select'];
    if (usr[0].length == 0) {
        return res.status(401).send({
            message: 'User doesn\'t exist',
            flag: 'danger'
        })
    }
    else {
        sql = "SELECT ACCNO FROM ACCOUNT WHERE ID=? AND ACCTYPE='Savings'"
        const acc = await db.query(sql, usr[0][0].ID);
        for (const type of acc[0]) {
            acct.push(type.ACCNO);
        }
        console.log(acct)
        res.status(200).send( acct );

    }
});

module.exports = router;
