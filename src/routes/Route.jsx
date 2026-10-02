import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import DriverApplication from "../pages/drivers/DriverApplication";
import DriverApplicationPreview from "@/pages/drivers/DriverApplicationPreview";
import ESignCancelled from "@/pages/drivers/ESignCancelled";
import ESignCompleted from "@/pages/drivers/ESignCompleted";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/driver/esign-cancelled/:id" element={<ESignCancelled />} />

      <Route path="/driver/esign-completed/:id" element={<ESignCompleted />}/>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="driver/driver-application/:id"
        element={<DriverApplication />}
      />
      <Route
        path="/driver-application-preview/:id"
        element={<DriverApplicationPreview />}
      />
    </Routes>
  );
}
