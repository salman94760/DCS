import { Outlet } from "react-router-dom";

import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";

export default function DashboardLayout() {
  return (
    <div className="font-['Tinos'] min-h-screen bg-gray-50">
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
