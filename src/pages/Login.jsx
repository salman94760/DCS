import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/api/axios";
export default function Login() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageType, setServerMessageType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Agar request already chal rahi hai
    if (loading) return;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const newErrors = {};

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setServerMessage("");
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email: data.email,
        password: data.password,
      });

      const result = response.data;
      console.log(result)
      // Token save
      localStorage.setItem("token", result.token);

      // User/role bhi save
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("userRole", result.user.role);

      setServerMessage(result.message);
      setServerMessageType("success");

      // Role ke hisaab se redirect
      if (result.user.role === "admin") {
        navigate("/admin-dashboard/company", { replace: true });
      } else if (result.user.role === "company") {
        navigate("/company-dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message || "Something went wrong.";

      setServerMessage(message);
      setServerMessageType("error");

      // toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#0a1122] min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      <div className="stripe-wrap">
        <div className="stripe"></div>
        <div className="stripe two"></div>
        <div className="stripe left"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img className="w-[100px]" src="/logo.png" />
          <p className="text-white font-extrabold text-lg tracking-wide text-center">
            DOT COMPLIANCE SOLUTIONS LLC
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Safety &nbsp;•&nbsp; Compliance &nbsp;•&nbsp; Our Priority
          </p>
          {/*          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition="Bounce"
          />*/}
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-[#091122] text-xl font-bold text-slate-900">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 mt-1 mb-6">
            Sign in to access your compliance dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="admin@dotcompliance.com"
                  className="w-full pl-2 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    <b>{errors.email}</b>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-2 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    <b>{errors.password}</b>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-200"
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-[#091122] font-medium hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white rounded-lg py-2.5 text-sm font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#091122] hover:bg-[#091122]"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          {serverMessage && (
            <div
              className={`mt-3 mb-3 rounded-lg border px-3 py-2 text-sm text-center ${
                serverMessageType === "error"
                  ? "text-red-500"
                  : "text-green-600"
              }`}
              style={{ borderColor: "#091122" }}
            >
              {serverMessage}
            </div>
          )}
          <p className="text-sm text-slate-500 text-center mt-6">
            Don't have an account?
            <Link
              to="/register"
              className="text-[#091122] font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          © {new Date().getFullYear()} Dot Compliance Solutions LLC
        </p>
      </div>
    </div>
  );
}
