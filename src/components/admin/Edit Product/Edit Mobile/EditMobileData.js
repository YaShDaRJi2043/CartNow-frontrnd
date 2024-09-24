import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { ToastContainer, toast } from "react-toastify";

const EditMobileData = () => {
  const { id } = useParams();
  const [editData, setEditData] = useState({
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
    setEditData({ ...editData, [name]: value });
  };
  console.log(editData);

  const indiData = async () => {
    const res = await fetch(`/getmobilesone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status !== 201) {
      console.log("data not available");
    } else {
      console.log("getdata");
      setEditData(data);
    }
  };

  const btnn = async () => {
    const { url, shortTitle, longTitle, mrp, cost, discount, description } =
      editData;

    const res = await fetch(`/editmobile/${id}`, {
      method: "PUT",
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
    const data = await res.json;

    if (data.status == 404) {
      console.log("error");
    } else {
      toast.success("Product updated")
    }
  };

  useEffect(() => {
    indiData();
  }, [id]);

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
              value={editData.url}
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
              value={editData.shortTitle}
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
              value={editData.longTitle}
            />
          </div>

          <div>mrp</div>
          <div>
            <input
              type="text"
              name="mrp"
              onChange={drop}
              className="pro_add"
              placeholder="MRP"
              value={editData.mrp}
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
              value={editData.cost}
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
              value={editData.discount}
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
              value={editData.description}
            />
          </div>
          <Divider style={{ paddingTop: "5px" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <NavLink to="/editmobile">
                <button className="pro_manage">Edit Mobile page</button>
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

export default EditMobileData;
