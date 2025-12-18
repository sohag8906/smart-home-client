import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/UseAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payment', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment?email=${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-6 flex justify-center sm:justify-start items-center gap-2">
                Payment History
                <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full">
                    {payments.length}
                </span>
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Service Name</th>
                            <th>Amount</th>
                            <th>Transaction Id</th>
                            <th>Service ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.serviceName || "Unknown"}</td> {/* fallback */}
                                <td>{payment.amount}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.serviceId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
