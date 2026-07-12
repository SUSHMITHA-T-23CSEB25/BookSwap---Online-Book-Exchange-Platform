import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import "../styles/auth.css";


function AddBook() {


  const navigate = useNavigate();



  const [formData,setFormData] = useState({

    title:"",

    author:"",

    category:"",

    description:"",

    image:""

  });



  const [loading,setLoading] = useState(false);





  const handleChange = (e)=>{


    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });


  };





  const handleSubmit = async(e)=>{


    e.preventDefault();


    try{


      setLoading(true);



      await API.post(

        "/books",

        formData

      );



      alert(
        "Book added successfully"
      );



      navigate("/my-books");



    }catch(error){



      alert(

        error.response?.data?.message ||

        "Failed to add book"

      );


    }finally{


      setLoading(false);


    }


  };






  return (

    <div className="auth-container">


      <form

        className="auth-form"

        onSubmit={handleSubmit}

      >



        <h2>
          Add New Book
        </h2>





        <input

          type="text"

          name="title"

          placeholder="Book title"

          value={formData.title}

          onChange={handleChange}

          required

        />





        <input

          type="text"

          name="author"

          placeholder="Author name"

          value={formData.author}

          onChange={handleChange}

          required

        />





        <input

          type="text"

          name="category"

          placeholder="Category"

          value={formData.category}

          onChange={handleChange}

          required

        />





        <input

          type="text"

          name="image"

          placeholder="Book image URL"

          value={formData.image}

          onChange={handleChange}

        />





        <textarea

          name="description"

          placeholder="Book description"

          rows="4"

          value={formData.description}

          onChange={handleChange}

        />





        <button

          type="submit"

          disabled={loading}

        >


          {

            loading

            ?

            "Adding..."

            :

            "Add Book"

          }


        </button>



      </form>


    </div>

  );

}


export default AddBook;