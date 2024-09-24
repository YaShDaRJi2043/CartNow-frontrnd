import React, { useEffect, useState } from "react";
import "./MultiCarousel.css";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BASE_URL from "../../../services/Helper";

const MultiCarousel = ({ path, title, pagePath }) => {
  const [carouselData, setCarouselData] = useState([]);

  const getProductData = async () => {
    const productData = await BASE_URL.get(`${path}`);
    setCarouselData((await productData)?.data?.slice(0, 5));
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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
  }, []);

  return (
    <>
      <div className="products_section">
        <div className="products_deal">
          <h3>{title}</h3>

          <NavLink to={`${pagePath}`}>
            <button className="view_btn">View All</button>
          </NavLink>
        </div>
        <Divider />

        <Carousel
          responsive={responsive}
          infinite={true}
          draggable={false}
          swipeable={true}
          centerMode={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          showDots={false}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          containerClass="carousel-container"
        >
          {carouselData.map((e) => {
            return (
              <NavLink to={`/productDetail/${e._id}`}>
                <div className="products_items">
                  <div>
                    <img src={e.url} alt="product" className="product_img" />
                  </div>
                  <p className="products_name">{e.shortTitle}</p>
                  <p className="products_offer">₹{e.cost}.00</p>
                  <p className="products_explore">
                    <del>₹{e.mrp}.00</del>
                  </p>
                </div>
              </NavLink>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default MultiCarousel;
