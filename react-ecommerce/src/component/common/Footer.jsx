import React from "react";
import '../../style/footer.css';
import { NavLink } from "react-router-dom";
import BottomBanner from './BottomBanner';

// Import social media icons from react-icons
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <ul>
                    <li><NavLink to={"/"}>About Us</NavLink></li>
                    <li><NavLink to={"/"}>Contact Us</NavLink></li>
                    <li><NavLink to={"/"}>Terms & Conditions</NavLink></li>
                    <li><NavLink to={"/"}>Privacy Policy</NavLink></li>
                    <li><NavLink to={"/"}>FAQs</NavLink></li>
                </ul>
            </div>

            <BottomBanner />

            {/* Social Media Icons */}
            <div className="footer-social">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                    <FaFacebook size={30} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                    <FaInstagram size={30} />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon youtube">
                    <FaYoutube size={30} />
                </a>
            </div>

            <div className="footer-info">
                <p>&copy; 2024 VIVIKI RUBBER PRODUCTS PVT LTD. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
