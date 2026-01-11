import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSave,
  FiX,
  FiPackage,
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiActivity,
} from "react-icons/fi";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalServices: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    axiosSecure
      .get("/admin/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure]);

  const fetchServices = () => {
    axiosSecure
      .get("/services")
      .then((res) => {
        setServices(res.data);
        setServicesLoading(false);
      })
      .catch(() => {
        setServicesLoading(false);
        Swal.fire("Error", "Failed to load services", "error");
      });
  };

  useEffect(() => {
    if (activeTab === "services") fetchServices();
  }, [activeTab, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This service will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/services/${id}`).then(() => {
          setServices(services.filter((s) => s._id !== id));
          setStats((p) => ({ ...p, totalServices: p.totalServices - 1 }));
          Swal.fire("Deleted!", "Service has been deleted.", "success");
        });
      }
    });
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setEditName(service.serviceName || service.name);
    setEditPrice(service.price);
  };

  const handleSave = () => {
    if (!editName || !editPrice) {
      Swal.fire("Error", "Service name and price are required!", "error");
      return;
    }

    axiosSecure
      .patch(`/services/${editingService._id}`, {
        serviceName: editName,
        price: editPrice,
      })
      .then(() => {
        setServices(
          services.map((s) =>
            s._id === editingService._id
              ? { ...s, serviceName: editName, price: editPrice }
              : s
          )
        );
        setEditingService(null);
        Swal.fire("Updated!", "Service has been updated.", "success");
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
    <div className="p-4 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Overview and statistics
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 text-sm flex items-center gap-2 ${
            activeTab === "overview"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <FiActivity /> Dashboard Overview
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          ["Total Users", stats.totalUsers, FiUsers, "blue"],
          ["Total Services", stats.totalServices, FiPackage, "green"],
          ["Total Bookings", stats.totalBookings, FiCalendar, "purple"],
          ["Total Revenue", `৳ ${stats.totalRevenue}`, FiDollarSign, "orange"],
        ].map(([title, value, Icon, color], i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 bg-${color}-100 rounded`}>
                <Icon className={`text-${color}-600`} />
              </div>
              <h3 className="font-medium">{title}</h3>
            </div>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* Welcome */}
      <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-2">Welcome, Admin</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Manage your platform and monitor performance.
        </p>
      </div>

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiEdit2 /> Edit Service
            </h2>

            <input
              className="w-full p-3 border dark:border-gray-700 rounded mb-3 bg-transparent"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <input
              className="w-full p-3 border dark:border-gray-700 rounded"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingService(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
