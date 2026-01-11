import React, { useState } from 'react';
import Logo from '../../../components/logo/Logo';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useAuth();
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
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden mr-3 p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100"
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
                      ? 'text-green-600 border-b-2 border-green-600 pb-1'
                      : 'text-gray-700 hover:text-green-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {!user ? (
              <Link 
                to="/login" 
                className="hidden sm:inline-block px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
              >
                Login
              </Link>
            ) : (
              <div 
                className="relative"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <div className="flex items-center gap-3 cursor-pointer">
                  <img
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=10b981&color=fff`}
                    className="w-9 h-9 rounded-full border-2 border-green-100"
                    alt="profile"
                  />
                  <span className="hidden md:inline font-medium text-gray-700">
                    {user?.displayName?.split(' ')[0] || 'User'}
                  </span>
                </div>

                {/* Profile Dropdown */}
                {open && (
                  <div className="absolute right-0 top-12 w-48 bg-white shadow-xl rounded-lg p-2 z-20 border border-gray-200">
                    <div className="px-3 py-2 border-b">
                      <p className="font-semibold text-gray-800">{user?.displayName || 'User'}</p>
                      <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                    </div>
                    
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 hover:bg-gray-100 rounded text-gray-700"
                      onClick={() => setOpen(false)}
                    >
                      Dashboard
                    </Link>
                    
                    <Link
                      to="/dashboard/profile"
                      className="block px-3 py-2 hover:bg-gray-100 rounded text-gray-700"
                      onClick={() => setOpen(false)}
                    >
                      My Profile
                    </Link>
                    
                    <div className="border-t mt-2 pt-2">
                      <button
                        onClick={handleLogOut}
                        className="block w-full text-left px-3 py-2 hover:bg-red-50 rounded text-red-600 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Login Button */}
            {!user && (
              <Link 
                to="/login" 
                className="sm:hidden px-4 py-2 bg-green-600 text-white text-sm rounded-lg"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu - এইখানে সব লিংক দেখা যাবে */}
      <div className={`lg:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-base font-medium ${
                  isActive
                    ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          
          {user && (
            <>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center gap-3 px-4 py-3">
                  <img
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=10b981&color=fff`}
                    className="w-10 h-10 rounded-full"
                    alt="profile"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{user?.displayName || 'User'}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogOut}
                  className="w-full mt-3 px-4 py-3 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100"
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