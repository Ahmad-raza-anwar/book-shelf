import React, {useState,useEffect} from 'react';
import '../../scss/index.scss';
import {Link} from 'react-router-dom';
import { forgotPassword } from '../../Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../basic/layout';
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

const ForgotPassword = () => {

  const { user, error, loading } = useSelector(state => state.Resetreducer);
  const dispatch = useDispatch();

  const[emailError,setEmailError] = useState()
  const[userError,setUserError] = useState()
  const[forgotPasswordSuccess,setForgotPasswordSuccess] = useState(false)

  useEffect(()=>{
    validation()
  },[error])

  useEffect(()=>{
    localStorage.setItem('forgotuserpassword',JSON.stringify({forgotPasswordSuccess}))
  },[])

  useEffect(()=>{
    setForgotPasswordSuccess(JSON.parse(localStorage.getItem('forgotuserpassword')))
  },[user?.success])

  useEffect(()=>{
    if(forgotPasswordSuccess?.Success){
      successFullMessage()
    }
  },[forgotPasswordSuccess])

  const successFullMessage = () => {
    setUserError(user?.message)

    setTimeout(()=>{
      setUserError(" ")
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
          if(errMessage == 'Email is required'){
            setEmailError('Email is required')
          }
          if(errMessage == 'Email is invalid'){
            setUserError("Email is invalid")
            setTimeout(()=>{
              setUserError(" ")
            },1500)
          }
        })
      }
    }
  }

  const [userLoginData,setUserLoginData] = useState({
    Email:"",
  })

  const {Email} = userLoginData;

  const handleChangeWhileForgot = (e) => {
    setUserLoginData({...userLoginData,[e.target.name]:e.target.value})
  }

  const handleChange1WhileForgot = (e) => {
    if(e.target.name == 'Email'){
      setEmailError(" ")
    }
  }

  const submitHandlerWhileForgot = (e) => {
    e.preventDefault();
    
    const obj = {
      Email:Email
    } 

    dispatch(forgotPassword(obj))

  }

  return (
    <Layout title="ForgotPassword - Ecommerce App">
      <div className="navbar_container">
        <div className="form_container">
          <div className="form">
            <form className="login-form" onSubmit={submitHandlerWhileForgot} >
                <small>
                Please enter your email address. You will receive an email message with instructions on how to reset your password.
                </small>
                <p>{userError ? userError : ""}</p>
                <input onFocus={handleChange1WhileForgot} onInput={handleChangeWhileForgot} type='email' name='Email' placeholder='Email'/>
                <p>{emailError ? emailError : ""}</p>
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

export default ForgotPassword;
