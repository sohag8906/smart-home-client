import React, { useState } from 'react';
import Logo from '../../../components/logo/Logo';
import { Link, NavLink, useLocation } from 'react-router-dom'; // <-- FIXED
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {

  const { user, logOut } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch(error => {
        console.log(error);
      });
  };

  const links = (
     <> 
  <li><NavLink to="/" className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 underline font-bold"
                        : "font-bold hover:text-blue-600"
                    }>Home</NavLink></li> 
  <li><NavLink to="/service" className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 underline font-bold"
                        : "font-bold hover:text-blue-600"
                    }>Service</NavLink></li>
   <li><NavLink to="/about" className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 underline font-bold"
                        : "font-bold hover:text-blue-600"
                    }>About Us</NavLink></li>
    <li><NavLink to="/coverage" className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 underline font-bold"
                        : "font-bold hover:text-blue-600"
                    }>Coverage</NavLink></li>
     
      {user && ( <li><NavLink to="dashboard" className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 underline font-bold"
                        : "font-bold hover:text-blue-600"
                    }>Dashboard</NavLink></li> )} 
      </> );

  return (
    <div className="navbar bg-indigo-100 shadow-sm">

      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5" fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>

        <Logo />
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end relative">
        {!user ? (
          <Link className="btn" to="/login">Login</Link>
        ) : (
          <div 
            className="relative flex items-center gap-3"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            {/* Profile Picture */}
           <img
  src={user?.photoURL || "https://via.placeholder.com/150?text=User"}
  className="w-10 h-10 rounded-full cursor-pointer border"
  alt="profile"
/>


            {/* Logout Button */}
            <button
              onClick={handleLogOut}
              className="btn bg-green-500 text-white rounded-2xl btn-sm"
            >
              Logout
            </button>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute right-0 top-12 w-40 bg-white shadow-lg rounded-lg p-2 z-20">
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 hover:bg-gray-100 rounded"
                >
                  Dashboard
                </Link>

                <Link
                  to="/dashboard/profile"
                  className="block px-3 py-2 hover:bg-gray-100 rounded"
                >
                  Profile
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Navbar;
