import React, { useEffect, useState } from 'react';
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Star, Quote, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Mock data - আপনি এটা আপনার API দিয়ে রিপ্লেস করবেন
    const mockReviews = [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        comment: "Stunning wedding decoration! Our day was magical. Highly recommended!",
        date: "2 weeks ago",
        initials: "SJ",
        type: "Wedding"
      },
      {
        id: 2,
        name: "Mohammad Ali",
        rating: 5,
        comment: "Office transformation was amazing. Employees are more productive now.",
        date: "1 month ago",
        initials: "MA",
        type: "Office"
      },
      {
        id: 3,
        name: "Priya Sharma",
        rating: 4,
        comment: "Home renovation perfect within budget. Will use again!",
        date: "3 days ago",
        initials: "PS",
        type: "Home"
      },
      {
        id: 4,
        name: "Robert Chen",
        rating: 5,
        comment: "Best event planners! Our anniversary was a huge success.",
        date: "2 months ago",
        initials: "RC",
        type: "Event"
      },
    ];
    setReviews(mockReviews);
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getTypeColor = (type) => {
    const colors = {
      'Wedding': 'bg-pink-100 text-pink-700',
      'Office': 'bg-blue-100 text-blue-700',
      'Home': 'bg-green-100 text-green-700',
      'Event': 'bg-purple-100 text-purple-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const getAvatarColor = (id) => {
    const colors = [
      'bg-gradient-to-r from-pink-400 to-rose-500',
      'bg-gradient-to-r from-blue-500 to-cyan-400',
      'bg-gradient-to-r from-green-500 to-emerald-400',
      'bg-gradient-to-r from-purple-500 to-violet-400',
    ];
    return colors[id % colors.length];
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header Section - ছোট */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
            <Heart className="w-3 h-3" fill="currentColor" />
            <span>Client Reviews</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Customer <span className="text-green-600">Feedback</span>
          </h2>
          
          <p className="text-gray-600 text-sm max-w-lg mx-auto">
            Hear from our satisfied customers
          </p>
        </div>

        {/* Reviews Carousel - কমপ্যাক্ট */}
        {reviews.length > 0 && (
          <div className="relative">
            <Swiper
              loop={true}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={20}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              modules={[Autoplay, Pagination]}
              className="pb-10"
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
            >
              {reviews.map((review) => (
                <SwiperSlide key={review.id} className="pb-8">
                  <div className="bg-gray-50 rounded-xl p-5 h-full border border-gray-200">
                    {/* Rating & Type */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(review.type)}`}>
                        {review.type}
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      "{review.comment}"
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      <div className={`w-8 h-8 rounded-full ${getAvatarColor(review.id)} flex items-center justify-center text-xs font-bold text-white`}>
                        {review.initials}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                        <p className="text-gray-500 text-xs">{review.date}</p>
                      </div>
                      <Quote className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Overall Rating - ছোট */}
            <div className="text-center mt-6">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
                <div className="text-sm">
                  <span className="font-bold text-gray-900">4.8</span>
                  <span className="text-gray-600">/5 from </span>
                  <span className="font-semibold text-green-600">500+</span>
                  <span className="text-gray-600"> reviews</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Simple Stats - ১ লাইনে */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-xl font-bold text-green-700">98%</div>
            <div className="text-xs text-gray-600">Satisfaction</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-xl font-bold text-blue-700">500+</div>
            <div className="text-xs text-gray-600">Happy Clients</div>
          </div>
        </div>

        {/* Minimal CTA */}
        <div className="mt-8 text-center">
          <button className="text-sm text-green-600 hover:text-green-700 font-medium">
            View all reviews →
          </button>
        </div>
      </div>

      {/* Custom CSS for smaller pagination */}
      <style jsx>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #10b981;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Reviews;