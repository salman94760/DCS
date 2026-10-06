import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDcsContext } from "@/context/Context";
import CompanyModal from "@/modals/CompanyModal";
export default function Companies() {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);
  const {
    state,
    fetchAllData,
    loading,
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
  return (
    <section id="companies" class="page">
      <div class="top">
        <div>
          <h1>Companies</h1>
          <div class="sub">
            Client carrier profiles, contacts, fleet details and permit history
          </div>
        </div>
        <button
          type="button"
          onClick={() => setModalType("company")}
          className="rounded-md bg-[rgb(23,77,128)] px-4 py-2 text-white"
        >
          + Add Company
        </button>
      </div>
      <div class="toolbar">
        <input
          id="companySearch"
          class="input"
          placeholder="Search company, USDOT, MC, contact..."
          oninput="renderCompanies()"
        />
      </div>
      <div id="companyTable">
        <div class="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>USDOT</th>
                <th>MC</th>
                <th>Contact</th>
                <th>Fleet</th>
                <th>Open Permits</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="17" className="text-center py-10 text-slate-500">
                    Loading companies...
                  </td>
                </tr>
              ) : (
                filtered.map((com) => (
                  <tr key={com.id}>
                    <td>
                      <b>{com.cname}</b>
                    </td>
                    <td>{com.dot}</td>
                    <td>{com.mc}</td>
                    <td>
                      {com.owner}<br />
                      <span class="sub">{com.phone}</span>
                    </td>
                    <td>{com.trucks} trucks</td>
                    <td>{com.open_permits_count}</td>
                    <td>
                      <button
                        class="btn small secondary"
                        onclick="viewCompany('co_muvo6kp9_o77dq')"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))
              )}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan="17" className="text-center py-10 text-slate-500">
                    <div id="companyTable">
                      <div class="empty card">
                        No companies found. Click <b>+ Add Company</b> to create
                        the first client.
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalType === "company" && (
        <CompanyModal onClose={() => setModalType(null)} />
      )}
    </section>
  );
}
