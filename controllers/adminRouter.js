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


// router.post('/addadmin', async (req, res) => {
//     try {
//         let { data } = { "data": req.body }
//         let password = data.password
//         const hashedpassword = await hashPasswordGenerator(password)
//         data.password = hashedpassword
//         let gym = new adminModel(data)
//         await gym.save()
//         res.json({ status: "success" })
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

// router.post("/adminlogin", (req, res) => {
//     let data=req.body;
//     const { mail, password } = req.body;
    
//     adminModel.loginAdmin(mail,password, (err, admin) => {
//         const adminDetails = {
//             name: admin.name,
//             mail: admin.mail
//         };
//         if (err) {
//             return res.status(500).json({ status: "error", message: "Failed to login admin" });
//         }
//         if (!admin) {
//             return res.json({ status: "Incorrect mailid" });
//         }
//         // Direct comparison of the plaintext password from the request to the one stored in the database
//         if (password !== admin.password) {
//             return res.json({ status: "Incorrect password" });
//         }
//         // If passwords match, proceed to sign the JWT
//         return res.json({ status: "success", admindata: adminDetails });
//     });
// });

router.post('/login',(req,res)=>{
    const { email,password }=req.body;
    adminModel.loginAdmin(email,password,(error,admin)=>{
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
        if(password !== admin.password)
        {
            res.json({
                status:"Invalid Email ID"
            })
        }
        return res.json({status:"succes",admindata:admin})
    })
})


// router.post("/adminlogin", async(req,res)=>{
//     try {
//         const { mail, password } = req.body;
//         const admin = await adminModel.findOne({ mail: mail });
//         if (!admin) {
//             return res.json({ status: "Incorrect mailid" });
//         }
//         const match = await bcrypt.compare(password, admin.password);
//         if (!match) {
//             return res.json({ status: "Incorrect password" });
//         }
//         jwt.sign({ email: mail }, "fitgymadmin", { expiresIn: "1d" }, (error, admintoken) => {
//             if (error) {
//                 return res.json({ "status": "error", "error": error });
//             } else {
//                 return res.json({ status: "success", "admindata": admin, "admintoken": admintoken });
//             }
//         });
//     } catch (error) {
//         return res.status(500).json({ "status": "error", "message": "Failed to login admin" });
//     }
// });

router
    



router.post("/adminprofile", async(req,res) => {
    const admintoken = req.headers["admintoken"];
    jwt.verify(admintoken, "fitgymadmin", async(error, decoded) => {
        if (error) {
            return res.json({ "status": "error", "message": "Failed to verify token" });
        }
        if (decoded && decoded.email) {
            const { email } = decoded;
            try {
                const admin = await adminModel.findOne({ mail: email });
                if (!admin) {
                    return res.status(404).json({ "status": "Admin not found" });
                }
                const adminDetails = {
                    name: admin.name,
                    age: admin.age,
                    mail: admin.mail
                };
                return res.json(adminDetails);
            } catch (error) {
                return res.status(500).json({ "status": "error", "message": "Failed to fetch admin details" });
            }
        } else {
            return res.json({ "status": "unauthorised user" });
        }
    });
});

module.exports = router

