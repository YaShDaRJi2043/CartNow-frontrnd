import React, { useState, useEffect, useContext } from "react";
import "./ProductDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import BASE_URL from "../../../services/Helper";
import { toast, ToastContainer } from "react-toastify";
import { LoginDataContext } from "../../Components/context/ContextProvider";

const ProductDetail = () => {
  const { setLoginDataCalled } = useContext(LoginDataContext);
  const navigate = useNavigate();
  const [productDetailData, setProductDetailData] = useState([]);
  const { id } = useParams("");
  const Token = localStorage.getItem("usertoken");

  const productData = async () => {
    const getProductData = await BASE_URL.get(`/getproductdetail?id=${id}`);
    setProductDetailData((await getProductData)?.data);
  };

  const addtocart = async (id) => {
    if (Token) {
      try {
        await BASE_URL.post(
          `/productAddToCart?id=${id}`,
          {},
          {
            headers: {
              Authorization: Token, // Correct format for passing the token
            },
          }
        );
        setLoginDataCalled(true);
        toast.success("Product Added Into Cart");
      } catch (error) {
        toast.warn(
          error?.response?.data?.message || "Error adding product to cart"
        );
      }
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    productData();
  }, [id]);
  return (
    <>
      <div>
        <body style={{ backgroundColor: "white" }}>
          <div className="productDetailMainDiv">
            <div>
              <div className="productDetailImageDiv">
                <img
                  src={productDetailData.url}
                  alt="ProductImg"
                  className="productDetailImage"
                />
              </div>

              <div className="cartBtnDiv">
                <button
                  onClick={() => addtocart(productDetailData._id)}
                  className="cartBtn"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="detailedDiv">
              <h4>{productDetailData.shortTitle}</h4>
              <p>{productDetailData.longTitle}</p>

              <Divider />

              <p>
                Deal of the Day :{" "}
                <b className="productCostAndDiscount">
                  ₹{productDetailData.cost}.00
                </b>
              </p>

              <p>
                M.R.P. :{" "}
                <b>
                  <del className="productMrp">₹{productDetailData.mrp}</del>
                </b>
              </p>

              <p>
                You save :{" "}
                <b className="productCostAndDiscount">
                  ₹{productDetailData.mrp - productDetailData.cost}
                </b>
              </p>

              <div>
                <p>
                  Discount :{" "}
                  <b className="productCostAndDiscount">
                    {productDetailData.discount}
                  </b>
                </p>
                <div className="FreeAndFastDelivery">FREE Delivery</div>
                <div className="FreeAndFastDelivery">Fastest delivery</div>
              </div>

              {productDetailData.description ? (
                <div className="productDescriptionDiv">
                  <b>About the product: </b>
                  <span className="productDescription">
                    {productDetailData.description}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </body>

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
      </div>
    </>
  );
};

export default ProductDetail;
