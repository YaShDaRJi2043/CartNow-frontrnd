import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "110px 0px 30px",
        }}
      >
        <img src="/Error_pic.svg" height="500px" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0px 0px 30px",
        }}
      >
        <NavLink to="/">
          <button style={{ cursor: "pointer" }}>Back to Home page</button>
        </NavLink>
      </div>
    </>
  );
};

export default Error;
