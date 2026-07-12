import mongoose from "mongoose";


const bookSchema = new mongoose.Schema(

  {

    title: {

      type: String,

      required: true,

      trim: true

    },


    author: {

      type: String,

      required: true,

      trim: true

    },


    category: {

      type: String,

      required: true

    },


    description: {

      type: String,

      default: ""

    },


    image: {

      type: String,

      default: ""

    },


    owner: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true

    },


    available: {

      type: Boolean,

      default: true

    },


    createdAt: {

      type: Date,

      default: Date.now

    }

  }

);



const Book = mongoose.model(
  "Book",
  bookSchema
);


export default Book;