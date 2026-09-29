import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import PanelFormInput from "@/components/admin/FormInput";
import api from "@/api/axios";

export default function AddDriverEmployment() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageType, setServerMessageType] = useState("");

  const [drivers, setDrivers] = useState([]);
  const [driversLoading, setDriversLoading] = useState(false);

  // =========================================================
  // EMPTY EMPLOYER
  // =========================================================

  const emptyEmployer = {
    cname: "",
    contactno: "",
    email: "",

    currentstreet: "",
    currentcity: "",
    currentstate: "",
    currentzip: "",

    positionheld: "",
    startdate: "",
    enddate: "",

    reasonleaving: "",
    employmentgap: "",

    fmcsr: "",
    safetysensitive: "",
  };

  // =========================================================
  // EMPLOYERS
  // =========================================================

  const [employers, setEmployers] = useState([{ ...emptyEmployer }]);

  // =========================================================
  // CHECK ROLE
  // =========================================================

  const fetchDrivers = async () => {
    try {
      setDriversLoading(true);

      const loginUser = JSON.parse(localStorage.getItem("user") || "null");

      const loginUserId = loginUser?.id;

      if (!loginUserId) {
        throw new Error("User ID not found");
      }

      const response = await api.get(`/company/drivers/${loginUserId}`);

      setDrivers(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch drivers:", error);
    } finally {
      setDriversLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("userRole");

    if (role === "admin") {
      navigate("/admin-dashboard", {
        replace: true,
      });
    } else if (role === "company") {
      fetchDrivers();
    } else {
      navigate("/", {
        replace: true,
      });
    }
  }, [navigate]);

  // =========================================================
  // EMPLOYER TITLE
  // =========================================================

  const getEmployerTitle = (index) => {
    const titles = [
      "CURRENT (MOST RECENT) EMPLOYER",
      "SECOND (MOST RECENT) EMPLOYER",
      "THIRD EMPLOYER",
      "FOURTH EMPLOYER",
      "FIFTH EMPLOYER",
      "SIXTH EMPLOYER",
      "SEVENTH EMPLOYER",
      "EIGHTH EMPLOYER",
      "NINTH EMPLOYER",
      "TENTH EMPLOYER",
    ];

    return titles[index] || `${index + 1}TH EMPLOYER`;
  };

  // =========================================================
  // ADD EMPLOYER
  // =========================================================

  const addEmployer = () => {
    setEmployers((prev) => [...prev, { ...emptyEmployer }]);
  };

  // =========================================================
  // REMOVE EMPLOYER
  // =========================================================

  const removeEmployer = (index) => {
    if (index === 0) return;

    setEmployers((prev) => prev.filter((_, i) => i !== index));

    // Remove errors related to employer
    setErrors((prev) => {
      const updatedErrors = {};

      Object.entries(prev).forEach(([key, value]) => {
        const match = key.match(/^employers\.(\d+)\.(.+)$/);

        if (!match) {
          updatedErrors[key] = value;
          return;
        }

        const errorIndex = Number(match[1]);
        const field = match[2];

        if (errorIndex < index) {
          updatedErrors[key] = value;
        } else if (errorIndex > index) {
          updatedErrors[`employers.${errorIndex - 1}.${field}`] = value;
        }
      });

      return updatedErrors;
    });
  };

  // =========================================================
  // EMPLOYER INPUT CHANGE
  // =========================================================

  const handleEmployerChange = (index, field, value) => {
    setEmployers((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });

    // Clear field error when user starts typing
    setErrors((prev) => {
      const updated = { ...prev };

      delete updated[`employers.${index}.${field}`];

      return updated;
    });
  };

  // =========================================================
  // VALIDATE EMPLOYERS
  // =========================================================

  const validateForm = () => {
    const newErrors = {};

    employers.forEach((employer, index) => {
      // -----------------------------------------------
      // COMPANY NAME
      // -----------------------------------------------

      if (!employer.cname.trim()) {
        newErrors[`employers.${index}.cname`] = "Company name is required";
      }

      // -----------------------------------------------
      // CONTACT NUMBER
      // -----------------------------------------------

      if (!employer.contactno.trim()) {
        newErrors[`employers.${index}.contactno`] = "Contact no is required";
      }

      // -----------------------------------------------
      // EMAIL
      // -----------------------------------------------

      if (!employer.email.trim()) {
        newErrors[`employers.${index}.email`] = "Email is required";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(employer.email.trim())) {
          newErrors[`employers.${index}.email`] = "Enter a valid email";
        }
      }

      // -----------------------------------------------
      // POSITION
      // -----------------------------------------------

      if (!employer.positionheld.trim()) {
        newErrors[`employers.${index}.positionheld`] =
          "Position held is required";
      }

      // -----------------------------------------------
      // START DATE
      // -----------------------------------------------

      if (!employer.startdate.trim()) {
        newErrors[`employers.${index}.startdate`] = "Start date is required";
      }

      // -----------------------------------------------
      // END DATE
      // -----------------------------------------------

      if (!employer.enddate.trim()) {
        newErrors[`employers.${index}.enddate`] = "End date is required";
      }

      // -----------------------------------------------
      // FMCSR
      // -----------------------------------------------

      if (employer.fmcsr !== "1" && employer.fmcsr !== "0") {
        newErrors[`employers.${index}.fmcsr`] = "Please select YES or NO";
      }

      // -----------------------------------------------
      // SAFETY SENSITIVE
      // -----------------------------------------------

      if (
        employer.safetysensitive !== "1" &&
        employer.safetysensitive !== "0"
      ) {
        newErrors[`employers.${index}.safetysensitive`] =
          "Please select YES or NO";
      }
    });

    return newErrors;
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const driver_id = document.getElementsByName("driver_id")[0];
    const drivererror = document.getElementsByClassName("driver_id")[0];
    if (driver_id.value.trim() === "") {
      drivererror.classList.remove("hide");
    } else {
      drivererror.classList.add("hide");
    }

    console.log("==============================");
    console.log("HANDLE SUBMIT FIRED");
    console.log("==============================");

    if (loading) {
      console.log("Submit already in progress");
      return;
    }

    // =======================================================
    // VALIDATE
    // =======================================================

    const newErrors = validateForm();

    console.log("VALIDATION ERRORS:", newErrors);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // Scroll to first error
      setTimeout(() => {
        const firstError = document.querySelector(".border-red-500");

        if (firstError) {
          firstError.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);

      return;
    }

    // =======================================================
    // VALIDATION PASSED
    // =======================================================

    console.log("==============================");
    console.log("VALIDATION PASSED");
    console.log("==============================");

    setErrors({});
    setServerMessage("");
    setServerMessageType("");
    setLoading(true);

    try {
      // =====================================================
      // GET USER
      // =====================================================

      let user = null;

      try {
        user = JSON.parse(localStorage.getItem("user") || "null");
      } catch (parseError) {
        console.error("User JSON parse error:", parseError);
      }

      console.log("USER:", user);

      // =====================================================
      // CREATE FORM DATA
      // =====================================================

      const uploadData = new FormData();

      // =====================================================
      // COMPANY INFORMATION
      // =====================================================

      if (user?.name) {
        uploadData.append("cname", user.name);
      }

      if (user?.id) {
        uploadData.append("company_id", user.id);
      }

      uploadData.append("driver_id", driver_id.value);

      // =====================================================
      // EMPLOYERS
      // =====================================================

      employers.forEach((employer, index) => {
        Object.entries(employer).forEach(([key, value]) => {
          uploadData.append(`employers[${index}][${key}]`, value ?? "");
        });
      });

      // =====================================================
      // DEBUG FORMDATA
      // =====================================================

      console.log("==============================");
      console.log("FORM DATA");
      console.log("==============================");

      for (const [key, value] of uploadData.entries()) {
        console.log(`${key}:`, value);
      }

      // =====================================================
      // API REQUEST
      // =====================================================

      console.log("==============================");
      console.log("API REQUEST START");
      console.log("==============================");

      const response = await api.post(
        "/company/driver/employment/add",
        uploadData,
      );

      // =====================================================
      // SUCCESS
      // =====================================================

      console.log("==============================");
      console.log("API SUCCESS");
      console.log("==============================");

      console.log("STATUS:", response.status);

      console.log("DATA:", response.data);

      const result = response.data;

      setServerMessage(
        result?.message || "Driver employment added successfully",
      );

      setServerMessageType("success");

      // =====================================================
      // NAVIGATE
      // =====================================================

      navigate("/company-dashboard/drivers", {
        replace: true,
      });
    } catch (error) {
      // =====================================================
      // API ERROR
      // =====================================================

      console.error("==============================");

      console.error("API ERROR");

      console.error("==============================");

      console.error("FULL ERROR:", error);

      console.error("RESPONSE:", error?.response);

      console.error("RESPONSE DATA:", error?.response?.data);

      console.error("STATUS:", error?.response?.status);

      // =====================================================
      // ERROR MESSAGE
      // =====================================================

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong.";

      setServerMessage(message);

      setServerMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <div>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Add Driver Employment History
          </h1>
        </div>

        <Link
          to="/company-dashboard/drivers"
          className="bg-[#091122] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
        >
          ← Back to Drivers
        </Link>
      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <form
          onSubmit={handleSubmit}
          className="cap space-y-5"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
            <div>
              <label className="cap block text-sm font-medium text-slate-700 mb-1.5">
                Select Driver
              </label>

              <select
                name="driver_id"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
              >
                <option value="">
                  {driversLoading ? "Loading drivers..." : "Select Driver"}
                </option>

                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.fname} {driver.mname} {driver.lname}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs mt-1 driver_id hide">
                <b>Driver is required</b>
              </p>
            </div>
          </div>
          {/* =================================================
              EMPLOYERS
          ================================================= */}

          {employers.map((employer, index) => (
            <div key={index} className="border border-slate-200 rounded-xl p-5">
              {/* =========================================
                    EMPLOYER HEADER
                ========================================= */}

              <div className="flex items-center justify-between mb-5">
                <p className="font-semibold text-slate-800">
                  {getEmployerTitle(index)}
                </p>

                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeEmployer(index)}
                    className="text-red-500 text-sm font-medium hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* =========================================
                    COMPANY INFORMATION
                ========================================= */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <PanelFormInput
                  title="Company Name"
                  placeholder="Enter company name"
                  mandate={true}
                  inputype="text"
                  name={`employers[${index}][cname]`}
                  value={employer.cname}
                  onChange={(e) =>
                    handleEmployerChange(index, "cname", e.target.value)
                  }
                  errormsg={errors[`employers.${index}.cname`]}
                />

                <PanelFormInput
                  title="Contact No"
                  placeholder="Enter contact number"
                  mandate={true}
                  inputype="text"
                  name={`employers[${index}][contactno]`}
                  value={employer.contactno}
                  onChange={(e) =>
                    handleEmployerChange(index, "contactno", e.target.value)
                  }
                  errormsg={errors[`employers.${index}.contactno`]}
                />

                <PanelFormInput
                  title="Email"
                  placeholder="Enter email"
                  mandate={true}
                  inputype="email"
                  name={`employers[${index}][email]`}
                  value={employer.email}
                  onChange={(e) =>
                    handleEmployerChange(index, "email", e.target.value)
                  }
                  errormsg={errors[`employers.${index}.email`]}
                />
              </div>

              {/* =========================================
                    CURRENT ADDRESS
                ========================================= */}

              <div className="mt-5">
                <p className="mb-3 font-medium text-slate-700">
                  CURRENT ADDRESS
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <PanelFormInput
                    title="STREET"
                    placeholder="Enter street"
                    mandate={false}
                    inputype="text"
                    name={`employers[${index}][currentstreet]`}
                    value={employer.currentstreet}
                    onChange={(e) =>
                      handleEmployerChange(
                        index,
                        "currentstreet",
                        e.target.value,
                      )
                    }
                  />

                  <PanelFormInput
                    title="CITY"
                    placeholder="Enter city"
                    mandate={false}
                    inputype="text"
                    name={`employers[${index}][currentcity]`}
                    value={employer.currentcity}
                    onChange={(e) =>
                      handleEmployerChange(index, "currentcity", e.target.value)
                    }
                  />

                  <PanelFormInput
                    title="STATE"
                    placeholder="Enter state"
                    mandate={false}
                    inputype="text"
                    name={`employers[${index}][currentstate]`}
                    value={employer.currentstate}
                    onChange={(e) =>
                      handleEmployerChange(
                        index,
                        "currentstate",
                        e.target.value,
                      )
                    }
                  />

                  <PanelFormInput
                    title="ZIPCODE"
                    placeholder="Enter zipcode"
                    mandate={false}
                    inputype="text"
                    name={`employers[${index}][currentzip]`}
                    value={employer.currentzip}
                    onChange={(e) =>
                      handleEmployerChange(index, "currentzip", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* =========================================
                    POSITION / DATES
                ========================================= */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
                <PanelFormInput
                  title="Position Held"
                  placeholder="Enter position"
                  mandate={true}
                  inputype="text"
                  name={`employers[${index}][positionheld]`}
                  value={employer.positionheld}
                  onChange={(e) =>
                    handleEmployerChange(index, "positionheld", e.target.value)
                  }
                  errormsg={errors[`employers.${index}.positionheld`]}
                />

                <PanelFormInput
                  title="Start Date"
                  mandate={true}
                  inputype="date"
                  name={`employers[${index}][startdate]`}
                  value={employer.startdate}
                  onChange={(e) =>
                    handleEmployerChange(index, "startdate", e.target.value)
                  }
                  errormsg={errors[`employers.${index}.startdate`]}
                />

                <PanelFormInput
                  title="End Date"
                  mandate={true}
                  inputype="date"
                  name={`employers[${index}][enddate]`}
                  value={employer.enddate}
                  onChange={(e) =>
                    handleEmployerChange(index, "enddate", e.target.value)
                  }
                  errormsg={errors[`employers.${index}.enddate`]}
                />
              </div>

              {/* =========================================
                    REASON / GAP
                ========================================= */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Reason For Leaving / Termination
                  </label>

                  <textarea
                    name={`employers[${index}][reasonleaving]`}
                    value={employer.reasonleaving}
                    onChange={(e) =>
                      handleEmployerChange(
                        index,
                        "reasonleaving",
                        e.target.value,
                      )
                    }
                    rows="3"
                    placeholder="Enter reason"
                    className="cap w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Explain Any Gaps In Employment
                  </label>

                  <textarea
                    name={`employers[${index}][employmentgap]`}
                    value={employer.employmentgap}
                    onChange={(e) =>
                      handleEmployerChange(
                        index,
                        "employmentgap",
                        e.target.value,
                      )
                    }
                    rows="3"
                    placeholder="Include month/year & reason"
                    className="cap w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              {/* =========================================
                    FMCSR
                ========================================= */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    While employed here, were you subject to the Federal Motor
                    Carrier Safety Regulations?
                  </label>

                  {errors[`employers.${index}.fmcsr`] && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors[`employers.${index}.fmcsr`]}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="1"
                      name={`employers[${index}][fmcsr]`}
                      checked={employer.fmcsr === "1"}
                      onChange={(e) =>
                        handleEmployerChange(index, "fmcsr", e.target.value)
                      }
                    />
                    YES
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="0"
                      name={`employers[${index}][fmcsr]`}
                      checked={employer.fmcsr === "0"}
                      onChange={(e) =>
                        handleEmployerChange(index, "fmcsr", e.target.value)
                      }
                    />
                    NO
                  </label>
                </div>
              </div>

              {/* =========================================
                    SAFETY SENSITIVE
                ========================================= */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Was the job designated as a safety-sensitive function in any
                    Department of Transportation-regulated mode subject to
                    alcohol and controlled substances testing as required by 49
                    CFR, part 40?
                  </label>

                  {errors[`employers.${index}.safetysensitive`] && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors[`employers.${index}.safetysensitive`]}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="1"
                      name={`employers[${index}][safetysensitive]`}
                      checked={employer.safetysensitive === "1"}
                      onChange={(e) =>
                        handleEmployerChange(
                          index,
                          "safetysensitive",
                          e.target.value,
                        )
                      }
                    />
                    YES
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="0"
                      name={`employers[${index}][safetysensitive]`}
                      checked={employer.safetysensitive === "0"}
                      onChange={(e) =>
                        handleEmployerChange(
                          index,
                          "safetysensitive",
                          e.target.value,
                        )
                      }
                    />
                    NO
                  </label>
                </div>
              </div>
            </div>
          ))}

          {/* =================================================
              ADD EMPLOYER
          ================================================= */}

          <div className="flex justify-start">
            <button
              type="button"
              onClick={addEmployer}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#091122] hover:bg-slate-800 text-white rounded-lg text-sm font-medium"
            >
              <span className="text-xl leading-none">+</span>
              Add Employer
            </button>
          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Link
              to="/company-dashboard/drivers"
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
              {loading ? "Saving..." : "Save Employment"}
            </button>
          </div>
        </form>

        {/* ===================================================
            SERVER MESSAGE
        =================================================== */}

        {serverMessage && (
          <div
            className={`mt-3 mb-3 rounded-lg border px-3 py-2 text-sm text-center ${
              serverMessageType === "error" ? "text-red-500" : "text-green-600"
            }`}
            style={{
              borderColor: "#091122",
            }}
          >
            {serverMessage}
          </div>
        )}
      </div>
    </div>
  );
}
