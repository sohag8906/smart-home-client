import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
 // path ঠিক করে নিতে হবে

const ManageDecorators = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  const handleMakeDecorator = (id) => {
    Swal.fire({
      title: "Make Decorator?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${id}/role`, { role: "decorator" })
          .then(() => {
            Swal.fire("Success", "User is now a Decorator", "success");
            setUsers(prev => prev.map(user =>
              user._id === id ? { ...user, role: "decorator" } : user
            ));
          });
      }
    });
  };

  const handleRemoveDecorator = (id) => {
    Swal.fire({
      title: "Remove Decorator?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${id}/role`, { role: "user" })
          .then(() => {
            Swal.fire("Removed", "Decorator role removed", "success");
            setUsers(prev => prev.map(user =>
              user._id === id ? { ...user, role: "user" } : user
            ));
          });
      }
    });
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Decorators</h1>

      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td><img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" /></td>
              <td>{user.displayName}</td>
              <td>{user.email}</td>
              <td className="capitalize">{user.role}</td>
              <td>
                {user.role === "decorator" ? (
                  <button onClick={() => handleRemoveDecorator(user._id)} className="btn btn-sm btn-error">Remove</button>
                ) : (
                  <button onClick={() => handleMakeDecorator(user._id)} className="btn btn-sm btn-success">Make Decorator</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDecorators;
