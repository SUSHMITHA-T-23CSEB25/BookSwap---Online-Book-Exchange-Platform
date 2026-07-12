import express from "express";

import {

  register,

  login,

  getMe,

  logout

} from "../controllers/authController.js";


import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();




// Register

router.post(
  "/register",
  register
);




// Login

router.post(
  "/login",
  login
);




// Current user

router.get(
  "/me",
  authMiddleware,
  getMe
);




// Logout

router.post(
  "/logout",
  logout
);



export default router;