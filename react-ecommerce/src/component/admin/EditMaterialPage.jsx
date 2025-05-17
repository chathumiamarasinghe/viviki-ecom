import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../style/addProduct.css';
import ApiService from "../../service/ApiService";

const EditMaterialPage = () => {
    const { materialId } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [materialTypes, setMaterialTypes] = useState([]);
    const [materialTypeId, setMaterialTypeId] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!ApiService.isAdminOrInventoryManager()) {
            navigate("/unauthorized");
        }
    }, [navigate]);

    useEffect(() => {
        ApiService.getAllMaterialTypes()
            .then((response) => {
                console.log("Edit page material types:", response.materialTypeList);
                setMaterialTypes(response.materialTypeList || []);
            })
            .catch((error) => {
                console.error("Error fetching material types:", error);
                setMaterialTypes([]); 
            });
    
        if (materialId) {
            ApiService.getMaterialById(materialId)
                .then((response) => {
                    const material = response.material;
                    setName(material.name);
                    setDescription(material.description);
                    setQuantity(material.quantity);
                    setMaterialTypeId(material.materialType?.id || '');
                })
                .catch((error) => {
                    setMessage(error.response?.data?.message || error.message || 'Unable to fetch material');
                });
        }
    }, [materialId]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
    setMessage("Material name cannot be empty.");
    return;
}
if (!materialTypeId) {
    setMessage("Please select a material type.");
    return;
}
if (quantity < 0) {
    setMessage("Quantity must be a non-negative number.");
    return;
}

        try {
            const materialData = {
                id: materialId,
                name,
                description,
                quantity,
                materialType: {
                    id: materialTypeId 
                }
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

            <select
    value={materialTypeId}
    onChange={(e) => setMaterialTypeId(e.target.value)}
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
