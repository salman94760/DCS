import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "@/routes/Route";
import AdminRoutes from "@/routes/AdminRoute";
import CompanyRoutes from "@/routes/CompanyRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes />
      <AdminRoutes />
      <CompanyRoutes />
    </BrowserRouter>
  );
}

export default App;
