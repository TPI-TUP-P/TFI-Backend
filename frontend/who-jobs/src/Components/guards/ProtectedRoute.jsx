import React from 'react'
import { useAuthStore } from '../stores/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = useAuthStore((state)=> state.token);

    if(!token)  return <Navigate to="/login" replace />
    
    return <Outlet/>
}

export default ProtectedRoute