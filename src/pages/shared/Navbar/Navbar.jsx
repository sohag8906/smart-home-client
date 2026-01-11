import React, { useState, useEffect } from 'react';
import Logo from '../../../components/logo/Logo';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

// সরল থিম হুক
const useSimpleTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // প্রথম লোডে থিম সেট করা
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    // থিম প্রয়োগ করা
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useSimpleTheme();
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch(error => {
        console.log(error);
      });
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/service", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/coverage", label: "Coverage" },
    ...(user ? [{ to: "/dashboard", label: "Dashboard" }] : [])
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 border-b dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden mr-3 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400 pb-1'
                      : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* User Actions and Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                // Moon icon
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                // Sun icon
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {!user ? (
              <>
                {/* Desktop Login Button */}
                <Link 
                  to="/login" 
                  className="hidden sm:inline-block px-5 py-2 bg-green-600 dark:bg-green-700 text-white font-medium rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors"
                >
                  Login
                </Link>
                
                {/* Mobile Login Button */}
                <Link 
                  to="/login" 
                  className="sm:hidden px-4 py-2 bg-green-600 dark:bg-green-700 text-white text-sm rounded-lg"
                >
                  Login
                </Link>
              </>
            ) : (
              <div 
                className="relative"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <div className="flex items-center gap-3 cursor-pointer">
                  <img
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=10b981&color=fff`}
                    className="w-9 h-9 rounded-full border-2 border-green-100 dark:border-green-800"
                    alt="profile"
                  />
                  <span className="hidden md:inline font-medium text-gray-700 dark:text-gray-300">
                    {user?.displayName?.split(' ')[0] || 'User'}
                  </span>
                </div>

                {/* Profile Dropdown */}
                {open && (
                  <div className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-2 z-50 border border-gray-200 dark:border-gray-700">
                    <div className="px-3 py-2 border-b dark:border-gray-700">
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{user?.displayName || 'User'}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                    </div>
                    
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300"
                      onClick={() => setOpen(false)}
                    >
                      Dashboard
                    </Link>
                    
                    <Link
                      to="/dashboard/profile"
                      className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-700 dark:text-gray-300"
                      onClick={() => setOpen(false)}
                    >
                      My Profile
                    </Link>
                    
                    <div className="border-t dark:border-gray-700 mt-2 pt-2">
                      <button
                        onClick={handleLogOut}
                        className="block w-full text-left px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-base font-medium ${
                  isActive
                    ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-l-4 border-green-600 dark:border-green-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          
          {/* Theme Toggle in Mobile Menu */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-2">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </span>
              <span className="text-xl">
                {theme === 'light' ? '🌙' : '☀️'}
              </span>
            </button>
          </div>

          {user && (
            <>
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
                <div className="flex items-center gap-3 px-4 py-3">
                  <img
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=10b981&color=fff`}
                    className="w-10 h-10 rounded-full"
                    alt="profile"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{user?.displayName || 'User'}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogOut}
                  className="w-full mt-3 px-4 py-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;