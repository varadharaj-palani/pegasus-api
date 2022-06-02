var express = require('express');
var router = express.Router();
var db = require("../data/database");

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
        sql = "SELECT * FROM ACCOUNT WHERE ID=?"
        const acc = await db.query(sql, usr[0][0].ID);
        res.status(200).send({'accounts': acc[0]});

    }
});

module.exports = router;
