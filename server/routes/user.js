const express = require("express")
const router = express.Router()

const {userSignup,userLogin,userResetPassword,userForgotPassword} = require("../controllers/user")
const {isAuthenticated, isAdmin} = require("../middleware/auth")

router.post('/userSignup',userSignup)
router.post('/login',userLogin)
router.post('/forgotPassword',userForgotPassword)
router.put('/resetPassword/:id/:token',userResetPassword)
router.get('/user-auth',isAuthenticated,(req,res)=>{
    res.status(200).send({ok:true})
})
module.exports = router
