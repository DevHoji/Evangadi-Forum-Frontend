// src/App.jsx
/* eslint-disable no-unused-vars */
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login/Login"; 
import Register from "./pages/Registration/Register";
import NewQuestion from "./pages/NewQuestion";
import Detail from "./pages/Detail";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import axios from "./axiosConfig";
import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/Footer";

export const Appstate = createContext();

function App() {
  const [user, setuser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

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
      setIsLoggedIn(true);
      if (location.pathname === "/login") {
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
      setIsLoggedIn(false);
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.delete("/users/delete", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token");
      setuser(null);
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    checkUser();
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <Appstate.Provider value={{ user, setuser }}>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        showAuth={!isAuthPage}
      />
      <div id="main-content">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/new-question"
            element={
              isLoggedIn ? <NewQuestion /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/question/:id"
            element={isLoggedIn ? <Detail /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
      {showFooter && <Footer />}
    </Appstate.Provider>
  );
}

export default App;
