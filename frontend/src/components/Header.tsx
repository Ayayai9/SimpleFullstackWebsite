import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-gray-900 text-white text-center py-4 fixed top-0 left-0 z-50 flex justify-between items-center px-8 shadow">
      <h1 className="text-2xl font-bold">My Website</h1>
      <div>
        <button className="nav-link bg-white text-blue-800 px-4 py-2 rounded hover:bg-blue-100 transition">Login</button>
      </div>
    </header>
  );
};

export default Header;