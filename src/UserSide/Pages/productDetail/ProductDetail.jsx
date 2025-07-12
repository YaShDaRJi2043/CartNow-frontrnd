import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Divider } from "@mui/material";

import "./ProductDetail.css";
import BASE_URL from "../../../services/Helper";
import { incrementCart } from "../../../store/features/cartSlice";

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { userToken } = useSelector((state) => state.auth);

  const handleAddToCart = async (productId) => {
    if (userToken) {
      try {
        await BASE_URL.post(
          `/user/cart/add?id=${productId}`,
          {},
          {
            headers: {
              Authorization: userToken,
            },
          }
        );
        dispatch(incrementCart());
        toast.success("Product added to cart");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error adding product");
      }
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const res = await BASE_URL.get(
          `/user/products/allProducts/getById/${id}`
        );
        setProduct(res?.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [id]);

  return (
    <div className="pd-container">
      <div className="pd-main-wrapper">
        <div className="pd-image-section">
          <div className="pd-image-container">
            {loading ? (
              <div className="pd-skeleton-image"></div>
            ) : (
              <img src={product.url} alt="Product" className="pd-main-image" />
            )}
          </div>
          {loading ? (
            <div className="pd-skeleton-button"></div>
          ) : (
            <button
              onClick={() => handleAddToCart(product._id)}
              className="pd-action-button"
            >
              Add to Cart
            </button>
          )}
        </div>

        {loading ? (
          // Skeleton loader...
          <div className="pd-skeleton-info">{/* Skeleton UI... */}</div>
        ) : (
          <div className="pd-info-section">
            <h4 className="pd-title-main">{product.shortTitle}</h4>
            <p className="pd-subtitle">{product.longTitle}</p>

            <Divider className="pd-divider" />

            <div className="pd-price-section">
              <p>
                Deal of the Day:
                <span className="pd-current-price"> ₹{product.cost}.00</span>
                {product.mrp && (
                  <span className="pd-original-price"> ₹{product.mrp}</span>
                )}
                {product.discount && (
                  <span className="pd-discount-badge">
                    {product.discount} off
                  </span>
                )}
              </p>
              {product.mrp && (
                <p className="pd-savings">
                  You Save: ₹{product.mrp - product.cost}
                </p>
              )}
            </div>

            <div className="pd-delivery-info">
              <div className="pd-delivery-option">
                <span className="pd-delivery-icon">✓</span>
                FREE Delivery
              </div>
              <div className="pd-delivery-option">
                <span className="pd-delivery-icon">✓</span>
                Fastest Delivery: Tomorrow
              </div>
            </div>

            {product.description && (
              <div className="pd-description-container">
                <h5 className="pd-description-title">About the product:</h5>
                <p className="pd-description-text">{product.description}</p>
              </div>
            )}
          </div>
        )}
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

export default ProductDetail;
