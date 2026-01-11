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

          // Show notification with status
          Swal.fire(
            newStatus === "approved" ? "Approved ✅" : "Cancelled ❌",
            `Booking has been ${newStatus}`,
            "success"
          );
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to update status", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-300 py-10">
        No bookings found.
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
        Manage Bookings
        <span className="bg-purple-600 text-white text-sm px-2 py-1 rounded-full">
          {bookings.length}
        </span>
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">User Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking._id}
                className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3 text-gray-800 dark:text-gray-100">{booking.userName}</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">{booking.userEmail}</td>
                <td className="p-3 text-gray-800 dark:text-gray-100">{booking.serviceName}</td>
                <td className="p-3 text-gray-800 dark:text-gray-100">{booking.bookingDate}</td>
                <td className="p-3 text-gray-800 dark:text-gray-100">{booking.location}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      booking.status === "approved"
                        ? "bg-green-500 dark:bg-green-600"
                        : booking.status === "cancelled"
                        ? "bg-red-500 dark:bg-red-600"
                        : "bg-gray-400 dark:bg-gray-600"
                    }`}
                  >
                    {booking.status === "approved"
                      ? "Approved"
                      : booking.status === "cancelled"
                      ? "Cancelled"
                      : "Pending"}
                  </span>
                </td>
                <td className="p-3 flex gap-2 flex-wrap">
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
    </div>
  );
};

export default ManageBookings;
