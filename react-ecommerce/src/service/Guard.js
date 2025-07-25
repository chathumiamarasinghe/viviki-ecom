import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import ApiService from "./ApiService";


export const ProtectedRoute = ({element: Component}) => {
    const location = useLocation();

    return ApiService.isAuthenticated() ? (
        Component
    ):(
        <Navigate to="/login" replace state={{from: location}}/>
    );
};


export const AdminRoute = ({element: Component}) => {
    const location = useLocation();

    return ApiService.isAdmin() ? (
        Component
    ):(
        <Navigate to="/login" replace state={{from: location}}/>
    );
};

export const InventoryManagerRoute = ({element: Component}) => {
    const location = useLocation();
    return ApiService.isInventoryManager() ? (
        Component
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export const DeliveryPersonRoute = ({element: Component}) => {
    const location = useLocation();
    return ApiService.isDeliveryPerson() ? (
        Component
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export const AdminOrInventoryManagerRoute = ({ element: Component }) => {
    const location = useLocation();

    return ApiService.isAdminOrInventoryManager() ? (
        Component
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

/**export const AdminOrDeliveryPersonRoute = ({ element: Component }) => {
    const location = useLocation();

    return ApiService.isAdminOrDeliveryPerson() ? (
        Component
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};*/
