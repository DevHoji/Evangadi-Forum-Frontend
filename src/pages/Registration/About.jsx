// src/pages/Registration/About.jsx
import React from "react";
import { Button } from "@mui/material";

const About = () => {
  return (
    <div className="p-8">
      <h2 className="text-orange-500 text-lg font-semibold mb-2">About</h2>
      <h1 className="text-3xl font-semibold mb-4 text-[#8794AD]">
        Evangadi Networks Q&A
      </h1>
      <p className="text-gray-700 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p className="text-gray-700 mb-4">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p className="text-gray-700 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <Button
        variant="contained"
        style={{ backgroundColor: "#FE8301", color: "white" }}
      >
        HOW IT WORKS
      </Button>
    </div>
  );
};

export default About;
