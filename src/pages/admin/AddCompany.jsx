import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "@/api/axios";

export default function AddCompany() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageType, setServerMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const formData = new FormData(e.target);

    const image = formData.get("image");

    const data = {
      usdot: formData.get("usdot")?.trim() || "",
      owner: formData.get("owner")?.trim() || "",
      cname: formData.get("cname")?.trim() || "",
      dot: formData.get("dot")?.trim() || "",
      mc: formData.get("mc")?.trim() || "",
      ein: formData.get("ein")?.trim() || "",
      dba: formData.get("dba")?.trim() || "",
      email: formData.get("email")?.trim() || "",
      phone: formData.get("phone")?.trim() || "",
      aphone: formData.get("aphone")?.trim() || "",
      status: formData.get("status")?.trim() || "",
      physicaladdress: formData.get("physicaladdress")?.trim() || "",
      mailaddress: formData.get("mailaddress")?.trim() || "",
      image: image,
    };

    const newErrors = {};

    // =========================
    // USDOT
    // =========================
    if (!data.usdot) {
      newErrors.usdot = "USDOT is required";
    }

    // =========================
    // OWNER
    // =========================
    if (!data.owner) {
      newErrors.owner = "Owner name is required";
    }

    // =========================
    // COMPANY NAME
    // =========================
    if (!data.cname) {
      newErrors.cname = "Company name is required";
    }

    // =========================
    // EMAIL
    // =========================
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // =========================
    // DOT
    // =========================
    if (!data.dot) {
      newErrors.dot = "DOT is required";
    } else if (!/^\d{7}$/.test(data.dot)) {
      newErrors.dot = "DOT must be exactly 7 digits";
    }

    // =========================
    // MC
    // =========================
    if (!data.mc) {
      newErrors.mc = "MC is required";
    } else if (!/^\d{7}$/.test(data.mc)) {
      newErrors.mc = "MC must be exactly 7 digits";
    }

    // =========================
    // EIN
    // =========================
    if (!data.ein) {
      newErrors.ein = "EIN is required";
    } else if (!/^\d{9}$/.test(data.ein)) {
      newErrors.ein = "EIN must be exactly 9 digits";
    }

    // =========================
    // PHONE
    // =========================
    if (!data.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // =========================
    // IMAGE
    // =========================
    if (image && image.size > 0) {
      const allowedTypes = ["image/png", "image/jpeg"];

      if (!allowedTypes.includes(image.type)) {
        newErrors.image = "Only PNG, JPG, and JPEG files are allowed";
      }
    }

    // =========================
    // VALIDATION ERROR
    // =========================
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setServerMessage("");
    setLoading(true);

    try {
      // =================================
      // CREATE FORM DATA FOR API
      // =================================
      const uploadData = new FormData();

      uploadData.append("usdot", data.usdot);
      uploadData.append("owner", data.owner);
      uploadData.append("cname", data.cname);
      uploadData.append("dot", data.dot);
      uploadData.append("mc", data.mc);
      uploadData.append("ein", data.ein);
      uploadData.append("dba", data.dba);
      uploadData.append("email", data.email);
      uploadData.append("phone", data.phone);
      uploadData.append("aphone", data.aphone);
      uploadData.append("status", data.status);
      uploadData.append("physicaladdress", data.physicaladdress);
      uploadData.append("mailaddress", data.mailaddress);

      // =================================
      // IMAGE
      // =================================
      if (image && image.size > 0) {
        uploadData.append("image", image);
      }

      // =================================
      // API REQUEST
      // =================================
      const response = await api.post("/admin/company/add", uploadData);

      const result = response.data;

      console.log("SUCCESS:", result);

      setServerMessage(result.message || "Company added successfully");

      setServerMessageType("success");

      navigate("/admin-dashboard/company", {
        replace: true,
      });
    } catch (error) {
      console.error("ERROR:", error);

      const message = error.response?.data?.message || "Something went wrong.";

      setServerMessage(message);
      setServerMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add Company</h1>
        </div>

        <Link
          to="/admin-dashboard/company"
          className="bg-[#091122] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
        >
          ← Back to Companies
        </Link>
      </div>

      {/* ================= FORM CARD ================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          encType="multipart/form-data"
        >
          {/* ================= DOT MC EIN ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* DOT */}
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                DOT Number
                <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                name="dot"
                placeholder="ENTER DOT NUMBER"
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />

              {errors.dot && (
                <p className="text-red-500 text-xs mt-1">
                  <b>{errors.dot}</b>
                </p>
              )}
            </div>

            {/* MC */}
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                MC Number
                <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                name="mc"
                placeholder="ENTER MC NUMBER"
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />

              {errors.mc && (
                <p className="text-red-500 text-xs mt-1">
                  <b>{errors.mc}</b>
                </p>
              )}
            </div>

            {/* EIN */}
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                EIN Number
                <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                name="ein"
                placeholder="ENTER EIN NUMBER"
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />

              {errors.ein && (
                <p className="text-red-500 text-xs mt-1">
                  <b>{errors.ein}</b>
                </p>
              )}
            </div>
          </div>

          {/* ================= ROW 1 ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* COMPANY NAME */}
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                Legal Company Name
              </label>

              <input
                type="text"
                name="cname"
                placeholder="ENTER LEGAL COMPANY NAME"
                className="cap w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            {/* DBA */}
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                DBA Name
              </label>

              <input
                type="text"
                name="dba"
                placeholder="ENTER DBA NAME"
                className="cap w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* OWNER */}
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                Company Owner Name
              </label>

              <input
                type="text"
                name="owner"
                placeholder="ENTER COMPANY OWNER NAME"
                className="cap w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* EMAIL */}
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                Email ID
                <span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter EMAIL ID"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  <b>{errors.email}</b>
                </p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                Phone Number
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="phone"
                placeholder="ENTER PHONE NUMBER"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />

              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  <b>{errors.phone}</b>
                </p>
              )}
            </div>

            {/* ALTERNATE PHONE */}
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                Alternate Phone Number
              </label>

              <input
                type="text"
                name="aphone"
                placeholder="ENTER ALTERNATE PHONE NUMBER"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* ================= DBA + EMAIL ================= */}

          {/* ================= PHYSICAL ADDRESS ================= */}
          <div>
            <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
              Physical Address
            </label>

            <textarea
              name="physicaladdress"
              rows="3"
              placeholder="ENTER PHYSICAL ADDRESS"
              className="cap w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* ================= MAILING ADDRESS ================= */}
          <div>
            <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
              Mailing Address
            </label>

            <textarea
              name="mailaddress"
              rows="3"
              placeholder="ENTER MAILING  ADDRESS"
              className="cap w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* ================= PHONE ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* USDOT */}
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                USDOT
              </label>

              <select
                name="usdot"

                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
              >
                <option value="Active">Active</option>
                <option value="In-active">In-active</option>
              </select>
            </div>

            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                Status
              </label>
              <select
                name="status"

                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
              >
                <option value="1">Active</option>
                <option value="0">In-active</option>
              </select>
            </div>
            {/* ================= COMPANY LOGO ================= */}
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                Company Logo
              </label>

              <input
                type="file"
                name="image"
                accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />

              <p className="text-xs text-slate-400 mt-1">
                Only PNG, JPG and JPEG files are allowed.
              </p>

              {errors.image && (
                <p className="text-red-500 text-xs mt-1">
                  <b>{errors.image}</b>
                </p>
              )}
            </div>
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Link
              to="/admin-dashboard/company"
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
                  : "bg-[#091122] hover:bg-slate-800"
              }`}
            >
              {loading ? "Saving..." : "Save Company"}
            </button>
          </div>
        </form>

        {/* ================= SERVER MESSAGE ================= */}
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
