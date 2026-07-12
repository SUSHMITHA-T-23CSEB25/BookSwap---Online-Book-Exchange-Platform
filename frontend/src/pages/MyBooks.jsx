import { useEffect, useState } from "react";

import API from "../api/axios";

import Loader from "../components/Loader";
import BookCard from "../components/BookCard";

import "../styles/home.css";



function MyBooks() {


    const [books,setBooks] = useState([]);

    const [loading,setLoading] = useState(true);





    useEffect(()=>{


        fetchMyBooks();


    },[]);





    const fetchMyBooks = async()=>{


        try{


            const response = await API.get(

                "/books/my-books"

            );


            setBooks(response.data);



        }catch(error){


            console.log(error);


        }
        finally{


            setLoading(false);


        }


    };








    const deleteBook = async(id)=>{


        const confirmDelete = window.confirm(

            "Are you sure you want to delete this book?"

        );



        if(!confirmDelete) return;





        try{


            await API.delete(

                `/books/${id}`

            );



            alert(

                "Book deleted"

            );



            fetchMyBooks();



        }catch(error){


            alert(

                error.response?.data?.message ||

                "Delete failed"

            );


        }


    };








    const updateStatus = async(book)=>{


        try{


            await API.put(

                `/books/${book._id}`,

                {

                    available:
                    !book.available

                }

            );



            fetchMyBooks();



        }catch(error){


            console.log(error);


        }


    };








    if(loading){


        return <Loader/>;


    }







    return (

        <div className="home-page">



            <h1 className="page-title">

                My Books

            </h1>





            <div className="books-container">



                {

                    books.length > 0

                    ?

                    books.map((book)=>(


                        <div key={book._id}>


                            <BookCard

                                book={book}

                            />



                            <div className="book-actions">


                                <button

                                    onClick={()=>
                                        updateStatus(book)
                                    }

                                >

                                    {

                                        book.available

                                        ?

                                        "Mark Unavailable"

                                        :

                                        "Mark Available"

                                    }


                                </button>





                                <button

                                    className="delete-btn"

                                    onClick={()=>
                                        deleteBook(book._id)
                                    }

                                >

                                    Delete

                                </button>



                            </div>



                        </div>


                    ))

                    :

                    <p>

                        You have not added any books.

                    </p>


                }



            </div>



        </div>

    );

}


export default MyBooks;