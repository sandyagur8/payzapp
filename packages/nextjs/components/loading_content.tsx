import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-xl font-semibold">Loading wallet data...</p>
      </div>
    </div>
  );
};

export default Loading;
