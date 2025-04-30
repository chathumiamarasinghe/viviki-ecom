import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductList from "../common/ProductList";
import ApiService from "../../service/ApiService";
import '../../style/home.css';
import BannerPage from '../common/Banner';
import CategoryList from '../common/CategoryList';
import CategorySection from '../pages/CategorySection';
import { FaArrowRight } from "react-icons/fa";

const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const queryparams = new URLSearchParams(location.search);
                const searchItem = queryparams.get('search');
                let response;
                if (searchItem) {
                    response = await ApiService.searchProducts(searchItem);
                } else {
                    response = await ApiService.getAllProducts();
                }

                const productList = shuffleArray(response.productList || []);
                setAllProducts(productList);
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'Unable to fetch products');
            }
        };

        fetchProducts();
    }, [location.search]);

    const handleViewMore = () => {
        
            navigate("/products");
        
    };

    const visibleProducts = allProducts.slice(0, visibleCount);

    return (
        <div className="home">
            <BannerPage />
            <CategoryList />
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="product-grid">
                    <ProductList products={visibleProducts} />
                    {allProducts.length > visibleCount && (
                        <div className="arrow-inline" onClick={handleViewMore}>
                            <FaArrowRight className="arrow-icon" />
                        </div>
                    )}
                </div>
            )}
            <CategorySection />
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="product-grid">
                    <ProductList products={visibleProducts} />
                    {allProducts.length > visibleCount && (
                        <div className="arrow-inline" onClick={handleViewMore}>
                            <FaArrowRight className="arrow-icon" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
