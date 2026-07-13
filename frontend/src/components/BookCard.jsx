import API from "../api/axios";
import "../styles/home.css";

function BookCard({ book }) {

const handleRequest = async()=>{

    try{

        await API.post(
            "/requests",
            {
                bookId: book._id
            }
        );

        alert("Request sent successfully");

    }catch(error){

        alert(
            error.response?.data?.message ||
            "Request failed"
        );

    }

};


return (

<div className="book-card">

    <img
        src={
            book.image && book.image.trim() !== ""
                ? book.image
                : "https://via.placeholder.com/200x250?text=No+Image"
        }
        alt={book.title}
        className="book-image"
    />


    <div className="book-details">

        <h2>
            {book.title}
        </h2>


        <p>
            <b>Author:</b>
            {book.author}
        </p>


        <p>
            <b>Category:</b>
            {book.category}
        </p>


        <p>
            <b>Owner:</b>
            {book.owner?.name}
        </p>


        <p>
            {
                book.available
                ?
                <span className="available">
                    Available
                </span>
                :
                <span className="unavailable">
                    Not Available
                </span>
            }
        </p>


        <div className="book-actions">

            {
                book.available &&
                <button onClick={handleRequest}>
                    Request Book
                </button>
            }

        </div>


    </div>

</div>

);

}

export default BookCard;