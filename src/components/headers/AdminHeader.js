import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminHeader = () => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100vw",
          zIndex: "1100",
        }}
      >
        <div
          className="mainnav"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            paddingLeft: "8.8%",
          }}
        >
          {/* ICON */}
          <div className="border" style={{ height: "44px" }}>
            <NavLink to="/">
              <img src="/main_logo.png" style={{ width: "75px" }} alt="img" />
            </NavLink>
          </div>
        </div>
      </div>
      <div className="outlet-container">
        <Outlet />
      </div>
    </>
  );
};

export default AdminHeader;
