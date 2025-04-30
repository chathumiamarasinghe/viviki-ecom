import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Banner5 from "../../assets/common/banner5.png";
import '../../style/footer.css';

const HomeImage = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    return (
        <div className="home-image-container" data-aos="zoom-in">
            <img
                src={Banner5}
                alt="Home Banner"
                className="home-banner-image"
            />
        </div>
    );
};

export default HomeImage;
