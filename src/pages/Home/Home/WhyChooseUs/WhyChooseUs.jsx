import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Users, Shield, ThumbsUp, Headphones, Sparkles } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Award Winning",
      description: "Multiple awards for excellence in decoration services"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "On-Time Delivery",
      description: "We respect deadlines and always deliver on time"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Team",
      description: "Certified professionals with 10+ years experience"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality Guarantee",
      description: "Premium materials with 1-year warranty"
    },
    {
      icon: <ThumbsUp className="w-6 h-6" />,
      title: "100% Satisfaction",
      description: "Client satisfaction is our top priority"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Round the clock customer support available"
    }
  ];

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

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const featureCardVariants = {
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
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header with Text Animation */}
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
            <span className="text-sm font-semibold">Why Choose Us</span>
          </motion.div>

          <motion.h2
            variants={textVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Why Choose <span className="text-green-600 dark:text-green-400">SmartHome Decor</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto"
          >
            We combine creativity with professionalism to deliver exceptional decoration services
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content with Animations */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Animated Points */}
            <div className="space-y-6">
              {[
                {
                  icon: "🎯",
                  title: "Tailored Solutions",
                  desc: "Custom designs that perfectly match your unique style, preferences, and budget requirements."
                },
                {
                  icon: "💡",
                  title: "Innovative Designs",
                  desc: "Latest trends and creative concepts for modern spaces with sustainable materials."
                },
                {
                  icon: "💰",
                  title: "Transparent Pricing",
                  desc: "No hidden costs with detailed quotations and flexible payment options."
                }
              ].map((point, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg"
                  >
                    <span className="text-2xl">{point.icon}</span>
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{point.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{point.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Animated Stats */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              {[
                { number: "5000+", label: "Happy Clients" },
                { number: "1000+", label: "Projects Done" },
                { number: "10+", label: "Years Experience" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={numberVariants}
                  whileHover={{ scale: 1.1 }}
                  className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Animated Features Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="grid grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={featureCardVariants}
                whileHover="hover"
                custom={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 hover:shadow-xl"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="p-3 bg-white dark:bg-gray-700 rounded-lg w-fit mb-4"
                >
                  {feature.icon}
                </motion.div>
                <motion.h4
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="font-bold text-gray-900 dark:text-white mb-2"
                >
                  {feature.title}
                </motion.h4>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0px 0px 0px 0px rgba(34, 197, 94, 0.7)",
                "0px 0px 20px 10px rgba(34, 197, 94, 0.3)",
                "0px 0px 0px 0px rgba(34, 197, 94, 0.7)"
              ]
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold rounded-xl transition-colors duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Get Free Consultation</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Background Elements */}
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
      <motion.div
        className="absolute -z-10"
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
        style={{
          bottom: "20%",
          right: "10%",
          width: "150px",
          height: "150px",
          background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, rgba(34,197,94,0) 70%)"
        }}
      />
    </section>
  );
};

export default WhyChooseUs;