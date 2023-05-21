import React, {useState,useEffect} from 'react';
import '../../scss/index.scss';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { userLogin } from '../../Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useGlobalContext } from '../context/context';
import Layout from '../basic/layout';
import { BsEmojiNeutral } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";


const Login = () => {

  const { user, success, error, loading } = useSelector(state => state.logInreducer);
  const {auth,setAuth} = useGlobalContext()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const[emailError,setEmailError] = useState()
  const[passwordError,setPasswordError] = useState()
  const[userError,setUserError] = useState()
  const[loginSuccess,setLoginSuccess] = useState(false)

  useEffect(()=>{
    validation()
  },[error])

  useEffect(()=>{
    localStorage.setItem('loginuser',JSON.stringify({loginSuccess}))
  },[])

  useEffect(()=>{
    setLoginSuccess(JSON.parse(localStorage.getItem('loginuser')))
  },[success])

  useEffect(()=>{
    if(loginSuccess?.Success){
      successFullMessage()
    }
  },[loginSuccess])
  

  const successFullMessage = () => {
    setUserError("Login User Successfully")
    
    setAuth({
      ...auth,
      user: user.loginUser,
      token: user.token,
    });
    localStorage.setItem("user",JSON.stringify(user))

    setTimeout(()=>{
      setUserError(" ")
      user.loginUser?.Role === 'Admin' ? navigate('/admin') : navigate('/user')
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
          if(errMessage == 'Password is required'){
            setPasswordError('Password is required')
          }
          if(errMessage == 'Email is invalid'){
            setUserError("Email is invalid")
            setTimeout(()=>{
              setUserError(" ")
            },1500)
          }
          if(errMessage == "Password is invalid"){
            setUserError("Password is invalid")
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
    Password:""
  })

  const {Email,Password} = userLoginData;

  const handleChangeWhileLogin = (e) => {
    setUserLoginData({...userLoginData,[e.target.name]:e.target.value})
  }

  const handleChange1WhileLogin = (e) => {
    if(e.target.name == 'Email'){
      setEmailError(" ")
    }
    if(e.target.name == 'Password'){
      setPasswordError(" ")
    }
  }

  const submitHandlerWhileLogin = (e) => {
    e.preventDefault();
    
    const obj = {
      Email:Email,
      Password:Password
    } 

    
    if(!obj.Email){
      setEmailError('Email is required')
    }
    if(!obj.Password){
      setPasswordError('Password is required')
    }
    dispatch(userLogin(obj))

  }
  

  return (
    <Layout title="Login - Ecommerce App">
      <div className="navbar_container">
        <div className="form_container">
          <div className="form">
            <form className="login-form" onSubmit={submitHandlerWhileLogin} >
                <h4>Login Form</h4>
                <p>{userError ? userError : ""}</p>
                <input onFocus={handleChange1WhileLogin} onInput={handleChangeWhileLogin} type='email' name='Email' placeholder='Email'/>
                <p>{emailError ? emailError : ""}</p>
                <input onFocus={handleChange1WhileLogin} onInput={handleChangeWhileLogin} type='text' name='Password' placeholder='Password'/>
                <p>{passwordError ? passwordError : ""}</p>
                <button type='submit' className='btn' style={{margin:"0 0 10px 0"}}>Login</button>
              </form>
                <p className='message'>
                  <Link to='/forgotpassword' className='anchor'>
                    <BsEmojiNeutral/>{" "}
                    Forgot Password
                  </Link>
                </p>
                <p className="message" style={{marginTop:"0"}}>
                  <Link to={'/register'} className='anchor'>
                    <IoCreateOutline/>{" "}Create an account if you don't have?
                  </Link>
                </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
