import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // Fetch all services
  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      });
  }, []);

  // Delete service
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This service will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/services/${id}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(() => {
            const remaining = services.filter(service => service._id !== id);
            setServices(remaining);

            Swal.fire("Deleted!", "Service has been deleted.", "success");
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

  // Save changes
  const handleSave = () => {
    fetch(`http://localhost:3000/services/${editingService._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceName: editName, price: editPrice })
    })
      .then(res => res.json())
      .then(() => {
        const updatedServices = services.map(s =>
          s._id === editingService._id ? { ...s, serviceName: editName, price: editPrice } : s
        );
        setServices(updatedServices);
        setEditingService(null);
        Swal.fire("Updated!", "Service has been updated.", "success");
      });
  };

  if (loading) return <p className="text-center">Loading services...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>

      {services.length === 0 ? (
        <p>No services found</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service, index) => (
              <tr key={service._id}>
                <td>{index + 1}</td>
                <td>{service.serviceName || service.name}</td>
                <td>{service.price} ৳</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-xl font-bold mb-4">Edit Service</h2>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full border p-2 mb-4"
              placeholder="Service Name"
            />
            <input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              className="w-full border p-2 mb-4"
              placeholder="Price"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingService(null)}
                className="btn btn-sm btn-gray"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn btn-sm btn-success"
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

export default ManageService;
