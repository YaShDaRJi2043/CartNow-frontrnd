import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { NavLink } from "react-router-dom";
import BASE_URL from "../../../services/Helper";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ProductList = ({ path }) => {
  const [productListData, setProductListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);

  const getProductData = async () => {
    try {
      setLoading(true);
      const productData = await BASE_URL.get(`${path}`);
      setProductListData(productData?.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, [path]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productListData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Skeleton loader component
  const SkeletonItem = ({ isMobile = false }) => (
    <div className={`product-item ${isMobile ? "product-item-mobile" : ""}`}>
      <div className="product-list-image-wrapper skeleton-image">
        <div className="skeleton-image-inner"></div>
      </div>
      <div className="product-details">
        <div className="product-title skeleton-line"></div>
        <div className="product-price-section">
          <span className="product-cost skeleton-line short"></span>
          <span className="product-mrp skeleton-line medium"></span>
          <span className="product-discount skeleton-line long"></span>
        </div>
        <div className="product-delivery-info">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="product-list-container">
        {loading ? (
          <>
            {/* Desktop Skeleton */}
            <div className="desktop-skeleton">
              {Array(productsPerPage)
                .fill(0)
                .map((_, index) => (
                  <SkeletonItem key={`desktop-${index}`} />
                ))}
            </div>
            {/* Mobile Skeleton */}
            <div className="mobile-skeleton">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <SkeletonItem key={`mobile-${index}`} isMobile={true} />
                ))}
            </div>
          </>
        ) : (
          currentProducts.map((product) => (
            <NavLink
              to={`/productDetail/${product._id}`}
              style={{ textDecoration: "none", color: "black" }}
              key={product._id}
            >
              <div className="product-item">
                <div className="product-list-image-wrapper">
                  <img
                    src={product.url}
                    alt="product"
                    className="product-list-image"
                  />
                </div>

                <div className="product-details">
                  <div className="product-title">{product.shortTitle}</div>

                  <div className="product-price-section">
                    <span className="product-cost">₹{product.cost}</span>
                    <span className="product-mrp">₹{product.mrp}</span>
                    <span className="product-discount">
                      ({product.discount} off)
                    </span>
                  </div>

                  <div className="product-delivery-info">
                    <div>Get it soon</div>
                    <div>
                      <span className="product-free-delivery">FREE</span>{" "}
                      Delivery by CartNow
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          ))
        )}
      </div>

      {!loading && (
        <div className="pagination-wrapper">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(productListData.length / productsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              onClick={() =>
                window.scrollTo({ top: 0, left: 0, behavior: "instant" })
              }
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        </div>
      )}
    </>
  );
};

export default ProductList;
