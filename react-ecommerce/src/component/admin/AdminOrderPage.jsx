import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminOrderPage.css'
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";
import OrderChart from "./OrderChart";


const OrderStatus = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"];


const AdminOrdersPage = () => {

    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [searchStatus, setSearchStatus] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    const navigate = useNavigate();

   useEffect(() => {
    const fetchOrders = async () => {
        try {
            let response;
            if (searchStatus) {
                response = await ApiService.getAllOrderItemsByStatus(searchStatus);
            } else {
                response = await ApiService.getAllOrders();
            }
            const orderList = response.orderItemList || [];

            setTotalPages(Math.ceil(orderList.length / itemsPerPage));
            setOrders(orderList);
            setFilteredOrders(orderList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Unable to fetch orders');
            setTimeout(() => setError(''), 3000);
        }
    };

    fetchOrders();
}, [searchStatus, currentPage]);


    const handleFilterChange = (e) =>{
        const filterValue = e.target.value;
        setStatusFilter(filterValue)
        setCurrentPage(1);

        if (filterValue) {
            const filtered = orders.filter(order => order.status === filterValue);
            setFilteredOrders(filtered.slice(0, itemsPerPage));
            setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        }else{
            setFilteredOrders(orders.slice(0, itemsPerPage));
            setTotalPages(Math.ceil(orders.length / itemsPerPage));
        }
    }


    const handleSearchStatusChange = async (e) => {
        setSearchStatus(e.target.value);
        setCurrentPage(1);
    }

    const handleOrderDetails = (id) => {
        const role = localStorage.getItem("role");
    
        if (role === "ADMIN") {
            navigate(`/admin/order-details/${id}`);
        } else if (role === "DELIVERY_PERSON") {
            navigate(`/delivery/order-details/${id}`);
        } else {
            console.warn("Unknown role or unauthorized access");
        }
    };

    const downloadOrderReport = async () => {
        try {
            
            const reportBlob = await ApiService.downloadOrderItemsReport();
    
            
            const url = window.URL.createObjectURL(new Blob([reportBlob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'order_items_report.pdf'); 
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error downloading the report", error);
            alert("There was an error downloading the report. Please try again.");
        }
    };
    


    return (
        <div className="admin-orders-page">
            <h2>Orders</h2>
            {error && <p className="error-message">{error}</p>}
            
            {/* Download Report Button */}
            <div className="download-report-container">
                <button 
                    className="download-report-btn" 
                    onClick={downloadOrderReport}>
                    Download Order Report
                </button>
            </div>
    
            <div className="filter-container">
                <div className="statusFilter">
                    <label>Filter By Status</label>
                    <select value={statusFilter} onChange={handleFilterChange}>
                        <option value="">All</option>
                        {OrderStatus.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <div className="searchStatus">
                    <label>Search By Status</label>
                    <select value={searchStatus} onChange={handleSearchStatusChange}>
                        <option value="">All</option>
                        {OrderStatus.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>
    
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Date Ordered</th>
                        <th>Actions</th>
                    </tr>
                </thead>
    
                <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user.name}</td>
                            <td>{order.status}</td>
                            <td>Rs.{order.price.toFixed(2)}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button className="btn btn-outline-warning" onClick={() => handleOrderDetails(order.id)}>
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    
            {orders.length > 0 && <OrderChart orders={orders} />}
    
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)} />
        </div>
    );
}

export default AdminOrdersPage;