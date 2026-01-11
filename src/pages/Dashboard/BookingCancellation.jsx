import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookingCancellation = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchCancelled = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/bookings/${encodeURIComponent(user.email)}`);
        // Filter cancelled bookings
        const cancelled = res.data.filter(b => b.status === "cancelled");
        setCancelledBookings(cancelled);
      } catch (err) {
        console.error(err);
        setCancelledBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCancelled();
  }, [user?.email, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Cancelled Bookings</h2>

      {cancelledBookings.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded border">
          <p className="text-gray-500">No cancelled bookings found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Service</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Location</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Price</th>
              </tr>
            </thead>
            <tbody>
              {cancelledBookings.map((booking) => (
                <tr key={booking._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-gray-800">{booking.serviceName}</td>
                  <td className="p-3 text-gray-600">
                    {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString("en-BD") : "N/A"}
                  </td>
                  <td className="p-3 text-gray-600">{booking.location}</td>
                  <td className="p-3 text-gray-800 font-medium">
                    {booking.cost?.toLocaleString("en-BD") ?? 0} BDT
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

export default BookingCancellation;