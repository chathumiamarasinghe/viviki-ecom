import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from "../../service/ApiService";

const AdminUserPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    
    const fetchUsers = async () => {
        try {
            const res = await ApiService.getAllUsers();
            console.log("Fetched users response:", res); 
    
           
            if (res && res.userList && Array.isArray(res.userList)) {
                console.log("User data:", res.userList); 
                setUsers(res.userList); 
            } else {
                console.error("No user data found in the response");
                setUsers([]); 
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false); 
        }
    };

    
    useEffect(() => {
        fetchUsers(); 
    }, []);

    
    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await ApiService.deleteUser(userId);
                fetchUsers(); 
            } catch (error) {
                console.error("Failed to delete user", error);
            }
        }
    };

    
    const handleAddUserClick = () => {
        navigate('/admin/add-user'); 
    };

    if (loading) return <div>Loading...</div>;

    const handleDownloadReport = async () => {
                        try {
                            const pdfBlob = await ApiService.downloaduserReport();
                    
                            const url = window.URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', 'userlistReport.pdf'); 
                            document.body.appendChild(link);
                            link.click();
                            link.parentNode.removeChild(link);
                        } catch (error) {
                            console.error("Failed to download report:", error);
                        }
                    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>All Registered Users</h2>
                <button className="btn btn-success" onClick={handleAddUserClick}>
                    Add User
                </button>
                <button className="btn-outline" onClick={handleDownloadReport}>
                      Download User Report
                </button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="5">No users found.</td>
                        </tr>
                    ) : (
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUserPage;
