import DashboardCards from "@/components/admin/Cards";
import Admintable from "@/components/admin/Table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "admin") {
      navigate("/admin-dashboard/company", { replace: true });
    } else if (role === "company") {
      navigate("/company-dashboard", { replace: true });
    } else {
      // navigate("/dashboard", { replace: true });
    }
  }, [navigate]);
  return (
    <>
      <div className="grid grid-cols-6 gap-5">
        <DashboardCards
          bgcolor="blue"
          icon="https://www.mydriverfiles.com/themes/portal/images/icons/drivers_white_32.png"
          title="New Applications"
          subtitle="Needing Reviewed"
          count="0"
        />

        <DashboardCards
          bgcolor="red"
          icon="https://www.mydriverfiles.com/themes/portal/images/icons/licenses_white_32.png"
          title="Expiring Licenses"
          subtitle="Within 30 Days"
          count="0"
        />

        <DashboardCards
          bgcolor="purple"
          icon="https://www.mydriverfiles.com/themes/portal/images/icons/medical_white_32.png"
          title="Expiring Med Cards"
          subtitle="Within 30 Days"
          count="0"
        />

        <DashboardCards
          bgcolor="orange"
          icon="https://www.mydriverfiles.com/themes/portal/images/icons/magnify_white_32.png"
          title="Expiring Clearinghouse"
          subtitle="Within 30 Days"
          count="0"
        />

        <DashboardCards
          bgcolor="gray"
          icon="https://www.mydriverfiles.com/themes/portal/images/icons/documents_white_32.png"
          title="Annual Record Reviews"
          subtitle="Within 30 Days"
          count="0"
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Admintable
          title="Drivers Disqualified From Driving"
          tableHeader={[]}
          tableData={[]}
          searchable={false}
        />

        <Admintable
          title="Documents Needing Reviewed"
          tableHeader={[]}
          tableData={[]}
          searchable={false}
        />

        <Admintable
          title="Driver Flags"
          tableHeader={[]}
          tableData={[]}
          searchable={false}
        />

        <Admintable
          title="Recent Transactions"
          tableHeader={[]}
          tableData={[]}
          searchable={false}
        />
      </div>
    </>
  );
}
