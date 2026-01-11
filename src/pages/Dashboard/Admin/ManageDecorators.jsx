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
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <FiUsers className="text-xl" />
              </div>
              Manage Users
            </h1>
            <p className="text-gray-600 mt-2">Manage user roles and permissions</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Total Users:</span>
                <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {users.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Users
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Role
              </label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          {/* Total Users Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiUsers className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-700">Total Users</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{roleCounts.all}</p>
          </div>

          {/* Regular Users Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FiUser className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-700">Regular Users</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{roleCounts.user}</p>
          </div>

          {/* Decorators Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiStar className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-700">Decorators</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{roleCounts.decorator}</p>
          </div>

          {/* Admins Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiShield className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-700">Admins</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{roleCounts.admin}</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-10 bg-white border border-gray-200 rounded-lg">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiUserX className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No users found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchTerm ? "Try adjusting your search term" : "No users match the selected filter"}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-medium text-gray-700">#</th>
                  <th className="text-left p-4 font-medium text-gray-700">Photo</th>
                  <th className="text-left p-4 font-medium text-gray-700">Name</th>
                  <th className="text-left p-4 font-medium text-gray-700">Email</th>
                  <th className="text-left p-4 font-medium text-gray-700">Role</th>
                  <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr 
                    key={user._id} 
                    className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="h-8 w-8 flex items-center justify-center bg-gray-100 text-gray-800 rounded-full font-medium">
                        {index + 1}
                      </div>
                    </td>
                    <td className="p-4">
                      <img 
                        src={user.photoURL || "/default-avatar.png"} 
                        alt={user.displayName} 
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        onError={(e) => {
                          e.target.src = "/default-avatar.png";
                        }}
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {user.displayName || "No Name"}
                    </td>
                    <td className="p-4 text-gray-600">
                      {user.email}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        user.role === "admin" 
                          ? "bg-purple-100 text-purple-800" 
                          : user.role === "decorator" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
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
        <div className="mt-6 text-sm text-gray-500 flex justify-between items-center">
          <div>
            Showing {filteredUsers.length} of {users.length} users
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
              <span>User: {roleCounts.user}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-200 rounded-full"></div>
              <span>Decorator: {roleCounts.decorator}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-200 rounded-full"></div>
              <span>Admin: {roleCounts.admin}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDecorators;