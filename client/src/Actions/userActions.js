import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,

    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,

    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

} from '../Constants/userConstants'

import axios from 'axios'

export const userRegister = (userSignUpData) => async (dispatch) => {
    try{
        dispatch({
            type:REGISTER_USER_REQUEST,
            loading:true
        })
        
        const { data } = await axios.post('http://localhost:7000/api/userSignup', userSignUpData)

        if(data){
            localStorage.setItem('signupuser',JSON.stringify({Success:data?.success}))
            dispatch({
                type:REGISTER_USER_SUCCESS,
                loading:false,
                success:data?.success,
            })
        }
        
    } catch(err){
        dispatch({
            type:REGISTER_USER_FAIL,
            loading:false,
            payload:err.response
        })
    }
}

export const userLogin = (userLoginData) => async (dispatch) => {
    try{
        dispatch({
            type:LOGIN_USER_REQUEST,
            loading:true
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(userLoginData);

        const { data } = await axios.post('http://localhost:7000/api/login', userLoginData, config)

        if(data){
            localStorage.setItem('loginuser',JSON.stringify({Success:data?.success}))
            dispatch({
                type:LOGIN_USER_SUCCESS,
                loading:false,
                payload:data,
                success:data?.success,
            })
        }

    }
    catch(err){
        dispatch({
            type:LOGIN_USER_FAIL,
            payload:err.response
        })
    }
}

export const forgotPassword = (userForgotPassword) => async (dispatch) => {
    try{
        dispatch({
            type:FORGOT_PASSWORD_REQUEST,
            loading:true
        })

        console.log(userForgotPassword, "userForgotPassword");
        
        const { data } = await axios.post('http://localhost:7000/api/forgotPassword',userForgotPassword)

        if(data){
            localStorage.setItem('forgotuserpassword',JSON.stringify({Success:data?.success}))
            dispatch({
                type:FORGOT_PASSWORD_SUCCESS,
                loading:false,
                payload:data,
            })
        }
        
    }
    catch(error){
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            loading:false,
            payload:error.response
        })
    }
}

export const resetPassword = (id,token, resetPasswordData) => async (dispatch) => {
    try {

        dispatch({ 
            type: RESET_PASSWORD_REQUEST,
            loading:true
         })

        const { data } = await axios.put(`http://localhost:7000/api/resetPassword/${id}/${token}`, resetPasswordData)
  
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            loading:false,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            loading:false,
            payload: error.response
        })
    }
}

export const getAllUsers = () => async (dispatch) => {
    try{
        dispatch({
            type:ALL_USERS_REQUEST,
            loading:true
        })
        
        const { data } = await axios.get('http://localhost:7000/api/getAllUsers')

        dispatch({
            type:ALL_USERS_SUCCESS,
            loading:false,
            payload:data.users,
        })
    }
    catch(err){
        dispatch({
            type:ALL_USERS_FAIL,
            payload:err.response
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await axios.delete(`http://localhost:7000/api/admin/user/${id}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}