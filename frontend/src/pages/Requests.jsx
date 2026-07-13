import { useEffect, useState } from "react";
import API from "../api/axios";
import Loader from "../components/Loader";
import "../styles/profile.css";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await API.get("/requests");
      setRequests(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateRequest = async (id, status) => {
    try {
      await API.put(`/requests/${id}`, {
        status,
      });

      alert(`Request ${status}`);

      fetchRequests();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const deleteRequest = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this request?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/requests/${id}`);

      alert("Request removed successfully");

      fetchRequests();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="profile-page">
      <h1>Book Requests</h1>

      {requests.length > 0 ? (
        requests.map((request) => (
          <div className="request-card" key={request._id}>
            <h3>{request.book?.title}</h3>

            <p>
              Requested by: <b>{request.user?.name}</b>
            </p>

            <p>Email: {request.user?.email}</p>

            <p>
              Status: <b>{request.status}</b>
            </p>

            {request.status === "pending" ? (
              <div>
                <button
                  className="accept-btn"
                  onClick={() =>
                    updateRequest(request._id, "accepted")
                  }
                >
                  Accept
                </button>

                <button
                  className="reject-btn"
                  onClick={() =>
                    updateRequest(request._id, "rejected")
                  }
                >
                  Reject
                </button>
              </div>
            ) : (
              <button
                className="remove-btn"
                onClick={() => deleteRequest(request._id)}
              >
                Remove
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No requests available</p>
      )}
    </div>
  );
}

export default Requests;