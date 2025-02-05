/* eslint-disable no-unused-vars */
import React from "react";
import Log from "./Log";
import About from "./About";
import PropTypes from "prop-types"; 

const Login = ({ onLoginSuccess }) => {
  return (
    <div className="bg-gray-100 flex flex-wrap justify-center items-center min-h-screen p-4 md:p-0">
      <div className="mb-4 md:mb-0 md:w-1/2  p-4 flex justify-center items-center">
        <Log onLoginSuccess={onLoginSuccess} />{" "}
      </div>
      <div className="md:w-1/2 p-4 flex justify-center items-center">
        <About />
      </div>
    </div>
  );
};
Login.propTypes = {
  onLoginSuccess: PropTypes.bool.isRequired, 
};

export default Login;
