import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { useDcsContext } from "@/context/Context";

export default function Company() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    loginUserId,
    state,
    fetchAllData,
    loading,
    error,
    filters,
    setFilters,
    resetFilters,
  } = useDcsContext();

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [success, setSuccess] = useState("");

  // ==========================================
  // GET DRIVERS
  // ==========================================
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (userRole === "admin") {
      navigate("/admin-dashboard/company", {
        replace: true,
      });
      return;
    }

    if (userRole === "company") {
      fetchAllData(`/company/drivers/${loginUserId}`);
    }

    if (location.state?.success) {
      setSuccess(location.state.success);

      navigate(location.pathname, {
        replace: true,
        state: {},
      });

      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.state, loginUserId]);

  // ==========================================
  // FILTER
  // ==========================================
  const filtered = useMemo(() => {
    const drivers = Array.isArray(state.data)
      ? state.data
      : [];

    const searchText =
      filters?.search?.toLowerCase().trim() || "";

    const selectedStatus =
      filters?.status || "all";

    return drivers.filter((com) => {
      const fname = String(com.fname || "").toLowerCase();
      const mname = String(com.mname || "").toLowerCase();
      const lname = String(com.lname || "").toLowerCase();
      const email = String(com.email || "").toLowerCase();
      const phone = String(com.phone || "").toLowerCase();

      const fullName =
        `${fname} ${mname} ${lname}`.trim();

      const matchesSearch =
        !searchText ||
        fullName.includes(searchText) ||
        email.includes(searchText) ||
        phone.includes(searchText);

      const driverStatus =
        Number(com.user?.user_info?.status);

      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "active" &&
          driverStatus === 1) ||
        (selectedStatus === "inactive" &&
          driverStatus === 0);

      return matchesSearch && matchesStatus;
    });
  }, [state.data, filters]);

  // ==========================================
  // FILTER
  // ==========================================
  const handleFilter = () => {
    setFilters({
      search,
      role,
      status,
    });
  };

  // ==========================================
  // RESET
  // ==========================================
  const handleReset = () => {
    setSearch("");
    setRole("all");
    setStatus("all");

    resetFilters();
  };

  // ==========================================
  // EXCEL
  // ==========================================
  const handleExportExcel = () => {
    if (!filtered || filtered.length === 0) {
      alert("No driver data available.");
      return;
    }

    const data = filtered.map((com) => ({
      "Full Name":
        `${com.fname || ""} ${com.mname || ""} ${com.lname || ""}`.trim(),

      "Active Date": com.activedate || "",
      DOB: com.dob || "",
      Phone: com.phone || "",
      "Emergency Contact": com.emecontactno || "",
      "Emergency Contact Person":
        com.emecontactperson || "",
      Email: com.email || "",
      "Drug Test Negative Date":
        com.drugnegativedate || "",
      "Social Security": com.socialsecurity || "",
      "Applied For": com.appliedfor || "",
      "Driver Status": com.driverstatus || "",
      "Pre-employment Clearing House Date":
        com.pclearinghousedate || "",
      "Termination Date": com.terminationdate || "",
      "Reason For Leaving / Termination":
        com.reasonleavingortermination || "",
      "Authorized to work in U.S.?":
        com.legalrightsstatus || "",
      "Work Authorization":
        com.workauthorization || "",
      "USCIS No": com.permituscisno || "",
      "Work Permit Expiration":
        com.permitexpdate || "",
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Drivers"
    );

    XLSX.writeFile(
      workbook,
      "drivers-report.xlsx"
    );
  };

  // ==========================================
  // PDF
  // ==========================================
  const handleExportPDF = () => {
    if (!filtered || filtered.length === 0) {
      alert("No driver data available.");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(16);
    doc.text("Drivers Report", 14, 15);

    doc.setFontSize(9);
    doc.text(
      `Total Drivers: ${filtered.length}`,
      14,
      22
    );

    const tableData = filtered.map((com) => [
      `${com.fname || ""} ${com.mname || ""} ${
        com.lname || ""
      }`.trim(),

      com.activedate || "",
      com.dob || "",
      com.phone || "",
      com.email || "",
      com.driverstatus || "",
      com.terminationdate || "",
    ]);

    autoTable(doc, {
      startY: 28,

      head: [
        [
          "Full Name",
          "Active Date",
          "DOB",
          "Phone",
          "Email",
          "Status",
          "Termination",
        ],
      ],

      body: tableData,

      styles: {
        fontSize: 7,
        cellPadding: 2,
      },

      headStyles: {
        fontSize: 7,
        fontStyle: "bold",
      },

      margin: {
        left: 8,
        right: 8,
      },
    });

    doc.save("drivers-report.pdf");
  };

  return (
    <div className="w-full min-w-0">
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div
        className="
          w-full
          flex flex-col
          sm:flex-row
          sm:items-center
          gap-3
          mb-5 sm:mb-6
        "
      >
        <h1
          className="
            text-xl
            sm:text-2xl
            font-bold
            text-slate-900
          "
        >
          Drivers
        </h1>

        {success && (
          <div className="flex-1 flex justify-center">
            <div
              className="
                w-full sm:w-auto
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border border-green-200
                bg-green-50
                px-3 sm:px-4
                py-2
                text-xs sm:text-sm
                font-medium
                text-green-700
              "
            >
              <span
                className="
                  flex h-5 w-5
                  flex-shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-green-500
                  text-white
                  text-xs
                "
              >
                ✓
              </span>

              <span>{success}</span>
            </div>
          </div>
        )}

        <Link
          to="/company-dashboard/driver/add"
          className="
            w-full sm:w-auto
            sm:ml-auto
            inline-flex
            items-center
            justify-center
            rounded-lg
            bg-[#091122]
            px-4
            py-2.5
            text-sm
            font-medium
            text-white
            hover:bg-slate-800
            transition
          "
        >
          + Add Driver
        </Link>
      </div>

      {/* ================================= */}
      {/* FILTERS */}
      {/* ================================= */}

      <div
        className="
          w-full
          bg-white
          rounded-xl
          border border-slate-200
          p-3 sm:p-4
          mb-5
        "
      >
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:flex
            gap-3
          "
        >
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              lg:flex-1
              min-w-0
              border border-slate-200
              rounded-lg
              px-4
              py-2.5
              text-sm
              outline-none
              focus:border-emerald-400
              focus:ring-2
              focus:ring-emerald-100
            "
          />

          {/* Status */}
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="
              w-full
              sm:w-auto
              lg:w-40
              border border-slate-200
              rounded-lg
              px-4
              py-2.5
              text-sm
              outline-none
              bg-white
              focus:border-emerald-400
              focus:ring-2
              focus:ring-emerald-100
            "
          >
            <option value="all">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
          </select>

          {/* Buttons */}
          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:flex
            "
          >
            <button
              type="button"
              onClick={handleFilter}
              className="
                px-5
                py-2.5
                rounded-lg
                bg-[#091122]
                text-white
                text-sm
                font-medium
                hover:bg-slate-800
                transition
              "
            >
              Filter
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="
                px-5
                py-2.5
                rounded-lg
                border border-slate-200
                text-slate-600
                text-sm
                font-medium
                hover:bg-slate-50
                transition
              "
            >
              Reset
            </button>
          </div>

          {/* Export */}
          <div
            className="
              flex
              gap-2
              sm:col-span-2
              lg:ml-auto
            "
          >
            <button
              type="button"
              onClick={handleExportExcel}
              title="Export Excel"
              className="
                flex-1 sm:flex-none
                w-10 h-10
                flex items-center justify-center
                bg-[#091122]
                text-white
                rounded-lg
                hover:bg-slate-800
                transition
              "
            >
              <i className="fa-regular fa-file-excel"></i>
            </button>

            <button
              type="button"
              onClick={handleExportPDF}
              title="Export PDF"
              className="
                flex-1 sm:flex-none
                w-10 h-10
                flex items-center justify-center
                bg-[#091122]
                text-white
                rounded-lg
                hover:bg-slate-800
                transition
              "
            >
              <i className="fa-solid fa-file-pdf"></i>
            </button>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* ERROR */}
      {/* ================================= */}

      {error && (
        <div
          className="
            mb-4
            p-3
            bg-red-50
            border border-red-100
            text-red-600
            rounded-lg
            text-sm
          "
        >
          {error}
        </div>
      )}

      {/* ================================= */}
      {/* TABLE */}
      {/* ================================= */}

      <div
        className="
          w-full
          min-w-0
          bg-white
          rounded-xl
          border border-slate-200
          overflow-hidden
        "
      >
        <div
          className="
            w-full
            max-h-[calc(100vh-280px)]
            min-h-[300px]
            overflow-auto
          "
        >
          <table
            className="
              min-w-[1700px]
              w-full
              text-xs sm:text-sm
              border-collapse
            "
          >
            <thead
              className="
                sticky
                top-0
                z-20
                bg-slate-50
                border-b
                border-slate-200
              "
            >
              <tr>
                {[
                  "Action",
                  "Full name",
                  "Active date",
                  "DOB",
                  "Phone",
                  "Emergency contact",
                  "Emergency contact person",
                  "Email",
                  "Drug test Negative Date",
                  "SOCIAL SECURITY",
                  "APPLIED FOR",
                  "Driver Status",
                  "Pre-employment Clearing House Date",
                  "Termination Date",
                  "Reason For Leaving / Termination",
                  "Authorized to work in the U.S.?",
                  "WORK AUTHORIZATION",
                  "USCIS NO",
                  "Work Permit Expiration Date",
                ].map((heading, index) => (
                  <th
                    key={heading}
                    className={`
                      px-4 sm:px-6
                      py-3 sm:py-4
                      text-left
                      font-semibold
                      text-slate-600
                      whitespace-nowrap
                      border-b
                      border-slate-200
                      ${
                        index === 0
                          ? "sticky left-0 z-30 bg-slate-50"
                          : ""
                      }
                    `}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td
                    colSpan="19"
                    className="
                      text-center
                      py-10
                      text-slate-500
                    "
                  >
                    Loading drivers...
                  </td>
                </tr>
              ) : (
                filtered.map((com) => (
                  <tr
                    key={com.id}
                    className="
                      hover:bg-slate-50
                      transition-colors
                    "
                  >
                    {/* ACTION */}
                    <td
                      className="
                        sticky
                        left-0
                        z-10
                        bg-white
                        px-3 sm:px-6
                        py-3 sm:py-4
                      "
                    >
                      <div className="flex items-center gap-1.5">
                        <Link
                          title="Driver Detail"
                          to={`/company-dashboard/driver/edit/${com.id}`}
                          className="
                            w-8 h-8
                            flex items-center justify-center
                            border border-slate-200
                            rounded-lg
                            text-xs
                            text-slate-600
                            hover:bg-slate-50
                            hover:text-emerald-600
                          "
                        >
                          <i className="fa-solid fa-edit"></i>
                        </Link>

                        <Link
                          title="Employment history"
                          to={`/company-dashboard/driver/employment-history/${com.id}`}
                          className="
                            w-8 h-8
                            flex items-center justify-center
                            border border-slate-200
                            rounded-lg
                            text-xs
                            text-slate-600
                            hover:bg-slate-50
                            hover:text-emerald-600
                          "
                        >
                          <i className="fa-solid fa-briefcase"></i>
                        </Link>

                        <Link
                          title="Driver experience"
                          to={`/company-dashboard/driver/experience/${com.id}`}
                          className="
                            w-8 h-8
                            flex items-center justify-center
                            border border-slate-200
                            rounded-lg
                            text-xs
                            text-slate-600
                            hover:bg-slate-50
                            hover:text-emerald-600
                          "
                        >
                          <i className="fa-solid fa-id-card"></i>
                        </Link>

                        <Link
                          title="Document information"
                          to={`/company-dashboard/driver/document/${com.id}`}
                          className="
                            w-8 h-8
                            flex items-center justify-center
                            border border-slate-200
                            rounded-lg
                            text-xs
                            text-slate-600
                            hover:bg-slate-50
                            hover:text-emerald-600
                          "
                        >
                          <i className="fa-solid fa-file-lines"></i>
                        </Link>

                        {com.esign === 0 && (
                          <Link
                            title="E-Sign"
                            target="_blank"
                            to={`/driver/driver-application/${com.id}`}
                            className="
                              w-8 h-8
                              flex items-center justify-center
                              border border-slate-200
                              rounded-lg
                              text-xs
                              text-emerald-600
                              hover:bg-emerald-50
                            "
                          >
                            <i className="fa-solid fa-file-signature"></i>
                          </Link>
                        )}
                      </div>
                    </td>

                    {/* FULL NAME */}
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500 whitespace-nowrap">
                      {com.fname} {com.mname} {com.lname}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500 whitespace-nowrap">
                      {com.activedate}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500 whitespace-nowrap">
                      {com.dob}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500 whitespace-nowrap">
                      {com.phone}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500 whitespace-nowrap">
                      {com.emecontactno}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500 whitespace-nowrap">
                      {com.emecontactperson}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500 whitespace-nowrap">
                      {com.email}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500 whitespace-nowrap">
                      {com.drugnegativedate}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500 whitespace-nowrap">
                      {com.socialsecurity}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500 whitespace-nowrap">
                      {com.appliedfor}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500 whitespace-nowrap">
                      {com.driverstatus}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500 whitespace-nowrap">
                      {com.pclearinghousedate}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500 whitespace-nowrap">
                      {com.terminationdate}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500 whitespace-nowrap">
                      {com.reasonleavingortermination}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-500 whitespace-nowrap">
                      {com.legalrightsstatus}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      {com.workauthorization}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      {com.permituscisno}
                    </td>

                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      {com.permitexpdate}
                    </td>
                  </tr>
                ))
              )}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="19"
                    className="
                      text-center
                      py-10
                      text-slate-500
                    "
                  >
                    No drivers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}