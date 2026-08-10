// AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../Components/app/AppNavbar";
import AppFooter from "../Components/app/AppFooter";
import AppSidebar from "../Components/app/AppSideBar";

export default function AppLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-brand-bg text-brand-title">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <AppNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </div>
  );
}