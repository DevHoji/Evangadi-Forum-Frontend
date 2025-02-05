// src/App.jsx
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Registration/Register";
import NewQuestion from "./pages/NewQuestion";
import Detail from "./pages/Detail"; // Import the Detail component
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import axios from "./axiosConfig";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

export const Appstate = createContext();

function App() {
  const [user, setuser] = useState({});

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const showFooter =
    location.pathname === "/login" || location.pathname === "/register";

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setuser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Appstate.Provider value={{ user, setuser }}>
      <Navbar />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-question" element={<NewQuestion />} />
          <Route path="/question/:id" element={<Detail />} />{" "}
          {/* Add the route for Detail */}
        </Routes>
      </div>
      {showFooter && <Footer />}
    </Appstate.Provider>
  );
}

export default App;
