import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DecoratorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [todayProjects, setTodayProjects] = useState([]);

  const earnings = [
    { service: "Office Space Decoration", amount: 15000, date: "12/15/2025" },
    { service: "Office Space Decoration", amount: 15000, date: "12/15/2025" },
  ];

  const totalEarnings = earnings.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/projects/assigned/${user.email}`)
      .then(res => {
        const today = new Date().toDateString();

        const todayOnly = res.data.filter(project => {
          const projectDate = new Date(project.date).toDateString();
          return projectDate === today;
        });

        setTodayProjects(todayOnly);
      })
      .catch(err => console.error(err));
  }, [user, axiosSecure]);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow">
        <h2 className="text-2xl font-bold">
          Welcome, {user?.displayName}
        </h2>
        <p className="opacity-90 mt-1">
          Here is your daily overview
        </p>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl p-6 shadow">
        <h3 className="text-xl font-semibold mb-4">
          📅 Today’s Schedule
        </h3>

        {todayProjects.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No projects assigned for today.
          </p>
        ) : (
          todayProjects.map(project => (
            <div
              key={project._id}
              className="border rounded-lg p-4 mb-3"
            >
              <p className="font-medium">{project.serviceName}</p>
              <p className="text-sm text-gray-500">
                Client: {project.customerEmail}
              </p>
              <p className="text-sm capitalize">
                Status: {project.status}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Earnings Summary */}
      <div className="bg-white rounded-xl p-6 shadow">
        <h3 className="text-xl font-semibold mb-4">
          💰 Earnings Summary
        </h3>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-green-700">Total Earnings</p>
          <h2 className="text-2xl font-bold text-green-800">
            ৳ {totalEarnings}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default DecoratorHome;
