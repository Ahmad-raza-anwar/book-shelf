const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSignup = new mongoose.Schema({
    Name: {
        type : String,
        required : [true, "Name is required"]
    },
    Email: {
        type : String,
        required : [true, "Email is required"]
    },
    Role:{
        type : String,
        required : [true, "Role is required"]
    },
    Password: {
        type : String,
        required : [true, "Password is required"]
    },
    confirmPassword: {
        type : String,
        required : [true, "ConfirmPassword is required"]
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: {
        type: String
    }
})

UserSignup.methods.comparePassword = async function(passwrodFromBody){
    return await bcrypt.compare(passwrodFromBody,this.Password)
}

UserSignup.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.secretKey, {
       expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

// UserSignup.methods.getResetPasswordToken = function () {

//     // Genrate Toekn
//     const resetToken = crypto.randomBytes(20).toString("hex")
//     // hash and set to resetPasswordToken
//     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
//     // set token expires time
//     this.resetPasswordExpires= Date.now() + 30 * 60 * 1000
//     return resetToken
//  }

module.exports = mongoose.model("UserSignup",UserSignup)