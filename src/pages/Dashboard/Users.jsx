import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(res => {
                console.log("Users from backend:", res.data);
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching users:", err);
                setError("Failed to load users");
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Users: {users.length}</h2>

            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table className="table-auto w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">User ID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="border px-4 py-2">{user._id}</td>

                                <td className="border px-4 py-2">
                                    {user.name ||
                                     user.displayName ||
                                     user.username ||
                                     "No Name"}
                                </td>

                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.role || "user"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Users;
