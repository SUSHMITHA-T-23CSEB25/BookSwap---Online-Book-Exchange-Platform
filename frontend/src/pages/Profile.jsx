import { useEffect, useState } from "react";

import API from "../api/axios";

import Loader from "../components/Loader";

import "../styles/profile.css";



function Profile() {


    const [user,setUser] = useState(null);

    const [loading,setLoading] = useState(true);





    useEffect(()=>{


        fetchProfile();


    },[]);





    const fetchProfile = async()=>{


        try{


            const response = await API.get(

                "/auth/me"

            );



            setUser(

                response.data.user

            );



        }catch(error){


            console.log(error);


        }
        finally{


            setLoading(false);


        }


    };






    if(loading){


        return <Loader/>;


    }






    return (

        <div className="profile-page">


            <h1>

                My Profile

            </h1>





            {

                user

                ?

                <div className="profile-card">








                    <h2>

                        {user.name}

                    </h2>





                    <p>

                        <b>
                            Email:
                        </b>

                        {" "}

                        {user.email}

                    </p>





                    <p>

                        <b>
                            User ID:
                        </b>

                        {" "}

                        {user._id}

                    </p>





                    <p>

                        <b>
                            Joined:
                        </b>

                        {" "}

                        {

                            new Date(

                                user.createdAt

                            ).toLocaleDateString()

                        }


                    </p>



                </div>


                :

                <p>

                    Please login to view profile

                </p>


            }



        </div>

    );

}


export default Profile;