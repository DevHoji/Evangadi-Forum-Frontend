// src/pages/Login.jsx
import React, { useRef } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // Correctly use the `useNavigate` hook.
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (!emailValue || !passwordValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      alert("Login successful");
      localStorage.setItem("token", data.token);
      navigate("/"); // Correct navigation method.
      console.log(data);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.error(error.response);
    }
  }

  return (
    <section className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Login Page</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div>
          <span>Email: ---</span>
          <input
            ref={emailDom}
            type="text"
            placeholder="Email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <br />
        <div>
          <span>Password: ---</span>
          <input
            ref={passwordDom}
            type="password"
            placeholder="Password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          Login
        </button>
      </form>
      <Link
        to={"/register"}
        className="mt-4 inline-block text-blue-500 hover:underline"
      >
        Register
      </Link>
    </section>
  );
};

export default Login;
