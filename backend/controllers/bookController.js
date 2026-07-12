import Book from "../models/Book.js";



// ================= Add Book =================

export const addBook = async (req, res) => {

  try {


    const {

      title,

      author,

      category,

      description,

      image


    } = req.body;



    const book = await Book.create({

      title,

      author,

      category,

      description,

      image,

      owner: req.user._id

    });



    res.status(201).json({

      message:"Book added successfully",

      book

    });



  } catch(error) {


    res.status(500).json({

      message:error.message

    });


  }

};





// ================= Get All Books =================

export const getBooks = async(req,res)=>{


  try{


    const books = await Book.find()

      .populate(
        "owner",
        "name email"
      )

      .sort({
        createdAt:-1
      });



    res.json(books);



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};






// ================= Get My Books =================

export const getMyBooks = async(req,res)=>{


  try{


    const books = await Book.find({

      owner:req.user._id

    });



    res.json(books);



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};






// ================= Delete Book =================

export const deleteBook = async(req,res)=>{


  try{


    const book = await Book.findById(
      req.params.id
    );



    if(!book){

      return res.status(404).json({

        message:"Book not found"

      });

    }




    // Only owner can delete

    if(
      book.owner.toString()
      !==
      req.user._id.toString()
    ){

      return res.status(403).json({

        message:"Not allowed"

      });

    }




    await book.deleteOne();



    res.json({

      message:"Book deleted"

    });



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};






// ================= Update Availability =================

export const updateBookStatus = async(req,res)=>{


  try{


    const book = await Book.findById(

      req.params.id

    );



    if(!book){

      return res.status(404).json({

        message:"Book not found"

      });

    }




    book.available = req.body.available;



    await book.save();



    res.json({

      message:"Book status updated",

      book

    });



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};