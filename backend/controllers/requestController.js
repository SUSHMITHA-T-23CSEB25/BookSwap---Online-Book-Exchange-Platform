import Request from "../models/Request.js";
import Book from "../models/Book.js";

// ================= Send Book Request =================

export const sendRequest = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    if (!book.available) {
      return res.status(400).json({
        message: "Book is not available",
      });
    }

    // Prevent owner requesting own book
    if (book.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot request your own book",
      });
    }

    const existingRequest = await Request.findOne({
      book: bookId,
      user: req.user._id,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Request already sent",
      });
    }

    const request = await Request.create({
      book: bookId,
      user: req.user._id,
      owner: book.owner,
    });

    res.status(201).json({
      message: "Request sent successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Get Requests =================

export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      owner: req.user._id,
    })
      .populate("book", "title author image")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Update Request =================

export const updateRequest = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    // Only book owner can update
    if (request.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    request.status = status;

    await request.save();

    // If accepted make book unavailable
    if (status === "accepted") {
      await Book.findByIdAndUpdate(request.book, {
        available: false,
      });
    }

    res.json({
      message: "Request updated",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Delete Request =================

export const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    // Only the book owner can delete the request
    if (request.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not allowed",
      });
    }

    await Request.findByIdAndDelete(req.params.id);

    res.json({
      message: "Request removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};