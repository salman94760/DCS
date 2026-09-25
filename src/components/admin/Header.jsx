import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
export default function Header() {
  const handleLogout = async () => {
  try {
    await api.post("/logout");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    navigate("/login", { replace: true });
  }
};
  return (

    <>
      <header className="relative bg-[#0a1122] h-[76px] flex items-center justify-between px-6 overflow-hidden">
        <div className="stripe-wrap">
          <div className="stripe"></div>
          <div className="stripe two"></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <img src="/logo.png" className="w-[80px]" />

          <div>
            <p className="text-white font-extrabold text-lg leading-tight tracking-wide">
              DOT COMPLIANCE SOLUTIONS LLC
            </p>
            <p className="text-slate-400 text-xs mt-0.5">
              Safety &nbsp;•&nbsp; Compliance &nbsp;•&nbsp; Our Priority
            </p>
          </div>
        </div>

<div className="relative z-10 flex items-center gap-6">
  <button className="relative text-slate-300 hover:text-white">
    {/* Notification button */}
  </button>

  <div className="relative" ref={dropdownRef}>
    {/* Admin Button */}
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="flex items-center gap-2 text-white"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 font-semibold">
        A
      </div>

      <div className="leading-tight text-left">
        <p className="text-sm font-medium">Admin</p>
        <p className="text-xs text-slate-400">
          Administrator
        </p>
      </div>

      <svg
        className={`h-4 w-4 text-slate-400 transition-transform ${
          open ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    {/* Dropdown */}
    {open && (
      <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-xl">

        {/* Update User Info */}
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            navigate("/profile");
          }}
          className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-200 hover:bg-slate-700"
        >
          <svg
            className="h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>

          <span>Update User Info</span>
        </button>

        {/* Change Password */}
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            navigate("/change-password");
          }}
          className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-200 hover:bg-slate-700"
        >
          <svg
            className="h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 7a2 2 0 11-4 0 2 2 0 014 0zm-2 3v11m-4-5h8"
            />
          </svg>

          <span>Change Password</span>
        </button>

        <div className="my-1 border-t border-slate-700" />

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
            />
          </svg>

          <span>Logout</span>
        </button>
      </div>
    )}
  </div>
</div>
      </header>
    </>
  );
}
