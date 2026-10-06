import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PermitModal from "@/modals/PermitModal";
import { useDcsContext } from "@/context/Context";
export default function PermitApplication() {
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
    fetchAllData("/admin/all-permit");
  }, [navigate]);
  return (
    <>
      <section id="applications" class="page">
        <div class="top">
          <div>
            <h1>Permit Applications</h1>
            <div class="sub">Track work from request through delivery</div>
          </div>
          <button
            type="button"
            onClick={() => setModalType("permit")}
            className="btn secondary"
          >
            + New Permit
          </button>
        </div>
        <div class="toolbar">
          <input
            id="appSearch"
            class="input"
            placeholder="Search company or permit..."
            oninput="renderApplications()"
          />
          <select id="appStatus" onchange="renderApplications()">
            <option value="">All statuses</option>
            <option>Documents Needed</option>
            <option>Ready to File</option>
            <option>Submitted</option>
            <option>Waiting on Agency</option>
            <option>Approved</option>
            <option>Delivered</option>
          </select>
        </div>
        <div id="appTable">
          <div class="tablewrap">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Permit / Jurisdiction</th>
                  <th>Assigned</th>
                  <th>Status</th>
                  <th>Expiration</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {state?.data?.map((permit, index) => {
                  return (
                    <tr key={index}>
                      <td>{permit?.company?.cname}</td>
                      <td>
                        <b>{permit.permitname}</b>
                        <br />
                        <span class="sub">{permit.jurisdiction}</span>
                      </td>
                      <td>{permit.assignto}</td>
                      <td>
                        <span class="pill p-amber">Documents Needed</span>
                      </td>
                      <td>{permit.expirydate}</td>
                      <td>${permit.total}</td>
                      <td>$0.00</td>
                      <td>
                        <b>$0.00</b>
                      </td>
                      <td>
                        <button
                          class="btn small secondary"
                          onclick="openAppDetail('app_muwnml87_1d4jj')"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {modalType === "permit" && (
          <PermitModal onClose={() => setModalType(null)} />
        )}
      </section>
    </>
  );
}
