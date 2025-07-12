import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./mobileadd.css";
import Divider from "@mui/material/Divider";
import toast, { Toaster } from "react-hot-toast";

const MobileAdd = () => {
  const [test, setTest] = useState({
    url: "",
    shortTitle: "",
    longTitle: "",
    mrp: "",
    cost: "",
    discount: "",
    description: "",
  });

  const drop = (e) => {
    const { name, value } = e.target;
    setTest({ ...test, [name]: value });
  };
  console.log(test);

  const btnn = async () => {
    const { url, shortTitle, longTitle, mrp, cost, discount, description } =
      test;
    const res = await fetch("/mobileadd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        shortTitle,
        longTitle,
        mrp,
        cost,
        discount,
        description,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (data.status == 201) {
      toast.success("Product added");
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <div className="pro_main">
        <div className="pro_div">
          <div>Url</div>
          <div>
            <input
              type="text"
              name="url"
              onChange={drop}
              className="pro_add"
              placeholder=" url"
            />
          </div>

          <div>short title</div>
          <div>
            <input
              type="text"
              name="shortTitle"
              onChange={drop}
              className="pro_add"
              placeholder=" Short Title "
            />
          </div>

          <div>Long title</div>
          <div>
            <input
              type="text"
              name="longTitle"
              onChange={drop}
              className="pro_add"
              placeholder=" Long Title"
            />
          </div>

          <div>mrp</div>
          <div>
            <input
              type="text"
              name="mrp"
              onChange={drop}
              className="pro_add"
              placeholder=" MRP"
            />
          </div>

          <div>cost</div>
          <div>
            <input
              type="text"
              name="cost"
              onChange={drop}
              className="pro_add"
              placeholder=" Cost"
            />
          </div>

          <div>discount</div>
          <div>
            <input
              type="text"
              name="discount"
              onChange={drop}
              className="pro_add"
              placeholder=" Discount"
            />
          </div>

          <div>description</div>
          <div>
            <input
              type="text"
              name="description"
              onChange={drop}
              className="pro_add"
              placeholder=" Description"
            />
          </div>
          <Divider style={{ paddingTop: "5px" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <NavLink to="/manageproduct">
                <button className="pro_manage">Product Manage page</button>
              </NavLink>
            </div>
            <div>
              <button onClick={btnn} className="pro_confirm">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default MobileAdd;
