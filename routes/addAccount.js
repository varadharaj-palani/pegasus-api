var express = require('express');
var router = express.Router();
var randomstring = require('randomstring');
const bcrypt = require('bcryptjs');
const db = require('../data/database');



function randId() {
    return randomstring.generate({
        length: 4,
        charset: 'numeric'
    });
}

function randAcc() {
    return randomstring.generate({
        length: 10,
        charset: 'numeric'
    });
}

function amount(principle, interest, term) {
    if (term == 'Quarterly') {
        return 3 * principle * interest;
    }
    else if (term == 'Halfyearly') {
        return 2 * principle * interest;
    }
    else {
        return principle * interest;
    }
}

/* GET users listing. */
router.post('/', async function (req, res, next) {


    const data = req.body;
    var sql = "SELECT * FROM CUSTOMER WHERE EMAIL=?";
    const user = await db.query(sql, data.email);
    sql = "INSERT INTO CUSTOMER VALUES (?)";
    try {
        var id = randId();
        console.log(data);
        if (user[0].length == 0) {
            console.log(id);
            await db.query(sql, [[id, data.fname, data.lname, data.dob, data.gender, data.phone, data.email, data.aadhar, data.pan]]);
            sql = 'INSERT INTO CADDRESS VALUES (?)'
            await db.query(sql, [[id, data.line1, data.line2, data.city, data.pincode]]);
        }
        else{
            id = user[0][0].ID;
        }
        sql = "SELECT IFSC FROM BRANCH WHERE CITY=?"
        const branchifsc = await db.query(sql, data.city);
        console.log(branchifsc);
        if (branchifsc[0].length != 0) {
            const acc = randAcc();
            const Acc = acc.toString();
            console.log(acc);
            sql = "INSERT INTO ACCOUNT VALUES (?)";
            console.log(id, Acc, branchifsc[0][0].IFSC, data.accType);
            await db.query(sql, [[id, acc, branchifsc[0][0].IFSC, data.accType]]);
            var result3;
            if (data.accType == 'Savings') {
                sql = "INSERT INTO SAVINGSACC VALUES (?)"
                result3 = await db.query(sql, [[Acc, 0, 'Active', 7]]);
            }
            else {
                sql = "INSERT INTO FDACC VALUES (?)"
                const amt = amount(data.principle, 1, 'Yearly');
                console.log(amt);
                result3 = await db.query(sql, [[Acc, data.principle, amt, 9, 'Active', data.depdate, data.term, data.maturdate]]);

            }
            if (user[0].length == 0) {
                sql = "INSERT INTO LOGIN VALUES (?)"
                const hashpwd = await bcrypt.hash(data.password, 7);
                await db.query(sql, [[data.email, hashpwd, 'Customer', id]]);
            }

            return res.status(200).send({ message: "Account Created Successfully", flag: "success" });

        }
        else {
            return res.status(500).send({ message: "No service in this city", flag: "danger", label: "branch" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Server Error. Try again.", flag: "danger", label: "customer" });
    }

});

module.exports = router;
