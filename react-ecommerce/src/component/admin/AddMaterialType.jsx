import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import '../../style/addCategory.css'

const AddMaterialType = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
            if (!ApiService.isAdminOrInventoryManager()) {
                navigate("/unauthorized");
            }
        }, [navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.createMaterialType({name});
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(()=>{
                    setMessage('');
                    navigate("/admin/materialTypes")
                }, 3000)
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Failed to save a materialType")
        }
    }

    return(
        <div className="add-category-page">
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="materialType-form">
                <h2>Add MaterialType</h2>
                <input type="text"
                placeholder="MaterialType Name"
                value={name}
                onChange={(e)=> setName(e.target.value)} />

                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddMaterialType;