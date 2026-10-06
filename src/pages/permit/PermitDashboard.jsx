import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyModal from "@/modals/CompanyModal";
import PermitModal from "@/modals/PermitModal";
import { useDcsContext } from "@/context/Context";
export default function PermitDashboard() {
  const {
    state,
    fetchAllData,
    loading,
    error,
    filters,
    setFilters,
    resetFilters,
  } = useDcsContext();

  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);
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
  console.log(state.data);
  return (
    <>
      <section id="dashboard" class="page">
        <div class="top">
          <div>
            <h1>Operations Dashboard</h1>
          </div>
          <div class="actions">
            <button
              type="button"
              onClick={() => setModalType("company")}
              className="rounded-md bg-[rgb(23,77,128)] px-4 py-2 text-white"
            >
              + Add Company
            </button>

            <button
              type="button"
              onClick={() => setModalType("permit")}
              className="btn secondary"
            >
              + New Permit
            </button>
          </div>
        </div>

        <div class="griddashboard">
          <div class="card metric">
            <div class="label">Companies</div>
            <div class="value" id="mCompanies">
              {state.data.length}
            </div>
            <div class="hint">Active client records</div>
          </div>
          <div class="card metric">
            <div class="label">Open Applications</div>
            <div class="value" id="mApps">
              1
            </div>
            <div class="hint">Permit work in progress</div>
          </div>
          {/* <div class="card metric">
            <div class="label">Renewals ≤ 30 Days</div>
            <div class="value" id="mRenewals">
              0
            </div>
            <div class="hint">Expiring permits</div>
          </div>
          <div class="card metric">
            <div class="label">Outstanding Balance</div>
            <div class="value" id="mBalance">
              $0.00
            </div>
            <div class="hint">Recorded unpaid balances</div>
          </div>*/}
        </div>
        <div class="two section">
          <div class="card">
            <h2>Recent Permit Applications</h2>
            <div id="dashApps">
              <div class="tablewrap">
                <table>
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Permit</th>
                      <th>Status</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state?.data.map((com, index) => {
                      return (
                        <tr key={com.id}>
                          <td>{com.cname}</td>
                          <td>USDOT Number</td>
                          <td>
                            <span class="pill p-amber">Documents Needed</span>
                          </td>
                          <td>$0.00</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="card">
            <h2>Work Queue</h2>
            <div class="kpi-list" id="queue">
              <div class="kpirow">
                <span>Waiting on documents</span>
                <b>1</b>
              </div>
              {/*<div class="kpirow">
                <span>Waiting on agency</span>
                <b>0</b>
              </div>
              <div class="kpirow">
                <span>Overdue tasks</span>
                <b>0</b>
              </div>
              <div class="kpirow">
                <span>Applications with balance</span>
                <b>0</b>
              </div>*/}
            </div>
          </div>
        </div>
        {/* Modals */}
        {modalType === "company" && (
          <CompanyModal onClose={() => setModalType(null)} />
        )}

        {modalType === "permit" && (
          <PermitModal onClose={() => setModalType(null)} />
        )}
      </section>
    </>
  );
}
