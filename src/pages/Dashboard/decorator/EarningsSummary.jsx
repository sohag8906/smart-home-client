import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

const EarningsSummary = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPayments = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `http://localhost:3000/payment?email=${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPayments(res.data);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || "Failed to fetch payments",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user]);

  if (loading) return (
    <div className="flex justify-center py-10">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (payments.length === 0) return <p className="text-center py-6 text-gray-500">No earnings yet.</p>;

  const totalEarnings = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="p-4 space-y-6">
     
      <div className="bg-green-100 p-6 rounded-xl shadow text-center">
        <h2 className="text-lg font-semibold text-green-700">Total Earnings</h2>
        <p className="text-3xl font-bold text-green-900 mt-2">৳ {totalEarnings.toFixed(2)}</p>
      </div>

    
      <h2 className="text-2xl font-bold">Recent Payments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {payments.map(p => (
          <div key={p._id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow">
            <p className="font-semibold text-lg">{p.serviceName}</p>
            <p className="text-green-700 font-bold text-xl mt-1">৳ {p.amount}</p>
            <p className={`mt-1 font-semibold ${
              p.paymentStatus === "paid" ? "text-green-600" : "text-red-600"
            }`}>Status: {p.paymentStatus}</p>
            <p className="text-gray-500 text-sm mt-1">Date: {new Date(p.paidAt).toLocaleDateString()}</p>
            <p className="text-gray-400 text-xs mt-1">Tracking ID: {p.trackingId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarningsSummary;
