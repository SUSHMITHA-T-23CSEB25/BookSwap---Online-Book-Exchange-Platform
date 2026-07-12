import jwt from "jsonwebtoken";
import User from "../models/User.js";


const authMiddleware = async (req, res, next) => {

  try {

    // Get token from cookies or header
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];


    if (!token) {

      return res.status(401).json({

        message: "No token, authorization denied"

      });

    }



    // Verify token

    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET

    );



    // Find user

    const user = await User.findById(
      decoded.id
    ).select("-password");



    if (!user) {

      return res.status(401).json({

        message: "User not found"

      });

    }



    // Attach user to request

    req.user = user;


    next();



  } catch (error) {


    return res.status(401).json({

      message: "Invalid token"

    });


  }

};



export default authMiddleware;