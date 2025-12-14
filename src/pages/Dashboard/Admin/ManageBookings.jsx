// src/pages/Dashboard/Admin/ManageBookings.jsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all bookings (admin) or user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        let res;
        if (user?.email) {
          // Admin sees all, user sees only their own
          res = await axiosSecure.get("/bookings"); // admin route
        } else {
          res = await axiosSecure.get(`/bookings/${user.email}`); // user route
        }

        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setBookings([]);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, axiosSecure]);

  // Update booking status
  const handleUpdateStatus = (id, newStatus) => {
    Swal.fire({
      title: `Change status to "${newStatus}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/bookings/${id}`, { status: newStatus });

          // Update UI
          setBookings((prev) =>
            prev.map((b) =>
              b._id === id ? { ...b, status: newStatus } : b
            )
          );

          Swal.fire("Success", "Booking status updated", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to update status", "error");
        }
      }
    });
  };

  if (loading) return <p>Loading bookings...</p>;
  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Bookings</h1>

      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Service</th>
            <th>Date</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking._id}>
              <td>{index + 1}</td>
              <td>{booking.userName}</td>
              <td>{booking.userEmail}</td>
              <td>{booking.serviceName}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.location}</td>
              <td className="capitalize">{booking.status}</td>
              <td className="flex gap-2">
                {booking.status !== "approved" && (
                  <button
                    onClick={() => handleUpdateStatus(booking._id, "approved")}
                    className="btn btn-sm btn-success"
                  >
                    Approve
                  </button>
                )}
                {booking.status !== "cancelled" && (
                  <button
                    onClick={() => handleUpdateStatus(booking._id, "cancelled")}
                    className="btn btn-sm btn-error"
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
