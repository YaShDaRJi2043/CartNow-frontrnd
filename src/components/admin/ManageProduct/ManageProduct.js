import React from "react";
import { NavLink } from "react-router-dom";
import "./Manageproduct.css";
import Divider from "@mui/material/Divider";

const ManageProduct = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          // margin: "50px 0px",
          padding: "130px 0px 30px",
        }}
      >
        <div>
          <table border="1">
            <tr>
              <td>
                <div>
                  <img src="/mobile.png" alt="mobile" width="350vw" />
                </div>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  Manage Mobile
                </div>
              </td>
              <td>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <NavLink to="/mobileadd">
                    <button
                      className="Mbtn"
                      style={{ backgroundColor: "blue" }}
                    >
                      ADD
                    </button>
                  </NavLink>
                  <NavLink to="/editmobile">
                    <button
                      className="Mbtn"
                      style={{ backgroundColor: "green" }}
                    >
                      UPDATE
                    </button>
                  </NavLink>
                  <NavLink to="/deletemobile">
                    <button className="Mbtn" style={{ backgroundColor: "red" }}>
                      DELETE
                    </button>
                  </NavLink>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div>
                  <img src="/ele.png" alt="electronics" width="350vw" />
                </div>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  Manage Electronics
                </div>
              </td>
              <td style={{ width: "350px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <NavLink to="/electronicadd">
                    <button
                      className="Mbtn"
                      style={{ backgroundColor: "blue" }}
                    >
                      ADD
                    </button>
                  </NavLink>
                  <NavLink to="/editelectronic">
                    <button
                      className="Mbtn"
                      style={{ backgroundColor: "green" }}
                    >
                      UPDATE
                    </button>
                  </NavLink>
                  <NavLink to="/deleteelectronics">
                    <button className="Mbtn" style={{ backgroundColor: "red" }}>
                      DELETE
                    </button>
                  </NavLink>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div>
                  <img
                    src="/homeandkitchen.png"
                    alt="mobile"
                    width="350wv"
                    height="150px"
                  />
                </div>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  Manage Home & kitchen
                </div>
              </td>
              <td>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <NavLink to="/homekitchenadd">
                    <button
                      className="Mbtn"
                      style={{ backgroundColor: "blue" }}
                    >
                      ADD
                    </button>
                  </NavLink>
                  <NavLink to="/edithomekitchen">
                    <button
                      className="Mbtn"
                      style={{ backgroundColor: "green" }}
                    >
                      UPDATE
                    </button>
                  </NavLink>
                  <NavLink to="/deletehomekitchen">
                    <button className="Mbtn" style={{ backgroundColor: "red" }}>
                      DELETE
                    </button>
                  </NavLink>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div>
          <table border="1">
            <tr>
              <td>
                <div>
                  <img src="/men'sfashion.png" alt="mobile" width="350vw" />
                </div>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  Manage Men's Fashion
                </div>
              </td>
              <td style={{ width: "350px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <NavLink to="/menadd">
                    <button
                      className="Mbtn"
                      style={{ backgroundColor: "blue" }}
                    >
                      ADD
                    </button>
                  </NavLink>
                  <NavLink to="/editmen">
                    <button
                      className="Mbtn"
                      style={{ backgroundColor: "green" }}
                    >
                      UPDATE
                    </button>
                  </NavLink>
                  <NavLink to="/deletemen">
                    <button className="Mbtn" style={{ backgroundColor: "red" }}>
                      DELETE
                    </button>
                  </NavLink>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <img src="/womens.png" alt="mobile" width="350vw" />
                </div>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  Manage Women's Fashion
                </div>
              </td>
              <td>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <NavLink to="/womenadd">
                    <button
                      className="Mbtn"
                      style={{ backgroundColor: "blue" }}
                    >
                      ADD
                    </button>
                  </NavLink>
                  <NavLink to="/editwomen">
                    <button
                      className="Mbtn"
                      style={{ backgroundColor: "green" }}
                    >
                      UPDATE
                    </button>
                  </NavLink>
                  <NavLink to="/deletewomen">
                    <button className="Mbtn" style={{ backgroundColor: "red" }}>
                      DELETE
                    </button>
                  </NavLink>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageProduct;
