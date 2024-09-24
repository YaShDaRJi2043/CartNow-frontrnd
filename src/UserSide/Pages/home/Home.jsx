import React from "react";
import "./Home.css";
import CarouselComponent from "../../Components/carousel/CarouselComponent";
import MultiCarousel from "../../Components/multiCarousel/MultiCarousel";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";

const Home = () => {
  return (
    <>
      <div style={{ paddingTop: "100px" }}>
        <div className="homePageMainDiv">
          <div>
            <CarouselComponent />
          </div>
          <div className="multiCarouselDiv">
            <div className="multiCarouse">
              <MultiCarousel
                path="/getmobiles"
                title="mobiles"
                pagePath="/mobile"
              />
            </div>
            <div className="electronicAdvertisement">
              <div className="advertisementTitle">Festive latest launches</div>
              <img
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg"
                alt="rightimg"
                className="electronicAdvertisementImg"
              />
              <NavLink to="/electronic">see more</NavLink>
            </div>
          </div>

          <MultiCarousel
            path="/getelectronics"
            title="Electronics"
            pagePath="/electronic"
          />

          <div className="homekitchenAdvertisement">
            <NavLink to="/homekitchen">
              <img
                src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg"
                alt=""
                className="homekitchenAdvertisementImg"
              />
            </NavLink>
          </div>

          <MultiCarousel path="/getmens" title="Men's wear" pagePath="/men" />

          <MultiCarousel
            path="/getwomens"
            title="Women's wear"
            pagePath="/women"
          />

          <MultiCarousel
            path="/gethomekitchens"
            title="Home And Kitchen"
            pagePath="/homekitchen"
          />
        </div>

        <Divider />
      </div>
    </>
  );
};

export default Home;
