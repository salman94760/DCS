export default function Table({
  title,
  tableHeader,
  tableData,
  searchable = false,
}) {
  return (
    <>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="font-semibold text-slate-900 whitespace-nowrap">
            {title}
          </h2>

          {searchable && (
            <div className="relative w-64 shrink-0">
              <input
                type="text"
                placeholder="Search driver..."
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 pl-10 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />

              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Border */}
        <div className="border-b border-gray-200 mb-4"></div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-100">
                <th className="py-3 pr-4 font-medium">Date</th>
                <th className="py-3 pr-4 font-medium">Driver</th>
                <th className="py-3 pr-4 font-medium">Reason</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="py-3 pr-4">1</td>
                <td className="py-3 pr-4">John Smith</td>
                <td className="py-3 pr-4">
                  Failed Drug & Alcohol Clearinghouse Query
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
