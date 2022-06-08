var express = require('express');
var router = express.Router();
const db = require('../data/database');
const { all } = require('./auth');


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
            sql = "SELECT * FROM LOAN WHERE EMAIL = ? AND STATUS = 'ACTIVE'"
            const loans = await db.query(sql, email)
            const loanList = loans[0];
            return res.status(200).send({
                loanList
            })
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: "Server Error. Try again.", flag: "danger", label: "loans" });
        }

    }

});

module.exports = router;
