import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../style/addProduct.css';
import ApiService from "../../service/ApiService";

const EditMaterialPage = () => {
    const { materialId } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
                if (!ApiService.isAdminOrInventoryManager()) {
                    navigate("/unauthorized");
                }
            }, [navigate]);

    useEffect(() => {
        if (materialId) {
            ApiService.getMaterialById(materialId).then((response) => {
                const material = response.material;
                setName(material.name);
                setDescription(material.description);
                setQuantity(material.quantity);
            }).catch((error) => {
                setMessage(error.response?.data?.message || error.message || 'Unable to fetch material');
            });
        }
    }, [materialId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const materialData = {
                id: materialId,
                name,
                description,
                quantity
            };

            const response = await ApiService.updateMaterial(materialData);
            if (response.status === 200) {
                setMessage("Material updated successfully!");
                setTimeout(() => {
                    setMessage('');
                    navigate('/admin/materials');
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Unable to update material');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>Edit Material</h2>
            {message && <div className="message">{message}</div>}

            <input
                type="text"
                placeholder="Material name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
            />

            <button type="submit">Update</button>
        </form>
    );
};

export default EditMaterialPage;
