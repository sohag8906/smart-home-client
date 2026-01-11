import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user?.email) {
      fetch(`https://smart-home-server-five.vercel.app/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => setUserData(data));
    }
  }, [user?.email]);

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-5 text-green-600 text-center">My Profile</h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <img
          src={user?.photoURL || "https://i.ibb.co/yp4H0kP/user.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-green-200"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="table w-full">
          <tbody>
            <tr className="hover:bg-gray-50">
              <th className="bg-green-50 w-40 text-green-700">Name</th>
              <td className="text-gray-800">{userData.displayName || user?.displayName || "Not set"}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <th className="bg-green-50 text-green-700">Email</th>
              <td className="text-gray-800">{userData.email || user?.email || "Not available"}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <th className="bg-green-50 text-green-700">Role</th>
              <td className="text-gray-800">{userData.role || "User"}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <th className="bg-green-50 text-green-700">Joined</th>
              <td className="text-gray-800">
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
        <button className="btn bg-green-600 hover:bg-green-700 text-white border-0">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;