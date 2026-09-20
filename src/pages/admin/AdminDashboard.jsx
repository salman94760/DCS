import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardCards from "@/components/admin/Cards";
import MainSubHeader from "@/components/admin/MainSubHeader";
import Admintable from "@/components/admin/Table";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-6 gap-5">
        <DashboardCards
          bgcolor="blue"
          icon="https://www.mydriverfiles.com/themes/portal/images/icons/drivers_white_32.png"
          title="New Applications"
          subtitle="Needing Reviewed"
          count="24"
        />

        <DashboardCards
          bgcolor="red"
          icon="https://www.mydriverfiles.com/themes/portal/images/icons/licenses_white_32.png"
          title="Expiring Licenses"
          subtitle="Within 30 Days"
          count="24"
        />

        <DashboardCards
          bgcolor="purple"
          icon="https://www.mydriverfiles.com/themes/portal/images/icons/medical_white_32.png"
          title="Expiring Med Cards"
          subtitle="Within 30 Days"
          count="24"
        />

        <DashboardCards
          bgcolor="orange"
          icon="https://www.mydriverfiles.com/themes/portal/images/icons/magnify_white_32.png"
          title="Expiring Clearinghouse"
          subtitle="Within 30 Days"
          count="24"
        />

        <DashboardCards
          bgcolor="gray"
          icon="https://www.mydriverfiles.com/themes/portal/images/icons/documents_white_32.png"
          title="Annual Record Reviews"
          subtitle="Within 30 Days"
          count="24"
        />

        <DashboardCards
          bgcolor="green"
          icon="https://www.mydriverfiles.com/themes/portal/images/icons/moneybag_white_32.png"
          title="Current Balance"
          subtitle="As Of Now"
          count="24"
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <Admintable
            title="Drivers Disqualified From Driving"
            tableHeader={[]}
            tableData={[]}
            searchable={false}
          />
        </div>
        <div>
          <Admintable
            title="Documents Needing Reviewed"
            tableHeader={[]}
            tableData={[]}
            searchable={false}
          />
        </div>
        <div>
          <Admintable
            title="Driver Flags"
            tableHeader={[]}
            tableData={[]}
            searchable={false}
          />
        </div>
        <div>
          <Admintable
            title="Recent Transactions"
            tableHeader={[]}
            tableData={[]}
            searchable={false}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
