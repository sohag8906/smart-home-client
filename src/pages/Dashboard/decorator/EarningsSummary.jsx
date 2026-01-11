import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { 
  FiDollarSign, 
  FiCreditCard, 
  FiCalendar, 
  FiCheckCircle, 
  FiClock,
  FiTrendingUp,
  FiFilter
} from "react-icons/fi";

const EarningsSummary = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, paid, pending

  useEffect(() => {
    if (!user?.email) return;

    const fetchPayments = async () => {
      try {
        setLoading(true);
        const token = await user.getIdToken();
        const res = await axios.get(
          `https://smart-home-server-five.vercel.app/payment?email=${user.email}`,
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

  // Calculate statistics from ALL payments
  const totalEarnings = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const paidEarnings = payments
    .filter(p => p.paymentStatus === "paid")
    .reduce((sum, p) => sum + (p.amount || 0), 0);
  const pendingEarnings = payments
    .filter(p => p.paymentStatus === "pending")
    .reduce((sum, p) => sum + (p.amount || 0), 0);
  
  const totalTransactions = payments.length;
  const paidTransactions = payments.filter(p => p.paymentStatus === "paid").length;
  const pendingTransactions = payments.filter(p => p.paymentStatus === "pending").length;

  // Filter payments based on selected filter
  let filteredPayments = [];
  if (filter === "all") {
    filteredPayments = payments;
  } else if (filter === "paid") {
    filteredPayments = payments.filter(p => p.paymentStatus === "paid");
  } else if (filter === "pending") {
    filteredPayments = payments.filter(p => p.paymentStatus === "pending");
  }

  // Debug logging
  console.log("All payments:", payments);
  console.log("Filter:", filter);
  console.log("Filtered payments:", filteredPayments);
  console.log("Paid payments:", payments.filter(p => p.paymentStatus === "paid"));
  console.log("Pending payments:", payments.filter(p => p.paymentStatus === "pending"));

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg">
            <FiDollarSign className="text-2xl" />
          </div>
          Earnings Summary
        </h1>
        <p className="text-gray-600 mt-2">Track your payments and earnings</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by Status:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "all"
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({payments.length})
            </button>
            
            <button
              onClick={() => setFilter("paid")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "paid"
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Paid ({paidTransactions})
            </button>
            
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "pending"
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({pendingTransactions})
            </button>
          </div>
        </div>
        
        {/* Show current filter info */}
        <div className="mt-3 text-sm text-gray-600">
          <p>Showing: <span className="font-medium">{filter === "all" ? "All Payments" : filter === "paid" ? "Paid Payments" : "Pending Payments"}</span> ({filteredPayments.length} payments)</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Earnings */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
              <FiTrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-medium text-gray-700">Total Earnings</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">৳ {totalEarnings.toFixed(2)}</p>
          <p className="text-sm text-gray-600 mt-1">All time earnings</p>
        </div>

        {/* Paid Amount */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiCheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-700">Paid</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">৳ {paidEarnings.toFixed(2)}</p>
          <p className="text-sm text-gray-600 mt-1">{paidTransactions} transactions</p>
        </div>

        {/* Pending Amount */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FiClock className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="font-medium text-gray-700">Pending</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">৳ {pendingEarnings.toFixed(2)}</p>
          <p className="text-sm text-gray-600 mt-1">{pendingTransactions} transactions</p>
        </div>

        {/* Total Transactions */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiCreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-700">Total Transactions</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
          <p className="text-sm text-gray-600 mt-1">All payments</p>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FiCreditCard className="text-green-600" />
            {filter === "all" ? "All Payments" : filter === "paid" ? "Paid Payments" : "Pending Payments"}
            <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
              {filteredPayments.length}
            </span>
          </h2>
        </div>

        {filteredPayments.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiCreditCard className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No payments found</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? "You haven't received any payments yet" 
                : `No ${filter} payments found`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPayments.map(p => (
              <div 
                key={p._id} 
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{p.serviceName}</p>
                    <p className="text-sm text-gray-600 mt-1">Tracking: {p.trackingId}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    p.paymentStatus === "paid" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {p.paymentStatus}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-green-700 font-bold text-2xl">৳ {p.amount?.toFixed(2) || '0.00'}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiCalendar className="text-gray-400" />
                    <span>Date: {new Date(p.paidAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiClock className="text-gray-400" />
                    <span>Time: {new Date(p.paidAt).toLocaleTimeString()}</span>
                  </div>
                </div>
                
                {p.customerEmail && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      Customer: {p.customerEmail}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Summary Footer */}
        {filteredPayments.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing {filteredPayments.length} of {payments.length} payments
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Paid: {paidTransactions}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Pending: {pendingTransactions}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarningsSummary;