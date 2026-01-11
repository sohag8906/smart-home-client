import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhoto, setEditPhoto] = useState("");

  // Fetch user data
  useEffect(() => {
    if (user?.email) {
      fetch(`https://smart-home-server-five.vercel.app/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setEditName(data.displayName || "");
          setEditPhoto(data.photoURL || "");
        });
    }
  }, [user?.email]);

  // Save updated profile
  const handleSave = () => {
    if (!editName) {
      Swal.fire("Error", "Name cannot be empty", "error");
      return;
    }

    fetch(`https://smart-home-server-five.vercel.app/users/${user.email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName: editName, photoURL: editPhoto }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData((prev) => ({ ...prev, displayName: editName, photoURL: editPhoto }));
        setEditing(false);
        Swal.fire("Updated!", "Profile updated successfully.", "success");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update profile", "error");
      });
  };

  return (
    <div
      className="p-5 max-w-xl mx-auto
      bg-white dark:bg-gray-900
      text-gray-800 dark:text-gray-100
      rounded-xl transition-colors duration-300"
    >
      <h2 className="text-3xl font-bold mb-5 text-green-600 dark:text-green-400 text-center">
        My Profile
      </h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <img
          src={editPhoto || user?.photoURL || "https://i.ibb.co/yp4H0kP/user.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-green-200 dark:border-green-600"
        />
      </div>

      {/* Edit Fields */}
      {editing && (
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Photo URL</label>
            <input
              type="text"
              value={editPhoto}
              onChange={(e) => setEditPhoto(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
        </div>
      )}

      {/* TABLE */}
      <div
        className="overflow-x-auto shadow-md rounded-lg border 
        border-gray-200 dark:border-gray-700"
      >
        <table className="table w-full">
          <tbody>
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <th className="bg-green-50 dark:bg-gray-800 w-40 text-green-700 dark:text-green-400">
                Name
              </th>
              <td className="text-gray-800 dark:text-gray-200">
                {userData.displayName || user?.displayName || "Not set"}
              </td>
            </tr>

            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <th className="bg-green-50 dark:bg-gray-800 text-green-700 dark:text-green-400">
                Email
              </th>
              <td className="text-gray-800 dark:text-gray-200">
                {userData.email || user?.email || "Not available"}
              </td>
            </tr>

            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <th className="bg-green-50 dark:bg-gray-800 text-green-700 dark:text-green-400">
                Role
              </th>
              <td className="text-gray-800 dark:text-gray-200">{userData.role || "User"}</td>
            </tr>

            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <th className="bg-green-50 dark:bg-gray-800 text-green-700 dark:text-green-400">
                Joined
              </th>
              <td className="text-gray-800 dark:text-gray-200">
                {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Edit Button */}
      <div className="mt-6 text-center">
        {editing ? (
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setEditing(false)}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="px-6 py-2 rounded-lg font-medium bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
