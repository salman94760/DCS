import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/routes/ProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AddUser from "@/pages/admin/AddUser";
import Users from "@/pages/admin/Users";
import AddCompany from "@/pages/admin/AddCompany";
import Company from "@/pages/admin/Company";
import UsersRole from "@/pages/admin/UsersRole";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/admin-dashboard" element={<DashboardLayout />}>
          
          <Route index element={<AdminDashboard />} />

          <Route path="users" element={<Users />} />

          <Route path="users/add" element={<AddUser />} />

          <Route path="users/roles" element={<UsersRole />} />

          <Route path="company" element={<Company />} />

          <Route path="company/add" element={<AddCompany />} />

        </Route>
      </Route>
    </Routes>
  );
}