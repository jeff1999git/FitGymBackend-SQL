const mysql = require("mysql")
require("dotenv").config()
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

const packageModel = {
    insertPackage: (packageData, callback) => {
        const query = 'INSERT INTO plans SET ?';
        pool.query(query, packageData, callback);
    },
    viewPackage: (callback) => {
        const query = 'SELECT * FROM plans';
        pool.query(query, callback);
    }
    // ,
    // updatePackage: (admin_email, callback) => {
    //     const query = 'SELECT * FROM admin WHERE admin_email = ?';
    //     pool.query(query, [admin_email], callback);
    // }
}

module.exports = packageModel;