import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiX, FiPackage, FiUsers, FiCalendar, FiDollarSign, FiActivity } from "react-icons/fi";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalServices: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  
  // Manage Service State
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch Dashboard Stats
  useEffect(() => {
    axiosSecure.get("/admin/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure]);

  // Fetch Services
  const fetchServices = () => {
    axiosSecure.get("/services")
      .then(res => {
        setServices(res.data);
        setServicesLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch services:", err);
        setServicesLoading(false);
        Swal.fire("Error", "Failed to load services", "error");
      });
  };

  useEffect(() => {
    if (activeTab === "services") {
      fetchServices();
    }
  }, [activeTab, axiosSecure]);

  // Delete service
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This service will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/services/${id}`)
          .then(() => {
            setServices(services.filter(service => service._id !== id));
            setStats(prev => ({ ...prev, totalServices: prev.totalServices - 1 }));
            Swal.fire("Deleted!", "Service has been deleted.", "success");
          })
          .catch(err => {
            console.error("Delete failed:", err);
            Swal.fire("Error", "Failed to delete service", "error");
          });
      }
    });
  };

  // Open edit modal
  const handleEdit = (service) => {
    setEditingService(service);
    setEditName(service.serviceName || service.name);
    setEditPrice(service.price);
  };

  // Save edited service
  const handleSave = () => {
    if (!editName || !editPrice) {
      Swal.fire("Error", "Service name and price are required!", "error");
      return;
    }

    axiosSecure.patch(`/services/${editingService._id}`, {
      serviceName: editName,
      price: editPrice
    })
      .then(() => {
        const updated = services.map(s =>
          s._id === editingService._id ? { ...s, serviceName: editName, price: editPrice } : s
        );
        setServices(updated);
        setEditingService(null);
        Swal.fire("Updated!", "Service has been updated.", "success");
      })
      .catch(err => {
        console.error("Update failed:", err);
        Swal.fire("Error", "Failed to update service", "error");
      });
  };

  // Add new service
  const handleAdd = () => {
    if (!newName || !newPrice) {
      Swal.fire("Error", "Service name and price are required!", "error");
      return;
    }

    const newService = { serviceName: newName, price: newPrice };

    axiosSecure.post("/services", newService)
      .then(() => {
        fetchServices();
        setStats(prev => ({ ...prev, totalServices: prev.totalServices + 1 }));
        setNewName("");
        setNewPrice("");
        setIsAdding(false);
        Swal.fire("Added!", "New service has been added.", "success");
      })
      .catch(err => {
        console.error("Add failed:", err);
        Swal.fire("Error", "Failed to add service", "error");
      });
  };

  if (loading && activeTab === "overview") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <p className="text-gray-600 mt-1">Overview and statistics</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium text-sm transition-colors relative ${activeTab === "overview"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500 hover:text-gray-700"
            }`}
        >
          <div className="flex items-center gap-2">
            <FiActivity />
            Dashboard Overview
          </div>
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`px-4 py-2 font-medium text-sm transition-colors relative ${activeTab === "services"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
            }`}
        >
         
        </button>
      </div>

      {/* Overview Tab Content */}
      {activeTab === "overview" && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Users Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiUsers className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-700">Total Users</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>

            {/* Services Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FiPackage className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-700">Total Services</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.totalServices}</p>
            </div>

            {/* Bookings Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FiCalendar className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-700">Total Bookings</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
            </div>

            {/* Revenue Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FiDollarSign className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-medium text-gray-700">Total Revenue</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">৳ {stats.totalRevenue?.toLocaleString() || 0}</p>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Welcome, Admin</h3>
            <p className="text-gray-600 mb-4">
              Manage your platform, view analytics, and monitor performance from this dashboard.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setActiveTab("services")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm flex items-center gap-2"
              >
                <FiPackage />
                Manage Services
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm flex items-center gap-2">
                <FiActivity />
                View Reports
              </button>
            </div>
          </div>
        </>
      )}

    

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FiEdit2 className="text-blue-500" />
                Edit Service
              </h2>
              <button
                onClick={() => setEditingService(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Service Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (৳)
                </label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Price"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setEditingService(null)}
                className="btn btn-sm btn-outline flex items-center gap-2"
              >
                <FiX />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn btn-sm btn-success flex items-center gap-2"
              >
                <FiSave />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;