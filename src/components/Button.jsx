import React from "react";

const Button = ({ onClick }) => {
  return (
    <div>
      {" "}
      <button onClick={onClick} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-200 rounded-lg group bg-gradient-to-r from-purple-700 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-white dark:focus:ring-blue-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Daily Notes App
        </span>
      </button>
    </div>
  );
};

export default Button;
