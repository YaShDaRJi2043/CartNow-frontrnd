import { Divider } from "@mui/material";
import "./Cart.css";
import React, { useContext, useState } from "react";
import Total from "./Total";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import BASE_URL from "../../../services/Helper";
import { LoginDataContext } from "../../Components/context/ContextProvider";

const Cart = () => {
  const { setLoginDataCalled } = useContext(LoginDataContext);

  const [cartProductData, setCartProductData] = useState("");

  const Token = localStorage.getItem("usertoken");

  const CartData = async () => {
    const getCartData = await BASE_URL.get("/productDisplayOfCart", {
      headers: {
        Authorization: Token,
      },
    });
    setCartProductData((await getCartData)?.data);
  };

  const removeData = async (id) => {
    try {
      await BASE_URL.delete(`/removeProductCart?id=${id}`, {
        headers: {
          Authorization: Token,
        },
      });
      setLoginDataCalled(true);
      toast.success("Product Remove From Your Cart");
      CartData();
    } catch (error) {
      toast.warn(error?.response?.data?.message);
    }
  };

  useState(() => {
    CartData();
  }, []);
  return (
    <>
      <div>
        {cartProductData.length ? (
          <div className="CartMainDiv">
            <h3>Shopping Cart</h3>
            <Divider className="mt-4" />
            <div>
              {cartProductData.map((e, ind) => {
                return (
                  <>
                    <div className="cartProductDetails">
                      <div className="cartProductImgDiv">
                        <img
                          src={e.url}
                          alt="imgitem"
                          className="cartProductImg"
                        />
                      </div>

                      <div className="productDetails">
                        <div className="cartLongTitle">{e.longTitle}</div>
                        <p className="cartShortTitle">{e.shortTitle}</p>

                        <p className="dispatchedTxt">
                          Usually dispatched in 3 To 4 days.
                        </p>

                        <p className="ShippingTxt">
                          Eligible for{" "}
                          <span className="freeShippingTxt">FREE</span> Shipping
                        </p>

                        <button
                          onClick={() => removeData(e._id)}
                          className="cartProductDltBtn"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="productPrice">₹{e.mrp}.00</div>
                    </div>
                    <Divider />
                  </>
                );
              })}
            </div>

            <div
              style={{ textAlign: "end", fontSize: "19px", margin: "20px 0px" }}
            >
              <Total item={cartProductData} />
            </div>
            <div style={{ textAlign: "end" }}>
              <NavLink to="/buy">
                <button className="buy_button">Proceed to Buy</button>
              </NavLink>
            </div>
          </div>
        ) : (
          <div style={{ padding: "150px 0px 100px", textAlign: "center" }}>
            <div>
              <img
                src="Empty_cart.svg"
                alt="cart img"
                className="emptyCartImg"
              />
            </div>
            <div>
              <h1>Your Cart is empty</h1>
            </div>
            <NavLink to="/">Add Your Iteams</NavLink>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export default Cart;
