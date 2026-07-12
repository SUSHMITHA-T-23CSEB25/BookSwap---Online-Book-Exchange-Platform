import express from "express";


import {

  sendRequest,

  getRequests,

  updateRequest

} from "../controllers/requestController.js";


import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();





// Send book request

router.post(

  "/",

  authMiddleware,

  sendRequest

);





// Get received requests

router.get(

  "/",

  authMiddleware,

  getRequests

);





// Accept / Reject request

router.put(

  "/:id",

  authMiddleware,

  updateRequest

);





export default router;