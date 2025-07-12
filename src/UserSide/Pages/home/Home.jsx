import React from "react";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";

import "./Home.css";
import CarouselComponent from "../../Components/carousel/CarouselComponent";
import MultiCarousel from "../../Components/multiCarousel/MultiCarousel";

const Home = () => {
  return (
    <>
      <div>
        <div className="home-wrapper">
          <div className="carousel-section">
            <CarouselComponent />
          </div>

          <div className="multi-carousel-section">
            <div className="multi-carousel-wrapper">
              <MultiCarousel
                path="/user/products/mobileProduct/get"
                title="Mobiles"
                pagePath="/mobile"
              />
            </div>

            <div className="electronic-ad-section">
              <div className="electronic-ad-title">Festive Latest Launches</div>
              <img
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg"
                alt="Advertisement"
                className="electronic-ad-image"
              />
              <NavLink to="/electronic" className="see-more-link">
                See more
              </NavLink>
            </div>
          </div>

          <MultiCarousel
            path="/user/products/electronicProduct/get"
            title="Electronics"
            pagePath="/electronic"
          />

          <div className="home-kitchen-ad-section">
            <NavLink to="/homekitchen">
              <img
                src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg"
                alt="Home Kitchen Advertisement"
                className="home-kitchen-ad-image"
              />
            </NavLink>
          </div>

          <MultiCarousel
            path="/user/products/menFashionProduct/get"
            title="Men's Wear"
            pagePath="/men"
          />

          <MultiCarousel
            path="/user/products/womenFashionProduct/get"
            title="Women's Wear"
            pagePath="/women"
          />

          <MultiCarousel
            path="/user/products/homeKitchenProduct/get"
            title="Home and Kitchen"
            pagePath="/homekitchen"
          />
        </div>

        <Divider />
      </div>
    </>
  );
};

export default Home;
