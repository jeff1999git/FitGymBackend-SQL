const express = require("express")

const packageModel = require("../models/packageModel")
const router = express.Router()

router.post("/addpackage", async (req, res) => {
    let data = req.body
    console.log(data)
    packageModel.insertPackage(data, (error, results) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        res.json({ status: "success"});
    });
})

router.get('/viewallpackage', (req, res) => {
    packageModel.viewPackage((error, results) => {
        res.json(results);
    })
});



module.exports = router

