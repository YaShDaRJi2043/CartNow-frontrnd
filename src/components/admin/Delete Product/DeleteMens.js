import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const DeleteMens = () => {
  const [come, setCome] = useState([]);

  const getProduct = async () => {
    const res = await fetch("/getmens", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setCome(data);
  };

  const deleteProduct = async (id) => {
    const res = await fetch(`/men/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (data.status == 404) {
      console.log("error");
    } else {
      getProduct();
      toast.success("Product Delete successfully");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <div style={{ backgroundColor: "white", padding: "150px 100px" }}>
        <div style={{ textAlign: "end" }}>
          <NavLink to="/manageproduct">
            <button className="pro_manage">Product Manage page</button>
          </NavLink>
        </div>
        {come.map((e) => {
          return (
            <div
              style={{
                display: "flex",
                marginBottom: "10px",
              }}
            >
              <div className="productImg">
                <img src={e.url} alt="product" height="200vh" />
              </div>

              <div className="productText">
                <div className="productTitle">{e.longTitle}</div>

                <div style={{ display: "flex", margin: "10px 0px 20px" }}>
                  <div>
                    <sup>₹</sup>
                    <span style={{ fontSize: "28px", fontWeight: "500" }}>
                      {e.cost}
                    </span>
                    {"  "}
                    <del>
                      <span style={{ fontSize: "14px", fontWeight: "300" }}>
                        ₹{e.mrp}
                      </span>
                    </del>
                    {"  "}
                    <span>({e.discount} off)</span>
                  </div>
                </div>
              </div>
              <div
                style={{ border: "1px solid #F0F0F0", padding: "80px 100px" }}
              >
                <button
                  style={{
                    cursor: "pointer",
                    height: "40px",
                    width: "80px",
                    borderColor: "#F0F0F0",
                  }}
                  onClick={() => deleteProduct(e._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default DeleteMens;
