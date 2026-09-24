import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/routes/ProtectedRoute";
import CompanyLayout from "@/layouts/CompanyLayout";

import CompanyDashboard from "@/pages/company/CompanyDashboard";
import AddUser from "@/pages/admin/Adduser";
import Users from "@/pages/admin/Users";
import AddCompany from "@/pages/admin/AddCompany";
import Company from "@/pages/admin/Company";
import UsersRole from "@/pages/admin/UsersRole";

export default function CompanyRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/company-dashboard" element={<CompanyLayout />}>
          <Route index element={<CompanyDashboard />} />

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
