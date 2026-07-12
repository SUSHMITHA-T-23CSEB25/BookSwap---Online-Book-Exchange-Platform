import express from "express";


import {

  addBook,

  getBooks,

  getMyBooks,

  deleteBook,

  updateBookStatus

} from "../controllers/bookController.js";


import authMiddleware from "../middleware/authMiddleware.js";



const router = express.Router();





// Get all books

router.get(

  "/",

  getBooks

);





// Add new book

router.post(

  "/",

  authMiddleware,

  addBook

);





// Get logged in user's books

router.get(

  "/my-books",

  authMiddleware,

  getMyBooks

);





// Delete book

router.delete(

  "/:id",

  authMiddleware,

  deleteBook

);





// Update book availability

router.put(

  "/:id",

  authMiddleware,

  updateBookStatus

);





export default router;