import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdDashboard, MdFreeCancellation, MdOutlinePayment } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [decoratorMenuOpen, setDecoratorMenuOpen] = useState(false);
  const [role, setRole] = useState(""); // role declare

  // Firebase / backend থেকে role fetch
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/users/${user.email}/role`)
        .then(res => res.json())
        .then(data => setRole(data.role))
        .catch(err => console.error(err));
    }
  }, [user]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-100 p-4 border-r">
        {/* HOME */}
        <NavLink to="/">
          <h2 className="text-xl font-bold mb-4">Home Page</h2>
        </NavLink>

        {/* USER DASHBOARD */}
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-full text-left flex items-center gap-2 font-semibold text-lg mb-3"
        >
          <MdDashboard />
          User Dashboard
        </button>
        {userMenuOpen && (
          <ul className="space-y-2 ml-4 mt-2">
            <li className="flex gap-2 items-center">
              <ImProfile />
              <NavLink className="font-bold" to="profile">My Profile</NavLink>
            </li>
            <li className="flex gap-2 items-center">
              <TbBrandBooking />
              <NavLink className="font-bold" to="myBookings">My Bookings</NavLink>
            </li>
            <li className="flex gap-2 items-center">
              <MdFreeCancellation />
              <NavLink className="font-bold" to="bookingCancellation">Booking Cancellation</NavLink>
            </li>
            <li className="flex gap-2 items-center">
              <MdOutlinePayment />
              <NavLink className="font-bold" to="paymentHistory">Payment History</NavLink>
            </li>
          </ul>
        )}

        {/* ADMIN DASHBOARD */}
        <hr className="my-4" />
        <button
          onClick={() => setAdminMenuOpen(!adminMenuOpen)}
          className="w-full text-left flex items-center gap-2 font-semibold text-lg mb-3"
        >
          <MdDashboard />
          Admin Dashboard
        </button>
        {adminMenuOpen && role === "admin" && (
          <ul className="space-y-2 ml-4 mt-2">
            <li><NavLink to="admin">Admin Home</NavLink></li>
            <li><NavLink to="admin/manageServices">Manage Services</NavLink></li>
            <li><NavLink to="admin/manageDecorators">Manage Decorators</NavLink></li>
            <li><NavLink to="admin/manageBookings">Manage Bookings</NavLink></li>
            <li><NavLink to="admin/analytics">Analytics</NavLink></li>
          </ul>
        )}

        {/* DECORATOR DASHBOARD */}
        <hr className="my-4" />
        <button
          onClick={() => setDecoratorMenuOpen(!decoratorMenuOpen)}
          className="w-full text-left flex items-center gap-2 font-semibold text-lg mb-3"
        >
          <MdDashboard />
          Decorator Dashboard
        </button>
        {decoratorMenuOpen && (
          <ul className="space-y-2 ml-4 mt-2">
            <li><NavLink to="decorator/home">Decorator Home</NavLink></li>
            <li><NavLink to="decorator/assignedProjects">Assigned Projects</NavLink></li>
            <li><NavLink to="decorator/todaysSchedule">Today Schedule</NavLink></li>
            <li><NavLink to="decorator/updateStatus">Update Project Status</NavLink></li>
            <li><NavLink to="decorator/earnings">Earnings Summary</NavLink></li>
          </ul>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
