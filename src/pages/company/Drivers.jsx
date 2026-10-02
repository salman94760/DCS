import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useLocation, useNavigate } from "react-router-dom";
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
  // GET COMPANIES
  // ==========================================
  useEffect(() => {
    const role = localStorage.getItem("userRole");

    if (role === "admin") {
      navigate("/admin-dashboard/company", { replace: true });
      return;
    }

    if (role === "company") {
      fetchAllData(`/company/drivers/${loginUserId}`);
    }

    if (location.state?.success) {
      setSuccess(location.state.success);

      // History se state remove
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

  console.log(success);

  // ==========================================
  // FILTER
  // ==========================================
  const filtered = useMemo(() => {
    const companies = Array.isArray(state.data) ? state.data : [];

    const searchText = filters?.search?.toLowerCase().trim() || "";

    const status = filters?.status || "all";

    return companies.filter((com) => {
      const companyName = String(com.cname || "").toLowerCase();

      const owner = String(com.owner || "").toLowerCase();

      const email = String(com.email || "").toLowerCase();

      const usdot = String(com.usdot || "").toLowerCase();

      const matchesSearch =
        !searchText ||
        companyName.includes(searchText) ||
        owner.includes(searchText) ||
        email.includes(searchText) ||
        usdot.includes(searchText);

      const companyStatus = Number(com.user?.user_info?.status);

      const matchesStatus =
        status === "all" ||
        (status === "active" && companyStatus === 1) ||
        (status === "inactive" && companyStatus === 0);

      return matchesSearch && matchesStatus;
    });
  }, [state.data, filters]);

  // ==========================================
  // FILTER BUTTON
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
  // DELETE
  // ==========================================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?",
    );

    if (!confirmed) return;

    try {
      await deleteCompany(id);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  // ==========================================
  // EXCEL
  // ==========================================
  const handleExportExcel = () => {
    if (!company || company.length === 0) {
      alert("No company data available.");
      return;
    }

    const data = company.map((com) => ({
      Username: com.email || "",
      Password: com.user?.user_info?.password_hint || "",
      USDOT: com.usdot || "",
      "Company Owner Name": com.owner || "",
      "Legal Company Name": com.cname || "",
      "DBA Name": com.dba || "",
      "DOT Number": com.dot || "",
      "MC Number": com.mc || "",
      "EIN Number": com.ein || "",
      "Email ID": com.email || "",
      "Physical Address": com.physicaladdress || "",
      "Mailing Address": com.mailaddress || "",
      "Phone Number": com.phone || "",
      "Alternate Phone Number": com.aphone || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Companies");

    XLSX.writeFile(workbook, "companies-report.xlsx");
  };

  // ==========================================
  // PDF
  // ==========================================
  const handleExportPDF = () => {
    if (!company || company.length === 0) {
      alert("No company data available.");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    doc.setFontSize(16);

    doc.text("Companies Report", 14, 15);

    doc.setFontSize(9);

    doc.text(`Total Companies: ${company.length}`, 14, 22);

    const tableData = company.map((com) => [
      com.email || "",
      com.usdot || "",
      com.owner || "",
      com.cname || "",
      com.dba || "",
      com.dot || "",
      com.mc || "",
      com.ein || "",
      com.phone || "",
    ]);

    autoTable(doc, {
      startY: 28,

      head: [
        [
          "Username",
          "USDOT",
          "Owner",
          "Legal Company",
          "DBA",
          "DOT",
          "MC",
          "EIN",
          "Phone",
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

    doc.save("companies-report.pdf");
  };

  return (
    <div className="w-full min-w-0">
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="w-full flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-slate-900 whitespace-nowrap">
          Drivers
        </h1>

        {success && (
          <div className="flex-1 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white text-xs">
                ✓
              </span>
              <span>{success}</span>
            </div>
          </div>
        )}

        <Link
          to="/company-dashboard/driver/add"
          className="ml-auto inline-flex items-center justify-center rounded-lg bg-[#091122] px-4 py-2.5 text-sm font-medium text-white whitespace-nowrap hover:bg-slate-800"
        >
          + Add Driver
        </Link>
      </div>

      {/* ================================= */}
      {/* FILTERS */}
      {/* ================================= */}

      <div className="w-full bg-white rounded-xl border border-slate-200 p-4 mb-5">
        <div className="flex flex-col lg:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-0 border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="lg:w-40 border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
          >
            <option value="all">All Status</option>

            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
          </select>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleFilter}
              className="flex-1 lg:flex-none bg-[#091122] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
            >
              Filter
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex-1 lg:flex-none border border-slate-200 text-slate-600 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50"
            >
              Reset
            </button>
          </div>

          {/* EXPORT */}

          <div className="flex gap-2 lg:ml-auto">
            <button
              type="button"
              onClick={handleExportExcel}
              title="Export Excel"
              className="w-10 h-10 flex items-center justify-center bg-[#091122] text-white rounded-lg"
            >
              <i className="fa-regular fa-file-excel"></i>
            </button>

            <button
              type="button"
              onClick={handleExportPDF}
              title="Export PDF"
              className="w-10 h-10 flex items-center justify-center bg-[#091122] text-white rounded-lg"
            >
              <i className="fa-solid fa-file"></i>
            </button>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* ERROR */}
      {/* ================================= */}

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* ================================= */}
      {/* TABLE */}
      {/* ================================= */}

      <div className="w-full min-w-0 bg-white rounded-xl border border-slate-200">
        <div className="w-full max-h-[500px] overflow-auto">
          <table className="min-w-[1500px] w-full text-sm border border-collapse">
            <thead className="cap sticky top-0 z-20 bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="sticky left-0 z-30 bg-slate-50 text-left px-6 py-4 font-semibold text-slate-600">
                  Action
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Full name
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Active date
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  dob
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  phone
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Emergency contact
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Emergency contact person
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  email
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Drug test Neagtive Date
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600 whitespace-nowrap">
                  SOCIAL SECURITY
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  APPLIED FOR
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600 whitespace-nowrap">
                  Driver Status
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Pre-employment Cleaning House Date
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Termination Date
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Reason For Leaving / Termination
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Authorized to work in the U.S.?
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  WORK AUTHORIZATION
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  USCIS NO
                </th>

                <th className="cap text-left px-6 py-4 font-semibold text-slate-600">
                  Work Permit Expiration Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="17" className="text-center py-10 text-slate-500">
                    Loading companies...
                  </td>
                </tr>
              ) : (
                filtered.map((com) => (
                  <tr key={com.id} className="cap hover:bg-slate-50">
                    {/* ACTION */}

                    <td className="sticky left-0 z-10 bg-white px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/company-dashboard/driver/edit/${com.id}`}
                          className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-slate-50"
                        >
                          Edit
                        </Link>

                        <Link
                          target="_blank"
                          title="Driver experience"
                          to={`/company-dashboard/driver/experience/${com.id}`}
                          className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-slate-50"
                        >
                          Experience
                        </Link>

                        <Link
                          target="_blank"
                          title="Employment history"
                          to={`/company-dashboard/driver/employment-history/${com.id}`}
                          className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-slate-50"
                        >
                          Employment hisotry
                        </Link>

                        <Link
                          target="_blank"
                          title="Document information"
                          to={`/company-dashboard/driver/document/${com.id}`}
                          className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-slate-50"
                        >
                          Document Information
                        </Link>
                        {com.esign === 0 ? (
                          <Link
                            title="Document information"
                            target="_blank"
                            to={`/driver/driver-application/${com.id}`}
                            className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-slate-50"
                          >
                            E-Sign
                          </Link>
                        ) : (
                          ""
                        )}

                        {/*
                                                <Link
                          to={`/company-dashboard/driver/edit/${com.id}`}
                          className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-slate-50"
                        >
                          Edit    <i className="fa-solid fa-edit"></i>
                        </Link>

                        <Link title="Driver experience"
                          to={`/company-dashboard/driver/experience/${com.id}`}
                          className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-slate-50"
                        >Experience
                           <i className="fa-solid fa-id-card">sdcsdc</i>
                        </Link>

                        <Link title="Employment history"
                          to={`/company-dashboard/driver/employment-history/${com.id}`}
                          className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-slate-50"
                        >Employment Hisotry
                           <i className="fa-solid fa-briefcase"></i>
                        </Link>

                        <Link title="Document information"
                          to={`/company-dashboard/driver/document/${com.id}`}
                          className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-slate-50"
                        >Document information
                           <i className="fa-solid fa-file-lines"></i>
                        </Link>
                          */}

                        {/*<button
                          type="button"
                          onClick={() => handleDelete(com.id)}
                          className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-xs hover:bg-red-50 whitespace-nowrap"
                        >
                          Delete
                        </button>*/}
                      </div>
                    </td>

                    {/* USERNAME */}

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.fname} {com.mname} {com.lname}
                    </td>

                    {/* PASSWORD */}

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.activedate}
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.dob}
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.phone}
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.emecontactno}
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.emecontactperson}
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.email}
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-800 whitespace-nowrap">
                        {com.drugnegativedate}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.socialsecurity}
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.appliedfor}
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.driverstatus}
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.pclearinghousedate}
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.terminationdate}
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.reasonleavingortermination}
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.legalrightsstatus}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">{com.workauthorization}</td>
                    <td className="px-6 py-4">{com.permituscisno}</td>

                    <td className="px-6 py-4">{com.permitexpdate}</td>

                    {/* LOGO */}
                  </tr>
                ))
              )}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan="17" className="text-center py-10 text-slate-500">
                    No companies found.
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
