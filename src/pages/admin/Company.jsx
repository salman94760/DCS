import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useDcsContext } from "@/context/Context";

export default function Company() {
  const navigate = useNavigate();

  const {
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

  // ==========================================
  // PAGINATION STATE
  // ==========================================
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ==========================================
  // GET COMPANIES
  // ==========================================
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (userRole === "admin") {
      fetchAllData("/admin/company");
    } else if (userRole === "company") {
      navigate("/company-dashboard", { replace: true });
    }
  }, []);

  // ==========================================
  // FILTER
  // ==========================================
  // ==========================================
  // FILTER
  // ==========================================
  const filtered = useMemo(() => {
    const companies = Array.isArray(state.data) ? state.data : [];

    const searchText = search.toLowerCase().trim();
    const currentStatus = status;

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
        currentStatus === "all" ||
        (currentStatus === "active" && companyStatus === 1) ||
        (currentStatus === "inactive" && companyStatus === 0);

      return matchesSearch && matchesStatus;
    });
  }, [state.data, search, status]);

  // ==========================================
  // PAGINATION
  // ==========================================

  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const endIndex = startIndex + rowsPerPage;

  const paginatedCompanies = filtered.slice(startIndex, endIndex);

  // ==========================================
  // KEEP PAGE VALID
  // ==========================================
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // ==========================================
  // FILTER BUTTON
  // ==========================================
  const handleFilter = () => {
    setFilters({
      search,
      role,
      status,
    });

    // Filter change ke baad first page
    setCurrentPage(1);
  };

  // ==========================================
  // RESET
  // ==========================================
  const handleReset = () => {
    setSearch("");
    setRole("all");
    setStatus("all");
    setCurrentPage(1);
  };

  // ==========================================
  // CHANGE ROWS PER PAGE
  // ==========================================
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
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
    const company = Array.isArray(state.data) ? state.data : [];

    if (company.length === 0) {
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
    const company = Array.isArray(state.data) ? state.data : [];

    if (company.length === 0) {
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

  // ==========================================
  // PAGE NUMBERS
  // ==========================================
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    // First pages
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    // Last pages
    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Middle pages
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="w-full min-w-0">
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Company</h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage all companies in your system.
          </p>
        </div>

        <Link
          to="/admin-dashboard/company/add"
          className="inline-flex items-center justify-center bg-[#091122] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 whitespace-nowrap"
        >
          + Add Company
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
          <table className="min-w-[1500px] w-full text-sm">
            <thead className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="sticky left-0 z-30 bg-slate-50 text-left px-6 py-4 font-semibold text-slate-600">
                  Action
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600 whitespace-nowrap">
                  Legal Company Name
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  DOT Number
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  MC Number
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  EIN Number
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600 whitespace-nowrap">
                  Company Owner Name
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Email ID
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Phone Number
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Physical Address
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Mailing Address
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Username
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Password
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Logo
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  DBA Name
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Alternate Phone Number
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  USDOT
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Status
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
                paginatedCompanies.map((com) => (
                  <tr key={com.id} className="hover:bg-slate-50">
                    {/* ACTION */}

                    <td className="sticky left-0 z-10 bg-white px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin-dashboard/company/edit/${com.id}`}
                          className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-slate-50"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(com.id)}
                          className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-xs hover:bg-red-50 whitespace-nowrap"
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.cname}
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.dot}
                    </td>

                    {/* MC */}

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.mc}
                    </td>

                    {/* EIN */}

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.ein}
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-800 whitespace-nowrap">
                        {com.owner}
                      </span>
                    </td>

                    {/* EMAIL */}

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.email}
                    </td>

                    {/* PHONE */}

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.phone}
                    </td>
                    {/* USERNAME */}

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.physicaladdress}
                    </td>

                    {/* MAILING ADDRESS */}

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.mailaddress}
                    </td>

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.email}
                    </td>

                    {/* PASSWORD */}

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.user?.user_info?.password_hint}
                    </td>

                    {/* LOGO */}

                    <td className="px-6 py-4">
                      {com.image ? (
                        <img
                          className="w-[100px] h-[60px] object-contain"
                          src={`${
                            window.location.hostname === "localhost"
                              ? "http://localhost:8000/storage/"
                              : "https://palegoldenrod-squid-977714.hostingersite.com/storage/app/public/"
                          }${com.image}`}
                          alt={com.cname}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    {/* DOT */}

                    {/* COMPANY */}

                    {/* DBA */}

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.dba}
                    </td>

                    {/* OWNER */}

                    {/* ALTERNATE PHONE */}

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.aphone}
                    </td>

                    {/* PHYSICAL ADDRESS */}

                    {/* USDOT */}

                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {com.usdot}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          com.user?.user_info?.status === 1
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {com.user?.user_info?.status === 1
                          ? "ACTIVE"
                          : "IN-ACTIVE"}
                      </span>
                    </td>
                  </tr>
                ))
              )}

              {/* NO DATA */}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan="17" className="text-center py-10 text-slate-500">
                    No companies found. Click <b>+ Add Company</b> to create the
                    first client.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================================= */}
        {/* PAGINATION FOOTER */}
        {/* ================================= */}

        {!loading && filtered.length > 0 && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-5 py-4 border-t border-slate-200">
            {/* SHOWING TEXT */}

            <div className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium text-slate-700">
                {Math.min(endIndex, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-700">
                {filtered.length}
              </span>{" "}
              entries
            </div>

            {/* PAGINATION CONTROLS */}

            <div className="flex flex-wrap items-center gap-2">
              {/* ROWS PER PAGE */}

              <select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value={10}>10</option>

                <option value={25}>25</option>

                <option value={50}>50</option>

                <option value={100}>100</option>
              </select>

              {/* PREVIOUS */}

              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {/* PAGE NUMBERS */}

              {getPageNumbers().map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`dots-${index}`}
                      className="px-2 py-2 text-slate-500"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[38px] px-3 py-2 rounded-lg text-sm ${
                      currentPage === page
                        ? "bg-[#091122] text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* NEXT */}

              <button
                type="button"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
