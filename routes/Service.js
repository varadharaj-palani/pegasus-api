var express = require('express');
var router = express.Router();
const db = require('../data/database');
const { all } = require('./auth');

/* GET users listing. */
router.post('/', async function (req, res, next) {


    const data = req.body;
    var sql = "SELECT * FROM CUSTOMER WHERE EMAIL=?";
    const user = await db.query(sql, data.email);
    if (user[0].length == 0) {
        return res.status(401).send({
            message: 'User doesn\'t exist',
            flag: 'danger'
        })
    }
    else {
        try {
            let dateOb = new Date();
            let date = dateOb.toISOString().slice(0,10);
            console.log(date);
            sql = "INSERT INTO REQUEST VALUES (?)"
            console.log(data)
            await db.query(sql,[[data.name,data.services,data.email,date]])
            return res.status(200).send({ message: "Sent Service Request", flag: "success" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: "Server Error. Try again.", flag: "danger", label: "outer" });
        }
    }

});

module.exports = router;


