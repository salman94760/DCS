const ESignCancelled = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-gray-900">
          E-Signature Not Completed
        </h1>

        <p className="mb-6 leading-7 text-gray-600">
          Your electronic signature has not been completed. Please complete the
          E-Signature to continue processing your driver application.
        </p>

        <p className="mb-6 leading-7 text-gray-600">
          If you are unable to complete the E-Signature or need assistance,
          please contact your administrator or our support team.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-lg bg-[#0a1122] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#141e35]"
          >
            Complete E-Signature
          </button>

          <button
            type="button"
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ESignCancelled;
