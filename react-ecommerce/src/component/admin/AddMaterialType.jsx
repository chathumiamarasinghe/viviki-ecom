import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import '../../style/addCategory.css';

const AddMaterialType = () => {
    const [name, setName] = useState('');
    const [unitType, setUnitType] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!ApiService.isAdminOrInventoryManager()) {
            navigate("/unauthorized");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.createMaterialType({ name, unitType });
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate("/admin/materialTypes");
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Failed to save a materialType");
        }
    };

    return (
        <div className="add-category-page">
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="materialType-form">
                <h2>Add MaterialType</h2>

                <input
                    type="text"
                    placeholder="Material Type Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <select value={unitType} onChange={(e) => setUnitType(e.target.value)} required>
                    <option value="">Select Unit Type</option>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="l">Liter (l)</option>
                    <option value="ml">Milliliter (ml)</option>
                    <option value="pcs">Pieces (pcs)</option>
                </select>

                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddMaterialType;
