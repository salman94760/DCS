import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "@/routes/Route";
import AdminRoutes from "@/routes/AdminRoute";
import CompanyRoutes from "@/routes/CompanyRoute";
import PermitRoute from "@/routes/PermitRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes />
      <AdminRoutes />
      <CompanyRoutes />
      {/*<PermitRoute />*/}
    </BrowserRouter>
  );
}

export default App;
