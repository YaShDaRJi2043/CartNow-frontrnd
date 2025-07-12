import React, { useEffect, useState } from "react";
import "./MultiCarousel.css";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BASE_URL from "../../../services/Helper";

const MultiCarousel = ({ path, title, pagePath }) => {
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProductData = async () => {
    try {
      setLoading(true);
      const productData = await BASE_URL.get(`${path}`);
      setCarouselData(productData?.data?.slice(0, 5));
    } catch (error) {
      console.error("Error fetching carousel data:", error);
    } finally {
      setLoading(false);
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    getProductData();
  }, [path]);

  // Skeleton loader component
  const SkeletonItem = () => (
    <div className="multi-carousel-skeleton-item">
      <div className="multi-carousel-skeleton-img"></div>
      <div className="multi-carousel-skeleton-line short"></div>
      <div className="multi-carousel-skeleton-line medium"></div>
      <div className="multi-carousel-skeleton-line long"></div>
    </div>
  );

  return (
    <div className="multi-carousel">
      <div className="multi-carousel-header">
        <h3 className="multi-carousel-title">{title}</h3>
        <NavLink to={pagePath}>
          <button className="multi-carousel-view-btn">View All</button>
        </NavLink>
      </div>

      <Divider />

      <Carousel
        responsive={responsive}
        infinite={true}
        draggable={true}
        swipeable={true}
        centerMode={false}
        autoPlay={!loading} // Disable autoPlay when loading
        autoPlaySpeed={3000}
        keyBoardControl={true}
        showDots={false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
        partialVisible={false}
      >
        {loading
          ? Array(5)
              .fill(0)
              .map((_, index) => <SkeletonItem key={index} />)
          : carouselData.map((product) => (
              <NavLink to={`/productDetail/${product._id}`} key={product._id}>
                <div className="multi-carousel-item">
                  <img
                    src={product.url}
                    alt={product.shortTitle}
                    className="multi-carousel-img"
                  />
                  <p className="multi-carousel-name">{product.shortTitle}</p>
                  <p className="multi-carousel-price">₹{product.cost}.00</p>
                  <p className="multi-carousel-mrp">
                    <del>₹{product.mrp}.00</del>
                  </p>
                </div>
              </NavLink>
            ))}
      </Carousel>
    </div>
  );
};

export default MultiCarousel;
