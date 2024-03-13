const mysql=require("mysql")

require("dotenv").config()
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
})

const memberModel={
    insertMember: (memberData, callback)=>{
        const query='INSERT INTO members SET ?';
        pool.query(query,memberData, callback);
    },
    findMemberByEmail: (member_email, callback)=>{
        const query='SELECT * FROM members WHERE member_email = ?';
        pool.query(query,[member_email],callback);
    },
    viewMembers: (callback)=>{
        const query='SELECT * FROM members';
        pool.query(query,callback);
    },
    loginMember: (member_email, member_password, callback) => {
        const query = 'SELECT * FROM members WHERE member_email = ? AND member_password = ?';
        pool.query(query, [member_email, member_password], callback);
    }
    
}

module.exports=memberModel;