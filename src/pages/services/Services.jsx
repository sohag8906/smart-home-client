import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { motion } from "framer-motion";

const Services = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);

  // Load services from backend
  useEffect(() => {
    setLoading(true);
    fetch("https://smart-home-server-five.vercel.app/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch services:", err);
        setLoading(false);
      });
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

  // Service type colors
  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "home":
        return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-500";
      case "wedding":
        return "bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-900/30 dark:text-pink-400 dark:border-pink-500";
      case "event":
        return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-500";
      case "office":
        return "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-500";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800/30 dark:text-gray-300 dark:border-gray-700";
    }
  };

  const resetFilters = () => {
    setSearch("");
    setFilterType("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 py-4 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
<div className="text-center mb-12">
  <h2 className="text-4xl md:text-5xl font-bold mb-4">
    <span className="text-gray-900 dark:text-white animate-fade-in">Our </span>
    
    <span className="text-green-600 dark:text-green-400 animate-pulse animate-infinite animate-duration-[2000ms]">
      Services
    </span>
  </h2>
</div>

<style jsx>{`
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
    from {
      opacity: 0;
    }
  }
  
  .animate-fade-in {
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
  }
`}</style>
        {/* Search + Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Services
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
                <div className="absolute left-3 top-3.5">
                  <svg className="w-5 h-5 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service Type
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition appearance-none"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="home">Home Decoration</option>
                <option value="wedding">Wedding Decoration</option>
                <option value="event">Event Decoration</option>
                <option value="office">Office Decoration</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span className="self-center text-gray-500 dark:text-gray-300">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-100 font-medium rounded-xl transition"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing <span className="font-bold text-green-600 dark:text-green-400">{filteredServices.length}</span> services
            {search && <span> for "<span className="font-semibold">{search}</span>"</span>}
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {services.length} total services available
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading services...</p>
            </div>
          </div>
        )}

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {!loading && filteredServices.map((service) => (
            <div 
              key={service._id} 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden group"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={service?.image || "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&auto=format&fit=crop"}
                  alt={service?.serviceName || "Service Image"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(service?.type)}`}>
                    {service?.type || "General"}
                  </span>
                </div>
               
              </div>

              {/* Content Section */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1">
                  {service?.serviceName || "Unnamed Service"}
                </h3>
                
                <div className="flex items-center mb-3 text-gray-500 dark:text-gray-300">
                  <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">4.8</span>
                  <span className="mx-2 text-gray-400 dark:text-gray-500">•</span>
                  <span className="text-sm">{service?.unit || "Fixed"}</span>
                </div>

                <p className="text-gray-500 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {service?.description || "Premium decoration service with expert craftsmanship."}
                </p>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Starting at</span>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">
                      {service?.price?.toLocaleString("en-BD") || 0} BDT
                    </div>
                  </div>
                  <Link
                    to={`/services/${service?._id}`}
                    className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-[#DB995A] text-white font-medium rounded-xl hover:from-green-700 hover:to-[#DB995A]/90 transition-all duration-300 transform hover:scale-105"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && filteredServices.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              <svg className="w-16 h-16 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">No Services Found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              We couldn't find any services matching your criteria. Try adjusting your filters or search term.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition"
            >
              Reset All Filters
            </button>
          </div>
        )}

       {/* Animated CTA Section */}
<div className="mt-16 relative overflow-hidden">
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="bg-gradient-to-r from-green-600 to-[#DB995A] rounded-2xl p-8 md:p-12 text-white text-center relative z-10"
  >
    {/* Floating Background Elements */}
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          rotate: [0, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 100, 0],
          rotate: [360, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-4 right-4 w-32 h-32 bg-white/5 rounded-full blur-xl"
      />
    </div>

    <motion.h3
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-2xl md:text-3xl font-bold mb-4 relative z-10"
    >
      Need a Custom Decoration Solution?
    </motion.h3>
    
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="text-green-100 mb-6 max-w-2xl mx-auto relative z-10"
    >
      We specialize in creating bespoke decoration plans tailored to your unique vision and requirements.
    </motion.p>
    
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
      className="relative z-10"
    >
      <Link
        to="/contact"
        className="group inline-flex items-center px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 relative overflow-hidden shadow-lg"
      >
        {/* Hover Effect Background */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-green-50 to-gray-50"
          initial={{ x: "-100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative z-10 mr-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </motion.div>
        
        <span className="relative z-10">Request Custom Quote</span>
        
        <motion.div
          className="relative z-10 ml-3"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.div>
      </Link>
    </motion.div>

    {/* Stats with Animation */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="flex flex-wrap justify-center gap-6 mt-8 relative z-10"
    >
      {[
        { value: "24h", label: "Response Time" },
        { value: "Free", label: "Consultation" },
        { value: "100%", label: "Customizable" }
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            delay: 0.9 + (index * 0.1),
            type: "spring"
          }}
          whileHover={{ scale: 1.1, y: -5 }}
          className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
        >
          <div className="text-xl font-bold">{stat.value}</div>
          <div className="text-sm text-green-100/80">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
</div>
      </div>
    </div>
  );
};

export default Services;
