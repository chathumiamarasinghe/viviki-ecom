import React, {useState} from "react";
import '../../style/navbar.css';
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";


const Navbar = () =>{

    const [searchValue, setsearchValue] = useState("");
    const navigate = useNavigate();

    const isAdmin = ApiService.isAdmin();
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
        if(confirm){
            ApiService.logout();
            setTimeout(() => {
                navigate('/login')
            },500);
        }
    }

        return(
            <nav className="navbar">
                <div className="navbar-brand">
                    <NavLink to="/"><img src="./logo.png" alt="logo"/></NavLink>
                </div>
                {/* SEARCH FORM */}
                <form className="navbar-search">
                    <input type="text" 
                    placeholder="Search Products" 
                    value={searchValue}
                    onChange={handleSearchChange} />
                    <button type="submit">Search</button>
                </form>

                <div className="navbar-link">
                    <NavLink to="/" activeClassname="active">Home</NavLink>
                    <NavLink to="/categories" activeClassname="active">Categories</NavLink>
                    {isAuthenticated && <NavLink to="/profile" activeClassname="active">My account</NavLink>}
                    {isAdmin && <NavLink to="/admin" activeClassname="active">Admin</NavLink>}
                    {!isAuthenticated && <NavLink to="/login" activeClassname="active">Login</NavLink>}
                    {isAuthenticated && <NavLink onClick={handleLogout}>Logout</NavLink>}
                    <NavLink to="/cart">Cart</NavLink>
                </div>
            </nav>
        );
    
};

export default Navbar;