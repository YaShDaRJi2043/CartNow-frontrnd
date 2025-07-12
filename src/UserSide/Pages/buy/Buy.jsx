import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import Divider from "@mui/material/Divider";

import "./Buy.css";
import Total from "../../Components/total/Total";
import BASE_URL from "../../../services/Helper";
import { decrementCart, resetCart } from "../../../store/features/cartSlice";

const Buy = () => {
  const { user, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCardForm, setShowCardForm] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  const getAddress = async () => {
    try {
      const response = await BASE_URL.get(`/user/address/get/${user._id}`, {
        headers: {
          Authorization: userToken,
        },
      });
      setAddress(response?.data?.displayUserAddress[0]);
    } catch (error) {
      toast.error("Failed to load address");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await BASE_URL.get(`/user/cart/get/${user._id}`, {
        headers: {
          Authorization: userToken,
        },
      });
      const items = response?.data;
      if (items.length === 0) {
        navigate("/");
      } else {
        setProducts(items);
      }
    } catch (error) {
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      await BASE_URL.delete(`/user/cart/delete/${id}`, {
        headers: {
          Authorization: userToken,
        },
      });
      dispatch(decrementCart());
      fetchProducts();
      toast.success("Product removed from cart");
    } catch (error) {
      toast.error("Failed to remove product");
    }
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    setPurchasing(true);

    try {
      if (!address) {
        toast.error("Please add a delivery address");
        return;
      }

      const productData = products.map((item) => ({
        productId: item.productDetails._id,
        quantity: 1,
      }));

      const totalAmount = products.reduce(
        (sum, item) => sum + item.productDetails.mrp,
        0
      );

      const deliveryAddress = {
        house: address.house,
        area: address.area,
        city: address.city,
        state: address.state,
        pin: address.pin,
        country: "India",
      };

      const response = await BASE_URL.post(
        "/user/buy/add",
        {
          product: productData,
          deliveryAddress: deliveryAddress,
          totalAmount: totalAmount,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );

      if (response.data.status === 201) {
        toast.success("Thank you for your purchase!");
        dispatch(resetCart());
        navigate("/orders", {
          state: { order: response.data.buyItemData },
        });
      } else {
        toast.error(
          response.data.message || "Purchase failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error(
        error.response?.data?.message || "Payment failed. Please try again."
      );
    } finally {
      setPurchasing(false);
    }
  };

  const handlePaymentChange = (e) => {
    setShowCardForm(e.target.value === "card");
  };

  // Delivery date calculation
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 2);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDeliveryDate = deliveryDate.toLocaleDateString(
    "en-IN",
    options
  );

  // Countdown timer
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const targetTime = new Date();
    targetTime.setHours(24);
    targetTime.setMinutes(0);
    targetTime.setSeconds(0);
    const remainingTime = targetTime.getTime() - new Date().getTime();
    setCountdown(remainingTime / 1000);
    const timer =
      countdown > 0 &&
      setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (user) {
      getAddress();
      fetchProducts();
    }
  }, [user]);

  // Skeleton Loader Component
  const OrderItemSkeleton = () => (
    <div className="order-item-skeleton">
      <div className="order-item-image-skeleton"></div>
      <div className="order-item-details-skeleton">
        <div className="skeleton-line long"></div>
        <div className="skeleton-line medium"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-line medium"></div>
        <div className="skeleton-btn"></div>
      </div>
    </div>
  );

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        {/* Delivery Address Section */}
        <section className="checkout-section">
          <h2 className="checkout-section-title">
            <span className="checkout-step-number">1</span> Delivery address
          </h2>
          <div className="checkout-section-content">
            {user ? (
              <div>
                <div className="delivery-address">
                  <div className="user-name">
                    {user.name[0].toUpperCase() + user.name.substring(1)}{" "}
                    {user.lastName}
                  </div>
                  {address ? (
                    <>
                      <div className="address-line">{address.house}</div>
                      <div className="address-line">{address.area}</div>
                      <div className="address-city-state">
                        {address.city}, {address.state} {address.pin}
                      </div>
                    </>
                  ) : (
                    <div className="add-address-cta">
                      <NavLink to="/address">
                        <button className="checkout-btn secondary">
                          Add address
                        </button>
                      </NavLink>
                    </div>
                  )}
                </div>
                <NavLink to="/address" className="change-address">
                  Change Address
                </NavLink>
              </div>
            ) : (
              <div>Please sign in to continue</div>
            )}
          </div>
        </section>

        <Divider className="checkout-divider" />

        {/* Payment Method Section */}
        <section className="checkout-section">
          <h2 className="checkout-section-title">
            <span className="checkout-step-number">2</span> Payment method
          </h2>
          <div className="checkout-section-content">
            <div className="payment-option">
              <label className="payment-option-label">
                <div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    onChange={handlePaymentChange}
                    className="payment-radio"
                  />
                  <span className="payment-option-title">Pay with Card</span>
                </div>
                <span className="payment-option-subtitle">
                  Add and secure your card as per RBI guidelines
                </span>
                <div className="payment-card-icons">
                  <img src="/c1.webp" alt="Visa" className="card-icon" />
                  <img src="/c2.webp" alt="Mastercard" className="card-icon" />
                  <img src="/c3.webp" alt="RuPay" className="card-icon" />
                </div>
              </label>

              {showCardForm && (
                <div className="card-form">
                  <div className="form-group">
                    <label className="form-label">Card Number:</label>
                    <div className="card-number-inputs">
                      <input
                        type="tel"
                        placeholder="XXXX"
                        maxLength="4"
                        className="card-number-part"
                      />
                      <input
                        type="tel"
                        placeholder="XXXX"
                        maxLength="4"
                        className="card-number-part"
                      />
                      <input
                        type="tel"
                        placeholder="XXXX"
                        maxLength="4"
                        className="card-number-part"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">CVV:</label>
                    <input
                      type="tel"
                      placeholder="CVV"
                      maxLength="3"
                      className="cvv-input"
                    />
                  </div>

                  <button className="checkout-btn payment-btn">
                    PROCESS PAYMENT
                  </button>
                </div>
              )}
            </div>

            <div className="payment-option">
              <label className="payment-option-label">
                <div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    onChange={handlePaymentChange}
                    className="payment-radio"
                  />
                  <span className="payment-option-title">Cash on Delivery</span>
                </div>
                <span className="payment-option-subtitle">
                  Cash, UPI, Card also accepted
                </span>
              </label>
            </div>
          </div>
        </section>

        <Divider className="checkout-divider" />

        {/* Order Review Section */}
        <section className="checkout-section">
          <h2 className="checkout-section-title">
            <span className="checkout-step-number">3</span> Review items and
            delivery
          </h2>
          <div className="checkout-section-content">
            <div className="delivery-info">
              <div className="delivery-date">
                <span className="delivery-date-label">Delivery date:</span>
                <span className="delivery-date-value">
                  {formattedDeliveryDate}
                </span>
              </div>
              <div className="delivery-notice">
                Order in next {formatTime(countdown)} to receive by this date
              </div>
            </div>

            <div className="order-items-container">
              {loading
                ? Array(1)
                    .fill(0)
                    .map((_, index) => (
                      <React.Fragment key={index}>
                        <OrderItemSkeleton />
                        <Divider className="order-item-divider" />
                      </React.Fragment>
                    ))
                : products.map((item) => (
                    <React.Fragment key={item._id}>
                      <div className="order-item">
                        <div className="order-item-image-container">
                          <img
                            src={item?.productDetails?.url}
                            alt={item?.productDetails?.longTitle}
                            className="order-item-image"
                          />
                        </div>
                        <div className="order-item-details">
                          <h3 className="order-item-title">
                            {item?.productDetails?.longTitle}
                          </h3>
                          <div className="order-item-price">
                            <span className="original-price">
                              ₹{item?.productDetails?.mrp}.00
                            </span>
                            <span className="discounted-price">
                              ₹{item?.productDetails?.cost}.00
                            </span>
                          </div>
                          <div className="order-item-shipping">
                            Eligible for{" "}
                            <span className="free-shipping">FREE</span> Shipping
                          </div>
                          <button
                            onClick={() => removeProduct(item?._id)}
                            className="checkout-btn remove-btn"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <Divider className="order-item-divider" />
                    </React.Fragment>
                  ))}
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="order-total">
            <Total item={products} />
          </div>
          <button
            onClick={handlePurchase}
            className="checkout-btn primary place-order-btn"
            disabled={
              loading || products.length === 0 || purchasing || !address
            }
          >
            {purchasing ? "Processing..." : "Place Your Order"}
          </button>
        </div>
      </div>

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

export default Buy;
