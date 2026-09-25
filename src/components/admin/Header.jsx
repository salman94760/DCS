export default function Header() {
  return (
    <>
      <header className="relative bg-[#0a1122] h-[76px] flex items-center justify-between px-6 overflow-hidden">
        <div className="stripe-wrap">
          <div className="stripe"></div>
          <div className="stripe two"></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <img src="/logo.png" className="w-[80px]" />

          <div>
            <p className="text-white font-extrabold text-lg leading-tight tracking-wide">
              DOT COMPLIANCE SOLUTIONS LLC
            </p>
            <p className="text-slate-400 text-xs mt-0.5">
              Safety &nbsp;•&nbsp; Compliance &nbsp;•&nbsp; Our Priority
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          <button className="relative text-slate-300 hover:text-white">
          <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
          2
             </span>
          </button>
                <div className="flex items-center gap-2 text-white">
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center font-semibold">
              A
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
            <svg
              className="w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </header>
    </>
  );
}
