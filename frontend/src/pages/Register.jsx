import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios";

import "../styles/auth.css";


function Register() {


  const navigate = useNavigate();



  const [formData,setFormData] = useState({

    name:"",

    email:"",

    password:""

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

        "/auth/register",

        formData

      );



      alert(
        "Registration successful"
      );



      navigate("/login");



    }catch(error){



      alert(

        error.response?.data?.message ||

        "Registration failed"

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
          Create Account
        </h2>





        <input

          type="text"

          name="name"

          placeholder="Enter name"

          value={formData.name}

          onChange={handleChange}

          required

        />





        <input

          type="email"

          name="email"

          placeholder="Enter email"

          value={formData.email}

          onChange={handleChange}

          required

        />





        <input

          type="password"

          name="password"

          placeholder="Create password"

          value={formData.password}

          onChange={handleChange}

          required

        />





        <button

          type="submit"

          disabled={loading}

        >


          {

            loading

            ?

            "Creating..."

            :

            "Register"

          }


        </button>





        <p>

          Already have an account?


          <Link to="/login">

            Login

          </Link>


        </p>



      </form>


    </div>

  );

}


export default Register;