import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { 
  FiUser, FiUserCheck, FiUserX, FiUsers, 
  FiShield, FiStar, FiEdit2, FiTrash2 
} from "react-icons/fi";

const ManageDecorators = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const axiosSecure = useAxiosSecure();

  // Load all users
  useEffect(() => {
    setLoading(true);
    axiosSecure.get("/users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        Swal.fire("Error", "Failed to load users", "error");
      });
  }, [axiosSecure]);

  // Make user a Decorator
  const handleMakeDecorator = (id, name) => {
    Swal.fire({
      title: "Make Decorator?",
      text: `Make "${name}" a Decorator?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, make Decorator",
      cancelButtonText: "Cancel"
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${id}/role`, { role: "decorator" })
          .then(() => {
            Swal.fire("Success!", `${name} is now a Decorator`, "success");
            setUsers(prev => prev.map(user =>
              user._id === id ? { ...user, role: "decorator" } : user
            ));
          })
          .catch(err => {
            console.error(err);
            Swal.fire("Error", "Failed to update role", "error");
          });
      }
    });
  };

  // Make user an Admin
  const handleMakeAdmin = (id, name) => {
    Swal.fire({
      title: "Make Admin?",
      text: `Make "${name}" an Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, make Admin",
      cancelButtonText: "Cancel"
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${id}/role`, { role: "admin" })
          .then(() => {
            Swal.fire("Success!", `${name} is now an Admin`, "success");
            setUsers(prev => prev.map(user =>
              user._id === id ? { ...user, role: "admin" } : user
            ));
          })
          .catch(err => {
            console.error(err);
            Swal.fire("Error", "Failed to update role", "error");
          });
      }
    });
  };

  // Remove Decorator/Admin (set back to user)
  const handleRemoveRole = (id, name, currentRole) => {
    Swal.fire({
      title: `Remove ${currentRole} role?`,
      text: `Remove ${currentRole} role from "${name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, remove ${currentRole}`,
      cancelButtonText: "Cancel"
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${id}/role`, { role: "user" })
          .then(() => {
            Swal.fire("Removed!", `${name} is now a regular user`, "success");
            setUsers(prev => prev.map(user =>
              user._id === id ? { ...user, role: "user" } : user
            ));
          })
          .catch(err => {
            console.error(err);
            Swal.fire("Error", "Failed to update role", "error");
          });
      }
    });
  };

  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = 
      roleFilter === "all" || 
      user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  // Get role counts
  const roleCounts = {
    all: users.length,
    user: users.filter(u => u.role === "user").length,
    decorator: users.filter(u => u.role === "decorator").length,
    admin: users.filter(u => u.role === "admin").length,
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <FiUsers className="text-xl" />
              </div>
              Manage Users
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Manage user roles and permissions</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-gradient-to-r from-blue-50 dark:from-gray-700 to-indigo-50 dark:to-gray-800 px-4 py-2 rounded-lg border border-blue-100 dark:border-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-200">Total Users:</span>
                <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {users.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Search Users
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Filter by Role
              </label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              >
                <option value="all">All Roles ({roleCounts.all})</option>
                <option value="user">Users ({roleCounts.user})</option>
                <option value="decorator">Decorators ({roleCounts.decorator})</option>
                <option value="admin">Admins ({roleCounts.admin})</option>
              </select>
            </div>
          </div>
        </div>

        {/* Role Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {["all", "user", "decorator", "admin"].map((role, i) => {
            const colors = {
              all: ["blue", "blue"],
              user: ["gray", "gray"],
              decorator: ["green", "green"],
              admin: ["purple", "purple"],
            };
            return (
              <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 bg-${colors[role][0]}-100 dark:bg-gray-700 rounded-lg`}>
                    {role === "all" && <FiUsers className={`w-5 h-5 text-${colors[role][1]}-600`} />}
                    {role === "user" && <FiUser className={`w-5 h-5 text-${colors[role][1]}-600`} />}
                    {role === "decorator" && <FiStar className={`w-5 h-5 text-${colors[role][1]}-600`} />}
                    {role === "admin" && <FiShield className={`w-5 h-5 text-${colors[role][1]}-600`} />}
                  </div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-200">
                    {role === "all" ? "Total Users" : role === "user" ? "Regular Users" : role === "decorator" ? "Decorators" : "Admins"}
                  </h3>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {roleCounts[role]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <FiUserX className="text-gray-400 dark:text-gray-300 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">No users found</h3>
          <p className="text-gray-500 dark:text-gray-300 max-w-md mx-auto">
            {searchTerm ? "Try adjusting your search term" : "No users match the selected filter"}
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-200">#</th>
                  <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-200">Photo</th>
                  <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-200">Name</th>
                  <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-200">Email</th>
                  <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-200">Role</th>
                  <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="p-4">
                      <div className="h-8 w-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-full font-medium">
                        {index + 1}
                      </div>
                    </td>
                    <td className="p-4">
                      <img 
                        src={user.photoURL || "/default-avatar.png"} 
                        alt={user.displayName} 
                        className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                        onError={(e) => { e.target.src = "/default-avatar.png"; }}
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                      {user.displayName || "No Name"}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        user.role === "admin" 
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200" 
                          : user.role === "decorator" 
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200" 
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {user.role === "user" && (
                          <>
                            <button
                              onClick={() => handleMakeDecorator(user._id, user.displayName)}
                              className="btn btn-sm btn-success flex items-center gap-2"
                            >
                              <FiStar />
                              Make Decorator
                            </button>
                            <button
                              onClick={() => handleMakeAdmin(user._id, user.displayName)}
                              className="btn btn-sm btn-primary flex items-center gap-2"
                            >
                              <FiShield />
                              Make Admin
                            </button>
                          </>
                        )}
                        {user.role === "decorator" && (
                          <button
                            onClick={() => handleRemoveRole(user._id, user.displayName, "Decorator")}
                            className="btn btn-sm btn-error flex items-center gap-2"
                          >
                            <FiUserX />
                            Remove Decorator
                          </button>
                        )}
                        {user.role === "admin" && (
                          <button
                            onClick={() => handleRemoveRole(user._id, user.displayName, "Admin")}
                            className="btn btn-sm btn-error flex items-center gap-2"
                          >
                            <FiUserX />
                            Remove Admin
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer Stats */}
      {filteredUsers.length > 0 && (
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-300 flex justify-between items-center">
          <div>
            Showing {filteredUsers.length} of {users.length} users
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
              <span>User: {roleCounts.user}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-200 dark:bg-green-600 rounded-full"></div>
              <span>Decorator: {roleCounts.decorator}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-200 dark:bg-purple-600 rounded-full"></div>
              <span>Admin: {roleCounts.admin}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDecorators;
