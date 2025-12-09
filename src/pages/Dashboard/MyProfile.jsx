import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => setUserData(data));
    }
  }, [user?.email]);

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-5 text-secondary text-center">My Profile</h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <img
          src={user?.photoURL || "https://i.ibb.co/yp4H0kP/user.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-2 border-gray-300"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto shadow-md rounded-lg border">
        <table className="table w-full">
          <tbody>
            <tr>
              <th className="bg-gray-100 w-40">Name</th>
              <td>{userData.displayName || user?.displayName}</td>
            </tr>
            <tr>
              <th className="bg-gray-100">Email</th>
              <td>{userData.email || user?.email}</td>
            </tr>
            <tr>
              <th className="bg-gray-100">Role</th>
              <td>{userData.role || "User"}</td>
            </tr>
            <tr>
              <th className="bg-gray-100">Joined</th>
              <td>
                {userData.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Edit Button */}
      <div className="mt-6 text-center">
        <button className="btn btn-primary">Edit Profile</button>
      </div>
    </div>
  );
};

export default MyProfile;
