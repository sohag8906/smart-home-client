import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
 // তোমার Firebase auth hook
 // Axios with token

const Analytics = () => {
  const axiosSecure = useAxiosSecure(); // Axios instance with token
  const [usersCount, setUsersCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Total users
        const usersRes = await axiosSecure.get("/users");
        setUsersCount(usersRes.data.length);

        // Total bookings
        const bookingsRes = await axiosSecure.get("/bookings");
        setBookingsCount(bookingsRes.data.length);

        // Total services
        const servicesRes = await axiosSecure.get("/services");
        setServicesCount(servicesRes.data.length);

        setLoading(false);
      } catch (err) {
        console.error("Analytics fetch error:", err);
      }
    };

    fetchAnalytics();
  }, [axiosSecure]);

  if (loading) return <p>Loading analytics...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 bg-blue-100 rounded shadow text-center">
          <h2 className="font-bold text-lg">Total Users</h2>
          <p className="text-2xl">{usersCount}</p>
        </div>
        <div className="p-6 bg-green-100 rounded shadow text-center">
          <h2 className="font-bold text-lg">Total Bookings</h2>
          <p className="text-2xl">{bookingsCount}</p>
        </div>
        <div className="p-6 bg-yellow-100 rounded shadow text-center">
          <h2 className="font-bold text-lg">Total Services</h2>
          <p className="text-2xl">{servicesCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
