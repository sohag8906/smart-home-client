
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router";

const TopServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/services")
      .then(res => setServices(res.data))
      .catch(err => setError("Failed to load services"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="mt-10 bg-pink-200">
     <div className="mt-10 text-center">
  <h2 className="text-3xl font-extrabold mb-2 mt-2 text-blue-700">
    Our Services
  </h2>
  <p className="text-black max-w-xl mx-auto">
    "Explore our top-notch decoration services for homes, weddings, offices, and events. 
    Choose your favorite package and book your service instantly."
  </p>
</div>
      <div className="grid grid-cols-1 mt-4  md:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service._id} className=" p-4 rounded-xl bg-green-100 shadow hover:shadow-lg transition">
            <img src={service.image} alt={service.serviceName} className="w-full h-40 object-cover rounded-lg mb-3" />
            <h3 className="font-semibold text-lg">{service.serviceName}</h3>
            <p className="text-sm text-gray-500">{service.unit} - BDT {service.price}</p>
            <NavLink to='service'><button className="btn btn-sm btn-primary mt-3 w-full">View Details</button></NavLink>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopServices;
