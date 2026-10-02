const ESignCompleted = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
        {/* Success Icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-gray-900">
          E-Signature Completed Successfully
        </h1>

        <p className="mb-6 leading-7 text-gray-600">
          Thank you for completing your electronic signature. Your
          E-Signature has been successfully submitted.
        </p>

        <p className="mb-6 leading-7 text-gray-600">
          Your driver application is now complete and has been submitted
          for review. If any additional information is required, our
          administrator will contact you.
        </p>

        {/* Success Message */}
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
          <p className="text-sm font-medium text-green-700">
            ✓ Your application has been successfully completed.
          </p>
        </div>

     {/*   <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-lg bg-[#0a1122] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#141e35]"
          >
            Back to Application
          </button>

          <button
            type="button"
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Contact Support
          </button>
        </div>*/}
      </div>
    </div>
  );
};

export default ESignCompleted;