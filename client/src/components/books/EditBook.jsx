import React, { useEffect, useRef, useState } from 'react'
import Navbar from "../basic/navbar";
import { useSelector } from 'react-redux'
import { Container } from "react-bootstrap";
import axios from 'axios'
import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
export default function EditBook() {

  const {data} = useSelector(state => state.storeEditItem)
  console.log(data, "data from Edit");


  const navigate = useNavigate()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      Publication_date: data.Publication_date,
      Publication_house: data.Publication_house,
      Publication_year: data.Publication_year,
      authorName: data.authorName,
      bookName: data.bookName,
      category: data.category,
      genre: data.genre,
      id: data._id,
    }
  });
  const [Obj, setObj] = useState("");

  const {idx,operator,setOperator} = useGlobalContext()
  const [displayProperty1,setDisplayProperty1] = useState('none')
  const [successfull,setSuccessfull] = useState()

  useEffect(() => {
    if(Obj){
      finalSubmit()
    }
  },[Obj])


  const finalSubmit = (e) => {
  console.log("Chal rha ha" );
    if(!operator){
      axios.put('http://localhost:7000/api/updateBook',JSON.parse(Obj)).then(res=>{
              setSuccessfull(res.message)
              setDisplayProperty1('block')
              setTimeout(() => {
                setDisplayProperty1('none')
                navigate('/user')
              }, 1500);
        
      })
    }
    else{
      if(Obj.Author && Obj.Book){
        axios.put('http://localhost:4001/updateOne',{id:idx,Obj})
        setSuccessfull('Data is updated successfully')
        setDisplayProperty1('block')
        setTimeout(() => {
          setDisplayProperty1('none')
          navigate('/user')
        }, 1500);
        setOperator(false)
      }
    }
  }

  return (
    <>
    
    <Navbar/>
        <Container className="bg-light p-3 rounded">
        <form onSubmit={handleSubmit((Obj) => setObj(JSON.stringify(Obj)))}>
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
