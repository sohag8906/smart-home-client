import React from 'react';
import { Link } from 'react-router-dom';
import errorImg from '../../assets/error-404.png'; // এখানে নিজের image path ব্যবহার করো

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      
      {/* Error Image */}
      <img
        src={errorImg}
        alt="404 Not Found"
        className="w-64 md:w-96 mb-6"
      />

      {/* Error Text */}
      <h2 className="text-2xl md:text-3xl font-bold mt-2">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Home Button */}
      <Link
        to="/"
        className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Error;
