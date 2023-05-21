const userSignupSchema = require("../models/userSignup")
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/sendMail");
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

//  ----------------------  userSignup --------------------------

exports.userSignup = async (req,res) => {
  const { Name, Email, Role, Password, confirmPassword } = req.body;

  const userSignUp = await userSignupSchema.findOne({ Email:Email })
  if(userSignUp){
    res.status(400).json({errors:{Validation:{message:"User already Exists 'Please change your email'"}}})
  }
  else{
    const encryptedPassword = Password ? await bcrypt.hash(Password,10) : ""
    const encryptedConfirmPassword = confirmPassword ? await bcrypt.hash(confirmPassword,10) : ""
    try{
      const signupUser = new userSignupSchema({
        Name,
        Email,
        Role,
        Password:encryptedPassword,
        confirmPassword:encryptedConfirmPassword
      })

      if(Password == confirmPassword){ 
        const savedUser = await signupUser.save()
        res.status(200).json({
          savedUser,
          success:true
        })   
      }
      else{
        res.status(400).json({errors:{Validation:{message:"Password doesn't match"}}})
      }
    }
    catch(error){
      res.status(400).json(error)
    }
  }
}


//  ----------------------  userLogin --------------------------


exports.userLogin = async (req, res) => {
  const {Email,Password} = req.body
  if(!Email && !Password){
    res.status(400).json({errors:{Email:{message:"Email is required"},Password:{message:"Password is required"}}})
  }
  else{
      const loginUser = await userSignupSchema.findOne({ Email })
      if(loginUser){
          const isMatch = await loginUser.comparePassword(Password)

        if(isMatch){
        const token = loginUser.getJwtToken()

        res.status(200).json({
            token,
            loginUser,
            success:true
        })
      }
      else{
        res.status(400).json({errors:{Password:{message:"Password is invalid"}}})
      }
    }
    else{
      res.status(400).json({errors:{Email:{message:"Email is invalid"}}})
    }
  }
}


//  ----------------------  userResetPassword --------------------------


exports.userForgotPassword = async (req, res) => {
  const { Email } = await req.body;
    if(Email != ''){
      const resetUser = await userSignupSchema.findOne({ Email });
      
      if (!resetUser) {
        return res.status(400).json({ errors: { Validation: { message: "Email is invalid" } } });
      }

      const token = jwt.sign({_id:resetUser._id},process.env.secretkey,{
        expiresIn:'120s'
      })
      
      const setUserToken = await userSignupSchema.findByIdAndUpdate({_id:resetUser._id},{resetPasswordToken:token},{new:true})
      
      const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetUser.id}/${setUserToken.resetPasswordToken}`;
      const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

      await sendMail({
        email: setUserToken.Email,
        subject: 'Ecommerce Password Recovery',
        message
      })
      
      res.status(200).json({
        success: true,
        message: `Email sent to: ${resetUser.Email}`
      })
    }
    else{
      res.status(400).json({ errors: { Email: { message: "Email is required" } } });
    }
  }

// --------------------------- userResetPassword -------------------------


exports.userResetPassword = async (req, res) => {

    const {id,token} = req.params
    const {NewPassword,ConfirmPassword} = req.body
    
    if(!NewPassword && !ConfirmPassword){
      return res.status(400).json({errors:{NewPassword:{message:"NewPassword is required"},ConfirmPassword:{message:"ConfirmPassword is required"}}})
    }
    if(NewPassword == ''){
      return res.status(400).json({ errors: { NewPassword: { message: "NewPassword is required" } } });
    }
    if(ConfirmPassword == ''){
      return res.status(400).json({ errors: { ConfirmPassword: { message: "ConfirmPassword is required" } } });
    }
    if (NewPassword !== ConfirmPassword) {
      res.status(400).json({ errors: { Validation: { message: "Password doesn't match" } } });
    }
    else{
    const encryptedResetPassword = NewPassword ? await bcrypt.hash(NewPassword,10) : ""

    const validUser = await userSignupSchema.findOneAndUpdate({_id:id,resetPasswordToken:token},{Password:encryptedResetPassword})
    
    if(!validUser){
      return res.status(401).json({
        message:'User not exits'
      })
    }

    res.status(200).json({
      success:true
    })
  }
}


// get All Users


exports.getAllUsers = async (req, res) => {
  const users = await userSignupSchema.find();

  res.status(200).json({
      success: true,
      users
  })
}


// deleteUser


exports.deleteUser = async (req, res) => {
  const user = await userSignupSchema.findByIdAndDelete(req.params.id);

  if (!user) {
      return res.status(400).json({ errors: { validation: { message: "User not found - UserId is invalid" } } });
  }

  res.status(200).json({
      success: true,
  })
}
