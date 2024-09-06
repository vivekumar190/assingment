import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Contacts Manager</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-grey-400 px-3 py-2 rounded">
            Home
          </Link>
          <Link to="/add" className="hover:text-grey-400 px-3 py-2 rounded">
            Add Contact
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-grey-400 px-3 py-2 rounded"
          >
            Dashboard
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={handleToggle} aria-label="Toggle menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col md:hidden mt-2">
          <Link
            to="/"
            className="px-3 py-2 text-center hover:bg-black-700 rounded"
            onClick={handleToggle}
          >
            Home
          </Link>
          <Link
            to="/add"
            className="px-3 py-2 text-center hover:bg-black-700 rounded"
            onClick={handleToggle}
          >
            Add Contact
          </Link>
          <Link
            to="/dashboard"
            className="px-3 py-2 text-center hover:bg-gray-700 rounded"
            onClick={handleToggle}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
