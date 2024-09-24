import React from "react";
import "./CarouselComponent.css";
import Carousel from "react-bootstrap/Carousel";

const CarouselComponent = () => {
  return (
    <>
      <div>
        <Carousel data-bs-theme="dark" pause>
          <Carousel.Item>
            <img
              className="carouselImg d-block w-100 img-fluid"
              src="1_caro.jpg"
              alt="First slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carouselImg d-block w-100 img-fluid"
              src="2_caro.jpg"
              alt="Second slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carouselImg d-block w-100 img-fluid"
              src="3_caro.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default CarouselComponent;
