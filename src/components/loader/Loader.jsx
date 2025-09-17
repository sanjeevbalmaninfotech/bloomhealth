import React, { Suspense } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <ClipLoader color="#3b82f6" size={80} />
    <p className="mt-4 text-xl font-semibold text-blue-500">Loading...</p>
  </div>
);

export default LoadingSpinner;