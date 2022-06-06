var express = require('express');
var router = express.Router();
var randomstring = require('randomstring');
const bcrypt = require('bcryptjs');
const db = require('../data/database');


function randLoanId() {
    return randomstring.generate({
        length: 10,
        charset: 'alphanumeric'
    });
}


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
            sql = "INSERT INTO LOAN VALUES (?)"
            const loanId = randLoanId();
            console.log(data)
            await db.query(sql,[[loanId,data.accno,data.loanType,data.sanctby,data.principle,data.principle,'Active',data.interestrate,data.term]])
            return res.status(200).send({ message: "Loan Created", flag: "success" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: "Server Error. Try again.", flag: "danger", label: "outer" });
        }
    }

});

module.exports = router;
