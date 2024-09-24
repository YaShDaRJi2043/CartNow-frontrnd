import React, { useEffect, useState } from "react";

const Yourorder = () => {
  const [user, setUser] = useState([]);

  const userdata = async () => {
    const res = await fetch("/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data.data);
    setUser(data.data);
  };

  useEffect(() => {
    userdata();
  }, []);
  return (
    <>
      <div style={{ backgroundColor: "white", padding: "150px 100px 50px" }}>
        <h1 style={{ textAlign: "center" }}>Your Orders</h1>
        <h4 style={{ color: "red" }}>Deliver in 2 to 3 days</h4>
        {user.map((e) => {
          return (
            <div>
              {e.buyitems.map((ele) => {
                return (
                  <>
                    {ele.cart.map((z) => {
                      return (
                        <>
                          <div
                            style={{
                              display: "flex",
                              marginBottom: "10px",
                            }}
                          >
                            <div className="productImg">
                              <img src={z.url} alt="product" height="130vh" />
                            </div>
                            <div className="productText">
                              <div className="productTitle">{z.shortTitle}</div>

                              <div
                                style={{
                                  display: "flex",
                                  margin: "10px 0px 20px",
                                }}
                              >
                                <div>
                                  <sup>₹</sup>
                                  <span
                                    style={{
                                      fontSize: "28px",
                                      fontWeight: "500",
                                      color: "green",
                                    }}
                                  >
                                    {z.mrp}
                                  </span>
                                  {"  "}
                                  <del>
                                    <span
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "300",
                                      }}
                                    >
                                      ₹{z.cost}
                                    </span>
                                  </del>
                                  {"  "}
                                  <span>({z.discount} off)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Yourorder;
