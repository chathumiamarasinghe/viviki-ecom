import React, { useState, useEffect } from "react";
import '../../style/navbar.css';
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import LightButton from "../../assets/common/light-mode.png";  // Import light mode button image
import DarkButton from "../../assets/common/dark-mode.png";    // Import dark mode button image

const Navbar = () => {
    const [searchValue, setsearchValue] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    const isAdmin = ApiService.isAdmin();
    const isAuthenticated = ApiService.isAuthenticated();

    // Handle search input change
    const handleSearchChange = (e) => {
        setsearchValue(e.target.value);
    }

    // Handle search submit
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        navigate(`/?search=${searchValue}`)
    }

    // Handle logout
    const handleLogout = () => {
        const confirm = window.confirm("Are you sure want to logout");
        if (confirm) {
            ApiService.logout();
            setTimeout(() => {
                navigate('/login')
            }, 500);
        }
    }

    // Toggle dark mode
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
        document.body.classList.toggle('dark', !isDarkMode);
        // Save the user's theme preference in localStorage
        localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    }

    // Check for stored theme preference on load
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.body.classList.add('dark');
        }
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/"><img src="./logo.png" alt="logo" /></NavLink>
            </div>

            {/* SEARCH FORM */}
            <form className="navbar-search" onSubmit={handleSearchSubmit}>
                <input type="text"
                    placeholder="Search Products"
                    value={searchValue}
                    onChange={handleSearchChange} />
                <button type="submit">Search</button>
            </form>

            <div className="navbar-link">
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
                <NavLink to="/categories" className={({ isActive }) => (isActive ? "active" : "")}>Categories</NavLink>
                {isAuthenticated && <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>My account</NavLink>}
                {isAdmin && <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")}>Admin</NavLink>}
                {!isAuthenticated && <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink>}
                {isAuthenticated && <NavLink onClick={handleLogout}>Logout</NavLink>}
                <NavLink to="/cart">Cart</NavLink>

                {/* Toggle Button for Dark/Light Mode */}
                <button className="theme-toggle" onClick={toggleTheme}>
                    {/* Show light mode button when in dark mode, and vice versa */}
                    {isDarkMode ? (
                        <img src={LightButton} alt="Light Mode" style={{ width: '40px', height: 'auto' }} />
                    ) : (
                        <img src={DarkButton} alt="Dark Mode" style={{ width: '40px', height: 'auto' }} />
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
