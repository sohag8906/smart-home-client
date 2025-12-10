import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [service, setService] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch service details
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch service:", err);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user?.email || !user?.displayName) {
      alert("Please login first!");
      return;
    }

    if (!bookingDate || !location) {
      alert("Please provide booking date and location.");
      return;
    }

    const booking = {
      serviceId: service._id,
      serviceName: service.serviceName || "Unknown Service",
      serviceImage: service.image || "",
      cost: service.price || 0,
      unit: service.unit || "N/A",
      userName: user.displayName,
      userEmail: user.email,
      bookingDate,
      location,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      const data = await res.json();

      if (data.insertedId) {
        setMessage("Booking Successful!");
        setBookingDate("");
        setLocation("");
      } else {
        setMessage(data.message || "Failed to book!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error while booking.");
    }
  };

  if (loading) return <p>Loading service details...</p>;
  if (!service) return <p>Service not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{service.serviceName || "Unnamed Service"}</h2>
      <img
        src={service.image || "https://via.placeholder.com/600x300"}
        alt={service.serviceName || "Service Image"}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <p><strong>Type:</strong> {service.type || "N/A"}</p>
      <p><strong>Price:</strong> {service.price?.toLocaleString("en-BD") || 0} BDT ({service.unit || "N/A"})</p>
      <p className="mb-4">{service.description || "No description available."}</p>

      {user ? (
        <form onSubmit={handleBooking} className="bg-gray-100 p-4 rounded">
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
            className="mb-2 p-2 w-full border rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="mb-2 p-2 w-full border rounded"
          />
          <button type="submit" className="btn btn-primary w-full mt-2">
            Book Now
          </button>
          {message && <p className="mt-2 text-center text-green-600">{message}</p>}
        </form>
      ) : (
        <p className="text-center text-red-500">Please login to book this service.</p>
      )}
    </div>
  );
};

export default ServiceDetails;
