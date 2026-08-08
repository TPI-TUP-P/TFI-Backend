import React from 'react'
import { useAuthStore } from '../stores/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const token = useAuthStore((state)=> state.token);

    if(token)  return <Navigate to="/home" replace />
    
    return <Outlet/>
}

export default PublicRoute