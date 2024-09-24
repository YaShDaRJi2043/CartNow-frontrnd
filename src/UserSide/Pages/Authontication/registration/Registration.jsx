import React, { useState } from "react";
import "./Registration.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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

    await BASE_URL.post("/userRegister", registrationData)
      .then((res) => {
        console.log(res?.data?.status);
        if (res?.data?.status === 201) {
          navigate("/signin");
        }
      })
      .catch((err) => toast.warning(err?.response?.data?.message));
  };

  return (
    <>
      <div className="registrationMainDiv">
        <div className="registrationContainer">
          <div className="registrationLeftDiv">
            <p className="welcomeTxt">Have Account?</p>

            <div className="loginBtnDiv">
              <NavLink to="/signin" className="loginBtn">
                Login
              </NavLink>
            </div>
          </div>

          <div className="registrationRightDiv">
            <div className="createTxt">Create Account</div>
            <div className="registrationInputFieldDiv">
              <input
                type="text"
                onChange={addValue}
                name="name"
                placeholder="Enter Your Name"
                className="registrationInputField"
              />
            </div>

            <div className="registrationInputFieldDiv">
              <input
                type="text"
                onChange={addValue}
                name="lastName"
                placeholder="Enter Your lastName"
                className="registrationInputField"
              />
            </div>

            <div className="registrationInputFieldDiv">
              <input
                type="text"
                onChange={addValue}
                name="email"
                placeholder="Email"
                className="registrationInputField"
              />
            </div>

            <div className="registrationInputFieldDiv">
              <input
                type="tel"
                onChange={addValue}
                name="phone"
                maxLength="10"
                placeholder="Mobile"
                className="registrationInputField"
              />
            </div>

            <div className="registrationInputFieldDiv">
              <input
                type={showPassword === false ? "password" : "text"}
                placeholder="Password"
                onChange={addValue}
                name="password"
                className="registrationInputField pe-5"
              />
              <i className="registrationeyeIcon" onClick={onClickShowPassword}>
                {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
              </i>
            </div>

            <div className="registrationInputFieldDiv">
              <input
                type={showReEnterPassword === false ? "password" : "text"}
                onChange={addValue}
                name="reEnterPassword"
                placeholder="Re-Enter Password"
                className="registrationInputField pe-5"
              />
              <i
                className="registrationeyeIcon"
                onClick={onClickShowReEnterPassword}
              >
                {showReEnterPassword ? (
                  <RemoveRedEyeIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </i>
            </div>

            <div className="registrationBtnDiv">
              <div onClick={registrationBtn} className="registrationBtn">
                Continue
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export default Registration;
