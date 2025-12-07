import React from 'react';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
            
            {/* Profile Image */}
            <div className="flex justify-center">
                <img
                    src={user?.photoURL || "https://i.ibb.co/yp4H0kP/user.png"}
                    alt="User"
                    className="w-28 h-28 rounded-full border shadow"
                />
            </div>

            {/* User Info */}
            <h2 className="text-2xl font-semibold text-center mt-4">
                {user?.displayName || "Unknown User"}
            </h2>

            <p className="text-center text-gray-600 mt-2">
                {user?.email || "No email available"}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">
                <button className="btn btn-primary w-full">
                    Edit Profile
                </button>

                
            </div>
        </div>
    );
};

export default Profile;
