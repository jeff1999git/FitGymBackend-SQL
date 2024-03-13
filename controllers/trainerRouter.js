const express = require("express")

const trainerModel = require("../models/trainerModel")
const bcrypt = require("bcryptjs")
const router = express.Router()

const hashPasswordGenerator = async (pass) => {
    console.log(pass)
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pass, salt)
}

router.get('/viewtrainer', (req, res) => {
    trainerModel.viewTrainer((error,results)=>{
        res.json(results);
    })
});


router.post('/addtrainer', async (req, res) => {
    console.log("test")
    try {
        let { data } = { "data": req.body };
        let password = data.trainer_password;
        console.log(password)
        const hashedPassword = await hashPasswordGenerator(password);
        console.log(hashedPassword)
        data.trainer_password = hashedPassword;
        console.log(data)
        trainerModel.insertTrainer(data, (error, results) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }
            res.json({ status: "success", data: results });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/trainerlogin',(req,res)=>{
    const { email,password }=req.body;
    trainerModel.loginTrainer(email,password,(error,trainer)=>{
        if(error)
        {
            res.json({
                status:"Error"
            })
        }
        if(email !== trainer.email)
        {
            res.json({
                status:"Invalid Email ID"
            })
        }
        if(password !== trainer.password)
        {
            res.json({
                status:"Invalid Password"
            })
        }
        return res.json({status:"succes",trainerdata:trainer})
    })
})

router.post("/trainerprofile", async(req,res) => {
    const trainertoken = req.headers["trainertoken"];
    jwt.verify(trainertoken, "fitgymtrainer", async(error, decoded) => {
        if (error) {
            return res.json({ "status": "error", "message": "Failed to verify token" });
        }
        if (decoded && decoded.email) {
            const { email } = decoded;
            try {
                const trainer = await trainerModel.findOne({ mail: email });
                if (!trainer) {
                    return res.status(404).json({ "status": "trainer not found" });
                }
                const trainerDetails = {
                    name: trainer.name,
                    age: trainer.age,
                    mail: trainer.mail
                };
                return res.json(trainerDetails);
            } catch (error) {
                return res.status(500).json({ "status": "error", "message": "Failed to fetch trainer details" });
            }
        } else {
            return res.json({ "status": "unauthorised user" });
        }
    });
});

module.exports = router

