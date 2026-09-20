import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/SideBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8 space-y-6">{children}</main>
      </div>
    </div>
  );
}
