import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";


const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/bookings?email=${user.email}`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
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
              <tr>
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
                      src={booking.serviceImage}
                      alt={booking.serviceName}
                      className="w-24 h-24 object-cover mx-auto rounded-md"
                    />
                  </td>
                  <td>{booking.serviceName}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.bookingLocation}</td>
                  <td>${booking.price}</td>
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
