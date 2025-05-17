import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/addProduct.css';

const EditMaterialType = () => {
    const { materialTypeId } = useParams(); 
    const [name, setName] = useState('');
    const [unitType, setUnitType] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!ApiService.isAdminOrInventoryManager()) {
            navigate("/unauthorized");
        }

        const fetchMaterialType = async () => {
            try {
                const response = await ApiService.getMaterialTypeById(materialTypeId);
                setName(response.name);
                setUnitType(response.unitType);
            } catch (error) {
                console.error("Error fetching material type:", error);
            }
        };

        fetchMaterialType();
    }, [materialTypeId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
    setMessage("Material type name cannot be empty.");
    return;
}
if (!unitType) {
    setMessage("Please select a valid unit type.");
    return;
}
if (/^\d+$/.test(name.trim())) {
        setMessage("Product name cannot be only numbers.");
        return;
    }


        try {
            const updatedMaterialType = {
                name,
                unitType
            };

            const response = await ApiService.updateMaterialType(materialTypeId, updatedMaterialType);

            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate('/admin/materialTypes');
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Unable to update material type');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="product-form">
                <h2>Edit Material Type</h2>
                {message && <div className="message">{message}</div>}

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

                <button type="submit">Update Material Type</button>
            </form>
        </div>
    );
};

export default EditMaterialType;
