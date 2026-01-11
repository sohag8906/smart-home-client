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

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg">
            <FiDollarSign className="text-2xl" />
          </div>
          Earnings Summary
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Track your payments and earnings</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-500 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Status:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "all"
                  ? 'bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All ({payments.length})
            </button>
            
            <button
              onClick={() => setFilter("paid")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "paid"
                  ? 'bg-green-100 text-green-800 border border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-700'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Paid ({paidTransactions})
            </button>
            
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "pending"
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Pending ({pendingTransactions})
            </button>
          </div>
        </div>
        
        {/* Current Filter Info */}
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          <p>Showing: <span className="font-medium">{filter === "all" ? "All Payments" : filter === "paid" ? "Paid Payments" : "Pending Payments"}</span> ({filteredPayments.length} payments)</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Earnings */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
              <FiTrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Total Earnings</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">৳ {totalEarnings.toFixed(2)}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">All time earnings</p>
        </div>

        {/* Paid */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <FiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Paid</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">৳ {paidEarnings.toFixed(2)}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{paidTransactions} transactions</p>
        </div>

        {/* Pending */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <FiClock className="w-5 h-5 text-yellow-600 dark:text-yellow-300" />
            </div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Pending</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">৳ {pendingEarnings.toFixed(2)}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{pendingTransactions} transactions</p>
        </div>

        {/* Total Transactions */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FiCreditCard className="w-5 h-5 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Total Transactions</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalTransactions}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">All payments</p>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <FiCreditCard className="text-green-600 dark:text-green-300" />
            {filter === "all" ? "All Payments" : filter === "paid" ? "Paid Payments" : "Pending Payments"}
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm px-3 py-1 rounded-full">
              {filteredPayments.length}
            </span>
          </h2>
        </div>

        {filteredPayments.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FiCreditCard className="text-gray-400 dark:text-gray-300 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No payments found</h3>
            <p className="text-gray-500 dark:text-gray-400">
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
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{p.serviceName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Tracking: {p.trackingId}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    p.paymentStatus === "paid" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  }`}>
                    {p.paymentStatus}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-green-700 dark:text-green-300 font-bold text-2xl">৳ {p.amount?.toFixed(2) || '0.00'}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FiCalendar className="text-gray-400 dark:text-gray-500" />
                    <span>Date: {new Date(p.paidAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FiClock className="text-gray-400 dark:text-gray-500" />
                    <span>Time: {new Date(p.paidAt).toLocaleTimeString()}</span>
                  </div>
                </div>
                
                {p.customerEmail && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
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
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
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
