import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiX, FiPackage } from "react-icons/fi";

const ManageService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingService, setEditingService] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Fetch all services
  const fetchServices = () => {
    setLoading(true);
    fetch("https://smart-home-server-five.vercel.app/services")
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching services:", error);
        setLoading(false);
        Swal.fire("Error", "Failed to load services", "error");
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

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
        fetch(`https://smart-home-server-five.vercel.app/services/${id}`, { 
          method: "DELETE" 
        })
          .then(res => res.json())
          .then(() => {
            setServices(services.filter(service => service._id !== id));
            Swal.fire("Deleted!", "Service has been deleted.", "success");
          })
          .catch(error => {
            console.error("Error deleting service:", error);
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

    fetch(`https://smart-home-server-five.vercel.app/services/${editingService._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceName: editName, price: editPrice })
    })
      .then(res => res.json())
      .then(() => {
        const updated = services.map(s =>
          s._id === editingService._id ? { ...s, serviceName: editName, price: editPrice } : s
        );
        setServices(updated);
        setEditingService(null);
        Swal.fire("Updated!", "Service has been updated.", "success");
      })
      .catch(error => {
        console.error("Error updating service:", error);
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

    fetch("https://smart-home-server-five.vercel.app/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newService)
    })
      .then(res => res.json())
      .then(() => {
        fetchServices();
        setNewName("");
        setNewPrice("");
        setIsAdding(false);
        Swal.fire("Added!", "New service has been added.", "success");
      })
      .catch(error => {
        console.error("Error adding service:", error);
        Swal.fire("Error", "Failed to add service", "error");
      });
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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
          <div className="p-2 bg-blue-600 text-white rounded-lg">
            <FiPackage />
          </div>
          Manage Services
          <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
            {services.length}
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Add, edit or remove services from your system</p>
      </div>

      {/* Add new service card */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="mb-3 md:mb-0">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 text-lg flex items-center gap-2">
              <FiPlus className="text-blue-600" />
              Add New Service
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Create a new service for your customers</p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="btn btn-sm btn-primary flex items-center gap-2"
          >
            {isAdding ? <FiX /> : <FiPlus />}
            {isAdding ? "Cancel" : "Add Service"}
          </button>
        </div>

        {isAdding && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Service Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Home Cleaning, AC Repair"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Price (৳) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-300">৳</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="btn btn-success flex items-center gap-2"
            >
              <FiSave />
              Add Service
            </button>
          </div>
        )}
      </div>

      {/* List services */}
      {services.length === 0 ? (
        <div className="text-center py-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <FiPackage className="text-gray-400 dark:text-gray-300 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">No services found</h3>
          <p className="text-gray-500 dark:text-gray-300 max-w-md mx-auto mb-6">
            Get started by adding your first service using the "Add Service" button above.
          </p>
          <button
            onClick={() => setIsAdding(true)}
            className="btn btn-primary flex items-center gap-2 mx-auto"
          >
            <FiPlus />
            Add First Service
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-200">#</th>
                  <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-200">Service Name</th>
                  <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-200">Price</th>
                  <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-200">Action</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr 
                    key={service._id} 
                    className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="p-4">
                      <div className="h-8 w-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-full font-medium">
                        {index + 1}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                      {service.serviceName || service.name}
                    </td>
                    <td className="p-4 font-bold text-blue-700 dark:text-blue-400">
                      ৳{parseFloat(service.price).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="btn btn-sm btn-warning flex items-center gap-2"
                        >
                          <FiEdit2 />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="btn btn-sm btn-error flex items-center gap-2"
                        >
                          <FiTrash2 />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  <FiEdit2 className="text-blue-600" />
                  Edit Service
                </h2>
                <button
                  onClick={() => setEditingService(null)}
                  className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 p-1"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Service Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                    placeholder="Service Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Price (৳)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-300">৳</span>
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                      placeholder="Price"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
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
        </div>
      )}
    </div>
  );
};

export default ManageService;
