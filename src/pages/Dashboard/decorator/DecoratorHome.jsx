import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { 
  FiCalendar, 
  FiDollarSign, 
  FiCheckCircle, 
  FiClock, 
  FiUser,
  FiHome,
  FiTrendingUp
} from "react-icons/fi";

const DecoratorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [todayProjects, setTodayProjects] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [stats, setStats] = useState({
    completed: 0,
    inProgress: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch assigned projects and earnings
  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const resProjects = await axiosSecure.get(`/projects/assigned/${user.email}`);
        const todayStr = new Date().toDateString();

        // Today only
        const todayOnly = resProjects.data.filter(p => 
          new Date(p.date).toDateString() === todayStr
        );
        setTodayProjects(todayOnly);

        // Calculate stats
        const completed = resProjects.data.filter(p => p.status === "completed").length;
        const inProgress = resProjects.data.filter(p => p.status === "inProgress").length;
        const pending = resProjects.data.filter(p => p.status === "pending").length;
        
        setStats({ completed, inProgress, pending });

        // Earnings fetch
        const resEarnings = [
          { service: "Office Space Decoration", amount: 15000, date: "12/15/2025", status: "completed" },
          { service: "Birthday Decoration", amount: 12000, date: "12/14/2025", status: "completed" },
          { service: "Wedding Decoration", amount: 25000, date: "12/13/2025", status: "completed" },
        ];
        setEarnings(resEarnings);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, axiosSecure]);

  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
  const totalProjects = stats.completed + stats.inProgress + stats.pending;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 dark:bg-gray-900">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 dark:bg-gray-900">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.displayName || "Decorator"}!</h2>
            <p className="opacity-90 mt-2">Here's your daily overview and schedule</p>
          </div>
          <div className="mt-4 md:mt-0 bg-white/20 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <FiCalendar className="text-xl" />
              <span>{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Earnings */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <FiDollarSign className="w-5 h-5 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Total Earnings</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">৳ {totalEarnings.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">From all completed projects</p>
        </div>

        {/* Total Projects */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FiHome className="w-5 h-5 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Total Projects</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalProjects}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">All assigned projects</p>
        </div>

        {/* Completed Projects */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
              <FiCheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
            </div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Completed</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Successfully delivered</p>
        </div>

        {/* In Progress */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <FiClock className="w-5 h-5 text-yellow-600 dark:text-yellow-300" />
            </div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300">In Progress</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Currently working on</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <FiCalendar className="text-green-600" />
              Today's Schedule
            </h3>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-sm px-3 py-1 rounded-full">
              {todayProjects.length} tasks
            </span>
          </div>

          {todayProjects.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <FiCalendar className="text-gray-400 dark:text-gray-300 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No projects for today</h3>
              <p className="text-gray-500 dark:text-gray-400">Enjoy your day off!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todayProjects.map(project => (
                <div 
                  key={project._id} 
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{project.serviceName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <FiUser className="text-gray-400 dark:text-gray-300 text-sm" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">Client: {project.customerEmail}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === "completed" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                        : project.status === "inProgress" 
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" 
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  {project.time && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <FiClock className="text-sm" />
                      Time: {project.time}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Earnings Summary */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <FiTrendingUp className="text-green-600" />
              Recent Earnings
            </h3>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-sm px-3 py-1 rounded-full">
              {earnings.length} payments
            </span>
          </div>

          <div className="space-y-4">
            {earnings.map((e, i) => (
              <div 
                key={i} 
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{e.service}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Date: {e.date}</p>
                  </div>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1 rounded-full font-semibold">
                    ৳ {e.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Payment {e.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total Earnings Summary */}
          {earnings.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300">Total Earnings</span>
                <span className="text-2xl font-bold text-green-700 dark:text-green-400">৳ {totalEarnings.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">From all completed projects this month</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-3">
              <FiCalendar className="text-blue-600 dark:text-blue-300 text-xl" />
            </div>
            <p className="font-medium text-gray-800 dark:text-white">View Calendar</p>
          </button>
          
          <button className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-3">
              <FiCheckCircle className="text-green-600 dark:text-green-300 text-xl" />
            </div>
            <p className="font-medium text-gray-800 dark:text-white">Update Status</p>
          </button>
          
          <button className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-3">
              <FiDollarSign className="text-purple-600 dark:text-purple-300 text-xl" />
            </div>
            <p className="font-medium text-gray-800 dark:text-white">View Payments</p>
          </button>
          
          <button className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="mx-auto w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-3">
              <FiUser className="text-yellow-600 dark:text-yellow-300 text-xl" />
            </div>
            <p className="font-medium text-gray-800 dark:text-white">Client List</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DecoratorHome;