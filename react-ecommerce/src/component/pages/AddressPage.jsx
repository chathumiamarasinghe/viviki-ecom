import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/address.css';

const AddressPage = () => {
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (location.pathname === '/edit-address') {
            fetchUserInfo();
        }
    }, [location.pathname]);

    const fetchUserInfo = async () => {
        try {
            const response = await ApiService.getLoggedInUserInfo();
            if (response.user.address) {
                setAddress(response.user.address);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Unable to fetch user information");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    
    if (address.street.trim().length < 5) {
        errors.street = "Street must be at least 5 characters long.";
    }

    
    const lettersOnly = /^[A-Za-z\s]+$/;
    if (!lettersOnly.test(address.city)) {
        errors.city = "City must contain only letters.";
    }
    if (!lettersOnly.test(address.state)) {
        errors.state = "State must contain only letters.";
    }
    if (!lettersOnly.test(address.country)) {
        errors.country = "Country must contain only letters.";
    }

    
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(address.zipCode)) {
        errors.zipCode = "Zip code must be exactly 5 digits.";
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
        return; 
    }

    try {
        await ApiService.saveAddress(address);

        if (location.state?.fromCheckout) {
            navigate("/checkout");
        } else {
            navigate("/profile");
        }
    } catch (error) {
        setError(error.response?.data?.message || error.message || "Failed to save/update address");
    }
};


    return (
        <div className="address-page">
            <h2>{location.pathname === '/edit-address' ? 'Edit Address' : "Add Address"}</h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>
    Street:
    <input
        type="text"
        name="street"
        value={address.street}
        onChange={handleChange}
        required
    />
    {validationErrors.street && <small className="error">{validationErrors.street}</small>}
</label>

<label>
    City:
    <input
        type="text"
        name="city"
        value={address.city}
        onChange={handleChange}
        required
    />
    {validationErrors.city && <small className="error">{validationErrors.city}</small>}
</label>

<label>
    State:
    <input
        type="text"
        name="state"
        value={address.state}
        onChange={handleChange}
        required
    />
    {validationErrors.state && <small className="error">{validationErrors.state}</small>}
</label>

<label>
    Zip Code:
    <input
        type="text"
        name="zipCode"
        value={address.zipCode}
        onChange={handleChange}
        required
    />
    {validationErrors.zipCode && <small className="error">{validationErrors.zipCode}</small>}
</label>

<label>
    Country:
    <input
        type="text"
        name="country"
        value={address.country}
        onChange={handleChange}
        required
    />
    {validationErrors.country && <small className="error">{validationErrors.country}</small>}
</label>

                <button type="submit">
                    {location.pathname === '/edit-address' ? 'Edit Address' : "Save Address"}
                </button>
            </form>
        </div>
    );
};

export default AddressPage;
