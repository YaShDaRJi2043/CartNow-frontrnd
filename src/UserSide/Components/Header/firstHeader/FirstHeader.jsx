import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import toast, { Toaster } from "react-hot-toast";

import "./FirstHeader.css";
import BASE_URL from "../../../../services/Helper";
import { setCartCount } from "../../../../store/features/cartSlice";

const FirstHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
  const { user, userToken } = useSelector((state) => state.auth);
  const { cartCount } = useSelector((state) => state.cart); // Get cart count from Redux state

  // Fetch Cart Data and Update Redux
  const fetchCartData = async () => {
    try {
      if (user && user._id) {
        const response = await BASE_URL.get(`/user/cart/get/${user._id}`, {
          headers: {
            Authorization: userToken,
          },
        });
        // Set the cart count in Redux
        dispatch(setCartCount(response?.data?.length || 0)); // Assuming response contains the cart items
      }
    } catch (error) {
      toast.error("Failed to load cart items");
    }
  };

  useEffect(() => {
    if (user) {
      fetchCartData();
    }
  }, [user, userToken, dispatch]);

  return (
    <div className="first-header">
      {/* Logo */}
      <NavLink to="/" className="header-link">
        <img src="/main_logo.png" alt="Logo" className="header-logo" />
      </NavLink>

      {/* Address */}
      <div
        className="header-link header-address"
        onClick={() => navigate("/address")}
      >
        <div className="header-address-icon">
          <RoomOutlinedIcon />
        </div>
        <div>
          <div>
            {user
              ? `Deliver to ${
                  user.name[0]?.toUpperCase() + user.name.substring(1)
                }`
              : "Hello"}
          </div>
          <div>Add Your Address</div>
        </div>
      </div>

      {/* Signin */}
      <div
        className="header-link header-signin"
        onClick={() => {
          if (!user) navigate("/signin");
        }}
      >
        {user ? (
          <div>
            Hello, {user.name[0]?.toUpperCase() + user.name.substring(1)}
          </div>
        ) : (
          <div>Hello, Sign in</div>
        )}
      </div>

      {/* Cart */}
      <div
        className="header-link header-cart"
        onClick={() => navigate("/cart")}
      >
        <Badge badgeContent={cartCount || 0} color="primary">
          <ShoppingCartIcon />
        </Badge>
        <span className="header-cart-text">Cart</span>
      </div>

      {/* ToastContainer */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default FirstHeader;
