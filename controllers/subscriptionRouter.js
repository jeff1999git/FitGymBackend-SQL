const express = require("express")
const subscriptionModel = require("../models/subscriptionModel")
const router = express.Router()

router.get('/view', (req, res) => {
    subscriptionModel.viewSubscriptions((error,results)=>{
        res.json(results);
    })
});


router.post('/addsubscription', async (req, res) => {
    console.log("test")
    try {
        let { data } = { "data": req.body };
        subscriptionModel.insertSubscriptions(data, (error, results) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }
            res.json({ status: "success", data: results });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router