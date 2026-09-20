import { Link } from "react-router-dom";
export default function Register() {
  return (
    <div className="bg-[#0a1122] min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-10">
      <div class="stripe-wrap">
        <div class="stripe"></div>
        <div class="stripe two"></div>
        <div class="stripe left"></div>
      </div>

      <div class="relative z-10 w-full max-w-md">
        <div class="flex flex-col items-center mb-8">
          <svg width="64" height="64" viewBox="0 0 52 52" class="shrink-0 mb-3">
            <circle
              cx="26"
              cy="26"
              r="25"
              fill="#0a1122"
              stroke="#3b82f6"
              stroke-width="2"
            />
            <circle
              cx="26"
              cy="26"
              r="19"
              fill="#132244"
              stroke="#dc2626"
              stroke-width="1.5"
            />
            <path
              d="M26 10 A16 16 0 0 1 40 33"
              stroke="#3b82f6"
              stroke-width="3"
              fill="none"
              stroke-linecap="round"
            />
            <path
              d="M26 42 A16 16 0 0 1 12 19"
              stroke="#60a5fa"
              stroke-width="3"
              fill="none"
              stroke-linecap="round"
            />
            <circle cx="26" cy="26" r="8" fill="#ffffff" />
            <text
              x="26"
              y="30"
              text-anchor="middle"
              font-size="9"
              font-weight="800"
              fill="#0a1122"
              font-family="Inter, sans-serif"
            >
              DCS
            </text>
          </svg>
          <p class="text-white font-extrabold text-lg tracking-wide text-center">
            DOT COMPLIANCE SOLUTIONS LLC
          </p>
          <p class="text-slate-400 text-xs mt-1">
            Safety &nbsp;•&nbsp; Compliance &nbsp;•&nbsp; Our Priority
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-xl p-8">
          <h1 class="themecolor text-xl font-bold text-slate-900">
            Create your account
          </h1>
          <p class="text-sm text-slate-500 mt-1 mb-6">
            Set up access to the compliance dashboard.
          </p>

          <form class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  First name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  class="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Smith"
                  class="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <div class="relative">
                <svg
                  class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="you@company.com"
                  class="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                Company name
              </label>
              <div class="relative">
                <svg
                  class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 21h18M5 21V7l8-4v18M13 21V11l6 3v7M9 9h.01M9 13h.01M9 17h.01"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Dot Compliance Solutions LLC"
                  class="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div class="relative">
                <svg
                  class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 00-6 0v2c0 1.657 1.343 3 3 3zm6 3v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4a2 2 0 012-2h8a2 2 0 012 2z"
                  />
                </svg>
                <input
                  type="password"
                  placeholder="Create a password"
                  class="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">
                Confirm password
              </label>
              <div class="relative">
                <svg
                  class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 00-6 0v2c0 1.657 1.343 3 3 3zm6 3v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4a2 2 0 012-2h8a2 2 0 012 2z"
                  />
                </svg>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  class="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            <label class="flex items-start gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                class="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-200"
              />
              I agree to the{" "}
              <a href="#" class="themecolor font-medium hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" class="themecolor font-medium hover:underline">
                Privacy Policy
              </a>
            </label>

            <button
              type="submit"
              class="themebg w-full bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium transition"
            >
              Create Account
            </button>
          </form>

          <p class="text-sm text-slate-500 text-center mt-6">
            Already have an account?
            <Link
              to="/login"
              class=" themecolor text-blue-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p class="text-center text-slate-500 text-xs mt-6">
          © 2025 Dot Compliance Solutions LLC
        </p>
      </div>
    </div>
  );
}
