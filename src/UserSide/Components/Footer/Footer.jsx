import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer-main">
        <div className="footer-section">
          <p className="footer-section-title">Get to Know Us</p>
          <p className="footer-section-link">About us</p>
          <p className="footer-section-link">Careers</p>
          <p className="footer-section-link">Press Releases</p>
          <p className="footer-section-link">Amazon Cares</p>
        </div>

        <div className="footer-section">
          <p className="footer-section-title">Connect with Us</p>
          <p className="footer-section-link">Facebook</p>
          <p className="footer-section-link">Twitter</p>
          <p className="footer-section-link">Instagram</p>
        </div>

        <div className="footer-section">
          <p className="footer-section-title">Make Money with Us</p>
          <p className="footer-section-link">Sell on Cartnow</p>
          <p className="footer-section-link">Become an Affiliate</p>
          <p className="footer-section-link">Advertise Your Products</p>
          <p className="footer-section-link">Self-Publish with Us</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">
          <img src="/main_logo.png" alt="Logo" width="80px" />
        </div>
        <div className="footer-bottom-links">
          <p>Conditions of Use & Sale</p>
          <p>Privacy Notice</p>
          <p>Interest-Based Ads</p>
          <p>© 2022-2023, Cartnow.com, Inc. or its affiliates</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
