import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Star, Clock, Users, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const TopServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    axios.get("https://smart-home-server-five.vercel.app/services")
      .then(res => {
        const limitedServices = res.data.slice(0, visibleCount);
        setServices(limitedServices);
      })
      .catch(() => setError("Failed to load services"))
      .finally(() => setLoading(false));
  }, [visibleCount]);

  const getServiceTypeColor = (type) => {
    const typeMap = {
      'home': { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-300', border: 'border-green-200 dark:border-green-700' },
      'wedding': { bg: 'bg-pink-100 dark:bg-pink-900', text: 'text-pink-800 dark:text-pink-300', border: 'border-pink-200 dark:border-pink-700' },
      'event': { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-800 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-700' },
      'office': { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-800 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-700' },
      'party': { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-800 dark:text-yellow-300', border: 'border-yellow-200 dark:border-yellow-700' },
    };
    return typeMap[type?.toLowerCase()] || { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-800 dark:text-gray-300', border: 'border-gray-200 dark:border-gray-700' };
  };

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

  const loadMoreServices = () => {
    setVisibleCount(prev => prev + 8);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px] bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading amazing services...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="text-center py-12 bg-gray-50 dark:bg-gray-900">
      <div className="inline-block p-4 bg-red-50 dark:bg-red-900 rounded-full mb-4">
        <svg className="w-12 h-12 text-red-500 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <p className="text-red-600 dark:text-red-300 font-medium">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-[#DB995A] text-white px-6 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Premium Services</span>
          </div>
          
          <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="text-center mb-12"
>
  <h2 className="text-4xl md:text-5xl font-bold mb-4">
    <span className="text-gray-900 dark:text-white">Our </span>
    
    <motion.span
      initial={{ width: 0 }}
      whileInView={{ width: "auto" }}
      viewport={{ once: true }}
      transition={{ 
        duration: 1,
        ease: "easeInOut",
        delay: 0.3
      }}
      className="inline-block overflow-hidden"
    >
      <span className="text-green-600 dark:text-green-400">Featured</span>
    </motion.span>
    
    <span className="text-gray-900 dark:text-white"> Services</span>
  </h2>
</motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-300">100% Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-300">Expert Decorators</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-300">On-time Delivery</span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map(service => {
            const typeColor = getServiceTypeColor(service.type);
            const serviceIcon = getServiceIcon(service.type);
            
            return (
              <div 
                key={service._id} 
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={service.image || "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&auto=format&fit=crop"} 
                    alt={service.serviceName} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${typeColor.bg} ${typeColor.text} ${typeColor.border}`}>
                      <span>{serviceIcon}</span>
                      {service.type || 'General'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition">
                    {service.serviceName}
                  </h3>

                  {/* Rating + Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-gray-500 dark:text-gray-400">4.8 (124)</span>
                    </div>
                    
                    
                  </div>
                  <span className="text-sm items-center font-semibold text-green-600 dark:text-green-400">
                      {service.price?.toLocaleString('en-BD') || 0} BDT
                    </span>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <Clock className="w-4 h-4 text-green-500 dark:text-green-400" />
                      <span>{service.unit === 'per_hour' ? 'Per Hour' : 
                             service.unit === 'per_day' ? 'Per Day' : 
                             service.unit === 'per_project' ? 'Full Project' : service.unit}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <Users className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      <span>Suitable for {service.type === 'wedding' ? '50-500 guests' : 
                                        service.type === 'home' ? 'Family' : 
                                        service.type === 'office' ? 'Office Space' : 'All Events'}</span>
                    </div>
                  </div>

                  {/* CTA */}
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

        {/* Load More */}
        {services.length >= visibleCount && (
          <div className="text-center mt-12">
            <button
              onClick={loadMoreServices}
              className="inline-flex items-center gap-2 bg-white dark:bg-gray-700 border-2 border-green-600 text-green-600 dark:text-green-400 font-semibold px-8 py-3 rounded-xl hover:bg-green-50 dark:hover:bg-green-900 transition-all duration-300 hover:scale-105"
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
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
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
