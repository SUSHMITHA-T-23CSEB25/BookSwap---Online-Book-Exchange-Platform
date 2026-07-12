import { useEffect, useState } from "react";

import API from "../api/axios";

import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

import "../styles/home.css";


function Home() {


    const [books,setBooks] = useState([]);

    const [filteredBooks,setFilteredBooks] = useState([]);

    const [loading,setLoading] = useState(true);




    useEffect(()=>{

        fetchBooks();

    },[]);





    const fetchBooks = async()=>{


        try{


            const response = await API.get(
                "/books"
            );


            setBooks(response.data);

            setFilteredBooks(response.data);



        }catch(error){


            console.log(error);


        }
        finally{


            setLoading(false);


        }


    };





    const handleSearch = (value)=>{


        const result = books.filter((book)=>

            book.title
            .toLowerCase()
            .includes(value.toLowerCase())

        );


        setFilteredBooks(result);


    };






    if(loading){

        return <Loader/>;

    }





    return (

        <div className="home-page">


            <section className="hero">

                <h1>
                    Welcome to BookShare 📚
                </h1>


                <p>
                    Share books and discover new ones
                </p>


            </section>





            <SearchBar

                onSearch={handleSearch}

            />





            <h2 className="page-title">

                Available Books

            </h2>





            <div className="books-container">


                {

                    filteredBooks.length > 0

                    ?

                    filteredBooks.map((book)=>(


                        <BookCard

                            key={book._id}

                            book={book}

                        />


                    ))

                    :

                    <p>
                        No books found
                    </p>

                }


            </div>



        </div>

    );

}


export default Home;