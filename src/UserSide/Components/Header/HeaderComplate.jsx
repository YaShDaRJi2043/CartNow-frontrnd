import React from "react";
import FirstHeader from "./firstHeader/FirstHeader";
import SecondHeader from "./secondHeader/SecondHeader";
import { Outlet } from "react-router-dom";

const   HeaderComplate = () => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100vw",
          zIndex: "1100",
        }}
      >
        <FirstHeader />
        <SecondHeader />
      </div>
      <Outlet />
    </>
  );
};

export default HeaderComplate;
