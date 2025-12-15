import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // react-router-dom ব্যবহার করা উচিত

const Services = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Load services from backend
  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Failed to fetch services:", err));
  }, []);

  // Filter logic
  const filteredServices = services.filter((service) => {
    const serviceName = service?.serviceName || "";
    const serviceType = service?.type || "";
    const servicePrice = service?.price || 0;

    const matchName = serviceName.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType ? serviceType === filterType : true;
    const matchMin = minPrice !== "" ? servicePrice >= Number(minPrice) : true;
    const matchMax = maxPrice !== "" ? servicePrice <= Number(maxPrice) : true;

    return matchName && matchType && matchMin && matchMax;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search + Filter */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full"
        />

        <select
          className="select select-bordered"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="home">Home Decoration</option>
          <option value="wedding">Wedding Decoration</option>
          <option value="event">Event Decoration</option>
          <option value="office">Office Decoration</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          className="input input-bordered"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="input input-bordered"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
        {filteredServices.map((service) => (
          <div key={service._id} className="card bg-pink-100 shadow-xl">
            <figure>
              <img
                src={service?.image || "https://via.placeholder.com/400x200"}
                alt={service?.serviceName || "Service Image"}
                className="h-60 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title mt-4">{service?.serviceName || "Unnamed Service"}</h2>
              <p>Type: {service?.type || "N/A"}</p>
              <p className="font-bold text-primary">
                Price: {service?.price?.toLocaleString("en-BD") || 0} BDT ({service?.unit || "N/A"})
              </p>

              <div className="card-actions justify-end">
                <Link
                  to={`/services/${service?._id}`} // Dynamic id
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <p className="text-center text-lg mt-10">No services found 😔</p>
      )}
    </div>
  );
};

export default Services;
