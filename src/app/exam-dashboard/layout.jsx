"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { logout } from "@/features/auth/authSlice";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { access_token, loadingAuth } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (loadingAuth) return;
    if (!access_token) router.replace("/");
  }, [access_token, loadingAuth, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/");
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      <header className="w-full bg-white shadow-md p-4 flex items-center justify-between relative">
        
        <div className="w-10"></div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
          <img src="/images/logon.png" alt="logo" className="h-8" />
        </div>

        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-[#177A9C] text-white rounded "
        >
          Logout
        </button>
      </header>

      <main className="flex-1 bg-slate-50">{children}</main>
    </div>
  );
}
