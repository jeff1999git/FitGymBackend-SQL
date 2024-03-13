const mysql=require("mysql")
require("dotenv").config()
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
})

const trainerModel={
    insertTrainer: (trainerData, callback)=>{
        const query='INSERT INTO trainers SET ?';
        pool.query(query,trainerData, callback);
    },
    findtrainerByEmail: (trainer_email, callback)=>{
        const query='SELECT * FROM trainers WHERE trainer_email = ?';
        pool.query(query,[trainer_email],callback);
    },
    viewTrainer: (callback)=>{
        const query='SELECT * FROM trainers';
        pool.query(query,callback);
    },
    loginTrainer: (trainer_email, trainer_password, callback) => {
        const query = 'SELECT * FROM trainers WHERE trainer_email = ? AND trainer_password = ?';
        pool.query(query, [trainer_email, trainer_password], callback);
    }
    
}

module.exports=trainerModel;

