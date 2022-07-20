var express = require('express');
var router = express.Router();
var db = require("../data/database");

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const email = req.headers.authorization;
    var sql = "SELECT ID FROM LOGIN WHERE USERNAME=? AND UTYPE='GOD'";

    const usr = await db.query(sql, email);
    console.log(usr)
    if (usr[0].length == 0) {
        return res.status(401).send({
            message: 'User doesn\'t exist',
            flag: 'danger'
        })
    }
    else {
        sql = "SELECT IFSC, CITY FROM BRANCH";
        const branch = await db.query(sql);
        const ilist = branch[0].map((item, key) => {
            return item.IFSC + " - " + item.CITY;
        })
        const ifsclist = ['Select'].concat(ilist);
        console.log(ifsclist);
        res.status(200).send({ ifsclist });

    }
});

module.exports = router;
