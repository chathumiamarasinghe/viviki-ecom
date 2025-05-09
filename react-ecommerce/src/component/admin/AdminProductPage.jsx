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
    }, [currentPage]);

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
            try {
                const pdfBlob = await ApiService.downloadOrderItemsReport();
        
                const url = window.URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'productlistReport.pdf'); 
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            } catch (error) {
                console.error("Failed to download report:", error);
            }
        }

    return (
        <div className="admin-product-page">
            <div className="admin-product-list">
                <h2>Products</h2>
                <button className="btn-outline" onClick={() => navigate('/admin/add-product')}>
                    Add Product
                </button>
                {error && <p className="error-message">{error}</p>}
                <button className="btn-outline" onClick={handleDownloadReport}>
                      Download Product Report
                </button>

                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
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
