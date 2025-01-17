// src/pages/Registration/Register.jsx
import React from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import About from "./About";

const Register = () => {
  const navigate = useNavigate();

  async function handleSubmit(
    usernameValue,
    firstValue,
    lastValue,
    emailValue,
    passwordValue
  ) {
    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("Please provide all required information");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passwordValue,
      });
      alert("Register successful, please login");
      navigate("/login");
    } catch (error) {
      alert("Something went wrong");
      console.error(error.response);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4 md:flex md:items-start md:space-x-8">
        <div className="md:w-1/2">
          <Form onSubmit={handleSubmit} />
        </div>
        <div className="md:w-1/2">
          <About />
        </div>
      </div>
    </div>
  );
};

export default Register;
