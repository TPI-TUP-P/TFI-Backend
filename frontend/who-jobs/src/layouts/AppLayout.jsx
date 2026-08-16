// AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AppFooter from "../Components/app/AppFooter";
import AppNavbar from "../Components/app/AppNavbar";
import GlobalLoader from "../Components/GlobalLoader";
import { useLoaderStore } from "../Components/stores/useLoaderStore";
export default function AppLayout() {
    // const activeRequests = useLoaderStore((state) => state.activeRequests);
  
    // if(activeRequests > 0) return <GlobalLoader activeRequests={activeRequests}/>
  return (
      <div className="flex min-h-screen w-full flex-col bg-brand-bg text-brand-title">
        <GlobalLoader/>
      <AppNavbar />
      <main className="flex-1 overflow-y-auto pt-24 md:px-15 px-3">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}