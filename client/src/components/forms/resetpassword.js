import React, {useState,useEffect} from 'react';
import '../../scss/index.scss';
import {Link, useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../basic/layout';
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

const ResetPassword = () => {

    const {id,token} = useParams()

    const { user, error, loading } = useSelector(state => state.Resetreducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const[emailError,setEmailError] = useState()
    const[passwordError,setPasswordError] = useState()
    const[userError,setUserError] = useState()

    useEffect(()=>{
        validation()
    },[error])

    useEffect(()=>{
        if(user?.success){
        successFullMessage()
        }
    },[user])

    const successFullMessage = () => {
        setUserError("Reset Password Successfully")

        setTimeout(()=>{
        setUserError(" ")
        navigate('/login')
        },1500)
    }

    const validation = () => {
        if(error){
        if(error.data.errors){
            const validations = error.data.errors
            // const firstKey = (validations && Object.getOwnPropertyNames(validations)[0]) || null;
            const firstKey = Object.getOwnPropertyNames(validations);
            firstKey.map(e=>{
            const errMessage = validations[e].message
            if(errMessage == 'NewPassword is required'){
                setEmailError('NewPassword is required')
            }
            if(errMessage == 'ConfirmPassword is required'){
                setPasswordError("ConfirmPassword is required")
            }
            if(errMessage == "Password doesn't match"){
                setUserError("Password doesn't match")
                setTimeout(()=>{
                setUserError(" ")
                },1500)
            }
            })
        }
        }
    }

    const [userLoginData,setUserLoginData] = useState({
        NewPassword:"",
        ConfirmPassword:"",
    })

    const {NewPassword,ConfirmPassword} = userLoginData;

    const handleChangeWhileReset = (e) => {
        setUserLoginData({...userLoginData,[e.target.name]:e.target.value})
    }

    const handleChange1WhileReset = (e) => {
        if(e.target.name == 'NewPassword'){
        setEmailError(" ")
        }
        if(e.target.name == 'ConfirmPassword'){
        setPasswordError(" ")
        }
    }

    const submitHandlerWhileReset = (e) => {
        e.preventDefault();
        
        const obj = {
            NewPassword:NewPassword,
            ConfirmPassword:ConfirmPassword
        } 

        dispatch(resetPassword(id,token,obj))

    }

  return (
    <Layout title="ResetPassword - Ecommerce App">
      <div className="navbar_container">
        <div className="form_container">
          <div className="form">
            <form className="login-form" onSubmit={submitHandlerWhileReset} >
                <small>
                Change your password by writting the new and confirm password.
                </small>
                <p>{userError ? userError : ""}</p>
                <input onFocus={handleChange1WhileReset} onInput={handleChangeWhileReset} name='NewPassword' placeholder='NewPassword'/>
                <p>{emailError ? emailError : ""}</p>
                <input onFocus={handleChange1WhileReset} onInput={handleChangeWhileReset} name='ConfirmPassword' placeholder='ConfirmPassword'/>
                <p>{passwordError ? passwordError : ""}</p>
                <button style={{marginTop:"0"}} type='submit' className='btn'>Get New Password</button> 
              </form>
              <p className="message">
                <Link to={'/login'} className='anchor'>
                  <HiOutlineArrowLongLeft/>{" "}Go To
                  Log in
                </Link>
              </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
