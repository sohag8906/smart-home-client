import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      setFetching(true);
      try {
        const res = await axiosSecure.get(`/bookings/${encodeURIComponent(user.email)}`);
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookings([]);
      } finally {
        setFetching(false);
      }
    };

    fetchBookings();
  }, [user?.email, axiosSecure]);

  // Cancel booking
  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this booking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/bookings/${id}`, { status: "cancelled" });
        if (res.data.modifiedCount > 0) {
          Swal.fire('Cancelled!', 'Booking has been cancelled.', 'success');
          setBookings(bookings.map(b => b._id === id ? { ...b, status: "cancelled" } : b));
        } else {
          Swal.fire('Failed!', 'Failed to cancel booking.', 'error');
        }
      } catch (err) {
        console.error(err);
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    }
  };

  const handleUpdate = (id) => {
    Swal.fire('Update', `Update booking ${id} functionality here.`, 'info');
  };

  const handlePay = (id) => {
    Swal.fire('Pay', `Pay for booking ${id} functionality here.`, 'info');
  };

  if (loading || fetching) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center">You have no bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr className="text-center">
                <th>Image</th>
                <th>Service Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="text-center">
                  <td>
                    <img
                      src={booking.serviceImage || "https://via.placeholder.com/100"}
                      alt={booking.serviceName || "Service"}
                      className="w-24 h-24 object-cover mx-auto rounded-md"
                    />
                  </td>
                  <td>{booking.serviceName || "Unknown Service"}</td>
                  <td>
                    {booking.bookingDate
                      ? new Date(booking.bookingDate).toLocaleDateString("en-BD", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "No date"}
                  </td>
                  <td>{booking.location || "Unknown Location"}</td>
                  <td>{(booking.cost ?? 0).toLocaleString("en-BD")} BDT</td>
                  <td className="capitalize">{booking.status}</td>
                  <td className="flex justify-center gap-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleUpdate(booking._id)}
                      disabled={booking.status === "cancelled"}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleCancel(booking._id)}
                      disabled={booking.status === "cancelled"}
                    >
                      Cancel
                    </button>
                    
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handlePay(booking._id)}
                      disabled={booking.status === "cancelled"}
                    >
                  
                      Pay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
