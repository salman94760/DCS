import { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

import Admintable from "@/components/admin/Table";
import api from "@/api/axios";

export default function Users() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [users, setUsers] = useState([]);

  // Actual applied filters
  const [filters, setFilters] = useState({
    search: "",
    role: "all",
    status: "all",
  });

useEffect(() => {
  const getUsers = async () => {
    try {
      const response = await api.get("/admin/users");

      const result = response.data;

      console.log("Users:", result);

      setUsers(result.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  getUsers();
}, []);



  // Filter button click
  const handleFilter = () => {
    setFilters({
      search,
      role,
      status,
    });
  };

  // Reset filters
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

  const filteredUsers = users.filter((user) => {
    const searchText = filters.search.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText);

    const matchesRole =
      filters.role === "all" || user.role === filters.role;

    const matchesStatus =
      filters.status === "all" || user.status === filters.status;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <>
    
        {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage all users in your system.
          </p>
        </div>

        <Link
          to="/admin-dashboard/users/add"
          className="bg-[#091122] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
        >
          + Add User
        </Link>
      </div>
      {/* Filters */}
{/*      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-5">
        <div className="flex items-center gap-3">

       
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
            className="w-40 border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>

        
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-40 border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

       
          <button
            type="button"
            onClick={handleFilter}
            className="bg-[#091122] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 whitespace-nowrap"
          >
            Filter
          </button>

   
          <button
            type="button"
            onClick={handleReset}
            className="border border-slate-200 text-slate-600 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 whitespace-nowrap"
          >
            Reset
          </button>

        </div>
      </div>*/}

      {/* Users table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  User
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Email
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Role
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Status
                </th>

                <th className="text-right px-6 py-4 font-semibold text-slate-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600">
                        {user.name.charAt(0)}
                      </div>

                      <span className="font-medium text-slate-800">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-500">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium capitalize">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.user_info?.status === 1
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >

                      {
                        user.user_info?.status === 1? 'Active':'In-active' 
                      }
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="px-3 py-1.5 border rounded-lg text-xs hover:bg-slate-50">
                        Edit
                      </button>

                      <button className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-xs hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-slate-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
 
    </>
  );
}