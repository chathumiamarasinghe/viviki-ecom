import React, { useState } from 'react';
import ApiService from "../../service/ApiService";

const AddUser = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        role: 'USER', // Default to 'USER'
        password: '',
        address: {
            street: '',
            city: '',
            state: '',
            country: '',
            zipCode: ''
        }
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('address')) {
            const addressField = name.split('.')[1]; 
            setUserData({
                ...userData,
                address: {
                    ...userData.address,
                    [addressField]: value
                }
            });
        } else {
            setUserData({
                ...userData,
                [name]: value
            });
        }
    };

    
    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Basic Validations
    if (!/^[a-zA-Z\s]{3,}$/.test(userData.name)) {
        setMessage("Name must be at least 3 characters and contain only letters.");
        setLoading(false);
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
        setMessage("Invalid email format.");
        setLoading(false);
        return;
    }

    if (!/^\d{10}$/.test(userData.phoneNumber)) {
        setMessage("Phone number must be 10 digits.");
        setLoading(false);
        return;
    }

    if (userData.password.length < 6) {
        setMessage("Password must be at least 6 characters.");
        setLoading(false);
        return;
    }

    if (!/^\d{5}(-\d{4})?$/.test(userData.address.zipCode)) {
        setMessage("Invalid zip code.");
        setLoading(false);
        return;
    }

    try {
        const res = await ApiService.addUser(userData);
        if (res.status === 200) {
            setMessage('User added successfully!');
        } else {
            setMessage('Failed to add user');
        }
    } catch (error) {
        console.error('Error adding user:', error);
        setMessage('Error adding user');
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="container mt-4">
            <h2>Add New User</h2>
            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="form-control"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        name="address.street"
                        className="form-control"
                        placeholder="Street"
                        value={userData.address.street}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="address.city"
                        className="form-control"
                        placeholder="City"
                        value={userData.address.city}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="address.state"
                        className="form-control"
                        placeholder="State"
                        value={userData.address.state}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="address.country"
                        className="form-control"
                        placeholder="Country"
                        value={userData.address.country}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="address.zipCode"
                        className="form-control"
                        placeholder="Zip Code"
                        value={userData.address.zipCode}
                        onChange={handleChange}
                        required
                    />
                </div>

                
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                        id="role"
                        name="role"
                        className="form-control"
                        value={userData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="USER">User</option>
                        <option value="INVENTORY_MANAGER">Inventory Manager</option>
                        <option value="DELIVERY_PERSON">Delivery Person</option>
                    </select>
                </div>

                
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Adding User...' : 'Add User'}
                </button>
            </form>
        </div>
    );
};

export default AddUser;
