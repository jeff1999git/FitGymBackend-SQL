const mysql=require("mysql")
require("dotenv").config()
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
})

const adminModel={
    insertAdmin: (adminData, callback)=>{
        const query='INSERT INTO admin SET ?';
        pool.query(query,adminData, callback);
    },
    findAdminByEmail: (admin_email, callback)=>{
        const query='SELECT * FROM admin WHERE admin_email = ?';
        pool.query(query,[admin_email],callback);
    },
    viewAdmin: (callback)=>{
        const query='SELECT * FROM admin';
        pool.query(query,callback);
    },
    loginAdmin: (admin_email, admin_password, callback) => {
        const query = 'SELECT * FROM admin WHERE admin_email = ? AND admin_password = ?';
        pool.query(query, [admin_email, admin_password], callback);
    }
    
}

module.exports=adminModel;

// const adminschema=new mongoose.Schema(
//     {
        
        
//             name:String,
//             age:String,
//             mail:String,
//             password:String
        
//     }
// )
// module.exports=mongoose.model("adminlogin",adminschema)