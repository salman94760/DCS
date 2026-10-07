import { useState } from "react";
import PermitModal from "@/modals/PermitModal";
import CompanyModal from "@/modals/CompanyModal";

function CompanyDetailModal({ company, onClose, onNewPermit }) {
  const [activeTab, setActiveTab] = useState("details");
  const [modalType, setModalType] = useState(null);

  const permits = company?.permits || [];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="dialog w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white">
        {/* Header */}
        <div className="company-head">
          <div>
            <h2>{company?.cname || "Company Details"}</h2>

            <div className="sub">
              USDOT {company?.dot || "—"} — MC {company?.mc || "—"}
            </div>
          </div>

          <div className="actions">
            {/* EDIT COMPANY */}
            <button
              type="button"
              className="btn small secondary"
              onClick={() => {
                setModalType("company");
              }}
            >
              Edit
            </button>

            {/* NEW PERMIT */}
            <button type="button" className="btn small" onClick={onNewPermit}>
              + Permit
            </button>
          </div>
        </div>

        {/* Company Details */}
        <div className="profilegrid">
          <div className="profilebox">
            <span>Contact</span>
            <b>
              {company?.owner || "—"}
              <br />
              {company?.phone || ""}
            </b>
          </div>

          <div className="profilebox">
            <span>Operation</span>
            <b>{company?.operation || "—"}</b>
          </div>

          <div className="profilebox">
            <span>Fleet</span>
            <b>{company?.trucks || 0} trucks</b>
          </div>

          <div className="profilebox">
            <span>Address</span>
            <b>{company?.physicaladdress || "—"}</b>
          </div>

          <div className="profilebox">
            <span>Hazmat</span>
            <b>{company?.hazmat || "No"}</b>
          </div>

          <div className="profilebox">
            <span>Secure Documents</span>
            <b>—</b>
          </div>
        </div>

        {/* Permits */}
        <div className="section">
          <h2>Permits</h2>

          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th>Permit</th>
                  <th>Status</th>
                  <th>Expiration</th>
                  <th>Balance</th>
                </tr>
              </thead>

              <tbody>
                {permits.length > 0 ? (
                  permits.map((permit) => (
                    <tr key={permit.id}>
                      <td>{permit.permitname || permit.permit_name || "—"}</td>

                      <td>
                        <span
                          className={`pill ${getStatusClass(permit.status)}`}
                        >
                          {permit.status || "—"}
                        </span>
                      </td>

                      <td>{permit.expirydate || "—"}</td>

                      <td>${Number(permit.total || 0).toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-500">
                      No permits found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="formactions">
          <button type="button" className="btn secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      {/* COMPANY EDIT MODAL */}
      {modalType === "company" && (
        <CompanyModal company={company} onClose={() => setModalType(null)} />
      )}

      {/* PERMIT MODAL */}
      {modalType === "permit" && (
        <PermitModal company={company} onClose={() => setModalType(null)} />
      )}
    </div>
  );
}

const getStatusClass = (status) => {
  if (["Approved", "Delivered", "Paid", "Completed"].includes(status)) {
    return "p-green";
  }

  if (["Submitted", "Ready to File"].includes(status)) {
    return "p-blue";
  }

  if (["Waiting on Agency", "Documents Needed", "Open"].includes(status)) {
    return "p-amber";
  }

  if (["Overdue", "Expired"].includes(status)) {
    return "p-red";
  }

  return "p-gray";
};

export default CompanyDetailModal;
