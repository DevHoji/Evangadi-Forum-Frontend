// src/pages/Login/Login.jsx
import React from "react";
import Log from "./Log";
import About from "./About";

const Login = () => {
  return (
    <div className="bg-gray-100 flex flex-wrap justify-center items-center min-h-screen p-4 md:p-0">
      <div className="mb-4 md:mb-0 md:w-1/2  p-4 flex justify-center items-center">
        <Log />
      </div>
      <div className="md:w-1/2 p-4 flex justify-center items-center">
        <About />
      </div>
    </div>
  );
};

export default Login;
