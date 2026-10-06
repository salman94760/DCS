import { Outlet } from "react-router-dom";

// import Header from "@/components/permit/Header";
import Sidebar from "@/components/permit/SideBar";

export default function PermitLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/*<Header />*/}

      <div className="flex">
        <Sidebar />

        <main className="main w-full overflow-x-auto flex-1 p-8 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
