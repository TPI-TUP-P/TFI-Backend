// AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AppFooter from "../Components/app/AppFooter";
import AppNavbar from "../Components/app/AppNavbar";
export default function AppLayout() {
  return (
      <div className="flex min-h-screen w-full flex-col bg-brand-bg text-brand-title">
      <AppNavbar />
      <main className="flex-1 overflow-y-auto pt-24 px-4">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}