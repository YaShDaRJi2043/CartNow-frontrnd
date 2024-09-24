import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const history = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    compassword: "",
  });
  console.log(data);
  const addData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const sub = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, compassword } = data;

    if (name == "") {
      toast.warn("Enter name");
    } else if (email == "") {
      toast.warn("Enter email");
    } else if (!email.includes("@")) {
      toast.warn("Enter valid email");
    } else if (phone == "") {
      toast.warn("Enter phone number");
    } else if (phone.length < 10) {
      toast.warn("Enter valid phone number");
    } else if (password == "") {
      toast.warn("Enter password");
    } else if (password.length < 6) {
      toast.warn("Enter atleast 6 letter");
    } else if (compassword == "") {
      toast.warn("Enter compassword");
    } else if (compassword != password) {
      toast.warn("password doesn't match");
    } else {
      const res = await fetch("/Adminregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      const details = await res.json();
      console.log(details);

      if (details.status == 404) {
        console.log("invalid details");
      } else {
        history("/admin");
      }
    }
  };

  return (
    <>
      <body
        style={{
          backgroundColor: "white",
          paddingBottom: "200px",
          paddingTop: "110px",
        }}
      >
        <div style={{ textAlign: "center", height: "65px" }}>
          <img
            src="blacklogoamazon.png"
            width="200px"
            style={{ marginTop: "-40px" }}
          />
        </div>
        <div className="regi_con">
          <div
            style={{
              border: "thin solid #c9c9c9",
              padding: "15px 30px",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                fontSize: "26px",
                marginBottom: "15px",
                fontWeight: "500",
              }}
            >
              Create account
            </div>

            {/* input fileds */}
            <div
              style={{
                fontWeight: "500",
                marginTop: "8px",
                marginBottom: "5px",
              }}
            >
              your name
            </div>
            <div>
              <input
                type="text"
                className="regi_input"
                onChange={addData}
                name="name"
              />
            </div>
            <div
              style={{
                fontWeight: "500",
                marginTop: "8px",
                marginBottom: "5px",
              }}
            >
              email
            </div>
            <div>
              <input
                type="text"
                className="regi_input"
                onChange={addData}
                name="email"
              />
            </div>
            <div
              style={{
                fontWeight: "500",
                marginTop: "8px",
                marginBottom: "5px",
              }}
            >
              mobile number
            </div>
            <div>
              <input
                type="tel"
                maxLength="10"
                className="regi_input"
                onChange={addData}
                name="phone"
              />
            </div>
            <div
              style={{
                fontWeight: "500",
                marginTop: "8px",
                marginBottom: "5px",
              }}
            >
              Password
            </div>
            <div>
              <input
                type="Password"
                placeholder="At least 6 characters"
                className="regipass_input"
                onChange={addData}
                name="password"
              />
            </div>
            <div
              style={{
                fontWeight: "500",
                marginTop: "8px",
                marginBottom: "5px",
              }}
            >
              Password again
            </div>
            <div>
              <input
                type="Password"
                className="regi_input"
                onChange={addData}
                name="compassword"
              />
            </div>
            <div>
              <button className="regicon_btn" onClick={sub}>
                Continue
              </button>
            </div>
            <div style={{ margin: "25px 0px" }}>
              <hr
                style={{
                  borderColor: "rgba(0,0,0,0.12)",
                  borderWidth: "0px 0px thin",
                }}
              />
            </div>
            <div style={{ fontSize: "15px", fontWeight: "500" }}>
              Already have an account?{" "}
              <NavLink
                to="/admin"
                style={{ textDecoration: "none", color: "#0066c0" }}
              >
                Sing in
              </NavLink>
            </div>
          </div>
        </div>
      </body>
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

export default AdminRegister;
