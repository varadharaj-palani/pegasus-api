var express = require('express');
var router = express.Router();
const db = require('../data/database');

router.post('/', async function (req, res, next) {

    const data = req.body;
    var sql = "SELECT * FROM CUSTOMER WHERE EMAIL=?";
    const user = await db.query(sql, data.email);
    sql = "INSERT INTO REQUEST VALUES (?)";
    try {
        if (user[0].length == 0) {
            console.log(id);
            await db.query(sql, [[data.name,data.service,data,data.email]]);
        }
        else{
            id = user[0][0].ID;
        }

        return res.status(200).send({ message: "Request Submitted Successfully", flag: "success" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Server Error. Try again.", flag: "danger", label: "customer" });
    }

});

module.exports = router;


