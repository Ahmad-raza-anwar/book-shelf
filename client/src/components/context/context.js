import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext()

const Context = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });


    const navigate = useNavigate()

    const [data,setData] = useState({
        Author:"",
        Book:""
      })
    const [localData, setLocalData] = useState([])
    const [operator,setOperator] = useState(false)
    const [idx,setIdx] = useState()

    const handleUpdate = (e,index) => {
        setOperator(true)
        const updatingData = localData.filter((e  ,idx)=>{
            return index == idx
        })
        setData({
            Author:updatingData[0].Author,
            Book:updatingData[0].Book
        })
        setIdx(e._id)
        navigate('/form')
    }




    //default axios
    axios.defaults.headers.common["Authorization"] = `bearer ${auth?.token}`;
    
    useEffect(() => {
        const data = localStorage.getItem("user");
        if (data) {
          const parseData = JSON.parse(data);
          setAuth({
            ...auth,
            user: parseData.loginUser,
            token: parseData.token,
          });
        }
      }, []);

  return (
    <AuthContext.Provider value={{auth,setAuth, idx,localData,setLocalData,handleUpdate,data,setData,operator,setOperator}}>
        {children}
    </AuthContext.Provider>
  )
}

const useGlobalContext = () => useContext(AuthContext)

export {Context,useGlobalContext}
