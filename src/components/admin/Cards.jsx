export default function Cards({ bgcolor, icon, count, title, subtitle }) {
  return (
    <>
      <div className="h-[130px] bg-white rounded-xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div
            className={`bg-${bgcolor}-500 w-9 h-9 rounded-lg flex items-center justify-center`}
          >
            <img src={icon} alt="Drivers" className="w-5 h-5 object-contain" />
          </div>

          <span className="text-xl font-bold text-slate-900">{count}</span>
        </div>

        <div className="mt-3 text-center">
          <p className="text-sm font-semibold text-slate-700">{title}</p>
          <p className="text-[11px] text-slate-400 mt-1 whitespace-nowrap">
            {subtitle}
          </p>
        </div>
      </div>
    </>
  );
}
