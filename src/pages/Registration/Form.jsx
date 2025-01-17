// src/pages/Registration/Form.jsx
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Form = ({ onSubmit }) => {
  const emailDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const userNameDom = useRef();
  const passwordDom = useRef();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstValue = firstNameDom.current.value;
    const lastValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    onSubmit(usernameValue, firstValue, lastValue, emailValue, passwordValue);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Join the network
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Already have an account?
        <Link to="/login" className="text-orange-500 ml-1">
          Sign in
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          inputRef={emailDom}
          fullWidth
          placeholder="Email"
          className="w-full "
        />
        <div className="flex space-x-2">
          <TextField
            label="First Name"
            variant="outlined"
            type="text"
            inputRef={firstNameDom}
            fullWidth
            placeholder="First Name"
            className="w-1/2"
          />
          <TextField
            label="Last Name"
            variant="outlined"
            type="text"
            inputRef={lastNameDom}
            fullWidth
            placeholder="Last Name"
            className="w-1/2"
          />
        </div>

        <TextField
          label="Username"
          variant="outlined"
          type="text"
          inputRef={userNameDom}
          fullWidth
          placeholder="User Name"
          className="w-full "
        />

        <TextField
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          inputRef={passwordDom}
          fullWidth
          placeholder="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
        >
          Agree and Join
        </button>

        <div className="text-center text-gray-500">
          I agree to the{" "}
          <Link to="#" className="text-orange-500 underline">
            privacy policy
          </Link>{" "}
          and{" "}
          <Link to="#" className="text-orange-500 underline">
            terms of services
          </Link>
        </div>

        <div className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 underline">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
