import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="p-4 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-6 flex justify-center sm:justify-start items-center gap-2">
        Payment History
        <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full">
          {payments.length}
        </span>
      </h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left text-sm font-medium">#</th>
              <th className="p-3 text-left text-sm font-medium">
                Service Name
              </th>
              <th className="p-3 text-left text-sm font-medium">
                Amount
              </th>
              <th className="p-3 text-left text-sm font-medium">
                Transaction Id
              </th>
              <th className="p-3 text-left text-sm font-medium">
                Service ID
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  {payment.serviceName || "Unknown"}
                </td>
                <td className="p-3 font-semibold text-green-600">
                  {payment.amount}
                </td>
                <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                  {payment.transactionId}
                </td>
                <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                  {payment.serviceId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {payments.length === 0 && (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          No payment history found.
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
