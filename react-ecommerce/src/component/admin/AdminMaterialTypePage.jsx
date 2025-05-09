import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminMaterial.css';
import ApiService from "../../service/ApiService";

const AdminMaterialTypePage = () => {
    const navigate = useNavigate();
    const [materialTypes, setMaterialTypes] = useState([]);

    useEffect(() => {
        fetchMaterialTypes();
    }, []);

    const fetchMaterialTypes = async () => {
        try {
            const response = await ApiService.getAllMaterialTypes();
            setMaterialTypes(response.materialTypeList || []);
        } catch (error) {
            console.log("Error fetching material type list", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-materialType/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this material type?");
        if (confirmed) {
            try {
                await ApiService.deleteMaterialType(id);
                fetchMaterialTypes();
            } catch (error) {
                console.error("Error deleting material type by id");
            }
        }
    };

    return (
        <div className="admin-material-page">
            <div className="admin-material-list">
                <h2>Material Types</h2>
                <button className="add-btn" onClick={() => navigate('/admin/add-materialType')}>
                    + Add Material Type
                </button>

                <table className="material-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materialTypes.map((type) => (
                            <tr key={type.id}>
                                <td>{type.id}</td>
                                <td>{type.name}</td>
                                <td>
                                    <button className="outline-btn edit-btn" onClick={() => handleEdit(type.id)}>Edit</button>
                                    <button className="outline-btn delete-btn" onClick={() => handleDelete(type.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminMaterialTypePage;
