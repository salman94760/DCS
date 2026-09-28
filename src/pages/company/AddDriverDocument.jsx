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

  const [employers, setEmployers] = useState([
    { ...emptyEmployer },
  ]);

  // =========================================================
  // CHECK ROLE
  // =========================================================

const fetchDrivers = async () => {
  try {
    setDriversLoading(true);

    const loginUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    const loginUserId = loginUser?.id;

    if (!loginUserId) {
      throw new Error("User ID not found");
    }

    const response = await api.get(
      `/company/drivers/${loginUserId}`
    );



    setDrivers(
      response.data.data || []
    );

  } catch (error) {
    console.error(
      "Failed to fetch drivers:",
      error
    );

  
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

    return (
      titles[index] ||
      `${index + 1}TH EMPLOYER`
    );
  };

  // =========================================================
  // ADD EMPLOYER
  // =========================================================

  const addEmployer = () => {
    setEmployers((prev) => [
      ...prev,
      { ...emptyEmployer },
    ]);
  };

  // =========================================================
  // REMOVE EMPLOYER
  // =========================================================

  const removeEmployer = (index) => {
    if (index === 0) return;

    setEmployers((prev) =>
      prev.filter((_, i) => i !== index)
    );

    // Remove errors related to employer
    setErrors((prev) => {
      const updatedErrors = {};

      Object.entries(prev).forEach(
        ([key, value]) => {
          const match = key.match(
            /^employers\.(\d+)\.(.+)$/
          );

          if (!match) {
            updatedErrors[key] = value;
            return;
          }

          const errorIndex = Number(match[1]);
          const field = match[2];

          if (errorIndex < index) {
            updatedErrors[key] = value;
          } else if (errorIndex > index) {
            updatedErrors[
              `employers.${errorIndex - 1}.${field}`
            ] = value;
          }
        }
      );

      return updatedErrors;
    });
  };

  // =========================================================
  // EMPLOYER INPUT CHANGE
  // =========================================================

  const handleEmployerChange = (
    index,
    field,
    value
  ) => {
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

      delete updated[
        `employers.${index}.${field}`
      ];

      return updated;
    });
  };

  // =========================================================
  // VALIDATE EMPLOYERS
  // =========================================================

  const validateForm = () => {
    const newErrors = {};

    

    employers.forEach(
      (employer, index) => {

 
        // -----------------------------------------------
        // COMPANY NAME
        // -----------------------------------------------

        if (!employer.cname.trim()) {
          newErrors[
            `employers.${index}.cname`
          ] = "Company name is required";
        }

        // -----------------------------------------------
        // CONTACT NUMBER
        // -----------------------------------------------

        if (!employer.contactno.trim()) {
          newErrors[
            `employers.${index}.contactno`
          ] = "Contact no is required";
        }

        // -----------------------------------------------
        // EMAIL
        // -----------------------------------------------

        if (!employer.email.trim()) {
          newErrors[
            `employers.${index}.email`
          ] = "Email is required";
        } else {
          const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (
            !emailRegex.test(
              employer.email.trim()
            )
          ) {
            newErrors[
              `employers.${index}.email`
            ] = "Enter a valid email";
          }
        }

        // -----------------------------------------------
        // POSITION
        // -----------------------------------------------

        if (!employer.positionheld.trim()) {
          newErrors[
            `employers.${index}.positionheld`
          ] = "Position held is required";
        }

        // -----------------------------------------------
        // START DATE
        // -----------------------------------------------

        if (!employer.startdate.trim()) {
          newErrors[
            `employers.${index}.startdate`
          ] = "Start date is required";
        }

        // -----------------------------------------------
        // END DATE
        // -----------------------------------------------

        if (!employer.enddate.trim()) {
          newErrors[
            `employers.${index}.enddate`
          ] = "End date is required";
        }

        // -----------------------------------------------
        // FMCSR
        // -----------------------------------------------

        if (
          employer.fmcsr !== "1" &&
          employer.fmcsr !== "0"
        ) {
          newErrors[
            `employers.${index}.fmcsr`
          ] = "Please select YES or NO";
        }

        // -----------------------------------------------
        // SAFETY SENSITIVE
        // -----------------------------------------------

        if (
          employer.safetysensitive !== "1" &&
          employer.safetysensitive !== "0"
        ) {
          newErrors[
            `employers.${index}.safetysensitive`
          ] =
            "Please select YES or NO";
        }
      }
    );

    return newErrors;
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

         
  
const driver_id =
  document.getElementsByName("driver_id")[0];
  const drivererror =
    document.getElementsByClassName("driver_id")[0];
if (driver_id.value.trim() === "") {
  

  drivererror.classList.remove("hide");
}else{
  drivererror.classList.add("hide");
}



    console.log(
      "=============================="
    );
    console.log("HANDLE SUBMIT FIRED");
    console.log(
      "=============================="
    );

    if (loading) {
      console.log(
        "Submit already in progress"
      );
      return;
    }

    // =======================================================
    // VALIDATE
    // =======================================================

    const newErrors = validateForm();

    console.log(
      "VALIDATION ERRORS:",
      newErrors
    );

    if (
      Object.keys(newErrors).length > 0
    ) {
      setErrors(newErrors);

      // Scroll to first error
      setTimeout(() => {
        const firstError =
          document.querySelector(
            ".border-red-500"
          );

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

    console.log(
      "=============================="
    );
    console.log("VALIDATION PASSED");
    console.log(
      "=============================="
    );

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
        user = JSON.parse(
          localStorage.getItem("user") ||
            "null"
        );
      } catch (parseError) {
        console.error(
          "User JSON parse error:",
          parseError
        );
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
        uploadData.append(
          "cname",
          user.name
        );
      }

      if (user?.id) {
        uploadData.append(
          "company_id",
          user.id
        );
      }

      uploadData.append("driver_id",driver_id.value);

      // =====================================================
      // EMPLOYERS
      // =====================================================

      employers.forEach(
        (employer, index) => {
          Object.entries(
            employer
          ).forEach(([key, value]) => {
            uploadData.append(
              `employers[${index}][${key}]`,
              value ?? ""
            );
          });
        }
      );

      // =====================================================
      // DEBUG FORMDATA
      // =====================================================

      console.log(
        "=============================="
      );
      console.log("FORM DATA");
      console.log(
        "=============================="
      );

      for (const [
        key,
        value,
      ] of uploadData.entries()) {
        console.log(
          `${key}:`,
          value
        );
      }

      // =====================================================
      // API REQUEST
      // =====================================================

      console.log(
        "=============================="
      );
      console.log("API REQUEST START");
      console.log(
        "=============================="
      );

      const response = await api.post(
        "/company/driver/employment/add",
        uploadData
      );

      // =====================================================
      // SUCCESS
      // =====================================================

      console.log(
        "=============================="
      );
      console.log("API SUCCESS");
      console.log(
        "=============================="
      );

      console.log(
        "STATUS:",
        response.status
      );

      console.log(
        "DATA:",
        response.data
      );

      const result = response.data;

      setServerMessage(
        result?.message ||
          "Driver employment added successfully"
      );

      setServerMessageType(
        "success"
      );

      // =====================================================
      // NAVIGATE
      // =====================================================

      navigate(
        "/company-dashboard/drivers",
        {
          replace: true,
        }
      );

    } catch (error) {
      // =====================================================
      // API ERROR
      // =====================================================

      console.error(
        "=============================="
      );

      console.error(
        "API ERROR"
      );

      console.error(
        "=============================="
      );

      console.error(
        "FULL ERROR:",
        error
      );

      console.error(
        "RESPONSE:",
        error?.response
      );

      console.error(
        "RESPONSE DATA:",
        error?.response?.data
      );

      console.error(
        "STATUS:",
        error?.response?.status
      );

      // =====================================================
      // ERROR MESSAGE
      // =====================================================

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong.";

      setServerMessage(
        message
      );

      setServerMessageType(
        "error"
      );

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
            Add Driver Document Information
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
      className="cap w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
    >
      <option value="">
        {driversLoading
          ? "Loading drivers..."
          : "Select Driver"}
      </option>

      {drivers.map((driver) => (
        <option
          key={driver.id}
          value={driver.id}
        >
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
  <div className="bg-white rounded-xl border border-slate-200">
    <p className="p-4">Document Information</p>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          encType="multipart/form-data"
        >

      

          <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
            
            <div>
              <table className="w-full text-sm border border-collapse">
            <thead className="cap sticky top-0 z-20 bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Document
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Document Type
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Date
                </th>
                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  upload
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  view
                </th>
              </tr>
            </thead>
      
            <tbody className="divide-y divide-slate-200">
              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  CDL 
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  CDL Expiration Date
                </td>

                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>
              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  Driver Commercial Medical Certificate 
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  Expiration Date
                </td>

                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>
              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  DMV Driving Record 
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  MVR Record Pull Date
                </td>

                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>
              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  BACKGROUND CHECK DOCUMENT
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  BACKGROUND CHECK Pull Date
                </td>

                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>
              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  PSP RECORD
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  PSP PULL DATE
                </td>

                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>
              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  Work Authorization Documents
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  Work Authorization Expire  Date
                </td>

                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>
              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  SSN Card
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  WSSN NUMBER
                </td>

                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>  

              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  Pre-employment Clearing House
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  Pre-employment Clearing House Expiration Date
                </td>

                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>

              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  Pre-employment Drug Test CCF
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  Pre-employment Drug Test Conduct CCF Date
                </td>

                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>

              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  Pre-employment Drug test Result
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  Pre-employment Drug Test Result Date
                </td>

                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>    

              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  ANNUAL CLEARING HOUSE 
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  ANNUAL CLEARING HOUSE EXPIRATION DATE
                </td>

                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>     

              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  PULL NOTICE 
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  PULL NOTICE EXPIRATION DATE
                </td>

                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>

              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  FMCSA National Registry 
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  National registry Expiration Date 
                </td>

                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>

              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  Driver Road Test / Driver Proficiency & Vehicle Authorization Docs
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  Driver Road Test / Driver Proficiency Date
                </td>

                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td><td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>
            </tbody>
          </table>
            </div>
          </div>

        </form>


      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <p className="p-4">Other Document Information</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <div>        <p className="px-4 py-2 text-sm font-semibold text-slate-700">Quarter: 1</p>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
          <div>
            <table className="w-full text-sm border border-collapse">

              <tbody className="divide-y divide-slate-200">
                <tr className="cap hover:bg-slate-50">
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    RANDOM DRUG TEST  Conduct CCF Date
                  </td>
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    <input type="date" />
                  </td>
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    <i className="fa-solid fa-upload"></i>
                  </td>
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                  </td>
              </tr>

              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  RANDOM DRUG TEST  Result Date
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div></div>
          <div>        <p className="px-4 py-2 text-sm font-semibold text-slate-700">Quarter: 2</p>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
          <div>
            <table className="w-full text-sm border border-collapse">

              <tbody className="divide-y divide-slate-200">
                <tr className="cap hover:bg-slate-50">
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    RANDOM DRUG TEST  Conduct CCF Date
                  </td>
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    <input type="date" />
                  </td>
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    <i className="fa-solid fa-upload"></i>
                  </td>
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                  </td>
              </tr>

              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  RANDOM DRUG TEST  Result Date
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div></div>
        </div>
        <br />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <div>        <p className="px-4 py-2 text-sm font-semibold text-slate-700">Quarter: 3</p>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
          <div>
            <table className="w-full text-sm border border-collapse">

              <tbody className="divide-y divide-slate-200">
                <tr className="cap hover:bg-slate-50">
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    RANDOM DRUG TEST  Conduct CCF Date
                  </td>
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    <input type="date" />
                  </td>
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    <i className="fa-solid fa-upload"></i>
                  </td>
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                  </td>
              </tr>

              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  RANDOM DRUG TEST  Result Date
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div></div>
          <div>        <p className="px-4 py-2 text-sm font-semibold text-slate-700">Quarter: 4</p>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
          <div>
            <table className="w-full text-sm border border-collapse">

              <tbody className="divide-y divide-slate-200">
                <tr className="cap hover:bg-slate-50">
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    RANDOM DRUG TEST  Conduct CCF Date
                  </td>
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    <input type="date" />
                  </td>
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    <i className="fa-solid fa-upload"></i>
                  </td>
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                  </td>
              </tr>

              <tr className="cap hover:bg-slate-50">
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  RANDOM DRUG TEST  Result Date
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <input type="date" />
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                  <i className="fa-solid fa-upload"></i>
                </td>
                <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    👁
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div></div>
        </div>



      



    </div>

     <div className="bg-white rounded-xl border border-slate-200">
        <p className="p-4">Miscellaneous Doument</p>
     

        <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
          <div>
            <table className="w-full text-sm border border-collapse">
                   <thead className="cap sticky top-0 z-20 bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Document Name Type
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Miscellaneous Doument Pull Date
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Upload Document
                </th>
                
              </tr>
            </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="cap hover:bg-slate-50">
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    <PanelFormInput
                title=""
                placeholder="document name/type"
                mandate={false}
                inputype="text"
                name="currentcdlissuedate"
                errormsg={errors.currentcdlissuedate}
              />
                  </td>
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                       <PanelFormInput
                title=""
                placeholder="document name/type"
                mandate={false}
                inputype="date"
                name="currentcdlissuedate"
                errormsg={errors.currentcdlissuedate}
              />
                  </td>
                  <td className="sticky left-0 z-10 bg-white px-6 py-2">
                    <i className="fa-solid fa-upload"></i>
                  </td>
               
              </tr>

      
            </tbody>
          </table>
        </div>
      </div>

      

    </div>
  



          {/* =================================================
              BUTTONS
          ================================================= */}

     
        </form>

        {/* ===================================================
            SERVER MESSAGE
        =================================================== */}

        {serverMessage && (
          <div
            className={`mt-3 mb-3 rounded-lg border px-3 py-2 text-sm text-center ${
              serverMessageType === "error"
                ? "text-red-500"
                : "text-green-600"
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