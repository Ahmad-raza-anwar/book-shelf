import React, { useState,useEffect, useRef } from 'react';
import '../../scss/index.scss';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { userRegister } from '../../Actions/userActions';
import Layout from '../basic/layout';
import { BsEmojiWink } from "react-icons/bs";

const Signup = () => {
    const { success , error, loading } = useSelector(state => state.signUpreducer);
    const navigate = useNavigate()

    const[nameError,setNameError] = useState()
    const[emailError,setEmailError] = useState()
    const[roleError,setRoleError] = useState()
    const[passwordError,setPasswordError] = useState()
    const[confirmPasswordError,setConfirmPasswordError] = useState()
    const[userError,setUserError] = useState()
    const[Success,setSuccess] = useState(false)
    const [userSignUpData,setUserSignUpData] = useState({
      Name:"",
      Email:"",
      Role:"",
      Password:"",
      confirmPassword:""
    })
    
  const {Name,Email,Role,Password,confirmPassword} = userSignUpData;

  useEffect(()=>{
    localStorage.setItem('signupuser',JSON.stringify({Success}))
  },[])

  useEffect(()=>{
    setSuccess(JSON.parse(localStorage.getItem('signupuser')))
  },[success])

  useEffect(()=>{
    validation()
  },[error])

  useEffect(() => {
    if(Success?.Success){
      successFullMessage();
    }
  }, [Success]);
  

  const formRef = useRef()

  const successFullMessage = () => {
    setUserError("User Register Successfully")
    setTimeout(()=>{
      setUserError(" ")
      navigate('/login')
    },1500)
    setUserSignUpData({
      Name:"",
      Email:"",
      Role:"User",
      Password:"",
      confirmPassword:""
    })
    formRef.current.reset()
  }

    const validation = () => {
      if(error){
        if(error.data.errors){
          const validations = error.data.errors
          // const firstKey = (validations && Object.getOwnPropertyNames(validations)[0]) || null;
          const firstKey = Object.getOwnPropertyNames(validations);
          firstKey.map(e=>{
            const errMessage = validations[e].message

            if(errMessage == 'Name is required'){
              setNameError('Name is required')
            }
            if(errMessage == 'Email is required'){
              setEmailError('Email is required')
            }
            if(errMessage == 'Role is required'){
              setRoleError('Role is required')
            }
            if(errMessage == 'Password is required'){
              setPasswordError('Password is required')
            }
            if(errMessage == 'ConfirmPassword is required'){
              setConfirmPasswordError('ConfirmPassword is required')
            }
            if(errMessage == "User already Exists 'Please change your email'"){
              setUserError("User already Exists 'Please change your email'")
              setTimeout(() => {
                setUserError(" ")
              }, 1500);
            }
            if(errMessage == "Password doesn't match"){
              setUserError("Password doesn't match")
              setTimeout(() => {
                setUserError(" ")
              }, 1500);
            }
          })
        }
      }
    }
  

  const dispatch = useDispatch()

  
  const handleChange = (e) => {
    setUserSignUpData({...userSignUpData,[e.target.name]:e.target.value})
  }
  const handleChange1 = (e) => {
    if(e.target.name == 'Name'){
      setNameError(" ")
    }
    if(e.target.name == 'Email'){
      setEmailError(" ")
    }
    if(e.target.name == 'Role'){
      setRoleError(" ")
    }
    if(e.target.name == 'Password'){
      setPasswordError(" ")
    }
    if(e.target.name == 'confirmPassword'){
      setConfirmPasswordError(" ")
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    
    const obj = {
      Name:Name,
      Email:Email,
      Role:Role,
      Password:Password,
      confirmPassword:confirmPassword
    }
    dispatch(userRegister(obj))
  }

  
  
  return (
    <Layout title="Register - Ecommerce App">
      <div className="navbar_container">
        <div className="form_container">
          <div className="form">
              <form ref={formRef} onSubmit={submitHandler} className="register-form">
                <h4>SignUp Form</h4>
                <p>{userError ? userError : ""}</p>
                <input onFocus={handleChange1} onInput={handleChange} type='text' name='Name' placeholder='Name'/>
                <p>{nameError ? nameError : ""}</p>
                <input onFocus={handleChange1} onInput={handleChange} type='email' name='Email' placeholder='Email'/>
                <p>{emailError ? emailError : ""}</p>
                <select onFocus={handleChange1} onInput={handleChange} name='Role'>
                  <option hidden selected>Role</option>
                  <option name='Role' value="User">User</option>
                </select>
                <p>{roleError ? roleError : ""}</p>
                <input onFocus={handleChange1} onInput={handleChange} type='text' name='Password' placeholder='Password'/>
                <p>{passwordError ? passwordError : ""}</p>
                <input onFocus={handleChange1} onInput={handleChange} type='text' name='confirmPassword' placeholder='ConfirmPassword'/>
                <p>{confirmPasswordError ? confirmPasswordError : ""}</p>
                <button className='btn'>Register</button>
              </form>
                <p className="message">
                  <Link to={'/login'} className='anchor'>
                   <BsEmojiWink/>{" "}Already have an account? Go Login
                  </Link>
                </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
