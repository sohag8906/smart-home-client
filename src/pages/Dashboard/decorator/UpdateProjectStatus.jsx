import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { 
  FiCheckCircle, 
  FiClock, 
  FiCalendar, 
  FiUser, 
  FiPackage,
  FiEdit2,
  FiRefreshCw
} from "react-icons/fi";

const UpdateProjectStatus = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!user?.email) return;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const token = await user.getIdToken();
        const res = await axios.get(
          `https://smart-home-server-five.vercel.app/projects/assigned/${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjects(res.data);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || "Failed to fetch projects",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      const token = await user.getIdToken();
      await axios.patch(
        `https://smart-home-server-five.vercel.app/projects/${projectId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProjects((prev) =>
        prev.map((p) =>
          p._id === projectId ? { ...p, status: newStatus } : p
        )
      );

      Swal.fire({
        icon: "success",
        title: "Status Updated!",
        text: `Project marked as "${newStatus}"`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Status update failed",
      });
    }
  };

  const filteredProjects = projects.filter(project => {
    if (statusFilter === "all") return true;
    return project.status === statusFilter;
  });

  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === "completed").length;
  const inProgressProjects = projects.filter(p => p.status === "in-progress").length;
  const pendingProjects = projects.filter(p => p.status === "pending").length;

  if (loading) {
    return (
      <div className="flex justify-center py-10 dark:bg-gray-900">
        <span className="loading loading-spinner loading-lg text-primary dark:text-blue-400"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-purple-600 text-white rounded-lg">
                <FiEdit2 className="text-2xl" />
              </div>
              Update Project Status
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Update and track your assigned projects</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-4 py-2 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300">Total Projects:</span>
                <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {totalProjects}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Projects */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FiPackage className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Total Projects</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalProjects}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Assigned to you</p>
          </div>

          {/* Completed */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <FiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Completed</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{completedProjects}</p>
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
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{inProgressProjects}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Currently working</p>
          </div>

          {/* Pending */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <FiCalendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Pending</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{pendingProjects}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Awaiting start</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <FiRefreshCw className="text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Status:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {[
                { value: "all", label: "All Projects", color: "blue", darkColor: "blue" },
                { value: "pending", label: "Pending", color: "gray", darkColor: "gray" },
                { value: "in-progress", label: "In Progress", color: "yellow", darkColor: "yellow" },
                { value: "completed", label: "Completed", color: "green", darkColor: "green" }
              ].map(({ value, label, color, darkColor }) => (
                <button
                  key={value}
                  onClick={() => setStatusFilter(value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === value
                      ? `bg-${color}-100 dark:bg-${darkColor}-900/30 text-${color}-800 dark:text-${darkColor}-300 border border-${color}-300 dark:border-${darkColor}-700`
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {label}
                  {value !== "all" && (
                    <span className="ml-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full">
                      {projects.filter(p => p.status === value).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {statusFilter === "all" ? "All Projects" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Projects
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm px-3 py-1 rounded-full ml-3">
              {filteredProjects.length}
            </span>
          </h2>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FiPackage className="text-gray-400 dark:text-gray-300 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              {statusFilter === "all" 
                ? "You don't have any assigned projects yet" 
                : `No ${statusFilter} projects found`}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredProjects.map((project) => (
              <div 
                key={project._id} 
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  {/* Project Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <FiPackage className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {project.serviceName}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                            project.status === "completed" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                              : project.status === "in-progress" 
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" 
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <FiUser className="text-gray-400" />
                            <span>Client: {project.customerEmail}</span>
                          </div>
                          
                          {project.date && (
                            <div className="flex items-center gap-2">
                              <FiCalendar className="text-gray-400" />
                              <span>Date: {new Date(project.date).toLocaleDateString()}</span>
                            </div>
                          )}
                          
                          {project.time && (
                            <div className="flex items-center gap-2">
                              <FiClock className="text-gray-400" />
                              <span>Time: {project.time}</span>
                            </div>
                          )}
                          
                          {project.location && (
                            <div className="flex items-center gap-2">
                              <FiCalendar className="text-gray-400" />
                              <span>Location: {project.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      className={`btn btn-sm flex items-center gap-2 ${
                        project.status === "completed" 
                          ? "btn-success" 
                          : "btn-outline btn-success dark:text-green-300 dark:border-green-300"
                      }`}
                      onClick={() => handleStatusChange(project._id, "completed")}
                      disabled={project.status === "completed"}
                    >
                      <FiCheckCircle />
                      Mark Completed
                    </button>
                    
                    <button
                      className={`btn btn-sm flex items-center gap-2 ${
                        project.status === "in-progress" 
                          ? "btn-warning" 
                          : "btn-outline btn-warning dark:text-yellow-300 dark:border-yellow-300"
                      }`}
                      onClick={() => handleStatusChange(project._id, "in-progress")}
                      disabled={project.status === "in-progress"}
                    >
                      <FiClock />
                      Mark In Progress
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        {filteredProjects.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredProjects.length} of {projects.length} projects
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm dark:text-gray-300">Completed: {completedProjects}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm dark:text-gray-300">In Progress: {inProgressProjects}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
                  <span className="text-sm dark:text-gray-300">Pending: {pendingProjects}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProjectStatus;