var express = require('express');
var router = express.Router();
const db = require('../data/database');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring')

function randId() {
    return randomstring.generate({
        length: 4,
        charset: 'numeric'
    });
}
/* GET users listing. */
router.post('/', async function (req, res, next) {
    const data = req.body;
    const email = data.email;
console.log(data);
    var sql = "SELECT * FROM LOGIN WHERE USERNAME=? AND UTYPE='GOD'";
    const usr = await db.query(sql, data.godmail);
    console.log(email,usr[0]);
    if (usr[0].length == 0) {
        return res.status(401).send({
            message: 'Cannot Create Employee',
            flag: 'danger'
        })
    }
    else {
        try {
            
                var id = randId();
                sql = "INSERT INTO EMPLOYEE VALUES(?)";
                await db.query(sql,[[id,data.name,data.gender,data.salary,data.desig,data.ifsc.slice(0,10),data.email,data.phone,data.dob]]);
                sql = "INSERT INTO EADDRESS VALUES (?)";
                await db.query(sql,[[id, data.line1, data.line2, data.city,data.pincode]]);
                sql = "INSERT INTO LOGIN VALUES (?)";
                const hashpwd = await bcrypt.hash(data.password, 7);
                await db.query(sql, [[data.email, hashpwd, 'Employee', id]]);
                return res.status(200).send({
                    message: 'Employee Added Successfully',
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
