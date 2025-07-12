import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";

import "./Login.css";
import BASE_URL from "../../../../services/Helper";
import { userLogin } from "../../../../store/features/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const addValue = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginBtn = async () => {
    const { email, password } = inputValue;

    const loginData = new FormData();
    loginData.append("email", email);
    loginData.append("password", password);

    try {
      const res = await BASE_URL.post("/user/auth/login", loginData);

      dispatch(userLogin({ user: res.data.user, token: res.data.token }));
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="login-main">
        <div className="login-container">
          <div className="login-left">
            <div className="login-title">Login To Your Account</div>

            <div className="input-group">
              <input
                type="text"
                name="email"
                onChange={addValue}
                placeholder="Email"
                className="input-field"
              />
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={addValue}
                placeholder="Password"
                className="input-field"
              />
              <i className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
              </i>
            </div>

            <div className="forgot-password">
              <NavLink to="/sendlink">Forgot Password</NavLink>
            </div>

            <div className="login-button">
              <div className="login-button-inner" onClick={loginBtn}>
                Log In
              </div>
            </div>
          </div>

          <div className="login-right">
            <p className="new-here-text">New Here?</p>

            <NavLink to="/register" className="register-button">
              Create Account
            </NavLink>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Login;
