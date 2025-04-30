import React from "react";
import { Carousel } from "react-bootstrap";
import Banner1 from "../../assets/common/bannern1.png";
import Banner2 from "../../assets/common/banner2.png";
import Banner3 from "../../assets/common/banner3.png";
import Banner4 from "../../assets/common/banner4.png";

const BannerCarousel = () => {
  return (
    <Carousel interval={2000}>
      <Carousel.Item>
        <img
          className="d-block w-75 mx-auto"
          src={Banner2}
          alt="First slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-75 mx-auto"
          src={Banner1}
          alt="Second slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-75 mx-auto"
          src={Banner3}
          alt="Third slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-75 mx-auto"
          src={Banner4}
          alt="Forth slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default BannerCarousel;
