import React, { useContext, useState, useEffect } from "react";
import "./Buynow.css";
// import { LoginContext } from "../Context/ContextProvider";
// import Divider from "@mui/material/Divider";
// import { NavLink } from "react-router-dom";
// import Total from "../../UserSide/Pages/cart/Total";
// import { ToastContainer, toast } from "react-toastify";

const Buy = () => {
  // const { account, setAccount } = useContext(LoginContext);
  // const [showDiv, setShowDiv] = useState(false);
  // const [email, setEmail] = useState([]);
  // const [countdown, setCountdown] = useState(0);
  // const [cart, setCart] = useState([]);

  // //get cart items
  // const finalBuy = async () => {
  //   const token = localStorage.getItem("usertoken");
  //   const res = await fetch("/cartdetails", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "applicaton/json",
  //       Authorization: token,
  //     },
  //   });

  //   const data = await res.json();
  //   console.log(data.carts);

  //   if (data.status === 404) {
  //     console.log("Error");
  //   } else {
  //     setCart(data.carts);
  //     setEmail(account.email);
  //   }
  // };

  // //remove cart items
  // const removeData = async (id) => {
  //   const token = localStorage.getItem("usertoken");

  //   const res = await fetch(`remove/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   });

  //   const data = await res.json();
  //   console.log(data);

  //   if (res.status === 404 || !data) {
  //     console.log("error aai remove time pr");
  //   } else {
  //     finalBuy();
  //     setAccount(data);
  //   }
  // };

  // const sendm = async (e) => {
  //   const token = localStorage.getItem("usertoken");

  //   e.preventDefault();

  //   const res = await fetch("/buyitems", {
  //     method: "POST",
  //     headers: {
  //       Authorization: token,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       cart,
  //     }),
  //   });
  //   const data1 = await res.json();

  //   const res1 = await fetch("/buymail", {
  //     method: "POST",
  //     headers: {
  //       Authorization: token,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email, cart }),
  //   });

  //   if (res1.status === 404) {
  //     console.log("email send error");
  //   } else {
  //     toast.success("your order is confirm");
  //   }
  // };

  // //radio button
  // const handleRadioChange = (e) => {
  //   setShowDiv(e.target.value === "yes");
  // };

  // //Date
  // const today = new Date();
  // const twoDaysAfter = new Date(today);
  // twoDaysAfter.setDate(today.getDate() + 2);

  // const options = { day: "numeric", month: "long", year: "numeric" };
  // const formattedDate = twoDaysAfter.toLocaleDateString("en-IN", options);

  // //Timer
  // const formatTime = (time) => {
  //   const hours = Math.floor(time / 3600);
  //   const minutes = Math.floor((time % 3600) / 60);
  //   const seconds = time % 60;
  //   return `${hours < 10 ? "0" : ""}${hours}:${
  //     minutes < 10 ? "0" : ""
  //   }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  // };

  // useEffect(() => {
  //   const targetTime = new Date();
  //   targetTime.setHours(24);
  //   targetTime.setMinutes(0);
  //   targetTime.setSeconds(0);
  //   const remainingTime = targetTime.getTime() - new Date().getTime();
  //   setCountdown(remainingTime / 1000);
  //   const timer =
  //     countdown > 0 &&
  //     setInterval(() => {
  //       setCountdown(countdown - 1);
  //     }, 1000);
  //   return () => clearInterval(timer);
  // });

  // useEffect(() => {
  //   finalBuy();
  // }, []);

  return (
    <>
      {/* <div style={{ padding: "120px 150px 0px" }}>
        <div style={{ display: "flex" }}>
          <div style={{ fontSize: "22px", fontWeight: 700 }}>
            <spam style={{ marginRight: "30px" }}>1</spam> Delivery address
          </div>
          <div>
            {account ? (
              <div style={{ marginLeft: "200px" }}>
                <div style={{ display: "flex" }}>
                  <div>
                    {account.name[0].toUpperCase() + account.name.substring(1)}
                  </div>
                  <div style={{ marginLeft: "5px" }}>{account.lastName}</div>
                </div>
                {account.Addresses.length ? (
                  <>
                    <div>{account.Addresses[0].house}</div>
                    <div>{account.Addresses[0].area}</div>
                    <div style={{ display: "flex" }}>
                      <div>{account.Addresses[0].city}</div>,
                      <div style={{ marginLeft: "5px" }}>
                        {account.Addresses[0].state}
                      </div>
                      <div style={{ marginLeft: "5px" }}>
                        {account.Addresses[0].pin}
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ marginTop: "20px" }}>
                    <NavLink to="/address">
                      <button className="buy_btnn">Add address</button>
                    </NavLink>
                  </div>
                )}
              </div>
            ) : (
              " "
            )}
          </div>
        </div>

        <Divider style={{ margin: "20px 0px" }} />

        <div>
          <div style={{ fontSize: "22px", fontWeight: 700 }}>
            <spam style={{ marginRight: "30px" }}>2</spam>
            Select a payment method
          </div>
          <div style={{ margin: "20px 37px 0px" }}>
            <div>
              <input
                type="radio"
                name="n"
                value="yes"
                onChange={handleRadioChange}
              />
              <b>Pay with ATM Card</b>
              <br />
              <label style={{ fontSize: "13px", paddingLeft: "20px" }}>
                Add and secure your card as per RBI guideline
              </label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "150px",
                  padding: "8px 11px 0px",
                }}
              >
                <img src="/c1.webp" height="35px" width="35px" />
                <img src="/c2.webp" height="35px" width="35px" />
                <img src="/c3.webp" height="35px" width="35px" />
              </div>
              {showDiv && (
                <div>
                  <div style={{ margin: "15px 20px" }}>
                    Enter Your Account Number:
                  </div>
                  <div style={{ marginLeft: "15px" }}>
                    <input
                      type="tel"
                      placeholder="XXXX"
                      maxLength="4"
                      className="account_number"
                    />
                    <input
                      type="tel"
                      placeholder="XXXX"
                      maxLength="4"
                      className="account_number"
                    />
                    <input
                      type="tel"
                      placeholder="XXXX"
                      maxLength="4"
                      className="account_number"
                    />
                  </div>

                  <div style={{ margin: "15px 20px" }}>Enter Your CVV:</div>
                  <input
                    type="tel"
                    placeholder="CVV"
                    maxLength="3"
                    className="cvv_number"
                  />
                  <br />
                  <button className="pay">PAY</button>
                </div>
              )}
            </div>

            <div style={{ paddingTop: "20px" }}>
              <input
                type="radio"
                name="n"
                value="no"
                onChange={handleRadioChange}
              />
              <b>Case on Delivery</b>
              <br />
              <label style={{ fontSize: "13px", paddingLeft: "20px" }}>
                Case, UPI, Card also accepted.
              </label>
            </div>
          </div>
        </div>

        <Divider style={{ margin: "20px 0px" }} />

        <div>
          <div style={{ fontSize: "22px", fontWeight: 700 }}>
            <spam style={{ marginRight: "30px" }}>3</spam>
            Review items and delivery
          </div>
          <div
            style={{
              margin: "10px 500px 0px 40px",
              border: "1px solid #a6a6a6",
              borderRadius: "7px",
              padding: "10px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  marginRight: "7px",
                }}
              >
                Delivery date:
              </span>
              <span
                style={{ fontSize: "18px", fontWeight: "700", color: "green" }}
              >
                {formattedDate}
              </span>
              <div>If you are order in next {formatTime(countdown)} hours</div>
            </div>
            <div>
              {cart.map((ele, i) => {
                return (
                  <>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          margin: "10px 0px",
                        }}
                      >
                        <div
                          style={{
                            width: "25%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={ele.url}
                            height="150px"
                            style={{ maxWidth: "200px", paddingLeft: "40px" }}
                          />
                        </div>
                        <div
                          style={{
                            fontSize: "18px",
                            marginTop: "10px",
                            marginLeft: "50px",
                          }}
                        >
                          <div>{ele.longTitle}</div>
                          <div>
                            <span style={{ marginRight: "10px" }}>
                              <del>₹{ele.cost}.00</del>
                            </span>
                            <span style={{ fontWeight: "700", color: "red" }}>
                              ₹{ele.mrp}.00
                            </span>
                          </div>
                          <div>
                            {" "}
                            <button
                              onClick={() => removeData(ele._id)}
                              className="delete"
                            >
                              Delete
                            </button>
                          </div>
                          <div
                            style={{ margin: "15px 0px 0px", fontSize: "16px" }}
                          >
                            Eligible for{" "}
                            <span style={{ color: "green", fontWeight: "600" }}>
                              FREE
                            </span>{" "}
                            Shipping
                          </div>
                        </div>
                      </div>
                      <Divider />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="place_order">
          <div>
            <button onClick={sendm} className="buy_btnn">
              Place your order
            </button>
          </div>
          <div className="total_text">{<Total item={cart} />}</div>
        </div>
      </div> */}
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      /> */}
    </>
  );
};

export default Buy;
