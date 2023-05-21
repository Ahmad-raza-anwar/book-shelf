const mongoose = require("mongoose")

function dataBase(){
    mongoose.connect(process.env.DB_URL).then((con)=>{
        console.log(`DB is connected with host ${con.connection.host}`);
    })
}

module.exports = dataBase