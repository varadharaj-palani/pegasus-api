var express = require('express');
var router = express.Router();
const db = require('../data/database');



/* GET users listing. */
router.post('/', async function (req, res, next) {
    const data = req.body;
    const email = data.email;

    var sql = "SELECT ID FROM LOGIN WHERE USERNAME=? AND UTYPE='Customer'";
    const usr = await db.query(sql, email);
    if (usr[0].length == 0) {
        return res.status(401).send({
            message: 'Cannot Proceed Transaction',
            flag: 'danger'
        })
    }
    else {
        try {
            sql = "SELECT * FROM ACCOUNT WHERE ACCNO = ? AND ACCTYPE='Savings'"
            const baccount = await db.query(sql, data.toacc);
            if (baccount[0].length == 0) {
                return res.status(401).send({
                    message: 'No Such User',
                    flag: 'danger',
                    label: 1
                })
            }
            else {
                sql = "SELECT * FROM CUSTOMER WHERE ID=? "
                const beneficiary = await db.query(sql, baccount[0][0].ID);
                if (beneficiary[0].length == 0) {
                    return res.status(401).send({
                        message: 'No Such User',
                        flag: 'danger',
                        label: 2
                    })
                }
                else {
                    sql = "INSERT INTO BENEFICIARY VALUES(?)"
                    const name = beneficiary[0][0].FNAME +" "+ beneficiary[0][0].LNAME;
                    console.log(name);
                    await db.query(sql, [[data.facc, name, data.toacc]]);
                    return res.status(200).send({ message: "Account Created Successfully", flag: "success" });
                }

            }

        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: "Server Error. Try again.", flag: "danger", label: "beneficiary" });
        }
    }

});

module.exports = router;
