import React from "react";

const Footer = () => {
  return (
    <>
      <div className="f_footer">
        <div>
          <p>
            <b>Get to Know US</b>
          </p>
          <p style={{ fontSize: "12px" }}>About us</p>
          <p style={{ fontSize: "12px" }}>Careers</p>
          <p style={{ fontSize: "12px" }}>Press Releases</p>
          <p style={{ fontSize: "12px" }}>Amazon Cares</p>
        </div>

        <div>
          <p>
            <b>Connect with Us</b>
          </p>
          <p style={{ fontSize: "12px" }}>Facebook</p>
          <p style={{ fontSize: "12px" }}>Twitter</p>
          <p style={{ fontSize: "12px" }}>Instagram</p>
        </div>

        <div>
          <p>
            <b>Make Money with Us</b>
          </p>
          <p style={{ fontSize: "12px" }}>Facebook</p>
          <p style={{ fontSize: "12px" }}>Twitter</p>
          <p style={{ fontSize: "12px" }}>Instagram</p>
        </div>

        <div>
          <p>
            <b>Make Money with Us</b>
          </p>
          <p style={{ fontSize: "12px" }}>Facebook</p>
          <p style={{ fontSize: "12px" }}>Twitter</p>
          <p style={{ fontSize: "12px" }}>Instagram</p>
        </div>
      </div>

      <div className="s_footer">
        <div style={{ marginBottom: "10px" }}>
          <img src="/main_logo.png" width="80px" />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p style={{ margin: "0px 20px" }}>Conditions of Use & Sale</p>
          <p style={{ margin: "0px 20px" }}>Privacy Notice</p>
          <p style={{ margin: "0px 20px" }}> Interest-Based Ads</p>
          <p style={{ margin: "0px 20px" }}>
            © 2022-2023, Cartnow.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
