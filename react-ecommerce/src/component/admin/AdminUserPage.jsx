import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from "../../service/ApiService";

const AdminUserPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Define the fetchUsers function so it's accessible within the component
    const fetchUsers = async () => {
        try {
            const res = await ApiService.getAllUsers();
            console.log("Fetched users response:", res); // Log the entire response for debugging
    
            // Check if userList exists and is an array
            if (res && res.userList && Array.isArray(res.userList)) {
                console.log("User data:", res.userList); // Log the user data specifically
                setUsers(res.userList); // Set users from response
            } else {
                console.error("No user data found in the response");
                setUsers([]); // Set empty array if no users are returned
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false); // Stop loading once the data is fetched
        }
    };

    // Fetch users when the component mounts
    useEffect(() => {
        fetchUsers(); // Call the fetch function on mount
    }, []);

    // Delete user and refresh the list
    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await ApiService.deleteUser(userId);
                fetchUsers(); // Refresh the user list after deletion
            } catch (error) {
                console.error("Failed to delete user", error);
            }
        }
    };

    // Navigate to add user page
    const handleAddUserClick = () => {
        navigate('/admin/add-user'); 
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>All Registered Users</h2>
                <button className="btn btn-success" onClick={handleAddUserClick}>
                    Add User
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
