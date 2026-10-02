import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

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
    <aside
      className="
        w-full lg:w-64
        bg-white
        text-slate-600
        flex flex-col justify-between
        min-h-auto lg:min-h-[calc(100vh-76px)]
        border-b lg:border-b-0 lg:border-r
        border-slate-200
        shadow-[0_2px_12px_rgba(15,23,42,0.04)]
      "
    >
      <nav
        className="
          px-3 sm:px-4 lg:px-3
          py-3 lg:py-4
          space-y-1
        "
      >
        {/* Drivers */}
        <div>
          <button
            type="button"
            onClick={() => toggleMenu("drivers")}
            className="
              w-full
              flex items-center justify-between
              px-3 py-2.5
              rounded-lg
              text-sm font-medium
              text-slate-600
              hover:bg-emerald-50
              hover:text-emerald-700
              transition-colors
            "
          >
            <span className="flex items-center gap-3 min-w-0">
              <span
                className="
                  flex-shrink-0
                  w-8 h-8
                  flex items-center justify-center
                  rounded-lg
                  bg-slate-100
                  text-slate-500
                "
              >
                <svg
                  className="w-4.5 h-4.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-8a4 4 0 11-8 0 4 4 0 018 0zm6 3a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>

              <span className="truncate">
                Drivers
              </span>
            </span>

            <span
              className={`
                flex-shrink-0
                text-lg
                text-slate-400
                transition-transform duration-200
                ${
                  openMenu === "drivers"
                    ? "rotate-90 text-emerald-600"
                    : ""
                }
              `}
            >
              ›
            </span>
          </button>

          {/* Driver submenu */}
          {openMenu === "drivers" && (
            <div
              className="
                ml-7 sm:ml-9
                mt-1
                space-y-1
                border-l
                border-emerald-100
                pl-2 sm:pl-3
              "
            >
              <Link
                to="/company-dashboard/driver/add"
                className="
                  flex items-center
                  px-3 py-2
                  rounded-md
                  text-[13px] sm:text-sm
                  text-slate-500
                  hover:bg-emerald-50
                  hover:text-emerald-700
                  transition-colors
                "
              >
                <span className="mr-2 text-emerald-500">•</span>
                New Application
              </Link>

              <Link
                to="/company-dashboard/drivers"
                className="
                  flex items-center
                  px-3 py-2
                  rounded-md
                  text-[13px] sm:text-sm
                  text-slate-500
                  hover:bg-emerald-50
                  hover:text-emerald-700
                  transition-colors
                "
              >
                <span className="mr-2 text-emerald-500">•</span>
                All Drivers
              </Link>
            </div>
          )}
        </div>

        {/* Citations */}
        <div>
          {openMenu === "citations" && (
            <div
              className="
                ml-7 sm:ml-9
                mt-1
                space-y-1
                border-l
                border-emerald-100
                pl-2 sm:pl-3
              "
            >
              <a
                href="#"
                className="
                  block
                  px-3 py-2
                  rounded-md
                  text-[13px] sm:text-sm
                  text-slate-500
                  hover:bg-emerald-50
                  hover:text-emerald-700
                "
              >
                All Citations
              </a>

              <a
                href="#"
                className="
                  block
                  px-3 py-2
                  rounded-md
                  text-[13px] sm:text-sm
                  text-slate-500
                  hover:bg-emerald-50
                  hover:text-emerald-700
                "
              >
                Pending
              </a>

              <a
                href="#"
                className="
                  block
                  px-3 py-2
                  rounded-md
                  text-[13px] sm:text-sm
                  text-slate-500
                  hover:bg-emerald-50
                  hover:text-emerald-700
                "
              >
                Paid
              </a>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="
            flex w-full items-center
            gap-3
            px-3 sm:px-4
            py-3
            mt-3
            text-left
            text-sm
            font-medium
            text-red-500
            rounded-lg
            hover:bg-red-50
            transition-colors
          "
        >
          <span
            className="
              flex-shrink-0
              w-8 h-8
              flex items-center justify-center
              rounded-lg
              bg-red-50
            "
          >
            <svg
              className="h-4 w-4"
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
          </span>

          <span>Logout</span>
        </button>
      </nav>

      {/* Footer */}
      <div
        className="
          hidden lg:block
          px-5 py-4
          text-[10px]
          text-slate-400
          border-t
          border-slate-100
          leading-relaxed
        "
      >
        © {new Date().getFullYear()} Dot Compliance Solutions LLC
      </div>
    </aside>
  );
}