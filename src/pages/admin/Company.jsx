import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "@/api/axios";

export default function Users() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [company, setCompany] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    role: "all",
    status: "all",
  });

  useEffect(() => {
    const getCompany = async () => {
      try {
        const response = await api.get("/admin/company");

        const result = response.data;

      

        setCompany(result.company || []);
        console.log(result);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getCompany();
  }, []);

  const handleFilter = () => {
    setFilters({
      search,
      role,
      status,
    });
  };

  const handleReset = () => {
    setSearch("");
    setRole("all");
    setStatus("all");

    setFilters({
      search: "",
      role: "all",
      status: "all",
    });
  };

  const filteredComapny = company.filter((user) => {
  //   const searchText = filters.search.toLowerCase();

  //   const userName = com.name?.toLowerCase() || "";
  //   const userEmail = com.email?.toLowerCase() || "";

  //   const matchesSearch =
  //     userName.includes(searchText) ||
  //     userEmail.includes(searchText);

  //   const matchesRole =
  //     filters.role === "all" || com.role === filters.role;

  //   const matchesStatus =
  //     filters.status === "all" ||
  //     com.user_info?.status ===
  //       (filters.status === "active" ? 1 : 0);

  //   return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmed) {
      return;
    }

    try {
      // API call
      // await api.delete(`/admin/users/${id}`);

      setCompany((prevUsers) =>
        prevUsers.filter((company) => company.id !== id)
      );

      console.log("Deleted:", id);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
console.log(company);
  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Company
          </h1>

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

      {/* Filters */}
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
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="lg:w-40 border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>

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
        </div>
      </div>

      {/* Table */}
      <div className="w-full min-w-0 bg-white rounded-xl border border-slate-200">
        <div className="w-full overflow-x-auto">
          <table className="min-w-[1500px] w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="sticky left-0 z-10 bg-slate-50 text-left px-6 py-4 font-semibold text-slate-600">
                  Action
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Logo
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  USDOT
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600 whitespace-nowrap">
                  Company Owner Name
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600 whitespace-nowrap">
                  Legal Company Name
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  DBA Name
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

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Email ID
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Physical Address
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Mailing Address
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Phone Number
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Alternate Phone Number
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {company.map((com) => (
        

                <tr
                  key={com.id}
                  className="hover:bg-slate-50"
                >
                  {/* Action */}
                  <td className="sticky left-0 z-10 bg-white px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin-dashboard/edit/${com.id}`}
                        className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs hover:bg-slate-50 whitespace-nowrap"
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

                  {/* Logo / Status */}
                <td>
      				
      </td>

                  {/* USDOT */}
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                    {com.usdot}
                  </td>

                  {/* Owner */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-800 whitespace-nowrap">
                      {com.owner}
                    </span>
                  </td>

                  {/* Legal Company */}
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                    {com.cname}
                  </td>

                  {/* DBA */}
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                    {com.dba}
                  </td>

                  {/* DOT */}
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

                  {/* Email */}
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                    {com.email}
                  </td>

                  {/* Physical Address */}
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                    {com.physicaladdress}
                  </td>

                  {/* Mailing Address */}
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                    {com.mailaddress}
                  </td>

                  {/* Phone */}
                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                    {com.phone}
                  </td>

                  <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                    {com.aphone}
                  </td>
                </tr>
              ))}

              {company.length === 0 && (
                <tr>
                  <td
                    colSpan="13"
                    className="text-center py-10 text-slate-500"
                  >
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