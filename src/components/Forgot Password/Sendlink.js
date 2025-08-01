import React, { useState } from "react";
import "./Sendlink.css";
import toast, { Toaster } from "react-hot-toast";

const Sendlink = () => {
  const [email, setEmail] = useState({
    send_mail: "",
  });
  const txt = (e) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
  };
  console.log(email);

  const send = async (e) => {
    e.preventDefault();

    const { send_mail } = email;

    if (send_mail === "") {
      toast.error("Enter email");
    } else {
      const res = await fetch("/passlinksend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ send_mail }),
      });

      if (res.status === 404) {
        toast.error("Enter valid email");
      } else {
        toast.success("Password reset link send");
      }
    }
  };

  return (
    <>
      <div className="smain">
        <div className="scontainer">
          <div className="text_email">Enter Your Email</div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              type="email"
              name="send_mail"
              placeholder="Enter Your Email"
              className="semail"
              onChange={txt}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="sbtn" onClick={send}>
              Send
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Sendlink;
