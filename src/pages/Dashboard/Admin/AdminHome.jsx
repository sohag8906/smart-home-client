import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalServices: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    axiosSecure.get("/admin/stats").then((res) => {
      setStats(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="p-6">
      {/* Title */}
      <h2 className="text-4xl font-bold mb-8">
        Admin Dashboard 📊
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Users */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
        </div>

        {/* Services */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Services</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalServices}</p>
        </div>

        {/* Bookings */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Bookings</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalBookings}</p>
        </div>

        {/* Revenue */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-4xl font-bold mt-2">
            ৳ {stats.totalRevenue}
          </p>
        </div>

      </div>

      {/* Welcome Message */}
      <div className="mt-10 bg-white rounded-xl p-6 shadow">
        <h3 className="text-2xl font-semibold mb-2">
          Welcome, Admin 👋
        </h3>
        <p className="text-gray-600">
          You can manage users, services, bookings, and track earnings from here.
        </p>
      </div>
    </div>
  );
};

export default AdminHome;
