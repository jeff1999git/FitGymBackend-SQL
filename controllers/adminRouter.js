const express = require("express")
const adminModel = require("../models/adminModel")
const bcrypt = require("bcryptjs")
const router = express.Router()

const hashPasswordGenerator = async (pass) => {
    console.log(pass)
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pass, salt)
}

router.get('/view', (req, res) => {
    adminModel.viewAdmin((error,results)=>{
        res.json(results);
    })
});


router.post('/addadmin', async (req, res) => {
    console.log("test")
    try {
        let { data } = { "data": req.body };
        let password = data.admin_password;
        console.log(password)
        const hashedPassword = await hashPasswordGenerator(password);
        console.log(hashedPassword)
        data.admin_password = hashedPassword;
        console.log(data)
        adminModel.insertAdmin(data, (error, results) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }
            res.json({ status: "success", data: results });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login',(req,res)=>{
    const { email,password }=req.body;
    const pword=bcrypt.compare(password,admin.password)
    adminModel.loginAdmin(email,pword,(error,admin)=>{
        if(error)
        {
            res.json({
                status:"Error"
            })
        }
        if(email !== admin.email)
        {
            res.json({
                status:"Invalid Email ID"
            })
        }
        if(pword !== admin.password)
        {
            res.json({
                status:"Invalid Email ID"
            })
        }
        return res.json({status:"succes",admindata:admin})
    })
});

module.exports = router