import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./routes/Route";
import AdminRoutes from "./routes/AdminRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes />
      <AdminRoutes />
    </BrowserRouter>
  );
}

export default App;
