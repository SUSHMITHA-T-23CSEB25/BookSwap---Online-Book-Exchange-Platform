import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";



import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";
import MyBooks from "./pages/MyBooks";
import Requests from "./pages/Requests";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";



function App() {


  return (

    <BrowserRouter>


      <Navbar />



      <main>


        <Routes>


          {/* Public Routes */}

          <Route

            path="/"

            element={<Home />}

          />



          <Route

            path="/login"

            element={<Login />}

          />



          <Route

            path="/register"

            element={<Register />}

          />





          {/* Protected Routes */}



          <Route

            path="/add-book"

            element={

              <ProtectedRoute>

                <AddBook />

              </ProtectedRoute>

            }

          />





          <Route

            path="/my-books"

            element={

              <ProtectedRoute>

                <MyBooks />

              </ProtectedRoute>

            }

          />





          <Route

            path="/requests"

            element={

              <ProtectedRoute>

                <Requests />

              </ProtectedRoute>

            }

          />





          <Route

            path="/profile"

            element={

              <ProtectedRoute>

                <Profile />

              </ProtectedRoute>

            }

          />





          {/* 404 Page */}

          <Route

            path="*"

            element={<NotFound />}

          />



        </Routes>


      </main>




      <Footer />


    </BrowserRouter>

  );

}


export default App;