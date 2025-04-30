import React, { useState, useEffect } from "react";
import '../../style/navbar.css';
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import LightButton from "../../assets/common/light-mode.png";
import DarkButton from "../../assets/common/dark-mode.png";
import { FaHome, FaThList, FaUser, FaUserShield, FaSignInAlt, FaSignOutAlt, FaShoppingCart } from "react-icons/fa";


const Navbar = () => {
    const [searchValue, setsearchValue] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    const isAdmin = ApiService.isAdmin();
    const isInventoryManager = ApiService.isInventoryManager();
    const isDeliveryPerson = ApiService.isDeliveryPerson();

    const isAuthenticated = ApiService.isAuthenticated();

    
    const handleSearchChange = (e) => {
        setsearchValue(e.target.value);
    }

    
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        navigate(`/?search=${searchValue}`)
    }

    
    const handleLogout = () => {
        const confirm = window.confirm("Are you sure want to logout");
        if (confirm) {
            ApiService.logout();
            setTimeout(() => {
                navigate('/login')
            }, 500);
        }
    }

    
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
        document.body.classList.toggle('dark', !isDarkMode);
        
        localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    }

    
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
                <NavLink to="/"><img src="./logo.png" alt="Rubber Store" /></NavLink>
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
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        <FaHome size={25}/> 
    </NavLink>
    
    <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
        <FaThList size={25}/>
    </NavLink>

    {isAuthenticated && (
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaUser size={25}/>
        </NavLink>
    )}

    {/* Role-Based Navigation */}
    {isAdmin && (
                    <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>
                        <FaUserShield size={25} />
                    </NavLink>
                )}

                {isInventoryManager && (
                    <NavLink to="/manager" className={({ isActive }) => isActive ? "active" : ""}>
                        <FaUserShield size={25} />
                    </NavLink>
                )}

                {isDeliveryPerson && (
                    <NavLink to="/delivery" className={({ isActive }) => isActive ? "active" : ""}>
                        <FaUserShield size={25} />
                    </NavLink>
                )}

    {!isAuthenticated && (
        <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaSignInAlt size={25}/>
        </NavLink>
    )}

    {isAuthenticated && (
        <NavLink onClick={handleLogout}>
            <FaSignOutAlt size={25}/>
        </NavLink>
    )}

    <NavLink to="/cart">
        <FaShoppingCart size={25}/>
    </NavLink>
                
                <button className="theme-toggle" onClick={toggleTheme}>
                    
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
