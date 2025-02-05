/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../assets/evangadi-logo-black.png";
import PropTypes from "prop-types"; 

const Navbar = ({ isLoggedIn, onLogout, showAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      onLogout(); // Call the logout function passed as a prop
    }
  };

  let authButtonText = "SIGN IN";
  let authButtonLink = "/login";

  if (isLoggedIn && showAuth) {
    authButtonText = "LOG OUT";
    authButtonLink = "/login"; // Changed to take back to login
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10 w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center w-full">
        <div className="mb-6 md:mb-0 md:text-left">
          <div className="mb-4">
            <Link to="/">
              <img src={logo} alt="Evangadi Logo" className="h-10 md:h-12" />
            </Link>
          </div>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link
            to="/how-it-works"
            className="text-gray-700 hover:text-gray-900"
          >
            How it Works
          </Link>
          {showAuth && (
            <Link
              to={authButtonLink} // Conditionally go to login if logging out
              onClick={handleAuthClick}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              {authButtonText}
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-white">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-700 hover:text-gray-900"
            >
              How it Works
            </Link>
            {showAuth && (
              <Link
                to={authButtonLink} 
                onClick={handleAuthClick}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              >
                {authButtonText}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// ✅ Add PropTypes validation
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, 
  onLogout: PropTypes.func.isRequired, 
  showAuth: PropTypes.bool.isRequired, 
};

export default Navbar;
