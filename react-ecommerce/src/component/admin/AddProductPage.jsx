import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/addProduct.css';
import ApiService from "../../service/ApiService";

const AddProductPage = () => {
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

   
    useEffect(() => {
        if (!ApiService.isAdminOrInventoryManager()) {
            navigate("/unauthorized"); 
        }
    }, [navigate]);

    
    useEffect(() => {
        ApiService.getAllCategory().then((res) => setCategories(res.categoryList));
    }, []);

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!image) {
        setMessage("Please upload an image.");
        return;
    }

   
    if (!categoryId) {
        setMessage("Please select a category.");
        return;
    }

    
    if (!name.trim() || name.length < 3) {
        setMessage("Product name must be at least 3 characters.");
        return;
    }

    if (/^\d+$/.test(name.trim())) {
        setMessage("Product name cannot be only numbers.");
        return;
    }

    
    if (!description.trim() || description.length < 5) {
        setMessage("Description must be at least 5 characters.");
        return;
    }

    
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
        setMessage("Price must be a positive number.");
        return;
    }

    
    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
        setMessage("Quantity must be a positive integer.");
        return;
    }

    try {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('categoryId', categoryId);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', parsedPrice);
        formData.append('quantity', parsedQuantity);

        const response = await ApiService.addProduct(formData);
        if (response.status === 200) {
            setMessage(response.message);
            setTimeout(() => {
                setMessage('');
                navigate('/admin/products');
            }, 3000);
        }
    } catch (error) {
        setMessage(error.response?.data?.message || error.message || 'Unable to upload product');
    }
};


    return (
        <div>
            <form onSubmit={handleSubmit} className="product-form">
                <h2>Add Product</h2>
                {message && <div className="message">{message}</div>}

                <input type="file" onChange={handleImage} />

                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
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
                />

                <textarea 
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                />

                <input 
                    type="number" 
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} 
                />

                <input 
                    type="number" 
                    placeholder="Quantity"        
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)} 
                />

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProductPage;
