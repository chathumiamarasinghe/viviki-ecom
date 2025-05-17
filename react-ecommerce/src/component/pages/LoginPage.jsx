import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/register.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await ApiService.loginUser(formData);
            if (response.status === 200) {
                setMessage("User successfully logged in");
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            setMessage(error.response?.data.message || error.message || "Unable to login");
        }
    };

    return (
        <div className="register-page">
            <h2>Login</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <p className="error-text">{errors.email}</p>}

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {errors.password && <p className="error-text">{errors.password}</p>}

                <button type="submit">Login</button>

                <p className="register-link">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
