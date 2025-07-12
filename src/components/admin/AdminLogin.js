import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const history = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  console.log(data);

  const addData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const sub = async (e) => {
    e.preventDefault();

    const { email, password } = data;

    if (email === "") {
      toast.error("enter email");
    } else if (!email.includes("@")) {
      toast.error("enter valid email");
    } else if (password === "") {
      toast.error("enter password");
    } else {
      const res = await fetch("/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const details = await res.json();
      console.log(details);

      if (details.status === 404) {
        alert("invalid details");
      } else {
        history("/forwardpage");
      }
    }
  };
  return (
    <>
      <body style={{ backgroundColor: "white" }}>
        <div className="sign_con">
          <div
            style={{
              border: "thin solid #c9c9c9",
              padding: "30px",
              borderRadius: "5px",
            }}
          >
            <div style={{ fontSize: "30px" }}>Admin Log-in</div>

            <div
              style={{
                fontWeight: "500",
                marginTop: "10px",
                marginBottom: "5px",
              }}
            >
              Email
            </div>
            <div>
              <input
                type="text"
                className="admin_email_input"
                onChange={addData}
                name="email"
                placeholder="Enter email"
              />
            </div>

            <div
              style={{
                fontWeight: "500",
                marginTop: "10px",
                marginBottom: "5px",
              }}
            >
              Password
            </div>
            <div>
              <input
                type="Password"
                placeholder="At least 6 characters"
                className="admin_pass_input"
                onChange={addData}
                name="password"
              />
            </div>

            <div>
              <button className="con_btn" onClick={sub}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </body>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default AdminLogin;
