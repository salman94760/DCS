import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [errors, setErrors] = useState({});

const handleSubmit = async (e) => {
  e.preventDefault();

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

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log("Server response:", result);
  } catch (error) {
    console.error("Error:", error);
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
                <svg
                  className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@dotcompliance.com"
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                {errors.email && (
  <p className="text-red-500 text-xs mt-1">
    {errors.email}
  </p>
)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <svg
                  className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 00-6 0v2c0 1.657 1.343 3 3 3zm6 3v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4a2 2 0 012-2h8a2 2 0 012 2z"
                  />
                </svg>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                {errors.password && (
  <p className="text-red-500 text-xs mt-1">
    {errors.password}
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
              className="bg-[#091122] w-full hover:bg-[#091122] text-white rounded-lg py-2.5 text-sm font-medium transition"
            >
              Sign In
            </button>
          </form>

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
