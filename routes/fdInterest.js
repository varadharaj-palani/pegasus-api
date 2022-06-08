var express = require('express');
var router = express.Router();
var db = require("../data/database");

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const email = req.headers.authorization;
    console.log(email);
    var sql = "SELECT ID FROM LOGIN WHERE USERNAME=? AND UTYPE='Employee'";

    const usr = await db.query(sql, email);
    console.log (usr)
    if (usr[0].length == 0) {
        return res.status(401).send({
            message: 'User doesn\'t exist',
            flag: 'danger'
        })
    }
    else {
        sql = "CALL ADD_INTEREST_TO_FD_ACCOUNTS ();"
        await db.query(sql);
        return res.status(200).send({
            message: 'Interest Added Successfully',
            flag: 'success'
        })

    }
});

module.exports = router;
