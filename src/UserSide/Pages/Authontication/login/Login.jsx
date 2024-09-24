import React, { useContext, useState } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import BASE_URL from "../../../../services/Helper";
import { toast, ToastContainer } from "react-toastify";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoginDataContext } from "../../../Components/context/ContextProvider";

const Login = () => {
  const { loginDataCalled, setLoginDataCalled } = useContext(LoginDataContext);

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const addValue = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const onClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginBtn = async () => {
    const { email, password } = inputValue;

    const loginData = new FormData();
    loginData.append("email", email);
    loginData.append("password", password);

    await BASE_URL.post("/userLogin", loginData)
      .then((res) => {
        localStorage.setItem("usertoken", res?.data?.token);
        localStorage.setItem("userId", res?.data?.user?._id);
        setLoginDataCalled(true);
        navigate("/");
      })
      .catch((err) => {
        toast.warning(err?.response?.data?.message);
      });
  };

  return (
    <>
      <div className="LoginMainDiv">
        <div className="LoginContainer">
          <div className="LoginLeftDiv">
            <div className="LoginTxt"> Login To Your Account</div>
            <div className="LoginInputFieldDiv">
              <input
                type="text"
                onChange={addValue}
                name="email"
                placeholder="Email"
                className="LoginInputField"
              />
            </div>

            <div className="LoginInputFieldDiv">
              <input
                type={showPassword === false ? "password" : "text"}
                onChange={addValue}
                name="password"
                placeholder="Password"
                className="LoginInputField pe-5"
              />
              <i className="LogineyeIcon" onClick={onClickShowPassword}>
                {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
              </i>
            </div>

            <div className="forgotPasswordDiv">
              <NavLink to="/sendlink" className="forgotPassword">
                Forgot Password
              </NavLink>
            </div>

            <div onClick={loginBtn} className="LoginBtnDiv">
              <div className="LoginBtn">Log In</div>
            </div>
          </div>

          <div className="LoginRightDiv">
            <p className="newHereTxt">New Here?</p>

            <div className="RegisterBtnDiv">
              <NavLink to="/register" className="RegisterBtn">
                Create Account
              </NavLink>
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

export default Login;
