import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AdminLogin from "./AdminLogin";

const Admin = () => {
  return (
    <>
      <Routes>
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    </>
  );
};

export default Admin;
