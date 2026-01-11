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

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/bookings/${id}`, { status: "cancelled" });
        if (res.data.modifiedCount > 0) {
          Swal.fire("Cancelled", "Booking has been cancelled.", "success");
          setBookings(bookings.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b)));
        }
      } catch (err) {
        Swal.fire("Error", "Failed to cancel booking.", "error");
      }
    }
  };

  const handlePayment = async (booking) => {
    if (!user?.email) {
      Swal.fire("Login Required", "Please login first.", "warning");
      return;
    }

    const costNumber = Number(booking.price ?? booking.cost);
    if (!costNumber || isNaN(costNumber)) {
      Swal.fire("Invalid Price", "Invalid price for this booking.", "error");
      return;
    }

    const paymentInfo = {
      cost: costNumber,
      serviceName: booking.serviceName || "Unknown Service",
      serviceId: booking._id,
      createdByEmail: user.email,
    };

    try {
      const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
      window.location.href = res.data.url;
    } catch (err) {
      Swal.fire("Payment Error", "Something went wrong.", "error");
    }
  };

  if (loading || fetching) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">My Bookings</h2>
        <p className="text-gray-600">Manage all your booked services</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Yet</h3>
          <p className="text-gray-500 mb-6">You haven't booked any services yet.</p>
          <button
            onClick={() => navigate("/services")}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Browse Services
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow border">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Service</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Location</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Price</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  {/* Service Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={booking.serviceImage || "https://via.placeholder.com/80"}
                        alt={booking.serviceName}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{booking.serviceName}</p>
                        <p className="text-sm text-gray-500">Booking ID: {booking._id.slice(-6)}</p>
                      </div>
                    </div>
                  </td>
                  
                  {/* Date */}
                  <td className="p-4">
                    <div className="text-gray-700">
                      {booking.bookingDate
                        ? new Date(booking.bookingDate).toLocaleDateString("en-BD")
                        : "N/A"}
                    </div>
                  </td>
                  
                  {/* Location */}
                  <td className="p-4">
                    <div className="text-gray-700 max-w-[150px] truncate">
                      {booking.location || "Unknown"}
                    </div>
                  </td>
                  
                  {/* Price */}
                  <td className="p-4">
                    <div className="font-semibold text-green-600">
                      {booking.cost?.toLocaleString("en-BD") ?? 0} BDT
                    </div>
                  </td>
                  
                  {/* Status */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      booking.status === "confirmed" ? "bg-green-100 text-green-800" :
                      booking.status === "cancelled" ? "bg-red-100 text-red-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  
                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handlePayment(booking)}
                        disabled={booking.status === "cancelled" || booking.paymentStatus === "paid"}
                        className={`px-4 py-2 rounded text-sm ${
                          booking.paymentStatus === "paid"
                            ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                            : booking.status === "cancelled"
                            ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                      >
                        {booking.paymentStatus === "paid" ? "Paid" : "Pay Now"}
                      </button>
                      
                      <button
                        onClick={() => handleCancel(booking._id)}
                        disabled={booking.status === "cancelled"}
                        className={`px-4 py-2 rounded text-sm ${
                          booking.status === "cancelled"
                            ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
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

      {/* Summary */}
      {bookings.length > 0 && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4 border">
          <div className="flex flex-wrap gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{bookings.length}</div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {bookings
                  .filter(b => b.paymentStatus === "paid")
                  .reduce((sum, b) => sum + (b.cost || 0), 0)
                  .toLocaleString("en-BD")} BDT
              </div>
              <div className="text-sm text-gray-600">Total Paid</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {bookings.filter(b => b.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;