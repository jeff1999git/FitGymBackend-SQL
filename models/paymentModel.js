const mysql=require("mysql")
require("dotenv").config()
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
})

const paymentModel={
    insertPayment: (paymentData, callback)=>{
        const query='INSERT INTO payments SET ?';
        pool.query(query,paymentData, callback);
    },
    viewPayments: (callback)=>{
        const query='SELECT * FROM payments';
        pool.query(query,callback);
    },
    
}

module.exports=paymentModel;