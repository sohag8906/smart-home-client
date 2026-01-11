// ServiceDetails.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Calendar, MapPin, DollarSign, Clock, CheckCircle, Star } from 'lucide-react';

const ServiceDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  // Fetch service details
  useEffect(() => {
    setLoading(true);
    fetch(`https://smart-home-server-five.vercel.app/services/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch service');
        }
        return res.json();
      })
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch service:", err);
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Service Not Found',
          text: 'Could not load service details. Please try again.',
        });
      });
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first to book this service!",
        confirmButtonText: "Go to Login",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    if (!bookingDate || !location) {
      Swal.fire({
        icon: "info",
        title: "Incomplete Details",
        text: "Please provide booking date and location.",
      });
      return;
    }

    // Check if date is in past
    const selectedDate = new Date(bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "Please select a future date for booking.",
      });
      return;
    }

    // Confirm booking
    const confirmResult = await Swal.fire({
      title: "Confirm Booking",
      html: `
        <div class="text-left">
          <p><strong>Service:</strong> ${service.serviceName}</p>
          <p><strong>Date:</strong> ${new Date(bookingDate).toLocaleDateString()}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Amount:</strong> ${service.price?.toLocaleString("en-BD")} BDT</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm Booking",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    setIsBooking(true);

    const booking = {
      serviceId: service._id,
      serviceName: service.serviceName || "Unknown Service",
      serviceImage: service.image || "",
      cost: service.price || 0,
      unit: service.unit || "N/A",
      userName: user.displayName || "User",
      userEmail: user.email,
      bookingDate,
      location,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await fetch("https://smart-home-server-five.vercel.app/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      const data = await res.json();

      if (data.insertedId) {
        await Swal.fire({
          icon: "success",
          title: "🎉 Booking Successful!",
          html: `
            <div class="text-center">
              <div class="mb-4">
                <CheckCircle class="w-16 h-16 text-green-500 mx-auto" />
              </div>
              <p>Your service has been booked successfully!</p>
              <p class="text-sm text-gray-600 mt-2">Booking ID: ${data.insertedId.slice(-6)}</p>
            </div>
          `,
          confirmButtonText: "View My Bookings",
          showCancelButton: true,
          cancelButtonText: "Continue Browsing",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard/myBookings");
          }
        });

        setBookingDate("");
        setLocation("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: data.message || "Failed to book service. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong while booking. Please try again.",
      });
    } finally {
      setIsBooking(false);
    }
  };

  const getServiceTypeColor = (type) => {
    const colors = {
      'home': 'bg-green-100 text-green-800',
      'wedding': 'bg-pink-100 text-pink-800',
      'event': 'bg-blue-100 text-blue-800',
      'office': 'bg-purple-100 text-purple-800',
    };
    return colors[type?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h2>
          <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
          <NavLink to="/services" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Browse All Services
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-600">
            <NavLink to="/" className="hover:text-green-600">Home</NavLink>
            <span className="mx-2">/</span>
            <NavLink to="/service" className="hover:text-green-600">Services</NavLink>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">{service.serviceName}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Service Details */}
          <div>
            {/* Service Image */}
            <div className="mb-6">
              <img
                src={service.image || "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&auto=format&fit=crop"}
                alt={service.serviceName}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Service Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getServiceTypeColor(service.type)}`}>
                      {service.type || 'General'}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">4.8 (124 reviews)</span>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{service.serviceName}</h1>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {service.price?.toLocaleString("en-BD") || 0} BDT
                  </div>
                  <div className="text-sm text-gray-500">
                    {service.unit === 'per_hour' ? 'Per Hour' : 
                     service.unit === 'per_day' ? 'Per Day' : 
                     service.unit === 'per_project' ? 'Full Project' : service.unit}
                  </div>
                </div>
              </div>

              {/* Service Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Service Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description || "Premium decoration service with expert craftsmanship and attention to detail. Our team ensures perfect execution for your special occasion."}
                </p>
              </div>

              {/* Service Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-sm text-gray-500">Flexible as per need</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Quality</p>
                    <p className="text-sm text-gray-500">Premium Materials</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:sticky lg:top-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book This Service</h2>

              {user ? (
                <form onSubmit={handleBooking} className="space-y-6">
                  {/* Date Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Select Date</span>
                      </div>
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                    <p className="text-sm text-gray-500 mt-1">Select your preferred date</p>
                  </div>

                  {/* Location Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Service Location</span>
                      </div>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your address or location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>

                  {/* Price Summary */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Service Price</span>
                      <span className="font-medium">{service.price?.toLocaleString("en-BD")} BDT</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Service Charge</span>
                      <span className="font-medium">1,000 BDT</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">Total Amount</span>
                        <span className="text-xl font-bold text-green-600">
                          {(service.price + 1000)?.toLocaleString("en-BD")} BDT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Button */}
                  <button
                    type="submit"
                    disabled={isBooking}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      isBooking
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-[#DB995A] hover:from-green-700 hover:to-[#DB995A]/90 text-white hover:shadow-lg'
                    }`}
                  >
                    {isBooking ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing Booking...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <DollarSign className="w-5 h-5" />
                        Book Now
                      </div>
                    )}
                  </button>

                  {/* Terms */}
                  <p className="text-xs text-gray-500 text-center">
                    By booking, you agree to our terms and conditions. Free cancellation within 24 hours.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-6">
                    <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Login Required</h3>
                    <p className="text-gray-600 mb-6">Please login to book this service</p>
                  </div>
                  <NavLink
                    to="/login"
                    className="block w-full py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition mb-3"
                  >
                    Login to Book
                  </NavLink>
                  <p className="text-sm text-gray-500">
                    Don't have an account?{' '}
                    <NavLink to="/register" className="text-green-600 hover:underline">
                      Sign up here
                    </NavLink>
                  </p>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <h3 className="font-bold text-gray-900 mb-3">Why Choose This Service?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Professional decorators</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Quality materials guaranteed</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">On-time delivery</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Free consultation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;