import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOneBook, EditBookStore, GetBook } from '../../Actions/bookAction';
import { useNavigate } from 'react-router-dom';
import { BiX } from 'react-icons/bi';
export default function PlanToRead() {

  const {books, loading} = useSelector((state) => state.AllBooks);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(GetBook());
  }, []);

  const deleteItem = (id) => {
    dispatch(DeleteOneBook(id));
    dispatch(GetBook());
  }
    
  const editItem = (e) => {
    dispatch(EditBookStore(e));
    navigate('/editbook')
  }

  return (
    <>
    
    <div className="container mt-5">
        <h1 className='text-center fs-3'>PlanToRead</h1>
        <div className="row">
        {loading ? <>
      <div className="container d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </> : <>
    
    {books && Array.from(books).every((e) => {
            return e.category !== "PlantoRead" 
            }) ? <>
          <div class="alert alert-danger" role="alert">
            Nothing For PlanToRead
          </div>
          </> :
            books && books.map((e) => {
              if(e.category === "PlantoRead"){
                return (
                  <>
                    <div className="col-4">
                      <div class="card" style={{ width: "100%" }}>
                      <BiX onClick={() => deleteItem(e._id)} className="fs-3 position-absolute top-0 end-0" style={{cursor: 'pointer'}} />
                        <span class="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-success">
                          {e.category}
                        </span>
                        <div class="card-body">
                          <h4 class="card-title">{e.bookName}</h4>
                          <h6 class="card-title">{e.authorName}</h6>
                          <p class="card-text m-0">
                            Publication_house: {e.Publication_house}
                          </p>
                          <p class="card-text m-0">
                            Publication_date: {e.Publication_date}
                          </p>
                          <p class="card-text m-0">
                            Publication_year: {e.Publication_year}
                          </p>
                          <button className="btn btn-light" onClick={() => editItem(e)}>Edit</button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            })
          }
    
    </>}
        </div>
      </div>

    </>
  )
}
