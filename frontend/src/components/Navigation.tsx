import React from "react";

const Navigation = () => {
  return (
    <nav className="h-full bg-blue-100 px-6 py-8">
      <ul className="flex flex-col gap-6">
        <li>
          <a href="#" className="text-blue-900 font-semibold hover:text-blue-700 transition">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-900 font-semibold hover:text-blue-700 transition">
            About
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-900 font-semibold hover:text-blue-700 transition">
            Services
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-900 font-semibold hover:text-blue-700 transition">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;