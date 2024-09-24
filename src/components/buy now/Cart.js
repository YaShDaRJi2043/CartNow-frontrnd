import React, { useEffect, useState, useContext } from "react";
import { Divider } from "@mui/material";
import { LoginContext } from "../Context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import Total from "../../UserSide/Pages/cart/Total";
import "./Buynow.css";

const Cart = () => {
  const { account, setAccount } = useContext(LoginContext);
  console.log(account);

  const [cartdata, setCartdata] = useState("");

  const getdatabuy = async () => {
    const token = localStorage.getItem("usertoken");

    const res = await fetch("/cartdetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    console.log(data.carts);

    if (res.status !== 201) {
      alert("no data available");
    } else {
      setCartdata(data.carts);
    }
  };

  const removeData = async (id) => {
    const token = localStorage.getItem("usertoken");

    const res = await fetch(`remove/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      console.log("error aai remove time pr");
    } else {
      getdatabuy();
      setAccount(data);
      toast.success("product remove");
    }
  };

  useEffect(() => {
    getdatabuy();
  }, []);

  return (
    <>
      <div>
        {cartdata.length ? (
          <div className="b_main">
            <div className="shopingcart">Shopping Cart</div>
            <div className="price">Price</div>
            <Divider />
            <div>
              {cartdata.map((e, ind) => {
                return (
                  <>
                    <div style={{ display: "flex", marginBottom: "20px" }}>
                      <div
                        style={{
                          width: "20%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={e.url}
                          alt="imgitem"
                          className="img"
                          height="200vh"
                        />
                      </div>

                      <div className="details">
                        <h2>{e.longTitle}</h2>
                        <h2>{e.shortTitle}</h2>

                        <div className="dispatched">
                          Usually dispatched in 3 To 4 days.
                        </div>
                        <div style={{ margin: "5px 0px", fontWeight: "600" }}>
                          Eligible for{" "}
                          <span style={{ color: "green", fontWeight: "600" }}>
                            FREE
                          </span>{" "}
                          Shipping
                        </div>

                        <button
                          onClick={() => removeData(e._id)}
                          className="delete"
                        >
                          Delete
                        </button>
                      </div>

                      <h3>₹{e.mrp}.00</h3>
                    </div>
                    <Divider />
                  </>
                );
              })}
            </div>
            <div
              style={{ textAlign: "end", fontSize: "19px", margin: "20px 0px" }}
            >
              <Total item={cartdata} />
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
              <img src="Empty_cart.svg" alt="cart img" height="350px" />
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
