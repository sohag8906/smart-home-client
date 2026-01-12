import React, { useState, useEffect } from 'react';
import Logo from '../../../components/logo/Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll listener for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          aria-label="Back to top"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            {/* Brand Column */}
            <div className="space-y-3">
              <Link to="/" className="inline-block">
                <Logo />
              </Link>
              <p className="text-gray-400 text-sm">
                Premium decoration services for homes, weddings, offices & events.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-white mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-green-400 text-sm">Home</Link></li>
                <li><Link to="/service" className="text-gray-400 hover:text-green-400 text-sm">Services</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-green-400 text-sm">About</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-green-400 text-sm">Contact</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-white mb-3">Contact</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">+880 1933-067666</p>
                <p className="text-gray-400">chinaakther05@gmail.com</p>
                <p className="text-gray-400">Dhaka, Bangladesh</p>
              </div>
            </div>

          </div>

          {/* Social Media & Copyright */}
          <div className="pt-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Social Icons */}
              <div className="flex gap-4">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/sohag.gaji.14473"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/china-akther-a384b23a2/" 
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.225 0H1.771C.792 0 0 .774 0 1.728v20.543C0 23.225.792 24 1.771 24h20.451C23.206 24 24 23.225 24 22.271V1.728C24 .774 23.206 0 22.225 0zM7.082 20.452H3.545V9h3.537v11.452zM5.314 7.614c-1.13 0-2.045-.915-2.045-2.046 0-1.13.915-2.045 2.045-2.045 1.13 0 2.045.915 2.045 2.045 0 1.131-.915 2.046-2.045 2.046zm15.138 12.838h-3.537v-5.563c0-1.328-.026-3.037-1.85-3.037-1.851 0-2.136 1.445-2.136 2.938v5.662h-3.537V9h3.395v1.561h.048c.473-.897 1.63-1.845 3.354-1.845 3.584 0 4.247 2.36 4.247 5.428v6.849z"/>
    </svg>
  </a>
              </div>

              {/* Copyright */}
              <div className="text-gray-400 text-sm text-center">
                &copy; {new Date().getFullYear()} SmartHome Decor. All rights reserved.
              </div>

            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
