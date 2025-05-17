import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminProduct.css';
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";

const AdminProductPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;
    const [maxPrice, setMaxPrice] = useState('');
    const [maxQuantity, setMaxQuantity] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);


    const fetchProducts = async () => {
        try {
            const response = await ApiService.getAllProducts();
            const productList = response.productList || [];
            setTotalPages(Math.ceil(productList.length / itemsPerPage));
            setProducts(productList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Unable to fetch products');
        }
    };

   useEffect(() => {
    fetchProducts();
    fetchCategories();
}, [currentPage]);

const fetchCategories = async () => {
    try {
        const response = await ApiService.getAllCategory();
        setCategories(response.categoryList || []);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};


    const handleEdit = (id) => {
        navigate(`/admin/edit-product/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (confirmed) {
            try {
                await ApiService.deleteProduct(id);
                fetchProducts();
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'Unable to delete product');
            }
        }
    };

    const handleDownloadReport = async () => {
    let validationError = '';

    if (maxPrice && (isNaN(maxPrice) || Number(maxPrice) < 0)) {
        validationError = "Max Price must be a non-negative number.";
    } else if (maxQuantity && (isNaN(maxQuantity) || Number(maxQuantity) < 0)) {
        validationError = "Max Quantity must be a non-negative number.";
    }

    if (validationError) {
        setError(validationError);
        return;
    }

    try {
        const pdfBlob = await ApiService.downloadproductItemsReport(maxPrice, maxQuantity, categoryName);
        const url = window.URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'productlistReport.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        setError(null);
    } catch (error) {
        setError("Failed to download the report. Please try again later.");
        console.error("Download error:", error);
    }
};



    return (
        <div className="admin-product-page">
            <div className="admin-product-list">
                <h2>Products</h2>
                <button className="add-btn" onClick={() => navigate('/admin/add-product')}>
                    + Add Product
                </button>
                <div className="filter-inputs">
    <input
        type="number"
        min="0"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
    />
    <input
        type="number"
        min="0"
        placeholder="Max Quantity"
        value={maxQuantity}
        onChange={(e) => setMaxQuantity(e.target.value)}
    />
    <select
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="dropdown-filter"
    >
        <option value="">All Categories</option>
        {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
                {cat.name}
            </option>
        ))}
    </select>

    <button className="btn-outline" onClick={handleDownloadReport}>
        Download Product Report
    </button>

</div>

{error && <p className="error-message">{error}</p>}

                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>{product.category?.name || 'N/A'}</td>
                                <td>
                                    <button className="btn-outline" onClick={() => handleEdit(product.id)}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleDelete(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default AdminProductPage;
