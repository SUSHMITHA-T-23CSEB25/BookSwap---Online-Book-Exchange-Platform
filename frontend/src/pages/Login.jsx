import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

import "../styles/auth.css";


function Login() {


    const navigate = useNavigate();

    const { login } = useAuth();



    const [formData,setFormData] = useState({

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



            console.log("Sending data:",formData);



            const response = await API.post(

                "/auth/login",

                formData

            );



            console.log(
                "Login response:",
                response.data
            );




            login(
                response.data.user
            );



            alert(
                "Login successful"
            );



            navigate("/");




        }
        catch(error){



            console.log(
                "Login Error:",
                error
            );



            alert(

                error.response?.data?.message ||

                "Login failed"

            );


        }
        finally{


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
                    Login
                </h2>



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

                    placeholder="Enter password"

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

                        "Logging in..."

                        :

                        "Login"

                    }


                </button>





                <p>

                    Don't have an account?


                    <Link to="/register">

                        Register

                    </Link>


                </p>



            </form>


        </div>

    );

}


export default Login;