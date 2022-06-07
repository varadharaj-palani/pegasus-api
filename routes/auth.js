var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../data/database');

/* GET users listing. */
router.post('/', async function (req, res, next) {
    const email = req.body.email;
    const password = req.body.pwd;
    const type = req.body.type;
    var sql;
    var logbit;
    if (type == "Customer") {
        sql = "SELECT PASSWORD FROM LOGIN WHERE USERNAME=? AND UTYPE='CUSTOMER'";
        logbit = 1;

    }
    else if (type == "Employee") {
        sql = "SELECT PASSWORD FROM LOGIN WHERE USERNAME=? AND UTYPE='EMPLOYEE'";
        logbit = 2;

    }
    else if (type == "God") {
        sql = "SELECT PASSWORD FROM LOGIN WHERE USERNAME=? AND UTYPE='GOD'";
        logbit = 3;

    }
    else {
        return res.status(401).send({
            message: 'Select User da thailee',
            // message: 'Please Select Login Type',
            flag: 'danger'
        })
    }
    const pwd = await db.query(sql, email);
    if (pwd[0].length == 0) {
        return res.status(401).send({
            message: 'User doesn\'t exist',
            flag: 'danger'
        })
    }

    console.log(pwd[0][0].PASSWORD, pwd)
    const validpwd = await bcrypt.compare(password, pwd[0][0].PASSWORD);
    if (validpwd) {
        return res.status(200).send({
            message: 'Logged In Successfully',
            flag: 'success',
            username: email,
            logbit: logbit
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
