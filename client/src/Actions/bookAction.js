import {
    GET_BOOK_REQUEST,
    GET_BOOK_SUCCESS,
    GET_BOOK_FAIL,

    DELETE_BOOK_REQUEST,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAIL,
    
    EDIT_BOOK_REQUEST,
    EDIT_BOOK_SUCCESS,
    EDIT_BOOK_FAIL,
        
    EDIT_BOOK_STORE_REQUEST,
    EDIT_BOOK_STORE_SUCCESS,
    EDIT_BOOK_STORE_FAIL
} from '../Constants/bookConstants'

import axios from 'axios'

export const GetBook = () => async (dispatch) => {
    try{
        dispatch({
            type:GET_BOOK_REQUEST,
            loading:true
        })
        const { data } = await axios.get('http://localhost:7000/api/getbooks')
        if(data){
            dispatch({
                type:GET_BOOK_SUCCESS,
                loading:false,
                data:data,
            })
        }
    } catch(err){
        dispatch({
            type:GET_BOOK_FAIL,
            loading:false,
            payload:err.response
        })
    }
}


export const DeleteOneBook = (id) => async (dispatch) => {
    try{
        dispatch({
            type:DELETE_BOOK_REQUEST,
            loading:true
        })
        const { message } = await axios.post('http://localhost:7000/api/deleteOneBook', {id})
        if(message){
            dispatch({
                type:DELETE_BOOK_SUCCESS,
                loading:false,
                message:message,
            })
        }
    } catch(err){
        dispatch({
            type:DELETE_BOOK_FAIL,
            loading:false,
            payload:err.response
        })
    }
}


export const EditBook = (id) => async (dispatch) => {
    try{
        dispatch({
            type: EDIT_BOOK_REQUEST,
            loading:true
        })
        const { message } = await axios.put('http://localhost:7000/api/updateBook', {id})
        if(message){
            dispatch({
                type:EDIT_BOOK_SUCCESS,
                loading:false,
                message:message,
            })
        }
    } catch(err){
        dispatch({
            type:EDIT_BOOK_FAIL,
            loading:false,
            payload:err.response
        })
    }
}


export const EditBookStore = (data) => async (dispatch) => {
    try{
        dispatch({
            type: EDIT_BOOK_STORE_REQUEST,
            loading:true
        })
        if(data){
            dispatch({
                type:EDIT_BOOK_STORE_SUCCESS,
                loading:false,
                data:data,
            })
        }
    } catch(err){
        dispatch({
            type:EDIT_BOOK_STORE_FAIL,
            loading:false,
            payload:err.response
        })
    }
}
