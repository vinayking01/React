import React from "react";

const BrokenLinkPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl">Oops! The page you're looking for doesn't exist.</p>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => (window.location.href = "/")}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default BrokenLinkPage;
