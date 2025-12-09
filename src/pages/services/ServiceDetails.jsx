import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";

const ServiceDetails = () => {
  const { id } = useParams(); // service id from route
  const { user } = useAuth();

  const [service, setService] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [location, setLocation] = useState("");

  // Load service details from backend
  useEffect(() => {
    fetch(`http://localhost:3000/services/${id}`)
      .then(res => res.json())
      .then(data => setService(data));
  }, [id]);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!user) return alert("You need to login first!");

    const booking = {
      serviceId: service._id,
      serviceName: service.serviceName,
      price: service.price,
      unit: service.unit,
      userName: user.displayName,
      userEmail: user.email,
      bookingDate,
      location
    };

    fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    })
      .then(res => res.json())
      .then(data => {
        alert("Booking Successful!");
        setBookingDate("");
        setLocation("");
      });
  };

  if (!service) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-secondary mb-4">{service.serviceName}</h2>
      <img
        src={service.image}
        alt={service.serviceName}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="mb-2"><strong>Type:</strong> {service.type}</p>
      <p className="mb-2"><strong>Price:</strong> {service.price} BDT ({service.unit})</p>
      <p className="mb-4">{service.description}</p>

      {user ? (
        <form onSubmit={handleBooking} className="bg-base-100 p-4 rounded shadow-md">
          <h3 className="text-xl font-bold mb-3">Book This Service</h3>
          <input
            type="text"
            placeholder="Name"
            value={user.displayName}
            disabled
            className="input input-bordered w-full mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            disabled
            className="input input-bordered w-full mb-2"
          />
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="input input-bordered w-full mb-2"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input input-bordered w-full mb-2"
            required
          />
          <button type="submit" className="btn btn-primary w-full">Book Now</button>
        </form>
      ) : (
        <p className="text-red-500">You must login to book this service.</p>
      )}
    </div>
  );
};

export default ServiceDetails;
