// src/pages/Login/Log.jsx
import React, { useState, useRef } from "react";
import { IconButton, InputAdornment, TextField, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const Log = () => {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

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
      navigate("/");
      console.log(data);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.error(error.response);
    }
  }

  return (
    <div className="w-full sm:w-96 md:w-4/5 lg:w-3/4 p-6 bg-white shadow-lg rounded-lg flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4">Login to your account</h2>
      <p className="text-gray-600 mb-6 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-orange-500 underline">
          Create new Account
        </Link>
      </p>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <TextField
          inputRef={emailDom}
          label="Your Email"
          type="email"
          variant="outlined"
          fullWidth
          placeholder="Your Email"
          required
          className="mb-2"
        />
        <TextField
          inputRef={passwordDom}
          label="Your Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          placeholder="Your Password"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="warning"
          fullWidth
          className="mt-4"
        >
          Submit
        </Button>
      </form>
      <p className="mt-4 text-red-500 underline text-center">
        Create an Account?
      </p>
    </div>
  );
};

export default Log;
