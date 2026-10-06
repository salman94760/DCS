import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "@/components/forms/Input";
import api from "@/api/axios";
import { useDcsContext } from "@/context/Context";
const CompanyModal = ({ onClose }) => {
   const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageType, setServerMessageType] = useState("");

const {
    state,
    fetchAllData,
    error,
    filters,
    setFilters,
    resetFilters,
  } = useDcsContext();



      useEffect(() => {
    const role = localStorage.getItem("userRole");

    if (!role) {
      navigate("/login", { replace: true });
      return;
    }

    if (role !== "permit") {
      navigate(`/${role}-dashboard`, { replace: true });
      return;
    }
    fetchAllData("/admin/company", { type: "permit" });
  }, [navigate]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const formData = new FormData(e.target);

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
      operation: formData.get("operation")?.trim() || "",
      trucks: formData.get("trucks")?.trim() || "",
      hazmat: formData.get("hazmat")?.trim() || "",
      specialty: formData.get("specialty")?.trim() || "",
      status: formData.get("status")?.trim() || "",
      companytype: formData.get("companytype")?.trim() || "",
      physicaladdress: formData.get("physicaladdress")?.trim() || "",
      mailaddress: formData.get("mailaddress")?.trim() || "",
    };

    console.log(data);

    const newErrors = {};

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
    }

    // =========================
    // MC
    // =========================
    if (!data.mc) {
      newErrors.mc = "MC is required";
    }

    // =========================
    // EIN
    // =========================
    if (!data.ein) {
      newErrors.ein = "EIN is required";
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
    // VALIDATION ERROR
    // =========================

    console.log(newErrors);
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
      uploadData.append("operation", data.operation);
      uploadData.append("trucks", data.trucks);
      uploadData.append("hazmat", data.hazmat);
      uploadData.append("specialty", data.specialty);
      uploadData.append("status", data.status);
      uploadData.append("companytype", data.companytype);
      uploadData.append("physicaladdress", data.physicaladdress);
      uploadData.append("mailaddress", data.mailaddress);
      uploadData.append("status", 1);

      // =================================
      // API REQUEST
      // =================================
      const response = await api.post("/admin/company/add", uploadData);

      const result = response.data;

      console.log("SUCCESS:", result);

      setServerMessage(result.message || "Company added successfully");

      setServerMessageType("success");
      e.target.reset();
      setErrors({});
      fetchAllData("/admin/company", { type: "permit" });
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4">
      <div className="dialog relative w-full rounded-xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-gray-900">Add Company</h2>
        <p className="color-[#697786] text-[12px]">
          Create the carrier profile used by permits, billing, renewals and
          tasks.
        </p>

        {/* Your form */}
        <div className="mt-6">
          <div>
            <form onSubmit={handleSubmit}>
              <div class="formgrid">
                <input type="hidden" name="companytype" value="permit" />
                <Input
                  label="Dot Number"
                  mandate={true}
                  inputType="number"
                  name="dot"
                  value=""
                  errormsg={errors.dot}
                />
                <Input
                  label="MC Number"
                  mandate={true}
                  inputType="number"
                  name="mc"
                  value=""
                  errormsg={errors.mc}
                />
                <Input
                  label="EIN Number"
                  mandate={true}
                  inputType="number"
                  name="ein"
                  value=""
                  errormsg={errors.ein}
                />
                <Input
                  label="Legal Company Name"
                  mandate={true}
                  inputType="text"
                  name="cname"
                  value=""
                  errormsg={errors.cname}
                />
                <Input
                  label="DBA Name"
                  mandate={false}
                  inputType="text"
                  name="dba"
                  value=""
                  errormsg=""
                />
                <Input
                  label="Company Owner Name"
                  mandate={true}
                  inputType="text"
                  name="owner"
                  value=""
                  errormsg={errors.owner}
                />
                <Input
                  label="Email ID"
                  mandate={true}
                  inputType="email"
                  name="email"
                  value=""
                  errormsg={errors.email}
                />
                <Input
                  label="Phone Number"
                  mandate={true}
                  inputType="text"
                  name="phone"
                  value=""
                  errormsg={errors.phone}
                />
                <Input
                  label="Alternate Phone Number"
                  mandate={false}
                  inputType="text"
                  name="aphone"
                  value=""
                  errormsg=""
                />
                <Input
                  label="Alternate Phone Number"
                  mandate={false}
                  inputType="text"
                  name="aphone"
                  value=""
                  errormsg=""
                />

                <div class="field">
                  <label>Operation</label>
                  <select name="operation">
                    <option value="Interstate">Interstate</option>
                    <option value="Intrastate">Intrastate</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                <Input
                  label="Number of Trucks"
                  mandate={false}
                  inputType="text"
                  name="trucks"
                  value=""
                  errormsg=""
                />

                <div class="field">
                  <label>Hazmat</label>
                  <select name="hazmat">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <Input
                  label="Household Goods / Passenger / Specialty"
                  mandate={false}
                  inputType="text"
                  name="specialty"
                  value=""
                  errormsg=""
                />

                <div class="field full">
                  <label>Physical Address</label>
                  <textarea name="physicaladdress" rows="3"></textarea>
                </div>

                <div class="field full">
                  <label>Mailing Address</label>
                  <textarea name="mailaddress" rows="3"></textarea>
                </div>
              </div>
              <div class="formactions">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={onClose}
                >
                  {" "}
                  Cancel{" "}
                </button>
                <button
                  onClick={() => console.log("clicked")}
                  class="btn relative z-[10001] cursor-pointer rounded bg-blue-600 px-4 py-2 text-white"
                >
                  Save Company
                </button>
              </div>
            </form>

            {/* ================= SERVER MESSAGE ================= */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
