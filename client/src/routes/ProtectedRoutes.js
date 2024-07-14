import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../components/contexts/UserContext';

const ProtectedRoute = () => {
    const { loggedIn } = useContext(UserContext);

    return loggedIn ? <Outlet /> : <Navigate to="/home" replace />;
};

export default ProtectedRoute;