import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/routes/ProtectedRoute";
import PermitLayout from "@/layouts/PermitLayout";

import PermitDashboard from "@/pages/permit/PermitDashboard";
import Companies from "@/pages/permit/Companies";
import PermitApplication from "@/pages/permit/PermitApplication";
import PermitLibrary from "@/pages/permit/PermitLibrary";
import Renewals from "@/pages/permit/Renewals";
import Payments from "@/pages/permit/Payments";

export default function PermitRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/permit-dashboard" element={<PermitLayout />}>
          <Route index element={<PermitDashboard />} />

          <Route path="companies" element={<Companies />} />
          <Route path="permit-application" element={<PermitApplication />} />
          <Route path="permit-library" element={<PermitLibrary />} />
          <Route path="renewals" element={<Renewals />} />
          <Route path="payments" element={<Payments />} />
        </Route>
      </Route>
    </Routes>
  );
}
