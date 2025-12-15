// src/layouts/DashboardLayout.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { MdBrowserUpdated, MdDashboard, MdDesignServices, MdFreeCancellation, MdHomeWork, MdOutlinePayment, MdSchedule } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import { FcHome } from "react-icons/fc";
import { RiAdminFill } from "react-icons/ri";
import { GiPaintRoller } from "react-icons/gi";
import useAuth from "../hooks/useAuth";
import { GoProjectSymlink } from "react-icons/go";
import { FaChartBar, FaMoneyBillWave } from "react-icons/fa";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [decoratorMenuOpen, setDecoratorMenuOpen] = useState(false);

  // Fetch role from server
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/users/${user.email}/role`)
        .then(res => res.json())
        .then(data => setRole(data.role))
        .catch(err => console.error(err));
    }
  }, [user]);

  // Prevent access if not logged in
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-green-50 p-4 border-r">
        {/* HOME */}
        <NavLink className="flex items-center gap-2 mb-4" to="/">
          <FcHome size={24} />
          <span className="text-3xl font-bold">Home Page</span>
        </NavLink>

        {/* USER DASHBOARD */}
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-full text-left flex items-center gap-2 mt-3 text-green-500 font-bold text-lg mb-3"
        >
          <MdDashboard />
          User Dashboard
        </button>
        {userMenuOpen && (
          <ul className="space-y-2 ml-4 mt-2">
            <li className="flex gap-2 items-center">
              <ImProfile />
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }
              >
                My Profile
              </NavLink>
            </li>
            <li className="flex gap-2 items-center">
              <TbBrandBooking />
              <NavLink
                to="myBookings"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }
              >
                My Bookings
              </NavLink>
            </li>
            <li className="flex gap-2 items-center">
              <MdFreeCancellation />
              <NavLink
                to="bookingCancellation"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }
              >
                Booking Cancellation
              </NavLink>
            </li>
            <li className="flex gap-2 items-center">
              <MdOutlinePayment />
              <NavLink
                to="paymentHistory"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 underline font-bold"
                    : "font-bold hover:text-blue-600"
                }
              >
                Payment History
              </NavLink>
            </li>
          </ul>
        )}

        {/* ADMIN DASHBOARD */}
        {role === "admin" && (
          <>
            <hr className="my-4" />
            <button
              onClick={() => setAdminMenuOpen(!adminMenuOpen)}
              className="w-full text-left flex items-center text-green-500 font-bold gap-2 text-lg mb-3"
            >
              <RiAdminFill />
              Admin Dashboard
            </button>
            {adminMenuOpen && (
              <ul className="space-y-2 ml-4 mt-2">
                <li>
                  <NavLink
                    to="admin"
                     className={({ isActive }) =>
    `flex items-center gap-2 font-bold hover:text-blue-600 ${
      isActive ? "text-blue-600 underline" : ""
    }`
  }
                  >
                    <RiAdminFill/>
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="admin/manageServices"
                    className={({ isActive }) =>
    `flex items-center gap-2 font-bold hover:text-blue-600 ${
      isActive ? "text-blue-600 underline" : ""
    }`
  }
                  >
                     <MdDesignServices/>
                    Manage Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="admin/manageDecorators"
                       className={({ isActive }) =>
    `flex items-center gap-2 font-bold hover:text-blue-600 ${
      isActive ? "text-blue-600 underline" : ""
    }`
  }
    
                  >
                    <GiPaintRoller/>
                    Manage Decorators
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="admin/manageBookings"
                       className={({ isActive }) =>
    `flex items-center gap-2 font-bold hover:text-blue-600 ${
      isActive ? "text-blue-600 underline" : ""
    }`
  }
    
                  >
                    <TbBrandBooking/>
                    Manage Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="admin/analytics"
                   className={({ isActive }) =>
    `flex items-center gap-2 font-bold hover:text-blue-600 ${
      isActive ? "text-blue-600 underline" : ""
    }`
  }
                  >
                    <FaChartBar />
                    Analytics
                  </NavLink>
                </li>
              </ul>
            )}
          </>
        )}

        {/* DECORATOR DASHBOARD */}
        {(role === "decorator" || role === "admin") && (
          <>
            <hr className="my-4" />
            <button
              onClick={() => setDecoratorMenuOpen(!decoratorMenuOpen)}
              className="w-full text-left flex items-center gap-2 text-green-500 font-bold text-lg mb-3"
            >
              <GiPaintRoller />
              Decorator Dashboard
            </button>
            {decoratorMenuOpen && (
              <ul className="space-y-2 ml-4 mt-2">
                <li>
                 <NavLink
  to="decorator/home"
  className={({ isActive }) =>
    `flex items-center gap-2 font-bold hover:text-blue-600 ${
      isActive ? "text-blue-600 underline" : ""
    }`
  }
>
  <MdHomeWork size={20} />
  Decorator Home
</NavLink>
                </li>
                <li>
                  <NavLink
                    to="decorator/assignedProjects"
                    className={({ isActive }) =>
    `flex items-center gap-2 font-bold hover:text-blue-600 ${
      isActive ? "text-blue-600 underline" : ""
    }`
  }
                  >
                    <GoProjectSymlink />
                    Assigned Projects
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="decorator/todaysSchedule"
                    className={({ isActive }) =>
    `flex items-center gap-2 font-bold hover:text-blue-600 ${
      isActive ? "text-blue-600 underline" : ""
    }`
  }
                  >
                    <MdSchedule />
                    Today Schedule
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="decorator/updateStatus"
                     className={({ isActive }) =>
    `flex items-center gap-2 font-bold hover:text-blue-600 ${
      isActive ? "text-blue-600 underline" : ""
    }`
  }
                  >
                    <MdBrowserUpdated />
                    Update Project Status
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="decorator/earnings"
                   className={({ isActive }) =>
    `flex items-center gap-2 font-bold hover:text-blue-600 ${
      isActive ? "text-blue-600 underline" : ""
    }`
  }
                  >
                    <FaMoneyBillWave />
                    Earnings Summary
                  </NavLink>
                </li>
              </ul>
            )}
          </>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-pink-50 p-6">
        <h1 className="text-5xl font-bold mb-6 text-center flex flex-col items-center justify-center gap-2">
  👋 Welcome, {user?.displayName}!
  <span className="text-2xl font-medium text-green-400">
    Today is {new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })}
  </span>
</h1>

        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
