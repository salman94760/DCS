import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "@/api/axios";

export default function AddUser() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageType, setServerMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Agar request already chal rahi hai
    if (loading) return;

    const formData = new FormData(e.target);
    const data = {
      fname: formData.get("fname"),
      lname: formData.get("lname"),
      email: formData.get("email"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      zipcode: formData.get("zipcode"),
      address: formData.get("address"),
      landmark: formData.get("landmark"),
      role: formData.get("role"),
      status: formData.get("status"),
    };

    const newErrors = {};

    if (!data.fname.trim()) {
      newErrors.fname = "First name is required";
    }

    if (!data.lname.trim()) {
      newErrors.lname = "Last name is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!data.company.trim()) {
      newErrors.company = "Company is required";
    }

    // Phone: only digits + exactly 10 digits
    if (!data.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Zipcode: only digits + exactly 7 digits
    if (!data.zipcode.trim()) {
      newErrors.zipcode = "Zipcode is required";
    } else if (!/^\d{6}$/.test(data.zipcode)) {
      newErrors.zipcode = "Zipcode must be exactly 6 digits";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setServerMessage("");
    setLoading(true);

    try {
      const response = await api.post("/admin/users/add", data);

      const result = response.data;
      console.log(result);

      setServerMessage(result.message);
      setServerMessageType("success");

      navigate("/admin-dashboard/users", { replace: true });
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong.";

      setServerMessage(message);
      setServerMessageType("error");

      // toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add User</h1>

          <p className="text-sm text-slate-500 mt-1">
            Create a new user account.
          </p>
        </div>

        <Link
          to="/admin-dashboard/users"
          className="bg-[#091122] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
        >
          ← Back to Users
        </Link>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                First name
              </label>
              <input
                type="text"
                name="fname"
                placeholder="John"
                class="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              {errors.fname && (
                <p className="text-red-500 text-xs mt-1">
                  <b>{errors.fname}</b>
                </p>
              )}
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                Last name
              </label>
              <input
                type="text"
                name="lname"
                placeholder="Smith"
                class="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              {errors.lname && (
                <p className="text-red-500 text-xs mt-1">
                  <b>{errors.lname}</b>
                </p>
              )}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email Address
              </label>

              <input
                type="email"
                name="email"

                placeholder="user@example.com"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  <b>{errors.email}</b>
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Phone
              </label>

              <input
                type="text"
                name="phone"

                placeholder="0000000000"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  <b>{errors.phone}</b>
                </p>
              )}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">
              Company name
            </label>
            <div class="relative">
              <svg
                class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 21h18M5 21V7l8-4v18M13 21V11l6 3v7M9 9h.01M9 13h.01M9 17h.01"
                />
              </svg>
              <input
                type="text"
                name="company"
                value="Dot Compliance Solutions LLC"
                placeholder="Dot Compliance Solutions LLC"
                class="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">
                  <b>{errors.company}</b>
                </p>
              )}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1.5">
              Address
            </label>
            <div class="relative">
              <textarea
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                name="address"
              ></textarea>

              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  <b>{errors.address}</b>
                </p>
              )}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Zipcode
              </label>

              <input
                type="text"
                name="zipcode"

                placeholder="000000"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
              {errors.zipcode && (
                <p className="text-red-500 text-xs mt-1">
                  <b>{errors.zipcode}</b>
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Landmark
              </label>

              <input
                type="text"
                name="landmark"

                placeholder="landmark"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
              {errors.landmark && (
                <p className="text-red-500 text-xs mt-1">
                  <b>{errors.landmark}</b>
                </p>
              )}
            </div>
          </div>

          {/* Role + Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Role
              </label>

              <select
                name="role"

                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
              >
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
                {/*<option value="employee">Employee</option>*/}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Status
              </label>

              <select
                name="status"

                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Link
              to="/admin-dashboard/users"
              className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className={`px-5 text-white rounded-lg py-2.5 text-sm font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#091122] hover:bg-[#091122]"
              }`}
            >
              {loading ? "Creating user" : "Create User"}
            </button>
          </div>
        </form>
        {serverMessage && (
          <div
            className={`mt-3 mb-3 rounded-lg border px-3 py-2 text-sm text-center ${
              serverMessageType === "error" ? "text-red-500" : "text-green-600"
            }`}
            style={{ borderColor: "#091122" }}
          >
            {serverMessage}
          </div>
        )}
      </div>
    </div>
  );
}
