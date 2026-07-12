import mongoose from "mongoose";


const requestSchema = new mongoose.Schema(

  {

    book: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "Book",

      required: true

    },


    user: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true

    },


    owner: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true

    },


    status: {

      type: String,

      enum: [
        "pending",
        "accepted",
        "rejected"
      ],

      default: "pending"

    },


    createdAt: {

      type: Date,

      default: Date.now

    }


  }

);



const Request = mongoose.model(
  "Request",
  requestSchema
);


export default Request;