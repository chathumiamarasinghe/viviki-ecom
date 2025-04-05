import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import "../../style/categoryList.css";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await ApiService.getAllCategory();
            setCategories(response.categoryList || []);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Unable to fetch categories");
        }
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <div className="category-list-container">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <div className="category-boxes">
    {categories.map((category) => (
        <div 
            key={category.id} 
            className="category-box"
            onClick={() => handleCategoryClick(category.id)}
        >
            {category.name}
        </div>
    ))}
</div>
                </div>
            )}
        </div>
    );
};

export default CategoryList;
