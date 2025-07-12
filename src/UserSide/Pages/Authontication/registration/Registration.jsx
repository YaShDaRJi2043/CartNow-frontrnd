import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./Registration.css";
import BASE_URL from "../../../../services/Helper";

const Registration = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    reEnterPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  const addValue = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const onClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onClickShowReEnterPassword = () => {
    setShowReEnterPassword(!showReEnterPassword);
  };

  const registrationBtn = async () => {
    const { name, lastName, email, phone, password, reEnterPassword } =
      inputValue;

    const registrationData = new FormData();
    registrationData.append("name", name);
    registrationData.append("lastName", lastName);
    registrationData.append("email", email);
    registrationData.append("phone", phone);
    registrationData.append("password", password);
    registrationData.append("reEnterPassword", reEnterPassword);

    await BASE_URL.post("/user/auth/register", registrationData)
      .then((res) => {
        if (res?.data?.status === 201) {
          navigate("/signin");
        }
      })
      .catch((err) => toast.erroring(err?.response?.data?.message));
  };

  return (
    <>
      <div className="registration-wrapper">
        <div className="registration-container">
          <div className="registration-left">
            <p className="registration-left-title">Have an Account?</p>
            <NavLink to="/signin" className="registration-login-link">
              Login
            </NavLink>
          </div>

          <div className="registration-right">
            <h2 className="registration-title">Create Account</h2>

            <div className="registration-form-group">
              <input
                type="text"
                onChange={addValue}
                name="name"
                placeholder="Enter Your Name"
                className="registration-input"
              />
            </div>

            <div className="registration-form-group">
              <input
                type="text"
                onChange={addValue}
                name="lastName"
                placeholder="Enter Your Last Name"
                className="registration-input"
              />
            </div>

            <div className="registration-form-group">
              <input
                type="email"
                onChange={addValue}
                name="email"
                placeholder="Email"
                className="registration-input"
              />
            </div>

            <div className="registration-form-group">
              <input
                type="tel"
                onChange={addValue}
                name="phone"
                maxLength="10"
                placeholder="Mobile"
                className="registration-input"
              />
            </div>

            <div className="registration-form-group">
              <input
                type={showPassword ? "text" : "password"}
                onChange={addValue}
                name="password"
                placeholder="Password"
                className="registration-input"
              />
              <i
                className="registration-eye-icon"
                onClick={onClickShowPassword}
              >
                {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
              </i>
            </div>

            <div className="registration-form-group">
              <input
                type={showReEnterPassword ? "text" : "password"}
                onChange={addValue}
                name="reEnterPassword"
                placeholder="Re-Enter Password"
                className="registration-input"
              />
              <i
                className="registration-eye-icon"
                onClick={onClickShowReEnterPassword}
              >
                {showReEnterPassword ? (
                  <RemoveRedEyeIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </i>
            </div>

            <div className="registration-submit-btn" onClick={registrationBtn}>
              Continue
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Registration;
