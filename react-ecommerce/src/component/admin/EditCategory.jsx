import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import '../../style/addCategory.css'

const EditCategory = () => {
    const { categoryId } = useParams();
    const [name, setName] = useState('')
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
            if (!ApiService.isAdminOrInventoryManager()) {
                navigate("/unauthorized"); 
            }
        }, [navigate]);


    useEffect(() => {
        fetchCategory(categoryId);
    }, [categoryId])

    const fetchCategory = async () => {
        try {
            const response = await ApiService.getCategoryById(categoryId);
            setName(response.category.name);

        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Failed to get a category by id")
            setTimeout(() => {
                setMessage('');
            }, 3000)
        }
    }

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim().length < 3) {
        setMessage("Category name must be at least 3 characters.");
        return;
    }
    if (/^\d+$/.test(name.trim())) {
        setMessage("Product name cannot be only numbers.");
        return;
    }


    try {
        const response = await ApiService.updateCategory(categoryId, { name });
        if (response.status === 200) {
            setMessage(response.message);
            setTimeout(() => {
                setMessage('');
                navigate("/admin/categories");
            }, 3000);
        }
    } catch (error) {
        setMessage(error.response?.data?.message || error.message || "Failed to save a category");
    }
};


    return (
        <div className="add-category-page">
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="category-form">
                <h2>Edit Category</h2>
                <input type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                <button type="submit">Update</button>
            </form>
        </div>
    )

}

export default EditCategory;