import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Star, Quote, Heart, Sparkles, TrendingUp } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const mockReviews = [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        comment: "Stunning wedding decoration! Our day was magical. Highly recommended!",
        date: "2 weeks ago",
        initials: "SJ",
        type: "Wedding",
        avatarColor: "from-pink-400 to-rose-500"
      },
      {
        id: 2,
        name: "Mohammad Ali",
        rating: 5,
        comment: "Office transformation was amazing. Employees are more productive now.",
        date: "1 month ago",
        initials: "MA",
        type: "Office",
        avatarColor: "from-blue-500 to-cyan-400"
      },
      {
        id: 3,
        name: "Priya Sharma",
        rating: 4,
        comment: "Home renovation perfect within budget. Will use again!",
        date: "3 days ago",
        initials: "PS",
        type: "Home",
        avatarColor: "from-green-500 to-emerald-400"
      },
      {
        id: 4,
        name: "Robert Chen",
        rating: 5,
        comment: "Best event planners! Our anniversary was a huge success.",
        date: "2 months ago",
        initials: "RC",
        type: "Event",
        avatarColor: "from-purple-500 to-violet-400"
      },
      {
        id: 5,
        name: "Lisa Wang",
        rating: 5,
        comment: "Exceptional service! They brought our dream home to life.",
        date: "1 week ago",
        initials: "LW",
        type: "Home",
        avatarColor: "from-orange-500 to-yellow-400"
      },
      {
        id: 6,
        name: "David Miller",
        rating: 5,
        comment: "Professional team, amazing results. Worth every penny!",
        date: "3 weeks ago",
        initials: "DM",
        type: "Office",
        avatarColor: "from-indigo-500 to-blue-400"
      }
    ];
    setReviews(mockReviews);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const starVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  const renderStars = (rating, index) => {
    return [...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        variants={starVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 + index * 0.05 }}
      >
        <Star
          className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
        />
      </motion.div>
    ));
  };

  const getTypeColor = (type) => {
    const colors = {
      'Wedding': 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-400',
      'Office': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400',
      'Home': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400',
      'Event': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-400',
    };
    return colors[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  const stats = [
    { value: "98%", label: "Satisfaction", color: "green" },
    { value: "500+", label: "Happy Clients", color: "blue" },
    { value: "4.8", label: "Avg Rating", color: "yellow" },
    { value: "24h", label: "Response Time", color: "purple" }
  ];

  const counterVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute -z-10"
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
        style={{
          top: "10%",
          left: "5%",
          width: "100px",
          height: "100px",
          background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, rgba(34,197,94,0) 70%)"
        }}
      />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section with Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full mb-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-semibold">Client Testimonials</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            What Our <span className="text-green-600 dark:text-green-400">Clients Say</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto"
          >
            Don't just take our word for it - hear from our satisfied customers
          </motion.p>
        </motion.div>

        {/* Reviews Carousel */}
        {reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
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
              className="pb-16"
              onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={review.id}>
                  {({ isActive }) => (
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      whileHover="hover"
                      animate={isActive ? "hover" : "visible"}
                      className="pb-8"
                    >
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 h-full border border-gray-200 dark:border-gray-700 shadow-lg">
                        {/* Rating & Type */}
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex space-x-1">
                            {renderStars(review.rating, index)}
                          </div>
                          <motion.span
                            whileHover={{ scale: 1.1 }}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(review.type)}`}
                          >
                            {review.type}
                          </motion.span>
                        </div>

                        {/* Review Text with Animated Quote */}
                        <div className="relative mb-4">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-2 -left-2 opacity-20"
                          >
                            <Quote className="w-8 h-8 text-gray-400" />
                          </motion.div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed relative z-10 pl-4">
                            "{review.comment}"
                          </p>
                        </div>

                        {/* Client Info with Avatar Animation */}
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                            className={`w-10 h-10 rounded-full bg-gradient-to-r ${review.avatarColor} flex items-center justify-center text-sm font-bold text-white shadow-lg`}
                          >
                            {review.initials}
                          </motion.div>
                          <div className="flex-1">
                            <motion.h4
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                              className="font-semibold text-gray-900 dark:text-white text-sm"
                            >
                              {review.name}
                            </motion.h4>
                            <motion.p
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              className="text-gray-500 dark:text-gray-400 text-xs"
                            >
                              {review.date}
                            </motion.p>
                          </div>
                          <motion.div
                            animate={{ rotate: [0, 180, 360] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          >
                            <Quote className="w-4 h-4 text-gray-300 dark:text-gray-500" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {reviews.slice(0, 3).map((_, index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: activeSlide % 3 === index ? 1.2 : 1,
                    backgroundColor: activeSlide % 3 === index ? "#10b981" : "#d1d5db"
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-2 h-2 rounded-full cursor-pointer"
                  onClick={() => {
                    const swiper = document.querySelector('.swiper').swiper;
                    swiper.slideTo(index);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Animated Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`bg-${stat.color}-50 dark:bg-${stat.color}-900/20 p-6 rounded-xl text-center border border-${stat.color}-100 dark:border-${stat.color}-800`}
            >
              <motion.div
                variants={counterVariants}
                className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 mx-auto px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold rounded-xl transition-colors duration-300"
          >
            <TrendingUp className="w-4 h-4" />
            <span>View All Reviews</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-1"
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* Custom CSS for Swiper */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db !important;
          opacity: 0.5 !important;
        }
        .swiper-pagination-bullet-active {
          background: #10b981 !important;
          opacity: 1 !important;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default Reviews;