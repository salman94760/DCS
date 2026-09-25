import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
export default function Header() {
  const [open, setOpen] = useState(false);
const dropdownRef = useRef(null);
const navigate = useNavigate();

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);
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
              <span className="font-['cursive']"><i>Where Safety Meets Compliance</i></span>
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

  </div>
</div>
      </header>
    </>
  );
}
