import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./Sendlink.css";

const Forgotpassword = () => {
  const [password, setpassword] = useState({
    pass: "",
  });

  const { id, token } = useParams();

  const pass = (e) => {
    const { name, value } = e.target;
    setpassword({ ...password, [name]: value });
  };
  console.log(password);

  const send = async (e) => {
    e.preventDefault();
    const { pass } = password;
    if (pass == "") {
      toast.error("Enter Password");
    } else {
      const res = await fetch(`/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pass,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.status == 201) {
        toast.success("Password change");
      }
    }
  };

  const uservalid = async () => {
    const res = await fetch(`/forgotpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status == 201) {
      console.log("user valid");
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    uservalid();
  }, []);
  return (
    <>
      <div className="smain">
        <div className="scontainer">
          <div className="text_email">Enter Your Password</div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              type="password"
              placeholder="Enter Your new password"
              className="semail"
              onChange={pass}
              name="pass"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="sbtn" onClick={send}>
              Confirm
            </button>
          </div>
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Forgotpassword;
