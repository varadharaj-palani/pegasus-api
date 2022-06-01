var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const db= require('../data/database');

/* GET users listing. */
router.post('/', async function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    var sql = "SELECT PASSWORD FROM LOGIN WHERE USERNAME=? AND UTYPE='CUSTOMER'";
    const pwd = await db.query(sql, email);
    if (pwd[0].length == 0) {
        return res.status(401).send({
            message: 'User doesn\'t exist',
            flag: 'danger'
        })
    }

    const validpwd = await bcrypt.compare(password, pwd[0][0].PASSWORD);
    if (validpwd) {
        return res.status(200).send({
            message: 'Logged In Successfully',
            flag: 'success'
        })
    }
    else {
        return res.status(401).send({
            message: 'Invalid Password',
            flag: 'danger'
        })
    }
});

module.exports = router;
