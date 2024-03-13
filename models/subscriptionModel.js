const mysql=require("mysql")
require("dotenv").config()
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
})

const subscriptionModel={
    insertSubscriptions: (subscriptionsData, callback)=>{
        const query='INSERT INTO subscriptions SET ?';
        pool.query(query,subscriptionsData, callback);
    },
    viewSubscriptions: (callback)=>{
        const query='SELECT * FROM subscriptions';
        pool.query(query,callback);
    },
    
}

module.exports=subscriptionModel;