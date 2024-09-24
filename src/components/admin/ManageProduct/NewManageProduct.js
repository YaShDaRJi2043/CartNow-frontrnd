import React, { useState } from "react";
import "./NewManageProduct.css";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const NewManageProduct = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleNavLinkClick = () => {
    setNavbarOpen(false);
  };

  return (
    <>
      <div className={`vertical-navbar ${navbarOpen ? "active" : ""}`}>
        <div className="navbar-toggle" onClick={toggleNavbar}>
          {navbarOpen ? <FiX /> : <FiMenu />}
        </div>
        <div className="navbar-links">
          <NavLink
            exact
            to="/"
            className="navbar-item"
            activeClassName="active"
            onClick={handleNavLinkClick}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="navbar-item"
            activeClassName="active"
            onClick={handleNavLinkClick}
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className="navbar-item"
            activeClassName="active"
            onClick={handleNavLinkClick}
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className="navbar-item"
            activeClassName="active"
            onClick={handleNavLinkClick}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NewManageProduct;
