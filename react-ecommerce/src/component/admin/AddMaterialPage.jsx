import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/addProduct.css';
import ApiService from "../../service/ApiService";

const AddMaterialPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [materialTypes, setMaterialTypes] = useState([]);
    const [selectedMaterialTypeId, setSelectedMaterialTypeId] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (!ApiService.isAdminOrInventoryManager()) {
            navigate("/unauthorized");
        }
    
        ApiService.getAllMaterialTypes()
            .then((res) => {
                console.log("Material types:", res.materialTypeList);
                setMaterialTypes(res.materialTypeList);
            })
            .catch((error) => {
                console.error("Error fetching material types:", error);
            });
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const materialData = {
                name,
                description,
                quantity: parseInt(quantity),
                materialType: {
                    id: parseInt(selectedMaterialTypeId)
                }
            };

            const response = await ApiService.addMaterial(materialData);
            if (response.status === 200) {
                setMessage("Material added successfully!");
                setTimeout(() => {
                    setMessage('');
                    navigate('/admin/materials');
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

                <select
                    value={selectedMaterialTypeId}
                    onChange={(e) => setSelectedMaterialTypeId(e.target.value)}
                    required
                >
                    <option value="">Select Material Type</option>
                    {materialTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>

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
