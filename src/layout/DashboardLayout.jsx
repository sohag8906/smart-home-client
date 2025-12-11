import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <NavLink to="/">
          <h2 className="text-xl font-bold mb-4">Home Page</h2>
        </NavLink>

        {/* User Dashboard Button */}
        <button
          onClick={toggleMenu}
          className="w-full text-left flex items-center gap-2 font-semibold text-lg mb-3"
        >
            <MdDashboard />
          User Dashboard
        </button>

        {/* Submenu - only show if menuOpen */}
        {menuOpen && (
          <ul className="space-y-2 ml-2 mt-2">
            <li>
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : ""
                }
              >
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="myBookings"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : ""
                }
              >
                My Bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="bookingCancellation"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : ""
                }
              >
                Booking Cancellation
              </NavLink>
            </li>
            <li>
              <NavLink
                to="paymentHistory"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : ""
                }
              >
                Payment History
              </NavLink>
            </li>
          </ul>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
