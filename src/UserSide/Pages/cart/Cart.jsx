import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Divider } from "@mui/material";

import "./Cart.css";
import Total from "../../Components/total/Total";
import BASE_URL from "../../../services/Helper";
import { setCartCount } from "../../../store/features/cartSlice";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const response = await BASE_URL.get(`/user/cart/get/${user._id}`, {
        headers: {
          Authorization: userToken,
        },
      });
      const items = response?.data;
      setCartItems(items);

      dispatch(setCartCount(items.length));
    } catch (error) {
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      await BASE_URL.delete(`/user/cart/delete/${id}`, {
        headers: {
          Authorization: userToken,
        },
      });
      toast.success("Product removed from your cart");
      fetchCartData();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // Skeleton Loader Component
  const CartItemSkeleton = () => (
    <div className="cart-item-skeleton">
      <div className="cart-item-img-skeleton"></div>
      <div className="cart-item-details-skeleton">
        <div className="skeleton-line long"></div>
        <div className="skeleton-line medium"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-line medium"></div>
        <div className="skeleton-btn"></div>
      </div>
      <div className="cart-item-price-skeleton"></div>
    </div>
  );

  return (
    <div className="cart-container">
      {loading ? (
        <div className="cart-content">
          <h3 className="cart-title">Shopping Cart</h3>
          <Divider className="cart-divider" />
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <React.Fragment key={index}>
                <CartItemSkeleton />
                <Divider className="cart-divider" />
              </React.Fragment>
            ))}
          <div className="cart-total-skeleton"></div>
        </div>
      ) : cartItems.length ? (
        <div className="cart-content">
          <h3 className="cart-title">Shopping Cart</h3>
          <Divider className="cart-divider" />
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <React.Fragment key={item?.productDetails._id}>
                <div className="cart-item">
                  <div className="cart-item-image-container">
                    <img
                      src={item?.productDetails.url}
                      alt={item?.productDetails.shortTitle}
                      className="cart-item-image"
                    />
                  </div>
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">
                      {item?.productDetails.longTitle}
                    </h4>
                    <p className="cart-item-subtitle">
                      {item?.productDetails.shortTitle}
                    </p>
                    <p className="cart-item-dispatch">
                      Usually dispatched in 3 to 4 days
                    </p>
                    <p className="cart-item-shipping">
                      Eligible for <span className="free-shipping">FREE</span>{" "}
                      Shipping
                    </p>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="cart-item-remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="cart-item-price">
                    ₹{item?.productDetails.mrp}.00
                  </div>
                </div>
                <Divider className="cart-divider" />
              </React.Fragment>
            ))}
          </div>
          <div className="cart-total-section">
            <Total item={cartItems} />
          </div>
          <div className="cart-checkout-section">
            <NavLink to="/buy">
              <button className="cart-checkout-btn">Proceed to Buy</button>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="cart-empty-state">
          <div className="empty-cart-image-container">
            <img
              src="Empty_cart.svg"
              alt="Empty cart"
              className="empty-cart-image"
            />
          </div>
          <h1 className="empty-cart-title">Your Cart is empty</h1>
          <NavLink to="/" className="empty-cart-cta">
            Shop Now
          </NavLink>
        </div>
      )}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 1500,
        }}
      />
    </div>
  );
};

export default Cart;
