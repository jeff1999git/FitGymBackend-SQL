const express = require("express")

const memberModel = require("../models/memberModel")
const bcrypt = require("bcryptjs")
const router = express.Router()

const hashPasswordGenerator = async (pass) => {
    console.log(pass)
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pass, salt)
}

router.get('/view', (req, res) => {
    memberModel.viewMembers((error,results)=>{
        res.json(results);
    })
});

router.post('/addmember', async (req, res) => {
    try {
        let { data } = { "data": req.body };
        let password = data.member_password;
        const hashedPassword = await hashPasswordGenerator(password);
        console.log(hashedPassword) 
        data.member_password = hashedPassword;
        memberModel.insertMember(data, (error, results) => {
            
            if (error) {
                return res.status(500).json({ message: error.message });
            }
            res.json({ status: "success" });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// router.post('/login',(req,res)=>{
//     const { member_email,member_password }=req.body;
//     memberModel.loginMember(member_email,member_password,(error,members)=>{
//         if(error)
//         {
//             res.json({
//                 status:"Error"
//             })
//         }
//         if(member_email !== members.member_email)
//         {
//             res.json({
//                 status:"Invalid Email ID"
//             })
//         }
//         if(member_password !== members.member_password)
//         {
//             res.json({
//                 status:"Invalid Email ID"
//             })
//         }
//         return res.json({status:"succes",memberdata:members})
//     })
// });

module.exports = router