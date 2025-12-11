import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.div
      className="bg-gradient-to-r mt-8 from-purple-500 to-pink-300 h-96 flex flex-col justify-center items-center text-white"
      initial={{ opacity: 0, y: -50 }}   // প্রথমে কিভাবে আসবে
      animate={{ opacity: 1, y: 0 }}     // animation হবে কিভাবে
      transition={{ duration: 1 }}       // duration 1 second
    >
      {/* Hero Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Make Your Event Memorable
      </h1>

      {/* Hero Subtitle (optional) */}
      <p className="text-lg md:text-xl mb-6 text-center">
        Book the best decorators for your home or ceremony
      </p>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}   // Hover করলে button বড় হবে
        whileTap={{ scale: 0.95 }}    // Click করলে একটু shrink হবে
        className="bg-white text-purple-500 px-6 py-3 rounded font-semibold shadow-lg"
      >
        Book Decoration Service
      </motion.button>
    </motion.div>
  );
};

export default HeroSection;
