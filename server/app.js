const express = require("express");
const cors = require("cors")
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());

const userAuth = require("./routes/user")
const books = require("./routes/addBook")

app.use("/api",userAuth)
app.use("/api",books)


module.exports = app
