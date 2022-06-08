var express = require('express');
var router = express.Router();
const db = require('../data/database');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring')


/* GET users listing. */
router.post('/', async function (req, res, next) {
    const data = req.body;
    const email = data.email;
console.log(data);
    var sql = "SELECT * FROM LOGIN WHERE USERNAME=? AND UTYPE='GOD'";
    const usr = await db.query(sql, data.email);
    console.log(email,usr[0]);
    if (usr[0].length == 0) {
        return res.status(401).send({
            message: 'Cannot Create Branch',
            flag: 'danger'
        })
    }
    else {
        try {
            
                sql = "INSERT INTO BRANCH VALUES(?)";
                await db.query(sql,[[data.ifsc,data.city,parseInt(data.manid.slice(0,4))]]);
                return res.status(200).send({
                    message: 'Branch Added Successfully',
                    flag: 'success',
                })
            
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: "Server Error. Try again.", flag: "danger", label: "beneficiary" });
        }
    }

});

module.exports = router;
