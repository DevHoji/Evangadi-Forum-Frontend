// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10 w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center w-full">
        <Link to="#" className="text-2xl font-bold text-gray-800">
          YourLogo
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="#" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-gray-900"
          >
            How it Works
          </Link>
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            SIGN IN
          </Link>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (conditionally rendered) */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-white">
          <div className="flex flex-col space-y-3">
            <Link to="#" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link
              to="#"
              className="text-gray-700 hover:text-gray-900"
            >
              How it Works
            </Link>
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              SIGN IN
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
