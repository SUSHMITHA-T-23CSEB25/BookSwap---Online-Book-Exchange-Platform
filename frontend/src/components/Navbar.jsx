import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/navbar.css";



function Navbar() {


    const { user, logout } = useAuth();


    const navigate = useNavigate();





    const handleLogout = async()=>{


        await logout();


        navigate("/login");


    };






    return (

        <nav className="navbar">



            <div className="logo">


                <Link to="/">

                    📚 BookShare

                </Link>


            </div>






            <ul className="nav-links">



                <li>

                    <Link to="/">

                        Home

                    </Link>

                </li>





                {

                    user

                    ?

                    <>


                        <li>

                            <Link to="/add-book">

                                Add Book

                            </Link>

                        </li>





                        <li>

                            <Link to="/my-books">

                                My Books

                            </Link>

                        </li>





                        <li>

                            <Link to="/requests">

                                Requests

                            </Link>

                        </li>





                        <li>

                            <Link to="/profile">

                                Profile

                            </Link>

                        </li>





                        <li>


                            <button

                                className="logout-btn"

                                onClick={handleLogout}

                            >

                                Logout

                            </button>


                        </li>


                    </>


                    :


                    <>


                        <li>

                            <Link to="/login">

                                Login

                            </Link>

                        </li>





                        <li>

                            <Link to="/register">

                                Register

                            </Link>

                        </li>


                    </>


                }



            </ul>



        </nav>

    );

}


export default Navbar;