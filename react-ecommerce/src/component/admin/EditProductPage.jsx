import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../style/addProduct.css';
import ApiService from "../../service/ApiService";

const EditProductPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!ApiService.isAdminOrInventoryManager()) {
            navigate("/unauthorized");
            return;
        }

        const fetchData = async () => {
            try {
                const categoryRes = await ApiService.getAllCategory();
                setCategories(categoryRes.categoryList);

                if (productId) {
                    const productRes = await ApiService.getProductById(productId);
                    const product = productRes.product;

                    setName(product.name);
                    setDescription(product.description);
                    setPrice(product.price);
                    setQuantity(product.quantity);
                    setCategoryId(product.categoryId);
                    setImageUrl(product.imageUrl);
                }
            } catch (error) {
                setMessage("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productId, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !description.trim() || !price || !quantity || !categoryId) {
            setMessage("Please fill all required fields.");
            return;
        }

        try {
            const formData = new FormData();
            if (image) formData.append("image", image);
            formData.append("productId", productId);
            formData.append("categoryId", categoryId);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("quantity", quantity);

            const response = await ApiService.updateProduct(formData);

            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate('/admin/products');
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Unable to update product');
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (loading) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>Edit Product</h2>
            {message && <div className="message">{message}</div>}

            <input type="file" onChange={handleImageChange} />
            {imageUrl && <img src={imageUrl} alt="Preview" style={{ maxWidth: "150px", margin: "10px 0" }} />}

            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option value={cat.id} key={cat.id}>{cat.name}</option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Product name"
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
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                step="0.01"
            />

            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                min="0"
            />

            <button type="submit">Update</button>
        </form>
    );
};

export default EditProductPage;
