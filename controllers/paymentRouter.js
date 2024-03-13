const express = require("express")
const paymentModel = require("../models/paymentModel")
const router = express.Router()


router.get('/view', (req, res) => {
    paymentModel.viewPayments((error,results)=>{
        res.json(results);
    })
});


router.post('/addpayment', async (req, res) => {
    console.log("test")
    try {
        let { data } = { "data": req.body };
        paymentModel.insertPayment(data, (error, results) => {
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