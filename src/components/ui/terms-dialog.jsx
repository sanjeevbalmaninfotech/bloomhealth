import React from 'react';

const SuccessTermsPopup = () => {


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>

      {/* Popup Box with enhanced background */}
      <div className="relative bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 text-white px-10 py-7 rounded-2xl shadow-2xl transform scale-100 transition duration-300 ease-out border-2 border-white/20">
        <div className="flex items-center gap-4">
          <svg
            className="w-7 h-7 text-white animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-lg font-semibold tracking-wide">
            Thank you for accepting our policies.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SuccessTermsPopup;
