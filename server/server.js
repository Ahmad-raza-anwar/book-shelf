const App = require("./app")
const dotenv = require('dotenv')
dotenv.config({path:"server/config/config.env"})

const dataBase = require("./config/dataBase")
dataBase()

App.listen(process.env.PORT,()=>{
    console.log(`server is running on PORT:${process.env.PORT}`);
})