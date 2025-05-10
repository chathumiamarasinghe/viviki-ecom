import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import '../../style/adminCategory.css';

const AdminCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await ApiService.getAllCategory();
            setCategories(response.categoryList || []);
        } catch (error) {
            console.log("Error fetching category list", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-category/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this category?");
        if (confirmed) {
            try {
                await ApiService.deleteCategory(id);
                fetchCategories();
            } catch (error) {
                console.log("Error deleting category by id");
            }
        }
    };

     const handleDownloadReport = async () => {
                    try {
                        const pdfBlob = await ApiService.downloadcategoryItemsReport();
                
                        const url = window.URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'categorylistReport.pdf'); 
                        document.body.appendChild(link);
                        link.click();
                        link.parentNode.removeChild(link);
                    } catch (error) {
                        console.error("Failed to download report:", error);
                    }
                }

    return (
        <div className="admin-category-page">
            <div className="admin-category-list">
                <h2>Categories</h2>
                <button className="add-btn" onClick={() => navigate('/admin/add-category')}>
                    + Add Category
                </button>
                <button className="btn-outline" onClick={handleDownloadReport}>
                      Download Category Report
                </button>

                <table className="category-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>
                                    <button className="outline-btn edit-btn" onClick={() => handleEdit(category.id)}>Edit</button>
                                    <button className="outline-btn delete-btn" onClick={() => handleDelete(category.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCategoryPage;
