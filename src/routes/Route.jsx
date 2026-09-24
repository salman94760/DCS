import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import DriverApplication from "../pages/drivers/DriverApplication";
import DriverApplicationPreview from "../pages/drivers/DriverApplicationPreview";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/driver-application" element={<DriverApplication />} />
      <Route
        path="/driver-application-preview"
        element={<DriverApplicationPreview />}
      />
    </Routes>
  );
}
