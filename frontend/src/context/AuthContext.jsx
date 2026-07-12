import { createContext, useContext, useEffect, useState } from "react";

import API from "../api/axios";


const AuthContext = createContext();



export const AuthProvider = ({ children }) => {


  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);




  // Check logged in user when app starts

  useEffect(() => {

    checkUser();

  }, []);





  const checkUser = async () => {

    try {


      const response = await API.get(
        "/auth/me"
      );


      setUser(
        response.data.user
      );


    } catch(error) {


      setUser(null);


    } finally {


      setLoading(false);


    }

  };





  const login = (userData) => {


    setUser(userData);


  };





  const logout = async () => {


    try {

      await API.post(
        "/auth/logout"
      );


    } catch(error) {


      console.log(error);


    }


    setUser(null);

  };





  return (

    <AuthContext.Provider

      value={{

        user,

        login,

        logout,

        loading

      }}

    >

      {children}

    </AuthContext.Provider>

  );

};





export const useAuth = () => {

  return useContext(AuthContext);

};