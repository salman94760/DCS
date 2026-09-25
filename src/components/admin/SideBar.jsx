import { useState } from "react";
export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };
  return (
    <>
      <aside className="w-64 bg-[#0b1220] text-slate-300 flex flex-col justify-between min-h-[calc(100vh-76px)]">
        <nav className="px-3 py-4 space-y-1">
          {/* Dashboard */}
          {/* <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </a>*/}

          {/* Drivers */}
          <div>
            <button
              onClick={() => toggleMenu("drivers")}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm"
            >
              <span className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
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
                Drivers
              </span>

              <span
                className={`transition-transform duration-200 ${
                  openMenu === "drivers" ? "rotate-90" : ""
                }`}
              >
                ›
              </span>
            </button>

            {openMenu === "drivers" && (
              <div className="ml-8 mt-1 space-y-1 border-l border-white/10 pl-3">
             {/*   <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-white/5 hover:text-white"
                >
                  All Drivers
                </a>*/}

                {/*  <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-white/5 hover:text-white"
                >
                  Add Driver
                </a>*/}

                {/*    <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-white/5 hover:text-white"
                >
                  Driver Documents
                </a>

                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-white/5 hover:text-white"
                >
                  Driver Violations
                </a>*/}
              </div>
            )}
          </div>

          {/* Citations */}
          <div>
            {/*  <button
              onClick={() => toggleMenu("citations")}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm"
            >
              <span className="flex items-center gap-3">
                <span className="w-5 text-center">◷</span>
                Citations
              </span>

              <span
                className={`transition-transform duration-200 ${
                  openMenu === "citations" ? "rotate-90" : ""
                }`}
              >
                ›
              </span>
            </button>*/}

            {openMenu === "citations" && (
              <div className="ml-8 mt-1 space-y-1 border-l border-white/10 pl-3">
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-white/5 hover:text-white"
                >
                  All Citations
                </a>

                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-white/5 hover:text-white"
                >
                  Pending
                </a>

                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-white/5 hover:text-white"
                >
                  Paid
                </a>
              </div>
            )}
          </div>

          {/* Reports */}
          {/* <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm"
          >
            <span className="w-5 text-center">▥</span>
            Reports
          </a>*/}

          {/* Settings */}
          {/*     <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm"
          >
            <span className="w-5 text-center">⚙</span>
            Settings
          </a>*/}

          {/* Management */}
          <p className="text-[11px] text-slate-500 font-semibold px-3 pt-6 pb-1 tracking-wide">
            MANAGEMENT
          </p>

          {/* Users */}
          <div>
            <button
              onClick={() => toggleMenu("users")}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm"
            >
              <span className="flex items-center gap-3">
                <span className="w-5 text-center">♟</span>
                Users
              </span>

              <span
                className={`transition-transform duration-200 ${
                  openMenu === "users" ? "rotate-90" : ""
                }`}
              >
                ›
              </span>
            </button>

            {openMenu === "users" && (
              <div className="ml-8 mt-1 space-y-1 border-l border-white/10 pl-3">
                <a
                  href="/admin-dashboard/users"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-white/5 hover:text-white"
                >
                  All Users
                </a>

                <a
                  href="/admin-dashboard/users/add"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-white/5 hover:text-white"
                >
                  Add User
                </a>

                {/*     <a
                  href="/admin-dashboard/users/roles"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-white/5 hover:text-white"
                >
                  Roles & Permissions
                </a>*/}
              </div>
            )}
          </div>

          {/* Company */}
          <div>
            <button
              onClick={() => toggleMenu("company")}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm"
            >
              <span className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 7h2m-2 4h2m-2 4h2m4-8h2m-2 4h2m-2 4h2"
                  />
                </svg>
                Company
              </span>

              <span
                className={`transition-transform duration-200 ${
                  openMenu === "company" ? "rotate-90" : ""
                }`}
              >
                ›
              </span>
            </button>

            {openMenu === "company" && (
              <div className="ml-8 mt-1 space-y-1 border-l border-white/10 pl-3">
                <a
                  href="/admin-dashboard/company"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-white/5 hover:text-white"
                >
                  All Company
                </a>

                <a
                  href="/admin-dashboard/company/add"
                  className="block px-3 py-2 rounded-md text-sm hover:bg-white/5 hover:text-white"
                >
                  Add Company
                </a>
              </div>
            )}
          </div>

          {/* System Logs */}
          {/*     <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm"
          >
            <span className="w-5 text-center">▤</span>
            System Logs
          </a>*/}

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
        </nav>

        <div className="px-5 py-4 text-[11px] text-slate-500 border-t border-white/10">
          © {new Date().getFullYear()} Dot Compliance Solutions LLC
        </div>
      </aside>
    </>
  );
}
