// src/layouts/DashboardLayout.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import { 
  MdBrowserUpdated, 
  MdDashboard, 
  MdDesignServices, 
  MdFreeCancellation, 
  MdHomeWork, 
  MdOutlinePayment, 
  MdSchedule,
  MdMenu,
  MdClose,
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdLightMode, // নতুন আইকন
  MdDarkMode // নতুন আইকন
} from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import { FcHome } from "react-icons/fc";
import { RiAdminFill } from "react-icons/ri";
import { GiPaintRoller } from "react-icons/gi";
import useAuth from "../hooks/useAuth";
import { GoProjectSymlink } from "react-icons/go";
import { FaChartBar, FaMoneyBillWave, FaSignOutAlt } from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const [role, setRole] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(true);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [decoratorMenuOpen, setDecoratorMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // নতুন state
  const location = useLocation();

  // Dark mode initialization from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Fetch role from server
  useEffect(() => {
    if (user?.email) {
      fetch(`https://smart-home-server-five.vercel.app/users/${user.email}/role`)
        .then(res => res.json())
        .then(data => setRole(data.role))
        .catch(err => console.error(err));
    }
  }, [user]);

  // Prevent access if not logged in
  if (!user) return <Navigate to="/login" />;

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch(error => console.error(error));
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-green-600 dark:bg-green-700 text-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Dark Mode Toggle Button (Top Right) */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <MdLightMode className="text-yellow-400 group-hover:scale-110 transition-transform" size={24} />
        ) : (
          <MdDarkMode className="text-gray-700 group-hover:scale-110 transition-transform" size={24} />
        )}
      </button>

      {/* SIDEBAR */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:static inset-y-0 left-0 z-40
        w-72 bg-gradient-to-b from-green-900 to-green-800 dark:from-gray-900 dark:to-gray-950 text-white
        p-6 border-r border-green-700 dark:border-gray-700 shadow-2xl
        transition-transform duration-300 ease-in-out
      `}>
        {/* Close button for mobile */}
        <div className="lg:hidden absolute top-4 right-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-full hover:bg-green-700 dark:hover:bg-gray-700 transition"
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* Brand Logo */}
        <div className="mb-10">
          <NavLink 
            to="/" 
            className="flex items-center gap-3 hover:opacity-90 transition"
          >
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <FcHome size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-green-300">
                SmartHome Decor
              </h1>
              <p className="text-green-200 dark:text-gray-300 text-sm">Dashboard</p>
            </div>
          </NavLink>
        </div>

        {/* User Profile Card */}
        <div className="mb-8 p-4 bg-green-800/50 dark:bg-gray-800/70 rounded-xl backdrop-blur-sm border border-green-700 dark:border-gray-600">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-green-400 flex items-center justify-center font-bold text-lg">
              {getUserInitials()}
            </div>
            <div className="flex-1">
              <h3 className="font-bold truncate">{user?.displayName || 'User'}</h3>
              <p className="text-green-200 dark:text-gray-300 text-sm truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-green-700 dark:bg-gray-700 rounded-full text-xs font-medium">
              {role === 'admin' ? 'Administrator' : 
               role === 'decorator' ? 'Decorator' : 
               'Customer'}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm hover:text-yellow-300 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-6">
          {/* USER DASHBOARD */}
          <div className="space-y-2">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-green-700 dark:hover:bg-gray-700 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-600 dark:bg-green-700 rounded-lg">
                  <MdDashboard className="text-white" size={20} />
                </div>
                <span className="font-semibold">User Dashboard</span>
              </div>
              {userMenuOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
            </button>
            
            {userMenuOpen && (
              <div className="ml-4 pl-8 space-y-2 border-l border-green-600 dark:border-gray-600">
                <NavLink
                  to="profile"
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition ${
                      isActive 
                        ? 'bg-green-700 dark:bg-gray-700 text-yellow-300 shadow-inner' 
                        : 'hover:bg-green-700/50 dark:hover:bg-gray-700/50'
                    }`
                  }
                >
                  <ImProfile size={18} />
                  <span>My Profile</span>
                </NavLink>
                
                <NavLink
                  to="myBookings"
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition ${
                      isActive 
                        ? 'bg-green-700 dark:bg-gray-700 text-yellow-300 shadow-inner' 
                        : 'hover:bg-green-700/50 dark:hover:bg-gray-700/50'
                    }`
                  }
                >
                  <TbBrandBooking size={18} />
                  <span>My Bookings</span>
                </NavLink>
                
                <NavLink
                  to="bookingCancellation"
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition ${
                      isActive 
                        ? 'bg-green-700 dark:bg-gray-700 text-yellow-300 shadow-inner' 
                        : 'hover:bg-green-700/50 dark:hover:bg-gray-700/50'
                    }`
                  }
                >
                  <MdFreeCancellation size={18} />
                  <span>Booking Cancellation</span>
                </NavLink>
                
                <NavLink
                  to="paymentHistory"
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition ${
                      isActive 
                        ? 'bg-green-700 dark:bg-gray-700 text-yellow-300 shadow-inner' 
                        : 'hover:bg-green-700/50 dark:hover:bg-gray-700/50'
                    }`
                  }
                >
                  <MdOutlinePayment size={18} />
                  <span>Payment History</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* ADMIN DASHBOARD */}
          {role === "admin" && (
            <div className="space-y-2">
              <button
                onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-green-700 dark:hover:bg-gray-700 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-600 dark:bg-red-700 rounded-lg">
                    <RiAdminFill className="text-white" size={20} />
                  </div>
                  <span className="font-semibold">Admin Dashboard</span>
                </div>
                {adminMenuOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
              </button>
              
              {adminMenuOpen && (
                <div className="ml-4 pl-8 space-y-2 border-l border-green-600 dark:border-gray-600">
                  <NavLink
                    to="admin"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive 
                          ? 'bg-green-700 dark:bg-gray-700 text-yellow-300 shadow-inner' 
                          : 'hover:bg-green-700/50 dark:hover:bg-gray-700/50'
                      }`
                    }
                  >
                    <RiAdminFill size={18} />
                    <span>Admin Home</span>
                  </NavLink>
                  
                  <NavLink
                    to="admin/manageServices"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive 
                          ? 'bg-green-700 dark:bg-gray-700 text-yellow-300 shadow-inner' 
                          : 'hover:bg-green-700/50 dark:hover:bg-gray-700/50'
                      }`
                    }
                  >
                    <MdDesignServices size={18} />
                    <span>Manage Services</span>
                  </NavLink>
                  
                  <NavLink
                    to="admin/manageDecorators"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive 
                          ? 'bg-green-700 dark:bg-gray-700 text-yellow-300 shadow-inner' 
                          : 'hover:bg-green-700/50 dark:hover:bg-gray-700/50'
                      }`
                    }
                  >
                    <GiPaintRoller size={18} />
                    <span>Manage Decorators</span>
                  </NavLink>
                  
                  <NavLink
                    to="admin/manageBookings"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive 
                          ? 'bg-green-700 dark:bg-gray-700 text-yellow-300 shadow-inner' 
                          : 'hover:bg-green-700/50 dark:hover:bg-gray-700/50'
                      }`
                    }
                  >
                    <TbBrandBooking size={18} />
                    <span>Manage Bookings</span>
                  </NavLink>
                  
                  <NavLink
                    to="admin/analytics"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive 
                          ? 'bg-green-700 dark:bg-gray-700 text-yellow-300 shadow-inner' 
                          : 'hover:bg-green-700/50 dark:hover:bg-gray-700/50'
                      }`
                    }
                  >
                    <FaChartBar size={18} />
                    <span>Analytics</span>
                  </NavLink>
                </div>
              )}
            </div>
          )}

          {/* DECORATOR DASHBOARD */}
          {(role === "decorator" || role === "admin") && (
            <div className="space-y-2">
              <button
                onClick={() => setDecoratorMenuOpen(!decoratorMenuOpen)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-green-700 dark:hover:bg-gray-700 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600 dark:bg-purple-700 rounded-lg">
                    <GiPaintRoller className="text-white" size={20} />
                  </div>
                  <span className="font-semibold">Decorator Dashboard</span>
                </div>
                {decoratorMenuOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
              </button>
              
              {decoratorMenuOpen && (
                <div className="ml-4 pl-8 space-y-2 border-l border-green-600 dark:border-gray-600">
                  <NavLink
                    to="decorator/home"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive 
                          ? 'bg-green-700 dark:bg-gray-700 text-yellow-300 shadow-inner' 
                          : 'hover:bg-green-700/50 dark:hover:bg-gray-700/50'
                      }`
                    }
                  >
                    <MdHomeWork size={18} />
                    <span>Decorator Home</span>
                  </NavLink>
                  
                  <NavLink
                    to="decorator/assignedProjects"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive 
                          ? 'bg-green-700 dark:bg-gray-700 text-yellow-300 shadow-inner' 
                          : 'hover:bg-green-700/50 dark:hover:bg-gray-700/50'
                      }`
                    }
                  >
                    <GoProjectSymlink size={18} />
                    <span>Assigned Projects</span>
                  </NavLink>
                  
                  <NavLink
                    to="decorator/todaysSchedule"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive 
                          ? 'bg-green-700 dark:bg-gray-700 text-yellow-300 shadow-inner' 
                          : 'hover:bg-green-700/50 dark:hover:bg-gray-700/50'
                      }`
                    }
                  >
                    <MdSchedule size={18} />
                    <span>Today's Schedule</span>
                  </NavLink>
                  
                  <NavLink
                    to="decorator/updateStatus"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive 
                          ? 'bg-green-700 dark:bg-gray-700 text-yellow-300 shadow-inner' 
                          : 'hover:bg-green-700/50 dark:hover:bg-gray-700/50'
                      }`
                    }
                  >
                    <MdBrowserUpdated size={18} />
                    <span>Update Project Status</span>
                  </NavLink>
                  
                  <NavLink
                    to="decorator/earnings"
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition ${
                        isActive 
                          ? 'bg-green-700 dark:bg-gray-700 text-yellow-300 shadow-inner' 
                          : 'hover:bg-green-700/50 dark:hover:bg-gray-700/50'
                      }`
                    }
                  >
                    <FaMoneyBillWave size={18} />
                    <span>Earnings Summary</span>
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Current Date */}
        <div className="mt-12 pt-6 border-t border-green-700 dark:border-gray-700">
          <div className="text-center">
            <p className="text-green-200 dark:text-gray-300 text-sm">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden transition-colors duration-300">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Welcome back, <span className="text-green-600 dark:text-green-400">{user?.displayName?.split(' ')[0] || 'User'}!</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Here's what's happening with your account today.
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Page</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400 capitalize">
                {location.pathname.split('/').pop()?.replace(/([A-Z])/g, ' $1') || 'Dashboard'}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">Your Role</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">
                    {role === 'admin' ? 'Administrator' : 
                     role === 'decorator' ? 'Decorator' : 
                     'Customer'}
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <RiAdminFill className="text-green-600 dark:text-green-400" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">Today's Date</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">
                    {new Date().toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <MdSchedule className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">Active Status</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">Online</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">Account Created</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">
                    {user?.metadata?.creationTime 
                      ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric'
                        })
                      : 'N/A'}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <ImProfile className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 min-h-[calc(100vh-300px)] transition-colors duration-300">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;