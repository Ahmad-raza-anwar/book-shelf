import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditBook, EditBookStore, GetBook } from "../../Actions/bookAction";
import { BiX } from "react-icons/bi";
import { DeleteOneBook } from "../../Actions/bookAction";
import { useNavigate } from "react-router-dom";
export default function Reading() {
  const {books, loading} = useSelector((state) => state.AllBooks);
  const deletData = useSelector((state) => state.deleteItem);
  console.log(deletData, 'deletData');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(GetBook());
  }, [deletData.loading]);
  
  
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
        <h1 className='text-center fs-3'>Reading</h1>
        <div className="row">
    {loading ? <>
      <div className="container d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </> : <>
    
    {books && Array.from(books).every((e) => {
            return e.category !== "Reading" 
            }) ? <>
          <div class="alert alert-danger" role="alert">
            Nothing For Reading
          </div>
          </> :
            books && books.map((e) => {
              if(e.category === "Reading"){
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
  );
}
