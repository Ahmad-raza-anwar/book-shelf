import React, { useEffect, useRef, useState } from "react";
import Navbar from "../basic/navbar";
import { Container,Form,Button } from "react-bootstrap";
import axios from 'axios'
import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const Addnew = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");


  const {idx,operator,setOperator} = useGlobalContext()
  const [displayProperty1,setDisplayProperty1] = useState('none')
  const [successfull,setSuccessfull] = useState()
  const form = useRef()

  useEffect(() => {
    if(data){
      finalSubmit()
    }
  },[data])


  const finalSubmit = (e) => {
   
    if(!operator){
      axios.post('http://localhost:7000/api/addbook',JSON.parse(data)).then(res=>{
        if(res.data.err === 'Already Exists'){
          setSuccessfull('Data is already exists')
          setDisplayProperty1('block')
          setTimeout(() => {
            setDisplayProperty1('none')
          }, 1500);
        }
        else{
              setSuccessfull('Data is stored successfully')
              setDisplayProperty1('block')
              setTimeout(() => {
                setDisplayProperty1('none')
                navigate('/user')
              }, 1500);
        }
      })
    }
    else{
      if(data.Author && data.Book){
        axios.put('http://localhost:4001/updateOne',{id:idx,data})
        setSuccessfull('Data is updated successfully')
        setDisplayProperty1('block')
        setTimeout(() => {
          setDisplayProperty1('none')
          navigate('/user')
        }, 1500);
        form.current.reset()
        setOperator(false)
      }
    }
  }
  return(
    <>
        <Navbar/>
        <Container className="bg-light p-3 rounded">
        <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
      <input className="form-control m-2" {...register("bookName", { required: true })} placeholder="Book Name" />
      <input className="form-control m-2" {...register("authorName", { required: true })} placeholder="Author Name" />
      <input className="form-control m-2" {...register("Publication_house", { required: true })} placeholder="Publication_house" />
      <input className="form-control m-2" {...register("Publication_date", { required: true })} placeholder="Publication_date" />
      <input className="form-control m-2" {...register("Publication_year", { required: true })} placeholder="Publication_year" />
      <input className="form-control m-2" {...register("genre", { required: true })} placeholder="genre" />
      <select className="form-select m-2" {...register("category", { required: true })}>
        <option value="Reading">Reading</option>
        <option value="Completed">Completed</option>
        <option value="PlantoRead">Plan to Read</option>
      </select>
      <p className={`m-2 text-success d-${displayProperty1}`}>{successfull}</p>
      <input className="btn btn-primary m-2" type="submit" />
    </form>
        </Container>
    </>
  )
}

export default Addnew