import React from 'react'
import { useAuthStore } from '../Components/stores/useAuthStore'

const HomePage = () => {
  const logout = useAuthStore((state)=> state.logout)
  return (
    <div>Home

      <button onClick={logout}>Cerrar sesion</button>
    </div>
  )
}

export default HomePage