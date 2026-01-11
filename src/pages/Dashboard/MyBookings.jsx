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
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      setFetching(true);
      try {
        const res = await axiosSecure.get(
          `/bookings/${encodeURIComponent(user.email)}`
        );
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setBookings([]);
      } finally {
        setFetching(false);
      }
    };

    fetchBookings();
  }, [user?.email, axiosSecure]);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.patch(`/bookings/${id}`, {
        status: "cancelled",
      });
      if (res.data.modifiedCount > 0) {
        setBookings(
          bookings.map((b) =>
            b._id === id ? { ...b, status: "cancelled" } : b
          )
        );
      }
    }
  };

  const handlePayment = async (booking) => {
    const paymentInfo = {
      cost: booking.cost,
      serviceName: booking.serviceName,
      serviceId: booking._id,
      createdByEmail: user.email,
    };
    const res = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo
    );
    window.location.href = res.data.url;
  };

  if (loading || fetching) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">My Bookings</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage all your booked services
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-2">No Bookings Yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            You haven't booked any services yet.
          </p>
          <button
            onClick={() => navigate("/services")}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            Browse Services
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow border dark:border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
              <tr>
                {["Service", "Date", "Location", "Price", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="p-4 text-left text-sm font-medium"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={booking.serviceImage}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">
                          {booking.serviceName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ID: {booking._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    {new Date(
                      booking.bookingDate
                    ).toLocaleDateString("en-BD")}
                  </td>

                  <td className="p-4">{booking.location}</td>

                  <td className="p-4 font-semibold text-green-600">
                    {booking.cost} BDT
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : booking.status === "confirmed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handlePayment(booking)}
                        disabled={
                          booking.paymentStatus === "paid" ||
                          booking.status === "cancelled"
                        }
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded"
                      >
                        {booking.paymentStatus === "paid"
                          ? "Paid"
                          : "Pay Now"}
                      </button>

                      <button
                        onClick={() => handleCancel(booking._id)}
                        disabled={booking.status === "cancelled"}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded"
                      >
                        Cancel
                      </button>
                    </div>
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
