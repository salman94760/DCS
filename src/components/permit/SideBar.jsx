import { useEffect, useRef, useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import api from "@/api/axios";
export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };
  return (
    <>
      <aside class="side flex h-screen flex-col">
        <img
          src="/logo1.png"
          alt="Dot Compliance Solutions"
          className="h-14 w-auto object-contain"
        />
        <div class="logo">DOT Compliance Solutions</div>
        <div class="legal">Where Safety Meets Compliance</div>
        <br />

        <nav className="flex-1 overflow-y-auto shrink-0 border-t border-white/10 flex-1 overflow-y-auto py-4 space-y-1">
          <NavLink
            to="/permit-dashboard"
            end
            className={({ isActive }) =>
              `font-[16px] p-10 block px-3 py-2 rounded-md ${
                isActive
                  ? "bg-[rgb(23,77,128)] text-white"
                  : "text-gray-300  hover:bg-[rgb(23,77,128)] hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/permit-dashboard/companies"
            className={({ isActive }) =>
              `font-[16px] p-10 block px-3 py-2 rounded-md ${
                isActive
                  ? "bg-[rgb(23,77,128)] text-white"
                  : "text-gray-300  hover:bg-[rgb(23,77,128)] hover:text-white"
              }`
            }
          >
            Companies
          </NavLink>

          <NavLink
            to="/permit-dashboard/permit-application"
            className={({ isActive }) =>
              `font-[16px] p-10 block px-3 py-2 rounded-md ${
                isActive
                  ? "bg-[rgb(23,77,128)] text-white"
                  : "text-gray-300  hover:bg-[rgb(23,77,128)] hover:text-white"
              }`
            }
          >
            Permit Applications
          </NavLink>

          {/*     <NavLink
            to="/permit-dashboard/permit-library"
            className={({ isActive }) =>
              `font-[16px] p-10 block px-3 py-2 rounded-md ${
                isActive
                  ? "bg-[rgb(23,77,128)] text-white"
                  : "text-gray-300  hover:bg-[rgb(23,77,128)] hover:text-white"
              }`
            }
          >
            Permit Library
          </NavLink>

          <NavLink
            to="/permit-dashboard/renewals"
            className={({ isActive }) =>
              `font-[16px] p-10 block px-3 py-2 rounded-md ${
                isActive
                  ? "bg-[rgb(23,77,128)] text-white"
                  : "text-gray-300  hover:bg-[rgb(23,77,128)] hover:text-white"
              }`
            }
          >
            Renewals
          </NavLink>

          <NavLink
            to="/permit-dashboard/payments"
            className={({ isActive }) =>
              `font-[16px] p-10 block px-3 py-2 rounded-md ${
                isActive
                  ? "bg-[rgb(23,77,128)] text-white"
                  : "text-gray-300  hover:bg-[rgb(23,77,128)] hover:text-white"
              }`
            }
          >
            Billing & Payments
          </NavLink>

          <NavLink
            to="/permit-dashboard/tasks"
            className={({ isActive }) =>
              `font-[16px] p-10 block px-3 py-2 rounded-md ${
                isActive
                  ? "bg-[rgb(23,77,128)] text-white"
                  : "text-gray-300 hover:bg-[rgb(23,77,128)] hover:text-white"
              }`
            }
          >
            Tasks
          </NavLink>*/}
        </nav>
        <div className="shrink-0 border-t border-white/10">
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

            <span>LOGOUT</span>
          </button>

          <div className="px-5 py-4 text-center text-[11px] text-slate-500">
            © {new Date().getFullYear()} DOT Compliance Solutions LLC
          </div>
        </div>
      </aside>
    </>
  );
}
