import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/routes/ProtectedRoute";
import CompanyLayout from "@/layouts/CompanyLayout";

import CompanyDashboard from "@/pages/company/CompanyDashboard";
import AddDriver from "@/pages/company/AddDriver";
import Drivers from "@/pages/company/Drivers";
import PendingDrivers from "@/pages/company/PendingDrivers";
import ActiveDrivers from "@/pages/company/ActiveDrivers";
import TerminatedDrivers from "@/pages/company/TerminatedDrivers";
import EditDrivers from "@/pages/company/EditDriver";
import AddDriverExployment from "@/pages/company/AddDriverEmployment";
import AddDriverExperience from "@/pages/company/AddDriverExperience";
import AddDriverDocument from "@/pages/company/AddDriverDocument";
import DriverExployment from "@/pages/company/DriverEmployment";
import DriverExperience from "@/pages/company/DriverExperience";
import DriverDocument from "@/pages/company/DriverDocument";
import DriversDocumentsView from "@/pages/company/DriverDocumentsView";

export default function CompanyRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/company-dashboard" element={<CompanyLayout />}>
          <Route index element={<CompanyDashboard />} />

          <Route path="drivers" element={<Drivers />} />
          <Route
            path="drivers/pending-application"
            element={<PendingDrivers />}
          />
          <Route path="drivers/active" element={<ActiveDrivers />} />
          <Route path="drivers/terminted" element={<TerminatedDrivers />} />

          <Route path="driver/add" element={<AddDriver />} />
          <Route
            path="driver/employment/add"
            element={<AddDriverExployment />}
          />
          <Route
            path="driver/experience/add"
            element={<AddDriverExperience />}
          />
          <Route path="driver/document/add" element={<AddDriverDocument />} />

          <Route
            path="driver/employment-history/:id"
            element={<DriverExployment />}
          />
          <Route path="driver/experience/:id" element={<DriverExperience />} />
          <Route path="driver/document/:id" element={<DriverDocument />} />

          <Route path="driver/edit/:id" element={<EditDrivers />} />
          <Route
            path="driver/documents-view/:slug/:id"
            element={<DriversDocumentsView />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
