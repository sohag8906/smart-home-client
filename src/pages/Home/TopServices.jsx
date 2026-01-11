import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { Star, Calendar, Users, Clock, ArrowRight, Sparkles } from "lucide-react";

const TopServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(8); // Show 8 cards (2 rows of 4)

  useEffect(() => {
    axios.get("https://smart-home-server-five.vercel.app/services")
      .then(res => {
        // Take only first 8 services or all if less than 8
        const limitedServices = res.data.slice(0, visibleCount);
        setServices(limitedServices);
      })
      .catch(err => setError("Failed to load services"))
      .finally(() => setLoading(false));
  }, [visibleCount]);

  // Function to get service type color
  const getServiceTypeColor = (type) => {
    const typeMap = {
      'home': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      'wedding': { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200' },
      'event': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
      'office': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
      'party': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    };
    return typeMap[type?.toLowerCase()] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
  };

  // Function to get service icon
  const getServiceIcon = (type) => {
    const iconMap = {
      'home': '🏠',
      'wedding': '💒',
      'event': '🎉',
      'office': '🏢',
      'party': '🎊',
    };
    return iconMap[type?.toLowerCase()] || '✨';
  };

  // Load more services
  const loadMoreServices = () => {
    setVisibleCount(prev => prev + 8);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing services...</p>
        </div>
      </div>
    );

  if (error) return (
    <div className="text-center py-12">
      <div className="inline-block p-4 bg-red-50 rounded-full mb-4">
        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <p className="text-red-600 font-medium">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-[#DB995A] text-white px-6 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Premium Services</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-green-600">Featured</span> Services
          </h2>
          
         
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">100% Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Expert Decorators</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">On-time Delivery</span>
            </div>
          </div>
        </div>

        {/* Services Grid - 4 cards per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map(service => {
            const typeColor = getServiceTypeColor(service.type);
            const serviceIcon = getServiceIcon(service.type);
            
            return (
              <div 
                key={service._id} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={service.image || "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&auto=format&fit=crop"} 
                    alt={service.serviceName} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColor.bg} ${typeColor.text} ${typeColor.border} flex items-center gap-1`}>
                      <span>{serviceIcon}</span>
                      {service.type || 'General'}
                    </span>
                  </div>
                  
                  {/* Price Tag */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl">
                      <span className="font-bold text-green-600">
                        {service.price?.toLocaleString('en-BD') || 0} BDT
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-green-600 transition">
                    {service.serviceName}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">4.8 (124)</span>
                  </div>
                  
                  {/* Service Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span>{service.unit === 'per_hour' ? 'Per Hour' : 
                             service.unit === 'per_day' ? 'Per Day' : 
                             service.unit === 'per_project' ? 'Full Project' : service.unit}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span>Suitable for {service.type === 'wedding' ? '50-500 guests' : 
                                        service.type === 'home' ? 'Family' : 
                                        service.type === 'office' ? 'Office Space' : 'All Events'}</span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mt-6">
                    <NavLink to={`/services/${service._id}`}>
                      <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-[#DB995A] text-white font-semibold py-3 px-4 rounded-xl hover:from-green-700 hover:to-[#DB995A]/90 transition-all duration-300 group-hover:shadow-lg">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {services.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="inline-block p-6 bg-gray-100 rounded-full mb-6">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Services Available</h3>
            <p className="text-gray-600">Check back later for our amazing decoration services.</p>
          </div>
        )}

        {/* Load More Button (if more services available) */}
        {services.length >= visibleCount && (
          <div className="text-center mt-12">
            <button
              onClick={loadMoreServices}
              className="inline-flex items-center gap-2 bg-white border-2 border-green-600 text-green-600 font-semibold px-8 py-3 rounded-xl hover:bg-green-50 transition-all duration-300 hover:scale-105"
            >
              Load More Services
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-[#DB995A] rounded-2xl p-8 md:p-10 text-center text-white">
          <div className="inline-block p-3 bg-white/20 rounded-full mb-6">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Need a Custom Decoration Plan?
          </h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            We specialize in creating bespoke decoration plans tailored to your unique vision and requirements.
          </p>
          <NavLink to="/contact">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Get Free Consultation
              <ArrowRight className="w-5 h-5" />
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default TopServices;