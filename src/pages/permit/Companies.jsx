import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDcsContext } from "@/context/Context";
import CompanyModal from "@/modals/CompanyModal";
import CompanyDetailModal from "@/modals/CompanyDetailModal";
import PermitModal from "@/modals/PermitModal";

export default function Companies() {
  const navigate = useNavigate();

  const [modalType, setModalType] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [selectedCompany, setSelectedCompany] = useState(null);

  const { state, fetchAllData, loading, error } = useDcsContext();

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
    const companies = Array.isArray(state?.data) ? state.data : [];

    const search = searchText.toLowerCase().trim();

    if (!search) {
      return companies;
    }

    return companies.filter((com) => {
      const companyName = String(com?.cname || "").toLowerCase();
      const owner = String(com?.owner || "").toLowerCase();
      const email = String(com?.email || "").toLowerCase();
      const dot = String(com?.dot || "").toLowerCase();
      const mc = String(com?.mc || "").toLowerCase();
      const phone = String(com?.phone || "").toLowerCase();

      return (
        companyName.includes(search) ||
        owner.includes(search) ||
        email.includes(search) ||
        dot.includes(search) ||
        mc.includes(search) ||
        phone.includes(search)
      );
    });
  }, [state?.data, searchText]);

  return (
    <section id="companies" className="page">
      {/* Header */}
      <div className="top">
        <div>
          <h1>Companies</h1>

          <div className="sub">
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

      {/* Search */}
      <div className="toolbar">
        <input
          id="companySearch"
          type="text"
          className="input"
          placeholder="Search company, USDOT, MC, contact..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Table */}
      <div id="companyTable">
        <div className="tablewrap">
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
                  <td colSpan="7" className="py-10 text-center text-slate-500">
                    Loading companies...
                  </td>
                </tr>
              ) : (
                filtered.map((com) => (
                  <tr key={com.id}>
                    <td>
                      <b>{com.cname || "—"}</b>
                    </td>

                    <td>{com.dot || "—"}</td>

                    <td>{com.mc || "—"}</td>

                    <td>
                      {com.owner || "—"}
                      <br />

                      <span className="sub">{com.phone || "—"}</span>
                    </td>

                    <td>{com.trucks || 0} trucks</td>

                    <td>{com.open_permits_count || 0}</td>

                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCompany(com);
                          setModalType("companydetail");
                        }}
                        className="btn small secondary"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))
              )}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-slate-500">
                    <div className="empty card">
                      No companies found. Click <b>+ Add Company</b> to create
                      the first client.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal */}
      {modalType === "company" && (
        <CompanyModal
          company={selectedCompany}
          onClose={() => {
            setModalType(null);
            setSelectedCompany(null);
          }}
        />
      )}

      {modalType === "companydetail" && selectedCompany && (
        <CompanyDetailModal
          company={selectedCompany}
          onClose={() => {
            setModalType(null);
            setSelectedCompany(null);
          }}
          onNewPermit={() => {
            setSelectedCompany(null);
            setModalType("permit");
          }}
        />
      )}

      {modalType === "permit" && (
        <PermitModal onClose={() => setModalType(null)} />
      )}
    </section>
  );
}
