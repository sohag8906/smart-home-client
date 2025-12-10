import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";


const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ এখানে useEffect দিবে
  useEffect(() => {
    if (!user?.email) return;
    console.log("Fetching bookings for:", user.email);

    fetch(`http://localhost:3000/bookings/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Bookings fetched:", data);
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setBookings([]);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="text-center">
                  <td>
                    <img
                      src={
                        booking.serviceImage ??
                        booking.service?.image ??
                        "https://via.placeholder.com/100"
                      }
                      alt={booking.serviceName ?? booking.service?.name ?? "Service"}
                      className="w-24 h-24 object-cover mx-auto rounded-md"
                    />
                  </td>
                  <td>{booking.serviceName ?? booking.service?.name ?? "Unknown Service"}</td>
                  <td>
                    {booking.bookingDate
                      ? new Date(booking.bookingDate).toLocaleDateString("en-BD", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "No date"}
                  </td>
                  <td>{booking.bookingLocation ?? booking.location ?? "Unknown Location"}</td>
                  <td>
                    {booking.price ?? booking.cost ?? booking.service?.price
                      ? (booking.price ?? booking.cost ?? booking.service?.price).toLocaleString(
                          "en-BD"
                        )
                      : "0"}{" "}
                    BDT
                  </td>
                  <td className="flex justify-center gap-2">
                    <button className="btn btn-sm btn-warning">Update</button>
                    <button className="btn btn-sm btn-error">Cancel</button>
                    <button className="btn btn-sm btn-primary">Pay</button>
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
