import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";

const HeroSection = () => {
  return (
    <motion.div
      className="relative bg-gradient-to-r from-purple-600 mt-6 via-purple-500 to-pink-400 h-96 md:h-[28rem] flex flex-col justify-center items-center text-white overflow-hidden"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background shapes */}
      <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-40px] right-[-40px] w-56 h-56 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>

      {/* Hero Title */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center drop-shadow-lg">
        Make Your Event Memorable
      </h1>

      {/* Hero Subtitle */}
      <p className="text-lg md:text-2xl mb-6 text-center font-medium opacity-90">
        Book the best decorators for your home or ceremony
      </p>

      {/* CTA Button */}
      <NavLink to="/service">
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all duration-300"
  >
    Book Decoration Service
  </motion.button>
</NavLink>
    </motion.div>
  );
};

export default HeroSection;
