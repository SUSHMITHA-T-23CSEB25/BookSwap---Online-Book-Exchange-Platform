import { useState } from "react";

import "../styles/home.css";



function SearchBar({ onSearch }) {


    const [search,setSearch] = useState("");





    const handleChange = (e)=>{


        const value = e.target.value;


        setSearch(value);



        onSearch(value);


    };






    return (

        <div className="search-container">


            <input

                type="text"

                placeholder="Search books by title..."

                value={search}

                onChange={handleChange}

                className="search-input"

            />


        </div>

    );

}


export default SearchBar;