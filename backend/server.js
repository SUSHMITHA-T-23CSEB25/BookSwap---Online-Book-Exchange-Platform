import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";


dotenv.config();


const app = express();


// MongoDB Connection
connectDB();


// Middleware

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ]
  })
);


app.use(express.json());


// Read cookies
app.use(cookieParser());



// Routes

app.use(
  "/api/auth",
  authRoutes
);


app.use(
  "/api/books",
  bookRoutes
);


app.use(
  "/api/requests",
  requestRoutes
);



// Test Route

app.get("/", (req, res) => {

  res.send(
    "BookShare Backend Running"
  );

});



// Server

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});