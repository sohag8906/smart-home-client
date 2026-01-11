import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Sparkles, Star, Calendar, Home, Heart, ArrowRight, ChevronRight } from "lucide-react";

const HeroSection = () => {
  const floatingElements = [
    { top: '10%', left: '5%', delay: 0, emoji: '✨' },
    { top: '20%', right: '10%', delay: 0.2, emoji: '🏠' },
    { top: '60%', left: '8%', delay: 0.4, emoji: '💒' },
    { top: '70%', right: '7%', delay: 0.6, emoji: '🎉' },
    { top: '30%', left: '15%', delay: 0.8, emoji: '🏢' },
    { top: '40%', right: '15%', delay: 1, emoji: '🎊' },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Main Hero Container */}
      <motion.div
        className="relative bg-gradient-to-br from-green-600 via-emerald-500 to-[#DB995A] min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center items-center text-white overflow-hidden px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-soft-light blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-soft-light blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-300 rounded-full mix-blend-soft-light blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Elements */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute text-3xl md:text-4xl opacity-20"
            style={{ top: element.top, left: element.left, right: element.right }}
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 3,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {element.emoji}
          </motion.div>
        ))}

        {/* Content Container */}
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold">#1 Decoration Service Provider</span>
            <div className="flex items-center ml-2">
              <Star className="w-4 h-4 text-yellow-300 fill-current" />
              <Star className="w-4 h-4 text-yellow-300 fill-current" />
              <Star className="w-4 h-4 text-yellow-300 fill-current" />
              <Star className="w-4 h-4 text-yellow-300 fill-current" />
              <Star className="w-4 h-4 text-yellow-300 fill-current" />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="block">Transform Your</span>
            <span className="block bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
              Dream Spaces
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl mb-8 font-medium text-green-100 max-w-3xl mx-auto"
          >
            Expert decoration services for homes, weddings, offices & special events
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl mb-10 text-green-50/90 max-w-2xl mx-auto"
          >
            From intimate home makeovers to grand wedding celebrations, we bring your vision to life with precision, creativity, and unmatched quality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <NavLink to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 bg-white text-green-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-2xl dark:bg-white/90 dark:text-green-800 dark:hover:bg-white"
              >
                <span className="text-lg">Explore Services</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </NavLink>

            <NavLink to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 dark:border-white/80 dark:hover:bg-white/20"
              >
                <Calendar className="w-5 h-5" />
                <span className="text-lg">Book Free Consultation</span>
              </motion.button>
            </NavLink>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: "5000+", label: "Happy Clients", icon: <Heart className="w-6 h-6" /> },
              { value: "1000+", label: "Events Decorated", icon: <Calendar className="w-6 h-6" /> },
              { value: "10+", label: "Years Experience", icon: <Star className="w-6 h-6" /> },
              { value: "24/7", label: "Support Available", icon: <Home className="w-6 h-6" /> },
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl dark:bg-white/5">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-white/20 rounded-full dark:bg-white/10">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-green-100 dark:text-green-200">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-green-100 dark:text-green-200 mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="w-6 h-6 text-green-100 dark:text-green-200 transform rotate-90" />
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 md:h-32" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </motion.div>

      {/* Featured Services Bar */}
      <div className="bg-white dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: "🏠", label: "Home Decoration", color: "text-green-600 dark:text-green-400" },
              { icon: "💒", label: "Wedding Decor", color: "text-pink-600 dark:text-pink-400" },
              { icon: "🏢", label: "Office Design", color: "text-blue-600 dark:text-blue-400" },
              { icon: "🎉", label: "Event Planning", color: "text-purple-600 dark:text-purple-400" },
              { icon: "🎂", label: "Birthday Parties", color: "text-yellow-600 dark:text-yellow-400" },
              { icon: "✨", label: "Custom Designs", color: "text-indigo-600 dark:text-indigo-400" },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {service.icon}
                </div>
                <span className={`font-semibold ${service.color} group-hover:underline`}>
                  {service.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;