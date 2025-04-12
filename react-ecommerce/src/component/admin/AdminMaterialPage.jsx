import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminProduct.css'; // reuse same styles
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService"; // make sure to add material APIs there too

const AdminMaterialPage = () => {
    const navigate = useNavigate();
    const [materials, setMaterials] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    const fetchMaterials = async () => {
        try {
            const response = await ApiService.getAllMaterials(); // 👈 create this method in ApiService
            const materialList = response.materialList || [];
            setTotalPages(Math.ceil(materialList.length / itemsPerPage));
            setMaterials(materialList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Unable to fetch materials');
        }
    };

    useEffect(() => {
        fetchMaterials();
    }, [currentPage]);

    const handleEdit = (id) => {
        navigate(`/admin/edit-material/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this material?");
        if (confirmed) {
            try {
                await ApiService.deleteMaterial(id); // 👈 create this method in ApiService
                fetchMaterials();
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'Unable to delete material');
            }
        }
    };

    return (
        <div className="admin-product-list">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <h2>Materials</h2>
                    <button className="product-btn" onClick={() => navigate('/admin/add-material')}>
                        Add Material
                    </button>
                    <ul>
                        {materials.map((material) => (
                            <li key={material.id}>
                                <span>
                                    <strong>{material.name}</strong> — {material.description} — Quantity: {material.quantity}
                                </span>
                                <button className="product-btn" onClick={() => handleEdit(material.id)}>Edit</button>
                                <button className="product-btn-delete" onClick={() => handleDelete(material.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminMaterialPage;
