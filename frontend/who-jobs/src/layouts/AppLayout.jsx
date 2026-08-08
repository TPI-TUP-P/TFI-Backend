import React from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../Components/app/AppNavbar";
import AppFooter from "../Components/app/AppFooter";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100 antialiased">
      {/* 1. Navbar Superior */}
      <AppNavbar />

      {/* 2. Contenido principal (flex-1 empuja el footer hacia abajo) */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6">
        <Outlet />
      </main>

      {/* 3. Footer Inferior */}
      <AppFooter />
    </div>
  );
}