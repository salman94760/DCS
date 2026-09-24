import { Outlet } from "react-router-dom";

import Header from "@/components/company/Header";
import Sidebar from "@/components/company/SideBar";

export default function CompanyLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="w-full overflow-x-auto flex-1 p-8 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
