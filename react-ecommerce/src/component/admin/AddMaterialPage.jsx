import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/addProduct.css'; // You can rename this to addMaterial.css if needed
import ApiService from "../../service/ApiService";

const AddMaterialPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const materialData = {
                name,
                description,
                quantity
            };

            const response = await ApiService.addMaterial(materialData);
            if (response.status === 200) {
                setMessage("Material added successfully!");
                setTimeout(() => {
                    setMessage('');
                    navigate('/admin/materials'); // 👈 Adjust this route if needed
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Unable to add material');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="product-form">
                <h2>Add Material</h2>
                {message && <div className="message">{message}</div>}

                <input 
                    type="text" 
                    placeholder="Material Name"
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

                <button type="submit">Add Material</button>
            </form>
        </div>
    );
};

export default AddMaterialPage;
