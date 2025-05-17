import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/register.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
  const newErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-Z ]{3,}$/; 
  const phoneRegex = /^0\d{9}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!formData.name) {
    newErrors.name = "Name is required";
  } else if (!nameRegex.test(formData.name)) {
    newErrors.name = "Name must be at least 3 letters and contain only letters and spaces";
  }

  if (!formData.phoneNumber) {
    newErrors.phoneNumber = "Phone number is required";
  } else if (!phoneRegex.test(formData.phoneNumber)) {
    newErrors.phoneNumber = "Phone number must start with 0 and be exactly 10 digits";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (!passwordRegex.test(formData.password)) {
    newErrors.password = "Password must be at least 6 characters and include uppercase, lowercase, number, and special character";
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
    if (!validateForm()) return;

    try {
      const response = await ApiService.registerUser(formData);
      if (response.status === 200) {
        setMessage("User Successfully Registered");
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      }
    } catch (error) {
      setMessage(error.response?.data.message || error.message || "Unable to register a user");
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Register</button>
        <p className="register-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
