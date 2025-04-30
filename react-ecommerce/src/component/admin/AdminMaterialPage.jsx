import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminMaterial.css'; // Create this similar to adminCategory.css
import ApiService from "../../service/ApiService";

const AdminMaterialPage = () => {
    const navigate = useNavigate();
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const response = await ApiService.getAllMaterials();
            setMaterials(response.materialList || []);
        } catch (error) {
            console.log("Error fetching material list", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-material/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this material?");
        if (confirmed) {
            try {
                await ApiService.deleteMaterial(id);
                fetchMaterials();
            } catch (error) {
                console.log("Error deleting material by id");
            }
        }
    };

    return (
        <div className="admin-material-page">
            <div className="admin-material-list">
                <h2>Materials</h2>
                <button className="add-btn" onClick={() => navigate('/admin/add-material')}>
                    + Add Material
                </button>

                <table className="material-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Material Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map((material) => (
                            <tr key={material.id}>
                                <td>{material.id}</td>
                                <td>{material.name}</td>
                                <td>{material.description}</td>
                                <td>{material.quantity}</td>
                                <td>
                                    <button className="outline-btn edit-btn" onClick={() => handleEdit(material.id)}>Edit</button>
                                    <button className="outline-btn delete-btn" onClick={() => handleDelete(material.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminMaterialPage;
